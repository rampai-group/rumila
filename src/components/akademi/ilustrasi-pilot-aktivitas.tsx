import type { ReactNode } from "react";

const garis = "#244252";

function Keran({ keadaan }: { keadaan: "buka" | "bilas" | "tutup" }) {
  return <>
    <path d="M13 79H116L107 94H22Z" fill="#c8e5ec" stroke="#548091" strokeWidth="3" />
    <path d="M89 75V39Q89 26 77 26H49Q37 26 37 41V46" fill="none" stroke={garis} strokeWidth="18" />
    <path d="M89 75V39Q89 26 77 26H49Q37 26 37 41V46" fill="none" stroke="#b9d3dd" strokeWidth="12" />
    <path d={keadaan === "tutup" ? "M69 14H109" : "M90 12V24"} stroke="#4e7384" strokeWidth="7" />
    {keadaan !== "tutup" && <path d="M35 49V72M42 50V62" stroke="#37a4df" strokeWidth="4" />}
    {keadaan === "bilas" && <>
      <path d="M15 69Q9 65 14 60L29 64 46 61Q51 63 47 68L37 72 55 70Q62 73 57 77L39 83 23 82Z" fill="#f5b485" stroke="#a35e43" strokeWidth="2.5" />
      <path d="M43 57Q58 54 66 63L79 74 66 80 53 70Q47 69 43 66Z" fill="#ffc69a" stroke="#a35e43" strokeWidth="2.5" />
    </>}
  </>;
}

function TasRitsleting() {
  return <>
    <path d="M54 20V14Q65 4 76 14V20" fill="none" stroke={garis} strokeWidth="5" />
    <rect x="28" y="19" width="74" height="72" rx="18" fill="#ef7268" stroke="#823f47" strokeWidth="3" />
    <path d="M35 44Q65 39 95 44" fill="none" stroke="#5d3341" strokeWidth="5" />
    <path d="M39 44H91" stroke="#ffd989" strokeWidth="3" strokeDasharray="2 3" />
    <path d="M91 44L100 48 98 56 90 51Z" fill="#ffe39b" stroke="#5d3341" strokeWidth="2.5" />
    <rect x="44" y="58" width="42" height="22" rx="7" fill="#f7a19b" stroke="#823f47" strokeWidth="2.5" />
  </>;
}

function Sepeda({ fokus }: { fokus: "sadel" | "pedal" | "rem" }) {
  return <>
    <g fill="#e5f8f9" stroke="#345662" strokeWidth="4">
      <circle cx="29" cy="70" r="19" /><circle cx="103" cy="70" r="19" />
    </g>
    <path d="M29 70L48 41H82L63 70H29M63 70L49 33M82 41L103 70M82 41L89 26 106 26" fill="none" stroke="#2b9993" strokeWidth="5" />
    <path d="M40 31H60" stroke={fokus === "sadel" ? "#e66643" : "#34434f"} strokeWidth={fokus === "sadel" ? 10 : 7} />
    <path d="M63 69L70 78H78" stroke={fokus === "pedal" ? "#e66643" : "#34434f"} strokeWidth={fokus === "pedal" ? 7 : 4} />
    <path d="M100 28L110 34" stroke={fokus === "rem" ? "#e66643" : "#34434f"} strokeWidth={fokus === "rem" ? 7 : 4} />
  </>;
}

function Selai() {
  return <>
    <rect x="36" y="41" width="57" height="46" rx="9" fill="#de536c" stroke="#883447" strokeWidth="3" />
    <ellipse cx="65" cy="40" rx="28" ry="8" fill="#f68e93" stroke="#883447" strokeWidth="3" />
    <rect x="42" y="55" width="45" height="23" rx="4" fill="#fff4da" />
    <path d="M64 61Q54 55 57 67L64 74Q74 69 72 60Z" fill="#d63651" />
    <path d="M58 60L64 57 70 60" fill="none" stroke="#557845" strokeWidth="2.5" />
    <ellipse cx="83" cy="17" rx="25" ry="8" transform="rotate(-12 83 17)" fill="#debb77" stroke="#88643c" strokeWidth="3" />
  </>;
}

