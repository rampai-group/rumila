// Aturan form "Daftar" akun RINOYA: email wajib, pendaftar memilih orang tua atau siswa, dan siswa wajib tanggal lahir.
// Data pendaftaran disimpan di user_metadata Supabase Auth (peran, tanggal_lahir) dan dipakai lagi saat membuat rumah.

export type PeranDaftar = "orang_tua" | "siswa";

export const USIA_SISWA_MIN = 3;
export const USIA_SISWA_MAX = 25;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const emailSah = (v: string) => EMAIL_RE.test(v.trim());

/** Umur penuh (tahun) dari tanggal lahir "YYYY-MM-DD" pada tanggal `sekarang`. null bila tanggal tidak sah atau di masa depan. */
export function umurDari(lahir: string, sekarang = new Date()): number | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(lahir);
  if (!m) return null;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const t = new Date(Date.UTC(y, mo - 1, d));
  if (t.getUTCFullYear() !== y || t.getUTCMonth() !== mo - 1 || t.getUTCDate() !== d) return null;
  const ny = sekarang.getFullYear();
  const nm = sekarang.getMonth() + 1;
  const nd = sekarang.getDate();
  let umur = ny - y;
  if (nm < mo || (nm === mo && nd < d)) umur--;
  return umur < 0 ? null : umur;
}

/** Pesan galat untuk form daftar, atau "" bila semua sah. */
export function cekDaftar(
  isian: { email: string; peran: PeranDaftar | ""; lahir: string },
  sekarang = new Date(),
): string {
  if (!emailSah(isian.email)) return "Tulis email yang aktif, misal nama@gmail.com. Tautan konfirmasi dikirim ke sana.";
  if (!isian.peran) return "Pilih dulu: kamu orang tua atau siswa.";
  if (isian.peran === "siswa") {
    if (!isian.lahir) return "Siswa wajib mengisi tanggal lahir.";
    const umur = umurDari(isian.lahir, sekarang);
    if (umur === null) return "Tanggal lahir belum benar.";
    if (umur < USIA_SISWA_MIN || umur > USIA_SISWA_MAX)
      return `Umur siswa ${USIA_SISWA_MIN}–${USIA_SISWA_MAX} tahun. Periksa lagi tanggal lahirnya.`;
  }
  return "";
}

/** Baca data pendaftaran dari user_metadata (akun lama tidak punya). */
export function dataDaftar(meta: unknown): { peran: PeranDaftar | null; lahir: string | null } {
  const m = (meta ?? {}) as Record<string, unknown>;
  const peran = m.peran === "siswa" || m.peran === "orang_tua" ? m.peran : null;
  const lahir = typeof m.tanggal_lahir === "string" && umurDari(m.tanggal_lahir) !== null ? m.tanggal_lahir : null;
  return { peran, lahir };
}
