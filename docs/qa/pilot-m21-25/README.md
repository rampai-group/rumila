# QA lokal Pilot M21–25 — 26 November 2026

Worktree terpisah `codex/qa-pilot-m21-25`, mulai dari `origin/main` 6de92cca dan sinkron ke 13557511. Nomor diperoleh dari `petaJenjang` SD1 dengan track MAT, KODE, SAINS. Total 5 misi / 10 paket utama.

Playwright WebKit, layar sentuh emulasi (bukan perangkat fisik): 390×844, 820×1180, dan 820×1067 dengan screen 820×1180 untuk simulasi ruang Safari. **30 sesi, 300 ronde; setiap sesi selesai 10/10, tanpa bantuan maupun kegagalan.** Input dilakukan melalui tombol/kartu UI; hasil diverifikasi pada layar dan event lokal. Seed berbeda per ukuran. Semua kunci item dan label ditinjau dari paket; gambar ditinjau pada screenshot. Pemeriksaan audio terbatas pada pemetaan instruksi, tombol dengarkan, HTTP 200 dan dekode durasi; bukan penilaian pelafalan melalui pendengaran.

## Status per paket

Setiap tautan hasil menunjukkan layar selesai; kolom iPad pendek mengarah ke ronde dengan kartu terbanyak dalam sesi.

| Misi | Paket | HP 390×844 | iPad 820×1180 | iPad 820×1067 |
|---|---|---|---|---|
| 21 | `sd1-sains-gelinding-luncur-putar` | [Lulus 10/10](bukti/hp-m21-sd1-sains-gelinding-luncur-putar-hasil.png) | [Lulus 10/10](bukti/ipad-m21-sd1-sains-gelinding-luncur-putar-hasil.png) | [Lulus, ronde padat](bukti/ipad-pendek-m21-sd1-sains-gelinding-luncur-putar-padat.png) |
| 21 | `sd1-sains-gerak-taman-kota` | [Lulus 10/10](bukti/hp-m21-sd1-sains-gerak-taman-kota-hasil.png) | [Lulus 10/10](bukti/ipad-m21-sd1-sains-gerak-taman-kota-hasil.png) | [Lulus, ronde padat](bukti/ipad-pendek-m21-sd1-sains-gerak-taman-kota-padat.png) |
| 22 | `sd1-mat-pilah-sisi-bangun` | [Lulus 10/10](bukti/hp-m22-sd1-mat-pilah-sisi-bangun-hasil.png) | [Lulus 10/10](bukti/ipad-m22-sd1-mat-pilah-sisi-bangun-hasil.png) | [Lulus, ronde padat](bukti/ipad-pendek-m22-sd1-mat-pilah-sisi-bangun-padat.png) |
| 22 | `sd1-mat-sisi-bentuk-kota` | [Lulus 10/10](bukti/hp-m22-sd1-mat-sisi-bentuk-kota-hasil.png) | [Lulus 10/10](bukti/ipad-m22-sd1-mat-sisi-bentuk-kota-hasil.png) | [Lulus, ronde padat](bukti/ipad-pendek-m22-sd1-mat-sisi-bentuk-kota-padat.png) |
| 23 | `sd1-mat-datar-atau-ruang` | [Lulus 10/10](bukti/hp-m23-sd1-mat-datar-atau-ruang-hasil.png) | [Lulus 10/10](bukti/ipad-m23-sd1-mat-datar-atau-ruang-hasil.png) | [Lulus, ronde padat](bukti/ipad-pendek-m23-sd1-mat-datar-atau-ruang-padat.png) |
| 23 | `sd1-mat-rak-mainan-datar-ruang` | [Lulus 10/10](bukti/hp-m23-sd1-mat-rak-mainan-datar-ruang-hasil.png) | [Lulus 10/10](bukti/ipad-m23-sd1-mat-rak-mainan-datar-ruang-hasil.png) | [Lulus, ronde padat](bukti/ipad-pendek-m23-sd1-mat-rak-mainan-datar-ruang-padat.png) |
| 24 | `sd1-kode-kalau-di-dalam-ulangi` | [Lulus 10/10](bukti/hp-m24-sd1-kode-kalau-di-dalam-ulangi-hasil.png) | [Lulus 10/10](bukti/ipad-m24-sd1-kode-kalau-di-dalam-ulangi-hasil.png) | [Lulus, ronde padat](bukti/ipad-pendek-m24-sd1-kode-kalau-di-dalam-ulangi-padat.png) |
| 24 | `sd1-kode-kalau-ulangi-sungai` | [Lulus 10/10](bukti/hp-m24-sd1-kode-kalau-ulangi-sungai-hasil.png) | [Lulus 10/10](bukti/ipad-m24-sd1-kode-kalau-ulangi-sungai-hasil.png) | [Lulus, ronde padat](bukti/ipad-pendek-m24-sd1-kode-kalau-ulangi-sungai-padat.png) |
| 25 | `sd1-sains-berbunyi-atau-diam` | [Lulus 10/10](bukti/hp-m25-sd1-sains-berbunyi-atau-diam-hasil.png) | [Lulus 10/10](bukti/ipad-m25-sd1-sains-berbunyi-atau-diam-hasil.png) | [Lulus, ronde padat](bukti/ipad-pendek-m25-sd1-sains-berbunyi-atau-diam-padat.png) |
| 25 | `sd1-sains-berbunyi-atau-diam-jalan` | [Lulus 10/10](bukti/hp-m25-sd1-sains-berbunyi-atau-diam-jalan-hasil.png) | [Lulus 10/10](bukti/ipad-m25-sd1-sains-berbunyi-atau-diam-jalan-hasil.png) | [Lulus, ronde padat](bukti/ipad-pendek-m25-sd1-sains-berbunyi-atau-diam-jalan-padat.png) |

