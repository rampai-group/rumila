import type { CSSProperties, ReactNode } from "react";

const INK = "#17364d";
const ROOT = "#926445";
const GREEN = "#429a61";

function AkarSerabut() {
  return <>
    <path d="M0 44H130V100H0Z" fill="#f6edd2" />
    <path d="M17 44H112" stroke="#b9a578" strokeWidth="2" strokeDasharray="4 4" />
    <path d="M61 43Q54 25 36 13M63 43Q60 20 60 8M66 43Q74 20 91 14M67 43Q88 36 102 29" fill="none" stroke={GREEN} strokeWidth="5" />
    <path d="M60 42Q46 57 32 84M62 44Q52 69 49 93M64 45Q65 64 59 89M65 44Q71 62 71 94M67 43Q76 62 92 86M69 43Q92 56 104 72M48 64L39 67M54 69L58 76M79 66L89 70M93 60L96 53" fill="none" stroke={ROOT} strokeWidth="2.5" />
  </>;
}

function Batang({ bambu, pohon }: { bambu: boolean; pohon: boolean }) {
  if (pohon) return <>
    <path d="M41 91Q54 72 52 50L52 12H77L76 36 99 18 106 27 77 52 79 68 94 91Z" fill="#b68053" stroke="#754d32" strokeWidth="3" />
    <path d="M62 15L60 62Q60 76 56 85M71 49L70 81M82 42L98 27" fill="none" stroke="#e7b98b" strokeWidth="3" />
    <ellipse cx="64.5" cy="12" rx="12.5" ry="5" fill="#ebc59c" stroke="#754d32" strokeWidth="2" />
  </>;
  if (bambu) return <>
    <path d="M54 12Q67 7 80 12L76 87Q62 93 49 86Z" fill="#8bc25f" stroke="#306b39" strokeWidth="3" />
    <ellipse cx="67" cy="12" rx="13" ry="5" fill="#dfedac" stroke="#306b39" strokeWidth="2.5" />
    <ellipse cx="67" cy="12" rx="8.5" ry="2.5" fill="#567941" />
    <path d="M53 34Q65 39 79 34M51 59Q64 65 77 59M50 82Q62 87 76 83M61 21L57 79" fill="none" stroke="#306b39" strokeWidth="3" />
  </>;
  return <>
    <path d="M60 89Q63 75 63 57L61 13H70Q72 49 74 68L72 89Z" fill="#79b876" stroke="#2b7151" strokeWidth="3" />
    <path d="M64 48L42 31 46 25 65 38M72 65L91 46 96 51 74 75" fill="#79b876" stroke="#2b7151" strokeWidth="3" />
    <ellipse cx="65.5" cy="13" rx="4.5" ry="2.6" fill="#ceeab7" stroke="#2b7151" strokeWidth="1.8" />
  </>;
}

function Metamorfosis({ telur }: { telur: boolean }) {
  if (telur) return <>
    <path d="M22 74Q32 30 104 20Q99 78 34 82L18 90" fill="#81bf6a" stroke="#396e43" strokeWidth="3" />
    <path d="M30 79Q53 61 91 34M47 64L45 46M61 56L77 58" fill="none" stroke="#396e43" strokeWidth="2" />
    <g fill="#fff8d2" stroke="#826c45" strokeWidth="1.4">
      <ellipse cx="64" cy="45" rx="5.5" ry="7" /><ellipse cx="74" cy="45" rx="5.5" ry="7" />
      <ellipse cx="68" cy="55" rx="5.5" ry="7" /><ellipse cx="59" cy="55" rx="5.5" ry="7" />
    </g>
  </>;
  return <>
    <path d="M19 23Q51 17 106 24M78 21L95 9" stroke="#895635" strokeWidth="6" fill="none" />
    <path d="M62 22L64 36C43 46 49 76 67 87C80 77 89 54 67 36L65 22" fill="#8aaa50" stroke="#456736" strokeWidth="3" />
    <path d="M55 48Q66 53 76 46M53 58Q67 65 80 56M55 69Q67 75 76 68M63 38Q56 55 61 72" fill="none" stroke="#53793d" strokeWidth="2" />
  </>;
}

function Bebek({ menetas }: { menetas: boolean }) {
  return <>
    {!menetas && <path d="M29 70Q49 77 71 66T106 69M26 77Q48 84 65 78T105 78" fill="none" stroke="#69bbd5" strokeWidth="3" />}
    {menetas && <path d="M41 70Q37 25 65 20Q93 22 94 66Z" fill="#f4f8eb" stroke="#758b83" strokeWidth="3" />}
    <path d="M37 60Q48 45 68 48L81 57 87 56Q104 60 100 67Q88 76 70 73Q46 83 37 60Z" fill="#f3cb61" stroke="#b77a33" strokeWidth="2.8" />
    <circle cx="71" cy={menetas ? 44 : 45} r="16" fill="#f9d878" stroke="#b77a33" strokeWidth="2.8" />
    <path d="M82 46Q103 41 108 48Q103 56 85 54Z" fill="#f09946" stroke="#a86330" strokeWidth="2.4" />
    <circle cx="76" cy="41" r="2.8" fill={INK} />
    {!menetas && <path d="M47 62Q53 55 67 63Q56 73 47 62Z" fill="#eab551" />}
    {menetas && <path d="M39 60L49 68 57 59 67 69 76 61 86 69 95 60Q92 89 67 93Q41 90 39 60Z" fill="#f8f9ea" stroke="#758b83" strokeWidth="3" />}
  </>;
}

