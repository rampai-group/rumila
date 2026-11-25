import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { buatRondePilah, nilaiPilah } from "@akademi/mechanics";
import { PaketPilah } from "@akademi/schema";
import { PresenterPilah } from "@/components/akademi/pilah";
import buah from "../../../../content/paket/pilah/stok-buah-piktogram.json";
import sayur from "../../../../content/paket/pilah/stok-sayur-piktogram.json";

describe("nama aksesibel kartu stok piktogram", () => {
  it.each([buah, sayur])("$id membacakan jumlah setiap jenis barang", (konten) => {
    const paket = PaketPilah.parse(konten);
    if (paket.mode !== "pilih") throw new Error("Paket stok harus memakai mode pilih");

    for (const soal of paket.pilihan) {
      for (const itemCount of [3, 4]) {
        const ronde = buatRondePilah({ ...paket, pilihan: [soal] }, { itemCount }, 7);
        if (ronde.mode !== "pilih") throw new Error("Paket stok harus menampilkan pilihan");

        const jumlah = ronde.choices.map((barang) => barang.count ?? 1);
        const dicari = soal.promptKey === "tBanyak" ? Math.max(...jumlah) : Math.min(...jumlah);
        const sesuai = ronde.choices.filter((barang) => barang.count === dicari);
        expect(sesuai).toHaveLength(1);
        expect(nilaiPilah(ronde, sesuai[0].id).benar).toBe(true);

        for (const bahasa of ["id", "en"] as const) {
          const t = (key: string) => paket.locale[bahasa][key];
          const html = renderToStaticMarkup(createElement(PresenterPilah, { paket, ronde, t, hasil: null, onJawab: () => {} }));
          const nama = [...html.matchAll(/<button[^>]*aria-label="([^"]+)" aria-pressed="false"/g)].map((kartu) => kartu[1]);
          expect(nama).toHaveLength(ronde.choices.length);
          for (const [i, item] of ronde.choices.entries()) {
            expect(nama[i]).toMatch(new RegExp(`^${item.count} `));
            expect(nama[i]).toBe(t(item.altKey!));
          }
        }
      }
    }
  });
});
