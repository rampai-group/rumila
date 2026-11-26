import type { ReactNode } from "react";

function ToplesKacaKosong() {
  return <g stroke="#427888" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M39 21v13Q22 42 22 57v20q0 12 43 12t43-12V57q0-15-17-23V21" fill="#d9f3f7" fillOpacity=".7" />
    <ellipse cx="65" cy="21" rx="26" ry="8" fill="#f3fcfe" />
    <path d="M39 29q26 11 52 0M26 75q39 14 78 0" fill="none" stroke="#88b7c3" />
    <path d="M33 69V57q0-8 8-13M97 59v13" fill="none" stroke="#fff" strokeWidth="4" />
  </g>;
}

function TusukGigiKayu() {
  return <g stroke="#855d2c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 78 21-18 59-30 25-6-21 15-60 30Z" fill="#efc987" />
    <path d="m33 65 60-31" fill="none" stroke="#b38449" strokeWidth="1.8" />
    <path d="m38 61 50-25" fill="none" stroke="#fff0c4" strokeWidth="1.8" />
  </g>;
}

function PipaTembaga() {
  return <g stroke="#794129" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="m13 39 79-25c9-3 22 8 26 20s1 24-8 27L31 86Z" fill="#ce7b4e" />
    <path d="m32 42 62-20q7-2 12 4L41 48Z" fill="#efb28b" stroke="none" />
    <path d="m49 72 61-19" fill="none" stroke="#a65935" strokeWidth="2" />
    <ellipse cx="23" cy="63" rx="16" ry="25" transform="rotate(-20 23 63)" fill="#efaa83" />
    <ellipse cx="23" cy="63" rx="10" ry="18" transform="rotate(-20 23 63)" fill="#733f32" />
    <path d="M19 52q-2 12 8 22" fill="none" stroke="#a75f44" strokeWidth="2" />
  </g>;
}

function TutupBaja() {
  return <g stroke="#556d7b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 48v14l5 7 5-1 5 7 6-1 6 5 6-2 6 5 6-3 6 3 6-5 6 2 6-5 6 1 5-7 5 1 5-7V48" fill="#a8bac6" />
    <ellipse cx="65" cy="48" rx="42" ry="23" fill="#dce5eb" />
    <ellipse cx="65" cy="47" rx="33" ry="16" fill="#b7cad4" stroke="#8196a5" strokeWidth="2" />
    <path d="M39 47q11-10 30-10M43 52q8-6 20-7" fill="none" stroke="#eef5f9" strokeWidth="2" />
  </g>;
}

function KelerengKaca() {
  return <g strokeLinecap="round">
    <circle cx="65" cy="50" r="35" fill="#b0e1ed" fillOpacity=".78" stroke="#447688" strokeWidth="3" />
    <path d="M38 64c25 13 53-13 46-39" fill="none" stroke="#2a9e87" strokeWidth="5" />
    <path d="M42 71c23 7 48-8 51-29" fill="none" stroke="#4ebf89" strokeWidth="3" />
    <path d="M39 48q3-14 16-21M75 76q9-3 15-12" fill="none" stroke="#f1fbff" strokeWidth="4" />
    <circle cx="59" cy="25" r="2" fill="#f1fbff" />
  </g>;
}

function RubahKutub() {
  const garis = "#51677d";
  return <>
    <ellipse cx="65" cy="87" rx="56" ry="7" fill="#e4effd" />
    <path d="M61 51C71 36 90 38 102 44C115 50 123 63 119 77C114 88 97 90 80 86C70 83 62 77 56 73Z" fill="#e6eff9" stroke={garis} strokeWidth="3" strokeLinejoin="round" />
    <path d="M68 48C85 43 93 52 100 62C107 73 99 81 90 77L85 86H74L77 74L62 72L58 85H46L47 71C39 62 48 51 59 49Z" fill="#f8fbff" stroke={garis} strokeWidth="3" strokeLinejoin="round" />
    <path d="M30 46C27 40 29 31 36 29C42 27 46 33 47 39C54 39 60 43 64 48C69 56 64 66 59 71L52 68L47 74L40 71Q25 68 22 59L12 55L12 51Z" fill="#f9fcff" stroke={garis} strokeWidth="3" strokeLinejoin="round" />
    <path d="M35 41C32 35 38 32 41 38" fill="none" stroke="#9daec3" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M29 62Q41 70 47 63L53 63M89 81Q106 81 113 72" fill="none" stroke="#a5b9d0" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="35" cy="50" r="2.8" fill="#254158" />
    <path d="M11 51L17 50L15 56L11 55Z" fill="#254158" />
  </>;
}

