import type { ReactNode } from "react";

const stroke = { stroke: "#344f62", strokeWidth: 2.4, strokeLinejoin: "round", strokeLinecap: "round" } as const;

const grainPositions = [[-22, 1], [-16, -4], [-8, 2], [0, -8], [8, -3], [17, 0], [23, 6], [-2, 8], [12, 9], [-14, 9]];

function Butiran({ x, y, warna, lonjong = false }: { x: number; y: number; warna: string; lonjong?: boolean }) {
  return <g fill={warna} stroke="none">
    {grainPositions.map(([dx, dy], index) => (
      <ellipse key={index} cx={x + dx} cy={y + dy} rx={lonjong ? 4 : 2.3} ry={lonjong ? 1.8 : 2.1} transform={lonjong ? `rotate(${index % 2 ? -25 : 30} ${x + dx} ${y + dy})` : undefined} />
    ))}
  </g>;
}

function Serbuk({ warna, bintik, serut = false }: { warna: string; bintik: string; serut?: boolean }) {
  return <g {...stroke}>
    <ellipse cx="65" cy="73" rx="52" ry="16" fill="#e2eef4" />
    <path d="M20 72Q35 60 49 50Q67 33 82 52Q93 58 109 72Q66 85 20 72Z" fill={warna} />
    <Butiran x={63} y={65} warna={bintik} lonjong={serut} />
    <path d="M40 62Q54 50 63 49" stroke="#fff" strokeOpacity=".8" fill="none" />
  </g>;
}

function Botol({ kecap = false }: { kecap?: boolean }) {
  const dark = kecap ? "#6a362d" : "#eca037";
  return <g {...stroke}>
    <path d="M48 9H81V23H48Z" fill={kecap ? "#cf4a40" : "#f2ae41"} />
    <path d="M50 23H79V34L89 44V87Q65 97 40 87V44L50 34Z" fill={kecap ? "#e3ba9e" : "#fff2c9"} />
    <path d="M41 55Q61 49 88 55V87Q64 95 41 87Z" fill={dark} />
    <path d="M48 46V77" fill="none" stroke="#fff" strokeOpacity=".8" />
  </g>;
}

type IsiGelas = "soda" | "jus" | "tablet" | "pasir" | "teh" | "santan" | "kopi";

const isiGelas: Record<IsiGelas, { cairan: string; ampas?: string }> = {
  soda: { cairan: "#c27b4f" },
  jus: { cairan: "#ffaa32" },
  tablet: { cairan: "#c0e7f5" },
  pasir: { cairan: "#c0e7f5", ampas: "#bd914d" },
  teh: { cairan: "#d69f55", ampas: "#614627" },
  santan: { cairan: "#fff4d9", ampas: "#b18d65" },
  kopi: { cairan: "#a86548", ampas: "#4c2c26" },
};

function Gelas({ isi }: { isi: IsiGelas }) {
  const { cairan, ampas } = isiGelas[isi];
  const berbuih = isi === "soda" || isi === "tablet";
  return <g {...stroke}>
    <path d="M30 16H100L92 83Q65 95 38 83Z" fill="#ebf8fb" />
    <path d="M33 41Q63 35 97 41L92 83Q65 95 38 83Z" fill={cairan} />
    <path d="M38 23L45 61" fill="none" stroke="#fff" strokeWidth="3.8" />
    {ampas && <>
      <path d="M40 80Q65 73 90 80L89 83Q65 91 40 83Z" fill={ampas} stroke="none" />
      <Butiran x={65} y={67} warna={ampas} />
    </>}
    {isi === "tablet" && <ellipse cx="66" cy="80" rx="13" ry="5.5" fill="#f9f6df" stroke="#698c98" />}
    {berbuih && [[60, 32, 5], [74, 48, 4], [63, 55, 6], [76, 63, 3], [59, 70, 3]].map(([cx, cy, r]) => (
      <circle key={cy} cx={cx} cy={cy} r={r} fill="#fff" fillOpacity=".76" stroke={isi === "soda" ? "#a75a36" : "#6699af"} strokeWidth="1.4" />
    ))}
    {isi === "jus" && <>
      <circle cx="102" cy="20" r="14" fill="#ffa63d" stroke="#bf6a22" />
      <path d="M90 20H114M102 8V32M94 12L110 28M94 28L110 12" stroke="#fff0c9" strokeWidth="1.5" />
    </>}
  </g>;
}

