import type { ReactNode } from "react";

function Ikan({ jenis }: { jenis: "lele" | "mas" | "badut" }) {
  const lele = jenis === "lele";
  const badut = jenis === "badut";
  const warna = lele ? "#718e95" : badut ? "#fc953b" : "#cba463";
  const gelap = lele ? "#395960" : badut ? "#8b4e39" : "#79623d";
  return <g stroke={gelap} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={lele ? "M86 54Q101 48 115 41Q119 58 113 68Q99 63 86 61Z" : "M89 48L118 31Q114 48 118 59L119 73L89 63Z"} fill={warna} />
    <path d={lele ? "M53 49L56 37Q70 39 79 48Z" : "M39 37Q56 23 81 29L91 45Z"} fill={warna} />
    <path d={lele
      ? "M12 55Q19 40 42 44Q68 43 95 51L99 59Q78 67 44 69Q20 69 12 61Z"
      : "M11 54Q25 30 53 32Q78 31 99 52V63Q79 80 53 79Q27 79 11 58Z"} fill={warna} />
    <path d="M43 57Q53 52 65 62Q54 71 44 69Z" fill={lele ? "#92a7a6" : "#eac47c"} />
    {lele && <path d="M18 56Q10 47 4 43M15 61Q9 62 4 69M25 65Q19 76 10 77M20 58Q10 52 5 53" fill="none" />}
    {badut && <path d="M34 38Q28 56 40 76L52 79Q43 59 47 33ZM70 35Q67 60 76 76L87 71Q79 56 82 41Z" fill="#fff7db" />}
    {jenis === "mas" && <path d="M51 40Q57 46 51 52M62 39Q69 46 62 52M74 43Q81 49 74 55M85 48Q91 54 84 60M69 53Q75 58 70 66M78 57Q84 64 77 70M56 70Q62 74 58 77" fill="none" stroke="#988049" strokeWidth="1.6" />}
    <circle cx="26" cy="51" r="4.4" fill="#26383d" stroke="none" />
    <circle cx="25" cy="50" r="1.3" fill="#fff" stroke="none" />
  </g>;
}

function KatakAmfibi({ kodok }: { kodok?: boolean }) {
  const land = kodok ? "#d1b88b" : "#cfe7a7";
  const warna = kodok ? "#aa854e" : "#75b55e";
  const gelap = kodok ? "#6f543c" : "#427747";
  return <g stroke={gelap} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={kodok ? "M19 78Q46 69 71 76T114 76" : "M12 76Q42 64 108 79L122 87L41 85Z"} fill={land} />
    {!kodok && <path d="M20 79Q45 78 79 84" fill="none" />}
    <path d={kodok ? "M31 52Q41 37 65 38Q90 37 96 58Q98 73 78 80H47Q25 74 31 52Z" : "M37 54Q42 39 67 38Q82 42 84 57Q86 68 67 71H51Q39 69 37 54Z"} fill={warna} />
    <path d={kodok ? "M32 61Q20 60 26 76L13 80M89 61Q100 59 102 75L115 81M43 69L38 81L29 83M77 69L86 82H96" : "M43 55L24 65L16 82M70 56L95 52L107 72M49 64L48 78L38 90M68 63L80 75L76 87"} fill="none" strokeWidth={kodok ? 6 : 4.5} />
    <path d="M36 49Q33 35 43 31Q45 21 55 24Q61 25 62 31H70Q74 22 81 25Q90 26 90 36Q98 43 91 53Q77 64 61 62Q45 63 36 49Z" fill={warna} />
    <path d="M43 49Q61 58 83 49" fill="none" strokeWidth="2" />
    {[54, 80].map(x => <g key={x}><circle cx={x} cy="37" r="5.5" fill={kodok ? "#edc784" : "#e6a74a"} /><circle cx={x} cy="37" r="2.6" fill="#253739" stroke="none" /></g>)}
    {kodok
      ? [[41, 59], [51, 67], [60, 72], [68, 66], [80, 70], [91, 61]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="2.5" fill="#7d6046" stroke="none" />)
      : [[16, 82], [107, 72], [38, 90], [76, 87]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="4" fill="#d4e48a" />)}
  </g>;
}

function Komodo() {
  return <g stroke="#645844" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 78Q30 79 42 55Q51 38 74 42L90 39Q98 30 117 35Q124 38 123 44Q115 53 96 50Q76 68 57 66Q30 84 7 78Z" fill="#9f9268" />
    <path d="M56 58L45 73L34 76M74 58L77 75L89 77M56 48L46 41L36 47M85 48L94 57L105 57" fill="none" strokeWidth="5" />
    <path d="M48 55Q66 45 81 49M57 60L60 55M66 57L70 51M74 54L77 51M99 47H116" fill="none" stroke="#c7b883" strokeWidth="1.7" />
    <path d="M121 45L128 47M128 47L130 44M128 47L130 49" fill="none" stroke="#ab655f" strokeWidth="1.8" />
    <circle cx="109" cy="38" r="2.7" fill="#333f3b" stroke="none" />
  </g>;
}

const GAMBAR: Record<string, ReactNode> = {
  "qc-komandan-ikan-lele": <Ikan jenis="lele" />,
  "qc-komandan-ikan-mas": <Ikan jenis="mas" />,
  "qc-komandan-ikan-badut": <Ikan jenis="badut" />,
  "qc-komandan-kodok-puru": <KatakAmfibi kodok />,
  "qc-komandan-katak-pohon": <KatakAmfibi />,
  "qc-komandan-komodo": <Komodo />,
};

export const ILUSTRASI_HEWAN_KOMANDAN_IDS = Object.keys(GAMBAR);

export function IlustrasiHewanKomandan({ id }: { id: string }) {
  return GAMBAR[id] ?? null;
}
