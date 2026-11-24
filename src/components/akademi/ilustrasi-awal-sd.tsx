import { ILUSTRASI_QC_JENJANG_IDS, IlustrasiQcJenjang } from "./ilustrasi-qc-jenjang";
import { HurufSimetri } from "./huruf-simetri";

const OBJEK = ["ayam-utuh", "katak-utuh", "tikus-utuh", "belut", "burung-unta", "air-gelas", "plastik-bening", "kotak-pensil-bening", "kotak-pensil-logam", "tirai-tipis", "kacang-hijau", "kacang-merah", "meja", "bot-karet", "semangka-utuh", "karang", "injak-karang", "peluit", "tunas-timur", "tunas-atas", "tunas-barat", "gula-halus", "kulkas", "freezer"];
const KATA = ["KODE", "KATA", "BOLA", "SAPI", "HOBI", "HUJAN", "BATU", "MEJA", "TAAT", "TAPI", "TOKO", "MATA", "AHA", "ADA", "API", "AKU"];
export const ILUSTRASI_AWAL_SD_IDS = [...ILUSTRASI_QC_JENJANG_IDS, ...OBJEK.map((x) => `awal-${x}`), ...[..."ABCDEFGHIJKLMNOPQRSTUVWXYZ", ...KATA].map((x) => `awal-huruf-${x.toLowerCase()}`)];
const INK = "#16364b";

function LatarCahaya() {
  return <><rect x="17" y="14" width="96" height="73" rx="3" fill="#ffe4a3" /><path d="M17 51H113M65 14V87" stroke="#84bf8a" strokeWidth="18" /></>;
}
function Karang() {
  return <g fill="none" stroke="#e87968" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"><path d="M63 88V30M63 61L36 43V20M36 37L19 26M63 70L92 52V23M92 44L110 32M63 42L78 27V12" /><path d="M41 91H91" stroke="#bcaa88" strokeWidth="12" /></g>;
}