function Wajan({ keadaan }: { keadaan: "minyak" | "panas" | "telur" | "piring" }) {
  const piring = keadaan === "piring";
  return <>
    {!piring && <path d="M98 63L119 48" stroke="#435767" strokeWidth="9" />}
    <ellipse cx="60" cy="66" rx="45" ry="22" fill={piring ? "#e3f4fe" : "#61747e"} stroke={garis} strokeWidth="3" />
    <ellipse cx="60" cy="64" rx="37" ry="16" fill={piring ? "#fcffff" : "#435666"} />
    {(keadaan === "minyak" || keadaan === "panas") && <ellipse cx="59" cy="64" rx="25" ry="8" fill="#ffc84e" />}
    {(keadaan === "telur" || piring) && <>
      <path d="M38 65Q38 54 53 54Q64 46 74 56Q90 61 77 72Q61 79 46 73Z" fill="#fffce0" stroke="#e9d3a0" strokeWidth="2" />
      <circle cx="61" cy="62" r="8" fill="#f7a72d" />
    </>}
    {keadaan === "minyak" && <g transform="rotate(-37 37 24)">
      <rect x="24" y="9" width="24" height="28" rx="5" fill="#ffd37b" stroke="#855f37" strokeWidth="2.5" />
      <rect x="29" y="3" width="14" height="9" rx="3" fill="#5b9c69" stroke="#37633c" strokeWidth="2.5" />
    </g>}
    {keadaan === "minyak" && <path d="M52 32Q64 40 60 48" fill="none" stroke="#ebae40" strokeWidth="4" />}
    {keadaan === "panas" && <path d="M46 44Q39 36 46 28M62 44Q55 36 62 28M78 44Q71 36 78 28" fill="none" stroke="#ed7746" strokeWidth="3.5" />}
  </>;
}

function Camar() {
  return <>
    <path d="M15 75Q47 77 60 54L78 47Q81 31 95 36L107 49 95 57Q89 78 67 82L41 86Z" fill="#fffefa" stroke={garis} strokeWidth="3" />
    <path d="M37 71Q55 38 80 50Q72 70 48 83Z" fill="#a9bac5" stroke={garis} strokeWidth="3" />
    <path d="M37 71L51 74 43 84 32 81Z" fill="#354657" />
    <path d="M104 47L120 51 105 56Z" fill="#efb746" stroke="#987134" strokeWidth="2.5" />
    <circle cx="96" cy="45" r="2.8" fill={garis} />
    <path d="M66 83L62 91H73M75 82L72 90H84" fill="none" stroke="#d69b3b" strokeWidth="3" />
  </>;
}

function RumputLaut() {
  return <>
    <rect x="10" y="9" width="110" height="82" rx="15" fill="#e0f4fa" />
    <path d="M23 81Q57 71 108 82" fill="none" stroke="#74b8ce" strokeWidth="4" />
    <path d="M65 83Q49 65 45 52Q28 33 35 16Q50 31 54 44Q69 50 70 76Q64 42 76 23Q86 39 76 52L74 79Q88 70 88 53Q89 37 103 32Q103 54 96 60Q93 78 75 84Z" fill="#419c75" stroke="#2a6c65" strokeWidth="3" />
    <path d="M72 80Q65 61 68 44M70 80Q55 64 49 50M77 80L92 65" fill="none" stroke="#91d1a0" strokeWidth="3" />
    <g fill="#f7fcff" stroke="#79beda" strokeWidth="2"><circle cx="26" cy="42" r="5" /><circle cx="101" cy="19" r="5" /><circle cx="28" cy="61" r="3" /></g>
  </>;
}

function BolaPantai() {
  return <>
    <circle cx="65" cy="50" r="38" fill="#fff4c5" stroke={garis} strokeWidth="3" />
    <path d="M37 24Q68 15 91 34Q57 37 38 74Q23 55 37 24Z" fill="#f68167" />
    <path d="M91 34Q58 38 38 74Q55 89 77 85Q96 61 91 34Z" fill="#69c9e5" />
    <path d="M91 34Q98 53 78 85Q98 79 103 58Q104 44 91 34Z" fill="#f8be46" />
    <circle cx="91" cy="34" r="5" fill="#fff7dd" stroke={garis} strokeWidth="2" />
  </>;
}

