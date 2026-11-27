import type { ReactNode } from "react";
import { IlustrasiSiklusHewan } from "./ilustrasi-siklus-hewan";

const kontur = { strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Kolam() {
  return <g {...kontur} data-petunjuk="kolam">
    <path d="M9 61Q9 42 42 34Q59 15 92 30Q123 35 123 57Q123 79 96 84Q62 97 30 85Q7 82 9 61Z" fill="#92bc62" stroke="#527c43" />
    <path d="M17 61Q18 48 48 41Q62 25 90 37Q115 41 115 57Q116 73 92 77Q63 89 34 77Q17 74 17 61Z" fill="#6bc6df" stroke="#347c91" />
    <path d="M32 61H55M59 71H84M78 48H97" stroke="#e0f8f8" strokeWidth="3" />
    <path d="M20 48V24M26 48L30 31M17 47L12 36M106 72L111 48M111 74L119 60" stroke="#416e42" strokeWidth="3" />
    <path d="M20 25V18M30 33L32 26M111 50L113 44" stroke="#926746" strokeWidth="4" />
  </g>;
}

function Tanah({ children }: { children?: ReactNode }) {
  return <g {...kontur}>
    <path d="M9 37H121V88Q121 94 115 94H15Q9 94 9 88Z" fill="#c89158" stroke="#855836" />
    <path d="M10 72Q37 68 65 75T120 75V87Q120 93 114 93H16Q10 93 10 87Z" fill="#ac7147" />
    <path d="M9 39Q34 31 55 37T87 36Q104 31 121 37" fill="none" stroke="#669747" strokeWidth="7" />
    <path d="M20 36L17 26M23 35L28 26M102 34L100 25M106 33L113 21" fill="none" stroke="#669747" strokeWidth="3" />
    <path d="M23 54l5 1m71-5 6 2M36 81l5-2m52 4 7-2" fill="none" stroke="#965f3e" />
    {children}
  </g>;
}

function BawahBatu({ children }: { children?: ReactNode }) {
  return <g {...kontur} data-petunjuk="celah-di-bawah-batu">
    <path d="M7 84Q44 75 65 83T124 83V93H7Z" fill="#a98058" stroke="#896247" />
    <path d="M14 83L19 55 36 45H95L110 54 116 83Z" fill="#4f4942" stroke="#685d50" />
    <path d="M12 55L20 36 39 17 71 11 106 28 119 51Q101 55 84 52Q73 44 59 48L44 55Q28 57 12 55Z" fill="#8d9d9b" stroke="#475a59" />
    <path d="M26 42L43 25 65 19 86 25 78 34 54 28 31 47Z" fill="#acbcb4" />
    <path d="M14 52Q26 48 35 53M84 50Q103 46 113 51" fill="none" stroke="#5b8856" strokeWidth="4" />
    <g fill="#76c6da" stroke="#4c8c9e" strokeWidth="1.5" data-petunjuk="lembap">
      <path d="M28 59Q34 66 28 69Q22 66 28 59ZM100 60Q106 67 100 70Q94 67 100 60Z" />
      <path d="M39 88Q44 85 48 88Q43 91 39 88ZM83 87Q91 84 95 88Q90 91 83 87Z" />
    </g>
    {children}
  </g>;
}

function Siput() {
  return <g {...kontur} stroke="#5c4a37" data-petunjuk="siput">
    <path d="M42 79Q48 74 67 77Q74 76 76 68Q77 62 82 63Q88 64 87 70L84 80Q81 84 71 84H43Q38 83 42 79Z" fill="#e7bb7e" />
    <path d="M79 65L78 59M84 65L88 58" fill="none" stroke="#ead3a1" />
    <circle cx="78" cy="58" r="1.4" fill="#ead3a1" stroke="none" />
    <circle cx="88" cy="58" r="1.4" fill="#ead3a1" stroke="none" />
    <circle cx="59" cy="69" r="12" fill="#d99155" />
    <path d="M65 68Q62 62 57 65Q52 69 57 73Q61 75 64 72Q66 69 62 68" fill="none" stroke="#8b5439" strokeWidth="1.6" />
  </g>;
}

function Kumbang() {
  return <g {...kontur} stroke="#d7e6a4" data-petunjuk="kumbang">
    <path d="M58 60L51 56M72 60L79 56M57 68L48 65 44 69M57 73L48 74 45 78M59 77L53 82M73 68L82 65 86 69M73 73L82 74 85 78M71 77L77 82" fill="none" strokeWidth="2" />
    <circle cx="65" cy="62" r="6" fill="#466740" />
    <ellipse cx="65" cy="72" rx="11" ry="12" fill="#7f9f4e" />
    <path d="M65 64V82M56 67Q65 65 74 67" fill="none" stroke="#3f623d" strokeWidth="1.6" />
    <path d="M60 70L59 75" stroke="#c8d781" strokeWidth="2" />
  </g>;
}

function DaunUlat() {
  return <g {...kontur}>
    <g data-petunjuk="daun">
      <path d="M13 78Q14 50 39 33Q67 10 117 21Q110 51 83 67Q48 89 15 82Z" fill="#7cbe63" stroke="#3f743e" />
      <path d="M9 86Q47 68 109 29M40 70L36 48M58 59L54 38M66 54L84 62M82 44L81 30" fill="none" stroke="#4f9147" />
    </g>
    <g transform="rotate(12 64 49)" stroke="#405d37" data-petunjuk="ulat">
      <path d="M33 52L30 58M46 53L44 61M58 53L57 62M72 52L72 60M85 48L87 55" stroke="#526846" strokeWidth="3" />
      <ellipse cx="34" cy="47" rx="9" ry="8" fill="#cad76b" />
      <ellipse cx="47" cy="45" rx="10" ry="9" fill="#a1c353" />
      <ellipse cx="61" cy="43" rx="10" ry="10" fill="#b9ce63" />
      <ellipse cx="75" cy="40" rx="10" ry="10" fill="#a1c353" />
      <circle cx="89" cy="36" r="12" fill="#c4d875" />
      <path d="M83 26L79 20M92 24L95 18" fill="none" />
      <circle cx="93" cy="35" r="2.4" fill="#243c2d" stroke="none" />
    </g>
  </g>;
}

function BurungSarang() {
  return <g {...kontur} data-petunjuk="sarang-di-dahan">
    <path d="M9 78Q49 69 116 75M29 74L18 48" fill="none" stroke="#895930" strokeWidth="9" />
    <path d="M19 48Q12 23 36 24Q38 43 19 48ZM97 75Q104 50 123 55Q121 72 97 75Z" fill="#78b35a" stroke="#497641" />
    <ellipse cx="64" cy="59" rx="24" ry="17" fill="#80b1cb" stroke="#405f75" />
    <path d="M49 59Q67 44 77 59Q70 68 53 68Z" fill="#5489a6" />
    <circle cx="76" cy="39" r="15" fill="#a9cfde" stroke="#405f75" />
    <path d="M88 37L104 42 89 47Z" fill="#f0ab49" stroke="#99602e" />
    <circle cx="81" cy="37" r="2.7" fill="#253847" />
    <path d="M31 61Q62 72 95 60Q90 81 64 84Q38 80 31 61Z" fill="#b68754" stroke="#7d532f" />
    <path d="M39 67Q65 78 87 66M42 73Q60 83 84 72M48 71L57 79M70 71L63 81M80 70L74 79" fill="none" stroke="#7d532f" strokeWidth="1.8" />
  </g>;
}

function TupaiDahan() {
  return <g {...kontur} stroke="#84533b" data-petunjuk="tupai-ekor-lebat">
    <path d="M9 84H121" stroke="#97633b" strokeWidth="9" />
    <path d="M56 73Q36 86 21 70Q6 55 17 32Q28 10 48 17Q61 22 59 37Q55 48 42 49Q33 52 36 64Q42 72 56 65Z" fill="#b47b54" />
    <path d="M26 36Q32 23 46 24" stroke="#d2ab81" strokeWidth="4" fill="none" />
    <path d="M49 72Q48 61 60 51Q60 40 70 34L73 23Q84 24 87 33Q102 34 108 43L119 49 111 56 97 56Q90 61 84 70L88 79H72L67 72 62 81H47Z" fill="#ca925f" />
    <path d="M67 55Q77 49 88 53L94 59Q81 68 84 74H72L66 67Z" fill="#f1cfa5" stroke="none" />
    <circle cx="98" cy="43" r="3" fill="#392e29" stroke="none" />
    <path d="M113 47L120 49 115 53Z" fill="#513a30" stroke="none" />
  </g>;
}

function IkanKecil() {
  return <g {...kontur} data-petunjuk="ikan-kecil-di-air">
    <ellipse cx="65" cy="57" rx="55" ry="33" fill="#bdebf4" stroke="#81bece" />
    <path d="M22 79Q21 66 16 60M26 82Q32 69 35 66M105 78Q101 68 103 63M108 77Q114 67 116 60" fill="none" stroke="#6fa877" strokeWidth="3.5" />
    <path d="M43 49L29 40 30 63 44 58Q68 78 91 54Q68 31 43 49Z" fill="#e8a653" stroke="#ab703d" />
    <path d="M52 48Q65 44 74 48M75 48Q69 55 76 62" fill="none" stroke="#b66d3e" strokeWidth="2" />
    <circle cx="81" cy="53" r="2.6" fill="#25414d" />
    <circle cx="98" cy="37" r="4.5" stroke="#5ca6b9" fill="none" />
  </g>;
}

function Semut({ x, y, miring = 0 }: { x: number; y: number; miring?: number }) {
  return <g transform={`translate(${x} ${y}) rotate(${miring})`} stroke="#6b392d" fill="#98503b" strokeWidth="1.5" strokeLinecap="round">
    <path d="M-2 0L-5 -5-8 -5M0 0L1 -5 4 -6M2 0L5 -4 8 -4M-2 0L-5 5-8 5M0 0L1 5 4 6M2 0L5 4 8 4M7 -1L10 -4M7 1L11 3" fill="none" />
    <ellipse cx="-6" rx="4.6" ry="3.6" />
    <ellipse rx="2.5" ry="2.5" />
    <circle cx="5" r="3" />
  </g>;
}

function SarangSemut() {
  return <Tanah>
    <g data-petunjuk="lorong-dan-ruang-sarang" fill="#ecd5a6" stroke="#9b704b">
      <path d="M61 34Q58 48 63 62Q72 64 83 67L81 74Q68 71 62 72Q57 65 57 61Q47 63 37 65L34 59Q49 53 57 53L55 35Z" />
      <ellipse cx="37" cy="63" rx="15" ry="10" />
      <ellipse cx="87" cy="73" rx="17" ry="11" />
    </g>
    <Semut x={36} y={63} />
    <Semut x={87} y={73} miring={176} />
    <Semut x={58} y={46} miring={86} />
  </Tanah>;
}

function AkarRumput() {
  return <Tanah>
    <g data-petunjuk="akar-serabut" fill="none" stroke="#f3deaf" strokeWidth="2.8">
      <path d="M62 38Q64 55 53 75L45 85M62 40Q76 57 81 78M62 41Q54 55 41 64L35 72M63 41Q67 65 66 86M61 43Q49 52 35 54L24 61M64 42Q75 48 88 55L97 65" />
      <path d="M55 67L49 69 43 77M39 65L32 64M68 67L75 71M82 58L91 60M66 77L60 83" strokeWidth="1.8" />
    </g>
    <path d="M63 40Q53 24 38 22Q47 34 60 40Q51 25 51 10Q61 19 63 39Q64 19 76 12Q73 30 65 40Q79 23 94 24Q83 37 65 40Z" fill="#83b74f" stroke="#4c7439" />
  </Tanah>;
}

function CacingTanah() {
  return <Tanah>
    <path d="M20 70Q34 47 53 62T80 68Q92 43 110 57" fill="none" stroke="#80503e" strokeWidth="13" />
    <path d="M20 70Q34 47 53 62T80 68Q92 43 110 57" fill="none" stroke="#e39f9c" strokeWidth="9" />
    <path d="M26 62L31 67M34 57L37 62M44 58L43 64M52 61L50 66M70 70V76M82 64L88 67M93 54L96 59M103 52L102 57" fill="none" stroke="#bd746f" strokeWidth="1.8" />
  </Tanah>;
}

function HelaiPakis({ transform }: { transform: string }) {
  const anakDaun = [{ y: 58, panjang: 24 }, { y: 47, panjang: 22 }, { y: 36, panjang: 18 }, { y: 25, panjang: 13 }, { y: 16, panjang: 8 }];
  return <g transform={transform} stroke="#3d733d" strokeWidth="1.6" strokeLinejoin="round">
    <path d="M0 78V11" strokeWidth="3.6" />
    {anakDaun.map(({ y, panjang }) => <g key={y}>
      <path d={`M0 ${y + 3}Q${-panjang} ${y + 4} ${-panjang} ${y - 8}Q-7 ${y - 9} 0 ${y + 3}Z`} fill="#6eac58" />
      <path d={`M0 ${y + 1}Q${panjang} ${y + 4} ${panjang} ${y - 10}Q7 ${y - 9} 0 ${y + 1}Z`} fill="#8abb60" />
    </g>)}
    <path d="M0 14Q-7 6 1 1Q8 7 0 14Z" fill="#8abb60" />
  </g>;
}

function Pakis() {
  return <g {...kontur} data-petunjuk="anak-daun-pakis">
    <HelaiPakis transform="translate(27 25) rotate(-32) scale(.82)" />
    <HelaiPakis transform="translate(102 25) rotate(31) scale(.88)" />
    <HelaiPakis transform="translate(64 11)" />
  </g>;
}

function BeruangKutub() {
  return <g {...kontur} data-petunjuk="beruang-kutub-badan-putih">
    <path d="M8 83L31 76 71 76 91 79 119 75 125 82 108 92H23Z" fill="#dff0f5" stroke="#90b9cd" />
    <path d="M45 56Q48 71 41 80H53L63 61M75 59L80 81H91L91 57" fill="#cfdee5" stroke="#647e8a" />
    <path d="M23 48Q25 35 40 32Q61 26 79 34Q90 23 102 28Q108 30 110 40L120 48Q123 56 115 58L103 58Q98 66 91 68L95 79Q100 85 93 87H81L74 67Q59 70 44 65L39 83Q37 88 33 88H22Q18 85 23 80L26 65Q16 59 19 53Q14 52 17 47Q20 44 23 48Z" fill="#f6f8f5" stroke="#506777" />
    <path d="M34 42Q51 34 68 38M37 60Q53 66 72 61M87 39Q89 49 96 52" fill="none" stroke="#b4cad5" strokeWidth="2" />
    <path d="M99 29Q96 20 91 24Q87 29 93 34" fill="#e5edf0" stroke="#506777" />
    <circle cx="106" cy="42" r="2.3" fill="#293e4e" />
    <path d="M117 49Q124 46 123 52L118 54Z" fill="#334955" />
  </g>;
}

export const ILUSTRASI_HABITAT: Record<string, ReactNode> = {
  "habitat-kolam": <Kolam />,
  "habitat-katak-tepi-kolam": <g data-petunjuk="katak-di-tepi-kolam">
    <ellipse cx="65" cy="72" rx="59" ry="23" fill="#c9ddaa" />
    <g transform="translate(31 4) scale(.75)"><Kolam /></g>
    <g transform="translate(-3 31) scale(.76)"><IlustrasiSiklusHewan id="qc-katak-dewasa" /></g>
  </g>,
  "habitat-bawah-batu": <BawahBatu />,
  "habitat-dalam-tanah": <Tanah />,
  "habitat-batu-siput": <BawahBatu><Siput /></BawahBatu>,
  "habitat-batu-kumbang": <BawahBatu><Kumbang /></BawahBatu>,
  "habitat-ulat-daun": <DaunUlat />,
  "habitat-burung-sarang": <BurungSarang />,
  "habitat-tupai-dahan": <TupaiDahan />,
  "habitat-ikan-kecil": <IkanKecil />,
  "habitat-akar-rumput": <AkarRumput />,
  "habitat-cacing-tanah": <CacingTanah />,
  "habitat-semut-sarang": <SarangSemut />,
  "habitat-pakis": <Pakis />,
  "habitat-beruang-kutub": <BeruangKutub />,
  "habitat-kalajengking-gurun": <g {...kontur} data-petunjuk="gurun-berpasir">
    <rect x="5" y="13" width="120" height="74" rx="10" fill="#ffebbd" />
    <circle cx="105" cy="32" r="11" fill="#f4be62" />
    <path d="M5 58Q38 29 74 55Q105 50 125 66V77Q125 87 115 87H15Q5 87 5 77Z" fill="#e2b477" />
    <path d="M7 69Q35 57 65 65T123 62V77Q123 85 114 85H16Q7 85 7 77Z" fill="#f4ca8d" />
    <g fill="#9d613e" stroke="#704731" data-petunjuk="kalajengking">
      <path d="M58 57Q67 49 75 46Q85 42 81 33Q77 24 69 27" fill="none" strokeWidth="7" />
      <path d="M71 24Q64 23 62 30Q65 27 69 29Z" />
      <path d="M45 57L36 50 31 49M47 60L38 55 32 55M49 63L39 60 32 61M53 66L44 65 39 68M54 55L57 47 63 44M57 58L64 51 70 50M59 61L69 56 74 56M60 64L72 62 77 64" fill="none" />
      <ellipse cx="51" cy="59" rx="11" ry="8" transform="rotate(32 51 59)" />
      <circle cx="44" cy="65" r="6" />
      <path d="M41 64L32 65 28 71Q23 68 18 72Q20 76 26 75Q23 80 27 81Q36 76 34 71L42 69M47 70L47 76 54 79Q56 85 61 83L61 78Q67 80 68 76Q61 71 56 75L51 72 51 67" />
    </g>
  </g>,
  "habitat-hutan-hujan": <g {...kontur} data-petunjuk="hutan-hujan">
    <rect x="5" y="9" width="120" height="82" rx="10" fill="#bedecd" />
    <path d="M5 61Q36 44 66 57T125 52V84Q125 91 116 91H14Q5 91 5 83Z" fill="#68a271" />
    <path d="M29 84L30 34 25 24M61 87V26M100 85L98 40 106 27" fill="none" stroke="#53613f" strokeWidth="7" />
    <path d="M7 50Q3 37 16 31Q13 17 29 17Q40 11 50 25Q68 29 58 45Q34 59 7 50Z" fill="#648f4e" stroke="#467648" />
    <path d="M44 37Q39 21 52 16Q59 1 74 12Q87 12 91 27Q97 39 78 45Q58 48 44 37Z" fill="#80a95b" stroke="#467648" />
    <path d="M81 51Q74 38 85 28Q86 18 100 21Q108 14 121 27Q133 43 121 52Q98 60 81 51Z" fill="#51864f" stroke="#467648" />
    <path d="M15 81Q27 65 40 76Q47 63 55 74M72 83Q82 62 91 78Q105 65 118 79" fill="none" stroke="#b1ce70" strokeWidth="4" />
  </g>,
  "habitat-laut": <g {...kontur} data-petunjuk="laut">
    <rect x="5" y="11" width="120" height="78" rx="10" fill="#c4ecfa" stroke="#74a6bd" />
    <circle cx="101" cy="30" r="10" fill="#ffe291" />
    <path d="M6 48Q30 44 60 48T124 47V78Q124 88 114 88H16Q6 88 6 78Z" fill="#458fbd" />
    <path d="M6 62Q33 55 60 62T124 59V80Q124 88 114 88H16Q6 88 6 78Z" fill="#65bed4" />
    <path d="M12 69Q28 63 47 68M68 69Q90 62 115 67M34 80Q52 74 71 79M77 80Q90 74 102 77" fill="none" stroke="#d7f5fa" strokeWidth="2.8" />
  </g>,
  "habitat-arktik": <g {...kontur}>
    <rect x="5" y="11" width="120" height="78" rx="9" fill="#daeff7" stroke="#5c89a3" />
    <path d="M7 53L25 33 42 45 58 26 81 49 100 35 123 52V65H7Z" fill="#9cc8db" stroke="#689ab2" />
    <path d="M37 48L58 26 72 40 60 37 51 42 47 40ZM86 45L100 35 113 43 103 40 95 44Z" fill="#fff" />
    <path d="M7 55Q33 49 46 61L65 63 81 58Q104 57 123 60V80Q123 87 116 87H14Q7 87 7 80Z" fill="#68b3d1" />
    <path d="M7 56Q30 46 53 59L66 62 57 69 36 72 29 79 7 78Z" fill="#f6fafc" stroke="#8cbad1" />
    <path d="M77 64L87 61 100 64 93 69 80 69ZM97 77L106 73 117 75 113 80 102 81Z" fill="#f6fafc" stroke="#4389a9" />
    <path d="M47 80H63M70 74H80M87 84H94" fill="none" stroke="#c5e7f1" />
  </g>,
  "rubah-fennec": <g {...kontur} stroke="#966542">
    <path d="M46 68Q33 59 25 65Q14 75 10 70Q14 84 29 84Q41 85 48 79" fill="#dcaf79" />
    <path d="M12 70Q21 77 29 67L31 65Q22 64 19 69Q14 72 10 70Z" fill="#8f5e45" stroke="none" />
    <path d="M35 69Q42 61 60 63L97 68Q112 74 106 88H96L93 81Q69 88 52 80L51 88H41Z" fill="#e6bd87" />
    <path d="M47 56Q29 46 23 19Q21 11 24 7Q51 14 59 42M76 43Q90 13 111 7Q116 14 110 31Q102 49 89 54" fill="#ecc489" />
    <path d="M48 47Q33 33 30 16Q46 24 52 43ZM83 43Q91 26 106 15Q103 34 89 46Z" fill="#f5cfbb" stroke="#b27859" />
    <path d="M44 47Q65 35 85 45Q98 50 96 65Q92 76 70 81Q47 75 42 64Q39 56 44 47Z" fill="#efd19c" />
    <path d="M43 62Q52 60 63 65L70 67L77 64Q90 58 96 62Q92 76 70 81Q48 75 43 62Z" fill="#fff0d8" stroke="none" />
    <path d="M65 66Q71 64 76 66L71 71Z" fill="#533d34" stroke="none" />
    {[54, 86].map((x) => <circle key={x} cx={x} cy="55" r="3.7" fill="#402f30" stroke="none" />)}
  </g>,
  "burung-hantu-salju": <g {...kontur} stroke="#6a7b91">
    <path d="M48 78Q46 87 36 90Q44 94 52 91L60 93 65 88 74 93 82 91Q94 94 96 90Q86 87 82 78" fill="#edf4f9" />
    <path d="M46 34Q37 39 31 56Q28 75 37 85Q44 87 50 80Q65 87 80 80Q86 87 93 84Q103 69 95 53Q90 41 84 35Z" fill="#f5f8fa" />
    <path d="M32 64Q38 69 42 78M97 63Q92 69 88 77M45 74Q64 79 85 74" fill="none" stroke="#b9c8d0" />
    <path d="M36 38C33 22 47 11 65 11C83 11 97 22 94 38Q91 57 65 57Q39 57 36 38Z" fill="#fdfcfa" />
    <path d="M44 29Q51 21 60 27M86 29Q79 21 70 27" fill="none" stroke="#a6b6c2" />
    <circle cx="53" cy="35" r="7.6" fill="#ebbc42" stroke="#80653a" />
    <circle cx="77" cy="35" r="7.6" fill="#ebbc42" stroke="#80653a" />
    {[53, 77].map((x) => <circle key={x} cx={x} cy="35" r="3.6" fill="#273342" stroke="none" />)}
    <path d="M62 41Q65 39 68 41L65 47Z" fill="#425364" stroke="none" />
    <path d="M35 54l5 2m-6 6 6 2m50-10 5-2m-7 11 6-2M48 60l5 2m7 3 6 1m9-3 6-2m-30 8 6 2m17-1 6-2" fill="none" stroke="#778797" strokeWidth="2.6" />
  </g>,
  "rusa-kutub": <g {...kontur} stroke="#665044">
    <path d="M36 65L33 87H40L47 68M77 68L81 88H88L88 64" fill="#8f7564" />
    <path d="M14 48Q21 47 30 50Q44 44 65 48L78 44L89 35Q101 34 107 43L119 46Q122 49 116 55L103 56Q99 63 93 67L95 89H87L81 69Q65 75 47 69L42 90H34L35 68Q19 65 18 53Z" fill="#b59c88" />
    <path d="M79 45L89 35Q98 35 104 40L100 45Q97 57 93 67L83 71Q86 62 78 58L82 55Z" fill="#f5eee2" stroke="none" />
    <path d="M25 55Q33 51 41 52M92 44L97 40M90 48Q88 58 85 63" fill="none" stroke="#907766" strokeWidth="2" />
    <path d="M94 38Q86 31 87 18L91 7M88 24L82 18 80 11M89 31Q97 26 99 15M94 37Q104 32 108 24L109 13M106 29L114 24 118 17M103 33L115 32 122 27" fill="none" stroke="#8d674c" strokeWidth="3.1" />
    <path d="M86 20L83 15 86 12 90 14 92 9 96 11 93 17 91 22Z" fill="#997255" stroke="none" />
    <path d="M34 88H42M87 89H95" stroke="#42382f" strokeWidth="3.4" />
    <circle cx="103" cy="45" r="2.4" fill="#253239" stroke="none" />
    <path d="M117 46L121 49L118 52 114 49Z" fill="#3d342e" stroke="none" />
  </g>,
  "paus-beluga": <g {...kontur} stroke="#658c9e">
    <path d="M38 59Q27 58 22 63Q16 63 10 58Q5 67 14 74Q24 77 40 69" fill="#d4e5ef" />
    <path d="M31 61Q52 56 66 45Q75 39 85 37Q87 21 103 22Q119 22 124 39Q128 51 117 57Q100 72 72 74Q54 74 33 71Z" fill="#f8fbff" />
    <path d="M35 66Q57 68 73 63Q94 64 112 56Q103 68 82 72Q61 76 36 71Z" fill="#d8e8f2" stroke="none" />
    <path d="M87 58Q82 71 69 79Q75 85 85 76Q93 71 93 64" fill="#dceaf1" />
    <path d="M88 38Q91 28 103 27Q112 28 116 34" fill="none" stroke="#fff" strokeWidth="3.5" />
    <circle cx="111" cy="43" r="2.4" fill="#263c48" stroke="none" />
    <path d="M109 52Q116 53 122 47" fill="none" stroke="#628395" strokeWidth="1.9" />
  </g>,
};
