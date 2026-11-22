import { PETA_KAMPUS } from "@/components/kampus-peta.generated";

export type Denah = keyof typeof PETA_KAMPUS;
/** Letak gambar kampus di layar, dalam piksel CSS. */
export type LetakKampus = { denah: Denah; x: number; y: number; w: number; h: number };

/** Denah yang membuat gedung paling besar untuk bentuk ruang ini. */
export function pilihDenah(rasio: number): Denah {
  return rasio < 0.73 ? "tinggi" : rasio < 1.27 ? "sedang" : "lebar";
}

/** Bagian aman gambar (semua gedung + gerbang) dimuat utuh dan ditengahkan di ruang bebas. */
export function letakkanKampus(ruang: { x: number; y: number; w: number; h: number }): LetakKampus {
  const denah = pilihDenah(ruang.w / ruang.h);
  const p = PETA_KAMPUS[denah];
  const [ax, ay, aw, ah] = p.aman;
  const k = Math.min(ruang.w / (aw * p.w), ruang.h / (ah * p.h));
  const [w, h] = [p.w * k, p.h * k];
  return { denah, w, h, x: ruang.x + ruang.w / 2 - (ax + aw / 2) * w, y: ruang.y + ruang.h / 2 - (ay + ah / 2) * h };
}
