import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import sharp from "sharp";
import { HurufSimetri } from "@/components/akademi/huruf-simetri";

async function bedaCermin(kata: string, arah: "tegak" | "mendatar") {
  const svg = renderToStaticMarkup(createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 520, height: 400, viewBox: "0 0 130 100" }, createElement(HurufSimetri, { kata })));
  const { data, info } = await sharp(Buffer.from(svg)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let beda = 0, tinta = 0;
  for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
    const a = data[(y * info.width + x) * 4 + 3];
    const xx = arah === "tegak" ? info.width - 1 - x : x;
    const yy = arah === "mendatar" ? info.height - 1 - y : y;
    const b = data[(yy * info.width + xx) * 4 + 3];
    beda += Math.abs(a - b); tinta += a;
  }
  return beda / tinta;
}

describe("glyph dan kata untuk soal garis simetri", () => {
  const tegak = [..."AHIMOTUVWXY", "TAAT", "AHA"];
  const mendatar = [..."BCDEHIKOX", "KODE", "HOBI"];
  for (const [arah, daftar] of [["tegak", tegak], ["mendatar", mendatar]] as const) {
    it.each(daftar)(`%s cocok dicerminkan ${arah}, termasuk jarak antarkarakter`, async (kata) => {
      // Anti-aliasing can differ by less than 0.5%; geometry must otherwise overlap.
      expect(await bedaCermin(kata, arah)).toBeLessThan(0.005);
    });
    it.each([..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"].filter((huruf) => !daftar.includes(huruf)))(`%s tidak memiliki sumbu ${arah}`, async (kata) => {
      expect(await bedaCermin(kata, arah)).toBeGreaterThan(0.1);
    });
  }
  it.each(["KATA", "BOLA", "SAPI", "HUJAN", "BATU", "MEJA"])("pengecoh %s tidak simetris mendatar", async (kata) => {
    expect(await bedaCermin(kata, "mendatar")).toBeGreaterThan(0.1);
  });
  it.each(["TAPI", "TOKO", "MATA", "ADA", "API", "AKU"])("pengecoh %s tidak simetris tegak", async (kata) => {
    expect(await bedaCermin(kata, "tegak")).toBeGreaterThan(0.1);
  });
});
