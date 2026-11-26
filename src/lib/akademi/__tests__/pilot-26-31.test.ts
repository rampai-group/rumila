import { existsSync, readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PaketNavigasi, PaketPilah, PaketUrutkan } from "@akademi/schema";
import { buatRondeNavigasi, jalankan, nilaiNavigasi } from "@akademi/mechanics";
import { GambarAdeganSd } from "@/components/akademi/adegan-gambar-sd";
import { SUARA } from "@/lib/akademi/suara-manifest.generated";

const load = (mechanic: string, id: string) => JSON.parse(readFileSync(`content/paket/${mechanic}/${id}.json`, "utf8"));
const orders = ["sd1-mat-urut-ringan-berat", "sd1-mat-belanja-ringan-berat", "sd1-mat-urut-isi-wadah", "sd1-mat-wadah-halaman-isi"];

describe("Pilot misi 26–31", () => {
  it.each(orders)("%s: petunjuk visual tetap konsisten dan mendukung seluruh urutan", (id) => {
    const pack = PaketUrutkan.parse(load("urutkan", id));
    const values = new Map<string, number>();
    for (const sequence of pack.sequences) {
      const clues = sequence.steps.map(step => {
        expect(step.adegan?.tanda).toBe(step.emoji);
        const t = step.adegan!.t!;
        expect(t).toBeGreaterThan(0);
        expect(t).toBeLessThan(1);
        if (values.has(step.id)) expect(t).toBe(values.get(step.id));
        values.set(step.id, t);
        const svg = renderToStaticMarkup(createElement(GambarAdeganSd, { adegan: step.adegan!, s: 100 }));
        expect(svg).toContain('data-petunjuk-banding=');
        expect(svg).toContain(step.emoji);
        return t;
      });
      expect(clues.every((t, i) => i === 0 || t > clues[i - 1])).toBe(true);
    }
    const recording = SUARA[pack.locale.id[pack.instructionKey]];
    expect(recording).toBeTruthy();
    expect(existsSync(`public${recording}`)).toBe(true);
  });

  it.each(["pagi", "siang"])("jam %s: setiap emoji dan waktu digital cocok dengan rak", (variant) => {
    const pack = PaketPilah.parse(load("pilah", `sd1-mat-jam-setengah-${variant}`));
    const hours = [..."🕐🕑🕒🕓🕔🕕🕖🕗🕘🕙🕚🕛"];
    const halves = [..."🕜🕝🕞🕟🕠🕡🕢🕣🕤🕥🕦🕧"];
    for (const item of pack.items) {
      const half = item.bin.startsWith("setengah-");
      const hour = Number(item.bin.split("-")[1]) - (half ? 1 : 0);
      if (item.emoji) expect(item.emoji).toBe((half ? halves : hours)[hour - 1]);
      else expect(pack.locale.id[item.labelKey]).toBe(`${hour}.${half ? "30" : "00"}`);
    }
  });

  it.each(["angkasa", "ulangi"])("prediksi %s: bergerak dan berbelok dinilai dari petak akhir yang ditampilkan", (variant) => {
    const pack = PaketNavigasi.parse(load("navigasi", `sd1-kode-tebak-petak-${variant}`));
    for (const grid of pack.grids) {
      const round = buatRondeNavigasi({ ...pack, grids: [grid] }, {}, 1);
      const run = jalankan(grid, round.program);
      let previous = grid.start;
      for (const step of run.steps) {
        if (step.kind === "turn") expect([step.after.x, step.after.y]).toEqual([previous.x, previous.y]);
        expect(step.after.x).toBeGreaterThanOrEqual(0);
        expect(step.after.x).toBeLessThan(grid.w);
        expect(step.after.y).toBeGreaterThanOrEqual(0);
        expect(step.after.y).toBeLessThan(grid.h);
        previous = step.after;
      }
      expect(nilaiNavigasi(round, { program: round.program, prediksi: run.steps.map(() => true) }).benar).toBe(true);
      expect(nilaiNavigasi(round, { program: round.program, prediksi: run.steps.map(() => false) }).benar).toBe(false);
    }
  });
});
