// Konstanta jenjang, mata pelajaran, mekanik, dan kerangka acuan.
// Id di sini stabil selamanya: dipakai di kode kompetensi, event, dan sertifikat.

import { z } from "zod";

export const LEVEL_IDS = [
  "PAUD", "TKA", "TKB",
  "SD1", "SD2", "SD3", "SD4", "SD5", "SD6",
] as const;
export const LevelId = z.enum(LEVEL_IDS);
export type LevelId = z.infer<typeof LevelId>;

/** Jenjang yang masuk lingkup produk: PAUD sampai SD 6 (SMP–SMA dihapus, keputusan PO 25 Okt 2026). */
export const ACTIVE_LEVELS: readonly LevelId[] = ["PAUD", "TKA", "TKB", "SD1", "SD2", "SD3", "SD4", "SD5", "SD6"];

export interface LevelMeta { id: LevelId; /** perkiraan usia, hanya untuk orang tua */ usia: [number, number]; /** satu-satunya nama jenjang yang boleh tampil */ pangkat: string; /** untuk alamat halaman dan nomor dokumen */ slug: string }
export const LEVELS: readonly LevelMeta[] = [
  // Keputusan owner 22 Nov 2026: layar dan konten tidak menyebut jenjang sekolah formal (PAUD/TK/SD) maupun istilah
  // Cambridge. Yang tampil = pangkat. Id di bawah hanya kode internal dan tidak pernah ditampilkan.
  // Pemetaan acuan kurikulum ada di docs/akademi/kurikulum.md.
  { id: "PAUD", usia: [3, 4], pangkat: "Tunas", slug: "tunas" },
  { id: "TKA", usia: [4, 5], pangkat: "Kadet", slug: "kadet" },
  { id: "TKB", usia: [5, 6], pangkat: "Navigator", slug: "navigator" },
  { id: "SD1", usia: [6, 7], pangkat: "Pilot", slug: "pilot" },
  { id: "SD2", usia: [7, 8], pangkat: "Kapten", slug: "kapten" },
  { id: "SD3", usia: [8, 9], pangkat: "Komandan", slug: "komandan" },
  { id: "SD4", usia: [9, 10], pangkat: "Laksamana", slug: "laksamana" },
  { id: "SD5", usia: [10, 11], pangkat: "Penjelajah", slug: "penjelajah" },
  { id: "SD6", usia: [11, 12], pangkat: "Legenda", slug: "legenda" },
];
export const levelMeta = (id: LevelId) => LEVELS.find((l) => l.id === id)!;
/** Nama tampilan jenjang: "Komandan". */
export const namaLevel = (id: LevelId) => levelMeta(id).pangkat;
/** Perkiraan usia: "8–9 tahun". Hanya untuk layar orang tua dan pilihan titik mulai. */
export const usiaLevel = (id: LevelId) => { const [a, b] = levelMeta(id).usia; return `${a}–${b} tahun`; };
/** Alamat halaman "komandan" → "SD3". */
export const levelDariSlug = (slug: string) => LEVELS.find((l) => l.slug === slug.toLowerCase())?.id;
export const levelIndex = (id: LevelId) => LEVEL_IDS.indexOf(id);

export const TRACK_IDS = ["MAT", "KODE", "SAINS", "BIND", "BING", "DUNIA", "SENI", "KARAKTER"] as const;
export const TrackId = z.enum(TRACK_IDS);
export type TrackId = z.infer<typeof TrackId>;

export interface TrackMeta { id: TrackId; nama: { id: string; en: string }; singkat: string; /** mengacu kerangka internasional langsung */ internasional: boolean }
export const TRACKS: readonly TrackMeta[] = [
  { id: "MAT", nama: { id: "Matematika", en: "Mathematics" }, singkat: "MA", internasional: true },
  { id: "KODE", nama: { id: "Coding", en: "Computing" }, singkat: "KO", internasional: true },
  { id: "SAINS", nama: { id: "Sains", en: "Science" }, singkat: "SA", internasional: true },
  { id: "BIND", nama: { id: "Bahasa Indonesia", en: "Indonesian" }, singkat: "BI", internasional: true },
  { id: "BING", nama: { id: "Bahasa Inggris", en: "English" }, singkat: "EN", internasional: true },
  { id: "DUNIA", nama: { id: "Dunia & Budaya", en: "World & Culture" }, singkat: "DU", internasional: true },
  { id: "SENI", nama: { id: "Seni & Musik", en: "Art & Music" }, singkat: "SE", internasional: false },
  { id: "KARAKTER", nama: { id: "Karakter & Agama", en: "Character & Religion" }, singkat: "KA", internasional: false },
];

export const MECHANIC_IDS = [
  "pilah", "urutkan", "bangun", "dagang", "navigasi", "simulasi",
  "cerita", "telusur", "ucap", "cari", "pola", "rawat",
] as const;
export const MechanicId = z.enum(MECHANIC_IDS);
export type MechanicId = z.infer<typeof MechanicId>;

export const DEPTHS = ["kenal", "pakai", "cipta"] as const;
export const Depth = z.enum(DEPTHS);
export type Depth = z.infer<typeof Depth>;

export const FRAMEWORK_IDS = [
  "CAMBRIDGE_EY", "CAMBRIDGE_PRIMARY_MATHS", "CAMBRIDGE_PRIMARY_COMPUTING",
  "CAMBRIDGE_PRIMARY_SCIENCE", "CAMBRIDGE_PRIMARY_ENGLISH", "CAMBRIDGE_GLOBAL_PERSPECTIVES",
  "EYFS", "COMMON_CORE", "CEFR", "KURMER",
] as const;
export const FrameworkId = z.enum(FRAMEWORK_IDS);
export type FrameworkId = z.infer<typeof FrameworkId>;

/** Teks dwibahasa. Keduanya wajib terisi. */
export const Dwibahasa = z.object({ id: z.string().trim().min(1), en: z.string().trim().min(1) });
export type Dwibahasa = z.infer<typeof Dwibahasa>;
