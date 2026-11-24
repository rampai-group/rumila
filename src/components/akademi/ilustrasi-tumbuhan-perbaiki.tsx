import type { ReactNode } from "react";

const DAUN_GELAP = "#376d46";

function Melati() {
  return <g transform="translate(65 50)" stroke="#829492" strokeWidth="2.5">
    {[0, 60, 120, 180, 240, 300].map((sudut) => (
      <path key={sudut} transform={`rotate(${sudut})`} d="M-6 3C-26-6-29-27-12-38C2-46 22-38 21-23C20-11 7-2-6 3Z" fill="#fdfcf5" />
    ))}
    {[30, 150, 270].map((sudut) => (
      <path key={sudut} transform={`rotate(${sudut})`} d="M0 3C-14 3-21-8-17-17C-12-25 3-23 9-15C13-7 7 0 0 3Z" fill="#eeeee0" strokeWidth="2" />
    ))}
    <path d="M-8 2Q-3-7 7-6Q10 1 3 8Q-4 11-8 2Z" fill="#fffdf6" strokeWidth="2" />
  </g>;
}

function Anggrek() {
  return <g stroke="#63386e" strokeWidth="2.7">
    <path d="M65 54C48 39 44 17 58 7C68-1 83 11 81 24C80 36 73 46 65 54ZM61 51C54 74 38 93 25 86C10 79 19 63 40 54ZM70 51C76 73 93 92 106 84C120 75 107 61 88 53Z" fill="#b47acd" />
    <path d="M66 49C39 18 12 19 10 40C5 69 39 73 64 56C93 75 125 67 121 39C118 19 95 17 66 49Z" fill="#d29be1" />
    <path d="M23 39Q39 35 54 48M108 39Q93 35 78 48" fill="none" stroke="#a75fb8" strokeWidth="2" />
    <path d="M56 47Q66 42 76 47L73 58Q91 61 82 76L66 88L50 75Q43 61 59 58Z" fill="#9a397d" />
    <path d="M59 48Q66 43 73 48L70 62H62Z" fill="#fff0d0" strokeWidth="1.8" />
    <path d="M62 66Q66 62 70 66L66 76Z" fill="#f7c85c" stroke="none" />
  </g>;
}

function Jeruk() {
  return <g transform="translate(65 51)">
    {[0, 72, 144, 216, 288].map((sudut) => (
      <path key={sudut} transform={`rotate(${sudut})`} d="M-7 3C-24-10-22-32-10-41C3-51 16-38 19-25C21-14 12-4 3 3Z" fill="#fffefa" stroke="#8a9e94" strokeWidth="2.5" />
    ))}
    <circle r="14" fill="#ffe5a0" stroke="#b78233" strokeWidth="2" />
    {[0, 51, 103, 154, 206, 257, 309].map((sudut) => <circle key={sudut} transform={`rotate(${sudut})`} cy="-9" r="2.6" fill="#d69836" />)}
    <circle r="4" fill="#e6ad44" />
  </g>;
}

function Kopi() {
  return <>
    <path d="M63 90L65 48M63 78L34 59M63 78L98 58" fill="none" stroke="#778955" strokeWidth="4" />
    {[[36, 59], [94, 58], [65, 33]].map(([x, y], indeks) => <g key={x} transform={`translate(${x} ${y}) rotate(${indeks * 15})`}>
      {[0, 72, 144, 216, 288].map((sudut) => (
        <path key={sudut} transform={`rotate(${sudut})`} d="M-4 4Q-10-8-4-21Q0-29 4-21Q10-8 4 4Z" fill="#fffefa" stroke="#859392" strokeWidth="2.1" />
      ))}
      <circle r="4.5" fill="#eac477" stroke="#b89760" strokeWidth="1.4" />
    </g>)}
  </>;
}

function Telang() {
  return <g stroke="#2d3a83" strokeWidth="2.7">
    <path d="M66 86C37 87 20 73 19 47C18 26 34 12 46 15C51 7 64 5 70 12C82 5 97 13 101 24C118 36 113 55 104 69C94 83 80 89 66 86Z" fill="#4b66d4" />
    <path d="M66 77C47 75 33 62 34 43C35 30 48 23 61 30C70 23 85 24 94 34C107 49 89 72 66 77Z" fill="#657de7" stroke="none" />
    <path d="M46 42Q51 60 66 70Q70 54 85 41M44 32Q53 41 57 55M87 31Q78 42 76 54" fill="none" stroke="#a0a9f3" strokeWidth="2" />
    <path d="M49 62Q52 51 62 53Q65 50 69 56Q77 52 84 59Q77 68 66 76Q54 74 49 62Z" fill="#f5efdb" strokeWidth="2" />
    <path d="M56 63Q65 61 74 63Q72 75 65 82Q58 75 56 63Z" fill="#26377f" />
  </g>;
}