const GLASS: Record<string, string> = {
  lup: "M32 50a30 30 0 1 0 60 0a30 30 0 1 0-60 0Z",
  gelas: "M29 19H101L92 85H38Z",
  goggle: "M25 31Q36 27 57 34L62 49H68L73 34Q92 27 105 31V56Q104 72 87 74Q74 73 70 62H60Q56 75 43 74Q25 72 25 56Z",
  es: "M32 30L66 17 100 29V69L66 85 32 70Z",
  bohlam: "M48 79V71Q33 61 33 44A32 32 0 0 1 97 44Q97 61 82 71V79Z",
  plastik: "M27 25L100 21 103 77 30 81Z",
  jendela: "M25 18H105V84H25Z",
  toples: "M46 28V19H84V28Q97 36 97 48V79Q97 86 90 86H40Q33 86 33 79V48Q33 35 46 28Z",
  kacamata: "M27 31H59L63 45H68L73 31H103V56Q100 70 87 70Q72 70 68 56H62Q56 70 40 70Q27 69 27 56Z",
  air: "M29 19H101L92 85H38Z",
  gelembung: "M34 50a31 31 0 1 0 62 0a31 31 0 1 0-62 0Z",
};

const OPAQUE: Record<string, { bentuk: string; isi: string; detail: string }> = {
  wajan: { bentuk: "M26 48Q30 28 67 29Q93 31 99 45L116 38 121 49 100 56Q93 76 64 77Q32 75 26 48Z", isi: "#677783", detail: "M38 53Q65 65 88 53" },
  kaleng: { bentuk: "M36 28Q64 14 94 28V77Q66 91 36 77Z", isi: "#a3b3bf", detail: "M36 29Q64 42 94 29M39 48H91M39 68H91" },
  batu: { bentuk: "M26 65L38 38 57 28 80 30 103 55 94 75 47 79Z", isi: "#87929a", detail: "M57 28L67 51 103 55M67 51L47 79" },
  cangkir: { bentuk: "M31 27Q58 19 91 27V33H99Q115 32 115 49Q113 63 94 66L89 78Q59 89 40 76Z", isi: "#d17d73", detail: "M33 27Q63 39 91 27M95 41Q105 39 105 50Q103 56 95 57" },
  jus: { bentuk: "M36 24L83 24 96 36V84H38Z", isi: "#e59740", detail: "M38 39H95M78 27L82 10 96 10M49 51H76V68H49Z" },
  topi: { bentuk: "M27 62Q24 36 50 28Q83 17 96 54L109 57Q119 61 101 73L74 82Q48 65 27 62Z", isi: "#e18c53", detail: "M27 60Q63 62 96 54M53 29Q69 48 67 64" },
  kardus: { bentuk: "M29 35L65 23 101 35V72L65 86 29 73Z", isi: "#c09261", detail: "M29 35L65 50 101 35M65 50V85M48 29L83 43V58" },
  tembok: { bentuk: "M26 26H104V78H26Z", isi: "#c67562", detail: "M26 43H104M26 61H104M53 26V43M79 43V61M53 61V78" },
  papan: { bentuk: "M28 31L101 26 103 71 28 77Z", isi: "#bd885b", detail: "M31 42Q55 39 70 44T101 41M32 58Q63 49 100 54M38 69L95 64" },
  buku: { bentuk: "M31 26Q55 19 65 27Q81 17 99 26V76Q83 70 65 80Q48 70 31 77Z", isi: "#c26a80", detail: "M65 28V80M38 69Q52 65 65 74Q83 65 92 68" },
  piring: { bentuk: "M25 50a40 30 0 1 0 80 0a40 30 0 1 0-80 0Z", isi: "#e5b28a", detail: "M37 50a28 20 0 1 0 56 0a28 20 0 1 0-56 0Z" },
  selimut: { bentuk: "M30 32Q52 26 100 31L103 73Q68 84 28 73Z", isi: "#a18bbb", detail: "M35 45L97 43M34 58L98 57M55 32L53 77M81 31L81 78" },
};

function Bahan({ id }: { id: string }) {
  const glass = GLASS[id];
  const opaque = OPAQUE[id];
  if (!glass && !opaque) return null;
  return <>
    <rect x="9" y="10" width="112" height="80" rx="9" fill="#fff8e6" />
    {[28,50,73].flatMap((y) => [19,43,65,87,111].map((x) =>
      <circle key={x + "-" + y} cx={x} cy={y} r={x === 19 || x === 111 ? 3.2 : 4.1} fill="#795396" />
    ))}
    {opaque && <>
      <path d={opaque.bentuk} fill={opaque.isi} stroke={INK} strokeWidth="2.8" />
      <path d={opaque.detail} fill="none" stroke={INK} strokeWidth="2" />
    </>}
    {glass && <>
      <path d={glass} fill="#72cdea" fillOpacity={id === "air" ? 0.1 : 0.23} stroke="#3182a6" strokeWidth="2.8" />
      {id === "lup" && <path d="M83 71L106 90" stroke="#355d74" strokeWidth="9" />}
      {id === "bohlam" && <path d="M49 78H81V84H49ZM53 87H77M58 90H72M59 76L59 60 51 55 60 52 65 58 70 52 79 55 71 60V76" fill="none" stroke="#526373" strokeWidth="2.8" />}
      {id === "es" && <path d="M32 30L66 44 100 29M66 44V85" fill="none" stroke="#73b8d6" strokeWidth="2.2" />}
      {id === "air" && <path d="M34 47Q53 40 72 48T97 47L92 85H38Z" fill="#58b9e9" fillOpacity=".26" stroke="#3182a6" strokeWidth="2" />}
      {id === "toples" && <path d="M44 19H86V29H44Z" fill="#becbd2" stroke="#526373" strokeWidth="2.5" />}
      {id === "jendela" && <path d="M65 18V84M25 51H105" stroke="#7694a1" strokeWidth="4" />}
      {id === "gelembung" && <path d="M43 44Q47 27 64 26M57 75Q70 81 83 70" fill="none" stroke="#b175b7" strokeWidth="3" />}
    </>}
  </>;
}

