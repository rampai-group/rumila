import type { ReactNode } from "react";

/** Perangkat Pilot: sambungan terlihat pada gambar, bukan hanya pada nama kartu. */
function Alat({ jenis }: { jenis: string }) {
  const layar = <><rect x="8" y="24" width="59" height="40" rx="5" fill="#acdff4" /><path d="M16 32h42v22H16Z" fill="#edfaff" /></>;
  switch (jenis) {
    case "telepon": return <><path d="M10 55h53v22H10Z" fill="#ffcf70" /><path d="M13 36q24-16 47 0l-6 12-12-5v-6H30v6l-12 5Z" fill="#5ea8d7" /><path d="M22 53v10q-16 4-14-10V42" fill="none" /><path d="M32 59h17m-17 8h17" /></>;
    case "mouse": return <><rect x="24" y="30" width="31" height="48" rx="15" fill="#ffcf70" /><path d="M24 48h31M40 31v17" /><path d="M40 24v6" /></>;
    case "keyboard": case "piano": return <><rect x="5" y="40" width="65" height="31" rx="4" fill="#eff6fa" />{Array.from({length:7},(_,i)=><path key={i} d={`M${12+i*8} 43v25`} />)}{jenis==="piano"?<path d="M17 42v15m16-15v15m8-15v15m16-15v15" strokeWidth="5" />:<path d="M8 50h59M8 60h59" />}</>;
    case "headphone": return <><path d="M16 58V42a22 22 0 0144 0v16" fill="none" strokeWidth="7" /><rect x="10" y="49" width="15" height="25" rx="5" fill="#9c8ee5" /><rect x="51" y="49" width="15" height="25" rx="5" fill="#9c8ee5" /></>;
    case "printer": return <><path d="M19 18h38v35H19Z" fill="white" /><rect x="7" y="42" width="63" height="30" rx="6" fill="#86bddc" /><path d="M21 61h35v22H21Z" fill="white" /><path d="M27 69h23m-23 6h23" /></>;
    case "ponsel": case "tablet": case "remot": return <><rect x="23" y="17" width="34" height="65" rx="7" fill="#86bddc" /><rect x="28" y="24" width="24" height={jenis==="remot"?18:43} rx="2" fill="#effaff" /><circle cx="40" cy="75" r="2" />{jenis==="remot"&&<path d="M30 51h20m-20 9h20" />}</>;
    case "jam": return <><path d="M29 5h22v88H29Z" fill="#9c8ee5" /><rect x="18" y="29" width="44" height="40" rx="11" fill="#d9f6ff" /><path d="M40 36v16l12 5" fill="none" /></>;
    case "drone": return <><path d="M20 34l40 29M60 34L20 63" strokeWidth="6" /><ellipse cx="15" cy="30" rx="13" ry="5" fill="#8edacc" /><ellipse cx="65" cy="30" rx="13" ry="5" fill="#8edacc" /><ellipse cx="15" cy="67" rx="13" ry="5" fill="#8edacc" /><ellipse cx="65" cy="67" rx="13" ry="5" fill="#8edacc" /><rect x="27" y="39" width="26" height="21" rx="6" fill="#ffd06c" /></>;
    case "game": return <><path d="M19 37h38q12 1 15 30t-21-3H26Q3 89 5 65t14-28Z" fill="#b8a6ec" /><path d="M18 45v18m-9-9h18" /><circle cx="56" cy="48" r="3" fill="#f6bc56" /><circle cx="63" cy="58" r="3" fill="#f6bc56" /></>;
    case "speaker": return <><rect x="19" y="18" width="41" height="66" rx="6" fill="#9c8ee5" /><circle cx="40" cy="59" r="14" fill="#effaff" /><circle cx="40" cy="32" r="6" fill="#effaff" /></>;
    case "mik": return <><rect x="28" y="16" width="23" height="39" rx="11" fill="#86bddc" /><path d="M20 39v6a20 20 0 0040 0v-6M40 65v17M25 83h30" fill="none" /></>;
    case "proyektor": return <><rect x="7" y="35" width="63" height="36" rx="7" fill="#86bddc" /><circle cx="53" cy="53" r="13" fill="#e9faff" /><path d="M15 47h15m-15 8h15M19 71v7m38-7v7" /></>;
    case "gitar": return <><path d="M47 13l9 3-11 43q18 25-5 27T14 68q0-16 18-17Z" fill="#f3ad61" /><circle cx="35" cy="66" r="6" fill="#6c523c" /><path d="M51 20L36 74" /></>;
    case "mobil": return <><path d="M7 51l13-22h31l16 22v22H7Z" fill="#f4b365" /><path d="M23 35h24l10 16H15Z" fill="#dff8ff" /><circle cx="20" cy="74" r="8" fill="#53677b" /><circle cx="56" cy="74" r="8" fill="#53677b" /></>;
    case "walkie": return <><path d="M27 7v24" strokeWidth="6" /><rect x="16" y="29" width="43" height="54" rx="6" fill="#90cdbd" /><rect x="23" y="37" width="29" height="15" fill="#eafaff" /><path d="M24 62h27m-27 7h27" /></>;
    case "kunci": return <><rect x="13" y="23" width="37" height="33" rx="9" fill="#9c8ee5" /><circle cx="32" cy="38" r="5" fill="#fff" /><path d="M32 56v29h13v-8H32" fill="none" strokeWidth="6" /></>;
    case "bel": return <><path d="M17 64h46L54 50V37a14 14 0 00-28 0v13Z" fill="#ffd06c" /><path d="M33 73q7 10 14 0" fill="none" /><circle cx="40" cy="19" r="4" fill="#ffd06c" /></>;
    case "kamera": return <><rect x="13" y="25" width="50" height="28" rx="5" fill="#a9dccc" /><path d="M63 30l11-5v28l-11-5M40 53v21H21" fill="#dff8ff" /></>;
    default: return <>{layar}{jenis==="laptop"?<path d="M8 64L2 76h72l-7-12Z" fill="#86bddc" />:<path d="M37 64v14m-14 0h29" />}</>;
  }
}

