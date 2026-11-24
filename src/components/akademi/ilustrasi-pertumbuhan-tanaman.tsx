import { IlustrasiTumbuhanPerbaiki } from "./ilustrasi-tumbuhan-perbaiki";
import { IlustrasiTumbuhanSusun } from "./ilustrasi-tumbuhan-susun";

type BentukBiji = "matahari" | "ginjal" | "jarum" | "bulat" | "pipih" | "lancip" | "lonjong" | "kasar";
type BentukDaun = "oval" | "lanset" | "jantung" | "berombak" | "menjari" | "berlekuk" | "menyirip" | "tiga" | "empat" | "halus";
type BentukBunga = "matahari" | "bintang" | "bundar" | "kenikir" | "mawar" | "sepatu" | "melati" | "kacang" | "corong" | "pepaya" | "teratai";
type Tahap = "biji" | "tunas" | "daun" | "bunga";

interface Tanaman {
  biji: [BentukBiji, string, string];
  daun: BentukDaun;
  bunga: [BentukBunga, string, string];
  air?: boolean;
}

const TANAMAN: Record<string, Tanaman> = {
  bungamatahari: { biji: ["matahari", "#59544e", "#e3d7b7"], daun: "jantung", bunga: ["matahari", "#ffd149", "#694130"] },
  kacang: { biji: ["ginjal", "#a9524f", "#eee0b9"], daun: "tiga", bunga: ["kacang", "#e8d5ef", "#9765a1"] },
  kenikir: { biji: ["jarum", "#776448", "#c5a77a"], daun: "halus", bunga: ["kenikir", "#ed94ba", "#ad4f82"] },
  mawar: { biji: ["bulat", "#c5a77c", "#e9d0a5"], daun: "menyirip", bunga: ["mawar", "#e05b69", "#9d3c59"] },
  sepatu: { biji: ["ginjal", "#865d51", "#c6a58a"], daun: "berombak", bunga: ["sepatu", "#ef7894", "#a93461"] },
  merahmuda: { biji: ["lancip", "#94775c", "#d9bfa0"], daun: "lanset", bunga: ["bundar", "#f39fbc", "#ab5084"] },
  teratai: { biji: ["bulat", "#6b554c", "#967c64"], daun: "jantung", bunga: ["teratai", "#ed91b5", "#aa587d"], air: true },
  kacangtanah: { biji: ["lonjong", "#ba786b", "#e3a597"], daun: "empat", bunga: ["kacang", "#f8cb4e", "#ae7e34"] },
  melati: { biji: ["lonjong", "#896451", "#be9873"], daun: "oval", bunga: ["melati", "#fcfaf1", "#77978a"] },
  cabai: { biji: ["pipih", "#f0d1a0", "#fcdfb5"], daun: "lanset", bunga: ["bintang", "#fdf9ee", "#84918b"] },
  tomat: { biji: ["pipih", "#c9a56e", "#eaca9c"], daun: "menyirip", bunga: ["bintang", "#f7d14f", "#b38232"] },
  terung: { biji: ["pipih", "#c9a180", "#edcba5"], daun: "berombak", bunga: ["bintang", "#c793da", "#774797"] },
  mentimun: { biji: ["lancip", "#ecce95", "#f5e1b7"], daun: "jantung", bunga: ["bundar", "#f8d24c", "#ad792d"] },
  labu: { biji: ["lancip", "#ecd1a1", "#f9e4be"], daun: "menjari", bunga: ["corong", "#f3ae38", "#a8702b"] },
  semangka: { biji: ["lancip", "#51453e", "#8f7562"], daun: "berlekuk", bunga: ["bundar", "#f5d54c", "#988032"] },
  kacangpanjang: { biji: ["ginjal", "#96734f", "#e1c7a5"], daun: "tiga", bunga: ["kacang", "#ba87d4", "#7e4d9a"] },
  buncis: { biji: ["ginjal", "#e5cba4", "#f8e1ba"], daun: "tiga", bunga: ["kacang", "#fff9eb", "#879488"] },
  kacanghijau: { biji: ["lonjong", "#83a24f", "#d7d483"], daun: "tiga", bunga: ["kacang", "#f5d65c", "#a88b3a"] },
  pepaya: { biji: ["kasar", "#554a49", "#a18b76"], daun: "menjari", bunga: ["pepaya", "#fcf3d9", "#978d64"] },
};

