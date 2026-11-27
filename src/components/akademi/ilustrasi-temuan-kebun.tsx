import type { ReactNode } from "react";

const urat = { fill: "none", stroke: "#367449", strokeWidth: 2 } as const;
const daun = (warna: string) => <><path d="M0 53Q50-8 130 48Q70 109 0 53Z" fill={warna} /><path d="M0 53L125 49M30 52l10-20M50 51l20-24M72 50l24-17M32 52l16 20M56 51l23 22M82 50l24 14" {...urat} /></>;
const batang = <path d="M0 55Q44 62 99 49" fill="none" stroke="#4d8548" strokeWidth="6" />;

/** Siluet horizontal: ujung benda tepat di x=0 dan x=130, sesuai kedua garis ukur. */
export const TEMUAN_KEBUN: Record<string, ReactNode> = {
  daunpisang: <><path d="M0 51L17 27 30 32 44 18 59 26 74 18 91 30 106 29 130 50 109 73 97 66 80 82 66 73 50 82 34 71 18 75Z" fill="#75a64b" /><path d="M0 51H130M25 50l18-24m-5 24 20 26m5-26 16-22m0 22 19 19" {...urat} /></>,
  ranting: <><path d="M0 53L130 42 130 54 0 64Z" fill="#92633e" /><path d="M29 55L49 20M72 49L94 17M68 53L86 83M105 48L119 28" stroke="#92633e" strokeWidth="6" /><path d="M6 57L122 48" stroke="#c69766" strokeWidth="2" /></>,
  akar: <><path d="M0 40Q32 49 54 45T130 56V68Q84 55 56 60T0 54Z" fill="#9a6c43" /><path d="M21 50Q26 70 53 81M59 53Q64 29 88 18M93 56Q100 77 121 87M39 73L35 88M76 28l-2-15" fill="none" stroke="#9a6c43" strokeWidth="5" /></>,
  timun: <><ellipse cx="65" cy="51" rx="65" ry="25" fill="#67a947" /><path d="M8 49Q65 23 121 48M11 59Q68 75 121 57" {...urat} />{[22,45,68,91,113].map(x=><circle key={x} cx={x} cy="48" r="2" fill="#d8ec92" />)}</>,
  wortel: <><path d="M0 62Q49 14 99 32Q118 49 99 70Q50 80 0 62Z" fill="#ee933d" /><path d="M101 48L130 17 123 45 130 71 104 58Z" fill="#5d9c45" /><path d="M36 50l7 12m20-24 5 15m16-9 7 13" stroke="#c66a2d" strokeWidth="3" /></>,
  terong: <><path d="M0 56Q2 26 35 33L99 31Q119 49 98 69L36 78Q6 84 0 56Z" fill="#7654a2" /><path d="M94 30L106 40 130 37V44L111 51 100 69 96 50 84 44Z" fill="#5e9647" /><path d="M16 47Q33 39 71 42" fill="none" stroke="#b299d1" strokeWidth="5" /></>,
  sawi: <><path d="M0 55L60 35 77 47 60 73Z" fill="#d3e3ab" /><path d="M44 46Q31 15 62 18Q82 3 96 23Q129 12 130 48Q129 82 102 76Q77 98 55 76Q30 82 44 46Z" fill="#55924d" /><path d="M0 55L116 49M49 53l28-22M62 52l35 17" stroke="#bbd7a0" strokeWidth="3" /></>,
  ubi: <><path d="M0 55Q18 22 61 26Q111 13 130 46Q118 82 67 77Q24 91 0 55Z" fill="#ad755a" /><path d="M18 50l13-8m16 21 13 3m22-28 11-2m12 25 10-6" stroke="#794b42" strokeWidth="3" /></>,
  jagung: <><path d="M0 52Q9 25 88 27Q118 48 88 75Q12 81 0 52Z" fill="#f4ca58" />{[18,35,52,69,86].map(x=><path key={x} d={`M${x} 33v37`} stroke="#cda241" strokeWidth="2" />)}<path d="M8 44H97M8 59H97" stroke="#cda241" strokeWidth="2" /><path d="M65 24L130 51 64 82 98 52Z" fill="#81a953" /></>,
  mawar: <>{batang}<path d="M31 57Q29 27 56 38L45 56M58 56Q68 82 85 62Z" fill="#6fa256" /><circle cx="110" cy="48" r="20" fill="#d95a6d" /><path d="M100 43q17-16 22 4l-13 12-12-10 9-12" fill="none" stroke="#a63754" strokeWidth="3" /></>,
  nanas: <><path d="M0 51Q2 19 46 22Q90 18 98 51Q87 84 44 81Q3 83 0 51Z" fill="#dca846" /><path d="M12 29l50 48M35 24l51 44M9 61l43-37M25 77l48-49M48 80l44-39" stroke="#aa7e31" strokeWidth="2" /><path d="M85 51L122 8 111 39 130 51 111 61 122 91Z" fill="#608c49" /></>,
  daunjati: <>{daun("#b78a55")}</>,
  kaktus: <><path d="M0 53Q0 38 19 38H46V18Q54 7 63 18V39H91V26Q100 13 109 26V39H117Q130 39 130 53Q130 68 117 68H19Q0 68 0 53Z" fill="#76a16a" /><path d="M7 52H122M54 21V45M100 27V45" stroke="#b1cc8b" strokeWidth="2" /><path d="M20 37l-3-6m20 7 3-7m35 8 3-7M32 69l3 7m48-8 3 7m30-7 4 7" stroke="#496e49" strokeWidth="2" /></>,
  bungamatahari: <>{batang}<path d="M25 55Q30 26 53 39L42 55M57 56Q66 81 85 64Z" fill="#7ca44e" />{Array.from({length:10},(_,i)=><ellipse key={i} cx="97" cy="29" rx="7" ry="12" fill="#edc14a" transform={`rotate(${i*36} 97 50)`} />)}<circle cx="97" cy="50" r="15" fill="#815d3c" /><path d="M124 45L130 50 124 55" fill="#edc14a" /></>,
  ulat: <><path d="M11 67v10m23-10v10m23-10v10m23-10v10m23-10v10" stroke="#67813e" strokeWidth="4" />{[17,40,63,86].map(x=><ellipse key={x} cx={x} cy="54" rx="17" ry="19" fill="#94ba60" />)}<circle cx="113" cy="49" r="17" fill="#a8c971" /><circle cx="119" cy="44" r="3" fill="#294b3c" /><path d="M109 33l-2-10m12 11 4-10" stroke="#67813e" strokeWidth="3" /></>,
  daunjambu: <>{daun("#6da561")}</>,
  bulu: <><path d="M0 72Q24 10 130 28Q110 77 0 72Z" fill="#8ebcc5" /><path d="M0 72L130 28M22 64l9-24m10 17 16-27m10 17 19-22m-55 36 26 5m2-20 31 7" fill="none" stroke="#507b91" strokeWidth="2" /></>,
  cacing: <><path d="M0 53C27 15 41 84 65 53S104 21 130 53" fill="none" stroke="#bd7d7d" strokeWidth="16" /></>,
};
