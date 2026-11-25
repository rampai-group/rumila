import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { buatRondeDagang } from "@akademi/mechanics";
import { PaketDagang } from "@akademi/schema";
import { PresenterDagang } from "@/components/akademi/dagang";
import kantin from "../../../../content/paket/dagang/bayar-koin-kantin-sekolah.json";
import warung from "../../../../content/paket/dagang/bayar-koin-warung.json";

describe("tampilan koin di warung dan kantin", () => {
  it.each([kantin, warung])("$id menampilkan ilustrasi barang di kartu dan label harga", (konten) => {
    const paket = PaketDagang.parse(konten);
    const bergambar = paket.goods.filter((g) => g.adegan?.jenis === "ilustrasi");
    expect(bergambar.length).toBeGreaterThan(0);
    for (const barang of bergambar) {
      const ronde = buatRondeDagang({ ...paket, goods: [barang] }, { harga: barang.price / 1000 }, 3);
      const html = renderToStaticMarkup(createElement(PresenterDagang, { paket, ronde, t: (k) => paket.locale.id[k], onJawab: () => {}, hasil: null }));
      expect(html.split(`data-ilustrasi="${barang.adegan?.varian}"`)).toHaveLength(3);
      expect(html).toContain('aria-label="Ambil 1.000 rupiah dari laci"');
    }
  });
});
