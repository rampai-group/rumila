import type { ReactNode } from "react";

const tepian = { strokeWidth: 2.3, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const ILUSTRASI_TUGAS_TUMBUHAN_SD3: Record<string, ReactNode> = {
  "sd3-tugas-akar-mencengkeram": <g {...tepian}>
    <rect x="4" y="4" width="122" height="92" rx="12" fill="#e4f1f4" />
    <path d="M4 61q32 4 61-2t61 2v23q0 12-12 12H16Q4 96 4 84Z" fill="#b89468" />
    <path d="M63 63q0-19 17-25m-7 9q-19 0-29-16 16-3 28 12m2 3q11-20 29-15-9 15-28 18" fill="#86ba62" stroke="#498653" />
    <path d="M62 64q-4 17-22 21m22-21q17 13 38 10M62 65l-1 26m-6-16-15 1m35-2 7 13" fill="none" stroke="#795740" strokeWidth="3.5" />
    <path d="M13 22h28q12 0 10-7m-40 15h20m-11 11h26" fill="none" stroke="#619bb3" />
  </g>,
  "sd3-tugas-batang-menopang": <g {...tepian}>
    <rect x="4" y="4" width="122" height="92" rx="12" fill="#e4f2dd" />
    <path d="M14 83h101" stroke="#98764d" />
    <path d="M62 85V27m0 22-19-6m19 8 18-13" fill="none" stroke="#42774c" strokeWidth="5" />
    <path d="M52 46Q31 51 26 33Q42 30 52 46Zm22 0q3-21 23-23-3 17-23 23ZM62 34q-14-6-9-24 16 6 9 24Z" fill="#7ebc5d" stroke="#42774c" />
    <path d="M87 57H68m6-5-6 5 6 5" fill="none" stroke="#b77338" />
  </g>,
  "sd3-tugas-krisan-air-berwarna": <g {...tepian}>
    <rect x="4" y="4" width="122" height="92" rx="12" fill="#e1edf1" />
    <path d="M35 65h61l-7 25H42Z" fill="#c7e4e9" stroke="#7c9fac" />
    <path d="M39 74h52l-3 14H44Z" fill="#e2a2a3" />
    <path d="M65 81q-3-26 0-56m-1 29q-20 1-21-13 13-1 21 9m1-6q12-17 27-15-4 14-27 18" fill="#79b874" stroke="#4d8852" />
    <path d="M64 80q-1-25 1-49" fill="none" stroke="#b94e52" />
    <path d="M65 20q-13-13-18-7t5 9q-16 1-10 8 4 4 17-2-5 12 2 14 8 0 6-13 8 12 14 7 5-5-7-11 15 0 15-6-1-7-15 1 8-11 3-14-7-2-12 14Z" fill="#f7f7ed" stroke="#909fa1" />
    <circle cx="65" cy="24" r="5" fill="#e2a656" />
    <path d="M77 77V50m-5 6 5-6 5 6" fill="none" stroke="#b94e52" />
  </g>,
  "sd3-tugas-daun-pucat": <g {...tepian}>
    <rect x="4" y="4" width="122" height="92" rx="12" fill="#e7e2d8" />
    <path d="M18 15h94v73H18Z" fill="#8f745d" stroke="#6d584b" />
    <path d="M36 20h57v57H36Z" fill="#414b54" />
    <path d="m18 23 23-8v73l-23 4Zm71-8 23 8v69l-23-4Z" fill="#a68a6e" stroke="#6d584b" />
    <path d="M65 71q-5-4-4-30m1 15q-13 0-16-15 14 2 16 12m1-5q-1-13 16-15-3 11-16 15Z" fill="#d5c374" stroke="#a89356" />
    <path d="M51 66h30l-4 13H55Z" fill="#ca906e" stroke="#8c643f" />
  </g>,
};
