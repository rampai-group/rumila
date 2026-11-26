"use client";

// Dunia 2D "Kebun & Pasar": latar semua aktivitas Slice 1. Langit → kebun → lapak pasar, digambar CSS + emoji.
// Satu komponen latar + kerangka layar aktivitas (header kembali, progres ronde, tombol dengar instruksi).

import { useRouter } from "next/navigation";
import type { ContentPack } from "@akademi/schema";
import type { Ronde, RondeNavigasi } from "@akademi/mechanics";
import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { PILAR, TEMA, temaBersih, type BentukWadah, type DuniaId, type Pilar, type Tema } from "@/lib/akademi/tema-dunia";
import { Icon } from "@/components/ui";
import { diamkan } from "@/lib/akademi/suara";
import { PUJIAN, PUJIAN_BERUNTUN, SEMANGAT, acakKata } from "@/lib/sfx-akademi";
import { BALOO, GARIS, GARIS_BAWAH, INK, NUNITO } from "./jenis";
import { SlotBantuProvider } from "./mode-ujian";

/**
 * Tablet: layar permainan dirancang selebar HP–960 px, jadi di tablet besar (mis. 13", 1280×800) isinya kecil dan
 * banyak ruang kosong. Lebar viewport diatur ulang supaya peramban sendiri yang memperbesar halaman; koordinat
 * sentuh, drag, dan elemen fixed tetap konsisten (berbeda dengan CSS zoom/transform). HP dan desktop tidak berubah.
 */
export function viewportTablet(layar: { w: number; h: number }, landscape: boolean, tinggiTerlihat = 0): string | null {
  const w = landscape ? Math.max(layar.w, layar.h) : Math.min(layar.w, layar.h);
  const tinggiLayar = landscape ? Math.min(layar.w, layar.h) : Math.max(layar.w, layar.h);
  if (Math.min(w, tinggiLayar) < 600) return null;
  // yang dipakai tinggi terlihat: bilah tab & alamat Safari mengambil ±130 px di iPad miring
  const h = tinggiTerlihat > 0 ? Math.min(tinggiLayar, tinggiTerlihat) : tinggiLayar;
  // patokan desain: landscape ±960×700, potret ±720×1000 CSS px. Patokan lama (900×620) menyisakan ±400 px untuk
  // isi soal sesudah kepala + bilah status, sehingga tombol jawab terdorong ke bawah layar di iPad miring.
  const skala = landscape ? Math.min(w / 960, h / 700, 1.6) : Math.min(w / 720, h / 1000, 1.6);
  if (skala <= 1.05) return null;
  const lebar = Math.round(w / skala);
  return `width=${lebar}, initial-scale=${(w / lebar).toFixed(3)}, viewport-fit=cover`;
}

/**
 * Pembesaran hanya untuk jendela selebar layar. Di Split View / Slide Over / Stage Manager jendelanya lebih sempit,
 * jadi viewport selebar layar akan memotong permainan ke samping. lebarJendela 0 = tidak diketahui (anggap penuh).
 */
export function jendelaPenuh(layar: { w: number; h: number }, lebarJendela: number): boolean {
  return !lebarJendela || Math.abs(lebarJendela - layar.w) < 24 || Math.abs(lebarJendela - layar.h) < 24;
}

/** Tinggi jendela dalam px layar, dikonversi dari ukuran viewport yang sudah diskalakan. */
function tinggiTerlihat(layar: { w: number; h: number }, landscape: boolean): number {
  if (!window.innerWidth) return 0;
  const lebarLayar = landscape ? Math.max(layar.w, layar.h) : Math.min(layar.w, layar.h);
  return Math.round((window.innerHeight * lebarLayar) / window.innerWidth);
}

