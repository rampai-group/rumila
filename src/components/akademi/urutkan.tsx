"use client";

// Presenter mekanik "urutkan": susun (kartu → slot bernomor), perbaiki (tukar dua kartu), dulu (pilih yang lebih dulu),
// label (tempel pertama/lalu/terakhir di bawah gambar, lalu tokoh bercerita mengikuti label).
// Hanya menampilkan ronde dan mengirim jawaban; penilaian oleh runner (lihat docs/akademi/slice-1-kontrak.md §4).

import { sfxAkademi } from "@/lib/sfx-akademi";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import type { PaketUrutkan } from "@akademi/schema";
import type { JawabanUrutkan, LabelUrutan, RondeUrutkan } from "@akademi/mechanics";
import { Icon } from "@/components/ui";
import type { Tema } from "@/lib/akademi/tema-dunia";
import { KALIMAT_URUTKAN, KATA_URUTAN, kalimatUrutkan } from "@/lib/akademi/kalimat-suara";
import { diamkan, ucapkan } from "@/lib/akademi/suara";
import { sfx } from "@/lib/sfx";
import { Benda, KartuBenda, skalaLebar, type VisualSpec } from "./benda";
import { kolomTerbaik } from "./kisi";
import { AksiBawah, urutanAngkaRingkas, urutanTumbuhHewan, usePanggung } from "./dunia";
import { TombolBantu } from "./bantu";
import { BALOO, BENAR, INK, NUNITO, SALAH, type PresenterProps } from "./jenis";

type Props = PresenterProps<RondeUrutkan, JawabanUrutkan, PaketUrutkan>;
type Langkah = RondeUrutkan["shown"][number];

const SOROT = "#ffd23f";
const WARNA_PILIH = "#0786eb";
const BAYANG_SOROT = `0 4px 0 rgba(11,37,69,.12), 0 0 0 4px ${SOROT}`;
const BAGIAN_TUMBUHAN: Record<"id" | "en", Readonly<Record<string, string>>> = {
  id: { akar: "Akar", batang: "Batang", daun: "Daun", bunga: "Bunga", bulir: "Bunga" },
  en: { akar: "Roots", batang: "Stem", daun: "Leaves", bunga: "Flower", bulir: "Flower" },
};

function sorotKartuUrutan(dipilih: boolean, disorot: boolean): CSSProperties {
  if (!dipilih && !disorot) return {};
  return { boxShadow: `inset 0 0 0 4px ${dipilih ? WARNA_PILIH : SOROT}`, background: dipilih ? "#edf7ff" : "#fff9df" };
}

function visual(x: Langkah, t: (k: string) => string): VisualSpec {
  return { emoji: x.emoji, color: x.color, scale: x.scale, count: x.count, kolom: x.kolom, shape: x.shape, width: x.width, angka: x.angka, latar: x.latar, adegan: x.adegan, label: t(x.labelKey) };
}

/** Tombol "Bantu" kecil (≥56px); disembunyikan di mode ujian. */

/* ---------------- tata letak bersama ---------------- */

/** Perkiraan tinggi baris judul (+ tombol Bantu) untuk menghitung sisa tinggi panggung. */
const tinggiKepala = (sk: number) => 58 * Math.min(sk, 1.3);
/** Jarak antarbagian root (gap-3). */
const GAP_ROOT = 12;
const layarPendekUrutan = (w: number, h: number) => w > 0 && w < 335 && h > 0 && h < 490;
const tabletTegakTumbuh = (w: number, h: number) => w >= 620 && h >= 680 && h > w * 0.9;

/**
 * Lebar sel terbesar (≤ maks) untuk `n` sel di lebar `lebar`. Kalau `tinggi` diberikan dan ruangnya tinggi, sel dibagi
 * ke beberapa baris (4 → 2×2) supaya kartu besar, bukan empat kolom sempit di tengah layar kosong.
 * `blok` = lebar pembungkus, supaya jumlah kolomnya persis walau sel sudah mentok `maks`.
 */
function selMuat(lebar: number, n: number, min: number, maks: number, gap: number, tinggi = 0, rasio?: number, barisMaks = n, kolomMaks = n): { s: number; baris: number; blok?: number } {
  if (lebar <= 0 || n <= 0) return { s: min, baris: 1 };
  const muat = Math.max(1, Math.min(kolomMaks, n, Math.floor((lebar + gap) / (min + gap))));
  const terbaik = tinggi > 0 ? kolomTerbaik(lebar, tinggi, n, muat, gap, rasio) : muat;
  const perBaris = Math.min(muat, Math.max(terbaik, Math.ceil(n / barisMaks)));
  const s = Math.floor(Math.max(min, Math.min(maks, (lebar - gap * (perBaris - 1)) / perBaris)));
  return { s, baris: Math.ceil(n / perBaris), blok: perBaris * s + gap * (perBaris - 1) + 2 };
}

const batas = (min: number, x: number, maks: number) => Math.round(Math.min(maks, Math.max(min, x)));

/** Rak tujuan bertema dunia (warna wadah + bibir rak gelap), menggantikan kotak putih pucat. */
function gayaRak(_tema: Tema, sk: number): CSSProperties {
  // gaya bersih: tanpa panel pembungkus; slot & kartu langsung di atas latar layar
  return { padding: 4 * sk };
}

/** Panel benda (kartu yang belum dipakai): tanpa pembungkus, kartu langsung di atas latar. */
function gayaPanel(_tema: Tema, sk: number): CSSProperties {
  return { padding: 4 * sk };
}

/** Lubang slot di rak: kosong = cekung nyaris putih bergaris putus tegas, terisi = kartu putih. Isi selalu di atas latar terang. */
function gayaLubang(terisi: boolean, ring: string, latar?: string): CSSProperties {
  return terisi
    ? { border: `3px solid ${ring}`, background: latar ?? "#fff", boxShadow: "0 4px 0 rgba(0,0,0,.18)" }
    : { border: `3px dashed ${ring}`, background: latar ?? "rgba(255,255,255,.9)", boxShadow: "inset 0 4px 10px rgba(0,0,0,.14)" };
}

/** Judul urutan + tombol bantu dalam satu baris. */
function Kepala({ judul, onBantu, kunci, tanpaBantu }: { judul: string; onBantu: () => void; kunci: boolean; tanpaBantu?: boolean }) {
  const { skala: sk } = usePanggung();
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 px-1 text-center" style={{ fontFamily: BALOO, fontSize: 21 * Math.min(sk, 1.3), fontWeight: 800, lineHeight: 1.15, color: "var(--pilar-tua)" }}>
        {judul}
      </div>
      {!tanpaBantu && <TombolBantu onClick={onBantu} disabled={kunci} />}
    </div>
  );
}

/** Nomor slot bulat besar. */
function Nomor({ n, warna, ringkas, padat }: { n: number; warna?: string; ringkas?: boolean; padat?: boolean }) {
  const { tema, skala: sk } = usePanggung();
  const d = Math.round((padat ? 20 : ringkas ? 28 : 36) * sk);
  return (
    <span
      className="flex items-center justify-center rounded-full text-white"
      style={{ width: d, height: d, background: warna ?? tema.aksen, fontFamily: BALOO, fontSize: (padat ? 12 : ringkas ? 16 : 20) * sk, fontWeight: 900, boxShadow: "0 3px 0 rgba(11,37,69,.18), 0 0 0 2px #fff" }}
    >
      {n}
    </span>
  );
}

