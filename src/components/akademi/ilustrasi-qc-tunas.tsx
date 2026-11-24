import type { ReactNode } from "react";

const GARIS = "#283a4b";

type Burung = { tubuh: string; sayap: string; kepala: string; paruh?: string; ciri: ReactNode; ekor?: ReactNode };
const BURUNG: Record<string, Burung> = {
  kalkun: {
    tubuh: "#725045", sayap: "#ba7957", kepala: "#dc796d",
    ekor: <path d="M49 62C9 57 5 32 20 26C17 15 30 10 38 16C46 6 54 12 57 20C70 11 80 27 73 39Z" fill="#9a5946" />,
    ciri: <path d="M102 40Q109 50 102 55Q97 53 98 43" fill="#d55051" />,
  },
  beo: {
    tubuh: "#48a76d", sayap: "#3580a2", kepala: "#ed6550", paruh: "M97 31Q118 28 115 43L108 48L106 39L97 40Z",
    ciri: <path d="M84 29Q89 21 98 27L99 39Q88 43 84 29Z" fill="#fff4ce" stroke="none" />,
  },
  jago: {
    tubuh: "#d18b4c", sayap: "#f1b85e", kepala: "#efa657",
    ekor: <path d="M49 62Q13 67 12 39Q23 38 31 48Q16 23 34 24Q48 34 49 52Z" fill="#4d8276" />,
    ciri: <path d="M83 26Q80 14 88 17Q94 8 98 19Q106 13 106 25L98 30Z" fill="#de574f" />,
  },
  bebek: {
    tubuh: "#f1cf68", sayap: "#e3a843", kepala: "#ffe087", paruh: "M97 32Q115 30 120 36Q112 43 97 40Z",
    ciri: null,
  },
  merak: {
    tubuh: "#308fc5", sayap: "#477caa", kepala: "#498dc7",
    ekor: <g><path d="M54 68C8 71 7 43 19 34C12 19 31 12 41 18C49 5 67 9 72 21C87 20 98 43 80 53Z" fill="#55aa7c" />
      {[[27, 41], [43, 29], [59, 23], [75, 34]].map(([x, y]) => <g key={x}><ellipse cx={x} cy={y} rx="6" ry="9" fill="#ecca66" /><ellipse cx={x} cy={y} rx="3" ry="5" fill="#3477a9" stroke="none" /></g>)}
    </g>,
    ciri: <path d="M91 23V13M96 22L103 14M87 23L81 15" fill="none" />,
  },
  burunghantu: {
    tubuh: "#a77b5d", sayap: "#80614e", kepala: "#bc916a", paruh: "M96 36L105 40L96 45L92 40Z",
    ciri: <><path d="M79 28L78 18L88 25M99 25L107 18L107 30" fill="#ad8062" />
      <ellipse cx="87" cy="34" rx="7" ry="8" fill="#fff0ca" /><ellipse cx="101" cy="34" rx="7" ry="8" fill="#fff0ca" /><circle cx="101" cy="34" r="2.6" fill={GARIS} stroke="none" />
    </>,
  },
};

function DuaKaki({ jenis }: { jenis: Burung }) {
  return <g stroke={GARIS} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {jenis.ekor}
    <g fill="none" stroke="#8c5627" strokeWidth="5">
      <path d="M56 69L53 92H44" />
      <path d="M75 69L78 92H88" />
    </g>
    <path d="M24 55Q44 47 65 56L78 37L98 43L91 62Q83 79 60 78Q34 78 24 55Z" fill={jenis.tubuh} />
    <path d="M45 57Q57 49 78 56Q70 74 57 72Q47 70 45 57Z" fill={jenis.sayap} />
    <circle cx="94" cy="35" r="13" fill={jenis.kepala} />
    {jenis.ciri}
    <path d={jenis.paruh ?? "M101 33L117 39L101 43Z"} fill="#f2aa42" />
    <circle cx={jenis === BURUNG.burunghantu ? 87 : 95} cy="33" r="2.5" fill={GARIS} stroke="none" />
  </g>;
}

