import type { ReactNode } from "react";
import { IlustrasiKeadaanBenda } from "./ilustrasi-keadaan-benda";

const GARIS = { stroke: "#30475e", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Latar({ malam = false, children }: { malam?: boolean; children: ReactNode }) {
  return <g {...GARIS}>
    <rect x="3" y="3" width="124" height="94" rx="12" fill={malam ? "#24354f" : "#eaf1f3"} stroke="none" />
    {children}
  </g>;
}

function Senter({ x, y, skala = 1, rotasi = 0 }: { x: number; y: number; skala?: number; rotasi?: number }) {
  return <g transform={`translate(${x} ${y}) rotate(${rotasi}) scale(${skala})`}>
    <path d="M-28-9H0l13-8h9v34h-9L0 10H-28q-5 0-5-5V-4q0-5 5-5Z" fill="#61839b" />
    <path d="M-20-9v19m7-19v19m7-19v19" stroke="#496b83" strokeWidth="2" />
    <rect x="-23" y="-14" width="10" height="5" rx="2" fill="#90bcb1" strokeWidth="1.7" />
    <ellipse cx="21" cy="0" rx="6" ry="16" fill="#fff4a0" stroke="#c89441" />
  </g>;
}

function SinarPantul({ masuk, keluar }: { masuk: string; keluar: string }) {
  return <g fill="none">
    <path d={masuk} stroke="#e0a951" strokeWidth="2.6" />
    <path d={keluar} stroke="#e8b45d" strokeWidth="2.4" strokeDasharray="3.5 4.5" />
  </g>;
}

function Api({ x, y, skala = 1 }: { x: number; y: number; skala?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${skala})`}>
    <path d="M0-31q8 14 6 21 6-1 9-9 12 17 5 28-8 11-20 10-14 1-21-10-7-11 4-24-1 11 6 11-2-13 11-27Z" fill="#ee875d" stroke="#d16748" />
    <path d="M-2-13q6 7 3 13 5-1 8-4 7 8 2 14-5 7-12 7-13-1-13-11 0-6 4-10-1 6 5 7-2-8 3-16Z" fill="#ffd475" stroke="none" />
  </g>;
}

export const ILUSTRASI_SUMBER_CAHAYA_SD2: Record<string, ReactNode> = {
  "sd2-cahaya-senter": <Latar>
    <path d="M57 37 121 22v56L57 62Z" fill="#fce397" opacity=".84" stroke="none" />
    <path d="M65 46 113 39m-48 17 48 6" stroke="#fff8be" fill="none" strokeWidth="2.6" />
    <Senter x={37} y={50} skala={0.85} />
  </Latar>,
  "sd2-cahaya-kompor": <Latar>
    <path d="M19 64h87l13 21H11Z" fill="#849eac" />
    <path d="M11 85h108v7H11Z" fill="#697f90" />
    <ellipse cx="46" cy="71" rx="22" ry="7" fill="#516473" />
    <ellipse cx="87" cy="71" rx="13" ry="5" fill="#526273" />
    <path d="M59 87h13m15-1h6" stroke="#d9e5e8" />
    <ellipse cx="45" cy="49" rx="29" ry="20" fill="#f5d27a" opacity=".45" stroke="none" />
    <path d="M46 31q9 11 8 19 5-1 7-8 12 14 2 23-6 6-16 6-12 1-17-6-5-8 5-18-1 9 5 11-3-12 6-27Z" fill="#5cb1e5" stroke="#397caf" />
    <path d="M47 46q6 8 4 13l5-4q4 5 2 9-3 5-11 5-8 0-9-6-1-4 3-8 0 4 3 5-1-7 3-14Z" fill="#a9edff" stroke="none" />
  </Latar>,
  "sd2-cahaya-cermin": <Latar>
    <rect x="75" y="16" width="37" height="72" rx="17" fill="#ba9c76" stroke="#87745f" />
    <rect x="81" y="22" width="25" height="59" rx="12" fill="#afd2e0" stroke="#688ca0" />
    <path d="m84 45 16-12m-16 24 14-9" fill="none" stroke="#e1f1f7" />
    <path d="M35 71 82 54 35 37" fill="none" stroke="#fff2b2" strokeWidth="8" />
    <SinarPantul masuk="M35 71 82 54" keluar="M82 54 35 37" />
    <Senter x={24} y={74} skala={0.43} rotasi={-20} />
  </Latar>,
  "sd2-cahaya-sendok": <Latar>
    <path d="M46 81 69 60q-7-12 4-22 14-13 25-7 12 7 1 22Q90 66 79 64L53 88q-6 5-10 1-4-3 3-8Z" fill="#a8c1ce" stroke="#628399" />
    <path d="M72 51q7-16 22-17m-10 25 12-11" fill="none" stroke="#f1fafc" strokeWidth="2.9" />
    <path d="M37 40 78 48" stroke="#f8e6b9" strokeWidth="7" opacity=".75" />
    <SinarPantul masuk="M37 40 78 48" keluar="M78 48 52 22" />
    <Senter x={24} y={37} skala={0.46} rotasi={12} />
  </Latar>,
  "sd2-cahaya-piring": <Latar>
    <ellipse cx="66" cy="62" rx="49" ry="29" fill="#ccdddf" stroke="none" />
    <ellipse cx="65" cy="53" rx="49" ry="29" fill="#fffefa" stroke="#7f9ca7" />
    <ellipse cx="65" cy="51" rx="35" ry="19" fill="#f7fbfa" stroke="#c2d3d7" />
    <path d="M27 47q6-8 16-12m-12 18 9-6" fill="none" stroke="#f5e4a5" strokeWidth="2.8" />
  </Latar>,
  "sd2-cahaya-kaca": <Latar>
    <rect x="34" y="16" width="67" height="68" rx="5" fill="#a8c5ce" stroke="#7899aa" />
    <rect x="40" y="22" width="55" height="56" rx="3" fill="#cdebf3" stroke="#7899aa" />
    <path d="M41 65q10-12 23-5 15-14 30-3v20H41Z" fill="#85ae9d" stroke="none" />
    <path d="m43 32 27-9m-26 17 31-12m-28 27 39-15" fill="none" stroke="#f4fbfd" strokeWidth="2.4" />
    <path d="M67 23V77M40 49H95" stroke="#7899aa" />
    <path d="M29 83h77v6H29Z" fill="#9eb8c2" stroke="#7899aa" />
  </Latar>,
  "sd2-cahaya-bintang": <Latar malam>
    <path d="M15 72h1m12-41h1m72-8h1m12 47h1m-72 12h1m49-28h1" stroke="#8aa8be" strokeWidth="3.4" />
    <circle cx="68" cy="50" r="23" fill="#dfba66" opacity=".18" stroke="none" />
    <circle cx="68" cy="50" r="13" fill="#ffe092" opacity=".46" stroke="none" />
    <path d="M68 21v15m0 28v15M39 50h15m28 0h15m-56-20 10 9m34 22 10 9m-5-42-10 10m-29 23-10 10" stroke="#f7da87" strokeWidth="2.5" />
    <circle cx="68" cy="50" r="8" fill="#fff7c3" stroke="#edcf82" strokeWidth="2" />
  </Latar>,
  "sd2-cahaya-unggun": <Latar malam>
    <ellipse cx="65" cy="60" rx="46" ry="30" fill="#eaa06b" opacity=".17" stroke="none" />
    <path d="M33 78 92 92m5-14-58 14" fill="none" stroke="#93715b" strokeWidth="11" />
    <path d="M32 77 92 91m5-14-58 14" fill="none" stroke="#be946c" strokeWidth="5" />
    <Api x={66} y={53} skala={0.98} />
    <path d="m51 27-3-6m28 4 2-7" fill="none" stroke="#ffd887" strokeWidth="2.9" />
  </Latar>,
  "sd2-cahaya-kilat": <Latar malam>
    <path d="M17 38q-4-13 9-18 5-10 17-8 14-9 26-1 15-5 25 6 15-2 20 8 8 13-8 15H29Z" fill="#556980" stroke="#718298" />
    <path d="M68 36 50 62h16L56 89 89 54H72l11-18Z" fill="#ffdd79" stroke="#f8e8a2" />
    <path d="m71 67 13 6 17-7m-32 2 6 16M30 50l-4 7m13-5-4 7m68-8-4 6" stroke="#b4bfd3" fill="none" strokeWidth="1.9" />
  </Latar>,
  "sd2-cahaya-bulan": <Latar malam>
    <circle cx="70" cy="50" r="34" fill="#61748b" stroke="#8d9bac" />
    <path d="M71 16a34 34 0 0 0 0 68Q50 51 71 16Z" fill="#ebead5" stroke="none" />
    <ellipse cx="48" cy="53" rx="7" ry="5" fill="#c3c8c1" stroke="none" />
    <ellipse cx="57" cy="32" rx="4" ry="3" fill="#c3c8c1" stroke="none" />
    <ellipse cx="58" cy="72" rx="5" ry="3" fill="#c3c8c1" stroke="none" />
    <ellipse cx="80" cy="43" rx="8" ry="5" fill="#718199" stroke="none" />
    <path d="M13 35h17m-4-4 4 4-4 4M12 49h15m-4-4 4 4-4 4M13 64h17m-4-4 4 4-4 4" fill="none" stroke="#ddc687" opacity=".65" strokeWidth="2" />
  </Latar>,
  "sd2-cahaya-reflektor": <Latar malam>
    <g transform="translate(36 13) scale(.72)"><IlustrasiKeadaanBenda id="qc-reflektor-sepeda" /></g>
    <path d="M35 45 55 43 58 52 35 53Z" fill="#feeaa6" opacity=".55" stroke="none" />
    <SinarPantul masuk="M35 47 57 48" keluar="M57 49 34 53" />
    <Senter x={22} y={49} skala={0.46} />
  </Latar>,
  "sd2-cahaya-mata-kucing": <Latar malam>
    <g transform="translate(34 12) scale(.72)"><IlustrasiKeadaanBenda id="qc-mata-kucing-terpantul" /></g>
    <path d="M35 45 96 49 97 54 35 54Z" fill="#f9e1a0" opacity=".23" stroke="none" />
    <SinarPantul masuk="M36 48 68 53" keluar="M68 53 35 55" />
    <Senter x={24} y={48} skala={0.47} rotasi={5} />
  </Latar>,
  "sd2-cahaya-genangan": <Latar malam>
    <path d="M6 69q34-12 60-9 19 2 57-2v24q0 11-13 12H18Q6 94 6 81Z" fill="#344960" stroke="none" />
    <path d="M12 80q7-10 27-8 13 3 23-3 14-6 27-1 24-1 28 7-3 12-24 12-13-1-24 2-10 4-19 0-10-4-25-2-11 0-13-7Z" fill="#638ba4" stroke="#78abc2" />
    <path d="M102 34 112 34 98 77H61Z" fill="#ffe7a1" opacity=".24" stroke="none" />
    <path d="M92 66V30q0-8 8-8h11v6h-11q-2 0-2 4v31Z" fill="#78909e" stroke="#536f86" />
    <path d="M101 28h14q1 6-4 6h-10Z" fill="#fff0b1" stroke="#cba761" strokeWidth="1.6" />
    <path d="m34 79 10-1m19 8 13-1m-1-10 16-1m-13-4 13-1m0 10 14-2" fill="none" stroke="#b5d8d9" strokeWidth="2.4" />
    <path d="M75 74h12m-15 7h14" fill="none" stroke="#fff0a6" strokeWidth="2.7" />
  </Latar>,
  "sd2-cahaya-rambu": <Latar malam>
    <path d="M8 78h113v11H8Z" fill="#526780" stroke="none" />
    <path d="M10 84h24m14 0h24m14 0h24" stroke="#afc3cf" strokeWidth="1.8" />
    <path d="M88 56V80" stroke="#a2bac3" strokeWidth="5" />
    <path d="M88 17 114 44 88 71 62 44Z" fill="#f1d17c" stroke="#977c47" />
    <path d="M88 23 107 44 88 65 68 44Z" fill="none" stroke="#a88549" strokeWidth="1.5" />
    <circle cx="89" cy="37" r="3.6" fill="#46546a" stroke="none" />
    <path d="m89 42-3 9-6 5m6-5 9 4m-6-13 7 4m-7-4-7 3" fill="none" stroke="#46546a" strokeWidth="2.7" />
    <path d="m34 56 37-19v13L35 60Z" fill="#ffe398" opacity=".37" stroke="none" />
    <SinarPantul masuk="M34 58 70 45" keluar="M70 45 35 62" />
    <Senter x={24} y={63} skala={0.46} rotasi={-24} />
  </Latar>,
};
