import type { ReactNode } from "react";

function Sawi() {
  return <g stroke="#386646" strokeWidth="2.6">
    {([[-24, "#538f55"], [22, "#68a860"], [0, "#78b66d"]] as const).map(([sudut, warna]) => <g key={sudut} transform={`rotate(${sudut} 64 89)`}>
      <path d="M58 86C55 65 40 49 41 30C41 13 50 7 64 7C78 7 87 17 86 34C84 54 70 70 69 86Z" fill={warna} />
      <path d="M57 84Q59 73 62 60L64 33L67 60Q69 75 71 84Q67 92 57 90Z" fill="#d8e4bd" stroke="#789765" strokeWidth="1.8" />
      <path d="M64 46L53 31M65 50L76 34" stroke="#90bf80" fill="none" strokeWidth="2" />
    </g>)}
  </g>;
}

function Kol() {
  return <g stroke="#4f784e" strokeWidth="2.5">
    <path d="M19 43Q13 26 35 23Q42 10 61 16Q77 8 89 21Q110 21 111 42Q120 59 107 76Q88 95 62 92Q39 94 22 79Q12 66 19 43Z" fill="#8dbd77" />
    <path d="M53 20Q39 30 43 49Q47 64 64 82Q80 60 91 54Q103 34 89 21Q78 17 66 22Q60 18 53 20Z" fill="#b8d79b" />
    <path d="M22 40Q37 33 48 53Q56 71 64 82Q87 79 99 58Q108 44 112 52Q117 69 101 81Q85 94 62 92Q35 92 22 77Q11 63 22 40Z" fill="#9fc988" />
    <path d="M26 51Q30 71 51 81M102 60Q92 76 75 84M65 29Q62 51 64 72M64 50L77 41M63 58L53 47" fill="none" stroke="#749c64" strokeWidth="2" />
  </g>;
}

function DaunSingkong() {
  return <>
    <path d="M64 53Q73 77 58 94" fill="none" stroke="#6c674a" strokeWidth="4" />
    {[-109, -71, -34, 0, 35, 71, 107].map((sudut, index) => (
      <g key={sudut} transform={`translate(64 53) rotate(${sudut}) scale(${index === 0 || index === 6 ? 0.63 : index === 1 || index === 5 ? 0.83 : 1})`}>
        <path d="M0 2Q-9-13-7-27Q-5-40 0-47Q10-34 9-22Q8-8 0 2Z" fill={index % 2 ? "#71ae62" : "#5c9e54"} stroke="#3f7646" strokeWidth="2" />
        <path d="M0-2V-40" stroke="#9bc681" strokeWidth="1.6" fill="none" />
      </g>
    ))}
  </>;
}

function UbiJalar({ ungu }: { ungu: boolean }) {
  return <>
    <path d="M13 62Q24 56 26 43Q32 27 52 23Q70 23 79 30Q92 38 105 41Q111 51 101 59Q87 63 76 73Q49 91 31 74Q23 66 13 62Z" fill={ungu ? "#85508f" : "#b7665b"} stroke={ungu ? "#4f335f" : "#784335"} strokeWidth="3" />
    <path d="M40 39Q50 30 61 33M29 53L34 50M61 67L67 62M54 49L58 45M82 55L89 52" fill="none" stroke={ungu ? "#c187bd" : "#d58d79"} strokeWidth="2.4" />
    <path d="M81 61Q87 56 101 62Q115 68 116 77Q117 87 107 92Q96 97 81 89Q68 82 72 72Z" fill={ungu ? "#76417d" : "#a95549"} stroke={ungu ? "#4f335f" : "#784335"} strokeWidth="2.4" />
    <path d="M82 65Q91 60 103 67Q114 73 109 81Q102 90 90 84Q75 79 79 70Z" fill={ungu ? "#b765bc" : "#efab52"} stroke={ungu ? "#512f61" : "#92582c"} strokeWidth="2" />
    <path d="M87 68Q91 66 97 69" fill="none" stroke={ungu ? "#dd9ed4" : "#ffd183"} strokeWidth="2" />
  </>;
}

