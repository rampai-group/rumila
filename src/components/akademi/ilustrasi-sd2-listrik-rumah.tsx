import type { ReactNode } from "react";
import { KabelJatuh, Luar, Orang, Stopkontak } from "./ilustrasi-sd2-listrik-luar";

const GARIS = { stroke: "#2e465b", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Rumah({ children }: { children: ReactNode }) {
  return <g {...GARIS}>
    <rect x="3" y="3" width="124" height="94" rx="12" fill="#f2f0e7" stroke="none" />
    <path d="M4 82h122v5q0 9-11 9H15Q4 96 4 87Z" fill="#d4dde3" stroke="none" />
    {children}
  </g>;
}

function Tangan({ x, y, skala = 1, rotasi = 0 }: { x: number; y: number; skala?: number; rotasi?: number }) {
  return <g transform={`translate(${x} ${y}) rotate(${rotasi}) scale(${skala})`}>
    <path d="M-28 7h24q7 0 11-4l8-6q4-4 1-7-3-2-7 1L1-6l-5-3q-6-2-12 0l-12 2Z" fill="#efbb90" stroke="#96664e" />
    <path d="M-6 1q4 2 8-2" fill="none" stroke="#b47859" strokeWidth="1.6" />
  </g>;
}

function Sakelar({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x="-14" y="-20" width="28" height="40" rx="6" fill="#fffdf5" />
    <rect x="-7" y="-12" width="14" height="24" rx="3" fill="#d3dfe3" />
    <path d="M-5 4H5" fill="none" stroke="#91a5af" />
  </g>;
}

function Layang({ x, y, skala = 1 }: { x: number; y: number; skala?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${skala})`}>
    <path d="M0-14 15-3 1 19-15-3Z" fill="#e6a257" />
    <path d="M0-14 1 19m-16-22h30" fill="none" stroke="#fff2d2" strokeWidth="1.7" />
    <path d="M1 19q-9 7-4 14t-4 10" fill="none" stroke="#a5859b" strokeWidth="1.8" />
  </g>;
}

function Tetes({ x, y }: { x: number; y: number }) {
  return <path d="M0-5q-5 6-3 8 3 4 6 0 2-2-3-8Z" fill="#8cc8e0" stroke="#6aa3be" strokeWidth="1.7" transform={`translate(${x} ${y})`} />;
}

function GelembungBicara({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M-15-8H9q7 0 7 5v8q0 5-7 5H-2l-10 7 2-7h-5q-6 0-6-6v-7q0-5 6-5Z" fill="#fdfaf3" stroke="#a7a087" strokeWidth="1.8" />
    <path d="M-13-1H8m-16 5H6" stroke="#a7a087" strokeWidth="1.7" />
  </g>;
}

export const ILUSTRASI_LISTRIK_RUMAH_SD2: Record<string, ReactNode> = {
  "sd2-listrik-rumah-dewasa": <Rumah>
    <Stopkontak x={105} y={52} />
    <path d="M88 51h-9q-17 4-17 22h-7" fill="none" stroke="#627990" strokeWidth="3.6" />
    <path d="M79 46h9v10h-9Z" fill="#6ea1c6" />
    <Orang x={62} y={86} pose="menunjuk" besar={1.28} baju="#78a49c" />
    <Orang x={27} y={87} pose="menunjuk" besar={0.77} />
    <GelembungBicara x={35} y={34} />
  </Rumah>,
  "sd2-listrik-rumah-keringkan": <Rumah>
    <Sakelar x={108} y={34} />
    <path d="M38 43q13-10 24 1l13 8 13 25-14 12q-8 5-17-2L32 76Z" fill="#8cc7bf" stroke="#659b93" />
    <path d="M37 68q10-1 21 8m-12-19q10 1 19 13m-19 7q8 4 12 10" fill="none" stroke="#c5e2d3" />
    <Tangan x={43} y={53} skala={0.89} rotasi={16} />
    <Tangan x={70} y={51} skala={0.83} rotasi={154} />
    <Tetes x={24} y={75} /><Tetes x={31} y={82} />
  </Rumah>,
  "sd2-listrik-rumah-jauhikabel": <Luar>
    <KabelJatuh />
    <path d="M7 83h18m-13-5-5 5 5 5" fill="none" stroke="#588a98" />
    <Orang x={30} y={91} kiri pose="jalan" />
  </Luar>,
  "sd2-listrik-rumah-layanglapang": <Luar>
    <path d="M19 22q3-7 10-4 3-7 11-3 3 2 4 6 7-1 9 4H19Z" fill="#fffdfa" stroke="none" />
    <path d="M12 72q17-9 34 1m48 2q12-5 22-2" fill="none" stroke="#acd1a3" />
    <Layang x={83} y={28} />
    <path d="M43 58q18-12 41-12" fill="none" stroke="#918883" strokeWidth="1.7" />
    <Orang x={24} y={89} pose="menunjuk" />
  </Luar>,
  "sd2-listrik-rumah-tombol": <Rumah>
    <rect x="18" y="19" width="81" height="51" rx="7" fill="#536b80" />
    <rect x="24" y="25" width="68" height="33" rx="4" fill="#26384e" stroke="none" />
    <path d="m34 37 12-8m-11 15 21-13" fill="none" stroke="#4b6277" strokeWidth="1.8" />
    <path d="M52 71v10m-14 1h34" fill="none" strokeWidth="4" />
    <circle cx="87" cy="64" r="3.3" fill="#8db7aa" stroke="#a0c7b7" strokeWidth="1.6" />
    <Tangan x={97} y={68} skala={0.62} rotasi={182} />
  </Rumah>,
  "sd2-listrik-rumah-lapor": <Rumah>
    <path d="M10 75q17-8 32 1l12 3m13 1q19 1 39-3l11 1" fill="none" stroke="#657b90" strokeWidth="5" />
    <path d="m53 79 13 1m-13 1 11 3m-9-6 9-2" fill="none" stroke="#d8a365" strokeWidth="1.8" />
    <Orang x={23} y={71} pose="menunjuk" besar={0.8} />
    <Orang x={102} y={73} kiri besar={1.2} baju="#78a49c" />
    <GelembungBicara x={58} y={38} />
  </Rumah>,
  "sd2-listrik-rumah-jari": <Rumah>
    <Stopkontak x={96} y={48} />
    <path d="m44 50 23-4 2 6-21 5Z" fill="#9aafb8" stroke="#718c9c" />
    <Tangan x={37} y={55} skala={0.89} />
  </Rumah>,
  "sd2-listrik-rumah-basah": <Rumah>
    <Sakelar x={97} y={47} />
    <Tangan x={65} y={54} skala={1.14} rotasi={-11} />
    <Tetes x={41} y={37} /><Tetes x={53} y={70} /><Tetes x={69} y={76} />
  </Rumah>,
  "sd2-listrik-rumah-layangkabel": <Luar>
    <path d="M111 78V17m-13 5h24m-23 7h23M7 18q50 19 115 3M7 25q50 20 115 4" fill="none" stroke="#526979" />
    <Layang x={83} y={47} skala={0.78} />
    <path d="M46 61q17-5 37 1" fill="none" stroke="#918883" strokeWidth="1.7" />
    <Orang x={27} y={92} pose="menunjuk" />
  </Luar>,
  "sd2-listrik-rumah-panjat": <Luar>
    <path d="M75 89V17m-13 4h26m-25 7h24M5 19q29 10 58 2m24 0q15 6 35 0" fill="none" stroke="#5e7181" strokeWidth="3.3" />
    <Orang x={55} y={64} pose="meraih" besar={0.83} />
    <path d="m53 61 12 1 9-5m-18-6 12-6 6 2" fill="none" stroke="#4a718a" strokeWidth="4" />
    <path d="M25 72v-9m-4 4 4-4 4 4" fill="none" stroke="#7794a3" />
  </Luar>,
  "sd2-listrik-rumah-sentak": <Rumah>
    <Stopkontak x={103} y={42} />
    <path d="M89 45H77q-6 0-7 6l-2 7-40 13" fill="none" stroke="#5d7891" strokeWidth="4.6" />
    <path d="M75 38h14v14H75Z" fill="#83a4bd" />
    <Tangan x={46} y={65} skala={0.91} rotasi={-17} />
    <path d="m47 41-14 7m4-7-4 7 7 2" fill="none" stroke="#be8668" />
  </Rumah>,
  "sd2-listrik-rumah-airdekat": <Rumah>
    <path d="M22 57h88" fill="none" stroke="#9e8d7d" strokeWidth="4" />
    <Stopkontak x={62} y={75} />
    <path d="M47 20h26l-4 35H52Z" fill="#cce7ea" stroke="#82a4b3" />
    <path d="M51 35h18l-2 18H54Z" fill="#87c3d4" stroke="none" />
    <path d="m67 20 5-9" fill="none" stroke="#b08b8b" strokeWidth="2.8" />
    <Tetes x={88} y={51} />
  </Rumah>,
};
