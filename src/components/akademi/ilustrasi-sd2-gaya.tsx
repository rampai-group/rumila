import type { ReactNode } from "react";
import { ILUSTRASI_GERAK_PILOT } from "./ilustrasi-pilot-gerak";

const TINTA = "#30465b";
const KULIT = "#f3bf90";
const COKELAT = "#67483b";
const GARIS = { stroke: TINTA, strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Adegan({ children }: { children: ReactNode }) {
  return <g {...GARIS}>
    <rect x="3" y="3" width="124" height="94" rx="12" fill="#f7f2e7" stroke="none" />
    {children}
  </g>;
}

function Bola({ x, y, r = 14, basket = false }: { x: number; y: number; r?: number; basket?: boolean }) {
  return <g transform={`translate(${x} ${y}) scale(${r / 15})`}>
    <circle r="15" fill={basket ? "#f59c55" : "#fffefa"} />
    {basket ? (
      <path d="M-15 0H15M0-15V15M-10-11Q3 0-10 11m20-22Q-3 0 10 11" fill="none" stroke="#8b5138" strokeWidth="1.9" />
    ) : (
      <path d="M0-7l7 5-3 8h-8l-3-8Z M0-7V-15M7-2l7-3M4 6l5 7m-13-7-5 7m2-15-7-3" fill={TINTA} strokeWidth="1.7" />
    )}
  </g>;
}

function Tangan({ x, y, rotasi = 0, balik = false, skala = 1 }: { x: number; y: number; rotasi?: number; balik?: boolean; skala?: number }) {
  return <g transform={`translate(${x} ${y}) rotate(${rotasi}) scale(${balik ? -skala : skala} ${skala})`}>
    <path d="M-29 7 0 7q6 0 9-3l6-7q3-5-1-6-2-1-7 3l-6 4-3-3 14-9q4-4 1-6-2-2-5 0L-8-9l-7 2-14-1Z"
      fill={KULIT} stroke="#98694f" strokeWidth="2.1" />
    <path d="M-1-2q2 3 7 3" fill="none" stroke="#b47d5e" strokeWidth="1.6" />
  </g>;
}

function SepatuTekan() {
  return <g>
    <path d="M38 15h24l-1 33-23 2Z" fill="#6296bf" />
    <path d="M38 43h24q3 8 13 9l14 4q7 3 7 9H37Z" fill="#e58b53" />
    <path d="M38 62h58v5H38Z" fill="#fbede0" />
    <path d="m62 47-6 5m13-3-6 5" fill="none" stroke="#faf5ea" strokeWidth="2" />
  </g>;
}

function Gerak({ d }: { d: string }) {
  return <path d={d} fill="none" stroke="#b46842" strokeWidth="2.5" />;
}

function TopangBola({ basket = false }: { basket?: boolean }) {
  return <Adegan>
    <Gerak d="M25 38h14m-20 10h17m-10 9h12" />
    <Bola x={63} y={46} r={basket ? 20 : 16} basket={basket} />
    <Tangan x={90} y={42} rotasi={168} />
    <Tangan x={86} y={69} rotasi={198} balik />
  </Adegan>;
}

function JariTekan({ children }: { children: ReactNode }) {
  return <Adegan>
    <path d="M19 81H111" stroke="#c4ad89" strokeWidth="3" />
    {children}
    <Tangan x={77} y={46} rotasi={148} />
    <Gerak d="m43 42-6-5m3 13-8-2" />
  </Adegan>;
}

export const ILUSTRASI_GAYA_SD2: Record<string, ReactNode> = {
  "sd2-gaya-sundul": <Adegan>
    <path d="M31 77 38 57l23-9 12 12-16 18Z" fill="#69ae9a" />
    <path d="m57 60 12 5 12-3" fill="none" stroke={KULIT} strokeWidth="7" />
    <ellipse cx="61" cy="42" rx="14" ry="13" fill={KULIT} />
    <path d="M48 42q-3-12 7-16 10-4 17 6l-11 1-5 9Z" fill={COKELAT} stroke="none" />
    <circle cx="68" cy="42" r="1.6" fill={TINTA} stroke="none" />
    <Bola x={88} y={35} />
    <Gerak d="m105 29 10-5m-9 12 12-2" />
  </Adegan>,
  "sd2-gaya-kasti": <Adegan>
    <circle cx="32" cy="36" r="11" fill={KULIT} />
    <path d="M20 33q1-12 12-12 8 0 13 10l7 1-20 3Z" fill="#819dce" />
    <path d="M27 49h15l8 19-24 4Z" fill="#efaa5a" />
    <path d="m30 70-7 17m18-18 14 14" fill="none" stroke="#567791" strokeWidth="6" />
    <path d="m35 54 13 5 9-2" fill="none" stroke={KULIT} strokeWidth="7" />
    <path d="M53 61l23-23q7-6 10-1t-3 9L58 65Z" fill="#c68852" />
    <circle cx="96" cy="36" r="9" fill="#fdfcf7" />
    <path d="M91 30q8 5 10 12" fill="none" stroke="#a66761" strokeWidth="1.5" />
    <Gerak d="m104 22 9-5m-5 12 11-4" />
  </Adegan>,
  "sd2-gaya-tahan": <TopangBola basket />,
  "sd2-gaya-gawang": <Adegan>
    {ILUSTRASI_GERAK_PILOT["pilot-tendang-bola"]}
    <Gerak d="M96 49q-2-17 18-24m-9 0 9 0-5 8" />
  </Adegan>,
  "sd2-gaya-dayung": <Adegan>
    <path d="M10 74q12-8 25 0 15 8 30 0 15-8 30 0 13 6 25-2M15 86q19-6 34 0 16 5 32-1 16-7 34 0" fill="none" stroke="#78b9cf" strokeWidth="3" />
    <path d="M21 58q32 5 87-4L92 73H39Z" fill="#d69150" />
    <circle cx="58" cy="27" r="9" fill={KULIT} />
    <path d="M49 25q1-12 12-10l8 10-12-3Z" fill={COKELAT} stroke="none" />
    <path d="m53 37 12 0 6 19-23 3Z" fill="#75ab9b" />
    <path d="m61 42 13 5 9-3" fill="none" stroke={KULIT} strokeWidth="6" />
    <path d="m67 31 35 42" stroke="#895d40" strokeWidth="4" />
    <path d="m97 66 12 5 5 9-8 6-8-8Z" fill="#e9b66f" />
    <path d="m104 62 5-4m2 10 8-2" stroke="#78b9cf" strokeWidth="2.4" />
  </Adegan>,
  "sd2-gaya-bolastres": <Adegan>
    <path d="M47 29Q66 22 83 32q4 7-1 14l1 12q4 13-9 17-21 7-35-8-4-6 2-13l5-8q-6-9 1-17Z" fill="#e7786b" stroke="#aa534c" />
    <path d="M52 36q11-8 23-3m-28 29q7 9 16 10" fill="none" stroke="#ffc3aa" strokeWidth="2.7" />
    <Tangan x={38} y={57} rotasi={-5} />
    <Tangan x={93} y={49} rotasi={171} />
  </Adegan>,
  "sd2-gaya-kardus": <Adegan>
    <path d="M30 69 49 62l16 8 32-1 6 10-18 8H32Z" fill="#c9935e" />
    <path d="m32 75 19-8 13 8 12-3 9 15m-34-20-1 16m35 4 4-12-12-3" fill="none" stroke="#865e42" strokeWidth="2" />
    <SepatuTekan />
    <Gerak d="m27 53-6-5m3 12-9-2m88-8 6-6m-5 16 9-3" />
  </Adegan>,
  "sd2-gaya-sedotan": <Adegan>
    <path d="M46 50h37l-6 33q-13 5-25 0Z" fill="#dfeef0" stroke="#7796a5" />
    <path d="M51 65h26l-4 15q-9 3-18 0Z" fill="#edb87a" stroke="none" />
    <path d="m60 71 5-42 27 10" fill="none" stroke="#d27368" strokeWidth="7" />
    <path d="m62 65 4-35 23 8" stroke="#f7b3a6" strokeWidth="1.6" fill="none" />
    <Tangan x={92} y={32} rotasi={162} />
    <Gerak d="m59 22-4-6m11 6 1-7" />
  </Adegan>,
  "sd2-gaya-pasir": <JariTekan>
    <path d="M18 74q4-11 19-14 9-2 18 2 11 4 19-2 23-2 37 14-10 10-43 11-40 1-50-11Z" fill="#c8a16b" stroke="#987952" />
    <path d="M34 69q10-5 21-2m12 6q7-2 20-3m-44 8 9-2" fill="none" stroke="#e9c895" strokeWidth="2.5" />
    <path d="m21 58 11-2m62 9 14 2" fill="none" stroke="#7fb8c2" strokeWidth="2.4" />
  </JariTekan>,
  "sd2-gaya-matras": <Adegan>
    <path d="M16 71q19-2 30 2 11 4 22 2 13-6 43-4v14q-21 0-41 5-24 4-46-2-6-2-8-5Z" fill="#77a7cc" stroke="#547caa" />
    <path d="M18 73q17-3 28 1 11 5 24 2 19-6 39-4" fill="none" stroke="#a9d4ea" strokeWidth="3" />
    <circle cx="52" cy="31" r="10" fill={KULIT} />
    <path d="M42 32q-2-13 10-13 8 0 11 10l-8-3-7 5Z" fill={COKELAT} stroke="none" />
    <path d="M44 44q8-7 15-2l7 22-19 3Z" fill="#eaaa5e" />
    <path d="M49 66h17l16-5 9 13-7 4-8-8-13 8H50Z" fill="#587a99" />
    <path d="m58 47 5 11 10 3" stroke={KULIT} fill="none" strokeWidth="5.5" />
    <Gerak d="m36 69-5-4m72 0 7-3" />
  </Adegan>,
  "sd2-gaya-tendang": <Adegan>
    {ILUSTRASI_GERAK_PILOT["pilot-tendang-bola"]}
    <path d="M14 86H118" fill="none" stroke="#b1bf9d" strokeWidth="2.7" />
  </Adegan>,
  "sd2-gaya-tangkap": <TopangBola />,
  "sd2-gaya-rem": <Adegan>
    <circle cx="31" cy="74" r="16" fill="none" stroke="#536e87" strokeWidth="4" />
    <circle cx="103" cy="74" r="16" fill="none" stroke="#536e87" strokeWidth="4" />
    <path d="M31 74l16-27 19 27H31l36-24h23l13 24-11-42h9" fill="none" stroke="#70a48f" strokeWidth="3.4" />
    <path d="M42 45h12m36-11h9m-8 2 6 7" fill="none" stroke={TINTA} strokeWidth="3" />
    <circle cx="62" cy="24" r="9" fill={KULIT} />
    <path d="M53 25q-2-13 10-12 8 0 11 10l-9-2-6 4Z" fill="#7399c7" />
    <path d="m52 55 4-18 13-3 7 9-13 17Z" fill="#efad69" />
    <path d="m60 54 13 7-7 13m4-33 11 3 11-8" fill="none" stroke={KULIT} strokeWidth="5.5" />
    <Gerak d="m101 47 5-5m-1 10 7-2" />
  </Adegan>,
  "sd2-gaya-kok": <Adegan>
    <path d="m15 74 25-25" stroke="#729baa" strokeWidth="7" />
    <ellipse cx="56" cy="38" rx="22" ry="14" transform="rotate(-42 56 38)" fill="#ddeceb" stroke="#527888" strokeWidth="3.5" />
    <path d="m42 33 16 16m-8-22 14 15m-22-2 19-16m-14 23 19-16m-14 22 18-16" fill="none" stroke="#8bb2b6" strokeWidth="1.4" />
    <path d="m75 32 23-7 8 14-24 7Z" fill="#fffef6" />
    <path d="m82 37 18-8m-15 11 17-5" stroke="#97aab3" strokeWidth="1.6" />
    <ellipse cx="77" cy="40" rx="6" ry="8" fill="#e5a355" transform="rotate(-20 77 40)" />
    <Gerak d="m107 21 8-4m-6 11 10-3" />
    <Tangan x={39} y={69} rotasi={-17} />
  </Adegan>,
  "sd2-gaya-perahu": <Adegan>
    <path d="M46 75q13-6 25 0t25 0q12-5 24 0m-65 9q14-3 30 0 19 3 30-2" fill="none" stroke="#75bed0" strokeWidth="3" />
    <path d="m66 64 22-21 20 21 11-4-10 14H78Z" fill="#fff9eb" stroke="#7395a4" />
    <path d="M76 64h32L89 72Z" fill="#bed7df" stroke="#7395a4" strokeWidth="1.5" />
    <path d="M15 66q8-17 17-21l13 12-13 17H15Z" fill="#78a1c5" />
    <path d="M32 26q13-1 19 8l3 8-8 3-3 7q-15 0-20-8l-2-10Z" fill={KULIT} />
    <path d="M21 41q-6-9 0-17 7-6 16-4l6 7-10 0-6 9Z" fill={COKELAT} stroke="none" />
    <circle cx="43" cy="35" r="1.7" fill={TINTA} stroke="none" />
    <path d="M55 45q7-5 14-2m-11 8 15-2m-13 8 8-1" fill="none" stroke="#78a3b4" strokeWidth="2" />
  </Adegan>,
  "sd2-gaya-troli": <Adegan>
    {ILUSTRASI_GERAK_PILOT["pilot-dorong-troli"]}
    <Gerak d="m109 81 10 0m-5-4 5 4-5 4" />
  </Adegan>,
  "sd2-gaya-remas": <Adegan>
    <path d="m43 39 10-10 14 3 11-2 13 12-4 11 7 10-15 12-14-3-13 3-13-9 5-13Z" fill="#fffdf4" stroke="#8599a0" />
    <path d="m50 45 13-7 8 9 11-7m-20-1-3 17 10 8-5 8m-16-7 11-9 16 1 6 9" fill="none" stroke="#a8bac0" strokeWidth="1.9" />
    <Tangan x={37} y={68} rotasi={-17} />
    <Tangan x={95} y={47} rotasi={174} />
  </Adegan>,
  "sd2-gaya-plastisin": <JariTekan>
    <path d="M33 69q5-13 21-14 14 0 19 8 21-2 24 8-4 8-30 8-28 0-34-10Z" fill="#aa86c5" stroke="#745591" />
    <path d="M51 63q11-4 16-1m6 8 13-2" fill="none" stroke="#d2b5e1" strokeWidth="2.7" />
  </JariTekan>,
  "sd2-gaya-kaleng": <Adegan>
    <path d="M38 71q11-7 28-3 15-3 25 5l-4 10q-9 8-19 1-13 5-27-1Z" fill="#a9bec4" stroke="#65828d" />
    <path d="M49 70q-7 5-4 14m27-16 5 8-9 7m12-14 6 6" fill="none" stroke="#65828d" strokeWidth="2.3" />
    <path d="m52 75 15-2 5 7-18 4Z" fill="#d47964" stroke="none" />
    <SepatuTekan />
    <Gerak d="m28 57-6-6m1 15-8-2m87-10 8-7" />
  </Adegan>,
  "sd2-gaya-adonan": <Adegan>
    <path d="M33 60q8-14 34-16 26 1 36 15 6 12-8 22-14 9-35 6-27-2-31-13-3-8 4-14Z" fill="#e3bd84" stroke="#a77e51" />
    <path d="M37 66q10 10 24 8m11 6q11 0 21-7" fill="none" stroke="#f5d9a9" />
    <path d="M22 51h86" stroke="#875e43" strokeWidth="7" />
    <rect x="42" y="41" width="49" height="21" rx="7" fill="#c88b57" stroke="#9b653d" />
    <path d="M49 46h33" stroke="#e5b17d" strokeWidth="2.5" />
    <Tangan x={29} y={47} rotasi={24} skala={0.78} />
    <Tangan x={97} y={46} rotasi={155} skala={0.78} />
    <Gerak d="M53 30h25m-5-5 5 5-5 5" />
  </Adegan>,
  "sd2-gaya-balon": <Adegan>
    <path d="M46 32q12-16 32-7 10 6 7 18l-4 7 5 11q3 12-14 17l-5 3 5 6H58l4-7q-19-2-19-14 0-8 5-15-6-7-2-19Z" fill="#ec8d7b" stroke="#a65b57" />
    <path d="M53 37q6-9 17-7m-16 35q2 6 9 6" fill="none" stroke="#ffbeae" strokeWidth="2.9" />
    <Tangan x={39} y={57} rotasi={2} />
    <Tangan x={93} y={47} rotasi={170} />
  </Adegan>,
  "sd2-gaya-spons": <Adegan>
    <path d="M39 34q13-4 21 3 10 8 23 1l11 7-7 18-20-3-13 4-19-7Z" fill="#eabc62" stroke="#ae8043" />
    <path d="M44 45h1m8-4h2m-6 11h1m12 2h1m14-7h1m5 8h1" stroke="#b38644" strokeWidth="3.5" />
    <path d="M48 70q-8 9 0 11 8-2 0-11Zm18 2q-8 12 0 15 8-4 0-15Zm15-8q-6 9 0 11 7-3 0-11Z" fill="#7fc8dc" stroke="#619eaf" strokeWidth="1.5" />
    <Tangan x={36} y={44} rotasi={-4} />
    <Tangan x={94} y={38} rotasi={174} />
  </Adegan>,
};
