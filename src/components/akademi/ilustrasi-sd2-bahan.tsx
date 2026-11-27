import type { ReactNode } from "react";
import { IlustrasiNavigator } from "./ilustrasi-navigator";
import { IlustrasiQcSdAwal } from "./ilustrasi-qc-sd-awal";

const garis = { strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Kain({ handuk, lap }: { handuk?: boolean; lap?: boolean }) {
  const warna = handuk ? "#71c8d9" : lap ? "#f1ae65" : "#c9adf1";
  return (
    <g {...garis} stroke="#3d4c68">
      <path d="M24 23Q62 33 102 19L111 75Q77 88 32 78Z" fill={warna} />
      <path d="M32 78Q57 70 80 78L84 88Q59 86 32 78Z" fill="#fff" fillOpacity=".65" />
      <path d="M27 33Q60 43 103 30M30 68Q69 78 109 64" fill="none" stroke="#fff" strokeOpacity=".75" />
      {handuk
        ? <path d="M33 78V85M40 80V88M47 81V89M54 82V90M61 82V90" fill="none" />
        : <path d="M47 45L96 39M47 52L97 46M47 59L98 53M56 43L58 63M69 42L71 62M82 40L84 60" fill="none" strokeOpacity=".36" />}
    </g>
  );
}

function Logam({ berkarat = false }: { berkarat?: boolean }) {
  return (
    <g transform="rotate(-32 65 50)" {...garis} stroke={berkarat ? "#744220" : "#435a6e"}>
      <path d="M25 36H40L47 43H99L109 50 99 57H47L40 64H25Z" fill={berkarat ? "#b96638" : "#a9c2d3"} />
      <path d="M29 45H45M53 47H92" fill="none" stroke={berkarat ? "#8a4928" : "#f3fbff"} />
      {berkarat && <path d="M35 56L37 58M61 49L64 53M77 46L81 50M90 52L94 54" fill="none" stroke="#efb17c" />}
    </g>
  );
}

function EsBatu({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 52)`} {...garis} stroke="#4a81a2">
      <path d="m-20-11 25-11 17 10v27L-3 24l-17-11Z" fill="#91d7f3" />
      <path d="m-20-11 17 11 25-12M-3 0v24" fill="none" />
      <path d="m-12-11 14-6m-13 15v11m16 3 11-4" fill="none" stroke="#effbff" strokeWidth="2.3" />
    </g>
  );
}

function Genangan({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 73)`} {...garis} stroke="#4c88a8">
      <path d="M-23 0q3-6 11-5q7-7 14-3q11-2 17 4q8 4 4 9q-7 5-26 5q-18 0-20-6Z" fill="#92d6ec" />
      <path d="M-14 2q11-3 24-1m-7 5 10-1" fill="none" stroke="#e5f9ff" strokeWidth="2.2" />
      <path d="M-4-16q-4-4 2-9q7 6 3 10q-3 2-5-1Z" fill="#83cde4" strokeWidth="1.9" />
    </g>
  );
}

function PerubahanAir({ beku = false }: { beku?: boolean }) {
  return (
    <g {...garis}>
      {beku ? <Genangan x={27} /> : <EsBatu x={27} />}
      <path d="M55 53h21m-7-7 7 7-7 7" fill="none" stroke="#526b7c" />
      {beku ? <EsBatu x={101} /> : <Genangan x={101} />}
    </g>
  );
}