export function PresenterUrutkan(props: Props) {
  if (props.ronde.mode === "dulu") return <Dulu {...props} />;
  if (props.ronde.mode === "perbaiki") return <Perbaiki {...props} />;
  if (props.ronde.mode === "label") return <Label {...props} />;
  return <Susun {...props} />;
}

/* ---------------- mode susun ---------------- */

function Susun({ paket, ronde, t, onJawab, onHint, hasil }: Props) {
  const { shown, correct } = ronde;
  const n = shown.length;
  const [slot, setSlot] = useState<(string | null)[]>(() => Array(n).fill(null));
  const [terpilih, setTerpilih] = useState<string | null>(null);
  const [hint, setHint] = useState<{ kartu: string; slot: number } | null>(null);
  const terkirim = useRef(false);
  const kepalaTumbuhan = useRef<HTMLDivElement>(null);
  const [tinggiKepalaTumbuhan, setTinggiKepalaTumbuhan] = useState(0);
  const tataTumbuhan = paket.id === "sains-susun-tumbuhan-utuh";
  const tataPencernaan = paket.id === "sd5-sains-jalan-makanan";
  const tataBunyi = paket.competencyIds.includes("SAINS.SD1.BUNYI.02");
  const kalenderPilot = paket.competencyIds.includes("MAT.SD1.WAKTU.02");
  const tujuan = useRef<(HTMLButtonElement | null)[]>([]);
  const gerakan = useRef<{ id: string; x: number; y: number; aktif: boolean } | null>(null);
  const abaikanKlik = useRef(false);
  const [bayanganSeret, setBayanganSeret] = useState<{ id: string; x: number; y: number } | null>(null);
  const kunci = !!hasil;
  const langkah = (id: string) => shown.find((s) => s.id === id)!;

  useLayoutEffect(() => {
    const kepala = kepalaTumbuhan.current;
    if (!kepala) return;
    const ukur = () => setTinggiKepalaTumbuhan(kepala.offsetHeight);
    ukur();
    const pengamat = new ResizeObserver(ukur);
    pengamat.observe(kepala);
    return () => pengamat.disconnect();
  }, [tataTumbuhan]);

  useEffect(() => {
    setSlot(Array(shown.length).fill(null));
    setTerpilih(null);
    setHint(null);
    terkirim.current = false;
    gerakan.current = null;
    setBayanganSeret(null);
    abaikanKlik.current = false;
  }, [ronde, shown.length]);

  useEffect(() => {
    if (kunci || terkirim.current) return;
    if (slot.length === n && slot.every(Boolean)) {
      terkirim.current = true;
      onJawab(slot as string[]);
    }
  }, [slot, n, kunci, onJawab]);

  const isiSlot = (i: number, id: string) => {
    if (kunci || slot[i]) return;
    sfxAkademi.taruh();
    setSlot((s) => s.map((v, k) => (k === i ? id : v === id ? null : v)));
    setTerpilih(null);
    if (hint?.kartu === id) setHint(null);
  };
  const ketukKartu = (id: string) => {
    if (kunci) return;
    if (terpilih === id) {
      // ketuk lagi kartu yang sama → masuk slot kosong pertama
      const i = slot.findIndex((v) => !v);
      if (i >= 0) isiSlot(i, id);
      else setTerpilih(null);
      return;
    }
    sfx.tap();
    setTerpilih(id);
  };
  const ketukSlot = (i: number) => {
    if (kunci) return;
    const isi = slot[i];
    if (isi) {
      // kembalikan kartu ke bawah
      sfx.whoosh();
      setSlot((s) => s.map((v, k) => (k === i ? null : v)));
      setTerpilih(null);
      return;
    }
    if (terpilih) isiSlot(i, terpilih);
  };
  const mulaiSeret = (e: ReactPointerEvent<Element>, id: string) => {
    if (!kalenderPilot || kunci) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    abaikanKlik.current = false;
    gerakan.current = { id, x: e.clientX, y: e.clientY, aktif: false };
  };
  const geserKartu = (e: ReactPointerEvent<HTMLDivElement>) => {
    const g = gerakan.current;
    if (!g) return;
    g.aktif ||= Math.hypot(e.clientX - g.x, e.clientY - g.y) > 10;
    if (g.aktif) {
      setTerpilih(g.id);
      setBayanganSeret({ id: g.id, x: e.clientX, y: e.clientY });
    }
  };
  const selesaiSeret = (e: ReactPointerEvent<HTMLDivElement>) => {
    const g = gerakan.current;
    gerakan.current = null;
    setBayanganSeret(null);
    if (!g?.aktif) return;
    abaikanKlik.current = true;
    const i = tujuan.current.findIndex((el, index) => {
      if (!el || slot[index]) return false;
      const r = el.getBoundingClientRect();
      return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    });
    if (i >= 0) isiSlot(i, g.id);
  };

  const bantu = () => {
    if (kunci) return;
    onHint?.();
    const i = slot.findIndex((v, k) => v !== correct[k]);
    if (i >= 0) setHint({ kartu: correct[i], slot: i });
  };

  const sisa = shown.filter((s) => !slot.includes(s.id));
  const { tema, skala: sk, w, h } = usePanggung();
  const bandingPanjang = paket.competencyIds.includes("MAT.TKA.BANDING.02");
  const bandingPilot = paket.competencyIds.some(id => ["SAINS.SD1.BUNYI.02", "MAT.SD1.UKUR.01", "MAT.SD1.UKUR.02"].includes(id));
  const layarPendek = tataTumbuhan && layarPendekUrutan(w, h);
  const bandingRingkas = bandingPanjang && w > 0 && w <= 360 && h > 0 && h < 520;
  const algoritmaHp = paket.competencyIds.includes("KODE.SD1.ALGORITMA.01") && w > 0 && w < 600;
  const layarRapat = layarPendek || bandingRingkas || algoritmaHp || (bandingPilot && w < 600);
  const tataTunas = paket.level === "PAUD";
  const tataAngkaRingkas = urutanAngkaRingkas(paket);
  const hitungLega = tataAngkaRingkas && w >= 620 && h >= 650;
  const hitungLegaHp = tataAngkaRingkas && paket.level === "SD1" && w > 0 && w < 620 && h >= 540;
  const tataTumbuhHewan = urutanTumbuhHewan(paket);
  const hewanHp = tataTumbuhHewan && w < 600;
  const hewanTabletTegak = tataTumbuhHewan && tabletTegakTumbuh(w, h);
  const hewanHpPendek = hewanHp && h > 0 && h < 450;
  const tataRingkas = tataTunas || tataTumbuhan || tataAngkaRingkas || bandingPilot || tataTumbuhHewan;
  const inggris = t(paket.instructionKey) === paket.locale.en?.[paket.instructionKey];
  const labelAkses = (s: Langkah) => {
    const nama = t(s.labelKey);
    // Satuan relatif terhadap lebar gambar, sama di kartu sumber dan slot.
    if (!bandingPanjang || s.width === undefined) return nama;
    const panjang = (s.width * 10).toLocaleString(inggris ? "en-US" : "id-ID");
    return inggris ? `${nama}, length ${panjang} units` : `${nama}, panjang ${panjang} satuan`;
  };
  const caraSusun = inggris ? "Tap a card, then tap a numbered box." : KALIMAT_URUTKAN.caraSusun;
  const base = n <= 4 ? 64 : 52;
  const jarakBagian = layarRapat ? 8 : GAP_ROOT;
  const gap = Math.round((layarRapat ? 8 : tataTumbuhan && w >= 600 ? 14 : 10) * sk);
  const pad = 12 * sk;
  const lebarDalam = w > 0 ? (tataRingkas ? Math.min(w, 920) : w) - (tataAngkaRingkas ? 2 * gap + 2 : 2 * pad + 6) : 0;
  // Cadangkan tinggi judul, petunjuk, kedua jarak vertikal, dan padding panel.
  const tinggi = tataTumbuhan ? Math.max(0, h - (tinggiKepalaTumbuhan || 100) - 2 * jarakBagian - 16 - 12 * sk)
    : tataTunas ? Math.max(0, h - tinggiKepala(sk) - 44 - 3 * GAP_ROOT)
      : h > 0 ? h - tinggiKepala(sk) - 2 * jarakBagian : 0;
  const tegak = w > 0 && h > w;
  const kolomMaks = layarPendek || (tataTumbuhan && tegak && n === 3) ? 2 : n;
  // Deret angka pendek tetap satu baris agar urutan dibaca dari kiri ke kanan.
  const sel = tataAngkaRingkas
    ? selMuat(lebarDalam, n, 44, hitungLega ? 222 : 168, gap)
    : tataTumbuhHewan ? selMuat(lebarDalam, n, 86 * sk, hewanTabletTegak ? 320 : 182, gap, 0, undefined, n, hewanHp || hewanTabletTegak ? 2 : n)
    : selMuat(lebarDalam, n, 84 * sk, (w >= 600 ? (tataTumbuhan ? 340 : 300) : 230) * sk, gap, tinggi * 0.5 - 2 * pad, 0.75, 2, kolomMaks);
  const rasio = tegak ? 1.6 : 1.15;
  const isiLebar = tegak ? 0.68 : 0.6;
  // Di HP pendek, slot bernomor berjajar supaya kartu sumber tetap bisa dibaca dalam dua kolom.
  const barisSlot = layarPendek || bandingPilot || tataTumbuhHewan ? 1 : sel.baris;
  const jarakSlot = layarPendek || hewanHp ? 6 : gap;
  const lebarSlot = bandingPilot ? Math.floor((w - 24 - gap * (n - 1)) / n)
    : hewanTabletTegak ? Math.min(215, Math.floor((lebarDalam - jarakSlot * (n - 1)) / n))
    : layarPendek || hewanHp ? Math.floor((w - 18 - jarakSlot * (n - 1)) / n) : sel.s;
  const selaBarisSlot = gap * (barisSlot - 1);
  const tinggiSlot = bandingPilot ? Math.min(w < 600 ? 84 : 150, lebarSlot * 0.85) : hitungLega ? batas(148, lebarSlot * 0.9, 200)
    : hitungLegaHp ? batas(92, lebarSlot, 138)
    : tataAngkaRingkas ? batas(58, lebarSlot * 0.82, 138)
    : tataTumbuhHewan ? batas(58, lebarSlot * 0.76, 148)
    : layarPendek ? batas(52, lebarSlot, 60)
    : tataTumbuhan
    ? batas(82, Math.min(sel.s * 1.18, (tinggi * 0.51 - selaBarisSlot) / sel.baris), 290)
    : batas((bandingRingkas ? 60 : 96) * sk, Math.min(sel.s * rasio, (tinggi * 0.55 - 2 * pad - selaBarisSlot) / sel.baris), tataTunas ? 240 : 400);
  // benda berskala (mis. planet besar) dibagi skala terbesarnya supaya tidak meluap dari kartu/slot
  const skalaMaks = Math.max(1, ...shown.map((x) => skalaLebar(visual(x, t))));
  const ukuran = (bandingPilot ? Math.min(lebarSlot * 0.74, tinggiSlot * 0.74) : tataAngkaRingkas ? Math.min(lebarSlot * 0.72, tinggiSlot * 0.76)
    : tataTumbuhHewan ? Math.min(tinggiSlot * (hewanHp ? 0.78 : 1), lebarSlot * 0.9)
    : layarPendek ? Math.min(tinggiSlot * 0.62, lebarSlot * 0.7)
    : tataTumbuhan
    ? Math.min(tinggiSlot * 0.74, sel.s * 0.74, 190)
    : batas(base * sk, Math.min(tinggiSlot * 0.6, sel.s * isiLebar), 170)) / skalaMaks;
  const tinggiKartu = (tinggi * 0.45 - 2 * pad - selaBarisSlot) / sel.baris;
  const padat = sel.baris >= 2 && shown.some((x) => t(x.labelKey).length > 50);
  const barisSumber = Math.max(1, Math.ceil(sisa.length / Math.ceil(n / sel.baris)));
  const lebarKartu = bandingPilot ? (Math.min(w, 920) - 32 - gap) / 2 : tataTumbuhan && sisa.length === 1 ? Math.min(Math.max(100, w - 32), Math.max(sel.s, w >= 600 ? 330 : 162)) : sel.s;
  const sisaTinggi = tinggi - tinggiSlot * barisSlot - selaBarisSlot;
  const tinggiMinKartu = bandingPilot ? Math.max(110, Math.min(w < 600 ? 200 : 250, (h - tinggiSlot - 200 - 3 * gap) / Math.ceil(n / 2))) : tataAngkaRingkas ? tinggiSlot
    : hewanTabletTegak ? batas(172, (h - tinggiSlot - 112 - gap) / sel.baris, 252)
    : tataTumbuhHewan ? batas(104, lebarKartu * 0.92, 174)
    : tataTumbuhan
    ? batas(layarPendek ? 70 : 86, Math.min((sisaTinggi - gap * (barisSumber - 1)) / barisSumber, lebarKartu * 1.24), w >= 600 ? 340 : layarPendek ? 162 : 226)
    : tataTunas ? batas(84 * sk, Math.min(tinggiKartu, sel.s * (tegak ? 1.12 : 0.9)), 220)
      : bandingRingkas ? batas(69 * sk, Math.min(tinggiKartu, sel.s), 140)
      : bandingPanjang && !tegak ? batas(84 * sk, Math.min(tinggiKartu, sel.s * 0.78), 170 * sk)
      : tegak ? batas(84 * sk, Math.min(tinggiKartu, sel.s * 1.6), 400) : 84 * sk;
  const ukuranKartu = bandingPilot ? Math.max(42, Math.min(tinggiMinKartu - (w < 600 ? 70 : 86), lebarKartu / 1.5, 180)) / skalaMaks : tataAngkaRingkas ? ukuran : (tataTumbuhan
    ? Math.min(tinggiMinKartu * (layarPendek ? 0.56 : 0.64), lebarKartu * 0.76, 186)
    : batas((padat || sel.baris >= 3 ? 36 : base + 8) * sk, Math.min(tinggiKartu * (padat ? 0.24 : 0.5), sel.s * (tegak ? 0.68 : 0.58)), 160)) / skalaMaks;
  // Label organ memakai lebar kartu sehingga gambar sumber dapat mendekati ukuran gambar di slot.
  const ukuranSumber = hewanTabletTegak ? Math.min((lebarKartu - 20) / skalaMaks, tinggiMinKartu - 60, 196)
    : tataTumbuhHewan ? Math.min(lebarKartu / 1.6, tinggiMinKartu - (hewanHpPendek ? 59 : hewanHp ? 46 : 58), 116)
    : tataPencernaan ? Math.max(ukuranKartu, Math.min(ukuran, 48 * sk)) : ukuranKartu;
  // Tugas membandingkan panjang memakai skala gambar yang sama sebelum dan sesudah dipindahkan.
  const ukuranPanjang = bandingPanjang ? Math.min(
    Math.min(lebarSlot, lebarKartu) * 0.86 / skalaMaks,
    tinggiSlot - 20 * sk,
    tinggiMinKartu - (bandingRingkas ? 34 : 48) * sk,
    150,
  ) : undefined;
  const lebarRak = bandingPilot || hewanTabletTegak ? Math.min(w, 920) : sel.blok ? sel.blok + 8 * sk : undefined;

  const judul = <Kepala judul={t(ronde.titleKey)} onBantu={bantu} kunci={kunci} />;
  const petunjuk = tataRingkas && !tataTumbuhHewan && (
    <button
      type="button"
      onClick={() => ucapkan(caraSusun, inggris ? "en-US" : "id-ID")}
      className={`mx-auto flex min-h-11 max-w-full shrink-0 items-center gap-2 rounded-xl bg-white px-3 py-1.5 text-left font-extrabold active:scale-95 ${layarPendek ? "text-xs" : "text-sm"} ${tataTunas ? "-mt-2" : ""}`}
    >
      <span aria-hidden className="flex shrink-0" style={{ color: tema.aksen }}><Icon name="volume_up" size={layarPendek ? 16 : 20} /></span>
      <span>{caraSusun}</span>
    </button>
  );

  return (
    <div onPointerMove={geserKartu} onPointerUp={selesaiSeret} onPointerCancel={() => { gerakan.current = null; setBayanganSeret(null); }} data-urut-tengah={hitungLega || hitungLegaHp || tataTumbuhHewan ? "" : undefined} className={`flex flex-col ${layarRapat || hewanHpPendek ? "gap-2" : "gap-3"} ${tataRingkas ? "mx-auto w-full max-w-[920px] px-1 pt-1 pb-2" : ""} ${tataTunas || tataAngkaRingkas || bandingPilot || tataTumbuhHewan ? "" : "flex-1"}`} style={{ color: INK }}>
      {tataTumbuhan ? (
        <div ref={kepalaTumbuhan} className="flex shrink-0 flex-col gap-1">
          {judul}
          <p className={`m-0 text-center font-extrabold text-[var(--pilar-tua)] ${layarPendek ? "text-sm" : "text-base"}`} style={{ fontFamily: NUNITO }}>
            {correct.map((id) => BAGIAN_TUMBUHAN[inggris ? "en" : "id"][id] ?? t(langkah(id).labelKey)).join(" → ")}
          </p>
          {petunjuk}
        </div>
      ) : <>{judul}{petunjuk}</>}

      {/* slot bernomor di rak bertema dunia */}
      <div className={`mx-auto flex w-full justify-center ${layarPendek || tataAngkaRingkas || tataTumbuhHewan ? "flex-nowrap" : "flex-wrap"} ${tataRingkas ? "shrink-0 items-stretch" : "content-center items-center"}`} style={{ ...gayaRak(tema, sk), gap: jarakSlot, rowGap: tataTunas ? Math.max(gap, 16 * sk) : gap, paddingTop: (tataTumbuhan || tataTumbuhHewan ? 0 : bandingRingkas ? 8 : tataTunas || tataAngkaRingkas ? 14 : 18) * sk, maxWidth: layarPendek || hewanHp ? undefined : lebarRak, flex: tataRingkas ? undefined : "11 1 0%" }}>
        {slot.map((id, i) => {
          const benar = kunci && id === correct[i];
          const salah = kunci && id !== correct[i];
          const disorot = hint?.slot === i;
          const siap = !!terpilih && !id && !kunci;
          const ring = benar ? BENAR : salah ? SALAH : disorot ? SOROT : siap ? WARNA_PILIH : tema.wadahGelap;
          return (
            <button
              key={i}
              ref={(el) => { tujuan.current[i] = el; }}
              type="button"
              onClick={() => ketukSlot(i)}
              disabled={kunci}
              aria-label={id ? `Slot ${i + 1}: ${labelAkses(langkah(id))}` : `Slot ${i + 1}`}
              className={`relative flex flex-col items-center justify-center gap-1 p-1.5 transition-transform active:scale-95 ${salah ? "akademi-shake" : ""} ${disorot && !tataTumbuhan ? "akademi-bounce" : ""}`}
              style={{
                width: lebarSlot,
                minHeight: tinggiSlot,
                paddingTop: tataTumbuhan ? (layarPendek ? 20 : 27) * sk : tataTumbuhHewan ? hewanHp ? 18 : 24 : undefined,
                borderRadius: (layarPendek ? 13 : 20) * sk,
                ...gayaLubang(!!id, ring, benar ? "#e6f8ef" : salah ? "#ffe9ec" : undefined),
                boxShadow: siap ? "inset 0 4px 10px rgba(0,0,0,.14), 0 0 0 3px #fff" : gayaLubang(!!id, ring).boxShadow,
              }}
            >
              <span className={`absolute ${layarRapat || tataTumbuhHewan ? "pointer-events-none left-1 top-1" : tataTumbuhan ? "pointer-events-none top-1.5 left-1.5" : tataAngkaRingkas ? "pointer-events-none -left-0.5 -top-2" : "-top-3 -left-1"}`}>
                <Nomor n={i + 1} ringkas={tataTumbuhan || tataAngkaRingkas} padat={layarRapat || tataTumbuhHewan || (tataAngkaRingkas && lebarSlot < 66)} warna={benar ? BENAR : salah ? SALAH : undefined} />
              </span>
              {id ? (
                <Benda v={visual(langkah(id), t)} size={ukuranPanjang ?? ukuran} className="pointer-events-none" />
              ) : (
                <span style={{ fontFamily: BALOO, fontSize: Math.max((layarPendek ? 20 : 30) * sk, ukuran * skalaMaks * 0.55), fontWeight: 900, color: siap ? WARNA_PILIH : tema.wadahGelap, lineHeight: 1 }}>?</span>
              )}
            </button>
          );
        })}
      </div>

      {/* kartu langkah yang belum dipakai */}
      <div className={`mx-auto flex w-full justify-center ${tataAngkaRingkas ? "flex-nowrap" : "flex-wrap"} ${tataRingkas ? "shrink-0 items-stretch" : "content-center items-center"}`} style={{ ...gayaPanel(tema, sk), gap, minHeight: tataAngkaRingkas ? tinggiMinKartu + 8 * sk : tataTunas ? tinggiMinKartu : tataTumbuhan || tataTumbuhHewan ? undefined : 100 * sk, maxWidth: lebarRak, flex: tataRingkas ? undefined : "9 1 0%" }}>
        {sisa.map((s) => {
          const dipilih = terpilih === s.id;
          const disorot = hint?.kartu === s.id;
          return (
            <KartuBenda
              penuh
              key={s.id}
              v={visual(s, t)}
              size={ukuranPanjang ?? ukuranSumber}
              ariaLabel={bandingPanjang ? labelAkses(s) : undefined}
              labelPenuh={tataBunyi || tataPencernaan || tataTumbuhHewan}
              labelSize={layarRapat ? 12 : batas(14 * sk, lebarKartu * 0.07, 22)}
              selected={dipilih}
              onClick={(e) => { if (e.detail !== 0 && abaikanKlik.current) return; ketukKartu(s.id); }}
              onPointerDown={kalenderPilot ? (e) => mulaiSeret(e, s.id) : undefined}
              className={layarRapat ? "p-1.5!" : disorot && !tataTumbuhan ? "akademi-bounce" : ""}
              style={{
                touchAction: kalenderPilot ? "none" : undefined,
                width: lebarKartu,
                minHeight: tinggiMinKartu,
                ...(tataTumbuhan ? sorotKartuUrutan(dipilih, disorot) : { boxShadow: disorot ? BAYANG_SOROT : undefined }),
                pointerEvents: kunci ? "none" : undefined,
              }}
            />
          );
        })}
      </div>
      {bayanganSeret && <div aria-hidden className="pointer-events-none fixed z-50 rounded-xl border-2 border-[#0786eb] bg-white px-4 py-3 font-extrabold shadow-lg" style={{ left: bayanganSeret.x, top: bayanganSeret.y, transform: "translate(-50%, -50%)" }}>{t(langkah(bayanganSeret.id).labelKey)}</div>}
    </div>
  );
}

