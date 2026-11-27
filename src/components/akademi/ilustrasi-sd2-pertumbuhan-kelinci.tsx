import type { ReactNode } from "react";

const GARIS = { stroke: "#78574d", strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const BULU = "#d9af89";
const BULU_TERANG = "#f4d7bc";
const TELINGA = "#d99491";
const MATA = "#342b31";

function DasarKelinci({ anak, children }: { anak: string; children: ReactNode }) {
  return <g data-tahap-kelinci={anak}>
    <rect x="3" y="3" width="124" height="94" rx="12" fill="#f6efdf" />
    <ellipse cx="65" cy="87" rx="46" ry="5" fill="#e4d5ba" />
    <g {...GARIS}>{children}</g>
  </g>;
}

function MataTerbuka({ x, y, besar }: { x: number; y: number; besar: number }) {
  return <g>
    <circle cx={x} cy={y} r={besar} fill={MATA} stroke="none" />
    <circle cx={x - besar * 0.25} cy={y - besar * 0.35} r={besar * 0.28} fill="#fff" stroke="none" />
  </g>;
}

export const ILUSTRASI_TUMBUH_KELINCI_SD2: Record<string, ReactNode> = {
  "sd2-kelinci-baru-lahir": <DasarKelinci anak="baru-lahir">
    <path d="M24 83q7-10 22-12q28-6 51 1q7 2 11 11q-16 6-41 6q-28 0-43-6Z" fill="#e8d3a4" stroke="#bca175" />
    <path d="m28 82 12-5m2 9 13-5m34-3 11 5m-46 3 12-2" fill="none" stroke="#c5ac82" strokeWidth="1.8" />
    <path d="M52 66q14-19 33-12q15 5 14 17q-3 10-20 10H50Z" fill="#eaa8a2" />
    <path d="M74 65q10-7 15-1q4 5-1 9q-5 2-11-1" fill="#edb6ae" />
    <path d="M44 65q13-13 19-8q3 6-5 10l-11 4Z" fill="#e69896" />
    <path d="M31 71q3-11 17-10q15 1 15 10q0 11-15 11q-14 0-17-7l-4-1Z" fill="#efb0a8" />
    <path d="M36 70q4 3 8-1m4 11 5-1" fill="none" strokeWidth="1.9" />
    <path d="m31 72 3 2-3 2" fill="#b77677" stroke="none" />
  </DasarKelinci>,
  "sd2-kelinci-mata-terbuka": <DasarKelinci anak="mata-terbuka">
    <path d="M88 70q15-9 16 2q-3 7-13 7Z" fill={BULU_TERANG} />
    <path d="M54 70q3-19 22-18q13 1 20 15l-2 7 1 4-7 6H53Z" fill={BULU} />
    <path d="M47 54q-7-11-5-20q2-4 6-1q6 5 8 19m2 1q0-11 5-17q3-3 6 0q2 9-4 19" fill={BULU} />
    <path d="M48 42l5 9m10-7-2 8" stroke={TELINGA} strokeWidth="2.5" />
    <path d="M36 66q2-9 13-13l4 1 4-4 3 4 5-3 1 6q12 4 11 15q0 11-14 13H45l-4-3-5 1-4-6 2-6-4-2Z" fill={BULU_TERANG} />
    <path d="M52 83q3-7 12-6h7q8 0 8 7Z" fill={BULU} />
    <MataTerbuka x={46} y={67} besar={3.7} />
    <path d="m34 72 4 2-5 1m1 4 5-1" strokeWidth="1.5" fill="none" />
  </DasarKelinci>,
  "sd2-kelinci-muda": <DasarKelinci anak="muda">
    <path d="M94 61q15-11 17-2q2 9-13 10" fill={BULU_TERANG} />
    <path d="M52 64q10-16 25-19q15-4 24 11q7 17-15 21L60 80Z" fill={BULU} />
    <path d="M62 70q1 9-7 14H41q-3-5 7-7l4-9m31 0q11 1 13 10l9 1q7 1 6 6H84l-8-12" fill={BULU} />
    <path d="M45 47q-14-18-14-32q-1-7 4-8q5 1 10 10q6 11 8 27m2 1q-1-15 4-28q3-8 8-8q6 3 1 15l-6 24" fill={BULU} />
    <path d="M35 16q3 12 12 25m16-23-4 24" fill="none" stroke={TELINGA} strokeWidth="3.2" />
    <path d="M33 56q5-12 20-12q15 1 17 10q3 11-7 16l-13 4H38q-9 0-12-9l-5-1 5-4Z" fill={BULU_TERANG} />
    <MataTerbuka x={44} y={56} besar={3.3} />
    <path d="m26 60 4 2-4 2m5 5 7-1" fill="none" strokeWidth="1.5" />
  </DasarKelinci>,
  "sd2-kelinci-dewasa": <DasarKelinci anak="dewasa">
    <path d="M101 70q4-9 12-7q9 1 8 8q-3 8-18 7Z" fill="#f7e4ce" />
    <path d="M48 62q19-14 35-16q19-2 27 15q6 22-15 25H59q-16-2-15-11Z" fill={BULU} />
    <path d="M74 78q-4-14 10-19q12-4 18 7m-18 11q10 0 15 5q3 4-5 5H78" fill="none" stroke="#a67a61" />
    <path d="M49 68q12-8 17 1q3 8-6 12q6 2 4 6H43q-7-3 0-8l3-7Z" fill={BULU_TERANG} />
    <path d="M41 48q-12-14-16-31q-4-14 2-15q9-1 16 13q6 11 7 29m3-1q0-21 8-35q6-10 13-5q5 5-1 15L61 46" fill={BULU} />
    <path d="M30 11q5 18 14 30M67 10q-7 15-9 31" fill="none" stroke={TELINGA} strokeWidth="4.5" />
    <path d="M27 56q6-15 24-14q14 0 20 11q4 12-10 20q-14 7-28 2q-10-4-10-11l-6-2 5-5Z" fill={BULU_TERANG} />
    <MataTerbuka x={42} y={55} besar={3.4} />
    <path d="m23 59 5 3-6 2m7 7 8-2m-6-3 7-1" fill="none" strokeWidth="1.6" />
  </DasarKelinci>,
};
