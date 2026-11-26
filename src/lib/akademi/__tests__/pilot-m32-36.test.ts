import { describe, expect, it } from "vitest";
import { PAKET, KOMPETENSI } from "../konten";
import { petaJenjang } from "../peta";
import { isIlustrasiAwal } from "@/components/akademi/ilustrasi-awal";
import { adaPerintahSetelahBintang, jalankan } from "@akademi/mechanics";
import type { NavBlock } from "@akademi/mechanics";

const misi = petaJenjang({}, new Set(), KOMPETENSI, "SD1", ["MAT", "KODE", "SAINS"]).unit.flatMap(u => u.misi).filter(m => m.nomor >= 32 && m.nomor <= 36);
const paket = (nomor: number) => PAKET.filter(p => p.competencyIds[0] === misi.find(m => m.nomor === nomor)!.kompetensi.id);

describe("Pilot: peta gabungan Misi 32–36", () => {
  it("memakai tepat lima kompetensi dan sepuluh paket utama", () => {
    expect(misi.map(m => m.kompetensi.id)).toEqual(["MAT.SD1.WAKTU.02", "KODE.SD1.DEBUG.01", "SAINS.SD1.BUMI.01", "MAT.SD1.DATA.01", "KODE.SD1.DATA.01"]);
    for (const m of misi) expect(paket(m.nomor)).toHaveLength(2);
  });
  it("mengurutkan semua hari/bulan dari titik mulai, termasuk pergantian pekan/tahun", () => {
    for (const p of paket(32)) {
      if (p.mechanic !== "urutkan") throw Error(p.id);
      const siklus = p.id.endsWith("hari") ? ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "minggu"] : ["januari", "februari", "maret", "april", "mei", "juni", "juli", "agustus", "september", "oktober", "november", "desember"];
      for (const s of p.sequences) {
        const awal = siklus.indexOf(s.steps[0].id);
        expect(awal).toBeGreaterThanOrEqual(0);
        expect(p.locale.id[s.titleKey!].toLowerCase()).toContain(siklus[awal]);
        expect(s.steps.map(x => x.id)).toEqual(s.steps.map((_, i) => siklus[(awal + i) % siklus.length]));
      }
    }
  });
  it("setiap program rusak bisa diperbaiki dengan satu perubahan dan habis tepat di bintang", () => {
    for (const p of paket(33)) {
      if (p.mechanic !== "navigasi") throw Error(p.id);
      for (const g of p.grids) {
        const awal = g.program!;
        const kandidat: NavBlock[][] = [];
        awal.forEach((b, i) => {
          if (b.cmd === "ulangi") {
            for (let n = 2; n <= 6; n++) { const q = structuredClone(awal); (q[i] as typeof b).n = n; kandidat.push(q); }
            b.body.forEach((_, j) => {
              for (const cmd of ["maju", "kiri", "kanan"] as const) { const q = structuredClone(awal); (q[i] as typeof b).body[j] = { cmd }; kandidat.push(q); }
            });
          } else for (const cmd of ["maju", "kiri", "kanan"] as const) { const q = structuredClone(awal); q[i] = { cmd }; kandidat.push(q); }
        });
        const selesai = (q: NavBlock[]) => { const run = jalankan(g, q); return run.outcome === "bintang" && !adaPerintahSetelahBintang(q, run); };
        expect(selesai(awal), g.id).toBe(false);
        expect(kandidat.some(selesai), g.id).toBe(true);
      }
    }
  });
  it("menggambar tempat air/darat dengan ilustrasi yang terdaftar dan kunci kategori yang tepat", () => {
    const perairan = new Set(["laut", "lautbiru", "samudra", "sungai", "danau", "kolam", "airterjun", "waduk", "teluk"]);
    for (const p of paket(34)) {
      if (p.mechanic !== "pilah") throw Error(p.id);
      for (const i of p.items) {
        expect(i.bin, i.id).toBe(perairan.has(i.id) ? "air" : "darat");
        expect(i.adegan?.jenis, i.id).toBe("ilustrasi");
        expect(isIlustrasiAwal(i.adegan!.varian!), i.id).toBe(true);
      }
    }
  });
  it("mencocokkan kedua ciri Carroll pada setiap benda", () => {
    const bulat = new Set(["apel", "tomat", "jeruk", "bola", "bulan-purnama", "wajah-senyum"]);
    for (const p of paket(35)) {
      if (p.mechanic !== "pilah") throw Error(p.id);
      const warna = p.id.includes("kuning") ? "kuning" : "merah";
      for (const i of p.items) {
        const cocokWarna = i.id.includes(warna) || (warna === "kuning" ? ["bulan-purnama", "wajah-senyum"].includes(i.id) : ["apel", "tomat"].includes(i.id));
        const cocokBulat = i.id.startsWith("lingkaran") || bulat.has(i.id);
        expect(i.bin, i.id).toBe(`${cocokWarna ? warna : "lain"}-${cocokBulat ? "bulat" : "sudut"}`);
      }
      expect(new Set(p.items.map(i => i.bin)).size).toBe(4);
    }
  });
  it("membedakan ya/tidak listrik dan roda untuk setiap benda", () => {
    const listrik = new Set(["lamp", "television", "laptop", "phone", "radio", "printer"]);
    const roda = new Set(["car", "bus", "bicycle", "scooter", "shopping-cart", "skateboard", "truck"]);
    for (const p of paket(36)) {
      if (p.mechanic !== "pilah") throw Error(p.id);
      const ya = p.id.endsWith("listrik") ? listrik : roda;
      for (const i of p.items) expect(i.bin, i.id).toBe(ya.has(i.id) ? "ya" : "tidak");
    }
  });
});
