import type { CSSProperties, ReactNode } from "react";
import type { Adegan } from "@akademi/schema";
import { bacaJamWaktu } from "@/lib/akademi/jam-waktu";

import { GambarIlustrasiAwal } from "./ilustrasi-awal";
import { PerangkatPilot, RobotPilot } from "./ilustrasi-perangkat";

const GAMBAR_BANDING: Record<string, string> = {
  "🍉": "awal-semangka-utuh", "🍵": "qc-jenjang-pilot-cangkir-kosong",
  "🥣": "qc-jenjang-pilot-mangkuk-kosong", "🍲": "qc-jenjang-pilot-panci-kosong",
};

type Titik = readonly [number, number];

function poligonBeraturan(sisi: number, radius: number, rotasi = 0): Titik[] {
  return Array.from({ length: sisi }, (_, i) => {
    const a = (i / sisi) * 2 * Math.PI - Math.PI / 2 + rotasi;
    return [50 + radius * Math.cos(a), 50 + radius * Math.sin(a)];
  });
}

const BANGUN: Record<string, { titik: Titik[]; isi: string }> = {
  persegi: { titik: [[19, 19], [81, 19], [81, 81], [19, 81]], isi: "#87c6f5" },
  "segitiga-sama-sisi": { titik: poligonBeraturan(3, 44), isi: "#ff91a2" },
  segilima: { titik: poligonBeraturan(5, 41), isi: "#ffca61" },
  segienam: { titik: poligonBeraturan(6, 41), isi: "#66c1a7" },
  "segienam-datar": { titik: poligonBeraturan(6, 41, Math.PI / 6), isi: "#b8a8fb" },
  segidelapan: { titik: poligonBeraturan(8, 42, Math.PI / 8), isi: "#ff927d" },
  "persegi-panjang": { titik: [[8, 28], [92, 28], [92, 72], [8, 72]], isi: "#ffd771" },
  ketupat: { titik: [[50, 7], [76, 50], [50, 93], [24, 50]], isi: "#bcaff9" },
  "jajar-genjang": { titik: [[34, 23], [92, 23], [67, 77], [9, 77]], isi: "#a8dc83" },
  trapesium: { titik: [[30, 22], [70, 22], [92, 78], [8, 78]], isi: "#fdab76" },
  "segitiga-siku": { titik: [[14, 16], [14, 84], [88, 84]], isi: "#83d4e9" },
};

const POJOK: Record<string, string> = {
  "sudut-segitiga": "segitiga-sama-sisi",
  "sudut-ubin": "persegi",
  "sudut-rambu": "segidelapan",
  "sudut-segienam": "segienam",
};

function TandaPojok({ titik }: { titik: Titik[] }) {
  const [x, y] = titik[0];
  const dekat = ([u, v]: Titik): Titik => {
    const rasio = 16 / Math.hypot(u - x, v - y);
    return [x + (u - x) * rasio, y + (v - y) * rasio];
  };
  const [ax, ay] = dekat(titik[titik.length - 1]);
  const [bx, by] = dekat(titik[1]);
  return (
    <>
      <path d={`M${ax} ${ay}A16 16 0 0 0 ${bx} ${by}`} fill="none" stroke="#843511" strokeWidth="3" />
      <circle cx={x} cy={y} r="3.5" fill="#843511" />
    </>
  );
}

