import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ContentPack } from "@akademi/schema";
import { buatRondeSimulasi, knobDefaults } from "@akademi/mechanics";
import { ModeUjianProvider } from "@/components/akademi/mode-ujian";
import { panggungPadat } from "@/components/akademi/dunia";
import { PresenterSimulasi } from "@/components/akademi/simulasi";
import gerbang from "../../../../content/paket/simulasi/turus-hewan-lewat-gerbang.json";
import kandang from "../../../../content/paket/simulasi/turus-hewan-pulang-kandang.json";

describe("turus sebelum ronde dimulai", () => {
  it.each([
    [gerbang, "id", false, "Mulai hitung", "Tabel turus", "turus, ketuk untuk menambah"],
    [kandang, "id", true, "Mulai hitung", "Tabel turus", "turus, ketuk untuk menambah"],
    [gerbang, "en", true, "Start counting", "Tally table", "tallies, tap to add"],
    [kandang, "en", false, "Start counting", "Tally table", "tallies, tap to add"],
  ] as const)("%s menyediakan tombol mulai dalam bahasa %s", (raw, bahasa, ujian, mulai, tabel, baris) => {
    const paket = ContentPack.parse(raw);
    if (paket.mechanic !== "simulasi") throw Error("Paket turus harus memakai simulasi");
    const ronde = buatRondeSimulasi(paket, knobDefaults(paket), 1);
    const t = (key: string) => paket.locale[bahasa][key] ?? key;
    const html = renderToStaticMarkup(createElement(ModeUjianProvider, { value: ujian }, createElement(
      PresenterSimulasi, { paket, ronde, t, hasil: null, onJawab: () => {} },
    )));
    const buttons = html.match(/<button\b[^>]*>[\s\S]*?<\/button>/g) ?? [];
    const tombolMulai = buttons.find(b => b.includes(mulai));
    const barisHitung = buttons.filter(b => b.includes(baris));

    expect(tombolMulai).toBeDefined();
    expect(panggungPadat(paket)).toBe(true);
    expect(html).not.toContain(t(paket.instructionKey));
    expect(tombolMulai).not.toContain('disabled=""');
    expect(barisHitung).toHaveLength(3);
    expect(barisHitung.every(b => b.includes('disabled=""'))).toBe(true);
    expect(html).toContain(`aria-label="${tabel}"`);
    expect(html).toContain('role="status" aria-atomic="true"></span>');
    expect(html).not.toContain("scaleX(-1)");
  });
});
