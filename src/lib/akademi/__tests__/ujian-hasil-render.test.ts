import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { LayarUjian } from "@/components/akademi/ujian";
import { KOMPETENSI } from "../katalog";
import type { HasilUjian } from "../ujian";
import { useUjian } from "../ujian-klien";
import { LEARNER, SESSION } from "./helper";

vi.mock("@/components/akademi/akademi.css", () => ({}));
vi.mock("@/components/koding/koding.css", () => ({}));
vi.mock("next/navigation", async (asli) => ({
  ...await asli<typeof import("next/navigation")>(),
  useRouter: () => ({ push: vi.fn() }),
}));
vi.mock("@/lib/store", async (asli) => ({
  ...await asli<typeof import("@/lib/store")>(),
  useMe: () => ({ id: LEARNER }),
}));
vi.mock("../ujian-klien", async (asli) => ({
  ...await asli<typeof import("../ujian-klien")>(),
  useUjian: vi.fn(),
}));

const final: HasilUjian = { jenis: "kenaikan", level: "SD6", ruang: "", sessionId: SESSION, benar: 12, total: 20, nilai: 60, lulus: false, at: "2026-11-24T00:00:00Z" };

function buka(hasil: HasilUjian[]) {
  vi.mocked(useUjian).mockReturnValue(hasil);
  return renderToStaticMarkup(createElement(LayarUjian, {
    jenis: "kenaikan",
    level: "SD6",
    ruang: "",
    kompetensiIds: KOMPETENSI.filter((c) => c.level === "SD6").map((c) => c.id),
    judul: "Seluruh jenjang",
  }));
}

describe("membuka kembali Ujian Akhir Legenda", () => {
  it("menampilkan nilai resmi dan sertifikat tanpa menawarkan ujian ulang", () => {
    const html = buka([final]);
    expect(html).toContain("12/20 benar");
    expect(html).toContain("Cukup");
    expect(html).toContain("menuntaskan Akademi Rinoya");
    expect(html).toContain('href="/akademi/sertifikat/legenda"');
    expect(html).not.toContain("Mulai Ujian Akhir");
  });

  it("untuk hasil pending hanya menawarkan sinkronisasi, tanpa nilai resmi atau sertifikat", () => {
    const html = buka([{ ...final, pending: true }]);
    expect(html).toContain("Hasil belum dikonfirmasi");
    expect(html).toContain("Coba kirim lagi");
    expect(html).not.toContain("/akademi/sertifikat/legenda");
    expect(html).not.toContain("Mulai Ujian Akhir");
  });
});
