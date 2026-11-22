"use client";

import type { CSSProperties, ReactNode } from "react";

/** Concrete early-years objects. Each identifier names a visible feature, never an answer state. */
export const ILUSTRASI_AWAL_IDS = [
  "polong", "anggur", "roda", "keju", "lambung", "gelas", "talenan",
  "bahan-kayu", "bahan-logam", "bahan-plastik", "bahan-kaca", "jas-hujan", "jaket",
  "pot-jendela", "pot-teras", "pot-lemari", "pot-kotak", "pot-kebun", "pot-gudang", "pot-kolong",
  "bumi-siang", "bumi-malam", "bola-siang", "bola-malam",
  "ikan-sungut", "ikan-siput", "hiu-goblin", "paus-sperma", "gurita-dumbo", "udang-palung", "cumi-raksasa",
  "robot-kepala", "robot-badan", "robot-tangan", "robot-kaki",
  "boneka-kepala", "boneka-badan", "boneka-tangan", "boneka-kaki",
  "robot-tanpa-kepala", "robot-tanpa-badan", "robot-tanpa-tangan", "robot-tanpa-kaki",
  "boneka-tanpa-kepala", "boneka-tanpa-badan", "boneka-tanpa-tangan", "boneka-tanpa-kaki",
  "ciri-kakiberbulu", "ciri-sayapsirip", "ciri-putihsalju", "ciri-ekorpipih", "ciri-sisikikan", "ciri-hidungtutup",
  "ciri-telingabesar", "ciri-kulitkering", "ciri-warnapasir", "ciri-jarilengket", "ciri-paruhbesar", "ciri-warnakayu",
].map((id) => `awal-${id}`);
const dikenal = new Set(ILUSTRASI_AWAL_IDS);
export const isIlustrasiAwal = (gambar: string) => dikenal.has(gambar);
const INK = "#16364b";

