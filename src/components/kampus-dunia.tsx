"use client";

// Beranda = satu lingkungan Kampus RINOYA yang utuh. Anak masuk lewat gerbang di bawah, berjalan di jalan
// kampus, lalu mengetuk gedung untuk masuk: Gedung Utama (Academy / Ruang Kelas), Laboratorium 3D,
// Lab Komputer, Taman Bermain, Mushola, Kantor Guru (Rapor), dan Pos Satpam (Kartu Pelajar).
// Dua tata letak dengan koordinat sendiri: potret (HP) dan lanskap (tablet/desktop). Gedung digambar dengan
// SVG kode yang sama dengan halaman gedung; posisinya dihitung dari koordinat viewBox medan.

import { useRouter } from "next/navigation";
import { useState, type CSSProperties, type ReactNode } from "react";
import { JendelaKartuPelajar } from "@/components/akademi/kartu-pelajar";
import { GedungUtama, IlustrasiGedung, KantorGuru, PosSatpam, RASIO_GEDUNG } from "@/components/kampus-gedung";
import { keteranganGedung, useGedungKampus, useKelasHariIni, useLab } from "@/components/kampus";
import { BALOO } from "@/components/launcher";
import { Icon } from "@/components/ui";
import { GEDUNG, type GedungId } from "@/lib/kampus";
import { can, useUI, type Member } from "@/lib/store";
import "./kampus.css";

const INK = "#0b2545";

type TempatId = "utama" | GedungId | "kantor" | "pos";
/** [kiri, alas (garis tanah), lebar] dalam koordinat viewBox medan */
type Letak = Record<TempatId, [number, number, number]>;

const RASIO: Record<TempatId, number> = {
  utama: RASIO_GEDUNG.utama,
  lab: RASIO_GEDUNG.biasa,
  komputer: RASIO_GEDUNG.biasa,
  taman: RASIO_GEDUNG.biasa,
  musala: RASIO_GEDUNG.biasa,
  kantor: RASIO_GEDUNG.kecil,
  pos: RASIO_GEDUNG.kecil,
};

const POTRET = { w: 400, h: 1010 };
const LANSKAP = { w: 1000, h: 640 };

const LETAK_POTRET: Letak = {
  utama: [56, 318, 288],
  lab: [8, 610, 184],
  komputer: [208, 610, 184],
  taman: [8, 820, 184],
  musala: [208, 820, 184],
  kantor: [14, 950, 132],
  pos: [262, 950, 132],
};

const LETAK_LANSKAP: Letak = {
  utama: [356, 292, 288],
  lab: [64, 300, 200],
  komputer: [736, 300, 200],
  taman: [64, 510, 200],
  musala: [736, 510, 200],
  kantor: [292, 482, 128],
  pos: [584, 482, 128],
};

interface Tempat {
  id: TempatId;
  nama: string;
  ket: string;
  gambar: ReactNode;
  /** tujuan; tanpa href = aksi (onPilih) */
  href?: string;
  onPilih?: () => void;
  /** pesan bila belum dibuka */
  tutup?: string;
  utama?: { judul: string; sub: string; ikon: string };
}

