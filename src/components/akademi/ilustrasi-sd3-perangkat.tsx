import type { ReactNode } from "react";

const garis = { stroke: "#344e64", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Penyimpan({ jenis }: { jenis: "usb" | "memori" | "ssd" | "hdd" | "hdd-eksternal" }) {
  if (jenis === "usb") return <g {...garis} transform="rotate(-24 65 50)">
    <rect x="70" y="37" width="33" height="26" rx="3" fill="#c8d7e1" />
    <path d="M89 42V57M96 42V57" fill="none" stroke="#7591a5" />
    <rect x="23" y="32" width="57" height="36" rx="9" fill="#68bcb7" />
    <path d="M32 40H64" stroke="#c9f0e2" />
    <circle cx="36" cy="52" r="4" fill="#eff8fc" />
  </g>;
  if (jenis === "memori") return <g {...garis} transform="rotate(15 65 50)">
    <path d="M35 12H77L98 33V87H35Z" fill="#56758e" />
    <path d="M42 54H91V75H42Z" fill="#d7edf2" stroke="none" />
    <path d="M45 14v22m10-22v22m10-22v22m10-21v21m10-11v11" stroke="#ffce62" strokeWidth="4.4" />
    <path d="M47 63h31" stroke="#3d8088" />
  </g>;
  const external = jenis !== "hdd";
  const ssd = jenis === "ssd";
  return <g {...garis}>
    <rect x={external ? 20 : 23} y="13" width={external ? 89 : 84} height="69" rx={external ? 11 : 6} fill={ssd ? "#88aed6" : "#9faeba"} />
    {external ? <>
      <path d="M22 67H108V78H22Z" fill={ssd ? "#567fa9" : "#708998"} stroke="none" />
      <circle cx="34" cy="24" r="4" fill="#9cf7af" stroke="none" />
      <path d="M85 81V89Q85 94 103 92L120 92" fill="none" />
      {ssd ? <path d="M31 55H92M31 45H92M31 35H92" fill="none" stroke="#afcae4" /> : <path d="M36 35H91V56H36Z" fill="#c9d8df" stroke="none" />}
    </> : <>
      <circle cx="65" cy="44" r="23" fill="#dee9ef" stroke="#6d8ba1" />
      <circle cx="65" cy="44" r="6" fill="#7596aa" />
      <path d="M86 65L74 52 79 46 94 63Z" fill="#5c7890" />
      <path d="M42 26L46 22M82 27L88 31M32 72H50" stroke="#f3f7ff" />
    </>}
  </g>;
}

function Layar({ layar = "tablet" }: { layar?: "tablet" | "laptop" | "ponsel" }) {
  const bentuk = layar === "laptop"
    ? <><rect x="7" y="31" width="41" height="30" rx="4" fill="#a9c8e5" /><path d="M6 61H50L55 69H3Z" fill="#a3afb8" /></>
    : layar === "ponsel"
      ? <><rect x="13" y="26" width="27" height="45" rx="5" fill="#b4d9e6" /><path d="M13 34H39M13 63H39" stroke="#638a9a" /></>
      : <><rect x="4" y="30" width="45" height="34" rx="5" fill="#b4d9e6" /><path d="M10 36H43V58H10Z" fill="#e2f3f7" stroke="#7297ac" /></>;
  return <g {...garis}>{bentuk}</g>;
}

function Router() {
  return <g {...garis}>
    <path d="M80 57V37M114 57V31" fill="none" />
    <rect x="74" y="55" width="46" height="17" rx="5" fill="#7d9bb3" />
    <path d="M81 63H85M90 63H94" stroke="#bcf2bc" />
  </g>;
}

function Server() {
  return <g {...garis}>
    <rect x="82" y="17" width="42" height="67" rx="6" fill="#6d92b1" />
    <path d="M89 29H116V39H89ZM89 46H116V56H89ZM89 63H116V73H89Z" fill="#d3e5ef" />
    <path d="M94 34H99M94 51H99M94 68H99" stroke="#4a9e70" />
  </g>;
}

function Sambungan({ jenis, tujuan = "ponsel" }: {
  jenis: "wifi" | "kabel" | "seluler" | "menara-server" | "internet" | "router-server" | "server-kirim";
  tujuan?: "ponsel" | "tablet" | "laptop";
}) {
  return <g {...garis}>
    {(jenis === "wifi" || jenis === "kabel") && <>
      <Layar layar={jenis === "wifi" ? "tablet" : "laptop"} />
      <Router />
      {jenis === "wifi"
        ? <path d="M62 33Q75 47 62 61M55 40Q63 47 55 54" fill="none" stroke="#df884a" strokeWidth="4" />
        : <path d="M45 69V79Q45 84 53 84H65Q70 84 70 78V66H74" fill="none" stroke="#c47447" strokeWidth="3.5" />}
    </>}
    {(jenis === "seluler" || jenis === "menara-server") && <>
      {jenis === "seluler" && <Layar layar="ponsel" />}
      <g transform={jenis === "seluler" ? "" : "translate(-57 0)"}>
        <path d="M73 82L93 30 111 82M81 62H105M85 51H100M79 75H109" fill="none" stroke="#607b92" strokeWidth="4" />
        <circle cx="93" cy="28" r="5" fill="#d68e4a" />
        <path d="M83 20Q76 28 83 36M76 14Q65 28 76 42M102 20Q109 28 102 36M109 14Q121 28 109 42" fill="none" stroke="#bf8462" />
      </g>
      {jenis === "seluler" && <path d="M46 51H69L62 45M69 51L62 57" fill="none" stroke="#58a39a" strokeWidth="3" />}
    </>}
    {(jenis === "internet" || jenis === "router-server" || jenis === "menara-server" || jenis === "server-kirim") && <>
      {jenis === "internet" && <>
        <circle cx="32" cy="50" r="22" fill="#91d2e5" />
        <ellipse cx="32" cy="50" rx="9" ry="22" fill="none" stroke="#689db7" />
        <path d="M10 50H54M15 40H48M15 61H48" fill="none" stroke="#689db7" />
      </>}
      {jenis === "router-server" && <g transform="translate(-65 -8)"><Router /></g>}
      {jenis === "server-kirim" && <Layar layar={tujuan} />}
      <Server />
      {jenis === "server-kirim"
        ? <path d="M77 50H47L54 44M47 50L54 56" fill="none" stroke="#438e89" strokeWidth="3.3" />
        : <path d="M57 50H77L70 44M77 50L70 56" fill="none" stroke="#438e89" strokeWidth="3.3" />}
    </>}
  </g>;
}

export const ILUSTRASI_PERANGKAT_SD3: Record<string, ReactNode> = {
  "sd3-flashdisk": <Penyimpan jenis="usb" />,
  "sd3-kartu-memori": <Penyimpan jenis="memori" />,
  "sd3-ssd": <Penyimpan jenis="ssd" />,
  "sd3-hard-disk": <Penyimpan jenis="hdd" />,
  "sd3-hard-disk-eksternal": <Penyimpan jenis="hdd-eksternal" />,
  "sd3-papan-tombol-angka": <g {...garis}>
    <rect x="38" y="10" width="55" height="79" rx="7" fill="#7891ad" />
    {[23, 39, 55, 71].map(y => <g key={y}>{[46, 60, 74].map(x => <rect key={x} x={x} y={y} width="11" height="10" rx="2" fill={x === 74 && y === 71 ? "#ffcb79" : "#dbe8f0"} strokeWidth="1.1" />)}</g>)}
  </g>,
  "sd3-speaker-laptop": <g {...garis}>
    <rect x="20" y="8" width="89" height="61" rx="6" fill="#96b4c9" />
    <rect x="25" y="13" width="79" height="49" rx="3" fill="#c9eafa" />
    <path d="M19 68H110L119 83V88H11V83Z" fill="#b0c5d1" />
    <path d="M27 72H45M85 72H104M26 76H44M85 76H104" stroke="#55798e" strokeDasharray="2 3" />
    <path d="M23 55Q11 49 23 39M107 55Q119 49 107 39" fill="none" stroke="#bb8061" />
  </g>,
  "sd3-jaringan-wifi-router": <Sambungan jenis="wifi" />,
  "sd3-jaringan-kabel-router": <Sambungan jenis="kabel" />,
  "sd3-jaringan-menara": <Sambungan jenis="seluler" />,
  "sd3-jaringan-menara-server": <Sambungan jenis="menara-server" />,
  "sd3-jaringan-internet-server": <Sambungan jenis="internet" />,
  "sd3-jaringan-router-server": <Sambungan jenis="router-server" />,
  "sd3-jaringan-server-ke-perangkat": <Sambungan jenis="server-kirim" />,
  "sd3-jaringan-server-ke-tablet": <Sambungan jenis="server-kirim" tujuan="tablet" />,
  "sd3-jaringan-server-ke-laptop": <Sambungan jenis="server-kirim" tujuan="laptop" />,
};
