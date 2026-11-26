import type { ReactNode } from "react";

const TINTA = "#32546a";
const AIR = "#87c9e6";
const GARIS = { stroke: TINTA, strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Panel({ children, latar = "#eef6f8" }: { children: ReactNode; latar?: string }) {
  return <g {...GARIS}>
    <rect x="3" y="3" width="124" height="94" rx="12" fill={latar} stroke="none" />
    {children}
  </g>;
}

function Gelembung({ susu = false }: { susu?: boolean }) {
  return <g fill={susu ? "#fffdfa" : "#d4effa"} stroke={susu ? "#bc9c7a" : "#3c91b9"} strokeWidth="1.5">
    <circle cx="42" cy="56" r="5" /><circle cx="68" cy="50" r="6" /><circle cx="86" cy="61" r="4.5" />
    <circle cx="51" cy="70" r="3" /><circle cx="77" cy="72" r="2.5" /><circle cx="61" cy="64" r="3.5" />
    <circle cx="53" cy="46" r="2.5" /><circle cx="80" cy="49" r="2.5" />
  </g>;
}

function ArusAtas({ x = 66, y = 53 }: { x?: number; y?: number }) {
  return <g transform={`translate(${x} ${y})`} fill="none" stroke="#4b9aba" strokeWidth="2">
    <path d="M-16 0v-20m16 17v-25m16 28v-20" strokeDasharray="3 4" />
    <path d="m-20-16 4-5 4 5m8-7 4-5 4 5m8 7 4-5 4 5" />
  </g>;
}

function Matahari({ x = 102, y = 23 }: { x?: number; y?: number }) {
  return <g transform={`translate(${x} ${y})`} stroke="#c28e3a" strokeWidth="2">
    <circle r="9" fill="#ffd477" />
    <path d="M0-14v-5m0 33v5m14-19h5m-33 0h-5m29-10 4-4m-24 4-4-4m24 24 4 4m-24-4-4 4" />
  </g>;
}

function Panci({ warna = AIR, children, susu = false }: { warna?: string; children?: ReactNode; susu?: boolean }) {
  return <g>
    <path d="M27 49H17q-6 0-6 6v4q0 6 6 6h13m70-16h13q6 0 6 6v4q0 6-6 6h-13" fill="#aebdcb" />
    <path d="M26 45h78l-6 31q-1 8-13 8H45q-12 0-13-8Z" fill="#b4c3cc" />
    <path d="M34 51h62l-4 22q-1 6-9 6H47q-8 0-9-6Z" fill={warna} stroke="#61879b" strokeWidth="1.5" />
    <path d="M26 45h78" stroke="#d8e5ee" strokeWidth="5" />
    {children}
    <Gelembung susu={susu} />
  </g>;
}

function Gelombang({ x = 65, y = 38 }: { x?: number; y?: number }) {
  return <path transform={`translate(${x} ${y})`} d="M-12 0q-5-6 1-10q5-4 0-10M2 0q-6-5 0-10q5-4 0-12m13 20q-4-5 0-8q4-4 1-7" fill="none" stroke="#8da9bf" />;
}

function Ikan({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`} stroke="#855e4c" strokeWidth="1.6">
    <path d="M-17 0q8-8 24-3l8-4v14L7 3q-16 5-24-3Z" fill="#d3a779" />
    <circle cx="-10" r="1.5" fill="#634e49" stroke="none" />
    <path d="m-4-4 3 7m2-6 3 5" stroke="#af7e63" />
  </g>;
}

export const ILUSTRASI_DIDIH_UAP_SD6: Record<string, ReactNode> = {
  "sd6-didih-ketel": <Panel>
    <Gelombang x={63} y={34} />
    <path d="M81 33h22q11 0 11 11v14q0 12-13 12H91" fill="none" stroke="#6587a4" strokeWidth="7" />
    <path d="M37 34h51l8 42H29l4-14-12-20h12Z" fill="#b0d5e7" />
    <path d="M34 52h55l5 22H30Z" fill={AIR} stroke="none" />
    <Gelembung />
    <rect x="28" y="76" width="71" height="11" rx="4" fill="#7591aa" />
    <path d="M98 85h15v6h7" fill="none" />
  </Panel>,
  "sd6-didih-bakso": <Panel latar="#f8ecdf">
    <path d="M18 31V12h94v30m-94-30 14 11h66l14-11" fill="none" stroke="#b68e72" strokeWidth="3" />
    <Gelombang y={40} />
    <Panci warna="#e5b786">
      <g fill="#bb855d" stroke="#906242" strokeWidth="1.5">
        <circle cx="49" cy="58" r="8" /><circle cx="66" cy="65" r="7" /><circle cx="81" cy="57" r="7" />
      </g>
    </Panci>
  </Panel>,
  "sd6-didih-susu": <Panel>
    <Gelombang />
    <Panci warna="#fcf2df" susu>
      <path d="M30 49q4-11 11-7q8-13 18-4q8-8 18 0q14-5 19 9l2 13-9-8H42l-8 4Z" fill="#fff8e9" stroke="#b39273" strokeWidth="1.5" />
    </Panci>
  </Panel>,
  "sd6-didih-mi": <Panel latar="#f6ebdc">
    <Panci>
      <path d="M43 60q6-9 11 0q7 10 12 0q7-10 13-1q5 9 12-1m-48 9q6-9 11 0q7 10 12 0q7-10 13-1q5 9 10-1" stroke="#d3a75e" strokeWidth="3" fill="none" />
    </Panci>
    <path d="M80 45 92 16m-12 32 3-9" stroke="#76899b" strokeWidth="3.5" />
    <rect x="82" y="9" width="37" height="21" rx="4" fill="#fffef3" />
    <text x="100.5" y="23.5" textAnchor="middle" fontSize="11" fontWeight="800" fill={TINTA} stroke="none">100 °C</text>
  </Panel>,
  "sd6-didih-jagung": <Panel latar="#f6eddd">
    <path d="M6 35q16-5 30 0m67-8q14-2 20 3m-10 8h11" stroke="#94b6c6" fill="none" />
    <Gelombang y={36} />
    <Panci>
      <path d="m47 62 21-12q8-3 12 3q4 5-3 9L54 70q-7 1-7-8Z" fill="#f3ce71" stroke="#b9924d" strokeWidth="1.5" />
      <path d="m58 58 5 7m0-10 5 8m0-10 5 8m-24 3 27-10" stroke="#bc9752" strokeWidth="1.3" />
    </Panci>
    <path d="M40 84h50l8 9H32Z" fill="#a48570" />
    <path d="M58 93q-2-5 7-8 0 4 4 5l4-3q4 4 1 6Z" fill="#ed995c" stroke="none" />
  </Panel>,
  "sd6-uap-kolam": <Panel>
    <Matahari />
    <path d="M22 49h86l-8 29H30Z" fill="#bbcad2" />
    <path d="M28 66h74l-3 11H31Z" fill={AIR} stroke="none" />
    <path d="M25 58h80" stroke="#5b899b" strokeDasharray="3 4" />
    <path d="M20 59h-8m7-5v11m90-6h8m-6-5v11" stroke="#899da9" />
    <ArusAtas x={65} y={65} />
  </Panel>,
  "sd6-uap-ikan-asin": <Panel latar="#f8f0df">
    <Matahari />
    <path d="M24 56h82l11 22H13Z" fill="#ded0a9" stroke="#9b825e" />
    <path d="M26 79v11m78-11v11M23 63h85m-91 8h95" stroke="#a38867" strokeWidth="2" />
    <Ikan x={48} y={63} /><Ikan x={76} y={72} />
    <ArusAtas x={59} y={54} />
  </Panel>,
  "sd6-uap-lantai": <Panel>
    <path d="M9 45h112v39q0 6-8 6H17q-8 0-8-6Z" fill="#dce5e9" />
    <path d="M9 61h112m-112 16h112M35 45l-4 45m34-45v45m30-45 4 45" stroke="#b2c1c9" strokeWidth="1.5" />
    <path d="M41 71q-7-6 6-8q13-5 23-1q13-3 19 3q5 3-1 7q-21 8-47-1Z" fill={AIR} stroke="#5ca7bf" />
    <path d="M88 78 114 19" stroke="#a2836d" strokeWidth="5" />
    <path d="M80 77l10-7 7 15-20 2Z" fill="#b9a0c9" />
    <ArusAtas x={60} y={60} />
  </Panel>,
  "sd6-uap-spidol": <Panel>
    <rect x="14" y="22" width="102" height="56" rx="7" fill="#fffdf4" />
    <path d="m35 65 8-22 8 22m-13-6h9m10-16v22h10q7 0 7-6q0-5-7-5q6 0 6-6q0-5-6-5ZM93 46q-11-8-15 5q-3 13 13 14" fill="none" stroke="#4f738f" strokeWidth="3" />
    <path d="m81 84 25-12 6 6-28 12-7-1Z" fill="#557e9f" />
    <ArusAtas x={67} y={49} />
  </Panel>,
  "sd6-uap-handuk": <Panel latar="#e5f3f8">
    <path d="M4 64q28 5 51 1q39-8 71 2v14H4Z" fill="#83c9df" stroke="none" />
    <path d="M4 84q27-7 73-4q30 0 49-6v11q0 12-12 12H16Q4 97 4 86Z" fill="#e8ce99" stroke="none" />
    <path d="M17 32q48 9 96 0m-93-4v56m91-56v56" stroke="#866d5d" />
    <path d="M32 36q20 3 41 2l3 31q-19 9-42 1Z" fill="#df9e90" />
    <path d="M36 62q20 3 39-3m-34 8q15 2 30-3" fill="none" stroke="#f9deba" />
    <path d="M83 45h14m-17 9h22m-18 9h10" stroke="#69a1ba" />
    <ArusAtas x={53} y={47} />
  </Panel>,
  "sd6-uap-pasir": <Panel latar="#f8efdc">
    <Matahari />
    <ellipse cx="65" cy="74" rx="48" ry="13" fill="#e7e3db" />
    <path d="M30 71q8-6 15-8q10-16 20-10q11 5 18 11q10 0 17 7q-35 15-70 0Z" fill="#d5b277" stroke="#a58a62" />
    <path d="m44 69 2-1m9-5 2 1m8 5 2-1m7-4 1 1m8 4 3 1m-33 4 3-1" stroke="#927956" />
    <ArusAtas x={60} y={56} />
  </Panel>,
  "sd6-jenis-mendidih": <Panel>
    <Gelombang />
    <Panci />
  </Panel>,
  "sd6-jenis-menguap": <Panel>
    <path d="M18 66h94l-7 13H25Z" fill={AIR} stroke="#5ca7bf" />
    <path d="M24 66q9-4 20 0t20 0t20 0t20 0" fill="none" stroke="#5ca7bf" />
    <ArusAtas x={65} y={62} />
  </Panel>,
};