export function KampusDunia({ me }: { me: Member }) {
  const router = useRouter();
  const showToast = useUI((s) => s.showToast);
  const kelas = can(me, "edukasi");
  const info = useKelasHariIni(me);
  const daftar = useGedungKampus(me);
  const lab = useLab(me);
  const [kartu, setKartu] = useState(false);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);

  const tempat: Tempat[] = [
    {
      id: "utama",
      nama: "Gedung Utama",
      ket: "Academy · Ruang Kelas",
      gambar: <GedungUtama className="block h-full w-full" />,
      href: "/akademi",
      tutup: kelas ? undefined : "Ruang Kelas belum dibuka. Minta ayah atau ibu membukanya, ya.",
      utama: info.tugas,
    },
    ...GEDUNG.map((g): Tempat => {
      const ada = daftar.find((d) => d.g.id === g.id);
      const terbuka = ada ? ada.isi.filter((t) => lab(t.id).terbuka).length : 0;
      return {
        id: g.id,
        nama: g.nama,
        ket: ada ? keteranganGedung(g, ada.isi.length, terbuka) : "Segera dibuka",
        gambar: <IlustrasiGedung id={g.id} className="block h-full w-full" />,
        href: g.href,
        tutup: ada ? undefined : `${g.nama} belum dibuka. Minta ayah atau ibu membukanya, ya.`,
      };
    }),
    {
      id: "kantor",
      nama: "Kantor Guru",
      ket: "Rapor",
      gambar: <KantorGuru className="block h-full w-full" />,
      href: "/akademi/rapor",
      tutup: kelas ? undefined : "Kantor Guru dibuka bersama Ruang Kelas.",
    },
    { id: "pos", nama: "Pos Satpam", ket: "Kartu Pelajar", gambar: <PosSatpam className="block h-full w-full" />, onPilih: () => setKartu(true), tutup: kelas ? undefined : "Kartu Pelajar dibuka bersama Ruang Kelas." },
  ];

  const masuk = (t: Tempat, letak: Letak, uk: { w: number; h: number }) => {
    if (t.tutup) return showToast(t.tutup);
    if (t.onPilih) return t.onPilih();
    if (!t.href) return;
    const [x, alas, w] = letak[t.id];
    const kurang = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (kurang) return router.push(t.href);
    // berjalan masuk: kamera menukik ke pintu gedung, lalu halaman gedung dibuka
    setZoom({ x: ((x + w / 2) / uk.w) * 100, y: ((alas - w * RASIO[t.id] * 0.3) / uk.h) * 100 });
    router.prefetch(t.href);
    window.setTimeout(() => router.push(t.href!), 430);
  };

  const adegan = (letak: Letak, uk: { w: number; h: number }, Medan: () => ReactNode, kelasNama: string) => (
    <div className={`kd-adegan relative w-full ${kelasNama}`} style={{ aspectRatio: `${uk.w} / ${uk.h}` }}>
      <Medan />
      <Papan info={info} />
      {tempat.map((t) => {
        const [x, alas, w] = letak[t.id];
        const h = w * RASIO[t.id];
        const gaya: CSSProperties = { left: `${(x / uk.w) * 100}%`, top: `${((alas - h) / uk.h) * 100}%`, width: `${(w / uk.w) * 100}%`, height: `${(h / uk.h) * 100}%` };
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => masuk(t, letak, uk)}
            aria-label={`${t.nama}: ${t.ket}${t.tutup ? ", belum dibuka" : ""}`}
            className={`kd-tempat absolute ${t.tutup ? "kd-tutup" : ""}`}
            style={gaya}
          >
            <span className="kd-gambar absolute inset-0">{t.gambar}</span>
            {t.tutup && (
              <span className="absolute top-[8%] right-[6%] z-10 flex size-8 items-center justify-center rounded-full border-2 border-white bg-[#5b6b85] text-white shadow-[0_2px_0_rgba(11,37,69,.2)]">
                <Icon name="lock" size={17} />
              </span>
            )}
            {t.utama && !t.tutup && <AjakanKelas tugas={t.utama} />}
          </button>
        );
      })}
    </div>
  );

  return (
    <section aria-label="Kampus RINOYA" className="kd-bingkai relative -mx-4 overflow-hidden sm:mx-0 sm:rounded-[32px] sm:shadow-[0_6px_0_rgba(11,37,69,.08)]">
      <div
        className="kd-kamera"
        style={zoom ? { transformOrigin: `${zoom.x}% ${zoom.y}%`, transform: "scale(2.6)", opacity: 0.15 } : undefined}
      >
        {adegan(LETAK_POTRET, POTRET, MedanPotret, "md:hidden")}
        {adegan(LETAK_LANSKAP, LANSKAP, MedanLanskap, "hidden md:block")}
      </div>
      {kartu && <JendelaKartuPelajar me={me} level={info.level} onTutup={() => setKartu(false)} />}
    </section>
  );
}

/** Tombol kelas hari ini yang melayang di atas Gedung Utama (satu-satunya tulisan di luar pelang gedung). */
function AjakanKelas({ tugas }: { tugas: { judul: string; sub: string; ikon: string } }) {
  return (
    <span className="kd-label pointer-events-none absolute bottom-[96%] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center">
      <span
        className="kd-ajak flex items-center gap-1.5 rounded-full py-1 pr-3 pl-1 text-[12.5px] font-black whitespace-nowrap text-[#0b2545]"
        style={{ background: "linear-gradient(155deg,#ffb347,#fd861d 60%)", boxShadow: "0 3px 0 #c85400" }}
      >
        <span className="flex size-6 items-center justify-center rounded-full bg-white">
          <Icon name={tugas.ikon} size={17} />
        </span>
        {tugas.judul} · {tugas.sub}
      </span>
      <span className="-mt-px h-2 w-3" style={{ background: "#f39a35", clipPath: "polygon(0 0,100% 0,50% 100%)" }} />
    </span>
  );
}

