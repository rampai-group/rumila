import type { ReactNode } from "react";

type Tahap = 0 | 1 | 2 | 3;
const tahap: Tahap[] = [0, 1, 2, 3];
const garis = { strokeWidth: 2.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const tepiDaun = "#327652";

function Daun({ x, y, arah, warna = "#80ba60" }: { x: number; y: number; arah: number; warna?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${arah})`} {...garis} stroke={tepiDaun}>
      <path d="M0 0Q7-17 27-12Q22 4 0 0Z" fill={warna} />
      <path d="M4-1L20-8" fill="none" strokeWidth="1.5" />
    </g>
  );
}

function Kecambah({ fase }: { fase: Tahap }) {
  return (
    <g {...garis} stroke="#70472e">
      <path d="M12 79Q48 65 78 75T118 77V91H12Z" fill="#ad7651" />
      {fase === 0 ? (
        <>
          <path d="M43 67Q34 54 43 42Q51 32 66 38Q88 38 84 58Q79 76 58 73Q48 75 43 67Z" fill="#e6ac68" />
          <path d="m65 38-7 11 11 6-7 11" fill="none" />
        </>
      ) : (
        <>
          <path d={fase === 1 ? "M65 77Q61 57 64 53Q68 46 74 52" : "M65 77Q60 53 65 30"} fill="none" stroke={tepiDaun} strokeWidth="5" />
          {fase >= 2 && <><Daun x={65} y={42} arah={195} /><Daun x={65} y={42} arah={2} /></>}
          {fase === 3 && <><Daun x={64} y={66} arah={188} /><Daun x={64} y={62} arah={5} /><Daun x={65} y={32} arah={-24} /></>}
        </>
      )}
    </g>
  );
}

function Es({ fase }: { fase: Tahap }) {
  const ukuran = [1, 0.78, 0.44, 0][fase];
  return (
    <g {...garis} stroke="#427e9b">
      <ellipse cx="65" cy="74" rx="55" ry="18" fill="#eff9fd" />
      <ellipse cx="65" cy="70" rx="43" ry="11" fill="#e0f2fb" strokeWidth="1.5" />
      {fase > 0 && <ellipse cx="65" cy="71" rx={14 + fase * 10} ry={3 + fase * 2} fill="#68c6ed" stroke="#5baace" />}
      {fase < 3 && (
        <g transform={`translate(65 72) scale(${ukuran})`}>
          <path d="M-29-48L9-63 31-46 30-15-8 0-29-16Z" fill="#b7e9ff" />
          <path d="M-29-48L-8-32 31-46M-8-32V0" fill="none" />
          <path d="M-13-47L12-56M4-22L22-29" fill="none" stroke="#fff" strokeWidth="4" />
        </g>
      )}
    </g>
  );
}

function Lilin({ fase }: { fase: Tahap }) {
  const y = [35, 52, 67, 67][fase];
  return (
    <g {...garis} stroke="#966548">
      <ellipse cx="65" cy="82" rx="38" ry="9" fill="#f8d9a3" />
      <path d={`M47 ${y}Q65 ${y - 5} 83 ${y}V78Q65 84 47 78Z`} fill="#fff1cb" />
      <path d={`M55 ${y + 3}v8q4 6 7 0v-4`} fill="none" stroke="#d8ac79" />
      <path d={`M65 ${y + 1}v-8`} stroke="#544237" />
      <path d={`M65 ${y - 5}q-15-5 0-25q16 20 0 25Z`} fill="#ffbf41" stroke="#d88126" />
      <path d={`M65 ${y - 7}q-6-2 0-10q6 8 0 10Z`} fill="#ffed89" stroke="none" />
    </g>
  );
}

function Genangan({ fase }: { fase: Tahap }) {
  return (
    <g {...garis} stroke="#9c674d">
      <path d="M8 46Q39 32 65 40Q96 33 122 47V85H8Z" fill="#dcb18c" />
      {[20, 40, 84, 101].map((x, i) => <path key={x} d={`M${x} ${75 - (i % 2) * 18}h7`} />)}
      {fase < 2 && <ellipse cx="66" cy="64" rx={fase === 0 ? 44 : 24} ry={fase === 0 ? 13 : 7} fill="#8ed0eb" stroke="#518dad" />}
      {fase === 0 && <path d="M36 61q13-7 26-4m7 14q15 0 25-6" fill="none" stroke="white" strokeWidth="2" />}
      {fase === 2 && <path d="M31 62q19-13 46-8q20 1 24 12q-18 13-45 11q-20-1-25-15Z" fill="#ad7b59" stroke="none" />}
    </g>
  );
}

function Pisang({ fase }: { fase: Tahap }) {
  const isi = ["#7caf50", "#f6d352", "#e7bd4b", "#9c653f"][fase];
  const bentuk = fase === 3
    ? "M17 38Q35 50 53 53Q90 63 111 50L119 55Q95 80 59 81Q23 80 11 50Z"
    : "M16 18L29 16Q34 47 55 57Q86 72 109 60L119 64Q98 91 60 84Q26 79 15 52Q10 37 16 18Z";
  return (
    <g {...garis} stroke={fase === 0 ? "#52763c" : "#86603b"}>
      <path d={bentuk} fill={isi} />
      <path d={fase === 3 ? "M18 49Q40 73 66 73Q100 73 112 58" : "M24 30Q35 68 68 75Q88 79 104 70"} fill="none" opacity=".65" />
      {fase === 2 && [[28,48],[42,62],[51,70],[55,61],[63,74],[71,66],[81,75],[89,70],[100,72]].map(([x,y]) => (
        <circle key={x} cx={x} cy={y} r="2.3" fill="#805338" stroke="none" />
      ))}
      {fase === 3 && <path d="M43 63q15-5 26 4M75 69q13 5 24-4" fill="none" stroke="#674738" strokeWidth="4" opacity=".7" />}
      <path d={fase === 3 ? "M11 48L17 39l7 3M113 54l6 1-5 7" : "M17 20l12-3 3 8-13 4m93 34 7 1-4 6"} fill="none" />
    </g>
  );
}

function Balon({ fase }: { fase: Tahap }) {
  const bentuk = [
    "M65 74C10 46 23 11 65 11C107 11 120 46 65 74Z",
    "M65 74C21 53 30 23 65 23C100 23 109 53 65 74Z",
    "M65 74Q50 68 42 56Q34 50 42 40Q52 33 62 38Q76 34 84 46Q89 56 76 66Z",
    "M65 74Q45 73 38 62Q36 54 48 56Q59 58 64 56Q78 49 85 56Q93 66 65 74Z",
  ][fase];
  return (
    <g {...garis} stroke="#9f4b7f">
      <path d={bentuk} fill={fase < 2 ? "#ed83ac" : "#d4749c"} />
      {fase < 2 && <path d={fase === 0 ? "M43 27q-9 8-7 18" : "M47 35q-7 6-6 13"} fill="none" stroke="#ffd8ec" strokeWidth="4" />}
      {fase >= 2 && <path d={fase === 2 ? "M44 49q7 5 12 1m14 12q6 0 10-7" : "M48 62q12 3 18 2m4-3 8-4"} fill="none" />}
      <path d="M64 74l-5 7h12l-5-7m-1 7q8 7-2 13" fill="#d4749c" />
    </g>
  );
}

function Sabun({ fase }: { fase: Tahap }) {
  const w = [89, 65, 61, 31][fase];
  const h = [45, 32, 12, 12][fase];
  return (
    <g {...garis} stroke="#508678">
      <path d="M16 82H114" stroke="#a5bbca" />
      <rect x={(130 - w) / 2} y={80 - h} width={w} height={h} rx={Math.min(13, h / 2)} fill="#84d1b1" />
      <path d={`M${73 - w / 2} ${80 - h * 0.65}h${w - 16}`} fill="none" stroke="#d9f7e8" />
      {fase < 2 && <path d={`M${77 - w / 2} 74q${w / 2 - 10} 4 ${w - 22} 0`} fill="none" opacity=".6" />}
    </g>
  );
}

function Pensil({ fase }: { fase: Tahap }) {
  const awal = [13, 34, 54, 74][fase];
  return (
    <g {...garis} transform="rotate(-20 77 61)" stroke="#9e702e">
      <path d={`M${awal} 52h${100 - awal}l17 10-17 10H${awal}Z`} fill="#ffd466" />
      <path d="m100 52 17 10-17 10Z" fill="#f4d8a1" />
      <path d="m110 58 7 4-7 4Z" fill="#4e5368" stroke="none" />
      <path d={`M${awal + 3} 58H98m-5 8H${awal + 4}`} fill="none" stroke="#e4a642" />
    </g>
  );
}

function EsKrim({ fase }: { fase: Tahap }) {
  return (
    <g {...garis} stroke="#a36743">
      <ellipse cx="65" cy="84" rx="46" ry="9" fill="#eef4fa" stroke="#b2becb" />
      {fase < 3 && <path d="M48 48h34L66 85Z" fill="#efb76b" />}
      {fase < 3 && <path d="m53 52 18 20m-11-20 15 11m2-9L60 70m11-18L56 60" fill="none" stroke="#b87d4f" strokeWidth="1.5" />}
      {fase === 0 && <path d="M44 47Q40 20 64 19Q89 21 86 48Q73 52 64 46Q49 52 44 47Z" fill="#f3a5bb" />}
      {fase === 1 && <path d="M45 48Q43 27 64 25Q85 28 86 47Q92 57 82 60Q73 57 75 49Q64 52 57 47Q51 53 45 48Z" fill="#f3a5bb" />}
      {fase === 2 && <path d="M43 48Q52 31 64 34Q84 34 88 52Q93 64 84 67Q77 67 77 56H63Q59 68 52 65Q47 62 50 54Q43 55 43 48ZM85 73q8 8 1 10q-8-1-1-10Z" fill="#f3a5bb" />}
      {fase === 3 && <ellipse cx="65" cy="83" rx="31" ry="6" fill="#f3a5bb" stroke="#bd7290" />}
    </g>
  );
}

function Mawar({ fase }: { fase: Tahap }) {
  return (
    <g {...garis} stroke="#a34565">
      <path d={fase === 3 ? "M62 91Q75 56 64 44Q55 36 48 46" : "M62 91Q58 57 64 45"} fill="none" stroke={tepiDaun} strokeWidth="4" />
      <Daun x={62} y={70} arah={177} warna={fase === 3 ? "#87956a" : undefined} />
      <Daun x={63} y={64} arah={-8} warna={fase === 3 ? "#87956a" : undefined} />
      {fase === 0 && <path d="M64 47Q50 41 51 26Q57 21 64 15Q75 21 77 28Q77 40 64 47Z" fill="#ed789b" />}
      {fase === 1 && <path d="M63 47Q43 43 45 24Q54 29 63 22Q74 26 83 20Q86 40 63 47Z" fill="#ed789b" />}
      {fase === 2 && <path d="M64 50Q48 54 41 43Q28 41 37 29Q37 18 51 19Q60 8 71 17Q85 13 91 24Q103 27 93 39Q91 51 77 48Z" fill="#ed789b" />}
      {fase === 2 && <path d="M50 36Q42 26 56 23Q69 33 76 24Q87 29 77 37Q69 47 50 36Z" fill="#f6a6bd" />}
      {fase === 3 && <path d="M49 43Q36 35 28 47Q25 59 40 55Q49 63 57 54Z" fill="#a46179" />}
      {fase === 3 && <path d="M31 71q10-5 13 2q-2 6-13-2Z" fill="#a46179" />}
    </g>
  );
}

function Jagung({ fase }: { fase: Tahap }) {
  const y = [77, 66, 42, 14][fase];
  return (
    <g {...garis} stroke="#a26943">
      <path d="M35 77H95L88 96H42Z" fill="#d68f66" />
      <path d="M34 76h62" fill="none" strokeWidth="5" />
      {fase > 0 && <path d={`M65 76V${y}`} fill="none" stroke={tepiDaun} strokeWidth="5" />}
      {fase > 0 && <Daun x={65} y={y + 5} arah={fase === 1 ? 12 : 174} />}
      {fase > 1 && <Daun x={65} y={y + 16} arah={-12} />}
      {fase === 3 && <Daun x={65} y={y + 39} arah={174} />}
      {fase === 3 && <path d="M59 15l6-9 7 8M65 15V5m1 34q18-9 18 3q-3 13-18 16Z" fill="#f1c35b" stroke="#749250" />}
    </g>
  );
}

function Ayam({ fase }: { fase: Tahap }) {
  return (
    <g {...garis} stroke="#a77c54">
      {fase < 2 && <path d="M65 18Q79 19 92 50Q106 85 65 89Q25 86 38 50Q51 18 65 18Z" fill="#fff2d6" />}
      {fase === 1 && <path d="m53 47 11 10-4 11 14 10m-10-21 12-12" fill="none" />}
      {fase >= 2 && <ellipse cx={fase === 2 ? 64 : 70} cy="62" rx="24" ry="19" fill="#f8cf65" />}
      {fase >= 2 && <circle cx="57" cy="44" r="16" fill="#ffdb71" />}
      {fase >= 2 && <path d="m41 45-14 4 14 5Z" fill="#f0a050" />}
      {fase >= 2 && <circle cx="51" cy="42" r="2.7" fill="#41352b" stroke="none" />}
      {fase === 2 && <path d="m38 69 14 6 8-9 10 10 8-7 13 3Q87 87 64 90Q44 86 38 69Z" fill="#fff2d6" />}
      {fase === 2 && <path d="M28 29q-8 9 0 14q8-5 0-14Zm62 14q-7 8 0 12q7-4 0-12Z" fill="#9ee0f7" stroke="#5ca2c2" />}
      {fase === 3 && <path d="m64 79-6 9H47m33-10 5 9h10m-22-26q12-5 13-11" fill="none" />}
    </g>
  );
}

function KupuKupu({ fase }: { fase: Tahap }) {
  return (
    <g {...garis} stroke={tepiDaun}>
      <path d="M14 79Q29 52 56 53Q87 60 115 41Q110 78 74 87Q39 93 14 79Z" fill="#86bd6b" />
      <path d="M14 79Q57 76 108 47" fill="none" />
      {fase === 0 && [[45,68],[56,64],[62,72]].map(([x,y]) => (
        <ellipse key={x} cx={x} cy={y} rx="4.1" ry="5" fill="#fff4bf" stroke="#aa9864" />
      ))}
      {fase === 1 && [44,54,64,74,84].map((x, i) => (
        <ellipse key={x} cx={x} cy={55 - (i % 2) * 4} rx="9" ry="8" fill={i === 4 ? "#d6d56d" : "#a8cb67"} />
      ))}
      {fase === 1 && <circle cx="87" cy="53" r="2" fill="#4c4934" stroke="none" />}
      {fase === 2 && <path d="M49 24Q64 12 79 26M65 22v12m-11 6q-5 15 4 25q11 8 18-8q4-14-11-23Z" fill="#9fbd75" />}
      {fase === 3 && <path d="M62 46Q44 13 27 25Q23 39 48 51Q24 62 44 69Q55 62 62 49Q70 67 85 68Q102 63 80 50Q108 34 102 21Q89 11 65 44Z" fill="#efa85e" stroke="#a76844" />}
      {fase === 3 && <path d="M64 40v22m0-21-7-8m8 7 7-8" fill="none" stroke="#634539" />}
      {fase === 3 && <path d="M90 63q10 0 8 14q-7 5-12-1Z" fill="#9fbd75" />}
    </g>
  );
}

function MatahariTumbuh({ fase }: { fase: Tahap }) {
  const pucuk = [72, 52, 34, 31][fase];
  return (
    <g {...garis} stroke={tepiDaun}>
      <path d="M12 89q26-13 63-7t43-2v14H12Z" fill="#dbad80" stroke="#aa7551" />
      <path d={`M69 86Q65 58 69 ${pucuk}`} fill="none" strokeWidth="5" />
      <Daun x={68} y={fase === 0 ? 75 : 67} arah={fase === 0 ? 9 : 179} />
      {fase >= 1 && <Daun x={68} y={pucuk + 11} arah={6} />}
      {fase === 1 && <path d="M26 28v32l-6 22q1 5 16 5l3-7-1-27V28Z" fill="#8cacbf" stroke="#648192" />}
      {fase === 2 && <path d="M69 40Q48 34 62 17Q70 11 80 23Q87 37 69 40Z" fill="#9dbb64" />}
      {fase === 3 && <path d="M70 49L63 43 51 45 52 34 44 27 54 20 53 10 65 13 71 4 80 12 90 10 90 22 98 29 89 36 88 46 78 44Z" fill="#fad35a" stroke="#b98039" />}
      {fase === 3 && <circle cx="71" cy="27" r="12" fill="#a86747" stroke="#8b523b" />}
    </g>
  );
}

const gambar = {
  kecambah: Kecambah,
  es: Es,
  lilin: Lilin,
  genangan: Genangan,
  pisang: Pisang,
  balon: Balon,
  sabun: Sabun,
  pensil: Pensil,
  "es-krim": EsKrim,
  mawar: Mawar,
  jagung: Jagung,
  telur: Ayam,
  kupu: KupuKupu,
  bungamatahari: MatahariTumbuh,
};

export const ILUSTRASI_PENGAMATAN_SD2: Record<string, ReactNode> = Object.fromEntries(
  Object.entries(gambar).flatMap(([jenis, Gambar]) =>
    (jenis === "lilin" ? tahap.slice(0, 3) : tahap).map((fase) =>
      [`pengamatan-${jenis}-${fase + 1}`, <Gambar key={fase} fase={fase} />],
    ),
  ),
);