export function PerangkatPilot({ varian }: { varian: string }) {
  const [, sambungan, jenis] = varian.split("-");
  const ujung: Record<string, [number, number]> = { telepon: [63, 65], mouse: [55, 48], headphone: [66, 66], printer: [70, 65], keyboard: [70, 57], piano: [70, 57], mik: [40, 82], proyektor: [70, 60], gitar: [45, 75], game: [70, 60], komputer: [67, 55], tv: [67, 55] };
  const [x, y] = ujung[jenis] ?? [66, 65];
  return <g stroke="#284866" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <Alat jenis={jenis} />
    {sambungan === "kabel" ? <><path d={`M${x} ${y}H74q8 0 8 8v${Math.max(0, 79-y-8)}q0 8 9 8h16V46`} fill="none" stroke="#df7546" strokeWidth="4" />{["mouse", "proyektor", "keyboard", "printer"].includes(jenis) ? <><rect x="92" y="20" width="31" height="23" rx="2" fill="#d7eaf7" /><path d="M92 43l-3 5h37l-3-5Z" fill="#86bddc" /></> : jenis === "tv" ? <path d="M107 46V12m-13 7h26m-23 8h20m-17 8h14" fill="none" /> : <><rect x="94" y="20" width="26" height="26" rx="4" fill="#d7eaf7" /><circle cx="107" cy="33" r="7" fill="#6a91aa" /></>}</> : <g fill="none" stroke="#2376ba" strokeWidth="3.5"><path d="M87 32q14 13 0 26m7-34q23 21 0 42m8-50q31 29 0 58" /><circle cx="83" cy="45" r="2" fill="#2376ba" /></g>}
  </g>;
}

