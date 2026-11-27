import type { ReactNode } from "react";

const garis = { strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const biru = "#458bab";
const hijau = "#3d814f";
const kaca = "#c2e8ed";

function Adegan({ langit = "#e0f1f8", lantai = "#aaca84", children }: {
  langit?: string;
  lantai?: string;
  children: ReactNode;
}) {
  return <g {...garis}>
    <rect x="4" y="4" width="122" height="92" rx="12" fill={langit} />
    <path d="M4 75H126V84Q126 96 114 96H16Q4 96 4 84Z" fill={lantai} />
    {children}
  </g>;
}

function Matahari({ x = 103, y = 24 }: { x?: number; y?: number }) {
  return <g transform={`translate(${x} ${y})`} stroke="#c68432">
    <circle r="9" fill="#ffd35e" />
    <path d="M0-13v-4m0 30v4M-13 0h-4m30 0h4M-9-9l-3-3m24 24-3-3m0-18 3-3m-24 24 3-3" fill="none" />
  </g>;
}

function Bibit({ x = 61, y = 77, skala = 1 }: { x?: number; y?: number; skala?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${skala})`} stroke={hijau}>
    <path d="M0 0v-34M0-10l-13-7m13 0 14-8m-14 1-9-8" fill="none" />
    <path d="M-8-13q-12 1-17-10l6 1 1-3 4 3 3-1q6 3 3 10Zm14-7q2-11 14-14l1 4 4-1q-6 11-19 11Zm-10-7q-11-1-14-13l6 4 2-2q8 3 6 11Zm4-6q-4-10 8-16l-1 5 3 1q-2 8-10 10Z" fill="#7fbb5b" />
  </g>;
}

function Pot({ x = 61, y = 73, skala = 1, tanah = "#715744" }: {
  x?: number; y?: number; skala?: number; tanah?: string;
}) {
  return <g transform={`translate(${x} ${y}) scale(${skala})`}>
    <path d="M-20 0l5 16h30l5-16Z" fill="#d88861" stroke="#935742" />
    <path d="M-10 5l2 6" stroke="#eeaf7c" />
    <ellipse rx="22" ry="5" fill={tanah} stroke="#935742" />
    <Bibit x={0} y={0} />
  </g>;
}

function Tetes({ x, y }: { x: number; y: number }) {
  return <path d="M0-6Q-6 1-3 4Q0 7 3 4Q6 1 0-6Z" transform={`translate(${x} ${y})`} fill="#92d7f2" stroke={biru} />;
}

function Penyiram({ x = 91, y = 53 }: { x?: number; y?: number }) {
  return <g transform={`translate(${x} ${y})`} stroke={biru}>
    <path d="M13 1q12-6 12 4q0 7-12 8" fill="none" />
    <path d="M-4 2h18v16H-4Z" fill="#83cbe8" />
    <path d="M-4 6l-10 3-5-3-3 4 9 7 9-3Z" fill="#83cbe8" />
    <path d="M0-3h10" />
    <Tetes x={-24} y={22} />
  </g>;
}

function Jendela({ x = 24, y = 15 }: { x?: number; y?: number }) {
  return <g transform={`translate(${x} ${y})`} stroke="#789eab">
    <rect width="51" height="43" rx="3" fill={kaca} />
    <path d="m5 29 21-24m0 33L44 18" stroke="#eefbff" strokeWidth="4" />
    <path d="M25 0v43M0 20h51" fill="none" />
    <path d="M-5 43h61v5H-5Z" fill="#f5e3bd" />
  </g>;
}

function Bedeng({ x = 63, y = 76 }: { x?: number; y?: number }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M-44 1l12-12h65L45 1l-11 11h-69Z" fill="#755947" stroke="#8b6449" />
    <path d="M-44 1h89m-9-5h-71" stroke="#ac835b" />
    <Bibit x={-19} y={-2} skala={0.53} />
    <Bibit x={17} y={-3} skala={0.56} />
    <Bibit x={0} y={4} skala={0.78} />
  </g>;
}

function Es({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`} stroke={biru}>
    <path d="M-7-4l5-4 10 4v9L2 8l-9-3Z" fill="#a3e3f2" />
    <path d="M-7-4l9 3 6-3M2-1v9" fill="none" />
  </g>;
}

