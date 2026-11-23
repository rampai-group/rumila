# Audit Umroh Virtual — arah peningkatan realisme

Tanggal audit: 23 November 2026 (Asia/Jakarta). Kode awal: `2a961b8`.
Target: aplikasi lokal `/dev/umroh`, mode development tanpa login, browser dalam aplikasi Codex.

## Kesimpulan

Umroh Virtual sudah memiliki rangka perjalanan, panduan, aksi bandara, kamera, animasi, dan penyimpanan progres yang berguna. Secara visual, hasilnya masih berupa rekonstruksi edukatif bergaya maket. Peningkatan menuju tampilan nyata membutuhkan pembaruan aset, material, pencahayaan, gerak manusia, dan komposisi kamera secara bersama.

Prioritas pertama adalah satu adegan Masjidil Haram berkualitas tinggi pada sudut pandang setinggi mata. Adegan ini menjadi patokan untuk lingkungan lain. Menambah efek pascaproses atau menaikkan jumlah poligon saja tidak menyelesaikan ketidakseragaman yang terlihat.

Audit ini menghasilkan bukti dan rencana implementasi; tidak mengubah kode produk atau memasang aset baru.

## Cakupan perjalanan dan hasil

Seluruh 21 bab utama dilihat melalui UI, dengan 49 screenshot. Jalur berangkat dan ibadah dijalankan interaktif; jalur pulang disampel melalui timeline resmi Film Pulang, lalu bagian akhir dimainkan sampai layar “Sampai kembali di rumah”. Ini bukan klaim bahwa setiap kombinasi kontrol atau setiap detik kedua mode film sudah diuji.

| No. | Tahap | Status dan catatan | Screenshot |
|---|---|---|---|
| 1 | Tiba CGK | Masuk terminal bekerja; kualitas lingkungan sederhana | 01–03 |
| 2 | Check-in | Empat aksi dan validasi boarding pass bekerja; karakter petugas perlu diganti | 04–05 |
| 3 | Imigrasi | Aksi selesai; pandangan pemindai terhalang karakter | 06–07 |
| 4 | Keamanan | Urutan nampan/pemeriksaan bekerja; mesin kurang detail | 08 |
| 5 | Gerbang | Progres dan tindakan lanjut bekerja; ruang dan kursi repetitif | 09 |
| 6 | Boarding | Animasi berjalan sampai 100%; kualitas penumpang tidak seragam | 10–12 |
| 7 | Penerbangan ke Jeddah | Fase penerbangan selesai, kamera luar dan senja diperiksa; model pesawat sederhana | 13–16 |
| 8 | Tiba Jeddah | Lanjut ke kereta bekerja; papan kedatangan terbalik | 17 |
| 9 | Haramain | Perjalanan dimulai lalu disingkat memakai kontrol resmi; interior sederhana | 18 |
| 10 | Stasiun Madinah | Transisi bekerja; ruang luas kurang kegiatan/detail | 19 |
| 11 | Mobil ke Nabawi | Perjalanan dimulai lalu disingkat; dashboard dan kota kurang detail | 20 |
| 12 | Nabawi | Adegan dan lanjut bekerja; manusia, awan, dan lighting perlu upgrade | 21 |
| 13 | Raudhah | Tahap dapat dilalui; karpet/emas belum meyakinkan | 22 |
| 14 | Salam | Tahap dapat dilalui; material pagar dan kerumunan perlu penyempurnaan | 23 |
| 15 | Rangkaian umroh | Sepuluh tahap diperiksa sebagaimana tabel berikut | 24–41 |
| 16 | Bus ke Jeddah | Film Pulang dapat dimulai; bus masih sederhana | 42–43 |
| 17 | Bandara Jeddah pulang | Diperiksa dari film dan timeline | 44 |
| 18 | Terbang ke CGK | Timeline dan jeda bekerja; kamera didominasi dinding kabin | 45 |
| 19 | Tiba CGK | Papan belakang kembali terbalik; caption imigrasi tampil pada framing area bagasi | 46 |
| 20 | Taksi ke rumah | Timeline bekerja; kota dan interior masih berbentuk maket | 47 |
| 21 | Rumah / selesai | Film berakhir dan tautan “Selesai” menuju lab tampil | 48–49 |

