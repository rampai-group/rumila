import type { ReactNode } from "react";

const GARIS = { stroke: "#78574d", strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const TABI = "#db9860";
const TABI_TERANG = "#f9dfbd";
const ANJING = "#c98b68";
const ANJING_TERANG = "#f4d8af";
const KUDA = "#c38566";
const SURAI = "#875a50";

function Bingkai({ children }: { children: ReactNode }) {
  return (
    <g>
      <rect x="3" y="3" width="124" height="94" rx="12" fill="#f6efdf" />
      <ellipse cx="65" cy="87" rx="48" ry="5" fill="#e4d5ba" />
      <g {...GARIS}>{children}</g>
    </g>
  );
}

function Mata({ cx, cy, r = 2.8 }: { cx: number; cy: number; r?: number }) {
  return <g stroke="none">
    <circle cx={cx} cy={cy} r={r} fill="#352d32" />
    <circle cx={cx - 0.55} cy={cy - 0.8} r={r * 0.29} fill="#fff" />
  </g>;
}

function KepalaKucing({ x, y, skala = 1, tidur = false }: { x: number; y: number; skala?: number; tidur?: boolean }) {
  return <g transform={`translate(${x} ${y}) scale(${skala})`}>
    <path d="M-16-3l-1-12l9 5q8-3 15 0l9-5l-1 12q4 4 3 10q-2 9-17 9q-16 0-18-9q-1-5 1-10Z" fill={TABI} />
    <path d="m-14-9 5 3m23-3-5 3" stroke="#ca8983" strokeWidth="2.6" />
    <path d="M-13 7q5-7 13-3q8-4 14 3q-4 7-14 7q-11 0-13-7Z" fill={TABI_TERANG} stroke="none" />
    <path d="m-3-8 1 4m6-4-1 4m-4 10 2 2 2-2m-2 2q-1 4-4 3m4-3q1 4 4 3m-13-3-8-2m8 5-8 1m27-5 8-2m-8 5 8 1" fill="none" strokeWidth="1.45" />
    {tidur
      ? <path d="M-11 2q3 4 6 0m10 0q3 4 6 0" fill="none" strokeWidth="1.9" />
      : <><Mata cx={-8} cy={2} /><Mata cx={9} cy={2} /></>}
  </g>;
}

function KepalaAnjing({ x, y, skala = 1, tegak = false, tidur = false }: { x: number; y: number; skala?: number; tegak?: boolean; tidur?: boolean }) {
  return <g transform={`translate(${x} ${y}) scale(${skala})`}>
    <path d={tegak ? "M-12 0l-2-17q2-3 5 0l9 10m4 1l8-12q3-2 4 2l1 17" : "M-9-6q-13-3-14 8q-1 10 6 13q7-2 9-15m17-6q13-2 15 8q1 9-5 12q-7-1-10-14"} fill="#9e6856" />
    <path d="M-15 2q1-11 15-12q14 0 16 12q6 3 5 9q-3 6-13 7H-4q-12-1-13-8Z" fill={ANJING} />
    <path d="M-4 9q7-6 14-4q8-2 11 4q-2 7-10 7H2q-6-1-6-7Z" fill={ANJING_TERANG} stroke="none" />
    <path d="M11 6q4-2 7 1q0 5-4 5q-3-1-3-6Z" fill="#51403c" strokeWidth="1.4" />
    {tidur
      ? <path d="M-9 3q3 3 6 0m6-1q2 3 5 0" fill="none" strokeWidth="1.9" />
      : <><Mata cx={-7} cy={3} /><Mata cx={6} cy={2} /></>}
    <path d="M12 13q-4 3-7 1" fill="none" strokeWidth="1.45" />
  </g>;
}

function KepalaKuda({ x, y, skala = 1 }: { x: number; y: number; skala?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${skala})`}>
    <path d="M-5-13l-3-9q2-3 6 0l4 6m3 1l5-8q4-3 4 1l-1 11" fill={KUDA} />
    <path d="M-5-16q12-5 21 4l7 22l-15 3l-9-2l-15 3q-9-1-8-8l13-16Z" fill={KUDA} />
    <path d="M-19 3q8-3 13 2l-7 7q-9 1-11-5Z" fill="#e5b492" stroke="none" />
    <path d="M-4-14q9-7 17-3l6 8q-4-1-9-1q-4 1-7 5l-3-6l-6 2Z" fill={SURAI} />
    <Mata cx={-4} cy={-3} r={2.65} />
    <path d="M-18 6l2-1" strokeWidth="2.5" />
  </g>;
}

export const ILUSTRASI_TUMBUH_PELIHARAAN_SD2: Record<string, ReactNode> = {
  "sd2-tumbuh-kucing-1": <Bingkai>
    <path d="M25 81q8-13 23-15q30-3 49 1q10 3 15 13q-16 9-44 9q-28 0-43-8Z" fill="#ead6aa" stroke="#bda378" />
    <path d="m35 80 13-3m45 4 9-2m-51 5 16-2" stroke="#bfaa83" strokeWidth="1.7" />
    <path d="M43 71q3-17 21-22q17-6 33 7q12 12-3 23q-10 6-25 0q-13 3-26-8Z" fill={TABI} />
    <path d="M87 54q12 7 10 16q-2 7-14 9q-13 1-15-5q-2-4 3-6q5 5 11 1" fill={TABI} />
    <path d="M70 52l4 6m6-7 3 6" fill="none" stroke="#aa6f4e" strokeWidth="2" />
    <KepalaKucing x={47} y={67} skala={0.78} tidur />
    <path d="M53 78q6-6 12-3q3 3-2 6H51Z" fill={TABI_TERANG} strokeWidth="1.7" />
  </Bingkai>,
  "sd2-tumbuh-kucing-2": <Bingkai>
    <path d="M85 58q18-1 23-14q2-6 5-5q7 1 3 11q-7 16-26 16" fill={TABI} />
    <path d="M59 62q12-16 31-13q11 3 13 14q-2 10-17 11H66Z" fill={TABI} />
    <path d="M74 54l4 8m5-11 3 9m6-7 2 5" fill="none" stroke="#aa6f4e" strokeWidth="2.4" />
    <path d="M67 69q-10 6-20 6l-7-1q-4 0-4 4q2 3 10 2l22-4m17-8q8 10 22 9q5 0 5 4q-3 5-10 3l-19-4" fill={TABI_TERANG} />
    <path d="M67 69q-5 11-12 14l-7 1q-5 2-2 4q5 2 12-1l15-11m14-7q4 9 1 15l10 1q4 1 2 4H84q-3-4-2-10" fill={TABI} />
    <KepalaKucing x={49} y={56} skala={0.93} />
  </Bingkai>,
  "sd2-tumbuh-kucing-3": <Bingkai>
    <path d="M84 49q18-4 19-22q1-10 6-10q5 1 4 11q-1 24-25 31" fill={TABI} />
    <path d="M53 54l-4 30q-1 4-8 3l1-28m37-5 3 29h-7l-4-27" fill="#bf875f" />
    <path d="M49 46q25-8 43 1q6 10-2 17q-10 3-21-2l-18 4q-12 0-14-8Z" fill={TABI} />
    <path d="m61 47 3 9m8-11 4 9m7-8 3 8" fill="none" stroke="#aa6f4e" />
    <path d="M51 60l6 26q1 4-4 4h-8q-3-2 4-5l-9-23m49-4 4 25 7 2q3 4-2 5H87l-9-28" fill={TABI} />
    <KepalaKucing x={39} y={47} skala={0.98} />
  </Bingkai>,
  "sd2-tumbuh-kucing-4": <Bingkai>
    <path d="M87 66q17 19 27 12q7-2 7 3q-6 14-29 4l-10-9" fill={TABI} />
    <path d="M43 68q0-17 15-29q17-8 30 8q11 13 7 29q-3 14-19 13H43q-8-8 0-21Z" fill={TABI} />
    <path d="M47 61q14 3 20-9q4 15-4 29H47Z" fill={TABI_TERANG} stroke="none" />
    <path d="M68 62q9-10 18 1q5 8-1 16m-7-30 4 7m7 1 3 6m-39 7-2 13q-8 0-9 6h15q4-4 5-12" fill="none" />
    <path d="M63 82q10-6 15 0q3 5-2 7H61Z" fill={TABI_TERANG} strokeWidth="1.8" />
    <KepalaKucing x={56} y={38} skala={1.19} />
  </Bingkai>,
  "sd2-tumbuh-anjing-1": <Bingkai>
    <path d="M23 79q9-12 26-12h43q13 3 17 12q-10 10-42 10q-30 0-44-10Z" fill="#e9d1a5" stroke="#baa077" />
    <path d="M30 79l13-4m46 7 11-5m-43 8 12-2" fill="none" stroke="#c1a982" strokeWidth="1.8" />
    <path d="M44 70q1-15 21-19q22-2 31 13q5 14-13 18H55Z" fill={ANJING} />
    <path d="M87 60q16 4 11 14q-3 7-13 7q-8 0-9-4" fill="none" stroke="#9e6856" strokeWidth="3.5" />
    <KepalaAnjing x={45} y={65} skala={0.73} tidur />
    <path d="M52 78q12-7 17-2q1 3-4 6H50Z" fill={ANJING_TERANG} strokeWidth="1.8" />
  </Bingkai>,
  "sd2-tumbuh-anjing-2": <Bingkai>
    <path d="M91 49q11-6 14-17q2-5 6-1q3 12-13 24" fill={ANJING} />
    <path d="M55 62q15-18 37-21q14 0 13 18q-3 15-33 12H60Z" fill={ANJING} />
    <path d="m64 67-15 9-8 2q-4 1-3 5h11l22-10m17-8-2 16h11q6-3-3-6l7-13" fill="#aa755b" />
    <path d="M64 65q1 11-16 17l-8 1q-4 1-4 5h14q13 0 23-13m18-10 4 19 11 1q5 5-1 5H93l-10-18" fill={ANJING_TERANG} />
    <g transform="translate(37 57) rotate(14)"><KepalaAnjing x={0} y={0} skala={0.97} /></g>
    <circle cx="27" cy="77" r="10" fill="#83b7be" stroke="#647883" />
    <path d="M20 72q12 2 9 13m1-15 3 2" fill="none" stroke="#d9eff0" strokeWidth="2.2" />
  </Bingkai>,
  "sd2-tumbuh-anjing-3": <Bingkai>
    <path d="M80 72q24 10 27-8q4-7 8-2q4 14-9 22q-13 7-30-1" fill={ANJING} />
    <path d="M45 58q0-17 13-22q12-5 23 13q11 13 9 27q0 11-17 12H44q-7-5 0-18Z" fill={ANJING} />
    <path d="M46 53q5 6 14 4q10 10 4 28H45Z" fill={ANJING_TERANG} stroke="none" />
    <path d="M70 69q12-8 15 5q2 7-4 10m-23-15-1 16q-1 4-6 4H41q-3-4 7-7l2-14" fill="none" />
    <KepalaAnjing x={54} y={42} skala={1.07} tegak />
  </Bingkai>,
  "sd2-tumbuh-anjing-4": <Bingkai>
    <path d="M75 76V42l23-18 22 18v34Z" fill="#e9cfaa" stroke="#b49a78" />
    <path d="m70 46 28-24 25 24" fill="none" stroke="#b37b6b" strokeWidth="4.5" />
    <path d="M102 76V57q0-6 6-6h5v25" fill="#b79b84" stroke="#a98d76" strokeWidth="1.8" />
    <path d="M75 52h12v10H75Z" fill="#c6d9ce" stroke="#a98d76" strokeWidth="1.7" />
    <path d="M46 60q-13-3-17-16q-2-6-5-4q-5 5 2 17q7 11 21 12" fill={ANJING} />
    <path d="M47 66l-3 19h-9q-5-4 2-7l2-16m47 3-1 18h8q6 5-1 6H80l-5-18" fill="#9e6856" />
    <path d="M37 57q7-13 27-11q14-2 24-2q16 11 7 23q-15 8-29 4H48q-11 1-11-14Z" fill={ANJING} />
    <path d="M73 54q8-7 14-10q13 7 12 15q-1 6-8 12H79Z" fill={ANJING_TERANG} stroke="none" />
    <path d="M50 66l1 16 7 2q5 4 1 6H45q-5 0-4-6l-1-17m52-3-1 18 10 1q6 4 1 7H86q-5 0-4-7l-3-17" fill={ANJING} />
    <KepalaAnjing x={84} y={47} skala={1.03} tegak />
  </Bingkai>,
  "sd2-tumbuh-kuda-1": <Bingkai>
    <path d="M83 51q12-2 13 7q-3 10 6 14q-7 4-12-5l-5-9" fill={SURAI} />
    <path d="m47 60-7 10 7 13h-6l-8-13 8-13m34 0 5 12-2 15h-6l2-14-7-11" fill="#af755e" />
    <path d="M38 50q14-7 25-2q10-3 23 3q10 7 2 15q-13 8-38 4q-13 0-14-9Z" fill={KUDA} />
    <path d="m45 60 9 12-1 13h-7l1-11-8-9m38-4 12 10-3 14h-7l3-12-12-6" fill={KUDA} />
    <path d="M39 83h8m-1 2h7m19-1h6m1 1h7" fill="none" stroke="#5e4a43" strokeWidth="3.4" />
    <path d="M38 58l-5-14 11-8 10 13-2 14" fill={KUDA} />
    <KepalaKuda x={36} y={42} skala={0.76} />
    <path d="m29 68-2 4 2 5m68-4 3 4-2 4" fill="none" stroke="#a18270" strokeWidth="1.8" />
  </Bingkai>,
  "sd2-tumbuh-kuda-2": <Bingkai>
    <path d="M92 51q16-9 29 2q-9 1-5 8q-10-1-20-4Z" fill={SURAI} />
    <path d="m48 65-14 13-15 2l-1 6 19-2 17-14m31-9 6 13-3 15h7l4-17-6-9" fill="#a9735e" />
    <path d="M37 58q7-16 18-13q16 2 27 0q18 0 20 12q-1 15-20 14H54q-15 3-17-13Z" fill={KUDA} />
    <path d="m48 65-5 8-13 2-2 6 19-1 9-10m33-6 12 7 11-3 2 6-15 6-16-10" fill={KUDA} />
    <path d="m19 80-1 6m13-11-3 6m85-13 2 6m-27 15h7" fill="none" stroke="#5e4a43" strokeWidth="3.4" />
    <path d="M43 60l-6-15 13-11 13 17-10 17" fill={KUDA} />
    <KepalaKuda x={41} y={43} skala={0.88} />
  </Bingkai>,
  "sd2-tumbuh-kuda-3": <Bingkai>
    <path d="M94 44q10-2 13 9q0 14 10 19q-10 4-15-8l-8-15" fill={SURAI} />
    <path d="M51 62l-3 24H39l4-28m41 2 3 24h-7l-6-24" fill="#a7715c" />
    <path d="M30 57q3-17 15-20q10-2 20 6q16-5 29 0q15 10 7 24q-6 8-24 5l-24-1q-19 2-23-14Z" fill={KUDA} />
    <path d="M43 62l2 20-5 5h-8l3-25m62-3 2 19-4 10h-9l4-13-7-15" fill={KUDA} />
    <path d="M32 87h8m0-1h8m31-1h8m-1 3h9" fill="none" stroke="#5e4a43" strokeWidth="3.5" />
    <path d="M39 62q-6-12-10-23l16-12q9 5 15 20l-10 18" fill={KUDA} />
    <path d="M39 32q15-7 22 13l-9-4-5 6Z" fill={SURAI} strokeWidth="1.7" />
    <KepalaKuda x={34} y={32} skala={0.94} />
  </Bingkai>,
  "sd2-tumbuh-kuda-4": <Bingkai>
    <path d="M98 47q16 3 14 21q1 9 8 12q-13 5-20-6l-6-17" fill={SURAI} />
    <path d="M52 65l-5 22h-8l1-25m47-1 3 25h-9l-5-25" fill="#a76d55" />
    <path d="M31 51q5-21 22-21q12 0 19 12q17-6 27 3q13 11 5 23q-7 9-25 8H51q-21-1-20-25Z" fill={KUDA} />
    <path d="M38 67l2 19-5 3h-8l2-26m72-1 1 19-5 8h-9l4-12-7-14" fill={KUDA} />
    <path d="M27 89h8m4-2h8m34-1h9m-2 3h9" fill="none" stroke="#5e4a43" strokeWidth="3.5" />
    <path d="M44 63q-8-10-14-24l18-19q16 2 20 24q-3 12-19 22" fill={KUDA} />
    <path d="M46 24q17-6 24 13l-2 14-7-8-5 2-9-13" fill={SURAI} />
    <path d="M72 53q20-10 30 2m-51 14q11 8 23 2" fill="none" stroke="#a76d55" strokeWidth="2" />
    <KepalaKuda x={35} y={30} skala={1.05} />
  </Bingkai>,
};