/* ---------------- mode perbaiki ---------------- */

function Perbaiki({ paket, ronde, t, onJawab, onHint, hasil }: Props) {
  const { shown, correct, swapped } = ronde;
  const [urutan, setUrutan] = useState<string[]>(() => shown.map((s) => s.id));
  const [terpilih, setTerpilih] = useState<string | null>(null);
  const [tukar, setTukar] = useState(0);
  const [hint, setHint] = useState<string | null>(null);
  const [terkirim, setTerkirim] = useState(false);
  const tataTumbuhan = paket.id === "sains-perbaiki-tumbuhan-utuh";
  const tanamanTumbuh = paket.id === "sains-perbaiki-tanaman-tumbuh";
  const kartuPencernaan = paket.id === "sd5-sains-jalan-makanan-perbaiki";
  const tataTumbuhHewan = urutanTumbuhHewan(paket);
  const kartuSiklusHewan = paket.id === "sd3-sains-perbaiki-siklus-hidup-air" || paket.id === "sd3-sains-perbaiki-siklus-hidup-kebun";
  const tataGerbong = paket.id === "sd1-mat-gerbong-urut-0-20";
  const kartuTumbuhan = tataTumbuhan || tanamanTumbuh;
  const inggris = (kartuTumbuhan || tataGerbong) && t(paket.instructionKey) === paket.locale.en?.[paket.instructionKey];
  const kunci = !!hasil || terkirim;
  const langkah = (id: string) => shown.find((s) => s.id === id)!;

  useEffect(() => {
    setUrutan(shown.map((s) => s.id));
    setTerpilih(null);
    setTukar(0);
    setHint(null);
    setTerkirim(false);
  }, [ronde, shown]);

  const ketuk = (id: string) => {
    if (kunci) return;
    if (!terpilih) {
      sfx.tap();
      setTerpilih(id);
      return;
    }
    if (terpilih === id) {
      setTerpilih(null);
      return;
    }
    sfx.whoosh();
    setUrutan((u) => {
      const a = u.indexOf(terpilih), b = u.indexOf(id);
      const v = [...u];
      [v[a], v[b]] = [v[b], v[a]];
      return v;
    });
    setTukar((k) => k + 1);
    setTerpilih(null);
    setHint(null);
  };
  const selesai = () => {
    if (kunci) return;
    sfxAkademi.taruh();
    setTerkirim(true);
    onJawab(urutan);
  };
  const bantu = () => {
    if (kunci) return;
    onHint?.();
    // salah satu kartu yang tertukar (dari indeks shown), atau kartu pertama yang tidak di tempatnya
    const id = swapped ? shown[swapped[0]]?.id : undefined;
    const salahPosisi = urutan.find((v, i) => v !== correct[i]);
    setHint(id && urutan.indexOf(id) !== correct.indexOf(id) ? id : (salahPosisi ?? null));
  };

  const n = urutan.length;
  const { tema, skala: sk, w, h } = usePanggung();
  const hewanHp = tataTumbuhHewan && w < 600;
  const hewanTabletTegak = tataTumbuhHewan && tabletTegakTumbuh(w, h);
  const layarPendek = kartuTumbuhan && layarPendekUrutan(w, h);
  const tumbuhTablet = tanamanTumbuh && n === 4 && w >= 600 && h > w * 0.9;
  const aksiMenetap = !tataTumbuhan;
  const base = n <= 4 ? 64 : 52;
  const gap = tataGerbong ? 8 : Math.round((layarPendek ? 8 : 10) * sk);
  const pad = 12 * sk;
  const lebarDalam = w > 0 ? w - 2 * pad - 6 : 0;
  // Cadangkan ruang untuk judul dan petunjuk yang masing-masing bisa menjadi dua baris di HP pendek.
  const tinggi = layarPendek ? h - (aksiMenetap ? 92 : 174)
    : h > 0 ? h - tinggiKepala(sk) - (aksiMenetap ? 0 : 64 * Math.min(sk, 1.3)) - 2 * GAP_ROOT - 2 * pad - 44 * sk : 0;
  // kartu bertulisan kalimat ("15.15 mengerjakan PR"): sel minimal lebih lebar (2 kolom di HP) supaya hurufnya
  // tetap besar dan kata tidak perlu diperkecil/terpotong
  const teksSaja = urutan.every((id) => {
    const l = langkah(id);
    return !l.emoji && !l.shape && !((kartuTumbuhan || kartuPencernaan || kartuSiklusHewan) && l.adegan);
  });
  const kataPanjang = Math.max(0, ...urutan.flatMap((id) => t(langkah(id).labelKey).split(/\s+/).map((k) => k.length)));
  const duaKolom = layarPendek || tumbuhTablet;
  const sel = tataGerbong
    ? selMuat(lebarDalam, n, 36, 174, gap)
    : tataTumbuhHewan ? selMuat(lebarDalam, n, 86 * sk, hewanTabletTegak ? 320 : 182, gap, 0, undefined, n, hewanHp || hewanTabletTegak ? 2 : n)
    : selMuat(lebarDalam, n, (teksSaja && kataPanjang > 6 ? 132 : 84) * sk, (w >= 600 ? 300 : 240) * sk,
      gap, tinggi, undefined, tumbuhTablet ? 2 : n, duaKolom ? 2 : n);
  const tegak = w > 0 && h > w;
  const rasioKartu = tumbuhTablet ? 1.05 : tegak ? 1.9 : 1.2;
  const tinggiKartu = tataGerbong ? batas(68, sel.s * 0.78, 130)
    : hewanTabletTegak ? batas(194, Math.min(sel.s * 0.94, (h - 176 - gap * (sel.baris - 1)) / sel.baris), 286)
    : tataTumbuhHewan ? batas(104, sel.s * 1.06, 180)
    : batas((layarPendek ? 82 : 96) * sk, Math.min(sel.s * rasioKartu, (tinggi - gap * (sel.baris - 1)) / sel.baris), 420);
  const skalaMaks = Math.max(1, ...urutan.map((id) => skalaLebar(visual(langkah(id), t))));
  // Batas gambar mengikuti tinggi dan lebar kartu, dengan ruang untuk label yang panjang.
  const kalimatPanjang = sel.baris >= 3 || urutan.some((id) => t(langkah(id).labelKey).length > 50);
  const ukuran = (tataGerbong ? Math.min(tinggiKartu * 0.7, sel.s * 0.72)
    : hewanTabletTegak ? Math.min(sel.s - 20, (tinggiKartu - 96) * skalaMaks, 300)
    : tataTumbuhHewan ? Math.min(sel.s * 0.94, tinggiKartu - (hewanHp ? 42 : 54), 180)
    : tumbuhTablet ? Math.min(tinggiKartu * 0.83, sel.s * 0.88)
    : tanamanTumbuh && layarPendek ? Math.min(tinggiKartu * 0.67, sel.s * 0.8)
    : tataTumbuhan
    ? Math.min(tinggiKartu * 0.52, sel.s * 0.74, 186)
    : batas((kalimatPanjang ? 44 : base) * sk, Math.min(tinggiKartu * (kalimatPanjang ? 0.3 : 0.55), sel.s * (tegak ? 0.72 : 0.6)), 170)) / skalaMaks;

  return (
    <div data-urut-tengah={tataGerbong || tataTumbuhHewan ? "" : undefined} className={`flex flex-1 flex-col ${layarPendek ? "gap-2" : "gap-3"} ${tumbuhTablet ? "justify-center" : ""}`} style={{ color: INK }}>
      <Kepala judul={t(ronde.titleKey)} onBantu={bantu} kunci={kunci} />
      <div className={`flex flex-col items-center justify-center text-center ${tumbuhTablet ? "" : "flex-1"}`} style={{ ...gayaRak(tema, sk), gap: (layarPendek ? 8 : 14) * sk }}>
        {!(tanamanTumbuh && layarPendek) && (
          <div style={{ fontFamily: NUNITO, fontSize: (layarPendek ? 14 : 17) * Math.min(sk, 1.3), fontWeight: 800, color: "#14223a" }}>
            {tataGerbong
              ? (inggris ? "Tap two train cars to swap them." : "Ketuk dua gerbong untuk menukar tempatnya.")
              : (inggris ? "Tap two cards to swap their places." : "Ketuk dua kartu untuk menukar tempatnya")}
          </div>
        )}
        <div className={`mx-auto flex w-full justify-center ${tataGerbong ? "akademi-rel-gerbong" : "flex-wrap"}`} style={{ gap, maxWidth: sel.blok }}>
          {urutan.map((id, i) => {
            const benar = !!hasil && id === correct[i];
            const salah = !!hasil && id !== correct[i];
            const dipilih = terpilih === id;
            const disorot = hint === id;
            return (
              <div key={id} className={`relative flex justify-center ${tataGerbong ? "min-w-0" : ""}`} style={{ width: sel.s }}>
                <span className={`pointer-events-none absolute z-10 ${tataTumbuhan ? "top-1.5 left-1.5" : "top-1 left-1"}`}>
                  <Nomor n={i + 1} ringkas padat={layarPendek || !tataTumbuhan} warna={benar ? BENAR : salah ? SALAH : undefined} />
                </span>
                <KartuBenda
                  penuh
                  v={visual(langkah(id), t)}
                  ariaLabel={tataGerbong ? (inggris ? `Train car ${t(langkah(id).labelKey)}, position ${i + 1}` : `Gerbong nomor ${t(langkah(id).labelKey)}, posisi ${i + 1}`) : undefined}
                  size={ukuran}
                  labelPenuh={kartuPencernaan || tataTumbuhHewan}
                  labelSize={layarPendek ? 12 : batas(14 * sk, sel.s * (kalimatPanjang ? 0.076 : 0.115), 24)}
                  selected={dipilih}
                  right={benar}
                  wrong={salah}
                  onClick={() => ketuk(id)}
                  className={`w-full active:translate-y-0 ${tataGerbong ? "akademi-badan-gerbong" : ""} ${layarPendek ? "px-1.5! pb-1.5!" : ""} ${salah ? "akademi-shake" : ""}`}
                  style={{
                    minHeight: tinggiKartu,
                    paddingTop: tataGerbong ? 12 : tataTumbuhan ? (layarPendek ? 26 : 38) * sk : 24,
                    background: benar ? "#e6f8ef" : salah ? "#ffe9ec" : tataGerbong ? "#fff4d9" : undefined,
                    ...sorotKartuUrutan(!hasil && dipilih, !hasil && disorot),
                    pointerEvents: kunci ? "none" : undefined,
                  }}
                />
                {tataGerbong && <span aria-hidden className="akademi-roda-gerbong" />}
              </div>
            );
          })}
        </div>
      </div>
      <AksiBawah aktif={aksiMenetap}>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-white px-3 py-1 shadow-[0_3px_0_rgba(11,37,69,.1)]" style={{ fontFamily: BALOO, fontSize: 15 * Math.min(sk, 1.3), fontWeight: 800, color: INK }} aria-label={inggris ? (tukar === 1 ? "Swapped once" : `Swapped ${tukar} times`) : `Ditukar ${tukar} kali`}>
            🔁 {tukar}
          </span>
          <button
            type="button"
            onClick={selesai}
            disabled={kunci}
            className={`flex-1 rounded-[20px] bg-[#12803f] text-white shadow-[0_5px_0_#16804f] active:translate-y-1 disabled:opacity-60 ${layarPendek ? "py-2" : "py-4"}`}
            style={{ fontFamily: BALOO, fontSize: (layarPendek ? 18 : 22) * Math.min(sk, 1.3), fontWeight: 900, minHeight: (layarPendek ? 44 : 60) * Math.min(sk, 1.3) }}
          >
            {inggris ? "Done ✓" : "Sudah benar ✓"}
          </button>
        </div>
      </AksiBawah>
    </div>
  );
}

