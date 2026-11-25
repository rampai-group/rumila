import { expect, it } from "vitest";
import { PaketDagang } from "@akademi/schema";
import { buatRondeUnik, geserKnob, knobDefaults, kunciRonde, nilai } from "@akademi/mechanics";
import tokoMainan from "../../../../content/paket/dagang/kasir-kembalian-toko-mainan.json";
import warung from "../../../../content/paket/dagang/kasir-kembalian-warung.json";

it.each([PaketDagang.parse(tokoMainan), PaketDagang.parse(warung)])(
  "$id mengisi sepuluh ronde dengan barang berbeda dan harga yang sesuai",
  (paket) => {
    expect(paket.rounds).toBe(10);
    for (const seed of [0, 104729, 209458]) {
      let knobs = knobDefaults(paket);
      const riwayat: string[] = [];
      const barang = new Set<string>();
      const kembalian = new Set<number>();

      for (let i = 0; i < paket.rounds; i++) {
        const hasil = buatRondeUnik(paket, knobs, seed + i * 7919, riwayat);
        if (hasil?.mechanic !== "dagang") throw new Error(`Tidak ada ronde dagang pada ronde ${i + 1}`);
        const { ronde } = hasil;
        expect(ronde.pesanan).toHaveLength(1);
        const pesanan = ronde.pesanan[0];
        expect(pesanan.qty).toBe(1);
        expect(paket.goods.find((g) => g.id === pesanan.goodId)?.price).toBe(ronde.harga);
        expect(ronde.dibayar).toBe(10_000);
        const selisih = ronde.dibayar - ronde.harga;
        expect(nilai(paket, hasil, { uang: Array(selisih / 1_000).fill(1_000) }).benar).toBe(true);

        riwayat.push(kunciRonde(hasil));
        barang.add(pesanan.goodId);
        kembalian.add(selisih);
        if (i % 2 === 1) knobs = geserKnob(paket, knobs, 1);
      }

      expect(barang).toEqual(new Set(paket.goods.map((g) => g.id)));
      expect(barang.size).toBe(10);
      expect(kembalian).toEqual(new Set([1_000, 2_000, 3_000, 4_000, 5_000]));
    }
  },
);
