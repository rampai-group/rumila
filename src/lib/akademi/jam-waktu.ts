/** Posisi jarum yang dikodekan dalam varian gambar jam bulat dan setengah jam. */
export function bacaJamWaktu(varian?: string): { jam: number; menit: 0 | 30 } | undefined {
  const cocok = /^jam-waktu-(1[0-2]|[1-9])-(00|30)$/.exec(varian ?? "");
  if (cocok) return { jam: Number(cocok[1]), menit: cocok[2] === "30" ? 30 : 0 };
}
