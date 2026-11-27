# Cakupan QA Pilot SD1: 84 paket

Peta gabungan MAT, KODE, SAINS menghasilkan **42 misi dan 84 paket utama**. Tidak ada M43–48 pada SD1.

## Pengujian ulang sesi ini

**M9–12, M18, M19: 12 paket × 3 ukuran = 36 permainan / 357 ronde**, semuanya mencapai hasil dengan nilai penuh tanpa Bantu. Paket koin memiliki 9 ronde; paket lainnya 10. Perangkat memakai emulasi WebKit sentuh, bukan perangkat fisik.

Ukuran: HP 390×844, iPad 820×1180, dan iPad pendek 820×1067. Jawaban diberikan lewat kontrol yang terlihat. Kunci hitungan dihitung dari soal; rute robot disimulasikan dari peta yang tampil. Geometri diperiksa pada awal ronde, tiap perpindahan kartu, serta rak program terbuka/penuh. **1.614 pengukuran** tidak menemukan kartu, gambar, kontrol, atau teks tampak keluar batas. [Data lengkap](results.json).

## Temuan dan perbaikan

- M12 Rak Dobel: pada HP, isi rak yang bertambah mendorong rak 18/19 melewati panel hingga 66 CSS px. [Sebelum](rak-dobel-sebelum.png), [sesudah](rak-dobel-sesudah.png). Padding dan jarak rak HP dirapatkan; target sentuh tetap minimal 44 px. Pengujian ulang mencakup seluruh ronde dan fase perpindahan kartu.
- Tonjolan 9 px pada balon pembeli M10 adalah ekor balon dekoratif. Tidak memotong teks atau melewati panel; tidak diubah.

## Audio dan pemeriksaan otomatis

Seluruh 12 instruksi cocok dengan entri manifest; MP3 ada, dapat didekode, dan benar-benar memicu `playing` di ketiga ukuran (36 pemeriksaan). [Berkas audio](audio.json), [pemutaran browser](audio-browser.json). Pemeriksaan ini tidak menyatakan transkripsi ulang dengan mendengarkan seluruh rekaman.