function Kemangi() {
  const tingkat = [
    { y: 20, x: 7, s: 0.63 }, { y: 34, x: 11, s: 0.79 }, { y: 51, x: 15, s: 0.92 }, { y: 70, x: 18, s: 1 },
  ];
  return <>
    <path d="M65 94V15" stroke="#477843" strokeWidth="5" />
    {tingkat.map(({ y, x, s }) => <g key={y}>
      {[-1, 1].map((arah) => <g key={arah} transform={`translate(${65 + x * arah} ${y}) scale(${arah * s} ${s})`}>
        <path d="M-6 5Q-2-4 6-2Q15-14 22-8Q24-3 18 1Q22 6 16 11Q10 14 5 7Z" fill="#f2e6f8" stroke="#8c669c" strokeWidth="2.2" />
        <path d="M5 7L-7 10L-4 2Z" fill="#659059" stroke="#477843" strokeWidth="1.5" />
        <path d="M11 3L16 4" stroke="#b579be" strokeWidth="2" />
      </g>)}
    </g>)}
    <ellipse cx="65" cy="12" rx="5" ry="6" fill="#d8badf" stroke="#8c669c" strokeWidth="2" />
  </>;
}

function Kenanga() {
  return <g transform="translate(65 50)">
    {[0, 120, 240, 60, 180, 300].map((sudut, i) => (
      <g key={sudut} transform={`rotate(${sudut}) scale(${i < 3 ? 1 : 0.83})`}>
        <path d="M-4 5Q-12-7-11-21Q-9-37 3-44Q9-49 16-43Q2-39 0-25Q-1-13 6-2Z" fill={i < 3 ? "#e3c756" : "#f0d976"} stroke="#9c8034" strokeWidth="2.2" />
        <path d="M0-2Q-8-24 5-39" fill="none" stroke="#ad9441" strokeWidth="1.5" />
      </g>
    ))}
    <circle r="8" fill="#835e3a" stroke="#67482f" strokeWidth="2" />
    <circle r="3.5" fill="#e3c756" />
  </g>;
}

function Alamanda() {
  return <g stroke="#a77321" strokeWidth="2.6">
    <path d="M64 43C71 62 85 69 103 72L98 85C76 84 53 72 44 58Z" fill="#f4b842" />
    <path d="M91 71Q98 70 110 73Q105 77 104 89L97 85Z" fill="#98a35c" stroke="#66753e" strokeWidth="2.1" />
    <path d="M58 12C72 7 86 16 85 26C100 26 108 40 99 51C94 57 84 59 78 57C80 74 61 80 51 69C45 72 25 68 24 57C18 49 28 43 34 40C23 29 30 17 41 15Q50 11 58 12Z" fill="#ffd75b" />
    <path d="M60 42Q63 29 60 17M60 42Q76 32 91 33M60 42Q69 52 68 67M60 42Q47 50 34 55M60 42Q48 32 39 32" fill="none" stroke="#eab145" strokeWidth="2.2" />
    <path d="M60 34Q69 35 73 41Q68 51 60 53Q53 49 50 41Q53 36 60 34Z" fill="#e7972f" stroke="#b97624" strokeWidth="2" />
  </g>;
}

function Bugenvil() {
  return <g transform="translate(65 49)">
    {[0, 120, 240].map((sudut, i) => <g key={sudut} transform={`rotate(${sudut})`}>
      <path d="M0 11C-25 4-28-15-15-27Q-4-35 7-43Q20-32 25-14C30 1 16 10 0 11Z" fill={["#ba72cb", "#9d59b5", "#c57ad5"][i]} stroke="#693b7d" strokeWidth="2.5" />
      <path d="M1 7Q8-13 7-34M5-6Q-5-9-13-17M8-17L17-23" fill="none" stroke="#7a438e" strokeWidth="1.7" />
    </g>)}
    {[0, 120, 240].map((sudut) => <g key={sudut} transform={`rotate(${sudut})`}>
      <path d="M-2 1L-4-12H3L3 1Z" fill="#e9e6a9" stroke="#6c6c41" strokeWidth="1.7" />
      <path d="M0-21L3-17L8-18L7-13L10-10L4-9L0-5L-4-9L-10-10L-7-13L-8-18L-3-17Z" fill="#fff8d9" stroke="#7c7551" strokeWidth="1.6" />
      <circle cy="-13" r="2" fill="#cfaf55" />
    </g>)}
  </g>;
}

