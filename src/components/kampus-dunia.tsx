"use client";

// Beranda = Kampus RINOYA dalam satu layar, tanpa digulir. Gambarnya render 3D (scripts/kampus-render) dalam tiga
// denah: HP tegak, tablet tegak, dan mendatar. Gambar ditempatkan supaya bagian "aman" (semua gedung + gerbang)
// selalu utuh di ruang antara kepala dan dok bawah; laut, hutan, dan jalan mengisi sisa layar.
// Wilayah ketuk mengikuti bentuk tiap gedung dari kampus-peta.generated.ts.

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { JendelaKartuPelajar } from "@/components/akademi/kartu-pelajar";
import { keteranganGedung, useGedungKampus, useKelasHariIni, useLab } from "@/components/kampus";
import { PETA_KAMPUS } from "@/components/kampus-peta.generated";
import { useLastTool } from "@/components/kid";
import { AppIcon, BALOO } from "@/components/launcher";
import { useOpenTool } from "@/components/shell";
import { Icon } from "@/components/ui";
import { letakkanKampus, type LetakKampus } from "@/lib/kampus-letak";
import { GEDUNG, type GedungId } from "@/lib/kampus";
import { can, useUI, type Member } from "@/lib/store";
import "./kampus.css";

const INK = "#0b2545";

type TempatId = "utama" | GedungId | "kantor" | "pos";

interface Tempat {
  id: TempatId;
  nama: string;
  ket: string;
  /** tujuan; tanpa href = aksi (onPilih) */
  href?: string;
  onPilih?: () => void;
  /** pesan bila belum dibuka */
  tutup?: string;
}

