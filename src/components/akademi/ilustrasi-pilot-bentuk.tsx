import type { ReactNode } from "react";

const garis = { stroke: "#304959", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function KainPuntir({ warna, aksen, basah }: { warna: string; aksen: string; basah?: boolean }) {
  return <g {...garis}>
    <path d="M17 28Q41 27 65 45Q89 27 113 28L115 67Q91 72 65 54Q40 73 16 67Z" fill={warna} />
    <path d="M20 39Q47 34 73 55Q91 66 110 57M20 56Q43 62 61 49Q83 35 110 40" fill="none" stroke={aksen} strokeWidth="4" />
    <path d="M53 43Q56 53 67 58M63 42Q66 49 76 53" fill="none" />
    {basah && (
      <path d="M64 62Q53 75 61 79Q69 82 72 75Q74 71 64 62ZM79 73Q72 82 76 87Q81 91 85 85Q87 81 79 73Z" fill="#9de3fa" stroke="#337f9d" />
    )}
  </g>;
}

function TaliPilin({ logam = false }: { logam?: boolean }) {
  const tebal = logam ? 5 : 9;
  return <g {...garis} fill="none">
    <path d="M13 60C27 60 25 37 39 37S54 60 66 60 81 37 93 37 105 60 117 60" stroke={logam ? "#566d80" : "#835331"} strokeWidth={tebal + 3} />
    <path d="M13 60C27 60 25 37 39 37S54 60 66 60 81 37 93 37 105 60 117 60" stroke={logam ? "#bdc9d4" : "#e2b16d"} strokeWidth={tebal} />
    <path d="M13 37C27 37 25 60 39 60S54 37 66 37 81 60 93 60 105 37 117 37" stroke={logam ? "#7794a8" : "#9e663d"} strokeWidth={tebal} />
  </g>;
}

/** Benda setelah diregangkan, ditekan, ditekuk, atau dipuntir. */
export const ILUSTRASI_BENTUK_PILOT: Record<string, ReactNode> = {
  "karet-regang": <g {...garis}>
    <path d="M17 48C17 32 41 35 65 35S113 32 113 48 89 64 65 64 17 64 17 48Z" fill="none" stroke="#8f3643" strokeWidth="9" />
    <path d="M17 48C17 32 41 35 65 35S113 32 113 48 89 64 65 64 17 64 17 48Z" fill="none" stroke="#ec8a8c" strokeWidth="5" />
  </g>,
  "pegas-regang": <g {...garis} fill="none">
    <path d="M7 54H19C24 54 28 42 24 34C17 20 14 64 27 67C43 70 48 40 42 32C34 20 33 64 45 67C62 70 67 40 61 32C53 20 52 64 64 67C81 70 86 40 80 32C72 20 71 64 83 67C100 70 105 40 99 32C91 20 90 64 102 67C111 68 114 56 114 52H123" stroke="#4c657c" strokeWidth="5" />
    <path d="M26 58L28 60M44 58L46 60M63 58L65 60M82 58L84 60M101 58L103 60" stroke="#b8d8ec" strokeWidth="2" />
  </g>,
  "adonan-mi-regang": <g {...garis} fill="none">
    <path d="M12 27Q57 37 117 24M12 39Q61 55 117 36M12 51Q65 73 117 49M12 63Q70 84 117 64" stroke="#bd8444" strokeWidth="8" />
    <path d="M12 27Q57 37 117 24M12 39Q61 55 117 36M12 51Q65 73 117 49M12 63Q70 84 117 64" stroke="#f5d69a" strokeWidth="5" />
  </g>,
  "spons-gepeng": <g {...garis}>
    <path d="M16 46Q21 36 65 35T114 47L108 61Q100 69 64 68T21 61Z" fill="#e8bd4c" stroke="#926632" />
    <path d="M18 47Q41 54 66 54T112 47" fill="none" stroke="#a57532" />
    <path d="M25 45h2m7-3h2m10 6h2m9-6h2m14 2h2m10 4h2m7-4h2m-56 16h2m28 1h2m20-2h2" stroke="#926632" />
  </g>,
  "kaleng-penyok": <g {...garis}>
    <path d="M34 26Q65 14 95 27L103 42L86 53L94 66L83 79Q58 85 33 74L28 63L43 51L31 40Z" fill="#9db5c8" />
    <ellipse cx="65" cy="27" rx="30" ry="8" fill="#d4e4ed" />
    <path d="M48 47L74 51L58 61L86 65M35 69Q58 78 82 72M57 25h14" fill="none" stroke="#617a91" />
  </g>,
  "plastisin-pipih": <g {...garis} stroke="#78458e">
    <path d="M14 55Q21 38 64 37Q104 37 116 52L113 65Q97 75 61 73Q23 73 16 64Z" fill="#b878c9" />
    <path d="M15 53Q27 38 65 38Q105 39 115 53Q101 64 65 63Q29 65 15 53Z" fill="#dda7e4" />
    <path d="M45 51Q65 57 87 51" fill="none" stroke="#a360b6" />
  </g>,
  "kawat-bengkok": <g {...garis} fill="none">
    <path d="M16 77L76 30Q92 17 103 33Q111 45 100 55Q90 63 81 55" stroke="#41586d" strokeWidth="8" />
    <path d="M16 77L76 30Q92 17 103 33Q111 45 100 55Q90 63 81 55" stroke="#c0ccd4" strokeWidth="4" />
  </g>,
  "kertas-lipat": <g {...garis}>
    <path d="M18 58L62 30L111 45L71 77Z" fill="#e5edf4" />
    <path d="M62 30Q79 34 111 45L71 73L18 56Z" fill="#fff9e9" />
    <path d="M62 30Q68 43 84 49L39 69L18 56Z" fill="#f4e5c4" />
    <path d="M62 30Q68 43 84 49" fill="none" stroke="#b18e61" />
  </g>,
  "handuk-diperas": <KainPuntir warna="#8dd3e9" aksen="#dbf3fc" basah />,
  "tali-dipilin": <TaliPilin />,
  "kain-dipelintir": <KainPuntir warna="#da99d6" aksen="#f8d9ef" />,
  "tali-lompat-regang": <g {...garis}>
    <rect x="7" y="34" width="20" height="27" rx="6" fill="#74afcf" />
    <rect x="103" y="34" width="20" height="27" rx="6" fill="#74afcf" />
    <path d="M27 48Q64 64 103 48" fill="none" stroke="#966b37" strokeWidth="6" />
    <path d="M27 47Q64 60 103 47" fill="none" stroke="#ecb963" strokeWidth="3" />
  </g>,
  "kaus-kaki-regang": <g {...garis} stroke="#814e7f">
    <path d="M15 23H40V44Q56 50 104 50Q118 50 117 62Q117 73 99 74H42Q23 74 21 59L17 45Z" fill="#b780b5" />
    <path d="M15 23H40V37H16Z" fill="#dcb4db" />
    <path d="M95 51Q108 59 101 74M23 59Q31 62 43 59" fill="none" stroke="#e9c9e9" strokeWidth="4" />
    <path d="M51 57H85M46 64H82" stroke="#976593" strokeWidth="2" />
  </g>,
  "karet-ketapel-regang": <g {...garis}>
    <path d="M95 85V59L74 27M95 57L117 27" fill="none" stroke="#875733" strokeWidth="12" />
    <path d="M74 27L14 46L117 27" fill="none" stroke="#bd7650" strokeWidth="6" />
    <path d="M11 42L26 43L24 51L11 51Z" fill="#8b5b44" />
  </g>,
  "bola-karet-gepeng": <g {...garis} stroke="#934c42">
    <path d="M13 52Q15 38 65 35Q110 38 117 52L113 62Q95 72 65 70Q34 72 18 62Z" fill="#ee957d" />
    <path d="M16 51Q37 62 65 60Q93 60 115 51" fill="none" stroke="#c76958" />
    <path d="M34 46Q65 36 91 46" fill="none" stroke="#ffc5a8" strokeWidth="4" />
  </g>,
  "pasir-cetakan": <g {...garis} stroke="#9b693c">
    <path d="M24 75L35 37L44 35V25H56V34H63V23H75V34H83V25H94V35L101 37L109 76Q65 89 24 75Z" fill="#dfa66b" />
    <path d="M43 75V62Q49 54 56 62V78M36 41Q65 48 101 41M59 64h1m7-5h1m15 7h1m10-9h1m-64 10h1" fill="none" strokeWidth="2" />
  </g>,
  "roti-tawar-pipih": <g {...garis} stroke="#8b5d34">
    <path d="M16 57Q15 43 37 40Q48 35 66 39Q89 36 106 42Q118 45 115 58L108 67H22Z" fill="#c89153" />
    <path d="M19 52Q22 45 41 44Q87 38 108 49Q116 53 108 59H25Z" fill="#f4d9a4" />
    <path d="M43 52h1m12-4h1m28 4h1m8-2h1" stroke="#c89153" />
  </g>,
  "ranting-bengkok": <g {...garis} fill="none">
    <path d="M14 71Q42 78 59 50T112 28" stroke="#8b6346" strokeWidth="7" />
    <path d="M49 61Q42 47 33 41M72 39Q72 29 64 20M93 29Q104 23 110 17" stroke="#8b6346" strokeWidth="4" />
    <path d="M41 48Q25 50 25 38Q35 35 41 48M73 34Q61 31 60 19Q71 19 73 34M101 26Q101 15 116 16Q114 28 101 26" fill="#92bf73" stroke="#597c52" strokeWidth="2" />
  </g>,
  "kardus-lipat": <g {...garis} stroke="#895e3a">
    <path d="M14 59L68 44L114 57L65 76Z" fill="#c79260" />
    <path d="M14 50L68 35L114 48L65 68Z" fill="#e2b88a" />
    <path d="M14 50V59L65 76V68ZM65 68V76L114 57V48Z" fill="#bb8557" />
    <path d="M14 50L44 22L92 31L65 68Z" fill="#efc594" />
    <path d="M16 51L64 67M30 55v4m10 0v4m11 1v4m27-1v4m10-7v4m10-7v4" fill="none" strokeWidth="2" />
  </g>,
  "kain-pel-diperas": <KainPuntir warna="#86c995" aksen="#c7efc5" basah />,
  "kawat-dipuntir": <TaliPilin logam />,
};