type Mamalia = { tubuh: string; kepala: string; kaki: string; ciri: ReactNode; ekor: string; badan?: ReactNode };
const MAMALIA: Record<string, Mamalia> = {
  kuda: {
    tubuh: "#af6c46", kepala: "#ac724b", kaki: "#825137", ekor: "M29 47Q13 38 12 49Q15 55 9 63",
    ciri: <><path d="M91 44L97 20L107 17L110 24L90 54" fill="#5c4030" /><path d="M100 24L101 12L109 22" fill="#ad7149" /></>,
  },
  kerbau: {
    tubuh: "#727d84", kepala: "#87959b", kaki: "#5e6b72", ekor: "M28 48Q13 43 15 60",
    ciri: <path d="M101 32Q84 26 88 17Q96 25 103 25H110Q120 25 124 16Q130 28 116 34Z" fill="#d4c6a4" />,
  },
  domba: {
    tubuh: "#f3efdf", kepala: "#ae9882", kaki: "#7d6655", ekor: "M29 52L20 46",
    badan: <path d="M32 57Q22 47 34 41Q34 31 47 33Q55 27 64 32Q76 25 83 35Q94 31 99 48L94 65Q82 73 64 68Q45 74 32 57Z" fill="#fff2df" />,
    ciri: <path d="M99 34Q98 21 110 24Q119 21 121 33L112 37Z" fill="#fff2df" />,
  },
  sapi: {
    tubuh: "#fff3df", kepala: "#f5e7ce", kaki: "#665956", ekor: "M29 48Q14 43 17 61",
    badan: <path d="M42 44Q49 36 63 42Q66 49 56 57Q43 61 38 52ZM71 64Q72 50 85 46Q98 58 91 66Z" fill="#6c5861" stroke="none" />,
    ciri: <path d="M100 29L96 20L107 26M114 27L123 22L119 32" fill="#d4bd98" />,
  },
  rusa: {
    tubuh: "#c78a54", kepala: "#c6925a", kaki: "#9b6943", ekor: "M28 53L19 43",
    badan: <path d="M49 49H50M58 45H59M67 49H68M78 47H79" stroke="#fff2cf" strokeWidth="4" />,
    ciri: <path d="M103 32L98 13M99 20L91 16M100 23L105 17M112 29L118 10M115 19L124 16M114 23L110 15" fill="none" stroke="#77523b" strokeWidth="3" />,
  },
  anjing: {
    tubuh: "#b77c52", kepala: "#d49462", kaki: "#a16a46", ekor: "M29 49Q14 49 15 31",
    ciri: <path d="M103 29Q89 23 94 45Q100 50 105 44Z" fill="#855b43" />,
  },
};

function EmpatKaki({ jenis }: { jenis: Mamalia }) {
  return <g stroke={GARIS} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d={jenis.ekor} stroke={jenis.kaki} strokeWidth="6" fill="none" />
    <g stroke={jenis.kaki} strokeWidth="6" fill="none">
      <path d="M39 61L32 78V91H27" />
      <path d="M51 63L48 83V96H43" />
      <path d="M76 63L78 80V91H73" />
      <path d="M89 62L93 85V96H99" />
    </g>
    <path d="M27 48Q46 33 73 40L87 41L94 30L107 37L100 53L93 66Q69 72 47 66Q31 64 27 48Z" fill={jenis.tubuh} />
    {jenis.badan}
    <path d="M96 32Q106 25 114 34L125 43Q126 52 118 54L105 51L98 44Z" fill={jenis.kepala} />
    {jenis.ciri}
    <circle cx="111" cy="38" r="2.3" fill={GARIS} stroke="none" />
    <path d="M120 47H124" fill="none" />
  </g>;
}

function Pandan() {
  return <g stroke="#296646" strokeWidth="2" strokeLinejoin="round">
    <path d="M57 92Q52 50 16 22Q49 26 72 87Z" fill="#6bb359" />
    <path d="M59 91Q48 50 50 5Q72 33 68 89Z" fill="#5c9e50" />
    <path d="M62 90Q61 43 104 10Q85 51 72 92Z" fill="#78b65a" />
    <path d="M69 92Q81 52 121 39Q94 68 77 96Z" fill="#8fc96b" />
    <path d="M62 85L52 24M69 84Q79 57 94 31M76 87Q94 62 108 49" fill="none" stroke="#cfdf87" />
  </g>;
}