function JamSudut({ pukul }: { pukul: number }) {
  const titikJam = (jam: number, jari: number): Titik => {
    const sudut = jam * Math.PI / 6;
    return [50 + jari * Math.sin(sudut), 50 - jari * Math.cos(sudut)];
  };
  const [xJam, yJam] = titikJam(pukul, 27);
  const [xBusur, yBusur] = titikJam(pukul, 18);
  return (
    <>
      <circle cx="50" cy="50" r="45" fill="#f0f7ff" stroke="#243b62" strokeWidth="3" />
      {Array.from({ length: 12 }, (_, jam) => {
        const [x1, y1] = titikJam(jam, 39);
        const [x2, y2] = titikJam(jam, 43);
        return <line key={jam} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#243b62" strokeWidth="2" />;
      })}
      <path d={`M50 32A18 18 0 0 ${pukul <= 6 ? 1 : 0} ${xBusur} ${yBusur}`} fill="none" stroke="#b45c2d" strokeWidth="3" />
      <line data-jarum="menit" x1="50" y1="50" x2="50" y2="14" stroke="#246da9" strokeWidth="4" strokeLinecap="round" />
      <line data-jarum="jam" x1="50" y1="50" x2={xJam} y2={yJam} stroke="#243b62" strokeWidth="5" strokeLinecap="round" />
      <circle cx="50" cy="50" r="4" fill="#243b62" />
    </>
  );
}

function JamWaktu({ jam, menit, varian }: { jam: number; menit: number; varian: string }) {
  const ujung = (sudut: number, panjang: number) => {
    const rad = sudut * Math.PI / 180;
    return { x2: 50 + panjang * Math.sin(rad), y2: 50 - panjang * Math.cos(rad) };
  };
  return <g data-jam-waktu={varian}>
    <circle cx="50" cy="50" r="47" fill="#fff" stroke="#243b62" strokeWidth="3" />
    {Array.from({ length: 12 }, (_, i) => {
      const p = ujung((i + 1) * 30, 36);
      return <text key={i} x={p.x2} y={p.y2} textAnchor="middle" dominantBaseline="central" fill="#243b62" fontSize="11" fontWeight="700">{i + 1}</text>;
    })}
    <line data-jarum="menit" x1="50" y1="50" {...ujung(menit * 6, 29)} stroke="#087db4" strokeWidth="3" strokeLinecap="round" />
    <line data-jarum="jam" x1="50" y1="50" {...ujung(jam * 30 + menit / 2, 20)} stroke="#243b62" strokeWidth="5" strokeLinecap="round" />
    <circle cx="50" cy="50" r="3" fill="#243b62" />
  </g>;
}

function Geometri({ varian }: { varian: string }) {
  const waktu = bacaJamWaktu(varian);
  if (waktu) return <JamWaktu {...waktu} varian={varian} />;
  const jam = /^pukul-(1[01]|[1-9])$/.exec(varian);
  if (jam) return <JamSudut pukul={Number(jam[1])} />;
  if (varian === "sudut-buku") {
    return (
      <>
        <path d="M9 54H91V62Q71 59 50 64Q29 59 9 62Z" fill="#fff1b5" stroke="#243b62" strokeWidth="2.5" />
        <path d="M50 55v8M9 54h82" stroke="#243b62" strokeWidth="3" strokeLinecap="round" />
        <path d="M32 54a18 18 0 0 1 36 0" fill="none" stroke="#843511" strokeWidth="3" />
        <circle cx="50" cy="54" r="3.5" fill="#843511" />
      </>
    );
  }
  if (varian === "sudut-gunting") {
    const setengahBukaan = Math.PI / 12;
    const dariPoros = (jarak: number, arah: -1 | 1): string => (
      `${42 + jarak * Math.cos(setengahBukaan)} ${50 + arah * jarak * Math.sin(setengahBukaan)}`
    );
    return (
      <>
        <g stroke="#243b62" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d={`M23 32L42 50L${dariPoros(44, -1)}Q83 48 43 53L23 68M23 68L42 50L${dariPoros(44, 1)}Q83 52 43 47L23 32`} fill="#bce3f9" />
          <circle cx="19" cy="29" r="9" fill="#ffac61" />
          <circle cx="19" cy="71" r="9" fill="#ffac61" />
        </g>
        <path d={`M${dariPoros(18, -1)}A18 18 0 0 1 ${dariPoros(18, 1)}`} fill="none" stroke="#843511" strokeWidth="3" />
        <circle cx="42" cy="50" r="3.5" fill="#843511" />
      </>
    );
  }
  const bentuk = BANGUN[POJOK[varian] ?? varian];
  if (!bentuk) return null;
  return (
    <>
      <polygon
        points={bentuk.titik.map(([x, y]) => `${x},${y}`).join(" ")}
        fill={bentuk.isi}
        stroke="#243b62"
        strokeWidth="3"
        strokeLinejoin="miter"
      />
      {POJOK[varian] && <TandaPojok titik={bentuk.titik} />}
    </>
  );
}

