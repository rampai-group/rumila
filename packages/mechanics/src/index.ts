// Pintu masuk @akademi/mechanics: re-export tiap mekanik + buatRonde/nilai yang memilih lewat mechanic.

import type { ContentPack } from "@akademi/schema";
import { buatRondeDagang, nilaiDagang } from "./dagang";
import { buatRondeNavigasi, nilaiNavigasi } from "./navigasi";
import { buatRondePilah, nilaiPilah } from "./pilah";
import { buatRondePola, nilaiPola } from "./pola";
import { buatRondeSimulasi, nilaiSimulasi } from "./simulasi";
import type {
  Hasil, JawabanDagang, JawabanNavigasi, JawabanPilah, JawabanPola, JawabanSimulasi, JawabanUrutkan, Knobs,
  RondeDagang, RondeNavigasi, RondePilah, RondePola, RondeSimulasi, RondeUrutkan,
} from "./types";
import { buatRondeUrutkan, nilaiUrutkan } from "./urutkan";

export * from "./types";
export * from "./rng";
export * from "./pilah";
export * from "./urutkan";
export * from "./dagang";
export * from "./navigasi";
export * from "./pola";
export * from "./simulasi";
export { knobDefaults } from "./rng";

/** Ronde terbungkus diskriminator `mechanic`, supaya runner bisa memilih presenter dan fungsi nilai. */
export type Ronde =
  | { mechanic: "pilah"; ronde: RondePilah }
  | { mechanic: "urutkan"; ronde: RondeUrutkan }
  | { mechanic: "dagang"; ronde: RondeDagang }
  | { mechanic: "navigasi"; ronde: RondeNavigasi }
  | { mechanic: "pola"; ronde: RondePola }
  | { mechanic: "simulasi"; ronde: RondeSimulasi };
export type Jawaban = JawabanPilah | JawabanUrutkan | JawabanDagang | JawabanNavigasi | JawabanPola | JawabanSimulasi;

export function buatRonde(p: ContentPack, knobs: Knobs, seed: number): Ronde {
  switch (p.mechanic) {
    case "pilah": return { mechanic: "pilah", ronde: buatRondePilah(p, knobs, seed) };
    case "urutkan": return { mechanic: "urutkan", ronde: buatRondeUrutkan(p, knobs, seed) };
    case "dagang": return { mechanic: "dagang", ronde: buatRondeDagang(p, knobs, seed) };
    case "navigasi": return { mechanic: "navigasi", ronde: buatRondeNavigasi(p, knobs, seed) };
    case "pola": return { mechanic: "pola", ronde: buatRondePola(p, knobs, seed) };
    case "simulasi": return { mechanic: "simulasi", ronde: buatRondeSimulasi(p, knobs, seed) };
  }
}

/**
 * Ronde berikutnya tanpa mengulang soal: coba beberapa seed turunan dan ambil yang belum pernah keluar di sesi ini
 * (`riwayat` = kunci ronde sebelumnya, lihat `kunciRonde`). Coba tingkat kesulitan lain sebelum memakai ulang soal.
 */
export function buatRondeBaru(p: ContentPack, knobs: Knobs, seed: number, riwayat: readonly string[], percobaan = 24): Ronde {
  return cariRondeBaru(p, knobs, seed, riwayat, percobaan, true) ?? buatRonde(p, knobs, seed);
}

/** Untuk sesi latihan: berhenti ketika tidak ada varian unik yang ditemukan. */
export function buatRondeUnik(p: ContentPack, knobs: Knobs, seed: number, riwayat: readonly string[], percobaan = 48): Ronde | null {
  return cariRondeBaru(p, knobs, seed, riwayat, percobaan, false);
}

function cariRondeBaru(p: ContentPack, knobs: Knobs, seed: number, riwayat: readonly string[], percobaan: number, bolehUlang: boolean): Ronde | null {
  const pernah = new Set(riwayat);
  const terakhir = riwayat[riwayat.length - 1];
  const turunan = (i: number) => (seed + Math.imul(i, 0x9e3779b1)) >>> 0;
  let bedaTerakhir: Ronde | undefined;
  // Pilah kelompok: soal "baru" yang benda-bendanya sebagian besar baru saja tampil tetap terasa dobel bagi anak,
  // jadi dari semua calon baru dipilih yang paling sedikit berbagi benda dengan ronde-ronde terakhir.
  const kelompok = p.mechanic === "pilah" && p.mode !== "pilih";
  const bendaLalu = kelompok ? riwayat.map((k) => { try { const j = JSON.parse(k); return j[0] === "pilah-kelompok" ? new Set<string>(j[1]) : new Set<string>(); } catch { return new Set<string>(); } }) : [];
  const tumpang = (r: Ronde) => {
    if (r.mechanic !== "pilah" || r.ronde.mode !== "kelompok") return 0;
    const ids = r.ronde.items.map((x) => x.id);
    return bendaLalu.reduce((s, lalu, i) => s + ids.filter((id) => lalu.has(id)).length / (bendaLalu.length - i), 0);
  };
  let terbaik: { r: Ronde; skor: number } | undefined;
  for (let i = 0; i < percobaan; i++) {
    const r = buatRonde(p, knobs, turunan(i));
    const k = kunciRonde(r);
    if (!pernah.has(k)) {
      if (!kelompok) return r;
      const skor = tumpang(r);
      if (!terbaik || skor < terbaik.skor) terbaik = { r, skor };
      continue;
    }
    if (!bedaTerakhir && k !== terakhir) bedaTerakhir = r;
  }
  if (terbaik) return terbaik.r;
  // Utamakan tingkat kesulitan satu langkah dari knob adaptif.
  const tetangga = knobTetangga(p, knobs);
  for (let i = 0; i < percobaan; i++) {
    const r = buatRonde(p, tetangga[i % Math.max(1, tetangga.length)] ?? knobs, turunan(percobaan + i));
    if (!pernah.has(kunciRonde(r))) return r;
  }
  // Tingkat terdekat bisa habis sementara paket masih punya soal pada tingkat lain.
  const cadangan = p.mechanic === "navigasi" ? [{}] : knobCadangan(p, knobs, tetangga);
  for (const k of cadangan) {
    for (let i = 0; i < percobaan; i++) {
      const r = buatRonde(p, k, turunan(2 * percobaan + i));
      const key = kunciRonde(r);
      if (!pernah.has(key)) return r;
      if (!bedaTerakhir && key !== terakhir) bedaTerakhir = r;
    }
  }
  if (!bolehUlang) return null;
  if (bedaTerakhir) return bedaTerakhir;
  for (let i = 0; i < percobaan; i++) {
    const r = buatRonde(p, p.mechanic === "navigasi" ? {} : (tetangga[i % Math.max(1, tetangga.length)] ?? knobs), turunan(2 * percobaan + i));
    if (kunciRonde(r) !== terakhir) return r;
  }
  return buatRonde(p, knobs, seed);
}

