# QA lokal Pilot SD 1 — Misi 32–36

26 November 2026, Asia/Jakarta. Nomor berasal dari `petaJenjang(..., "SD1", ["MAT", "KODE", "SAINS"])`, bukan nomor pelajaran terpisah. Worktree khusus `codex/qa-pilot-m32-36`, mulai dari `origin/main` `6de92cca`, lalu sinkron dengan main termasuk PR #238 dan #239.

30 sesi WebKit dengan emulasi layar sentuh: **300 ronde, semuanya 10/10, tanpa salah, tanpa Bantu, tanpa error JavaScript**. Ukuran viewport fisik HP 390×844, iPad 820×1180, serta iPad 820×1067 (screen 820×1180). Ini emulasi browser lokal, bukan uji perangkat fisik. [Ringkasan terstruktur](hasil.json).

| Misi | Paket utama | HP 390×844 | iPad 820×1180 | iPad 820×1067 |
|---|---|---|---|---|
| 32 | Kalender Dua Belas Bulan<br>`sd1-mat-urutan-bulan` | [Lulus 10/10](screenshots/hp-m32-sd1-mat-urutan-bulan-hasil.png) | [Lulus 10/10](screenshots/ipad-m32-sd1-mat-urutan-bulan-hasil.png) | Lulus; [padat: 5 kartu](screenshots/ipad-pendek-m32-sd1-mat-urutan-bulan-05-awal.png) · [satu kartu](screenshots/ipad-pendek-m32-sd1-mat-urutan-bulan-05-satu-kartu.png) |
| 32 | Hari Demi Hari<br>`sd1-mat-urutan-hari` | [Lulus 10/10](screenshots/hp-m32-sd1-mat-urutan-hari-hasil.png) | [Lulus 10/10](screenshots/ipad-m32-sd1-mat-urutan-hari-hasil.png) | Lulus; [padat: 5 kartu](screenshots/ipad-pendek-m32-sd1-mat-urutan-hari-05-awal.png) · [satu kartu](screenshots/ipad-pendek-m32-sd1-mat-urutan-hari-05-satu-kartu.png) |
| 33 | Perbaiki Blok Ulangi<br>`sd1-kode-perbaiki-ulangi` | [Lulus 10/10](screenshots/hp-m33-sd1-kode-perbaiki-ulangi-hasil.png) | [Lulus 10/10](screenshots/ipad-m33-sd1-kode-perbaiki-ulangi-hasil.png) | Lulus; [padat: 6 blok](screenshots/ipad-pendek-m33-sd1-kode-perbaiki-ulangi-02-awal.png) · [program benar](screenshots/ipad-pendek-m33-sd1-kode-perbaiki-ulangi-02-diperbaiki.png) |
| 33 | Satu Blok Ulangi Rusak<br>`sd1-kode-perbaiki-ulangi-gudang` | [Lulus 10/10](screenshots/hp-m33-sd1-kode-perbaiki-ulangi-gudang-hasil.png) | [Lulus 10/10](screenshots/ipad-m33-sd1-kode-perbaiki-ulangi-gudang-hasil.png) | Lulus; [padat: 5 blok](screenshots/ipad-pendek-m33-sd1-kode-perbaiki-ulangi-gudang-01-awal.png) · [program benar](screenshots/ipad-pendek-m33-sd1-kode-perbaiki-ulangi-gudang-01-diperbaiki.png) |
| 34 | Air atau Daratan?<br>`sd1-sains-air-atau-daratan` | [Lulus 10/10](screenshots/hp-m34-sd1-sains-air-atau-daratan-hasil.png) | [Lulus 10/10](screenshots/ipad-m34-sd1-sains-air-atau-daratan-hasil.png) | Lulus; [padat: 6 kartu](screenshots/ipad-pendek-m34-sd1-sains-air-atau-daratan-01-awal.png) · [satu kartu](screenshots/ipad-pendek-m34-sd1-sains-air-atau-daratan-01-satu-kartu.png) |
| 34 | Terlihat dari Pesawat<br>`sd1-sains-air-atau-daratan-dari-pesawat` | [Lulus 10/10](screenshots/hp-m34-sd1-sains-air-atau-daratan-dari-pesawat-hasil.png) | [Lulus 10/10](screenshots/ipad-m34-sd1-sains-air-atau-daratan-dari-pesawat-hasil.png) | Lulus; [padat: 5 kartu](screenshots/ipad-pendek-m34-sd1-sains-air-atau-daratan-dari-pesawat-01-awal.png) · [satu kartu](screenshots/ipad-pendek-m34-sd1-sains-air-atau-daratan-dari-pesawat-01-satu-kartu.png) |
| 35 | Kotak Kuning dan Bulat<br>`sd1-mat-carroll-kuning-bulat` | [Lulus 10/10](screenshots/hp-m35-sd1-mat-carroll-kuning-bulat-hasil.png) | [Lulus 10/10](screenshots/ipad-m35-sd1-mat-carroll-kuning-bulat-hasil.png) | Lulus; [padat: 8 kartu](screenshots/ipad-pendek-m35-sd1-mat-carroll-kuning-bulat-05-awal.png) · [satu kartu](screenshots/ipad-pendek-m35-sd1-mat-carroll-kuning-bulat-05-satu-kartu.png) |
| 35 | Diagram Empat Kotak<br>`sd1-mat-carroll-merah-bulat` | [Lulus 10/10](screenshots/hp-m35-sd1-mat-carroll-merah-bulat-hasil.png) | [Lulus 10/10](screenshots/ipad-m35-sd1-mat-carroll-merah-bulat-hasil.png) | Lulus; [padat: 6 kartu](screenshots/ipad-pendek-m35-sd1-mat-carroll-merah-bulat-03-awal.png) · [satu kartu](screenshots/ipad-pendek-m35-sd1-mat-carroll-merah-bulat-05-satu-kartu.png) |
| 36 | Pakai Listrik atau Tidak?<br>`sd1-kode-ya-tidak-listrik` | [Lulus 10/10](screenshots/hp-m36-sd1-kode-ya-tidak-listrik-hasil.png) | [Lulus 10/10](screenshots/ipad-m36-sd1-kode-ya-tidak-listrik-hasil.png) | Lulus; [padat: 6 kartu](screenshots/ipad-pendek-m36-sd1-kode-ya-tidak-listrik-01-awal.png) · [satu kartu](screenshots/ipad-pendek-m36-sd1-kode-ya-tidak-listrik-01-satu-kartu.png) |
| 36 | Punya Roda atau Tidak?<br>`sd1-kode-ya-tidak-roda` | [Lulus 10/10](screenshots/hp-m36-sd1-kode-ya-tidak-roda-hasil.png) | [Lulus 10/10](screenshots/ipad-m36-sd1-kode-ya-tidak-roda-hasil.png) | Lulus; [padat: 7 kartu](screenshots/ipad-pendek-m36-sd1-kode-ya-tidak-roda-03-awal.png) · [satu kartu](screenshots/ipad-pendek-m36-sd1-kode-ya-tidak-roda-05-satu-kartu.png) |

