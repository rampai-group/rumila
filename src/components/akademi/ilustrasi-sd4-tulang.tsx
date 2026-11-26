import type { ReactNode } from "react";

const TINTA = "#585164";
const TULANG = "#f0d7a2";
const BAYANG = "#dba66f";
const TUBUH = "#b3cee2";
const GARIS = { stroke: TINTA, strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Gambar({ children }: { children: ReactNode }) {
  return <g fill={TULANG} {...GARIS}>
    <rect x="3" y="3" width="124" height="94" rx="12" fill="#f3f1eb" stroke="none" />
    {children}
  </g>;
}

function JariTangan() {
  return <g fill="none" stroke="#c19b72" strokeWidth="5">
    {[36, 49, 63, 77, 90].map((x, i) => <path key={x} d={`M${x} ${33 + Math.abs(i - 2) * 4}v8m0 4v5`} />)}
  </g>;
}

const JARI_KAKI = [
  { x: 43, y: 18, panjang: 21 },
  { x: 55, y: 18, panjang: 22 },
  { x: 66, y: 23, panjang: 19 },
  { x: 76, y: 29, panjang: 16 },
  { x: 85, y: 36, panjang: 13 },
];

function JariKaki() {
  return <g fill="none">
    <path d="M40 15q4-8 10 0q6-8 11 0q7-4 11 8q7-3 10 7q7 1 8 10q5 10 1 22L72 90q-6 6-14 1L46 65 32 43q-5-15 8-28Z" fill="#e6e0d7" stroke="#aaa2a4" />
    {JARI_KAKI.map(({ x, y, panjang }, i) => {
      const ruas = i === 0 ? [0.43, 0.57] : [0.27, 0.3, 0.43];
      const jarak = 1.8;
      const panjangRuas = panjang - jarak * (ruas.length - 1);
      const lebar = i === 0 ? 7 : 5;
      return <g key={x}>
        <path d={`M${x} ${y + panjang + 5}l${(2 - i) * 3} ${25 - i * 3}`} stroke="#b8ac9d" strokeWidth="4" />
        {ruas.map((rasio, j) => {
          const sebelumnya = ruas.slice(0, j).reduce((a, b) => a + b, 0);
          return <rect key={j} x={x - lebar / 2} y={y + panjangRuas * sebelumnya + jarak * j}
            width={lebar} height={panjangRuas * rasio} rx="1.8" fill={BAYANG} stroke="none" />;
        })}
      </g>;
    })}
  </g>;
}

export const ILUSTRASI_TULANG_SD4: Record<string, ReactNode> = {
  "sd4-tulang-tengkorak": <Gambar>
    <path d="M31 43q0-32 34-33q34 1 34 33q0 14-10 20l-4 19q-8 8-20 8q-12 0-20-8l-4-19q-10-6-10-20Z" />
    <path d="M43 69q7 6 22 6t22-6m-34 4v9m12-7v9m12-11v9" fill="none" stroke={BAYANG} />
    <ellipse cx="51" cy="50" rx="10" ry="8" fill="#756676" stroke="none" />
    <ellipse cx="79" cy="50" rx="10" ry="8" fill="#756676" stroke="none" />
    <path d="m65 52-6 12h12Z" fill="#756676" stroke="none" />
    <path d="M44 30q6-11 16-11" fill="none" stroke="#fff2d7" strokeWidth="3" />
  </Gambar>,
  "sd4-tulang-rahang": <Gambar>
    <path d="M24 26q6-8 12 1l8 27q9 6 21 6t21-6l8-27q6-9 12-1q2 20-7 38q-9 21-34 22q-25-1-34-22q-9-18-7-38Z" />
    <path d="M40 57q12 9 25 9t25-9l-5 11q-8 6-20 6t-20-6Z" fill="#fff5d7" stroke={BAYANG} />
    <path d="M50 63v7m10-4v7m10-7v7m10-10v7" stroke={BAYANG} />
  </Gambar>,
  "sd4-tulang-hidung": <Gambar>
    <path d="M58 16l7 4v46L46 82l4-28Z" />
    <path d="m72 16-7 4v46l19 16-4-28Z" fill="#e6be87" />
    <path d="m51 61 14-8 14 8m-29 9 15-9 15 9" fill="none" stroke={BAYANG} />
  </Gambar>,
  "sd4-tulang-pipi": <Gambar>
    <path d="m31 25 12 8 10-11 10 10-4 14 19 2 20-12 8 8-23 23-19 3-13 15-14-8 4-17-11-13Z" />
    <path d="m38 40 17 12 25 9m-28-9-6 20" fill="none" stroke={BAYANG} />
  </Gambar>,
  "sd4-tulang-rusuk": <Gambar>
    <path d="M31 27q10-14 21-4q16 20 46 17q12 0 11 8q-5 15-31 12Q51 57 31 39q-7-6 0-12Z" />
    <path d="M30 53q9-6 18 3q19 22 50 17q11-1 10 6q-5 14-29 12q-28-2-49-24q-6-7 0-14Z" />
    <path d="M42 32q27 26 55 19M41 63q18 22 53 19" fill="none" stroke={BAYANG} />
  </Gambar>,
  "sd4-tulang-panggul": <Gambar>
    <path d="M20 26q2-14 18-13q19 1 27 23q8-22 27-23q16-1 18 13q3 12-11 22l-6 14q4 17-10 22l-10-1-8-9-8 9-10 1q-14-5-10-22l-6-14q-14-10-11-22Z" />
    <path d="m55 34 10 7 10-7-4 27-6 7-6-7Z" fill="#e5bd87" />
    <ellipse cx="51" cy="61" rx="8" ry="10" transform="rotate(-24 51 61)" fill="#f3f1eb" />
    <ellipse cx="79" cy="61" rx="8" ry="10" transform="rotate(24 79 61)" fill="#f3f1eb" />
  </Gambar>,
  "sd4-tulang-dada": <Gambar>
    <path d="m51 13 9 3 5-2 5 2 9-3 2 13-8 12 4 8-4 8 2 10-6 13-4 12-4-12-6-13 2-10-4-8 4-8-8-12Z" />
    <path d="M57 34h16m-18 13h20m-18 10h16m-16 10h16" fill="none" stroke={BAYANG} />
  </Gambar>,
  "sd4-tulang-punggung": <Gambar>
    <path d="M45 47 36 35l6-6 13 4 5-17h10l5 17 13-4 6 6-9 12 11 12-7 7-12-5-3 15q-9 12-18 0l-3-15-12 5-7-7Z" />
    <ellipse cx="65" cy="51" rx="11" ry="10" fill="#f3f1eb" />
    <path d="M53 68q12 6 24 0" fill="none" stroke={BAYANG} />
  </Gambar>,
  "sd4-tulang-paha": <Gambar>
    <path d="M39 20q7-8 17-1q6 4 4 13l11 8 12 27q10-2 12 5q2 6-3 10q-4 6-12 2q-9 3-12-3q-3-7 3-13L56 42l-13-3q-13 0-12-11q0-5 8-8Z" />
    <path d="m56 38 19 33m-36-49q6-4 11 1" stroke={BAYANG} fill="none" />
  </Gambar>,
  "sd4-tulang-betis": <Gambar>
    <path d="M44 15q12-6 25 0l-2 12-4 41 5 12q-7 9-19 5l4-17V30l-8-8Z" fill="#e2dbd2" stroke="#9d98a0" />
    <path d="M76 19q6-5 12 1l-3 11-5 41 4 10q-4 9-10 5l1-16 3-39-4-7Z" />
    <path d="m82 31-5 42" stroke={BAYANG} />
  </Gambar>,
  "sd4-tulang-tumit": <Gambar>
    <path d="M30 21h23l4 22q9 5 18 8l37 16q6 5 1 12H37Q20 77 20 67l8-21Z" fill="#e3ddd3" stroke="#aaa2a4" />
    <path d="M26 58q3-11 13-12l12 7 8 12-9 13H35q-12-1-12-10Z" />
    <path d="m31 61 15-5 9 8" stroke={BAYANG} fill="none" />
  </Gambar>,
  "sd4-tulang-jarikaki": <Gambar>
    <JariKaki />
  </Gambar>,
  "sd4-tulang-hasta": <Gambar>
    <path d="M52 14q6-6 11 1l-1 9 7 4-1 8-6 4 1 36 4 7q-4 9-13 3l2-9-4-41-7-7 1-10Z" />
    <path d="M79 23q9-5 12 0l-2 8-3 31 4 17q-7 9-16 4l3-18 2-31-2-7Z" fill="#e2dbd2" stroke="#9d98a0" />
    <path d="m58 44 2 28" stroke={BAYANG} />
  </Gambar>,
  "sd4-tulang-pengumpil": <Gambar>
    <path d="M52 14q6-6 11 1l-1 9 7 4-1 8-6 4 1 36 4 7q-4 9-13 3l2-9-4-41-7-7 1-10Z" fill="#e2dbd2" stroke="#9d98a0" />
    <path d="M79 23q9-5 12 0l-2 8-3 31 4 17q-7 9-16 4l3-18 2-31-2-7Z" />
    <path d="M81 27h7m-10 52 10-2" stroke={BAYANG} />
  </Gambar>,
  "sd4-tulang-telapak": <Gambar>
    <path d="M47 86q-5-7 2-12q5-5 17-5q12 0 17 5q7 5 2 12Z" fill="#e3ddd3" stroke="#aaa2a4" />
    <JariTangan />
    <path d="M51 76 36 49m21 22-8-20m15 19V49m7 23 6-21m1 24 12-23" stroke={BAYANG} fill="none" strokeWidth="6" />
  </Gambar>,
  "sd4-bagian-kepala": <Gambar>
    <path d="M43 84v-9q-12-10-12-28q0-28 29-34q22-5 35 13q7 10 6 24l7 11h-9l-2 10q-5 9-20 6l-2 7Z" fill={TUBUH} />
    <circle cx="87" cy="44" r="2.5" fill={TINTA} stroke="none" />
    <path d="M60 55q-9 4-8-5q1-8 7-6" fill="none" />
  </Gambar>,
  "sd4-bagian-badan": <Gambar>
    <path d="M37 22q18-7 20-13h16q2 6 20 13l-8 24 4 38q-24 10-48 0l4-38Z" fill={TUBUH} />
    <path d="M50 37q15 8 30 0m-32 30q17 9 34 0" fill="none" stroke="#7696b6" />
  </Gambar>,
  "sd4-bagian-kaki": <Gambar>
    <path d="M39 13h51l-7 39 2 21 15 7q7 5 1 9H73l-8-51-8 51H29q-6-4 1-9l15-7 2-21Z" fill={TUBUH} />
    <path d="M51 55h6m16 0h6" stroke="#7696b6" />
  </Gambar>,
  "sd4-bagian-lengan": <Gambar>
    <path d="M28 22q9-5 16 5l16 20 23 6 13-5q4-1 5 3l-7 8 14-2q6 0 4 5l-8 3 10 1q4 2 0 6l-16 3-4 6q-10 6-24-2L41 67 22 41q-7-12 6-19Z" fill={TUBUH} />
    <path d="m48 57 6-6m34 8-9 10" stroke="#7696b6" />
  </Gambar>,
};