const BATANG = "#427a48";

function Lingkungan({ air = false, tahap }: { air?: boolean; tahap: Tahap }) {
  const batas = tahap === "biji" ? (air ? 53 : 43) : 79;
  return <>
    <rect x="7" y="5" width="116" height="90" rx="13" fill={air ? "#e6f5fc" : "#f1f7e8"} stroke={air ? "#afd7e5" : "#d7e3c7"} strokeWidth="1.7" />
    {air && <>
      <path d="M8 32Q23 28 40 32T73 32T108 32L122 32V83Q122 94 111 94H19Q8 94 8 83Z" fill="#bce4f0" />
      <path d="M11 35Q23 31 35 35M95 34Q107 31 119 34M15 61Q28 58 39 61M92 61Q106 58 119 62" fill="none" stroke="#79bacc" strokeWidth="2" />
    </>}
    <path d={`M8 ${batas}Q30 ${batas - 4} 53 ${batas}T100 ${batas}Q111 ${batas - 2} 122 ${batas}V82Q122 94 111 94H19Q8 94 8 82Z`} fill={air ? "#bd9471" : "#d4ae80"} />
    {[[21, 86], [38, 82], [53, 89], [77, 84], [96, 88], [110, 82]].map(([x, y]) => <path key={x} d={`M${x} ${y}l3 -1`} stroke={air ? "#9f7c60" : "#b38d69"} strokeWidth="1.7" />)}
  </>;
}

const BIJI: Record<BentukBiji, string> = {
  matahari: "M-33 10C-30-8-7-23 19-21Q32-19 35-13Q18 17-17 18Q-29 19-33 10Z",
  ginjal: "M-33 7C-33-13-11-23 10-23C28-23 38-12 34 2Q29 17 15 12Q3 3-6 12Q-13 26-27 17Q-32 13-33 7Z",
  jarum: "M-33 9Q-30 5-22 4L21-17Q34-20 35-15Q25-7 18-4L-23 16Q-30 17-33 9Z",
  bulat: "M-28 1Q-30-16-12-23Q10-27 23-16Q34-7 28 8Q21 25 3 25Q-21 25-28 1Z",
  pipih: "M-31 8Q-30-8-9-17Q11-26 25-15Q39-2 24 12Q8 25-14 22Q-26 19-31 8Z",
  lancip: "M-37 12Q-29 11-25 2Q-15-16 3-22Q27-28 35-12Q40 1 19 14Q-5 28-27 19Z",
  lonjong: "M-29 11Q-37-3-23-14Q-6-26 14-23Q35-22 34-6Q33 14 8 20Q-14 26-29 11Z",
  kasar: "M-26 2L-29-9L-24-15L-15-18L-9-23L1-23L8-20L17-21L23-14L30-9L29 0L32 7L25 15L19 16L11 23L2 21L-9 25L-14 19L-24 17L-23 10Z",
};

function Biji({ jenis, warna, detail, grow = false, air = false }: { jenis: BentukBiji; warna: string; detail: string; grow?: boolean; air?: boolean }) {
  const pola = jenis === "matahari" ? "M-24 11Q-2-4 25-17M-14 17Q11 7 32-10"
    : jenis === "kasar" ? "M-19-4L-16-6M-10 11L-7 9M-3-11L0-14M2 4L6 2M15-6L19-10M14 13L18 10"
      : jenis === "ginjal" ? "M-22-2Q-8-15 9-15M-1 6Q8 3 17 8"
        : "M-19 4Q-7-9 12-14M-11 12Q4 16 18 8";
  const letak = air && !grow ? 70 : grow ? 84 : 67;
  return <g transform={`translate(65 ${letak}) scale(${grow ? 0.32 : 0.92})`}>
    <path d={BIJI[jenis]} fill={warna} stroke="#755c4c" strokeWidth="2.6" />
    <path d={pola} fill="none" stroke={detail} strokeWidth="2.4" />
  </g>;
}

