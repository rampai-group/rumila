import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PaketPilah } from "@akademi/schema";
import { PresenterPilah } from "@/components/akademi/pilah";
import pagi from "../../../../content/paket/pilah/sd1-mat-jam-setengah-pagi.json";
import siang from "../../../../content/paket/pilah/sd1-mat-jam-setengah-siang.json";

describe("nama aksesibel kartu jam Pilot", () => {
  it.each([pagi, siang])("$id mendeskripsikan posisi kedua jarum dalam dua bahasa", (konten) => {
    const paket = PaketPilah.parse(konten);
    const ronde = { mode: "kelompok" as const, bins: paket.bins, items: paket.items };

    for (const bahasa of ["id", "en"] as const) {
      const t = (key: string) => paket.locale[bahasa][key];
      const html = renderToStaticMarkup(createElement(PresenterPilah, { paket, ronde, t, hasil: null, onJawab: () => {} }));
      expect(html).toContain(bahasa === "id" ? 'lang="id-ID"' : 'lang="en-US"');
      const kartu = [...html.matchAll(/<button[^>]*aria-label="([^"]+)" aria-pressed="false"[^>]*>(.*?)<\/button>/g)];
      expect(kartu).toHaveLength(paket.items.length);

      const jam = kartu.filter(([, , isi]) => isi.includes('data-varian="jam-waktu-'));
      expect(jam).toHaveLength(10);
      expect(new Set(jam.map(([, label]) => label)).size).toBe(jam.length);
      for (const [, label, isi] of jam) {
        const cocok = isi.match(/data-varian="jam-waktu-(\d+)-(00|30)"/);
        expect(cocok).not.toBeNull();
        const angka = Number(cocok![1]);
        const setengah = cocok![2] === "30";
        const berikut = angka % 12 + 1;
        expect(label).toBe(bahasa === "id"
          ? `Jam, jarum pendek ${setengah ? `di antara angka ${angka} dan ${berikut}` : `di angka ${angka}`}, jarum panjang di angka ${setengah ? 6 : 12}`
          : `Clock, short hand ${setengah ? `between ${angka} and ${berikut}` : `at ${angka}`}, long hand at ${setengah ? 6 : 12}`);
        expect(isi).toContain(bahasa === "id" ? ">jam</span>" : ">clock</span>");
      }
      const digital = kartu.filter(([, , isi]) => !isi.includes('data-varian="jam-waktu-'));
      expect(digital.map(([, label]) => label)).toEqual(paket.items.filter((item) => !item.adegan).map((item) => t(item.labelKey)));
    }
  });
});