function Toples() {
  return <>
    <path d={GLASS.toples} fill="#bdebf2" fillOpacity=".35" stroke="#3182a6" strokeWidth="3" />
    <path d="M44 17H86V28H44Z" fill="#809aa8" stroke="#526373" strokeWidth="2.5" />
    <path d="M43 71V53Q43 45 48 42M44 76V79M86 64V72" fill="none" stroke="#70b7cc" strokeWidth="3" />
  </>;
}

function Pot({ id }: { id: string }) {
  const tertutup = ["ember","kardus","terpal","garasi","laci"].includes(id);
  const kering = id === "kering";
  const air = !tertutup && !kering;
  const gelap = "#30384e";
  return <>
    <rect width="130" height="100" rx="11" fill={tertutup ? gelap : "#dcf3fa"} />
    <path d="M0 78H130V100H0Z" fill={kering ? "#cfaa75" : tertutup ? "#4f4b55" : "#85bc73"} />
    {!tertutup && <circle cx="105" cy="19" r="11" fill="#ffc954" />}
    {id === "garasi" && <path d="M13 88V20H117V88M15 32H115M15 42H115M15 53H115" fill="none" stroke="#707e92" strokeWidth="5" />}
    {id === "laci" && <path d="M15 21H115V85H15Z M15 52H115M55 35H75M55 67H75" fill="#645a56" stroke="#a79a88" strokeWidth="3" />}
    {id === "kaca" && <path d="M18 87V41L65 13 111 41V87M19 42H110M65 14V86M41 28V86M89 28V86" fill="none" stroke="#498a91" strokeWidth="3" />}
    {id === "balkon" && <path d="M5 57H125M14 57V90M34 57V90M96 57V90M116 57V90" stroke="#91a4a4" strokeWidth="5" />}
    {id === "padi" && <path d="M0 77Q40 69 65 79T130 77V100H0Z M4 90Q39 82 63 90T127 90" fill="#77c4df" stroke="#5da7c4" strokeWidth="2" />}
    {["sayur","halaman","tulip"].includes(id) && <path d="M5 73Q28 65 53 75T125 73M16 78V57M26 75V60M105 76V58M115 78V56" fill="none" stroke="#619954" strokeWidth="3" />}
    {kering && <path d="M16 91L25 83 31 90 41 82M83 94L91 83 96 88 108 84" fill="none" stroke="#936743" strokeWidth="2.5" />}
    {id === "padi" ? <g stroke="#57884a" strokeWidth="3" fill="none">
      <path d="M49 86Q55 61 47 43M64 85Q63 51 71 31M75 86Q84 61 95 51" /><path d="M49 43Q58 48 57 60M71 34Q83 39 82 52M94 51Q102 56 97 67" stroke="#c3a44d" />
    </g> : <>
      <path d="M63 63L63 36" stroke={kering ? "#947740" : "#3f8750"} strokeWidth="3" />
      <path d="M62 55Q44 58 44 46Q58 41 63 53M63 51Q64 39 82 42Q82 54 63 54" fill={kering ? "#b5a356" : "#72b75f"} stroke="#4b8050" strokeWidth="1.4" />
      {["tulip","balkon"].includes(id) && <path d="M51 26L61 30 68 23 76 30Q74 46 64 44Q52 45 51 26Z" fill="#dc737d" stroke="#a85570" strokeWidth="2" />}
      <path d="M43 62H83L77 84H49Z" fill="#de865f" stroke="#9b563c" strokeWidth="2.8" />
      <path d="M42 62H84V68H42Z" fill="#ea9b6c" stroke="#9b563c" strokeWidth="2" />
    </>}
    {id === "ember" && <path d="M37 34H88L98 86H26Z" fill="#8b98b8" fillOpacity=".92" stroke="#c0cbe4" strokeWidth="3" />}
    {id === "kardus" && <path d="M32 36L69 27 99 38V88H32Z M33 37L68 44 98 38M68 44V86" fill="#99754f" fillOpacity=".94" stroke="#c4a983" strokeWidth="3" />}
    {id === "terpal" && <path d="M56 28Q78 28 91 68L105 87H23L35 63Z M56 28L50 77" fill="#202b3d" fillOpacity=".96" stroke="#8291ac" strokeWidth="3" />}
    {id === "laci" && <path d="M15 52H115V85H15Z M55 67H75" fill="#645a56" stroke="#a79a88" strokeWidth="3" />}
    {air && id !== "padi" && <g fill="#409ccd" stroke="#286d9c" strokeWidth="1"><path d="M25 47Q16 62 25 62Q34 62 25 47Z" /><path d="M32 60Q25 72 32 72Q40 72 32 60Z" /></g>}
  </>;
}

