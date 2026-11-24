import type { ReactNode } from "react";

const INK = "#31474d";

function HewanEmpatKaki({ kambing }: { kambing: boolean }) {
  const warna = kambing ? "#e6c6a0" : "#e99b66";
  const kakiBelakang = kambing ? "#a58064" : "#b77050";
  return <g stroke={INK} strokeWidth="2.4">
    <path d="M33 55H41L40 82H32ZM65 54H75L74 83H64Z" fill={kakiBelakang} />
    {kambing ? <path d="M33 43Q13 32 13 45Q16 51 31 54Z" fill={warna} />
      : <path d="M37 51Q9 46 15 23Q18 15 23 24Q20 44 38 40Z" fill={warna} />}
    <path d="M31 58Q23 43 42 37Q61 28 84 38Q94 43 92 55Q89 68 73 70H49Q38 70 31 58Z" fill={warna} />
    <path d="M48 62L57 64L56 88H46ZM80 62L90 60L93 87H82Z" fill={warna} />
    <path d="M32 82H40M46 88H56M64 83H74M82 87H93" fill="none" strokeWidth="3.8" />
    {kambing ? <>
      <path d="M92 34Q78 23 87 13Q94 10 96 32M102 33Q100 13 108 12Q116 19 109 37" fill="#b59172" />
      <path d="M87 37Q75 23 79 38Q82 49 92 48M102 36Q114 27 119 31Q116 42 110 44" fill={warna} />
      <path d="M85 46Q83 31 103 31Q117 33 118 49Q118 60 104 64L100 77L94 64Q86 59 85 46Z" fill={warna} />
      <path d="M105 57Q113 57 116 52" fill="none" strokeWidth="1.7" />
      <circle cx="103" cy="45" r="2.8" fill={INK} stroke="none" />
    </> : <>
      <path d="M82 49Q76 40 79 26L93 34Q100 31 107 35L120 27Q124 44 117 52Q119 66 102 68Q84 68 82 49Z" fill={warna} />
      <path d="M82 31L91 37L83 40ZM117 32L110 38L118 42Z" fill="#f4b2a8" stroke="none" />
      <circle cx="92" cy="49" r="2.6" fill={INK} stroke="none" /><circle cx="109" cy="49" r="2.6" fill={INK} stroke="none" />
      <path d="M96 55H103L100 59Z" fill="#874d4c" stroke="none" />
      <path d="M79 51L88 54M79 57L89 58M111 55L123 53M111 59L123 60" fill="none" strokeWidth="1.6" />
    </>}
  </g>;
}

function NolKaki() {
  return <>
    <circle cx="65" cy="49" r="35" fill="#f5efe9" stroke="#9b6153" strokeWidth="3" />
    <path d="M64 72C55 76 48 67 54 59Q61 50 57 42Q51 29 65 27Q77 28 78 40Q78 49 72 55Q69 59 70 64Q72 69 64 72Z" fill="#977f70" />
    {[[-10,-20],[-4,-27],[3,-29],[10,-26],[15,-20]].map(([x,y]) => <circle key={x} cx={65+x} cy={48+y} r="3.2" fill="#977f70" />)}
    <path d="M41 25L89 74" stroke="#bd444c" strokeWidth="6" />
  </>;
}

function BuluTebal() {
  return <>
    <path d="M78 30Q83 19 93 18L94 10Q103 11 107 24Q115 29 114 39L123 46Q125 54 114 58Q109 68 93 63L77 55Z" fill="#f8f4e6" stroke="#829691" strokeWidth="2.8" />
    <path d="M15 65Q9 46 23 30Q21 18 34 18Q41 11 49 17Q59 6 67 15Q78 9 85 20Q97 17 101 29Q92 40 99 48Q95 54 100 62Q102 74 96 82Q80 97 55 91Q36 95 27 85Q17 86 15 65Z" fill="#f5f1de" stroke="#829691" strokeWidth="3" />
    <path d="M30 57Q22 47 30 38Q29 47 38 50M52 41Q46 27 56 23Q55 34 63 41M76 36Q82 25 91 28Q83 32 83 43M39 77Q29 67 40 58Q37 67 48 68M64 62Q64 50 75 47Q71 54 77 61M77 80Q80 69 92 65Q90 72 94 76M55 81Q56 71 64 70" fill="none" stroke="#aeb6a7" strokeWidth="3.1" />
    <circle cx="105" cy="38" r="2.5" fill={INK} />
    <path d="M118 44L123 46L121 51Z" fill={INK} />
  </>;
}

