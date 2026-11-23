// Tes Penempatan dimulai dari jenjang yang sesuai usia anak (usia awal tiap pangkat di LEVELS); belum lulus → turun satu.
import { LEVELS, levelIndex, type LevelId } from "@akademi/schema";

/** Jenjang tes pertama untuk usia ini, dipilih dari jenjang yang punya soal (`tersedia`). */
export function levelDariUsia(usia: number, tersedia: readonly LevelId[]): LevelId | undefined {
  const urut = LEVELS.filter((l) => tersedia.includes(l.id));
  if (!urut.length) return undefined;
  const cocok = urut.filter((l) => l.usia[0] <= usia);
  return (cocok.at(-1) ?? urut[0]).id;
}

/** Jenjang di bawahnya yang punya soal, untuk dicoba bila belum lulus. */
export const levelDiBawah = (level: LevelId, tersedia: readonly LevelId[]) => tersedia.filter((l) => levelIndex(l) < levelIndex(level)).at(-1);