export function KampusDunia({ me }: { me: Member }) {
  const router = useRouter();
  const showToast = useUI((s) => s.showToast);
  const openTool = useOpenTool();
  const terakhir = useLastTool();
  const kelas = can(me, "edukasi");
  const info = useKelasHariIni(me);
  const daftar = useGedungKampus(me);
  const lab = useLab(me);
  const ruang = useRef<HTMLDivElement>(null);
  const [letak, setLetak] = useState<LetakKampus | null>(null);
  const [kartu, setKartu] = useState(false);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const dok = kelas || !!terakhir;

  useEffect(() => {
    const el = ruang.current;
    if (!el) return;
    const ukur = () => {
      if (el.clientWidth && el.clientHeight) setLetak(letakkanKampus({ x: el.offsetLeft, y: el.offsetTop, w: el.clientWidth, h: el.clientHeight }));
    };
    ukur();
    const ro = new ResizeObserver(ukur);
    ro.observe(el);
    return () => ro.disconnect();
  }, [dok]);

  const tempat: Tempat[] = [
    {
      id: "utama",
      nama: "Gedung Utama",
      ket: "Academy · Ruang Kelas",
      href: "/akademi",
      tutup: kelas ? undefined : "Ruang Kelas belum dibuka. Minta ayah atau ibu membukanya, ya.",
    },
    ...GEDUNG.map((g): Tempat => {
      const ada = daftar.find((d) => d.g.id === g.id);
      const terbuka = ada ? ada.isi.filter((t) => lab(t.id).terbuka).length : 0;
      return {
        id: g.id,
        nama: g.nama,
        ket: ada ? keteranganGedung(g, ada.isi.length, terbuka) : "Segera dibuka",
        href: g.href,
        tutup: ada ? undefined : `${g.nama} belum dibuka. Minta ayah atau ibu membukanya, ya.`,
      };
    }),
    { id: "kantor", nama: "Kantor Guru", ket: "Rapor", href: "/akademi/rapor", tutup: kelas ? undefined : "Kantor Guru dibuka bersama Ruang Kelas." },
    { id: "pos", nama: "Pos Satpam", ket: "Kartu Pelajar", onPilih: () => setKartu(true), tutup: kelas ? undefined : "Kartu Pelajar dibuka bersama Ruang Kelas." },
  ];

  const masuk = (t: Tempat) => {
    if (t.tutup) return showToast(t.tutup);
    if (t.onPilih) return t.onPilih();
    const href = t.href;
    if (!href) return;
    if (!letak || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return router.push(href);
    // berjalan masuk: kamera menukik ke pintu gedung, lalu halaman gedung dibuka
    const [x, y, w, h] = PETA_KAMPUS[letak.denah].tempat[t.id].kotak;
    setZoom({ x: letak.x + (x + w / 2) * letak.w, y: letak.y + (y + h * 0.72) * letak.h });
    router.prefetch(href);
    window.setTimeout(() => router.push(href), 430);
  };

  const peta = letak && PETA_KAMPUS[letak.denah];

  return (
    <>
      <section aria-label="Kampus RINOYA" className="kd-layar" data-dok={dok || undefined}>
        <div className="kd-kamera absolute inset-0" style={zoom ? { transformOrigin: `${zoom.x}px ${zoom.y}px`, transform: "scale(2.6)", opacity: 0.15 } : undefined}>
          {letak && peta && (
            <div data-denah={letak.denah} className="absolute" style={{ left: letak.x, top: letak.y, width: letak.w, height: letak.h }}>
              {/* render statis sudah dikompres; next/image tidak menambah apa-apa */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img key={letak.denah} src={`/kampus/${letak.denah}.webp`} alt="" draggable={false} className="kd-foto block h-full w-full max-w-none select-none" />
              {tempat.map((t) => {
                const { kotak, bentuk } = peta.tempat[t.id];
                const [x, y, w, h] = kotak;
                const gaya: CSSProperties = { left: `${x * 100}%`, top: `${y * 100}%`, width: `${w * 100}%`, height: `${h * 100}%` };
                // bentuk gedung dalam koordinat kotaknya sendiri
                const potong = `polygon(${bentuk.map(([a, b]) => `${(((a - x) / w) * 100).toFixed(2)}% ${(((b - y) / h) * 100).toFixed(2)}%`).join(",")})`;
                return (
                  <button
                    key={t.id}
                    type="button"
                    data-tempat={t.id}
                    onClick={() => masuk(t)}
                    aria-label={`${t.nama}: ${t.ket}${t.tutup ? ", belum dibuka" : ""}`}
                    className={`kd-tempat absolute ${t.tutup ? "kd-tutup" : ""}`}
                    style={gaya}
                  >
                    <span className="kd-bentuk absolute inset-0" style={{ clipPath: potong, WebkitClipPath: potong }} />
                    {t.tutup && (
                      <span className="pointer-events-none absolute left-1/2 flex size-8 -translate-1/2 items-center justify-center rounded-full border-2 border-white bg-[#5b6b85] text-white shadow-[0_2px_0_rgba(11,37,69,.2)]" style={{ top: t.id === "utama" ? "42%" : "27%" }}>
                        <Icon name="lock" size={17} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ruang bebas di antara kepala dan dok: seluruh kampus harus muat di sini */}
        <div ref={ruang} aria-hidden className="kd-ruang" />

        <Papan info={info} />

        {dok && (
          <div className="kd-dok">
            {kelas && (
              <button type="button" onClick={() => masuk(tempat[0])} className="kd-misi min-w-0 flex-1">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white">
                  <Icon name={info.tugas.ikon} size={26} />
                </span>
                <span className="min-w-0 flex-1 text-left">
                  <span className="block truncate text-[17px] leading-tight" style={{ fontFamily: BALOO, fontWeight: 800 }}>
                    {info.tugas.judul}
                  </span>
                  <span className="block truncate text-[12.5px] leading-tight font-extrabold">{info.tugas.sub}</span>
                </span>
              </button>
            )}
            {terakhir && (
              <button type="button" onClick={() => openTool(terakhir)} aria-label={`Lanjut main ${terakhir.name}`} className="kd-lanjut">
                <AppIcon t={terakhir} size={42} theme="playful" />
                <span className="text-left text-[12px] leading-tight font-extrabold" style={{ color: INK }}>
                  Lanjut
                  <br />
                  main
                </span>
              </button>
            )}
          </div>
        )}
      </section>
      {kartu && <JendelaKartuPelajar me={me} level={info.level} onTutup={() => setKartu(false)} />}
    </>
  );
}

/** Papan jenjang di langit: semester, progres, pangkat. */
function Papan({ info }: { info: ReturnType<typeof useKelasHariIni> }) {
  return (
    <div className="kd-papan">
      <span className="flex flex-col">
        <span className="leading-tight whitespace-nowrap" style={{ fontFamily: BALOO, fontSize: 14, fontWeight: 800, color: INK }}>
          Semester {info.semester}
        </span>
        <span className="mt-1 block h-1.5 w-[104px] overflow-hidden rounded-full bg-[#d9e4f1]" aria-label={`Semester ${info.semester}: ${info.persen}%`}>
          <span className="block h-full rounded-full bg-[#0786eb]" style={{ width: `${Math.max(4, info.persen)}%` }} />
        </span>
      </span>
      <span className="rounded-[10px] bg-[#fdb724] px-2 py-0.5 text-center text-[11px] leading-tight font-extrabold text-[#0b2545]">
        Pangkat
        <span className="block text-[12px]">{info.lv.pangkat}</span>
      </span>
    </div>
  );
}
