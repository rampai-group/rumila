import { describe, expect, it } from "vitest";
import type { LevelId } from "@akademi/schema";
import { KOMPETENSI, PAKET, TRACK_AKTIF } from "../katalog";
import { normalisasiHasilUjian, ruangKuisKanonik } from "../modul";
import { petaJenjang } from "../peta";
import { piagamModul, sertifikatSemester } from "../piagam";
import { cakupanUjian } from "../ruang-ujian";
import { rencanaUjian, type HasilUjian } from "../ujian";

const hasil = (level: LevelId, ruang: string, nilai = 100): HasilUjian => ({ jenis: "kuis", level, ruang, sessionId: ruang, benar: 8, total: 8, nilai, lulus: true, at: "2026-11-22T00:00:00Z" });

describe("ruang modul dengan nama sama lintas pelajaran", () => {
  it.each<[LevelId, string, string]>([["SD1", "POLA", "KODE"], ["SD1", "DATA", "MAT"], ["SD2", "DATA", "KODE"], ["SD3", "DATA", "KODE"]])("%s %s punya cakupan, hasil, dan piagam terpisah", (level, unit, pelajaranLama) => {
    for (const track of ["MAT", "KODE"] as const) {
      const ruang = `${track}:${unit}`;
      const ids = cakupanUjian("kuis", level, ruang, KOMPETENSI)!;
      expect(ids.length).toBeGreaterThan(0);
      expect(ids.every((id) => id.startsWith(`${track}.${level}.${unit}.`))).toBe(true);
      expect(rencanaUjian(ids, PAKET, 8, ruang, level).every((s) => ids.includes(s.competencyId))).toBe(true);
      const h = hasil(level, ruang);
      const peta = petaJenjang({}, new Set(), KOMPETENSI, level, TRACK_AKTIF, new Map(), [h]);
      expect(peta.unit.filter((u) => u.id === unit && u.kuisLulus).map((u) => u.track)).toEqual([track]);
      expect(piagamModul([h], KOMPETENSI).map((p) => p.track)).toEqual([track]);
    }
    const lama = hasil(level, unit);
    expect(ruangKuisKanonik(level, unit, KOMPETENSI, TRACK_AKTIF)).toBe(`${pelajaranLama}:${unit}`);
    const peta = petaJenjang({}, new Set(), KOMPETENSI, level, TRACK_AKTIF, new Map(), [lama]);
    expect(peta.unit.filter((u) => u.id === unit && u.kuisLulus).map((u) => u.track)).toEqual([pelajaranLama]);
    expect(cakupanUjian("kuis", level, unit, KOMPETENSI)).toEqual(cakupanUjian("kuis", level, `${pelajaranLama}:${unit}`, KOMPETENSI));
  });

  it("hasil lama dan kanonik digabung satu modul, kedua pelajaran tetap punya piagam dan nilai sendiri", () => {
    const hs = [hasil("SD1", "DATA", 80), hasil("SD1", "MAT:DATA", 90), hasil("SD1", "KODE:DATA", 100)];
    expect(normalisasiHasilUjian(hs, KOMPETENSI, TRACK_AKTIF).map((h) => h.ruang)).toEqual(["MAT:DATA", "MAT:DATA", "KODE:DATA"]);
    expect(piagamModul(hs, KOMPETENSI).map((p) => [p.track, p.nilai])).toEqual([["MAT", 90], ["KODE", 100]]);
    const semester = { ...hasil("SD1", "S2", 100), jenis: "semester" as const };
    const s = sertifikatSemester([...hs, semester], KOMPETENSI)[0];
    expect(s.perPelajaran.filter((x) => x.track === "MAT" || x.track === "KODE")).toEqual([{ track: "MAT", nilai: 90, modul: 1 }, { track: "KODE", nilai: 100, modul: 1 }]);
  });

  it("ruang pelajaran yang tidak sesuai unit ditolak", () => {
    expect(cakupanUjian("kuis", "SD1", "SAINS:DATA", KOMPETENSI)).toBeNull();
  });
});
