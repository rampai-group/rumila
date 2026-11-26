import type { ReactNode } from "react";

const garis = { stroke: "#365466", strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Benda yang perlu lebih spesifik daripada emoji pada Pilot M26–30. */
export const ILUSTRASI_UKUR_PILOT: Record<string, ReactNode> = {
  "pilot-mobil-eskrim": <g {...garis}>
    <path d="M9 29H81V41H104L120 61V80H9Z" fill="#a9dce6" />
    <path d="M87 46H102L113 60H87Z" fill="#eefaff" />
    <rect x="18" y="38" width="52" height="28" rx="3" fill="#fff9e3" />
    <path d="M37 52L44 65 51 52Z" fill="#d9a45f" /><circle cx="44" cy="47" r="9" fill="#f5b7cc" />
    <circle cx="29" cy="81" r="10" fill="#4e6173" /><circle cx="103" cy="81" r="10" fill="#4e6173" />
    <path d="M87 11V27Q78 32 75 26Q73 20 87 21M87 11L102 8V23Q94 28 91 22Q90 16 102 17" fill="#efb84c" />
  </g>,
  "pilot-beduk": <g {...garis}>
    <path d="M24 72L18 93M83 72L92 93M17 79H96" fill="none" stroke="#8b6342" strokeWidth="6" />
    <path d="M31 20H88Q107 23 108 50Q107 76 88 79H31Z" fill="#ba8056" />
    <ellipse cx="31" cy="49" rx="20" ry="29" fill="#f7ddb0" />
    <path d="M54 24V75M76 23V76M96 29V69" stroke="#805334" fill="none" />
    <path d="M20 50L8 33" stroke="#805334" strokeWidth="7" />
  </g>,
  "pilot-jam-baterai": <g {...garis}>
    <circle cx="57" cy="46" r="36" fill="#90bfcf" /><circle cx="57" cy="46" r="29" fill="#fffdf0" />
    <path d="M57 22V27M81 46H76M57 70V65M33 46H38M57 29V46L71 53" fill="none" />
    <rect x="86" y="66" width="31" height="17" rx="3" fill="#ebbf59" /><path d="M117 71H122V78H117M92 75H99M95 71V79M105 75H112" fill="none" />
  </g>,
  "pilot-bel-listrik": <g {...garis}>
    <rect x="25" y="13" width="80" height="72" rx="8" fill="#d4e4ea" />
    <circle cx="64" cy="42" r="25" fill="#e8b756" /><circle cx="64" cy="42" r="4" fill="#aa793a" />
    <path d="M93 59L85 46M43 85V95H75V85" fill="none" stroke="#4c7593" strokeWidth="4" />
    <path d="M12 26L5 21M11 43H2M115 26L122 21M117 43H127" stroke="#d28c2f" fill="none" />
  </g>,
  "pilot-cangkir-kosong": <g {...garis}>
    <path d="M88 34H100Q119 34 117 51Q116 68 89 67" fill="none" strokeWidth="7" />
    <path d="M25 27H92L86 76Q57 91 31 76Z" fill="#a7d1dc" />
    <ellipse cx="58" cy="27" rx="33" ry="10" fill="#f7fcff" />
  </g>,
  "pilot-mangkuk-kosong": <g {...garis}>
    <path d="M14 35Q19 83 65 86Q111 83 116 35Z" fill="#dfb48a" />
    <ellipse cx="65" cy="35" rx="51" ry="17" fill="#fff3df" />
    <path d="M25 39Q65 18 105 39" fill="none" stroke="#c19570" />
  </g>,
  "pilot-panci-kosong": <g {...garis}>
    <path d="M23 40H9V57H25M105 40H121V57H104" fill="none" strokeWidth="6" />
    <path d="M24 29H106V75Q65 94 24 75Z" fill="#9aafc0" />
    <ellipse cx="65" cy="29" rx="41" ry="14" fill="#eaf2f7" />
    <path d="M34 55V72" stroke="#d7e5ef" strokeWidth="5" />
  </g>,
};
