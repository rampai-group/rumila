import type { ReactNode } from "react";

const GARIS = { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2.15 } as const;

function Pelataran({ langit, children }: { langit: "cerah" | "teduh"; children: ReactNode }) {
  return (
    <g {...GARIS}>
      <rect x="4" y="4" width="122" height="92" rx="12" fill={langit === "cerah" ? "#f9e8ba" : "#dcebe1"} />
      {children}
    </g>
  );
}

function Matahari({ x = 102, y = 24 }: { x?: number; y?: number }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke="#ca7730">
      <circle r="10" fill="#ffcd60" />
      <path d="M0-16v-4m0 36v4M-16 0h-4m36 0h4M-12-12l-3-3m27 27 3 3m-27-3-3 3m27-27 3-3" fill="none" strokeWidth="1.7" />
    </g>
  );
}

function TanahKering() {
  return (
    <g>
      <path d="M8 60q25-9 47-3q29 7 67-2v29q0 8-8 8H16q-8 0-8-8Z" fill="#d9ad71" />
      <path d="m13 79 13-6 12 4 10-5m-18 3 2 10m16-3 13 3 16-9 13 5 13-7m-19 4 3 10m20-24 9 5" fill="none" stroke="#936141" strokeWidth="1.65" />
    </g>
  );
}

function TanahLembap() {
  return (
    <g>
      <path d="M8 70q25-7 50-3q30 5 64-4v21q0 8-8 8H16q-8 0-8-8Z" fill="#675d4e" />
      <path d="M14 78q17-4 35-1m-20 8q7-2 15-1m22 3q16-7 35-5m-1-10 11-1" fill="none" stroke="#9ab8a7" strokeWidth="1.55" />
    </g>
  );
}

function Kanopi() {
  return (
    <g>
      <path d="M9 36q7-12 1-21q19-9 34 1q15-9 27 2q19-10 36-3q11-3 14 9q4 7 1 16q-12 5-22 0q-17 12-31 2q-16 8-29-1q-18 6-31-5Z" fill="#50725a" />
      <path d="M15 29q13-10 25-4m16 5q12-8 24-3m8 3q13-7 26-4" fill="none" stroke="#80a277" strokeWidth="2.25" />
    </g>
  );
}

