// Identitas modul harus menyertakan pelajaran: MAT dan KODE sama-sama punya DATA/POLA.
import type { Competency, LevelId, TrackId } from "@akademi/schema";
import type { HasilUjian } from "./ujian";

export const ruangKuis = (track: TrackId, unitId: string) => `${track}:${unitId}`;

/** Urutan historis peta: modul ke-1 tiap pelajaran, lalu modul ke-2, dst. */
export function urutModul(kompetensi: Competency[], level: LevelId, tracks: readonly TrackId[]) {
  const perTrack = tracks.map((track) => {
    const map = new Map<string, Competency[]>();
    for (const c of kompetensi) if (c.level === level && c.track === track) (map.get(c.unit.id) ?? map.set(c.unit.id, []).get(c.unit.id)!).push(c);
    return [...map.values()].map((isi, i) => ({ track, ke: i + 1, isi }));
  });
  const out: (typeof perTrack)[number] = [];
  const terbanyak = Math.max(0, ...perTrack.map((u) => u.length));
  for (let i = 0; i < terbanyak; i++) for (const u of perTrack) if (u[i]) out.push(u[i]);
  return out;
}

/**
 * Hasil/tautan lama hanya menyimpan unitId. Dulu cakupanUjian memilih modul PERTAMA
 * dengan ID itu di peta. Pertahankan kredit pada modul yang benar-benar diuji,
 * tanpa memberi kredit ke pelajaran lain yang kebetulan memiliki ID sama.
 * Nilai tidak dikenal dibiarkan supaya validasi cakupan tetap menolaknya.
 */
export function ruangKuisKanonik(level: LevelId, ruang: string, kompetensi: Competency[], tracks: readonly TrackId[]): string {
  if (ruang.includes(":")) return ruang;
  const u = urutModul(kompetensi, level, tracks).find((x) => x.isi[0].unit.id === ruang);
  return u ? ruangKuis(u.track, u.isi[0].unit.id) : ruang;
}

export function modulDariRuang(level: LevelId, ruang: string, kompetensi: Competency[], tracks: readonly TrackId[]) {
  return urutModul(kompetensi, level, tracks).find((u) => ruangKuis(u.track, u.isi[0].unit.id) === ruang || u.isi[0].unit.id === ruang);
}

export function normalisasiHasilUjian(hasil: HasilUjian[], kompetensi: Competency[], tracks: readonly TrackId[]): HasilUjian[] {
  return hasil.map((h) => h.jenis === "kuis" ? { ...h, ruang: ruangKuisKanonik(h.level, h.ruang, kompetensi, tracks) } : h);
}