Validasi skema: **810 paket**, Vitest **885/885**, TypeScript dan ESLint berkas perubahan lulus. Satu percobaan suite mengalami tiga timeout saat banyak proses QA berjalan; pengulangan lengkap dengan `--maxWorkers=2` lulus tanpa mengubah tes. Pengujian lengkap pada basis `dbf4ea2d` (PR #259), lalu sinkronisasi `6a7fab22` (PR #260) mempertahankan perbaikan sesi lain; kemudian `4b8fd042` (PR #261) membawa bukti QA M41–42 terbaru. Perubahan terakhir tidak mengubah mekanik 12 paket yang diuji ulang di sini. Commit rilis dicatat pada PR.

## Status setiap paket

**Baru** = dimainkan ulang pada sesi ini. **Riwayat** = bukti QA tiga ukuran dari PR terdahulu; tidak berarti diuji ulang seluruhnya pada commit sesi ini. Bukti lama dipertahankan dalam [metadata PR](historical-prs.json).

| Misi | Paket | HP 390×844 | iPad 820×1180 | iPad 820×1067 | Bukti |
|---|---|---|---|---|---|
| 1 | Jalan Katak Loncat 10 (`sd1-mat-jalan-loncat-katak`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #226](https://github.com/rampai-group/rumila/pull/226) |
| 1 | Loncat Sepuluh (`sd1-mat-loncat-sepuluh`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #226](https://github.com/rampai-group/rumila/pull/226) |
| 2 | Bayar Belasan Ribu (`sd1-mat-bayar-puluhan-satuan`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #227](https://github.com/rampai-group/rumila/pull/227) |
| 2 | Rak Sepuluh dan Satuan (`sd1-mat-rak-puluhan-satuan`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #227](https://github.com/rampai-group/rumila/pull/227) |
| 3 | Gerbong Kereta Tertukar (`sd1-mat-gerbong-urut-0-20`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #228](https://github.com/rampai-group/rumila/pull/228) |
| 3 | Antrean Kartu 0–20 (`sd1-mat-urut-kartu-0-20`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #228](https://github.com/rampai-group/rumila/pull/228) |
| 4 | Genap atau Ganjil? (`sd1-mat-genap-ganjil-20`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #227](https://github.com/rampai-group/rumila/pull/227) |
| 4 | Hewan Berpasangan di Kandang (`sd1-mat-pasangan-ternak-20`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #227](https://github.com/rampai-group/rumila/pull/227) |
| 5 | Langkah Tugas di Kota (`sd1-kode-algoritma-di-kota`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #230](https://github.com/rampai-group/rumila/pull/230) |
| 5 | Algoritma Sehari-hari (`sd1-kode-algoritma-sehari-hari`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #230](https://github.com/rampai-group/rumila/pull/230) |
| 6 | Algoritma Tertukar (`sd1-kode-perbaiki-algoritma`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #230](https://github.com/rampai-group/rumila/pull/230) |
| 6 | Satu Tukar Beres (`sd1-kode-tukar-langkah-taman`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #230](https://github.com/rampai-group/rumila/pull/230) |
| 7 | Hidup atau Tak Pernah Hidup di Pantai (`sd1-sains-hidup-atau-tak-pernah-hidup-pantai`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #230](https://github.com/rampai-group/rumila/pull/230) |
| 7 | Hidup atau Tak Pernah Hidup? (`sd1-sains-hidup-atau-tak-pernah-hidup-taman`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #230](https://github.com/rampai-group/rumila/pull/230) |
| 8 | Makan Siang Hewan Peliharaan (`sd1-sains-makan-hewan-peliharaan`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #230](https://github.com/rampai-group/rumila/pull/230) |
| 8 | Waktunya Memberi Makan Ternak (`sd1-sains-makan-hewan-peternakan`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #230](https://github.com/rampai-group/rumila/pull/230) |
| 9 | Lengkapi Sepuluh Koin (`sd1-mat-genap-sepuluh-koin`) | 9 dari 9 benar | 9 dari 9 benar | 9 dari 9 benar | Baru · [screenshot](sd1-mat-genap-sepuluh-koin.jpg) |
| 9 | Kurang Berapa Supaya 10? (`sd1-mat-rak-kurang-berapa-sepuluh`) | 10 dari 10 benar | 10 dari 10 benar | 10 dari 10 benar | Baru · [screenshot](sd1-mat-rak-kurang-berapa-sepuluh.jpg) |
| 10 | Tumpukan Harta Pantai (`sd1-mat-gabung-harta-pantai`) | 10 dari 10 benar | 10 dari 10 benar | 10 dari 10 benar | Baru · [screenshot](sd1-mat-gabung-harta-pantai.jpg) |
| 10 | Dua Keranjang Jadi Satu (`sd1-mat-gabung-keranjang-20`) | 10 dari 10 benar | 10 dari 10 benar | 10 dari 10 benar | Baru · [screenshot](sd1-mat-gabung-keranjang-20.jpg) |
| 11 | Panen Kebun, Sisa Berapa? (`sd1-mat-panen-sisa-kebun`) | 10 dari 10 benar | 10 dari 10 benar | 10 dari 10 benar | Baru · [screenshot](sd1-mat-panen-sisa-kebun.jpg) |
| 11 | Kelereng yang Tersisa (`sd1-mat-sisa-kelereng-20`) | 10 dari 10 benar | 10 dari 10 benar | 10 dari 10 benar | Baru · [screenshot](sd1-mat-sisa-kelereng-20.jpg) |
| 12 | Kue Dobel di Etalase (`sd1-mat-dobel-etalase-kue`) | 10 dari 10 benar | 10 dari 10 benar | 10 dari 10 benar | Baru · [screenshot](sd1-mat-dobel-etalase-kue.jpg) |
| 12 | Rak Dobel dan Hampir Dobel (`sd1-mat-rak-dobel`) | 10 dari 10 benar | 10 dari 10 benar | 10 dari 10 benar | Baru · [screenshot](sd1-mat-rak-dobel.jpg) |
| 13 | Lanjutkan Pola Perintah (`sd1-kode-lanjutkan-pola-perintah`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #229](https://github.com/rampai-group/rumila/pull/229) |
| 13 | Pola Robot Gudang (`sd1-kode-pola-robot-gudang`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #229](https://github.com/rampai-group/rumila/pull/229) |
| 14 | Tujuh Rak Bahan di Rumah (`sd1-sains-rak-tujuh-bahan-rumah`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #229](https://github.com/rampai-group/rumila/pull/229) |
| 14 | Tujuh Rak Bahan di Sekolah (`sd1-sains-rak-tujuh-bahan-sekolah`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #229](https://github.com/rampai-group/rumila/pull/229) |
| 15 | Benda atau Bahan di Sekolah? (`sd1-sains-benda-atau-bahan-sekolah`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #229](https://github.com/rampai-group/rumila/pull/229) |
| 15 | Benda atau Bahan? (`sd1-sains-benda-atau-bahan`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #229](https://github.com/rampai-group/rumila/pull/229) |
| 16 | Lentur atau Kaku? (`sd1-sains-lentur-atau-kaku`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #229](https://github.com/rampai-group/rumila/pull/229) |
| 16 | Menyerap Air atau Tidak? (`sd1-sains-menyerap-air-atau-tidak`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #229](https://github.com/rampai-group/rumila/pull/229) |
| 17 | Regang, Tekan, Tekuk, Puntir (`sd1-sains-regang-tekan-tekuk-puntir`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #234](https://github.com/rampai-group/rumila/pull/234) |
| 17 | Ubah Bentuk di Taman Bermain (`sd1-sains-ubah-bentuk-taman-bermain`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #234](https://github.com/rampai-group/rumila/pull/234) |
| 18 | Setengah untuk Temanku (`sd1-mat-rak-setengah-piring`) | 10 dari 10 benar | 10 dari 10 benar | 10 dari 10 benar | Baru · [screenshot](sd1-mat-rak-setengah-piring.jpg) |
| 18 | Bekal Piknik Berdua (`sd1-mat-bagi-dua-piknik`) | 10 dari 10 benar | 10 dari 10 benar | 10 dari 10 benar | Baru · [screenshot](sd1-mat-bagi-dua-piknik.jpg) |
| 19 | Dua Ulangi di Jalan Kota (`sd1-kode-ulangi-belok-kota`) | 10 dari 10 benar | 10 dari 10 benar | 10 dari 10 benar | Baru · [screenshot](sd1-kode-ulangi-belok-kota.jpg) |
| 19 | Dua Ulangi, Satu Belokan (`sd1-kode-ulangi-dua-bagian`) | 10 dari 10 benar | 10 dari 10 benar | 10 dari 10 benar | Baru · [screenshot](sd1-kode-ulangi-dua-bagian.jpg) |
| 20 | Dorong atau Tarik di Rumah (`sd1-sains-dorong-tarik-rumah`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #234](https://github.com/rampai-group/rumila/pull/234) |
| 20 | Dorong atau Tarik di Taman (`sd1-sains-dorong-tarik-taman`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #234](https://github.com/rampai-group/rumila/pull/234) |
| 21 | Menggelinding, Meluncur, Berputar (`sd1-sains-gelinding-luncur-putar`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #239](https://github.com/rampai-group/rumila/pull/239) |
| 21 | Bergerak di Taman Kota (`sd1-sains-gerak-taman-kota`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #239](https://github.com/rampai-group/rumila/pull/239) |
| 22 | Hitung Sisinya (`sd1-mat-pilah-sisi-bangun`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #239](https://github.com/rampai-group/rumila/pull/239) |
| 22 | Bentuk di Jalan Kota (`sd1-mat-sisi-bentuk-kota`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #239](https://github.com/rampai-group/rumila/pull/239) |
| 23 | Datar atau Ruang? (`sd1-mat-datar-atau-ruang`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #239](https://github.com/rampai-group/rumila/pull/239) |
| 23 | Rak Mainan Datar dan Ruang (`sd1-mat-rak-mainan-datar-ruang`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #239](https://github.com/rampai-group/rumila/pull/239) |
| 24 | Kalau di Dalam Ulangi (`sd1-kode-kalau-di-dalam-ulangi`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #239](https://github.com/rampai-group/rumila/pull/239) |
| 24 | Kalau Batu di Sungai (`sd1-kode-kalau-ulangi-sungai`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #239](https://github.com/rampai-group/rumila/pull/239) |
| 25 | Bunyi di Jalan (`sd1-sains-berbunyi-atau-diam-jalan`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #239](https://github.com/rampai-group/rumila/pull/239) |
| 25 | Siapa yang Berbunyi? (`sd1-sains-berbunyi-atau-diam`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #239](https://github.com/rampai-group/rumila/pull/239) |
| 26 | Siapa Dengar Paling Keras? (`sd1-sains-bunyi-dekat-jauh-jalan`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #243](https://github.com/rampai-group/rumila/pull/243) |
| 26 | Makin Jauh, Makin Pelan (`sd1-sains-bunyi-makin-jauh-makin-pelan`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #243](https://github.com/rampai-group/rumila/pull/243) |
| 27 | Timbang Barang di Pasar (`sd1-mat-belanja-ringan-berat`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #243](https://github.com/rampai-group/rumila/pull/243) |
| 27 | Dari Ringan ke Berat (`sd1-mat-urut-ringan-berat`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #243](https://github.com/rampai-group/rumila/pull/243) |
| 28 | Wadah Mana yang Muat Banyak? (`sd1-mat-urut-isi-wadah`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #243](https://github.com/rampai-group/rumila/pull/243) |
| 28 | Mana yang Muat Paling Banyak? (`sd1-mat-wadah-halaman-isi`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #243](https://github.com/rampai-group/rumila/pull/243) |
| 29 | Tebak Langkah di Stasiun Bulan (`sd1-kode-tebak-petak-angkasa`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #243](https://github.com/rampai-group/rumila/pull/243) |
| 29 | Tebak Petak Saat Ulangi (`sd1-kode-tebak-petak-ulangi`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #243](https://github.com/rampai-group/rumila/pull/243) |
| 30 | Butuh Listrik? (Rumah) (`sd1-sains-butuh-listrik-rumah`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #243](https://github.com/rampai-group/rumila/pull/243) |
| 30 | Butuh Listrik? (Sekolah) (`sd1-sains-butuh-listrik-sekolah`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #243](https://github.com/rampai-group/rumila/pull/243) |
| 31 | Jam Setengah: Pagi (`sd1-mat-jam-setengah-pagi`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #244](https://github.com/rampai-group/rumila/pull/244) |
| 31 | Jam Setengah: Pukul 1 sampai 6 (`sd1-mat-jam-setengah-siang`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #244](https://github.com/rampai-group/rumila/pull/244) |
| 32 | Kalender Dua Belas Bulan (`sd1-mat-urutan-bulan`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #244](https://github.com/rampai-group/rumila/pull/244) |
| 32 | Hari Demi Hari (`sd1-mat-urutan-hari`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #244](https://github.com/rampai-group/rumila/pull/244) |
| 33 | Satu Blok Ulangi Rusak (`sd1-kode-perbaiki-ulangi-gudang`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #244](https://github.com/rampai-group/rumila/pull/244) |
| 33 | Perbaiki Blok Ulangi (`sd1-kode-perbaiki-ulangi`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #244](https://github.com/rampai-group/rumila/pull/244) |
| 34 | Terlihat dari Pesawat (`sd1-sains-air-atau-daratan-dari-pesawat`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #244](https://github.com/rampai-group/rumila/pull/244) |
| 34 | Air atau Daratan? (`sd1-sains-air-atau-daratan`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #244](https://github.com/rampai-group/rumila/pull/244) |
| 35 | Kotak Kuning dan Bulat (`sd1-mat-carroll-kuning-bulat`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #244](https://github.com/rampai-group/rumila/pull/244) |
| 35 | Diagram Empat Kotak (`sd1-mat-carroll-merah-bulat`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #244](https://github.com/rampai-group/rumila/pull/244) |
| 36 | Pakai Listrik atau Tidak? (`sd1-kode-ya-tidak-listrik`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #241](https://github.com/rampai-group/rumila/pull/241) |
| 36 | Punya Roda atau Tidak? (`sd1-kode-ya-tidak-roda`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #241](https://github.com/rampai-group/rumila/pull/241) |
| 37 | Cepat atau Lambat Berubah? (`sd1-sains-cepat-atau-lambat-hangat`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #240](https://github.com/rampai-group/rumila/pull/240) |
| 37 | Tebak: Di Mana Paling Cepat? (`sd1-sains-tebak-panas-matahari`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #240](https://github.com/rampai-group/rumila/pull/240) |
| 38 | Pola Besar, Kecil, dan Arah (`sd1-mat-pola-besar-kecil-arah`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #240](https://github.com/rampai-group/rumila/pull/240) |
| 38 | Pola Tangan dan Bintang (`sd1-mat-pola-tangan-bintang`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #240](https://github.com/rampai-group/rumila/pull/240) |
| 39 | Pakai Kabel atau Tanpa Kabel? (`sd1-kode-kabel-tanpa-kabel`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #240](https://github.com/rampai-group/rumila/pull/240) |
| 39 | Kabel atau Sinyal? (`sd1-kode-sambungan-perangkat`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #240](https://github.com/rampai-group/rumila/pull/240) |
| 40 | Mana yang Robot? (`sd1-kode-cari-robot-pabrik`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #240](https://github.com/rampai-group/rumila/pull/240) |
| 40 | Robot atau Bukan? (`sd1-kode-robot-atau-bukan`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #240](https://github.com/rampai-group/rumila/pull/240) |
| 41 | Ukur Temuan Kebun dengan Jengkal (`sd1-sains-ukur-jengkal-temuan-kebun`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #261](https://github.com/rampai-group/rumila/pull/261) |
| 41 | Ukur Temuan di Kebun (`sd1-sains-ukur-kubus-temuan-kebun`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #261](https://github.com/rampai-group/rumila/pull/261) |
| 42 | Siapa Mampir ke Kebun? (`sd1-sains-turus-pengunjung-kebun`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #261](https://github.com/rampai-group/rumila/pull/261) |
| 42 | Siapa Mampir ke Kolam? (`sd1-sains-turus-pengunjung-kolam`) | Lulus (riwayat) | Lulus (riwayat) | Lulus (riwayat) | [PR #261](https://github.com/rampai-group/rumila/pull/261) |

Catatan bukti lama: M21 HP dan M41 memakai gulir internal yang dilaporkan dalam PR masing-masing. Rekap ini tidak mengubah catatan tersebut. Verifikasi produksi mencakup `/api/versi` dan rute paket; permainan sampai hasil dilakukan di lokal.

## Menjalankan ulang

```sh
npm ci --ignore-scripts
npm run dev -- --port 3896
# Terminal lain, dari root repo; sediakan Playwright + browser WebKit.
PLAYWRIGHT_MODULE=/path/to/playwright-core/index.mjs RUMILA_QA_PORT=3896 node scripts/qa/pilot-coverage-gap.mjs
```

`RUMILA_ONLY` menerima slug dipisahkan koma; `RUMILA_DEVICE` memilih `HP`, `iPad`, atau `iPad-pendek`. `RUMILA_QA_OUTPUT`, `RUMILA_RUN`, `RUMILA_SEED`, dan `RUMILA_QA_CONCURRENCY` dapat diatur. Seed UUID tetap memudahkan reproduksi. Skrip menolak jawaban yang salah, error halaman, atau kartu/kontrol keluar batas. Teks `.sr-only` memang tersembunyi untuk pembaca layar dan tidak dihitung sebagai teks terpotong; rekaman awal yang dikecualikan tetap ada di `screenReaderOnlyText` pada data.
