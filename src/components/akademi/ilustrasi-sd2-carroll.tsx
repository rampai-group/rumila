import type { ReactNode } from "react";

const GARIS = { stroke: "#304b61", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Latar({ children, air = false }: { children: ReactNode; air?: boolean }) {
  return <g {...GARIS}>
    <rect x="3" y="3" width="124" height="94" rx="12" fill={air ? "#e5f3f5" : "#eff2e5"} stroke="none" />
    {children}
  </g>;
}

function Kapal({ children }: { children: ReactNode }) {
  return <Latar air>
    <path d="M5 73q13-8 28 0t29 0 29 0 34 0v10q0 12-12 12H17Q5 95 5 83Z" fill="#a8d5e1" stroke="none" />
    <path d="M16 87q9-5 23 0m26-2q10-3 22 2m15-4 11-2" fill="none" stroke="#72bacb" strokeWidth="2" />
    {children}
  </Latar>;
}

export const ILUSTRASI_CARROLL_SD2: Record<string, ReactNode> = {
  "sd2-carroll-kepiting-laut": <Latar air>
    <path d="M5 82q17-11 42-6t34 1q23-6 44 4v3q0 11-12 11H17Q5 95 5 84Z" fill="#e5cf9f" stroke="none" />
    <path d="M13 63q4 1 4 10m97-4q2-10 7-13m-9 12q-4-5-8-5" fill="none" stroke="#65a599" strokeWidth="2.5" />
    <path d="m46 58-12-6-13 5m25 9-12-3-13 9m27 0-10 1-8 8m22-6-9 6-2 5m42-28 12-6 13 5m-25 9 12-3 13 9m-27 0 10 1 8 8m-22-6 9 6 2 5" fill="none" stroke="#be695c" strokeWidth="3.5" />
    <path d="m47 59-14-15m50 15 14-15" fill="none" stroke="#be695c" strokeWidth="5" />
    <path d="M31 47q-15-1-14-18 9 4 13 10 4-7 4-15 12 6 10 14-2 8-13 9Zm68 0q15-1 14-18-9 4-13 10-4-7-4-15-12 6-10 14 2 8 13 9Z" fill="#e58974" stroke="#aa605b" />
    <ellipse cx="65" cy="63" rx="24" ry="17" fill="#e58974" stroke="#aa605b" />
    <path d="m54 51-2-7m24 7 2-7" stroke="#aa605b" />
    <circle cx="52" cy="44" r="3.5" fill="#304b61" stroke="none" /><circle cx="78" cy="44" r="3.5" fill="#304b61" stroke="none" />
    <path d="M50 60q5-6 12-6" fill="none" stroke="#f1af89" strokeWidth="2" />
  </Latar>,
  "sd2-carroll-ular-kobra": <Latar>
    <path d="M5 82q20-10 46-1 34-12 74 1v3q0 10-12 10H17Q5 95 5 85Z" fill="#d5e2b9" stroke="none" />
    <path d="m15 84 1-13m4 13 5-8m80 11 2-11m5 9 8-6" fill="none" stroke="#9ab081" strokeWidth="2.3" />
    <path d="M108 77q6 11-18 12H54q-26 0-25-13 1-10 22-10h32q18 1 16 8-2 7-27 7H54q-12 0-10-6 2-4 21-4" fill="none" stroke="#6a8663" strokeWidth="8" />
    <path d="M62 72q-7-13-3-29H77q3 15-5 29l-5 6Z" fill="#919f6c" stroke="#627451" />
    <path d="M59 54q-11-10-13-21-2-10 10-15l7 5h13l7-5q12 5 10 15-2 11-13 21-8 7-21 0Z" fill="#8ca06e" stroke="#627451" />
    <path d="M59 23q11-8 22 1l-1 16q-8 9-21 0Z" fill="#aabb7c" stroke="#627451" />
    <path d="m54 31 4 6m25-6-3 6m-15 6h9" stroke="#6b7751" strokeWidth="1.6" />
    <circle cx="64" cy="31" r="1.6" fill="#304b61" stroke="none" /><circle cx="76" cy="31" r="1.6" fill="#304b61" stroke="none" />
  </Latar>,
  "sd2-carroll-perahu-motor": <Kapal>
    <path d="M27 64h91L104 79H42Z" fill="#76a1c7" />
    <path d="M34 69h78" stroke="#bcd4e7" />
    <path d="M73 64 78 50h16l12 14Z" fill="#b8dbe5" />
    <path d="M24 51h15v13H24l-3-6Z" fill="#596f85" />
    <path d="M28 65v12h-8m5-4 8 8" fill="none" stroke="#63788e" strokeWidth="3.5" />
    <path d="M9 62h7m-5 10h6" fill="none" stroke="#72bacb" />
  </Kapal>,
  "sd2-carroll-kapal-uap": <Kapal>
    <path d="M13 65h106L105 79H28Z" fill="#597c9f" />
    <path d="M24 71h88" stroke="#96b9d1" />
    <path d="M39 51h58l9 14H31Z" fill="#eef4f1" />
    <path d="M52 41h32l6 10H47Z" fill="#a4c3d5" />
    <path d="M61 25h13v16H61Z" fill="#b77461" />
    <path d="M61 27h13v5H61Z" fill="#596f85" stroke="none" />
    <path d="M67 21q-2-6 4-8t6-6m-1 15q2-4 7-4t7-3" fill="none" stroke="#adbfc8" strokeWidth="3.3" />
    <path d="M45 58h6m9 0h6m9 0h6m9 0h6" stroke="#789cae" />
  </Kapal>,
  "sd2-carroll-perahu-layar": <Kapal>
    <path d="M60 21v48" stroke="#8e735f" strokeWidth="3.3" />
    <path d="M57 24 31 63h26Z" fill="#f0c286" stroke="#b68c62" />
    <path d="M64 32 91 62H64Z" fill="#fff9e8" stroke="#b8a17c" />
    <path d="M22 69q45 3 87-2L91 81H36Z" fill="#a081bc" />
    <path d="M31 73q33 2 68-2" fill="none" stroke="#cbb9dd" />
    <path d="M17 30q11-3 22 0m-23 9q7-3 15-1" fill="none" stroke="#9cc7d3" strokeWidth="2.3" />
  </Kapal>,
};
