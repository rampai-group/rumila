import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import type { LevelId } from "@akademi/schema";
import { BukuSertifikat } from "@/components/akademi/buku-sertifikat";
import { KOMPETENSI, TRACK_AKTIF } from "../katalog";
import { ruangKuis, urutModul } from "../modul";
import { snapshotSertifikat } from "../sertifikat-inti";

vi.mock("@/components/akademi/font-sertifikat", () => ({ KELAS_FONT_SERTIFIKAT: "" }));

function buku(level: LevelId) {
  const ujian = urutModul(KOMPETENSI, level, TRACK_AKTIF).map((u, i) => ({
    jenis: "kuis", ruang: ruangKuis(u.track, u.isi[0].unit.id), nilai: 60 + i,
  }));
  const modul = urutModul(KOMPETENSI, level, TRACK_AKTIF).map((u) => u.isi[0].unit.nama.id);
  const html = renderToStaticMarkup(createElement(BukuSertifikat, {
    nama: "Pelajar Uji", level, kode: "QAQAQAQA", issuedAt: "2026-11-24T00:00:00Z",
    snapshot: { ...snapshotSertifikat({}, KOMPETENSI, level), ujian },
  }));
  const tabel = [...html.matchAll(/<table aria-label="Daftar nilai ulangan modul".*?<tbody>(.*?)<\/tbody>/g)].map(([, body]) => body);
  const footer = [...html.matchAll(/Lembar (\d+) dari (\d+)/g)].map(([, ke, total]) => [Number(ke), Number(total)]);
  return { tabel, footer, modul };
}

describe("pagination hasil belajar pada buku sertifikat", () => {
  it("Legenda memuat seluruh 35 nilai modul dan memberi nomor semua lembar secara urut", () => {
    const { tabel, footer, modul } = buku("SD6");
    expect(tabel.map((t) => (t.match(/<tr\b/g) ?? []).length)).toEqual([18, 17]);
    for (const judul of modul) expect(tabel.join("")).toContain(`>${judul}</td>`);
    expect(footer).toEqual(Array.from({ length: 7 }, (_, i) => [i + 1, 7]));
  });

  it.each([["PAUD", 12], ["TKA", 15], ["TKB", 17]] as const)("%s dengan %d nilai modul tetap pada satu lembar hasil", (level, jumlah) => {
    const { tabel, footer } = buku(level);
    expect(tabel).toHaveLength(1);
    expect(tabel[0].match(/<tr\b/g)).toHaveLength(jumlah);
    expect(footer[2]).toEqual([3, footer.length]);
  });
});