function Panas({ x, y }: { x: number; y: number }) {
  return <path d="M0 15q-5-4 0-8t0-8m9 14q-5-4 0-8t0-8" transform={`translate(${x} ${y})`} fill="none" stroke="#b85a37" />;
}

function MejaKelas({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`} fill="#d7ad79" stroke="#9d7455">
    <path d="M0 0h25l5 8H-5Z" />
    <path d="M0 8v9m25-9v9" fill="none" />
  </g>;
}

export const ILUSTRASI_BIBIT_TOMAT_SD3: Record<string, ReactNode> = {
  "sd3-bibit-rumah-kaca": <Adegan>
    <Matahari x={105} y={23} />
    <path d="M18 85V43l26-27h33l20 27v42Z" fill={kaca} fillOpacity=".8" stroke="#5e9a9e" />
    <path d="M18 43h79M44 16 55 43v42m22-69-3 27v42M26 48l14-16" fill="none" stroke="#5e9a9e" />
    <Bedeng x={56} />
    <Penyiram x={98} y={60} />
  </Adegan>,
  "sd3-bibit-bedeng": <Adegan>
    <Matahari />
    <Bedeng />
    <Tetes x={39} y={73} /><Tetes x={91} y={75} />
  </Adegan>,
  "sd3-bibit-naungan": <Adegan>
    <Matahari />
    <path d="M19 19v63m63-54v56" stroke="#7f9e82" strokeWidth="3" />
    <path d="M11 18q32-11 79 11l-8 13Q50 26 11 33Z" fill="#c0cf93" stroke="#78906a" />
    <path d="M22 20l-5 11m16-13-5 12m16-11-5 11m16-8-5 11m16-7-5 10m16-6-5 11" stroke="#ebedba" />
    <Bedeng x={61} />
    <Tetes x={32} y={74} />
  </Adegan>,
  "sd3-bibit-jendela-kelas": <Adegan langit="#fff1ce" lantai="#d6c4a5">
    <Jendela x={16} />
    <MejaKelas x={90} y={72} />
    <Pot x={49} />
    <Penyiram x={86} y={49} />
  </Adegan>,
  "sd3-bibit-gudang": <Adegan langit="#d1dfe1" lantai="#9a9f89">
    <path d="M13 41 63 9l51 32v45H13Z" fill="#826858" stroke="#594e44" />
    <path d="M15 53h99m-99 13h99m-99 13h99" stroke="#a38c75" />
    <path d="M40 38h46v47H40Z" fill="#343e3b" stroke="#594e44" />
    <path d="M27 45l13-7v47l-13 3Z" fill="#a38369" stroke="#594e44" />
    <Pot x={62} y={74} skala={0.74} />
  </Adegan>,
  "sd3-bibit-tanah-tergenang": <Adegan>
    <path d="M12 73q27-15 59-12 36 0 49 17-11 14-57 13-40 0-51-18Z" fill="#8bd0e3" stroke={biru} />
    <Bibit x={63} y={74} />
    <path d="M21 75q10 4 20 0m8 10q17 4 28 0m7-12q12 4 22-1" fill="none" stroke="#e2f7fc" />
  </Adegan>,
  "sd3-bibit-tembok-panas": <Adegan langit="#fff0ca" lantai="#d6a166">
    <Matahari />
    <path d="M12 41h76v40H12Z" fill="#cb8464" stroke="#8c5d49" />
    <path d="M12 53h76M12 67h76m-24-26v12m-29-12v12m16 0v14m23 0v14m-43-14v14" stroke="#f1c8a2" />
    <Panas x={29} y={20} /><Panas x={100} y={56} />
    <Bibit x={61} y={85} />
    <path d="m20 88 11-5 8 4 10-1m26 3 10-5 6 2 10-6" fill="none" stroke="#9a6846" />
  </Adegan>,
  "sd3-bibit-kotak-es": <Adegan langit="#e5f4f7" lantai="#b2cfda">
    <path d="M16 49l19-25h66l13 25Z" fill="#c0e9f1" stroke={biru} />
    <path d="M16 49h98l-8 39H24Z" fill="#a0d9eb" stroke={biru} />
    <path d="M27 53h75l-4 25H31Z" fill="#def5fa" stroke="#63a9bf" />
    <Pot x={65} y={74} skala={0.71} />
    <Es x={35} y={71} /><Es x={87} y={68} /><Es x={97} y={80} />
  </Adegan>,
  "sd3-bibit-ember-terbalik": <Adegan>
    <Bibit x={61} y={83} skala={0.82} />
    <path d="M36 37h53l9 47H27Z" fill="#6cb3c9" fillOpacity=".44" stroke={biru} />
    <ellipse cx="62" cy="37" rx="26" ry="6" fill="#b0e4ec" stroke={biru} />
    <path d="M27 84q34 12 71 0m-63 3q-2 13 27 11q25 0 28-11" fill="none" stroke={biru} />
  </Adegan>,
  "sd3-bibit-jendela-pot": <Adegan langit="#fff3d6" lantai="#dbbe99">
    <Jendela x={19} />
    <Pot x={62} />
    <Penyiram />
  </Adegan>,
  "sd3-bibit-teras": <Adegan>
    <Matahari x={102} y={33} />
    <path d="M9 32h57v53H9Z" fill="#edd9b8" stroke="#ab8b69" />
    <path d="M17 81V47h30v34" fill="#b48f70" stroke="#8c6a52" />
    <path d="m5 33 13-13h55l9 13Z" fill="#cd8773" stroke="#995e4b" />
    <path d="M7 80h116v9H7Z" fill="#d0b49e" stroke="#a37d67" />
    <Pot x={59} y={69} skala={0.87} />
    <Penyiram x={91} y={57} />
  </Adegan>,
  "sd3-bibit-taman-pagi": <Adegan>
    <Matahari x={94} y={52} />
    <path d="M5 65Q27 38 52 63q21-13 30 2 30-14 44 0v18H5Z" fill="#88b681" />
    <Pot x={59} y={75} />
    <Tetes x={36} y={75} /><Tetes x={86} y={76} />
  </Adegan>,
  "sd3-bibit-kelas-sejuk": <Adegan langit="#e5f2ea" lantai="#cabba2">
    <Jendela x={12} y={11} />
    <rect x="83" y="14" width="25" height="15" rx="3" fill="#f9fbef" stroke="#799c8e" />
    <path d="M89 23h13m-12 11-3 5m10-5v6m7-6 3 5" fill="none" stroke="#799c8e" />
    <MejaKelas x={84} y={75} />
    <Pot x={47} y={74} />
    <Penyiram x={83} y={49} />
  </Adegan>,
  "sd3-bibit-halaman-setelah-hujan": <Adegan>
    <Matahari x={99} y={25} />
    <path d="M9 40q-1-6 7-8 2-12 13-11 10-2 13 6 9-2 13 5 6 7-3 10H15Z" fill="#eef6f7" stroke="#a1beca" />
    <path d="M11 84q12-6 25 0m52-2q11-6 30 1" fill="none" stroke="#76a6ab" />
    <Pot x={65} y={71} />
    <Tetes x={41} y={75} /><Tetes x={87} y={73} />
  </Adegan>,
  "sd3-bibit-lemari-gelap": <Adegan langit="#e0e9ec" lantai="#aaa99f">
    <path d="M20 14h89v73H20Z" fill="#987359" stroke="#6d594a" />
    <path d="M37 21h54v56H37Z" fill="#3e4149" />
    <path d="m18 24 25-10v73l-25 4Zm74-10 20 10v67l-20-4Z" fill="#ab886b" stroke="#6d594a" />
    <path d="M29 53v8m74-8v8" stroke="#e9d4ac" />
    <Pot x={66} y={66} skala={0.72} />
  </Adegan>,
  "sd3-bibit-jendela-kering": <Adegan langit="#fff0d1" lantai="#cbb497">
    <Jendela x={18} />
    <Pot x={62} y={72} tanah="#c8a173" />
    <path d="m45 73 7-3 5 4 8-2 6 3 8-3" fill="none" stroke="#885a42" />
    <path d="M92 58l22 22m0-22L92 80" stroke="#ad5946" strokeWidth="3" />
    <Tetes x={103} y={69} />
    <path d="M92 58l22 22" stroke="#ad5946" strokeWidth="3" />
  </Adegan>,
  "sd3-bibit-kulkas": <Adegan langit="#e3f2f5" lantai="#b4d2db">
    <rect x="23" y="11" width="72" height="78" rx="7" fill="#b0dbe7" stroke={biru} />
    <path d="M30 17h58v65H30Z" fill="#edfafe" stroke="#85b9ca" />
    <path d="M29 42h59m-58 34h58" stroke="#75aabf" />
    <path d="m88 15 26 7v59l-26 9Z" fill="#cadfe8" stroke={biru} />
    <path d="M105 45v15" stroke={biru} strokeWidth="3" />
    <Pot x={60} y={67} skala={0.57} />
    <path d="M49 28h22m-11-10v20m-7-17 14 14m0-14L53 35" stroke="#79b9d2" />
  </Adegan>,
  "sd3-bibit-kompor-menyala": <Adegan langit="#fff0d6" lantai="#d4b9a5">
    <path d="M64 57h52l6 14v12H56V71Z" fill="#8c9da2" stroke="#5c6669" />
    <ellipse cx="88" cy="63" rx="18" ry="5" fill="#435961" />
    <path d="M88 59q-11-2-9-12 4 3 5-4-1-4 4-9-1 9 5 13 6 10-5 12Z" fill="#f3a15f" stroke="#b85a37" />
    <circle cx="108" cy="76" r="3" fill="#e9e7cf" />
    <Panas x={98} y={25} />
    <Pot x={36} y={69} skala={0.85} />
  </Adegan>,
  "sd3-bibit-pot-terendam": <Adegan>
    <path d="M17 64h96l-7 25H24Z" fill="#9ac9d1" stroke={biru} />
    <ellipse cx="65" cy="64" rx="48" ry="11" fill="#83c8e1" stroke={biru} />
    <Pot x={64} y={60} />
    <path d="M18 66q39 12 94 0l-6 23H24Z" fill="#80cced" fillOpacity=".74" stroke={biru} />
    <path d="M29 76q14 5 28 3m17 0q16 1 30-4" fill="none" stroke="#e3f7fa" />
  </Adegan>,
  "sd3-bibit-pot-tertutup-kardus": <Adegan langit="#e9e6d8" lantai="#c6b492">
    <path d="m22 31 20-13h47l20 13v51L92 91H22Z" fill="#ad835d" stroke="#815d41" />
    <path d="m22 31 20-13h47l20 13H22Zm22-5h48l-9-8H58Z" fill="#deb186" stroke="#815d41" />
    <path d="M92 31v60m-2-56h16" fill="none" stroke="#815d41" />
    <path d="M29 38h54v46H29Z" fill="#d8bd99" fillOpacity=".8" stroke="#6e563e" strokeDasharray="4 3" />
    <Pot x={57} y={69} skala={0.69} />
  </Adegan>,
};