function KausKaki() {
  return (
    <g stroke="#243b62" strokeWidth="4" strokeLinejoin="round">
      <path fill="#76c7ef" d="M50 9h31l-1 41c0 7-2 12-8 17L50 85c-9 7-22 7-29-1-5-6-5-16 2-22l24-22Z" />
      <path fill="#fff1b0" d="M50 9h31v14H50Z" />
      <path fill="#fff1b0" d="M28 58l18 25c-9 7-20 8-25 1-5-6-5-16 2-22Z" />
    </g>
  );
}

function PizzaPotong({ pembilang, penyebut }: { pembilang: number; penyebut: number }) {
  if (penyebut === 1) {
    return <circle cx="65" cy="50" r="43" fill={pembilang === 1 ? "#ffc957" : "#fff2d8"} stroke="#8a521f" strokeWidth="3" data-juring={pembilang === 1 ? "isi" : "kosong"} />;
  }
  const titik = (i: number, r = 43): Titik => {
    const a = (i / penyebut) * 2 * Math.PI - Math.PI / 2;
    return [65 + r * Math.cos(a), 50 + r * Math.sin(a)];
  };
  return (
    <>
      <circle cx="65" cy="50" r="43" fill="#fff2d8" stroke="#a45d29" strokeWidth="3" />
      {Array.from({ length: penyebut }, (_, i) => {
        const [x1, y1] = titik(i);
        const [x2, y2] = titik(i + 1);
        const [xTopping, yTopping] = titik(i + 0.5, 29);
        const dipilih = i < pembilang;
        return (
          <g key={i} data-juring={dipilih ? "isi" : "kosong"}>
            <path d={`M65 50L${x1} ${y1}A43 43 0 0 1 ${x2} ${y2}Z`} fill={dipilih ? "#ffc957" : "none"} stroke="#8a521f" strokeWidth="2" />
            {dipilih && <circle cx={xTopping} cy={yTopping} r="4" fill="#b73d3a" />}
          </g>
        );
      })}
    </>
  );
}

