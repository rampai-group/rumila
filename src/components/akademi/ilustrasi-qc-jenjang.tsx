import type { ReactNode } from "react";
import { ILUSTRASI_HABITAT } from "./ilustrasi-hewan-habitat";
import { ILUSTRASI_BENTUK_PILOT } from "./ilustrasi-pilot-bentuk";
import { ILUSTRASI_MATAHARI_PILOT } from "./ilustrasi-pilot-matahari";
import { ILUSTRASI_UKUR_PILOT } from "./ilustrasi-pilot-ukur";
import { ILUSTRASI_GERAK_PILOT } from "./ilustrasi-pilot-gerak";
import { ILUSTRASI_GAYA_SD2 } from "./ilustrasi-sd2-gaya";
import { ILUSTRASI_LISTRIK_LUAR_SD2 } from "./ilustrasi-sd2-listrik-luar";
import { ILUSTRASI_INTERNET_SD3 } from "./ilustrasi-sd3-internet";
import { ILUSTRASI_TULANG_SD4 } from "./ilustrasi-sd4-tulang";
import { ILUSTRASI_TUMBUH_KELINCI_SD2 } from "./ilustrasi-sd2-pertumbuhan-kelinci";
import { ILUSTRASI_TUMBUH_SAPI_KAMBING_GAJAH_SD2 } from "./ilustrasi-sd2-tumbuh-sapi-kambing-gajah";
import { ILUSTRASI_TUMBUH_PELIHARAAN_SD2 } from "./ilustrasi-sd2-tumbuh-hewan-peliharaan";
import { ILUSTRASI_TUMBUH_TERNAK_SD2 } from "./ilustrasi-sd2-tumbuh-hewan-ternak";
import { ILUSTRASI_PENYEBAB_GERAK_SD2 } from "./ilustrasi-sd2-penyebab-gerak";
import { ILUSTRASI_DIDIH_UAP_SD6 } from "./ilustrasi-sd6-didih-uap";
import { ILUSTRASI_KONDISI_TEMPAT_SD2 } from "./ilustrasi-sd2-kondisi-tempat";
import { ILUSTRASI_BAHAN_SD2 } from "./ilustrasi-sd2-bahan";
import { ILUSTRASI_SUMBER_CAHAYA_SD2 } from "./ilustrasi-sd2-sumber-cahaya";
import { ILUSTRASI_JARUM_MENIT_SD2 } from "./ilustrasi-sd2-jarum-menit";