/** Papan jenjang di langit: jenjang, semester, progres, pangkat. */
function Papan({ info }: { info: ReturnType<typeof useKelasHariIni> }) {
  return (
    <div className="absolute top-[max(10px,1.4%)] left-3 z-10 flex items-center gap-2 rounded-[16px] bg-white/90 py-1.5 pr-2 pl-3 shadow-[0_3px_0_rgba(11,37,69,.1)] backdrop-blur-sm md:top-4 md:left-4">
      <span className="flex flex-col">
        <span className="leading-tight" style={{ fontFamily: BALOO, fontSize: 14, fontWeight: 800, color: INK }}>
          Semester {info.semester}
        </span>
        <span className="mt-1 block h-1.5 w-[110px] overflow-hidden rounded-full bg-[#e8eef6]" aria-label={`Semester ${info.semester}: ${info.persen}%`}>
          <span className="block h-full rounded-full bg-[#0786eb]" style={{ width: `${Math.max(4, info.persen)}%` }} />
        </span>
      </span>
      <span className="rounded-[10px] bg-[#fff3d1] px-2 py-1 text-center text-[11px] leading-tight font-extrabold text-[#8a6a2b]">
        Pangkat
        <span className="block text-[12px] text-[#0b2545]">{info.lv.pangkat}</span>
      </span>
    </div>
  );
}

/* ---------------- medan & hiasan ---------------- */

function Pohon({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="0" rx="16" ry="4" fill="#000" opacity=".08" />
      <rect x="-3" y="-20" width="6" height="20" rx="3" fill="#8a5a2b" />
      <circle cx="0" cy="-30" r="16" fill="#1fbf62" />
      <circle cx="-8" cy="-36" r="10" fill="#38d07a" />
      <circle cx="7" cy="-40" r="9" fill="#6fe39a" />
    </g>
  );
}

function Cemara({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-2.5" y="-10" width="5" height="10" fill="#8a5a2b" />
      <polygon points="0,-46 -14,-10 14,-10" fill="#16a34a" />
      <polygon points="0,-46 -9,-26 9,-26" fill="#4ade80" />
    </g>
  );
}

function Lampu({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-1.5" y="-30" width="3" height="30" fill="#5b6b85" />
      <circle cx="0" cy="-32" r="5" fill="#fff6c2" stroke="#5b6b85" strokeWidth="1.5" className="kampus-lampu" />
    </g>
  );
}

function Bangku({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-14" y="-12" width="28" height="4" rx="2" fill="#c27a3a" />
      <rect x="-14" y="-6" width="28" height="4" rx="2" fill="#a5642f" />
      <rect x="-12" y="-2" width="3" height="4" fill="#5b6b85" />
      <rect x="9" y="-2" width="3" height="4" fill="#5b6b85" />
    </g>
  );
}

function Bunga({ x, y }: { x: number; y: number }) {
  const warna = ["#ff6fa3", "#ffd23f", "#ff8a4c", "#b084ff", "#ff6fa3"];
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="0" rx="26" ry="8" fill="#6db54d" />
      {warna.map((c, i) => (
        <circle key={i} cx={-18 + i * 9} cy={-3 + (i % 2) * 3} r="3.2" fill={c} />
      ))}
    </g>
  );
}

function AirMancur({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r + 16} fill="#f3e2c0" stroke="#e3c896" strokeWidth="3" />
      <circle r={r} fill="#d9ecf7" stroke="#e3c896" strokeWidth="4" />
      <circle r={r - 5} fill="#7fd0ff" />
      <circle r={r - 14} fill="#a9e1ff" opacity=".7" />
      <rect x="-4" y="-16" width="8" height="16" rx="2" fill="#e3c896" />
      <g className="kd-air">
        <circle cx="0" cy="-22" r="4" fill="#bfeaff" />
        <circle cx="-7" cy="-16" r="2.6" fill="#bfeaff" />
        <circle cx="7" cy="-16" r="2.6" fill="#bfeaff" />
      </g>
    </g>
  );
}