function useSkalaTablet() {
  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>('meta[name="viewport"]');
    if (!meta) return;
    const asli = meta.content;
    // ukuran layar fisik (CSS px); jendela awal dipakai bila screen.* lebih kecil (mis. WebView/emulator)
    const layar = { w: Math.max(window.screen.width, window.innerWidth), h: Math.max(window.screen.height, window.innerHeight) };
    let terakhir: { landscape: boolean; penuh: boolean; tinggi: number } | undefined;
    const atur = () => {
      const landscape = window.matchMedia("(orientation: landscape)").matches;
      const penuh = jendelaPenuh(layar, window.outerWidth);
      const tinggi = tinggiTerlihat(layar, landscape);
      // Menulis meta viewport memicu resize. Pembulatan WebKit bisa mengubah tinggi hasil konversi sedikit saja.
      if (terakhir && terakhir.landscape === landscape && terakhir.penuh === penuh && Math.abs(terakhir.tinggi - tinggi) <= 2) return;
      terakhir = { landscape, penuh, tinggi };
      const isi = penuh ? viewportTablet(layar, landscape, tinggi) : null;
      const baru = isi ?? asli;
      if (meta.content !== baru) meta.content = baru;
    };
    atur();
    window.addEventListener("orientationchange", atur);
    window.addEventListener("resize", atur); // Split View & Stage Manager tidak mengirim orientationchange
    return () => {
      window.removeEventListener("orientationchange", atur);
      window.removeEventListener("resize", atur);
      meta.content = asli;
    };
  }, []);
}

function ruangPanahGulir(panggung: HTMLElement): number {
  const panah = panggung.parentElement?.querySelector<HTMLElement>("[data-gulir-lagi]");
  return panah ? panah.offsetHeight + (parseFloat(getComputedStyle(panah).marginTop) || 0) : 0;
}

/**
 * Jendela sempit (Slide Over, HP): sebagian soal lebih tinggi dari panggung. Anak diberi tombol panah selama masih ada
 * isi di bawah, supaya tombol jawab di ujung bawah tetap ketemu. Hilang begitu sampai bawah.
 */
function GulirLagi({ wadah }: { wadah: React.RefObject<HTMLDivElement | null> }) {
  const [arah, setArah] = useState<"bawah" | "atas" | null>(null);
  useEffect(() => {
    const el = wadah.current;
    if (!el) return;
    let tunggu = 0;
    const cek = () => {
      cancelAnimationFrame(tunggu);
      tunggu = requestAnimationFrame(() => {
        const ruang = el.scrollHeight - el.clientHeight;
        // Jangan pertahankan panah kalau isi akan muat setelah ruang tombolnya dikembalikan.
        setArah(ruang <= ruangPanahGulir(el) + 12 ? null : ruang - el.scrollTop > 12 ? "bawah" : "atas");
      });
    };
    const ro = new ResizeObserver(cek);
    const amati = () => {
      ro.disconnect();
      ro.observe(el);
      for (const anak of el.children) ro.observe(anak);
      cek();
    };
    const mo = new MutationObserver(amati);
    mo.observe(el, { childList: true, subtree: true });
    amati();
    el.addEventListener("scroll", cek, { passive: true });
    return () => {
      cancelAnimationFrame(tunggu);
      ro.disconnect();
      mo.disconnect();
      el.removeEventListener("scroll", cek);
    };
  }, [wadah]);
  if (!arah) return null;
  return (
    <button
      type="button"
      data-gulir-lagi
      aria-label={arah === "bawah" ? "Lihat ke bawah" : "Kembali ke atas soal"}
      onClick={() => {
        const el = wadah.current;
        if (!el) return;
        el.scrollTo({ top: arah === "bawah" ? el.scrollTop + el.clientHeight * 0.8 : 0, behavior: "smooth" });
      }}
      className="mx-auto mt-1 flex h-8 min-w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#0b2545] shadow-[0_2px_0_rgba(11,37,69,.16)] active:scale-95"
    >
      <Icon name={arah === "bawah" ? "expand_more" : "expand_less"} size={23} />
    </button>
  );
}

const SlotAksi = createContext<HTMLElement | null>(null);

/** Jaga aksi utama tetap terlihat ketika permainan harus digulir. */
export function AksiBawah({ aktif = true, children }: { aktif?: boolean; children: ReactNode }) {
  const slot = useContext(SlotAksi);
  return aktif && slot ? createPortal(children, slot) : children;
}

