import type { ReactNode } from "react";

const garis = { stroke: "#3e5c6c", strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const bintang = "M65 25L72 38 88 40 77 51 80 66 65 59 50 66 53 51 42 40 58 38Z";

function Bayangan({ buram = false }: { buram?: boolean }) {
  return buram ? <g stroke="none">
    <ellipse cx="65" cy="46" rx="26" ry="24" fill="#e28980" fillOpacity=".2" />
    <ellipse cx="65" cy="46" rx="21" ry="20" fill="#e28980" fillOpacity=".22" />
    <path d={bintang} fill="#e68175" fillOpacity=".42" style={{ filter: "blur(3px)" }} />
  </g> : <path d={bintang} fill="#f57e77" stroke="#bc4e4c" />;
}

function Kaca({ buram = false }: { buram?: boolean }) {
  return <g {...garis}>
    <rect x="22" y="12" width="86" height="74" rx="5" fill="#d2eff3" stroke="#7c9ca6" strokeWidth="5" />
    <Bayangan buram={buram} />
    <path d="M30 36L50 18M32 48L45 35M90 24L102 16M86 76L101 63" fill="none" stroke="#fff" strokeWidth="3" />
    {buram && <path d="M30 62L39 59M38 75L44 68M55 24L61 22M75 74L81 68M90 52L99 46" stroke="#f0fafb" strokeWidth="3" fill="none" />}
    <path d="M15 89H115" stroke="#8eabb4" strokeWidth="4" />
  </g>;
}

function Lembaran({ jenis }: { jenis: "kalkir" | "kertas-minyak" | "map" }) {
  const map = jenis === "map";
  const warna = map ? "#8ccecd" : jenis === "kalkir" ? "#dfe9ec" : "#f5e9bf";
  return <g {...garis}>
    <path d="M24 23L105 14 112 76 30 88Z" fill="#fff2d7" stroke="#9ba9a9" />
    <path d={map ? "M18 30L33 11H58L67 23 108 17 115 77 24 89Z" : "M17 29L103 18 114 65 96 86 27 91Z"} fill={warna} fillOpacity=".76" />
    <path d={map ? "M106 25L112 72" : "M96 86L94 70 114 65M25 35L43 32"} stroke="#fff8e7" fill="none" />
    <Bayangan buram />
  </g>;
}

function Botol({ bening = false }: { bening?: boolean }) {
  return <g {...garis}>
    <path d="M46 12H83V29L98 41V85Q66 94 32 85V41L46 29Z" fill={bening ? "#d9f2f5" : "#f9f1dd"} />
    {bening && <path d="M33 46Q63 43 97 46V85Q65 93 33 85Z" fill="#a2dfec" stroke="#76bada" />}
    <g transform="translate(22 26) scale(.66)"><Bayangan buram={!bening} /></g>
    <path d="M43 8H86V23H43Z" fill={bening ? "#79bad3" : "#b3b2d1"} />
    <path d="M41 48V71" stroke="#fff" strokeWidth="4" />
  </g>;
}

export const ILUSTRASI_CAHAYA_SD3: Record<string, ReactNode> = {
  "sd3-kaca-bening": <Kaca />,
  "sd3-kaca-buram": <Kaca buram />,
  "sd3-kertas-kalkir": <Lembaran jenis="kalkir" />,
  "sd3-kertas-minyak": <Lembaran jenis="kertas-minyak" />,
  "sd3-map-buram": <Lembaran jenis="map" />,
  "sd3-air-botol-bening": <Botol bening />,
  "sd3-botol-putih-susu": <Botol />,
  "sd3-penggaris-bening": <g {...garis}>
    <path d={bintang} fill="#f57e77" stroke="#bc4e4c" />
    <g transform="rotate(-24 65 50)">
      <rect x="13" y="33" width="104" height="35" rx="3" fill="#9de2eb" fillOpacity=".28" />
      <path d="M22 43V34M29 39V34M36 39V34M43 43V34M50 39V34M57 39V34M64 43V34M71 39V34M78 39V34M85 43V34M92 39V34M99 39V34M106 43V34" fill="none" strokeWidth="1.8" />
      <path d="M21 60H109" stroke="#fff" />
    </g>
  </g>,
  "sd3-papan-tulis": <g {...garis}>
    <rect x="15" y="16" width="100" height="65" rx="4" fill="#97afba" />
    <rect x="21" y="22" width="88" height="53" rx="2" fill="#f6fbf8" />
    <path d="M33 46H56M45 35V56M65 42H90M65 49H90" stroke="#6585b2" />
    <path d="M38 79H97L93 87H42Z" fill="#8da7b3" />
  </g>,
  "sd3-lampion-kertas": <g {...garis}>
    <path d="M65 6V19M64 84V95" fill="none" stroke="#883e3d" />
    <ellipse cx="65" cy="50" rx="37" ry="31" fill="#f39170" stroke="#a84e46" />
    <ellipse cx="65" cy="51" rx="24" ry="24" fill="#ffc78b" stroke="none" />
    <path d="M56 20Q37 50 56 80M74 20Q94 50 74 80M47 25Q21 51 47 76M83 25Q109 51 83 76" fill="none" stroke="#d36555" />
    <path d="M48 16H82V22H48ZM48 78H82V84H48Z" fill="#a65349" />
    <path d="M9 46H19M111 47H122M13 65L21 60M109 60L117 65" stroke="#f3bc76" />
  </g>,
  "sd3-es-keruh": <g {...garis}>
    <path d="M25 31L63 15 106 34 102 78 65 93 28 75Z" fill="#a6dce8" stroke="#5d95a7" />
    <path d="M25 31L65 49 106 34M65 49V92" fill="none" stroke="#71aebe" />
    <path d="M34 37Q45 26 61 28Q82 24 95 37Q92 49 78 54Q74 69 70 77Q62 82 54 70Q39 70 37 59Q29 50 34 37Z" fill="#e6f2ee" fillOpacity=".83" stroke="none" />
    <path d="M37 32L62 22 78 26M36 53L37 66 50 74" stroke="#fff" fill="none" strokeWidth="3.2" />
  </g>,
};
