export const ILUSTRASI_KEADAAN_BENDA_IDS = [
  "qc-peluit-ditiup", "qc-peluit-di-saku", "qc-kentongan-dipukul",
  "qc-lampu-jalan-nyala", "qc-tiang-lampu", "qc-bohlam-nyala", "qc-bohlam-mati",
  "qc-mata-kucing-terpantul", "qc-reflektor-sepeda", "qc-tutup-botol-baja",
];

const INK = "#25465a";

function Bohlam({ menyala }: { menyala: boolean }) {
  return (
    <g stroke={INK} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
      {menyala && <path d="M65 7V13M32 15L37 21M98 15L93 21M22 40H30M100 40H108M29 65L36 61M101 65L94 61"
        stroke="#be771d" strokeWidth="3.5" fill="none" />}
      <path d="M51 72Q47 63 43 57Q35 44 41 31Q49 18 65 18Q81 18 89 31Q95 44 87 57Q83 63 79 72Z"
        fill={menyala ? "#ffda66" : "#dcf0f5"} />
      <path d="M61 71L55 46 65 50 75 46 69 71" fill="none" stroke={menyala ? "#b16b1b" : "#6d8793"} />
      <path d="M51 72H79L76 85 68 91H62L54 85Z" fill="#a8bdc8" />
      <path d="m54 79 22-3m-22 9 20-3" fill="none" />
    </g>
  );
}

function LampuJalan({ menyala }: { menyala: boolean }) {
  return (
    <g stroke={INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      {menyala && <path d="M72 35H101L121 86H49Z" fill="#ffdf78" fillOpacity="0.65" stroke="none" />}
      <path d="M30 87V32Q30 21 42 21H70V14H42Q24 14 24 32V87Z" fill="#b7c9d2" />
      <path d="M16 87H38L44 93H10Z" fill="#869ca8" />
      <path d="M65 16H95Q105 16 110 27L108 32H66L62 24Z" fill="#678493" />
      <path d="M70 32H103Q95 41 82 39Q74 39 70 32Z" fill={menyala ? "#fff1a0" : "#c2d4d8"} />
    </g>
  );
}

function Peluit({ saku }: { saku: boolean }) {
  return (
    <g stroke={INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      {saku && <path d="M21 31H107V89H21Z" fill="#6b9ac8" />}
      <path d={saku ? "M58 39 55 21 95 12 98 24 76 33Q87 45 73 55L58 57Z" : "M30 39H65L76 31H106V49H81Q81 72 57 75Q34 74 30 56Z"}
        fill="#c7dbe4" />
      {saku ? <>
        <path d="M29 38H99V69L64 81 29 70Z" fill="#82b4df" />
        <path d="M35 44H93V64L64 74 35 65Z" fill="none" stroke="#ffdb8d" strokeDasharray="3 4" strokeWidth="2" />
      </> : <>
        <circle cx="52" cy="55" r="9" fill="#89a5b3" />
        <path d="M34 23Q27 18 21 22M30 33Q18 29 12 35M106 58L114 65M110 41H119"
          fill="none" stroke="#367c9d" />
      </>}
    </g>
  );
}

export function IlustrasiKeadaanBenda({ id }: { id: string }) {
  switch (id) {
    case "qc-peluit-ditiup": return <Peluit saku={false} />;
    case "qc-peluit-di-saku": return <Peluit saku />;
    case "qc-lampu-jalan-nyala": return <LampuJalan menyala />;
    case "qc-tiang-lampu": return <LampuJalan menyala={false} />;
    case "qc-bohlam-nyala": return <Bohlam menyala />;
    case "qc-bohlam-mati": return <Bohlam menyala={false} />;
    case "qc-kentongan-dipukul": return (
      <g stroke="#634626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 20H73M49 19V30" fill="none" />
        <path d="M36 31Q49 25 62 31L69 83Q49 91 29 83Z" fill="#b67d47" />
        <path d="M47 43H52V74H47Z" fill="#634626" />
        <path d="m75 62 37 17 4-9-36-19Z" fill="#e4b67f" />
        <path d="m78 40 8-8m-7 15 11-4" fill="none" stroke="#d58926" />
      </g>
    );
    case "qc-mata-kucing-terpantul": return (
      <g stroke="#476273" strokeWidth="2.8" strokeLinejoin="round">
        <path d="M26 58 16 25Q19 18 26 22L43 38Q65 28 89 38L107 22Q115 18 116 26L104 58Q112 79 87 87H43Q16 79 26 58Z" fill="#314352" />
        <path d="M35 57Q47 48 58 58Q48 69 35 57ZM72 58Q82 49 95 57Q82 69 72 58Z" fill="#e1e87c" stroke="#aab85c" />
        <ellipse cx="46" cy="57" rx="2" ry="4" fill="#253245" stroke="none" />
        <ellipse cx="84" cy="57" rx="2" ry="4" fill="#253245" stroke="none" />
        <circle cx="49" cy="55" r="2" fill="#fff" stroke="none" /><circle cx="88" cy="55" r="2" fill="#fff" stroke="none" />
        <path d="M61 71 65 69 69 71 65 75Z" fill="#e1a29e" stroke="none" />
      </g>
    );
    case "qc-reflektor-sepeda": return (
      <g stroke={INK} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        <circle cx="31" cy="68" r="18" fill="#eff5f7" /><circle cx="101" cy="68" r="18" fill="#eff5f7" />
        <path d="M31 68 48 38H80L62 68H31L54 54 62 68M101 68 90 34 83 27H94M47 38 43 28M34 28H52"
          fill="none" stroke="#498b94" strokeWidth="4" />
        <path d="M22 45H37L35 54H24Z" fill="#ec623f" stroke="#9c3c2e" />
        <path d="M25 49H33" fill="none" stroke="#fde5a9" />
      </g>
    );
    case "qc-tutup-botol-baja": return (
      <g stroke="#566e7c" strokeWidth="3" strokeLinejoin="round">
        <path d="M24 54 22 63 28 68 31 75 42 77 52 82 66 80 82 82 92 77 101 76 104 70 110 65 107 54Z" fill="#8da7b8" />
        <path d="M25 53 29 43 39 40 48 34 62 35 76 33 88 37 99 40 107 47 108 54 103 62 93 65 83 70 68 68 54 70 42 66 31 64Z" fill="#c4d8e4" />
        <ellipse cx="66" cy="52" rx="27" ry="10" fill="#91b7c8" strokeWidth="2" />
        <path d="M49 51Q64 44 80 49" fill="none" stroke="#e6f2f6" strokeWidth="2.7" />
      </g>
    );
    default: return null;
  }
}
