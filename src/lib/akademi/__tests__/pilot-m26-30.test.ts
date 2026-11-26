import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { jalankan } from "@akademi/mechanics";
import { PAKET, KOMPETENSI } from "../konten";
import { petaJenjang } from "../peta";
import { GambarAdegan } from "@/components/akademi/adegan-gambar";
import { isIlustrasiAwal } from "@/components/akademi/ilustrasi-awal";

const misi = petaJenjang({}, new Set(), KOMPETENSI, "SD1", ["MAT", "KODE", "SAINS"]).unit.flatMap(u => u.misi).filter(m => m.nomor >= 26 && m.nomor <= 30);
const paket = (n: number) => PAKET.filter(p => p.competencyIds.includes(misi.find(m => m.nomor === n)!.kompetensi.id));

describe("Pilot M26–30", () => {
  it("mempertahankan lima misi dan sepuluh paket pada peta gabungan", () => {
    expect(misi.map(m => m.kompetensi.id)).toEqual(["SAINS.SD1.BUNYI.02", "MAT.SD1.UKUR.01", "MAT.SD1.UKUR.02", "KODE.SD1.PREDIKSI.01", "SAINS.SD1.LISTRIK.01"]);
    for (const m of misi) expect(paket(m.nomor)).toHaveLength(2);
  });
  it("sumber bunyi SVG tetap terlihat dan jarak pendengar meningkat menurut kunci", () => {
    for (const p of paket(26)) {
      if (p.mechanic !== "urutkan") throw Error(p.id);
      for (const seq of p.sequences) {
        const jarak = seq.steps.map(s => s.adegan!.t!);
        expect(jarak).toEqual([...jarak].sort((a, b) => a - b));
        expect(new Set(jarak).size).toBe(jarak.length);
        for (const s of seq.steps) {
          const adegan = s.adegan!;
          if (adegan.tanda?.startsWith("awal-") || adegan.tanda?.startsWith("qc-")) {
            expect(isIlustrasiAwal(adegan.tanda), seq.id).toBe(true);
            const html = renderToStaticMarkup(createElement(GambarAdegan, { adegan, emoji: s.emoji, s: 100 }));
            expect(html).toContain(`data-ilustrasi="${adegan.tanda}"`);
            expect(html).not.toContain(`<span>${adegan.tanda}</span>`);
          }
        }
      }
    }
  });
  it("petunjuk batang wadah mendukung kunci kapasitas", () => {
    for (const p of paket(28)) {
      if (p.mechanic !== "urutkan") throw Error(p.id);
      for (const seq of p.sequences) {
        const ukuran = seq.steps.map(x => x.adegan!.t!);
        for (let i = 1; i < ukuran.length; i++) expect(ukuran[i], seq.id).toBeGreaterThan(ukuran[i - 1]);
      }
    }
  });
  it("setiap program prediksi M29 mencapai tujuan tanpa tabrakan", () => {
    for (const p of paket(29)) {
      if (p.mechanic !== "navigasi") throw Error(p.id);
      for (const grid of p.grids) {
        const run = jalankan(grid, grid.program!);
        expect(run.outcome, `${p.id}/${grid.id}`).toBe("bintang");
        for (const step of run.steps) {
          expect(step.after.x).toBeGreaterThanOrEqual(0);
          expect(step.after.x).toBeLessThan(grid.w);
          expect(step.after.y).toBeGreaterThanOrEqual(0);
          expect(step.after.y).toBeLessThan(grid.h);
        }
      }
    }
  });
});