/* ---------------- mode dulu ---------------- */

function Dulu({ paket, ronde, t, onJawab, hasil }: Props) {
  const { shown, correct } = ronde;
  const [dipilih, setDipilih] = useState<string | null>(null);
  const kunci = !!hasil || dipilih !== null;
  const benarId = correct[0];

  useEffect(() => {
    setDipilih(null);
  }, [ronde]);

  const pilih = (id: string) => {
    if (kunci) return;
    sfx.tap();
    setDipilih(id);
    onJawab(id);
  };

  const { tema, skala: sk, w, h } = usePanggung();
  const adaJudul = !/^mana yang lebih dulu/i.test(t(ronde.titleKey));
  const gerakLega = paket.id === "sd2-sains-penyebab-gerak" && w >= 600 && h >= 650 && h >= w * 1.15;
  const bahanBaruLega = paket.id === "sd2-sains-mana-dulu-bahan-baru" && w >= 600 && h >= 650 && h >= w;
  const pilihanLega = gerakLega || bahanBaruLega;
  const panggungLuas = pilihanLega || (paket.level === "PAUD" && w >= 600 && h >= 460);
  const potretLuas = pilihanLega || (panggungLuas && h >= w * 1.15);
  const lebarMaks = potretLuas ? 680 : panggungLuas ? 920 : 800;
  const lebar = Math.min(w || 390, lebarMaks) - 8;
  const gap = Math.round(12 * sk);
  const tinggiSisa = h > 0 ? h - (adaJudul ? tinggiKepala(sk) + GAP_ROOT : 0) - 62 * Math.min(sk, 1.3) - GAP_ROOT - (pilihanLega ? 12 : 0) : 160;
  // Di potret tablet, dua kartu memanfaatkan tinggi layar dan tetap dekat dengan pertanyaan.
  const tumpuk = potretLuas || (lebar < 540 && tinggiSisa > lebar * 1.2);
  const lebarKartu = tumpuk ? lebar : (lebar - gap) / 2;
  const ruangKartu = tumpuk ? (tinggiSisa - gap) / 2 : Math.min(tinggiSisa, lebarKartu * (panggungLuas ? 1.2 : 1));
  const batasTinggi = panggungLuas ? (tumpuk ? 445 : 490) : (tumpuk ? 210 : 310);
  const tinggiKartu = batas(118 * sk, ruangKartu, batasTinggi);
  const skalaTerlebar = Math.max(1, ...shown.map(skalaLebar));
  const ruangLabel = panggungLuas ? 86 : 52;
  const ukuran = Math.round(Math.min(panggungLuas ? 340 : 196, tinggiKartu - ruangLabel, (lebarKartu - 24) / skalaTerlebar));

  return (
    <div data-urut-tengah={pilihanLega ? "" : undefined} className="mx-auto flex w-full flex-col gap-3 px-1 pb-2 pt-1" style={{ color: INK, maxWidth: lebarMaks }}>
      {/* judul kegiatan; dilewati bila paket memakai judul umum yang sama dengan pertanyaan di bawah */}
      {adaJudul && <Kepala judul={t(ronde.titleKey)} onBantu={() => {}} kunci={kunci} tanpaBantu />}
      <div className="rounded-[22px] bg-white px-4 py-3 text-center" style={{ fontFamily: BALOO, fontSize: 24 * Math.min(sk, 1.3), fontWeight: 900, lineHeight: 1.15, boxShadow: `0 4px 0 rgba(11,37,69,.1), inset 0 0 0 3px ${tema.aksen}33` }}>
        Mana yang lebih dulu?
      </div>
      <div className={`grid ${tumpuk ? "grid-cols-1" : "grid-cols-2"}`} style={{ gap, gridAutoRows: "1fr" }}>
        {shown.map((s) => {
          const benar = !!hasil && s.id === benarId;
          const salah = !!hasil && dipilih === s.id && s.id !== benarId;
          return (
            <KartuBenda
              penuh
              key={s.id}
              v={visual(s, t)}
              size={ukuran}
              label={t(s.labelKey)}
              labelSize={Math.round(18 * Math.min(Math.max(sk, ukuran / 110), 1.5))}
              selected={!hasil && dipilih === s.id}
              right={benar}
              wrong={salah}
              onClick={() => pilih(s.id)}
              className={`min-w-0 ${bahanBaruLega ? "" : salah ? "akademi-shake" : benar ? "akademi-pop" : ""}`}
              style={{ minHeight: tinggiKartu, background: benar ? "#e6f8ef" : salah ? "#ffe9ec" : undefined, pointerEvents: kunci ? "none" : undefined, boxShadow: `0 5px 0 rgba(11,37,69,.12), 0 0 0 3px ${benar ? BENAR : salah ? SALAH : !hasil && dipilih === s.id ? "#0786eb" : `${tema.aksen}55`}` }}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- mode label ---------------- */

/** Label = ikon + suara (bukan tulisan yang harus dibaca); kata dibacakan saat keping diketuk dan saat cerita. */
const LABEL: Record<LabelUrutan, { ikon: string; kata: string }> = {
  pertama: { ikon: "🥇", kata: KATA_URUTAN.pertama },
  lalu: { ikon: "➡️", kata: KATA_URUTAN.lalu },
  terakhir: { ikon: "🏁", kata: KATA_URUTAN.terakhir },
};
const URUTAN_LABEL: LabelUrutan[] = ["pertama", "lalu", "terakhir"];
const JEDA_ADEGAN = 1800;

function Label({ ronde, t, onJawab, onHint, hasil }: Props) {
  const { shown, labels: benar = [] } = ronde;
  const n = shown.length;
  const [slot, setSlot] = useState<(LabelUrutan | null)[]>(() => Array(n).fill(null));
  const [terpilih, setTerpilih] = useState<LabelUrutan | null>(null);
  const [cerita, setCerita] = useState<{ aktif: number; berhenti: number | null; selesai: boolean } | null>(null);
  const [hint, setHint] = useState<{ slot: number; label: LabelUrutan } | null>(null);
  const [terkirim, setTerkirim] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const kunci = !!hasil || terkirim || (!!cerita && !cerita.selesai);

  useEffect(() => {
    setSlot(Array(shown.length).fill(null));
    setTerpilih(null);
    setCerita(null);
    setHint(null);
    setTerkirim(false);
    const tm = timers.current;
    return () => { tm.forEach(clearTimeout); tm.length = 0; diamkan(); };
  }, [ronde, shown.length]);

  // jatah keping: pertama 1, lalu n−2, terakhir 1
  const jatah = (l: LabelUrutan) => (l === "lalu" ? Math.max(0, n - 2) : 1);
  const sisa = (l: LabelUrutan) => jatah(l) - slot.filter((s) => s === l).length;
  const lengkap = slot.every(Boolean);

  const ketukLabel = (l: LabelUrutan) => {
    if (kunci || sisa(l) <= 0) return;
    sfx.tap();
    ucapkan(LABEL[l].kata);
    setTerpilih((x) => (x === l ? null : l));
  };
  const ketukSlot = (i: number) => {
    if (kunci) return;
    if (slot[i]) {
      sfx.whoosh();
      setSlot((s) => s.map((v, k) => (k === i ? null : v)));
      setTerpilih(null);
      return;
    }
    if (!terpilih || sisa(terpilih) <= 0) return;
    sfxAkademi.taruh();
    setSlot((s) => s.map((v, k) => (k === i ? terpilih : v)));
    setTerpilih(null);
    if (hint?.slot === i) setHint(null);
  };
  const bantu = () => {
    if (kunci) return;
    onHint?.();
    const i = slot.findIndex((v, k) => v !== benar[k]);
    if (i >= 0 && benar[i]) { setHint({ slot: i, label: benar[i] }); ucapkan(kalimatUrutkan.hint(LABEL[benar[i]].kata)); }
  };

  /** Tokoh bercerita mengikuti label yang dipasang: "terakhir" sebelum gambar terakhir menghentikan cerita, sisanya meredup. */
  const ceritakan = () => {
    if (kunci || !lengkap) return;
    sfx.open();
    const labels = slot as LabelUrutan[];
    let berhenti: number | null = null;
    const adegan: number[] = [];
    for (let i = 0; i < n; i++) {
      adegan.push(i);
      if (labels[i] === "terakhir" && i < n - 1) { berhenti = i; break; }
    }
    adegan.forEach((i, k) => {
      timers.current.push(setTimeout(() => {
        setCerita({ aktif: i, berhenti: null, selesai: false });
        ucapkan(kalimatUrutkan.cerita(LABEL[labels[i]].kata, t(shown[i].labelKey)));
      }, k * JEDA_ADEGAN));
    });
    const akhir = adegan.length * JEDA_ADEGAN;
    timers.current.push(setTimeout(() => {
      setCerita({ aktif: -1, berhenti, selesai: true });
      if (berhenti !== null) { sfxAkademi.tolak(); ucapkan(KALIMAT_URUTKAN.berhenti); }
      else sfx.celebrate();
    }, akhir));
    timers.current.push(setTimeout(() => {
      setTerkirim(true);
      onJawab({ labels });
    }, akhir + (berhenti !== null ? 1600 : 700)));
  };

  const { tema, skala: sk, w, h } = usePanggung();
  const base = n <= 3 ? 72 : 60;
  const gap = Math.round(10 * sk);
  const pad = 12 * sk;
  const lebarDalam = w > 0 ? w - 2 * pad - 6 : 0;
  const tinggiSlot = 64 * Math.min(sk, 1.3);
  // sisa tinggi untuk kolom gambar+slot: panggung − judul − palet label − tombol cerita − jarak
  const tinggi = h > 0 ? h - tinggiKepala(sk) - 104 * Math.min(sk, 1.3) - 62 * Math.min(sk, 1.3) - 3 * GAP_ROOT - 2 * pad : 0;
  const sel = selMuat(lebarDalam, n, 92 * sk, (w >= 600 ? 240 : 150) * sk, gap);
  const tinggiKolom = (tinggi - gap * (sel.baris - 1)) / sel.baris;
  const tegak = w > 0 && h > w;
  const tinggiGambar = batas(108 * sk, Math.min(sel.s * (tegak ? 1.6 : 1.2), tinggiKolom - tinggiSlot - 8 * sk), 420);
  const ukuran = batas(base * sk, Math.min(tinggiGambar * 0.5, sel.s * (tegak ? 0.66 : 0.55)), 170);

  return (
    <div className="flex flex-1 flex-col gap-3" style={{ color: INK }}>
      <Kepala judul={t(ronde.titleKey)} onBantu={bantu} kunci={kunci} />

      {/* gambar berjajar + slot label di bawah tiap gambar, di rak bertema dunia */}
      <div className="flex flex-1 flex-wrap content-center items-start justify-center" style={{ ...gayaRak(tema, sk), gap }}>
        {shown.map((s, i) => {
          const l = slot[i];
          const aktif = cerita?.aktif === i;
          const redup = cerita?.selesai && cerita.berhenti !== null && i > cerita.berhenti;
          const benarKah = !!hasil && l === benar[i];
          const salahKah = !!hasil && l !== benar[i];
          const disorot = hint?.slot === i;
          const siap = !!terpilih && !l && !kunci;
          const ring = benarKah ? BENAR : salahKah ? SALAH : disorot ? SOROT : siap ? "#0786eb" : tema.wadahGelap;
          return (
            <div key={s.id} className="flex flex-col items-center gap-2 transition-opacity duration-700" style={{ width: sel.s, opacity: redup ? 0.3 : 1 }}>
              <KartuBenda
                penuh
                v={visual(s, t)}
                size={ukuran}
                label={t(s.labelKey)}
                labelSize={Math.round(Math.min(20, 13 * Math.max(sk, ukuran / 72)))}
                className={`w-full ${aktif ? "akademi-bounce" : ""}`}
                style={{ minHeight: tinggiGambar, boxShadow: aktif ? `0 4px 0 rgba(11,37,69,.12), 0 0 0 4px ${SOROT}` : undefined, pointerEvents: "none" }}
              />
              <button
                type="button"
                onClick={() => ketukSlot(i)}
                disabled={kunci}
                aria-label={`Label gambar ${i + 1}${l ? `: ${LABEL[l].kata}` : ", kosong"}`}
                className={`flex w-full items-center justify-center gap-1 transition-transform active:scale-95 ${salahKah ? "akademi-shake" : ""} ${disorot ? "akademi-bounce" : ""}`}
                style={{
                  minHeight: tinggiSlot,
                  borderRadius: 18 * sk,
                  ...gayaLubang(!!l, ring, benarKah ? "#e6f8ef" : salahKah ? "#ffe9ec" : undefined),
                  boxShadow: siap ? "inset 0 4px 10px rgba(0,0,0,.14), 0 0 0 3px #fff" : gayaLubang(!!l, ring).boxShadow,
                }}
              >
                {l ? (
                  <>
                    <span style={{ fontSize: 30 * Math.min(sk, 1.3), lineHeight: 1 }} aria-hidden>{LABEL[l].ikon}</span>
                    <span style={{ fontFamily: BALOO, fontSize: 15 * Math.min(sk, 1.3), fontWeight: 800, color: INK }}>{LABEL[l].kata}</span>
                  </>
                ) : (
                  <span style={{ fontFamily: BALOO, fontSize: 26 * Math.min(sk, 1.3), fontWeight: 900, lineHeight: 1, color: siap ? "#0786eb" : tema.wadahGelap }}>?</span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* palet label: ikon + suara */}
      <div className="mx-auto grid w-full max-w-[460px] grid-cols-3" style={{ ...gayaPanel(tema, sk), padding: 8 * sk, gap: 8 * sk }} role="group" aria-label="Keping label">
        {URUTAN_LABEL.map((l) => {
          const tersisa = sisa(l);
          const dipilih = terpilih === l;
          const disorot = hint?.label === l;
          return (
            <button
              key={l}
              type="button"
              onClick={() => ketukLabel(l)}
              disabled={kunci || tersisa <= 0}
              aria-label={`Label ${LABEL[l].kata}, sisa ${tersisa}`}
              className={`relative flex min-w-0 flex-col items-center justify-center gap-0.5 rounded-[18px] bg-white px-1.5 transition-transform active:scale-95 disabled:opacity-40 ${disorot ? "akademi-bounce" : ""}`}
              style={{
                minHeight: 80 * Math.min(sk, 1.3),
                boxShadow: `0 4px 0 rgba(11,37,69,.12), 0 0 0 3px ${dipilih ? "#0786eb" : disorot ? SOROT : `${tema.aksen}55`}`,
              }}
            >
              <span style={{ fontSize: 34 * Math.min(sk, 1.3), lineHeight: 1 }} aria-hidden>{LABEL[l].ikon}</span>
              <span style={{ fontFamily: BALOO, fontSize: 14 * Math.min(sk, 1.3), fontWeight: 800, color: INK }}>{LABEL[l].kata}</span>
              {jatah(l) > 1 && <span className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full text-white" style={{ background: "#0786eb", fontFamily: BALOO, fontSize: 12, fontWeight: 900, boxShadow: "0 0 0 2px #fff" }}>{tersisa}</span>}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={ceritakan}
        disabled={kunci || !lengkap}
        className="flex items-center justify-center gap-2 rounded-[20px] bg-[#12803f] py-3 text-white shadow-[0_5px_0_#16804f] active:translate-y-1 disabled:opacity-60"
        style={{ fontFamily: BALOO, fontSize: 22 * Math.min(sk, 1.3), fontWeight: 900, minHeight: 60 * Math.min(sk, 1.3) }}
      >
        {cerita && !cerita.selesai ? <><Icon name="volume_up" size={26} /> Robot bercerita…</> : <>Ceritakan <Icon name="play_arrow" size={28} /></>}
      </button>
    </div>
  );
}