function Sirip() {
  return <g stroke="#406b74" strokeWidth="2.6">
    <path d="M60 44Q56 27 62 17Q77 21 88 45Z" fill="#80b4b8" />
    <path d="M29 55Q47 33 78 40Q101 44 118 58Q101 78 72 80Q43 82 29 63Z" fill="#a1d3d5" />
    <path d="M33 53Q19 45 10 34Q11 51 16 58Q12 68 10 82Q25 75 33 66Z" fill="#e89a4c" stroke="#9d613b" strokeWidth="3.2" />
    <path d="M19 48L27 57M19 70L27 62M87 69Q98 65 103 61" fill="none" strokeWidth="1.8" />
    <circle cx="97" cy="54" r="3.7" fill={INK} stroke="none" />
  </g>;
}

function Insang() {
  return <g stroke="#466d72" strokeWidth="2.7">
    <path d="M19 19Q59 9 92 30Q111 43 121 57Q105 76 85 84Q57 93 20 79Z" fill="#91c2bf" />
    <path d="M64 23Q86 52 69 83M57 24Q78 51 62 82M50 24Q69 51 55 81" fill="none" stroke="#b85352" strokeWidth="3.5" />
    <circle cx="95" cy="47" r="7" fill="#f9f4de" /><circle cx="96" cy="47" r="3.5" fill={INK} stroke="none" />
    <path d="M108 62L118 57" fill="none" />
  </g>;
}

function Punuk() {
  return <>
    <path d="M13 73Q15 55 32 51Q38 25 54 22Q70 20 77 49Q88 51 99 42L106 22Q105 11 112 12Q119 12 119 21L126 23Q129 31 117 33L113 56Q109 74 96 79H40Q24 81 13 73Z" fill="#dab278" stroke="#8b633f" strokeWidth="3" />
    <path d="M33 51Q40 24 55 22Q71 21 77 49Q66 57 54 57Q44 57 33 51Z" fill="#eabd6d" stroke="#a57142" strokeWidth="2.6" />
    <path d="M44 45Q48 31 56 30" fill="none" stroke="#f9dca0" strokeWidth="3.2" />
    <circle cx="114" cy="22" r="2.5" fill="#63482f" />
  </>;
}

function KakiUnta() {
  return <>
    <path d="M16 86Q61 74 113 84" fill="none" stroke="#c69d67" strokeWidth="5" />
    <path d="M53 9H74Q72 37 76 53Q91 58 95 78Q90 90 73 86L65 82Q48 94 35 83Q31 72 46 57Q52 38 53 9Z" fill="#cc9e67" stroke="#805936" strokeWidth="3" />
    <path d="M66 65Q70 72 65 82M38 79Q51 83 59 75M76 79Q84 81 92 78" fill="none" stroke="#805936" strokeWidth="2.5" />
  </>;
}

function WarnaHijau() {
  return <g stroke="#4f7c4d" strokeWidth="2.1">
    <path d="M12 68Q19 27 59 29Q48 68 12 68ZM69 27Q94 10 118 17Q106 49 69 44ZM63 84Q91 61 118 70Q109 91 79 92Z" fill="#a2ca7d" />
    <path d="M20 62L46 36M78 38L110 23M80 87L110 75" fill="none" />
    <path d="M49 61Q56 40 75 32Q88 23 97 34Q101 47 88 51Q74 55 65 69Q54 83 34 83Q27 84 19 79Q32 79 37 73Z" fill="#5c9a56" />
    <path d="M72 43L59 38L53 26M66 56L82 63L91 58M54 62L40 56L33 59M52 71L60 83L70 86" fill="none" stroke="#5c9a56" strokeWidth="4.5" />
    <circle cx="89" cy="37" r="2.8" fill="#243e31" stroke="none" />
  </g>;
}