function Rumput({ tinggi = false }: { tinggi?: boolean }) {
  return <>
    <path d={tinggi
      ? "M66 87Q64 43 52 13L62 17Q74 44 72 68Q80 35 104 23Q92 52 78 76Q93 61 114 64Q99 80 77 88H59Q33 77 17 59Q42 62 57 76Q43 50 28 28Q53 41 64 68Z"
      : "M17 86Q15 64 7 44Q29 52 34 76Q37 56 32 39Q52 49 52 75Q53 48 64 20Q69 51 64 76Q74 50 90 41Q88 62 77 78Q94 59 118 54Q111 78 87 89H23Z"}
      fill={tinggi ? "#659646" : "#6aaa45"} stroke="#386a3e" strokeWidth="3" />
    <path d="M23 87Q60 96 111 86" fill="none" stroke="#3f7846" strokeWidth="4" />
  </>;
}

function Jerami() {
  return <g transform="rotate(-11 65 50)">
    <path d="M19 63L104 32M21 70L111 38M27 77L111 49M21 54L100 25M30 84L110 56M25 48L94 23" stroke="#b7833c" strokeWidth="5" />
    <path d="M19 60L102 28M25 74L111 42M27 82L108 52M28 49L97 23" stroke="#eecd80" strokeWidth="4" />
    <path d="M54 42L68 74M58 41L72 72" stroke="#946e4f" strokeWidth="4" />
    <path d="M64 56Q42 38 42 50Q44 58 64 56Q79 47 79 54Q78 61 64 56Z" fill="#e7c192" stroke="#946e4f" strokeWidth="2.5" />
  </g>;
}

function DaunMurbei() {
  return <>
    <path d="M64 80L52 58L34 65L39 50L23 44L37 36L33 26L50 29L54 16L65 24L73 8L81 24L96 19L93 34L113 37L101 49L111 58L91 61L91 71L73 70Z" fill="#79b760" stroke="#3f764d" strokeWidth="3" />
    <path d="M60 91L74 29M67 65L43 50M69 58L94 48M72 47L58 37" fill="none" stroke="#4a8d52" strokeWidth="3" />
  </>;
}

function Butiran({ jenis }: { jenis: "jagung" | "gabah" | "campur" | "pelet" | "beras" }) {
  const bentuk = jenis === "jagung" ? "M-8 5Q-10-5-6-7H6Q10-6 8 5L3 9H-3Z"
    : jenis === "pelet" ? "M-7-4H7V4H-7Z" : "M-11 0Q0-7 11 0Q0 7-11 0Z";
  const warna = jenis === "jagung" ? ["#f2a923", "#ffcc49"] : jenis === "gabah" ? ["#bd9a56", "#e6be71"]
    : jenis === "pelet" ? ["#895f45", "#b78f63"] : jenis === "beras" ? ["#f2e2bd", "#fff1dc"] : ["#a67845", "#dbb474", "#5e4937", "#e7ca8f"];
  return <>
    <ellipse cx="65" cy="66" rx="49" ry="19" fill={jenis === "pelet" ? "#c8e8f2" : "#f6edda"} stroke="#748c92" strokeWidth="3" />
    {[[41, 50], [58, 46], [77, 48], [94, 53], [36, 62], [53, 62], [72, 62], [84, 65], [100, 66], [62, 72]].map(([x, y], i) => (
      <path key={i} d={bentuk} transform={`translate(${x} ${y}) rotate(${i % 2 ? 34 : -31})`} fill={warna[i % warna.length]} stroke={jenis === "beras" ? "#c7b69a" : "#987047"} strokeWidth="1.7" />
    ))}
  </>;
}

