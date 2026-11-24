const TOPI = {
  "topi-pesta-merah": { utama: "#e53935", gelap: "#ac2725" },
  "topi-pesta-biru": { utama: "#1e88e5", gelap: "#155e9e" },
  "topi-pesta-kuning": { utama: "#fdd835", gelap: "#c69513" },
  "topi-pesta-hijau": { utama: "#43a047", gelap: "#2c7430" },
} as const;

export const ILUSTRASI_WARNA_PAUD_IDS = [...Object.keys(TOPI), "ikan-kolam-biru"];

export function IlustrasiWarnaPaud({ id }: { id: string }) {
  if (id === "ikan-kolam-biru") {
    return <g stroke="#115487" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round">
      <path d="M56 28Q65 17 84 23L89 38Z" fill="#5baef2" />
      <path d="M91 50Q106 35 122 33L117 51L122 68Q104 66 91 53Z" fill="#409beb" />
      <path d="M9 51Q16 30 47 26Q74 22 99 51Q77 78 47 76Q17 72 9 51Z" fill="#1e88e5" />
      <path d="M47 52Q59 49 73 59Q66 69 56 69Z" fill="#65b7f5" />
      <path d="M34 38Q43 53 33 64M12 57Q17 59 22 56" fill="none" />
      <circle cx="24" cy="45" r="6" fill="#fff" />
      <circle cx="23" cy="45" r="2.6" fill="#0b2545" stroke="none" />
    </g>;
  }
  const warna = TOPI[id as keyof typeof TOPI];
  if (!warna) return null;
  return <g strokeLinejoin="round" strokeLinecap="round">
    <path d="M22 77L65 17L108 77C97 97 36 97 22 77Z" fill={warna.utama} stroke={warna.gelap} strokeWidth="3" />
    <path d="M28 77Q64 87 102 77" fill="none" stroke={warna.gelap} strokeWidth="4" />
    <path d="M52 39L34 67M63 41L60 48" fill="none" stroke="white" strokeOpacity=".8" strokeWidth="4" />
    <circle cx="65" cy="15" r="9" fill={warna.utama} stroke={warna.gelap} strokeWidth="3" />
    <path d="M47 87Q49 96 58 96H72Q81 96 83 87" fill="none" stroke={warna.gelap} strokeWidth="2.5" />
  </g>;
}
