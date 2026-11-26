import type { ReactNode } from "react";

const INK = "#203649";
const KULIT = "#e4a879";
const GARIS = { stroke: INK, strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function AnakMendorong() {
  return <g {...GARIS}>
    <path d="M20 58L17 76 8 84M28 61L35 77 43 84" fill="none" stroke="#35778c" strokeWidth="7" />
    <path d="M17 45Q20 40 28 43L35 59Q31 65 20 63Z" fill="#f0a644" />
    <circle cx="24" cy="32" r="9" fill={KULIT} />
    <path d="M15 33Q10 20 22 21Q31 21 33 29L23 27 18 32Z" fill="#573a30" />
    <path d="M26 47L38 53 51 51" fill="none" stroke={KULIT} strokeWidth="6" />
  </g>;
}

function JariMenekan() {
  return <path d="M120 54L102 52 82 44Q77 41 72 43L58 45Q53 47 55 52Q56 55 62 55L76 53 87 61 82 64Q78 69 82 72L92 71 103 76 120 76Z"
    fill={KULIT} stroke="#86573d" />;
}

function Roda({ x, y, r = 8 }: { x: number; y: number; r?: number }) {
  return <g>
    <circle cx={x} cy={y} r={r} fill="#415467" />
    <circle cx={x} cy={y} r={r * 0.42} fill="#c7d6e0" />
  </g>;
}

export const ILUSTRASI_GERAK_PILOT: Record<string, ReactNode> = {
  "pilot-dorong-pintu": <g {...GARIS}>
    <path d="M55 88V13H112V88M61 83V20H106V83" fill="#e9d3a7" stroke="#7a5539" />
    <path d="M61 20L94 28V80L61 83Z" fill="#b87b52" stroke="#7a5539" />
    <path d="M68 32L81 35V48L68 46Z M67 59L81 60V71L67 72Z" fill="#d69d71" stroke="#95603d" />
    <circle cx="85" cy="53" r="3" fill="#ffe390" stroke="#917145" />
    <path d="M10 78L47 61 61 48Q65 45 70 47L77 51Q79 55 74 58L64 58 53 70 17 89Z" fill={KULIT} stroke="#86573d" />
    <path d="M10 77L28 68 33 81 17 89 9 87Z" fill="#5d9ac2" stroke="#396986" />
  </g>,
  "pilot-tekan-bel": <g {...GARIS}>
    <rect x="23" y="17" width="54" height="67" rx="8" fill="#85a7bc" />
    <rect x="30" y="23" width="41" height="55" rx="5" fill="#e6f1f6" />
    <circle cx="49" cy="49" r="12" fill="#f9c466" stroke="#966535" />
    <path d="M30 39L24 34M28 49H20M30 59L24 64" fill="none" stroke="#39597b" />
    <JariMenekan />
  </g>,
  "pilot-dorong-kursi": <g {...GARIS}>
    <path d="M79 45H113V85H106V52H85V85H79Z" fill="#b78559" stroke="#7a5539" />
    <path d="M72 37H109L121 47H70Z" fill="#e7bc83" stroke="#7a5539" />
    <path d="M57 57V83M76 62V84" fill="none" stroke="#7a5539" strokeWidth="4" />
    <path d="M52 42H62V61L80 61 76 68H52Z" fill="#d9a76f" stroke="#7a5539" />
    <AnakMendorong />
  </g>,
  "pilot-dorong-troli": <g {...GARIS}>
    <path d="M50 50H58L67 75H106" fill="none" stroke="#567586" strokeWidth="4" />
    <path d="M60 48H116L107 69H66Z" fill="#d7eced" stroke="#567586" />
    <path d="M65 55H113M67 62H110M72 49L77 69M83 49L86 69M94 49L96 68M105 49L104 68" fill="none" stroke="#6a9aa4" strokeWidth="1.8" />
    <Roda x={74} y={81} r={6} /><Roda x={104} y={81} r={6} />
    <AnakMendorong />
  </g>,
  "pilot-tekan-saklar": <g {...GARIS}>
    <rect x="23" y="15" width="54" height="70" rx="6" fill="#f6e6c1" stroke="#9c8154" />
    <path d="M37 33H63V64H37Z" fill="#dfccb0" stroke="#8a765e" />
    <path d="M40 37L62 37 57 57H40Z" fill="#fff8e4" stroke="#8a765e" />
    <circle cx="50" cy="23" r="1.4" fill="#8a765e" stroke="none" />
    <circle cx="50" cy="77" r="1.4" fill="#8a765e" stroke="none" />
    <JariMenekan />
  </g>,
  "pilot-tarik-laci": <g {...GARIS}>
    <rect x="22" y="17" width="72" height="60" rx="4" fill="#b5815b" stroke="#79503a" />
    <path d="M24 18H94L106 12H36Z" fill="#e7b981" stroke="#79503a" />
    <path d="M28 26H87V41H28Z M28 49H87V69H28Z" fill="#946343" stroke="#79503a" />
    <path d="M49 34H67" fill="none" stroke="#efc58f" />
    <path d="M28 50L87 50 104 66 45 66Z" fill="#efc58f" stroke="#79503a" />
    <path d="M45 63H103V86H45Z" fill="#d7a170" stroke="#79503a" />
    <path d="M28 51L45 65V86L26 70Z" fill="#ae7551" stroke="#79503a" />
    <path d="M65 72V77H80V72" fill="none" stroke="#6d4b36" strokeWidth="3" />
    <path d="M119 71L103 74 89 70Q84 64 78 68L73 72Q73 76 79 77L85 74 96 83Q103 89 114 85L122 82Z" fill={KULIT} stroke="#86573d" />
  </g>,
  "pilot-tarik-tisu-kotak": <g {...GARIS}>
    <path d="M22 61L42 46H94L108 60 87 73Z" fill="#8ec9d2" stroke="#3c7582" />
    <path d="M22 61L87 64V86L22 82Z" fill="#5ea8b4" stroke="#3c7582" />
    <path d="M87 64L108 60V79L87 86Z" fill="#438695" stroke="#3c7582" />
    <path d="M40 75L67 76" stroke="#c9eced" fill="none" />
    <ellipse cx="64" cy="55" rx="18" ry="4" fill="#315f6e" stroke="none" />
    <path d="M52 55Q42 44 46 32Q53 27 54 18Q63 21 70 31Q76 36 83 37Q74 44 75 54Q67 58 52 55Z" fill="#fffdf5" stroke="#7092a2" />
    <path d="M117 21L100 17 83 22 72 22Q68 19 64 21L60 25Q59 28 63 30L72 26 81 30 88 35Q94 42 104 36L119 32Z" fill={KULIT} stroke="#86573d" />
  </g>,
  "pilot-tarik-selimut": <g {...GARIS}>
    <path d="M17 45V86M112 61V88" fill="none" stroke="#79503a" strokeWidth="5" />
    <path d="M20 65L36 43H95L111 65V79H20Z" fill="#c99470" stroke="#79503a" />
    <path d="M21 65L37 45H92L108 65Z" fill="#fff1db" stroke="#a67863" />
    <path d="M34 55L44 45H63L62 55Z" fill="#f8e2c6" stroke="#c29d80" />
    <path d="M45 64Q55 55 70 54L82 34 94 36Q96 53 109 63L106 75H44Z" fill="#a59ae2" stroke="#62588e" />
    <path d="M61 62Q76 54 82 42M89 44Q89 54 102 62" fill="none" stroke="#d7caef" />
    <path d="M119 24L107 23 99 26 88 24Q81 21 78 26L83 32 93 32 101 40 119 38Z" fill={KULIT} stroke="#86573d" />
  </g>,
  "pilot-tarik-koper": <g {...GARIS}>
    <path d="M18 61L12 75 7 83M24 62L31 76 41 81" fill="none" stroke="#447268" strokeWidth="7" />
    <path d="M14 43Q24 39 29 47L29 62 15 65Z" fill="#e79266" />
    <circle cx="18" cy="32" r="9" fill={KULIT} />
    <path d="M10 31Q7 22 18 22Q25 22 28 30L20 27Z" fill="#53382d" />
    <path d="M23 45L36 52 51 51" fill="none" stroke={KULIT} strokeWidth="6" />
    <g transform="rotate(-15 94 78)">
      <path d="M57 38H67V44H57ZM67 40L80 45 83 55M67 43L75 48 78 56" fill="none" stroke="#485868" strokeWidth="3" />
      <rect x="70" y="50" width="37" height="36" rx="6" fill="#6fa9c6" stroke="#3c6e8c" />
      <path d="M79 58V78M88 57V79M97 58V78" fill="none" stroke="#426f87" />
      <Roda x={80} y={87} r={4} /><Roda x={101} y={87} r={4} />
    </g>
  </g>,
  "pilot-tarik-tirai": <g {...GARIS}>
    <rect x="21" y="24" width="75" height="60" rx="3" fill="#b7e6ee" stroke="#567680" />
    <path d="M59 24V84M21 54H96" fill="none" stroke="#f7fbfb" strokeWidth="3" />
    <path d="M12 20H108" stroke="#795843" strokeWidth="4" />
    <path d="M19 22H78Q74 39 70 51L38 72 25 83 13 75Q20 50 19 22Z" fill="#d17f9f" stroke="#975276" />
    <path d="M29 25Q35 43 31 65M42 25Q49 41 46 56M56 25Q58 35 55 50M68 25Q68 35 64 43" fill="none" stroke="#f1b0c2" />
    <path d="M120 52L105 46 94 42 78 46Q70 44 67 49Q65 54 72 57L83 54 93 59Q99 66 110 65L120 65Z" fill={KULIT} stroke="#86573d" />
  </g>,
  "pilot-tendang-bola": <g {...GARIS}>
    <path d="M11 27L34 40 49 31 63 45 51 60 28 53 16 46Z" fill="#6497c6" stroke="#3f668e" />
    <path d="M54 47L66 54 74 69 64 75 57 65 46 59Z" fill={KULIT} stroke="#86573d" />
    <path d="M62 67L72 64 79 70 89 72Q91 79 82 81L62 79Z" fill="#e69254" stroke="#986140" />
    <circle cx="105" cy="69" r="15" fill="#fffdf4" stroke="#536671" />
    <path d="M98 66L105 61 112 66 109 74 101 74Z M105 61V54M112 66L118 63M109 74L115 79M101 74L97 81" fill="#536671" stroke="#536671" strokeWidth="1.8" />
    <path d="M86 52L93 53M89 59L93 60" fill="none" stroke="#d78753" />
  </g>,
  "pilot-dorong-gerobak-pasir": <g {...GARIS}>
    <path d="M64 47Q69 36 79 36Q85 29 94 31Q103 32 110 42L113 48Z" fill="#e4bc71" stroke="#a27742" />
    <path d="M72 41L78 40M86 35L90 34M95 40L101 40" fill="none" stroke="#b4864b" strokeWidth="1.7" />
    <path d="M52 50L87 62 106 76M67 59L63 78 75 78 82 62" fill="none" stroke="#5b6975" strokeWidth="4" />
    <path d="M63 47H117L107 61Q102 65 93 65H74Z" fill="#d77859" stroke="#914e3d" />
    <path d="M64 47H117" stroke="#a75946" strokeWidth="4" />
    <Roda x={106} y={77} r={9} />
    <AnakMendorong />
  </g>,
  "pilot-dorong-kereta-bayi": <g {...GARIS}>
    <path d="M51 51L58 50 67 62 86 80M100 61L75 79M86 78H111" fill="none" stroke="#526c7a" strokeWidth="4" />
    <path d="M71 50Q73 22 96 22Q111 24 112 48Z" fill="#7bb6cb" stroke="#4b879f" />
    <path d="M82 47Q86 29 96 23" fill="none" stroke="#a7d4df" />
    <circle cx="100" cy="46" r="5" fill="#efbc94" stroke="#b67e5a" />
    <path d="M66 50H117L109 63Q103 70 90 69H80Q71 68 66 59Z" fill="#d39ab4" stroke="#8e587a" />
    <Roda x={75} y={82} r={7} /><Roda x={107} y={82} r={7} />
    <AnakMendorong />
  </g>,
  "pilot-lempar-bola": <g {...GARIS}>
    <path d="M12 87L24 77 38 85 28 94Z" fill="#6f91c0" stroke="#405b84" />
    <path d="M24 79L48 62 58 43Q60 38 62 39Q66 40 64 45L61 53 70 47Q74 46 75 49L70 58 62 66 53 72 35 89Z" fill={KULIT} stroke="#86573d" />
    <circle cx="96" cy="35" r="19" fill="#f4ac63" stroke="#a6613b" />
    <path d="M77 35H115M96 16V54M82 23Q98 28 110 46M81 47Q92 42 107 20" fill="none" stroke="#a6613b" strokeWidth="1.8" />
    <path d="M75 27L68 32M74 36L68 42" fill="none" stroke="#d78753" />
  </g>,
  "pilot-tarik-layang": <g {...GARIS}>
    <path d="M90 12L111 35 78 55 64 34Z" fill="#a994db" stroke="#725d9e" />
    <path d="M90 12L78 55 64 34Z" fill="#e68cab" stroke="#725d9e" />
    <path d="M64 34L111 35M78 55Q93 59 87 70Q85 77 99 79" fill="none" stroke="#725d9e" />
    <path d="M78 51L43 70" fill="none" stroke="#657485" strokeWidth="2.3" />
    <path d="M11 82L27 71 37 66Q46 64 48 71Q47 75 41 75L39 82 19 91Z" fill={KULIT} stroke="#86573d" />
    <rect x="36" y="67" width="15" height="10" rx="3" transform="rotate(-29 43 72)" fill="#8abfa1" stroke="#477c60" />
  </g>,
  "pilot-tarik-tambang": <g {...GARIS}>
    <path d="M7 87H123" fill="none" stroke="#98b893" />
    <path d="M23 62L20 75 8 82M28 61L38 76 44 81" fill="none" stroke="#4a748d" strokeWidth="6" />
    <path d="M108 63L110 75 122 82M102 62L90 76 85 82" fill="none" stroke="#467f72" strokeWidth="6" />
    <path d="M18 43L30 40 38 59 26 66Z" fill="#ec9d61" />
    <path d="M107 44L99 41 91 58 105 65Z" fill="#a381c0" />
    <circle cx="19" cy="34" r="8" fill={KULIT} /><circle cx="109" cy="34" r="8" fill={KULIT} />
    <path d="M13 33Q10 24 19 24Q25 23 28 31L19 28Z M103 30Q109 23 117 29L117 37 113 31Z" fill="#593e30" />
    <path d="M40 54L91 54" fill="none" stroke="#8c654a" strokeWidth="4" />
    <path d="M64 54V65L71 61V54Z" fill="#e78495" stroke="#9e5867" strokeWidth="1.8" />
    <path d="M26 46L33 52 46 54M103 46L96 51 85 54" fill="none" stroke={KULIT} strokeWidth="5" />
  </g>,
  "pilot-tarik-mobil-mainan": <g {...GARIS}>
    <path d="M30 42Q49 42 62 64L69 67" fill="none" stroke="#866449" strokeWidth="2.6" />
    <path d="M71 57L78 45H103L111 55 119 61V75H68V63Z" fill="#f9c660" stroke="#9c6840" />
    <path d="M81 48H101L107 55H76Z" fill="#cdebf1" stroke="#6895a0" />
    <path d="M92 48V56" fill="none" stroke="#6895a0" />
    <Roda x={79} y={77} r={7} /><Roda x={108} y={77} r={7} />
    <path d="M8 25L22 26 31 32 38 37Q42 40 36 44L28 41 24 45Q18 47 13 41L8 40Z" fill={KULIT} stroke="#86573d" />
  </g>,
  "pilot-cabut-rumput": <g {...GARIS}>
    <path d="M10 80Q36 72 60 81Q86 71 120 78V93H10Z" fill="#b78964" stroke="#7d5d45" />
    <path d="M54 71Q52 62 61 53M64 68V52M69 70L74 56M65 62L59 68M69 66L76 68" fill="none" stroke="#92704f" />
    <path d="M64 56Q66 38 49 29Q45 45 61 49Q56 29 62 23Q75 34 66 48Q79 30 88 32Q85 47 68 51L68 57Z" fill="#78aa6c" stroke="#4f824f" />
    <path d="M117 32L105 24 94 24 82 29 71 30Q63 28 61 33L64 39 72 38 82 42 94 47 115 43Z" fill={KULIT} stroke="#86573d" />
    <circle cx="47" cy="73" r="2" fill="#92704f" stroke="none" />
    <circle cx="78" cy="73" r="2" fill="#92704f" stroke="none" />
  </g>,
  "pilot-timba-sumur": <g {...GARIS}>
    <path d="M29 66V17H102V66" fill="none" stroke="#8b684f" strokeWidth="5" />
    <path d="M64 20V46M67 20Q81 24 96 24" fill="none" stroke="#8b684f" />
    <ellipse cx="66" cy="70" rx="40" ry="10" fill="#64737a" stroke="#687884" />
    <path d="M26 70V83Q62 100 106 83V70Q66 84 26 70Z" fill="#a1aeb6" stroke="#687884" />
    <path d="M28 76Q66 89 103 76M43 79V88M55 83V91M76 82V91M94 78V88" fill="none" stroke="#687884" strokeWidth="1.6" />
    <path d="M56 49Q64 40 73 48L75 57M53 51H77L73 67H57Z" fill="#75add1" stroke="#426d88" />
    <path d="M57 54Q65 57 74 54M76 61L79 65" fill="none" stroke="#c4eff3" strokeWidth="1.7" />
    <path d="M120 22L106 17 100 18 91 21Q87 25 91 28L99 26 105 30 119 32Z" fill={KULIT} stroke="#86573d" />
  </g>,
};