/** Kerangka layar aktivitas: kembali · judul & progres · instruksi (bisa diputar ulang) · isi. */
/**
 * Panggung = area isi di bawah instruksi. Presenter membaca ukurannya untuk membesarkan kartu/wadah di layar lebar
 * dan tema untuk bentuk wadah. `skala` 1 di HP, naik sampai 1,6 di tablet/desktop yang luas.
 */
export interface Panggung { tema: Tema; w: number; h: number; skala: number; /** emoji petak rintangan soal robot */ rintangan: string }
const PanggungCtx = createContext<Panggung>({ tema: TEMA.kebun, w: 0, h: 0, skala: 1, rintangan: "🌳" });
export const usePanggung = () => useContext(PanggungCtx);

/** Skala isi dari ukuran panggung; patokan desain ±880×500 px. */
export function skalaPanggung(w: number, h: number): number {
  if (!w || !h) return 1;
  return Math.round(Math.max(1, Math.min(1.6, w / 880, h / 500)) * 100) / 100;
}

export function urutanAngkaRingkas(paket: ContentPack): boolean {
  return paket.competencyIds.includes("MAT.TKB.BILANGAN-20.03") ||
    paket.competencyIds.includes("MAT.SD1.BILANGAN-100.03") ||
    paket.id === "sd1-mat-loncat-sepuluh";
}

export function navigasiSatuBaris(ronde: RondeNavigasi): boolean {
  return ronde.execMode === "program" && ronde.grids.length === 1 && ronde.grids[0].h === 1 &&
    !ronde.debug && !ronde.commands.includes("bendera") && ronde.commands.length <= 3;
}

export function panggungPadat(paket: ContentPack, ronde?: Ronde): boolean {
  return paket.mechanic === "pilah" ||
    (paket.mechanic === "navigasi" && (paket.execMode === "langsung" ||
      (ronde?.mechanic === "navigasi" && navigasiSatuBaris(ronde.ronde)))) ||
    (paket.mechanic === "dagang" && (paket.mode === "subitasi" || (paket.mode === "lengkapi" && paket.level === "TKB"))) ||
    (paket.mechanic === "urutkan" && (paket.mode === "dulu" || urutanAngkaRingkas(paket) || (paket.level === "PAUD" && (paket.mode ?? "susun") === "susun"))) ||
    (paket.mechanic === "pola" && paket.level === "PAUD") ||
    (paket.mechanic === "simulasi" && (paket.mode === "bantuan" || paket.mode === "turus" || (paket.mode === "tombol" && paket.level === "PAUD")));
}