function Asoka() {
  const kuntum = [[65, 18], [45, 24], [86, 25], [28, 37], [59, 39], [101, 41], [39, 51], [81, 47], [59, 59], [98, 62], [24, 58], [79, 65]];
  return <>
    <path d="M65 93L65 59M65 81L30 58M65 81L99 58M65 76L49 45M65 76L81 44" fill="none" stroke="#648253" strokeWidth="4" />
    {kuntum.map(([x, y], i) => <g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${i * 24})`}>
      <path d="M0-2C-3-7-3-13 0-14C5-14 6-7 2-2C7-7 13-5 14-1C14 4 7 6 2 2C7 7 5 13 1 14C-4 14-5 8-2 3C-8 7-14 5-14 1C-14-4-7-6-2-2Z" fill={i % 3 === 0 ? "#f77868" : "#ea524b"} stroke="#a23740" strokeWidth="1.8" />
      <circle r="2.7" fill="#fed088" />
    </g>)}
  </>;
}

function AkarAnggrek() {
  const akar = [
    "M59 22Q33 28 26 47T15 76", "M63 23Q48 36 46 60Q44 72 31 87", "M65 23Q67 37 58 60T66 92",
    "M68 22Q82 35 78 57Q75 74 87 84", "M70 22Q92 22 102 40T115 60", "M70 23Q102 36 104 68Q106 81 118 83",
  ];
  return <>
    <path d="M52 24Q54 14 65 12Q75 12 79 23Q70 28 52 24Z" fill="#8da38b" stroke="#567265" strokeWidth="2.5" />
    {akar.map((d) => <path key={d} d={d} fill="none" stroke="#647d70" strokeWidth="8" />)}
    {akar.map((d) => <path key={d} d={d} fill="none" stroke="#c5d1be" strokeWidth="4.8" />)}
    <path d="M18 70L15 76M35 82L31 87M62 87L66 92M82 79L87 84M112 56L115 60M113 81L118 83" fill="none" stroke="#8aac68" strokeWidth="4.8" />
  </>;
}

type BentukHelai = "oval" | "lanset" | "panjang" | "berombak" | "hati";

/** Helai berurat dari pangkal lokal (0, 0) hingga ujung (0, -64). */
function Helai({ bentuk = "oval", warna = "#6bb26a" }: { bentuk?: BentukHelai; warna?: string }) {
  const siluet = {
    oval: "M0 0C-31-10-27-43 0-64C27-43 31-10 0 0Z",
    lanset: "M0 0C-19-17-14-44 0-64C14-44 19-17 0 0Z",
    panjang: "M0 0Q-18-10-16-26Q-18-43 0-64Q16-47 16-27Q19-11 0 0Z",
    berombak: "M0 0Q-18-5-16-14Q-25-20-20-28Q-25-35-17-43Q-18-49 0-64Q18-49 17-43Q25-35 20-28Q25-20 16-14Q18-5 0 0Z",
    hati: "M0 0C-6-3-15 2-22-4C-36-18-18-49 0-64C18-49 36-18 22-4C15 2 6-3 0 0Z",
  }[bentuk];
  return <>
    <path d={siluet} fill={warna} stroke={DAUN_GELAP} strokeWidth="2.5" />
    <path d="M0-3V-57M0-13L-9-22M0-25L-11-34M0-38L-9-45M0-13L9-22M0-25L11-34M0-38L9-45" fill="none" stroke={DAUN_GELAP} strokeWidth="1.7" />
  </>;
}

function DaunBerpasangan({ bentuk, warna, skala = 0.94 }: { bentuk?: BentukHelai; warna?: string; skala?: number }) {
  return <>
    <path d="M65 88V50" fill="none" stroke={DAUN_GELAP} strokeWidth="3.5" />
    {[-65, 65].map((sudut) => <g key={sudut} transform={`translate(65 62) rotate(${sudut}) scale(${skala})`}>
      <Helai bentuk={bentuk} warna={warna} />
    </g>)}
  </>;
}

function DaunTunggal({ bentuk, warna, sayap = false }: { bentuk?: BentukHelai; warna?: string; sayap?: boolean }) {
  return <g transform="translate(39 75) rotate(49) scale(1.34)">
    <path d="M0 13V0" fill="none" stroke={DAUN_GELAP} strokeWidth="3" />
    {sayap && <path d="M0 11Q-8 7-5 2H5Q8 7 0 11Z" fill="#7eb578" stroke={DAUN_GELAP} strokeWidth="2" />}
    <Helai bentuk={bentuk} warna={warna} />
  </g>;
}

function DaunAnggrek() {
  return <>
    {[-1, 1].map((arah) => <g key={arah} transform={`translate(65 66) scale(${arah} 1)`}>
      <path d="M-2 0C6-18 19-42 42-45Q52-46 52-35C52-15 30 3-2 0Z" fill={arah < 0 ? "#679b75" : "#80b088"} stroke={DAUN_GELAP} strokeWidth="2.6" />
      <path d="M2-3Q31-9 46-40" fill="none" stroke={DAUN_GELAP} strokeWidth="2" />
      <path d="M17-22Q26-37 39-40" fill="none" stroke="#b1ca91" strokeWidth="2.5" />
    </g>)}
  </>;
}

function DaunTelang() {
  return <>
    <path d="M65 92Q62 62 65 30" fill="none" stroke={DAUN_GELAP} strokeWidth="3.7" />
    {[[65, 35, 0], [65, 48, -65], [65, 48, 65], [64, 62, -77], [64, 62, 77], [64, 77, -89], [64, 77, 89]].map(([x, y, sudut]) => (
      <g key={`${y}-${sudut}`} transform={`translate(${x} ${y}) rotate(${sudut})`}>
        <path d="M0 0C-12-5-12-21-3-27Q0-30 3-27C12-21 12-5 0 0Z" fill={y < 60 ? "#83bd70" : "#6aaf63"} stroke={DAUN_GELAP} strokeWidth="2.1" />
        <path d="M0-3V-23" stroke={DAUN_GELAP} strokeWidth="1.4" />
      </g>
    ))}
  </>;
}

function DaunAlamanda() {
  return <>
    <path d="M65 84L65 50" fill="none" stroke={DAUN_GELAP} strokeWidth="4" />
    {[-69, -20, 23, 71].map((sudut, i) => <g key={sudut} transform={`translate(65 61) rotate(${sudut}) scale(${i === 1 || i === 2 ? 0.76 : 0.88})`}>
      <Helai bentuk="lanset" warna={i % 2 ? "#79b668" : "#559753"} />
    </g>)}
  </>;
}

const ILUSTRASI: Record<string, () => ReactNode> = {
  "bunga-melati": Melati,
  "bunga-anggrek": Anggrek,
  "bunga-jeruk": Jeruk,
  "bunga-kopi": Kopi,
  "bunga-telang": Telang,
  "bunga-kemangi": Kemangi,
  "bunga-kenanga": Kenanga,
  "bunga-alamanda": Alamanda,
  "bunga-bugenvil": Bugenvil,
  "bunga-asoka": Asoka,
  "akar-anggrek": AkarAnggrek,
  "daun-melati": () => <DaunBerpasangan />,
  "daun-anggrek": DaunAnggrek,
  "daun-jeruk": () => <DaunTunggal sayap warna="#599d61" />,
  "daun-kopi": () => <DaunBerpasangan bentuk="berombak" warna="#579f58" />,
  "daun-telang": DaunTelang,
  "daun-kemangi": () => <DaunBerpasangan warna="#8bc66d" skala={0.8} />,
  "daun-kenanga": () => <DaunTunggal bentuk="panjang" warna="#73b265" />,
  "daun-alamanda": DaunAlamanda,
  "daun-bugenvil": () => <DaunTunggal bentuk="hati" warna="#78a959" />,
  "daun-asoka": () => <DaunBerpasangan bentuk="lanset" warna="#4c9e60" />,
};

const PREFIX = "tumbuhan-perbaiki-";
export const ILUSTRASI_TUMBUHAN_PERBAIKI_IDS = Object.keys(ILUSTRASI).map((id) => PREFIX + id);

export function IlustrasiTumbuhanPerbaiki({ id }: { id: string }) {
  const Gambar = ILUSTRASI[id.slice(PREFIX.length)];
  if (!Gambar) return null;
  return <g strokeLinecap="round" strokeLinejoin="round"><Gambar /></g>;
}