function Awan({ x, y, s = 1, lama = 40 }: { x: number; y: number; s?: number; lama?: number }) {
  return (
    <g className="kd-awan" style={{ animationDuration: `${lama}s` }}>
      <g transform={`translate(${x} ${y}) scale(${s})`} fill="#ffffff" opacity=".95">
        <rect x="-30" y="-8" width="60" height="16" rx="8" />
        <circle cx="-10" cy="-10" r="12" />
        <circle cx="8" cy="-8" r="9" />
      </g>
    </g>
  );
}

function Burung({ x, y }: { x: number; y: number }) {
  return (
    <g className="kd-burung">
      <path d={`M${x} ${y} q4 -4 8 0 q4 -4 8 0`} fill="none" stroke="#0b2545" strokeWidth="1.6" strokeLinecap="round" opacity=".55" />
    </g>
  );
}

function Pagar({ y, dari, sampai, celah }: { y: number; dari: number; sampai: number; celah: [number, number] }) {
  const tiang = [];
  for (let x = dari; x <= sampai; x += 12) if (x < celah[0] || x > celah[1]) tiang.push(x);
  return (
    <g>
      {[[dari, celah[0]], [celah[1], sampai]].map(([a, b], i) => (
        <rect key={i} x={a} y={y - 14} width={b - a} height="3" rx="1.5" fill="#ffffff" />
      ))}
      {tiang.map((x) => (
        <rect key={x} x={x - 2} y={y - 22} width="4" height="22" rx="2" fill="#ffffff" stroke="#e6d6b8" strokeWidth=".8" />
      ))}
    </g>
  );
}

function Gerbang({ x, y, lebar }: { x: number; y: number; lebar: number }) {
  const kiri = x - lebar / 2;
  const kanan = x + lebar / 2;
  return (
    <g>
      <rect x={kiri - 12} y={y - 76} width="14" height="76" rx="3" fill="#fff3df" stroke="#e3c896" strokeWidth="2" />
      <rect x={kanan - 2} y={y - 76} width="14" height="76" rx="3" fill="#fff3df" stroke="#e3c896" strokeWidth="2" />
      <rect x={kiri - 15} y={y - 82} width="20" height="8" rx="3" fill="#0567c2" />
      <rect x={kanan - 5} y={y - 82} width="20" height="8" rx="3" fill="#0567c2" />
      <path d={`M${kiri - 4} ${y - 70} Q${x} ${y - 104} ${kanan + 4} ${y - 70}`} fill="none" stroke="#0567c2" strokeWidth="7" strokeLinecap="round" />
      <rect x={x - 54} y={y - 102} width="108" height="20" rx="8" fill="#0567c2" stroke="#ffffff" strokeWidth="2.5" />
      <text x={x} y={y - 88} textAnchor="middle" fontFamily="var(--ff-baloo), system-ui" fontWeight="800" fontSize="11" fill="#ffffff" letterSpacing="1.2">
        KAMPUS RINOYA
      </text>
    </g>
  );
}

const JALAN = "#f6e3c2";
const TEPI = "#e3c896";
const RUMPUT = "#9be07a";

