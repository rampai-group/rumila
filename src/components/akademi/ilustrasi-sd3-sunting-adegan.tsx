import type { ReactNode } from "react";

const garis = { strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Baju({ x, y, skala = 1 }: { x: number; y: number; skala?: number }) {
  return <path transform={`translate(${x} ${y}) scale(${skala})`} d="m-7-11-11 6 5 9 6-3v12H7V1l6 3 5-9-11-6q-7 7-14 0Z" fill="#81badc" stroke="#4076a3" />;
}

type TahapCuci = "buka" | "masuk" | "tutup" | "mulai" | "tunggu" | "keluar";

function MesinCuci({ tahap }: { tahap: TahapCuci }) {
  const terbuka = tahap === "buka" || tahap === "masuk" || tahap === "keluar";
  const gerak = tahap === "masuk" || tahap === "keluar";
  return <g {...garis}>
    <rect x="4" y="4" width="122" height="92" rx="12" fill="#e7f0f0" />
    <rect x="10" y="12" width="73" height="76" rx="8" fill="#f9fbf8" stroke="#5c7887" />
    <path d="M10 32h73" stroke="#829ba6" />
    <path d="M20 20h21v5H20Z" fill="#bbcdd4" stroke="#718d9b" />
    <circle cx="70" cy="23" r="5" fill={tahap === "mulai" || tahap === "tunggu" ? "#84ca7b" : "#d3dfe1"} stroke="#65848f" />
    <circle cx="47" cy="58" r="20" fill={terbuka ? "#477184" : "#9ac6d7"} stroke="#58798c" />
    {terbuka ? <ellipse cx="28" cy="62" rx="13" ry="22" transform="rotate(-19 28 62)" fill="#bddde5" fillOpacity=".91" stroke="#5a8b9b" />
      : <path d="M36 53q6-9 18-4" fill="none" stroke="#d7f5f7" strokeWidth="3" />}
    {tahap === "tutup" && <path d="M101 61H70m7-6-7 6 7 6" fill="none" stroke="#627f93" />}
    {tahap === "mulai" && <>
      <path d="M72 13V7m11 8 6-4m-5 14h7" fill="none" stroke="#8cb661" />
      <path d="M90 32h19l5 39H86Z" fill="#a2c1dd" stroke="#537b9c" />
      <path d="M94 23h12v9H94Z" fill="#91adcf" stroke="#537b9c" />
      <circle cx="100" cy="51" r="6" fill="#e4f1f7" />
    </>}
    {tahap === "tunggu" && <>
      <path d="M32 61q5 12 18 9m4-23q12 4 11 16" fill="none" stroke="#edf8f6" strokeWidth="3" />
      <circle cx="98" cy="55" r="16" fill="#fff2cc" stroke="#a38052" />
      <path d="M98 46v10l6 4" fill="none" stroke="#a38052" />
    </>}
    {gerak && <>
      <Baju x={105} y={56} skala={0.85} />
      <path d={tahap === "masuk" ? "M95 77H58m7-6-7 6 7 6" : "M58 77h37m-7-6 7 6-7 6"} fill="none" stroke="#377e97" />
    </>}
  </g>;
}

function Botol({ tahap }: { tahap: "siapkan" | "soda" | "cuka" | "busa" | "diam" }) {
  return <g {...garis}>
    <rect x="4" y="4" width="122" height="92" rx="12" fill="#e4edf1" />
    <path d="m14 77 12-8h77l15 8-8 11H22Z" fill="#c5a281" stroke="#8c6c59" />
    <path d="M14 77h104" stroke="#9d7d67" />
    <path d="M51 41V29h24v12l10 13v24H42V54Z" fill="#cfedf0" fillOpacity=".84" stroke="#58899b" />
    <path d="M50 29h26v5H50Z" fill="#e5f5f7" stroke="#58899b" />
    {tahap !== "siapkan" && <path d="M44 69q11 2 20-3t19 3v8H44Z" fill="#f8f5eb" stroke="#a6b3aa" />}
    {tahap === "soda" && <>
      <path d="m59 21 40-11" stroke="#7b8f99" strokeWidth="4" />
      <ellipse cx="55" cy="19" rx="13" ry="5" fill="#faf6ea" stroke="#85959b" />
      <circle cx="58" cy="26" r="2" fill="#b6bec1" />
    </>}
    {tahap === "cuka" && <>
      <path d="m86 14 19 8-8 23-18-12Z" fill="#efb07c" fillOpacity=".9" stroke="#a56d4b" />
      <path d="m84 24 17 8M81 31Q73 29 66 34" fill="none" stroke="#bb8557" strokeWidth="3" />
    </>}
    {tahap === "diam" && <>
      <path d="M44 62q7-7 13 0 8-5 14 0 6-4 12 1v10H44Z" fill="#fff5df" stroke="#c99b77" />
      <circle cx="101" cy="45" r="14" fill="#fff6dd" stroke="#a38052" />
      <path d="M101 36v10l6 3" fill="none" stroke="#a38052" />
    </>}
    {tahap === "busa" && <>
      <path d="M57 66q7-19 4-30-13 3-12-8-11-2-6-9 3-6 10-3 3-13 14-10 5 0 9 8 13-2 13 8 10 0 10 9-1 8-12 6 1 13 13 25l-9 8q-17-16-16-33-7 6-7 28Z" fill="#faf4df" stroke="#c99b77" />
      <path d="M63 30q-4-9 4-11m11 15q7-4 5-8" fill="none" stroke="#e2b79a" />
      <circle cx="35" cy="29" r="4" fill="#fdf5e4" stroke="#cc9b73" />
      <circle cx="96" cy="46" r="3" fill="#fdf5e4" stroke="#cc9b73" />
    </>}
  </g>;
}

export const ILUSTRASI_SUNTING_ADEGAN_SD3: Record<string, ReactNode> = {
  "sd3-cuci-buka": <MesinCuci tahap="buka" />,
  "sd3-cuci-masuk": <MesinCuci tahap="masuk" />,
  "sd3-cuci-tutup": <MesinCuci tahap="tutup" />,
  "sd3-cuci-mulai": <MesinCuci tahap="mulai" />,
  "sd3-cuci-tunggu": <MesinCuci tahap="tunggu" />,
  "sd3-cuci-keluar": <MesinCuci tahap="keluar" />,
  "sd3-cuci-jemur": <g {...garis}>
    <rect x="4" y="4" width="122" height="92" rx="12" fill="#e2edf3" />
    <circle cx="100" cy="23" r="11" fill="#f6cb6b" />
    <path d="M19 25v63m93-54v54M19 34q44 18 93 0" fill="none" stroke="#79867a" strokeWidth="3" />
    <Baju x={62} y={56} skala={1.26} />
    <path d="M53 40v9m17-8v9" stroke="#8a624f" strokeWidth="3" />
  </g>,
  "sd3-cuci-angkat": <g {...garis}>
    <rect x="4" y="4" width="122" height="92" rx="12" fill="#e2edf3" />
    <path d="M17 24v63m96-64v64M17 33q47 16 96 0" fill="none" stroke="#79867a" strokeWidth="3" />
    <path d="M38 67h61l-8 20H46Z" fill="#dfb58e" stroke="#967251" />
    <Baju x={68} y={57} skala={1.08} />
    <path d="M41 43v17m-5-6 5 6 5-6" fill="none" stroke="#548d9a" />
  </g>,
  "sd3-gunung-botol": <Botol tahap="siapkan" />,
  "sd3-gunung-soda": <Botol tahap="soda" />,
  "sd3-gunung-cuka": <Botol tahap="cuka" />,
  "sd3-gunung-busa": <Botol tahap="busa" />,
  "sd3-gunung-berhenti": <Botol tahap="diam" />,
  "sd3-ban-gelembung": <g {...garis}>
    <rect x="4" y="4" width="122" height="92" rx="12" fill="#e7f3f0" />
    <path d="M19 52h91l-10 37H29Z" fill="#8ac8d7" stroke="#53879a" />
    <ellipse cx="66" cy="52" rx="47" ry="12" fill="#b8e3ec" stroke="#5896a7" />
    <ellipse cx="65" cy="62" rx="31" ry="16" transform="rotate(-13 65 62)" fill="none" stroke="#424a53" strokeWidth="9" />
    <path d="M24 54q19 12 49 4 18-4 33-2" fill="none" stroke="#e2f2f8" />
    <circle cx="81" cy="48" r="4" fill="#ebfbfc" stroke="#599eae" />
    <circle cx="85" cy="37" r="5" fill="#ebfbfc" stroke="#599eae" />
    <circle cx="91" cy="23" r="7" fill="#ebfbfc" stroke="#599eae" />
  </g>,
};
