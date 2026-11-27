import type { ReactNode } from "react";

const KONTUR = { strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Air({ children }: { children: ReactNode }) {
  return <>
    <rect x="5" y="8" width="120" height="84" rx="13" fill="#e2f6f8" />
    <path d="M5 34Q23 27 42 33T82 33T125 32V79Q125 92 112 92H18Q5 92 5 79Z" fill="#b9e6eb" />
    <path d="M5 34Q23 27 42 33T82 33T125 32M16 74Q24 68 37 73M89 80Q101 74 115 78" stroke="#77bec8" strokeWidth="2.5" fill="none" />
    {children}
  </>;
}

function TelurIkan() {
  return <Air>
    <path d="M23 89Q42 66 76 50Q92 39 108 44Q93 73 23 89Z" fill="#7db58b" stroke="#518880" {...KONTUR} />
    {[[37, 68], [47, 53], [60, 65], [64, 46], [80, 56], [91, 43], [94, 65]].map(([x, y]) => <g key={x}>
      <circle cx={x} cy={y} r="9" fill="#ffdf8f" fillOpacity=".94" stroke="#ba874b" strokeWidth="1.7" />
      <circle cx={x + 1} cy={y + 1} r="3.3" fill="#d59443" />
      <circle cx={x - 3} cy={y - 3} r="1.7" fill="#fff6d3" />
    </g>)}
  </Air>;
}

function LarvaIkan() {
  return <Air><g stroke="#557a85" {...KONTUR}>
    <path d="M21 54Q26 44 40 43Q58 41 76 52Q94 62 113 43Q112 61 101 70Q86 77 71 65Q55 57 39 61Q26 65 21 54Z" fill="#e3f3dd" />
    <ellipse cx="45" cy="64" rx="17" ry="11" fill="#efc773" stroke="#ac8c5c" />
    <path d="M63 57Q67 54 73 57M76 60Q83 66 92 67" fill="none" stroke="#86a5a0" />
    <circle cx="30" cy="51" r="4.2" fill="#314952" stroke="none" />
    <circle cx="29" cy="50" r="1.1" fill="#fff" stroke="none" />
  </g></Air>;
}

function IkanTumbuh({ tahap }: { tahap: "burayak" | "muda" | "dewasa" }) {
  const burayak = tahap === "burayak";
  const dewasa = tahap === "dewasa";
  const corak = dewasa ? "#547d72" : "#7a9f80";
  return <Air><g transform={burayak ? "translate(17 21) scale(.72)" : dewasa ? undefined : "translate(9 8) scale(.86)"} stroke="#4b6c63" {...KONTUR}>
    <path d="M50 42Q62 24 78 34L86 46M56 63Q67 81 82 69L87 63" fill={corak} />
    <path d="M87 50L114 38Q111 53 117 69L88 62Z" fill={corak} />
    <path d="M18 54Q26 39 52 39Q77 38 95 51V61Q74 74 48 74Q28 73 18 58Z" fill={burayak ? "#afc7aa" : dewasa ? "#74987b" : "#97b390"} />
    <path d="M38 46Q48 52 40 65M50 57Q61 51 69 60Q57 67 53 63" fill="none" stroke={corak} />
    {dewasa && <path d="M58 43Q65 47 58 53M69 44Q75 50 68 55M79 47Q85 54 80 58M73 59Q80 65 74 69M63 64Q66 68 63 71" fill="none" strokeWidth="1.6" />}
    <circle cx="31" cy="52" r="3.8" fill="#233c41" stroke="none" />
    <circle cx="30" cy="51" r="1.1" fill="white" stroke="none" />
  </g></Air>;
}

function NyamukMuda({ tahap }: { tahap: "telur" | "jentik" | "pupa" }) {
  return <Air><g stroke="#4d5654" {...KONTUR}>
    {tahap === "telur" && <>
      <path d="M28 42Q56 36 98 41M23 52Q43 48 54 51M86 51Q96 48 108 48" stroke="#5aa7b1" fill="none" />
      <path d="M39 34Q65 45 91 34Q89 40 83 42Q60 47 45 41Z" fill="#74635b" />
      {[42, 49, 56, 63, 70, 77, 84, 91].map((x, i) => (
        <ellipse key={x} cx={x} cy={33 + Math.min(i, 7 - i)} rx="3.6" ry="7.3" transform={`rotate(${i - 4} ${x} 34)`} fill="#8f7f72" strokeWidth="1.5" />
      ))}
    </>}
    {tahap === "jentik" && <>
      <path d="M71 36L66 47M65 51Q53 55 59 65Q65 75 52 80Q42 83 34 75" fill="none" strokeWidth="8" />
      <path d="M64 51Q54 55 59 65Q64 75 51 80" fill="none" stroke="#a5a482" strokeWidth="3.6" />
      <ellipse cx="33" cy="73" rx="9" ry="7" fill="#93886d" />
      <path d="M29 72L23 68M35 68L33 63M60 60L67 61M58 74L63 78" fill="none" strokeWidth="1.5" />
      <circle cx="32" cy="74" r="1.6" fill="#353d3f" stroke="none" />
    </>}
    {tahap === "pupa" && <>
      <path d="M64 41L63 32M76 42L79 32" fill="none" strokeWidth="4" />
      <path d="M62 60Q58 69 69 75Q81 81 87 70Q90 66 86 64M85 69L95 67" fill="none" stroke="#685a50" strokeWidth="7" />
      <path d="M62 64Q62 73 73 76" fill="none" stroke="#ac947b" strokeWidth="2.7" />
      <ellipse cx="69" cy="52" rx="18" ry="14" fill="#94775f" />
      <path d="M57 49Q60 41 70 42" stroke="#d5ad7f" fill="none" />
      <circle cx="63" cy="56" r="3.3" fill="#393f41" stroke="none" />
    </>}
  </g></Air>;
}

function Pasir({ sungai, children }: { sungai?: boolean; children: ReactNode }) {
  return <>
    <rect x="4" y="7" width="122" height="86" rx="12" fill={sungai ? "#dcebd1" : "#e3f4fa"} />
    <path d="M4 37Q32 31 56 38T126 37V76H4Z" fill={sungai ? "#9fd1c0" : "#98d7ea"} />
    <path d="M4 61Q35 54 67 61T126 59V81Q126 93 114 93H16Q4 93 4 81Z" fill={sungai ? "#c6ab7d" : "#f0d192"} />
    <path d="M8 64Q35 58 52 63M91 63L112 63M14 82L23 85M96 80L104 81" stroke={sungai ? "#ab9269" : "#dcb47a"} strokeWidth="2.2" fill="none" />
    {children}
  </>;
}

function TelurPasir({ buaya = false }: { buaya?: boolean }) {
  return <g stroke="#9a7b56" {...KONTUR}>
    <ellipse cx="63" cy="73" rx="34" ry="15" fill={buaya ? "#b48856" : "#c79a66"} />
    {buaya && <path d="M24 71L66 82M31 83L78 61M49 88L100 71M71 86L102 78M24 76L55 62" fill="none" stroke="#875c3e" strokeWidth="3.1" />}
    {[[43, 72], [58, 57], [69, 71], [85, 70], [76, 56]].map(([x, y], i) =>
      <ellipse key={x} cx={x} cy={y} rx={buaya ? 7 : 9} ry={buaya ? 10 : 8.8} transform={buaya ? `rotate(${i % 2 ? -24 : 21} ${x} ${y})` : undefined} fill="#fff4d8" />)}
  </g>;
}

function PenyuBertelur() {
  return <Pasir>
    <g transform="translate(-6 15) scale(.72)"><TelurPasir /></g>
    <g stroke="#37685b" {...KONTUR}>
      <path d="M56 56Q47 42 33 44Q38 53 51 62M83 57Q92 47 105 52L96 67L83 68M55 67Q46 67 44 77Q56 81 63 70M78 63Q93 57 112 64Q113 71 91 77L78 71" fill="#77a786" />
      <path d="M89 49Q92 33 103 35Q115 38 110 46Q104 54 90 57Z" fill="#91be9b" />
      <ellipse cx="67" cy="58" rx="26" ry="17" transform="rotate(-12 67 58)" fill="#729064" />
      <path d="M46 57L58 50L69 50L83 44M57 51L59 63L73 68L87 60M69 50L74 57L87 60M74 57L73 68" fill="none" stroke="#b2b475" />
      <circle cx="105" cy="40" r="2.3" fill="#364c45" stroke="none" />
    </g>
  </Pasir>;
}

function Buaya({ tahap }: { tahap: "menetas" | "muda" | "dewasa" }) {
  const menetas = tahap === "menetas";
  const dewasa = tahap === "dewasa";
  const hewan = <g transform={dewasa ? undefined : menetas ? "translate(21 11) scale(.76)" : "translate(6 13) scale(.89)"} stroke="#526544" {...KONTUR}>
    <path d="M9 63Q28 68 46 51Q54 44 65 44L79 45Q82 34 91 36L101 42L120 43Q123 47 118 52L91 59Q80 66 63 65Q36 78 10 71Z" fill={menetas ? "#a4b878" : "#779760"} />
    <path d="M53 47L58 41L65 45L70 40L76 45M49 57L41 64L30 63M64 63L63 75L54 78M76 58L82 68L92 67M100 51L113 48" fill="none" />
    <path d="M108 51L106 55L102 52M99 54L96 57L93 55" fill="#f8edd4" strokeWidth="1.4" />
    <circle cx="90" cy="43" r="3.4" fill="#d7b76a" />
    <circle cx="90" cy="43" r="1.4" fill="#253c36" stroke="none" />
  </g>;
  if (tahap === "muda") return <Air>{hewan}<path d="M11 72Q23 68 38 74M94 72L118 68" fill="none" stroke="#70bbc2" strokeWidth="2.4" /></Air>;
  return <Pasir sungai>
    {dewasa && <g transform="translate(-5 30) scale(.73)"><TelurPasir buaya /></g>}
    {hewan}
    {menetas && <path d="M55 59L65 64L69 57L81 61L92 57Q92 84 74 85Q58 84 55 59Z" fill="#fff2cc" stroke="#9a7b56" {...KONTUR} />}
  </Pasir>;
}

export const ILUSTRASI_SIKLUS_AIR: Record<string, ReactNode> = {
  "qc-siklus-penyu-telur": <Pasir><TelurPasir /></Pasir>,
  "qc-siklus-penyu-bertelur": <PenyuBertelur />,
  "qc-siklus-ikan-telur": <TelurIkan />,
  "qc-siklus-ikan-larva": <LarvaIkan />,
  "qc-siklus-ikan-burayak": <IkanTumbuh tahap="burayak" />,
  "qc-siklus-ikan-muda": <IkanTumbuh tahap="muda" />,
  "qc-siklus-ikan-dewasa": <IkanTumbuh tahap="dewasa" />,
  "qc-siklus-nyamuk-telur": <NyamukMuda tahap="telur" />,
  "qc-siklus-nyamuk-jentik": <NyamukMuda tahap="jentik" />,
  "qc-siklus-nyamuk-pupa": <NyamukMuda tahap="pupa" />,
  "qc-siklus-buaya-telur": <Pasir sungai><TelurPasir buaya /></Pasir>,
  "qc-siklus-buaya-menetas": <Buaya tahap="menetas" />,
  "qc-siklus-buaya-muda": <Buaya tahap="muda" />,
  "qc-siklus-buaya-bertelur": <Buaya tahap="dewasa" />,
};
