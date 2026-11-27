"use client";

// Presenter mekanik "pilah": kelompok (ketuk/seret item ke bin) dan pilih (sentuh satu pilihan benar).
// Hanya menampilkan ronde dan mengirim jawaban; penilaian oleh runner (lihat docs/akademi/slice-1-kontrak.md §4).

import { bentukDariTeks } from "@/lib/akademi/tema-dunia";
import { bacaJamWaktu } from "@/lib/akademi/jam-waktu";
import { sfxAkademi } from "@/lib/sfx-akademi";
import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent as RPointerEvent } from "react";
import { createPortal } from "react-dom";
import { levelIndex, type PaketPilah } from "@akademi/schema";
import type { JawabanPilah, RondePilah, RondePilahKelompok, RondePilahPilih } from "@akademi/mechanics";
import { TombolBantu } from "./bantu";
import { sfx } from "@/lib/sfx";
import { sedangBicara, ucapkan } from "@/lib/akademi/suara";
import { Icon } from "@/components/ui";
import { Benda, KartuBenda, skalaLebar, visualBergambar, type VisualSpec } from "./benda";
import { GambarAdegan } from "./adegan-gambar";
import { kolomTerbaik } from "./kisi";
import { usePanggung } from "./dunia";
import { LabelWadah, Wadah } from "./wadah";
import { BALOO, BENAR, INK, type PresenterProps } from "./jenis";

type Props = PresenterProps<RondePilah, JawabanPilah, PaketPilah>;
type ItemPilah = PaketPilah["items"][number];
type BinPilah = PaketPilah["bins"][number];

const SOROT = "#ffd23f";
const UNGU = "#0786eb";

/** Warna kartu pilihan tulisan; semuanya terbaca dengan tinta #0b2545 (≥ 7:1). */
const WARNA_PILIHAN = ["#ffd23f", "#6fd0ff", "#ff9fcb", "#7fe0a7", "#ffb066", "#c4b0ff"];
const NAMA_WARNA: Record<string, readonly [string, string]> = {
  "#e53935": ["merah", "red"], "#1e88e5": ["biru", "blue"], "#fdd835": ["kuning", "yellow"], "#43a047": ["hijau", "green"],
};
const MUKA_DADU = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
const POSISI_TITIK = [[4], [0, 8], [0, 4, 8], [0, 2, 6, 8], [0, 2, 4, 6, 8], [0, 2, 3, 5, 6, 8]];

function GambarTitik({ indeks, ukuran }: { indeks: number; ukuran: number }) {
  const titik = POSISI_TITIK[indeks];
  return (
    <span aria-hidden className="grid shrink-0 grid-cols-3 grid-rows-3 place-items-center rounded-lg border-2 border-current bg-white" style={{ width: ukuran, height: ukuran, padding: ukuran * 0.12 }}>
      {Array.from({ length: 9 }, (_, i) => (
        <span key={i} className={`aspect-square w-[68%] rounded-full ${titik.includes(i) ? "bg-current" : ""}`} />
      ))}
    </span>
  );
}

function namaPilihan(x: ItemPilah, semua: ItemPilah[], t: (key: string) => string, inggris: boolean): string {
  if (x.altKey) return t(x.altKey);
  const nama = t(x.labelKey);
  const serupa = semua.filter(y => y.id !== x.id && t(y.labelKey) === nama);
  if (!serupa.length) return nama;
  const warna = x.color && NAMA_WARNA[x.color.toLowerCase()]?.[inggris ? 1 : 0];
  const scale = x.scale ?? 1;
  const width = x.width ?? 1;
  const ukuran = serupa.some(y => (y.scale ?? 1) !== scale)
    ? scale > Math.min(...serupa.map(y => y.scale ?? 1)) ? (inggris ? "large" : "besar") : (inggris ? "small" : "kecil")
    : serupa.some(y => (y.width ?? 1) !== width)
      ? width > Math.min(...serupa.map(y => y.width ?? 1)) ? (inggris ? "long" : "panjang") : (inggris ? "short" : "pendek")
      : undefined;
  const jumlah = serupa.some(y => (y.count ?? 1) !== (x.count ?? 1)) ? x.count ?? 1 : undefined;
  return (inggris ? [jumlah, ukuran, warna, nama] : [jumlah, nama, warna, ukuran]).filter(Boolean).join(" ");
}

/** Visual dari field paket; label dipakai Benda hanya bila tidak ada emoji/bentuk (mis. kartu angka). */
function visual(x: { emoji?: string; color?: string; scale?: number; count?: number; kolom?: number; shape?: VisualSpec["shape"]; width?: number; angka?: string; latar?: boolean; adegan?: VisualSpec["adegan"]; labelKey: string }, t: (k: string) => string): VisualSpec {
  return { emoji: x.emoji, color: x.color, scale: x.scale, count: x.count, kolom: x.kolom, shape: x.shape, width: x.width, angka: x.angka, latar: x.latar, adegan: x.adegan, label: t(x.labelKey) };
}

/** Tombol "Bantu" kecil (≥56px) di pojok kanan area permainan. */

export function PresenterPilah(props: Props) {
  if (props.ronde.mode === "pilih") return <Pilih {...props} ronde={props.ronde} />;
  return <Kelompok {...props} ronde={props.ronde} />;
}

/* ---------------- mode kelompok ---------------- */

interface Seret {
  id: string;
  x: number;
  y: number;
  sx: number;
  sy: number;
  /** sudah bergerak cukup jauh → dianggap seret, bukan ketuk */
  aktif: boolean;
  binHover: string | null;
}