| Tahap ibadah | Status dan catatan | Screenshot |
|---|---|---|
| Persiapan | Tiga checklist dan pilihan panduan putri diperiksa | 24–25 |
| Miqat | Konfirmasi niat dapat dilanjutkan | 26 |
| Perjalanan Makkah | Bus dapat dilalui; dashboard dan pegunungan sederhana | 27 |
| Masuk Haram | Landmark jelas; detail lingkungan belum konsisten | 28 |
| Tawaf | Tujuh putaran selesai memakai mode Dipercepat; jeda dan pemulihan setelah reload pada 1/7 bekerja | 29–33 |
| Salat | Dapat dilanjutkan; kamera kawasan pilihan sebelumnya bertahan | 34 |
| Zamzam | Dapat dilanjutkan; objek pelajaran tetap jauh dalam mode kawasan | 35 |
| Sa’i | Tujuh perjalanan selesai memakai mode Dipercepat; diperiksa juga pada viewport 390 × 844 | 36–39 |
| Tahallul | Tahap bekerja; ruang cukur statis dan cermin berupa bidang polos, demonstrasi memangkas belum nyata | 40 |
| Selesai umroh | Tombol pulang membuka penawaran film | 41–42 |

Jeda/putar Film Pulang terverifikasi memakai keyboard Space. Klik pada area kontrol kiri bawah sempat tertutup indikator Next.js development; ini gangguan overlay development dan belum dianggap bug produksi. Pengujian viewport adalah simulasi ukuran browser, bukan pengujian HP fisik.

## Cara membaca bukti

Screenshot bernomor di folder ini berasal dari sesi audit ini. `gallery.html` menyatukan gambar dan catatan. Nomor gambar berbeda dari nomor bab karena beberapa bab mempunyai beberapa pengujian.

Awal perjalanan direkam pada viewport sempit sekitar 435 × 723. Selanjutnya viewport diubah ke 1440 × 900. Renderer menyimpan kategori `compact` saat konstruksi, sehingga gambar 03–30 masih menggunakan kebijakan renderer dari viewport awal. Sesudah muat ulang pada pengujian pemulihan, renderer diinisialisasi pada viewport desktop. Temuan struktur, material, bentuk karakter, papan terbalik, dan framing tidak bergantung pada asumsi bahwa gambar awal memakai kualitas maksimum desktop. Ketajaman font dalam screenshot tereskalakan tidak dijadikan bug produk.

## Yang sudah baik dan perlu dipertahankan

- Perjalanan dibagi empat babak, dengan satu tindakan utama yang jelas; penjelasan panjang dapat dibuka terpisah.
- Check-in, imigrasi, keamanan, dan gerbang mempunyai aksi bertahap. Boarding pass mengharuskan pemeriksaan nama, tujuan, dan kursi sebelum disimpan.
- Pilihan panduan putra/putri mengubah penjelasan. Posisi Ka’bah, hitungan tawaf, dan arah sa’i ditampilkan sebagai panduan.
- Tawaf dapat dijeda; pemulihan setelah reload mempertahankan hitungan dan mengembalikan sesi dalam keadaan jeda.
- Tersedia kamera kabin/luar pesawat, suasana siang/senja, dan kamera kawasan.
- Arsitektur teknis sudah memakai material PBR, instancing karakter, penggabungan geometri statis, fallback karakter, serta pelepasan sumber daya saat modul ditutup.
- `npm test -- src/lib/umroh src/components/umroh`: **14 berkas tes, 89 tes lolos**. Ini bukti untuk kontrak yang dicakup tes, bukan bukti fotorealisme, performa perangkat nyata, atau akurasi seluruh arsitektur.

## Temuan utama dan tindakan

### 1. P1 — kualitas manusia tidak konsisten

**Bukti:** 04, 06–08, 10–11, 19, 21–24, 28. Petugas serta perempuan terlihat dari bentuk tubuh sederhana dan muka bergaya manekin. Jamaah pria bertekstur terlihat lebih rinci, tetapi wajah dan pakaiannya berulang. Perbedaan terlihat sangat kuat di kabin dan pelataran.