function Jalan({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return <rect x={x} y={y} width={w} height={h} rx={Math.min(w, h) / 2} fill={JALAN} stroke={TEPI} strokeWidth="2.5" />;
}

/** Jalan raya di luar gerbang: aspal + marka putus-putus + trotoar. */
function JalanRaya({ y, w, h }: { y: number; w: number; h: number }) {
  return (
    <g>
      <rect x="0" y={y - 4} width={w} height="8" fill="#e9dcc4" />
      <rect x="0" y={y + 4} width={w} height={h - y - 4} fill="#5d6b7e" />
      <line x1="0" x2={w} y1={(y + 4 + h) / 2} y2={(y + 4 + h) / 2} stroke="#ffffff" strokeWidth="3" strokeDasharray="18 14" opacity=".85" />
    </g>
  );
}

function Langit({ w, h, tanah }: { w: number; h: number; tanah: number }) {
  return (
    <>
      <defs>
        <linearGradient id={`kd-langit-${w}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fd0ff" />
          <stop offset="1" stopColor="#d8f1ff" />
        </linearGradient>
        <linearGradient id={`kd-rumput-${w}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a9e683" />
          <stop offset="1" stopColor="#86cf63" />
        </linearGradient>
      </defs>
      <rect width={w} height={h} fill={`url(#kd-langit-${w})`} />
      <circle cx={w - 52} cy="54" r="26" fill="#ffd23f" />
      <circle cx={w - 52} cy="54" r="38" fill="#ffd23f" opacity=".22" />
      {/* bukit jauh */}
      <path d={`M0 ${tanah - 10} Q${w * 0.18} ${tanah - 64} ${w * 0.38} ${tanah - 16} Q${w * 0.6} ${tanah - 70} ${w * 0.82} ${tanah - 18} Q${w * 0.92} ${tanah - 44} ${w} ${tanah - 22} V${h} H0 Z`} fill="#c4ebb0" />
      <rect y={tanah} width={w} height={h - tanah} fill={`url(#kd-rumput-${w})`} />
      <rect y={tanah} width={w} height="5" fill="#bdf09b" />
      <rect width={w} height={h} fill={RUMPUT} opacity="0" />
    </>
  );
}

function MedanPotret() {
  const { w, h } = POTRET;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="absolute inset-0 h-full w-full" aria-hidden>
      <Langit w={w} h={h} tanah={230} />
      <Awan x={70} y={92} s={0.9} lama={44} />
      <Awan x={300} y={130} s={0.7} lama={36} />
      <Burung x={160} y={60} />
      <Burung x={186} y={72} />
      {/* pepohonan belakang */}
      <Cemara x={26} y={280} s={1.1} />
      <Cemara x={374} y={280} s={1.1} />
      <Pohon x={40} y={318} s={0.8} />
      <Pohon x={360} y={318} s={0.8} />
      {/* jalan utama dari gerbang ke Gedung Utama */}
      <Jalan x={182} y={314} w={36} h={966 - 314} />
      <Jalan x={96} y={610} w={208} h={26} />
      <Jalan x={96} y={820} w={208} h={26} />
      <AirMancur x={200} y={392} r={28} />
      <Bangku x={120} y={410} />
      <Bangku x={280} y={410} />
      <Bunga x={110} y={360} />
      <Bunga x={290} y={360} />
      <Pohon x={34} y={452} s={0.75} />
      <Pohon x={366} y={452} s={0.75} />
      <Lampu x={170} y={690} />
      <Lampu x={230} y={690} />
      <Lampu x={170} y={900} />
      <Lampu x={230} y={900} />
      {/* pagar, gerbang, jalan raya */}
      <JalanRaya y={966} w={w} h={h} />
      <Pagar y={958} dari={0} sampai={w} celah={[160, 240]} />
      <Gerbang x={200} y={958} lebar={56} />
    </svg>
  );
}

function MedanLanskap() {
  const { w, h } = LANSKAP;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="absolute inset-0 h-full w-full" aria-hidden>
      <Langit w={w} h={h} tanah={180} />
      <Awan x={240} y={60} s={1.1} lama={50} />
      <Awan x={780} y={48} s={0.9} lama={42} />
      <Burung x={640} y={60} />
      <Burung x={664} y={72} />
      <Cemara x={28} y={236} s={1.2} />
      <Cemara x={972} y={236} s={1.2} />
      <Pohon x={316} y={262} />
      <Pohon x={684} y={262} />
      {/* jalan */}
      <Jalan x={482} y={288} w={36} h={600 - 288} />
      <Jalan x={160} y={300} w={680} h={26} />
      <Jalan x={160} y={510} w={680} h={26} />
      <AirMancur x={500} y={410} r={28} />
      <Bangku x={430} y={448} />
      <Bangku x={570} y={448} />
      <Lampu x={468} y={370} />
      <Lampu x={532} y={370} />
      <Pohon x={34} y={440} />
      <Pohon x={966} y={440} />
      <Bunga x={300} y={576} />
      <Bunga x={700} y={576} />
      <Bunga x={70} y={576} />
      <Bunga x={930} y={576} />
      <JalanRaya y={600} w={w} h={h} />
      <Pagar y={596} dari={0} sampai={w} celah={[460, 540]} />
      <Gerbang x={500} y={596} lebar={56} />
    </svg>
  );
}