type Campuran = "kerikil" | "beras" | "tepung" | "mur" | "klip" | "besi";

function CampuranKering({ jenis }: { jenis: Campuran }) {
  return <g {...stroke}>
    <ellipse cx="65" cy="56" rx="55" ry="33" fill="#ddeef4" />
    <ellipse cx="65" cy="55" rx="47" ry="25" fill="#f8fcfd" stroke="#9bb3c1" />
    {jenis === "kerikil" && <>
      <path d="M22 61Q40 34 63 37Q82 41 105 63Q62 75 22 61Z" fill="#e8c279" />
      <Butiran x={61} y={59} warna="#aa743f" />
      <path d="M35 54L39 43 50 43 54 52 50 56ZM67 51L71 39 82 42 87 52 81 56ZM80 65L85 56 97 60 98 66Z" fill="#929da4" />
    </>}
    {jenis === "beras" && <>
      <Butiran x={63} y={49} warna="#b9a792" lonjong />
      <Butiran x={68} y={65} warna="#d4c2a7" lonjong />
      <path d="M36 51C28 39 49 35 47 45Q45 51 36 51ZM83 45C80 33 97 39 96 47Q91 54 83 45ZM56 69C44 65 49 56 57 57Q67 59 64 65Z" fill="#a64550" />
    </>}
    {jenis === "tepung" && <>
      <path d="M24 63Q43 57 54 43Q67 34 82 47L105 64Q67 78 24 63Z" fill="#f1e9d0" stroke="#b6a58b" />
      <Butiran x={65} y={62} warna="#d8c8ad" />
      <circle cx="45" cy="49" r="10" fill="#60b9d7" />
      <circle cx="84" cy="58" r="10" fill="#6d8fe1" />
      <path d="M41 45L45 43M80 54L84 52" stroke="#fff" />
    </>}
    {jenis === "mur" && <>
      {[[45, 46], [76, 62]].map(([x, y]) => <g key={x} transform={`translate(${x} ${y})`}>
        <path d="M-10-5L-2-10 8-7 11 2 5 10-5 9-11 2Z" fill="#a7bac5" />
        <circle r="4" fill="#f8fcfd" />
      </g>)}
      <circle cx="78" cy="41" r="9" fill="#de78ad" />
      <circle cx="46" cy="67" r="9" fill="#74c585" />
      <path d="M75 39H81M43 65H49" stroke="#fff" />
    </>}
    {jenis === "klip" && <>
      <circle cx="46" cy="48" r="11" fill="#73c887" />
      <circle cx="79" cy="64" r="11" fill="#e388b6" />
      <path d="M44 46h4m-4 5h4m29 11h4m-4 5h4" />
      <path d="M79 42L88 33Q95 29 97 36L96 40 84 52Q79 56 76 51Q73 47 77 43L87 35M40 63L32 71Q26 78 22 72Q19 68 23 64L33 53Q38 50 41 54Q44 58 40 62L29 72" fill="none" stroke="#647d8c" strokeWidth="3.2" />
    </>}
    {jenis === "besi" && <>
      <Butiran x={54} y={49} warna="#c48b43" />
      <Butiran x={72} y={62} warna="#c48b43" />
      <Butiran x={66} y={47} warna="#435765" />
      <Butiran x={59} y={64} warna="#435765" />
    </>}
  </g>;
}

