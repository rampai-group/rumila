import type { ReactNode } from "react";

const GARIS = { stroke: "#755749", strokeWidth: 2.3, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const MATA = "#392e32";

function Panggung({ tahap, children }: { tahap: string; children: ReactNode }) {
  return <g data-tahap-hewan={tahap}>
    <rect x="3" y="3" width="124" height="94" rx="12" fill="#f6efdf" />
    <ellipse cx="65" cy="87" rx="48" ry="5" fill="#e4d5ba" />
    <g {...GARIS}>{children}</g>
  </g>;
}

function Rumput({ x, y }: { x: number; y: number }) {
  return <path d="M-12 3Q-11-2-16-9q8 1 13 8q1-8-1-13q9 4 9 12q4-5 10-5L10 4Z" transform={`translate(${x} ${y})`} fill="#91af67" stroke="#63814c" strokeWidth="1.7" />;
}

const KAKI_SAPI = {
  berdiri: ["M-17-14l-2 11 7 1 4-12m26 0-2 13 7 1 4-14", "M-22-14l1 14h6l3-14m32 0 1 14h6l1-15"],
  baru: ["M-20-14l5 12 6-1-2-13m30 2-4 12 6 1 6-14", "M-23-14l-5 13h6l7-13m33-1 5 15h7l-4-15"],
  lari: ["M-17-14l-1 6 12 5 4-5-9-5m26 0 4 9 10-2-1-6-5 1-3-6", "M-23-14l-9 7-1 6h7l3-5 7-5m36-1 7 7h11v-6l-8-1-4-5"],
} as const;

type SapiProps = { x: number; y: number; skala: number; dewasa?: boolean; pose?: keyof typeof KAKI_SAPI | "rumput" };

function Sapi({ x, y, skala, dewasa = false, pose = "berdiri" }: SapiProps) {
  const [belakang, depan] = KAKI_SAPI[pose === "rumput" ? "berdiri" : pose];
  return <g transform={`translate(${x} ${y}) scale(${skala})`}>
    <path d="M26-31q14 0 13 15m-3 0q3-7 6-2l-1 6-5-2Z" fill="#a77766" />
    <path d={belakang} fill="#d6bfb4" />
    {dewasa && <path d="M7-15q6-4 15 0l1 6-3 1-1-4h-5l-1 4-3-1Z" fill="#e0aaa6" strokeWidth="1.6" />}
    <path d={depan} fill="#f0e4d5" />
    <path d="M-23-5h5m40 0h5" stroke="#93675d" strokeWidth="1.5" />
    <path d={dewasa ? "M-24-37q18-7 43-4q14 1 14 14q0 17-15 18h-35q-16 0-16-13q0-11 9-15Z" : "M-24-34q17-6 40-4q13 1 13 13q0 14-14 15h-29q-15 0-15-11q0-9 5-13Z"} fill="#f7eddf" />
    <path d="M-13-36q-6 11 1 15q5 6 14 1q8-5 3-18m12 1q-4 7 0 13q5 7 12 3" fill="#9e7666" stroke="none" />
    <g transform={pose === "rumput" ? "translate(-3 17) rotate(-18 -28 -23)" : undefined}>
      {dewasa && <path d="M-37-38q-8-4-8-11q6 0 11 7m8 1q4-8 9-8q1 6-7 11" fill="#ceb08a" />}
      <path d="M-38-35q-9-8-14-2q5 8 14 6m12-7q7-5 12 1q-4 6-12 6" fill="#a67b67" />
      <path d={dewasa ? "M-46-31q5-10 16-10q12 1 14 11q1 11-10 16h-10q-11-2-10-17Z" : "M-45-31q6-10 17-9q12 2 13 12q0 11-11 15h-9q-11-3-10-18Z"} fill="#f7eddf" />
      <path d="M-46-24q6-6 16-4q8 2 8 8q-2 7-12 7q-13-1-12-11Z" fill="#dfaaa4" />
      <circle cx="-38" cy="-31" r="2.3" fill={MATA} stroke="none" />
      <path d="M-40-21h1m8 2h1" stroke="#aa7978" />
    </g>
  </g>;
}

type UsiaKambing = "anak" | "muda" | "dewasa";

function Kambing({ x, y, skala, usia, kepalaTurun = false }: { x: number; y: number; skala: number; usia: UsiaKambing; kepalaTurun?: boolean }) {
  const dewasa = usia === "dewasa";
  return <g transform={`translate(${x} ${y}) scale(${skala})`}>
    <path d="M25-28q8-10 13-7q1 8-12 12m-42 10-1 13h5l4-14m26 1-2 13h5l5-15" fill="#a77d5b" />
    {dewasa && <path d="M10-14q6-5 12 0l1 7-3 1-2-5-3 4-3-1Z" fill="#dda5a0" strokeWidth="1.6" />}
    <path d="M-23-14l1 14h5l3-15m32 1 4 14h5l-1-15" fill="#d6b491" />
    <path d={dewasa ? "M-30-31q19-10 46-8q17 1 16 14q-2 13-15 13h-36q-12-3-11-19Z" : "M-27-30q16-6 40-6q15 1 15 11q0 13-15 13h-29q-14-3-11-18Z"} fill="#bf9874" />
    <path d="M-16-28q7 6 20 6q10 0 17-3" fill="none" stroke="#e2c9a7" strokeWidth="2.6" />
    <g transform={kepalaTurun ? "translate(-3 16) rotate(-20 -26 -23)" : undefined}>
      {dewasa ? <>
        <path d="M-37-40q-2-10 7-18q7-7 13-6q-13 9-11 24Z" fill="#d5c19f" />
        <path d="M-30-41q1-9 8-13q7-5 12-4q-10 7-13 18Z" fill="#d5c19f" />
        <path d="m-31-54 4 3m-6 1 4 3" fill="none" stroke="#a78664" strokeWidth="1.4" />
      </> : usia === "muda" && <path d="M-36-39q0-9 8-12l-2 11m2 0q2-6 6-8l-1 7" fill="#cfb694" />}
      <path d="M-34-37q-10-5-17 0q4 7 13 6m12-9q8-7 15-2q-3 8-14 9" fill="#d6ad8c" />
      <path d="M-38-35q7-10 17-4q10 7 5 16q-5 7-17 7h-8q-6-1-7-9Z" fill="#d9b695" />
      <path d="M-48-25q5-6 12-4l2 8-7 5q-6-1-7-9Z" fill="#ebc8ad" />
      {dewasa && <path d="m-32-17 7 2-4 10-6 2Z" fill="#9f7759" />}
      <circle cx="-35" cy="-31" r="2.25" fill={MATA} stroke="none" />
      <path d="M-46-23q4 0 6 3" fill="none" strokeWidth="1.6" />
    </g>
  </g>;
}

type UsiaGajah = "bayi" | "anak" | "muda" | "dewasa";

function Gajah({ x, y, skala, usia }: { x: number; y: number; skala: number; usia: UsiaGajah }) {
  const bayi = usia === "bayi";
  const dewasa = usia === "dewasa";
  const melangkah = usia === "anak";
  const belalaiPanjang = usia === "muda" || dewasa;
  return <g transform={`translate(${x} ${y}) scale(${skala})`} stroke="#575c70">
    <path d="M37-34q10 5 7 16l3 4" fill="none" />
    <path d={melangkah ? "M-7-23l-7 18h-8v-5l6-16m31 1 4 20 10 1-1-6-3-16" : "M-11-21l-1 19h8l3-19m24 0 1 18h9l-1-20"} fill="#9a9db2" />
    <path d={dewasa ? "M-14-53Q2-66 22-59Q44-56 45-36Q46-19 28-17H-4Q-24-20-24-36Z" : "M-13-46q15-11 31-7q22 4 22 20q0 16-18 17H0q-22-1-22-16Z"} fill="#adb2c6" />
    <path d={bayi ? "M-12-23q-8 6-6 16q5 7 12 2l5-8m19-10q-4 10 0 20h9l4-18" : melangkah ? "M-12-24l2 18h7l3-17m19-2-7 15v7h9l6-18" : "M-13-24l1 24h9l2-22m25 0 1 22h10l-1-25"} fill="#adb2c6" />
    <path d={belalaiPanjang ? "M-38-42q6-9 16-5q10 6 9 16q-2 13-12 13q-1 11-9 17q-10 7-14-1q-2-4 3-6q1 5 5 0q5-6 3-17q-8-3-1-17Z" : "M-38-40q6-9 14-7q11 3 12 14q0 12-12 13q-6 13-15 12q-6-1-5-6q2-4 6 0q5-3 4-9q-10-4-4-17Z"} fill="#adb2c6" />
    <path d={dewasa ? "M-16-46q17-9 23 6q3 18-11 24q-8-2-8-10q2-8-4-20Z" : "M-16-43q12-5 18 7q2 13-8 17q-7-2-7-9q3-5-3-15Z"} fill="#929bb1" />
    <path d="M-11-39q8 6 5 14" fill="none" stroke="#c9b8c6" strokeWidth="3" />
    <circle cx="-30" cy="-34" r={bayi ? 3.3 : 2.5} fill={MATA} stroke="none" />
    <circle cx="-30.5" cy="-34.7" r="0.8" fill="#fff" stroke="none" />
    {dewasa && <path d="M-26-23q-4 10-17 10q8-4 10-11Z" fill="#fff0d2" strokeWidth="1.6" />}
  </g>;
}

export const ILUSTRASI_TUMBUH_SAPI_KAMBING_GAJAH_SD2: Record<string, ReactNode> = {
  "sd2-tumbuh-sapi-1": <Panggung tahap="sapi-1">
    <Sapi x={68} y={86} skala={0.98} pose="baru" />
    <path d="m28 77-4-2m5 7-6 1m72-6 5-3m-4 9 5-1" fill="none" stroke="#b48e69" strokeWidth="1.7" />
  </Panggung>,
  "sd2-tumbuh-sapi-2": <Panggung tahap="sapi-2"><Sapi x={84} y={75} skala={0.86} dewasa /><Sapi x={41} y={87} skala={0.66} pose="lari" /></Panggung>,
  "sd2-tumbuh-sapi-3": <Panggung tahap="sapi-3"><Sapi x={69} y={86} skala={1.05} pose="rumput" /><Rumput x={22} y={87} /></Panggung>,
  "sd2-tumbuh-sapi-4": <Panggung tahap="sapi-4"><Sapi x={70} y={87} skala={1.26} dewasa /></Panggung>,
  "sd2-tumbuh-kambing-1": <Panggung tahap="kambing-1"><Kambing x={62} y={77} skala={0.96} usia="dewasa" /><Kambing x={102} y={83} skala={0.55} usia="anak" /></Panggung>,
  "sd2-tumbuh-kambing-2": <Panggung tahap="kambing-2"><Kambing x={69} y={87} skala={0.92} usia="anak" kepalaTurun /><Rumput x={22} y={87} /></Panggung>,
  "sd2-tumbuh-kambing-3": <Panggung tahap="kambing-3"><Kambing x={72} y={87} skala={1.08} usia="muda" /></Panggung>,
  "sd2-tumbuh-kambing-4": <Panggung tahap="kambing-4"><Kambing x={71} y={87} skala={1.25} usia="dewasa" /></Panggung>,
  "sd2-tumbuh-gajah-1": <Panggung tahap="gajah-1"><Gajah x={63} y={86} skala={0.84} usia="bayi" /></Panggung>,
  "sd2-tumbuh-gajah-2": <Panggung tahap="gajah-2"><Gajah x={47} y={75} skala={0.83} usia="dewasa" /><Gajah x={94} y={87} skala={0.61} usia="anak" /></Panggung>,
  "sd2-tumbuh-gajah-3": <Panggung tahap="gajah-3"><Gajah x={67} y={87} skala={1.02} usia="muda" /></Panggung>,
  "sd2-tumbuh-gajah-4": <Panggung tahap="gajah-4"><Gajah x={65} y={87} skala={1.25} usia="dewasa" /></Panggung>,
};
