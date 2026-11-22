import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { buatRondeUrutkan } from "@akademi/mechanics";
import { PaketPilah, PaketUrutkan } from "@akademi/schema";
import { Benda } from "@/components/akademi/benda";

function konten(mekanik: "pilah" | "urutkan", id: string): unknown {
  return JSON.parse(readFileSync(join(process.cwd(), "content", "paket", mekanik, `${id}.json`), "utf8"));
}

describe("regresi QA konten Akademi SD", () => {
  it("soal kasus terburuk pencarian 500 buku hanya punya satu angka yang cocok", () => {
    const p = PaketPilah.parse(konten("pilah", "sd6-kode-bagi-dua-toko-buku"));
    const soal = p.pilihan.find((q) => q.id === "q12")!;
    const hitungCek = (cari: number) => {
      let kiri = 1;
      let kanan = 500;
      let cek = 0;
      while (kiri <= kanan) {
        const tengah = Math.floor((kiri + kanan) / 2);
        cek++;
        if (cari === tengah) return cek;
        if (cari < tengah) kanan = tengah - 1;
        else kiri = tengah + 1;
      }
      return cek;
    };
    const terburuk = Math.max(...Array.from({ length: 500 }, (_, i) => hitungCek(i + 1)));
    for (const bahasa of ["id", "en"] as const) {
      const angka = soal.choices.map((id) => Number(p.locale[bahasa][p.items.find((i) => i.id === id)!.labelKey]));
      expect(angka.every(Number.isFinite)).toBe(true);
      expect(soal.choices.filter((_, i) => angka[i] === terburuk)).toEqual([soal.correct]);
    }
  });

  it.each([
    "sd3-kode-perjalanan-pesan",
    "sd4-kode-jalan-data-kota",
    "sd4-kode-perjalanan-pesan",
    "sd6-kode-api-kota",
    "sd6-kode-minta-jawab-api",
  ])("%s tetap mencapai tujuan pada setiap pengaturan panjang", (id) => {
    const p = PaketUrutkan.parse(konten("urutkan", id));
    const batas = p.knobs.steps;
    for (const urutan of p.sequences) {
      for (let steps = batas.min; steps <= batas.max; steps += batas.step) {
        const r = buatRondeUrutkan({ ...p, sequences: [urutan] }, { steps }, 3);
        expect(r.correct).toHaveLength(Math.min(urutan.steps.length, steps));
        expect(r.correct[0]).toBe(urutan.steps[0].id);
        expect(r.correct.at(-1)).toBe(urutan.steps.at(-1)?.id);
      }
    }
  });

  it("tiap salinan kaus kaki menunjukkan satu benda", () => {
    const p = PaketPilah.parse(konten("pilah", "sd1-mat-genap-ganjil-20"));
    for (const jumlah of [6, 7, 9]) {
      const item = p.items.find((i) => i.id === `kaus-kaki-${jumlah}`)!;
      const html = renderToStaticMarkup(createElement(Benda, { v: item }));
      expect(html.match(/data-adegan="kaus-kaki"/g)).toHaveLength(jumlah);
      expect(html).not.toContain("🧦");
    }
  });

  it("segitiga pada kartu sama sisi benar-benar punya tiga sisi yang sama", () => {
    const p = PaketPilah.parse(konten("pilah", "sd3-mat-segi-banyak-beraturan"));
    const item = p.items.find((i) => i.id === "segitiga-sama-sisi")!;
    const html = renderToStaticMarkup(createElement(Benda, { v: item }));
    const koordinat = html.match(/points="([^"]+)"/)?.[1].split(" ").map((p) => p.split(",").map(Number));
    expect(koordinat).toHaveLength(3);
    const panjang = koordinat!.map(([x, y], i, a) => Math.hypot(x - a[(i + 1) % a.length][0], y - a[(i + 1) % a.length][1]));
    expect(panjang[0]).toBeCloseTo(panjang[1]);
    expect(panjang[1]).toBeCloseTo(panjang[2]);
  });

  it("semua kartu pizza menggambar jumlah irisan yang disebut pada label", () => {
    const p = PaketPilah.parse(konten("pilah", "sd3-mat-potongan-pizza-senilai"));
    const pizza = p.items.filter((i) => i.adegan?.jenis === "potong");
    expect(pizza).toHaveLength(6);
    for (const item of pizza) {
      const [terisi, , jumlah] = p.locale.id[item.labelKey].split(" ");
      const html = renderToStaticMarkup(createElement(Benda, { v: item }));
      expect(html.match(/data-juring=/g)).toHaveLength(Number(jumlah));
      expect(html.match(/data-juring="isi"/g)).toHaveLength(Number(terisi));
    }
  });

  it("sudut potongan pizza sesuai jumlah juring dan raknya", () => {
    const p = PaketPilah.parse(konten("pilah", "sd3-mat-sudut-potongan-pizza"));
    const pizza = p.items.filter((i) => i.adegan?.jenis === "potong");
    expect(pizza).toHaveLength(6);
    for (const item of pizza) {
      const jumlah = Number(p.locale.id[item.labelKey].match(/dibagi (\d+)/)?.[1]);
      const derajat = 360 / jumlah;
      const rak = derajat < 90 ? "kecil" : derajat === 90 ? "siku" : derajat === 180 ? "lurus" : "besar";
      const html = renderToStaticMarkup(createElement(Benda, { v: item }));
      expect(item.bin).toBe(rak);
      expect(html.match(/data-juring=/g)).toHaveLength(jumlah);
      const juring = html.match(/data-juring="isi"><path d="M65 50L([\d.]+) ([\d.]+)A43 43 0 0 1 ([\d.]+) ([\d.]+)Z"/);
      expect(juring).not.toBeNull();
      const [, x1, y1, x2, y2] = juring!.map(Number);
      const a = Math.atan2(y1 - 50, x1 - 65);
      const b = Math.atan2(y2 - 50, x2 - 65);
      expect((b - a) * 180 / Math.PI).toBeCloseTo(derajat);
    }
  });

  it("jarum jam membentuk sudut terkecil yang sesuai pada setiap kartu", () => {
    const p = PaketPilah.parse(konten("pilah", "sd3-mat-sudut-jarum-jam"));
    expect(p.items).toHaveLength(11);
    for (const item of p.items) {
      const pukul = Number(p.locale.id[item.labelKey].split(" ").at(-1));
      const derajat = 30 * Math.min(pukul, 12 - pukul);
      const rak = derajat < 90 ? "kecil" : derajat === 90 ? "siku" : derajat === 180 ? "lurus" : "besar";
      const html = renderToStaticMarkup(createElement(Benda, { v: item }));
      expect(item.bin).toBe(rak);
      const jarum = html.match(/data-jarum="jam" x1="50" y1="50" x2="([\d.]+)" y2="([\d.]+)"/);
      expect(jarum).not.toBeNull();
      const [, x2, y2] = jarum!.map(Number);
      expect(Math.abs(Math.atan2(x2 - 50, 50 - y2)) * 180 / Math.PI).toBeCloseTo(derajat);
      expect(html).toContain(`M50 32A18 18 0 0 ${pukul <= 6 ? 1 : 0} `);
    }
  });
});
