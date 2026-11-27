import type { ReactNode } from "react";
import { TEMUAN_KEBUN } from "./ilustrasi-temuan-kebun";

const detail = { fill: "none", strokeWidth: 2.7, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Siluet horizontal dengan ujung di x=0 dan x=130, tepat di atas kedua garis ukur. */
export const BENDA_PENGGARIS_KAPTEN: Record<string, ReactNode> = {
  krayon: <>
    <path d="M0 50L28 32H116Q130 32 130 50Q130 68 116 68H28Z" fill="#db8e55" />
    <path d="M24 35H111V65H24Z" fill="#f3bc75" />
    <path d="M32 36V64M104 36V64" stroke="#b47245" strokeWidth="4" />
    <path d="M45 44H91" stroke="#ffddb0" strokeWidth="4" strokeLinecap="round" />
  </>,
  kunci: <>
    <path d="M0 50Q0 22 29 22Q48 22 52 40H125L130 46V56L122 65 111 57 103 66 92 57H52Q47 78 29 78Q0 78 0 50Z" fill="#d9a755" />
    <circle cx="24" cy="50" r="12" fill="#eef7ff" />
    <path d="M59 47H121" stroke="#f6d293" strokeWidth="4" strokeLinecap="round" />
  </>,
  sendok: <>
    <path d="M0 51Q0 24 29 24Q54 24 61 43L124 42Q130 43 130 50Q130 57 124 58L61 57Q54 76 29 76Q0 76 0 51Z" fill="#9bbdcf" />
    <path d="M7 49Q10 34 30 34Q48 34 53 47M62 48H122" {...detail} stroke="#e9f6ff" strokeWidth="4" />
    <path d="M10 58Q29 69 48 58" {...detail} stroke="#6794aa" />
  </>,
  sikat: <>
    <path d="M0 59Q0 51 10 49L75 50Q91 48 98 40H122Q130 40 130 50V56Q127 62 119 64L94 63Q84 65 72 68L12 70Q0 68 0 59Z" fill="#66a4cd" />
    <path d="M97 39L99 29 106 33 107 24 114 28 117 24 122 29 127 26 130 40Z" fill="#e4f4f6" stroke="#9ac2ce" strokeWidth="1.8" />
    <path d="M16 57H59M17 64H44" {...detail} stroke="#bfdfea" />
  </>,
  pensil: <>
    <path d="M0 50L25 33H113V67H25Z" fill="#edb55d" />
    <path d="M0 50L25 33V67Z" fill="#e7c79e" />
    <path d="M0 50L9 44V56Z" fill="#495865" />
    <path d="M24 40H110M24 60H110" stroke="#f7d78f" strokeWidth="2.8" />
    <path d="M110 33H121Q130 33 130 40V60Q130 67 121 67H110Z" fill="#e1959a" />
    <path d="M105 33H114V67H105Z" fill="#a4b6bb" />
  </>,
  wortel: TEMUAN_KEBUN.wortel,
  sumpit: <>
    <path d="M0 38L130 30V45L0 45ZM0 60L130 52V67L0 67Z" fill="#c88d60" />
    <path d="M98 34V45M108 33V44M98 56V67M108 55V66" stroke="#e8be8c" strokeWidth="4" />
  </>,
  pisang: <>
    <path d="M0 62L8 55Q58 79 115 32L121 22 130 28 126 43Q94 87 48 88Q16 85 0 68Z" fill="#efc457" />
    <path d="M0 62L8 55 12 59 6 72 0 68ZM118 25L121 22 130 28 126 39 117 35Z" fill="#8a8d4e" />
    <path d="M16 66Q56 87 115 41" {...detail} stroke="#c89549" />
  </>,
  // ID konten seruling dipakai kartu yang bernama saksofon.
  seruling: <>
    <path d="M1 22Q23 17 37 28Q45 35 47 52L53 69Q58 79 69 76Q81 73 85 62L99 35 115 42 100 72Q92 91 70 92Q47 94 36 75L26 45Q24 31 8 31H0Z" fill="#d8a252" />
    <path d="M0 20L14 19 17 31 0 33Z" fill="#4c5460" />
    <path d="M96 37L104 24Q115 19 128 31L130 39Q125 49 113 49Z" fill="#e8b765" />
    <ellipse cx="117" cy="33" rx="13" ry="8" transform="rotate(21 117 33)" fill="#a47341" />
    <path d="M20 25Q34 29 37 47L48 71Q56 86 70 83Q86 81 93 64L105 43" {...detail} stroke="#f5d394" />
    <g fill="#f2d5a4" stroke="#9f7449" strokeWidth="1.7">
      <circle cx="33" cy="39" r="4.2" /><circle cx="38" cy="50" r="4.2" /><circle cx="42" cy="60" r="4.2" />
      <circle cx="49" cy="71" r="4.2" /><circle cx="60" cy="79" r="4" />
    </g>
  </>,
  tongkat: <>
    <path d="M0 51Q0 44 7 43L122 35Q130 35 130 44Q130 51 124 53L7 62Q0 61 0 51Z" fill="#aa7a56" />
    <path d="M9 47L119 39M15 56L105 48" {...detail} stroke="#cf9b6c" />
  </>,
  cacing: TEMUAN_KEBUN.cacing,
  ulat: TEMUAN_KEBUN.ulat,
  cabai: <>
    <path d="M0 66Q14 72 37 54Q56 38 94 32Q119 32 119 45Q117 67 85 68Q22 85 0 66Z" fill="#cf615c" />
    <path d="M107 34Q112 26 130 29V35L117 39 111 51 107 45 100 39Z" fill="#72954e" />
    <path d="M29 68Q72 48 101 42" {...detail} stroke="#e88d80" />
  </>,
  ubi: TEMUAN_KEBUN.ubi,
  timun: TEMUAN_KEBUN.timun,
  terong: TEMUAN_KEBUN.terong,
  sawi: TEMUAN_KEBUN.sawi,
  jagung: TEMUAN_KEBUN.jagung,
  kadal: <>
    <path d="M0 62Q14 48 32 50Q44 51 61 43Q81 38 94 44Q101 29 119 34L130 41V48L119 55 97 55Q79 62 62 57Q52 63 31 58Q13 57 0 65Z" fill="#729a6e" />
    <path d="M66 52L53 68 52 76M78 52L78 69 93 77M91 49L101 62 113 66M67 46L60 34 50 33" {...detail} stroke="#739c73" strokeWidth="5" />
    <path d="M58 49Q78 43 97 48" {...detail} stroke="#a4bd85" />
    <circle cx="118" cy="41" r="2.8" fill="#334f46" />
  </>,
  kayu: <>
    <path d="M0 34L115 31Q130 35 130 51Q130 69 115 72L0 69Z" fill="#a57854" />
    <ellipse cx="12" cy="51" rx="12" ry="17.5" fill="#d4ab7a" />
    <ellipse cx="12" cy="51" rx="6" ry="11" fill="none" stroke="#9e7651" strokeWidth="2" />
    <path d="M25 42L116 38M27 52L122 48M28 62L117 60" {...detail} stroke="#c1986a" />
  </>,
  ular: <>
    <path d="M0 64Q18 55 26 63Q41 76 55 55T88 49Q104 62 112 46Q123 36 130 46V52Q120 60 116 60Q103 76 87 65Q69 46 60 67T23 72Q12 66 0 67Z" fill="#729d5d" />
    <path d="M24 68Q41 81 55 60T87 58Q102 68 113 54" {...detail} stroke="#a6c180" />
    <circle cx="121" cy="46" r="2.7" fill="#385941" />
  </>,
  "sapu-lidi": <>
    <path d="M0 28L42 35 59 44H130V53H59L38 62 0 75Z" fill="#bd945c" />
    <path d="M0 35L55 46M2 45L55 48M0 56L55 50M0 67L55 52" {...detail} stroke="#e0bb7e" />
    <path d="M53 40V58M61 43V55" stroke="#885c43" strokeWidth="4" />
    <path d="M69 47H125" {...detail} stroke="#e0bb7e" />
  </>,
};
