import type { ReactNode } from "react";

const TINTA = "#243d54";
const GARIS = { stroke: TINTA, strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Tablet({ children, layar = "#eaf5fb" }: { children: ReactNode; layar?: string }) {
  return <g {...GARIS}>
    <rect x="7" y="8" width="116" height="84" rx="12" fill="#526b84" />
    <rect x="16" y="16" width="98" height="68" rx="6" fill={layar} />
    {children}
    <circle cx="118.5" cy="50" r="1.5" fill="#e0edfa" stroke="none" />
  </g>;
}

function Ponsel({ children }: { children: ReactNode }) {
  return <g {...GARIS}>
    <rect x="35" y="5" width="60" height="90" rx="11" fill="#617c94" />
    <rect x="41" y="13" width="48" height="72" rx="5" fill="#edf5fc" />
    <path d="M59 89H71" stroke="#ecf1f8" />
    {children}
  </g>;
}

function Foto({ x = 0, y = 0, kecil = false }: { x?: number; y?: number; kecil?: boolean }) {
  return <g transform={`translate(${x} ${y}) scale(${kecil ? 0.66 : 1})`}>
    <rect width="66" height="41" rx="5" fill="#b2dff6" />
    <circle cx="46" cy="11" r="5" fill="#ffd869" stroke="none" />
    <path d="m2 36 18-19 14 14 9-8 20 14v2H2Z" fill="#78ad83" stroke="none" />
  </g>;
}

function AvatarNenek() {
  return <g>
    <path d="M38 69q3-14 15-14t16 14" fill="#947bc4" />
    <circle cx="53" cy="43" r="13" fill="#efc19b" />
    <path d="M40 40q-1-15 14-14q14 1 12 15q-11 0-15-9q-3 8-11 8Z" fill="#cbd2db" />
    <path d="M44 43h7m5 0h7m-12 0h5m-7 7q4 4 8 0" strokeWidth="1.6" fill="none" />
  </g>;
}

export const ILUSTRASI_INTERNET_SD3: Record<string, ReactNode> = {
  "sd3-internet-buku-tersimpan": <Tablet>
    <path d="M29 35Q45 29 59 38Q74 29 89 35V64Q74 57 59 66Q44 57 29 64Z" fill="#fff5d9" />
    <path d="M59 38V66M36 43Q47 40 53 45M36 51Q47 48 53 53M66 45Q75 39 82 43" fill="none" stroke="#9b805c" />
    <circle cx="91" cy="64" r="12" fill="#8bc9ae" />
    <path d="m86 63 4 4 6-7" fill="none" stroke="#f4fff5" />
  </Tablet>,
  "sd3-internet-rekam-suara": <Ponsel>
    <path d="M49 44V51M56 38V57M64 32V63M72 37V58M80 44V51" fill="none" stroke="#6b8fb2" strokeWidth="3.4" />
    <circle cx="64" cy="73" r="5.5" fill="#df7c70" />
  </Ponsel>,
  "sd3-internet-berita-situs": <Ponsel>
    <rect x="46" y="22" width="38" height="51" rx="3" fill="#f6f9fc" />
    <path d="M46 32H84M51 28H65M51 45H62M51 53H78M51 60H76M51 67H70" fill="none" stroke="#6784ac" />
    <rect x="67" y="37" width="11" height="10" rx="2" fill="#e0a774" strokeWidth="1.1" />
  </Ponsel>,
  "sd3-internet-ramalan": <Ponsel>
    <circle cx="73" cy="31" r="8" fill="#ffdb8d" />
    <path d="M48 50Q45 43 53 42Q52 34 59 36Q64 35 68 42Q77 41 78 48Q79 54 70 54H53Q49 54 48 50Z" fill="#b6d9ec" />
    <path d="M52 69H78M52 75H70" fill="none" stroke="#5c859b" />
  </Ponsel>,
  "sd3-internet-tiket": <Ponsel>
    <path d="M48 35H82V42Q75 46 82 50V58H48V50Q55 46 48 42Z" fill="#ffd27f" />
    <rect x="59" y="39" width="12" height="13" rx="3" fill="#83b6c8" strokeWidth="1.6" />
    <path d="M61 49H69M55 35V39M55 53V58" strokeWidth="1.5" />
    <path d="M51 70H79M51 75H72" stroke="#7596ae" fill="none" />
  </Ponsel>,
  "sd3-internet-unggah-tugas": <Ponsel>
    <path d="M51 53V28H72L80 36V53Z" fill="#f9deb2" />
    <path d="M72 28V36H80M56 38H66M56 45H75" fill="none" stroke="#627f92" />
    <path d="M65 74V56M57 64L65 56 73 64" fill="none" stroke="#429d87" strokeWidth="3.5" />
  </Ponsel>,
  "sd3-internet-siaran": <Ponsel>
    <rect x="46" y="27" width="38" height="35" rx="4" fill="#aad9af" />
    <path d="M65 30V59M47 45H83" fill="none" stroke="#e7f3d7" />
    <circle cx="58" cy="48" r="5" fill="#fff" />
    <circle cx="77" cy="34" r="4" fill="#f1756b" stroke="none" />
    <path d="M49 71H81M49 77H73" fill="none" stroke="#6e90a4" />
  </Ponsel>,
  "sd3-internet-catatan": <Ponsel>
    <rect x="48" y="24" width="34" height="47" rx="3" fill="#fff0bd" />
    <path d="M54 36H76M54 44H76M54 52H68M54 60H67" fill="none" stroke="#9c8059" />
    <path d="M66 62L77 48 81 52 70 66 65 67Z" fill="#e5a064" />
  </Ponsel>,
  "sd3-internet-video-nenek": <Tablet>
    <rect x="25" y="23" width="58" height="49" rx="5" fill="#e2e8f7" />
    <AvatarNenek />
    <rect x="86" y="26" width="23" height="22" rx="4" fill="#fcdeb7" />
    <circle cx="97.5" cy="34" r="4" fill="#d59972" stroke="none" />
    <path d="M91 44q6-11 13 0" fill="#519aa0" stroke="none" />
    <circle cx="97" cy="63" r="9" fill="#73a9cb" stroke="none" />
    <path d="M92 60h7v6h-7Zm7 2 4-2v6l-4-2" fill="white" stroke="none" />
  </Tablet>,
  "sd3-internet-pesan-daring": <Tablet>
    <path d="M32 27h47q6 0 6 6v9q0 6-6 6H43l-11 7v-7q-6 0-6-6v-9q0-6 6-6Z" fill="#bcddf5" />
    <path d="M57 53h41q6 0 6 6v9q0 6-6 6v5l-10-5H57q-6 0-6-6v-9q0-6 6-6Z" fill="#cde7d4" />
    <path d="M39 37h33M62 64h26" stroke="#53748b" strokeWidth="3" />
  </Tablet>,
  "sd3-internet-video-daring": <Tablet>
    <rect x="23" y="23" width="84" height="53" rx="5" fill="#cbdcf4" />
    <path d="M25 62q26-12 43 0q21 10 37-3v14H25Z" fill="#90bc93" stroke="none" />
    <circle cx="65" cy="48" r="14" fill="#5f7db9" stroke="none" />
    <path d="m61 41 12 7-12 7Z" fill="white" stroke="none" />
    <path d="M30 69h56" stroke="#f8f9ff" strokeWidth="2" />
    <circle cx="52" cy="69" r="2" fill="#5f7db9" stroke="none" />
  </Tablet>,
  "sd3-internet-peta-daring": <Tablet layar="#dcebd4">
    <path d="M23 66 48 27l13 34 39-22M29 32l20 19 39 22m-14-46 23 44" fill="none" stroke="#fff8e8" strokeWidth="6" />
    <path d="M31 70 49 46 63 55 83 40" fill="none" stroke="#426fc2" strokeWidth="4" />
    <circle cx="31" cy="70" r="4" fill="#426fc2" stroke="white" strokeWidth="1.5" />
    <path d="M83 46q-10-10-10-16a10 10 0 0 1 20 0q0 6-10 16Z" fill="#cb7180" />
    <circle cx="83" cy="30" r="3" fill="white" stroke="none" />
  </Tablet>,
  "sd3-internet-kirim-foto": <Tablet>
    <Foto x={26} y={28} />
    <path d="m76 55 28-7-13 22-6-8Z" fill="#a38bce" />
    <path d="m86 61 18-13" />
  </Tablet>,
  "sd3-internet-kalkulator": <Tablet>
    <rect x="35" y="22" width="60" height="56" rx="6" fill="#cfdfed" />
    <rect x="43" y="27" width="43" height="14" rx="3" fill="#f6fcf6" />
    <text x="79" y="38" textAnchor="end" fontSize="11" fontWeight="800" fill={TINTA} stroke="none">12</text>
    {[0,1,2,3,4,5,6,7].map(i => <rect key={i} x={43+i%4*11} y={48+Math.floor(i/4)*11} width="8" height="8" rx="2" fill={i===7 ? "#77a2d0" : "#f5f8fb"} strokeWidth="1.2" />)}
  </Tablet>,
  "sd3-internet-kamera-bunga": <Tablet>
    <rect x="23" y="23" width="84" height="54" rx="6" fill="#cce6d7" />
    <path d="M54 64V45m0 13q-5-9-13-7m13 8q8-9 14-8" stroke="#4c916a" strokeWidth="3" fill="none" />
    <path d="M53 35q-8-10-12-1q-3 5 6 10q-2 9 6 8q6 1 7-8q9-4 5-10q-4-7-12 1Z" fill="#e499b5" />
    <circle cx="54" cy="42" r="4" fill="#f7d173" stroke="none" />
    <path d="M31 29h7m-7 0v7m0 33v-6m0 6h7m34-40h-7m7 0v7m0 33v-6m0 6h-7" stroke="#fff" strokeWidth="2" />
    <circle cx="92" cy="50" r="9" fill="white" />
    <circle cx="92" cy="50" r="4" fill="#96aaca" stroke="none" />
  </Tablet>,
  "sd3-internet-menggambar": <Tablet>
    <rect x="23" y="22" width="82" height="49" rx="4" fill="#fffff9" />
    <path d="M32 61q11-7 9-16q0-9 8-7q8 2 11 13q7-11 20-17" stroke="#bd6aa0" strokeWidth="4" fill="none" />
    <path d="m77 43 21-15 5 7-22 14-7 2Z" fill="#f2ca68" />
    <circle cx="42" cy="76" r="3" fill="#bb75a8" stroke="none" /><circle cx="53" cy="76" r="3" fill="#82a872" stroke="none" /><circle cx="64" cy="76" r="3" fill="#5d92c1" stroke="none" />
  </Tablet>,
  "sd3-internet-alarm": <Tablet>
    <circle cx="56" cy="51" r="22" fill="#fdf9ed" />
    <path d="M56 38v13l8 6m-24-26 5-4m24 0 5 4m-32 41 4-4m20 0 4 4" fill="none" />
    <rect x="80" y="45" width="25" height="13" rx="6.5" fill="#70a697" stroke="none" />
    <circle cx="98" cy="51.5" r="4.5" fill="white" stroke="none" />
  </Tablet>,
  "sd3-internet-galeri": <Tablet>
    <Foto x={22} y={23} kecil />
    <rect x="72" y="23" width="34" height="27" rx="4" fill="#e9d5ed" />
    <path d="m74 47 10-13 10 9 5-5 5 9Z" fill="#b097d0" stroke="none" />
    <rect x="23" y="56" width="43" height="19" rx="4" fill="#dbeacd" />
    <path d="m26 72 10-10 9 7 6-4 11 7Z" fill="#7db58b" stroke="none" />
    <rect x="72" y="56" width="34" height="19" rx="4" fill="#f8dda8" />
    <path d="m75 72 8-8 9 6 6-4 5 6Z" fill="#c88e73" stroke="none" />
  </Tablet>,
};
