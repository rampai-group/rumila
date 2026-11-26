# QA lokal Pilot (SD1), Misi 26–31 — 26 November 2026

Worktree terpisah `codex/qa-pilot-misi-26-31`, berawal dari `6de92cca`, disinkronkan ke `262c4255` (PR #238, QA M21–25 dari PR #239, dan QA M32–36 dari PR #241). Nomor misi dihitung dengan `petaJenjang` atas kurikulum MAT, KODE, SAINS, bukan urutan nama berkas.

## Hasil

Semua **12 paket × 3 viewport = 36 sesi** dimainkan sampai layar hasil, **360 ronde, 10/10 benar per sesi**, tanpa bantuan atau error browser. WebKit dengan emulasi sentuh: HP 390×844, iPad 820×1180, iPad pendek 820×1067. iPad pendek diuji seluruh ronde, sehingga mencakup ronde terpadat. Ini emulasi browser lokal, bukan uji perangkat fisik.

**1464 pengukuran tata letak** mencakup awal ronde serta setiap penempatan sebelum kartu terakhir. Nol kartu/kontrol di luar panel atau viewport, nol gambar di luar kartu, nol label terpotong, nol overflow horizontal. Footer navigasi diukur terhadap viewport, bukan batas panggung. Tombol disentuh pada koordinat terlihat dengan pemeriksaan hit target.

| Misi | Paket utama | HP 390×844 | iPad 820×1180 | iPad 820×1067 | Screenshot |
|---|---|---|---|---|---|
| 26 | `sd1-sains-bunyi-makin-jauh-makin-pelan` | Lulus 10/10 | Lulus 10/10 | Lulus 10/10 | [Ronde terpadat + hasil](sd1-sains-bunyi-makin-jauh-makin-pelan.jpg) |
| 26 | `sd1-sains-bunyi-dekat-jauh-jalan` | Lulus 10/10 | Lulus 10/10 | Lulus 10/10 | [Ronde terpadat + hasil](sd1-sains-bunyi-dekat-jauh-jalan.jpg) |
| 27 | `sd1-mat-urut-ringan-berat` | Lulus 10/10 | Lulus 10/10 | Lulus 10/10 | [Ronde terpadat + hasil](sd1-mat-urut-ringan-berat.jpg) |
| 27 | `sd1-mat-belanja-ringan-berat` | Lulus 10/10 | Lulus 10/10 | Lulus 10/10 | [Ronde terpadat + hasil](sd1-mat-belanja-ringan-berat.jpg) |
| 28 | `sd1-mat-urut-isi-wadah` | Lulus 10/10 | Lulus 10/10 | Lulus 10/10 | [Ronde terpadat + hasil](sd1-mat-urut-isi-wadah.jpg) |
| 28 | `sd1-mat-wadah-halaman-isi` | Lulus 10/10 | Lulus 10/10 | Lulus 10/10 | [Ronde terpadat + hasil](sd1-mat-wadah-halaman-isi.jpg) |
| 29 | `sd1-kode-tebak-petak-angkasa` | Lulus 10/10 | Lulus 10/10 | Lulus 10/10 | [Ronde terpadat + hasil](sd1-kode-tebak-petak-angkasa.jpg) |
| 29 | `sd1-kode-tebak-petak-ulangi` | Lulus 10/10 | Lulus 10/10 | Lulus 10/10 | [Ronde terpadat + hasil](sd1-kode-tebak-petak-ulangi.jpg) |
| 30 | `sd1-sains-butuh-listrik-sekolah` | Lulus 10/10 | Lulus 10/10 | Lulus 10/10 | [Ronde terpadat + hasil](sd1-sains-butuh-listrik-sekolah.jpg) |
| 30 | `sd1-sains-butuh-listrik-rumah` | Lulus 10/10 | Lulus 10/10 | Lulus 10/10 | [Ronde terpadat + hasil](sd1-sains-butuh-listrik-rumah.jpg) |
| 31 | `sd1-mat-jam-setengah-pagi` | Lulus 10/10 | Lulus 10/10 | Lulus 10/10 | [Ronde terpadat + hasil](sd1-mat-jam-setengah-pagi.jpg) |
| 31 | `sd1-mat-jam-setengah-siang` | Lulus 10/10 | Lulus 10/10 | Lulus 10/10 | [Ronde terpadat + hasil](sd1-mat-jam-setengah-siang.jpg) |

## Temuan dan perbaikan

1. **M26 — label kartu bunyi keluar panel pada iPad.** Lebar label sebelumnya terikat ukuran ilustrasi kecil, sehingga deskripsi membungkus menjadi terlalu banyak baris. Label kini boleh memakai lebar kartu penuh, terbatas pada kompetensi bunyi SD1. [Sebelum](bunyi-sebelum.png), [sesudah](bunyi-sesudah.png).
2. **M27–28 — ukuran emoji tidak menyediakan bukti berat/kapasitas yang cukup.** Tambahkan batang petunjuk perbandingan yang tetap konsisten untuk benda yang sama, di kartu sumber dan slot. Instruksi menjelaskan bahwa batang lebih panjang berarti lebih berat / muat lebih banyak saat penuh. Batang menunjukkan perbandingan, bukan satuan atau ukuran fisik emoji. Dua rekaman instruksi baru dibuat lokal dengan suara Indonesia Damayanti dan ditautkan melalui manifes; rekaman lain dipertahankan.
3. **M30 — gambar kipas berupa pusaran dan kulkas hanya tulisan.** Ganti dengan ilustrasi kipas berkabel serta kulkas. Kunci listrik, baterai, dan benda tanpa listrik diperiksa seluruh bank; label bel listrik, robot berbaterai, senter berbaterai, dan jam berbaterai membedakan sumber dayanya.
4. **M31 — rak memanjang di HP.** Sepuluh rak sebelumnya membentuk satu kolom dan membutuhkan gulir hingga 454 px. Kini kisi tiga kolom dengan kartu sumber empat kolom; seluruh rak tetap dapat disentuh saat kosong maupun terisi. Dua kartu dalam rak yang sama dijaga berjajar dengan target sentuh 44 px. [Rak terisi](jam-hp-terisi.png).
5. **M29 — tidak ditemukan bug penilaian.** Semua prediksi langkah benar pada semua sesi (bukan sekadar melewati ambang 60%). Belok tetap menempati petak yang sama. Tes bank lengkap juga memastikan semua tebakan salah ditolak.
6. **M31 — tidak ditemukan ketidaksesuaian waktu.** Seluruh emoji jam penuh/setengah dan angka digital cocok dengan raknya; `setengah N` berarti `(N−1).30`. Jarum pada screenshot WebKit diperiksa, termasuk posisi jarum pendek di antara dua jam.

## Audio dan validasi

- 36 entri instruksi/judul urutan ditelusuri ke manifes, berkas MP3 ada, durasi valid, dan decode ffmpeg lulus: [audio.json](audio.json).
- Tombol “Dengarkan instruksi” memicu event media `playing` untuk berkas yang benar pada seluruh 12 paket × HP/iPad: [audio-browser.json](audio-browser.json). Event diobservasi pada elemen audio asli; pemutaran tidak di-mock. Pemeriksaan ini memvalidasi pemetaan dan pemutaran, bukan transkripsi ulang independen seluruh rekaman lama.
- 97 tes terarah lulus, termasuk regresi petunjuk, jam, prediksi, akses urutkan, dan daftar kalimat suara; diulang setelah rebase.
- `akademi:validate`: 810 paket valid; TypeScript, ESLint berkas terkait, `git diff --check`, serta build produksi Next.js lulus.
- [Ringkasan terstruktur](results.json) menyimpan seed, jumlah ronde/pengukuran, skor, ronde terpadat, dan jumlah prediksi per sesi.

## Menjalankan ulang

Jalankan `npm ci`, lalu `npm run dev -- --port 3876`. Pasang Playwright/WebKit di lokasi QA dan jalankan:

```sh
PLAYWRIGHT_MODULE=/path/to/playwright-core/index.mjs RUMILA_QA_OUTPUT=/tmp/pilot-26-31 npx tsx scripts/qa-pilot-26-31.mjs
```

Filter opsional: `RUMILA_QA_DEVICE` (`hp`, `ipad`, `ipad-pendek`), `RUMILA_QA_MISSION`, `RUMILA_QA_SLUG`, `RUMILA_QA_SEED`, `RUMILA_QA_RESUME=1`. Bukti mentah lokal sesi ini: `/tmp/rumila-qa-26-31/final` (screenshot awal tiap ronde, kondisi satu kartu tersisa, hasil, dan pengukuran tiap fase).
