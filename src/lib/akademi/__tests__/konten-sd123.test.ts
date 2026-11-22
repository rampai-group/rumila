import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { ContentPack } from "@akademi/schema";
import { buatRonde, buatRondeUnik, knobDefaults, kunciRonde, nilai } from "@akademi/mechanics";

function urutan(id: string) {
  const p = ContentPack.parse(JSON.parse(readFileSync(resolve("content/paket/urutkan", `${id}.json`), "utf8")));
  if (p.mechanic !== "urutkan") throw new Error("Paket harus berisi urutan");
  return p;
}

describe("regresi konten SD1–3", () => {
  const internet = urutan("sd3-kode-rute-data-internet");
  it.each(internet.sequences)("rute $id tetap berawal dan tiba di tujuan pada setiap panjang", (sequence) => {
    for (let steps = internet.knobs.steps.min; steps <= internet.knobs.steps.max; steps++) {
      const p = { ...internet, sequences: [sequence] };
      const r = buatRonde(p, { steps }, 31);
      if (r.mechanic !== "urutkan") throw new Error("Ronde harus berisi urutan");
      expect(r.ronde.correct[0]).toBe(sequence.steps[0].id);
      expect(r.ronde.correct.at(-1)).toBe(sequence.steps.at(-1)!.id);
      expect(r.ronde.shown).toHaveLength(steps);
      expect(nilai(p, r, r.ronde.correct).benar).toBe(true);
    }
  });

  it("semua pola benar/salah menuntaskan delapan ronde Bulan yang dijanjikan", () => {
    const p = urutan("sd3-sains-bentuk-bulan-berubah");
    expect(p.rounds).toBe(8);
    // Exhaust every adaptive success/failure trace, including the former early-ending perfect run.
    for (const seed of [0, 104729, 209458]) for (let trace = 0; trace < 2 ** p.rounds; trace++) {
      let knobs = knobDefaults(p), benar = 0, salah = 0;
      const history: string[] = [];
      for (let i = 0; i < p.rounds; i++) {
        const r = buatRondeUnik(p, knobs, seed + i * 7919, history);
        expect(r, `seed ${seed}, trace ${trace}, ronde ${i + 1}`).not.toBeNull();
        const key = kunciRonde(r!);
        expect(history).not.toContain(key);
        history.push(key);
        const ok = Boolean(trace & (1 << i));
        benar = ok ? benar + 1 : 0;
        salah = ok ? 0 : salah + 1;
        if (benar >= 2 || salah >= 2) {
          const arah = benar >= 2 ? 1 : -1;
          knobs = Object.fromEntries(Object.entries(p.knobs).map(([n, spec]) => [n, Math.min(spec.max, Math.max(spec.min, knobs[n] + arah * (spec.step ?? 1)))]));
          benar = salah = 0;
        }
      }
    }
  });
});