function Laut({ id }: { id: string }) {
  const points: Record<string, [number, number]> = {
    terumbu: [23,27], dalam: [66,60], palung: [106,82],
  };
  const point = points[id];
  if (!point) return null;
  return <>
    <rect width="130" height="100" rx="10" fill="#428ab1" />
    <path d="M0 0H130V31H0Z" fill="#95daec" />
    <path d="M0 31H130V61H0Z" fill="#5db0cc" />
    <path d="M0 61H130V100H0Z" fill="#356681" />
    <path d="M0 39H26Q43 38 52 60L65 70H81L102 92H113L123 73 130 70V100H0Z" fill="#cfab76" stroke="#af8a62" strokeWidth="2" />
    <path d="M15 39V28L11 24M15 31L19 26M26 38V29L30 24M26 34L22 31" fill="none" stroke="#e06e6e" strokeWidth="2.5" />
    <circle cx={point[0]} cy={point[1]} r="7" fill="#ffda69" stroke="#fff" strokeWidth="2" />
  </>;
}

const MUSCLE = "#bf5c63";
const BONE = "#f6ebc4";

function BagianTubuh({ id }: { id: string }) {
  let part: ReactNode;
  switch (id) {
    case "tulang":
    case "rusuk":
      const ribs = "M65 32V68M63 38Q47 28 45 39Q46 47 63 52M67 38Q83 28 85 39Q84 47 67 52M64 48Q47 39 45 48Q47 56 64 58M67 48Q84 39 85 48Q83 56 67 58M64 56Q51 50 50 58Q52 66 64 68M67 56Q79 50 80 58Q78 66 67 68";
      part = <g fill="none">
        <path d={ribs} stroke="#8c7354" strokeWidth="5.6" />
        <path d={ribs} stroke={BONE} strokeWidth="3.3" />
      </g>;
      break;
    case "belakang":
      part = <g fill={BONE} stroke="#ac925b" strokeWidth="1.5">
        {[30,37,44,51,58,66,74].map((y, i) => <rect key={y} x={58 + Math.round(2 * Math.sin(i))} y={y} width="14" height="5.5" rx="2" />)}
      </g>;
      break;
    case "tangan":
      part = <g fill="none" stroke="#8c7354" strokeWidth="3">
        <path d="M69 87L68 75 64 63 61 49 59 37M70 76L70 59 69 43V29M70 76L74 62 77 48 80 35M72 77L79 66 85 54 88 45M68 77L58 72 51 63 45 60" />
        <path d="M62 80L71 84L79 79M68 84V92" />
      </g>;
      break;
    case "kering":
      part = <>
        <path d="M60 36Q55 33 53 39Q51 43 58 47L61 72Q56 79 64 83Q72 83 65 73L65 46Q71 43 69 38Q67 33 63 36Z" fill={BONE} stroke="#ad9160" strokeWidth="2.2" />
        <path d="M76 44L77 71 74 77" fill="none" stroke="#e7d39b" strokeWidth="3" />
      </>;
      break;
    case "pipi":
      part = <>
        <circle cx="65" cy="51" r="24" fill="#dfae87" stroke="#897557" strokeWidth="2.5" />
        <path d="M48 48Q40 58 53 65Q60 62 58 54ZM82 48Q90 58 77 65Q70 62 72 54Z" fill={MUSCLE} />
        <path d="M57 45H57.1M73 45H73.1M58 56Q65 61 72 56" fill="none" stroke={INK} strokeWidth="3" />
      </>;
      break;
    case "paha":
      part = <g fill={MUSCLE} stroke="#833d49" strokeWidth="2">
        <path d="M52 32Q62 29 63 42Q58 56 59 70L54 76Q43 66 45 54Z" />
        <path d="M73 33Q83 31 86 43L88 55Q88 68 77 77L73 71Q74 56 69 43Z" />
        <path d="M55 40L50 58 50 66M77 39L82 58V67" fill="none" stroke="#f8b3a3" />
      </g>;
      break;
    case "bahu":
      part = <g fill={MUSCLE} stroke="#833d49" strokeWidth="2">
        <path d="M48 34Q34 35 32 49Q36 58 44 61L48 49 55 38Z" />
        <path d="M82 34Q96 35 98 49Q94 58 86 61L82 49 75 38Z" />
        <path d="M42 41L37 51M88 41L93 51" fill="none" stroke="#f8b3a3" />
      </g>;
      break;
    case "otot":
    case "perut":
      part = <g fill={MUSCLE} stroke="#8d3f4e" strokeWidth="1.5">
        <path d="M52 34Q58 32 63 35V48Q57 52 50 48Z M67 35Q72 32 78 34L80 48Q73 52 67 48Z" />
        <path d="M50 51Q57 54 63 50V62Q56 66 50 62Z M67 50Q73 54 80 51V62Q73 66 67 62Z" />
        <path d="M51 65Q57 68 63 65V77Q56 77 53 73Z M67 65Q73 68 79 65L77 73Q73 77 67 77Z" />
      </g>;
      break;
    case "organ":
    case "usus":
      part = <>
        <path d="M49 72Q45 74 45 68V42Q45 36 51 36H79Q85 36 85 42V66Q85 71 80 71H70V78" fill="none" stroke="#af616c" strokeWidth="5.5" />
        <path d="M54 44H74Q80 49 73 52H56Q49 56 56 59H74Q78 64 72 66H57" fill="none" stroke="#f5aa9c" strokeWidth="3.5" />
      </>;
      break;
    default:
      return null;
  }
  const lokasi: Record<string, [number, number]> = {
    tulang:[65,43], rusuk:[65,43], belakang:[65,52], tangan:[98,64], kering:[76,80],
    pipi:[60,22], paha:[71,73], bahu:[47,38], otot:[65,57], perut:[65,57],
    organ:[65,60], usus:[65,60],
  };
  const titik = lokasi[id];
  return <>
    <g transform="translate(-9 15) scale(.69)">
      <path d="M57 29A12 12 0 1 1 73 29V33L84 36Q92 40 97 53L104 63L99 68 89 56 82 49L78 65 83 89H75L67 70H63L55 89H47L52 65 48 49 41 56 31 68 26 63 33 53Q38 40 46 36L57 33Z" fill="#d9e2e5" stroke="#91a7af" strokeWidth="2.3" />
      {titik && <circle cx={titik[0]} cy={titik[1]} r="5.5" fill="#da6e5e" stroke="#8d484b" strokeWidth="2" />}
    </g>
    <ellipse cx="93" cy="50" rx="32" ry="38" fill="#f2eee7" stroke="#d0c1ad" strokeWidth="2" />
    <g transform="translate(44 12) scale(.75)">{part}</g>
  </>;
}

