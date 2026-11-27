import type { ReactNode } from "react";

const KONTUR = { strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Mata({ x, y }: { x: number; y: number }) {
  return <g stroke="none"><circle cx={x} cy={y} r="3.5" fill="#293c41" /><circle cx={x - 1} cy={y - 1} r="1.05" fill="#fff" /></g>;
}

function Tanah({ cerah, children }: { cerah?: boolean; children: ReactNode }) {
  return <>
    <rect x="5" y="8" width="120" height="85" rx="12" fill={cerah ? "#dcefc2" : "#eacda2"} />
    <path d="M5 34Q27 26 52 34T99 33L125 31V81Q125 93 112 93H18Q5 93 5 81Z" fill="#c3976d" />
    <path d="M5 34Q27 26 52 34T99 33L125 31M15 66L22 64M17 48L28 46M102 51L112 47M100 76L112 79M30 83L39 80" stroke="#a57953" fill="none" {...KONTUR} />
    <ellipse cx="65" cy={cerah ? 67 : 61} rx="40" ry="24" fill="#eed5ad" />
    {children}
  </>;
}

function TelurBerkelompok({ jumlah, bulat }: { jumlah: number; bulat?: boolean }) {
  return <g fill="#fff4d7" stroke="#b79770" strokeWidth="1.7">
    {[[47, 56], [60, 48], [77, 54], [85, 67], [68, 66], [51, 70], [36, 65]].slice(0, jumlah).map(([x, y], i) =>
      <ellipse key={x} cx={x} cy={y} rx={bulat ? 8 : 7.7} ry={bulat ? 7.8 : 4.8} transform={bulat ? undefined : `rotate(${i % 2 ? 26 : -27} ${x} ${y})`} />)}
  </g>;
}

function Daun({ children }: { children: ReactNode }) {
  return <g {...KONTUR}>
    <path d="M11 79Q12 37 53 24Q80 15 121 26Q103 75 69 82Q40 90 11 79Z" fill="#9ec675" stroke="#577c52" />
    <path d="M9 87Q39 70 111 31M41 70L32 49M52 64L47 37M69 53L77 29M69 53L91 65" fill="none" stroke="#749656" />
    {children}
  </g>;
}

function Kepik({ tahap }: { tahap: "telur" | "larva" | "pupa" }) {
  return <Daun>
    {tahap === "telur" && <g stroke="#a07836" strokeWidth="1.7" fill="#f9c951">
      {[[43, 55], [55, 47], [68, 43], [81, 39], [60, 63], [73, 55], [86, 50]].map(([x, y]) =>
        <ellipse key={x} cx={x} cy={y} rx="4.9" ry="10.5" transform={`rotate(-18 ${x} ${y})`} />)}
    </g>}
    {tahap === "larva" && <g stroke="#383f47" {...KONTUR}>
      <path d="M28 67Q41 51 54 47Q69 39 86 42Q99 44 95 54Q89 65 74 69Q52 75 28 67Z" fill="#4e5864" />
      <path d="M40 60L36 50M47 55L44 45M56 50L53 41M69 45L67 36M80 42L81 34M46 72L45 78M55 71L58 78M64 70L67 76M75 66L79 74M84 64L89 69M88 56L96 60" fill="none" strokeWidth="2.8" />
      <path d="M50 60L56 56M61 64L65 57M70 55L76 53M81 58L85 54" stroke="#f1984f" strokeWidth="4" />
      <circle cx="91" cy="48" r="2.2" fill="#253a3a" stroke="none" />
      <ellipse cx="108" cy="44" rx="5.4" ry="4.1" fill="#bdda80" stroke="#668454" strokeWidth="1.4" />
    </g>}
    {tahap === "pupa" && <g transform="rotate(-26 65 55)" stroke="#815842" {...KONTUR}>
      <path d="M40 66Q31 51 42 42Q52 32 71 39Q91 43 93 56Q95 70 73 74Q48 79 40 66Z" fill="#e99a55" />
      <path d="M49 41Q44 55 51 70M60 39Q55 56 63 74M72 42Q68 60 75 73M84 47Q79 60 86 68" fill="none" />
      <path d="M44 49L48 51M56 58L61 59M67 48L71 49M76 61L80 63" stroke="#503c39" strokeWidth="3.4" />
      <path d="M37 54L27 50L28 60L23 64L41 64" fill="#8f644b" />
    </g>}
  </Daun>;
}

const HEX = "M0-17L14.7-8.5V8.5L0 17L-14.7 8.5V-8.5Z";

function Lebah({ tahap }: { tahap: "telur" | "larva" | "pupa" | "dewasa" }) {
  return <g stroke="#ae773b" {...KONTUR}>
    {[[34, 42], [63, 42], [92, 42], [48.5, 67], [77.5, 67], [106.5, 67], [48.5, 17], [77.5, 17]].map(([x, y]) =>
      <path key={`${x}-${y}`} d={HEX} transform={`translate(${x} ${y})`} fill={tahap === "pupa" ? "#d3a373" : "#f4cb6b"} />)}
    <path d={HEX} transform="translate(63 47) scale(1.65)" fill={tahap === "pupa" ? "#cc9c6e" : "#ffe2a5"} />
    {tahap === "telur" && <ellipse cx="63" cy="46" rx="4" ry="13" transform="rotate(22 63 46)" fill="#fff5df" stroke="#d1ac71" />}
    {tahap === "larva" && <>
      <path d="M72 37Q58 29 51 42Q44 55 55 62Q63 66 73 56" fill="none" stroke="#b69567" strokeWidth="11" />
      <path d="M72 37Q58 29 51 42Q44 55 55 62Q63 66 73 56" fill="none" stroke="#fff2d4" strokeWidth="7.5" />
      <path d="M47 46L55 49M50 58L56 55M62 59L64 66" fill="none" stroke="#d7b97e" strokeWidth="1.4" />
      <path d="M79 51Q79 43 83 42Q87 46 84 51Q82 53 79 51Z" fill="#e9ac56" stroke="none" />
    </>}
    {tahap === "dewasa" && <>
      <path d="M45 39L56 34L63 37L72 35L77 47L73 57L64 65L52 62L45 54Z" fill="#98663e" />
      <g transform="rotate(-32 71 48)" stroke="#62574a">
        <path d="M72 42Q67 26 73 22Q83 21 84 38M84 44Q93 29 99 32Q107 39 94 50" fill="#e1edf0" />
        <ellipse cx="77" cy="49" rx="19" ry="12" fill="#edb955" />
        <path d="M67 39Q60 48 66 57M77 37Q70 49 77 61M86 40Q81 49 85 58" fill="none" strokeWidth="3.5" />
        <circle cx="94" cy="48" r="8" fill="#865d41" />
        <path d="M94 41L96 36L100 35M98 43L102 40L106 41" fill="none" strokeWidth="1.7" />
        <circle cx="96" cy="46" r="2" fill="#2c373c" stroke="none" />
      </g>
    </>}
    {tahap === "pupa" && <>
      <path d="M60 27L39 33L39 60L62 74L80 67L83 43L72 29Z" fill="#f8d89e" stroke="#b18455" />
      <g transform="rotate(16 60 50)" stroke="#a77e57" strokeWidth="1.6">
        <ellipse cx="60" cy="56" rx="8.2" ry="11" fill="#efcba3" />
        <ellipse cx="60" cy="46" rx="8" ry="8.7" fill="#f3d8ac" />
        <ellipse cx="60" cy="37" rx="6.8" ry="5.2" fill="#f7deb8" />
        <path d="M54 41L49 51L53 58M66 41L72 50L66 58M54 54Q60 57 66 54M55 59Q60 62 65 59" fill="none" />
        <path d="M56 36H57M63 36H64" stroke="#654d43" strokeWidth="2" />
      </g>
      <path d="M78 29Q85 34 87 43L86 60L82 68L75 62L77 44L70 33Z" fill="#d39d6d" />
    </>}
  </g>;
}

function LarvaTanah({ kumbang }: { kumbang?: boolean }) {
  return <Tanah><g stroke="#b68c63" {...KONTUR}>
    <path d={kumbang ? "M83 46Q71 34 54 41Q38 49 39 64Q43 80 62 78Q79 75 82 66" : "M43 55Q59 45 70 51Q79 54 80 62Q79 71 65 71"} fill="none" strokeWidth={kumbang ? 18 : 17} />
    <path d={kumbang ? "M83 46Q71 34 54 41Q38 49 39 64Q43 80 62 78Q79 75 82 66" : "M43 55Q59 45 70 51Q79 54 80 62Q79 71 65 71"} fill="none" stroke="#fff3d8" strokeWidth={kumbang ? 14 : 13} />
    <path d={kumbang ? "M69 35L65 49M54 42L58 53M39 52L51 57M39 67L50 63M47 77L55 72M64 75L68 82" : "M54 46L60 55M67 48L66 57M77 53L72 61M80 63L71 65"} fill="none" stroke="#d3b187" strokeWidth="1.9" />
    {kumbang && <>
      <ellipse cx="84" cy="47" rx="9.2" ry="8.1" fill="#a66f46" stroke="#785a44" />
      <path d="M82 53L79 60L82 65M74 50L70 57L75 61M67 47L64 54L68 58" fill="none" stroke="#9b6f4a" strokeWidth="2.5" />
      <circle cx="89" cy="47" r="1.8" fill="#5f4737" stroke="none" />
    </>}
  </g></Tanah>;
}

function PupaTanah({ kumbang }: { kumbang?: boolean }) {
  return <Tanah>
    {kumbang ? <g transform="rotate(19 65 61)" stroke="#a87954" {...KONTUR}>
      <ellipse cx="65" cy="66" rx="16" ry="16" fill="#eeb985" />
      <ellipse cx="65" cy="46" rx="12" ry="10" fill="#f4cc9c" />
      <path d="M51 47Q65 40 79 47L82 59Q81 72 69 73L65 56L61 73Q49 70 48 58Z" fill="#e8a778" />
      <path d="M54 52L45 55L49 64M76 52L86 55L83 64M51 67L57 64M73 64L80 68M57 74Q65 78 73 74" fill="none" strokeWidth="1.9" />
      <path d="M60 44H61M69 44H70" stroke="#644e43" strokeWidth="2.6" />
    </g> : <g stroke="#b08862" strokeWidth="2" fill="#efcf99">
      {[[53, 53, -32], [69, 61, 16], [61, 72, -15]].map(([x, y, rot]) => <g key={x} transform={`translate(${x} ${y}) rotate(${rot})`}>
        <ellipse rx="16" ry="7.2" /><path d="M-11-1L-4-3M-7 2L2 4M4-4L10-3M7 1L13 2" fill="none" stroke="#c4a377" strokeWidth="1.3" />
      </g>)}
    </g>}
  </Tanah>;
}

function KumbangKeluar() {
  return <Tanah cerah><g stroke="#5e4c40" {...KONTUR}>
    <path d="M48 41L39 33L33 34M78 41L90 33L96 35M45 51L34 48L28 52M82 51L94 46L101 49M47 63L35 65M80 63L92 66" fill="none" strokeWidth="3.5" />
    <ellipse cx="65" cy="55" rx="18" ry="24" fill="#976243" />
    <ellipse cx="65" cy="34" rx="13" ry="9" fill="#835941" />
    <path d="M65 41V76M53 44Q64 38 77 44M55 51L55 62M75 55L75 67" fill="none" />
    <path d="M39 74Q65 65 89 74L93 87L34 88Z" fill="#bc8c64" stroke="#a37b57" />
  </g></Tanah>;
}

function Sarang({ ayam, menetas }: { ayam?: boolean; menetas?: boolean }) {
  return <g stroke="#8d644e" {...KONTUR}>
    <path d="M8 73Q44 62 119 73M20 71L12 53" strokeWidth="7" fill="none" />
    <ellipse cx="64" cy="65" rx="42" ry="16" fill="#9d714f" />
    {ayam && !menetas && <>
      <path d="M32 53Q39 40 61 40Q65 26 76 23Q86 22 91 34L100 39L91 45Q93 61 74 65Q49 70 31 62Z" fill="#c28d60" />
      <path d="M74 27Q71 19 76 20L80 23L84 20L88 26" fill="#d66555" />
      <Mata x={86} y={33} />
    </>}
    {menetas ? <>
      <ellipse cx="68" cy="52" rx={ayam ? 17 : 13} ry="16" fill={ayam ? "#f9d87a" : "#e9af9e"} />
      {!ayam && <path d="M60 39Q66 31 73 36M62 43L68 39" stroke="#b88376" fill="none" />}
      <path d="M75 50L91 45L87 59L75 55Z" fill="#e7a35e" />
      <Mata x={72} y={46} />
      <path d="M51 58L61 62L67 57L75 64L82 58Q83 78 68 79Q52 76 51 58Z" fill={ayam ? "#fff2d1" : "#bcdce1"} />
    </> : <>
      <ellipse cx="50" cy={ayam ? 68 : 55} rx="9" ry="13" transform="rotate(-24 50 56)" fill={ayam ? "#f0dfc2" : "#c1dce1"} />
      <ellipse cx="65" cy={ayam ? 65 : 51} rx="9" ry="12" transform="rotate(14 65 55)" fill={ayam ? "#ebd4b3" : "#c4e3e7"} />
      <ellipse cx="80" cy={ayam ? 67 : 56} rx="9" ry="12" transform="rotate(17 80 55)" fill={ayam ? "#f6e5c5" : "#c1d9d8"} />
    </>}
    <path d="M22 65Q41 77 64 71Q89 75 106 64Q99 86 64 87Q32 84 22 65Z" fill="#b8875c" />
    <path d="M32 75L53 79M49 83L77 75M71 84L98 72M27 70L42 73" stroke="#e2b886" fill="none" />
  </g>;
}

function Burung({ muda }: { muda?: boolean }) {
  return <g stroke="#4e6f7e" {...KONTUR}>
    <path d="M13 82Q60 76 117 81" stroke="#986d4f" strokeWidth="6" fill="none" />
    <g transform={muda ? "translate(11 3) scale(.88)" : undefined}>
      <path d="M49 58L22 70L34 72L26 79L56 69" fill="#77a1b2" />
      <ellipse cx="69" cy="57" rx="26" ry="19" fill="#88aebf" />
      <circle cx="91" cy="44" r="14" fill="#a9cad2" />
      <path d="M102 44L117 47L104 50Z" fill="#eab472" stroke="#aa7a50" />
      <path d={muda ? "M72 57Q43 51 39 21Q51 28 62 35Q76 39 80 51M65 60Q50 72 44 88Q67 84 78 67" : "M56 53Q69 45 80 55Q76 67 55 66L47 62Z"} fill="#6794a7" />
      {muda ? <path d="M53 37L67 49M49 79L65 68" fill="none" stroke="#a2c2cc" /> : <path d="M61 72V80L53 83M74 72V80L80 82" fill="none" stroke="#a77654" />}
      <Mata x={95} y={42} />
    </g>
  </g>;
}

function KupuMuncul() {
  return <g {...KONTUR}>
    <path d="M14 21L115 15" stroke="#785b48" strokeWidth="6" />
    <path d="M35 19V35M36 35L28 48L32 67L41 68L46 55L45 45L38 48L40 35Z" fill="#c0c686" stroke="#708558" />
    <g stroke="#62506a">
      <path d="M88 52Q79 34 59 33Q54 45 61 56Q49 68 65 76Q78 77 88 62M90 54Q94 34 113 34Q124 47 113 56Q122 68 107 77Q96 77 89 63" fill="#ea9f58" />
      <path d="M89 46Q91 57 89 71M87 47L81 39M92 47L97 39" fill="none" strokeWidth="3.1" />
      <path d="M69 46L76 51M70 67L77 63M105 46L100 52M105 67L99 63" fill="none" stroke="#f8d48f" strokeWidth="4.2" />
    </g>
  </g>;
}

function Siput({ tahap }: { tahap: "menetas" | "muda" | "dewasa" }) {
  const kecil = tahap === "menetas";
  const dewasa = tahap === "dewasa";
  return <Tanah cerah>
    {dewasa && <g transform="translate(8 28) scale(.64)"><TelurBerkelompok jumlah={5} bulat /></g>}
    <g stroke="#886043" {...KONTUR} transform={kecil ? "translate(33 5) scale(.78)" : dewasa ? "translate(26 -5) scale(.87)" : undefined}>
      <path d="M26 68Q35 62 48 64L72 70Q85 66 86 55Q88 48 96 50Q105 51 104 63Q101 78 86 80H32Q19 77 26 68Z" fill="#b9be83" />
      <path d="M94 52L90 39M101 53L110 43" fill="none" />
      <circle cx="90" cy="39" r="2.6" fill="#514e3c" /><circle cx="110" cy="43" r="2.6" fill="#514e3c" />
      <circle cx="56" cy="59" r={kecil ? 13 : 22} fill={kecil ? "#efcd9d" : "#bd8a62"} />
      <path d={kecil ? "M60 53Q52 49 51 57Q52 63 58 60" : "M63 48Q52 43 45 52Q40 65 55 69Q70 72 70 59Q66 51 56 56Q50 61 58 63"} fill="none" stroke={kecil ? "#ba8c66" : "#835b44"} />
    </g>
    {kecil && <path d="M18 65L26 62L31 65L41 59Q43 76 30 79Q21 75 18 65Z" fill="#f9e6c3" stroke="#b9986c" {...KONTUR} />}
  </Tanah>;
}

function Laba({ tahap }: { tahap: "telur" | "menetas" | "ganti-kulit" | "jaring" }) {
  const jaring = tahap === "jaring";
  const muda = tahap === "ganti-kulit";
  const menetas = tahap === "menetas";
  const spider = (warna: string, kontur: string) => <g stroke={kontur} {...KONTUR}>
    <path d="M-10-6L-19-10L-25-7M-13 0L-22-2L-28 3M-12 5L-22 10L-24 15M-8 9L-17 17L-17 20M10-6L19-10L25-7M13 0L22-2L28 3M12 5L22 10L24 15M8 9L17 17L17 20" fill="none" />
    <ellipse cy="-2" rx="12" ry="13" fill={warna} /><ellipse cy="7" rx="8" ry="6" fill={warna} />
  </g>;
  return <>
    <rect x="5" y="8" width="120" height="84" rx="13" fill="#e9eef2" />
    <path d="M14 21L117 15" stroke="#987254" strokeWidth="5" strokeLinecap="round" />
    {jaring && <g stroke="#819ca9" strokeWidth="1.7" fill="none">
      <path d="M64 51L13 27M64 51L54 18M64 51L96 17M64 51L119 27M64 51L122 73M64 51L89 91M64 51L44 92M64 51L8 76" />
      <path d="M29 36Q51 36 57 27Q70 31 89 27Q95 40 103 34Q97 51 109 68Q89 67 82 81Q62 72 49 81Q38 64 19 71Q27 56 29 36ZM46 42Q58 42 60 34Q68 40 80 33Q83 42 92 39Q86 51 94 63Q80 63 77 72Q65 66 54 73Q48 63 38 63Q42 54 46 42Z" />
    </g>}
    {(menetas || tahap === "telur") && <g stroke="#a79e8f" {...KONTUR}>
      <path d="M52 20L46 40M77 18L76 37" fill="none" />
      <path d={menetas ? "M53 38Q70 30 81 46L72 50L85 55Q83 76 60 77Q40 74 39 57Q40 43 53 38Z" : "M53 37Q73 30 83 48Q92 69 74 77Q55 84 41 68Q28 47 53 37Z"} fill="#f5e9d5" />
      <path d="M43 49Q60 38 77 46M39 55Q55 49 68 51M44 64Q56 59 73 62M53 73Q63 67 75 70" fill="none" stroke="#c8b9a3" strokeWidth="1.5" />
    </g>}
    {menetas && <>
      <g transform="translate(91 66) scale(.56)">{spider("#8c725e", "#65574f")}</g>
      <g transform="translate(105 45) scale(.43)">{spider("#a68870", "#6b5b51")}</g>
    </>}
    {muda && <>
      <g transform="translate(42 63) scale(.74)">{spider("#e4d4c3", "#a89683")}</g>
      <g transform="translate(88 53) scale(.89)">{spider("#9e795f", "#5d514b")}</g>
    </>}
    {jaring && <g transform="translate(65 54) scale(.87)">{spider("#8c654f", "#5d4a45")}</g>}
  </>;
}

export const ILUSTRASI_SIKLUS_KEBUN: Record<string, ReactNode> = {
  "qc-siklus-kupu-muncul": <KupuMuncul />,
  "qc-siklus-ayam-mengeram": <Sarang ayam />,
  "qc-siklus-ayam-menetas": <Sarang ayam menetas />,
  "qc-siklus-burung-telur": <Sarang />,
  "qc-siklus-burung-menetas": <Sarang menetas />,
  "qc-siklus-burung-belajar": <Burung muda />,
  "qc-siklus-burung-dewasa": <Burung />,
  "qc-siklus-semut-telur": <Tanah><TelurBerkelompok jumlah={7} /></Tanah>,
  "qc-siklus-semut-larva": <LarvaTanah />,
  "qc-siklus-semut-pupa": <PupaTanah />,
  "qc-siklus-kepik-telur": <Kepik tahap="telur" />,
  "qc-siklus-kepik-larva": <Kepik tahap="larva" />,
  "qc-siklus-kepik-pupa": <Kepik tahap="pupa" />,
  "qc-siklus-lebah-telur": <Lebah tahap="telur" />,
  "qc-siklus-lebah-larva": <Lebah tahap="larva" />,
  "qc-siklus-lebah-pupa": <Lebah tahap="pupa" />,
  "qc-siklus-lebah-keluar": <Lebah tahap="dewasa" />,
  "qc-siklus-kumbang-telur": <Tanah cerah><TelurBerkelompok jumlah={5} bulat /></Tanah>,
  "qc-siklus-kumbang-larva": <LarvaTanah kumbang />,
  "qc-siklus-kumbang-pupa": <PupaTanah kumbang />,
  "qc-siklus-kumbang-dewasa": <KumbangKeluar />,
  "qc-siklus-siput-telur": <Tanah cerah><TelurBerkelompok jumlah={7} bulat /></Tanah>,
  "qc-siklus-siput-menetas": <Siput tahap="menetas" />,
  "qc-siklus-siput-muda": <Siput tahap="muda" />,
  "qc-siklus-siput-bertelur": <Siput tahap="dewasa" />,
  "qc-siklus-laba-telur": <Laba tahap="telur" />,
  "qc-siklus-laba-menetas": <Laba tahap="menetas" />,
  "qc-siklus-laba-ganti-kulit": <Laba tahap="ganti-kulit" />,
  "qc-siklus-laba-jaring": <Laba tahap="jaring" />,
};
