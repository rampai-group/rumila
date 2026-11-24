import type { ReactNode } from "react";

const AIR = "#c5eaf6";
const TEPI_AIR = "#5ba3bc";
const HIJAU = "#368052";

function DaunPohon() {
  return <>
    <path d="M60 69C31 76 16 55 12 24C42 26 64 40 60 69Z" fill="#79b75b" stroke={HIJAU} strokeWidth="3" />
    <path d="M66 70C62 43 84 27 116 21C114 52 96 76 66 70Z" fill="#55a657" stroke={HIJAU} strokeWidth="3" />
    <path d="M65 58C47 43 53 24 68 9C81 26 82 46 65 58Z" fill="#a0cc67" stroke={HIJAU} strokeWidth="3" />
    <path d="M66 89Q66 72 64 68M66 77L31 40M66 77L101 39M65 71L68 26M46 56L43 42M83 59L86 46" fill="none" stroke={HIJAU} strokeWidth="2.5" strokeLinecap="round" />
  </>;
}

function DaunCemara() {
  return <>
    <path d="M24 90Q49 66 103 21" fill="none" stroke="#36735e" strokeWidth="4" strokeLinecap="round" />
    <path d="M42 74L18 49M51 66L24 37M60 58L36 26M70 49L50 19M80 41L64 14M90 32L79 11M99 24L96 10" fill="none" stroke="#438f67" strokeWidth="4" strokeLinecap="round" />
    <path d="M42 74L77 84M51 66L91 75M60 58L101 67M70 49L111 56M80 41L119 43M90 32L120 30M99 24L119 18" fill="none" stroke="#67a87c" strokeWidth="4" strokeLinecap="round" />
  </>;
}

function DaunPadi() {
  return <>
    <path d="M51 89Q51 48 15 21Q53 27 63 83L62 91Z" fill="#82b84d" stroke={HIJAU} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M62 91Q70 54 111 29Q73 40 57 88Z" fill="#64a64f" stroke={HIJAU} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M56 87Q49 45 58 10Q68 50 63 86Z" fill="#9bc75a" stroke={HIJAU} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M60 82L58 37M53 76Q47 51 30 35M63 78Q79 56 95 42" fill="none" stroke="#c0d77a" strokeWidth="1.8" strokeLinecap="round" />
  </>;
}

function BungaPadi() {
  const bunga = [
    [33, 25, -27], [42, 33, -25], [52, 45, -16], [38, 62, -34],
    [26, 49, -35], [60, 75, -20], [50, 65, -25], [67, 61, -18],
    [74, 28, 28], [86, 36, 23], [99, 48, 20], [92, 64, 18], [105, 72, 14],
  ];
  return <>
    <path d="M70 95C73 54 67 29 60 12M67 33Q47 21 33 25M69 45Q58 40 52 45M70 49Q46 44 26 49M70 60Q49 53 38 62M71 68Q61 63 50 65M71 75L60 75M69 37Q72 31 74 28M71 47Q78 35 86 36M71 59Q88 51 99 48M71 63L67 61M72 69Q85 60 92 64M72 77Q91 67 105 72" fill="none" stroke={HIJAU} strokeWidth="2.7" strokeLinecap="round" />
    {bunga.map(([x, y, sudut]) => (
      <g key={x} transform={`translate(${x} ${y}) rotate(${sudut})`}>
        <path d="M0 4Q-6 1-5-8Q0-6 0 4ZM0 4Q6 1 5-8Q0-6 0 4Z" fill="#b5cc79" stroke="#648744" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M-1-3L-3-10M1-3L3-10" fill="none" stroke="#8d7c3d" strokeWidth="1.2" />
        <path d="M-3-10L-4-13M3-10L4-12" fill="none" stroke="#e8cf80" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    ))}
  </>;
}

function Gelombang({ y }: { y: number }) {
  return <path d="M11 1Q20-3 29 1T47 1M91 1Q101-3 111 1T125 1" transform={`translate(0 ${y})`} fill="none" stroke={TEPI_AIR} strokeWidth="2.2" strokeLinecap="round" />;
}

function AkarTeratai() {
  return <>
    <path d="M9 24Q15 19 25 19H105Q116 19 121 24V44H9Z" fill={AIR} />
    <path d="M9 44Q33 40 57 44T121 44V79Q121 91 108 91H22Q9 91 9 79Z" fill="#e2be95" stroke="#ba936e" strokeWidth="2" />
    <Gelombang y={30} />
    <path d="M49 51Q35 58 30 76M54 53Q46 64 50 81M62 53Q54 69 62 85M69 51Q73 67 70 82M75 53Q82 62 86 79M82 52Q94 59 99 75M38 63L33 64M49 70L43 75M79 67L87 71M94 67L101 69" fill="none" stroke="#865d3f" strokeWidth="2.5" strokeLinecap="round" />
  </>;
}

