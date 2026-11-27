import type { ReactNode } from "react";

const garis = { stroke: "#304756", strokeWidth: 2.3, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Latar({ warna = "#dff3fb", children }: { warna?: string; children: ReactNode }) {
  return <g {...garis}><rect width="130" height="100" rx="14" fill={warna} stroke="none" />{children}</g>;
}

function Pantai() {
  return <g stroke="none">
    <path d="M0 38H130V86Q130 100 116 100H14Q0 100 0 86Z" fill="#efd5a2" />
    <path d="M0 36H130V53Q99 68 74 59T0 65Z" fill="#60c5d9" />
    <path d="M0 58Q33 49 61 56T130 51" fill="none" stroke="#ecfffb" strokeWidth="3" />
  </g>;
}

function Sungai() {
  return <g stroke="none">
    <path d="M0 52Q42 34 130 56V86Q130 100 116 100H14Q0 100 0 86Z" fill="#72c7d6" />
    <path d="M0 56Q37 49 67 54T130 64" fill="none" stroke="#ecfffd" strokeWidth="3" />
    <path d="M17 83Q32 80 47 85M80 75Q96 73 110 77" fill="none" stroke="#e3f9fa" strokeWidth="2" />
  </g>;
}

function Pohon({ x = 65, y = 49 }: { x?: number; y?: number }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M-4 25V3H4V25" fill="#a7794c" />
    <path d="M-14 11C-27 4-19-11-8-13-4-24 15-22 19-10 31-1 17 14 8 12 0 18-9 14-14 11Z" fill="#82c86f" />
  </g>;
}

function Botol({ x, y, putar = 0, warna = "#66bbd6" }: { x: number; y: number; putar?: number; warna?: string }) {
  return <g transform={`translate(${x} ${y}) rotate(${putar})`}>
    <path d="M-5-20H5V-13Q11-11 11-5V17Q11 22 6 22H-6Q-11 22-11 17V-5Q-11-11-5-13Z" fill={warna} />
    <path d="M-6-20H6V-15H-6Z" fill="#256e8a" />
    <path d="M-8 1H8V11H-8Z" fill="#e4f8ff" stroke="none" />
  </g>;
}

function Bungkus({ x, y, putar = 0 }: { x: number; y: number; putar?: number }) {
  return <g transform={`translate(${x} ${y}) rotate(${putar})`}>
    <path d="M-19 7-14-9-3-5 8-8 18-3 14 8 7 5-3 9-10 5Z" fill="#e7a85c" />
    <path d="M-12-1-6 2 0-1 6 1" fill="none" stroke="#fff6dd" strokeWidth="2.4" />
  </g>;
}

function RakSampah({ x, y, warna = "#379773" }: { x: number; y: number; warna?: string }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M-14-10 14-10 10 18H-10Z" fill={warna} />
    <path d="M-17-10H17M-5-2V11M5-2V11" fill="none" stroke="#254e51" />
  </g>;
}

function Tangan({ x, y, putar = 0, sarung = false }: { x: number; y: number; putar?: number; sarung?: boolean }) {
  return <g transform={`translate(${x} ${y}) rotate(${putar})`}>
    <path d="M-31-10H-11L-3-14Q3-15 6-10L17-4Q21-1 17 4L7 1 5 6Q1 11-6 10L-14 6H-31Z" fill={sarung ? "#6bad82" : "#f3bc89"} />
    <path d="M-33-11H-22V8H-33Z" fill={sarung ? "#387f68" : "#5699c4"} />
  </g>;
}

function Ikan({ x, y, diam = false }: { x: number; y: number; diam?: boolean }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M-11-2-21-9-20 7-11 2Q0 14 15 0 3-14-11-2Z" fill={diam ? "#9ea7ae" : "#f4bd57"} />
    {diam ? <path d="m5-3 5 5m-5 0 5-5" fill="none" /> : <circle cx="8" cy="-1" r="1.8" fill="#304756" stroke="none" />}
  </g>;
}

export const ILUSTRASI_LINGKUNGAN_SD2: Record<string, ReactNode> = {
  "lingkungan-rawat": (
    <Latar>
      <path d="M0 70Q41 47 130 69V86Q130 100 116 100H14Q0 100 0 86Z" fill="#a8d987" stroke="none" />
      <Pohon x={40} />
      <Pohon x={77} y={44} />
      <path d="M71 91Q91 72 122 76" fill="none" stroke="#6cc5db" strokeWidth="9" />
      <circle cx="105" cy="20" r="10" fill="#ffcf66" stroke="none" />
    </Latar>
  ),
  "lingkungan-rusak": (
    <Latar warna="#e4ebea">
      <path d="M0 70Q49 52 130 69V86Q130 100 116 100H14Q0 100 0 86Z" fill="#c4b59a" stroke="none" />
      <path d="M54 77V37L45 26M54 45l17-16m-17 22-15-7m32-15 2-11" fill="none" stroke="#775f50" strokeWidth="5" />
      <Bungkus x={30} y={80} putar={-14} />
      <Botol x={97} y={76} putar={70} warna="#a6b9c8" />
    </Latar>
  ),
  "lingkungan-tanam-pohon": (
    <Latar>
      <path d="M0 75Q50 57 130 74V86Q130 100 116 100H14Q0 100 0 86Z" fill="#c4d898" stroke="none" />
      <ellipse cx="75" cy="81" rx="35" ry="12" fill="#a87a52" />
      <Pohon x={75} y={52} />
      <Tangan x={42} y={69} putar={18} />
    </Latar>
  ),
  "lingkungan-buang-ke-tempatnya": (
    <Latar>
      <path d="M0 81H130" stroke="#a3bbc4" strokeWidth="5" />
      <RakSampah x={80} y={68} />
      <Tangan x={47} y={30} putar={9} />
      <Bungkus x={78} y={42} putar={-19} />
      <path d="M75 58v8m-4-4 4 4 5-4" fill="none" stroke="#2b836c" />
    </Latar>
  ),
  "lingkungan-botol-sendiri": (
    <Latar>
      <path d="M39 45Q37 21 50 12 68 5 80 23L83 44" fill="none" stroke="#8196a5" strokeWidth="5" />
      <rect x="29" y="35" width="69" height="51" rx="17" fill="#eab46a" />
      <g transform="translate(32 2) scale(1.45)">
        <Botol x={37} y={42} warna="#70c6de" />
      </g>
      <path d="M86 24q14 2 9 16l-7 8" fill="none" stroke="#367594" strokeWidth="3" />
    </Latar>
  ),
  "lingkungan-sepeda-sekolah": (
    <Latar>
      <path d="M75 59V31H114V59M70 32l24-17 25 17Z" fill="#e8aa72" />
      <path d="M93 58V45h9v13" fill="#fff4d4" />
      <path d="M0 85H130" stroke="#adbaad" strokeWidth="6" />
      <circle cx="28" cy="72" r="14" fill="none" strokeWidth="3.5" />
      <circle cx="77" cy="72" r="14" fill="none" strokeWidth="3.5" />
      <path d="M28 72 43 49 56 72H28m28 0 19-25 2 25M42 49h27m-34-4h14m21-1 7-6h8" fill="none" stroke="#247f7d" strokeWidth="3" />
      <circle cx="52" cy="23" r="7" fill="#f1bf92" />
      <path d="m46 34-3 13 12 7-2 10m-7-30 13 8 12-1" fill="none" stroke="#77568f" strokeWidth="4" />
    </Latar>
  ),
  "lingkungan-matikan-lampu": (
    <Latar warna="#dce4ef">
      <path d="M0 14H130" stroke="#8293ac" strokeWidth="4" />
      <path d="M73 15v14m-9 15v-8a9 9 0 1 1 18 0v8l-4 6H68Z" fill="#c5ced8" />
      <path d="M69 51h8" fill="none" />
      <rect x="78" y="59" width="30" height="33" rx="5" fill="#fbfcfa" />
      <path d="M88 67h10v15H88Z" fill="#a9b4c4" />
      <path d="m88 73 10 7m-4-3 4 3-2 2" fill="none" stroke="#465971" />
      <Tangan x={65} y={79} putar={-9} />
    </Latar>
  ),
  "lingkungan-pilah-sampah": (
    <Latar>
      <RakSampah x={38} y={71} warna="#54a4c0" />
      <RakSampah x={94} y={71} warna="#70a965" />
      <Botol x={38} y={27} putar={-20} />
      <path d="M85 24q-6-10 1-14 5-3 9 2 4-5 9-1 5 6-1 14 5 9-1 12-4 3-8-2-6 5-10 1-4-4 1-12Z" fill="#eec977" />
      <path d="m95 14 2-8m-55 44-5 5-5-5m66 0-4 5-5-5" fill="none" />
    </Latar>
  ),
  "lingkungan-bakar-plastik": (
    <Latar warna="#f1ddca">
      <path d="M0 86H130" stroke="#baa18c" strokeWidth="6" />
      <Botol x={86} y={72} putar={69} warna="#84b9bb" />
      <path d="M30 84Q21 71 39 55q-1 12 8 11 12-9 14-24 15 19 12 30 6-2 10-10 7 13-2 24Z" fill="#f58a53" stroke="#b9553e" />
      <path d="M44 83q-1-7 9-13 3 7 10 1 4 7 2 12" fill="#ffd685" stroke="none" />
      <path d="M56 38q-11-4-9-11 1-6 11-5-1-11 12-12 15-1 14 9 12-4 17 4 2 6-9 9" fill="none" stroke="#777b80" strokeWidth="4" />
    </Latar>
  ),
  "lingkungan-petik-bunga": (
    <Latar>
      <path d="M0 77Q55 57 130 76V86Q130 100 116 100H14Q0 100 0 86Z" fill="#aad88e" stroke="none" />
      <path d="M12 43H46V54H12Zm4 12v9m25-9v9" fill="#c69364" />
      <path d="M84 83V63q-17-14-16 3 8 7 16 6m0 0q13-16 20-5-6 10-20 11m0-15v-8" fill="#69b871" />
      <path d="M73 43q-9-8 1-14 5-4 10 3 10-7 15 0 4 6-3 10 7 9-1 13-7 5-11-2-9 6-13-1-3-5 2-9Z" fill="#e184a4" />
      <circle cx="85" cy="43" r="6" fill="#ffd274" />
      <Tangan x={51} y={55} putar={-22} />
    </Latar>
  ),
  "lingkungan-bungkus-di-jalan": (
    <Latar warna="#dee8ea">
      <path d="M0 52H130V86Q130 100 116 100H14Q0 100 0 86Z" fill="#748694" stroke="none" />
      <path d="M0 52H130" stroke="#c6a886" strokeWidth="7" />
      <path d="M5 90H31m61 0h33" stroke="#e6ebec" strokeWidth="4" />
      <Tangan x={42} y={34} putar={15} />
      <Bungkus x={79} y={75} putar={-15} />
      <path d="M67 47l3 7m8-3 2 7" fill="none" stroke="#ecf0ee" />
    </Latar>
  ),
  "lingkungan-keran-mengalir": (
    <Latar>
      <path d="M13 33H57V22H74V33H87Q105 34 105 50V54H88V49H18Z" fill="#a4b3c3" />
      <path d="M45 22H86M66 22V13m-11 0h22" fill="none" stroke="#4e6a7f" strokeWidth="4" />
      <path d="M91 56v27m6-27 1 29m4-28 3 24" fill="none" stroke="#349ec4" strokeWidth="3" />
      <ellipse cx="97" cy="87" rx="22" ry="5" fill="#93d7ed" stroke="none" />
    </Latar>
  ),
  "lingkungan-tebang": (
    <Latar warna="#eadfd0">
      <path d="M0 70Q44 62 130 71V86Q130 100 116 100H14Q0 100 0 86Z" fill="#d0b18c" stroke="none" />
      <path d="M35 55 35 78l-8 8 35 1-8-8V55m36 11v16l-5 6h28l-7-6V66" fill="#ac7c57" />
      <ellipse cx="44" cy="56" rx="10" ry="4" fill="#e0b278" />
      <ellipse cx="98" cy="67" rx="9" ry="4" fill="#e0b278" />
      <path d="M63 79l12-8m-8 14 15-5" fill="none" stroke="#a47651" strokeWidth="3" />
    </Latar>
  ),
  "lingkungan-mobil-berasap": (
    <Latar warna="#e3e9e9">
      <path d="M0 87H130" stroke="#a5b6ba" strokeWidth="5" />
      <path d="M57 73H42q-8 0-8-6 0-8-9-7-7 1-11-5-5-6 1-12 4-5 11-2 2-10 12-8 9 2 7 12 10 2 6 10 10 3 6 12" fill="#5e646c" stroke="#62656e" />
      <path d="M51 69h10l13-19h19l12 18 10 4v10H49V72Z" fill="#db7772" />
      <path d="m71 68 8-11h12l9 11Z" fill="#bee5eb" />
      <circle cx="67" cy="82" r="8" fill="#43525d" />
      <circle cx="105" cy="82" r="8" fill="#43525d" />
    </Latar>
  ),
  "lingkungan-tanam-bakau": (
    <Latar>
      <Pantai />
      <path d="M77 72V39m0 22L64 77m13-14 14 13m-12-21 2 22" fill="none" stroke="#8c6a4b" strokeWidth="4" />
      <path d="M77 43Q59 42 58 28q17-7 19 15Zm1 0q8-18 24-13-4 15-24 13Zm-3 8Q54 53 49 42q16-8 26 9Z" fill="#72be78" />
      <Tangan x={40} y={71} putar={8} />
    </Latar>
  ),
  "lingkungan-pungut-pantai": (
    <Latar>
      <Pantai />
      <RakSampah x={101} y={79} />
      <Bungkus x={63} y={78} putar={-14} />
      <Tangan x={40} y={61} putar={27} sarung />
      <path d="M74 72l6-5m-3 0h3v3" fill="none" stroke="#3f927e" />
    </Latar>
  ),
  "lingkungan-tukik-ke-laut": (
    <Latar>
      <Pantai />
      <g transform="translate(69 62) rotate(-63)">
        <path d="M-11-9q-15-15-16-4 4 8 15 12m1 8q-16 6-12 12 7 5 15-8m8 1q7 15 15 6 2-8-9-11m-1-8q9-15 3-19-10-2-10 12" fill="#92c3a0" />
        <ellipse cx="-3" cy="0" rx="15" ry="12" fill="#599882" />
        <path d="M-9-8-4-3l-1 7-7 4m8-11 10-2m-11 9 9 4m-21-9-4 2" fill="none" stroke="#cce2a8" />
        <ellipse cx="15" cy="0" rx="7" ry="5" fill="#a7cdab" />
        <circle cx="18" cy="-2" r="1.4" fill="#304756" stroke="none" />
      </g>
      <path d="M47 91l3-5m4 3 3-5" fill="none" stroke="#a4886d" />
    </Latar>
  ),
  "lingkungan-ikan-secukupnya": (
    <Latar>
      <Sungai />
      <Ikan x={42} y={25} />
      <path d="M19 34H66L60 47H25Zm6 1 6 9m4-9 4 9m6-9 3 9m8-9-3 9" fill="#d7a577" />
      <Ikan x={37} y={70} />
      <Ikan x={83} y={66} />
      <Ikan x={98} y={85} />
    </Latar>
  ),
  "lingkungan-bersihkan-sungai": (
    <Latar>
      <Sungai />
      <RakSampah x={71} y={51} />
      <Bungkus x={39} y={70} putar={15} />
      <Botol x={95} y={68} putar={40} />
      <Tangan x={23} y={50} putar={40} sarung />
      <Tangan x={110} y={44} putar={134} sarung />
    </Latar>
  ),
  "lingkungan-sampah-ke-sungai": (
    <Latar>
      <Sungai />
      <Tangan x={45} y={26} putar={12} />
      <Botol x={78} y={49} putar={40} />
      <path d="m78 64 4 13m-11-4 11 4 5-8m-15 15q14-6 28 0" fill="none" stroke="#2a8199" strokeWidth="2.6" />
    </Latar>
  ),
  "lingkungan-air-sabun": (
    <Latar>
      <Sungai />
      <g transform="rotate(31 53 35)">
        <path d="M32 28H73L66 54H41Z" fill="#a3b4ca" />
        <ellipse cx="52" cy="28" rx="20" ry="5" fill="#e9f7fb" />
        <path d="M39 25Q29 5 51 7 76 6 66 25" fill="none" stroke="#717f96" />
      </g>
      <path d="M72 37Q98 45 90 64T96 81" fill="none" stroke="#e9fbfb" strokeWidth="8" />
      <g fill="#effcff" stroke="#7ab7ca">
        <circle cx="88" cy="83" r="6" />
        <circle cx="101" cy="77" r="5" />
        <circle cx="102" cy="91" r="4" />
        <circle cx="112" cy="83" r="6" />
      </g>
    </Latar>
  ),
  "lingkungan-kantong-di-pasir": (
    <Latar>
      <Pantai />
      <path d="M52 68v-7q8-8 12 0v6m12-1v-7q7-7 12-1v11l6 19q-22 8-44-1l4-18Z" fill="#e8f3f1" stroke="#729aa8" />
      <path d="m61 72 4 15m18-14-3 14" fill="none" stroke="#aec3c9" />
      <path d="M24 80l8-3m-5 10 8-3" fill="none" stroke="#b69775" />
    </Latar>
  ),
  "lingkungan-racun-ikan": (
    <Latar warna="#b4d5de">
      <Sungai />
      <Ikan x={40} y={73} diam />
      <Ikan x={92} y={80} diam />
      <path d="M66 10 89 49H43Z" fill="#f6d890" stroke="#9a634f" strokeWidth="3" />
      <path d="M66 22v12m0 7v1" fill="none" stroke="#905047" strokeWidth="4" />
    </Latar>
  ),
};
