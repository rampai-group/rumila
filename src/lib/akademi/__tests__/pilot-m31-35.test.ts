import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { KOMPETENSI, PAKET } from "../konten";
import { petaJenjang } from "../peta";
import { GambarAdeganSd } from "@/components/akademi/adegan-gambar-sd";

const misi = petaJenjang({}, new Set(), KOMPETENSI, "SD1", ["MAT", "KODE", "SAINS"]).unit.flatMap(u => u.misi).filter(m => m.nomor >= 31 && m.nomor <= 35);
describe("Pilot M31–35", () => {
  it("memetakan tepat lima misi dan sepuluh paket utama", () => {
    expect(misi.map(m => m.kompetensi.id)).toEqual(["MAT.SD1.WAKTU.01", "MAT.SD1.WAKTU.02", "KODE.SD1.DEBUG.01", "SAINS.SD1.BUMI.01", "MAT.SD1.DATA.01"]);
    for (const m of misi) expect(PAKET.filter(p => p.competencyIds[0] === m.kompetensi.id)).toHaveLength(2);
  });
  it("menggambar dua jarum sesuai kunci waktu, termasuk jarum jam di tengah pada setengah jam", () => {
    const packs = PAKET.filter(p => p.competencyIds[0] === "MAT.SD1.WAKTU.01");
    let jumlah = 0;
    for (const pack of packs) {
      if (pack.mechanic !== "pilah") throw Error(pack.id);
      for (const item of pack.items.filter(i => i.emoji)) {
        const half = item.bin.startsWith("setengah-");
        const hour = Number(item.bin.split("-")[1]) - (half ? 1 : 0);
        expect(item.adegan?.varian).toBe(`jam-waktu-${hour}-${half ? "30" : "00"}`);
        const html = renderToStaticMarkup(createElement(GambarAdeganSd, { adegan: item.adegan!, s: 100 }));
        const point = (kind: string) => {
          const tag = html.match(new RegExp(`<line data-jarum="${kind}"[^>]+`))![0];
          return [Number(tag.match(/x2="([^"]+)"/)![1]), Number(tag.match(/y2="([^"]+)"/)![1])];
        };
        expect(point("menit")[0]).toBeCloseTo(50);
        expect(point("menit")[1]).toBeCloseTo(half ? 79 : 21);
        const hourTip = point("jam");
        const angle = ((Math.atan2(hourTip[0] - 50, 50 - hourTip[1]) * 180 / Math.PI) + 360) % 360;
        expect(angle).toBeCloseTo((hour * 30 + (half ? 15 : 0)) % 360);
        expect((html.match(/<text /g) ?? []).length).toBe(12);
        jumlah++;
      }
    }
    expect(jumlah).toBe(20);
  });
});