function Tunas({ tanaman }: { tanaman: Tanaman }) {
  const { biji, air } = tanaman;
  return <>
    <Lingkungan air={air} tahap="tunas" />
    <path d="M65 74Q60 83 56 92M65 78Q71 85 74 92" fill="none" stroke="#a77853" strokeWidth="2.2" />
    <Biji jenis={biji[0]} warna={biji[1]} detail={biji[2]} grow air={air} />
    <path d="M65 80Q62 54 66 34" fill="none" stroke={BATANG} strokeWidth="4" />
    {air ? <>
      <path d="M65 51Q59 49 52 43M66 36Q71 32 75 31" fill="none" stroke={BATANG} strokeWidth="2.5" />
      <path d="M52 43L61 39Q60 30 48 31Q35 31 32 39Q31 46 43 49Q51 51 58 47ZM75 31L84 34Q96 30 93 21Q90 14 79 14Q65 14 62 22Q60 31 68 35Z" fill="#82bc72" stroke={BATANG} strokeWidth="2.2" />
    </> : <>
      <path d="M64 53Q46 52 36 38Q57 34 64 53ZM66 43Q72 24 93 26Q87 42 66 43Z" fill="#86be68" stroke={BATANG} strokeWidth="2.6" />
      <path d="M63 51L47 42M67 41L84 33" fill="none" stroke="#5b9558" strokeWidth="1.8" />
    </>}
  </>;
}

const DAUN: Record<Exclude<BentukDaun, "menyirip" | "tiga" | "empat" | "halus">, string> = {
  oval: "M0 0Q-19-8-15-24Q-11-38 0-44Q13-37 16-23Q19-8 0 0Z",
  lanset: "M0 0Q-13-12-9-24Q-6-37 0-45Q8-34 11-23Q13-11 0 0Z",
  jantung: "M0 0Q-9-8-16-10Q-25-17-16-28L0-46Q15-31 18-25Q24-12 9-6Z",
  berombak: "M0 0Q-15-2-17-9Q-25-15-19-23Q-24-32-13-35Q-10-41 0-46Q9-41 14-34Q26-29 19-22Q24-14 17-8Q14-1 0 0Z",
  menjari: "M0 0L-17-5L-26-22L-12-19L-22-35L-7-29L0-50L7-30L23-36L13-18L28-24L20-9Z",
  berlekuk: "M0 0Q-15-3-17-10Q-31-12-25-23Q-20-28-11-23Q-23-38-12-40Q-7-40-5-36Q-7-48 0-48Q9-46 5-36Q12-43 17-37Q24-31 12-23Q25-28 29-20Q31-10 17-9Q15-1 0 0Z",
};

function Helai({ bentuk, warna }: { bentuk: BentukDaun; warna: string }) {
  if (bentuk === "halus") return <g fill="none" stroke={BATANG} strokeWidth="2.6">
    <path d="M0 0V-49M0-7L-19-13M0-7L19-13M0-15L-20-25M0-15L20-25M0-22L-15-34M0-22L15-34M0-31L-10-42M0-31L10-42M-10-20L-16-19M10-20L16-19M-6-27L-14-26M6-27L14-26" />
  </g>;
  if (bentuk === "tiga" || bentuk === "empat" || bentuk === "menyirip") {
    const empat = bentuk === "empat";
    const posisi = bentuk === "tiga" ? [[-13, -26, -43], [13, -26, 43]] : [[-10, -17, -52], [10, -17, 52], [-13, -32, -27], [13, -32, 27]];
    const tangkai = bentuk === "tiga" ? "M0 0V-26M-13-26H13" : "M0 0V-32M-10-17H10M-13-32H13";
    return <g fill={warna} stroke={BATANG} strokeWidth="2.2">
      <path d={tangkai} fill="none" />
      {posisi.map(([x, y, sudut]) => <path key={`${x}-${y}`} d="M0 0Q-12-4-10-15Q-7-24 0-25Q7-23 10-15Q12-4 0 0Z" transform={`translate(${x} ${y}) rotate(${sudut}) scale(${bentuk === "menyirip" ? 0.72 : 0.8})`} />)}
      {!empat && <path d="M0-25Q-13-32 0-51Q13-32 0-25Z" />}
    </g>;
  }
  return <g fill={warna} stroke={BATANG} strokeWidth="2.2">
    <path d={DAUN[bentuk]} />
    <path d="M0-2V-37M0-12L-8-19M0-15L8-22M0-25L-6-31M0-27L7-32" fill="none" strokeWidth="1.6" />
  </g>;
}

