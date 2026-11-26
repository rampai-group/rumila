import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { buatRondeUrutkan } from "@akademi/mechanics";
import { PaketUrutkan } from "@akademi/schema";
import { PresenterUrutkan } from "@/components/akademi/urutkan";
import kendaraan from "../../../../content/paket/urutkan/pensil-pendek-ke-panjang.json";
import hewan from "../../../../content/paket/urutkan/ular-pendek-ke-panjang.json";
import jalanMakanan from "../../../../content/paket/urutkan/sd5-sains-jalan-makanan.json";

function renderKartu(paket: PaketUrutkan, bahasa: "id" | "en", steps: number) {
  const ronde = buatRondeUrutkan(paket, { steps }, 7);
  const t = (k: string) => paket.locale[bahasa]?.[k] ?? paket.locale.id[k];
  const html = renderToStaticMarkup(createElement(PresenterUrutkan, { paket, ronde, t, hasil: null, onJawab: () => {} }));
  const kartu = [...html.matchAll(/<button[^>]*aria-label="([^"]+)" aria-pressed="false"[^>]*>([\s\S]*?)<\/button>/g)];
  return { ronde, t, kartu };
}

describe("nama aksesibel kartu urutkan", () => {
  it.each([kendaraan, hewan])("$id menyebut ukuran yang terlihat di setiap kartu", (konten) => {
    const paket = PaketUrutkan.parse(konten);
    for (const urutan of paket.sequences) {
      for (let steps = 3; steps <= urutan.steps.length; steps++) {
        for (const bahasa of ["id", "en"] as const) {
          const { ronde, t, kartu } = renderKartu({ ...paket, sequences: [urutan] }, bahasa, steps);
          expect(kartu).toHaveLength(steps);
          expect(new Set(kartu.map((k) => k[1])).size).toBe(steps);
          for (const [i, s] of ronde.shown.entries()) {
            const nama = t(s.labelKey);
            const panjang = Math.round(s.width! * 10);
            const keterangan = bahasa === "id" ? `panjang ${panjang} satuan` : `length ${panjang} units`;
            expect(kartu[i][1]).toBe(`${nama}, ${keterangan}`);
            expect(kartu[i][2]).toContain(`>${nama}</span>`);
            expect(kartu[i][2]).not.toContain(keterangan);
            if (s.width !== 1) expect(kartu[i][2]).toContain(`scaleX(${s.width})`);
          }
        }
      }
    }
  });

  it("lebar ilustrasi pada tugas lain tidak dibacakan sebagai panjang", () => {
    const paket = PaketUrutkan.parse(jalanMakanan);
    const [urutan] = paket.sequences;
    const steps = urutan.steps.map((langkah) => ({ ...langkah, width: 0.7 }));
    const contoh = { ...paket, sequences: [{ ...urutan, steps }] };
    const { ronde, t, kartu } = renderKartu(contoh, "id", paket.knobs.steps.max);
    expect(ronde.shown.some((s) => s.width !== undefined)).toBe(true);
    expect(kartu.map((k) => k[1])).toEqual(ronde.shown.map((s) => t(s.labelKey)));
  });
});