function Daun({ x, y, sudut, warna }: { x: number; y: number; sudut: number; warna: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${sudut})`}>
      <path d="M-14 0q1-11 13-12q10 0 17 12q-8 9-18 9q-8 0-12-9Z" fill={warna} stroke="#594737" />
      <path d="M-14 0q11-3 25 0m-9 0-5-5m2 5-5 4" fill="none" stroke="#704c39" strokeWidth="1.35" />
    </g>
  );
}

function Tetes({ x, y }: { x: number; y: number }) {
  return <path d="M0-5Q-4 0-3 2q3 4 6 0Q4 0 0-5Z" transform={`translate(${x} ${y})`} fill="#8fd1df" stroke="#477b83" strokeWidth="1.2" />;
}

export const ILUSTRASI_KONDISI_TEMPAT_SD2: Record<string, ReactNode> = {
  "sd2-habitat-aspal": (
    <Pelataran langit="cerah">
      <Matahari />
      <TanahKering />
      <path d="M54 49h22l33 42H19Z" fill="#555659" stroke="#423d42" />
      <path d="M53 52 28 88m47-36 24 36" fill="none" stroke="#fff1c8" strokeWidth="2.2" />
      <path d="m64 53 1 7m0 7 1 9m0 7 1 5" fill="none" stroke="#f4d05e" />
      <path d="M28 61q-4-4 0-8t0-8m63 15q-4-4 0-8t0-8" fill="none" stroke="#b87446" strokeWidth="1.6" />
    </Pelataran>
  ),
  "sd2-habitat-atap-seng": (
    <Pelataran langit="cerah">
      <Matahari x={25} y={25} />
      <path d="M17 60h91v27H17Z" fill="#cf9a6a" stroke="#885337" />
      <path d="m11 66 35-32h51l24 32H54L40 47 21 70Z" fill="#aaa8a3" stroke="#6c5751" />
      <path d="m52 39 22 26m-12-27 24 26m-13-26 24 26m-13-26 24 26m-13-23 19 24" fill="none" stroke="#e7d9bd" strokeWidth="2" />
      <path d="M57 28q-4-4 0-8m18 8q-4-4 0-8m18 9q-4-4 0-8" fill="none" stroke="#bd764d" strokeWidth="1.65" />
      <path d="M27 72h13v15M67 75h23v10H67Z" fill="#885c49" />
    </Pelataran>
  ),
  "sd2-habitat-lapangan": (
    <Pelataran langit="cerah">
      <Matahari />
      <TanahKering />
      <path d="M11 58q13-8 28-3q7-7 15-4q7 3 8 8m9 8q8-7 18-5q7-6 14-2q5 0 10 6" fill="#e9c293" stroke="#a48060" strokeWidth="1.6" />
      <path d="M14 64q23-3 39 0m-18 5q13-2 29 0m13 4q24-4 42-1" fill="none" stroke="#f4dcb3" strokeWidth="2.5" />
    </Pelataran>
  ),
  "sd2-habitat-batu-terjemur": (
    <Pelataran langit="cerah">
      <Matahari />
      <TanahKering />
      <path d="M20 76l5-14 15-13 17-12 21 5 16 17 9 18q-38 13-83-1Z" fill="#ab8e79" stroke="#694f43" />
      <path d="m29 68 29-21 17 1 13 12-18 7-30 3Z" fill="#d6b496" />
      <path d="m70 67-4 13m-26-10-4 10m37-13 15-7 7 11" fill="none" stroke="#836657" strokeWidth="1.7" />
      <path d="M35 48q-5-4-1-8m35-8q-5-4-1-9" fill="none" stroke="#b87446" strokeWidth="1.6" />
    </Pelataran>
  ),
  "sd2-habitat-tanah-bawah-batu": (
    <Pelataran langit="teduh">
      <TanahLembap />
      <path d="M12 70q24-16 55-7q27-6 49 8q-17 18-54 14q-28 2-50-15Z" fill="#504940" />
      <path d="m18 64 13-22 22-12 29 1 22 12 13 16-7 10-25 3-28-5-24 5Z" fill="#8d9990" stroke="#4b5d57" />
      <path d="m28 59 27-19 23-2 20 10-17 12-24-2-21 7Z" fill="#b1bbab" />
      <path d="M35 78q14-5 24-4m-8 9q12-3 29-4m12-3 9-2" fill="none" stroke="#9ac5bd" strokeWidth="1.7" />
      <path d="M10 62q7-5 13 0m83 3q6-5 13-2" fill="none" stroke="#65794f" strokeWidth="3" />
    </Pelataran>
  ),
  "sd2-habitat-tanah-bawah-pohon": (
    <Pelataran langit="teduh">
      <TanahLembap />
      <path d="M48 37q6 23-4 35L29 82q14 1 29-7l20 6q4 1 8-2L71 69q-4-11 1-32Z" fill="#79614f" stroke="#554b3e" />
      <path d="M9 35q-2-13 15-17q7-9 24-8q12-6 27 0q17 0 27 8q17 1 19 18q-2 13-20 16q-15 7-32 0q-17 9-34 0q-19 3-26-17Z" fill="#60815e" stroke="#465d48" />
      <path d="M18 34q12-11 26-8m18-2q12-9 28-4m-6 17q14-6 27-2" fill="none" stroke="#89a575" strokeWidth="2.2" />
      <path d="M15 84q11-4 20-3m52 4q12-3 26-4" fill="none" stroke="#9ac5bd" strokeWidth="2" />
    </Pelataran>
  ),
  "sd2-habitat-tepi-kolam": (
    <Pelataran langit="teduh">
      <Kanopi />
      <path d="M8 65q26-16 58-9q32 2 56-5v33q0 8-8 8H16q-8 0-8-8Z" fill="#6eacae" />
      <path d="M8 64q24-17 55-13q21 1 38 0q-13 12-33 19q-31 10-60 8Z" fill="#6f7760" stroke="#536656" />
      <path d="M15 70q19-9 41-10m-6 21q20-4 29-1m11-11q12-3 25-2m-25 18 19-2" fill="none" stroke="#b2ddd6" strokeWidth="1.8" />
      <path d="M86 76q6-9 19-5l-5 3 4 5q-13 4-18-3Z" fill="#87a863" stroke="#50734f" strokeWidth="1.5" />
      <path d="M24 61q-1-9-5-15m5 11q4-9 10-13" fill="none" stroke="#688659" strokeWidth="2.9" />
    </Pelataran>
  ),
  "sd2-habitat-daun-basah": (
    <Pelataran langit="teduh">
      <Kanopi />
      <TanahLembap />
      <Daun x={41} y={73} sudut={-21} warna="#b28756" />
      <Daun x={84} y={72} sudut={17} warna="#b57953" />
      <Daun x={65} y={78} sudut={-7} warna="#b79a61" />
      <Daun x={63} y={57} sudut={35} warna="#9b8153" />
      <Tetes x={65} y={58} />
      <Tetes x={43} y={72} />
      <Tetes x={91} y={73} />
    </Pelataran>
  ),
  "sd2-habitat-pot-teduh": (
    <Pelataran langit="teduh">
      <path d="M8 66h114v18q0 8-8 8H16q-8 0-8-8Z" fill="#abb9a5" />
      <path d="M8 20q12-10 36 0q5 4 13 3q13-4 24 3q-10 9-20 9q-6 11-16 10q-11-6-19-2q-8 2-18-3Z" fill="#6a8a67" />
      <ellipse cx="68" cy="83" rx="37" ry="7" fill="#869b86" />
      <path d="m39 60 8 26h40l8-26Z" fill="#c88770" stroke="#865642" />
      <ellipse cx="67" cy="60" rx="29" ry="8" fill="#645344" stroke="#865642" />
      <path d="M67 59V33m-1 11q-13-1-16-12q13-2 16 8m2 0q13-13 24-7q-6 13-24 12" fill="#7c9a62" stroke="#4e704c" />
      <path d="M52 60q7-3 12-1m9 3 9-2" fill="none" stroke="#a2c4be" strokeWidth="1.55" />
      <Tetes x={58} y={58} />
    </Pelataran>
  ),
  "sd2-habitat-kap-mobil": (
    <Pelataran langit="cerah">
      <Matahari x={25} />
      <path d="M8 59h114v25q0 8-8 8H16q-8 0-8-8Z" fill="#a69788" />
      <path d="m19 61-9 20m100-20 11 20" stroke="#fff3d3" strokeWidth="2.8" />
      <path d="M24 66l12-22h57l14 22v16q-4 6-13 5H37q-11 0-13-6Z" fill="#b5654d" stroke="#764a43" />
      <path d="m42 44 6-11h36l7 11Z" fill="#7999a0" stroke="#547079" />
      <path d="m37 48 50-1 12 18H31Z" fill="#d48963" stroke="#884f41" />
      <path d="m41 58 15-7m-5 11 22-10m-39 19h15m37 0h13" fill="none" stroke="#fae4ab" strokeWidth="2.5" />
      <path d="M48 77h35" stroke="#5c4b46" strokeWidth="4" />
      <path d="M103 50q-5-5-1-9m10 9q-5-5-1-9" fill="none" stroke="#b87446" strokeWidth="1.6" />
    </Pelataran>
  ),
  "sd2-habitat-tembok-bata": (
    <Pelataran langit="cerah">
      <Matahari />
      <TanahKering />
      <path d="m14 42 111-6v42L14 86Z" fill="#be795b" stroke="#83503d" />
      <path d="m15 42 111-6v4L14 47Z" fill="#de9b70" />
      <path d="m15 54 109-7M15 65l109-7M15 77l109-7m-87-34v15m26-16v15m28-17v15m-43 4v11m30-13v11m28-13v11M34 66v9m28-11v9m30-11v9m-45 5v8m28-10v8m30-10v8" fill="none" stroke="#e6b28a" strokeWidth="1.65" />
      <path d="M24 32q-4-4 0-8m14 7q-3-4 0-8" fill="none" stroke="#b87446" strokeWidth="1.6" />
    </Pelataran>
  ),
  "sd2-habitat-rumput-kemarau": (
    <Pelataran langit="cerah">
      <Matahari />
      <path d="M8 61q20-11 46-9q18-13 48-6l20 8v24H8Z" fill="#c7ad6d" />
      <TanahKering />
      <path d="M21 76q-1-11-8-16m8 12q2-10 9-15m13 13q-1-8-5-13m5 13q4-7 8-10m16 20q-4-12-8-15m8 13q1-10 8-15m19 10q-1-12-7-16m8 14q3-10 9-13m11 19q2-8 5-11" fill="none" stroke="#9e723d" strokeWidth="2.5" />
      <path d="m18 80 6-2m32 3 7-2m37 1 9-1" stroke="#eac584" strokeWidth="1.5" />
    </Pelataran>
  ),
  "sd2-habitat-lapangan-basket": (
    <Pelataran langit="cerah">
      <Matahari x={26} />
      <path d="M8 58q24-8 55-4q31 5 59-1v31q0 8-8 8H16q-8 0-8-8Z" fill="#c8b9a6" />
      <path d="m16 88 23-29h61l20 29m-88-1q14-16 34-16q15 0 30 15m-42 1 8-12h14l9 12" fill="none" stroke="#f9f0d7" strokeWidth="2.5" />
      <path d="M100 74V36H87" fill="none" stroke="#605548" strokeWidth="3.4" />
      <path d="M63 33h27v17H63Z" fill="#f2e1bb" stroke="#826752" />
      <path d="M69 43h13v7H69Zm1 9h16l-3 9h-9Z" fill="none" stroke="#a67b69" strokeWidth="1.7" />
      <path d="M67 52h21" stroke="#ab562e" strokeWidth="2.25" />
      <path d="M36 65q-4-4 1-8m12 6q-4-4 0-8" fill="none" stroke="#b87446" strokeWidth="1.55" />
    </Pelataran>
  ),
  "sd2-habitat-bukit-gundul": (
    <Pelataran langit="cerah">
      <Matahari />
      <path d="M8 68q22-5 37-18l18 9 18-8 31 8 10 17H8Z" fill="#cead76" />
      <path d="M8 83q18-13 29-21l22-26 13 1 11 13 15 7 24 25v2q0 8-8 8H16q-8 0-8-8Z" fill="#bf925e" stroke="#926c4a" />
      <path d="m26 81 22-14 15-25 8-1 5 9-9 15-10 4m7 17 14-8 11-16 16 13" fill="none" stroke="#dcb581" strokeWidth="2.25" />
      <path d="M38 42q12-4 19-1m-9-7q10-3 22-1m9 14q12-4 24-2" fill="none" stroke="#a88161" strokeWidth="1.65" />
    </Pelataran>
  ),
  "sd2-habitat-lantai-hutan": (
    <Pelataran langit="teduh">
      <path d="M8 24q27-11 55-5q31-4 59 6v55H8Z" fill="#8eac87" />
      <path d="M39 18v50m16-41v43m28-50-2 52m22-42-7 43" stroke="#779578" strokeWidth="7" />
      <TanahLembap />
      <path d="M17 16q5 35 2 56L9 82q21 2 32-8q16 0 23 8l14-1q-9-9-35-13l-5-53Zm88 0-7 48q-6 9-22 12l9 3q17 0 24-9l13 6-3-59Z" fill="#655948" stroke="#495343" />
      <Kanopi />
      <path d="M24 87q13-5 21-4m35 3 12-3m13 0 10-1" fill="none" stroke="#9ec5b5" strokeWidth="1.65" />
    </Pelataran>
  ),
  "sd2-habitat-kayu-lapuk": (
    <Pelataran langit="teduh">
      <Kanopi />
      <TanahLembap />
      <path d="M17 67q22-18 53-15l35 10 10 14-13 6q-49 7-85-15Z" fill="#514639" />
      <path d="m23 63 12-9 47-8 20 4 14 15-11 8-19-2-12 4-29-1-13 5Z" fill="#826141" stroke="#504638" />
      <path d="m20 65 7-8 16 3 5 11-8 9-13-1Z" fill="#bc9261" stroke="#655042" />
      <path d="m26 68 5-5 9 3 2 6-7 4-5-2m21-13 11-4 13 1m-21 8 17-2 13 3 12-5" fill="none" stroke="#594638" strokeWidth="1.5" />
      <path d="M59 52q6-6 13-4q5-5 10 0q11-3 15 3q-13 5-24 4Z" fill="#7b9367" />
      <path d="M46 86q15-4 25-4m16 4q10-4 23-3" fill="none" stroke="#96bdb0" strokeWidth="1.65" />
    </Pelataran>
  ),
  "sd2-habitat-tepi-sungai": (
    <Pelataran langit="teduh">
      <Kanopi />
      <path d="M8 55q36-9 58 3q30 10 56-2v28q0 8-8 8H16q-8 0-8-8Z" fill="#73adbb" />
      <path d="M8 51q28 0 45 9q12 7 2 13q-20 8-20 19H16q-8 0-8-8Z" fill="#686e55" stroke="#536b56" />
      <path d="M14 65q20-4 33 3m-25 9q11-4 17-2" fill="none" stroke="#a9c6ac" strokeWidth="1.85" />
      <path d="M66 66q14 5 27 1m-35 12q23-6 43-4m-24 10q14-4 31-3m-4-17 12-2" fill="none" stroke="#d6eff0" strokeWidth="2" />
      <path d="M17 61q1-9-4-15m3 11q4-9 9-11" fill="none" stroke="#647f54" strokeWidth="3" />
    </Pelataran>
  ),
  "sd2-habitat-tembok-lumut": (
    <Pelataran langit="teduh">
      <Kanopi />
      <path d="M9 46h112v36q0 9-9 9H18q-9 0-9-9Z" fill="#858c86" stroke="#52655b" />
      <path d="M9 58h112M9 73h112m-87-27v12m29-12v12m29-12v12M23 58v15m29-15v15m29-15v15m25-15v15M34 73v17m32-17v17m28-17v17" fill="none" stroke="#b4bbab" strokeWidth="1.75" />
      <path d="M11 63q7-5 13 0q5-4 11-1q5-3 10 2q11-6 15 0q9 2 6 7q-5 6-14 5q-6 7-14 4q-4 5-13 3q-5 5-14 1Zm72-9q7-4 14 0q8-4 12 0q6-3 10 0v14q-10 5-17 0q-9 2-16-3q-8-3-3-11Z" fill="#62835a" stroke="#516c4e" strokeWidth="1.35" />
      <path d="M16 69q5-4 9-1m9 5q5-4 10-2m45-11q7-4 13-1m-85 19 9-2" fill="none" stroke="#9ab477" strokeWidth="1.55" />
      <Tetes x={74} y={69} />
      <Tetes x={109} y={77} />
    </Pelataran>
  ),
  "sd2-habitat-tanah-berjamur": (
    <Pelataran langit="teduh">
      <Kanopi />
      <TanahLembap />
      <path d="M54 58q-3 12-5 25h13q3-12 2-24m22 9v15h8l-1-16M33 70l-2 12h8l2-14" fill="#d7c1a3" stroke="#746050" />
      <path d="M39 60q9-17 21-16q13 1 21 16q-15 7-42 0Zm37 9q7-12 15-11q9 1 13 11q-12 6-28 0Zm-53 3q4-12 12-12q8 0 13 12q-11 4-25 0Z" fill="#a77d5f" stroke="#68533f" />
      <path d="M46 58q8-7 14-7m23 15 6-3m-62 6 7-3" fill="none" stroke="#d5ac83" strokeWidth="1.55" />
      <path d="M13 84q8-4 16-3m41 7q13-4 23-4m12 2 11-3" fill="none" stroke="#96bdb0" strokeWidth="1.75" />
      <Tetes x={108} y={78} />
    </Pelataran>
  ),
};
