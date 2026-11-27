const garis = { stroke: "#233e55", strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const ILUSTRASI_PERANGKAT_SD2 = {
  "perangkat-pena-digital": (
    <g {...garis}>
      <rect x="12" y="21" width="76" height="65" rx="7" fill="#6984a2" />
      <rect x="20" y="27" width="60" height="50" rx="3" fill="#dbf5fc" />
      <path d="M30 63q7-19 17-7t13-10" fill="none" stroke="#ad4da6" strokeWidth="4" />
      <path d="M60 52l7-16 40-27 9 12-42 28z" fill="#f5b446" />
      <path d="m60 52 7-16 7 13z" fill="#fff" />
      <path d="m101 15 8 11" fill="none" />
    </g>
  ),
  "perangkat-touchpad": (
    <g {...garis}>
      <rect x="26" y="12" width="78" height="52" rx="6" fill="#81a5c2" />
      <rect x="33" y="19" width="64" height="37" rx="2" fill="#e7f1ff" />
      <path d="M26 63h78l17 21q0 4-6 4H15q-6 0-6-4z" fill="#abbfd1" />
      <path d="M32 68h66l4 5H28z" fill="#526a84" />
      <path d="M50 76h31l4 8H46z" fill="#8ff0c1" stroke="#246f58" />
    </g>
  ),
  "perangkat-keyboard-musik": (
    <g {...garis}>
      <rect x="82" y="13" width="36" height="27" rx="3" fill="#b8d9f1" />
      <path d="M81 41h38l5 8H76z" fill="#64849f" />
      <path d="M96 48v14q0 7-8 7H74" fill="none" />
      <rect x="8" y="45" width="65" height="44" rx="5" fill="#6883a6" />
      <path d="M13 57h55v26H13z" fill="#fff" />
      <path d="M21 57v26m8-26v26m8-26v26m8-26v26m8-26v26m8-26v26" strokeWidth="1.5" />
      <path d="M21 57v12m8-12v12m16-12v12m8-12v12m8-12v12" strokeWidth="4" />
      <circle cx="17" cy="51" r="2" fill="#fcce70" stroke="none" />
    </g>
  ),
  "perangkat-layar-laptop": (
    <g {...garis}>
      <rect x="18" y="9" width="94" height="69" rx="6" fill="#526c88" />
      <rect x="25" y="16" width="80" height="54" rx="3" fill="#b9e5fb" />
      <circle cx="84" cy="31" r="7" fill="#ffe07d" stroke="none" />
      <path d="m29 64 24-27 14 17 10-10 24 20z" fill="#68b490" stroke="none" />
      <path d="M17 78h96l8 10q0 4-6 4H15q-6 0-6-4z" fill="#a6bad0" />
    </g>
  ),
  "perangkat-printer-struk": (
    <g {...garis}>
      <path d="M26 23h75l13 20v41H17V41z" fill="#afc9d8" />
      <path d="M17 42h97M28 49h74v12H28z" fill="#5e7694" />
      <path d="M36 55h58v32l-8-4-8 4-8-4-7 4-9-4-9 4-9-4z" fill="#fff" />
      <path d="M46 64h37m-37 7h31" fill="none" stroke="#7a91a4" strokeWidth="2" />
      <circle cx="94" cy="32" r="3" fill="#39bd89" stroke="none" />
    </g>
  ),
  "perangkat-proyektor": (
    <g {...garis}>
      <path d="M43 61 100 17l13 55z" fill="#fff3b4" fillOpacity=".75" stroke="none" />
      <path d="M99 15h19v61H99" fill="#dce9f8" />
      <path d="M100 20h17v47h-17" fill="#fff0b3" stroke="none" />
      <path d="M16 53h36l9 10v18H11V60z" fill="#9ab9d4" />
      <circle cx="47" cy="65" r="6" fill="#efcd75" />
      <path d="M20 64h14m-14 6h14" stroke="#4d6982" strokeWidth="2" />
      <path d="M19 83v5m34-5v5" />
    </g>
  ),
};