function Orbit({ id }: { id: string }) {
  const sun = { x:54, y:50, r:10 };
  const radiusEarth = 34;
  const radiusMoon = 16;
  const earth = { x:sun.x + radiusEarth, y:sun.y, r:7.5 };
  const tilt = Math.PI / 4;
  const moon = { x:earth.x + radiusMoon * Math.cos(tilt), y:earth.y - radiusMoon * Math.sin(tilt), r:4 };
  return <>
    <rect width="130" height="100" rx="10" fill="#263c59" />
    <circle cx={sun.x} cy={sun.y} r={radiusEarth} fill="none" stroke="#85a6c3" strokeWidth="1.7" />
    <circle cx={earth.x} cy={earth.y} r={radiusMoon} fill="none" stroke="#b9bfda" strokeWidth="1.6" />
    {[
      { ...sun, id:"matahari", fill:"#ffcb5c" },
      { ...earth, id:"bumi", fill:"#57bfe4" },
      { ...moon, id:"bulan", fill:"#e3e8ee" },
    ].map(p => <g key={p.id}>
      {id===p.id && <circle cx={p.x} cy={p.y} r={p.r + 4} fill="none" stroke="#fff8df" strokeWidth="2.4" />}
      <circle cx={p.x} cy={p.y} r={p.r} fill={p.fill} stroke="#233850" strokeWidth="1" />
      {p.id === "bumi" && <path d="M83 47L86 44 89 47 92 48 90 52 87 51 85 54 83 51Z" fill="#80d387" />}
    </g>)}
    <path d="M15 15H16M25 78H26M113 23H114M113 79H114" stroke="#f4f1de" strokeWidth="2" />
  </>;
}

function Jemuran() {
  return <>
    <rect width="130" height="100" rx="9" fill="#e3f5f8" />
    <path d="M0 85H130V100H0Z" fill="#9ac779" />
    <circle cx="107" cy="19" r="11" fill="#ffc44f" />
    <path d="M12 23V85M118 32V85M12 32L118 42" fill="none" stroke="#715c49" strokeWidth="3" />
    <path d="M35 38L40 34 49 38 54 35 60 40 65 53 59 55 56 51 55 71 39 69 38 49 32 54 27 50Z" fill="#eb8a78" stroke="#9e5b58" strokeWidth="2" />
    <path d="M76 39L95 40 97 66 90 66 85 56 82 66H74Z" fill="#8bb1df" stroke="#526eab" strokeWidth="2" />
    <path d="M40 33V40M54 34V41M77 37V44M94 38V45" stroke="#8b6242" strokeWidth="2.5" />
  </>;
}

function Mars() {
  return <>
    <circle cx="65" cy="50" r="38" fill="#d46d4b" stroke="#a34335" strokeWidth="3" />
    <path d="M29 49Q43 36 57 43L68 54Q77 59 89 49L101 47M41 73Q49 62 66 67L79 81M51 17Q67 21 74 34" fill="none" stroke="#a7503b" strokeWidth="6" />
    <ellipse cx="74" cy="37" rx="9" ry="5" fill="#eaa177" stroke="#af563f" strokeWidth="2" />
    <ellipse cx="48" cy="57" rx="6" ry="3.5" fill="#e69166" stroke="#a9503c" strokeWidth="2" />
    <path d="M46 19Q65 10 83 20Q73 25 60 24Z" fill="#f1c5a7" />
  </>;
}

function KuePesta({ id }: { id: string }) {
  if (id === "makan") return <>
    <circle cx="88" cy="38" r="20" fill="#e4ab79" stroke="#875b43" strokeWidth="2.6" />
    <path d="M71 34Q72 17 89 18Q98 17 105 28M82 35H82.1M95 34H95.1M82 44Q89 51 95 43" fill="none" stroke="#514449" strokeWidth="2.8" />
    <ellipse cx="52" cy="80" rx="40" ry="8" fill="#cde9ed" stroke="#7295a8" strokeWidth="2" />
    <path d="M26 72L48 60 71 69V80H25Z" fill="#e9bd80" stroke="#a97b5d" strokeWidth="2" />
    <path d="M25 72L48 60 71 69 52 74Z" fill="#e496a9" stroke="#a86275" strokeWidth="1.6" />
    <path d="M62 59L75 52" stroke="#537289" strokeWidth="4" />
  </>;
  const candles = [45,65,85];
  return <>
    <ellipse cx="65" cy="81" rx="50" ry="8" fill="#cde9ed" stroke="#7295a8" strokeWidth="2" />
    <path d="M25 56H105V79H25Z" fill="#efbf86" stroke="#ad7b5d" strokeWidth="2.4" />
    <path d="M25 57Q26 48 65 48Q104 48 105 56L103 63Q97 70 90 64Q84 57 78 64Q72 71 66 64Q60 57 54 64Q48 71 42 64Q35 58 29 63Z" fill="#eb9aaf" stroke="#a65c78" strokeWidth="2" />
    {id !== "datang" && candles.map((x) => <g key={x}>
      <path d={`M${x} 54V34`} stroke="#86adec" strokeWidth="7" />
      <path d={`M${x} 34V31`} stroke="#72576a" strokeWidth="1.7" />
      {id === "nyala" && <path d={`M${x} 18q-9 10 0 13q9-3 0-13Z`} fill="#ffbf50" stroke="#cb733a" strokeWidth="1.6" />}
      {id === "tiup" && <path d={`M${x+1} 29q9-3 6-11`} fill="none" stroke="#a7afbb" strokeWidth="2" />}
    </g>)}
  </>;
}

