import { describe, expect, it } from "vitest";
import { PETA_KAMPUS } from "@/components/kampus-peta.generated";
import { letakkanKampus } from "@/lib/kampus-letak";

// [lebar, tinggi, aman atas, aman bawah]
const LAYAR = [
  [320, 568, 20, 0], [375, 667, 20, 0], [393, 852, 59, 34], [430, 932, 59, 34], [320, 1133, 24, 20], [507, 1133, 24, 20],
  [744, 1133, 24, 20], [768, 1024, 20, 0], [834, 1194, 24, 20], [1032, 1376, 24, 20], [1133, 744, 24, 20], [1024, 768, 20, 0],
  [1376, 1032, 24, 20], [852, 393, 0, 21], [678, 744, 24, 20], [1440, 900, 0, 0], [1920, 1080, 0, 0],
];

describe("kampus satu layar", () => {
  for (const [w, h, sa, sb] of LAYAR)
    for (const dok of [true, false])
      it(`${w}×${h}${dok ? " dengan dok" : ""}: semua gedung utuh dan gambar menutup layar`, () => {
        const atas = Math.max(16, sa) + (w >= 700 ? 56 : 106);
        const bawah = Math.max(10, sb) + (dok ? 64 : 4);
        const r = { x: 0, y: atas, w, h: h - atas - bawah };
        const l = letakkanKampus(r);
        for (const { kotak: [x, y, kw, kh] } of Object.values(PETA_KAMPUS[l.denah].tempat)) {
          expect(l.x + x * l.w).toBeGreaterThanOrEqual(-0.5);
          expect(l.x + (x + kw) * l.w).toBeLessThanOrEqual(w + 0.5);
          expect(l.y + y * l.h).toBeGreaterThanOrEqual(atas - 0.5);
          expect(l.y + (y + kh) * l.h).toBeLessThanOrEqual(h - bawah + 0.5);
        }
        expect(l.x).toBeLessThanOrEqual(0.5);
        expect(l.x + l.w).toBeGreaterThanOrEqual(w - 0.5);
        expect(l.y).toBeLessThanOrEqual(0.5);
        expect(l.y + l.h).toBeGreaterThanOrEqual(h - 0.5);
      });
});
