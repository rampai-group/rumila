// Keputusan owner 22 Nov 2026: layar dan konten memakai pangkat (Tunas–Legenda) dan "usia 3–12 tahun",
// tanpa jenjang sekolah formal dan tanpa nama kerangka Cambridge. Id internal (PAUD, TKA, SD3) tetap boleh di kode.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { LEVELS, levelDariSlug, namaLevel } from "@akademi/schema";
import { PAKET } from "../katalog";

const TERLARANG = /(?<![A-Za-z0-9_./-])(?:PAUD|SD ?[1-6]|SD|TK ?[AB]|TK)(?![A-Za-z0-9_-])|Early Years|Primary Stage|Cambridge|EYFS|[Kk]elas (?:[1-6](?!\d)|[Ss]atu\b|[Ll]ima\b|[Ee]nam\b)/;

function berkas(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    if (e.isDirectory()) return e.name === "__tests__" || p === join("src", "app", "dev") ? [] : berkas(p);
    return /\.tsx?$/.test(e.name) && !e.name.includes("generated") && !e.name.includes(".test.") ? [p] : [];
  });
}

/** Buang komentar dan id internal supaya yang diperiksa tinggal teks yang bisa tampil. */
const teksTampil = (baris: string) =>
  baris
    .replace(/(^|\s)\/\/.*$|\/\*.*?\*\/|^\s*\*.*$/g, "")
    .replace(/["'](?:PAUD|TKA|TKB|SD[1-6])["']|\b(?:PAUD|TKA|TKB|SD[1-6]):/g, "")
    .replace(/\b(?:MAT|KODE|SAINS|BIND|BING|DUNIA|SENI|KARAKTER)\.[A-Z0-9.-]+/g, "");

describe("istilah jenjang", () => {
  it("nama jenjang = pangkat, alamat bolak-balik", () => {
    expect(LEVELS.map((l) => namaLevel(l.id))).toEqual(["Tunas", "Kadet", "Navigator", "Pilot", "Kapten", "Komandan", "Laksamana", "Penjelajah", "Legenda"]);
    for (const l of LEVELS) {
      expect(l.pangkat).not.toMatch(TERLARANG);
      expect(levelDariSlug(l.slug)).toBe(l.id);
    }
    expect(levelDariSlug("SD3")).toBeUndefined();
  });

  it("kode layar bebas istilah sekolah formal", () => {
    const temuan = berkas("src").flatMap((f) =>
      readFileSync(f, "utf8")
        .split("\n")
        .flatMap((b, i) => (TERLARANG.test(teksTampil(b)) ? [`${f}:${i + 1} ${b.trim().slice(0, 120)}`] : [])),
    );
    expect(temuan).toEqual([]);
  });

  it("judul dan teks paket bebas istilah sekolah formal", () => {
    const temuan = PAKET.filter((p) => TERLARANG.test(JSON.stringify(p.locale ?? {}))).map((p) => p.id);
    expect(temuan).toEqual([]);
  });
});
