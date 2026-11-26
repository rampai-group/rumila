import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { KOMPETENSI, PAKET } from "../konten";
import { petaJenjang } from "../peta";
import { GambarIlustrasiAwal, isIlustrasiAwal } from "@/components/akademi/ilustrasi-awal";

const misi = petaJenjang({}, new Set(), KOMPETENSI, "SD1", ["MAT", "KODE", "SAINS"]).unit.flatMap(u => u.misi).filter(m => m.nomor >= 36 && m.nomor <= 40);
describe("Pilot M36–40", () => {
  it("memakai lima kompetensi dan sepuluh paket utama peta gabungan", () => {
    expect(misi.map(m => m.kompetensi.id)).toEqual(["KODE.SD1.DATA.01", "SAINS.SD1.MATAHARI.01", "MAT.SD1.POLA.01", "KODE.SD1.PERANGKAT.01", "KODE.SD1.PERANGKAT.02"]);
    for (const m of misi) expect(PAKET.filter(p => p.competencyIds[0] === m.kompetensi.id)).toHaveLength(2);
  });
  it("menunjukkan genangan pada kedua kondisi dan batu di dalam gua", () => {
    const p = PAKET.find(p => p.id === "sd1-sains-cepat-atau-lambat-hangat")!;
    if (p.mechanic !== "pilah") throw Error(p.id);
    for (const [id, bin, tanda] of [["genangan", "cepat", 'data-kondisi="terik"'], ["genanganteduh", "lambat", 'data-kondisi="teduh"'], ["batugua", "lambat", 'data-benda="batu-di-gua"']]) {
      const item = p.items.find(i => i.id === id)!;
      expect(item.bin).toBe(bin);
      expect(item.adegan?.jenis).toBe("ilustrasi");
      expect(isIlustrasiAwal(item.adegan!.varian!)).toBe(true);
      const html = renderToStaticMarkup(createElement(GambarIlustrasiAwal, { gambar: item.adegan!.varian!, s: 100 }));
      expect(html).toContain(tanda);
      if (id.startsWith("genangan")) expect(html).toContain('data-benda="genangan"');
    }
  });
  it("menjaga kontras ukuran pada semua pola besar/kecil", () => {
    const packs = PAKET.filter(p => p.competencyIds[0] === "MAT.SD1.POLA.01");
    for (const p of packs) {
      if (p.mechanic !== "pola") throw Error(p.id);
      for (const item of p.items.filter(i => i.id.endsWith("-besar"))) {
        const kecil = p.items.find(i => i.id === item.id.replace(/-besar$/, "-kecil"))!;
        expect(item.scale! / kecil.scale!).toBeGreaterThan(2);
      }
      for (const pattern of p.patterns ?? []) {
        expect(pattern.unit.length).toBeGreaterThanOrEqual(2);
        expect(pattern.unit.length).toBeLessThanOrEqual(3);
        expect(pattern.unit.every(id => p.items.some(i => i.id === id))).toBe(true);
      }
    }
  });
});