export const ILUSTRASI_BAHAN_SD2: Record<string, ReactNode> = {
  "bahan-katun": <Kain />,
  "bahan-handuk": <Kain handuk />,
  "bahan-lap-dapur": <Kain lap />,
  "bahan-karet-lembar": (
    <g {...garis} stroke="#3e3c49">
      <path d="M15 56L56 40Q82 28 93 46Q104 63 114 63L79 81Q60 80 55 65Q51 53 15 66Z" fill="#727383" />
      <path d="M15 56Q54 44 65 53Q78 61 79 72Q80 77 93 74L114 63Q99 65 93 53Q86 43 80 42Q71 38 56 44Z" fill="#9597a5" />
      <path d="M20 57Q53 47 60 54M92 66Q96 71 103 67" fill="none" stroke="#c5c8d3" />
    </g>
  ),
  "bahan-genting": (
    <g {...garis} stroke="#8b432f">
      <path d="M19 56L42 24Q50 17 62 25L100 31L114 70Q105 84 96 77L45 71Q29 67 19 73Z" fill="#bb5d43" />
      <path d="M19 56L42 24Q50 17 62 25L100 31L114 70Q106 76 97 69L58 64Q46 57 40 62Q30 71 19 63Z" fill="#e58f6e" />
      <path d="M39 58L58 26M68 63L76 29M94 68L91 31" fill="none" />
      <path d="M48 31L34 53M81 36L76 58" stroke="#f9b695" />
    </g>
  ),
  "bahan-ban-sepeda": (
    <g {...garis} transform="rotate(-24 65 51)" fill="none">
      <ellipse cx="68" cy="51" rx="32" ry="42" stroke="#2e3744" strokeWidth="13" />
      <ellipse cx="63" cy="51" rx="29" ry="41" stroke="#666f7e" strokeWidth="8" />
      <path d="M47 17L50 23M35 27L39 33M33 45L37 50M35 64L39 70M43 78L47 83M77 18L80 23M87 32L91 38M89 52L93 58M85 72L89 78" stroke="#b5bfcb" />
    </g>
  ),
  "bahan-logam-baru": <Logam />,
  "bahan-logam-berkarat": <Logam berkarat />,
  "bahan-baut-berkarat": (
    <g {...garis} transform="rotate(-32 65 50)" stroke="#744220">
      <path d="M27 38L37 31 50 37V62L37 69 27 62Z" fill="#c88556" />
      <path d="M50 43H101L107 50 101 57H50Z" fill="#b96638" />
      <path d="M57 44L52 56M66 44L61 56M75 44L70 56M84 44L79 56M93 44L88 56M102 44L97 56" fill="none" stroke="#efb17c" />
      <path d="M34 45L39 49M40 57L44 53" fill="none" />
    </g>
  ),
  "bahan-kertas-dilipat": (
    <g {...garis} stroke="#547082">
      <path d="M19 48L77 20 111 45 55 82Z" fill="#bfe3f5" />
      <path d="M19 48L55 82 59 38Z" fill="#e8f8ff" />
      <path d="M59 38L77 20 111 45 55 82Z" fill="#c9eafa" />
      <path d="M58 39L55 82" fill="none" />
    </g>
  ),
  "bahan-kedelai-jadi-tempe": (
    <>
      <g transform="translate(2 27) scale(.52)"><IlustrasiQcSdAwal id="qc-biji-kedelai" /></g>
      <path d="M49 51H68M62 45L68 51 62 57" fill="none" stroke="#4d687c" {...garis} />
      <g transform="translate(59 18) scale(.65)"><IlustrasiNavigator id="navigator-tempe" /></g>
    </>
  ),
  "bahan-es-mencair": <PerubahanAir />,
  "bahan-air-membeku": <PerubahanAir beku />,
  "bahan-cokelat-meleleh": (
    <g {...garis} stroke="#633d38">
      <path d="M44 62q13-12 32-11q18-4 29 7q16 4 11 14q-7 10-26 10H49q-17-2-16-9Z" fill="#995739" />
      <path d="m18 38 38-11 24 21-9 21-30 7-24-23Z" fill="#875039" />
      <path d="m18 38 38-11 24 21-40 12Z" fill="#b17753" />
      <path d="m30 35 22 20m-9-24 21 20m-34 1 40-12" fill="none" stroke="#784736" strokeWidth="2.1" />
      <path d="M51 70q10 2 16-4q9-7 19-1q10 3 17 0m-23 10q12 1 19-3" fill="none" stroke="#d09770" strokeWidth="2.1" />
    </g>
  ),
  "bahan-lilin-lembek": (
    <g {...garis} stroke="#8c6953">
      <path d="M34 75h66" fill="none" stroke="#c5aa8d" />
      <path d="M47 36q13-7 26 0v17q1 9 12 12l6 4q4 5-3 7q-16 6-31-2q-16-8-14-24Z" fill="#e8c27e" />
      <path d="M47 36q5-6 15-6q10 0 11 6q-2 6-14 7q-11 0-12-7Z" fill="#f6dfa6" />
      <path d="M60 34q4-5 2-12" fill="none" stroke="#68564f" strokeWidth="2.2" />
      <path d="M50 48q1 16 14 19q10 3 16 2m21-11q-5-5-1-11m-9 8q-5-5-1-11" fill="none" stroke="#b88b60" strokeWidth="2.05" />
    </g>
  ),
  "bahan-mentega-lunak": (
    <g {...garis} stroke="#a68448">
      <ellipse cx="63" cy="73" rx="48" ry="15" fill="#eff1db" stroke="#829789" />
      <path d="M30 61q9-11 18-10l14 4q11-5 23 6l11 4q2 7-9 9l-38 1q-17-2-19-14Z" fill="#f4cb63" />
      <path d="M40 63q10-8 20-3q10 0 17 5m-28 3q12 2 24-1" fill="none" stroke="#fff1ac" strokeWidth="3" />
      <path d="m60 60 21-10l8-9 8 4-12 11-18 9Z" fill="#a9c1c8" stroke="#526876" />
      <path d="m88 41 17-17q8-5 11 2q1 3-3 7L99 47Z" fill="#a78262" stroke="#626070" />
      <path d="M26 54q5-4 9-3" fill="none" stroke="#d4a24d" strokeWidth="2" />
    </g>
  ),
  "bahan-beras-mentah": (
    <g {...garis} stroke="#526772">
      <path d="M21 52h88q-1 34-25 37H46q-23-4-25-37Z" fill="#88b5b6" />
      <ellipse cx="65" cy="52" rx="44" ry="16" fill="#d8e9d7" />
      <path d="M27 50q10-6 24-9q10-9 22-6q11 5 24 7l5 10q-12 11-38 11q-27 0-37-13Z" fill="#eee2bd" stroke="#b1a585" strokeWidth="1.6" />
      {[[36,50,-28],[47,47,24],[58,43,-19],[67,40,21],[78,45,-24],[88,48,10],[97,50,-19],[48,56,-24],[60,52,24],[72,49,-14],[84,55,24],[58,59,-6],[70,57,-24],[77,56,24],[39,54,16]].map(([x,y,a])=>(
        <ellipse key={x+":"+y} cx={x} cy={y} rx="4.2" ry="1.45" transform={`rotate(${a} ${x} ${y})`} fill="#fff7df" stroke="#a99a77" strokeWidth=".85" />
      ))}
      <path d="M34 70q8 10 15 12m31 0q11-4 15-11" fill="none" stroke="#c5e0db" strokeWidth="2" />
    </g>
  ),
  "bahan-biji-jagung": (
    <g {...garis} stroke="#a56b36">
      <path d="M20 70q19-11 48-10q26 0 43 12q-12 13-44 13q-29 0-47-15Z" fill="#e8debf" stroke="#a79b7b" strokeWidth="2.2" />
      {[[30,63,-25],[45,52,9],[62,48,-12],[76,54,21],[91,61,38],[44,69,-33],[62,67,8],[80,70,25],[99,72,37]].map(([x,y,a])=>(
        <g key={x+":"+y} transform={`translate(${x} ${y}) rotate(${a})`}>
          <path d="M-7-5q3-5 10-5q7 1 7 6q-1 6-8 13q-4 1-7-4Z" fill="#f1b950" strokeWidth="1.8" />
          <path d="M-3-4q3-3 8-3" fill="none" stroke="#ffdf87" strokeWidth="1.5" />
        </g>
      ))}
    </g>
  ),
  "bahan-sate-matang": (
    <g {...garis} stroke="#6f4a37">
      <ellipse cx="65" cy="69" rx="50" ry="16" fill="#e6efe7" stroke="#92a899" strokeWidth="2" />
      <path d="m19 81 89-48m-79 56 89-47" fill="none" stroke="#a88759" strokeWidth="2.8" />
      <path d="m32 67 8-9 11 1 4 8-7 9-12-1Zm18-9 5-11 11-1 6 8-8 9-9 1Zm17-11 7-12 12 1 4 7-8 10-10 1Zm11 13 7-10 11-1 5 8-7 10-12 1Zm-19 11 7-10 11 1 5 8-7 10-12-1Zm-19 11 6-9 12-1 4 8-8 8-10 1Z" fill="#a66f4c" />
      <path d="m39 65 8 4m11-14 7 3m11-15 7 2m5 12 7 4m-27 7 7 4m-26 8 7 3" fill="none" stroke="#70462f" strokeWidth="2.1" />
    </g>
  ),
};
