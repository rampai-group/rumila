import type { ReactNode } from "react";

type Jenis = "es" | "keramik" | "karpet" | "pasir" | "kaca" | "kayu" | "handuk" | "amplas" | "cermin";

const warna: Record<Jenis, [string, string, string]> = {
  es: ["#a6dfef", "#528dac", "#edfbff"],
  keramik: ["#dae7e9", "#7796a0", "#fff"],
  karpet: ["#bd8275", "#884f53", "#ecc0a1"],
  pasir: ["#ebc477", "#ab7848", "#d3a352"],
  kaca: ["#bfecf1", "#76aebc", "#f2fcfd"],
  kayu: ["#d39a63", "#976243", "#b3784d"],
  handuk: ["#8cc6c9", "#4a8187", "#cee9e3"],
  amplas: ["#b68970", "#794f49", "#704940"],
  cermin: ["#c6e0ec", "#5f7d94", "#e6f6fd"],
};

function Bidang({ jenis }: { jenis: Jenis }) {
  const [muka, pinggir, detail] = warna[jenis];
  const berbutir = jenis === "pasir" || jenis === "amplas";
  const kain = jenis === "handuk" || jenis === "karpet";
  return <g strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 70L35 27H119V35L104 82 10 79Z" fill={pinggir} stroke="#425768" strokeWidth="2.3" />
    <path d="M10 70L35 27H119L103 73Z" fill={muka} stroke={pinggir} strokeWidth="2.3" />
    {jenis === "keramik" && <path d="M56 29L34 70M88 29L69 72M22 51H109M46 38H63M75 58H89" stroke={pinggir} strokeWidth="2" fill="none" />}
    {jenis === "es" && <path d="M35 64L47 54 51 40 64 38M77 68L80 51 95 38M47 54L67 56M80 51L88 55M101 30L109 35" stroke={detail} strokeWidth="3" fill="none" />}
    {jenis === "kayu" && <path d="M33 43Q61 35 92 40T113 38M23 58Q45 50 67 54T106 48M50 64Q63 56 77 64T99 60M54 43Q69 39 78 46Q62 52 54 43Z" stroke={detail} strokeWidth="2" fill="none" />}
    {jenis === "kaca" && <path d="M17 66L106 69M37 30L15 67M41 32H72M38 37H54M89 60H101" stroke={detail} strokeWidth="3.2" fill="none" />}
    {jenis === "cermin" && <>
      <path d="M19 66L40 31H109L97 69Z" stroke={pinggir} strokeWidth="2" fill={detail} />
      <path d="M38 60L59 35M51 64L75 35M78 65L100 39" stroke="#accadf" strokeWidth="3" fill="none" />
    </>}
    {berbutir && Array.from({ length: 36 }, (_, i) => {
      const row = Math.floor(i / 9);
      return <circle key={i} cx={39 + (i % 9) * 8 - 5 * row + (i % 3)} cy={35 + row * 9 + (i * 57 % 5)} r={jenis === "amplas" ? 1.1 + i % 3 / 4 : 1.6 + i % 4 / 5} fill={i % 4 ? detail : pinggir} />;
    })}
    {kain && [0, 1, 2, 3].map(row => <g key={row} stroke={detail} strokeWidth={jenis === "karpet" ? 2.8 : 1.9} fill="none">
      {Array.from({ length: 9 }, (_, i) => {
        const x = 39 + i * 8 - row * 6;
        const y = 36 + row * 9;
        return <path key={i} d={jenis === "karpet" ? `M${x} ${y+4}l3-6 3 6` : `M${x} ${y+4}q2-6 4-2q0 4-4 2Z`} />;
      })}
    </g>)}
  </g>;
}

export const ILUSTRASI_PERMUKAAN_SD3: Record<string, ReactNode> = {
  "sd3-permukaan-es": <Bidang jenis="es" />,
  "sd3-permukaan-keramik": <Bidang jenis="keramik" />,
  "sd3-permukaan-karpet": <Bidang jenis="karpet" />,
  "sd3-permukaan-pasir": <Bidang jenis="pasir" />,
  "sd3-permukaan-kaca": <Bidang jenis="kaca" />,
  "sd3-permukaan-kayu": <Bidang jenis="kayu" />,
  "sd3-permukaan-handuk": <Bidang jenis="handuk" />,
  "sd3-permukaan-amplas": <Bidang jenis="amplas" />,
  "sd3-permukaan-cermin": <Bidang jenis="cermin" />,
};
