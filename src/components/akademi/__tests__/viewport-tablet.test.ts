import { describe, expect, it } from "vitest";
import { buatRondeNavigasi, knobDefaults } from "@akademi/mechanics";
import { ContentPack } from "@akademi/schema";
import ulangi from "../../../../content/paket/navigasi/ulangi-berapa-kali-lurus.json";
import { jendelaPenuh, panggungPadat, viewportTablet } from "../dunia";

describe("viewport tablet", () => {
  const ipad = { w: 820, h: 1180 };
  it("jendela penuh berdiri maupun miring boleh diperbesar", () => {
    expect(jendelaPenuh(ipad, 820)).toBe(true);
    expect(jendelaPenuh(ipad, 1180)).toBe(true);
    expect(jendelaPenuh(ipad, 0)).toBe(true);
  });
  it("Split View dan Slide Over tidak diperbesar", () => {
    for (const w of [320, 375, 507, 585, 678]) expect(jendelaPenuh(ipad, w)).toBe(false);
  });
  it("iPad mini berdiri tetap apa adanya, iPad miring diperbesar", () => {
    expect(viewportTablet({ w: 744, h: 1133 }, false)).toBeNull();
    expect(viewportTablet(ipad, true)).toContain("width=1007");
  });
  it("bilah Safari mengurangi ruang, jadi tidak boleh ikut diperbesar", () => {
    expect(viewportTablet({ w: 744, h: 1133 }, true, 611)).toBeNull();
    expect(viewportTablet(ipad, true, 687)).toBeNull();
    expect(viewportTablet(ipad, true, 776)).toContain("width=1064");
  });
});

describe("panel navigasi ringkas", () => {
  it("mengikuti bentuk papan setiap ronde dalam paket yang sama", () => {
    const paket = ContentPack.parse(ulangi);
    if (paket.mechanic !== "navigasi") throw Error("Paket Ulangi harus memakai navigasi");
    const ronde = buatRondeNavigasi(paket, knobDefaults(paket), 1);
    const satuBaris = paket.grids.find((g) => g.h === 1)!;
    const duaBaris = paket.grids.find((g) => g.h === 2)!;

    expect(panggungPadat(paket, { mechanic: "navigasi", ronde: { ...ronde, grids: [satuBaris] } })).toBe(true);
    expect(panggungPadat(paket, { mechanic: "navigasi", ronde: { ...ronde, grids: [duaBaris] } })).toBe(false);
    expect(panggungPadat(paket, { mechanic: "navigasi", ronde: { ...ronde, grids: [satuBaris, duaBaris] } })).toBe(false);
    expect(panggungPadat(paket, { mechanic: "navigasi", ronde: { ...ronde, grids: [satuBaris], debug: true } })).toBe(false);
  });
});