function TanamanKopi({ berbuah }: { berbuah: boolean }) {
  const hijau = "#2f7043";
  return <>
    <path d="M42 91Q66 76 72 42L77 13M56 75L33 63M65 61L104 58M71 44L43 31M75 32L103 22" fill="none" stroke="#79644b" strokeWidth="4" strokeLinecap="round" />
    <g stroke={hijau} strokeWidth="2.2" strokeLinejoin="round">
      <path d="M70 43Q55 18 22 14Q26 40 70 43Z" fill="#51a961" />
      <path d="M75 33Q97 14 120 13Q109 35 75 33Z" fill="#83bf61" />
      <path d="M66 58Q94 42 119 52Q100 73 66 58Z" fill="#56a956" />
      <path d="M57 74Q35 46 13 49Q17 72 57 74Z" fill="#6cb45c" />
      <path d="M71 47L40 24M75 32L106 20M66 58L104 55M57 74L28 57" fill="none" />
    </g>
    {berbuah ? (
      <g fill="#cf4f48" stroke="#963b38" strokeWidth="2">
        <ellipse cx="63" cy="51" rx="6" ry="8" transform="rotate(-20 63 51)" />
        <ellipse cx="70" cy="58" rx="6.5" ry="8" transform="rotate(26 70 58)" />
        <ellipse cx="60" cy="62" rx="6" ry="8.5" transform="rotate(-21 60 62)" />
        <ellipse cx="61" cy="77" rx="6.5" ry="8" transform="rotate(26 61 77)" />
        <ellipse cx="50" cy="79" rx="6.2" ry="8" transform="rotate(-21 50 79)" />
        <path d="M59 48Q60 45 62 45M66 55Q68 52 70 53M57 60Q58 56 60 57M59 75Q61 72 63 73M47 77Q48 74 50 74" fill="none" stroke="#ff9281" strokeWidth="1.6" strokeLinecap="round" />
      </g>
    ) : (
      <g fill="#fff" stroke="#638163" strokeWidth="1.7" strokeLinejoin="round">
        {[{ x: 69, y: 44 }, { x: 64, y: 56 }, { x: 73, y: 62 }, { x: 52, y: 71 }, { x: 59, y: 79 }].map(({ x, y }) => (
          <g key={x} transform={`translate(${x} ${y})`}>
            <path d="M0-9L2-3L8-4L4 1L8 6L1 4L-2 9L-3 3L-8 2L-3-2L-4-7Z" />
            <circle cy=".5" r="2.2" fill="#f4d07a" stroke="none" />
          </g>
        ))}
      </g>
    )}
    {berbuah && (
      <g stroke="#514746" strokeWidth="1.7" strokeLinejoin="round">
        <path d="M16 87C7 91 4 86 8 80" fill="none" strokeWidth="4" strokeLinecap="round" />
        <path d="M17 75Q27 68 37 73L43 70Q42 64 46 65L49 69L57 72L54 77L47 79L44 87H39L40 81L27 83L24 90H19L20 83Q15 81 17 75Z" fill="#a89b8c" />
        <path d="M47 72L54 73L52 76L47 77Z" fill="#655654" />
        <path d="M23 77L26 74M29 79L33 75M36 79L38 76" stroke="#655654" strokeLinecap="round" />
        <circle cx="50" cy="72" r="1" fill="#292d36" stroke="none" />
      </g>
    )}
  </>;
}

