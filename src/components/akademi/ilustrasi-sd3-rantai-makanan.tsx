import type { ReactNode } from "react";

function DasarAir({ laut, children }: { laut: boolean; children: ReactNode }) {
  return <g>
    <rect x="7" y="7" width="116" height="86" rx="13" fill={laut ? "#b4e4f7" : "#c0e5db"} />
    <path d="M12 78Q43 68 67 80T118 78V88H12Z" fill={laut ? "#ead5a1" : "#aaa07a"} />
    <path d="M18 31q7-4 14 0m67 13q7-4 14 0M91 21q8-4 15 0" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
    {children}
  </g>;
}

function AlgaLaut({ karang = false }: { karang?: boolean }) {
  return <DasarAir laut>
    {karang && <path d="M25 80L38 61 67 65 84 58 109 78 92 87H39Z" fill="#8b8c98" stroke="#626871" strokeWidth="2.5" />}
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M60 79Q57 61 34 51T36 23M61 77Q64 58 53 47T54 19M66 76Q60 57 80 44T89 21M72 77Q77 64 91 59T102 39" stroke="#21735b" strokeWidth="7" />
      <path d="M61 70Q55 55 42 56M56 48Q53 38 45 37M71 57Q68 49 71 38M86 49Q92 42 89 36M94 61q13-4 16-13" stroke="#479767" strokeWidth="5" />
    </g>
  </DasarAir>;
}

export const ILUSTRASI_RANTAI_MAKANAN_SD3: Record<string, ReactNode> = {
  "rantai-alga-laut": <AlgaLaut />,
  "rantai-alga-karang": <AlgaLaut karang />,
  "rantai-alga-kolam": <DasarAir laut={false}>
    <path d="M17 74Q36 69 38 57T59 62Q64 45 80 57Q88 50 97 66L112 73 98 87H27Z" fill="#6a9f4b" stroke="#45743d" strokeWidth="2.5" />
    <path d="M32 75q8-13 17-11m2 13q8-14 18-14m4 9q8-10 15-9m2 14q6-5 13-4" fill="none" stroke="#afd16d" strokeWidth="4" strokeLinecap="round" />
  </DasarAir>,
  "rantai-siput-air": <DasarAir laut={false}>
    <path d="M22 79Q27 64 49 64H76Q83 63 89 54Q101 50 105 59L103 69Q101 80 91 82H30Z" fill="#9f9d72" stroke="#5c5b48" strokeWidth="2.5" />
    <path d="M86 58q1-13-3-17m13 13q4-10 7-12" fill="none" stroke="#5c5b48" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M39 69Q26 52 41 32Q54 16 71 27Q93 39 84 61Q78 76 58 76Z" fill="#a68658" stroke="#5d4e3e" strokeWidth="3" />
    <path d="M77 49C79 35 59 31 52 41C44 53 57 65 67 55C74 48 65 43 61 48" fill="none" stroke="#67513a" strokeWidth="3" strokeLinecap="round" />
    <circle cx="100" cy="58" r="2" fill="#303b30" />
    <circle cx="110" cy="49" r="4" fill="none" stroke="#f0ffff" strokeWidth="2" />
  </DasarAir>,
  "rantai-lamun": <DasarAir laut>
    <path d="M59 81Q46 58 24 38Q48 46 65 72Q61 43 60 19Q75 44 72 70Q84 44 104 31Q88 52 79 78Q91 66 111 60Q102 72 81 85H58Q39 77 30 64Q47 67 59 81Z" fill="#67994f" stroke="#427b55" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M57 84q12-7 29 0" fill="none" stroke="#a78859" strokeWidth="3" strokeLinecap="round" />
  </DasarAir>,
  "rantai-pohon-mangga": <g>
    <path d="M34 89Q65 82 97 89" fill="none" stroke="#8cb56b" strokeWidth="4" strokeLinecap="round" />
    <path d="M57 86L60 51 44 38 49 29 66 43 85 27 92 33 73 52 74 86Z" fill="#956846" stroke="#6c4c36" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M20 53Q8 37 24 29Q22 12 42 12Q51 1 67 10Q85 2 97 15Q120 12 118 34Q125 49 109 58Q96 67 80 59Q64 72 50 60Q28 65 20 53Z" fill="#59975b" stroke="#3b6949" strokeWidth="2.5" />
    <path d="M26 34q9-14 20-11m22-3q9-5 18 2m9 11q13-3 15 8" fill="none" stroke="#8abc6c" strokeWidth="4" strokeLinecap="round" />
    <g fill="#ffb649" stroke="#a56c38" strokeWidth="2">
      <path d="M35 40q9-5 13 5q3 10-6 14q-10 1-10-9Z" />
      <path d="M64 37q9-5 13 5q3 10-6 14q-10 1-10-9Z" />
      <path d="M91 43q9-5 13 5q3 10-6 14q-10 1-10-9Z" />
    </g>
  </g>,
};