**Penyebab kode:** `realistic/pilgrims.ts` menggunakan `StandingPeople` berbasis `HumanBatch` untuk petugas. `RealisticHumanBatch.flush()` melewatkan slot perempuan; hanya dua GLB pria tersedia, masing-masing pakaian perjalanan dan ihram. Variasi skala tidak mengubah wajah model.

**Perbaikan:** model pria, perempuan, petugas, dan awak kabin dengan kualitas yang setara; variasi kepala, tinggi, warna kulit, serta pakaian yang wajar; animasi diam, berjalan, duduk, memegang koper, dan menyerahkan dokumen. Untuk pakaian dan landmark keagamaan, gunakan referensi yang terverifikasi. Kontak tangan–objek dan kaki–lantai perlu diperiksa dalam jarak dekat.

**Lulus jika:** close-up kabin, check-in, dan pelataran tidak mencampur model realistis dengan manekin; tidak ada kaki menembus lantai atau tangan menembus kursi; kerumunan tidak terbaca sebagai salinan satu orang.

### 2. P1 — pencahayaan terlalu merata, kedalaman ruang lemah

**Bukti:** 03–04, 08, 11–13, 21–24, 28–32. Permukaan putih mendominasi tanpa pemisahan kuat antara area terang dan area teduh. Sambungan objek ke lantai kurang tegas; kabin dan terminal tampak seperti plastik putih. Ini penilaian visual, bukan pengukuran histogram clipping.

**Penyebab kode:** cahaya hemisphere global, satu directional light, environment dari Sky, serta exposure menurut kategori scene. Shadow camera mencakup area tetap ±85 meter. AO tersedia tetapi dapat dinonaktifkan oleh tier perangkat dan penjaga frame lambat. Environment dibuat sekali; `setTime()` mengganti langit/lampu tanpa membangun kembali environment pantulan, sehingga pergantian siang/senja perlu diselaraskan.

**Perbaikan:** profil lighting berbeda untuk halaman, terminal, kabin, masjid, dan gurun. Gunakan pencahayaan tidak langsung yang dipanggang untuk arsitektur statis, bayangan kontak yang tetap tersedia pada mode hemat, environment sesuai lokasi/waktu, serta shadow coverage dekat kamera. Kalibrasi material dan exposure bersama, bukan menggelapkan semua scene dengan satu angka.

**Temuan runtime terkonfirmasi:** console browser mengeluarkan `THREE.WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.` Kode lokal Three.js mengonfirmasi fallback ini. Jadi konfigurasi bernama PCFSoft pada modul tidak lagi menghasilkan jalur yang diasumsikan dokumentasi modul. Sesuaikan konfigurasi dengan versi terpasang dan bandingkan bayangan dekat; jangan menyimpulkan seluruh masalah lighting berasal dari satu peringatan ini.

**Lulus jika:** lipatan ihram tetap terbaca saat siang, bawah kursi/kanopi terasa teduh, logam memantulkan lingkungan, dan interior mempunyai arah cahaya yang masuk akal.

### 3. P1 — bahan berbeda belum memiliki karakter permukaan yang cukup

**Bukti:** 04, 09–13, 18, 22–24, 27–30. Kain kursi, plastik dinding, karpet, batu, kaca, dan logam terasa terlalu sederhana. Kisi-kisi emas tampak seperti cat kuning. Jalan dan pegunungan tidak memiliki rincian dekat yang meyakinkan.

**Penyebab kode:** pustaka umum hanya memuat tiga peta foto marmer; banyak material lain hanya warna dan roughness konstan. Tekstur marmer dipakai ulang untuk beberapa batu/paving. Kain memakai weave dari canvas. Kiswah dan ornamen dibuat prosedural.

**Perbaikan:** set material terpisah: marmer, limestone, beton, aspal, batu gurun, karpet, kain jok, plastik kabin, kaca, logam, kiswah, dan sulaman. Gunakan base color, roughness, normal, serta AO bila sesuai; skala tekstur mengikuti ukuran benda. Variasi tipis permukaan, sambungan panel, jahitan, bevel, dan kondisi pemakaian harus sesuai lokasi yang terawat.