function Pot({ x = 65, y = 69, scale = 1 }: { x?: number; y?: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M-16 0H16L12 22H-12Z" fill="#d88049" stroke="#7d492f" strokeWidth="2" />
    <path d="M-19-3H19V3H-19Z" fill="#efaa68" stroke="#7d492f" strokeWidth="2" />
    <path d="M0-4V-33" stroke="#39863e" strokeWidth="4" />
    <path d="M0-16Q-24-36-24-15Q-16-4 0-12M0-26Q24-44 22-24Q14-15 0-22" fill="#62bb53" stroke="#39863e" strokeWidth="2" />
  </g>;
}
function World({ night, torch }: { night: boolean; torch: boolean }) {
  return <>
    <rect width="130" height="100" rx="12" fill="#192b50" />
    {torch ? <g><path d="M5 43H22V58H5Z" fill="#90a4b8" /><path d="M22 39L32 34V66L22 61Z" fill="#d6e0ea" /></g> : <circle cx="18" cy="50" r="13" fill="#ffd54c" />}
    {[32,46,60].map((y) => <path key={y} d={`M34 ${y}H48l-4-3m4 3-4 3`} fill="none" stroke="#ffe18b" strokeWidth="2.5" />)}
    <circle cx="88" cy="50" r="33" fill="#4ea8e4" stroke="#d6ecff" strokeWidth="2" />
    <path d="M72 22L83 25 82 38 67 43 70 54 81 60 78 77 68 74 59 55 60 35ZM96 22L108 30 109 41 102 45 105 57 116 60 111 72 99 78 94 65 87 59 93 48 89 37Z" fill="#79c875" />
    <path d="M88 17A33 33 0 0 1 88 83Z" fill="#09142d" opacity=".78" />
    <path d="M78 10Q105 4 118 24l-1-8m1 8-8-1" fill="none" stroke="#fff" strokeWidth="2" />
    <g transform={`translate(${night ? 106 : 68} 50)`}>
      <circle r="11" fill="#fff" stroke="#f76c5e" strokeWidth="2" />
      <path d="M-7 1L0-6 7 1V8H-7Z" fill="#f76c5e" /><path d="M-2 8V2H2V8" fill="#fff" />
    </g>
  </>;
}
function BodyPart({ part, robot }: { part: string; robot: boolean }) {
  const fill = robot ? "#a7d0dc" : "#f1bc91";
  if (part === "kepala") return robot ? <g><rect x="40" y="10" width="50" height="30" rx="8" fill={fill} stroke={INK} strokeWidth="2.5" /><path d="M65 10V3" stroke={INK} strokeWidth="2" /><circle cx="65" cy="3" r="3" fill="#fdc94a" /><circle cx="53" cy="23" r="4" fill={INK} /><circle cx="77" cy="23" r="4" fill={INK} /><path d="M56 33H74" stroke={INK} strokeWidth="3" /></g> : <g><circle cx="65" cy="24" r="17" fill={fill} stroke={INK} strokeWidth="2" /><path d="M49 20Q49 1 65 7Q84 4 81 22L74 15 68 18 59 13Z" fill="#725142" /><circle cx="59" cy="24" r="2" fill={INK} /><circle cx="72" cy="24" r="2" fill={INK} /><path d="M59 31Q65 36 72 31" fill="none" stroke={INK} strokeWidth="2" /></g>;
  if (part === "badan") return <g><path d={robot ? "M43 44H87V74H43Z" : "M49 43Q65 38 81 43L86 73H44Z"} fill={robot ? fill : "#f08a9b"} stroke={INK} strokeWidth="2.5" />{robot ? <><rect x="52" y="51" width="25" height="13" rx="3" fill="#f9ce52" /><circle cx="54" cy="69" r="2" fill="#ee7667" /><circle cx="63" cy="69" r="2" fill="#4b8cbd" /></> : <path d="M56 47L65 53 74 47" fill="none" stroke="#fff" strokeWidth="3" />}</g>;
  if (part === "tangan") return <g stroke={INK} strokeWidth="2.5" fill={fill}><path d="M40 47Q31 43 27 52L19 66Q17 73 24 76Q30 77 34 69L43 55Z" /><path d="M90 47Q99 43 103 52L111 66Q113 73 106 76Q100 77 96 69L87 55Z" />{robot && <><circle cx="31" cy="60" r="4" fill="#698d9d" /><circle cx="99" cy="60" r="4" fill="#698d9d" /></>}</g>;
  return <g fill={robot ? fill : "#8ab5df"} stroke={INK} strokeWidth="2.5"><path d="M48 76H60V91H42V86H48Z" /><path d="M70 76H82V86H88V91H70Z" /></g>;
}
function Body({ kind, part, missing }: { kind: string; part: string; missing: boolean }) {
  const robot = kind === "robot";
  const parts = ["kepala", "badan", "tangan", "kaki"];
  if (!missing) {
    const translate: Record<string, string> = { kepala: "translate(-22 18) scale(1.35)", badan: "translate(-22 -29) scale(1.35)", tangan: "translate(-7 -18) scale(1.1)", kaki: "translate(-78 -138) scale(2.2)" };
    return <g transform={translate[part]}><BodyPart part={part} robot={robot} /></g>;
  }
  const slots: Record<string, [number, number, number, number][]> = { kepala: [[39, 8, 52, 33]], badan: [[42, 43, 46, 32]], tangan: [[17, 44, 27, 34], [86, 44, 27, 34]], kaki: [[40, 76, 22, 18], [68, 76, 22, 18]] };
  return <><rect x="5" y="1" width="120" height="98" rx="12" fill="#f0f7fc" />{parts.filter((p) => p !== part).map((p) => <BodyPart key={p} part={p} robot={robot} />)}{slots[part].map(([x,y,w,h], i) => <rect key={i} x={x} y={y} width={w} height={h} rx="5" fill="#fff6d9" stroke="#c98b24" strokeWidth="2" strokeDasharray="4 3" />)}</>;
}

/** One scalable SVG; parent cards provide the localized accessible name and optional listen button. */
export function GambarIlustrasiAwal({ gambar, s, style, className }: { gambar: string; s: number; style?: CSSProperties; className?: string }) {
  const id = gambar.replace(/^awal-/, "");
  let art: ReactNode = null;
  if (id === "polong") art = <g stroke="#267343" strokeWidth="2.5"><path d="M14 71Q29 18 112 25Q100 78 22 81Z" fill="#43a94c" /><path d="M21 72Q45 38 105 31Q81 78 21 72Z" fill="#c7e880" />{[35,56,77,96].map((x,i) => <circle key={x} cx={x} cy={63-i*8} r="9" fill="#73bf45" />)}<path d="M110 26Q117 12 108 13" fill="none" /></g>;
  else if (id === "anggur") art = <g><path d="M64 22Q62 9 71 6" fill="none" stroke="#5e8048" strokeWidth="5" /><path d="M68 16Q92 0 96 18Q81 28 68 16" fill="#68a54f" /><ellipse cx="65" cy="57" rx="31" ry="34" fill="#9463bd" stroke="#62428f" strokeWidth="3" /><ellipse cx="52" cy="41" rx="8" ry="11" fill="#c6a1e0" /></g>;
  else if (id === "roda") art = <g><circle cx="65" cy="50" r="39" fill="#fff" stroke="#384d59" strokeWidth="8" /><circle cx="65" cy="50" r="31" fill="none" stroke="#a6bac7" strokeWidth="3" />{Array.from({length:8},(_,i) => <path key={i} d="M65 20V80" stroke="#698692" strokeWidth="2" transform={`rotate(${i*22.5} 65 50)`} />)}<circle cx="65" cy="50" r="6" fill="#fcba3c" stroke={INK} strokeWidth="2" /></g>;
  else if (id === "keju") art = <g><path d="M17 85L65 12 114 85Z" fill="#ffda59" stroke="#b77e16" strokeWidth="4" strokeLinejoin="round" /><circle cx="60" cy="44" r="6" fill="#eaa72b" /><circle cx="43" cy="71" r="7" fill="#eaa72b" /><circle cx="83" cy="72" r="6" fill="#eaa72b" /></g>;
  else if (id.startsWith("pot-")) {
    const place=id.slice(4), dark=["lemari","kotak","gudang","kolong"].includes(place);
    art=<><rect width="130" height="100" rx="12" fill={dark?"#303d55":"#dff2fa"} />
      {place==="jendela"&&<><rect x="8" y="5" width="114" height="67" rx="3" fill="#8dd3f6" stroke="#fcfcf5" strokeWidth="7" /><circle cx="101" cy="22" r="10" fill="#ffd650" /><path d="M65 6V70M9 39H121" stroke="#fff" strokeWidth="5" /><path d="M0 83H130" stroke="#a87b55" strokeWidth="11" /></>}
      {place==="teras"&&<><path d="M0 27L65 3 130 27Z" fill="#ca7464" /><path d="M12 27V94M118 27V94" stroke="#b59065" strokeWidth="8" /><path d="M0 88H130" stroke="#d2bb94" strokeWidth="18" /><circle cx="99" cy="47" r="9" fill="#ffce4c" /></>}
      {place==="kebun"&&<><circle cx="106" cy="18" r="10" fill="#ffd54d" /><path d="M0 71Q30 56 65 70T130 68V100H0Z" fill="#90cd70" /><path d="M5 46V82M25 43V82M105 43V82M125 46V82M0 55H34M98 55H130" stroke="#b89468" strokeWidth="6" /></>}
      {place==="lemari"&&<><rect x="12" y="8" width="106" height="86" rx="3" fill="#54483e" stroke="#bca27e" strokeWidth="7" /><path d="M17 81H113M34 13V80" stroke="#8e7658" strokeWidth="4" /><path d="M117 8L129 17V93L117 94" fill="#866d52" /></>}
      {place==="kotak"&&<><path d="M13 25H117V94H13Z" fill="#95744f" stroke="#ccac79" strokeWidth="5" /><path d="M13 25L33 8H103L117 25Z" fill="#bd996b" /><path d="M65 10V23" stroke="#75583b" strokeWidth="3" /></>}
      {place==="gudang"&&<><path d="M8 9V92M122 9V92M8 29H122M8 91H122" stroke="#8a94a0" strokeWidth="5" /><path d="M15 10H42V27H15ZM88 7H113V27H88Z" fill="#b68a5c" /><path d="M20 15H36M94 14H108" stroke="#e5c28d" strokeWidth="2" /></>}
      {place==="kolong"&&<><path d="M3 46H127V64H3Z" fill="#b28a69" /><path d="M10 60V98M120 60V98" stroke="#a87b56" strokeWidth="8" /><path d="M7 31Q7 25 16 25H118V46H7Z" fill="#8da9d6" /><rect x="15" y="25" width="32" height="15" rx="7" fill="#f7f3e9" /></>}
      <Pot x={65} y={place==="kolong"?85:69} scale={place==="kolong"?.45:.8}/>
    </>;
  } else if (/^(robot|boneka)-(tanpa-)?/.test(id)) {
    const [kind,...rest]=id.split("-");art=<Body kind={kind} missing={rest[0]==="tanpa"} part={rest.at(-1)!}/>;
  } else if (["bumi-siang","bumi-malam","bola-siang","bola-malam"].includes(id)) art=<World night={id.endsWith("malam")} torch={id.startsWith("bola")}/>;
  else if (id === "jas-hujan" || id === "jaket") {
    const rain=id==="jas-hujan";art=<g stroke={INK} strokeWidth="2.5" strokeLinejoin="round">
      {rain&&<path d="M46 30Q42 1 65 5Q88 1 84 30L76 36H54Z" fill="#ffdc54"/>}
      <path d="M44 28L25 35 12 67 28 74 39 55 36 94H94L91 55 102 74 118 67 105 35 86 28Z" fill={rain?"#ffd54d":"#5c78b6"}/>
      <path d="M65 33V93" stroke={rain?"#b7891a":"#d8e4fa"}/>
      {rain?<><path d="M48 66H58V79H47ZM73 66H83V79H72Z" fill="#f0ba31"/><path d="M56 31L65 38 74 31" fill="none"/></>:<><path d="M44 32L51 17H79L86 32" fill="#b4c5e3"/>{[45,59,73,87].map(y=><path key={y} d={`M39 ${y}H91`} stroke="#324e84"/>)}<path d="M24 47L35 51M17 61L29 65M95 51L106 47M101 65L113 61" stroke="#324e84"/></>}
    </g>;
  } else if (id === "lambung") art=<><path d="M45 6Q65 15 85 6L108 25 103 93H27L22 25Z" fill="#f1e5dc" stroke="#c5b1a8" strokeWidth="2"/><path d="M65 14V41Q76 34 85 45Q104 75 80 82Q65 86 58 73Q53 62 42 74" fill="#ef928a" stroke="#ac4d58" strokeWidth="4" strokeLinecap="round"/><path d="M73 49Q90 59 82 71M66 53Q80 61 73 74" fill="none" stroke="#c76973" strokeWidth="2"/></>;
  else if (id==="gelas" || id==="bahan-kaca") art=<><rect x="21" y="22" width="35" height="57" fill="#efb759"/><rect x="56" y="22" width="51" height="57" fill="#81bd91"/>{id==="gelas"?<g><path d="M37 11H93L86 88H44Z" fill="#d9f5ff" fillOpacity=".4" stroke="#5391ac" strokeWidth="3"/><ellipse cx="65" cy="11" rx="28" ry="5" fill="#eafaff" fillOpacity=".65" stroke="#5391ac" strokeWidth="2"/><path d="M48 25L51 73M84 24L81 50" stroke="#fff" strokeWidth="5" strokeLinecap="round"/></g>:<g><path d="M29 10H105V91H29Z" fill="#e2f7ff" fillOpacity=".35" stroke="#4d90a5" strokeWidth="3"/><path d="M38 25L63 13M39 43L92 17M73 83L96 70" stroke="#fff" strokeWidth="5"/></g>}</>;
  else if (id==="talenan"||id==="bahan-kayu") art=<g stroke="#936037" strokeWidth="2.5"><path d={id==="talenan"?"M48 24V8Q65 0 82 8V24H105V94H25V24Z":"M12 22L24 10H114V82L102 94H12Z"} fill="#d9ac72"/>{id==="talenan"&&<circle cx="65" cy="13" r="4" fill="#fff"/>}<path d="M36 38Q60 29 91 39M36 56Q49 46 76 53T95 57M35 76Q60 63 93 76M45 87Q72 76 92 87" fill="none"/><ellipse cx="65" cy="60" rx="12" ry="5" fill="none"/></g>;
  else if (id==="bahan-logam") art=<g><rect x="18" y="15" width="94" height="70" rx="5" fill="#aebdca" stroke="#4a6475" strokeWidth="3"/><path d="M32 74L73 20M52 80L97 20" stroke="#eff7fb" strokeWidth="8"/>{[[26,23],[104,23],[26,77],[104,77]].map(([x,y])=><g key={`${x},${y}`}><circle cx={x} cy={y} r="4" fill="#627e8f"/><path d={`M${x-2} ${y}H${x+2}`} stroke="#fff"/></g>)}</g>;
  else if (id==="bahan-plastik") art=<g><path d="M16 20Q65 4 114 20L108 81Q68 95 22 81Z" fill="#ef8a63" stroke="#bc6248" strokeWidth="3"/><path d="M18 21Q65 38 112 21M33 37L36 70" fill="none" stroke="#ffd3a8" strokeWidth="5" strokeLinecap="round"/><path d="M78 53L86 65H70Z" fill="none" stroke="#fff5e8" strokeWidth="3"/></g>;
  else if (["ikan-sungut","ikan-siput","hiu-goblin","paus-sperma","gurita-dumbo","udang-palung","cumi-raksasa"].includes(id)) {
    const dark=["ikan-siput","gurita-dumbo","udang-palung"].includes(id)?"#172b48":"#214c78";
    let animal:ReactNode;
    if(id==="ikan-sungut")animal=<><path d="M101 54L121 36V77Z" fill="#ad8269"/><ellipse cx="64" cy="60" rx="40" ry="28" fill="#9d785f"/><path d="M48 35Q53 3 77 14Q88 19 82 30" fill="none" stroke="#c6a780" strokeWidth="3"/><circle cx="82" cy="29" r="7" fill="#ffe683"/><circle cx="42" cy="53" r="5" fill="#fff"/><circle cx="40" cy="53" r="2"/><path d="M25 66L58 73 31 83Z" fill="#263648"/><path d="M31 68L35 76 39 70 43 79 47 72" fill="#fff3d4"/></>;
    else if(id==="ikan-siput")animal=<><path d="M78 40Q114 38 124 57Q110 50 96 68Q79 83 45 78L17 62Z" fill="#efc5c8"/><ellipse cx="43" cy="54" rx="29" ry="25" fill="#f4d6d8"/><path d="M57 58Q78 75 64 89Q47 76 43 63" fill="#e6afb9" stroke="#d995a4" strokeWidth="2"/><circle cx="28" cy="47" r="3" fill="#3e4554"/></>;
    else if(id==="hiu-goblin")animal=<><path d="M14 50L46 36 87 37 111 50 123 37 121 75 108 62 68 77 33 65Z" fill="#dda8b3"/><path d="M38 37L8 32 30 48M66 38L75 18 85 39M65 72L78 91 84 70" fill="#ce899c"/><path d="M25 57L49 55 38 68Z" fill="#ffe9df" stroke="#ac6b80" strokeWidth="2"/><circle cx="38" cy="47" r="3" fill={INK}/></>;
    else if(id==="paus-sperma")animal=<><path d="M12 30Q44 19 74 32Q91 42 110 58L124 47 119 73 103 65Q75 88 34 79Q13 76 12 65Z" fill="#91a5b5"/><path d="M60 66L72 87 84 70M87 43L94 34 99 50" fill="#607d92"/><circle cx="27" cy="55" r="3" fill={INK}/><path d="M15 69H53" stroke={INK} strokeWidth="2"/></>;
    else if(id==="gurita-dumbo")animal=<><path d="M37 39Q14 4 15 48Q21 65 39 59M91 39Q118 4 116 48Q109 66 90 59" fill="#e3b1a0" stroke="#ad7b7d" strokeWidth="2"/><ellipse cx="65" cy="55" rx="30" ry="34" fill="#f0c7af"/><path d="M38 71Q31 96 45 86Q49 97 58 87Q66 99 73 86Q87 98 90 74" fill="#f0c7af" stroke="#ad7b7d" strokeWidth="2"/><circle cx="53" cy="59" r="3" fill={INK}/><circle cx="77" cy="59" r="3" fill={INK}/></>;
    else if(id==="udang-palung")animal=<><path d="M33 31Q90 17 106 49Q113 78 69 84L79 72Q110 59 82 48L39 55Z" fill="#f3d5c4" stroke="#c5988c" strokeWidth="2"/>{[43,55,67,79].map((x,i)=><path key={x} d={`M${x} ${32+i*2}L${x+3} 53M${x+1} 53L${x-7} ${75-i*2}`} fill="none" stroke="#b88981" strokeWidth="2"/>)}<path d="M35 35Q22 15 8 22M36 40Q14 28 5 40" fill="none" stroke="#f9e1cc" strokeWidth="2"/><circle cx="36" cy="39" r="3" fill={INK}/></>;
    else animal=<><path d="M65 7Q38 32 44 54H86Q93 32 65 7Z" fill="#bf706c"/><path d="M43 36L20 51 44 51M87 36L111 51 86 51" fill="#da8e81"/><circle cx="53" cy="58" r="6" fill="#f7e1cf"/><circle cx="77" cy="58" r="6" fill="#f7e1cf"/><circle cx="53" cy="58" r="3" fill={INK}/><circle cx="77" cy="58" r="3" fill={INK}/>{[44,52,60,68,76,84].map((x,i)=><path key={x} d={`M${x} 65Q${x+(i%2?12:-12)} 85 ${x+(i%2?14:-14)} 95`} fill="none" stroke="#d88e82" strokeWidth="5" strokeLinecap="round"/>)}</>;
    art=<><rect width="130" height="100" rx="12" fill={dark}/>{animal}</>;
  } else if(id.startsWith("ciri-")) {
    const feature=id.slice(5);
    if(feature==="kakiberbulu")art=<><path d="M0 79L130 65V100H0Z" fill="#bde8fa"/><path d="M32 9H78L84 51 104 66 95 84H27L20 66 31 46Z" fill="#f8f4e6" stroke="#b9bdb6" strokeWidth="2"/>{[33,44,55,66,77,88].map(x=><path key={x} d={`M${x} 54l-5 18 7-8-2 17`} fill="none" stroke="#b9bdb6" strokeWidth="2"/>)}<path d="M29 87L110 80" stroke="#72badb" strokeWidth="3"/></>;
    else if(feature==="sayapsirip")art=<><path d="M0 73Q30 62 60 73T130 73V100H0Z" fill="#8ed2e8"/><ellipse cx="64" cy="49" rx="27" ry="40" fill="#243c4f"/><ellipse cx="65" cy="57" rx="17" ry="29" fill="#fff"/><path d="M39 37Q13 42 16 70Q36 66 44 48M89 37Q115 42 112 70Q92 66 84 48" fill="#35576a" stroke="#f7c650" strokeWidth="3"/><circle cx="56" cy="24" r="3" fill="#fff"/><circle cx="73" cy="24" r="3" fill="#fff"/><path d="M59 33H71L65 39Z" fill="#edab49"/></>;
    else if(["putihsalju","warnapasir","warnakayu"].includes(feature)) {
      const snow=feature==="putihsalju",sand=feature==="warnapasir",bg=snow?"#edf6fc":sand?"#e9cf95":"#9d7858",animal=snow?"#fffefa":sand?"#d6b57b":"#a58460";
      art=<><rect width="130" height="100" rx="12" fill={bg}/>{sand?<path d="M0 65Q30 35 65 65T130 65" fill="none" stroke="#cfad72" strokeWidth="3"/>:snow?<path d="M0 78Q30 57 63 77T130 73V100H0Z" fill="#fff"/>:<>{[20,45,80,110].map(x=><path key={x} d={`M${x} 5q-10 23 1 42t-2 45`} fill="none" stroke="#73553d" strokeWidth="4"/>)}</>}
      <ellipse cx="62" cy="66" rx="34" ry="19" fill={animal} stroke="#9e9988" strokeWidth="2"/><circle cx="92" cy="53" r="15" fill={animal} stroke="#9e9988" strokeWidth="2"/><path d="M84 42L83 24 95 40M45 77L40 91M80 77L85 91" fill={animal} stroke="#9e9988" strokeWidth="3"/><circle cx="98" cy="50" r="2.5" fill={INK}/></>;
    } else if(feature==="ekorpipih")art=<><path d="M0 68Q30 58 65 69T130 68V100H0Z" fill="#94d3ec"/><ellipse cx="45" cy="48" rx="28" ry="23" fill="#9e775b"/><circle cx="24" cy="30" r="17" fill="#b28b67"/><circle cx="17" cy="26" r="3" fill={INK}/><ellipse cx="92" cy="68" rx="29" ry="18" transform="rotate(22 92 68)" fill="#70513f" stroke="#49382e" strokeWidth="3"/><path d="M70 59L109 78M79 51L119 70M79 80L99 54M94 86L112 59" stroke="#b4967b" strokeWidth="2"/></>;
    else if(feature==="sisikikan")art=<><path d="M0 72Q30 63 65 72T130 72V100H0Z" fill="#bcdeee"/><path d="M95 50L124 27V77Z" fill="#e2ac60"/><ellipse cx="61" cy="51" rx="43" ry="28" fill="#e7c17c" stroke="#ad854e" strokeWidth="2"/>{[40,55,70,85].flatMap((x)=>[35,49,63].map(y=><path key={`${x}-${y}`} d={`M${x} ${y}q12 7 0 14`} fill="none" stroke="#a9783e" strokeWidth="2"/>))}<circle cx="29" cy="44" r="5" fill="#fff"/><circle cx="27" cy="44" r="2" fill={INK}/></>;
    else if(feature==="hidungtutup")art=<><rect width="130" height="100" rx="12" fill="#b9e2ec"/><ellipse cx="66" cy="57" rx="45" ry="32" fill="#a19caa" stroke="#6f6b80" strokeWidth="2"/><ellipse cx="65" cy="64" rx="35" ry="22" fill="#bdb5bf"/><path d="M45 54l12 3M74 57l12-3" stroke="#514d66" strokeWidth="4" strokeLinecap="round"/><path d="M37 44l7 7M93 44l-7 7" stroke="#f2b742" strokeWidth="3"/><circle cx="34" cy="35" r="5" fill="#fff"/><circle cx="95" cy="35" r="5" fill="#fff"/><path d="M0 83Q30 73 65 83T130 83V100H0Z" fill="#6bb8dc" opacity=".65"/></>;
    else if(feature==="telingabesar")art=<><rect width="130" height="100" rx="12" fill="#f5dfaf"/><path d="M37 63Q11 0 34 7L58 51M75 51L100 7Q123 0 94 64" fill="#dfb478" stroke="#ab8255" strokeWidth="2"/><path d="M35 22L48 51M98 22L85 51" stroke="#efc4b0" strokeWidth="8"/><path d="M36 55Q65 40 95 55L85 80 65 93 44 80Z" fill="#e5bd86"/><circle cx="51" cy="67" r="3" fill={INK}/><circle cx="79" cy="67" r="3" fill={INK}/><path d="M61 81H69L65 86Z" fill={INK}/></>;
    else if(feature==="kulitkering")art=<><path d="M0 76L28 50 55 68 92 43 130 74V100H0Z" fill="#d5b791"/><path d="M15 61Q40 17 86 34Q117 40 111 63L78 70 63 59 34 72Z" fill="#bdad65" stroke="#827848" strokeWidth="2"/>{[37,51,65,79,93].map((x,i)=><path key={x} d={`M${x} ${43+i%2*6}l6-5 6 5-6 6Z`} fill="#a29353" stroke="#746f46"/>)}<circle cx="104" cy="47" r="3" fill={INK}/></>;
    else if(feature==="jarilengket")art=<><rect x="75" y="0" width="50" height="100" fill="#aa845f"/><path d="M91 0Q78 24 96 48T92 100" fill="none" stroke="#725539" strokeWidth="4"/><path d="M22 85L53 54 62 35M52 57L82 49M53 57L83 70M49 60L61 83" fill="none" stroke="#65b06b" strokeWidth="12" strokeLinecap="round"/>{[[62,35],[82,49],[83,70],[61,83]].map(([x,y])=><circle key={`${x}-${y}`} cx={x} cy={y} r="9" fill="#bce188" stroke="#4c8e58" strokeWidth="2"/>)}</>;
    else if(feature==="paruhbesar")art=<><path d="M0 86H130" stroke="#93714e" strokeWidth="9"/><ellipse cx="50" cy="58" rx="22" ry="29" fill="#4a9668"/><circle cx="60" cy="31" r="21" fill="#34495d"/><path d="M72 17Q119 11 121 39Q99 52 73 46Z" fill="#f7b642" stroke="#bb7b25" strokeWidth="2"/><path d="M82 36H119" stroke="#b6732f" strokeWidth="2"/><circle cx="62" cy="27" r="4" fill="#fff"/><circle cx="63" cy="27" r="2" fill={INK}/><circle cx="112" cy="61" r="9" fill="#df6d55"/><path d="M112 51L118 45" stroke="#5f8a4d" strokeWidth="3"/></>;
  }
  return <svg aria-hidden="true" focusable="false" data-ilustrasi={gambar} className={className} viewBox="0 0 130 100" width={s*1.3} height={s} style={{display:"inline-block",flexShrink:0,...style}}>{art}</svg>;
}