/** Knob yang bergeser satu langkah (naik dulu, lalu turun), dengan batas yang sama seperti runner. */
function knobTetangga(p: ContentPack, knobs: Knobs): Knobs[] {
  const out: Knobs[] = [];
  for (const arah of [1, -1])
    for (const [kunci, k] of Object.entries(p.knobs)) {
      const kini = knobs[kunci];
      if (typeof kini !== "number") continue;
      const baru = Math.min(k.max, Math.max(k.min, kini + arah * (k.step ?? 1)));
      if (baru !== kini) out.push({ ...knobs, [kunci]: baru });
    }
  return out;
}

/** Telusuri kombinasi knob lain menurut jarak, mulai dari tetangga yang sudah dicoba. */
function* knobCadangan(p: ContentPack, knobs: Knobs, tetangga: Knobs[]): Iterable<Knobs> {
  const nama = Object.keys(p.knobs);
  // Abaikan selisih pembulatan langkah pecahan saat mengunjungi ulang kombinasi yang sama.
  const kunci = (k: Knobs) => nama.map((n) => k[n]?.toPrecision(14)).join("|");
  const antre = [...tetangga];
  const dilihat = new Set([knobs, ...tetangga].map(kunci));
  for (let i = 0; i < antre.length; i++) {
    for (const baru of knobTetangga(p, antre[i])) {
      const id = kunci(baru);
      if (dilihat.has(id)) continue;
      dilihat.add(id);
      antre.push(baru);
      yield baru;
    }
  }
}

/** Kunci pembanding dua ronde menurut mata anak: soal yang sama dengan susunan acak lain (pilihan diacak, gambar cerita
 *  dikocok, pasangan kiri-kanan ditukar, laci uang diurut beda) tetap dianggap soal yang sama. */
export function kunciRonde(r: Ronde): string {
  const urut = (xs: readonly unknown[]) => xs.map((x) => JSON.stringify(x)).sort();
  switch (r.mechanic) {
    case "pilah":
      return r.ronde.mode === "pilih"
        ? JSON.stringify(["pilah-pilih", r.ronde.promptKey, r.ronde.correct])
        : JSON.stringify(["pilah-kelompok", r.ronde.items.map((i) => i.id).sort()]);
    case "urutkan": {
      // kartu yang benar-benar tampil (urutan benar, tanpa id): dua urutan berbeda yang setelah dipotong knob `steps`
      // menampilkan kartu sama = soal sama (temuan audit 15 Nov 2026; dulu memakai sequenceId)
      const byId = new Map(r.ronde.shown.map((s) => [s.id, s] as const));
      const kartu = r.ronde.correct.map((id) => {
        const { id: _id, ...tampak } = (byId.get(id) ?? { id }) as Record<string, unknown>;
        void _id;
        return JSON.stringify(tampak);
      });
      return JSON.stringify(["urutkan", r.ronde.mode, kartu]);
    }
    case "pola":
      return JSON.stringify(["pola", r.ronde.mode, r.ronde.correct, r.ronde.shown, r.ronde.wrongIndex ?? null, r.ronde.pilih ?? null, r.ronde.mode === "cipta" ? r.ronde.palette.map((i) => i.id).sort() : null]);
    case "dagang":
      return JSON.stringify(["dagang", { ...r.ronde, laci: [...r.ronde.laci].sort((a, b) => a - b), lembar: [...r.ronde.lembar].sort((a, b) => a - b), benda: [...r.ronde.benda].sort(), pesanan: urut(r.ronde.pesanan) }]);
    case "simulasi":
      return JSON.stringify(["simulasi", { ...r.ronde, items: r.ronde.items.map((i) => i.id).sort(), options: [...r.ronde.options].sort((a, b) => a - b) }]);
    default:
      return JSON.stringify(r);
  }
}

export function nilai(_p: ContentPack, r: Ronde, j: Jawaban): Hasil {
  switch (r.mechanic) {
    case "pilah": return nilaiPilah(r.ronde, j as JawabanPilah);
    case "urutkan": return nilaiUrutkan(r.ronde, j as JawabanUrutkan);
    case "dagang": return nilaiDagang(r.ronde, j as JawabanDagang);
    case "navigasi": return nilaiNavigasi(r.ronde, j as JawabanNavigasi);
    case "pola": return nilaiPola(r.ronde, j as JawabanPola);
    case "simulasi": return nilaiSimulasi(r.ronde, j as JawabanSimulasi);
  }
}
