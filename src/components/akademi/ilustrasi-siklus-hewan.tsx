import { ILUSTRASI_SIKLUS_AIR } from "./ilustrasi-siklus-air";
import { ILUSTRASI_SIKLUS_KEBUN } from "./ilustrasi-siklus-kebun";

export const ILUSTRASI_SIKLUS_HEWAN_IDS = [
  "qc-katak-telur", "qc-katak-berudu", "qc-katak-berudu-berkaki", "qc-katak-muda-berekor", "qc-katak-dewasa",
  ...Object.keys(ILUSTRASI_SIKLUS_AIR),
  ...Object.keys(ILUSTRASI_SIKLUS_KEBUN),
  "qc-belalang-telur", "qc-belalang-nimfa", "qc-belalang-bakal-sayap", "qc-belalang-dewasa",
];

function TelurKatak() {
  return <>
    <ellipse cx="65" cy="56" rx="53" ry="34" fill="#d1f1f5" />
    <path d="M17 56Q29 52 40 56M91 50Q101 45 112 50M25 72Q37 68 47 73M82 76Q94 70 104 74" fill="none" stroke="#77c1d1" strokeWidth="2.7" strokeLinecap="round" />
    {[[40, 52], [56, 38], [74, 43], [89, 58], [63, 62], [48, 67]].map(([x, y]) => (
      <g key={x} transform={`translate(${x} ${y})`}>
        <circle r="13" fill="#eafafa" fillOpacity=".9" stroke="#72b3b9" strokeWidth="2" />
        <circle r="5" fill="#435c51" />
        <path d="M-8-4Q-6-8-2-8" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    ))}
  </>;
}

function Berudu({ berkaki }: { berkaki: boolean }) {
  return <g stroke="#345d50" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M51 50C72 35 88 29 119 35C97 39 84 57 62 63Z" fill="#91bda1" />
    <path d="M58 53Q90 39 110 36" fill="none" stroke="#518878" strokeWidth="2" />
    {berkaki && <>
      <path d="M59 43L72 38L81 49L89 45M81 49L86 52" fill="none" stroke="#648d5d" strokeWidth="4.5" />
      <path d="M60 62L65 75L78 78L86 73M78 78L85 82" fill="none" strokeWidth="5" />
    </>}
    <ellipse cx="38" cy="55" rx="25" ry="19" fill="#69a183" />
    <path d="M20 51Q28 43 40 44" fill="none" stroke="#b6d4a2" strokeWidth="3" />
    <circle cx="27" cy="54" r="3.3" fill="#223d39" stroke="none" />
  </g>;
}

function Katak({ berekor }: { berekor: boolean }) {
  return <g transform={berekor ? "translate(1 6) scale(.91)" : "translate(12 0)"} stroke="#385e43" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
    {berekor && <path d="M77 52Q96 40 122 48Q107 50 96 60Q87 66 78 64Z" fill="#91bda1" />}
    <path d="M42 62L33 76L22 77M33 76L26 82M70 57Q86 50 89 63Q88 72 76 75H88" fill="none" stroke="#628b53" strokeWidth="5" />
    <path d="M34 57Q38 38 54 40Q72 34 84 48Q91 62 75 66Q63 75 43 69Z" fill="#76a861" />
    <path d="M17 53Q18 43 28 40Q29 31 39 32Q48 33 49 43Q59 49 52 57Q39 63 23 60Z" fill="#a1bd68" />
    <path d="M22 54Q29 57 41 54" fill="none" stroke="#597d43" strokeWidth="1.8" />
    <path d="M41 62L41 76L31 82M41 76L39 83M65 58Q80 51 85 64L76 73L91 79M76 73L86 83" fill="none" strokeWidth="4.5" />
    <circle cx="38" cy="42" r="4" fill="#223b38" stroke="none" />
    <circle cx="37" cy="41" r="1.1" fill="#fff" stroke="none" />
  </g>;
}