function BatangTeratai() {
  return <>
    <rect x="9" y="21" width="112" height="70" rx="12" fill={AIR} />
    <path d="M9 27Q30 22 50 27T89 27T121 27" fill="none" stroke={TEPI_AIR} strokeWidth="2.5" />
    <Gelombang y={47} />
    <path d="M9 68Q29 64 51 68T92 68T121 69V79Q121 91 109 91H21Q9 91 9 79Z" fill="#e2be95" stroke="#ba936e" strokeWidth="2" />
    <path d="M27 65Q22 59 30 56Q53 52 63 58Q79 58 94 51Q103 48 106 55Q110 61 103 66Q77 81 57 72Q43 67 33 70Q29 71 27 65Z" fill="#a8aa62" stroke="#667343" strokeWidth="3" />
    <path d="M47 56Q44 64 48 69M63 58Q60 66 63 74M86 54Q83 62 88 70" fill="none" stroke="#748451" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M32 60Q48 57 55 61M72 63Q87 61 99 55" fill="none" stroke="#d5cb80" strokeWidth="2.5" strokeLinecap="round" />
  </>;
}

function DaunTeratai() {
  return <>
    <ellipse cx="65" cy="68" rx="59" ry="20" fill={AIR} />
    <Gelombang y={76} />
    <path d="M65 56L105 70C91 83 57 85 32 74C9 64 10 46 29 34C48 20 86 22 106 38C116 46 117 54 112 62Z" fill="#64ad69" stroke={HIJAU} strokeWidth="3" strokeLinejoin="round" />
    <path d="M65 56L25 57M65 56L33 39M65 56L62 30M65 56L92 37M65 56L95 50M65 56L79 75M65 56L44 74" fill="none" stroke="#338158" strokeWidth="2" strokeLinecap="round" />
    <circle cx="65" cy="56" r="3" fill="#386f51" />
  </>;
}

function BungaTeratai() {
  return <>
    <ellipse cx="65" cy="77" rx="52" ry="15" fill={AIR} />
    <Gelombang y={83} />
    <path d="M64 70Q60 83 67 89" fill="none" stroke="#538f62" strokeWidth="4" strokeLinecap="round" />
    <g stroke="#ad456a" strokeWidth="2.3" strokeLinejoin="round">
      <path d="M65 67Q36 44 65 13Q91 40 65 67Z" fill="#ee8bac" />
      <path d="M65 68Q27 58 32 23Q62 33 65 68ZM65 68Q100 56 99 23Q69 33 65 68Z" fill="#f0a5bd" />
      <path d="M65 70Q31 68 17 43Q47 40 65 70ZM65 70Q99 68 113 43Q83 40 65 70Z" fill="#f6c4d5" />
      <path d="M65 72Q45 69 39 49Q57 49 65 69Q74 49 91 49Q84 69 65 72Z" fill="#f18bad" />
      <path d="M57 62Q51 56 58 50L64 52L71 48Q79 54 73 62Z" fill="#f4ca59" stroke="#a4772d" strokeWidth="1.8" />
      <path d="M65 73Q54 65 56 59Q68 59 74 57Q76 66 65 73Z" fill="#f7b3cb" />
    </g>
  </>;
}

/** Potongan tumbuhan untuk Susun Tumbuhan Utuh, pada kanvas ilustrasi TK 130 × 100. */
export const ILUSTRASI_TUMBUHAN_SUSUN_IDS = [
  "tumbuhan-susun-daun-pohon",
  "tumbuhan-susun-daun-cemara",
  "tumbuhan-susun-daun-padi",
  "tumbuhan-susun-bunga-padi",
  "tumbuhan-susun-akar-teratai",
  "tumbuhan-susun-batang-teratai",
  "tumbuhan-susun-daun-teratai",
  "tumbuhan-susun-bunga-teratai",
];

export function IlustrasiTumbuhanSusun({ id }: { id: string }): ReactNode {
  switch (id) {
    case "tumbuhan-susun-daun-pohon": return <DaunPohon />;
    case "tumbuhan-susun-daun-cemara": return <DaunCemara />;
    case "tumbuhan-susun-daun-padi": return <DaunPadi />;
    case "tumbuhan-susun-bunga-padi": return <BungaPadi />;
    case "tumbuhan-susun-akar-teratai": return <AkarTeratai />;
    case "tumbuhan-susun-batang-teratai": return <BatangTeratai />;
    case "tumbuhan-susun-daun-teratai": return <DaunTeratai />;
    case "tumbuhan-susun-bunga-teratai": return <BungaTeratai />;
    default: return null;
  }
}
