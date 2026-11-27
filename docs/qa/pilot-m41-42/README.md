# QA lokal Pilot SD1 M41–42 — 27 November 2026

Worktree `codex/qa-pilot-m41-42`, dibuat dari main `a3304f1e`, disinkronkan dengan `dbf4ea2d` (PR #259) dan `6a7fab22` (PR #260). Nomor dari petaJenjang SD1, gabungan MAT, KODE, SAINS. Perbaikan sesi lain dipertahankan.

**12 sesi / 120 ronde: semua selesai 10/10, tanpa gagal, Bantu, atau error JavaScript.** WebKit dengan emulasi sentuh; bukan HP/iPad fisik. Seluruh ronde dimainkan pada ketiga ukuran, termasuk iPad pendek.

| Misi | Paket | HP 390×844 | iPad 820×1180 | iPad 820×1067 |
|---|---|---|---|---|
| 41 | `sd1-sains-ukur-jengkal-temuan-kebun` | [10/10](bukti/hp-m41-sd1-sains-ukur-jengkal-temuan-kebun-hasil.png) | [10/10](bukti/ipad-m41-sd1-sains-ukur-jengkal-temuan-kebun-hasil.png) | [10/10](bukti/ipad-pendek-m41-sd1-sains-ukur-jengkal-temuan-kebun-hasil.png) · [Padat](bukti/ipad-pendek-m41-sd1-sains-ukur-jengkal-temuan-kebun-padat.png) |
| 41 | `sd1-sains-ukur-kubus-temuan-kebun` | [10/10](bukti/hp-m41-sd1-sains-ukur-kubus-temuan-kebun-hasil.png) | [10/10](bukti/ipad-m41-sd1-sains-ukur-kubus-temuan-kebun-hasil.png) | [10/10](bukti/ipad-pendek-m41-sd1-sains-ukur-kubus-temuan-kebun-hasil.png) · [Padat](bukti/ipad-pendek-m41-sd1-sains-ukur-kubus-temuan-kebun-padat.png) |
| 42 | `sd1-sains-turus-pengunjung-kebun` | [10/10](bukti/hp-m42-sd1-sains-turus-pengunjung-kebun-hasil.png) | [10/10](bukti/ipad-m42-sd1-sains-turus-pengunjung-kebun-hasil.png) | [10/10](bukti/ipad-pendek-m42-sd1-sains-turus-pengunjung-kebun-hasil.png) · [Padat](bukti/ipad-pendek-m42-sd1-sains-turus-pengunjung-kebun-padat.png) |
| 42 | `sd1-sains-turus-pengunjung-kolam` | [10/10](bukti/hp-m42-sd1-sains-turus-pengunjung-kolam-hasil.png) | [10/10](bukti/ipad-m42-sd1-sains-turus-pengunjung-kolam-hasil.png) | [10/10](bukti/ipad-pendek-m42-sd1-sains-turus-pengunjung-kolam-hasil.png) · [Padat](bukti/ipad-pendek-m42-sd1-sains-turus-pengunjung-kolam-padat.png) |

## Temuan dan perbaikan

- **M41 jengkal:** emoji generik tidak cukup cocok dengan nama benda (misalnya akar berupa kayu, daun pisang berupa dua daun). Kini 18 ilustrasi SVG dipakai oleh 22 item kedua paket. Siluet horizontal mengikuti ujung pengukuran, tanpa mengubah nilai/kunci. [Galeri seluruh ilustrasi](bukti/ilustrasi-benda.png).
- **M41 kubus:** gambar semula kecil di tengah bidang ukur. Kini gambar mengisi bentang antara dua garis biru, sehingga panjang benda sesuai jumlah kubus. Skrip menguji kedua tepi SVG terhadap bentang kubus serta jarak antarkubus. Offset awal tetap diperhitungkan.
- **M42 kolam:** latar rumput diganti air kolam. Kebun tetap berlatar rumput.
- **M42 HP dan iPad:** baris hitung dan gambar diperbesar untuk mengurangi ruang kosong. Iterasi awal terlalu tinggi saat tiga jenis muncul; diperbaiki dan seluruh ronde diuji ulang. Tombol mulai/selesai tetap terlihat tanpa gulir vertikal.

## Pemeriksaan

M41: soal dan nama seluruh 22 item cocok dengan gambar; angka dipilih melalui UI. Jengkal ditambah hingga rapat, tepi antarjengkal serta awal/akhir gambar diperiksa. Pada HP, bentang panjang memang dapat digulir horizontal; bukti ujung kanan disimpan. Kubus dihitung dari posisi visual, termasuk ketika awal benda tidak di kubus pertama. Angka, versi paket, dan label yang lama dipertahankan kecuali versi patch.

M42: menunggu enam detik sebelum Mulai tidak memajukan pengunjung. Tiap pengunjung dihitung lewat tombol UI, termasuk hewan identik berturut-turut. Tombol Selesai nonaktif sampai seluruh pengunjung lewat. Kurangi turus diuji sampai nol, tidak bisa negatif, lalu jumlah dikembalikan sebelum penilaian. Ronde padat mencapai delapan pengunjung dari tiga jenis. Semua jawaban dibandingkan dengan event attempt dan activity_end.

885 tes / 105 berkas lulus; 810 paket valid; TypeScript, lint komponen perubahan, dan git diff --check lulus. Tes mekanik yang ada mencakup jawaban salah, jengkal bercelah/tumpang tindih, dan salah hitung turus. Pemeriksaan geometri setiap ronde tidak menemukan teks terpotong atau tombol keluar sisi panggung. Empat audio instruksi dan 22 audio pertanyaan M41 memuat HTTP 200 dan berdurasi positif; ini pemeriksaan teknis, bukan penilaian pelafalan melalui pendengaran.

Bukti hasil, ronde padat, interaksi, ujung kanan jengkal, dan pembanding ada di `bukti/`. Data ringkas: `hasil.json`; audio: `audio.json` dan `audio-soal.json`. Bukti mentah setiap ronde: `/tmp/m41-final`. Putaran akhir dijalankan setelah sinkronisasi main dan semua penyuntingan selesai, untuk menghindari pengaruh hot reload. Tidak memakai akun anak atau menulis progres ke server.

```sh
npm run dev -- --port 39866
RUMILA_PLAYWRIGHT_MODULE=/path/to/playwright-core/index.mjs RUMILA_QA_OUTPUT=/tmp/qa node scripts/qa/pilot-m41-42.mjs
```