/** Source-native objects that expose the feature actually being assessed. */
export function IlustrasiAwalSD({ id }: { id: string }) {
  if (ILUSTRASI_QC_JENJANG_IDS.includes(id)) return <IlustrasiQcJenjang id={id} />;
  if (id.startsWith("huruf-")) return <HurufSimetri kata={id.slice(6).toUpperCase()} />;
  if (id === "ayam-utuh") return <g stroke={INK} strokeWidth="2.5" strokeLinejoin="round">
    <path d="M48 67V88M79 67V88M48 88L37 94M48 88V96M48 88L57 94M79 88L69 94M79 88V96M79 88L90 94" fill="none" stroke="#c6892e" strokeWidth="4" />
    <path d="M38 54L17 23 17 50 7 44 23 67Z" fill="#c97745" /><ellipse cx="58" cy="52" rx="35" ry="25" fill="#f7dfb1" /><path d="M44 40Q71 32 74 55Q58 65 42 49" fill="#d5a676" />
    <path d="M79 33L81 11Q89 3 96 12L99 39" fill="#f8dfaf" /><path d="M80 11Q77-1 84 4Q90-5 94 5Q104-1 99 14" fill="#e36351" /><circle cx="93" cy="23" r="3" fill={INK} /><path d="M100 23L116 29 100 33Z" fill="#efb443" /><path d="M97 34Q107 49 97 50Q88 48 94 35" fill="#e36351" />
  </g>;
  if (id === "katak-utuh") return <g stroke="#366d3b" strokeWidth="2.5" strokeLinejoin="round">
    {/* Top view: four separate limbs, all visible. */}
    <path d="M44 43L21 34 15 17M86 43L109 34 115 17M44 70L23 81 10 68M86 70L107 81 120 68" fill="none" stroke="#61ae58" strokeWidth="12" strokeLinecap="round" />
    {[[15,17],[115,17],[10,68],[120,68]].map(([x,y]) => <path key={`${x}-${y}`} d={`M${x} ${y}l-7-6m7 6v-9m0 9 7-6`} fill="none" stroke="#366d3b" strokeWidth="3" strokeLinecap="round" />)}
    <ellipse cx="65" cy="57" rx="27" ry="31" fill="#74bb62" /><ellipse cx="65" cy="38" rx="32" ry="22" fill="#8cca69" /><circle cx="45" cy="21" r="10" fill="#98d777" /><circle cx="85" cy="21" r="10" fill="#98d777" /><circle cx="45" cy="20" r="5" fill="#fff" /><circle cx="85" cy="20" r="5" fill="#fff" /><circle cx="45" cy="19" r="2.5" fill={INK} /><circle cx="85" cy="19" r="2.5" fill={INK} /><path d="M48 40Q65 52 82 40" fill="none" /><ellipse cx="65" cy="68" rx="13" ry="15" fill="#b9db89" stroke="none" />
  </g>;
  if (id === "tikus-utuh") return <g stroke="#796f79" strokeWidth="2.5" strokeLinecap="round">
    <path d="M65 77Q69 103 95 94Q120 86 108 70" fill="none" stroke="#d99da5" strokeWidth="5" />
    {[[41,46],[89,46],[42,73],[88,73]].map(([x,y],i) => <path key={i} d={`M${x} ${y}l${x<65?-15:15} 6m0 0 0 7m0-7 ${x<65?-6:6} 4`} fill="none" stroke="#d99da5" strokeWidth="5" />)}
    <ellipse cx="65" cy="58" rx="25" ry="30" fill="#b5adb7" /><path d="M44 35Q47 12 65 7Q83 12 86 35L78 44H52Z" fill="#c3bac5" /><circle cx="43" cy="24" r="13" fill="#c3bac5" /><circle cx="87" cy="24" r="13" fill="#c3bac5" /><circle cx="43" cy="24" r="8" fill="#eac0c8" stroke="none" /><circle cx="87" cy="24" r="8" fill="#eac0c8" stroke="none" /><circle cx="57" cy="24" r="2.5" fill={INK} /><circle cx="73" cy="24" r="2.5" fill={INK} /><path d="M61 9H69L65 14Z" fill="#cc8b9a" /><path d="M56 12L38 6M56 15H35M74 12L92 6M74 15H95" strokeWidth="1.5" />
  </g>;
  if (id === "belut") return <g><path d="M111 79Q68 94 40 73Q13 52 39 44Q60 39 81 53Q105 65 108 42Q110 19 88 19" fill="none" stroke="#624736" strokeWidth="18" strokeLinecap="round" /><path d="M108 78Q67 86 43 69Q22 53 42 50Q60 46 80 59" fill="none" stroke="#a88756" strokeWidth="6" strokeLinecap="round" /><ellipse cx="85" cy="20" rx="17" ry="10" fill="#70513d" /><circle cx="77" cy="16" r="2" fill="#fff" /><circle cx="77" cy="16" r="1" fill={INK} /><path d="M69 23H81M88 24Q86 29 83 27" fill="none" stroke="#d5b786" strokeWidth="2" /></g>;
  if (id === "burung-unta") return <g stroke={INK} strokeWidth="2.5" strokeLinejoin="round"><path d="M53 65L49 92 40 96M76 65L80 92 91 96" fill="none" stroke="#c58e7c" strokeWidth="5" /><ellipse cx="57" cy="51" rx="34" ry="24" fill="#344a58" /><path d="M25 43L9 31 11 55 27 63M36 42Q61 22 78 45Q62 64 38 61" fill="#f7f2df" /><path d="M85 52Q100 43 93 29Q85 8 100 10" fill="none" stroke="#dba99c" strokeWidth="9" /><ellipse cx="101" cy="12" rx="11" ry="8" fill="#e9c3ac" /><circle cx="103" cy="10" r="2" fill={INK} /><path d="M111 12L122 17 110 18Z" fill="#daa352" /></g>;
  if (id === "air-gelas") return <><LatarCahaya /><path d="M35 10H95L87 90H43Z" fill="#e8faff" fillOpacity=".25" stroke="#4b8da8" strokeWidth="3" /><path d="M39 43Q65 49 91 43L87 88H43Z" fill="#89d6f1" fillOpacity=".42" /><ellipse cx="65" cy="43" rx="26" ry="5" fill="#b8e7f5" fillOpacity=".45" stroke="#72bad1" strokeWidth="1.5" /><path d="M48 20L51 74M83 20L81 34" stroke="#fff" strokeWidth="4" strokeLinecap="round" /></>;
  if (id === "plastik-bening") return <><LatarCahaya /><path d="M27 8L108 17 99 94 17 80Z" fill="#dff7ff" fillOpacity=".18" stroke="#529bb0" strokeWidth="2.5" /><path d="M30 14L35 74 22 76M101 23L90 84 73 88M29 33L52 29M75 20L88 44" fill="none" stroke="#fff" strokeWidth="3" opacity=".85" /></>;
  if (id === "kotak-pensil-bening" || id === "kotak-pensil-logam") return <><rect x="15" y="24" width="101" height="59" rx="9" fill="#fff8df" stroke={INK} strokeWidth="2.5" />{[37,51,65].map((y,i) => <g key={y}><path d={`M27 ${y}H94l10 5-10 5H27Z`} fill={["#e57769","#6cb276","#f0c65a"][i]} /><path d={`M94 ${y}l10 5-10 5Z`} fill="#d6b78a" /></g>)}<rect x="15" y="24" width="101" height="59" rx="9" fill={id.endsWith("bening")?"#c4eefa":"#aebdca"} fillOpacity={id.endsWith("bening")?.25:1} stroke="#59869d" strokeWidth="2.5" /><path d="M17 32H113M32 73L80 29" stroke={id.endsWith("bening")?"#fff":"#e8f0f5"} strokeWidth={id.endsWith("bening")?3:7} /><rect x="106" y="27" width="7" height="12" rx="2" fill="#52748b" /></>;
  if (id === "tirai-tipis") return <><LatarCahaya /><path d="M18 9H112V92Q102 86 92 92T72 92 52 92 32 92L18 92Z" fill="#fff3e8" fillOpacity=".75" stroke="#d6b5aa" strokeWidth="2" />{[30,48,66,84,102].map(x=><path key={x} d={`M${x} 12Q${x-6} 46 ${x} 88`} fill="none" stroke="#d6b5aa" strokeWidth="2" opacity=".6" />)}<path d="M10 8H120" stroke={INK} strokeWidth="4" strokeLinecap="round" /></>;
  if (id === "kacang-hijau" || id === "kacang-merah") return <g fill={id.endsWith("hijau")?"#619c43":"#a73e42"} stroke={id.endsWith("hijau")?"#3f7437":"#772b32"} strokeWidth="2">{[[35,33,-25],[73,25,25],[99,54,-20],[60,65,40],[27,75,15]].map(([x,y,a])=><g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${a})`}>{id.endsWith("hijau")?<ellipse rx="10" ry="14" />:<path d="M-6-17C9-20 19-10 15 4C11 20-4 23-13 13C-19 7-17 1-11 0C-5-1-3-8-6-17Z" />}<path d={id.endsWith("hijau")?"M-4-4Q-1 0-4 4":"M-8 0Q-2 4-7 9"} fill="none" stroke="#f3e0bb" strokeWidth="3" strokeLinecap="round" /></g>)}</g>;
  if (id === "meja") return <g stroke="#704d35" strokeWidth="3" strokeLinejoin="round"><path d="M25 49V88H34V54M97 49V88H106V49M42 37V76H50V42M84 36V74H92V41" fill="#ae7d52" /><path d="M12 40L35 20H117L106 50H12Z" fill="#d8a56c" /><path d="M12 40H106L117 20V31L106 60H12Z" fill="#b58050" /><path d="M12 40L35 20H117L106 50H12Z" fill="#e0b47b" /></g>;
  if (id === "bot-karet") return <g stroke="#48613e" strokeWidth="2.5" strokeLinejoin="round"><path d="M20 12H52L50 65Q60 67 63 79V89H11V75L20 64Z" fill="#8bbd55" /><path d="M75 10H107L105 63Q117 66 119 79V89H65V75L75 62Z" fill="#a2cc65" /><path d="M19 18H51M74 17H106M12 84H62M66 84H118" fill="none" strokeWidth="5" /><path d="M31 30V58M86 28V54" stroke="#d9ecb5" strokeWidth="5" strokeLinecap="round" /></g>;
  if (id === "semangka-utuh") return <g><ellipse cx="65" cy="53" rx="52" ry="36" fill="#77b44e" stroke="#367b3f" strokeWidth="3" /><path d="M34 24Q13 50 33 82M49 19Q31 52 49 87M65 17Q51 52 65 89M81 19Q74 53 82 87M96 25Q98 53 98 80" fill="none" stroke="#398945" strokeWidth="7" /><path d="M111 38Q124 30 116 18" fill="none" stroke="#708a45" strokeWidth="4" /></g>;
  if (id === "karang" || id === "injak-karang") return <><rect width="130" height="100" rx="10" fill="#d5eef6" /><Karang />{id.startsWith("injak")&&<><path d="M35 1H56L59 24 91 35Q102 43 92 49L51 37 32 30Z" fill="#e5b298" stroke="#aa785f" strokeWidth="2" /><path d="M42 40L34 52M83 53L92 62M53 44L57 55" stroke="#d34b43" strokeWidth="3" strokeLinecap="round" /></>}</>;
  if (id === "kulkas" || id === "freezer") return (
    <g stroke={INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="37" y="8" width="56" height="83" rx="7" fill="#e1eff5" />
      <path d="M39 40H91M45 91V95M86 91V95" fill="none" />
      <path d="M83 51V66" fill="none" stroke="#627f8b" />
      {id === "freezer" ? <>
        <path d="M38 15Q38 9 44 9H86Q92 9 92 15V39H38Z" fill="#8bc8ee" />
        <path d="M64 15V33M56 19L72 29M56 29L72 19" fill="none" stroke="#f3fbff" strokeWidth="2.5" />
      </> : <path d="M83 21V31" fill="none" stroke="#627f8b" />}
      <path d="M46 49V81" fill="none" stroke="#f4fbff" />
    </g>
  );
  if (id === "peluit") return <g stroke="#4c697c" strokeWidth="3"><path d="M36 21H81V41H113V60H82Q72 87 48 78Q17 68 23 43Z" fill="#b6c9d6" /><circle cx="53" cy="52" r="19" fill="#e3ecf1" /><rect x="71" y="31" width="16" height="8" rx="2" fill="#547083" /><path d="M111 43H119V58H111" fill="#8aa9bd" /><circle cx="27" cy="69" r="8" fill="none" /><path d="M21 74Q5 89 25 96Q45 101 42 88" fill="none" stroke="#d88855" /></g>;
  if (id.startsWith("tunas-")) {
    const x=id.endsWith("timur")?36:id.endsWith("barat")?94:65;
    return <><path d="M21 91H109" stroke="#b99a6b" strokeWidth="8" strokeLinecap="round" /><path d={`M65 88V60Q65 39 ${x} 26`} fill="none" stroke="#4a9145" strokeWidth="6" /><path d="M64 69Q36 41 29 61Q39 76 64 76M67 55Q91 36 101 55Q88 68 67 61" fill="#77b85b" stroke="#4a9145" strokeWidth="2" /><g transform={`translate(${x} 24) rotate(${id.endsWith("timur")?-50:id.endsWith("barat")?50:0})`}><ellipse rx="11" ry="17" fill="#91bd4d" stroke="#4a9145" strokeWidth="2" /><path d="M-7 7L0-8 7 7M-7 7L0 15 7 7" fill="none" stroke="#598f36" strokeWidth="2" /></g></>;
  }
  if (id === "gula-halus") return <g><ellipse cx="62" cy="81" rx="47" ry="9" fill="#d5b38a" /><path d="M21 77Q37 63 45 50Q57 30 70 48L102 78Q63 90 21 77Z" fill="#fffdf4" stroke="#d2cbbc" strokeWidth="2" />{[[45,66],[55,48],[75,69],[63,75],[81,76],[54,60]].map(([x,y])=><circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill="#d9d2c1" />)}<path d="M82 44L114 12" stroke="#96aab5" strokeWidth="8" strokeLinecap="round" /><ellipse cx="79" cy="47" rx="13" ry="8" transform="rotate(-38 79 47)" fill="#e0ebf0" stroke="#7e939f" strokeWidth="2" /></g>;
  return null;
}
