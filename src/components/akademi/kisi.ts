// Pembagi baris kartu: pilih jumlah kolom yang membuat kartu paling besar di ruang yang ADA, bukan sekadar yang muat selebar layar.

/** Tinggi : lebar kartu yang enak dibaca (gambar di atas, kalimat di bawahnya). */
const RASIO = 1.15;
/** Pindah dari satu baris hanya bila kartunya jelas lebih besar. */
const UNTUNG = 1.1;

/**
 * Jumlah kolom untuk `n` kartu di ruang `lebar` × `tinggi`.
 * Baris terakhir tidak boleh timpang (4 kartu: 4 atau 2+2, bukan 3+1; 5 kartu: 5 atau 3+2).
 * `maks` = kolom terbanyak yang muat dengan lebar kartu minimum.
 */
export function kolomTerbaik(lebar: number, tinggi: number, n: number, maks: number, gap: number, rasio = RASIO): number {
  const atas = Math.max(1, Math.min(n, maks));
  if (lebar <= 0 || tinggi <= 0 || n < 4) return atas;
  const besar = (kol: number) => {
    const baris = Math.ceil(n / kol);
    return Math.min((lebar - gap * (kol - 1)) / kol, (tinggi - gap * (baris - 1)) / baris / rasio);
  };
  const seimbang = (kol: number) => n % kol === 0 || n % kol === kol - 1;
  let pilih = atas;
  while (pilih > 1 && !seimbang(pilih)) pilih--;
  for (let kol = pilih - 1; kol >= 2; kol--) {
    if (seimbang(kol) && besar(kol) > besar(pilih) * UNTUNG) pilih = kol;
  }
  return pilih;
}