function KalengKucing() {
  return <>
    <path d="M34 30H96V73Q65 88 34 73Z" fill="#639ec4" stroke="#345873" strokeWidth="3" />
    <ellipse cx="65" cy="30" rx="31" ry="9" fill="#d8ecf7" stroke="#345873" strokeWidth="3" />
    <path d="M55 30Q65 20 73 30Q65 37 55 30Z" fill="#aabdc9" stroke="#597484" strokeWidth="2.5" />
    <path d="M51 60L50 45 59 51H71L80 45 79 60Q65 75 51 60Z" fill="#fff5e3" stroke="#2c5871" strokeWidth="2.5" />
    <circle cx="60" cy="57" r="2" fill={garis} /><circle cx="70" cy="57" r="2" fill={garis} />
    <path d="M64 62H66" stroke={garis} strokeWidth="2.5" />
  </>;
}

function MobilMainan() {
  return <>
    <path d="M24 64Q24 50 37 49L52 33H76L92 50H102Q110 50 110 64V73H24Z" fill="#f27d65" stroke="#9b4f49" strokeWidth="3" />
    <path d="M53 38H74L85 51H42Z" fill="#c4e9ee" stroke="#7997a8" strokeWidth="2.5" />
    <path d="M83 33V13" stroke={garis} strokeWidth="3" /><circle cx="83" cy="13" r="5" fill="#efb845" />
    <circle cx="39" cy="73" r="10" fill="#455867" /><circle cx="94" cy="73" r="10" fill="#455867" />
    <path d="M11 57H18M6 67H16" stroke="#357f99" strokeWidth="3.5" />
  </>;
}

function PenanakNasi({ tombol = false }: { tombol?: boolean }) {
  return <>
    <path d="M28 38H102L96 79Q65 91 34 79Z" fill="#e9f4f8" stroke={garis} strokeWidth="3" />
    <ellipse cx="65" cy="36" rx="37" ry="12" fill={tombol ? "#aed1df" : "#677d89"} stroke={garis} strokeWidth="3" />
    {tombol ? <path d="M55 27V19H75V27" fill="none" stroke={garis} strokeWidth="4" />
      : <path d="M43 38Q61 28 85 37Q76 45 43 38Z" fill="#fff1d0" stroke="#cbb784" strokeWidth="2" />}
    <rect x="49" y="54" width="32" height="16" rx="5" fill={tombol ? "#ffd458" : "#bedbe4"} stroke={garis} strokeWidth="2.5" />
    <path d="M60 61H70" stroke={tombol ? "#a15e31" : "#4a727f"} strokeWidth="3" />
  </>;
}

function OvenKue() {
  return <>
    <rect x="19" y="16" width="92" height="69" rx="10" fill="#c9dce1" stroke={garis} strokeWidth="3" />
    <rect x="29" y="40" width="72" height="35" rx="5" fill="#49374b" stroke={garis} strokeWidth="3" />
    <path d="M33 32H56" stroke="#71909e" strokeWidth="4" />
    <circle cx="84" cy="29" r="4" fill="#eb704f" /><circle cx="98" cy="29" r="4" fill="#628493" />
    <path d="M42 63H88" stroke="#a2909a" strokeWidth="3" />
    <path d="M49 59Q50 49 60 52Q65 46 70 52Q80 50 82 59L78 69H54Z" fill="#e9ad67" stroke="#ae7442" strokeWidth="2" />
  </>;
}

function BungaKuning() {
  return <>
    <path d="M66 91V36M66 73Q39 68 43 57Q62 55 67 72M67 61Q86 44 96 57Q92 69 67 65" fill="#7fb65e" stroke="#3d7d50" strokeWidth="3" />
    <g fill="#ffd54c" stroke="#da9d31" strokeWidth="2.5">
      {Array.from({ length: 6 }, (_, i) => <ellipse key={i} cx="65" cy="18" rx="10" ry="13" transform={`rotate(${i * 60} 65 33)`} />)}
    </g>
    <circle cx="65" cy="33" r="10" fill="#e69836" stroke="#ba742c" strokeWidth="2.5" />
  </>;
}