const INK = "#203649";
const RINGKAS = { stroke: INK, strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function KutuAir() {
  return <g {...RINGKAS}>
    <path d="M41 41Q20 16 9 16M37 33L16 30M30 39L10 47M54 35Q42 12 45 8M53 21L61 10" fill="none" stroke="#537983" />
    <path d="M47 25Q32 22 27 42Q26 50 39 53Q39 82 70 87Q102 88 112 64L124 77L112 56Q108 19 79 19Q64 18 53 28Z" fill="#a9dbdb" fillOpacity=".76" stroke="#487987" />
    <path d="M47 49Q68 48 74 61Q82 75 103 67M58 45L62 35M66 50L72 38M76 55L84 44M91 56L101 49" fill="none" stroke="#679ca2" />
    <path d="M47 28Q58 25 61 36L57 45 46 42Z" fill="#c5876d" fillOpacity=".68" stroke="none" />
    <circle cx="40" cy="38" r="6" fill="#263e4c" stroke="none" />
    <circle cx="38" cy="36" r="2" fill="#f1fbfa" stroke="none" />
  </g>;
}

/** Profile drawings separate each counted leg from wings and antennae. */
function Serangga({ kupu }: { kupu: boolean }) {
  const legs = kupu
    ? ["M56 43L42 52 16 54", "M74 43L88 52 114 54", "M57 49L39 67 16 71", "M73 49L91 67 114 71", "M58 55L45 83 24 90", "M72 55L85 83 106 90"]
    : ["M53 42L35 43 18 48", "M77 42L95 43 112 48", "M53 49L36 58 11 62", "M77 49L94 58 119 62", "M56 55L43 78 16 89", "M74 55L87 78 114 89"];
  return <g {...RINGKAS}>
    {["", "translate(130 0) scale(-1 1)"].map(flip => <g key={flip} transform={flip}>
      {kupu ? <>
        <path d="M62 47C39 16 10 7 10 25Q8 39 32 43L57 59Z" fill="#ffad63" />
        <path d="M60 46Q38 32 18 39Q18 52 53 57Z" fill="#ffc969" stroke="none" />
        <path d="M56 42L31 23M50 45L23 33" stroke="#bf602e" fill="none" />
        <circle cx="22" cy="26" r="3.5" fill="#754163" stroke="none" />
      </> : <path d="M52 41Q28 14 12 23Q1 36 35 42Z" fill="#d1edf2" stroke="#6f9ead" />}
    </g>)}
    <ellipse cx="65" cy={kupu ? 52 : 57} rx={kupu ? 8 : 14} ry={kupu ? 17 : 20} fill={kupu ? "#79506b" : "#487876"} />
    {!kupu && <path d="M53 60Q65 66 77 60M56 68Q65 72 74 68" fill="none" stroke="#315e60" />}
    <g fill="none" stroke={INK} strokeWidth="3.4">
      {legs.map(d => <path key={d} d={d} />)}
    </g>
    <circle cx="65" cy="30" r={kupu ? 8 : 11} fill={kupu ? "#79506b" : "#537977"} />
    <circle cx="59" cy="29" r={kupu ? 2 : 4} fill={kupu ? "#fceac4" : "#c36a59"} stroke="none" />
    <circle cx="71" cy="29" r={kupu ? 2 : 4} fill={kupu ? "#fceac4" : "#c36a59"} stroke="none" />
    <path d={kupu ? "M61 23Q54 10 47 12M69 23Q76 10 83 12" : "M60 22L57 17M70 22L73 17"} fill="none" strokeWidth={kupu ? 2 : 1.7} />
  </g>;
}

function Lebah() {
  return <g {...RINGKAS}>
    <path d="M54 46Q24 12 14 28Q8 44 49 54ZM76 46Q106 12 116 28Q122 44 81 54Z" fill="#d1edf2" stroke="#65959f" />
    <g fill="none" strokeWidth="4">
      <path d="M53 43L37 48 20 47" /><path d="M77 43L93 48 110 47" />
      <path d="M51 49L36 60 16 65" /><path d="M79 49L94 60 114 65" />
      <path d="M53 55L39 74 24 85" /><path d="M77 55L91 74 106 85" />
    </g>
    <path d="M65 91L59 82H71Z" fill="#4e493f" />
    <ellipse cx="65" cy="68" rx="17" ry="19" fill="#ffc55d" />
    <path d="M50 61Q65 67 80 61M50 72Q65 77 80 72" fill="none" stroke="#5a4837" strokeWidth="5" />
    <ellipse cx="65" cy="48" rx="15" ry="12" fill="#795437" />
    <circle cx="65" cy="31" r="12" fill="#4c4943" />
    <path d="M59 21Q56 13 51 12M71 21Q74 13 79 12" fill="none" />
    <circle cx="60" cy="30" r="2.4" fill="#fff5da" stroke="none" />
    <circle cx="70" cy="30" r="2.4" fill="#fff5da" stroke="none" />
  </g>;
}

function KunangKunang() {
  return <g {...RINGKAS}>
    <rect x="7" y="6" width="116" height="88" rx="13" fill="#25516a" stroke="none" />
    <circle cx="23" cy="25" r="2" fill="#dcf4f4" stroke="none" />
    <circle cx="102" cy="34" r="2.5" fill="#dcf4f4" stroke="none" />
    <circle cx="28" cy="73" r="1.5" fill="#dcf4f4" stroke="none" />
    <ellipse cx="65" cy="74" rx="27" ry="20" fill="#e8f77c" opacity=".36" stroke="none" />
    <path d="M53 47L44 44 39 48M53 54L43 55 38 61M54 60L47 66 43 74M77 47L86 44 91 48M77 54L87 55 92 61M76 60L83 66 87 74" fill="none" stroke="#e4d9a2" />
    <path d="M51 62Q65 53 79 62V71Q77 86 65 87Q53 86 51 71Z" fill="#f2ff82" stroke="#d2e75c" />
    <path d="M52 73Q65 76 78 73M57 81Q65 83 73 81" fill="none" stroke="#b3c74e" />
    <path d="M65 38Q45 41 51 70Q59 70 65 64Q72 70 79 70Q85 41 65 38Z" fill="#415064" stroke="#b8af7f" />
    <path d="M65 43V64" fill="none" stroke="#d0c995" />
    <circle cx="65" cy="33" r="9" fill="#424d57" stroke="#b8af7f" />
    <path d="M60 26Q57 18 51 19M70 26Q73 18 79 19" fill="none" stroke="#e4d9a2" />
  </g>;
}

function Televisi({ nyala }: { nyala: boolean }) {
  return <g {...RINGKAS}>
    {nyala && <path d="M7 24L14 29M6 48H15M8 72L15 66M123 24L115 30M125 48H116M123 71L115 66M49 15L45 8M81 15L85 8" fill="none" stroke="#eca526" strokeWidth="3" />}
    <rect x="19" y="22" width="92" height="56" rx="7" fill="#46576c" />
    <rect x="26" y="29" width="78" height="42" rx="3" fill={nyala ? "#b3edff" : "#16232e"} stroke="none" />
    {nyala
      ? <><path d="M27 60L43 45 55 56 72 40 89 56 104 51V71H27Z" fill="#6bbced" /><circle cx="81" cy="40" r="6" fill="#fff0a3" /></>
      : <path d="M38 43L54 34M37 49L63 34" fill="none" stroke="#496070" strokeWidth="2" />}
    <path d="M65 78V90M48 91H82" fill="none" strokeWidth="4" />
  </g>;
}

const PAKAN: Record<string, ReactNode> = {
  "ikan-matang": <g {...RINGKAS}>
    <ellipse cx="65" cy="60" rx="55" ry="29" fill="#f6f8ea" stroke="#799fa6" />
    <ellipse cx="65" cy="60" rx="43" ry="19" fill="#fffdf1" stroke="#c5d7cd" strokeWidth="1.5" />
    <path d="M23 59L105 48 93 68 65 77 33 71ZM27 53Q47 33 67 41L105 47Q94 62 68 67L35 64Z" fill="#d49457" stroke="#825e42" />
    <path d="M31 54Q48 40 66 46L95 49 69 61 48 58 41 62Z" fill="#fff0c8" stroke="#c8a567" />
    <path d="M47 47L43 55M63 48L58 57M78 50L70 60" fill="none" stroke="#c89966" strokeWidth="1.5" />
  </g>,
  "biji-bunga-matahari": <g {...RINGKAS}>
    {[[31,59,-53],[49,31,-28],[83,32,24],[92,64,43],[61,71,-11]].map(([x,y,a]) => <g key={x} transform={`translate(${x} ${y}) rotate(${a})`}>
      <path d="M0-16C-14-2-13 15 0 17C13 15 14-2 0-16Z" fill="#526376" />
      <path d="M0-12Q-4 5 0 14M4-10Q8 5 4 12" fill="none" stroke="#e7e4d4" strokeWidth="1.5" />
    </g>)}
  </g>,
  "kutu-air": <KutuAir />,
  "beruang-cokelat": <g {...RINGKAS}>
    <path d="M10 60Q5 55 8 51Q16 50 21 53Q32 29 54 38Q63 27 83 32L101 40 121 57 118 69 101 72 90 65 85 89H70L72 67H46L40 90H24L27 64Z" fill="#936443" stroke="#593f33" />
    <circle cx="97" cy="39" r="8" fill="#bd8962" stroke="#593f33" />
    <path d="M106 50L122 57 118 66 105 65" fill="#cb9f75" stroke="#593f33" />
    <circle cx="106" cy="54" r="2" fill={INK} stroke="none" />
    <path d="M112 56L123 57 121 62" fill={INK} stroke="none" />
    <path d="M26 79H40M72 80H85" stroke="#785239" />
  </g>,
};

const KEGIATAN: Record<string, ReactNode> = {
  "pasir-panas-kering": <g {...RINGKAS}>
    <rect x="4" y="5" width="122" height="89" rx="11" fill="#c6ebfa" stroke="none" />
    <circle cx="97" cy="31" r="14" fill="#ffcf59" stroke="#d69228" />
    <path d="M97 10V12M97 50V53M71 31H77M118 31H123M79 13L83 17M111 45L115 49M112 16L116 12" fill="none" stroke="#e5a437" strokeWidth="2.2" />
    <path d="M4 58Q40 51 72 65Q94 56 126 62V87Q126 94 118 94H12Q4 94 4 87Z" fill="#edc16c" stroke="none" />
    <path d="M23 73L35 67 47 73 55 71M57 86L70 78 81 83 97 77M36 87L35 80 43 77" fill="none" stroke="#b28658" strokeWidth="2" />
  </g>,
  "lantai-sejuk-basah": <g {...RINGKAS}>
    <path d="M13 18H117V63L103 89H25L13 63Z" fill="#d2ebf0" stroke="#7babb5" />
    <path d="M13 45H117M39 18V63M65 18V63M91 18V63M16 64H114M26 64L36 88M100 64L92 88" stroke="#96bec7" strokeWidth="2" fill="none" />
    <path d="M42 76Q61 65 91 75Q100 82 80 84Q57 87 40 82Q35 79 42 76Z" fill="#78c9e8" stroke="#5daace" />
    <path d="M57 79Q70 75 87 78M53 28V37M68 28V44M83 28V37" fill="none" stroke="#54aed3" />
    <path d="M47 26L54 20H82L89 26Z" fill="#6b8d9b" stroke="#5a7a8a" />
  </g>,
  "siram-tanaman": <g {...RINGKAS}>
    <path d="M34 74H75L70 93H40Z" fill="#d1895c" stroke="#925a44" />
    <path d="M32 72Q52 64 77 72L73 78H35Z" fill="#98634b" stroke="#7c5140" />
    <path d="M54 71V34M53 54Q28 53 33 38Q48 35 54 47M55 44Q60 24 79 28Q77 45 55 49" fill="#79b86b" stroke="#438451" />
    <path d="M83 43Q80 25 101 30Q115 31 113 45" fill="none" stroke="#2b7594" strokeWidth="5" />
    <path d="M86 41L121 47 114 69 79 63ZM85 46L68 46 65 54 82 55" fill="#78bee4" stroke="#397999" />
    <path d="M66 60L63 63M64 66L61 69M72 60L71 65" stroke="#4fb2d6" strokeWidth="2.2" />
  </g>,
  "dorong-ayunan": <g {...RINGKAS}>
    <path d="M10 89H121" stroke="#a5bd85" strokeWidth="4" />
    <path d="M79 18L68 87M107 18L121 87M71 18H114" fill="none" stroke="#688f9e" strokeWidth="5" />
    <path d="M84 20L91 64M98 20L105 64M87 64L109 67" fill="none" stroke="#3d5e6d" strokeWidth="3" />
    <circle cx="92" cy="44" r="8" fill="#eab28e" />
    <path d="M89 38Q90 30 100 38L101 44" fill="#573d35" />
    <path d="M92 52L93 63 103 63 109 72" fill="none" stroke="#cd6749" strokeWidth="7" />
    <path d="M98 56L99 46" fill="none" stroke="#eab28e" strokeWidth="4" />
    <circle cx="36" cy="38" r="10" fill="#d69a74" />
    <path d="M25 38Q22 26 35 26Q43 26 44 33L35 31Z" fill="#44352f" />
    <path d="M35 51L43 66 34 81M43 66L52 81" fill="none" stroke="#266e8c" strokeWidth="8" />
    <path d="M38 52L69 54 82 51" fill="none" stroke="#d69a74" strokeWidth="6" />
    <path d="M56 36H69L64 32M69 36L64 40" fill="none" stroke="#cf563c" strokeWidth="3" />
  </g>,
};

const LAMBUNG = "M20 41H111L104 65Q97 75 84 76H46Q32 75 25 64Z";

function Wadah({ id }: { id: string }) {
  if (id === "bola-plastik-berongga") return <g {...RINGKAS}>
    <circle cx="65" cy="50" r="35" fill="#f19151" stroke="#a95f39" />
    <path d="M43 22Q37 38 44 61M38 26Q26 37 31 57M41 75Q49 82 60 83" fill="none" stroke="#ffdcb8" strokeWidth="4" />
    <path d="M65 17Q96 21 99 49Q99 78 65 84Z" fill="#f9e5c9" opacity=".85" stroke="#b16a3b" />
    <path d="M66 26Q92 28 92 50Q92 71 66 75Z" fill="#eef8fc" stroke="#b26f52" strokeDasharray="4 3" />
  </g>;
  if (id === "bola-kaca-padat") return <g {...RINGKAS}>
    <circle cx="65" cy="50" r="35" fill="#78adbd" stroke="#477986" />
    <path d="M38 51Q72 28 89 60M40 64Q67 41 91 61" fill="none" stroke="#80d9c6" strokeWidth="5" />
    <path d="M42 34Q49 25 59 24" fill="none" stroke="#eafaff" strokeWidth="5" />
  </g>;
  if (id === "bola-tanah-liat" || id === "bola-plastisin") {
    const liat = id === "bola-tanah-liat";
    return <g {...RINGKAS}><circle cx="65" cy="50" r="35" fill={liat ? "#b97d63" : "#b36a8c"} /><path d="M39 43Q43 25 62 24M34 57Q42 69 56 72" fill="none" stroke={liat ? "#dcad85" : "#e9a2b7"} strokeWidth="4" /></g>;
  }
  if (id === "mangkuk-tanah-liat" || id === "piring-plastisin" || id === "perahu-plastisin") {
    const liat = id === "mangkuk-tanah-liat";
    const dangkal = id === "piring-plastisin";
    return <g {...RINGKAS}>
      <path d={dangkal ? "M11 51H119Q112 74 66 76Q23 75 11 51Z" : LAMBUNG} fill={liat ? "#b57f66" : "#b36a8c"} />
      <ellipse cx="65" cy={dangkal ? 49 : 40} rx={dangkal ? 53 : 45} ry={dangkal ? 12 : 17} fill={liat ? "#f1bb92" : "#e7a0b7"} />
      <path d={dangkal ? "M20 48Q63 29 111 48Q72 61 20 48Z" : "M26 39Q65 12 104 39Q66 57 26 39Z"} fill={liat ? "#a96b53" : "#aa6186"} stroke="none" />
      <path d={dangkal ? "M24 53Q57 64 106 54" : "M29 45Q62 63 102 45"} fill="none" stroke={liat ? "#926553" : "#934b72"} strokeWidth="3" />
    </g>;
  }
  if (id === "kotak-kosong" || id === "kotak-berisi-batu") return <g {...RINGKAS}>
    <path d="M17 37L31 23H112L114 65 101 81H17Z" fill="#c2e6ec" stroke="#548e97" />
    <path d="M17 37H101L112 23M101 37V81" fill="none" stroke="#548e97" />
    <path d="M22 44H95V75H22Z" fill="#ebfaff" stroke="none" />
    {id.endsWith("berisi-batu") && <g fill="#72808d" stroke="#515f6d" strokeWidth="1.5"><path d="M22 73L29 59 41 56 52 64 53 75ZM52 75L51 60 64 53 73 55 79 72 76 76ZM76 75L78 64 87 54 95 61V75Z" /><path d="M34 57L39 44 49 46 54 53 48 61ZM62 57L64 46 76 45 86 54 79 63Z" /></g>}
    <path d="M14 34Q14 29 22 27L109 22Q118 21 117 27L114 40H15Z" fill="#74afb6" stroke="#548e97" />
    <path d="M20 31H111" fill="none" stroke="#c7e8e9" strokeWidth="2" />
  </g>;
  if (id === "perahu-seng" || id.startsWith("perahu-muatan-") || id === "perahu-foil-berat") {
    const berat = id.endsWith("-berat");
    const ringan = id.endsWith("-ringan");
    const liat = id.startsWith("perahu-muatan-");
    const lambung = liat ? "#c28768" : "#b6c1cc";
    const tepi = liat ? "#825640" : "#607480";
    return <g {...RINGKAS}>
      <path d="M14 49L38 34H99L116 49 101 74H32Z" fill={lambung} stroke={tepi} />
      <path d="M22 49L41 39H96L106 50 96 58H38Z" fill={liat ? "#965f48" : "#738893"} stroke={liat ? "#f3c8aa" : "#e5edf3"} />
      {(ringan || berat) && <g fill="#58afd5" stroke="#225f84" strokeWidth="1.5">{(berat ? [[37,48],[50,50],[63,47],[77,48],[91,48],[45,40],[59,38],[71,40],[85,39],[54,31],[70,30],[62,24]] : [[50,48],[66,48],[82,48]]).map(([x,y]) => <circle key={`${x},${y}`} cx={x} cy={y} r="6" />)}</g>}
      <path d="M15 50L37 61H95L115 50 101 74H32Z" fill={lambung} stroke={tepi} />
      {berat && <path d="M3 65Q12 59 21 65M108 64Q118 56 127 62" fill="none" stroke="#55b0d7" strokeWidth="4" />}
    </g>;
  }
  if (id === "seng-padat") return <g {...RINGKAS}>
    <path d="M25 41L43 19 72 15 100 28 110 51 92 76 62 87 38 79 20 62Z" fill="#a8b8c6" />
    <path d="M43 19L52 43 72 15M52 43L81 40 100 28M52 43L49 60 25 41M49 60L62 87M81 40L92 76M81 40L68 65 49 60M68 65L110 51" fill="none" stroke="#627887" strokeWidth="2" />
  </g>;
  if (id === "bambu-tertutup") return <g {...RINGKAS}>
    <path d="M14 45L42 23 113 40 100 70 26 77Z" fill="#91a850" stroke="#657e3f" />
    <path d="M28 50L100 47M30 62L102 54M56 41L55 68M76 38L75 61" fill="none" stroke="#c6cb78" strokeWidth="4" />
    <ellipse cx="22" cy="60" rx="10" ry="17" fill="#e3cb8a" stroke="#718046" />
    <ellipse cx="110" cy="54" rx="10" ry="16" transform="rotate(18 110 54)" fill="#d7bd7c" stroke="#718046" />
    <path d="M36 45H95L92 55H39Z" fill="#e9f1cd" stroke="#718046" strokeDasharray="4 3" />
  </g>;
  if (id === "tongkat-plastisin") return <g {...RINGKAS}>
    <path d="M18 65Q10 58 19 49L100 29Q117 26 121 41Q121 52 111 56L28 76Z" fill="#b36a8c" />
    <path d="M24 51L104 34" fill="none" stroke="#efd1d8" strokeWidth="4" />
    <ellipse cx="23" cy="63" rx="9" ry="12" transform="rotate(-17 23 63)" fill="#d88ca8" />
  </g>;
  if (id === "botol-kosong" || id === "botol-berisi-pasir") return <g {...RINGKAS}>
    <path d="M53 17H77V28Q93 34 94 49V90Q65 98 36 90V49Q37 34 53 28Z" fill="#e5f8fc" stroke="#5c9bab" />
    {id.endsWith("pasir") && <path d="M50 34Q65 38 80 33Q90 41 90 51V87Q66 94 40 87V51Q40 41 50 34Z" fill="#e3bd76" stroke="#be9857" />}
    <path d="M43 45V77M85 53V77" fill="none" stroke="#fff" strokeWidth="3" />
    <rect x="49" y="10" width="32" height="13" rx="3" fill="#64a6ab" stroke="#597e92" />
    <path d="M38 90H92" fill="none" stroke="#7bb2ba" />
  </g>;
  if (id === "kaleng-kosong" || id === "kaleng-berisi-air") return <g {...RINGKAS}>
    <path d="M38 28H92V78Q90 86 65 86Q39 86 38 78Z" fill="#c2d8de" stroke="#5f8290" />
    <path d="M46 39H84V78Q65 84 46 78Z" fill={id.endsWith("air") ? "#5dbee8" : "#fafdff"} stroke="#6c9eb2" strokeWidth="1.5" />
    <path d="M52 43V73" stroke="#e4f5fe" strokeWidth="3" />
    <ellipse cx="65" cy="29" rx="26" ry="8" fill="#b3c8ce" stroke="#577b87" />
    <ellipse cx="67" cy="28" rx="7" ry="3" fill="#6f8e9a" stroke="#dce9ed" strokeWidth="1.2" />
  </g>;
  if (id === "jeruk-utuh" || id === "jeruk-kupas") {
    const utuh = id.endsWith("utuh");
    return <g {...RINGKAS}>
      <ellipse cx="65" cy="53" rx="38" ry="34" fill={utuh ? "#f49139" : "#ffc366"} stroke="#b46b35" />
      {utuh
        ? <><path d="M42 37Q54 23 69 29" fill="none" stroke="#ffcf76" strokeWidth="5" /><path d="M65 23Q76 7 87 18Q81 28 65 23Z" fill="#6ca365" stroke="#537b42" />{[[49,64],[78,45],[87,65],[42,49],[66,72]].map(([x,y]) => <circle key={x} cx={x} cy={y} r="1.8" fill="#c87330" stroke="none" />)}</>
        : <path d="M64 23Q42 53 61 87M69 22Q89 49 69 86M34 42Q60 30 97 44M32 61Q62 75 99 58" fill="none" stroke="#fff0b7" strokeWidth="4" />}
    </g>;
  }
  return null;
}

const DATA_WADAH = [
  "bola-plastik-berongga", "bola-kaca-padat", "bola-tanah-liat", "bola-plastisin",
  "mangkuk-tanah-liat", "piring-plastisin", "perahu-plastisin", "kotak-kosong", "kotak-berisi-batu",
  "perahu-seng", "perahu-muatan-ringan", "perahu-muatan-berat", "perahu-foil-berat", "seng-padat", "bambu-tertutup",
  "tongkat-plastisin", "botol-kosong", "botol-berisi-pasir", "kaleng-kosong", "kaleng-berisi-air", "jeruk-utuh", "jeruk-kupas",
];

const JEJAK_FOSIL: Record<string, ReactNode> = {
  "fosil-daun": <><path d="M35 66Q32 38 83 27Q84 56 51 66Z" fill="#9b826a" /><path d="M33 73L76 33M48 60L48 47M57 52L67 54M63 46L63 37M68 40L78 43" fill="none" /></>,
  "fosil-jejak": <path d="M56 74Q54 61 46 60L36 46Q32 40 36 36Q40 36 47 43L57 51 56 31Q56 25 61 25Q65 30 67 50L79 42Q86 37 90 40Q88 46 81 51L70 61 71 74Q64 79 56 74Z" fill="#89735f" />,
  "fosil-amonit": <><path d="M65 26C43 26 35 41 37 56C39 72 57 82 73 74C88 66 89 46 75 41C62 36 52 46 55 55C59 66 74 59 70 51" fill="none" stroke="#524437" strokeWidth="7"/><path d="M65 25L65 33M84 31L79 40M90 48L83 49M89 64L83 60M76 75L74 69M59 78L58 71M43 70L48 66M36 54L43 53M40 39L46 44" fill="none" stroke="#665446" strokeWidth="2"/></>,
  "fosil-tulang": <path d="M34 41Q26 38 28 33Q31 26 39 31Q43 20 50 27Q54 32 52 37L82 59Q89 53 93 58Q98 62 92 68Q97 72 93 78Q84 85 79 78Q71 81 69 74L71 67 44 47Q38 55 31 49Q29 45 34 41Z" fill="#edd7a8" />,
  "fosil-ikan": <><path d="M39 53Q51 41 60 46L88 53 101 45V62L88 55 55 60Z" fill="#aa9479"/><path d="M48 55H88M54 51L60 44 68 50 74 44 82 52M55 56L60 64 67 58 73 64 82 56" fill="none" /><circle cx="48" cy="52" r="2.6" /></>,
  "fosil-gigi-hiu": <><path d="M44 38Q50 32 63 36Q70 33 82 33L90 41Q87 46 80 47L69 75 59 48Q50 49 44 44Z" fill="#e9d5ad"/><path d="M58 48L69 69 79 47M61 48L56 51M75 56L79 56" fill="none" /></>,
  "fosil-kayu": <><path d="M27 55L50 34 95 42 108 61 81 76 41 73Z" fill="#a9825c" /><path d="M50 34L65 53 103 60M65 53L41 73M70 64L86 69M38 57L49 62M51 49L58 54M79 44L88 49" fill="none" stroke="#e4be93" /><path d="M40 50L56 67M46 44L67 64M54 40L75 60" fill="none" stroke="#754d3b" /></>,
  "fosil-tengkorak": <><path d="M39 48Q47 33 67 31Q88 33 91 50L83 63 69 66 64 74H49L49 64 39 62Z" fill="#ded0a8" /><path d="M47 61H69L64 72 48 70M53 64V69M59 63V68" fill="none" /><circle cx="65" cy="46" r="7" fill="#7c624d" /><path d="M48 49L51 54 46 56" fill="none" /></>,
};

function Fosil({ id }: { id: string }) {
  if (id === "fosil-ambar") return <g {...RINGKAS}>
    <path d="M22 54Q21 28 52 15Q78 5 104 30Q118 50 106 72Q83 95 49 86Q29 82 22 54Z" fill="#efb14b" stroke="#a86a34" />
    <path d="M36 39Q48 17 74 22M90 66L101 57" fill="none" stroke="#ffe89e" strokeWidth="5" opacity=".8" />
    <path d="M55 53L45 45M75 53L85 45M55 57L43 60M75 57L87 60M58 61L50 70M72 61L81 70" stroke="#78503a" strokeWidth="2" />
    <ellipse cx="65" cy="57" rx="10" ry="12" fill="#a66d40" stroke="#754a36" />
    <path d="M58 55Q48 31 61 38L65 53Q74 34 80 38Q79 52 71 55Z" fill="#f1d399" stroke="#9f7141" />
    <circle cx="65" cy="44" r="4" fill="#754a36" stroke="none" />
  </g>;
  return <g {...RINGKAS}>
    <path d="M16 29L42 13 88 16 108 22 121 54 103 81 73 90 24 82 10 57Z" fill="#bc9f80" stroke="#806b59" />
    <path d="M20 32L38 21 90 23 104 32 110 53 91 77 69 83 28 74 19 54Z" fill="#d9bd9a" stroke="#9a8069" />
    <path d="M18 57L28 61M94 74L107 68M102 28L114 37M26 71L41 78" fill="none" stroke="#a0866b" strokeWidth="2" />
    <g stroke="#725f4b" strokeWidth="2">{JEJAK_FOSIL[id]}</g>
  </g>;
}

type CiriBatu = "bintik" | "kristal" | "kristal-halus" | "lubang" | "lamina" | "foliasi" | "butir" | "kerikil" | "bersudut" | "kaca" | "fosil" | "urat" | "pita" | "batu-bara" | "bulat" | "bidang" | "kuarsa";
const JENIS_BATU: Record<string, { warna: string; aksen: string; gelap: string; ciri: CiriBatu }> = {
  andesit: { warna: "#888a84", aksen: "#b9bcb0", gelap: "#696b65", ciri: "kristal-halus" },
  gabro: { warna: "#42484b", aksen: "#a1a598", gelap: "#222a31", ciri: "kristal" },
  diorit: { warna: "#d4d7d4", aksen: "#757c79", gelap: "#383f44", ciri: "bintik" },
  skoria: { warna: "#b46857", aksen: "#d58d76", gelap: "#7d433c", ciri: "lubang" },
  lanau: { warna: "#c0a183", aksen: "#ead4af", gelap: "#80604d", ciri: "lamina" },
  "batu-bara": { warna: "#3d4247", aksen: "#928a77", gelap: "#262b32", ciri: "batu-bara" },
  breksi: { warna: "#a78169", aksen: "#dbc5a9", gelap: "#795d58", ciri: "bersudut" },
  lempung: { warna: "#a88468", aksen: "#d9b395", gelap: "#745949", ciri: "fosil" },
  sekis: { warna: "#7b7675", aksen: "#d9d1c2", gelap: "#514c51", ciri: "foliasi" },
  filit: { warna: "#685e71", aksen: "#b7aaba", gelap: "#514657", ciri: "foliasi" },
  gneis: { warna: "#d6b9ac", aksen: "#efe2cb", gelap: "#574e58", ciri: "pita" },
  marmer: { warna: "#f7f3e9", aksen: "#cbcad4", gelap: "#96939f", ciri: "urat" },
  granit: { warna: "#d5ada5", aksen: "#f3d2bd", gelap: "#756562", ciri: "kristal" },
  basalt: { warna: "#575958", aksen: "#788181", gelap: "#333b3f", ciri: "kristal-halus" },
  "batu-apung": { warna: "#c2b9aa", aksen: "#e1d4c2", gelap: "#847769", ciri: "lubang" },
  obsidian: { warna: "#302e39", aksen: "#b1b9ca", gelap: "#22232e", ciri: "kaca" },
  "batu-pasir": { warna: "#bf8c57", aksen: "#efc376", gelap: "#8c5d40", ciri: "butir" },
  "batu-kapur": { warna: "#dbcaac", aksen: "#f4e6cc", gelap: "#a19379", ciri: "fosil" },
  "batu-serpih": { warna: "#807585", aksen: "#b0a8ab", gelap: "#5a5261", ciri: "lamina" },
  konglomerat: { warna: "#aa8c71", aksen: "#e5c8aa", gelap: "#655e60", ciri: "kerikil" },
  sabak: { warna: "#61747f", aksen: "#a8bbc5", gelap: "#425661", ciri: "lamina" },
  kuarsit: { warna: "#d2adab", aksen: "#f5dcd2", gelap: "#9e7479", ciri: "butir" },
  kerikil: { warna: "#b99e81", aksen: "#d7bca0", gelap: "#8e755e", ciri: "bulat" },
  "batu-kali": { warna: "#617982", aksen: "#9bb7be", gelap: "#445a62", ciri: "bulat" },
  "bijih-besi": { warna: "#65504a", aksen: "#b37154", gelap: "#443937", ciri: "bersudut" },
  galena: { warna: "#7b8495", aksen: "#d5dce5", gelap: "#41495b", ciri: "bidang" },
  hematit: { warna: "#a65b49", aksen: "#c9846b", gelap: "#5a403f", ciri: "urat" },
  "kristal-kuarsa": { warna: "#e9e5ee", aksen: "#fcfbfd", gelap: "#9388a6", ciri: "kuarsa" },
};

const TITIK_BATU = [[29,39],[44,31],[62,36],[77,33],[92,43],[104,41],[30,55],[51,54],[67,49],[83,57],[97,59],[38,68],[55,69],[75,67],[91,70]];

function Batuan({ id }: { id: string }) {
  const data = JENIS_BATU[id];
  const { warna, aksen, gelap, ciri } = data;
  const bintik = ciri === "bintik" || ciri === "kristal" || ciri === "kristal-halus" || ciri === "butir";
  if (ciri === "bulat") return <g {...RINGKAS} stroke={gelap}>
    <path d={id === "kerikil" ? "M28 61Q23 46 42 33Q65 18 87 35Q104 45 103 60Q102 77 76 81Q43 85 28 61Z" : "M17 56Q20 38 43 29Q63 23 89 31Q112 36 117 53Q122 68 109 78Q91 89 51 84Q16 81 17 56Z"} fill={warna} />
    <path d="M37 53Q55 35 87 44" fill="none" stroke={aksen} strokeWidth="3" strokeLinecap="round" />
  </g>;
  if (ciri === "bidang") return <g {...RINGKAS} stroke={gelap}>
    <path d="M19 51L46 40 66 51 67 78 40 88 19 76Z" fill={warna} />
    <path d="M19 51L40 61 66 51M40 61V88" fill="none" />
    <path d="M47 29L81 17 107 31 106 68 73 81 48 68Z" fill={warna} />
    <path d="M47 29L81 17 107 31 74 43Z" fill={aksen} />
    <path d="M74 43L107 31 106 68 73 81Z" fill={gelap} />
    <path d="M57 35L65 39M82 48L96 42" fill="none" stroke={aksen} strokeWidth="2" />
  </g>;
  if (ciri === "kuarsa") return <g {...RINGKAS} stroke={gelap}>
    <path d="M20 81L20 53 33 39 49 53 53 76 46 88 30 91Z" fill={warna} />
    <path d="M75 84L80 51 96 38 109 54 106 82 93 91Z" fill={warna} />
    <path d="M40 81L44 28 66 8 84 29 84 80 66 92Z" fill={warna} />
    <path d="M44 28L66 8 66 39 40 81Z" fill={aksen} />
    <path d="M66 39L84 29M66 39V92M20 53L33 60 49 53M33 60V89M80 51L93 62 109 54M93 62V90" fill="none" />
  </g>;
  return <g {...RINGKAS}>
    {ciri === "lamina"
      ? <><path d="M15 32L37 21 96 22 117 40 110 73 88 81 27 75 12 60Z" fill={warna} stroke={gelap} /><path d="M17 43L39 41 58 48 84 42 114 45M16 55L43 51 69 57 91 52 112 55M20 65L44 62 70 67 91 62 111 66M38 72L87 74 102 69" fill="none" stroke={aksen} strokeWidth="3" /></>
      : <path d="M16 53L30 31 50 22 81 24 107 32 118 52 112 67 93 80 54 83 27 74Z" fill={warna} stroke={gelap} />}
    {bintik && TITIK_BATU.map(([x,y],i) => {
      const fill = i % 3 === 1 ? aksen : gelap;
      const large = ciri === "kristal" || ciri === "bintik";
      return large
        ? <path key={x + "," + y} d={`M${x-4} ${y-2}l5-3 5 2-1 6-6 1Z`} fill={fill} stroke="none" />
        : <circle key={x + "," + y} cx={x} cy={y} r={i % 3 === 1 ? 2.3 : 1.5} fill={fill} stroke="none" />;
    })}
    {ciri === "lubang" && TITIK_BATU.map(([x,y],i) => <ellipse key={x + "," + y} cx={x} cy={y} rx={i%3===1?5:3.5} ry={i%3===1?4:2.8} fill={gelap} stroke={aksen} strokeWidth="1.5" />)}
    {(ciri === "kerikil" || ciri === "bersudut") && TITIK_BATU.filter((_, i) => i%2 === 0 || i === 5).map(([x,y],i) => {
      const fill = i%3===1 ? aksen : gelap;
      return ciri === "kerikil"
        ? <ellipse key={x + "," + y} cx={x} cy={y} rx={i%2===1?8:6} ry={i%2===1?5:6} fill={fill} strokeWidth="1" stroke={warna} />
        : <path key={x + "," + y} d={`M${x-6} ${y+4}l3-10 9 2 1 8Z`} fill={fill} strokeWidth="1" stroke={warna} />;
    })}
    {ciri === "kaca" && <path d="M37 39L55 29 79 30M49 62Q75 66 97 52M68 48L91 44" fill="none" stroke={aksen} strokeWidth="3" />}
    {ciri === "pita" && <>
      <path d="M27 42Q38 34 54 44T82 46Q91 39 105 42M20 55Q43 46 58 57T84 56Q95 51 112 53M26 65Q43 61 58 68T86 68L105 62" fill="none" stroke={gelap} strokeWidth="5" />
      <path d="M30 49Q43 42 59 50T84 52Q94 45 108 48M32 73Q49 70 64 76T91 73" fill="none" stroke={aksen} strokeWidth="3.3" />
    </>}
    {ciri === "urat" && <path d="M33 32Q44 43 55 41L69 55 67 65 85 76M58 27L68 36 79 37 90 51 104 54M45 46L35 56 39 69M64 64L54 75" fill="none" stroke={gelap} strokeWidth="1.7" />}
    {ciri === "foliasi" && <path d="M29 46L42 38 52 39M41 54L57 46 70 46M67 54L80 45 91 45M37 67L55 59 68 59M70 69L83 61 102 60" fill="none" stroke={aksen} strokeWidth="3" />}
    {ciri === "batu-bara" && <>
      <path d="M24 56L40 50 64 57 87 49 108 53M28 67L48 62 68 68 94 62 110 60" fill="none" stroke="#2c3037" strokeWidth="3" />
      <path d="M45 57Q46 40 82 32Q81 52 55 61ZM43 65L78 35" fill="none" stroke={aksen} strokeWidth="2" />
    </>}
    {ciri === "fosil" && (id === "lempung"
      ? <><path d="M23 50L48 43 70 47 105 43M26 62L46 57 76 61 105 55M38 72L80 73 100 69" fill="none" stroke={aksen} strokeWidth="2" /><g transform="translate(23 19) scale(.64)" stroke={gelap}>{JEJAK_FOSIL["fosil-ikan"]}</g></>
      : <g transform="translate(17 15) scale(.72)" stroke={gelap} fill="none"><path d="M41 58Q34 44 48 39Q54 32 62 38Q70 30 77 38Q88 41 88 53L79 64H48ZM50 46L57 61M63 42V61M76 44L70 62" /></g>)}
  </g>;
}

const GERAK_APUNG: Record<string, ReactNode> = {
  "sirip-ikan": <g {...RINGKAS}>
    <path d="M36 52Q59 29 88 44L112 29V72L87 59Q51 77 29 65Q17 59 36 52Z" fill="#c0d9e0" stroke="#6c929e" />
    <path d="M44 49Q45 35 58 22L72 44Q57 43 44 49Z" fill="#3aa6d0" stroke="#236c92" />
    <path d="M53 57Q74 48 87 55Q82 69 57 71Z" fill="#3aa6d0" stroke="#236c92" />
    <circle cx="35" cy="58" r="3" fill={INK} stroke="none" />
  </g>,
  sayap: <g {...RINGKAS}>
    <path d="M17 74Q15 44 40 29Q61 37 112 12Q115 29 98 40L116 34Q110 55 86 60L105 58Q97 75 72 75L87 77Q73 89 48 85Q30 84 17 74Z" fill="#ede2c5" stroke="#705840" />
    <path d="M25 67Q44 53 57 47Q73 46 98 40M39 75Q60 61 86 60M53 80Q65 75 72 75M34 57L45 59M49 48L61 50" fill="none" stroke="#9c805f" />
  </g>,
  "kaki-hewan": <g {...RINGKAS}>
    <path d="M36 18Q50 12 62 25L53 53L55 75Q59 84 51 86H27Q20 84 25 77L35 67L32 43Z" fill="#d8a060" stroke="#784e2c" />
    <path d="M78 18Q91 12 103 26L93 54L96 75Q100 84 92 86H69Q62 84 67 77L76 67L74 43Z" fill="#e8b77b" stroke="#784e2c" />
    <path d="M31 79v7m10-7v7m32-7v7m10-7v7" fill="none" stroke="#784e2c" strokeWidth="2" />
  </g>,
  "monyet-berjalan": <g {...RINGKAS}>
    <path d="M43 47Q24 48 17 36Q7 23 20 15Q30 11 35 20" fill="none" stroke="#75462f" strokeWidth="5" />
    <path d="M44 59L35 70L38 83H51M72 59L78 77L92 82" fill="none" stroke="#75462f" strokeWidth="7" />
    <ellipse cx="58" cy="51" rx="27" ry="16" fill="#a3623e" stroke="#75462f" />
    <path d="M47 57L47 72L30 82M78 55L89 69L106 74" fill="none" stroke="#a3623e" strokeWidth="8" />
    <path d="M27 83H35M102 74L113 76" fill="none" stroke="#d2a172" strokeWidth="5" />
    <circle cx="86" cy="35" r="17" fill="#a3623e" stroke="#75462f" />
    <circle cx="77" cy="34" r="7" fill="#e5ad80" stroke="#75462f" />
    <path d="M91 27Q109 29 108 39Q109 51 94 51Q85 48 85 39Q85 31 91 27Z" fill="#edbe94" stroke="#75462f" />
    <circle cx="99" cy="35" r="2.7" fill={INK} stroke="none" />
    <path d="M98 46Q103 46 107 43" fill="none" stroke="#75462f" strokeWidth="2" />
  </g>,
  "bebek-karet-mainan": <g {...RINGKAS}>
    <path d="M42 54Q32 48 34 36Q35 20 54 19Q73 18 77 32Q81 41 73 51Q89 57 111 46Q113 77 88 83Q63 91 40 82Q23 75 28 65Q31 56 42 54Z" fill="#ffd54c" stroke="#a9641f" />
    <path d="M35 37Q25 35 15 40Q21 51 36 48" fill="#ff932f" stroke="#a65526" />
    <path d="M53 30Q57 27 63 31M46 69Q62 82 85 74" fill="none" stroke="#fff3af" strokeWidth="4" />
    <circle cx="50" cy="36" r="3.6" stroke="none" fill={INK} />
  </g>,
  "tutup-gabus": <g {...RINGKAS} stroke="#946237">
    <path d="M37 29H93L86 75Q65 89 44 75Z" fill="#c89257" />
    <ellipse cx="65" cy="29" rx="28" ry="10" fill="#e4b57b" />
    <path d="M50 27l4-2m9 7 4-4m10 1 4-2M46 48l4 3m12-7 3 3m10-3 6 2M49 65l4-2m11 5 4 2m9-12 5 3M72 76l4-3" fill="none" strokeWidth="2" />
  </g>,
  "balok-kayu": <g {...RINGKAS} stroke="#784e2c">
    <path d="M14 42L40 22H115L90 42Z" fill="#e5b57e" />
    <path d="M90 42L115 22V61L90 81Z" fill="#af7843" />
    <path d="M14 42H90V81H14Z" fill="#c88a4d" />
    <path d="M23 52Q40 47 55 52T80 52M23 62Q38 59 50 64T80 61M26 73Q50 68 79 72M39 34H86" fill="none" stroke="#9e683a" strokeWidth="2" />
    <path d="M97 50L108 41M98 63L108 54" fill="none" stroke="#8a5e39" strokeWidth="2" />
  </g>,
  "garpu-logam": <g {...RINGKAS} transform="rotate(27 65 50)">
    <path d="M44 11H49V34H55V11H60V34H66V11H71V34H77V11H82V36Q82 47 69 51L72 86Q73 93 65 93Q57 93 58 86L60 51Q44 47 44 36Z" fill="#bdcbd6" stroke="#526c82" />
    <path d="M50 40Q56 45 62 45M63 59L62 85" fill="none" stroke="#f6fbfd" strokeWidth="3" />
  </g>,
  "batu-ulekan": <g {...RINGKAS} transform="rotate(-29 65 53)">
    <path d="M56 17Q65 9 74 17Q79 23 75 38L73 55Q90 64 88 77Q86 90 66 92Q42 91 42 76Q42 66 57 55L55 38Q50 23 56 17Z" fill="#758385" stroke="#354648" />
    <path d="M61 20Q58 26 62 39M50 71Q46 82 58 86M64 82Q74 82 80 78" fill="none" stroke="#a8b3af" strokeWidth="3" />
    <path d="M69 25h1M65 53h1M60 66h1M77 70h1M51 77h1M64 74h1M70 87h1" fill="none" stroke="#354648" />
  </g>,
};

const objectArt: Record<string, ReactNode> = {
  ...ILUSTRASI_JARUM_MENIT_SD2,
  ...ILUSTRASI_BAHAN_SD2,
  ...ILUSTRASI_SUMBER_CAHAYA_SD2,
  ...PAKAN,
  ...KEGIATAN,
  ...GERAK_APUNG,
  ...ILUSTRASI_HABITAT,
  ...ILUSTRASI_BENTUK_PILOT,
  ...ILUSTRASI_GERAK_PILOT,
  ...ILUSTRASI_GAYA_SD2,
  ...ILUSTRASI_UKUR_PILOT,
  ...ILUSTRASI_MATAHARI_PILOT,
  ...ILUSTRASI_LISTRIK_LUAR_SD2,
  ...ILUSTRASI_INTERNET_SD3,
  ...ILUSTRASI_TULANG_SD4,
  ...ILUSTRASI_TUMBUH_KELINCI_SD2,
  ...ILUSTRASI_TUMBUH_SAPI_KAMBING_GAJAH_SD2,
  ...ILUSTRASI_TUMBUH_PELIHARAAN_SD2,
  ...ILUSTRASI_TUMBUH_TERNAK_SD2,
  ...ILUSTRASI_PENYEBAB_GERAK_SD2,
  ...ILUSTRASI_DIDIH_UAP_SD6,
  ...ILUSTRASI_KONDISI_TEMPAT_SD2,
  "plastik-pembungkus": <g {...RINGKAS}>
    <path d="M32 56L85 54 116 72 70 89Z" fill="#d9f3f7" stroke="#6ea4ad" />
    <path d="M51 62L92 61M65 72L103 69M76 80L111 74" fill="none" stroke="#9ecbd2" strokeWidth="1.5" />
    <path d="M26 40L98 22C108 19 116 37 108 44L36 65Z" fill="#d5e8eb" stroke="#6c929d" />
    <path d="M29 46L101 28M33 56L106 38" fill="none" stroke="#fafdff" strokeWidth="3" />
    <ellipse cx="31" cy="53" rx="11" ry="14" transform="rotate(-17 31 53)" fill="#f4e4ca" stroke="#9c7950" />
    <ellipse cx="31" cy="53" rx="5" ry="8" transform="rotate(-17 31 53)" fill="#8c6e51" stroke="#725a42" />
  </g>,
  "kamera-laptop": <g {...RINGKAS}>
    <rect x="12" y="24" width="106" height="59" rx="11" fill="#3f5365" />
    <path d="M19 56H111V77H19Z" fill="#b7dee9" stroke="none" />
    <circle cx="65" cy="41" r="10" fill="#93aebc" />
    <circle cx="65" cy="41" r="5.5" fill="#25354f" />
    <circle cx="63" cy="39" r="2" fill="#a0d7ef" stroke="none" />
    <circle cx="84" cy="41" r="2.6" fill="#d6e6ee" stroke="none" />
    <path d="M28 63H45M28 70H36" fill="none" stroke="#d9f1f7" />
  </g>,
  "kamera-web": <g {...RINGKAS}>
    <path d="M48 61H80L88 77H41Z" fill="#768e9e" />
    <rect x="31" y="76" width="68" height="10" rx="4" fill="#526878" />
    <rect x="19" y="29" width="92" height="36" rx="16" fill="#4b5e6e" />
    <circle cx="65" cy="47" r="12" fill="#a3bac6" />
    <circle cx="65" cy="47" r="7" fill="#21344d" />
    <circle cx="62" cy="44" r="2.6" fill="#d0edf8" stroke="none" />
    <circle cx="91" cy="46" r="2.6" fill="#c8dfeb" stroke="none" />
    <path d="M29 43h9M29 50h9" fill="none" stroke="#9eb4c1" />
  </g>,
  "rotan-mentah": <g {...RINGKAS}>
    <path d="M19 80Q53 75 96 45M29 91Q69 83 114 57" fill="none" stroke="#7e5d41" strokeWidth="12" />
    <path d="M19 80Q53 75 96 45M29 91Q69 83 114 57" fill="none" stroke="#dcb57b" strokeWidth="7" />
    <path d="M13 66Q50 55 84 19" fill="none" stroke="#37624a" strokeWidth="11" />
    <path d="M13 66Q50 55 84 19" fill="none" stroke="#83a758" strokeWidth="6" />
    <path d="M36 55L31 47M55 44L49 36M46 73L44 67M68 65L66 58M70 79L67 74M92 70L89 65" fill="none" stroke="#7e5d41" />
    <path d="M65 34Q66 13 53 9Q52 24 65 34ZM73 27Q91 30 104 17Q88 12 73 27Z" fill="#79a75e" stroke="#3c714c" />
    <ellipse cx="96" cy="45" rx="4" ry="5" transform="rotate(-27 96 45)" fill="#edcb94" stroke="#7e5d41" />
    <ellipse cx="114" cy="57" rx="4" ry="5" transform="rotate(-27 114 57)" fill="#edcb94" stroke="#7e5d41" />
  </g>,
  "lembar-kertas": <g {...RINGKAS} stroke="#8a9baa">
    <path d="M39 15H88L102 28V86H39Z" fill="#dce6ed" />
    <path d="M27 13H77L94 29V82H27Z" fill="#fffdf6" />
    <path d="M77 13V29H94" fill="#e0e9f1" />
  </g>,
  "potongan-kain": <g {...RINGKAS} stroke="#8c4793">
    <path d="M22 23L103 17 101 29 112 38 103 49 112 60 101 71 104 83 25 88 27 77 17 68 26 57 17 46 25 35Z" fill="#d892d9" />
    <path d="M32 36L92 29M35 48L92 41M35 60L92 53M36 72L92 65" fill="none" stroke="#bb65c4" strokeWidth="2" />
  </g>,
  "taplak-meja": <g {...RINGKAS}>
    <path d="M28 49V89M101 49V89" fill="none" stroke="#815332" strokeWidth="7" />
    <path d="M24 26H106L118 57 106 72 93 63 80 72 66 63 52 72 38 63 25 72 12 57Z" fill="#ea8e8d" stroke="#9b494f" />
    <path d="M19 53H111M39 28L34 51M64 28V51M91 28L95 51" fill="none" stroke="#fff0de" strokeWidth="3" />
  </g>,
  "rak-buku-kayu": <g {...RINGKAS}>
    <rect x="28" y="12" width="75" height="77" rx="4" fill="#b08057" stroke="#735033" />
    <path d="M35 23H96V48H35ZM35 55H96V78H35Z" fill="#764d38" />
    <path d="M45 47V29H53V47M57 47V25H66V47M73 47L68 31 75 29 81 47M67 78V61H75V78M79 78V58H87V78" fill="#f4b457" stroke="#f4b457" strokeLinejoin="round" />
    <path d="M35 49H96M35 79H96" stroke="#e4b983" strokeWidth="3" />
  </g>,
  "selang-air": <g {...RINGKAS}>
    <path d="M111 73H61C20 73 17 28 54 26C83 23 94 58 68 64C43 70 36 42 55 38C65 36 71 45 66 51" fill="none" stroke="#286249" strokeWidth="12" />
    <path d="M111 73H61C20 73 17 28 54 26C83 23 94 58 68 64C43 70 36 42 55 38C65 36 71 45 66 51" fill="none" stroke="#6db887" strokeWidth="7" />
    <path d="M105 67H117V79H105Z" fill="#e4b35d" stroke="#735033" strokeWidth="2" />
  </g>,
  "handuk-lipat": <g {...RINGKAS}>
    <path d="M23 64L44 37 109 50 91 80 23 71Z" fill="#79b8dd" stroke="#406e97" />
    <path d="M24 63L85 73 103 49 44 38Z" fill="#a1d7ed" stroke="#406e97" />
    <path d="M28 66L87 76M48 43L93 51M43 49L88 57M38 56L83 64" fill="none" stroke="#e3f7fc" strokeWidth="2" />
  </g>,
  "gumpalan-kapas": <g {...RINGKAS} stroke="#879aa8">
    <path d="M29 69Q16 55 30 43Q31 30 46 31Q56 16 70 28Q86 21 94 35Q108 38 104 54Q119 70 100 78Q91 88 74 83Q60 92 46 81Q34 83 29 69Z" fill="#f3f8fb" />
    <path d="M32 58Q38 49 49 54M51 39Q61 32 70 41M71 63Q80 53 92 60M47 73Q54 66 62 73" fill="none" stroke="#b9cbd4" strokeWidth="2" />
  </g>,
  "piring-kaca": <g {...RINGKAS} stroke="#347e95">
    <ellipse cx="65" cy="55" rx="47" ry="29" fill="#d2eef3" />
    <ellipse cx="65" cy="52" rx="37" ry="20" fill="#e7f8fb" stroke="#73b4c6" />
    <path d="M38 51Q48 38 68 38M77 64Q91 62 96 53" fill="none" stroke="#fff" strokeWidth="4" />
  </g>,
  "pagar-kayu": <g {...RINGKAS} stroke="#815332">
    <rect x="8" y="46" width="114" height="11" rx="2" fill="#bd864f" />
    <rect x="8" y="68" width="114" height="10" rx="2" fill="#bd864f" />
    {[15, 43, 71, 99].map((x) => <g key={x} transform={`translate(${x} 0)`}>
      <path d="M0 87V32L8 21L16 32V87Z" fill="#dfa969" />
      <path d="M7 33Q4 43 7 55T7 79" fill="none" stroke="#a67145" strokeWidth="1.5" />
      <circle cx="12" cy="50" r="1.3" fill="#815332" stroke="none" />
      <circle cx="12" cy="72" r="1.3" fill="#815332" stroke="none" />
    </g>)}
  </g>,
  "sedotan-plastik": <g {...RINGKAS}>
    <path d="M32 85L60 45Q65 37 71 34L104 16" fill="none" stroke="#a63162" strokeWidth="17" />
    <path d="M32 85L60 45Q65 37 71 34L104 16" fill="none" stroke="#f282a5" strokeWidth="12" />
    <path d="M34 80L57 47M76 35L99 22" fill="none" stroke="#ffd1de" strokeWidth="3" />
    <path d="M58 48l7 5M62 43l7 6M66 39l7 6M71 36l5 6" fill="none" stroke="#ba3c73" strokeWidth="2" />
    <ellipse cx="104" cy="16" rx="3.5" ry="7" transform="rotate(-30 104 16)" fill="#712646" stroke="#f8a7be" strokeWidth="1.8" />
  </g>,
  "lensa-teropong": <g {...RINGKAS}>
    <path d="M17 66L31 58L40 73L26 81Z" fill="#4e6e8c" stroke="#254355" />
    <path d="M28 57L75 24L98 58L44 79Q36 78 28 57Z" fill="#6289a8" stroke="#335772" />
    <path d="M36 56L70 34" fill="none" stroke="#b4d0e0" strokeWidth="4" />
    <path d="M53 71L51 91M53 71L75 90" fill="none" stroke="#496880" strokeWidth="4" />
    <ellipse cx="90" cy="41" rx="23" ry="30" transform="rotate(-33 90 41)" fill="#315d78" stroke="#234456" />
    <ellipse cx="92" cy="39" rx="17" ry="24" transform="rotate(-33 92 39)" fill="#b2eaf6" stroke="#ecfbfd" strokeWidth="2" />
    <path d="M84 22Q80 30 86 39M98 50L103 55" fill="none" stroke="#fff" strokeWidth="3.5" />
  </g>,
  "dinding-pondok-kayu": <g {...RINGKAS} stroke="#785135">
    <path d="M19 41H112V91H19Z" fill="#dfa164" />
    <path d="M19 41H112V51H19Z" fill="#bc8555" stroke="none" />
    <path d="M31 49V91M45 49V91M86 49V91M99 49V91" fill="none" />
    <path d="M54 91V58H77V91" fill="#925935" />
    <path d="M65 61V87M36 59Q39 64 37 72M92 54Q96 66 92 79M105 56V80" fill="none" stroke="#b5784a" strokeWidth="1.7" />
    <circle cx="71" cy="75" r="2.4" fill="#efd48c" stroke="none" />
    <path d="M7 44L64 13L122 43L109 48L64 26L21 49Z" fill="#b3764d" />
    <path d="M23 36L64 13L105 35" fill="none" stroke="#e4aa75" strokeWidth="3" />
  </g>,
  "kancing-baju": <g {...RINGKAS}>
    <circle cx="65" cy="50" r="43" fill="#dba077" stroke="#804b40" />
    <circle cx="65" cy="50" r="34" fill="#edb38a" stroke="#ac6955" />
    <path d="M36 32Q48 19 65 17" fill="none" stroke="#f8d2b2" strokeWidth="4" />
    <path d="M91 69Q79 83 64 83" fill="none" stroke="#bd785d" strokeWidth="4" />
    {[[55, 40], [75, 40], [55, 60], [75, 60]].map(([x, y]) => (
      <circle key={x + "," + y} cx={x} cy={y} r="6" fill="#644536" stroke="#f8d2b2" strokeWidth="1.7" />
    ))}
  </g>,
  "otot-lengan": <g {...RINGKAS}>
    <path d="M42 13Q59 5 72 17Q79 24 76 37L73 55Q75 61 84 70L104 79Q110 84 103 92L99 94Q83 91 69 80Q57 70 51 58Q44 48 45 39L39 25Q36 17 42 13Z" fill="#f7e9de" stroke="#ab8475" />
    <path d="M49 16Q60 15 64 26Q62 42 59 55Q52 48 52 33Z" fill="#dd958b" stroke="#a65458" />
    <path d="M66 19Q77 25 73 38L67 58L62 55Q67 39 66 19Z" fill="#c27079" stroke="#954b58" />
    <path d="M55 24Q59 32 55 44M70 28Q70 43 65 51" fill="none" stroke="#ffe2d5" strokeWidth="2" />
  </g>,
  "otot-betis": <g {...RINGKAS}>
    <path d="M45 10Q63 6 78 14Q80 24 79 35Q77 56 66 70L62 79Q65 86 78 87L92 86Q101 88 98 93Q95 98 70 97L52 96Q43 94 45 85L51 69Q47 56 45 47Q39 23 45 10Z" fill="#f7e9de" stroke="#ab8475" />
    <path d="M64 19Q75 15 77 29Q77 47 69 61Q65 68 62 70Q61 61 65 48Q66 35 64 19Z" fill="#c27079" stroke="#954b58" />
    <path d="M55 19Q63 20 64 32Q63 50 59 59Q53 54 51 37Q50 26 55 19Z" fill="#dd958b" stroke="#a65458" />
    <path d="M70 27Q73 38 67 52M56 28Q56 39 59 47" fill="none" stroke="#ffe2d5" strokeWidth="2" />
  </g>,
  "paru-paru": <g {...RINGKAS} stroke="#9d5260">
    <path d="M48 28C33 31 26 53 24 74Q22 87 33 88Q50 86 60 74V39Q57 25 48 28Z" fill="#f4a4a5" />
    <path d="M82 28C97 31 104 53 106 74Q108 87 97 88Q80 86 70 74V39Q73 25 82 28Z" fill="#f49a9e" />
    <path d="M65 13V45M65 43L49 56M65 43L81 56" fill="none" strokeWidth="9" />
    <path d="M65 13V45M65 43L49 56M65 43L81 56" fill="none" stroke="#ffddc4" strokeWidth="5" />
    <path d="M49 56L39 65M49 56L47 70M81 56L91 65M81 56L83 70" fill="none" stroke="#c66d78" />
  </g>,
  "otak": <g {...RINGKAS} stroke="#a65370">
    <path d="M26 64Q18 56 25 47Q20 35 32 31Q34 19 46 20Q57 9 70 19Q82 16 89 25Q103 26 103 37Q114 43 107 55Q113 68 100 73Q94 84 81 79L77 89Q73 92 70 86L68 77Q56 80 48 73Q33 77 26 64Z" fill="#f1a7b3" />
    <path d="M35 62Q45 52 56 61M27 47Q36 51 44 44Q47 33 59 37M46 20Q45 27 49 31M58 20Q69 27 64 38Q58 43 61 52M79 26Q73 30 77 41Q88 37 94 46M72 51Q80 57 90 51M54 71Q62 64 73 70M81 79Q94 73 89 63Q99 65 107 55" fill="none" stroke="#bb657d" />
  </g>,
  "gelembung-sabun": <g {...RINGKAS}>
    <path d="M35 80L47 60" fill="none" stroke="#a35c83" strokeWidth="6" />
    <ellipse cx="51" cy="54" rx="11" ry="8" transform="rotate(-62 51 54)" fill="#e8fbff" stroke="#a35c83" strokeWidth="4" />
    <path d="M62 43L69 39M65 57L73 54" fill="none" stroke="#8ac2cd" />
    <circle cx="89" cy="32" r="18" fill="#e0f8fd" stroke="#70aebf" />
    <path d="M80 26Q85 20 90 22M98 36L94 42" fill="none" stroke="#fff" strokeWidth="3" />
    <circle cx="110" cy="58" r="10" fill="#e1f6ee" stroke="#7db9ba" />
    <path d="M106 55L109 52" fill="none" stroke="#fff" strokeWidth="2" />
    <circle cx="85" cy="68" r="7" fill="#f5e7f7" stroke="#b0a0cc" />
  </g>,
  "lebah-di-bunga": <g {...RINGKAS}>
    <path d="M71 94Q65 77 70 61M69 83Q50 74 49 87Q58 94 69 83M69 88Q82 72 91 80Q84 91 69 88Z" fill="#83b95e" stroke="#417850" />
    <path d="M65 58C50 39 37 58 52 68C33 75 49 90 65 77C68 95 87 85 79 71C97 67 90 49 73 62C75 47 59 47 65 58Z" fill="#eca9d1" stroke="#a95e88" />
    <circle cx="68" cy="69" r="10" fill="#ffd66c" stroke="#a96128" />
    <path d="M69 45Q55 31 68 22Q81 24 81 40Q79 22 89 19Q102 24 92 41Z" fill="#d9f0f4" stroke="#6997a4" />
    <path d="M79 54L75 64M87 55L84 64" fill="none" stroke="#725033" />
    <ellipse cx="81" cy="46" rx="19" ry="11" fill="#f9bd46" stroke="#725033" />
    <path d="M80 36Q74 45 79 55M91 39Q85 46 90 54" fill="none" stroke="#725033" strokeWidth="4" />
    <circle cx="65" cy="49" r="8" fill="#f4aa3a" stroke="#725033" />
    <path d="M62 42L56 36M66 42L63 35" fill="none" stroke="#725033" />
    <circle cx="63" cy="48" r="2" fill={INK} stroke="none" />
  </g>,
  "madu-di-sarang": <g {...RINGKAS}>
    {[[27, 23], [57, 23], [87, 23], [42, 49], [72, 49], [102, 49], [27, 75], [57, 75], [87, 75]].map(([x, y]) => (
      <g key={x + "," + y} transform={`translate(${x} ${y})`}>
        <path d="M-15-8.5L0-17L15-8.5V8.5L0 17L-15 8.5Z" fill="#f9c962" stroke="#a66c2e" />
        <path d="M-10-6L0-12L10-6V6L0 12L-10 6Z" fill="#d68a2d" stroke="#c27a2b" strokeWidth="1.5" />
        <path d="M-8 3Q0-1 8 3L0 11Z" fill="#f4a93c" stroke="none" />
        <path d="M-6-4L0-8L4-5" fill="none" stroke="#ffe5a0" strokeWidth="2" />
      </g>
    ))}
  </g>,
  "kupu-enam-kaki": <Serangga kupu />,
  "lalat-enam-kaki": <Serangga kupu={false} />,
  "lebah-enam-kaki": <Lebah />,
  "kunang-kunang": <KunangKunang />,
  "televisi-menyala": <Televisi nyala />,
  "televisi-mati": <Televisi nyala={false} />,
};

const PREFIX = "qc-jenjang-";
export const ILUSTRASI_QC_JENJANG_IDS = [
  ...Object.keys(objectArt), ...DATA_WADAH, ...Object.keys(JEJAK_FOSIL), "fosil-ambar", ...Object.keys(JENIS_BATU),
].map(id => PREFIX + id);

/** Artwork for curriculum cards. The parent supplies the view box and localized accessible label. */
export function IlustrasiQcJenjang({ id }: { id: string }) {
  const scene = id.slice(PREFIX.length);
  if (Object.prototype.hasOwnProperty.call(objectArt, scene)) return objectArt[scene];
  if (DATA_WADAH.includes(scene)) return <Wadah id={scene} />;
  if (scene.startsWith("fosil-")) return <Fosil id={scene} />;
  if (Object.prototype.hasOwnProperty.call(JENIS_BATU, scene)) return <Batuan id={scene} />;
  return null;
}
