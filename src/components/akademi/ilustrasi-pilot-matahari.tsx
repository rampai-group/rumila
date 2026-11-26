import type { ReactNode } from "react";

const garis = { stroke: "#365466", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const genangan = <g data-benda="genangan"><path d="M14 77Q6 63 29 62Q35 50 60 59Q87 51 105 65Q123 70 111 82Q91 96 68 88Q39 98 14 77Z" fill="#7bc9e8" stroke="#3285af" strokeWidth="2.5" /><path d="M27 72q12-5 25 0m14 6q15 5 28-1" fill="none" stroke="#e5faff" strokeWidth="3" /></g>;

/** Tampilkan tempat terjadinya perubahan, bukan tetes air atau lambang malam. */
export const ILUSTRASI_MATAHARI_PILOT: Record<string, ReactNode> = {
  "pilot-genangan-terik": <g {...garis}>
    <path d="M3 52H127V96H3Z" fill="#dce5e8" stroke="none" />
    <g data-kondisi="terik" stroke="#df9b25"><circle cx="104" cy="21" r="12" fill="#ffd55e" /><path d="M104 3V0M104 39v6M86 21h-6M122 21h6M91 8l-4-4M117 34l5 5M91 34l-4 4M117 8l4-4" /></g>
    {genangan}
  </g>,
  "pilot-genangan-teduh": <g {...garis}>
    <path d="M3 50H127V96H3Z" fill="#d9e9c9" stroke="none" />
    <path d="M17 82L65 37 113 83Z" fill="#86a48b" opacity=".35" stroke="none" />
    {genangan}
    <g data-kondisi="teduh"><path d="M65 18v43" stroke="#8b6444" strokeWidth="8" /><path d="M61 4Q42-3 34 12Q17 13 22 30Q12 45 36 47Q43 57 60 47Q82 56 91 42Q108 36 94 23Q97 5 78 9Q70-1 61 4Z" fill="#609b58" /><path d="M50 53l15-15 12 12" fill="none" stroke="#8b6444" strokeWidth="4" /></g>
  </g>,
  "pilot-batu-gua": <g {...garis}>
    <path d="M5 91L14 47 37 13 74 5 109 28 126 91Z" fill="#a6adaf" />
    <path d="M24 90L31 51Q45 23 72 27Q98 28 107 57L114 90Z" fill="#3d4a58" />
    <g data-benda="batu-di-gua"><path d="M47 86L43 72 53 59 76 60 87 74 82 88Z" fill="#abb4ba" /><path d="M53 59l9 16 25-1M62 75l-15 11" fill="none" stroke="#6c7d89" /></g>
  </g>,
};
