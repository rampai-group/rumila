const SEHARI = 24 * 60 * 60 * 1000;
const OFFSET_WIB = 7 * 60 * 60 * 1000;

/** Tanggal kalender Akademi (YYYY-MM-DD), sama di browser dan server. */
export function hariWIB(waktu: string | Date): string {
  const waktuWIB = new Date(new Date(waktu).getTime() + OFFSET_WIB);
  if (Number.isNaN(waktuWIB.getTime())) return typeof waktu === "string" ? waktu.slice(0, 10) : "";
  return waktuWIB.toISOString().slice(0, 10);
}

/** Lama menunggu sampai tengah malam WIB, terlepas dari zona waktu perangkat. */
export function jedaKeHariWIBBerikut(waktu: Date): number {
  const waktuWIB = waktu.getTime() + OFFSET_WIB;
  return (Math.floor(waktuWIB / SEHARI) + 1) * SEHARI - waktuWIB;
}
