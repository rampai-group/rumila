"use client";

// Presenter mekanik "pilah": kelompok (ketuk/seret item ke bin) dan pilih (sentuh satu pilihan benar).
// Hanya menampilkan ronde dan mengirim jawaban; penilaian oleh runner (lihat docs/akademi/slice-1-kontrak.md §4).

import { bentukDariTeks } from "@/lib/akademi/tema-dunia";
import { sfxAkademi } from "@/lib/sfx-akademi";
import { useEffect, useRef, useState, type PointerEvent as RPointerEvent } from "react";
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
  const { tema, skala: sk, w } = usePanggung();
  const hp = w > 0 && w < 600;

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
  const salah = (i: ItemPilah) => kunci && peta[i.id] !== i.bin;
  const benarBin = (b: BinPilah) => kunci && items.some((i) => peta[i.id] === b.id) && items.filter((i) => peta[i.id] === b.id).every((i) => i.bin === b.id);
  const n = bins.length;
  // HP dengan ≥ 4 wadah, atau 3 wadah bernama panjang ("mamalia (berambut, menyusui)"): wadah disusun per baris
  // (label kiri, isi kanan) — kolom selebar ±100 px membuat nama & ciri terlipat per kata.
  const baris = hp && (n >= 4 || (n === 3 && bins.some((b) => t(b.labelKey).length > 9)));
  const jarakBin = (baris ? 10 : 12) * sk;
  const kapasitasKolom = Math.max(1, Math.floor(((w || 390) + jarakBin) / Math.min(148, 114 * sk + jarakBin)));
  const kolomBin = baris ? 1 : Math.ceil(n / Math.ceil(n / kapasitasKolom));
  const itemSeret = seret?.aktif ? items.find((i) => i.id === seret.id) : undefined;
  // kartu bergambar berlabel panjang (deskripsi) dibuat lebih lebar supaya teksnya tidak terlipat terlalu banyak
  const lebarKartu = Math.round((items.some((i) => visualBergambar(i) && t(i.labelKey).length > 18) ? 132 : hp ? 92 : 96) * sk);
  const gambarKartu = Math.round((hp ? 50 : 60) * sk);

  return (
    <div className="flex flex-1 flex-col gap-3" style={{ color: INK }}>
      {/* tombol Bantu dipasang ke kepala layar (portal), tidak memakan baris */}
      <TombolBantu onClick={bantu} disabled={kunci} />
      {/* item yang belum dipilah */}
      {/* kartu langsung di atas latar layar (tanpa panel pembungkus: satu lapis kartu) */}
      <div className="relative" style={{ minHeight: 84 * sk }}>
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${lebarKartu}px, 1fr))`, gridAutoRows: "1fr" }}>
          {lepasDiAtas.map((i) => {
            const dipilih = terpilih === i.id;
            const disorot = hint?.item === i.id;
            const sedangDiseret = seret?.aktif && seret.id === i.id;
            return (
              // pointer capture di tombol; move/up menggelembung ke pembungkus ini
              <div key={i.id} className="flex min-w-0" onPointerMove={(e) => gerak(e, i.id)} onPointerUp={(e) => lepas(e, i.id)} onPointerCancel={batal}>
                <KartuBenda
                  penuh
                  v={visual(i, t)}
                  size={Math.min(gambarKartu, (lebarKartu - 16) / skalaLebar(i))}
                  labelSize={Math.round(14 * Math.min(sk, 1.3))}
                  selected={dipilih}
                  disabled={kunci}
                  onClick={(e) => {
                    if (e.detail !== 0 && abaikanKlikSeret.current) return;
                    if (bacaLabel) ucapkan(t(i.labelKey), lang);
                    ketukItem(i.id);
                  }}
                  onPointerDown={(e) => turun(e, i.id)}
                  className={`w-full touch-none select-none ${disorot ? "akademi-bounce" : ""}`}
                  style={{
                    minHeight: 76 * sk,
                    minWidth: 76 * sk,
                    opacity: sedangDiseret ? 0.25 : 1,
                    boxShadow: disorot ? `0 4px 0 rgba(11,37,69,.12), 0 0 0 4px ${SOROT}` : undefined,
                    zIndex: dipilih ? 2 : undefined,
                  }}
                />
              </div>
            );
          })}
          {lepasDiAtas.length === 0 && (
            <div className="col-span-full flex h-[76px] items-center justify-center" style={{ fontFamily: BALOO, fontSize: 20, fontWeight: 800, opacity: 0.6 }}>
              Semua sudah dipilah
            </div>
          )}
        </div>
      </div>

      {/* wadah berjajar, mengisi sisa tinggi panggung */}
      <div className="grid flex-1" style={{ gap: jarakBin, gridTemplateColumns: `repeat(${kolomBin}, minmax(0,1fr))`, gridAutoRows: baris ? "minmax(0,1fr)" : undefined }}>
        {bins.map((b) => {
          const isi = items.filter((i) => peta[i.id] === b.id);
          const hover = seret?.binHover === b.id;
          const disorot = hint?.bin === b.id;
          const hijau = benarBin(b);
          const siap = !!terpilih && !kunci;
          const ring = hijau ? BENAR : hover ? "#ffd23f" : disorot ? SOROT : siap ? "rgba(255,255,255,.85)" : "transparent";
          return (
            <Wadah
              key={b.id}
              ref={(el) => {
                binRefs.current[b.id] = el;
              }}
              onClick={() => ketukBin(b.id)}
              className={`${hover ? "scale-[1.04]" : ""} ${disorot ? "akademi-bounce" : ""}`}
              style={{ minHeight: (baris ? 72 : 132) * sk }}
              arah={baris ? "baris" : "kolom"}
              minIsi={baris ? 48 : 56}
              ring={ring}
              hijau={hijau}
              warnaKategori={b.color}
              bentuk={bentukDariTeks(t(b.labelKey)) ?? undefined}
              label={
                // gambar hanya bila wadah bergambar; wadah teks/angka cukup labelnya (dulu tertulis dua kali: "11 11")
                <button type="button" disabled={kunci} onClick={(e) => { e.stopPropagation(); ketukBin(b.id); }} className="w-full min-w-0 rounded-md py-1 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0786eb]">
                  <LabelWadah teks={t(b.labelKey)} rata={baris && w >= 360 && t(b.labelKey).length <= 18 ? "kiri" : "tengah"} gambar={visualBergambar(b) ? <Benda v={visual(b, t)} size={Math.round((baris ? 30 : 32) * sk) / skalaLebar(b)} /> : undefined} />
                </button>
              }
            >
              {isi.map((i) => (
                <KartuBenda
                  key={i.id}
                  v={visual(i, t)}
                  size={Math.round((visualBergambar(i) ? 34 : 50) * sk) / skalaLebar(i)}
                  keterangan={false}
                  ariaLabel={lang === "en-US" ? `Remove ${t(i.labelKey)} from ${t(b.labelKey)}` : `Ambil ${t(i.labelKey)} dari ${t(b.labelKey)}`}
                  disabled={kunci}
                  wrong={salah(i)}
                  right={kunci && !salah(i)}
                  onClick={(e) => { e.stopPropagation(); ambil(i.id); }}
                  className={`shrink-0 ${salah(i) ? "akademi-shake" : ""}`}
                  style={{ minHeight: 46 * sk, minWidth: 46 * sk, maxWidth: "100%", pointerEvents: kunci ? "none" : undefined }}
                />
              ))}
              {isi.length === 0 && <span aria-hidden className="w-full text-center" style={{ fontFamily: BALOO, fontSize: (baris ? 24 : 30) * sk, fontWeight: 900, lineHeight: 1, color: tema.wadahGelap, opacity: 0.7 }}>{baris ? "+" : "↓"}</span>}
            </Wadah>
          );
        })}
      </div>

      {/* di-portal ke body: leluhur ber-transform/filter membuat "fixed" melenceng dari jari */}
      {itemSeret && seret && typeof document !== "undefined" && createPortal(
        <div className="pointer-events-none fixed z-[100]" style={{ left: seret.x, top: seret.y, transform: "translate(-50%,-60%) scale(1.15)" }}>
          <span className="flex items-center justify-center rounded-[18px] bg-white p-2" style={{ boxShadow: `0 8px 0 rgba(11,37,69,.18), 0 0 0 3px ${UNGU}` }}>
            <Benda v={visual(itemSeret, t)} size={64} />
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
  const kunci = !!hasil || dipilih !== null;
  const { skala: sk, h, w } = usePanggung();

  useEffect(() => {
    setDipilih(null);
    setRedup(null);
  }, [ronde]);

  // Soal tiap ronde dibacakan (anak PAUD–TK belum membaca). Ronde pertama: tunggu instruksi aktivitas selesai dulu.
  const soal = t(promptKey);
  const fungsi = /^(def [^:]+: return .+?)\. (Berapa|What is) (.+)\?$/.exec(soal);
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
  // gambar pilihan ikut tinggi kartu: di tablet kartu tinggi, jadi emoji kecil di tengah kartu besar terasa kosong
  // …tapi tidak boleh lebih lebar dari kartunya: di HP tinggi (2 kolom sempit) bola berskala besar sempat terpotong
  const lebar = typeof window !== "undefined" && window.innerWidth >= 640;
  const muat = n === 2 ? 2 : n === 3 ? 3 : n === 4 ? (lebar ? 4 : 2) : lebar ? 3 : 2;
  // layar tegak: 4 pilihan jadi 2×2, 3 pilihan berkalimat ditumpuk — bukan kolom sempit dengan ruang kosong atas-bawah
  const berkalimat = choices.some((c) => {
    const p = t(c.labelKey).length;
    return visualBergambar(c) ? tulisLabel && p > 24 : p > 12;
  });
  const jmlKolom =
    n === 3 && w > 0 && (h > w * 1.5 || ((berkalimat || pilihanTulisan) && h > w * 1.1)) ? 1
      : n === 4 ? kolomTerbaik(w, h - 90 * sk, n, muat, 14 * sk)
        : muat;
  // baris mengikuti kolom yang benar-benar tampil (di bawah 640 px kisinya 2 kolom), kalau tidak kartu jadi separuh tinggi
  const baris = Math.ceil(n / jmlKolom);
  const tinggiBaris = h > 0 ? (h - 90 * sk - 14 * sk * (baris - 1)) / baris : 0;
  const lebarKartu = w > 0 ? (w - 14 * sk * (jmlKolom - 1)) / jmlKolom : Infinity;
  const skalaMaks = Math.max(1, ...choices.map(skalaLebar));
  // gambar + kalimat panjang: gambar mengalah dan kartu boleh lebih tinggi supaya kalimatnya tetap di dalam kartu
  const labelPanjang = tulisLabel && choices.some((c) => visualBergambar(c) && t(c.labelKey).length > 34);
  const ukuran = Math.round(Math.min(200, Math.max((n <= 2 ? 110 : n <= 4 ? 92 : 76) * sk, tinggiBaris * (tulisLabel ? 0.4 : 0.5)), (lebarKartu * (labelPanjang ? 0.55 : 0.8)) / skalaMaks));

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-3" style={{ color: INK }}>
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1 px-1 py-1 text-center" style={{ fontFamily: BALOO, fontSize: 24 * Math.min(sk, 1.3), fontWeight: 800, lineHeight: 1.15, color: "var(--pilar-tua)" }}>
          <button type="button" onClick={() => ucapkan(soal, lang)} className="min-h-11 w-full whitespace-pre-line [overflow-wrap:anywhere]" aria-label="Dengarkan soal">
            {fungsi ? (
              <span className="flex min-w-0 flex-col gap-1">
                <code className="rounded-lg bg-white/75 px-1 py-2 text-[clamp(13px,3.8vw,20px)]">{fungsi[1]}</code>
                <span>{lang === "en-US" ? "What is the result?" : "Berapa hasilnya?"}</span>
                <code className="rounded-lg bg-white/75 px-1 py-2 text-[clamp(13px,3.8vw,20px)]">{fungsi[3]}</code>
              </span>
            ) : soal}
          </button>
          {ronde.adegan && <div className="mt-1 flex justify-center"><GambarAdegan adegan={ronde.adegan} s={Math.max(60, Math.min(100, h * 0.18))} /></div>}
        </div>
        <TombolBantu onClick={bantu} disabled={kunci} />
      </div>
      {/* pilihan mengisi sisa panggung: kartu besar di tablet, tetap rapat di HP. Pilihan tulisan diberi warna menurut posisi;
          pilihan bergambar/berwarna tetap putih supaya warna bendanya tidak tertukar dengan warna kartu */}
      <div
        className="my-auto grid w-full flex-1"
        style={{
          gap: 14 * sk, gridTemplateColumns: `repeat(${jmlKolom}, minmax(0, 1fr))`, gridAutoRows: sk > 1 ? `minmax(${Math.round(120 * sk)}px, 1fr)` : undefined,
          // layar tegak: kartu jangan jadi kolom tinggi kosong; maksimal ±1,5× lebarnya, kelompok di tengah panggung
          maxHeight: Number.isFinite(lebarKartu) ? baris * Math.max(170 * sk, lebarKartu * (labelPanjang ? 2.1 : 1.5)) + 14 * sk * (baris - 1) : undefined,
        }}
      >
        {choices.map((c, i) => {
          const benar = !!hasil && c.id === correct;
          const salah = !!hasil && dipilih === c.id && c.id !== correct;
          const nama = namaPilihan(c, choices, t, lang === "en-US");
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
              className={`min-h-[120px] min-w-0 ${ronde.bacaPilihan ? "w-full flex-1" : ""} ${salah ? "akademi-shake" : ""} ${benar ? "akademi-pop" : ""}`}
              style={{ background: benar ? "#8fe6b6" : salah ? "#ffc08a" : pilihanTulisan ? WARNA_PILIHAN[i % WARNA_PILIHAN.length] : undefined, pointerEvents: kunci ? "none" : undefined }}
            />
          );
          if (!ronde.bacaPilihan) return kartu;
          return (
            <div key={c.id} className="flex min-w-0 flex-col gap-1">
              {kartu}
              <button type="button" onClick={() => ucapkan(t(c.altKey ?? c.labelKey), lang)} aria-label={lang === "en-US" ? `Listen to option ${i + 1}` : `Dengarkan pilihan ${i + 1}`} className="flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-white px-2 text-sm font-extrabold text-[#0567c2]">
                <Icon name="volume_up" size={20} />
                {lang === "en-US" ? "Listen" : "Dengar"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