**Lulus jika:** material dapat dibedakan walaupun warnanya sama; pola tidak terlihat berulang mencolok; detail dekat tetap masuk akal dan tidak membuat seluruh lingkungan tampak kotor.

### 4. P1 — aset utama dan lingkungan masih terasa seperti maket

**Bukti:** pesawat 14–16; kendaraan 20 dan 27; landmark 21–24 dan 28–32. Bentuk pesawat, roda, jendela kokpit, bus, dashboard, pegunungan, dan gedung jauh disederhanakan. Detail Ka’bah sudah lebih baik daripada objek lain, tetapi pola sulaman berulang, dinding arcade rata, dan gedung belakang yang kotak membuat kualitas keseluruhan turun.

**Perbaikan:** gunakan model bertekstur untuk objek yang sering dilihat dekat: Ka’bah, Maqam Ibrahim, pintu/kolom/payung, pesawat dan kabinnya, kendaraan, kursi, konter, bagasi, serta mesin keamanan. Buat kit arsitektur modular untuk struktur berulang. Konteks kota perlu kedalaman dan variasi bentuk, bukan sekadar kotak yang diberi pola jendela. Ornamen atau tulisan sakral tidak boleh diganti tulisan rekaan demi detail.

**Lulus jika:** tiga kamera patokan—setinggi mata, jarak dekat material, dan kawasan—konsisten dengan referensi tempat, proporsi, dan kualitas visual yang sama.

### 5. P1 — komposisi kamera dan keterbacaan objek perlu diperbaiki

**Bukti:** 06 menunjukkan badan orang menghalangi pemindai imigrasi; 12–13 dan 45 didominasi dinding kabin; 17 dan 46 menampilkan papan kedatangan Jeddah/CGK terbalik dari sisi belakang. Pada 46, caption menyebut imigrasi sementara komposisi mengarah ke conveyor bagasi; titik kamera film perlu dicocokkan dengan narasi. Petunjuk jalan kaki juga tampil ketika pengguna berada dalam kendaraan (18, 20, 27).

**Perbaikan:** tentukan ruang bebas di depan kamera setiap stasiun aksi; pisahkan jalur antrean dari garis pandang. Tempatkan kamera kursi berdasarkan eye point dan bingkai jendela. Papan dua sisi memerlukan sisi belakang dengan teks berorientasi benar, bukan hanya material `DoubleSide`. Sesuaikan petunjuk kontrol dengan mode berjalan, duduk, atau perjalanan otomatis.

**Lulus jika:** objek yang sedang dipelajari selalu terbaca pada kamera default desktop/HP; tidak ada teks papan terbalik; pengguna memahami apa yang dapat digerakkan.

**Tambahan sa’i:** gambar 36–37 memperlihatkan wajah jamaah utama pada kamera “Ikuti jamaah”. Kode menempatkan kamera awal di belakang arah heading, sehingga orientasi depan model GLB terhadap arah gerak perlu divalidasi dengan rig dan lintasan. Ini indikasi ketidakcocokan orientasi, belum pengukuran kontak langkah per frame. Saat mode kawasan dipertahankan dari tawaf, salat dan Zamzam juga tetap terlihat dari jauh (34–35); transisi ke fokus objek pelajaran sebaiknya ditawarkan tanpa menghilangkan pilihan kamera pengguna.

### 6. P1 — populasi dan langit mengurangi kesan tempat hidup

**Bukti:** 21, 24, 28–32. Siluet awan yang serupa berulang besar di langit. Pada pandangan kawasan, jamaah berkumpul dalam cincin yang sangat teratur, sedangkan bagian lain kosong.

**Penyebab kode:** 46 sprite awan dari tiga varian. Kerumunan tawaf memakai radius berdasarkan indeks (`i % 9`) dan gerak analitis; hanya ada penghindaran dekat kamera. Spesifikasi Haram 600 orang dibatasi menjadi 90/220 oleh renderer. Slot pria memakai model sekitar 24 ribu segitiga pada semua jarak, tanpa LOD di batch yang diperiksa.