function PenandaSd({ varian }: { varian: string }) {
  if (varian === "gelas-air") {
    return (
      <g stroke="#243b62" strokeWidth="3" strokeLinejoin="round">
        <path d="M32 17h66L90 89H40Z" fill="#f1fbff" />
        <path d="M37 46q14-7 28 0t28 0l-4 40H41Z" fill="#86d4f4" stroke="none" />
        <path d="M45 26l2 12" stroke="#fff" strokeLinecap="round" />
      </g>
    );
  }
  if (varian === "botol-air") {
    return (
      <g stroke="#243b62" strokeWidth="3" strokeLinejoin="round">
        <path d="M52 20h26v10l8 11q3 4 3 10v31q0 9-7 9H48q-7 0-7-9V51q0-6 3-10l8-11Z" fill="#f1fbff" />
        <path d="M43 53q11-6 22 0t22 0v29q0 7-5 7H48q-5 0-5-7Z" fill="#86d4f4" stroke="none" />
        <rect x="50" y="10" width="30" height="11" rx="3" fill="#3d9dc9" />
        <path d="M49 44l4-6" stroke="#fff" strokeLinecap="round" />
      </g>
    );
  }
  if (varian === "tuang") {
    return (
      <g stroke="#243b62" strokeWidth="3" strokeLinejoin="round">
        <path d="M17 15l38 7-1 14-18 7-29-18Z" fill="#ffbd61" />
        <path d="M55 30c11 4 23 12 26 31" stroke="#ea8135" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M69 50h51l-8 40H77Z" fill="#e3f8ff" />
        <path d="M75 68h39l-4 19H79Z" fill="#ffbd61" stroke="none" />
      </g>
    );
  }
  return (
    <g transform={varian === "polong-panjang" ? "translate(0 10) scale(1 .8)" : undefined}>
      <path d="M19 68C38 82 95 70 110 34c5 29-24 54-66 53-10 0-25-4-25-19Z" fill="#268257" stroke="#174d3c" strokeWidth="3" />
      <path d="M20 66c24 10 67-2 91-37-1 26-29 47-67 50-9 1-20-5-24-13Z" fill="#8cce68" stroke="#174d3c" strokeWidth="3" />
      {varian === "polong-kacang" && (
        <g fill="#d5ee9c" stroke="#2f724e" strokeWidth="2">
          <circle cx="41" cy="69" r="6" />
          <circle cx="59" cy="65" r="6.5" />
          <circle cx="77" cy="58" r="6.5" />
          <circle cx="92" cy="47" r="5.5" />
        </g>
      )}
      <path d="M110 34q8-14 14-14" fill="none" stroke="#174d3c" strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

function IkonPerangkat({ varian }: { varian: string }) {
  if (varian.startsWith("senter-")) {
    return (
      <g fill="#d4ecfa" stroke="#243b62" strokeWidth="2">
        <path d="M52 47h34l11-8v24l-11-8H52Z" />
        <path d="M73 46v-4h11v4" fill="none" />
      </g>
    );
  }
  if (varian.startsWith("mobil-")) {
    return (
      <g stroke="#243b62" strokeWidth="2">
        <path d="M50 61V50h11l7-10h16l10 10h12v11Z" fill="#bce3f9" />
        <circle cx="62" cy="61" r="5" fill="#476181" />
        <circle cx="94" cy="61" r="5" fill="#476181" />
      </g>
    );
  }
  if (varian.startsWith("lentera-")) {
    return (
      <g stroke="#243b62" strokeWidth="2">
        <path d="M67 44v-4a10 10 0 0 1 20 0v4" fill="none" />
        <path d="M65 43h24l-2 19H67Z" fill="#fff0a9" />
        <path d="M62 62h31v5H62Z" fill="#bce3f9" />
      </g>
    );
  }
  return null;
}

const KAWAT = "#243b62";
const BUKA_SAKELAR = new Set(["sakelar-buka", "sakelar-pisau-buka", "senter-off"]);
const TUTUP_SAKELAR = new Set(["sakelar-tutup", "sakelar-pisau-tutup", "senter-on", "mobil-on", "lentera-on"]);

function SimbolLampu({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`} data-simbol-lampu="">
    <circle r="10" fill="#fff" />
    <path d="m-5-5 10 10m0-10-10 10" />
  </g>;
}

function DiagramLampu({ paralel, tiga }: { paralel: boolean; tiga: boolean }) {
  const posisi = paralel ? [[81, 25], [81, 55]] : (tiga ? [[42, 28], [77, 28], [112, 28]] : [[53, 28], [102, 28]]);
  return <g data-topologi={paralel ? "paralel" : "seri"}>
    <rect x="1" y="1" width="153" height="98" rx="11" fill="#f0f7ff" />
    <g fill="none" stroke={KAWAT} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
      {paralel ? (
        <>
          <path d="M73 82H28V25H127V82H82M28 55H127" />
          <circle cx="28" cy="55" r="3.5" fill={KAWAT} stroke="none" />
          <circle cx="127" cy="55" r="3.5" fill={KAWAT} stroke="none" />
        </>
      ) : <path d="M73 82H20V28H135V82H82" />}
      {posisi.map(([x, y]) => <SimbolLampu key={`${x}-${y}`} x={x} y={y} />)}
      <path d="M73 72v20m9-16v12" />
      <path d="M62 71h6m-3-3v6m21-3h6" strokeWidth="1.8" />
    </g>
  </g>;
}

const NYALA = {
  padam: { warna: "#f4f7fa", halo: "transparent", radius: 0 },
  redup: { warna: "#ffe49b", halo: "#ffefa0", radius: 19 },
  biasa: { warna: "#ffd46c", halo: "#ffe486", radius: 24 },
  terang: { warna: "#ffbf41", halo: "#ffdc63", radius: 30 },
} as const;

function LampuNyata({ x, tingkat }: { x: number; tingkat: keyof typeof NYALA }) {
  const { warna, halo, radius } = NYALA[tingkat];
  return <g transform={`translate(${x} 48)`} data-nyala={tingkat}>
    {radius > 0 && <circle cy="-5" r={radius} fill={halo} opacity=".68" stroke="none" />}
    <path d="M-10 11q1-7-5-12q-4-4-4-10a19 19 0 0 1 38 0q0 6-4 10q-6 5-5 12Z" fill={warna} />
    <path d="M-10 11h20v8q0 6-7 6h-6q-7 0-7-6Z" fill="#9caec1" />
    <path d="m-10-3 4 3 4-8 4 8 4-8 4 5M-9 17H9m-8 4h5" fill="none" strokeWidth="2" />
  </g>;
}

const HASIL_NYALA = new Map<string, keyof typeof NYALA>([
  ["lampu-lebih-redup", "redup"],
  ["lampu-lebih-terang", "terang"],
  ["lampu-sama-terang", "biasa"],
  ["lampu-ikut-padam", "padam"],
]);

function BandingNyalaLampu({ akhir }: { akhir: keyof typeof NYALA }) {
  return <g stroke={KAWAT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="1" width="153" height="98" rx="11" fill="#f0f7ff" stroke="none" />
    <LampuNyata x={37} tingkat="biasa" />
    <path d="M68 48h19m-7-7 7 7-7 7" fill="none" />
    <LampuNyata x={117} tingkat={akhir} />
  </g>;
}

function Rangkaian({ varian }: { varian: string }) {
  if (varian === "dua-lampu-seri" || varian === "tiga-lampu-seri" || varian === "dua-lampu-paralel") {
    return <DiagramLampu paralel={varian === "dua-lampu-paralel"} tiga={varian === "tiga-lampu-seri"} />;
  }
  const akhir = HASIL_NYALA.get(varian);
  if (akhir) return <BandingNyalaLampu akhir={akhir} />;
  if (varian === "baterai-lemah") {
    return (
      <g stroke="#243b62" strokeWidth="3">
        <rect x="27" y="30" width="93" height="40" rx="6" fill="#f1f5fa" />
        <rect x="120" y="42" width="8" height="16" rx="2" fill="#243b62" />
        <rect x="34" y="38" width="12" height="24" rx="2" fill="#ea784b" stroke="none" />
      </g>
    );
  }
  const sakelarTerbuka = BUKA_SAKELAR.has(varian);
  const sakelar = sakelarTerbuka || TUTUP_SAKELAR.has(varian);
  const putusDiKanan = varian === "kabel-potong" || varian === "mobil-putus";
  const kabelLepas = varian === "kabel-lepas";
  const jepitLampuLepas = varian === "jepit-lampu-lepas";
  const kutubSama = varian === "kutub-sama";
  const tanpaBaterai = varian === "tanpa-baterai" || varian === "lentera-kosong";
  const duaBaterai = varian === "dua-baterai";
  const batasKiri = duaBaterai ? 65 : 72;
  const batasKanan = duaBaterai ? 96 : 81;

  return (
    <>
      <rect x="1" y="1" width="153" height="98" rx="11" fill="#f0f7ff" />
      <IkonPerangkat varian={varian} />
      <g fill="none" stroke={KAWAT} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d={`M19 82V24H${sakelar ? 47 : 98} M19 82H${batasKiri}`} />
        {sakelar && (
          <>
            <path d="M75 24H98" />
            <path d={sakelarTerbuka ? "M47 24L70 11" : "M47 24H75"} />
            <circle cx="47" cy="24" r="3" fill="#fff" />
            <circle cx="75" cy="24" r="3" fill="#fff" />
          </>
        )}
        <circle cx="110" cy="24" r="12" fill="#fff" />
        {varian === "filamen-putus" ? <path d="M104 28l4-10m4 5 4 5" /> : <path d="M104 19l12 10m0-10-12 10" />}
        <path d={putusDiKanan ? "M122 24H138V42M138 55V82" : jepitLampuLepas ? "M132 30l6 4v48" : "M122 24H138V82"} />
        {kutubSama ? <path d="M138 82v12H53V82" /> : <path d={`M138 82H${kabelLepas ? 94 : batasKanan}`} />}
        {tanpaBaterai ? (
          <rect x="72" y="74" width="10" height="16" rx="2" strokeDasharray="2 3" stroke="#64728a" />
        ) : (
          <>
            <path d={`M${batasKiri} 71v22M${batasKiri + 9} 76v12`} />
            {duaBaterai && <path d="M74 82h13M87 71v22M96 76v12" />}
            <path d={`M${batasKiri - 8} 71h6m-3-3v6M${batasKanan + 3} 71h6`} strokeWidth="1.8" />
          </>
        )}
        {varian === "kabel-baru" && <path d="M113 82h17" stroke="#138569" strokeWidth="5" />}
      </g>
      {putusDiKanan && <path d="M135 44l6 2m-6 6 6 2" stroke="#ae4a34" strokeWidth="2" fill="none" />}
      {kabelLepas && <circle cx="94" cy="82" r="3" fill="#ae4a34" />}
      {jepitLampuLepas && <circle cx="131" cy="29" r="3" fill="#ae4a34" />}
    </>
  );
}

export function GambarAdeganSd({
  adegan, s, style, className,
}: { adegan: Adegan; s: number; style?: CSSProperties; className?: string }) {
  const varian = adegan.varian ?? "";
  let isi: ReactNode = null;
  let lebar = 100;
  switch (adegan.jenis) {
    case "geometri":
      isi = <Geometri varian={varian} />;
      break;
    case "kaus-kaki":
      isi = <KausKaki />;
      break;
    case "rangkaian":
      lebar = 155;
      isi = <Rangkaian varian={varian} />;
      break;
    case "ilustrasi-sd":
      lebar = 130;
      isi = varian === "banding-berat" || varian === "banding-kapasitas" ? (
        <g data-petunjuk-banding={varian} data-nilai={adegan.t}>
          {GAMBAR_BANDING[adegan.tanda ?? ""]
            ? <g transform="translate(29 6)"><GambarIlustrasiAwal gambar={GAMBAR_BANDING[adegan.tanda!]} s={55} /></g>
            : <text x="65" y="58" textAnchor="middle" fontSize="52">{adegan.tanda}</text>}
          {/* Panjang batang adalah petunjuk perbandingan, bukan ukuran emoji atau satuan ukur. */}
          <rect x="10" y="73" width="110" height="18" rx="5" fill="#e8edf3" stroke="#39516b" strokeWidth="2" />
          <rect x="10" y="73" width={110 * (adegan.t ?? 0)} height="18" rx="5" fill={varian === "banding-berat" ? "#d97b15" : "#087db4"} />
        </g>
      ) : varian.startsWith("alat-") ? <PerangkatPilot varian={varian} /> : varian.startsWith("robot-") ? <RobotPilot varian={varian} /> : <PenandaSd varian={varian} />;
      break;
    case "potong":
      if (adegan.pembilang === undefined || adegan.penyebut === undefined) return null;
      lebar = 130;
      isi = <PizzaPotong pembilang={adegan.pembilang} penyebut={adegan.penyebut} />;
      break;
    default:
      return null;
  }

  return (
    <svg
      aria-hidden="true"
      data-adegan={adegan.jenis}
      data-varian={varian || undefined}
      viewBox={`0 0 ${lebar} 100`}
      width={s * lebar / 100}
      height={s}
      className={`inline-block shrink-0 ${className ?? ""}`}
      style={style}
    >
      {isi}
    </svg>
  );
}
