import type { ReactNode } from "react";

const INK = "#29485b";
const KULIT = "#ecad80";
const GARIS = { stroke: INK, strokeWidth: 2.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const ARAH = { ...GARIS, stroke: "#26738d", strokeWidth: 4, fill: "none" } as const;

function Benturan({ x, y }: { x: number; y: number }) {
  return <path d="M-10-6L-5-4-7-12M1-7L5-12M8-4L13-5" transform={`translate(${x} ${y})`} fill="none" stroke="#ab591e" strokeWidth="2.5" />;
}

function Bola({ x, y, r = 19, jenis = "sepak" }: { x: number; y: number; r?: number; jenis?: "sepak" | "kasti" | "pasir" }) {
  return <g transform={`translate(${x} ${y}) scale(${r / 19})`}>
    <circle r="19" fill={jenis === "pasir" ? "#e6b573" : "#fffaf0"} />
    {jenis === "sepak" && <path d="M-5-4L1-9 8-5 8 3 1 8-6 4ZM1-9L2-19M8-5L17-10M8 3L17 8M1 8L2 18M-6 4L-17 9M-5-4L-16-11" fill="#416177" strokeWidth="1.7" />}
    {jenis === "kasti" && <path d="M-16-9Q2-6 13 13M-9-8L-8-4M-2-4L-1 0M5 2L5 6" fill="none" stroke="#b0604a" strokeWidth="2" />}
    {jenis === "pasir" && <path d="M-13-2L-12-3M-8 8L-6 8M-6-11L-4-12M2 1L4 1M8-9L9-8M8 9L10 8M13 0L14-1" fill="none" stroke="#a77846" strokeWidth="2" />}
  </g>;
}

function Tanah({ d = "M9 84H121" }: { d?: string }) {
  return <path d={d} fill="none" stroke="#77949b" strokeWidth="2" />;
}

function Tembok() {
  return <g stroke="#8e5a46">
    <rect x="91" y="17" width="30" height="66" rx="2" fill="#dc947b" />
    <path d="M92 33H120M92 50H120M92 67H120M107 17V33M101 33V50M111 50V67M103 67V83" fill="none" stroke="#f7c6a6" strokeWidth="2" />
    <path d="M91 19V83" fill="none" />
  </g>;
}

function Ayunan({ miring = false }: { miring?: boolean }) {
  return <>
    <path d="M47 87L62 20H84L101 87" fill="none" stroke="#568372" strokeWidth="5" />
    <g transform={miring ? "rotate(-27 73 21)" : undefined}>
      <path d="M65 23V70M81 23V70" fill="none" />
      <rect x="58" y="69" width="30" height="8" rx="3" fill="#e6a651" stroke="#a06231" />
    </g>
  </>;
}

function Tangan() {
  return <>
    <path d="M0 5L18 1 25-5 31-15Q34-20 37-16L33-5 45-12Q49-13 50-9L43-3 53-7Q57-7 56-3L49 2Q55 0 56 4Q57 6 52 8L40 15Q31 20 23 13L4 21Z" fill={KULIT} stroke="#995e45" strokeWidth="2.1" />
    <path d="M0 5L14 2 21 16 4 21Z" fill="#7baac0" stroke="#4f788f" />
  </>;
}

function Genggam({ tertahan = false }: { tertahan?: boolean }) {
  return <>
    <Bola x={65} y={tertahan ? 52 : 42} r={17} />
    <g transform={tertahan ? "translate(11 72) rotate(-19)" : "translate(8 70) rotate(-22)"}>
      <Tangan />
    </g>
    <g transform={tertahan ? "translate(119 72) scale(-1 1) rotate(-19)" : "translate(122 70) scale(-1 1) rotate(-22)"}>
      <Tangan />
    </g>
    {!tertahan && <path d="M49 12L54 21M65 8V19M81 12L76 21" stroke="#26738d" fill="none" strokeWidth="3" />}
  </>;
}

function Sepeda({ belok = false }: { belok?: boolean }) {
  return <>
    <g fill="#f6fdff">
      <circle cx="31" cy="68" r="19" />
      {belok ? <ellipse cx="99" cy="66" rx="15" ry="20" transform="rotate(28 99 66)" /> : <circle cx="100" cy="68" r="19" />}
    </g>
    <path d="M31 53V83M16 68H46M87 68H112" fill="none" stroke="#97aebb" strokeWidth="1.4" />
    <path d={belok ? "M99 51L100 81" : "M100 53V83"} fill="none" stroke="#97aebb" strokeWidth="1.4" />
    <path d="M31 68L49 44 62 69 83 45H49M31 68H62M85 44L100 68M85 44L81 32 96 30M49 44L45 34" fill="none" stroke="#448a9a" strokeWidth="4.5" />
    <path d="M38 34H52M62 69L67 76H74" fill="none" strokeWidth="4" />
    <circle cx="62" cy="69" r="5" fill="#e9f1ef" />
  </>;
}

function Anak() {
  return <>
    <path d="M25 62L18 77 9 84M33 61L39 75 47 82" fill="none" stroke="#40728b" strokeWidth="8" />
    <path d="M8 84H17M41 83H51" fill="none" strokeWidth="4" />
    <path d="M19 43Q26 40 34 45L42 63 22 68Z" fill="#f2a15e" />
    <circle cx="25" cy="31" r="10" fill={KULIT} />
    <path d="M15 31Q11 20 24 19Q34 20 36 28L24 26 19 33Z" fill="#62463c" stroke="#62463c" />
    <path d="M31 48L44 54 59 51" fill="none" stroke={KULIT} strokeWidth="7" />
    <circle cx="29" cy="31" r="1.4" fill={INK} stroke="none" />
  </>;
}

function Mobil({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M-23 3V-8L-18-13-11-25H10L19-13 25-8V3Z" fill="#e29a53" stroke="#9c5d32" />
    <path d="M-13-14L-8-21H8L14-14Z" fill="#cbe8ef" stroke="#4e8291" />
    <circle cx="-15" cy="5" r="7" fill="#3b5869" /><circle cx="16" cy="5" r="7" fill="#3b5869" />
    <path d="M-16 5H-14M15 5H17" fill="none" stroke="#d5dee1" strokeWidth="3" />
  </g>;
}

function Perahu({ layar = false }: { layar?: boolean }) {
  return <>
    <path d="M17 65H110L98 80H33Z" fill={layar ? "#6e9bca" : "#df9262"} />
    <path d="M12 87Q24 82 37 87T63 87T89 87T115 87" fill="none" stroke="#6ba6b5" strokeWidth="2.6" />
    {layar && <>
      <path d="M65 20V65" fill="none" strokeWidth="3.5" />
      <path d="M61 23L32 59H61Z" fill="#fff3ca" />
      <path d="M69 28Q87 39 96 59H69Z" fill="#eab168" />
    </>}
  </>;
}

function Angin({ d = "M9 34H38Q54 34 49 24Q45 17 38 22M7 46H54Q65 46 64 37M15 58H37Q49 58 47 64" }: { d?: string }) {
  return <path d={d} fill="none" stroke="#5599af" strokeWidth="3.2" />;
}

function Kincir({ putar = false }: { putar?: boolean }) {
  return <>
    <path d="M79 49L73 86" fill="none" stroke="#8b6751" strokeWidth="6" />
    <g transform={putar ? "rotate(22 80 45)" : undefined}>
      <path d="M80 45Q55 38 58 17Q71 14 80 45Z" fill="#eaa562" />
      <path d="M80 45Q92 21 105 26Q110 40 80 45Z" fill="#8cbce0" />
      <path d="M80 45Q105 52 102 72Q89 76 80 45Z" fill="#92bf87" />
      <path d="M80 45Q68 69 55 64Q50 51 80 45Z" fill="#df9bbd" />
    </g>
    <circle cx="80" cy="45" r="4" fill="#fff8d4" />
  </>;
}

function Kaleng({ sudut = 0 }: { sudut?: number }) {
  return <g transform={`rotate(${sudut} 91 65)`} stroke="#376c61">
    <rect x="69" y="46" width="43" height="35" rx="7" fill="#79bba6" />
    <ellipse cx="107" cy="63.5" rx="8" ry="17.5" fill="#d8e7e5" />
    <path d="M107 57Q113 57 110 67Q106 73 104 66ZM78 51V76M84 50V77" fill="none" strokeWidth="1.8" />
  </g>;
}

function Jaring() {
  return <>
    <path d="M48 72V23H93L117 66V83H48Z" fill="#edf6f7" stroke="#83a6b3" strokeWidth="1.9" />
    <path d="M63 25V82M77 25V82M91 25V82M105 49V82M49 40H101M49 53H109M49 67H117" fill="none" stroke="#a1bbc2" strokeWidth="1.6" />
    <path d="M48 82V23H93L117 66V83H48" fill="none" stroke="#507584" strokeWidth="4" />
  </>;
}

function Pasir() {
  return <>
    <path d="M48 82Q59 73 75 74Q86 65 99 74Q114 73 123 83L115 91H46Z" fill="#edd19e" stroke="#b59163" strokeWidth="1.8" />
    <path d="M56 85H59M70 80H73M84 84H87M99 78H102M108 86H111" fill="none" stroke="#b59163" strokeWidth="1.8" />
  </>;
}

function Air() {
  return <>
    <path d="M8 47Q23 41 36 47T61 47T86 47T111 47L122 49V83Q100 89 86 83T61 83T36 83T11 83L8 84Z" fill="#cceaf0" stroke="#76aebe" strokeWidth="1.8" />
    <path d="M16 58Q28 52 40 58M83 59Q95 53 108 58M24 74Q36 68 48 74M91 74Q103 68 115 74" fill="none" stroke="#76aebe" strokeWidth="2" />
  </>;
}

function Pintu() {
  return <>
    <path d="M77 85V17H116V85M82 84V22H111V84" fill="#ecd9bb" stroke="#775c48" />
    <path d="M78 22L49 30V82L78 85Z" fill="#c58f6c" stroke="#775c48" />
    <path d="M55 38L72 33V54L55 55ZM55 65L72 66V77L55 75Z" fill="#dfa983" stroke="#996b50" strokeWidth="1.8" />
    <circle cx="55" cy="59" r="2.8" fill="#fde39a" stroke="#835f3f" strokeWidth="1.8" />
  </>;
}

export const ILUSTRASI_PENYEBAB_GERAK_SD2: Record<string, ReactNode> = {
  "gerak-tendang-akhir": <g {...GARIS}>
    <Tanah /><Bola x={91} y={61} />
    <path {...ARAH} d="M21 34H70M63 27L70 34 63 41M20 57H59M35 67H61" />
  </g>,
  "gerak-tembok-awal": <g {...GARIS}>
    <Tanah /><Tembok /><Bola x={73} y={59} r={18} /><Benturan x={90} y={53} />
    <path {...ARAH} d="M19 35H60M53 28L60 35 53 42M18 59H47" />
  </g>,
  "gerak-tembok-akhir": <g {...GARIS}>
    <Tanah /><Tembok /><Bola x={49} y={50} r={18} />
    <path {...ARAH} d="M85 69Q71 87 37 77L21 71M28 81L21 71 34 67" />
  </g>,
  "gerak-ayunan-awal": <g {...GARIS}>
    <Tanah /><Ayunan /><g transform="translate(11 66)"><Tangan /></g><Benturan x={61} y={61} />
  </g>,
  "gerak-ayunan-akhir": <g {...GARIS}>
    <Tanah /><Ayunan miring />
    <path {...ARAH} d="M43 76Q74 98 110 71M99 73L110 71 108 82" />
  </g>,
  "gerak-rem-awal": <g {...GARIS}>
    <path d="M22 46H87L98 55M87 46L77 83" fill="none" stroke="#518c9b" strokeWidth="7" />
    <path d="M24 46H50M55 45Q51 58 64 64L89 66" fill="none" strokeWidth="5" />
    <path d="M19 38L30 32Q42 30 47 43L57 49Q65 51 63 57Q60 62 50 56L42 50 34 52 27 46 19 48Z" fill={KULIT} stroke="#995e45" />
    <path {...ARAH} d="M72 77V58M65 65L72 58 79 65" />
    <path d="M100 55V74" fill="none" stroke="#639bac" strokeWidth="4" />
  </g>,
  "gerak-rem-akhir": <g {...GARIS}>
    <Tanah d="M9 89H121" /><Sepeda />
    <path {...ARAH} d="M81 18H103M111 12V24" />
  </g>,
  "gerak-tangkap-awal": <g {...GARIS}><Genggam /></g>,
  "gerak-tangkap-akhir": <g {...GARIS}><Genggam tertahan /></g>,
  "gerak-tali-awal": <g {...GARIS}>
    <Tanah d="M9 91H121" /><Anak /><Mobil x={94} y={76} />
    <path d="M61 52L69 72" fill="none" stroke="#9e6e43" strokeWidth="3.5" />
    <path {...ARAH} d="M83 39L61 41M69 34L61 41 70 47" />
  </g>,
  "gerak-tali-akhir": <g {...GARIS}>
    <Tanah d="M9 91H121" /><Mobil x={67} y={79} />
    <path d="M44 72L17 50" fill="none" stroke="#9e6e43" strokeWidth="3.5" />
    <path {...ARAH} d="M64 31H18M25 24L18 31 25 38M100 58H116M99 70H112" />
  </g>,
  "gerak-magnet-awal": <g {...GARIS}>
    <path d="M50 34H28Q10 34 10 52Q10 70 28 70H50V59H30Q22 59 22 52Q22 45 30 45H50Z" fill="#cf7370" />
    <path d="M39 34H50V45H39ZM39 59H50V70H39Z" fill="#a1c5d8" />
    <path d="M94 53H118L111 58H94ZM93 48V62" fill="#9fb6c4" strokeWidth="3" />
    <path {...ARAH} d="M32 22H61M54 15L61 22 54 29" />
  </g>,
  "gerak-magnet-akhir": <g {...GARIS}>
    <path d="M62 34H33Q15 34 15 52Q15 70 33 70H62V59H35Q27 59 27 52Q27 45 35 45H62Z" fill="#cf7370" />
    <path d="M51 34H62V45H51ZM51 59H62V70H51Z" fill="#a1c5d8" />
    <path d="M82 54H106L99 59H82ZM81 49V63" fill="#9fb6c4" strokeWidth="3" />
    <path {...ARAH} d="M111 32H73M80 25L73 32 80 39" />
  </g>,
  "gerak-angin-awal": <g {...GARIS}>
    <g transform="translate(27 13) scale(.76)"><Perahu layar /></g><Angin />
  </g>,
  "gerak-angin-akhir": <g {...GARIS}>
    <Perahu layar /><path {...ARAH} d="M95 43H119M112 36L119 43 112 50M11 74H22" />
  </g>,
  "gerak-dayung-awal": <g {...GARIS}>
    <Perahu /><path d="M65 55V64" stroke="#805e45" strokeWidth="7" />
    <path d="M33 72L86 35M35 69Q29 67 25 72L17 78 17 84 23 85 34 76Z" fill="#d6a879" stroke="#805e45" strokeWidth="3.5" />
    <path {...ARAH} d="M52 53Q34 50 18 61M27 62L18 61 21 52" />
  </g>,
  "gerak-dayung-akhir": <g {...GARIS}>
    <g transform="translate(0 -10) rotate(-18 65 64)"><Perahu /></g>
    <path {...ARAH} d="M23 54Q33 32 63 32Q81 31 98 20M88 20L98 20 96 31" />
  </g>,
  "gerak-kincir-awal": <g {...GARIS}><Angin /><Kincir /></g>,
  "gerak-kincir-akhir": <g {...GARIS}>
    <Kincir putar />
    <path {...ARAH} d="M50 24Q62 8 81 10M73 5L81 10 73 16M110 60Q104 77 82 81M90 85L82 81 88 74" />
  </g>,
  "gerak-kaleng-awal": <g {...GARIS}>
    <Tanah />
    <path d="M17 21L40 45 33 55 10 34Z" fill="#7fa9c6" />
    <path d="M32 51L42 42 57 58 67 60Q73 65 66 70L49 70Z" fill="#efaa63" stroke="#9c613a" />
    <Kaleng /><Benturan x={69} y={58} />
  </g>,
  "gerak-kaleng-akhir": <g {...GARIS}>
    <Tanah /><Kaleng sudut={24} />
    <path {...ARAH} d="M20 35H63M55 28L63 35 55 42M27 56H59M38 66H59" />
  </g>,
  "gerak-jaring-awal": <g {...GARIS}>
    <Tanah /><Jaring /><Bola x={56} y={48} r={14} />
    <path {...ARAH} d="M12 31L37 39M30 31L37 39 25 42M9 47L31 50" />
  </g>,
  "gerak-jaring-akhir": <g {...GARIS}>
    <Tanah /><Jaring /><Bola x={92} y={68} r={13} />
    <path d="M71 59L75 62M110 54L106 59" fill="none" stroke="#26738d" strokeWidth="2.7" />
  </g>,
  "gerak-kasti-awal": <g {...GARIS}>
    <path d="M105 78L81 54 68 35Q61 25 53 31Q47 37 55 46L73 61 98 85Z" fill="#dcaa75" stroke="#89634a" />
    <path d="M105 78L91 65 84 72 98 85Z" fill="#719ab1" />
    <Bola x={39} y={40} r={12} jenis="kasti" /><Benturan x={53} y={37} />
    <path d="M116 60L103 45M116 72L103 59" stroke="#26738d" fill="none" strokeWidth="3" />
  </g>,
  "gerak-kasti-akhir": <g {...GARIS}>
    <path d="M92 76L102 58 115 43Q121 39 124 44Q126 48 121 54L109 68 100 81Z" fill="#dcaa75" stroke="#89634a" />
    <Bola x={49} y={43} r={17} jenis="kasti" />
    <path {...ARAH} d="M97 31Q66 14 25 27M35 16L25 27 39 30M69 52H83M69 60H77" />
  </g>,
  "gerak-pasir-awal": <g {...GARIS}>
    <Tanah /><Pasir /><Mobil x={54} y={67} />
    <path {...ARAH} d="M53 31H91M84 24L91 31 84 38M13 55H24M12 64H22" />
  </g>,
  "gerak-pasir-akhir": <g {...GARIS}>
    <Tanah /><Pasir /><Mobil x={87} y={72} />
    <path d="M61 80Q74 73 83 82Q92 76 100 83Q110 77 116 81" fill="none" stroke="#b59163" strokeWidth="3.6" />
    <path {...ARAH} d="M90 32H107M114 25V39" />
  </g>,
  "gerak-daun-awal": <g {...GARIS}>
    <Air /><path {...ARAH} d="M21 32H61M54 25L61 32 54 39M78 32H106M99 25L106 32 99 39" />
    <path d="M11 79Q26 64 43 68Q38 83 17 82L9 85Z" fill="#95bc7f" stroke="#617f51" />
  </g>,
  "gerak-daun-akhir": <g {...GARIS}>
    <Air /><path d="M43 68Q58 44 85 50Q83 68 49 73L40 77Z" fill="#91b878" stroke="#55784a" />
    <path d="M47 72L77 54" fill="none" stroke="#55784a" strokeWidth="1.8" />
    <path {...ARAH} d="M77 35H112M104 28L112 35 104 42M21 61H39" />
  </g>,
  "gerak-pedal-awal": <g {...GARIS}>
    <path d="M25 23L56 57 86 23M56 57L51 77H81" fill="none" stroke="#548e9d" strokeWidth="6" />
    <circle cx="56" cy="57" r="13" fill="#e1eff3" />
    <path d="M56 57L70 72H94M70 74H95" fill="none" strokeWidth="5" />
    <path d="M55 17L71 20 71 50 62 56 57 42Z" fill="#8eafc9" />
    <path d="M60 49L71 47 83 59 92 62Q96 68 89 70H66Z" fill="#eaa66c" stroke="#9c633e" />
    <path {...ARAH} d="M101 42Q114 55 104 72M106 61L104 72 114 68" />
  </g>,
  "gerak-pedal-akhir": <g {...GARIS}>
    <Tanah d="M9 90H122" /><Sepeda />
    <path {...ARAH} d="M41 19H100M93 12L100 19 93 26M10 40H27" />
  </g>,
  "gerak-setang-awal": <g {...GARIS}>
    <path d="M62 70L57 36M58 42Q37 28 21 48M58 42Q76 55 101 39" fill="none" stroke="#6898a9" strokeWidth="7" />
    <path d="M24 46L16 53M98 41L108 35" fill="none" strokeWidth="9" />
    <ellipse cx="60" cy="74" rx="11" ry="17" transform="rotate(-25 60 74)" fill="#dbe8ed" />
    <path {...ARAH} d="M38 27Q58 11 83 22M76 14L83 22 72 24" />
  </g>,
  "gerak-setang-akhir": <g {...GARIS}>
    <Sepeda belok />
    <path {...ARAH} d="M67 23Q93 21 107 35L119 50M117 39L119 50 108 47" />
    <path d="M77 84L88 82M104 89L114 84" fill="none" stroke="#77949b" strokeWidth="2" />
  </g>,
  "gerak-pintu-awal": <g {...GARIS}>
    <Tanah /><Pintu /><g transform="translate(6 58) rotate(-13)"><Tangan /></g><Benturan x={49} y={47} />
  </g>,
  "gerak-pintu-akhir": <g {...GARIS}>
    <Tanah /><Pintu />
    <path {...ARAH} d="M16 43Q27 37 36 37M41 28V46" />
  </g>,
  "gerak-gelinding-awal": <g {...GARIS}>
    <Tanah /><Anak /><Bola x={81} y={62} r={22} jenis="pasir" />
    <path d="M55 76H58M105 81H115M107 85H110" fill="none" stroke="#b59163" strokeWidth="2" />
  </g>,
  "gerak-gelinding-akhir": <g {...GARIS}>
    <Tanah /><Bola x={87} y={61} r={23} jenis="pasir" />
    <path {...ARAH} d="M37 42Q41 19 65 22M57 15L65 22 56 29M14 62H53M24 73H51" />
    <path d="M55 79H58M108 80H118" fill="none" stroke="#b59163" strokeWidth="2" />
  </g>,
};