## Temuan dan perbaikan

- **M21 gambar:** ban berupa lingkaran merah, anak di perosotan berupa roller coaster, sepeda terbalik berupa sepeda tegak, dan kipas berupa pusaran. Diganti SVG yang menggambarkan konteks label.
- **M25 gambar:** penjual memukul mangkuk sebelumnya hanya mangkuk mi dengan sumpit; bantal sebelumnya seluruh ranjang. Diganti ilustrasi mangkuk dengan alat pemukul/garis bunyi dan bantal yang jelas.
- **M21–23/M25 tablet:** kartu/rak terlalu kecil menyisakan ruang bawah besar. Mode lega kini berlaku untuk empat kompetensi ini meski rak hanya berlabel teks. Tujuh–delapan kartu memakai empat kolom. Uji ulang seluruh ronde kedua varian di semua ukuran: tidak ada teks terpotong atau tombol melewati sisi papan; seluruh sesi iPad tanpa gulir vertikal, termasuk saat tinggal satu kartu.
- **M24:** tidak perlu perubahan kode. Ulangi → Kalau berhasil menghasilkan 2/2 blok. Program Ulangi 6× [Kalau] mencapai tujuan di seluruh tiga jalur pada setiap ronde kedua paket, semua ukuran, sampai layar hasil. Penghentian di tujuan mengikuti semantik paket Kalau ini.
- **HP M21:** ronde tiga rak memakai gulir internal 55–106 px dengan indikator panah; semua rak dapat disentuh dan ronde selesai. Tidak ada clipping horizontal. Ini dicatat sebagai perilaku tata letak, bukan klaim semua kartu/rak terlihat sekaligus.
- Soal, kunci, instruksi tetap konsisten setelah penggantian visual; teks/audio tidak diubah. Audio label kartu SD1 tidak diputar otomatis sesuai perilaku presenter; sepuluh audio instruksi tersedia dan didekode (lihat `audio.json`).

## Validasi

845 tes dalam 99 berkas lulus setelah sinkronisasi main; 810 paket lolos validasi schema. TypeScript `--noEmit`, ESLint dua komponen yang diubah, dan `git diff --check` lulus. Bukti sesi ringkas ada pada `hasil.json`; seluruh screenshot hasil dan ronde padat ketiga ukuran disertakan di `bukti/`.

Pengujian awal mendapati dependensi workspace tertaut ke checkout lama; dependensi kemudian dipisah dan **seluruh 30 sesi diulang** menggunakan paket lokal worktree. Hasil dalam laporan ini hanya dari pengulangan akhir.