**Perbaikan:** variasi langit lebih natural, horizon berlapis dan haze sesuai lokasi. Kerumunan memakai beberapa kepadatan dan variasi kecepatan, jarak personal, kelompok kecil, serta jalur yang tetap benar. Tingkat detail menurut jarak memungkinkan massa jamaah jauh tanpa semua memakai model dekat. Kepadatan untuk belajar tetap harus memberi ruang pandang dan orientasi.

**Lulus jika:** tidak ada pola cincin mekanis atau pengulangan awan yang dominan; arus jamaah terasa hidup tanpa mengaburkan pelajaran.

### 7. P1 sebelum menambah aset — pipeline belum siap untuk kenaikan detail besar

**Bukti kode:** `Resources.batch()` pada `realistic/resources.ts:112–121` menulis ulang UV kecuali `keepUV`, lalu membuang atribut selain position/normal/uv. Jalur ini akan membuang UV tambahan untuk lightmap dan atribut lain yang diperlukan sebagian aset baru. Menggabungkan semua lingkungan per material juga memperbesar cakupan mesh sehingga culling spasial perlu ditinjau.

`scene.ts` menyimpan world dan crowd yang sudah dikunjungi sampai modul ditutup. Ini cache yang dibatasi jumlah scene, bukan bukti kebocoran tanpa batas, tetapi penambahan aset berat meningkatkan puncak memori perjalanan panjang. `character-batch.ts:63` menonaktifkan frustum culling untuk batch karakter. Mode hemat terutama menonaktifkan AO, belum sistem anggaran detail menyeluruh.

**Perbaikan:** kontrak aset GLB dengan unit meter, pivot, nama material, collision mesh, LOD, animasi, dan manifest lisensi. Pertahankan UV/atribut yang dibutuhkan aset. Batching per sektor ruang, prefetch scene berikutnya, cache dengan batas memori, kompresi tekstur GPU, serta pengukuran frame time/draw calls/triangles/memori sebelum dan setelah.

**Target usulan, belum hasil pengukuran:** 30 fps stabil pada HP target dan 60 fps pada desktop target; kualitas dekat tetap diprioritaskan ketika perangkat menurun. Tentukan perangkat nyata dan kondisi jaringan sebelum mengunci anggaran ukuran aset. Tidak perlu memigrasikan engine hanya untuk menjalankan langkah ini.

### 8. P2 — UI belajar dan aksesibilitas perlu mengikuti pengalaman imersif

**Bukti:** 01–02 panel cukup besar pada HP; 25 panduan rinci tersimpan di panel terpisah; 31 dialog pemulihan jelas. Checklist persiapan menyebut panduan “di bawah”, padahal dibuka dari tombol informasi. Mode cepat dipilih di panel, tetapi label pembeda tidak selalu terlihat pada HUD utama saat panel ditutup.

**Risiko kode:** boarding pass memakai `div role="dialog" aria-modal="true"` tanpa pengelolaan fokus di komponen tiket. Dialog penawaran film juga berbeda dari dialog native yang digunakan untuk peta/pemulihan. Ini risiko fokus keluar overlay yang perlu diuji dengan keyboard, bukan klaim kegagalan screen reader yang sudah terukur. Film menggerakkan kamera melalui jalur tersendiri, sehingga perilaku reduced motion film juga harus diuji secara khusus.

**Perbaikan:** pola dialog konsisten, fokus masuk/kembali, penguncian background yang benar, Escape sesuai kebutuhan, label mode cepat yang tetap terlihat, dan tombol jeda yang mudah ditemukan. Pertahankan pilihan teks/narasi, hitungan yang selalu tampil, dan kamera kawasan untuk pengguna sensitif gerakan.

**Batas:** audit tidak membuktikan kepatuhan WCAG, kualitas screen reader, atau kontras terukur pada seluruh latar. Efek suara mesin tersedia dari kode; kualitas audio spasial dan narasi belum dinilai melalui pendengaran.

