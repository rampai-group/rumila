# QA lokal Pilot M26–30 — 26 November 2026

Worktree terpisah `codex/qa-pilot-m26-30`, mulai dari `origin/main` 6044a55c lalu sinkron ke 262c4255, 816e4049, dan db33e758. Nomor berasal dari `petaJenjang` SD1 dengan track MAT, KODE, SAINS: 5 misi / 10 paket utama. Perbaikan sesi M21–25, M26–31 (#242), M32–36, dan M37–42 dipertahankan.

Playwright WebKit dengan sentuhan emulasi, bukan perangkat fisik: HP 390×844, iPad 820×1180, dan 820×1067 (screen tetap 820×1180 untuk ruang Safari). **30 sesi / 300 ronde, semua mencapai layar hasil 10/10 tanpa bantuan atau kegagalan.** Seed berbeda per ukuran. Input menggunakan UI kartu/slot/rak dan petak prediksi, hasil diperiksa pada layar dan event lokal. Pengukuran tampilan awal tiap ronde tidak menemukan overflow horizontal, gulir vertikal, atau clipping teks kartu; screenshot juga merekam tahap lanjut pengisian. Instruksi HP yang diringkas dapat dibuka lewat tombol baca lengkap.

## Status setiap paket

| Misi | Paket | HP 390×844 | iPad 820×1180 | iPad 820×1067 |
|---|---|---|---|---|
| 26 | `sd1-sains-bunyi-makin-jauh-makin-pelan` | [Lulus 10/10](bukti/hp-m26-sd1-sains-bunyi-makin-jauh-makin-pelan-hasil.png) | [Lulus 10/10](bukti/ipad-m26-sd1-sains-bunyi-makin-jauh-makin-pelan-hasil.png) | [Lulus, ronde padat](bukti/ipad-pendek-m26-sd1-sains-bunyi-makin-jauh-makin-pelan-padat.png) |
| 26 | `sd1-sains-bunyi-dekat-jauh-jalan` | [Lulus 10/10](bukti/hp-m26-sd1-sains-bunyi-dekat-jauh-jalan-hasil.png) | [Lulus 10/10](bukti/ipad-m26-sd1-sains-bunyi-dekat-jauh-jalan-hasil.png) | [Lulus, ronde padat](bukti/ipad-pendek-m26-sd1-sains-bunyi-dekat-jauh-jalan-padat.png) |
| 27 | `sd1-mat-urut-ringan-berat` | [Lulus 10/10](bukti/hp-m27-sd1-mat-urut-ringan-berat-hasil.png) | [Lulus 10/10](bukti/ipad-m27-sd1-mat-urut-ringan-berat-hasil.png) | [Lulus, ronde padat](bukti/ipad-pendek-m27-sd1-mat-urut-ringan-berat-padat.png) |
| 27 | `sd1-mat-belanja-ringan-berat` | [Lulus 10/10](bukti/hp-m27-sd1-mat-belanja-ringan-berat-hasil.png) | [Lulus 10/10](bukti/ipad-m27-sd1-mat-belanja-ringan-berat-hasil.png) | [Lulus, ronde padat](bukti/ipad-pendek-m27-sd1-mat-belanja-ringan-berat-padat.png) |
| 28 | `sd1-mat-urut-isi-wadah` | [Lulus 10/10](bukti/hp-m28-sd1-mat-urut-isi-wadah-hasil.png) | [Lulus 10/10](bukti/ipad-m28-sd1-mat-urut-isi-wadah-hasil.png) | [Lulus, ronde padat](bukti/ipad-pendek-m28-sd1-mat-urut-isi-wadah-padat.png) |
| 28 | `sd1-mat-wadah-halaman-isi` | [Lulus 10/10](bukti/hp-m28-sd1-mat-wadah-halaman-isi-hasil.png) | [Lulus 10/10](bukti/ipad-m28-sd1-mat-wadah-halaman-isi-hasil.png) | [Lulus, ronde padat](bukti/ipad-pendek-m28-sd1-mat-wadah-halaman-isi-padat.png) |
| 29 | `sd1-kode-tebak-petak-ulangi` | [Lulus 10/10](bukti/hp-m29-sd1-kode-tebak-petak-ulangi-hasil.png) | [Lulus 10/10](bukti/ipad-m29-sd1-kode-tebak-petak-ulangi-hasil.png) | [Lulus, ronde padat](bukti/ipad-pendek-m29-sd1-kode-tebak-petak-ulangi-padat.png) |
| 29 | `sd1-kode-tebak-petak-angkasa` | [Lulus 10/10](bukti/hp-m29-sd1-kode-tebak-petak-angkasa-hasil.png) | [Lulus 10/10](bukti/ipad-m29-sd1-kode-tebak-petak-angkasa-hasil.png) | [Lulus, ronde padat](bukti/ipad-pendek-m29-sd1-kode-tebak-petak-angkasa-padat.png) |
| 30 | `sd1-sains-butuh-listrik-rumah` | [Lulus 10/10](bukti/hp-m30-sd1-sains-butuh-listrik-rumah-hasil.png) | [Lulus 10/10](bukti/ipad-m30-sd1-sains-butuh-listrik-rumah-hasil.png) | [Lulus, ronde padat](bukti/ipad-pendek-m30-sd1-sains-butuh-listrik-rumah-padat.png) |
| 30 | `sd1-sains-butuh-listrik-sekolah` | [Lulus 10/10](bukti/hp-m30-sd1-sains-butuh-listrik-sekolah-hasil.png) | [Lulus 10/10](bukti/ipad-m30-sd1-sains-butuh-listrik-sekolah-hasil.png) | [Lulus, ronde padat](bukti/ipad-pendek-m30-sd1-sains-butuh-listrik-sekolah-padat.png) |

## Temuan dan perbaikan

- **M26–28 tata letak:** kotak kosong dua baris mengambil terlalu banyak tempat; gambar kecil dan label panjang terlipat. Slot kini satu baris, pilihan dua kolom dengan gambar lebih besar, ukuran mengikuti tinggi layar. Petunjuk ketuk-kartu/ketuk-slot ditampilkan. Pada iPad awal, beberapa ronde memerlukan gulir 44–67 px; setelah perbaikan semua ronde teruji muat tanpa gulir.
- **M26 gambar:** peluit semula megafon, mobil es krim hanya es krim, beduk memakai drum, kentongan hanya kayu, dan mangkuk bakso hanya panci makanan. Adegan jarak kini mendukung ilustrasi sumber yang terdaftar; gambar sesuai konteks dan jarak pendengar tetap 0 → 0,3 → 0,65 → 1 sesuai urutan jawaban.
- **M27 gambar:** semangka untuk membandingkan berat diganti dari irisan menjadi buah utuh. Petunjuk batang berat, kunci konsisten antarsekuens, dan audio terbaru dari PR #242 dipertahankan; ukuran emoji bukan petunjuk massa.
- **M28 gambar:** cangkir, mangkuk, dan panci tidak lagi berisi minuman/makanan saat diminta membayangkan kapasitas air. Petunjuk batang kapasitas, skala ikon seragam, serta instruksi/audio PR #242 dipertahankan. Batang yang lebih panjang menunjukkan kapasitas lebih besar, bukan ukuran ikon. 
- **M29 prediksi:** kedua varian berhasil pada maju, belok, dan langkah berulang. 52 program pada bank peta diuji mencapai bintang dan tidak keluar petak. Tidak perlu perubahan mekanik navigasi.
- **M30 gambar:** kulkas semula persegi panjang tanpa detail, kipas pusaran, jam baterai berupa jam bandul, bel listrik hanya lonceng. Ilustrasi kipas/kulkas dari PR #242 dipertahankan, sementara jam baterai dan bel listrik diperjelas di PR ini. Kunci tetap membedakan listrik (termasuk baterai) dan tanpa listrik.

## Audio, validasi, dan batas pengujian

Sepuluh tombol audio instruksi diuji: semua berkas HTTP 200 dan didekode dengan durasi positif (`audio.json`). Instruksi/narasi terbaru tentang batang di M27/M28 dari PR #242 ikut diuji ulang. Ini pemeriksaan teknis audio, bukan evaluasi pelafalan melalui pendengaran. Soal dan label diperiksa dari konten serta screenshot; pengujian tidak memakai akun anak atau mengirim progres ke server.

863 tes dalam 102 berkas lulus setelah sinkronisasi main; 810 paket valid, TypeScript `--noEmit`, lint komponen perubahan dan `git diff --check` lulus. Regresi mencakup peta gabungan, keterlihatan sumber bunyi SVG, urutan jarak, konsistensi batang kapasitas, dan seluruh program M29. Skrip browser tersimpan pada `scripts/qa/pilot-m26-30.mjs`; jalankan dari root worktree dengan Playwright tersedia, `RUMILA_QA_PORT=39863`, dan opsional `PLAYWRIGHT_MODULE` untuk lokasi modul. Contoh: `RUMILA_QA_OUTPUT=/tmp/qa-pilot node scripts/qa/pilot-m26-30.mjs --no-art`.

Bukti akhir hanya berasal dari server worktree sendiri pada port 39863; port awal 3876 ternyata sudah dipakai sesi lain, sehingga hasil dari port itu tidak digunakan. Setelah integrasi PR #242, seluruh 30 sesi dimainkan ulang dan semua screenshot diganti dengan hasil integrasi akhir. Ronde padat dipilih berdasarkan jumlah kartu atau langkah prediksi yang tampil. M30 menampilkan enam kartu per ronde sesuai batas setengah stok pada mekanik generatif. Data ringkas 30 sesi ada di `hasil.json`; 60 screenshot hasil/ronde padat ada di `bukti/`. Produksi diverifikasi setelah merge melalui `/api/versi`, rute paket, dan bundle aplikasi; permainan lengkap dilakukan lokal.