## Temuan dan perbaikan

- **32 — seret kalender:** presenter sebelumnya hanya menerima ketuk kartu lalu slot. Kedua paket kini menerima seret ke semua slot kosong, memberi bayangan kartu saat bergerak, dan tetap mendukung ketuk/keyboard. Semua urutan kalender diperiksa, termasuk Minggu–Senin dan Desember–Januari. Semua slot dimainkan lewat seret; sesi awal juga ditamatkan melalui ketuk.
- **33 — kunci program benar:** kedua paket dan seluruh grid memiliki perbaikan satu blok yang mencapai bintang tanpa perintah tersisa. Pemeriksaan meliputi angka Ulangi, isi Ulangi, dan blok di luarnya. Kedua varian dimainkan sampai hasil pada ketiga ukuran. Keadaan “satu kartu tersisa” tidak berlaku pada program yang sudah terisi; screenshot program terpadat dan perbaikannya disertakan.
- **34 — ilustrasi tidak sesuai label:** [sebelumnya](screenshots/sebelum-perairan.png) danau berupa kano, waduk berupa tetes air, teluk berupa perahu, kolam berupa ikan, samudra berupa paus, bukit berupa batu. Semua 23 kartu kini menggambar tempatnya dengan SVG yang terdaftar; kolam memuat ikan, bukit memuat batu, waduk memuat bendungan. Rak perairan/daratan juga memakai ilustrasi tempat. Kunci 23 kartu diperiksa.
- **35 — tujuan Carroll keluar layar HP:** [sebelumnya](screenshots/sebelum-carroll-hp.png) kotak bawah tidak dapat dituju langsung dengan seret. Kisi kartu dan judul kotak dipadatkan, ikon kategori yang berulang dihapus pada HP, serta area isi kotak dibatasi dengan gulir internal. Empat tujuan tetap terlihat. Semua kombinasi warna × bentuk diperiksa untuk seluruh 28 benda di kedua paket.
- **36 — tujuan tertutup pada ronde tujuh kartu iPad:** [sebelumnya](screenshots/sebelum-roda-ipad.png) tiga baris kartu mendorong tujuan ke bawah panggung. Kini tujuh kartu memakai empat kolom dan dua baris. Gambar kano diganti SVG agar tampil konsisten. Kunci 13 benda listrik dan 14 benda roda diperiksa.