function DalamRumah() {
  return <>
    <path d="M20 39L65 12 110 39H101V86H29V39Z" fill="#e9c988" stroke="#835b44" strokeWidth="2.8" />
    <path d="M22 40L65 12 108 40" fill="none" stroke="#a2574b" strokeWidth="6" />
    <path d="M43 78V44H87V78Z" fill="#fff6df" stroke="#8f674a" strokeWidth="2" />
    <circle cx="65" cy="54" r="5.2" fill="#be7a56" />
    <path d="M65 60V70M57 65H73M65 70L60 77M65 70L70 77" fill="none" stroke="#48758c" strokeWidth="3.2" />
    <path d="M18 87H111" stroke="#946e56" strokeWidth="3" />
  </>;
}

const JATUH_DI_ALAM: Record<string, { jenis: "kelapa" | "daun"; jatuh: boolean }> = {
  "kelapa-di-pohon": { jenis: "kelapa", jatuh: false },
  "kelapa-di-tanah": { jenis: "kelapa", jatuh: true },
  "daun-di-pohon": { jenis: "daun", jatuh: false },
  "daun-di-tanah": { jenis: "daun", jatuh: true },
};

function JatuhDiAlam({ jenis, jatuh }: (typeof JATUH_DI_ALAM)[string]) {
  const kelapa = jenis === "kelapa";
  const posisi = kelapa ? (jatuh ? "88 76" : "80 46") : (jatuh ? "83 82" : "83 33");
  return <>
    <rect x="3" y="3" width="124" height="94" rx="11" fill="#e9f6fa" />
    <path d="M4 89H126V92Q126 97 121 97H9Q4 97 4 92Z" fill="#a3c97a" />
    {kelapa ? <>
      <path d="M38 89C48 69 52 48 55 27L66 28C63 51 59 73 52 89Z" fill="#c89561" stroke="#8c613f" strokeWidth="2.4" />
      <path d="M46 70L57 73M50 57L61 60M53 45L64 48" fill="none" stroke="#9c6c4a" strokeWidth="2.2" />
      <path d="M60 29Q37 9 15 29Q39 23 57 35Q34 31 23 48Q43 39 63 35Q84 34 111 47Q95 29 69 30Q91 20 112 25Q89 10 65 26Q67 15 80 8Q64 6 59 25Q48 11 36 9Q47 24 60 29Z" fill="#65964d" stroke="#48713d" strokeWidth="2.4" />
      {!jatuh && <path d="M64 31Q75 27 80 33" fill="none" stroke="#82713d" strokeWidth="3.2" />}
    </> : <>
      <path d="M10 40Q6 29 18 23Q18 12 31 13Q40 6 51 19Q66 18 68 31Q74 40 64 49Q58 58 47 52Q39 60 30 53Q15 55 10 40Z" fill="#acd296" stroke="#80ab6e" strokeWidth="2" />
      <path d="M27 89Q32 72 30 53L22 37L28 34L38 50Q42 46 48 43L63 37L65 41Q50 50 41 63L42 89Z" fill="#ba8e66" stroke="#88684f" strokeWidth="2.4" />
    </>}
    {jatuh && <ellipse cx={kelapa ? 88 : 83} cy="91" rx={kelapa ? 15 : 20} ry="2.6" fill="#779b5f" />}
    <g transform={`translate(${posisi})`}>
      {kelapa ? <>
        <path d="M-12-2C-12-10-5-13 0-13C7-14 13-8 14 0C15 8 8 14 0 14C-8 14-14 8-12-2Z" fill="#d7a453" stroke="#805530" strokeWidth="2.6" />
        <path d="M-3-10C-10-4-9 4-5 10M4-8C9-3 10 4 6 9" fill="none" stroke="#ae7841" strokeWidth="1.8" />
      </> : <>
        <path d="M-11 3Q-10-12 17-8Q11 11-3 8Q-8 7-11 3Z" fill="#53a552" stroke="#326b43" strokeWidth="2.6" />
        <path d="M-19 7Q-5 1 10-5M-6 2L-4-3M1 0L5 3" fill="none" stroke="#326b43" strokeWidth="2" />
      </>}
    </g>
  </>;
}