function MangkukBaja() {
  return <>
    <ellipse cx="65" cy="82" rx="45" ry="5" fill="#e5ebee" />
    <path d="M18 40Q22 65 37 74Q63 88 93 74Q109 66 113 40Z" fill="#bccbda" stroke="#51677d" strokeWidth="3" />
    <ellipse cx="65.5" cy="39" rx="47.5" ry="17" fill="#d9e4eb" stroke="#51677d" strokeWidth="3" />
    <path d="M28 38Q63 24 104 38Q99 49 65 51Q36 50 28 38Z" fill="#a2b5c5" stroke="#7e93a5" strokeWidth="2" />
    <path d="M29 46Q60 57 103 44M33 60Q59 72 83 65" fill="none" stroke="#f1f6fa" strokeWidth="3" strokeLinecap="round" />
  </>;
}

function OtotLengan({ belakang }: { belakang: boolean }) {
  return <>
    <path d="M46 15C57 9 75 12 80 23C83 35 76 54 75 61C79 68 85 81 89 87L79 95C71 90 60 78 56 70C50 59 52 42 46 33Q39 24 46 15Z" fill="#f2dfd2" stroke="#916f68" strokeWidth="3" strokeLinejoin="round" />
    <path d="M69 18C62 29 59 46 64 65L77 83" fill="none" stroke="#bfa79c" strokeWidth="2.5" strokeLinecap="round" />
    {belakang ? (
      <path d="M56 24C48 31 50 46 57 53L64 63C65 53 68 47 66 39Q64 29 56 24Z" fill="#bb6574" stroke="#944d60" strokeWidth="2.3" />
    ) : (
      <path d="M72 21C81 24 78 37 75 45Q73 55 67 62C66 52 66 37 72 21Z" fill="#e28b80" stroke="#aa5959" strokeWidth="2.3" />
    )}
    <circle cx={belakang ? 59 : 73} cy="41" r="13" fill="none" stroke={belakang ? "#9479bf" : "#f0a56e"} strokeWidth="2.3" strokeDasharray="4 3" />
  </>;
}

function OtotPaha({ belakang }: { belakang: boolean }) {
  return <>
    <path d="M42 12Q64 5 83 14C88 28 79 42 76 58Q75 66 79 74L89 88L79 95Q64 87 60 75L50 67C41 48 35 31 42 12Z" fill="#f2dfd2" stroke="#916f68" strokeWidth="3" strokeLinejoin="round" />
    <path d="M63 15C71 28 65 44 67 62Q73 77 82 88" fill="none" stroke="#bfa79c" strokeWidth="2.5" strokeLinecap="round" />
    {belakang ? (
      <path d="M74 17C87 24 75 42 73 52L70 62Q64 55 68 43C70 34 68 25 74 17Z" fill="#bb6574" stroke="#944d60" strokeWidth="2.3" />
    ) : (
      <path d="M52 17C46 19 44 30 49 40Q52 48 55 53L62 62C61 53 64 46 62 34Q60 23 52 17Z" fill="#e28b80" stroke="#aa5959" strokeWidth="2.3" />
    )}
  </>;
}

function LubangAnus() {
  return <>
    <path d="M33 62V32Q33 21 45 21H86Q97 21 97 32V49Q97 62 84 62H74" fill="none" stroke="#ae7477" strokeWidth="15" strokeLinecap="round" />
    <path d="M33 62V32Q33 21 45 21H86Q97 21 97 32V49Q97 62 84 62H74" fill="none" stroke="#f2c7c3" strokeWidth="11" strokeLinecap="round" />
    <path d="M45 18V25M56 18V25M67 18V25M78 18V25M93 31H101M93 43H101M29 34H37M29 46H37M29 58H37" fill="none" stroke="#ca9797" strokeWidth="2" />
    <path d="M76 56C66 56 59 62 62 71L65 78V85Q69 90 74 85V77L77 70Q80 63 84 62Z" fill="#e79e9e" stroke="#ae7477" strokeWidth="2.3" />
    <ellipse cx="69.5" cy="85.5" rx="5" ry="2.8" fill="#83475e" />
    <circle cx="69.5" cy="85.5" r="11" fill="none" stroke="#29768a" strokeWidth="2.3" />
    <path d="M112 74H95L82 82" fill="none" stroke="#29768a" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M83 77L80 84L88 84" fill="none" stroke="#29768a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </>;
}

