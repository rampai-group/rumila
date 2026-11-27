import type { ReactNode } from "react";

const TINTA = "#2e465b";
const KULIT = "#fdc799";
const GARIS = { stroke: TINTA, strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const POSE = {
  berdiri: { tangan: "M-6-20l-5 8m17-8 5 8", kaki: "M-4-9l-2 9h-5m15-9 2 9h5" },
  jalan: { tangan: "M-6-20l-7 7m19-7 7-4 3-5", kaki: "M-4-9l-5 8h-6m19-8 5 3 4 6h5" },
  menunjuk: { tangan: "M-6-20l-5 8m17-8 9-5 4-6", kaki: "M-4-9l-2 9h-5m15-9 2 9h5" },
  menarik: { tangan: "M-6-20l-5 7m17-7 10-6 2-9", kaki: "M-4-9l-4 9h-5m17-9 5 9h5" },
  meraih: { tangan: "M-6-20l-4 9m16-9 10 8 9 4", kaki: "M-4-9l-2 9h-5m15-9 2 9h5" },
} as const;

type OrangProps = { x: number; y: number; pose?: keyof typeof POSE; besar?: number; kiri?: boolean; baju?: string };

export function Orang({ x, y, pose = "berdiri", besar = 1, kiri = false, baju = "#e39a47" }: OrangProps) {
  const { tangan, kaki } = POSE[pose];
  return <g transform={`translate(${x} ${y}) scale(${kiri ? -besar : besar} ${besar})`} {...GARIS}>
    <path d={kaki} fill="none" strokeWidth="3.5" />
    <path d="M-6-23Q0-26 6-23L10-10H-10Z" fill={baju} />
    <path d={tangan} fill="none" stroke={KULIT} strokeWidth="4.5" />
    <circle cy="-32" r="7.5" fill={KULIT} />
    <path d="M-7-34q-1-7 7-7q6 0 8 6q-6 2-9-2q-2 3-6 3Z" fill={TINTA} stroke="none" />
    <circle cx="3.5" cy="-32" r="1.25" fill={TINTA} stroke="none" />
  </g>;
}

export function Luar({ children, badai = false }: { children: ReactNode; badai?: boolean }) {
  return <g {...GARIS}>
    <rect x="3" y="3" width="124" height="94" rx="12" fill={badai ? "#e4eaf5" : "#e8f5fa"} stroke="none" />
    <path d="M3 78Q35 71 64 78Q94 71 127 78V86Q127 97 115 97H15Q3 97 3 86Z" fill="#c9dfba" stroke="none" />
    {children}
  </g>;
}

function Petir() {
  return <g>
    <path d="M86 28q-8 0-8-6q0-5 6-6q1-7 8-7q5 0 8 5q9-3 12 5q8-1 8 5q0 4-5 4Z" fill="#8095ad" />
    <path d="m99 31-8 12h8l-4 11 14-17h-8l3-6Z" fill="#ffce55" />
    <path d="m116 36-4 7m8 3-4 7m-35-15-4 7" stroke="#6195bb" />
  </g>;
}

function Gardu({ kecil = false }: { kecil?: boolean }) {
  return <g transform={kecil ? "translate(69 23) scale(.56)" : "translate(23 5) scale(.9)"}>
    <path d="M43 36V18m16 18V18m16 18V18M38 22h10m6 0h10m6 0h10" strokeWidth="4" />
    <rect x="33" y="34" width="53" height="40" rx="4" fill="#aab9c6" />
    <rect x="42" y="42" width="35" height="26" rx="3" fill="#bccad4" />
    <path d="M59 45l8 16H51Z" fill="#ffce55" strokeWidth="1.5" />
    <path d="m59 49-2 5h4l-2 4" strokeWidth="1.5" fill="none" />
  </g>;
}

function Pagar({ dari, sampai, y }: { dari: number; sampai: number; y: number }) {
  return <g>
    <rect x={dari} y={y} width={sampai - dari} height="24" fill="#e2eaf0" />
    {Array.from({ length: Math.floor((sampai - dari) / 7) }, (_, i) => (
      <path key={i} d={`M${dari + 4 + i * 7} ${y}v24`} stroke="#71899a" strokeWidth="1.6" />
    ))}
    <path d={`M${dari} ${y - 3}v30m${sampai - dari} -30v30`} strokeWidth="3.5" />
  </g>;
}

export function KabelJatuh() {
  return <g>
    <path d="M117 60V18m-13 4h24m-24 6h24" strokeWidth="3.5" />
    <path d="M103 28q-9 1-10 20q-2 18-14 25q-7 4-18 1" fill="none" strokeWidth="4" />
    <path d="m57 69-4-4m4 13-5 3" stroke="#d29734" strokeWidth="2.5" />
  </g>;
}

function LayangTersangkut() {
  return <g>
    <path d="M106 78V17m-13 5h25m-25 6h25" stroke="#5e7181" strokeWidth="3.5" />
    <path d="M4 16q53 22 123 3M4 24q54 24 123 3" fill="none" stroke="#566977" />
    <path d="m76 19 14 10-10 17-13-13Z" fill="#a37bd8" />
    <path d="m76 19 4 27m-13-13 23-4" stroke="#eeddff" strokeWidth="1.5" />
  </g>;
}

export function Stopkontak({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x="-19" y="-18" width="38" height="36" rx="8" fill="#fff9eb" />
    <circle r="11" fill="#e8e2d7" stroke="#8b989d" />
    <circle cx="-4" r="1.9" fill={TINTA} stroke="none" />
    <circle cx="4" r="1.9" fill={TINTA} stroke="none" />
  </g>;
}

export const ILUSTRASI_LISTRIK_LUAR_SD2: Record<string, ReactNode> = {
  "sd2-listrik-dalam-gedung": <Luar badai>
    <Petir />
    <rect x="12" y="34" width="68" height="52" rx="3" fill="#f7d8a7" />
    <path d="m8 38 38-24 38 24Z" fill="#aa6b55" />
    <rect x="32" y="43" width="29" height="37" rx="3" fill="#d3eafa" />
    <Orang x={46} y={78} besar={0.74} />
    <rect x="32" y="43" width="29" height="37" rx="3" fill="none" strokeWidth="3" />
  </Luar>,
  "sd2-listrik-main-jauh-gardu": <Luar>
    <Gardu kecil />
    <Pagar dari={75} sampai={125} y={54} />
    <Orang x={26} y={86} kiri pose="jalan" />
    <circle cx="47" cy="80" r="8" fill="#fcd373" />
    <path d="m44 73 6 13m-10-3 14-5" stroke="#b77a46" strokeWidth="1.5" />
  </Luar>,
  "sd2-listrik-pegang-kepala-steker": <g {...GARIS}>
    <rect x="3" y="3" width="124" height="94" rx="12" fill="#f2f0e7" stroke="none" />
    <Stopkontak x={99} y={39} />
    <path d="M40 52q-24 8-24 23v14" fill="none" strokeWidth="6" />
    <path d="M39 34h21q8 0 8 8v6q0 8-8 8H39Z" fill="#669bd0" />
    <path d="M68 40h12m-12 11h12" stroke="#6b7785" strokeWidth="3.5" />
    <path d="m10 55 13-4 13-14q3-3 8 0l9 6q3 2 1 6q-2 3-6 1l-5-3-5 8 10-2q5 0 4 5q0 3-7 5l-15 5-20 4Z" fill={KULIT} />
  </g>,
  "sd2-listrik-jauh-genangan": <Luar>
    <path d="M4 79h122v9H4Z" fill="#b5c3c9" stroke="none" />
    <path d="M68 79q-6-4 4-8q9-4 22-1q13-3 17 4q8 3 1 9q-18 9-44-4Z" fill="#87cfeb" stroke="#4299bc" />
    <path d="M81 80q5-2 10 0m7-3h5" stroke="#e4f9ff" />
    <KabelJatuh />
    <Orang x={31} y={86} kiri pose="jalan" />
  </Luar>,
  "sd2-listrik-minta-dewasa": <Luar>
    <LayangTersangkut />
    <path d="M80 46q-6 5-2 10q7 6 5 14" fill="none" stroke="#8665b3" />
    <Orang x={59} y={88} baju="#569ba3" besar={1.17} />
    <Orang x={24} y={88} pose="menunjuk" besar={0.8} />
  </Luar>,
  "sd2-listrik-bawah-pohon": <Luar badai>
    <Petir />
    <path d="M45 31v56" stroke="#8e6e55" strokeWidth="9" />
    <path d="M45 46l13-12M45 52 33 42" stroke="#8e6e55" strokeWidth="4" fill="none" />
    <path d="M21 36q-10-6-3-13q-2-9 11-12q8-7 17-4q13-4 20 8q14 1 14 13q-1 12-14 12q-13 6-25 1q-14 5-20-5Z" fill="#7cad70" />
    <Orang x={59} y={86} besar={0.82} />
  </Luar>,
  "sd2-listrik-masuk-gardu": <Luar>
    <Gardu />
    <Pagar dari={8} sampai={38} y={61} />
    <Pagar dari={91} sampai={121} y={61} />
    <Orang x={75} y={77} kiri pose="jalan" besar={0.95} />
    <path d="M38 61v24l14-11V50Z" fill="#d7e3eb" stroke="#71899a" />
    <path d="M43 57v23m5-27v23" fill="none" stroke="#71899a" strokeWidth="1.5" />
  </Luar>,
  "sd2-listrik-sentuh-kabel": <Luar>
    <path d="M4 72h122v17H4Z" fill="#b5c3c9" stroke="none" />
    <path d="M11 84h16m13 0h16m13 0h16m13 0h16" stroke="#f9f3d2" />
    <KabelJatuh />
    <Orang x={33} y={82} pose="meraih" />
  </Luar>,
  "sd2-listrik-tarik-layang": <Luar>
    <LayangTersangkut />
    <path d="m80 46-24 12" fill="none" stroke="#8665b3" strokeWidth="2.5" />
    <Orang x={38} y={93} pose="menarik" />
  </Luar>,
  "sd2-listrik-air-stopkontak": <g {...GARIS}>
    <rect x="3" y="3" width="124" height="94" rx="12" fill="#f2f0e7" stroke="none" />
    <path d="M4 80h122v8q0 8-11 8H15q-11 0-11-8Z" fill="#d4dde3" stroke="none" />
    <Stopkontak x={98} y={50} />
    <Orang x={27} y={89} pose="menunjuk" />
    <path d="m44 56 13-5 8 17-14 6Z" fill="#79bbd2" />
    <path d="M60 57q15-9 25-3m-20 9q10-4 15-4m-7 8q7-1 11-5" fill="none" stroke="#76bbdd" />
    <path d="M73 84q7-7 15-4q13-6 21 2q5 6-8 8H80q-9 0-7-6Z" fill="#a2d9ef" stroke="#76bbdd" />
  </g>,
};
