import type { ReactNode } from "react";

const GARIS = { stroke: "#78574d", strokeWidth: 2.35, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Latar({ air, children }: { air?: boolean; children: ReactNode }) {
  return (
    <g>
      <rect x="3" y="3" width="124" height="94" rx="12" fill={air ? "#eaf6eb" : "#f6efdf"} />
      {air ? (
        <path d="M9 72q12-3 24 0t24 0t24 0t24 0q8-2 16 0v13q0 6-6 6H15q-6 0-6-6Z" fill="#a6dcdf" />
      ) : (
        <ellipse cx="65" cy="87" rx="49" ry="5" fill="#e4d5ba" />
      )}
      <g {...GARIS}>{children}</g>
    </g>
  );
}

function Mata({ x, y, r = 2.9 }: { x: number; y: number; r?: number }) {
  return (
    <g stroke="none">
      <circle cx={x} cy={y} r={r} fill="#342b31" />
      <circle cx={x - 0.75} cy={y - 0.92} r={r * 0.27} fill="#fff" />
    </g>
  );
}

export const ILUSTRASI_TUMBUH_TERNAK_SD2: Record<string, ReactNode> = {
  "sd2-tumbuh-ayam-1": (
    <Latar>
      <path d="M59 74v10m0-1h-8m8 0 5 2m9-10v10m0-1h-7m7 0 6 1" fill="none" stroke="#c98540" />
      <path d="M43 58q5-5 11-6q13-6 29 4l7-2l-2 6l6 1l-4 5q-6 15-25 14q-20-1-24-14Z" fill="#ffd474" />
      <path d="M39 51l-10-1l7-6l7 1Z" fill="#ed9a45" />
      <path d="M37 47q0-11 10-17q5-1 8-5l2 5l5-3v5q11 4 12 15q2 15-15 19q-13 3-20-7q-5-4-2-12Z" fill="#ffe28e" />
      <path d="M64 64q8-7 15-3q5 2 0 8q-6 6-14 4" fill="#ffcf65" stroke="#d7a14d" strokeWidth="1.7" />
      <path d="M45 53q4 3 7 0m9 7 3 1m2-2 4 1" fill="none" stroke="#deaa57" strokeWidth="1.5" />
      <Mata x={46} y={46} r={3.1} />
    </Latar>
  ),
  "sd2-tumbuh-ayam-2": (
    <Latar>
      <path d="M58 74v11m0-1-7 2m7-2 7 1m15-13 1 12m0 0 7 1m-7-1-6 2" fill="none" stroke="#ba7436" />
      <path d="M79 63q16-15 26-14l-5 8l8-3l-7 11l-10 5Z" fill="#d49052" />
      <path d="M49 53q10-12 29-6q15 4 20 14q-2 18-20 19q-20 1-31-9Z" fill="#eca957" />
      <path d="m38 48-11-1l10-8l6 4Z" fill="#ed9a45" />
      <path d="M35 43q1-10 13-15l5 1l3-4l3 5q10 3 12 12q3 10-8 19q-8 7-19 0q-10-5-9-18Z" fill="#ffd984" />
      <path d="M60 61q8-9 18-8q10 0 18 6q-3 4-8 6l2 3l-7 3l-1 4q-16 4-22-7Z" fill="#bb7549" />
      <path d="M69 61q7-3 14 0m-12 4 12 1m-13 3 7 1" fill="none" stroke="#f8ce85" strokeWidth="2" />
      <Mata x={46} y={43} />
    </Latar>
  ),
  "sd2-tumbuh-ayam-3": (
    <Latar>
      <path d="M57 70v15m0-1-9 2m9-2 7 1m17-15 1 14m0 0 8 1m-8-1-7 2" fill="none" stroke="#b57037" />
      <path d="M84 53q12-15 28-15q-6 5-7 9l8-3q-5 14-19 20Z" fill="#546c5b" />
      <path d="M49 47q12-1 26 0q21 1 26 12q-4 16-24 17q-16 1-25-8q-8-6-9-13Z" fill="#b87849" />
      <path d="M38 32q-3-6 2-8q4 0 4 3q3-6 6-4q4 1 3 5q5-3 7 0q1 4-4 7Z" fill="#d35446" stroke="#934b42" />
      <path d="M37 45l-13-2l12-7l7 5Z" fill="#ea9b42" />
      <path d="M35 36q6-8 17-6q10 2 12 13l3 11l-8 10q-12-3-16-12q-9 1-10-8Z" fill="#dfa25e" />
      <path d="M38 48q1 6 6 5l3-4" fill="#d76d55" stroke="#9a5344" strokeWidth="1.6" />
      <path d="M64 58q8-6 18-5q10 1 14 6q-10 11-27 11q-5-3-5-12Z" fill="#995f47" />
      <path d="M72 61q7-3 15-2m-13 6 8-2" fill="none" stroke="#cf936b" strokeWidth="1.7" />
      <Mata x={44} y={39} />
    </Latar>
  ),
  "sd2-tumbuh-ayam-4": (
    <Latar>
      <path d="M57 67l1 17m0 0-9 2m9-2 8 1m10-16 2 15m0 0 9 2m-9-2-6 2" fill="none" stroke="#b66b32" strokeWidth="3" />
      <path d="M76 53q11-31 34-31q8 0 12 12q-10-5-17 1q-7 7-9 23Z" fill="#46766d" />
      <path d="M80 58q10-27 29-23q9 2 12 12q-12-4-21 4q-6 5-10 14Z" fill="#315861" />
      <path d="M86 62q14-20 26-12q5 3 6 8q-10-3-20 7q-8 6-15 6Z" fill="#5d8c81" />
      <path d="M47 45q12-3 22 2q20-1 31 11q-5 15-25 18q-25 2-31-17Z" fill="#633f3f" />
      <path d="M27 29q-7-8-1-12q3-3 8 1q-1-9 5-9q5 1 5 9q4-7 9-5q4 3 0 10q7-4 9 1q0 5-9 8Z" fill="#d55049" stroke="#93483f" />
      <path d="M33 43q-5 12 1 13q5 1 8-7q1 8 6 7q5-4 0-12Z" fill="#d45449" stroke="#93483f" />
      <path d="m33 43-14-2l12-7l7 4Z" fill="#e8a04c" />
      <path d="M30 35q4-9 15-9q12 1 12 13q4 12 12 17l-10-1l-2 7l-8-5l-5 2l-3-11q-14-1-11-13Z" fill="#df9952" />
      <path d="M62 61q7-8 19-8q9 1 13 7q-8 11-26 11q-5-3-6-10Z" fill="#ad6b47" />
      <path d="M71 62q7-4 14-3m-12 7 9-3m-35-21q1 6 5 9" fill="none" stroke="#edb779" strokeWidth="1.9" />
      <Mata x={39} y={36} />
    </Latar>
  ),
  "sd2-tumbuh-bebek-1": (
    <Latar>
      <path d="M55 75l-1 8l-8 1l5 4l12-2l-3-3l1-8m10-2 3 9l-5 4l12 1l5-4l-7-1l-3-11" fill="#eda357" stroke="#b67445" strokeWidth="1.9" />
      <path d="M42 61l-8-4l3 10q6 13 23 14q23 1 28-14q1-10-10-16q-14-7-29 6Z" fill="#ffd173" />
      <path d="M90 46q12 1 17 4q2 5-6 7l-14-1l-2-7Z" fill="#e99a4a" />
      <path d="M65 52q-1-14 7-18l4-4l3 3l6-3l1 5q8 3 10 13q1 13-12 17q-10 4-17-3Z" fill="#ffe18a" />
      <path d="M49 67q12-7 22-1q1 6-14 8q-5-1-8-7Z" fill="#edb655" stroke="#cc984c" strokeWidth="1.8" />
      <path d="M95 52q5 0 8-1" fill="none" stroke="#b67445" strokeWidth="1.4" />
      <Mata x={86} y={45} />
    </Latar>
  ),
  "sd2-tumbuh-bebek-2": (
    <Latar air>
      <path d="M29 64l-5-8l13 4q12-8 30-6q17 1 21 12q3 15-21 17H46q-17-2-17-19Z" fill="#f8ca6b" />
      <path d="M90 47q11 0 18 4q4 4-4 7l-17-1l-3-8Z" fill="#ec9850" />
      <path d="M66 57q-4-11 2-19q7-8 18-4q10 3 11 12q1 11-10 17q-8 5-21-6Z" fill="#ffe198" />
      <path d="M44 65q12-5 24-2q1 6-10 9q-9 1-14-7Z" fill="#efb35a" stroke="#cc984c" strokeWidth="1.8" />
      <path d="M15 77q8-4 16 0m1 5q7-4 14 0t14 0t14 0t14 0m3-6q8-4 17 0m-8 11h11m-87 0h14" fill="none" stroke="#569caa" strokeWidth="2.1" />
      <path d="m22 68-4-3m91 3 5-4" fill="none" stroke="#569caa" strokeWidth="1.7" />
      <Mata x={86} y={44} />
    </Latar>
  ),
  "sd2-tumbuh-bebek-3": (
    <Latar>
      <path d="M46 73l1 11l-9 2l7 3l13-2l-5-4l1-11m12 0 2 11l-6 4l12 2l7-4l-8-2l-1-11" fill="#efa35c" stroke="#b67445" strokeWidth="1.9" />
      <path d="M28 59l-6-6l15 4q10-6 29-8q24 1 29 14q-4 17-23 17H50q-21-3-22-21Z" fill="#f0c57e" />
      <path d="M49 59q15-9 27-7q14 2 15 9q-11 15-29 14q-10-3-13-16Z" fill="#fffaf1" />
      <path d="M97 43q9-2 18 2q4 4-4 8l-16 1l-4-7Z" fill="#ed9e4e" />
      <path d="M72 45q-1-13 7-19q9-7 18-1q9 5 9 15q1 12-12 17q2 8-1 11l-13 1l-9-11Z" fill="#f6d499" />
      <path d="M73 49q5 2 8 1q1 5 6 4l7 3q2 7-1 12l-13 1l-9-11Z" fill="#fffaf1" stroke="#bca587" strokeWidth="1.55" />
      <path d="M56 64q8-4 14-2m-5 6 8-3m17-36 5 1m7 18 9-1" fill="none" stroke="#be9969" strokeWidth="1.6" />
      <Mata x={96} y={37} />
    </Latar>
  ),
  "sd2-tumbuh-bebek-4": (
    <Latar>
      <path d="M44 72l2 12l-11 3l8 3l16-2l-7-5l1-10m13 1 3 10l-7 4l15 2l9-4l-10-3l-2-10" fill="#eda45c" stroke="#b67445" strokeWidth="2.1" />
      <path d="M96 35q10 0 21 4q4 5-6 8l-17 1l-4-7Z" fill="#ee9c49" />
      <path d="M24 53l-9-9q13 4 21 6q12-1 23 2q9 0 11-11l1-9q1-13 11-18q9-5 18 1q8 5 8 14q0 13-13 19l-1 11q-1 15-18 20q-14 5-33 0q-20-5-24-20Z" fill="#fffbf1" />
      <path d="M33 58q18-6 37-1q9 2 12 7q-10 9-25 10q-15 0-24-16Z" fill="#e6e8df" stroke="#a69d89" strokeWidth="1.8" />
      <path d="M42 62q10-3 22 0m-15 5q7-2 16-1m29-14q-4 7-7 9m17-19 9-1" fill="none" stroke="#b1a48e" strokeWidth="1.65" />
      <Mata x={97} y={29} />
    </Latar>
  ),
  "sd2-tumbuh-domba-1": (
    <Latar>
      <path d="M31 51l-5 23l-6 3v5h15l8-26m42-1l-4 21l-6 3v4h15l7-27" fill="#c0a999" />
      <path d="M18 42q-7 4-4 9q4 4 13 1" fill="#e5d2ba" />
      <path d="M23 28q3-8 12-8q7-7 15-2q9-6 16-1q9-3 15 3q12-1 17 10q7 10 1 18q0 10-11 12q-5 5-15 4q-10 4-17-1q-9 3-17-3q-11 0-15-8q-8-4-6-13q0-6 5-11Z" fill="#f3e5d3" />
      <path d="M51 62q6-5 13 0q0 8-5 9l-4-2l-3 1Z" fill="#d79891" stroke="#a36f67" strokeWidth="1.65" />
      <path d="M89 35q-3-8 2-11q6-3 11 2q9-5 13 0q2 5-7 9q8 9 6 16q-1 8-12 8q-10-1-12-11Z" fill="#b79e8c" />
      <path d="M88 32q-7-1-7-5q3-5 13-2" fill="#b79e8c" />
      <path d="M104 52l5-1m-72-15q4-5 9-3m19-2q6-4 10 0m0 15q5-4 10-2" fill="none" stroke="#bba393" strokeWidth="1.65" />
      <Mata x={105} y={40} r={2.6} />
      <path d="M67 80l-1 7h7l2-6m15-2l2 8h7l-1-9" fill="#c4ac9d" strokeWidth="1.7" />
      <path d="M63 72q7-4 13-2q8-4 15 1q8 1 9 7q0 6-9 6H74q-11 0-14-7Z" fill="#fbeddc" strokeWidth="1.85" />
      <path d="M64 72q-3-7-7-7q-4-2-6 0q-2 3 4 6q2 7 8 8q6 0 8-5q0-4-7-5Z" fill="#c7ad9b" strokeWidth="1.8" />
      <path d="M59 69q4-4 8-1" fill="none" strokeWidth="1.75" />
      <Mata x={60} y={72} r={1.8} />
    </Latar>
  ),
  "sd2-tumbuh-domba-2": (
    <Latar>
      <path d="M30 57l-5 25l-5 2v4h13l7-26m26-2l5 24v3h11l-2-5l-2-23" fill="#bda491" />
      <path d="M30 48q-8 2-10 0q-3-4 5-9l8 1" fill="#eee0ca" />
      <path d="M28 44q3-8 12-8q7-6 14-2q8-5 14-1q11-2 17 6q9 3 11 11q3 10-4 14q-5 6-14 3q-8 3-16 1q-9 3-17-2q-10 1-14-6q-8-4-3-16Z" fill="#f2e4d3" />
      <path d="M82 55q5-7 12-3q4 4 4 10q8 3 11 12q3 6-4 9q-8 4-13-2q-5-8-13-12Z" fill="#bfa493" />
      <path d="M92 62q4-6 9-5q5 2 0 7l-3 3" fill="#d2b4a3" strokeWidth="1.7" />
      <path d="M101 80q5 4 9 0m-68-30q5-5 11-3m13 7q6-4 11 0" fill="none" stroke="#ba9d88" strokeWidth="1.8" />
      <path d="M102 87q7-8 13-10m-8 10 10-2m-14 3q-1-8-5-11" fill="none" stroke="#61845a" strokeWidth="2.5" />
      <Mata x={97} y={75} r={2.45} />
    </Latar>
  ),
  "sd2-tumbuh-domba-3": (
    <Latar>
      <path d="M28 69l-2 14l-5 3v3h12l7-21m36-3l3 17l-6 4v3h14l3-22" fill="#b99f8c" />
      <path d="M37 67l2 18l-3 2h11l5-18m16-4l-1 16l-5 5h12l6-19" fill="#cfb39d" strokeWidth="1.9" />
      <path d="M22 46q-7 3-8 7q3 6 11 3" fill="#ddccb4" />
      <path d="M24 37q5-8 14-7q3-8 12-7q8-6 14 0q9-3 15 5q10 1 12 10q9 4 8 13q2 9-6 13q-2 9-13 9q-7 5-16 0q-10 6-19 0q-10 2-16-5q-10 0-13-11q-4-11 8-20Z" fill="#f5e5cf" />
      <path d="M85 43q-4-9 5-13q9-4 15 3q4-3 9-3q8 4 2 9l-8 3q7 13 0 19q-7 4-16-1q-7-4-7-17Z" fill="#b99d89" />
      <path d="M85 42q-8 1-11-3q0-5 10-6m16 22 6 1" fill="none" strokeWidth="1.8" />
      <path d="M31 52q3-6 9-5m7-10q8-5 13 0m-11 24q7-5 13 0m8-13q7-5 11 1" fill="none" stroke="#bd9f86" strokeWidth="1.8" />
      <Mata x={103} y={47} />
    </Latar>
  ),
  "sd2-tumbuh-domba-4": (
    <Latar>
      <path d="M23 70l-2 11l-5 4v4h15l5-17m44-4l2 15l-5 3v3h14l5-19" fill="#b39380" />
      <path d="M37 70l2 13l-4 4v2h13l5-18m14-2l-1 13l-5 4v3h13l6-18" fill="#c5a690" strokeWidth="1.95" />
      <path d="M21 47q-9 0-10 5q0 6 12 6" fill="#dbc6a9" />
      <path d="M20 34q2-10 14-11q8-10 18-5q9-8 20-2q12-4 20 6q11 0 17 11q7 5 6 13q5 10-2 16q1 12-10 16q-8 7-20 2q-10 6-20 1q-10 5-18 0q-11 1-17-6q-10-1-13-11q-7-6-3-18q1-8 8-12Z" fill="#faf0df" />
      <path d="M90 43q-4-10 6-15q7-4 13 3q8-5 12-1q4 6-6 10l-2 1q8 13 0 20q-9 6-20-1q-6-5-3-17Z" fill="#b09381" />
      <path d="M91 38q-8 3-12-1q-2-5 7-8m19 26 6-1" fill="none" strokeWidth="1.9" />
      <path d="M26 42q1-6 9-6m8-8q8-5 15 0m8-1q8-5 15 1M30 58q8-6 14 0m4-14q7-5 14 0m5 9q8-5 14 0M41 70q7-5 13 0m10 1q7-5 14 0m10 1q6-4 12 0" fill="none" stroke="#c6ac92" strokeWidth="1.9" />
      <Mata x={108} y={45} />
    </Latar>
  ),
};