const useIsoLayout = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function LayarAktivitas({
  judul, ronde, percobaan = 0, total, instruksi, onUcap, children, kembaliKe = "/akademi", dunia = "kebun", wadah, rintangan = "🌳", musik, pilar = PILAR.MAT, padat = false,
}: {
  /** warna pilar pelajaran: latar layar lembut + aksen aktif (progres, kartu terpilih, wadah tujuan) */
  pilar?: Pilar;
  judul: string; ronde: number; percobaan?: number; total: number; instruksi: string; onUcap: () => void; children: ReactNode; kembaliKe?: string; dunia?: DuniaId;
  /** bentuk wadah yang disebut paket (mis. "rak"); kosong = bawaan dunia */
  wadah?: BentukWadah;
  /** emoji rintangan soal robot (mis. 🗄️ bila soal menyebut rak) */
  rintangan?: string;
  /** backsound: tombol musik nyala/mati di kepala layar (kosong = tanpa tombol, mis. ujian) */
  musik?: { nyala: boolean; alih: () => void };
  /** Ukuran panel mengikuti isi, tetap dapat digulir jika lebih tinggi dari ruang layar. */
  padat?: boolean;
}) {
  const router = useRouter();
  useSkalaTablet();
  // Layar soal bergaya bersih: dunia tidak lagi digambar di belakang soal (cukup di pembuka & layar selesai);
  // panel & wadah putih, aksen = warna pilar.
  const tema = temaBersih(wadah ? { ...TEMA[dunia], wadah } : TEMA[dunia], pilar);
  const ruangPanggungRef = useRef<HTMLDivElement>(null);
  const panggungRef = useRef<HTMLDivElement>(null);
  const [ukuran, setUkuran] = useState({ w: 0, h: 0 });
  useIsoLayout(() => {
    const panggung = panggungRef.current;
    if (panggung) panggung.scrollTop = 0;
  }, [ronde, percobaan]);
  useIsoLayout(() => {
    const el = panggungRef.current;
    const ruang = ruangPanggungRef.current;
    if (!el || !ruang) return;
    const ukur = () => {
      const w = el.clientWidth;
      // Ukur sebelum ruang panah diambil agar kartu tidak berganti ukuran saat panah tampil/hilang.
      // Panel padat memakai tinggi wadah luar karena panelnya mengikuti ukuran kartu.
      const h = padat ? Math.max(0, ruang.clientHeight - 12) : el.clientHeight + ruangPanahGulir(el);
      setUkuran((u) => (u.w === w && u.h === h ? u : { w, h }));
    };
    ukur();
    const ro = new ResizeObserver(ukur);
    ro.observe(el);
    if (padat) ro.observe(ruang);
    return () => ro.disconnect();
  }, [padat]);
  const panggung: Panggung = { tema, w: ukuran.w, h: ukuran.h, skala: skalaPanggung(ukuran.w, ukuran.h), rintangan };
  const [slotBantu, setSlotBantu] = useState<HTMLElement | null>(null);
  const [slotAksi, setSlotAksi] = useState<HTMLElement | null>(null);
  // Tombol kembali: hentikan suara dulu (ketukan pertama di HP bisa membuka ucapan yang tertahan),
  // lalu kembali lewat riwayat bila datang dari aplikasi ini (instan dari cache), selain itu ke kembaliKe.
  const kembali = () => {
    diamkan();
    const dariSini = typeof document !== "undefined" && document.referrer.startsWith(location.origin);
    if (dariSini && window.history.length > 1) router.back();
    else router.push(kembaliKe);
  };
  const kotakIkon = { boxShadow: `0 0 0 2px ${GARIS}, 0 4px 0 ${GARIS_BAWAH}` };
  return (
    <div
      className="relative min-h-dvh"
      style={{ fontFamily: NUNITO, color: INK, background: `linear-gradient(180deg,${pilar.warna},${pilar.tua})`, ["--pilar" as string]: pilar.warna, ["--pilar-tua" as string]: pilar.tua, ["--pilar-dasar" as string]: pilar.dasar } as React.CSSProperties}
    >
      <div
        className="relative mx-auto flex h-dvh max-w-[1100px] flex-col gap-2 px-3 sm:px-6"
        style={{ paddingTop: "max(12px, env(safe-area-inset-top))", paddingBottom: "max(14px, env(safe-area-inset-bottom))" }}
      >
        <header className="flex items-center gap-2">
          <button type="button" onClick={kembali} aria-label="Kembali" className="flex size-11 shrink-0 items-center justify-center rounded-[14px] bg-white active:translate-y-0.5" style={{ ...kotakIkon, color: INK }}>
            <Icon name="arrow_back" size={24} />
          </button>
          <h1
            className="m-0 hidden min-w-0 max-w-[48%] shrink-0 overflow-hidden leading-[1.05] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] px-1 [@media(min-width:760px)_and_(max-height:820px)]:[display:-webkit-box]"
            style={{ fontFamily: BALOO, fontSize: 21, fontWeight: 800, lineHeight: 1.4, color: "#fff" }}
          >
            {judul}
          </h1>
          <div
            className="h-3.5 min-w-0 flex-1 overflow-hidden rounded-full"
            style={{ background: "rgba(0,0,0,.28)" }}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={ronde}
            aria-label={`Ronde ${ronde} dari ${total}`}
          >
            <div className="h-full rounded-full transition-[width] duration-500" style={{ width: `${Math.max(6, (ronde / Math.max(1, total)) * 100)}%`, background: "#fdb724", boxShadow: "inset 0 -4px 0 rgba(0,0,0,.14)" }} />
          </div>
          {musik && (
            <button
              type="button"
              onClick={musik.alih}
              aria-label={musik.nyala ? "Matikan musik" : "Nyalakan musik"}
              aria-pressed={musik.nyala}
              className="flex size-11 shrink-0 items-center justify-center rounded-[14px] bg-white active:translate-y-0.5"
              style={{ ...kotakIkon, color: musik.nyala ? pilar.warna : "#7a8599" }}
            >
              <Icon name={musik.nyala ? "music_note" : "music_off"} size={22} />
            </button>
          )}
          {/* tombol Bantu presenter dipasang ke sini (lihat bantu.tsx) */}
          <div ref={setSlotBantu} className="flex shrink-0 empty:hidden" />
        </header>
        {/* layar miring pendek: judul pindah ke baris kepala supaya panggung dapat tambahan tinggi */}
        <div className="[@media(min-width:760px)_and_(max-height:820px)]:hidden">
          <h1 className="m-0 px-0.5" style={{ fontFamily: BALOO, fontSize: 22, fontWeight: 800, lineHeight: 1.2, color: "#fff", textWrap: "balance", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {judul}
          </h1>
        </div>
        <Instruksi teks={instruksi} onUcap={onUcap} />
        <div ref={ruangPanggungRef} className="akademi-ruang-panggung flex min-h-0 flex-1 flex-col">
          <div className={`relative flex min-h-0 flex-col rounded-[26px] p-1.5 ${padat ? "" : "flex-1"}`} style={{ background: pilar.dasar }}>
            <div ref={panggungRef} className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden scroll-auto [overflow-anchor:none]" data-panggung>
              <PanggungCtx.Provider value={panggung}>
                <SlotAksi.Provider value={slotAksi}>
                  <SlotBantuProvider value={slotBantu}>{children}</SlotBantuProvider>
                </SlotAksi.Provider>
              </PanggungCtx.Provider>
            </div>
            <GulirLagi wadah={panggungRef} />
            <div ref={setSlotAksi} className="mt-1.5 shrink-0 pb-1 empty:hidden" data-aksi-bawah />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Kartu instruksi: ikon suara + teks (Nunito, gaya `pr-body` brand). Instruksi panjang dilipat jadi 2 baris supaya
 * papan permainan tetap lega; ketuk "Lengkap" untuk membuka. Ketuk teks/ikon = dengarkan.
 */
function Instruksi({ teks, onUcap }: { teks: string; onUcap: () => void }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [buka, setBuka] = useState(false);
  const [terpotong, setTerpotong] = useState(false);
  useEffect(() => setBuka(false), [teks]);
  useIsoLayout(() => {
    const el = ref.current;
    if (!el) return;
    const cek = () => setTerpotong(el.scrollHeight > el.clientHeight + 2);
    cek();
    const ro = new ResizeObserver(cek);
    ro.observe(el);
    return () => ro.disconnect();
  }, [teks, buka]);
  return (
    <div className="flex items-start gap-2.5 px-0.5">
      <button type="button" onClick={onUcap} aria-label="Dengarkan instruksi" className="flex size-11 shrink-0 items-center justify-center rounded-full text-[#0b2545] active:scale-95" style={{ background: "#fdb724", boxShadow: "0 3px 0 #c98a00" }}>
        <Icon name="volume_up" size={20} />
      </button>
      <span
        ref={ref}
        onClick={onUcap}
        className="min-w-0 flex-1 cursor-pointer self-center"
        style={{
          fontFamily: NUNITO, fontSize: 16.5, fontWeight: 800, color: "#fff", lineHeight: "22px", textWrap: "pretty",
          ...(buka ? {} : { display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }),
        }}
      >
        {teks}
      </span>
      {(terpotong || buka) && (
        <button
          type="button"
          onClick={() => setBuka((b) => !b)}
          aria-expanded={buka}
          aria-label={buka ? "Ringkas instruksi" : "Baca instruksi lengkap"}
          className="flex size-11 shrink-0 items-center justify-center self-center rounded-full bg-white active:scale-95"
          style={{ color: "var(--pilar)", boxShadow: `0 0 0 2px ${GARIS}` }}
        >
          <Icon name={buka ? "expand_less" : "expand_more"} size={22} />
        </button>
      )}
    </div>
  );
}

/** Stiker umpan balik besar di tengah layar (benar / coba lagi). */
const WARNA_KONFETI = ["#ffd23f", "#fd861d", "#22b573", "#0786eb", "#ff5a6e", "#b197fc"];

/** Ledakan konfeti kecil dari tengah layar (posisi & warna acak, dibuat sekali per tampil). */
function Konfeti({ jumlah }: { jumlah: number }) {
  const [potong] = useState(() =>
    Array.from({ length: jumlah }, (_, i) => {
      const sudut = (i / jumlah) * Math.PI * 2 + Math.random() * 0.4;
      const jauh = 120 + Math.random() * 160;
      return { dx: Math.cos(sudut) * jauh, dy: Math.sin(sudut) * jauh - 60, r: Math.random() * 540 - 270, w: 7 + Math.random() * 7, h: 10 + Math.random() * 8, warna: WARNA_KONFETI[i % WARNA_KONFETI.length], t: 750 + Math.random() * 450 };
    }),
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {potong.map((p, i) => (
        <span key={i} className="akademi-konfeti" style={{ width: p.w, height: p.h, background: p.warna, ["--dx" as string]: `${p.dx}px`, ["--dy" as string]: `${p.dy}px`, ["--r" as string]: `${p.r}deg`, ["--t" as string]: `${p.t}ms` } as React.CSSProperties} />
      ))}
    </div>
  );
}

/** Umpan balik setelah menjawab: pujian/penyemangat diacak, konfeti saat benar (lebih meriah bila beruntun). */
/** Salah → ajakan coba lagi (soal diulang sampai benar); mulai salah kedua (`pakaiBantu`) → arahkan ke tombol Bantu. */
export function UmpanBalik({ benar, beruntun = 1, pakaiBantu: lanjut = false }: { benar: boolean; beruntun?: number; pakaiBantu?: boolean }) {
  const [teks] = useState(() => (benar ? acakKata(beruntun >= 3 ? PUJIAN_BERUNTUN : PUJIAN) : lanjut ? "Coba lagi, pakai Bantu ya" : acakKata(SEMANGAT)));
  const [ikon] = useState(() => (benar ? acakKata(beruntun >= 3 ? ["🔥", "🏆", "🚀"] : ["🌟", "⭐", "🎉", "👏", "😄"]) : lanjut ? "💡" : acakKata(["💪", "🙂", "🤔"])));
  return (
    <div className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center">
      {benar && <Konfeti jumlah={beruntun >= 3 ? 34 : 20} />}
      <div
        className="akademi-pop flex flex-col items-center rounded-[28px] px-8 py-5 text-white"
        style={{ background: benar ? "#22b573" : lanjut ? "#e0a100" : "#ff8a5c", boxShadow: `0 6px 0 ${benar ? "#16804f" : lanjut ? "#a87600" : "#d4622f"}` }}
      >
        <span className={benar ? "akademi-bintang" : "akademi-goyang"} style={{ fontSize: 64, lineHeight: 1, display: "inline-block" }}>{ikon}</span>
        <span style={{ fontFamily: BALOO, fontSize: 26, fontWeight: 900 }}>{teks}</span>
        {benar && beruntun >= 3 && <span style={{ fontFamily: BALOO, fontSize: 15, fontWeight: 800, opacity: 0.9 }}>{beruntun} benar berturut-turut</span>}
      </div>
    </div>
  );
}

/** Hujan konfeti dari atas (layar selesai). */
export function HujanKonfeti({ jumlah = 40 }: { jumlah?: number }) {
  const [potong] = useState(() =>
    Array.from({ length: jumlah }, (_, i) => ({ x: Math.random() * 100, dx: Math.random() * 120 - 60, r: Math.random() * 720 - 360, w: 7 + Math.random() * 7, h: 10 + Math.random() * 9, warna: WARNA_KONFETI[i % WARNA_KONFETI.length], t: 2.2 + Math.random() * 1.6, d: Math.random() * 1.2 })),
  );
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {potong.map((p, i) => (
        <span key={i} className="akademi-hujan" style={{ left: `${p.x}%`, width: p.w, height: p.h, background: p.warna, ["--dx" as string]: `${p.dx}px`, ["--r" as string]: `${p.r}deg`, ["--t" as string]: `${p.t}s`, ["--d" as string]: `${p.d}s` } as React.CSSProperties} />
      ))}
    </div>
  );
}