function TelurBelalang() {
  return <g strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 44Q44 34 65 43T116 43V82H14Z" fill="#b99166" stroke="#815f47" strokeWidth="2.8" />
    <path d="M14 44Q44 34 65 43T116 43" fill="none" stroke="#729652" strokeWidth="5" />
    <path d="M39 59Q54 51 71 56Q93 54 94 65Q86 75 55 78Q38 75 39 59Z" fill="#e0b486" stroke="#916a47" strokeWidth="2.1" />
    {[[47, 65], [58, 63], [69, 62], [80, 62], [54, 71], [65, 70], [76, 69]].map(([x, y]) => (
      <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="5.4" ry="2.7" transform={`rotate(-26 ${x} ${y})`} fill="#f8da9d" stroke="#936c40" strokeWidth="1.3" />
    ))}
    <path d="M24 55L32 53M25 70L31 73M98 51L106 53M101 73L109 70" stroke="#93704e" strokeWidth="2" />
  </g>;
}

function Belalang({ sayap }: { sayap: "belum" | "bakal" | "penuh" }) {
  return <g transform={sayap === "belum" ? "translate(13 11) scale(.83)" : undefined} stroke="#3e6744" strokeWidth="2.9" strokeLinecap="round" strokeLinejoin="round">
    {sayap === "penuh" && <>
      <path d="M53 47Q57 29 79 18Q95 10 111 17Q116 23 104 32Q86 45 60 51Z" fill="#d7e5a3" />
      <path d="M57 47Q78 28 104 20M69 39L89 34M76 32L85 23" fill="none" stroke="#7a944e" strokeWidth="1.9" />
    </>}
    <path d="M54 53L46 69L31 73M62 54L60 70L49 78M72 58L92 44L106 73L117 76" fill="none" stroke="#819769" strokeWidth="3.4" />
    <path d="M42 49Q51 41 77 48Q91 53 109 55Q107 63 89 68Q74 71 53 64Z" fill="#8bad59" />
    <path d="M82 53L84 66M91 55L93 64M100 55L101 61" fill="none" stroke="#597943" strokeWidth="1.8" />
    <path d="M28 44Q32 36 43 37L51 45L47 59L34 61Q26 57 28 44Z" fill="#a4b96b" />
    <path d="M32 41L23 23L17 19M39 38L36 21L32 15" fill="none" strokeWidth="2.2" />
    <circle cx="36" cy="46" r="3.8" fill="#253d37" stroke="none" />
    {sayap === "bakal" && <path d="M48 45Q60 43 73 53L70 58L54 54Z" fill="#a6bd71" />}
    {sayap === "penuh" && <>
      <path d="M47 45Q66 39 83 47L113 57Q99 65 72 59L54 54Z" fill="#b7c983" />
      <path d="M56 47Q75 49 103 57" fill="none" stroke="#7a944e" strokeWidth="2" />
    </>}
    <path d="M48 56L39 73L26 78M58 60L53 77L41 83M67 61L84 50L98 80L112 84" fill="none" strokeWidth="4.2" />
  </g>;
}

export function IlustrasiSiklusHewan({ id }: { id: string }) {
  switch (id) {
    case "qc-katak-telur": return <TelurKatak />;
    case "qc-katak-berudu": return <Berudu berkaki={false} />;
    case "qc-katak-berudu-berkaki": return <Berudu berkaki />;
    case "qc-katak-muda-berekor": return <Katak berekor />;
    case "qc-katak-dewasa": return <Katak berekor={false} />;
    case "qc-belalang-telur": return <TelurBelalang />;
    case "qc-belalang-nimfa": return <Belalang sayap="belum" />;
    case "qc-belalang-bakal-sayap": return <Belalang sayap="bakal" />;
    case "qc-belalang-dewasa": return <Belalang sayap="penuh" />;
    default: return ILUSTRASI_SIKLUS_AIR[id] ?? ILUSTRASI_SIKLUS_KEBUN[id] ?? null;
  }
}