function HelmSepeda() {
  return <>
    <path d="M31 69L50 88 69 88 80 66" fill="none" stroke={garis} strokeWidth="4" />
    <rect x="55" y="85" width="12" height="6" rx="2" fill="#6d8593" stroke={garis} strokeWidth="2" />
    <path d="M17 61Q24 30 52 22Q89 9 109 42Q115 52 113 63L90 64 78 73H42L34 67Z" fill="#f37653" stroke="#87464c" strokeWidth="3" />
    <path d="M28 54Q44 37 59 34M49 62Q69 42 84 40M72 62Q84 49 94 51" fill="none" stroke="#7a4660" strokeWidth="4" />
    <path d="M31 66L44 73H76L91 64" fill="none" stroke="#472e45" strokeWidth="3" />
  </>;
}

function BurungBiji() {
  return <>
    <path d="M22 74Q46 70 54 54Q51 28 79 27Q101 29 100 52Q90 79 64 82L38 83Z" fill="#dab26f" stroke={garis} strokeWidth="3" />
    <path d="M34 74L18 88 43 87 59 76Z" fill="#72635c" stroke={garis} strokeWidth="2.5" />
    <path d="M49 69Q55 47 78 49Q82 61 65 74Z" fill="#806c5d" stroke="#4d4c50" strokeWidth="2.5" />
    <path d="M98 41L112 46 99 52Z" fill="#e2a552" stroke="#8c6647" strokeWidth="2.5" />
    <circle cx="91" cy="38" r="3" fill={garis} />
    <path d="M72 82L70 91H81M60 82L59 91H68" stroke="#9a6850" strokeWidth="3" fill="none" />
  </>;
}

const gambar: Record<string, () => ReactNode> = {
  "pilot-keran-buka": () => <Keran keadaan="buka" />,
  "pilot-keran-bilas": () => <Keran keadaan="bilas" />,
  "pilot-keran-tutup": () => <Keran keadaan="tutup" />,
  "pilot-tas-ritsleting": TasRitsleting,
  "pilot-sepeda-sadel": () => <Sepeda fokus="sadel" />,
  "pilot-sepeda-pedal": () => <Sepeda fokus="pedal" />,
  "pilot-sepeda-rem": () => <Sepeda fokus="rem" />,
  "pilot-selai-terbuka": Selai,
  "pilot-wajan-minyak": () => <Wajan keadaan="minyak" />,
  "pilot-wajan-panas": () => <Wajan keadaan="panas" />,
  "pilot-wajan-telur": () => <Wajan keadaan="telur" />,
  "pilot-piring-telur": () => <Wajan keadaan="piring" />,
  "pilot-camar": Camar,
  "pilot-rumput-laut": RumputLaut,
  "pilot-bola-pantai": BolaPantai,
  "pilot-rumput-segar": () => <Rumput />,
  "pilot-rumput-gajah": () => <Rumput tinggi />,
  "pilot-jerami": Jerami,
  "pilot-daun-murbei": DaunMurbei,
  "pilot-jagung-pipil": () => <Butiran jenis="jagung" />,
  "pilot-gabah": () => <Butiran jenis="gabah" />,
  "pilot-biji-campur": () => <Butiran jenis="campur" />,
  "pilot-pelet-ikan": () => <Butiran jenis="pelet" />,
  "pilot-beras": () => <Butiran jenis="beras" />,
  "pilot-kaleng-kucing": KalengKucing,
  "pilot-mobil-mainan": MobilMainan,
  "pilot-penanak-nasi": () => <PenanakNasi />,
  "pilot-tombol-penanak-nasi": () => <PenanakNasi tombol />,
  "pilot-oven-kue": OvenKue,
  "pilot-bunga-kuning": BungaKuning,
  "pilot-helm-sepeda": HelmSepeda,
  "pilot-burung-biji": BurungBiji,
};

export const ILUSTRASI_PILOT_AKTIVITAS_IDS = Object.keys(gambar);

export function IlustrasiPilotAktivitas({ id }: { id: string }) {
  const Gambar = gambar[id];
  if (!Gambar) return null;
  return <g strokeLinecap="round" strokeLinejoin="round"><Gambar /></g>;
}