## Urutan implementasi yang disarankan

| Tahap | Pekerjaan konkret | Syarat selesai |
|---|---|---|
| 1. Patokan visual | Kumpulkan referensi foto tempat dan material; pilih 3 kamera Haram; inventaris aset dan target perangkat | Referensi dan render dasar memakai komposisi yang dapat dibandingkan |
| 2. Fondasi renderer | Pipeline UV/lightmap, profiling, tier kualitas, cache, LOD, lighting per lokasi | Detail dapat dinaikkan tanpa mengorbankan batas perangkat |
| 3. Haram lengkap | Ka’bah, pelataran, arcade, konteks kota, jamaah, langit, tawaf POV | Satu lokasi tampil konsisten dari dekat sampai jauh |
| 4. Nabawi dan sa’i | Payung, kolom, karpet, pagar, koridor, pencahayaan dalam ruang, kerumunan | Kualitas menyamai patokan Haram |
| 5. Bandara dan perjalanan | Petugas, check-in, keamanan, bagasi, pesawat/kabin, kereta, mobil/bus, jalan | Aksi dan perpindahan kamera terasa menyatu dengan objek |
| 6. Penyelesaian | Audio lingkungan, narasi, mobile, keyboard, reduced motion, pemulihan, perjalanan penuh | Regresi alur, visual, dan performa lulus pada perangkat target |

Tiga tiket perbaikan cepat yang sudah konkret: kamera imigrasi, orientasi belakang papan Jeddah, dan petunjuk kendaraan. Dampaknya terlihat segera, namun belum merupakan penyelesaian peningkatan realisme keseluruhan.

## Rujukan teknis

Peta kode untuk implementasi:

| Bagian | Titik mulai |
|---|---|
| Lighting, bayangan, cache world, kualitas | `src/components/umroh/scene.ts:153`, `:207`, `:228`, `:281` |
| Material dan preservasi UV | `src/components/umroh/realistic/resources.ts:6`, `:112` |
| Karakter petugas dan penumpang | `src/components/umroh/realistic/pilgrims.ts:84`, `:112` |
| Loader dan instancing GLB | `src/components/umroh/realistic/character-assets.ts:177`, `character-batch.ts:21` |
| Ka’bah dan pelataran | `src/components/umroh/realistic/kaaba.ts:67`, `haram.ts:169` |
| Koridor sa’i | `src/components/umroh/realistic/haram.ts:217` |
| Nabawi dan Bir Ali | `src/components/umroh/realistic/madinah.ts:322`, `:454` |
| Terminal dan boarding | `src/components/umroh/realistic/airport.ts:758`, `:825` |
| Pesawat | `src/components/umroh/realistic/aircraft.ts:20` |
| Mobil, kereta, stasiun, rumah | `src/components/umroh/realistic/itinerary.ts:333`, `:510`, `:571`, `:624` |
| Dialog, mode belajar, progres | `src/components/umroh/umroh-virtual.tsx`, `tiket.tsx` |

Material PBR, peta permukaan dan lightmap didukung oleh [MeshStandardMaterial](https://threejs.org/docs/pages/MeshStandardMaterial.html). Pemilihan detail berdasarkan jarak didokumentasikan pada [LOD](https://threejs.org/docs/pages/LOD.html); kompresi tekstur GPU melalui Basis Universal dijelaskan pada [KTX2Loader](https://threejs.org/docs/pages/KTX2Loader.html). Sumber ini mendukung kemampuan teknis, bukan menjamin hasil visual tertentu.

## Batas audit

Rute development tidak memverifikasi login, hak akses produksi, backend, build produksi, iOS/Android native, atau perangkat fisik kelas rendah. Validitas editorial manasik dan kesesuaian detail arsitektur terhadap lokasi nyata belum disahkan ulang melalui audit ini. Pemeriksaan berfokus pada tampilan, perjalanan pengguna, dan kesiapan kode untuk upgrade. Sejumlah perjalanan transportasi menggunakan kontrol resmi “Singkatkan perjalanan”; tidak ada manipulasi localStorage atau hitungan ritual untuk melewati penguncian.