## Bukti pemeriksaan

Setiap ronde diperiksa untuk posisi tombol, batas ilustrasi terhadap kartu, overflow teks, gulir horizontal, serta keterjangkauan tujuan. Screenshot ronde awal dan hasil direkam, termasuk keadaan satu kartu tersisa. Tidak ada elemen keluar ke samping, teks terpotong di kotak, atau gulir panggung pada sesi akhir. Instruksi panjang di HP tetap dapat dibuka melalui tombol instruksi lengkap.

Kepadatan nyata maksimum mengikuti generator yang membatasi pengulangan stok: kalender 5 kartu; air/daratan 6 dan pesawat 5; Carroll kuning 8 dan merah 6; listrik 6 dan roda 7. Keadaan padat tersebut diuji di 820×1067, bukan sekadar memakai angka maksimum knob mentah.

Seluruh tujuan pilah menerima ketuk dan seret; semua slot kalender menerima keduanya. Interaksi memakai touchscreen tap, pointer drag, dan keyboard; props presenter hanya dibaca untuk mengidentifikasi soal navigasi, lalu perbaikan diselesaikan melalui UI dan diperiksa simulator jalur terpisah. Hasil dicocokkan dengan event `attempt` dan `activity_end`, bukan hanya tampilan skor.

Validasi: 100 berkas / 851 tes lulus, termasuk enam tes baru yang memeriksa pemetaan, kalender, seluruh program, ilustrasi, Carroll, serta kategori ya/tidak. 810 paket valid. TypeScript dan lint berkas yang diubah lulus. Build produksi dan CI dicatat pada PR.

Pengulangan lokal:

```sh
npm ci
npm run dev -- --port 3872
# Sediakan playwright-core dan browser WebKit; PLAYWRIGHT_MODULE bisa menunjuk instalasi terpisah.
node scripts/qa/pilot-m32-36.mjs --drag
```

`RUMILA_QA_PORT`, `RUMILA_QA_OUTPUT`, `RUMILA_QA_MISSION`, `RUMILA_QA_SLUG`, dan `RUMILA_QA_DEVICE` membatasi pengujian. Bukti mentah lokal: `/tmp/rumila-pilot-m32-36-verified` (seluruh ronde, kartu individual, hasil, dan pengukuran). Screenshot terpilih yang ditautkan di atas disimpan bersama laporan ini.