/** Bentuk mesin dan tugasnya membedakan robot dari mainan berbentuk robot. */
export function RobotPilot({ varian }: { varian: string }) {
  const jenis=varian.slice(6);
  let isi: ReactNode;
  if(jenis==="kardus"||jenis==="kayu") {
    const warna=jenis==="kardus"?"#d5ad73":"#ae784f";
    isi=<g fill={warna}><rect x="41" y="10" width="47" height="28" rx="2" /><rect x="37" y="41" width="55" height="33" rx="2" /><path d="M37 47H20v23h13V55m59-8h17v23H97V55M44 74v19h15V74m12 0v19h15V74" /><circle cx="54" cy="23" r="3" fill="#343f49" /><circle cx="75" cy="23" r="3" fill="#343f49" /><path d={jenis==="kardus"?"M60 42v31m-22-18h53":"M46 48q20-8 38 0m-38 11q20-8 38 0"} stroke="#875c38" /></g>;
  } else if(jenis==="vakum") {
    isi=<><ellipse cx="61" cy="61" rx="42" ry="23" fill="#91c5d9" /><ellipse cx="61" cy="55" rx="42" ry="22" fill="#d8f1fa" /><circle cx="61" cy="51" r="9" fill="#5d96b0" /><path d="M23 72L12 81m87-9 12 9M10 32h7m-1 11h6m80-19h7" /><path d="M40 20h37l-6-5m6 5-6 5" fill="none" stroke="#30988b" /></>;
  } else if(jenis==="lengan"||jenis==="pengecat") {
    isi=<><path d="M15 83h60v10H15Z" fill="#91c5d9" /><path d="M43 82L29 46l27-26 32 22" fill="none" stroke="#f0b45d" strokeWidth="16" /><circle cx="29" cy="46" r="9" fill="#b7dce9" /><circle cx="56" cy="20" r="8" fill="#b7dce9" /><path d="M88 42l10-5 8 12m-18-7 3 13 11 3" fill="none" />{jenis==="pengecat" ? <><path d="M99 50l7 7m-1-9 7 7m-1-9 7 7" stroke="#ec805e" /><path d="M81 76l9-12h23l10 12v12H78V76Z" fill="#ec805e" /><path d="M93 68h16l6 8H87Z" fill="#e7faff" /><circle cx="87" cy="89" r="5" fill="#5c7085" /><circle cx="115" cy="89" r="5" fill="#5c7085" /></> : <><rect x="91" y="70" width="25" height="18" fill="#cfaa78" /><path d="M80 90h43" /></>}</>;
  } else if(jenis==="drone") {
    isi=<><g transform="translate(25 -6)"><Alat jenis="drone" /></g><path d="M55 62v9m20-9v9" /><rect x="47" y="71" width="37" height="24" fill="#d5ad73" /><path d="M65 72v23" /></>;
  } else if(jenis==="traktor") {
    isi=<><path d="M17 61h18V27h40v34h25l11 19H17Z" fill="#f0b45d" /><path d="M43 34h24v26H43Z" fill="#e7faff" /><circle cx="39" cy="78" r="17" fill="#5c7085" /><circle cx="96" cy="83" r="11" fill="#5c7085" /><path d="M110 70l13 17m-13 4h17M57 27V15m-10 3q10-9 20 0" fill="none" stroke="#2478b6" /></>;
  } else if(jenis==="mobil") {
    isi=<><path d="M12 54l20-27h52l22 27 12 6v20H8V60Z" fill="#8bcac1" /><path d="M36 34h43l15 20H22Z" fill="#e7faff" /><circle cx="30" cy="80" r="11" fill="#5c7085" /><circle cx="96" cy="80" r="11" fill="#5c7085" /><path d="M60 27V15m-10 3q10-9 20 0" fill="none" stroke="#2478b6" /></>;
  } else if(["bus","kereta"].includes(jenis)) {
    isi=<><rect x="10" y="28" width="105" height="47" rx="12" fill="#8bcac1" /><path d="M19 36h29v23H19Zm36 0h25v23H55Zm32 0h20v23H87Z" fill="#e7faff" /><circle cx="31" cy="78" r="10" fill="#5c7085" /><circle cx="94" cy="78" r="10" fill="#5c7085" /><path d="M65 28V16m-10 3q10-9 20 0m-26-5q16-14 32 0" fill="none" stroke="#2478b6" />{jenis==="kereta"&&<path d="M5 94h120m-109-6v10m26-10v10m26-10v10m26-10v10m26-10v10" />}</>;
  } else {
    isi=<><rect x="43" y="10" width="45" height="26" rx="10" fill="#d5f0fa" /><circle cx="56" cy="22" r="3" fill="#284866" /><circle cx="75" cy="22" r="3" fill="#284866" /><path d="M48 38h35l11 43H37Z" fill="#8fc9d9" /><circle cx="46" cy="88" r="7" fill="#5c7085" /><circle cx="84" cy="88" r="7" fill="#5c7085" />{jenis==="makanan"?<><path d="M28 62h73" strokeWidth="5" /><path d="M47 60a15 13 0 0130 0Z" fill="#ffcf70" /></>:jenis==="gudang"?<><rect x="19" y="48" width="36" height="27" fill="#d5ad73" /><path d="M37 49v25" /></>:<path d="M84 45l21-13V17M46 45L25 64" fill="none" strokeWidth="8" />}</>;
  }
  return <g stroke="#284866" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">{isi}</g>;
}