function LobakPutih() {
  return <g transform="rotate(30 65 54)">
    <path d="M64 25Q45 15 48 6Q63 6 67 20Q68 6 84 8Q85 19 70 26Z" fill="#79ac62" stroke="#527b4e" strokeWidth="2.5" />
    <path d="M64 23C50 22 44 30 45 42Q47 64 57 76Q62 84 65 94Q67 79 75 69Q86 54 87 39C88 28 81 23 69 23Z" fill="#fffcef" stroke="#7c8d79" strokeWidth="2.8" />
    <path d="M46 38Q65 44 85 38Q87 26 76 24Q60 20 50 28Z" fill="#dbe6c4" />
    <path d="M73 51L79 49M52 58L58 60M66 69L71 67" fill="none" stroke="#c9c8ab" strokeWidth="2.2" />
  </g>;
}

function Bayam() {
  return <g stroke="#507a4b" strokeWidth="2.4">
    <path d="M48 89Q65 72 67 49M48 89Q49 62 25 51M49 89Q73 81 97 64" fill="none" strokeWidth="3.5" />
    <path d="M65 53C45 52 39 39 47 25Q54 16 72 9Q90 28 84 43Q79 55 65 53Z" fill="#85b961" />
    <path d="M40 69Q14 70 12 42Q32 35 43 47Q53 58 40 69Z" fill="#75ae65" />
    <path d="M72 74Q70 54 85 51Q99 48 116 53Q110 77 92 80Q80 84 72 74Z" fill="#68aa63" />
    <path d="M66 53L73 21M66 45L55 32M66 39L78 34M39 68L20 49M72 75L105 58M84 69L85 59M93 66L98 70" fill="none" strokeWidth="1.8" />
  </g>;
}

function Selada() {
  return <g stroke="#578053" strokeWidth="2.3">
    <path d="M58 83Q46 83 37 74Q19 74 19 60Q8 53 14 41Q10 31 24 27Q19 15 33 14Q36 5 48 12Q60 8 66 24Z" fill="#8cbc65" />
    <path d="M67 86Q83 85 88 76Q106 79 108 65Q121 58 113 48Q120 34 108 30Q113 17 97 15Q91 4 80 12Q69 10 66 25Z" fill="#80b663" />
    <path d="M62 90Q43 81 47 67Q37 60 43 50Q37 42 44 34Q40 25 48 22Q50 13 58 15Q66 6 73 16Q83 13 87 24Q94 30 86 41Q92 50 84 57Q90 69 79 76Q77 86 62 90Z" fill="#a9d07a" />
    <path d="M64 86Q67 62 65 30M65 60L53 48M65 68L77 54M49 72L29 46M80 71L98 44" fill="none" stroke="#719d54" strokeWidth="2.1" />
  </g>;
}

function Kangkung() {
  return <g stroke="#3d764d" strokeWidth="2.5">
    <path d="M25 88Q49 71 65 57Q83 41 106 25" fill="none" strokeWidth="4" />
    <path d="M52 67Q35 60 26 46L17 20L43 42Q56 49 59 58L60 71L52 67Z" fill="#78af62" />
    <path d="M76 51L71 39Q72 28 87 19L114 9L103 35Q99 47 82 49L76 51Z" fill="#73b06a" />
    <path d="M55 65L43 51L25 30M79 48L103 21M46 74Q60 83 80 84" fill="none" strokeWidth="2" />
    <path d="M58 75L67 69Q84 70 115 82Q85 91 68 87L58 80Z" fill="#64a663" />
    <path d="M62 78Q80 82 105 83" fill="none" strokeWidth="1.8" />
  </g>;
}

const ILUSTRASI: Record<string, () => ReactNode> = {
  "panen-sawi": Sawi,
  "panen-kol": Kol,
  "panen-daun-singkong": DaunSingkong,
  "panen-ubi-jalar-ungu": () => <UbiJalar ungu />,
  "panen-ubi-jalar": () => <UbiJalar ungu={false} />,
  "panen-lobak-putih": LobakPutih,
  "panen-bayam": Bayam,
  "panen-selada": Selada,
  "panen-kangkung": Kangkung,
};

export const ILUSTRASI_HASIL_PANEN_IDS = Object.keys(ILUSTRASI);

export function IlustrasiHasilPanen({ id }: { id: string }) {
  const Gambar = ILUSTRASI[id];
  if (!Gambar) return null;
  return <g strokeLinejoin="round" strokeLinecap="round"><Gambar /></g>;
}
