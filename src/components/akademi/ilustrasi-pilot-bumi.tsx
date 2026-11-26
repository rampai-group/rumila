import type { ReactNode } from "react";

const air = "#369ed2", tanah = "#8bc46d";
const ombak = <path d="M10 70q10-7 20 0t20 0m15 12q10-7 20 0t20 0M55 53q10-7 20 0t20 0" fill="none" stroke="#bceeff" strokeWidth="3" />;
const pohon = (x: number, y: number) => <g key={`${x}-${y}`}><path d={`M${x} ${y}v18`} stroke="#8a613e" strokeWidth="4" /><path d={`M${x-10} ${y+8}l10-25 10 25Z`} fill="#277f49" /></g>;
const gunung = <path d="M4 69L39 14 73 69 98 29 126 70Z" fill="#788c80" stroke="#486e59" strokeWidth="2" />;
const danau = <><rect width="130" height="100" rx="10" fill="#d8f1fc" />{gunung}<path d="M0 69Q30 50 58 68T130 60V100H0Z" fill={tanah} /><ellipse cx="69" cy="79" rx="45" ry="15" fill={air} /><path d="M42 78h40m-25 7h40" stroke="#bceeff" strokeWidth="2" /></>;
const gambar: Record<string, ReactNode> = {
  laut: <><rect width="130" height="100" rx="10" fill="#c6edfa" /><path d="M0 35Q15 29 30 35T60 35T90 35T130 35V100H0Z" fill={air} />{ombak}</>,
  sungai: <><rect width="130" height="100" rx="10" fill={tanah} /><path d="M54 0C100 23 19 31 64 52S116 79 70 100H28C100 70 7 67 28 41S74 22 38 0Z" fill={air} />{pohon(15,28)}{pohon(108,48)}<path d="M48 19q20 8-1 17m14 32q20 10-4 19" fill="none" stroke="#baedff" strokeWidth="3" /></>,
  danau,
  waduk: <>{danau}<path d="M22 76L105 76 112 90 17 90Z" fill="#a0aab2" stroke="#556a77" strokeWidth="2" /><path d="M35 78v9m18-9v9m18-9v9m18-9v9" stroke="#657986" strokeWidth="3" /><path d="M57 90v10h15V90" fill={air} /></>,
  teluk: <><rect width="130" height="100" rx="10" fill={air} /><path d="M0 0H130V75L109 80 98 62Q112 27 67 26T28 66L20 85 0 72Z" fill="#eddb9b" /><path d="M0 0H130V59L112 64Q117 18 67 17T17 65L0 56Z" fill={tanah} />{ombak}</>,
  kolam: <><rect width="130" height="100" rx="10" fill={tanah} /><ellipse cx="65" cy="61" rx="52" ry="29" fill="#b7a18a" stroke="#777970" strokeWidth="3" /><ellipse cx="65" cy="61" rx="44" ry="22" fill={air} /><path d="M32 56h33m-11 14h40" stroke="#c2f3ff" strokeWidth="3" /><path d="M71 57q10-9 18 0-8 9-18 0l-7 6V51Z" fill="#f5a24b" /><circle cx="84" cy="56" r="1.5" fill="#365166" />{pohon(17,17)}</>,
  airterjun: <><rect width="130" height="100" rx="10" fill="#d8effa" /><path d="M0 18H96L108 83H0Z" fill="#8b927e" /><path d="M0 17H97V29H0Z" fill={tanah} /><ellipse cx="81" cy="86" rx="46" ry="12" fill={air} /><path d="M46 18H73V56L91 86H52L46 58Z" fill="#5ec6ec" /><path d="M53 23v36l13 24m-4-60v33l15 26" fill="none" stroke="#d5f7ff" strokeWidth="4" /></>,
  gunung: <><rect width="130" height="100" rx="10" fill="#d8f1fc" /><path d="M0 100L65 12 130 100Z" fill="#6f9c6b" stroke="#447a51" strokeWidth="2" /><path d="M65 12L45 40 62 34 72 40 85 40Z" fill="#e4e8d5" /></>,
  gunungapi: <><rect width="130" height="100" rx="10" fill="#e0eef5" /><path d="M10 94L50 37H79L124 94Z" fill="#8e7b64" /><path d="M50 37H79L84 53 70 48 67 68 57 49 43 54Z" fill="#f07a38" /><path d="M61 28q-19-12-4-22m15 23q18-14 4-23" fill="none" stroke="#aab5b7" strokeWidth="9" /></>,
  lembah: <><rect width="130" height="100" rx="10" fill="#d8f1fc" /><path d="M0 15Q35 24 65 81Q100 22 130 17V100H0Z" fill="#63a66b" /><path d="M0 71Q45 54 65 81Q94 63 130 72V100H0Z" fill="#a2cf74" /><path d="M64 80L56 100H80Z" fill="#dbca91" /></>,
  bukit: <><rect width="130" height="100" rx="10" fill="#d8f1fc" /><path d="M0 80Q40-22 88 80Z" fill="#6ca66a" /><path d="M30 100Q85-9 130 77V100Z" fill="#94c576" /><path d="M59 79l7-12 12 2 4 12Zm33 9 6-9 9 2 3 9Z" fill="#939b90" stroke="#697966" /></>,
  kebunteh: <><rect width="130" height="100" rx="10" fill="#d8f1fc" /><path d="M0 71Q60-32 130 62V100H0Z" fill="#7ab66a" />{[52,66,80,94].map(y=><path key={y} d={`M8 ${y}Q65 ${y-37} 125 ${y-3}`} fill="none" stroke="#2f7d49" strokeWidth="7" />)}</>,
  sawah: <><rect width="130" height="100" rx="10" fill="#e0f2fc" /><path d="M0 35H130V100H0Z" fill="#b5d477" /><path d="M0 55H130M0 78H130M33 35L13 100M81 35L97 100" stroke="#9d8d4a" strokeWidth="4" />{[25,52,73,106].map(x=><path key={x} d={`M${x} 72v-9m0 5l-4-5m4 5l4-5M${x} 48v-7`} stroke="#46913e" strokeWidth="2" />)}</>,
  gurun: <><rect width="130" height="100" rx="10" fill="#fcebc3" /><circle cx="104" cy="20" r="10" fill="#f1b74b" /><path d="M0 71Q30 23 78 66T130 59V100H0Z" fill="#e8bd70" /><path d="M0 88Q80 42 130 82V100H0Z" fill="#d7a453" /></>,
  hutan: <><rect width="130" height="100" rx="10" fill="#d3eccc" /><path d="M0 69H130V100H0Z" fill="#84ad62" />{[[15,45],[40,25],[64,51],[89,27],[113,54],[39,70],[91,73]].map(([x,y])=>pohon(x,y))}</>,
  pulau: <><rect width="130" height="100" rx="10" fill={air} /><path d="M16 66Q29 39 64 48T117 66Q89 91 35 79Z" fill="#edda9e" /><path d="M26 63Q65 3 107 64Z" fill="#71ad60" />{ombak}</>,
  pantai: <><rect width="130" height="100" rx="10" fill={air} /><path d="M0 0H43Q26 35 61 62T91 100H0Z" fill="#f0d69a" /><path d="M45 0Q30 34 64 61T95 100" fill="none" stroke="#e4f8f5" strokeWidth="5" />{pohon(15,34)}</>,
  kota: <><rect width="130" height="100" rx="10" fill="#d8effa" /><path d="M0 77H130V100H0Z" fill="#8c9c9e" />{[10,44,82].map((x,i)=><g key={x}><rect x={x} y={25+i*7} width="28" height={52-i*7} fill={['#d5a16b','#9baecc','#c7b498'][i]} stroke="#667c89" />{[0,1,2].map(j=><path key={j} d={`M${x+6} ${36+j*12}h5m5 0h5`} stroke="#f4f5d5" strokeWidth="5" />)}</g>)}<path d="M4 89H126" stroke="#f8edba" strokeWidth="2" strokeDasharray="13 7" /></>,
  kano: <><path d="M8 51Q65 75 122 51L106 76Q62 91 26 75Z" fill="#ac713f" stroke="#70492c" strokeWidth="3" /><ellipse cx="65" cy="55" rx="49" ry="11" fill="#dec294" stroke="#70492c" strokeWidth="3" /><path d="M93 15L46 72" stroke="#81603b" strokeWidth="5" /><path d="M45 66L33 79Q30 85 38 86L53 74Z" fill="#b8874e" stroke="#70492c" strokeWidth="2" /></>,
};
export const ILUSTRASI_PILOT_BUMI_IDS = Object.keys(gambar).map(id => `pilot-bumi-${id}`);
export function IlustrasiPilotBumi({ id }: { id: string }) { return gambar[id.replace(/^pilot-bumi-/, "")]; }