function PohonApel({ berbuah }: { berbuah: boolean }) {
  const ranting = [[36, 40], [57, 27], [83, 36], [70, 54], [99, 53]];
  return <>
    <rect x="3" y="3" width="124" height="94" rx="11" fill="#e9f6fa" />
    <path d="M4 87Q40 82 65 87T126 87V92Q126 97 121 97H9Q4 97 4 92Z" fill="#a3c97a" />
    <path d="M53 88Q61 76 60 53H70Q68 74 76 88Z" fill="#ad7951" stroke="#784f34" strokeWidth="2.6" />
    <path d="M17 55Q12 41 24 34Q22 20 38 18Q45 7 61 15Q76 6 88 17Q105 15 111 32Q125 41 114 55Q116 68 100 70Q84 82 68 72Q51 80 40 71Q20 70 17 55Z" fill="#7fbd6e" stroke="#437948" strokeWidth="2.6" />
    <path d="M64 71V47M64 59L51 47M64 58L79 43M40 53L33 45M95 60L99 53" fill="none" stroke="#5b8e51" strokeWidth="3" />
    {ranting.map(([x, y]) => <g key={x} transform={`translate(${x} ${y})`}>
      {berbuah ? <>
        <path d="M0-4Q0-8 3-10" fill="none" stroke="#664838" strokeWidth="2" />
        <path d="M1-7Q4-13 10-11Q8-6 1-7Z" fill="#3e7e4b" />
        <path d="M0-4C-11-10-13 3-7 9Q-3 13 0 10Q5 13 9 6C13-1 8-9 0-4Z" fill="#de5a55" stroke="#9d3d36" strokeWidth="1.7" />
        <path d="M-7-1Q-8 0-8 3" fill="none" stroke="#ffb5ac" strokeWidth="1.7" />
      </> : <>
        <path d="M0-4V-10" stroke="#437948" strokeWidth="2" />
        <path d="M0-4Q5-11 9-5Q12-1 6 2Q9 8 3 10Q0 11-2 6Q-8 10-10 4Q-12 0-6-2Q-9-8-4-8Q-1-8 0-4Z" fill="#fff1f6" stroke="#c8688f" strokeWidth="1.5" />
        <circle cy="1" r="2.6" fill="#e69b49" />
      </>}
    </g>)}
  </>;
}

function SalimDiGerbang() {
  return <>
    <rect x="3" y="3" width="124" height="94" rx="11" fill="#e9f6fa" />
    <path d="M4 79H126V92Q126 97 121 97H9Q4 97 4 92Z" fill="#adc983" />
    <path d="M39 72H94L115 97H18Z" fill="#d6c8aa" />
    <path d="M16 79V27H26V79M104 79V27H114V79M18 27V20H112V27Z" fill="#d6936d" stroke="#915947" strokeWidth="2" />
    <path d="M27 60H38M91 60H103M31 47V76M98 47V76" fill="none" stroke="#91aeb0" strokeWidth="3" />
    {/* Guru berdiri, anak menunduk membawa punggung tangan guru ke dahinya. */}
    <path d="M81 68H96L98 87H86L83 78L78 87H71Z" fill="#3e6282" stroke={INK} strokeWidth="2" />
    <path d="M78 86V91H69M97 87V91H103" fill="none" stroke={INK} strokeWidth="3.5" />
    <path d="M79 41Q88 38 95 43L98 69H77Z" fill="#637caa" stroke={INK} strokeWidth="2.2" />
    <path d="M86 44L90 50L94 43M94 50L98 61L95 68" fill="none" stroke="#c8dbf0" strokeWidth="2" />
    <path d="M86 20Q99 18 100 31Q100 43 88 44Q81 41 81 35L78 33L82 29Z" fill="#daa378" stroke={INK} strokeWidth="2" />
    <path d="M81 28Q81 16 94 19Q104 22 101 37L97 35L95 27Q89 29 81 28Z" fill="#384056" />
    <circle cx="86" cy="32" r="1.25" fill={INK} />
    <path d="M34 73L47 72L49 84L45 89H38L30 84Z" fill="#b7454b" stroke={INK} strokeWidth="2" />
    <path d="M35 85L32 90H27M44 87V91H49" fill="none" stroke={INK} strokeWidth="3.2" />
    <path d="M34 69Q27 66 31 57L40 52L44 66Z" fill="#c45e4f" stroke={INK} strokeWidth="1.7" />
    <path d="M35 74L37 61L45 55L54 61L48 74Z" fill="#fff" stroke={INK} strokeWidth="2" />
    <path d="M48 54Q41 48 48 40Q57 34 64 40Q70 45 67 52L70 55L65 56Q61 62 55 58Z" fill="#f0bc8b" stroke={INK} strokeWidth="2" />
    <path d="M45 46Q46 35 57 35Q64 35 67 42L63 45Q57 41 53 49L48 51Z" fill="#554033" />
    <path d="M60 52L62 53" stroke={INK} strokeWidth="1.6" />
    <path d="M80 50L75 52L68 46" fill="none" stroke={INK} strokeWidth="8" />
    <path d="M80 50L75 52L67 45" fill="none" stroke="#daa378" strokeWidth="5.5" />
    <path d="M48 64L58 64L67 50M53 62L61 57L66 47" fill="none" stroke={INK} strokeWidth="5.5" />
    <path d="M48 64L58 64L67 50M53 62L61 57L66 47" fill="none" stroke="#f0bc8b" strokeWidth="3.2" />
  </>;
}

