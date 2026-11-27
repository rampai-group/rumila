import type { ReactNode } from "react";

const garis = { stroke: "#385770", strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const warnaPetak = {
  biru: "#78bce8",
  hijau: "#7fcba5",
  kuning: "#ffd270",
};

function Petak({ kolom, baris, warna }: { kolom: number; baris: number; warna: string }) {
  const sisi = Math.min(94 / kolom, 86 / baris);
  const x = (130 - sisi * kolom) / 2;
  const y = (100 - sisi * baris) / 2;
  return <g {...garis}>
    <rect x={x} y={y} width={sisi * kolom} height={sisi * baris} fill={warna} strokeWidth="3.8" />
    {Array.from({length: kolom - 1}, (_, i) => <path key={i} d={`M${x+sisi*(i+1)} ${y}v${sisi*baris}`} fill="none" />)}
    {Array.from({length: baris - 1}, (_, i) => <path key={i} d={`M${x} ${y+sisi*(i+1)}h${sisi*kolom}`} fill="none" />)}
  </g>;
}

const ukuranPetak = [[2, 2], [2, 3], [3, 3], [3, 4], [4, 4], [4, 5]];

export const ILUSTRASI_UKUR_SD3: Record<string, ReactNode> = {
  ...Object.fromEntries(ukuranPetak.flatMap(([baris, kolom]) =>
    Object.entries(warnaPetak).map(([nama, warna]) => [`sd3-petak-${nama}-${baris}x${kolom}`, <Petak key={nama} kolom={kolom} baris={baris} warna={warna} />]))),
  "sd3-karung-kelapa": <g {...garis}>
    <path d="M36 45L24 72Q18 88 42 89H89Q111 88 105 72L93 43Z" fill="#cdad7d" />
    <ellipse cx="65" cy="44" rx="29" ry="12" fill="#a27855" />
    <path d="M34 49Q64 60 96 48M34 65L30 76M96 66L100 77" fill="none" stroke="#9b7657" />
    {[[51, 39], [67, 31], [81, 39]].map(([cx,cy]) => <g key={cx}>
      <ellipse cx={cx} cy={cy} rx="14" ry="12" fill="#9f694c" stroke="#70503f" />
      <path d={`M${cx-8} ${cy+2}q6-10 15-9`} fill="none" stroke="#c89266" />
    </g>)}
  </g>,
  "sd3-gelas-kecil-sirup": <g {...garis}>
    <path d="M37 16H92L85 84Q65 92 44 84Z" fill="#edf9fb" />
    <path d="M41 50Q65 45 89 50L85 84Q65 92 44 84Z" fill="#ec9a7d" />
    <path d="M81 29H91M80 42H90M78 55H88M77 68H86M45 30L49 73" fill="none" stroke="#b3dce5" />
  </g>,
  "sd3-galon-air": <g {...garis}>
    <path d="M45 19H84V28L98 44V86Q66 98 33 86V44L45 28Z" fill="#caedf7" />
    <path d="M34 46Q65 40 97 46V86Q66 96 34 86Z" fill="#8fd3e8" stroke="#75b5cb" />
    <rect x="44" y="9" width="41" height="12" rx="3" fill="#70a1c9" />
    <path d="M34 56Q66 65 97 56M34 71Q66 80 97 71M42 40V78" stroke="#edfafd" fill="none" />
  </g>,
  "sd3-air-akuarium": <g {...garis}>
    <path d="M15 22H116V79Q65 92 15 79Z" fill="#caeff7" />
    <path d="M15 45Q32 39 49 45T82 45T116 45V79Q65 92 15 79Z" fill="#81cce7" />
    <path d="M23 48V72M108 47V70" stroke="#eafdff" fill="none" />
    <path d="M49 61Q62 53 74 62Q63 73 48 64L39 70V56Z" fill="#f6ba61" />
    <circle cx="68" cy="62" r="2" fill="#385770" stroke="none" />
  </g>,
};
