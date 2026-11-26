"use client";

// Gambar adegan untuk langkah yang bendanya sama tetapi keadaannya berubah (jemuran basah → kering, bayangan panjang → pendek).
// Tanpa ini semua kartu memakai emoji yang sama, padahal soalnya "gambar tertukar": anak yang belum membaca tidak punya petunjuk.
// Digambar dari `adegan` di paket: `jenis` + `t` (0–1, posisi dalam proses) + `tanda` (emoji kecil pelengkap).

import type { CSSProperties, ReactNode } from "react";
import type { Adegan } from "@akademi/schema";
import { BALOO } from "./jenis";
import { GambarIlustrasiAwal, ILUSTRASI_AWAL_IDS } from "./ilustrasi-awal";
import { GambarAdeganSd } from "./adegan-gambar-sd";

/** Kanvas 130 × 100; `s` = tinggi px. */
const W = 130;
const H = 100;

function campur(a: string, b: string, t: number): string {
  const n = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const x = n(a), y = n(b);
  return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * t)).join(",")})`;
}

/** Warna langit: fajar merah muda → siang biru → senja ungu-jingga. */
function langit(t: number): [string, string] {
  if (t <= 0.1) return ["#f7a8c4", "#ffe39a"];
  if (t >= 0.9) return ["#59408f", "#ff8a3d"];
  return t < 0.4 ? ["#8fd0ff", "#fff0b8"] : ["#2f9bef", "#aee3ff"];
}

export function GambarAdegan({ adegan, emoji = "", s, style, className = "" }: { adegan: Adegan; emoji?: string; s: number; style?: CSSProperties; className?: string }) {
  const { jenis, tanda } = adegan;
  if (jenis === "ilustrasi" && adegan.varian) return <GambarIlustrasiAwal gambar={adegan.varian} s={s} style={style} className={className} />;
  if (jenis === "kaus-kaki" || jenis === "geometri" || jenis === "rangkaian" || jenis === "ilustrasi-sd" || (jenis === "potong" && adegan.penyebut !== undefined)) {
    return <GambarAdeganSd adegan={adegan} s={s} style={style} className={className} />;
  }
  const t = adegan.t ?? 0;
  const k = s / H;
  /** emoji berpusat di (x, y) kanvas, tinggi `besar` */
  const E = (isi: string, x: number, y: number, besar: number, lain?: CSSProperties) => (
    <span style={{ position: "absolute", left: x * k, top: y * k, fontSize: besar * k, lineHeight: 1, transform: "translate(-50%,-50%)", whiteSpace: "nowrap", ...lain }}>{isi}</span>
  );

  let latar: ReactNode = null;
  let depan: ReactNode = null;
  let svgDepan: ReactNode = null;

  if (jenis === "matahari" || jenis === "bayangan" || jenis === "hadap") {
    // timur = kanan, barat = kiri (seperti peta)
    const [atas, bawah] = langit(t);
    const mx = 112 - 94 * t;
    const my = 70 - 54 * Math.sin(Math.PI * t);
    const panjang = 10 + 44 * Math.abs(t - 0.5) * 2;
    const arah = t === 0.5 ? 0 : t < 0.5 ? -1 : 1;
    latar = (
      <>
        <rect width={W} height={H} rx="14" fill={bawah} />
        <path d={`M0 14Q0 0 14 0H${W - 14}Q${W} 0 ${W} 14V38H0Z`} fill={atas} />
        <path d={`M0 38H${W}V52H0Z`} fill={atas} opacity=".45" />
        <path d="M18 72Q65 -38 112 72" fill="none" stroke="#fff" strokeWidth="1.6" strokeDasharray="3 4" opacity=".85" />
        <circle cx={mx} cy={my} r="15" fill="#fff3a6" opacity=".7" />
        <circle cx={mx} cy={my} r="10.5" fill={t >= 0.9 ? "#ff5a1f" : "#ffc400"} />
        <path d={`M0 73H${W}V86Q${W} ${H} ${W - 14} ${H}H14Q0 ${H} 0 86Z`} fill={jenis === "bayangan" ? "#e6cf98" : "#63b95c"} />
        {jenis === "bayangan" &&
          (arah === 0 ? (
            <ellipse cx="65" cy="88" rx="9" ry="4" fill="#3d3322" />
          ) : (
            <path d={`M65 84L${65 + arah * panjang} 86Q${65 + arah * (panjang + 8)} 91 ${65 + arah * panjang} 95L65 91Z`} fill="#3d3322" />
          ))}
      </>
    );
    depan = (
      <>
        {E(emoji, 65, jenis === "bayangan" ? 67 : 64, jenis === "bayangan" ? 42 : 44, jenis === "hadap" ? { transform: `translate(-50%,-50%) rotate(${(0.5 - t) * 80}deg)` } : undefined)}
        {tanda && E(tanda, 88, 80, 25)}
        {E("B", 10, 90, 14, { fontFamily: BALOO, fontWeight: 900, color: "#0b2545" })}
        {E("T", 120, 90, 14, { fontFamily: BALOO, fontWeight: 900, color: "#0b2545" })}
      </>
    );
  } else if (jenis === "jauh") {
    // sumber bunyi di kiri; makin jauh anaknya makin kecil dan gelombang yang sampai makin tipis
    latar = (
      <>
        <rect width={W} height={H} rx="14" fill="#aee0ff" />
        <path d={`M0 58H${W}V86Q${W} ${H} ${W - 14} ${H}H14Q0 ${H} 0 86Z`} fill="#8fd27f" />
        <path d={`M0 98L${W} 62V68L22 ${H}H14Q4 ${H} 0 98Z`} fill="#dcc79c" />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M${42 + i * 22} ${42 - i * 3}Q${52 + i * 22} 60 ${42 + i * 22} ${78 + i * 3}`} fill="none" stroke="#0567c2" strokeWidth={6 - i * 1.5} strokeLinecap="round" opacity={1 - i * 0.22} />
        ))}
      </>
    );
    depan = (
      <>
        {tanda && ILUSTRASI_AWAL_IDS.includes(tanda)
          ? <span style={{ position: "absolute", left: 2 * k, top: 34 * k }}><GambarIlustrasiAwal gambar={tanda} s={31 * k} /></span>
          : E(tanda ?? "🔔", 22, 62, 38)}
        {E(emoji, 52 + 64 * t, 72 - 14 * t, 46 - 28 * t)}
      </>
    );
  } else if (jenis === "senter") {
    const bx = 34 + 41 * t;
    latar = (
      <>
        <rect width={W} height={H} rx="14" fill="#26335c" />
        <path d="M22 50L90 8V92Z" fill="#ffe98a" opacity=".85" />
        <rect x="2" y="43" width="16" height="14" rx="3" fill="#98a6b8" />
        <path d="M17 41L25 37V63L17 59Z" fill="#d5dde7" />
        <rect x="88" y="5" width="39" height="90" rx="4" fill="#fff" />
      </>
    );
    depan = (
      <>
        {E(emoji, 107.5, 50, 37 - 24 * t, { filter: "brightness(0)" })}
        {E(emoji, bx, 50, 20)}
      </>
    );
  } else if (jenis === "kering") {
    const tetes = [[42, 78], [66, 88], [88, 76], [54, 92], [78, 93]].slice(0, Math.round(5 * (1 - t)));
    latar = (
      <>
        <rect width={W} height={H} rx="14" fill={campur("#a9c4dc", "#ffe59a", t)} />
        <path d={`M2 20H${W - 2}`} stroke="#7a4a22" strokeWidth="3" />
      </>
    );
    svgDepan = tetes.map(([x, y], i) => <path key={i} d={`M${x} ${y - 10}Q${x + 7} ${y} ${x} ${y + 3}Q${x - 7} ${y} ${x} ${y - 10}Z`} fill="#0786eb" />);
    depan = (
      <>
        {E(emoji, 65, 45, 56, { filter: t < 0.5 ? "saturate(1.8) brightness(.78)" : undefined })}
        {t >= 1 && E("✨", 104, 72, 28)}
      </>
    );
  } else if (jenis === "jamur") {
    const bintik = [[66, 50], [50, 42], [82, 58], [58, 66], [78, 38], [42, 58], [70, 72], [92, 48], [56, 30], [86, 72], [38, 70], [72, 28]].slice(0, t <= 0 ? 0 : Math.max(1, Math.round(12 * t * t)));
    depan = E(emoji, 65, 50, 82);
    svgDepan = bintik.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i % 2 ? 6 : 7.5} fill="#2f8f5b" stroke="#bff0cf" strokeWidth="2" />);
  } else if (jenis === "isi") {
    const panci = emoji === "🍲";
    const [kiri, kanan, atas, bawah] = panci ? [26, 104, 28, 88] : [42, 88, 12, 90];
    const muka = atas + 5 + (bawah - atas - 8) * t;
    latar = (
      <>
        <rect x={kiri} y={atas} width={kanan - kiri} height={bawah - atas} rx="8" fill="#f2f7fb" />
        {t < 1 && <rect x={kiri + 3} y={muka} width={kanan - kiri - 6} height={bawah - muka - 3} rx="4" fill="#0786eb" />}
        <path d={`M${kiri} ${atas}V${bawah - 8}Q${kiri} ${bawah} ${kiri + 8} ${bawah}H${kanan - 8}Q${kanan} ${bawah} ${kanan} ${bawah - 8}V${atas}`} fill="none" stroke="#3d4f66" strokeWidth="5" strokeLinecap="round" />
        {panci && <path d="M24 42H10M106 42H120" stroke="#3d4f66" strokeWidth="7" strokeLinecap="round" />}
      </>
    );
  } else if (jenis === "cokelat") {
    latar = (
      <>
        <path d="M65 22C46 6 22 20 24 50C26 80 46 98 65 90C84 98 104 80 106 50C108 20 84 6 65 22Z" fill="#e8383f" />
        <path d="M65 29C50 17 31 27 33 51C35 74 50 88 65 82C80 88 95 74 97 51C99 27 80 17 65 29Z" fill={campur("#fff8dc", "#75431d", t)} />
        <ellipse cx="58" cy="55" rx="3" ry="6" fill="#4a2a14" />
        <ellipse cx="72" cy="55" rx="3" ry="6" fill="#4a2a14" />
        <path d="M65 22V8" stroke="#6b4226" strokeWidth="5" strokeLinecap="round" />
      </>
    );
  } else if (jenis === "potong" || jenis === "sudut") {
    // t = bagian satu putaran
    const a = 2 * Math.PI * t;
    const besar = a > Math.PI ? 1 : 0;
    const busur = (r: number) => `A${r} ${r} 0 ${besar} 1 ${65 + r * Math.sin(a)} ${50 - r * Math.cos(a)}`;
    const ujung = `${65 + 44 * Math.sin(a)} ${50 - 44 * Math.cos(a)}`;
    latar =
      jenis === "potong" ? (
        <>
          <circle cx="65" cy="50" r="46" fill="#f2dfc0" stroke="#c98a3a" strokeWidth="3" strokeDasharray="4 4" />
          {t >= 1 ? <circle cx="65" cy="50" r="46" fill="#ffb02e" /> : <path d={`M65 50V4${busur(46)}Z`} fill="#ffb02e" stroke="#b85a0c" strokeWidth="4" strokeLinejoin="round" />}
          {[0.16, 0.5, 0.84].map((f) => (
            <circle key={f} cx={65 + 29 * Math.sin(a * f)} cy={50 - 29 * Math.cos(a * f)} r="4.5" fill="#d23a2f" />
          ))}
        </>
      ) : (
        <>
          <circle cx="65" cy="50" r="46" fill="#eaf3ff" />
          <path d={`M65 6V50L${ujung}`} fill="none" stroke="#0b2545" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d={`M65 30${busur(20)}`} fill="none" stroke="#fd861d" strokeWidth="5" strokeLinecap="round" />
        </>
      );
    if (jenis === "sudut") depan = E(emoji, 65, 68, 26);
  } else {
    // "tanda": benda yang sama + lambang keadaan (menyala/mati, masuk/keluar)
    depan = (
      <>
        {E(emoji, 56, 48, 78)}
        {tanda && E(tanda, 104, 78, 40)}
      </>
    );
  }

  return (
    <span aria-hidden data-adegan={jenis} className={`relative inline-block shrink-0 ${className}`} style={{ width: W * k, height: H * k, ...style }}>
      {latar && (
        <svg viewBox={`0 0 ${W} ${H}`} width={W * k} height={H * k} className="absolute inset-0">
          {latar}
        </svg>
      )}
      {depan}
      {svgDepan && (
        <svg viewBox={`0 0 ${W} ${H}`} width={W * k} height={H * k} className="absolute inset-0">
          {svgDepan}
        </svg>
      )}
    </span>
  );
}