function Capung() {
  return <g strokeLinecap="round" strokeLinejoin="round">
    {["", "translate(130 0) scale(-1 1)"].map((transform) => <g key={transform} transform={transform}>
      <path d="M61 34C49 25 20 17 9 23Q2 29 12 35C25 43 47 44 61 39Z" fill="#d4eef2" stroke="#4b8c99" strokeWidth="2.2" />
      <path d="M61 43C53 44 23 45 11 51Q2 57 12 64C26 70 53 59 62 49Z" fill="#bbdfe8" stroke="#4b8c99" strokeWidth="2.2" />
      <path d="M12 27Q36 30 57 37M21 29L25 37M34 32L38 39M45 34L48 40M12 58Q35 56 57 47M20 57L25 62M33 54L39 58M46 51L49 55" fill="none" stroke="#70a9b5" strokeWidth="1.3" />
      <path d="M60 28L49 22L42 24M60 37L49 36L41 40M60 46L49 52L45 60" fill="none" stroke="#365a59" strokeWidth="2.5" />
    </g>)}
    <path d="M60 45C57 58 59 76 61 89Q65 96 69 89C71 76 73 58 70 45Z" fill="#68a49b" stroke="#265f59" strokeWidth="2.3" />
    <path d="M59 56H71M59 64H71M60 72H70M61 80H69M62 87H68" stroke="#265f59" strokeWidth="1.9" />
    <ellipse cx="65" cy="36" rx="9" ry="13" fill="#429384" stroke="#265f59" strokeWidth="2.5" />
    <path d="M62 28L65 35L69 29M65 35V45" fill="none" stroke="#99c5ad" strokeWidth="1.7" />
    <ellipse cx="65" cy="21" rx="12" ry="9" fill="#55a893" stroke="#265f59" strokeWidth="2" />
    <ellipse cx="59" cy="19" rx="6" ry="6.5" fill="#285c53" />
    <ellipse cx="71" cy="19" rx="6" ry="6.5" fill="#285c53" />
    <path d="M57 17L59 16M69 17L71 16" stroke="#d8efe5" strokeWidth="1.6" />
  </g>;
}

const ILUSTRASI: Record<string, () => ReactNode> = {
  "qc-hewan-rubah-kutub": RubahKutub,
  "qc-sd5-buah-kopi": () => <TanamanKopi berbuah />,
  "qc-sd5-tanaman-kopi": () => <TanamanKopi berbuah={false} />,
  "qc-sd6-mangkuk-baja-kosong": MangkukBaja,
  "qc-sd4-otot-biseps": () => <OtotLengan belakang={false} />,
  "qc-sd4-otot-triseps": () => <OtotLengan belakang />,
  "qc-sd4-otot-paha-depan": () => <OtotPaha belakang={false} />,
  "qc-sd4-otot-paha-belakang": () => <OtotPaha belakang />,
  "qc-sd4-toples-kaca-kosong": ToplesKacaKosong,
  "qc-sd4-tusuk-gigi-kayu": TusukGigiKayu,
  "qc-sd5-pipa-tembaga": PipaTembaga,
  "qc-sd5-tutup-baja": TutupBaja,
  "qc-sd5-kelereng-kaca": KelerengKaca,
  "qc-sd5-lubang-anus": LubangAnus,
  "qc-sd6-capung": Capung,
};

export const ILUSTRASI_QC_SD4_SD6_IDS = Object.keys(ILUSTRASI);

export function IlustrasiQcSd4Sd6({ id }: { id: string }): ReactNode {
  const Gambar = ILUSTRASI[id];
  return Gambar ? <Gambar /> : null;
}