function BungaDalamPot() {
  return <g stroke={GARIS} strokeWidth="2.5" strokeLinejoin="round">
    <path d="M65 71V32M65 60Q45 43 37 54Q43 69 65 67M65 57Q84 42 91 52Q89 66 65 66" fill="#79b65d" />
    <g fill="#f4a35f">{[[65, 15], [80, 26], [73, 43], [56, 43], [50, 26]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="10" />)}</g>
    <circle cx="65" cy="30" r="10" fill="#ffd55f" />
    <path d="M43 71H87L81 94H49Z" fill="#bd684b" />
    <path d="M40 70H90V78H40Z" fill="#e48e66" />
  </g>;
}

function TendaDepan() {
  return <g stroke={GARIS} strokeWidth="3" strokeLinejoin="round">
    <path d="M65 9L116 89H14Z" fill="#f4b75e" />
    <path d="M65 36L96 89H34Z" fill="#d77d41" />
    <path d="M65 36V89M14 89H116" fill="none" strokeLinecap="round" />
    <path d="M27 80L59 27" stroke="#ffd991" strokeLinecap="round" />
  </g>;
}

function LangitMendung({ malam = false }: { malam?: boolean }) {
  return <>
    <rect x="5" y="7" width="120" height="86" rx="13" fill={malam ? "#223452" : "#748596"} />
    {malam && <path d="M95 19Q84 33 96 48Q75 48 76 32Q79 18 95 19Z" fill="#f4d469" />}
    <path d="M27 65Q15 59 23 45Q29 34 43 37Q46 20 64 24Q76 24 82 37Q98 33 105 45Q118 63 104 70H31Z" fill="#48596e" stroke="#303d54" strokeWidth="2.5" />
    <path d="M21 70Q32 62 43 68Q54 55 70 66Q85 56 96 67Q111 65 114 77L23 82Z" fill="#5c6c80" />
  </>;
}

function Semangka({ makan }: { makan: boolean }) {
  return <g stroke={GARIS} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {makan ? <>
      <circle cx="63" cy="42" r="30" fill="#f2bf91" />
      <path d="M34 37Q37 6 64 11Q88 10 93 34Q78 25 70 26Q57 34 34 37Z" fill="#72513d" />
      <circle cx="52" cy="42" r="2.4" fill={GARIS} /><circle cx="75" cy="42" r="2.4" fill={GARIS} />
      <path d="M54 54Q63 62 72 54" fill="none" />
    </> : <rect x="14" y="47" width="102" height="42" rx="8" fill="#d9ad72" />}
    <path d={makan ? "M32 62H96Q91 91 65 94Q41 91 32 62Z" : "M28 63H97Q87 83 62 84Q39 83 28 63Z"} fill="#549e60" />
    <path d={makan ? "M36 62H92Q86 84 65 88Q44 83 36 62Z" : "M32 63H93Q84 76 62 78Q42 77 32 63Z"} fill="#ee716b" />
    <path d="M51 66L53 69M65 68V72M79 66L77 69" strokeWidth="3" />
    {makan ? <><path d="M36 67Q20 60 20 75Q24 86 41 84M92 67Q107 60 108 75Q104 86 88 84" fill="#f2bf91" /></>
      : <><path d="M38 60L79 37L88 47L69 49Q51 62 39 63Z" fill="#e2edf4" /><path d="M80 36L101 25L108 34L88 47Z" fill="#76534e" /></>}
  </g>;
}

const ADEGAN: Record<string, ReactNode> = {
  "daun-pandan": <Pandan />,
  "bunga-dalam-pot": <BungaDalamPot />,
  "tenda-depan": <TendaDepan />,
  "awan-mendung": <LangitMendung />,
  "awan-mendung-malam": <LangitMendung malam />,
  "potong-semangka": <Semangka makan={false} />,
  "makan-semangka": <Semangka makan />,
};

export const ILUSTRASI_QC_TUNAS_IDS = [...Object.keys(BURUNG), ...Object.keys(MAMALIA), ...Object.keys(ADEGAN)].map((id) => `qc-tunas-${id}`);

export function IlustrasiQcTunas({ id }: { id: string }) {
  const jenis = id.slice("qc-tunas-".length);
  if (BURUNG[jenis]) return <DuaKaki jenis={BURUNG[jenis]} />;
  if (MAMALIA[jenis]) return <EmpatKaki jenis={MAMALIA[jenis]} />;
  return ADEGAN[jenis] ?? null;
}
