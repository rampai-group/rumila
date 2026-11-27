import type { ReactNode } from "react";

const INK = "#2d4860";
const GARIS = { stroke: INK, strokeWidth: 2.7, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const PANAH = { ...GARIS, stroke: "#2b8093", strokeWidth: 4, fill: "none" } as const;
const KULIT = "#edb188";

function Orang({ x, y, skala = 1, balik = false, baju = "#d48460" }: {
  x: number; y: number; skala?: number; balik?: boolean; baju?: string;
}) {
  return <g transform={`translate(${x} ${y}) scale(${balik ? -skala : skala} ${skala})`}>
    <path d="M-4 9L-8 24-15 32M5 9L9 23 17 29" fill="none" stroke="#44698a" strokeWidth="7" />
    <path d="M-16 33H-10M15 30H21" fill="none" strokeWidth="4" />
    <path d="M-8-6Q2-12 10-3L12 10Q4 15-9 11Z" fill={baju} />
    <circle cy="-19" r="10" fill={KULIT} />
    <path d="M-10-18Q-14-31 0-32Q10-32 11-22L2-25-6-19Z" fill="#60483d" stroke="#60483d" />
    <circle cx="4" cy="-19" r="1.3" fill={INK} stroke="none" />
    <path d="M5-3L12 2 20-3" fill="none" stroke={KULIT} strokeWidth="5" />
  </g>;
}

function Tangan({ transform }: { transform: string }) {
  return <g transform={transform} stroke="#945f48">
    <path d="M0 10L20 2 27-5 32-7Q36-7 36-4L28 4 43 4Q49 5 48 9Q48 12 43 13L33 13 38 17Q41 21 35 24L26 22 7 27Z" fill={KULIT} />
    <path d="M0 10L12 5 19 22 7 27Z" fill="#79a8c7" stroke="#4e7895" />
  </g>;
}

function Peron() {
  return <path d="M7 76H123V90H7Z" fill="#d5e2e7" stroke="#748e9b" />;
}

function Kereta({ pintu = false }: { pintu?: boolean }) {
  return <>
    <path d="M43 87H123M52 81L57 92M77 81L82 92M103 81L108 92" fill="none" stroke="#8496a4" strokeWidth="2" />
    <path d="M41 28Q42 18 58 17H121V72H40Z" fill="#73a7c5" />
    <path d="M43 59H121V65H42Z" fill="#f5ca66" stroke="none" />
    <path d="M44 31H60V48H43Z M99 30H117V49H99Z" fill="#e9f7f7" />
    <path d="M69 31H93V73H69Z" fill={pintu ? "#456780" : "#c8ebf6"} />
    <path d={pintu ? "M72 70H91" : "M81 32V72"} fill="none" strokeWidth="1.8" />
    <circle cx="55" cy="76" r="6" fill="#496175" /><circle cx="108" cy="76" r="6" fill="#496175" />
  </>;
}

function Tiket({ transform }: { transform: string }) {
  return <g transform={transform} stroke="#8d6942">
    <path d="M-20-10H20V-4Q13 0 20 4V10H-20V4Q-13 0-20-4Z" fill="#f8cf74" />
    <path d="M8-7V7" strokeDasharray="2 3" strokeWidth="1.8" />
    <path d="M-12-4H1M-12 3H-4" strokeWidth="2.1" />
  </g>;
}

function Meja() {
  return <>
    <path d="M39 88V61M105 88V61" fill="none" stroke="#98664a" strokeWidth="7" />
    <path d="M28 55H117V64H28Z" fill="#dca575" stroke="#98664a" />
  </>;
}

function Kursi({ transform }: { transform: string }) {
  return <g transform={transform} stroke="#966a49">
    <path d="M-15-7V13M14-7V13M-16-36V-11" fill="none" strokeWidth="5" />
    <path d="M-16-36H3V-22H-16ZM-16-12H13L19-6H-16Z" fill="#d69968" />
    <path d="M2-7V12" fill="none" strokeWidth="4" />
  </g>;
}

function Lantai() {
  return <path d="M8 68H122V90H8ZM9 78H122M33 68L27 90M67 68V90M96 68L102 90" fill="#e7eef0" stroke="#a4b6bf" strokeWidth="1.8" />;
}

function Ember({ transform }: { transform: string }) {
  return <g transform={transform} stroke="#4a7d94">
    <path d="M-18-9Q-19 7 0 10Q18 7 18-9" fill="none" />
    <path d="M-20-9H20L14 18H-14Z" fill="#84b7cf" />
    <ellipse cy="-9" rx="20" ry="5" fill="#d5edf5" />
    <path d="M-11-8Q-4-12 3-8T13-8" fill="none" strokeWidth="1.8" />
  </g>;
}

function Pancuran() {
  return <>
    <path d="M111 28V10H85V26" fill="none" stroke="#6795ab" strokeWidth="6" />
    <path d="M72 28Q84 16 96 28V31H72Z" fill="#98b9c9" />
  </>;
}

function AirPancuran() {
  return <path d="M75 38L70 53M84 39L81 54M92 38L92 55M69 61L66 68M79 63L77 70M91 64V70" fill="none" stroke="#5aadc4" strokeWidth="3" />;
}

function Rambut() {
  return <>
    <path d="M35 86Q35 72 48 65H69L80 86Z" fill="#80aaa9" />
    <path d="M45 71V63Q32 51 39 37Q50 27 65 34Q72 40 70 51L77 58 69 60 66 67 58 69V76Z" fill={KULIT} />
    <path d="M35 52Q28 33 43 29Q53 24 67 31L69 42 59 37Q49 48 40 46L41 57Z" fill="#61473e" stroke="#61473e" />
    <circle cx="64" cy="49" r="1.5" fill={INK} stroke="none" />
  </>;
}

function Busa({ sedikit = false }: { sedikit?: boolean }) {
  return <g fill="#edf8fb" stroke="#79adba" strokeWidth="2">
    <circle cx="41" cy="32" r="6" /><circle cx="49" cy="29" r="6" />
    {!sedikit && <><circle cx="56" cy="26" r="7" /><circle cx="64" cy="31" r="7" /></>}
  </g>;
}

function KeringkanRambut() {
  return <g {...GARIS}>
    <Rambut />
    <path d="M95 22H113Q122 26 118 36L113 39 112 59H103L105 38 95 36Z" fill="#dca185" />
    <path d="M95 24V34M112 26V34" fill="none" strokeWidth="2" />
    <path d="M90 25Q81 21 73 27M88 31L74 34M91 38Q83 35 76 39" fill="none" stroke="#5798a7" strokeWidth="2.8" />
  </g>;
}

function Kran() {
  return <>
    <path d="M25 22H78V47H65V34H25Z" fill="#99bdcf" stroke="#517f98" />
    <path d="M47 22V13M37 12H57" fill="none" stroke="#517f98" strokeWidth="5" />
  </>;
}

function Penyiram({ transform }: { transform: string }) {
  return <g transform={transform}>
    <path d="M-18-4Q-37-16-37 1Q-37 16-17 13" fill="none" stroke="#66816a" strokeWidth="4" />
    <path d="M-19-11H15V19H-19Z M14 3L37-12 42-5 17 13Z" fill="#8eb390" stroke="#537a5c" />
    <ellipse cx="-2" cy="-10" rx="17" ry="5" fill="#c0dcc1" stroke="#537a5c" />
  </g>;
}

function Dispenser() {
  return <>
    <rect x="66" y="13" width="48" height="73" rx="6" fill="#9cc2d3" />
    <rect x="73" y="37" width="34" height="40" rx="4" fill="#46677c" />
    <path d="M89 34V46" fill="none" stroke="#d5e5e9" strokeWidth="5" />
    <rect x="80" y="21" width="17" height="7" rx="3" fill="#e6ba68" />
  </>;
}

function Botol({ transform, isi = false }: { transform: string; isi?: boolean }) {
  return <g transform={transform} stroke="#5b889b">
    <path d="M-7-22H7V-16Q13-14 13-5V17H-13V-5Q-13-13-7-16Z" fill="#ecf9fc" />
    {isi && <path d="M-11-1Q-5-5 0-1T11-1V15H-11Z" fill="#9cd6e6" stroke="none" />}
  </g>;
}

function Kertas({ d = "M24 19H106V81H24Z" }: { d?: string }) {
  return <path d={d} fill="#eaf7fa" stroke="#6892a5" />;
}

function Laptop({ layar = "#466578" }: { layar?: string }) {
  return <>
    <rect x="23" y="17" width="84" height="53" rx="5" fill="#7f9eb3" />
    <rect x="29" y="23" width="72" height="41" rx="2" fill={layar} />
    <path d="M22 69H108L118 81H12Z" fill="#a9c0d0" />
  </>;
}

function Lift({ buka = false }: { buka?: boolean }) {
  return <>
    <path d="M37 87V16H97V87Z" fill="#c0d3df" />
    <path d="M43 86V24H91V86Z" fill={buka ? "#4d6c83" : "#9db6c7"} />
    {buka ? <path d="M49 81H85" stroke="#f8ce75" strokeWidth="4" /> : <path d="M67 24V85" fill="none" />}
    <rect x="104" y="44" width="13" height="23" rx="3" fill="#d9e6eb" />
    <circle cx="110.5" cy="52" r="2.5" fill="#e7a956" stroke="none" />
  </>;
}

const TIKET: Record<string, ReactNode> = {
  "kartu-kereta-1": <g {...GARIS}>
    <rect x="18" y="17" width="94" height="69" rx="7" fill="#a2c5d4" />
    <rect x="25" y="24" width="80" height="47" rx="4" fill="#e3f4f7" />
    <Orang x={77} y={48} skala={0.62} balik baju="#8dae8e" />
    <path d="M10 66H120V76H10Z" fill="#d7a270" stroke="#98694c" />
    <Tangan transform="translate(10 67) rotate(-16)" />
    <Tiket transform="translate(57 61) rotate(-13)" />
  </g>,
  "kartu-kereta-2": <g {...GARIS}>
    <Peron />
    <path d="M64 43H80V86H64ZM101 41H119V86H101Z" fill="#8eabbc" />
    <rect x="66" y="39" width="12" height="11" rx="2" fill="#a9dbc7" />
    <path d="M78 54L94 66M102 53L93 63" stroke="#d5a753" strokeWidth="5" />
    <Orang x={33} y={55} skala={0.83} />
    <Tiket transform="translate(58 49) rotate(-16) scale(.48)" />
    <path {...PANAH} d="M74 23H104M97 16L104 23 97 30" />
  </g>,
  "kartu-kereta-3": <g {...GARIS}>
    <Peron />
    <path d="M82 31V77M61 66H103M66 66V77M98 66V77" fill="none" stroke="#7794a6" strokeWidth="4" />
    <rect x="67" y="18" width="31" height="16" rx="3" fill="#92b6cb" />
    <path d="M73 24H90M73 29H83M10 96H120" fill="none" stroke="#648699" strokeWidth="2" />
    <Orang x={35} y={53} skala={0.7} />
    <path d="M51 81H119" fill="none" stroke="#e1ad50" strokeWidth="3" />
  </g>,
  "kartu-kereta-4": <g {...GARIS}>
    <Kereta /><Peron />
    <path d="M11 82H119" fill="none" stroke="#e1ad50" strokeWidth="3" />
    <path {...PANAH} d="M16 43H26M32 34V51" />
  </g>,
  "kartu-kereta-5": <g {...GARIS}>
    <Kereta pintu /><Peron />
    <path d="M65 78L68 71H93L98 78Z" fill="#d1e1e8" />
    <Orang x={59} y={52} skala={0.75} />
    <path {...PANAH} d="M10 38Q19 25 39 27M31 20L39 27 30 32" />
  </g>,
  "kartu-kereta-6": <g {...GARIS}>
    <path d="M33 17H105V42H33Z" fill="#d7eef4" />
    <path d="M69 17V42" fill="none" stroke="#82aabe" />
    <path d="M43 50V64H73V76H39Q31 76 31 68V49Z" fill="#759ac4" />
    <path d="M42 76V89M69 76V89" fill="none" strokeWidth="4" />
    <circle cx="58" cy="39" r="10" fill={KULIT} />
    <path d="M48 38Q45 27 58 26Q68 26 70 36L60 32 54 39Z" fill="#60483d" />
    <path d="M57 52L51 65H71L76 84 87 84" fill="none" stroke="#d48460" strokeWidth="8" />
    <path d="M80 89H93" fill="none" stroke="#45698a" strokeWidth="4" />
  </g>,
  "kartu-kereta-7": <g {...GARIS}>
    <Kereta pintu /><Peron />
    <path d="M65 78L68 71H93L98 78Z" fill="#d1e1e8" />
    <Orang x={55} y={55} skala={0.77} balik />
    <path {...PANAH} d="M49 28Q29 23 13 36M19 26L13 36 25 35" />
  </g>,
};

const PIKET: Record<string, ReactNode> = {
  "kartu-piket-kelas-1": <g {...GARIS}>
    <Meja /><Kursi transform="translate(81 29) rotate(180)" />
    <Orang x={24} y={61} skala={0.75} />
    <path {...PANAH} d="M43 41V17M36 25L43 17 50 25" />
  </g>,
  "kartu-piket-kelas-2": <g {...GARIS}>
    <Lantai />
    <path d="M63 61L94 20" fill="none" stroke="#9a6b4f" strokeWidth="6" />
    <path d="M62 59L71 65 64 78 36 77 47 65Z" fill="#e9b96d" stroke="#996540" />
    <path d="M52 66L47 75M61 67L56 75M18 71H22M26 76H29" fill="none" stroke="#996540" strokeWidth="2" />
    <path {...PANAH} d="M33 45H56M49 38L56 45 49 52" />
  </g>,
  "kartu-piket-kelas-3": <g {...GARIS}>
    <path d="M48 44H100L92 83H57Z" fill="#84a9bd" />
    <path d="M47 44H101M64 52L68 74M77 52V76M90 52L87 74" fill="none" strokeWidth="2" />
    <path d="M17 23L56 29 50 40 19 33Z" fill="#e8bc72" stroke="#8f674a" />
    <path d="M55 29L86 16" fill="none" stroke="#8f674a" strokeWidth="5" />
    <path d="M57 35L59 38M64 39L67 42M66 32L70 34" fill="none" stroke="#8f674a" strokeWidth="3" />
  </g>,
  "kartu-piket-kelas-4": <g {...GARIS}>
    <Lantai /><Ember transform="translate(94 64) scale(.67)" />
    <path d="M48 68L77 21" fill="none" stroke="#8e6755" strokeWidth="6" />
    <path d="M44 67Q48 63 55 70L62 77Q48 83 25 79L28 73Z" fill="#6db0b9" stroke="#4c8492" />
    <path d="M19 82Q30 87 41 84M59 85Q71 84 76 79" fill="none" stroke="#80bdcc" strokeWidth="2.3" />
    <path {...PANAH} d="M15 53H42M35 47L42 53 35 59" />
  </g>,
  "kartu-piket-kelas-5": <g {...GARIS}>
    <Lantai />
    <ellipse cx="48" cy="77" rx="21" ry="6" fill="#a6d9e4" stroke="#8ebdc9" />
    <path d="M26 50Q21 41 29 34M42 53Q38 42 46 34" fill="none" stroke="#80aebd" strokeWidth="3" />
    <circle cx="89" cy="38" r="19" fill="#fff1c7" />
    <path d="M89 26V39L98 42" fill="none" strokeWidth="3" />
  </g>,
  "kartu-piket-kelas-6": <g {...GARIS}>
    <Meja /><Kursi transform="translate(25 72) scale(.7)" />
    <path {...PANAH} d="M20 18Q28 24 26 45M19 37L26 45 33 37" />
  </g>,
  "kartu-piket-kelas-7": <g {...GARIS}>
    <Orang x={30} y={64} skala={0.7} />
    <Orang x={99} y={57} skala={0.91} balik baju="#8dac8c" />
    <path d="M36 23Q55 10 76 22Q84 29 76 40Q62 47 49 42L36 50 39 39Q29 33 36 23Z" fill="#e9f7f6" stroke="#66918b" />
    <path d="M48 31L54 36 67 24" fill="none" stroke="#59947d" strokeWidth="3.3" />
  </g>,
};

function Tanaman({ transform }: { transform: string }) {
  return <g transform={transform} stroke="#648462">
    <path d="M0 8V-23M0-12Q-23-30-22-18Q-20-7 0-9M0-17Q18-41 23-29Q22-18 0-15" fill="#86b380" strokeWidth="3" />
    <path d="M-22 4H22L16 26H-16Z" fill="#d49273" stroke="#92684f" />
    <ellipse cy="4" rx="22" ry="5" fill="#876551" stroke="#92684f" />
    <path d="M0 5V-12" fill="none" stroke="#648462" />
  </g>;
}

function Panci({ gelembung = false }: { gelembung?: boolean }) {
  return <>
    <path d="M18 50H32M97 50H112" fill="none" strokeWidth="6" />
    <path d="M30 43H101L94 78H37Z" fill="#8aaebe" />
    <ellipse cx="65.5" cy="43" rx="35.5" ry="10.5" fill="#a9dae7" stroke="#5b8fa4" />
    {gelembung && <g fill="#e7f8fa" stroke="#62a7b9" strokeWidth="1.8">
      <circle cx="46" cy="43" r="4" /><circle cx="64" cy="39" r="4" /><circle cx="83" cy="44" r="4" />
      <path d="M48 26Q42 20 49 13M64 27Q58 18 65 10M81 27Q75 20 81 14" fill="none" strokeWidth="3" />
    </g>}
  </>;
}

function Telepon({ isi }: { isi: "aplikasi" | "nomor" | "hijau" | "merah" }) {
  return <>
    <rect x="42" y="9" width="47" height="80" rx="8" fill="#86a6ba" />
    <rect x="48" y="17" width="35" height="60" rx="4" fill="#edf7fa" />
    {isi === "nomor" && <path d="M53 31H57M63 31H67M73 31H77M53 42H57M63 42H67M73 42H77M53 53H57M63 53H67M73 53H77M64 64H68" fill="none" strokeWidth="3" />}
    {isi !== "nomor" && <>
      <circle cx="65.5" cy={isi === "aplikasi" ? 45 : 61} r="12" fill={isi === "merah" ? "#b95d61" : "#519787"} stroke="none" />
      <path d={isi === "merah" ? "M56 63Q65 53 75 63" : isi === "aplikasi" ? "M61 39Q60 46 71 51" : "M61 55Q60 62 71 67"} stroke="#fff" strokeWidth="3.5" fill="none" />
    </>}
  </>;
}

function Akuarium({ air = true }: { air?: boolean }) {
  return <>
    <path d="M22 21H105V78H22Z" fill="#e4f6fa" stroke="#6899ab" />
    {air && <path d="M23 43Q43 38 63 43T104 43V77H23Z" fill="#a8dbe7" stroke="none" />}
    <path d="M29 70H98" fill="none" stroke="#bca27e" strokeWidth="4" />
  </>;
}

function Ikan({ transform }: { transform: string }) {
  return <g transform={transform} stroke="#966446">
    <path d="M-17 0Q-4-13 12 0L23-9V9L12 0Q-4 13-17 0Z" fill="#e2a86d" />
    <circle cx="-8" cy="-1" r="2" stroke="none" fill={INK} />
  </g>;
}

const RUMAH: Record<string, ReactNode> = {
  "kartu-siram-1": <g {...GARIS}>
    <Penyiram transform="translate(65 55)" /><Tangan transform="translate(9 54) rotate(-38)" />
    <path {...PANAH} d="M99 40V20M92 28L99 20 106 28" />
  </g>,
  "kartu-siram-2": <g {...GARIS}>
    <g transform="translate(19 0) scale(.82)"><Kran /></g>
    <Penyiram transform="translate(79 67) scale(.78)" />
    <path {...PANAH} d="M22 58Q18 41 35 31M24 34L35 31 33 42" />
  </g>,
  "kartu-siram-3": <g {...GARIS}>
    <Kran /><Penyiram transform="translate(69 69)" />
    <path d="M71 48V64M66 50V60M76 52V60" stroke="#68b7d0" strokeWidth="3.5" fill="none" />
  </g>,
  "kartu-siram-4": <g {...GARIS}>
    <g transform="translate(16 17)"><Kran /></g>
    <Tangan transform="translate(19 30) rotate(-12)" />
    <path {...PANAH} d="M61 18Q75 7 89 17M86 10L89 17 80 20" />
  </g>,
  "kartu-siram-5": <g {...GARIS}>
    <Penyiram transform="translate(35 66) scale(.73)" /><Tanaman transform="translate(101 60) scale(.86)" />
    <path {...PANAH} d="M36 36H69M62 29L69 36 62 43" />
  </g>,
  "kartu-siram-6": <g {...GARIS}>
    <Penyiram transform="translate(36 40) rotate(25) scale(.78)" /><Tanaman transform="translate(94 64)" />
    <path d="M64 54Q74 55 76 65M61 59Q68 62 69 69M76 53Q83 57 83 63" fill="none" stroke="#69b4c5" strokeWidth="2.5" />
  </g>,
  "kartu-siram-7": <g {...GARIS}>
    <path d="M22 87V69H109V87M22 69H109" fill="none" stroke="#9a7054" strokeWidth="5" />
    <Penyiram transform="translate(76 51) scale(.78)" />
    <path {...PANAH} d="M21 47Q28 31 45 35M38 28L45 35 37 40" />
  </g>,
  "kartu-botol-1": <g {...GARIS}>
    <Botol transform="translate(66 68) scale(1.3)" />
    <rect x="57" y="21" width="18" height="10" rx="3" fill="#e2b86e" />
    <path {...PANAH} d="M85 41V17M79 25L85 17 92 25" />
  </g>,
  "kartu-botol-2": <g {...GARIS}>
    <Dispenser /><Botol transform="translate(89 63) scale(.65)" />
    <path {...PANAH} d="M17 65H60M53 58L60 65 53 72" />
  </g>,
  "kartu-botol-3": <g {...GARIS}>
    <Dispenser /><Botol transform="translate(89 63) scale(.65)" />
    <Tangan transform="translate(14 27) scale(1.38 .88)" />
    <path d="M89 48V57" stroke="#69b4c5" strokeWidth="3" />
  </g>,
  "kartu-botol-4": <g {...GARIS}>
    <Dispenser /><Botol transform="translate(89 63) scale(.65)" isi />
    <path d="M89 48V59" stroke="#69b4c5" strokeWidth="3" />
    <circle cx="37" cy="53" r="17" fill="#fff0c7" />
    <path d="M37 42V53L44 58" fill="none" />
  </g>,
  "kartu-botol-5": <g {...GARIS}>
    <Dispenser /><Botol transform="translate(89 63) scale(.65)" isi />
    <Tangan transform="translate(16 32) rotate(-5) scale(.89)" />
    <path {...PANAH} d="M60 23H28M35 16L28 23 35 30" />
  </g>,
  "kartu-botol-6": <g {...GARIS}>
    <Botol transform="translate(66 68) scale(1.3)" isi />
    <rect x="57" y="22" width="18" height="10" rx="3" fill="#e2b86e" />
    <path {...PANAH} d="M86 14V39M79 32L86 39 93 32" />
  </g>,
  "kartu-komputer-1": <g {...GARIS}><Laptop /><circle cx="104" cy="74" r="5" fill="#f0c578" /><Tangan transform="translate(118 55) scale(-.45 .65)" /></g>,
  "kartu-komputer-6": <g {...GARIS}>
    <Laptop layar="#365368" />
    <circle cx="65" cy="44" r="10" fill="none" stroke="#f6d18d" strokeDasharray="33 10" transform="rotate(-106 65 44)" />
    <path d="M65 33V43" fill="none" stroke="#f6d18d" strokeWidth="3" />
  </g>,
  "kartu-pesawat-2": <g {...GARIS}>
    <Kertas d="M33 17H98V83H33Z" />
    <path d="M66 18V82" fill="none" stroke="#6b9bb0" strokeDasharray="4 4" />
    <path {...PANAH} d="M98 51Q75 36 49 50M57 42L49 50 60 53" />
  </g>,
  "kartu-pesawat-3": <g {...GARIS}>
    <Kertas d="M24 72L65 63 105 74V24L65 17 24 24Z" />
    <path d="M65 19V63" fill="none" stroke="#6b9bb0" strokeDasharray="4 4" />
    <path {...PANAH} d="M55 49H34M41 42L34 49 41 56M75 49H96M89 42L96 49 89 56" />
  </g>,
  "kartu-pesawat-4": <g {...GARIS}>
    <Kertas d="M24 83V47L65 16 106 47V83Z" />
    <path d="M25 47L65 16V47ZM105 47L65 16V47Z" fill="#b8dce6" stroke="#6892a5" />
    <path {...PANAH} d="M37 62H59M53 55L59 62 53 69M93 62H71M77 55L71 62 77 69" />
  </g>,
  "kartu-pesawat-5": <g {...GARIS}>
    <Kertas d="M16 31L116 32 50 79 44 54Z" />
    <path d="M44 54L116 32" fill="none" stroke="#6b9bb0" strokeWidth="2.5" />
    <path {...PANAH} d="M75 46L79 67M71 61L79 67 85 60" />
  </g>,
  "kartu-pesawat-6": <g {...GARIS}>
    <Kertas d="M43 35L117 24 71 76 64 57Z" />
    <path d="M64 57L117 24" fill="none" stroke="#6b9bb0" />
    <path {...PANAH} d="M14 45H39M18 61H48M11 77H43" />
  </g>,
  "kartu-mi-3": <g {...GARIS}>
    <Panci /><path d="M28 19Q45 12 62 18L74 35Q65 46 44 39Z" fill="#e4bd75" stroke="#a47b48" />
    <path d="M38 23L58 26M43 29L63 33M48 35L65 37" fill="none" stroke="#a47b48" />
    <path {...PANAH} d="M94 13V31M87 24L94 31 101 24" />
  </g>,
  "kartu-mi-5": <g {...GARIS}>
    <path d="M23 33H107L97 54Q84 66 65 66Q46 66 33 54Z" fill="#a4bdc8" />
    <path d="M14 33H24M107 33H117" fill="none" strokeWidth="5" />
    <ellipse cx="65" cy="33" rx="42" ry="10" fill="#d6e7e9" />
    <path d="M38 34Q49 26 59 34T78 34T94 32" fill="none" stroke="#ca9d52" strokeWidth="6" />
    <path d="M40 48H43M54 52H57M71 52H74M87 48H90" fill="none" strokeWidth="2.3" />
    <path d="M48 69L46 79M64 72V84M81 70L84 81" fill="none" stroke="#5caac2" strokeWidth="3" />
  </g>,
  "kartu-telepon-1": <g {...GARIS}><Telepon isi="aplikasi" /><Tangan transform="translate(115 54) scale(-1.03 .78)" /></g>,
  "kartu-telepon-2": <g {...GARIS}><Telepon isi="nomor" /><Tangan transform="translate(117 55) scale(-.87 .7)" /></g>,
  "kartu-telepon-3": <g {...GARIS}><Telepon isi="hijau" /><Tangan transform="translate(116 54) scale(-.92 .72)" /></g>,
  "kartu-telepon-6": <g {...GARIS}><Telepon isi="merah" /><Tangan transform="translate(116 54) scale(-.92 .72)" /></g>,
  "kartu-lift-1": <g {...GARIS}><Lift /><Tangan transform="translate(78 47) scale(.67)" /></g>,
  "kartu-lift-2": <g {...GARIS}>
    <Lift /><circle cx="24" cy="49" r="14" fill="#fff0c7" /><path d="M24 40V49L29 53" fill="none" />
  </g>,
  "kartu-lift-3": <g {...GARIS}><Lift buka /><Orang x={51} y={56} skala={.72} /><path {...PANAH} d="M14 76L32 64M23 64H32L30 73" /></g>,
  "kartu-lift-4": <g {...GARIS}>
    <rect x="44" y="13" width="42" height="74" rx="7" fill="#a4c3d0" />
    <g fill="#e3f4f7"><circle cx="56" cy="33" r="5" /><circle cx="74" cy="33" r="5" /><circle cx="56" cy="51" r="5" /><circle cx="74" cy="51" r="5" fill="#edbf72" /><circle cx="56" cy="69" r="5" /><circle cx="74" cy="69" r="5" /></g>
    <Tangan transform="translate(120 52) scale(-.96 .76)" />
  </g>,
  "kartu-lift-5": <g {...GARIS}><Lift /><path {...PANAH} d="M22 72V23M15 30L22 23 29 30" /></g>,
  "kartu-lift-6": <g {...GARIS}><Lift buka /><path {...PANAH} d="M62 48H46M53 41L46 48 53 55M73 48H88M81 41L88 48 81 55" /></g>,
  "kartu-lift-7": <g {...GARIS}><Lift buka /><Orang x={42} y={62} skala={.75} balik /><path {...PANAH} d="M37 38H12M19 31L12 38 19 45" /></g>,
  "kartu-keramas-1": <g {...GARIS}><Pancuran /><AirPancuran /><Tangan transform="translate(14 58) rotate(-35)" /><path d="M49 45H64" stroke="#739bab" strokeWidth="5" /></g>,
  "kartu-keramas-2": <g {...GARIS}>
    <Rambut /><Pancuran />
    <path d="M75 36L62 44M85 38L75 49M92 40L85 52M57 39L50 46" fill="none" stroke="#5aadc4" strokeWidth="3" />
  </g>,
  "kartu-keramas-3": <g {...GARIS}>
    <g transform="translate(74 37) rotate(118)">
      <path d="M-13-18H13V-7Q19-4 19 6V22H-19V6Q-19-4-13-7Z" fill="#87b8ca" />
      <path d="M-9-25H9V-18H-9Z" fill="#e5b46d" />
      <rect x="-12" y="6" width="24" height="10" rx="3" fill="#dcf2f6" stroke="none" />
    </g>
    <Tangan transform="translate(17 63) rotate(8) scale(1.6 .82)" />
    <path d="M92 47Q103 58 96 63Q87 61 92 47Z" fill="#c4e6e9" stroke="#6da4b1" />
  </g>,
  "kartu-keramas-4": <g {...GARIS}>
    <Rambut /><Busa />
    <Tangan transform="translate(13 37) rotate(-31) scale(.69)" />
    <path {...PANAH} d="M68 14Q86 14 88 29M81 24L88 29 93 22" />
  </g>,
  "kartu-keramas-5": <g {...GARIS}>
    <Rambut /><Busa sedikit /><Pancuran />
    <path d="M76 35L63 49M85 36L76 50M91 37L84 51M48 45L42 56M43 61L39 69" fill="none" stroke="#5aadc4" strokeWidth="3" />
  </g>,
  "kartu-keramas-6": <g {...GARIS}>
    <Pancuran /><path d="M79 37L76 43" fill="none" stroke="#79bbcb" strokeWidth="2" />
    <path d="M45 43H63M54 34V51" fill="none" stroke="#79a1b4" strokeWidth="5" />
    <Tangan transform="translate(16 67) rotate(-49)" />
    <path {...PANAH} d="M23 29Q36 16 58 21M51 15L58 21 50 26" />
  </g>,
  "kartu-keramas-7": <KeringkanRambut />,
};

const TUGAS: Record<string, ReactNode> = {
  "kartu-salon-5": <KeringkanRambut />,
  "kartu-bersih-akuarium-1": <g {...GARIS}>
    <g transform="translate(-4 24) scale(.63)"><Akuarium /></g><Ember transform="translate(96 67) scale(.94)" />
    <Ikan transform="translate(91 25) scale(.65)" />
    <path {...PANAH} d="M48 24Q60 17 72 26M66 18L72 26 62 30" />
  </g>,
  "kartu-bersih-akuarium-2": <g {...GARIS}>
    <g transform="translate(29 8) rotate(22 65 46) scale(.68)"><Akuarium /></g>
    <path d="M66 51Q64 64 38 70L25 76" fill="none" stroke="#77a89f" strokeWidth="7" />
    <path d="M21 79H79M30 83H96" fill="none" stroke="#87aaa6" strokeWidth="3.8" />
  </g>,
  "kartu-bersih-akuarium-3": <g {...GARIS}>
    <Akuarium air={false} /><Tangan transform="translate(114 57) scale(-1.3 .9)" />
    <rect x="39" y="56" width="30" height="13" rx="5" fill="#e5c475" stroke="#a6804e" />
    <path {...PANAH} d="M37 44H65M58 37L65 44 58 51" />
  </g>,
  "kartu-bersih-akuarium-4": <g {...GARIS}>
    <g transform="translate(13 -5) scale(.82)"><Kran /></g>
    <g transform="translate(0 26) scale(1 .77)"><Akuarium /></g>
    <path d="M71 36V59M66 36V54" fill="none" stroke="#68b7d0" strokeWidth="3.5" />
  </g>,
  "kartu-bersih-akuarium-5": <g {...GARIS}>
    <g transform="translate(-4 27) scale(.59)"><Ember transform="translate(49 58)" /></g>
    <g transform="translate(28 13) scale(.82)"><Akuarium /></g><Ikan transform="translate(81 61) scale(.72)" />
    <path {...PANAH} d="M27 28Q47 17 63 29M56 20L63 29 52 32" />
  </g>,
  "kartu-telur-rebus-1": <g {...GARIS}>
    <Panci /><path d="M49 28Q47 23 52 16Q58 8 64 17Q71 25 66 30Q58 36 49 28Z" fill="#f0e6cf" />
    <path {...PANAH} d="M85 19V35M78 28L85 35 92 28" />
  </g>,
  "kartu-telur-rebus-3": <g {...GARIS}><Panci gelembung /></g>,
  "kartu-telur-rebus-5": <g {...GARIS}>
    <Panci /><path d="M28 78H103V92H28Z" fill="#93a9b5" />
    <circle cx="85" cy="85" r="4.2" fill="#e4b46c" />
    <Tangan transform="translate(121 78) scale(-.74 .58)" />
  </g>,
  "kartu-telur-rebus-6": <g {...GARIS}>
    <path d="M20 47H110L101 75Q65 92 29 75Z" fill="#91c4d7" />
    <ellipse cx="65" cy="47" rx="45" ry="10" fill="#bde8ef" />
    <path d="M50 54Q47 48 55 36Q62 27 70 37Q78 48 72 54Q61 62 50 54Z" fill="#f2e7d1" />
    <path d="M26 42L33 37 43 42 39 49 30 48ZM86 47L94 40 104 44 99 53 89 52Z" fill="#e2f5f8" stroke="#699bb0" />
  </g>,
  "kartu-roti-panggang-1": <g {...GARIS}>
    <rect x="25" y="50" width="79" height="32" rx="8" fill="#9fc4cc" />
    <path d="M34 51H91" fill="none" strokeWidth="5" />
    <path d="M51 47V33Q41 28 44 20Q48 12 66 13Q86 14 88 22Q89 29 81 34V45Z" fill="#f3d3a1" stroke="#a9794e" />
    <path {...PANAH} d="M108 18V43M101 36L108 43 115 36" />
  </g>,
  "kartu-roti-panggang-2": <g {...GARIS}>
    <rect x="24" y="48" width="76" height="34" rx="8" fill="#9fc4cc" />
    <path d="M37 49H87M97 60H110" fill="none" strokeWidth="5" />
    <path {...PANAH} d="M110 22V46M103 39L110 46 117 39" />
  </g>,
  "kartu-roti-panggang-4": <g {...GARIS}>
    <rect x="25" y="54" width="79" height="31" rx="8" fill="#9fc4cc" />
    <path d="M36 56H92" fill="none" strokeWidth="5" />
    <path d="M50 44V31Q40 25 46 18Q52 11 66 12Q86 13 88 22Q90 30 81 34V44Z" fill="#edbb81" stroke="#a87950" />
    <path {...PANAH} d="M106 44V17M99 25L106 17 113 25" />
  </g>,
};

export const ILUSTRASI_KARTU_LANGKAH_SD2: Record<string, ReactNode> = { ...TIKET, ...PIKET, ...RUMAH, ...TUGAS };
