import type { ReactNode } from "react";

function LayarGame({ children, tablet = false }: { children: ReactNode; tablet?: boolean }) {
  return <g stroke="#4a3f89" strokeWidth="3" strokeLinejoin="round">
    <rect x="6" y="9" width="118" height="82" rx="10" fill={tablet ? "#7a66c4" : "#e8e4ff"} />
    {tablet && <rect x="16" y="15" width="101" height="70" rx="5" fill="#e8e4ff" />}
    {children}
  </g>;
}

function Blok({ x, y, warna }: { x: number; y: number; warna: string }) {
  return <path d="M0 0H6V-4H15V0H32V14H15V10H6V14H0Z" transform={`translate(${x} ${y})`} fill={warna} />;
}

function Buah({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M0-6C-13-15-17-1-11 8Q-5 18 0 13Q7 18 12 7C17-4 10-13 0-6Z" fill="#f4676c" stroke="#8b3658" />
    <path d="M0-7Q0-17 10-17Q9-10 0-7Z" fill="#82bd68" stroke="#3d784b" strokeWidth="2" />
  </g>;
}

function Tokoh({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x="-11" y="-14" width="22" height="25" rx="5" fill="#6fcbe3" />
    <path d="M-7 12V16M7 12V16" fill="none" strokeLinecap="round" />
    <circle cx="-4" cy="-4" r="1.8" fill="#4a3f89" stroke="none" />
    <circle cx="4" cy="-4" r="1.8" fill="#4a3f89" stroke="none" />
    <path d="M-3 3Q0 6 3 3" fill="none" strokeWidth="1.5" />
  </g>;
}

function Keranjang({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M-11 0Q-11-18 0-18Q11-18 11 0" fill="none" stroke="#865734" />
    <path d="M-18-2H18L13 15H-13Z" fill="#f3be76" stroke="#865734" />
    <path d="M-8 2L-6 11M0 2V11M8 2L6 11" fill="none" stroke="#a16b42" strokeWidth="2" />
  </g>;
}

function Panah({ d }: { d: string }) {
  return <path d={d} fill="none" stroke="#4a3f89" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />;
}

function Laju({ pelan, buah = false }: { pelan: boolean; buah?: boolean }) {
  return <LayarGame>
    {buah ? <><Buah x={35} y={37} /><Panah d="M35 53V75M29 69L35 75L41 69" /></> : <><Tokoh x={33} y={45} /><Panah d="M21 73H47M41 67L47 73L41 79" /></>}
    <path d="M59 53A25 25 0 0 1 109 53" fill="none" stroke="#8271ba" strokeWidth="5" />
    <path d={pelan ? "M84 53L69 43" : "M84 53L101 41"} fill="none" stroke="#4a3f89" strokeWidth="4" strokeLinecap="round" />
    <circle cx="84" cy="53" r="4" fill="#4a3f89" stroke="none" />
    <Panah d={pelan ? "M71 71H96" : "M73 71H95M84 60V82"} />
  </LayarGame>;
}

export const ILUSTRASI_TAHAP_GAME_SD2: Record<string, ReactNode> = {
  "tahap-game-blok-jatuh": <LayarGame>
    <Blok x={16} y={28} warna="#ffca66" /><Blok x={16} y={43} warna="#88c2fc" /><Blok x={16} y={58} warna="#99d485" />
    <Buah x={90} y={35} /><Panah d="M89 52V75M83 69L89 75L95 69" />
  </LayarGame>,
  "tahap-game-blok-gerak": <LayarGame>
    <Blok x={16} y={28} warna="#ffca66" /><Blok x={16} y={43} warna="#88c2fc" /><Blok x={16} y={58} warna="#99d485" />
    <Tokoh x={73} y={48} /><Panah d="M88 48H110M104 42L110 48L104 54" />
  </LayarGame>,
  "tahap-game-perlambat-buah": <Laju pelan buah />,
  "tahap-game-perlambat-tokoh": <Laju pelan />,
  "tahap-game-percepat-tokoh": <Laju pelan={false} />,
  "tahap-game-batas-keranjang": <LayarGame>
    <path d="M99 19V82" stroke="#8271ba" strokeDasharray="5 3" strokeWidth="5" />
    <Keranjang x={68} y={62} /><Panah d="M19 64H42M36 58L42 64L36 70" />
    <path d="M13 81H95" stroke="#ad9bdd" />
  </LayarGame>,
  "tahap-game-uji-tablet": <LayarGame tablet><Buah x={66} y={35} /><Keranjang x={66} y={67} /></LayarGame>,
  "tahap-game-hapus-buah-ganda": <LayarGame>
    <Buah x={39} y={49} /><Buah x={85} y={49} />
    <path d="M70 69L100 28" stroke="#c0395b" strokeLinecap="round" strokeWidth="5" />
  </LayarGame>,
  "tahap-game-ganti-blok": <LayarGame>
    <Blok x={15} y={41} warna="#f88b9b" /><Blok x={82} y={41} warna="#99d485" />
    <Panah d="M54 48H72M66 42L72 48L66 54" />
  </LayarGame>,
  "tahap-game-hapus-blok": <LayarGame>
    <Blok x={43} y={25} warna="#ffca66" /><Blok x={43} y={41} warna="#88c2fc" /><Blok x={43} y={57} warna="#f88b9b" />
    <path d="M80 62H104" stroke="#c0395b" strokeLinecap="round" strokeWidth="5" />
  </LayarGame>,
  "tahap-game-peta-level": <LayarGame>
    <path d="M20 27H109V73H20Z" fill="#fff" />
    <path d="M43 29V55H69V72M85 29V53H107" fill="none" stroke="#aa99d3" strokeWidth="5" />
    <path d="M28 64H34V42H56V37H72V62H96" fill="none" stroke="#467cad" strokeWidth="4" strokeDasharray="4 5" strokeLinecap="round" />
    <path d="M98 60V42L108 48L98 53" fill="#f4676c" strokeWidth="2" strokeLinecap="round" />
  </LayarGame>,
  "tahap-game-uji-koin": <LayarGame>
    <Tokoh x={36} y={48} /><Panah d="M51 49H77M71 43L77 49L71 55" />
    <ellipse cx="94" cy="48" rx="11" ry="14" fill="#ffcb60" stroke="#ad763c" />
    <path d="M94 42V54" stroke="#ad763c" strokeWidth="3" strokeLinecap="round" />
    <path d="M88 72L94 77L104 66" fill="none" stroke="#4a9b73" strokeWidth="4" strokeLinecap="round" />
  </LayarGame>,
  "tahap-game-cek-skor": <LayarGame>
    <text x="28" y="56" stroke="none" fill="#4a3f89" fontFamily="sans-serif" fontWeight="bold" fontSize="25">3</text>
    <Panah d="M49 47H74M68 41L74 47L68 53" />
    <text x="83" y="56" stroke="none" fill="#4a3f89" fontFamily="sans-serif" fontWeight="bold" fontSize="25">4</text>
    <path d="M90 69L96 74L107 62" fill="none" stroke="#4a9b73" strokeWidth="4" strokeLinecap="round" />
  </LayarGame>,
  "tahap-game-tombol-arah": <LayarGame>
    <rect x="18" y="32" width="41" height="36" rx="7" fill="#fff" />
    <rect x="71" y="32" width="41" height="36" rx="7" fill="#fff" />
    <Panah d="M49 50H28M34 44L28 50L34 56M81 50H102M96 44L102 50L96 56" />
  </LayarGame>,
};