export const ILUSTRASI_BAHAN_SD3: Record<string, ReactNode> = {
  "sd3-minyak-goreng": <Botol />,
  "sd3-kecap": <Botol kecap />,
  "sd3-soda": <Gelas isi="soda" />,
  "sd3-jus-jeruk": <Gelas isi="jus" />,
  "sd3-tablet-berbuih": <Gelas isi="tablet" />,
  "sd3-air-pasir": <Gelas isi="pasir" />,
  "sd3-teh-ampas": <Gelas isi="teh" />,
  "sd3-santan-ampas": <Gelas isi="santan" />,
  "sd3-kopi-ampas": <Gelas isi="kopi" />,
  "sd3-pasir-kerikil": <CampuranKering jenis="kerikil" />,
  "sd3-beras-kacang": <CampuranKering jenis="beras" />,
  "sd3-tepung-kelereng": <CampuranKering jenis="tepung" />,
  "sd3-manik-mur": <CampuranKering jenis="mur" />,
  "sd3-kancing-klip": <CampuranKering jenis="klip" />,
  "sd3-pasir-besi": <CampuranKering jenis="besi" />,
  "sd3-pasir": <Serbuk warna="#e7bd75" bintik="#a37348" />,
  "sd3-gula-pasir": <Serbuk warna="#fff5df" bintik="#cab38c" />,
  "sd3-bubuk-jeruk": <Serbuk warna="#ffb45e" bintik="#c56724" />,
  "sd3-serbuk-kayu": <Serbuk warna="#d4a77f" bintik="#98663c" serut />,
  "sd3-kopi-bubuk": <Serbuk warna="#966344" bintik="#462e24" />,
  "sd3-pewarna-bubuk": <Serbuk warna="#d480c4" bintik="#933786" />,
  "sd3-gula-merah-serut": <Serbuk warna="#bb7550" bintik="#8a3e30" serut />,
  "sd3-gula-batu": <g {...stroke} stroke="#ac9772">
    <path d="M23 60L31 42 49 39 65 52 62 71 44 81 26 74ZM53 40L57 23 77 18 91 29 88 47 72 57 63 51ZM72 67L82 49 103 51 113 65 106 79 89 83Z" fill="#f9eed4" />
    <path d="M24 59L44 61 49 42M44 61V80M57 27L73 38 88 31M73 38L71 55M75 65L93 67 103 53M93 67L90 81" fill="none" />
  </g>,
  "sd3-kolam-renang": <g {...stroke}>
    <path d="M17 57L37 28H108L117 69 95 86H20Z" fill="#d2e5ed" />
    <path d="M28 57L43 38H99L106 66 91 76H31Z" fill="#65c6e8" stroke="#4b8ca8" />
    <path d="M38 61Q50 56 62 61T85 61M58 48Q66 45 74 48" stroke="#e8faff" fill="none" />
    <path d="M87 36L82 56M98 36L94 56M89 44H96M85 51H95" stroke="#4b6d83" fill="none" />
  </g>,
  "sd3-cat-basah": <g {...stroke}>
    <path d="M30 49H89L83 84Q61 92 37 84Z" fill="#c6dbe2" />
    <ellipse cx="59" cy="49" rx="30" ry="9" fill="#7cbda1" />
    <path d="M35 49Q59 58 84 49L80 59 74 58 70 68 64 66 61 60 55 61 52 56 47 57Z" fill="#79c4a2" stroke="#5d957b" />
    <path d="M78 33L98 14Q106 10 109 17Q109 21 104 25L83 41Z" fill="#dd9661" />
    <path d="M77 33L85 41 75 48 64 49 69 38Z" fill="#98cbb4" />
  </g>,
  "sd3-ban-sepeda": <g {...stroke}>
    <circle cx="65" cy="50" r="38" fill="#425266" />
    <circle cx="65" cy="50" r="27" fill="#d8edf2" stroke="#6d98a7" />
    <path d="M65 25V75M40 50H90M47 32L83 68M47 68L83 32" stroke="#7b9ba7" strokeWidth="1.7" />
    <circle cx="65" cy="50" r="5" fill="#7c919a" />
    <path d="M94 25Q112 45 101 66L93 60Q101 42 86 32Z" fill="#a1dcf2" stroke="#285779" />
    <path d="M97 36Q102 43 102 50" fill="none" stroke="#fff" />
    <path d="M98 58L94 52" fill="none" stroke="#768897" />
  </g>,
  "sd3-kancing-baju": <g {...stroke}>
    <circle cx="65" cy="52" r="32" fill="#78b7d8" />
    <circle cx="65" cy="52" r="23" fill="#a6d6eb" stroke="#6493b0" />
    <path d="M55 43h3m14 0h3M55 59h3m14 0h3" strokeWidth="5.5" />
  </g>,
  "sd3-potongan-krayon": <g {...stroke}>
    <path d="M20 59L36 48 56 54 44 72 32 76ZM66 63L80 54 98 62 89 78 76 79Z" fill="#7cc7a5" />
    <path d="M54 36L66 21 88 33 87 48 70 51Z" fill="#de8ba6" />
    <path d="M31 53L47 63M60 30L83 41M74 60L93 69" stroke="#f8e8de" fill="none" strokeWidth="3.2" />
  </g>,
};