function ParfumSemprot() {
  return <>
    <path d="M37 37H61L68 46Q80 50 80 64V85Q80 92 72 92H25Q17 92 17 85V64Q17 50 30 46Z" fill="#dcc9f4" stroke="#66458b" strokeWidth="3" />
    <path d="M19 67Q48 60 78 67V85Q78 90 72 90H25Q19 90 19 85Z" fill="#bc8de2" />
    <path d="M37 27H61V41H37Z" fill="#b5a0cf" stroke="#66458b" strokeWidth="2.6" />
    <path d="M39 26V17Q39 12 44 12H61Q65 12 65 17V26Z" fill="#d8c9ed" stroke="#66458b" strokeWidth="2.6" />
    <circle cx="64" cy="19" r="2.8" fill="#66458b" />
    <path d="M29 61Q28 55 34 53M26 69V80" fill="none" stroke="#fff3ff" strokeWidth="3.5" />
    <path d="M49 62Q51 72 60 74Q51 77 49 86Q46 77 37 74Q46 71 49 62Z" fill="#fff0ff" />
    <g fill="#8759ba">
      <circle cx="77" cy="19" r="2" /><circle cx="90" cy="15" r="2.4" /><circle cx="91" cy="24" r="2.4" />
      <circle cx="103" cy="9" r="2.9" /><circle cx="105" cy="20" r="2.9" /><circle cx="105" cy="32" r="2.9" />
      <circle cx="117" cy="14" r="3.1" /><circle cx="119" cy="26" r="3.1" /><circle cx="117" cy="39" r="3.1" />
    </g>
  </>;
}

function PapanHarga() {
  return <>
    <path d="M59 57H71V94H59Z" fill="#c7935e" stroke="#704529" strokeWidth="3" />
    <rect x="5" y="16" width="120" height="56" rx="9" fill="#d39555" stroke="#704529" strokeWidth="3" />
    <rect x="12" y="23" width="106" height="42" rx="4" fill="#fff3d4" />
    <text x="65" y="54" textAnchor="middle" fill={INK} fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="30" textLength="92" lengthAdjust="spacingAndGlyphs">Rp 500</text>
  </>;
}

function PantulanCermin() {
  return <>
    <path d="M85 77V91M66 93H104" fill="none" stroke="#80552f" strokeWidth="6" />
    <rect x="46" y="4" width="78" height="79" rx="36" fill="#f2b665" stroke="#80552f" strokeWidth="3" />
    <rect x="53" y="11" width="64" height="65" rx="29" fill="#d6f1f8" stroke="#377588" strokeWidth="2" />
    <path d="M66 66Q71 58 85 58Q97 58 104 66Q94 73 85 73Q75 73 66 66Z" fill="#996fcb" stroke={INK} strokeWidth="2" />
    <circle cx="85" cy="43" r="16" fill="#ecbb8b" stroke={INK} strokeWidth="2" />
    <path d="M69 41Q67 25 81 24Q96 22 101 37Q91 37 85 32Q78 40 69 41Z" fill="#634638" stroke={INK} strokeWidth="2" />
    <circle cx="79" cy="44" r="2" fill={INK} /><circle cx="91" cy="44" r="2" fill={INK} />
    <path d="M81 51Q85 55 89 51" fill="none" stroke="#9a5449" strokeWidth="2" />
    <path d="M106 24L110 19M109 33L113 28" fill="none" stroke="#fff" strokeWidth="3" />
    <path d="M7 91Q8 75 23 72H35Q47 77 49 91Z" fill="#996fcb" stroke={INK} strokeWidth="2.5" />
    <path d="M19 63H36V75Q28 80 19 75Z" fill="#ecbb8b" stroke={INK} strokeWidth="2" />
    <path d="M10 55Q10 37 27 37Q44 37 44 53Q44 69 28 70Q11 69 10 55Z" fill="#634638" stroke={INK} strokeWidth="2.5" />
    <path d="M37 55Q44 51 45 57Q45 63 39 63" fill="#ecbb8b" stroke={INK} strokeWidth="2" />
    <path d="M15 53Q16 43 27 42" fill="none" stroke="#976a53" strokeWidth="2.5" />
  </>;
}

export function GambarIlustrasiTk({ gambar, s, style, className }: { gambar: string; s: number; style?: CSSProperties; className?: string }) {
  const id = gambar.slice(3);
  let art: ReactNode;
  if (id.startsWith("bahan-")) art = <Bahan id={id.slice(6)} />;
  else if (id.startsWith("pot-")) art = <Pot id={id.slice(4)} />;
  else if (id.startsWith("tubuh-")) art = <BagianTubuh id={id.slice(6)} />;
  else if (id.startsWith("laut-")) art = <Laut id={id.slice(5)} />;
  else if (id.startsWith("orbit-")) art = <Orbit id={id.slice(6)} />;
  else if (id.startsWith("batang")) art = <Batang bambu={id === "batang-bambu"} pohon={id === "batang-pohon"} />;
  else if (id === "akar-serabut") art = <AkarSerabut />;
  else if (id === "kepompong" || id === "telur-di-daun") art = <Metamorfosis telur={id === "telur-di-daun"} />;
  else if (id === "anak-bebek" || id === "bebek-menetas") art = <Bebek menetas={id === "bebek-menetas"} />;
  else if (id === "toples") art = <Toples />;
  else if (id === "jemuran") art = <Jemuran />;
  else if (id === "mars") art = <Mars />;
  else if (id.startsWith("kue-")) art = <KuePesta id={id.slice(4)} />;
  else if (id === "dalam-rumah") art = <DalamRumah />;
  else if (JATUH_DI_ALAM[id]) art = <JatuhDiAlam {...JATUH_DI_ALAM[id]} />;
  else if (id === "apel-berbunga" || id === "apel-berbuah") art = <PohonApel berbuah={id === "apel-berbuah"} />;
  else if (id === "salim-di-gerbang") art = <SalimDiGerbang />;
  else if (id === "tunas-parfum") art = <ParfumSemprot />;
  else if (id === "tunas-papan-harga") art = <PapanHarga />;
  else if (id === "tunas-pantulan-cermin") art = <PantulanCermin />;
  else return null;
  return <svg aria-hidden data-ilustrasi={gambar} width={s * 1.3} height={s} viewBox="0 0 130 100" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>{art}</svg>;
}