function EkorPanjang() {
  return <>
    <path d="M17 22Q62 18 114 24L115 34Q63 30 17 33Z" fill="#ae8056" stroke="#795738" strokeWidth="2.8" />
    <path d="M63 67C69 54 79 58 88 49C98 39 99 17 87 14C79 12 72 19 76 33" fill="none" stroke="#61452f" strokeWidth="10" />
    <path d="M63 67C69 54 79 58 88 49C98 39 99 17 87 14C79 12 72 19 76 33" fill="none" stroke="#c38456" strokeWidth="6" />
    <path d="M53 64Q61 63 64 74Q64 84 49 89Q36 96 28 88Q21 80 29 70Q39 62 53 64Z" fill="#9f7350" stroke="#65482f" strokeWidth="2.6" />
    <path d="M38 67Q30 54 23 63Q16 75 26 83Q34 85 39 79" fill="#c69264" stroke="#65482f" strokeWidth="2.3" />
    <circle cx="26" cy="70" r="2" fill="#3f332d" />
    <path d="M45 70Q44 56 51 48M52 84Q63 83 66 90" fill="none" stroke="#65482f" strokeWidth="4" />
  </>;
}

function KakiBerselaput() {
  return <g stroke="#a2593f" strokeWidth="2.8" transform="rotate(12 65 50)">
    <path d="M58 14H69L72 48Q87 53 107 72Q95 76 81 72Q78 86 72 92Q64 86 59 77Q46 86 29 83Q35 66 54 48Z" fill="#ed9d59" />
    <path d="M58 52L39 77M65 50L70 84M71 52L96 69" fill="none" stroke="#b96745" strokeWidth="3.2" />
    <path d="M59 16L60 37M48 73L58 64" fill="none" stroke="#ffca87" strokeWidth="3" />
  </g>;
}

function BuluMata() {
  return <>
    <path d="M20 54Q20 30 43 23Q73 15 101 39Q115 54 106 75Q67 92 29 75Z" fill="#ddb886" stroke="#a07350" strokeWidth="2.8" />
    <path d="M33 58Q57 30 83 49L93 57Q61 78 33 58Z" fill="#f6e6c4" stroke="#5a463b" strokeWidth="3" />
    <ellipse cx="63" cy="56" rx="10" ry="12" fill="#916842" stroke="#594435" strokeWidth="2.6" />
    <circle cx="63" cy="56" r="5" fill="#403635" /><circle cx="65" cy="52" r="2.7" fill="#fff8de" />
    <path d="M43 48Q34 42 30 33M52 42Q43 32 42 25M61 41Q56 31 55 24M70 43Q69 31 72 25M80 47Q88 38 89 31M87 52Q96 47 99 40" fill="none" stroke="#5a463b" strokeWidth="3.6" />
  </>;
}

const GAMBAR: Record<string, () => ReactNode> = {
  "hewan-pilah-kucing-empat-kaki": () => <HewanEmpatKaki kambing={false} />,
  "hewan-pilah-kambing-empat-kaki": () => <HewanEmpatKaki kambing />,
  "hewan-pilah-nol-kaki": NolKaki,
  "hewan-pilah-bulu-tebal": BuluTebal,
  "hewan-pilah-sirip": Sirip,
  "hewan-pilah-insang": Insang,
  "hewan-pilah-punuk": Punuk,
  "hewan-pilah-kaki-unta": KakiUnta,
  "hewan-pilah-warna-hijau": WarnaHijau,
  "hewan-pilah-ekor-panjang": EkorPanjang,
  "hewan-pilah-selaput": KakiBerselaput,
  "hewan-pilah-bulu-mata": BuluMata,
};

export const ILUSTRASI_HEWAN_PILAH_IDS = Object.keys(GAMBAR);

export function IlustrasiHewanPilah({ id }: { id: string }) {
  const Gambar = GAMBAR[id];
  if (!Gambar) return null;
  return <g strokeLinecap="round" strokeLinejoin="round"><Gambar /></g>;
}