function Kelompok({ paket, ronde, t, onJawab, onHint, hasil }: Omit<Props, "ronde"> & { ronde: RondePilahKelompok }) {
  const { bins, items } = ronde;
  // PAUD–TK belum membaca: nama kartu dibacakan saat disentuh (kartu "hasil percobaan", magnet, dll. hanya bertulisan)
  const bacaLabel = levelIndex(paket.level) < levelIndex("SD1");
  const lang = bahasaDari(paket, t);
  const [peta, setPeta] = useState<Record<string, string>>({});
  const [terpilih, setTerpilih] = useState<string | null>(null);
  const [hint, setHint] = useState<{ item: string; bin: string } | null>(null);
  const [seret, setSeret] = useState<Seret | null>(null);
  const seretRef = useRef<Seret | null>(null);
  const abaikanKlikSeret = useRef(false);
  const binRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const terkirim = useRef(false);
  const kunci = !!hasil;
  const { tema, skala: sk, w, h } = usePanggung();
  const lebarArea = Math.min(w || 390, 920) - 4;
  const hp = lebarArea < 600;
  const rakTumbuhan = paket.id === "sd3-sains-rak-tugas-bagian-tumbuhan";
  const rakTumbuhanHp = rakTumbuhan && hp && lebarArea >= 330 && h >= 550;
  const rakTumbuhanTablet = rakTumbuhan && lebarArea >= 620 && h >= 650;
  const aturRakTumbuhan = rakTumbuhanHp || rakTumbuhanTablet;
  const tahapGame = paket.competencyIds.includes("KODE.SD2.DEKOMPOSISI.01");
  const tahapGameHp = tahapGame && hp;
  const piktogram = paket.layoutBin === "piktogram";
  const piktogramLega = piktogram && lebarArea >= 620 && h >= 760;
  const rakAngka = paket.competencyIds.includes("MAT.TKB.BILANGAN-20.02");
  const rakJam = paket.competencyIds.includes("MAT.SD1.WAKTU.01");
  const rakJamHp = hp && rakJam;
  const rakMenitKaptenHp = hp && paket.id === "sd2-mat-menit-loncat-lima";
  const rakNilaiTempat = paket.competencyIds.includes("MAT.SD1.BILANGAN-100.02");
  const rakPecahan = paket.competencyIds.includes("MAT.SD6.PECAHAN.04");
  const rakPecahanLega = rakPecahan && lebarArea >= 620 && h >= 680;
  const rakBagi = paket.id === "sd2-mat-rak-bagi-rata";
  const rakBagiHp = rakBagi && hp;
  const rakBagiLega = rakBagi && lebarArea >= 620 && h >= 650;
  const visualItem = (item: ItemPilah) => visual(rakBagi ? { ...item, scale: undefined } : item, t);
  const rakHitungPilot = paket.id === "sd1-mat-rak-kurang-berapa-sepuluh" || paket.id === "sd1-mat-rak-dobel";
  const rakHitungHp = rakHitungPilot && hp;
  const rakDobelHp = paket.id === "sd1-mat-rak-dobel" && hp;
  const rakSetengahPiring = paket.id === "sd1-mat-rak-setengah-piring";
  const rakSetengahHp = rakSetengahPiring && hp;
  const rakBernomor = rakAngka || rakNilaiTempat || rakSetengahPiring;
  const rakAngkaHp = rakBernomor && hp;
  const rakAngkaLega = rakBernomor && lebarArea >= 620 && h >= 650;
  const paritas = paket.competencyIds.includes("MAT.SD1.BILANGAN-100.04");
  const paritasLega = paritas && lebarArea >= 620 && h >= 650;
  const hewanMakan = paket.competencyIds.includes("SAINS.SD1.MAKHLUK-HIDUP.02");
  const hewanMakanHp = hewanMakan && hp;
  const hewanMakanLega = hewanMakan && lebarArea >= 620 && h >= 680;
  const pilahBahan = paket.competencyIds.includes("SAINS.SD1.BAHAN.01");
  const ubahBentuk = paket.competencyIds.includes("SAINS.SD1.BAHAN.04");
  const dorongTarik = paket.competencyIds.includes("SAINS.SD1.GAYA.01");
  const rakBahan = pilahBahan && bins.length >= 4;
  const rakBahanHp = rakBahan && hp;
  const rakBentukHp = ubahBentuk && bins.length >= 3 && hp;
  const rakBahanLega = (rakBahan || (ubahBentuk && bins.length >= 4)) && lebarArea >= 620 && h >= 680;
  const kelompokBahan = paket.competencyIds.includes("SAINS.SD1.BAHAN.02") || paket.competencyIds.includes("SAINS.SD1.BAHAN.03");
  const carroll = paket.carroll;
  const carrollPilot = !!carroll && paket.level === "SD1";
  const carrollPilotHp = carrollPilot && hp;
  const carrollKapten = !!carroll && (paket.id === "sd2-kode-carroll-laut-kaki" || paket.id === "sd2-kode-carroll-roda-mesin");
  const carrollKaptenHp = carrollKapten && hp && lebarArea >= 330 && h >= 520;
  const carrollKaptenTablet = carrollKapten && lebarArea >= 620 && h >= 650;
  const tataCarrollKapten = carrollKaptenHp || carrollKaptenTablet;
  const bumiPilotHp = hp && paket.competencyIds.includes("SAINS.SD1.BUMI.01");
  const klasifikasiPilot = paket.competencyIds.includes("KODE.SD1.DATA.01");
  const akhirPilotHp = hp && paket.competencyIds.some(id =>
    ["KODE.SD1.DATA.01", "SAINS.SD1.MATAHARI.01", "KODE.SD1.PERANGKAT.01", "KODE.SD1.PERANGKAT.02"].includes(id));
  const kartuTitik = bins.length > 0 && bins.every((b) => b.emoji && MUKA_DADU.includes(b.emoji));
  const titikLega = kartuTitik && lebarArea >= 620 && h >= 680;
  const wadahLega = paket.level === "PAUD" && !kartuTitik && !piktogram &&
    bins.length >= 2 && bins.length <= 3 && lebarArea >= 620 && h >= 680;
  const isiPiringku = paket.id === "sains-isi-piringku";
  const batasWadahBergambar = isiPiringku ? 5 : hewanMakan ? 4 : 3;
  // M21–23 dan M25 memakai rak teks; tetap beri gambar ruang yang layak di tablet.
  const pilahPilotLega = !hp && h >= 680 && paket.competencyIds.some(id =>
    ["SAINS.SD1.GAYA.02", "MAT.SD1.BANGUN.01", "MAT.SD1.BANGUN.02", "SAINS.SD1.BUNYI.01"].includes(id));
  const pilahAdegan = [
    "sd3-sains-hidup-pernah-tidak-pernah-pantai", "sd3-sains-hidup-pernah-tidak-pernah-rumah",
    "sd2-mat-pilah-segi-banyak", "sd3-kode-butuh-internet", "sd4-sains-tulang-di-tempatnya", "sd6-sains-didih-uap-pantai",
    "sd2-kode-masukan-keluaran", "sd2-kode-perangkat-masuk-tampil",
  ].includes(paket.id);
  const pilahAdeganLega = pilahAdegan && lebarArea >= 620 && h >= 680;
  const pilahAdeganPadatLega = pilahAdeganLega && items.length > 8;
  const sifatBahanLega = paket.id === "sd2-sains-sifat-yang-dibutuhkan" && lebarArea >= 620 && h >= 680;
  const hurufSimetriLega = paket.id === "sd2-mat-huruf-simetris" && h >= (hp ? 630 : 680) && h >= lebarArea;
  const wadahBergambar = pilahPilotLega || pilahAdeganLega || sifatBahanLega || paket.level !== "PAUD" && !carroll && !kartuTitik && !piktogram && !paritas &&
    bins.length >= 2 && bins.length <= batasWadahBergambar && items.length <= 8 && lebarArea >= 620 && h >= 680 &&
    bins.every((b) => visualBergambar(b) && t(b.labelKey).length <= 50) &&
    items.every((i) => visualBergambar(i) && t(i.labelKey).length <= 70);
  // Perangkat berlabel panjang perlu empat kolom tablet agar rak tetap terlihat.
  const perangkatPilot = paket.competencyIds.some(id => id.startsWith("KODE.SD1.PERANGKAT."));
  const perangkatLega = perangkatPilot && wadahBergambar;
  const penyebaranBijiTablet = bins.length === 4 && paket.competencyIds.includes("SAINS.SD5.SIKLUS-TUMBUHAN.03") &&
    (lebarArea >= 880 || (lebarArea >= 620 && h >= 650));
  const tataLega = wadahLega || wadahBergambar || paritasLega;
  const kartuDiTengah = aturRakTumbuhan || tahapGame || tataCarrollKapten || tataLega || rakAngkaLega || rakPecahanLega || rakBagi || penyebaranBijiTablet || hurufSimetriLega;
  // Jumlah benda pada Rak Angka perlu terdengar meski hanya ada satu kartu sejenis.
  const namaJumlahRak = (item: ItemPilah) =>
    rakAngka && item.count !== undefined ? `${item.count} ${t(item.labelKey)}` : undefined;
  const namaJarumJam = (item: ItemPilah) => {
    if (!rakJam || item.adegan?.jenis !== "geometri") return;
    const waktu = bacaJamWaktu(item.adegan.varian);
    if (!waktu) return;
    const { jam, menit } = waktu;
    const berikut = jam % 12 + 1;
    if (lang === "en-US") {
      const pendek = menit === 0 ? `at ${jam}` : `between ${jam} and ${berikut}`;
      return `Clock, short hand ${pendek}, long hand at ${menit === 0 ? 12 : 6}`;
    }
    const pendek = menit === 0 ? `di angka ${jam}` : `di antara angka ${jam} dan ${berikut}`;
    return `Jam, jarum pendek ${pendek}, jarum panjang di angka ${menit === 0 ? 12 : 6}`;
  };
  const namaAmbil = (item: ItemPilah, bin: BinPilah) => {
    const nama = namaJumlahRak(item) ?? namaJarumJam(item) ?? t(item.altKey ?? item.labelKey);
    const nomor = t(bin.labelKey);
    const wadah = rakBernomor ? `${lang === "en-US" ? "shelf" : "rak"} ${nomor}` : nomor;
    return lang === "en-US" ? `Remove ${nama} from ${wadah}` : `Ambil ${nama} dari ${wadah}`;
  };

  // reset saat ronde berganti
  useEffect(() => {
    setPeta({});
    setTerpilih(null);
    setHint(null);
    setSeret(null);
    seretRef.current = null;
    abaikanKlikSeret.current = false;
    terkirim.current = false;
  }, [ronde]);

  // semua item sudah di bin → kirim jawaban otomatis
  useEffect(() => {
    if (kunci || terkirim.current) return;
    if (items.length > 0 && items.every((i) => peta[i.id])) {
      terkirim.current = true;
      onJawab(peta);
    }
  }, [peta, items, kunci, onJawab]);

  const taruh = (itemId: string, binId: string) => {
    if (kunci) return;
    sfxAkademi.taruh();
    setPeta((p) => ({ ...p, [itemId]: binId }));
    setTerpilih(null);
    if (hint?.item === itemId) setHint(null);
  };
  const ambil = (itemId: string) => {
    if (kunci) return;
    sfx.whoosh();
    setPeta((p) => {
      const q = { ...p };
      delete q[itemId];
      return q;
    });
    setTerpilih(itemId);
  };
  const ketukItem = (itemId: string) => {
    if (kunci) return;
    sfx.tap();
    setTerpilih((s) => (s === itemId ? null : itemId));
  };
  const ketukBin = (binId: string) => {
    if (kunci || !terpilih) return;
    taruh(terpilih, binId);
  };

  const binDi = (x: number, y: number): string | null => {
    for (const b of bins) {
      const el = binRefs.current[b.id];
      if (!el) continue;
      const r = el.getBoundingClientRect();
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return b.id;
    }
    return null;
  };

  const turun = (e: RPointerEvent<Element>, id: string) => {
    if (kunci) return;
    abaikanKlikSeret.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
    const s: Seret = { id, x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY, aktif: false, binHover: null };
    seretRef.current = s;
    setSeret(s);
  };
  const gerak = (e: RPointerEvent<HTMLElement>, id: string) => {
    const s = seretRef.current;
    if (!s || s.id !== id) return;
    const aktif = s.aktif || Math.hypot(e.clientX - s.sx, e.clientY - s.sy) > 10;
    const n: Seret = { ...s, x: e.clientX, y: e.clientY, aktif, binHover: aktif ? binDi(e.clientX, e.clientY) : null };
    seretRef.current = n;
    setSeret(n);
  };
  const lepas = (e: RPointerEvent<HTMLElement>, id: string) => {
    const s = seretRef.current;
    seretRef.current = null;
    setSeret(null);
    if (!s || s.id !== id) return;
    if (s.aktif) {
      abaikanKlikSeret.current = true;
      const b = binDi(e.clientX, e.clientY);
      if (b) taruh(id, b);
      else sfxAkademi.tolak();
    }
  };
  const batal = () => {
    seretRef.current = null;
    setSeret(null);
  };

  const bantu = () => {
    if (kunci) return;
    onHint?.();
    // item yang belum di bin, atau yang salah tempat
    const target = items.find((i) => !peta[i.id]) ?? items.find((i) => peta[i.id] !== i.bin);
    if (target) setHint({ item: target.id, bin: target.bin });
  };

  const lepasDiAtas = items.filter((i) => !peta[i.id]);
  const satuKartu = lepasDiAtas.length === 1;
  const adeganKaptenAkhirHp = lepasDiAtas.length <= 1 && hp && h >= 550 &&
    paket.competencyIds.some((id) => id === "SAINS.SD2.GAYA.01" || id === "SAINS.SD2.CAHAYA.01" ||
      id === "SAINS.SD2.LISTRIK.01" || id === "SAINS.SD2.LINGKUNGAN.01");
  const adeganBesarHp = (paket.id === "sd2-sains-aman-listrik-di-luar" || pilahAdegan) && h >= 550;
  const satuKartuBesarHp = satuKartu && hp && (adeganKaptenAkhirHp || kelompokBahan || adeganBesarHp || ((ubahBentuk || dorongTarik) && bins.length === 2));
  const kartuTerakhirLega = satuKartuBesarHp || (satuKartu && (piktogramLega || rakAngkaLega || rakBahanLega || rakPecahanLega));
  const salah = (i: ItemPilah) => kunci && peta[i.id] !== i.bin;
  const benarBin = (b: BinPilah) => kunci && items.some((i) => peta[i.id] === b.id) && items.filter((i) => peta[i.id] === b.id).every((i) => i.bin === b.id);
  const n = bins.length;
  // HP dengan ≥ 4 wadah, atau 3 wadah bernama panjang ("mamalia (berambut, menyusui)"): wadah disusun per baris
  // (label kiri, isi kanan) — kolom selebar ±100 px membuat nama & ciri terlipat per kata.
  // Empat atau lima tujuan Isi Piringku harus tetap dekat agar kartu bisa diseret langsung.
  const piringRingkas = isiPiringku && hp;
  const rakKisiHp = rakTumbuhanHp || tahapGameHp || rakJamHp || rakMenitKaptenHp || rakAngkaHp || rakBahanHp || rakBentukHp || rakHitungHp || rakBagiHp || hewanMakanHp;
  const baris = !carroll && !piktogram && !kartuTitik && hp && !piringRingkas && !rakKisiHp &&
    (n >= 4 || (n === 3 && bins.some((b) => t(b.labelKey).length > 9)));
  const titikRapat = kartuTitik && hp;
  const jarakBin = (rakSetengahHp ? 6 : carroll ? 7 : piktogram || titikRapat || rakKisiHp ? 8 : baris ? 10 : 12) * sk;
  const lebarMinBin = rakBagiHp ? 83 : rakBagiLega ? 112 : rakJamHp ? 94 : rakSetengahHp ? 62 : piringRingkas ? 94 + jarakBin : rakDobelHp ? 80 : titikRapat || rakHitungHp ? 84 + jarakBin : rakAngkaHp || rakMenitKaptenHp ? 84 : rakBahanHp ? 82 : Math.min(148, 114 * sk + jarakBin);
  const batasKolomBin = rakBagiHp ? (n <= 4 ? 2 : 4) : rakBagiLega || rakSetengahHp ? 5 : rakBentukHp ? 2 : rakBahanLega ? (n === 7 ? 4 : 3) : Infinity;
  const kapasitasKolom = Math.max(1, Math.min(batasKolomBin, Math.floor((lebarArea + jarakBin) / lebarMinBin)));
  const kolomBin = rakTumbuhanHp ? Math.min(n, 2) : tahapGame ? (hp ? 2 : n) : rakPecahanLega ? Math.min(n, 3) : rakJam && !hp ? Math.ceil(n / 2) : carroll ? 2 : piktogram ? n : baris ? 1 : Math.ceil(n / Math.ceil(n / kapasitasKolom));
  const lebarJudulBaris = carroll ? Math.min(124, lebarArea * 0.22) : 0;
  const lebarBin = (lebarArea - lebarJudulBaris - jarakBin * (carroll ? 4 : kolomBin - 1)) / kolomBin;
  const lebarIsi = Math.max(28, (baris ? lebarBin * 0.56 : lebarBin) - (rakSetengahHp ? 16 : (piktogram ? 20 : rakAngkaHp ? 24 : 36) * sk));
  const ukuranIkonBin = Math.min((rakTumbuhanHp ? 32 : rakTumbuhanTablet ? 64 : tahapGameHp ? 26 : wadahBergambar ? 104 : paritasLega ? 94 : wadahLega ? 86 : piktogramLega || rakBahanLega ? 70 : titikLega || paritas ? 64 : hewanMakanHp ? 38 : hp ? 42 : 52) * sk, lebarBin - (piktogram ? 16 : 24) * sk);
  const itemSeret = seret?.aktif ? items.find((i) => i.id === seret.id) : undefined;
  // kartu bergambar berlabel panjang (deskripsi) dibuat lebih lebar supaya teksnya tidak terlipat terlalu banyak
  const labelPanjang = items.some((i) => visualBergambar(i) && t(i.labelKey).length > 18);
  const kartuBeruraian = wadahBergambar && items.some((i) => t(i.labelKey).length > 32);
  // Tujuh piring memerlukan empat kolom di HP agar rak terbawah tetap bisa dituju langsung.
  const piringPadatHp = rakSetengahHp && items.length >= 7;
  const lebarMinKartu = Math.round((rakJamHp ? 68 : rakMenitKaptenHp ? 74 : piringPadatHp ? 62 : rakBahanHp || rakBagiHp ? 78 : pilahAdeganPadatLega ? 106 : labelPanjang && !hewanMakanHp ? 132 : rakNilaiTempat && hp ? 74 : titikRapat ? 78 : hp ? 92 : 112) * sk);
  const kolomMuat = Math.max(1, Math.floor((lebarArea + 8) / (lebarMinKartu + 8)));
  // Sisakan dua baris pada rak tablet tinggi dan papan paritas agar setiap kelompok tetap terbaca.
  const rakDuaBaris = rakAngkaLega && h >= 840 && items.length >= 5;
  // Layar pendek memakai satu baris bila muat. Kartu yang perlu dua baris dibagi merata.
  const kolomBiji = lepasDiAtas.length <= 4 ? 4
    : h < 650 && lepasDiAtas.length <= kolomMuat ? lepasDiAtas.length : Math.ceil(lepasDiAtas.length / 2);
  const batasKolomKartu = hurufSimetriLega ? (hp ? (items.length <= 6 ? 2 : 3) : (items.length <= 6 ? 3 : 4))
    : sifatBahanLega ? Math.ceil(items.length / 2)
    : penyebaranBijiTablet ? kolomBiji : piringPadatHp ? 4 : rakDuaBaris || paritasLega || hewanMakanLega ? Math.max(3, Math.ceil(items.length / 2))
    : pilahAdeganPadatLega ? 5 : perangkatLega || (pilahAdeganLega && items.length > 6) ? 4 : wadahBergambar ? ((kelompokBahan || pilahPilotLega || klasifikasiPilot) && items.length > 6 ? 4 : 3) : titikLega ? 4 : Infinity;
  const maksKolomKartu = Math.min(items.length, kolomMuat, batasKolomKartu);
  // Enam sampai delapan kartu pelengkap memakai paling banyak dua baris bila lebar HP mencukupi.
  const pelengkapPadat = hp && items.length >= 6 && paket.id === "sd1-mat-rak-kurang-berapa-sepuluh";
  const kolomKartu = rakTumbuhanHp ? Math.min(items.length, items.length >= 5 ? 3 : 2)
    : rakTumbuhanTablet ? Math.ceil(items.length / 2) : tahapGame ? Math.min(items.length, hp ? (lebarArea < 310 ? 2 : 3) : 4)
    : carrollKaptenTablet ? Math.ceil(items.length / 2) : carrollKaptenHp ? 4 : bumiPilotHp ? 3 : carrollPilot && !hp ? (items.length <= 4 ? 2 : 4) : rakJam && (!hp || n <= 6) ? (items.length <= 4 || hp ? 2 : 4) : carrollPilotHp ? (items.length >= 5 ? 4 : 3) : pelengkapPadat ? Math.max(1, Math.min(4, Math.floor((lebarArea + 8) / (64 + 8))))
    : kartuTitik ? Math.ceil(items.length / Math.ceil(items.length / maksKolomKartu))
      : items.length === 4 && maksKolomKartu === 3 ? 2 : maksKolomKartu;
  const lebarKolomKartu = (lebarArea - 8 * (kolomKartu - 1)) / kolomKartu;
  const barisCarrollKapten = Math.ceil(items.length / kolomKartu);
  const lebarKartu = aturRakTumbuhan && satuKartu ? Math.min(lebarArea, hp ? 220 : 320)
    : tahapGame && satuKartu ? Math.min(lebarArea, hp ? 240 : 320)
    : tataCarrollKapten && satuKartu ? Math.min(carrollKaptenHp ? 144 : 236, lebarArea)
    : hurufSimetriLega && satuKartu ? Math.min(hp ? 224 : 340, lebarArea)
    : penyebaranBijiTablet && satuKartu ? 244 : rakBagi && satuKartu ? Math.min(hp ? 184 : 236, lebarArea) : rakPecahanLega && satuKartu ? 224 : akhirPilotHp && satuKartu ? Math.min(264, lebarArea) : bumiPilotHp && satuKartu ? Math.min(240, lebarArea) : carrollPilotHp && satuKartu ? Math.min(180, lebarArea) : wadahBergambar ? satuKartu ? Math.min(300, lebarArea) : Math.min(230, lebarKolomKartu)
    : paritasLega ? satuKartu ? 224 : Math.min(232, lebarKolomKartu)
      : wadahLega ? Math.min(180, lebarKolomKartu) : kartuTerakhirLega ? (rakAngkaLega ? 228 : rakBahanLega ? 216 : 184)
        : (pelengkapPadat || piringPadatHp) && satuKartu ? Math.min(112, lebarArea) : lebarKolomKartu;
  // Jam perlu terbaca, tetapi sepuluh rak harus tetap terjangkau pada ronde padat.
  const gambarJam = Math.max(48, Math.min(hp ? (n <= 6 ? 110 : 56) : 150,
    (h - Math.ceil(n / kolomBin) * (hp ? 108 : 195) - 40) / Math.ceil(items.length / kolomKartu) - 42));
  // Rak bagi memakai rongga lebih tinggi saat empat rak muat dan tetap rapat pada ronde yang lebih padat.
  const rakBagiRingkas = n > 4 || h < 530;
  const tinggiBakiBagi = rakBagiLega ? (satuKartu ? 176 : rakBagiRingkas ? 102 : 156)
    : satuKartu && !rakBagiRingkas ? 128 : rakBagiRingkas ? 68 : 92;
  const tinggiIsiBagi = rakBagiLega ? (rakBagiRingkas ? 94 : 206) : rakBagiRingkas ? 54 : 100;
  const tinggiBaki = aturRakTumbuhan ? (hp ? (satuKartu ? 154 : 106) : (satuKartu ? 236 : 172))
    : tahapGame ? (hp ? (satuKartu ? 135 : 104) : (satuKartu ? 182 : 162))
    : carrollKaptenTablet ? Math.round(Math.max(112, Math.min(170, (h - 470) / barisCarrollKapten)))
    : carrollKaptenHp ? 84
    : hurufSimetriLega && satuKartu ? Math.round(h * (hp ? 0.36 : 0.39))
    : sifatBahanLega ? Math.min(224, Math.round(h * 0.24))
    : rakBagi ? tinggiBakiBagi : akhirPilotHp && satuKartu ? Math.min(260, h * 0.36) : bumiPilotHp ? Math.min(satuKartu ? 240 : 140, h * (satuKartu ? 0.34 : 0.2)) : carrollPilot ? (satuKartu ? (hp ? 180 : 210) : hp ? 88 : 150) : rakJam ? gambarJam + 38 : perangkatLega ? Math.min(satuKartu ? 220 : 170, Math.round(h * 0.18)) : wadahBergambar ? Math.min(satuKartu ? 320 : 204, Math.round(h * (satuKartu ? 0.32 : 0.205)))
    : paritasLega ? Math.min(satuKartu ? 205 : 174, Math.round(h * (satuKartu ? 0.27 : 0.2)))
      : wadahLega || (rakBahanLega && satuKartu) ? Math.min(224, Math.round(h * 0.23))
        : rakPecahanLega ? (satuKartu ? 156 : 96) : satuKartuBesarHp || adeganKaptenAkhirHp ? 152 : piktogramLega ? 172 : rakAngkaLega ? 188 : 84 * sk;
  const tinggiIsi = aturRakTumbuhan ? (hp ? 45 : 142) / sk
    : tahapGame ? (hp ? 48 : satuKartu ? 126 : 94) / sk
    : carrollKaptenTablet ? 94 / sk : carrollKaptenHp ? 54 / sk
    : hurufSimetriLega ? Math.round(h * (satuKartu ? (hp ? 0.24 : 0.32) : (hp ? 0.13 : 0.22)) / sk)
    : sifatBahanLega ? Math.min(182, Math.round(h * 0.2 / sk))
    : rakBagi ? tinggiIsiBagi / sk : rakPecahanLega ? 82 / sk : klasifikasiPilot && hp ? 120 / sk : bumiPilotHp ? Math.min(180, h * 0.25) / sk : rakJam && !hp ? 112 / sk : carrollPilotHp ? 72 / sk : rakJamHp ? 40 / sk : rakMenitKaptenHp ? (h < 480 ? 38 : 48) / sk : rakSetengahHp ? 48 / sk : rakAngkaLega ? (n > kapasitasKolom ? Math.min(118, Math.round(h * 0.14 / sk)) : 176)
    : rakDobelHp ? 42 : hewanMakanHp ? 48 : rakAngkaHp || rakHitungHp ? 54 : paritasLega ? Math.min(176, Math.round(h * 0.19 / sk)) : wadahBergambar ? Math.min(152, Math.round(h * 0.17 / sk))
    : wadahLega ? Math.min(220, Math.round(h * 0.22 / sk)) : piktogramLega ? 190 : piktogram || titikLega ? 112 : titikRapat || piringRingkas ? 58 : rakBahanHp || rakBentukHp ? 44 : baris || carroll ? 52 : 84;
  // Sisakan tinggi rak untuk ronde padat, lalu besarkan huruf yang tersisa.
  const gambarKartu = aturRakTumbuhan ? (hp ? (satuKartu ? 78 : 48) : (satuKartu ? 136 : 96))
    : tahapGame ? (hp ? (satuKartu ? 68 : 40) : (satuKartu ? 106 : 82))
    : carrollKaptenTablet ? Math.min(satuKartu ? 136 : 106, tinggiBaki - 42)
    : carrollKaptenHp ? (satuKartu ? 54 : 42)
    : hurufSimetriLega
    ? satuKartu ? tinggiBaki - 54 : Math.min(hp ? 88 : 148, Math.floor((h - (hp ? 228 : 284)) / Math.ceil(items.length / kolomKartu) - 35))
    : sifatBahanLega ? tinggiBaki - 48
    : rakBagi ? Math.min(104, tinggiBaki - 16) : penyebaranBijiTablet && h >= 650 ? (satuKartu ? 124 : 104) : akhirPilotHp && satuKartu ? Math.min(156, tinggiBaki - 70) : bumiPilotHp ? (satuKartu ? 156 : 72) : carrollPilot && satuKartu ? (hp ? 120 : 160) : carrollPilot && !hp ? 100 : rakJam ? gambarJam : carrollPilotHp ? 40 : perangkatLega ? Math.min(satuKartu ? 150 : 100, tinggiBaki - 64) : paritasLega ? Math.min(152, tinggiBaki - 36) : Math.round((wadahBergambar ? satuKartu ? 230 : kartuBeruraian ? 144 : 176 : wadahLega ? 132 : rakAngkaLega ? (satuKartu ? 156 : 142) : kartuTerakhirLega ? 128 : titikLega ? 112 : rakAngkaHp ? 68 : rakBahanHp ? 48 : hewanMakanHp ? 46 : hp ? 56 : 80) * Math.min(sk, 1.2));
  // Jaga ukuran ikon sepanjang ronde, termasuk saat semua kartu ditaruh di satu kolom.
  const gambarTerpasang = aturRakTumbuhan ? (hp ? 33 : 54)
    : tahapGameHp ? 31
    : carrollKaptenHp ? 32 : carrollKaptenTablet ? 44
    : hurufSimetriLega && !hp ? Math.min(94, lebarIsi / 3 - 18)
    : akhirPilotHp ? 32 : carrollPilotHp ? 28 : rakJamHp || rakMenitKaptenHp ? 32 : piktogramLega ? Math.max(32, Math.min(64 * sk, (h - tinggiBaki - 152 * sk) / items.length - 14))
    : rakAngkaLega ? 88 * sk : paritasLega ? 72 * sk : wadahBergambar ? Math.min(96 * sk, Math.max(42, lebarIsi / 2 - 20))
      : (piktogram ? 46 : wadahLega ? 96 : titikLega ? 80 : hewanMakanHp ? 40 : hp ? 52 : 64) * sk;
  const urutanIsi = Object.keys(peta);

  const gambarWadah = (b: BinPilah) => {
    const isi = items.filter((i) => peta[i.id] === b.id);
    if (piktogram) isi.sort((a, z) => urutanIsi.indexOf(a.id) - urutanIsi.indexOf(z.id));
    const hover = seret?.binHover === b.id;
    const disorot = hint?.bin === b.id;
    const hijau = benarBin(b);
    const siap = !!terpilih && !kunci;
    const ring = hijau ? BENAR : hover ? "#ffd23f" : disorot ? SOROT : siap ? "rgba(255,255,255,.85)" : "transparent";
    const mukaDadu = b.emoji ? MUKA_DADU.indexOf(b.emoji) : -1;
    const ikonBin = mukaDadu >= 0
      ? <GambarTitik indeks={mukaDadu} ukuran={ukuranIkonBin} />
      : visualBergambar(b) ? <Benda v={visual(b, t)} size={ukuranIkonBin / skalaLebar(b)} /> : undefined;
    const gambar = ikonBin && (paket.id === "sains-habitat-hewan-lain" || pilahBahan || kelompokBahan || ubahBentuk)
      ? <span className="inline-flex items-center justify-center" style={{ height: ukuranIkonBin * 0.86 }}>{ikonBin}</span>
      : ikonBin;
    return (
      <Wadah
        key={b.id}
        ref={(el) => { binRefs.current[b.id] = el; }}
        onClick={() => ketukBin(b.id)}
        arah={piktogram ? "piktogram" : baris ? "baris" : "kolom"}
        className={carrollKaptenTablet ? "[&>div:last-child]:max-h-[94px] [&>div:last-child]:overflow-y-auto" : carrollKaptenHp ? "[&>div]:px-0.5 [&>div]:py-0" : carrollPilotHp ? "[&>div]:px-0.5 [&>div]:py-0 [&>div:last-child]:h-[72px] [&>div:last-child]:max-h-[72px] [&>div:last-child]:overflow-y-auto" : tahapGameHp || rakJamHp || rakSetengahHp || rakDobelHp ? "[&>div]:px-0.5 [&>div]:py-0" : undefined}
        style={carrollKaptenHp || carrollPilotHp ? { padding: 4, gap: 4 } : rakJamHp || rakSetengahHp || rakDobelHp ? { padding: 4, gap: 2 } : piringRingkas || rakPecahanLega ? { width: lebarBin } : rakKisiHp ? { padding: 4 * sk, gap: 4 * sk } : undefined}
        isiDariAtas={!aturRakTumbuhan && !baris && !tataLega && !rakBagi && !carrollKaptenTablet && !hurufSimetriLega}
        minIsi={tinggiIsi}
        ring={ring}
        hijau={hijau}
        warnaKategori={b.color}
        bentuk={bentukDariTeks(t(b.labelKey)) ?? undefined}
        label={
          <button type="button" aria-label={t(b.labelKey)} disabled={kunci} onClick={(e) => { e.stopPropagation(); ketukBin(b.id); }} className="min-h-11 w-full min-w-0 rounded-md py-1 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0786eb]">
            {carrollPilotHp ? <span className="block text-center text-xs font-extrabold leading-tight">{t(b.labelKey)}</span> : rakAngkaLega || rakPecahanLega || rakBagi ? (
              <span className="block text-center" style={{ fontFamily: BALOO, fontSize: rakBagiHp ? 24 : 30 * Math.min(sk, 1.2), fontWeight: 800, lineHeight: rakBagi ? 1 : undefined }}>
                {t(b.labelKey)}
              </span>
            ) : <LabelWadah teks={t(b.labelKey)} rata={tahapGameHp || (titikRapat && lebarBin >= 96) || (baris && lebarArea >= 360 && t(b.labelKey).length <= 18) ? "kiri" : "tengah"} gambar={gambar} />}
          </button>
        }
      >
        {isi.map((i) => (
          <KartuBenda
            key={i.id}
            penuh={rakNilaiTempat || rakDobelHp || rakPecahan || rakBagi}
            v={visualItem(i)}
            size={rakDobelHp ? 30 : Math.min(gambarTerpasang, rakSetengahHp ? lebarIsi / 1.3 : lebarIsi - (piktogram ? 8 : 16)) / skalaLebar(i)}
            keterangan={false}
            ariaLabel={namaAmbil(i, b)}
            disabled={kunci}
            wrong={salah(i)}
            right={kunci && !salah(i)}
            onClick={(e) => { e.stopPropagation(); ambil(i.id); }}
            className={`shrink-0 ${salah(i) ? "akademi-shake" : ""}`}
            style={{
              width: carrollKaptenTablet ? Math.min(56, (lebarIsi - 18) / 4) : rakBagi ? Math.min(lebarIsi, rakBagiLega ? 100 : 76) : rakPecahan ? Math.min(lebarIsi, hp ? 94 : 100) : rakJamHp || akhirPilotHp ? 44 : rakDobelHp ? "100%" : rakNilaiTempat ? lebarIsi : undefined,
              minHeight: rakTumbuhanHp || tataCarrollKapten || rakJamHp || akhirPilotHp || rakDobelHp || rakSetengahHp ? 44 : 46 * sk,
              minWidth: carrollKaptenTablet ? 0 : rakJamHp || akhirPilotHp ? 44 : Math.min(lebarIsi, 46 * sk),
              maxWidth: "100%",
              padding: carrollKaptenTablet ? 4 : carrollKaptenHp ? 2 : rakJamHp || akhirPilotHp || rakSetengahHp ? 0 : rakDobelHp ? 2 : piktogram || rakAngkaHp || hewanMakanHp ? 4 : undefined,
              paddingBlock: pelengkapPadat && h < 650 ? 4 : undefined,
              pointerEvents: kunci ? "none" : undefined,
            }}
          />
        ))}
        {isi.length === 0 && <span aria-hidden className="w-full text-center" style={{ fontFamily: BALOO, fontSize: (baris ? 24 : 30) * sk, fontWeight: 900, lineHeight: 1, color: tema.wadahGelap, opacity: 0.7 }}>{baris ? "+" : "↓"}</span>}
      </Wadah>
    );
  };

  return (
    <div
      lang={rakJam ? lang : undefined}
      data-pilah-tengah={aturRakTumbuhan || tahapGame || piktogramLega || rakAngkaLega || paritasLega || hewanMakanLega || rakPecahanLega || rakBagi || adeganKaptenAkhirHp || (penyebaranBijiTablet && h >= 650) || (rakHitungPilot && !hp && h >= 650) ? "" : undefined}
      className={`mx-auto flex w-full max-w-[920px] flex-1 flex-col gap-3 px-0.5 pb-2 pt-0.5 ${rakTumbuhanTablet || tataLega && !sifatBahanLega && !hurufSimetriLega ? "justify-center" : ""}`}
      style={{ color: INK, minHeight: wadahBergambar && !sifatBahanLega && !hurufSimetriLega ? Math.min(780, Math.round(h * 0.78)) : wadahLega ? Math.min(680, Math.round(h * 0.72)) : undefined }}
    >
      {/* tombol Bantu dipasang ke kepala layar (portal), tidak memakan baris */}
      <TombolBantu onClick={bantu} disabled={kunci} />
      {/* item yang belum dipilah */}
      {/* kartu langsung di atas latar layar (tanpa panel pembungkus: satu lapis kartu) */}
      <div
        className={`relative shrink-0 ${carrollKaptenTablet ? "flex flex-col justify-center" : ""}`}
        style={{ minHeight: carrollKaptenTablet || rakJam ? tinggiBaki * barisCarrollKapten + 8 * (barisCarrollKapten - 1) : tinggiBaki }}
      >
        <div
          className={kartuDiTengah ? "flex flex-wrap justify-center gap-2" : "grid gap-2"}
          style={kartuDiTengah ? undefined : { gridTemplateColumns: `repeat(${kolomKartu}, minmax(0, 1fr))`, gridAutoRows: "1fr" }}
        >
          {lepasDiAtas.map((i) => {
            const dipilih = terpilih === i.id;
            const disorot = hint?.item === i.id;
            const sedangDiseret = seret?.aktif && seret.id === i.id;
            return (
              // pointer capture di tombol; move/up menggelembung ke pembungkus ini
              <div key={i.id} className={`flex min-w-0 ${satuKartu ? "col-span-full justify-self-center" : ""}`} style={kartuDiTengah || satuKartu ? { width: lebarKartu } : undefined} onPointerMove={(e) => gerak(e, i.id)} onPointerUp={(e) => lepas(e, i.id)} onPointerCancel={batal}>
                <KartuBenda
                  penuh
                  v={visualItem(i)}
                  ariaLabel={namaJumlahRak(i) ?? namaJarumJam(i) ?? namaPilihan(i, items, t, lang === "en-US")}
                  size={Math.min(gambarKartu, (lebarKartu - (rakAngka || rakSetengahPiring || (paritas && i.count !== undefined) ? 32 : 16)) / skalaLebar(i))}
                  labelSize={aturRakTumbuhan ? (hp ? (satuKartu ? 15 : 13) : 18) : tahapGame ? (hp ? (satuKartu ? 15 : 12) : 16) : carrollKaptenHp || carrollPilotHp ? 12 :Math.round((perangkatLega || pilahAdeganPadatLega ? 16 : wadahBergambar ? 19 : wadahLega ? 17 : rakAngkaLega || paritasLega ? 16 : rakBahanHp || hewanMakanHp ? 13 : 14) * Math.min(sk, 1.3))}
                  selected={dipilih}
                  disabled={kunci}
                  onClick={(e) => {
                    if (e.detail !== 0 && abaikanKlikSeret.current) return;
                    if (bacaLabel) ucapkan(t(i.altKey ?? i.labelKey), lang);
                    ketukItem(i.id);
                  }}
                  onPointerDown={(e) => turun(e, i.id)}
                  className={`w-full touch-none select-none ${disorot ? "akademi-bounce" : ""}`}
                  style={{
                    minHeight: aturRakTumbuhan || tahapGame ? tinggiBaki : hurufSimetriLega ? (satuKartu ? tinggiBaki : 76 * sk)
                      : tataCarrollKapten || (akhirPilotHp && satuKartu) || bumiPilotHp || carrollPilot || rakJam || rakBagi ? tinggiBaki : carrollPilotHp ? 88 : tataLega || rakAngkaLega || kartuTerakhirLega ? tinggiBaki : (rakNilaiTempat && hp ? 68 : 76) * sk,
                    paddingBlock: rakTumbuhanHp || tahapGameHp || carrollKaptenHp || carrollPilotHp || ((pelengkapPadat || piringPadatHp) && !satuKartu) ? 4 : undefined,
                    opacity: sedangDiseret ? 0.25 : 1,
                    boxShadow: disorot ? `0 4px 0 rgba(11,37,69,.12), 0 0 0 4px ${SOROT}` : undefined,
                    zIndex: dipilih ? 2 : undefined,
                  }}
                />
              </div>
            );
          })}
          {lepasDiAtas.length === 0 && (
            <div className="col-span-full flex w-full items-center justify-center" style={{ height: tataLega || piktogramLega || rakAngkaLega || rakBagi || adeganKaptenAkhirHp ? tinggiBaki : 76, fontFamily: BALOO, fontSize: 20, fontWeight: 800, opacity: 0.6 }}>
              Semua sudah dipilah
            </div>
          )}
        </div>
      </div>

      {carroll ? (
        <table data-wadah-kelompok className="w-full shrink-0 table-fixed border-separate text-center" style={{ borderSpacing: jarakBin }} aria-label={lang === "en-US" ? "Carroll diagram" : "Diagram Carroll"}>
          <colgroup>
            <col style={{ width: lebarJudulBaris }} />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <td aria-hidden="true" />
              {carroll.kolom.map((judul) => (
                <th key={judul} scope="col" className="rounded-xl bg-white px-1 py-2 text-sm font-extrabold [overflow-wrap:anywhere] sm:px-2 sm:text-base">{t(judul)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {carroll.baris.map((judul, baris) => (
              <tr key={judul}>
                <th scope="row" className="rounded-xl bg-white px-1 py-2 text-sm font-extrabold [overflow-wrap:anywhere] sm:px-2 sm:text-base">{t(judul)}</th>
                {paket.bins.slice(baris * 2, baris * 2 + 2).map((b) => (
                  <td key={b.id} className="align-top">
                    {bins.some((aktif) => aktif.id === b.id)
                      ? gambarWadah(b)
                      : <div className="flex min-h-20 items-center justify-center rounded-[18px] border-2 border-dashed border-slate-400/50 bg-white/60 p-2 text-sm font-bold text-[#2f4260]">{lang === "en-US" ? "Unused this round" : "Di luar ronde ini"}</div>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div
          data-wadah-kelompok
          className={piringRingkas || rakPecahanLega ? "flex shrink-0 flex-wrap justify-center" : "grid shrink-0"}
          style={{ gap: jarakBin, gridTemplateColumns: piringRingkas || rakPecahanLega ? undefined : `repeat(${kolomBin}, minmax(0,1fr))` }}
        >
          {bins.map(gambarWadah)}
        </div>
      )}

      {/* di-portal ke body: leluhur ber-transform/filter membuat "fixed" melenceng dari jari */}
      {itemSeret && seret && typeof document !== "undefined" && createPortal(
        <div className="pointer-events-none fixed z-[100]" style={{ left: seret.x, top: seret.y, transform: "translate(-50%,-60%) scale(1.15)" }}>
          <span className="flex items-center justify-center rounded-[18px] bg-white p-2" style={{ boxShadow: `0 8px 0 rgba(11,37,69,.18), 0 0 0 3px ${UNGU}` }}>
            <Benda v={visualItem(itemSeret)} size={64} />
          </span>
        </div>,
        document.body,
      )}
    </div>
  );
}

/** Bahasa suara: en-US bila paket sedang tampil dalam bahasa Inggris. */
function bahasaDari(paket: PaketPilah, t: (k: string) => string): string {
  return t(paket.instructionKey) === paket.locale.en[paket.instructionKey] && paket.locale.en[paket.instructionKey] !== paket.locale.id[paket.instructionKey] ? "en-US" : "id-ID";
}

/* ---------------- mode pilih ---------------- */

function Pilih({ paket, ronde, t, onJawab, onHint, hasil }: Omit<Props, "ronde"> & { ronde: RondePilahPilih }) {
  const { choices, correct, promptKey } = ronde;
  // Teks di bawah gambar pilihan mulai SD 1; di PAUD–TK (belum membaca) kata di kartu bisa membocorkan jawaban soal "tunjuk X".
  const tulisLabel = levelIndex(paket.level) >= levelIndex("SD1");
  const [dipilih, setDipilih] = useState<string | null>(null);
  const [redup, setRedup] = useState<string | null>(null);
  const kepalaSoal = useRef<HTMLDivElement>(null);
  const [tinggiKepala, setTinggiKepala] = useState(0);
  const kunci = !!hasil || dipilih !== null;
  const { skala: sk, h, w } = usePanggung();

  useEffect(() => {
    setDipilih(null);
    setRedup(null);
  }, [ronde]);

  // Soal tiap ronde dibacakan (anak PAUD–TK belum membaca). Ronde pertama: tunggu instruksi aktivitas selesai dulu.
  const soal = t(promptKey);
  const fungsi = /^(def [^:]+: return .+?)\. (Berapa|What is) (.+)\?$/.exec(soal);
  const soalKue = paket.id === "sd1-mat-dobel-etalase-kue" ? /^(\d+) \+ (\d+)/.exec(soal) : null;
  const soalJam = paket.id === "sd2-mat-jam-dinding-kelas" && !!ronde.adegan;
  const lang = bahasaDari(paket, t);
  useEffect(() => {
    const aktif = (navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }).userActivation?.hasBeenActive ?? true;
    if (!aktif || !soal) return;
    let batal = false;
    let tunggu = 0;
    const coba = () => {
      if (batal) return;
      if (sedangBicara() && tunggu < 60) {
        tunggu++;
        timer = setTimeout(coba, 250);
        return;
      }
      ucapkan(soal, lang);
    };
    let timer = setTimeout(coba, 700);
    return () => {
      batal = true;
      clearTimeout(timer);
    };
  }, [ronde, soal, lang]);

  const pilih = (id: string) => {
    if (kunci) return;
    sfx.tap();
    setDipilih(id);
    onJawab(id);
  };
  const bantu = () => {
    if (kunci) return;
    onHint?.();
    const s = choices.find((c) => c.id !== correct && c.id !== redup);
    if (s) setRedup(s.id);
  };

  const n = choices.length;
  const pilihanTulisan = choices.every((c) => !visualBergambar(c) && !c.color);
  const lebarArea = Math.min(w || 390, 920) - 4;
  const lebar = lebarArea >= 600;
  const bagiHitung = paket.id === "sd2-mat-bagi-tangkapan-laut";
  const pilihanDuaKolom = (paket.id === "sd2-sains-bahan-untuk-tugasnya" && !lebar) ||
    (paket.id === "sd2-mat-cari-segi-banyak-lab" && (!lebar || h >= 680)) ||
    (paket.id === "sd2-mat-huruf-pasir-simetri" && h >= lebarArea && (!lebar || h >= 680));
  const bagiBertumpuk = bagiHitung && (!lebar || h >= lebarArea);
  const bakiBertumpuk = !!soalKue && !lebar && h >= 530;
  const adeganLega = paket.level === "PAUD" && !!ronde.adegan && lebarArea >= 620 && h >= 680;
  const gambarLega = !pilihanTulisan && !ronde.bacaPilihan && h >= 560;
  const modelBolaDunia = paket.id === "sains-senter-bola-dunia" && !!ronde.adegan;
  const stokPiktogram = paket.competencyIds.includes("MAT.TKB.DATA.03");
  const potAudioLega = paket.id === "sains-pot-mana-yang-layu" && ronde.bacaPilihan && lebarArea >= 620 && h >= 560;
  const gridGambar = !tulisLabel && !ronde.adegan && (!ronde.bacaPilihan || potAudioLega) &&
    (n === 3 || n === 4) && choices.every(visualBergambar);
  // Dua kolom menjaga lebar gambar tetap sama ketika satu pilihan hilang di layar potret.
  const gridPotret = (gridGambar || pilihanDuaKolom) && h >= lebarArea;
  const tigaLanskap = gridGambar && !gridPotret && n === 3 && lebar && gambarLega;
  const ukurKepala = gridGambar || potAudioLega || !!soalKue || bagiHitung || pilihanDuaKolom || soalJam;
  useLayoutEffect(() => {
    const kepala = kepalaSoal.current;
    if (!ukurKepala || !kepala) return;
    const ukur = () => setTinggiKepala(kepala.offsetHeight);
    ukur();
    const pengamat = new ResizeObserver(ukur);
    pengamat.observe(kepala);
    return () => pengamat.disconnect();
  }, [ukurKepala]);
  const gridSempit = gridPotret && lebarArea < 320;
  const pilihanRingkas = gambarLega && !ronde.adegan && n <= 3;
  const muat = n === 2 ? 2 : n === 3 ? 3 : n === 4 ? (lebar ? 4 : 2) : lebar ? 3 : 2;
  // Tumpuk pilihan berkalimat atau berkontrol audio di HP. Pilihan gambar singkat muat dalam satu baris.
  const berkalimat = choices.some((c) => {
    const p = t(c.labelKey).length;
    return visualBergambar(c) ? tulisLabel && p > 24 : p > 12;
  });
  const jmlKolom =
    bagiBertumpuk ? 1 : gridPotret ? 2
      : n === 3 && !lebar && (berkalimat || ronde.bacaPilihan) && h > lebarArea * 1.1 ? 1
      : n === 4 ? kolomTerbaik(lebarArea, h - 90 * sk, n, muat, 12 * sk)
        : muat;
  const baris = Math.ceil(n / jmlKolom);
  const jarak = 12 * sk;
  const lebarKartu = (lebarArea - jarak * (jmlKolom - 1)) / jmlKolom;
  const skalaLebarMaks = Math.max(1, ...choices.map(skalaLebar));
  const skalaTinggiMaks = Math.max(1, ...choices.map((c) => c.scale ?? 1));
  const labelPanjang = tulisLabel && choices.some((c) => visualBergambar(c) && t(c.labelKey).length > 34);
  const ukuranAdegan = soalJam
    ? Math.round(Math.min(lebarArea * 0.62, 310, Math.max(108, h * 0.36)))
    : modelBolaDunia
    ? Math.round(Math.min(lebarArea / 1.45, 228, Math.max(84, h * 0.28)))
    : adeganLega ? Math.min(190, Math.round(h * 0.21)) : Math.max(60, Math.min(100, h * 0.18));
  const tinggiSoal = ukurKepala && tinggiKepala ? tinggiKepala + (stokPiktogram ? 36 : 26)
    : soalKue ? 166 * sk : ronde.adegan ? Math.max(176 * sk, ukuranAdegan + 70 * sk) : 68 * sk;
  const tinggiAudio = ronde.bacaPilihan ? (potAudioLega ? 56 : 48) : 0;
  const tinggiBaris = h > 0 ? (h - tinggiSoal - jarak * (baris - 1)) / baris - tinggiAudio : 160;
  const tinggiMaks = soalJam ? (lebar ? 188 : 112)
    : bagiHitung ? (lebar ? 168 : 148) : soalKue ? (lebar ? 144 : 108)
    : jmlKolom === 1 ? (pilihanTulisan ? 126 : 148)
    : potAudioLega ? (gridPotret ? 276 : 368)
      : tigaLanskap ? 500
      : gridPotret && lebar ? 432
        : pilihanRingkas && lebar ? 390
          : gambarLega ? 322 : 240;
  const rasioKartu = soalJam ? 1.15 : potAudioLega ? 1.22 : tigaLanskap ? 1.8 : labelPanjang || gambarLega ? 1.42 : 1.03;
  // Batasi dua baris rak agar tetap terlihat saat tinggi area layar tablet berkurang.
  const batasRak = stokPiktogram && baris > 1 ? 352 : Infinity;
  const tinggiBatas = Math.min(tinggiMaks * Math.min(sk, 1.2), lebarKartu * rasioKartu, batasRak);
  const tinggiKartu = Math.round(Math.max(pilihanTulisan ? 88 : gridSempit ? 96 : 112, Math.min(tinggiBaris, tinggiBatas)));
  // Benda mengalikan ukuran dasar dengan scale. Sisakan ruang di kartu untuk gambar yang diperbesar.
  const bagianTinggiGambar = potAudioLega ? 0.84 : tulisLabel ? 0.6 : 0.77;
  const batasTinggiGambar = Math.min(potAudioLega ? 300 : (pilihanRingkas || gridPotret) && lebar ? 296 : gambarLega ? 252 : 200, tinggiKartu * bagianTinggiGambar);
  const lebarGambar = Math.min(lebarKartu - 24, lebarKartu * (potAudioLega ? 0.9 : labelPanjang ? 0.55 : tigaLanskap ? 0.92 : gambarLega ? 0.84 : 0.78));
  const ukuran = Math.round(Math.min(batasTinggiGambar / skalaTinggiMaks, lebarGambar / skalaLebarMaks));
  const letakSendiri = { gridColumn: "1 / -1", justifySelf: "center", width: `calc((100% - ${jarak}px) / 2)` } as const;

  return (
    <div
      data-pilah-tengah={stokPiktogram || potAudioLega || bagiHitung || (gambarLega && n <= 3 && !adeganLega && !gridGambar && !modelBolaDunia && !pilihanDuaKolom) ? "" : undefined}
      className={`mx-auto flex w-full min-w-0 max-w-[920px] flex-1 flex-col gap-3 px-0.5 pb-2 pt-0.5 ${adeganLega ? "justify-center" : ""}`}
      style={{ color: INK, minHeight: adeganLega ? Math.min(620, Math.round(h * 0.66)) : undefined }}
    >
      <div ref={kepalaSoal} className="flex items-start gap-2">
        <div className="min-w-0 flex-1 px-1 py-1 text-center" style={{ fontFamily: BALOO, fontSize: gridSempit ? 20 : 24 * Math.min(sk, 1.3), fontWeight: 800, lineHeight: 1.15, color: "var(--pilar-tua)" }}>
          <button type="button" onClick={() => ucapkan(soal, lang)} className={`min-h-11 w-full whitespace-pre-line [overflow-wrap:anywhere] ${bagiHitung ? "py-2" : ""}`} aria-label="Dengarkan soal">
            {fungsi ? (
              <span className="flex min-w-0 flex-col gap-1">
                <code className="rounded-lg bg-white/75 px-1 py-2 text-[clamp(13px,3.8vw,20px)]">{fungsi[1]}</code>
                <span>{lang === "en-US" ? "What is the result?" : "Berapa hasilnya?"}</span>
                <code className="rounded-lg bg-white/75 px-1 py-2 text-[clamp(13px,3.8vw,20px)]">{fungsi[3]}</code>
              </span>
            ) : soal}
          </button>
          {soalKue && (
            <div className={`mx-auto grid w-full gap-1.5 py-1 ${bakiBertumpuk ? "max-w-[400px] grid-cols-1" : "max-w-[760px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]"}`}>
              {[Number(soalKue[1]), Number(soalKue[2])].map((jumlah, i) => (
                <div
                  key={i}
                  role="img"
                  aria-label={lang === "en-US" ? `${jumlah} slices of cake` : `${jumlah} potong kue`}
                  className={`flex min-w-0 items-start justify-center rounded-2xl border-b-4 border-[#d2a396] bg-[#fff3e4] px-1 py-2 sm:p-3 ${bakiBertumpuk ? (i ? "col-start-1 row-start-3" : "col-start-1 row-start-1") : (i ? "col-start-3 row-start-1" : "col-start-1 row-start-1")}`}
                  style={{ containerType: "inline-size" }}
                >
                  {/* Lima potong per baris memberi acuan yang sama untuk kedua baki. */}
                  <span className="grid w-full max-w-[288px] grid-cols-5 place-items-center gap-x-0.5 gap-y-1.5 leading-none" style={{ fontSize: "min(52px, calc(20cqi - 1.6px))" }} aria-hidden>
                    {Array.from({ length: jumlah }, (_, j) => <span key={j}>🍰</span>)}
                  </span>
                </div>
              ))}
              <span aria-hidden className={`self-center text-xl ${bakiBertumpuk ? "col-start-1 row-start-2" : "col-start-2 row-start-1"}`}>+</span>
            </div>
          )}
          {ronde.adegan && <div className="mt-1 flex justify-center"><GambarAdegan adegan={ronde.adegan} s={ukuranAdegan} /></div>}
        </div>
        <TombolBantu onClick={bantu} disabled={kunci} />
      </div>
      {/* Pilihan mulai tepat setelah soal; baris boleh bertambah tinggi mengikuti isi kartu. */}
      <div
        className={`grid w-full shrink-0 ${bagiBertumpuk ? "mx-auto max-w-[620px]" : ""}`}
        style={{
          gap: jarak, gridTemplateColumns: `repeat(${jmlKolom}, minmax(0, 1fr))`, gridAutoRows: "1fr",
        }}
      >
        {choices.map((c, i) => {
          const benar = !!hasil && c.id === correct;
          const salah = !!hasil && dipilih === c.id && c.id !== correct;
          const sendiri = gridPotret && n === 3 && i === n - 1;
          const nama = namaPilihan(c, choices, t, lang === "en-US");
          // Kartu yang mencapai tepi panel tetap diam agar tepinya terlihat saat umpan balik.
          const animasi = bagiHitung || pilihanDuaKolom || soalJam ? "" : salah ? "akademi-shake" : benar ? "akademi-pop" : "";
          const kartu = (
            <KartuBenda
              penuh
              key={c.id}
              v={visual(c, t)}
              ariaLabel={nama}
              size={ukuran}
              selected={!hasil && dipilih === c.id}
              right={benar}
              wrong={salah}
              dim={redup === c.id && !hasil}
              keterangan={tulisLabel}
              labelSize={Math.round(Math.max(14 * sk, Math.min(24, Math.max(ukuran * 0.15, Math.min(lebarKartu, 480) * 0.06))))}
              onClick={() => pilih(c.id)}
              disabled={kunci}
              className={`min-w-0 ${ronde.bacaPilihan ? "w-full flex-1" : ""} ${animasi}`}
              style={{
                minHeight: tinggiKartu,
                background: benar ? "#8fe6b6" : salah ? "#ffc08a" : pilihanTulisan ? WARNA_PILIHAN[i % WARNA_PILIHAN.length] : undefined,
                pointerEvents: kunci ? "none" : undefined,
                ...(sendiri && !ronde.bacaPilihan ? letakSendiri : {}),
              }}
            />
          );
          if (!ronde.bacaPilihan) return kartu;
          return (
            <div key={c.id} className="flex min-w-0 flex-col gap-1" style={sendiri ? letakSendiri : undefined}>
              {kartu}
              <button type="button" onClick={() => ucapkan(t(c.altKey ?? c.labelKey), lang)} aria-label={lang === "en-US" ? `Listen to option ${i + 1}` : `Dengarkan pilihan ${i + 1}`} className={`flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-white px-2 font-extrabold text-[#0567c2] ${potAudioLega ? "h-[52px] text-base" : "h-11 text-sm"}`}>
                <Icon name="volume_up" size={potAudioLega ? 22 : 20} />
                {lang === "en-US" ? "Listen" : "Dengar"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
