import type { ReactNode } from "react";

const GARIS = { stroke: "#5e4935", strokeWidth: 2.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Meranti() {
  return <g {...GARIS}>
    <path d="M62 72Q29 59 24 20Q40 22 67 67M64 68Q51 28 63 7Q79 24 70 69M69 68Q90 25 110 24Q107 54 74 72"
      fill="#ce9b65" />
    <path d="M63 74Q40 72 35 54Q49 53 66 70M71 71Q86 57 94 58Q93 72 73 76" fill="#e3b57a" />
    <path d="M32 28L61 67M64 17L67 66M102 32L73 67" fill="none" stroke="#936840" strokeWidth="1.7" />
    <path d="M58 69q9-10 18 0 4 13-8 20-12-4-10-20Z" fill="#92765a" />
  </g>;
}

function Dandelion() {
  return <g {...GARIS}>
    <path d="M65 23V68" fill="none" stroke="#9f8664" strokeWidth="2" />
    <path d="M65 68Q83 71 64 92Q48 75 65 68Z" fill="#b89062" />
    <path d="M65 72v12" fill="none" stroke="#e4bf89" strokeWidth="2" />
    <path d="M65 34L28 23m37 11L37 13m28 21L51 8m14 26V6m0 28L79 8M65 34l28-21M65 34l37-11M65 34l28 2M65 34l-28 2"
      stroke="#758c91" strokeWidth="2.1" fill="none" />
  </g>;
}

function KaitRumput() {
  return <g {...GARIS}>
    {[{ x: 32, y: 62, a: 30 }, { x: 61, y: 55, a: 12 }, { x: 91, y: 67, a: -12 }].map(({ x, y, a }) =>
      <g key={x} transform={`translate(${x} ${y}) rotate(${a})`}>
        <path d="M0 18Q-8 4-4-11L2-26 6-11Q9 5 0 18Z" fill="#a98957" />
        <path d="M0 14L2-22M3-20q9-15 9-23m-10 20q-8-11-8-19" fill="none" stroke="#795f3e" strokeWidth="2" />
        <path d="m-3-11-4-5m12 1 4-6m-13 16-5-2m14-2 6-4m-15 18-5-4m13 2 5-4" fill="none" strokeWidth="1.7" />
      </g>
    )}
  </g>;
}

const BUAH_TERBELAH = {
  "pacar-air": {
    katup: ["M46 82Q21 73 35 38Q50 19 67 29Q43 34 51 49Q62 63 46 82Z", "M47 82Q58 58 76 58Q100 55 100 39Q115 56 94 73Q69 75 47 82Z"],
    urat: "M49 82l-10 8M32 60q-4-15 11-24M67 78l15-5",
    isi: "#a9c97d", tepi: "#65804a", warnaBiji: "#625042", ukuranBiji: [3.7, 4.5],
    biji: [[57,40],[78,29],[96,15],[110,32]],
  },
  pletekan: {
    katup: ["M27 79Q18 68 44 45L80 22Q81 39 61 55L27 79Z", "M28 79Q45 66 69 56L95 44Q101 57 76 68Q46 74 28 79Z"],
    urat: "M27 74Q46 54 72 38M41 75Q66 68 85 56",
    isi: "#c39262", tepi: "#946c4d", warnaBiji: "#80563b", ukuranBiji: [3.7, 3],
    biji: [[54,36],[75,25],[92,12],[106,28]],
  },
  lamtoro: {
    katup: ["M14 77Q18 52 48 37Q84 15 113 22Q88 44 53 52Q32 60 14 77Z", "M15 77Q46 81 72 62Q90 49 115 44Q102 68 76 77Q43 89 15 77Z"],
    urat: "m20 73 23-24m5 1 47-23m-46 54 26-9M58 41l4 6m8-10 4 5m9-9 4 4",
    isi: "#ba8960", tepi: "#946c4d", warnaBiji: "#80563b", ukuranBiji: [3.7, 4.5],
    biji: [[43,29],[64,22],[80,13],[104,35]],
  },
  kacang: {
    katup: ["M20 76Q27 47 60 37q32-10 50-5-13 21-45 24Q41 60 20 76Z", "M20 76Q43 83 64 72q27-16 51-14-7 22-34 28-37 11-61-10Z"],
    urat: "M30 69Q58 42 97 41M34 83Q64 85 90 68",
    isi: "#d0ad6d", tepi: "#9e7f50", warnaBiji: "#a78152", ukuranBiji: [5.3, 4.5],
    biji: [[56,28],[76,18],[98,12],[117,41]],
  },
} as const;

function BuahTerbelah({ jenis }: { jenis: keyof typeof BUAH_TERBELAH }) {
  const buah = BUAH_TERBELAH[jenis];
  const [rx, ry] = buah.ukuranBiji;
  return <g {...GARIS}>
    {buah.katup.map((d) => <path key={d} d={d} fill={buah.isi} />)}
    <path d={buah.urat} fill="none" stroke={buah.tepi} strokeWidth="1.8" />
    {buah.biji.map(([x, y], i) => <ellipse key={x} cx={x} cy={y} rx={rx} ry={ry}
      fill={buah.warnaBiji} transform={`rotate(${i * 17} ${x} ${y})`} />)}
  </g>;
}

function BuahKapsul({ berduri }: { berduri: boolean }) {
  return <g {...GARIS}>
    <path d="M46 79Q21 70 23 48Q25 28 47 34Q47 17 63 15Q82 14 88 32Q109 32 109 55Q108 81 80 82Q65 93 46 79Z"
      fill={berduri ? "#c39067" : "#a57558"} />
    <path d="M47 34q14 4 18 24m22-26Q72 39 65 58M46 79q8-13 19-21l15 24" fill="none" stroke={berduri ? "#8d5839" : "#68422f"} />
    {berduri && <path d="m29 41-7-7m16 0-4-8m21-5-3-8m19 5 1-9m14 16 8-6m4 15 8-4m2 19 9-2m-13 24 7 4m-22 5 3 9m-35-5-2 9m-17-14-7 5m-9-20-9 1m13-17 6-4m29-1 5-6m27 17 6 2"
      stroke="#8d5839" fill="none" />}
    <path d="M64 57Q74 44 86 48Q85 63 74 69L65 80 59 69Z" fill="#e4af75" />
    <ellipse cx="71" cy="60" rx="5.3" ry="7.5" transform="rotate(24 71 60)" fill="#784e3c" />
  </g>;
}

const ILUSTRASI: Record<string, ReactNode> = {
  "buah-meranti": <Meranti />,
  "biji-dandelion": <Dandelion />,
  "biji-rumput-berkait": <KaitRumput />,
  "buah-pacar-air": <BuahTerbelah jenis="pacar-air" />,
  "buah-pletekan": <BuahTerbelah jenis="pletekan" />,
  "buah-lamtoro": <BuahTerbelah jenis="lamtoro" />,
  "buah-kacang-terbelah": <BuahTerbelah jenis="kacang" />,
  "buah-jarak": <BuahKapsul berduri />,
  "buah-karet": <BuahKapsul berduri={false} />,
  "biji-anggrek": <g {...GARIS}>
    <circle cx="65" cy="49" r="42" fill="#f9f3e6" stroke="#b9a78d" />
    {[[43,29,-38],[66,25,31],[84,37,47],[53,46,18],[37,54,-27],[71,52,-20],[91,59,51],[58,70,-19],[78,75,21]].map(([x,y,a]) =>
      <g key={x + ":" + y} transform={`translate(${x} ${y}) rotate(${a})`}>
        <path d="M0-10C-6-4-6 4 0 10C6 4 6-4 0-10Z" fill="#f4dfa9" stroke="#a77c53" strokeWidth="1.3" />
        <ellipse rx="1.5" ry="4.1" fill="#a77c53" stroke="none" />
      </g>
    )}
  </g>,
  "biji-ilalang": <g {...GARIS}>
    <path d="M45 91Q63 67 65 18" stroke="#777b47" fill="none" strokeWidth="3" />
    <path d="M62 66 52 55m11 7-17-18m18 12-13-21m14 14-15-25m15 19-9-27m9 19-1-25m1 24 8-22m-8 28 16-20m-16 27 21-19m-22 26 24-16m-26 24 19-13m-22 19 16-7"
      fill="none" stroke="#b6a685" strokeWidth="2.4" />
    <path d="M61 66Q65 50 65 24M63 57 54 45m10 5 11-14m-10 8-10-15m10 8 8-13M60 65l10-7"
      fill="none" stroke="#f7f1df" strokeWidth="2.4" />
    <path d="M99 74 95 64l6-4 5 4Z" fill="#ad8755" strokeWidth="1.7" />
    <path d="M100 62l-5-15m5 15 1-17m-1 17 7-16m-6 16 12-13" stroke="#b6a685" fill="none" strokeWidth="1.8" />
  </g>,
  "biji-tabebuya": <g {...GARIS}>
    <path d="M65 55Q38 24 11 34Q14 56 46 64L65 65Q99 70 119 34Q91 27 65 55Z" fill="#f7dda1" fillOpacity=".73" />
    <path d="M22 39l32 18m9 4-36-11m49 8 32-19m-30 21 23-7" stroke="#ba945e" fill="none" strokeWidth="1.6" />
    <path d="M54 59q9-11 21-4 5 9-6 13-11 1-15-9Z" fill="#9f7049" />
  </g>,
  "biji-mahoni": <g {...GARIS}>
    <path d="M23 80Q41 30 103 13Q115 22 99 40Q72 68 37 81Z" fill="#e1ad72" />
    <path d="M34 75Q70 52 106 19M53 61l16-4m-8-4 17-6m-7-2 15-7M85 33l11-5" fill="none" stroke="#a7764f" strokeWidth="2" />
    <path d="M26 71q11-7 19 1 4 12-9 16-12-2-10-17Z" fill="#9d6342" />
  </g>,
  "biji-kapuk": <g {...GARIS}>
    <path d="M17 61Q57 74 103 28Q103 53 82 73Q42 100 17 61Z" fill="#915d42" />
    <path d="M25 62Q16 49 34 39Q34 25 55 27Q65 16 78 22Q86 11 99 24Q113 29 100 39Q96 51 79 54Q71 66 57 61Q46 71 25 62Z"
      fill="#fbfbf2" stroke="#9b9987" />
    <path d="M32 53q22 7 28-14m-10 16q20 3 31-18m-13 22q22-2 27-14" fill="none" stroke="#c4bcab" strokeWidth="1.8" />
    <path d="M36 51q7-6 10 1 1 7-7 6-5-2-3-7Zm25-7q7-6 10 1 1 7-7 6-5-2-3-7Zm19-10q7-6 10 1 1 7-7 6-5-2-3-7Z" fill="#695143" />
  </g>,
  "buah-beringin": <g {...GARIS}>
    <path d="M20 75Q54 46 107 26M49 53l-8-13m22 9 6 16m10-25 5 10" fill="none" stroke="#786646" strokeWidth="4" />
    <path d="M38 54Q13 31 15 22q25-4 38 26M77 41Q87 15 115 15Q111 37 77 41Z" fill="#8db75f" stroke="#648244" />
    {[{x:42,y:41},{x:64,y:66},{x:82,y:56},{x:98,y:46}].map(({ x, y }) => <g key={x}>
      <circle cx={x} cy={y} r="12" fill={x === 98 ? "#d78652" : "#be655a"} />
      <path d={`M${x-5} ${y+1}q2-8 7-8`} stroke="#efac8e" fill="none" strokeWidth="2" />
      <circle cx={x + 5} cy={y + 3} r="1.7" stroke="none" fill="#6c4539" />
    </g>)}
  </g>,
  "buah-jambu": <g {...GARIS}>
    <path d="M54 70Q19 75 13 54Q9 35 29 26Q47 16 63 32Q73 42 54 70Z" fill="#8fbb54" stroke="#67833e" />
    <path d="M33 24q-2-6 4-12m-2 12q14-15 28-8q-8 13-28 8" fill="#85a85e" stroke="#637146" />
    <path d="M50 48Q67 24 92 32Q116 38 119 65Q112 88 88 89Q62 90 50 72Q43 60 50 48Z" fill="#cada79" stroke="#688548" />
    <path d="M55 48Q71 31 91 37Q113 45 114 65Q105 85 86 84Q65 86 53 69Q47 58 55 48Z" fill="#f4a58e" stroke="#de8e73" strokeWidth="1.8" />
    {[[73,53],[85,50],[95,58],[72,63],[84,62],[99,68],[79,72],[90,72]].map(([x,y]) =>
      <ellipse key={x + ":" + y} cx={x} cy={y} rx="2.2" ry="1.5" fill="#fff1bc" stroke="#ad7954" strokeWidth="1.1" />)}
  </g>,
  "biji-kenari": <g {...GARIS}>
    <path d="M19 58Q19 41 37 28Q61 23 72 47Q80 66 56 78Q33 83 19 58Z" fill="#836047" />
    <path d="M30 42Q45 35 60 46M31 69Q50 75 66 62" stroke="#a98061" fill="none" strokeWidth="2" />
    <path d="M68 72Q59 54 78 38Q101 23 112 43Q123 57 106 74Q88 90 68 72Z" fill="#ddbe90" />
    <path d="M80 72Q69 62 80 49Q91 36 105 44Q114 56 103 67Q90 81 80 72Z" fill="#f5dcb2" stroke="#af8e62" strokeWidth="2" />
  </g>,
  "buah-ketapang": <g {...GARIS}>
    <path d="M19 53Q25 24 56 23Q91 15 113 47Q111 75 75 82Q37 87 19 53Z" fill="#ac594f" />
    <path d="M22 51Q54 33 73 34Q96 35 111 48Q88 70 61 72Q35 68 22 51Z" fill="#d78e71" stroke="#925449" />
    <path d="M28 52Q67 35 105 48" fill="none" stroke="#e9b097" strokeWidth="3" />
  </g>,
  "buah-pandan-laut": <g {...GARIS}>
    <path d="M64 18Q64 10 71 6" fill="none" stroke="#727f45" strokeWidth="4" />
    <path d="M63 16Q107 12 114 56Q106 89 65 92Q24 89 16 56Q22 19 63 16Z" fill="#dd9858" />
    <path d="M27 32 45 36 51 22m-6 14 6 15-27 1m27-1 15-13 15 13 24-2m-24 2 4-15 17-7m-17 7-18-15-16 1m16-1-1 17m-42 14 10 18 20-5 1 19m-21-14 8 14m12-19 12-10 16 12-2 17m2-17 18 4 9-15m-9 15-9 12"
      fill="none" stroke="#966347" strokeWidth="2.2" />
    <path d="M32 36l7 2m18 1 5-5m32 10 7-2m-58 17 5-1m11 15 6-5m19 4 7 1" stroke="#f7ba70" fill="none" strokeWidth="3" />
  </g>,
  "buah-nyamplung": <g {...GARIS}>
    <path d="M50 34Q45 17 64 10m-9 11q-24-17-37-5q11 19 37 13" fill="#849c51" stroke="#616f40" />
    <circle cx="50" cy="54" r="25" fill="#90ab53" stroke="#697542" />
    <path d="M34 49q6-13 18-12" stroke="#c3cb80" fill="none" strokeWidth="3" />
    <circle cx="89" cy="66" r="23" fill="#ac8660" />
    <circle cx="89" cy="66" r="17.5" fill="#e2ca8a" stroke="#aa8b5a" strokeWidth="1.8" />
    <circle cx="89" cy="66" r="8.5" fill="#876042" stroke="#895e3e" strokeWidth="1.8" />
    <path d="M84 63q2-4 6-3" fill="none" stroke="#b58d66" strokeWidth="2" />
  </g>,
  "buah-keben": <g {...GARIS}>
    <path d="M23 48 47 35 52 19Q64 13 77 20l6 15 25 13-5 31-38 13-37-12Z" fill="#ae8b54" />
    <path d="m23 48 42 16 43-16m-43 16v28M47 35l18 29 18-29M52 19q13 9 25 1"
      stroke="#7e6542" fill="none" />
    <path d="m31 52 29 12m11 6 28-12m-68 5 23 10m19 11 21-7" fill="none" stroke="#d4b67b" strokeWidth="1.9" />
  </g>,
  "buah-kelapa-utuh": <g {...GARIS}>
    <path d="M27 48Q42 16 71 17Q93 22 108 57Q108 80 73 87Q36 88 24 67Q22 59 27 48Z" fill="#b98a55" />
    <path d="M31 54Q45 27 70 19m-35 44q15-19 36-40m-18 56q15-13 27-45m-12 51q16-22 22-39m-8 35q14-15 18-27"
      stroke="#89663f" fill="none" strokeWidth="2.2" />
    <path d="M38 54q12-11 24-15m-9 34q15-16 24-34" stroke="#e5bb7c" fill="none" strokeWidth="2" />
  </g>,
  "kecambah-bakau": <g {...GARIS}>
    <path d="M15 61Q49 46 102 35L110 48Q76 62 17 69Q11 68 15 61Z" fill="#86a75c" stroke="#60784c" />
    <path d="M27 62q42-10 71-22" fill="none" stroke="#b8ce89" strokeWidth="2.6" />
    <path d="M99 37q4-15 13-15 4 8 2 13 11-4 14 5-8 8-18 8Z" fill="#927454" />
    <path d="m104 34 10 3m-6 4 11 1" fill="none" stroke="#d3ac77" strokeWidth="1.8" />
  </g>,
  "buah-nipah": <g {...GARIS}>
    <path d="M59 17q4-8 13-9" fill="none" stroke="#806542" strokeWidth="4" />
    <path d="M23 59Q22 37 44 20L61 15 76 43 65 75 38 83Z" fill="#9d6748" />
    <path d="M44 20l10 27-16 36m16-36 22-4m-53 16 31-12" fill="none" stroke="#76513d" />
    <path d="M32 52l13-7m7-15 5 10m-7 27-8 11" fill="none" stroke="#c68e63" strokeWidth="2.5" />
    <path d="M69 70q-4-21 15-34 20-12 35 4l2 26-16 18-21 3Z" fill="#b27c55" />
    <path d="M78 70q-4-15 12-25 14-8 23 3l1 15-13 13-16 3Z" fill="#e6c699" stroke="#916a48" strokeWidth="2" />
    <path d="M86 65q3-15 15-15 11 7 4 17-7 9-16 5Z" fill="#f7e8c9" stroke="#b09065" strokeWidth="1.9" />
  </g>,
};

export const ILUSTRASI_BIJI_IDS = Object.keys(ILUSTRASI);

export function IlustrasiBiji({ id }: { id: string }) {
  const gambar = ILUSTRASI[id];
  return gambar ? <g strokeLinecap="round" strokeLinejoin="round">{gambar}</g> : null;
}