function Tajuk({ bentuk, berbunga }: { bentuk: BentukDaun; berbunga: boolean }) {
  const daun = berbunga ? [[-53, 72, 0.93], [51, 68, 0.86], [64, 77, 0.82]] : [[-57, 65, 1.01], [58, 58, 1], [-43, 48, 0.72], [47, 44, 0.73]];
  return <>
    <path d={berbunga ? "M64 85Q58 63 65 29" : "M64 85Q57 52 66 23"} fill="none" stroke={BATANG} strokeWidth="4" />
    {daun.map(([sudut, y, skala], i) => <g key={sudut} transform={`translate(63 ${y}) rotate(${sudut}) scale(${skala})`}>
      <Helai bentuk={bentuk} warna={i % 2 ? "#85b766" : "#67a85f"} />
    </g>)}
    {!berbunga && <g transform="translate(65 41) scale(0.6)"><Helai bentuk={bentuk} warna="#91bf70" /></g>}
  </>;
}

function Bunga({ bentuk, warna, tepi }: { bentuk: BentukBunga; warna: string; tepi: string }) {
  if (bentuk === "melati") return <g transform="translate(-37 -30) scale(0.57)"><IlustrasiTumbuhanPerbaiki id="tumbuhan-perbaiki-bunga-melati" /></g>;
  if (bentuk === "mawar") return <g stroke={tepi} strokeWidth="2.1">
    <path d="M0 20Q-22 17-24-3Q-28-14-15-18Q-10-26 2-20Q15-25 22-14Q29-6 21 8Q13 22 0 20Z" fill={warna} />
    <path d="M-19-6Q-7-13 1-4Q8-14 19-8M-22 1Q-10-4-3 8Q7-2 21 2M-14 13Q-8 8-3 13Q7 10 13 15M-8-11Q0-18 9-12" fill="none" stroke="#b44255" />
    <path d="M-14-12Q-7-17-3-14M4-17Q12-18 17-12" fill="none" stroke="#f5969d" />
  </g>;
  if (bentuk === "kacang") return <g stroke={tepi} strokeWidth="2.3">
    <path d="M0 13Q-17 14-23 3Q-30-10-18-18Q-11-23 0-16Q11-22 20-17Q33-9 24 4Q18 15 0 13Z" fill={warna} />
    <path d="M-18-3Q-8-14 0-6Q8-14 18-3Q22 7 11 12L0 24L-11 13Q-21 10-18-3Z" fill={warna} />
    <path d="M-8 0Q0-4 9 0Q6 10 0 15Q-6 11-8 0Z" fill="#f3ca60" strokeWidth="1.5" />
  </g>;
  if (bentuk === "corong") return <g stroke={tepi} strokeWidth="2.3">
    <path d="M-8 7L18 4L26 18L6 24Z" fill="#df902c" />
    <path d="M-6-23Q6-28 12-16Q26-20 29-7Q34 5 21 11Q22 23 9 21Q-1 29-10 21Q-24 21-25 10Q-36 2-28-9Q-24-16-18-15Q-15-23-6-23Z" fill={warna} />
    <path d="M-1-8Q9-9 12-1Q11 9 1 12Q-8 9-10 0Q-9-6-1-8Z" fill="#b97528" />
    <path d="M-7-5L-18-14M10 1L22-7M4 10L8 18" fill="none" stroke="#db902b" strokeWidth="1.8" />
  </g>;
  const n = bentuk === "matahari" ? 12 : bentuk === "kenikir" ? 8 : 5;
  const petal = bentuk === "bintang" ? "M-5 5Q-13-3-11-9Q-6-18 0-28Q9-20 12-11Q13-5 5 6Z"
    : bentuk === "pepaya" ? "M-5 5Q-8-8-6-16Q1-23 8-27Q13-24 10-18Q1-10 5 6Z"
      : bentuk === "matahari" ? "M-4-6Q-13-24-6-26Q-2-30 4-27Q13-25 5-7Z"
        : bentuk === "kenikir" ? "M0 3Q-12-4-10-15L-10-22Q-5-27 0-23Q5-27 10-22L10-15Q12-4 0 3Z"
          : "M-5 4Q-14-7-13-14Q-12-25 0-26Q12-25 13-14Q14-7 5 4Z";
  return <g stroke={tepi} strokeWidth="1.9">
    {Array.from({ length: n }, (_, i) => <path key={i} d={petal} transform={`rotate(${i*360/n})`} fill={warna} />)}
    <circle r={bentuk === "matahari" ? 13.5 : 6} fill={bentuk === "matahari" ? "#77503a" : "#efbf56"} stroke={bentuk === "matahari" ? "#5d4233" : "#b48a3c"} />
    {bentuk === "matahari" && [[-5,-5],[4,-5],[-6,3],[3,2],[0,8],[8,3]].map(([x,y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill="#b88043" stroke="none" />)}
    {bentuk === "sepatu" && <><path d="M0 0Q7-5 14-11" fill="none" stroke="#ffd1ad" strokeWidth="4" /><circle cx="15" cy="-12" r="4" fill="#f9cc63" /></>}
    {bentuk === "bintang" && warna === "#fdf9ee" && <path d="M-5-1L-4-5M0 2V-6M5-1L4-5" fill="none" stroke="#635d66" strokeWidth="1.3" />}
  </g>;
}

const TAHAP: Tahap[] = ["biji", "tunas", "daun", "bunga"];
const PREFIX = "tumbuhan-tumbuh-";

export const ILUSTRASI_PERTUMBUHAN_TANAMAN_IDS = Object.keys(TANAMAN).flatMap((jenis) => TAHAP.map((tahap) => `${PREFIX}${jenis}-${tahap}`));

export function IlustrasiPertumbuhanTanaman({ id }: { id: string }) {
  const [jenis, tahap] = id.slice(PREFIX.length).split("-") as [string, Tahap];
  const tanaman = TANAMAN[jenis];
  if (!tanaman) return null;
  if (jenis === "teratai" && (tahap === "daun" || tahap === "bunga")) {
    return <IlustrasiTumbuhanSusun id={`tumbuhan-susun-${tahap}-teratai`} />;
  }
  const [jenisBiji, warnaBiji, detailBiji] = tanaman.biji;
  const [jenisBunga, warnaBunga, tepiBunga] = tanaman.bunga;
  return <g strokeLinecap="round" strokeLinejoin="round">
    {tahap === "biji" && <><Lingkungan air={tanaman.air} tahap={tahap} /><Biji jenis={jenisBiji} warna={warnaBiji} detail={detailBiji} air={tanaman.air} /></>}
    {tahap === "tunas" && <Tunas tanaman={tanaman} />}
    {(tahap === "daun" || tahap === "bunga") && <>
      <Lingkungan tahap={tahap} />
      <Tajuk bentuk={tanaman.daun} berbunga={tahap === "bunga"} />
      {tahap === "bunga" && <g transform={jenis === "labu" ? "translate(65 34) scale(1.04)" : "translate(65 32)"}><Bunga bentuk={jenisBunga} warna={warnaBunga} tepi={tepiBunga} /></g>}
    </>}
  </g>;
}
