import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { PaketPilah } from "@akademi/schema";
import { PresenterPilah } from "@/components/akademi/pilah";
import kelereng from "../../../../content/paket/pilah/rak-angka-11-20-kelereng.json";
import telur from "../../../../content/paket/pilah/rak-angka-11-20-telur.json";

it.each([telur, kelereng])("$id menyebut jumlah meskipun hanya ada satu kartu sejenis", (konten) => {
  const paket = PaketPilah.parse(konten);

  for (const bahasa of ["id", "en"] as const) {
    const t = (key: string) => paket.locale[bahasa][key];

    for (const item of paket.items) {
      const pasangan = paket.items.find((i) => i.labelKey !== item.labelKey)!;
      const items = [item, pasangan];
      const html = renderToStaticMarkup(createElement(PresenterPilah, {
        paket, ronde: { mode: "kelompok", bins: paket.bins, items }, t, hasil: null, onJawab: () => {},
      }));

      const nama = [...html.matchAll(/<button[^>]*aria-label="([^"]+)" aria-pressed="false"/g)].map((kartu) => kartu[1]);
      expect(nama).toEqual(items.map((kartu) => `${kartu.count} ${t(kartu.labelKey)}`));
    }
  }
});
