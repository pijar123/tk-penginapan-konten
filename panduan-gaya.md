# Panduan Gaya Konten @tk.penginapan

Acuan untuk semua konten mingguan. Contoh terbaik: folder `2026-10-minggu1/`.

## Apa yang dijual
TK Penginapan = sistem booking online untuk **pemilik** homestay, villa, guesthouse, kos harian.
Target penonton: pemilik/pengelola penginapan kecil, bukan tamu.

Fitur yang BOLEH disebut (sudah dikonfirmasi):
- Tamu cek kamar kosong sendiri (kalender + daftar kamar tersedia)
- Kamar yang sudah penuh tampil "Penuh", jadi tamu tahu tanpa bertanya
- Tamu pesan langsung tanpa menunggu balasan chat
- Nota + QRIS otomatis
- Biaya tetap mulai Rp149rb/bulan, bukan potong komisi per pesanan
- Demo gratis di titikkumpul.id/layanan-penginapan

Fitur lain JANGAN disebut sebelum pemilik mengonfirmasi. Jangan membuat testimoni, nama klien, atau angka hasil palsu. Hitungan contoh harus diberi label "Contoh hitungan".

## Overlay wajib (setiap poster, slide, dan video)
- Handle: `IG · TikTok @tk.penginapan` (dengan label IG/TikTok)
- Alamat lengkap: `titikkumpul.id/layanan-penginapan` (jangan hanya domain)
- Video: overlay berupa kapsul gelap di atas tengah, tetap terlihat sepanjang video

## Warna
| Peran | Hex |
|---|---|
| Krem (latar terang) | #FCF5EB |
| Navy (latar gelap / hook) | #16202A |
| Teal gelap (latar CTA) | #13343B |
| Teks gelap | #173336 |
| Oranye (angka, tombol CTA) | #FD5B35 |
| Teal (ikon) | #15787D |
| Kuning (sorotan teks, tombol "Geser") | #FFD45C |
| Hijau (centang) | #2DBE78 |

## Huruf
Poppins (Bold untuk judul, Regular/Light untuk isi). Bahasa santai, sapaan "kamu", kalimat pendek.

## Series: "Cerita Resepsionis Rara" (tokoh tetap, jangan diubah desainnya)
- **Rara**: resepsionis ceria. Rambut wolf cut ungu lilac (#B58BF5) dengan poni curtain, anting bulat kuning, seragam teal.
- **Bimo**: tamu langganan yang heboh. Rambut keriting bleach oranye (#F4A259), kacamata bulat, kaos biru elektrik (#3B4CCA), anting kecil perak.
- **Bos Jaka**: pemilik homestay. Rambut jambul gelap dengan garis uban, kumis, kemeja oranye motif daun kuning. Dulu pusing dengan chat menumpuk, sekarang santai.
- **Pak Acong** (sudah tayang di video "Acong vs Bos Jaka"): pemilik penginapan yang masih serba kertas. Mudah panik, terburu-buru, gampang jengkel. Rambut hitam pendek rata, kacamata bulat tebal, kulit sawo matang, jubah panjang abu-kecokelatan berbintik putih sampai lantai (kaki tidak terlihat), memegang nota kertas. Wajah bawaan: mata garis, mulut bergelombang. Saat jengkel: awan mendung + petir di atas kepala. Lawan kontras Bos Jaka.
- **Bu Yanti** (nama sementara, menunggu ACC): tamu yang kurang akrab dengan HP. Cepol beruban, kacamata baca melorot dengan rantai, blus magenta motif bunga. Gaptek ditunjukkan lewat cara memegang HP (dijauhkan, mengetik satu jari), dan selalu berakhir berhasil pesan sendiri.

Tokoh yang sudah tayang tidak boleh berubah ciri dan sifatnya. Sebelum menggambar tokoh, cek dulu di sini atau di posting @tk.penginapan; kalau belum ada, tanya pemilik.

Kode tokoh:
- Versi lama: `template/` (fungsi rara(), bimo(), jaka() di carousel dan scene.html).
- **Versi baru (dipakai mulai 13 Nov 2026):** `template/video-kartun/tokoh.js`, fungsi `T.rara`, `T.bimo`, `T.jaka`, `T.acong`, `T.yanti`. Wajah terpisah (alis, mata, mulut) supaya bisa kedip, melirik, dan bicara; bayangan; tangan berjempol; kaki dan sepatu. Lihat semua tokoh dan ekspresinya di `template/video-kartun/lembar-tokoh.html`.

**Semua tokoh di layar harus hidup.** Bungkus opsi tokoh dengan `T.hidup(t, seed, opsi)` supaya otomatis bernapas, berkedip, dan rambutnya menyusul. Tidak ada tokoh yang diam total, termasuk tokoh latar dan tokoh di layar CTA. Kaki tampil kalau seluruh badan terlihat; sembunyikan (`legs:false`) saat tokoh di balik meja atau di kasur.

## Format
- **Video cerita (Senin & Jumat)**: kartun 2D flat ala `sampel/video-kartun-libur-ramai.mp4`, tokoh series bergerak (jalan, kedip, rambut bergoyang, ganti ekspresi, gerak tangan) + mockup HP untuk menunjukkan fitur. 1080×1920, 15–30 detik, hook teks besar di detik pertama, penutup CTA demo + alamat web. Basis: `template/video-kartun/`.
  - Versi baru: `template/video-kartun/scene-baru.html` (+ `hidup.js`, `tokoh.js`, `latar.js`). Buka dengan close-up wajah + teks hook, latar resepsionis berlapis yang ikut bergerak, kamera mundur dan zoom ke momen puncak. Contoh: `draf/2026-11-13/contoh-template-baru.mp4`.
- **Video komik bergerak**: halaman komik yang hidup. Tiap panel satu tempat dan satu tokoh (contoh: Bimo di kereta, Bu Yanti di rumah, Rara di kantor, Bos Jaka di teras), panel bergantian masuk dengan motion blur, lalu tersusun jadi satu halaman 2x2 sebelum CTA. Saat tokoh bicara, latar panel diburamkan dan kamera mendekat. Satu balon, satu aksi, dan satu tulisan efek ("TAP!", "TING!", "BZZT!") per panel. 18–22 detik. Basis: `template/video-komik/`. Contoh: `draf/2026-11-13/komik-4-tempat.mp4`.
- **Video demo (Rabu)**: mockup HP/kartu/teks seperti `2026-10-minggu1/`, boleh ada tokoh kecil.
- **Sound design wajib di semua video**: musik latar ceria buatan sendiri + efek suara yang pas dengan gerakan (langkah, bel, whoosh, pop teks, stempel, ting, ta-da). Buat dengan `template/video-kartun/sound.py` (disintesis sendiri, aman hak cipta). Jangan pakai lagu/sound milik orang lain. Loudness akhir sekitar -14 LUFS.
- **Carousel**: gaya komik ala `sampel/komik-sampel-*.jpg`. 1080×1350, 5–7 slide. Slide 1 sampul komik (latar navy, judul besar miring, ledakan warna, efek "BZZT!"), slide isi = 2 panel (atas: masalah dari sisi tamu, bawah: solusinya) dengan balon kata, kotak narasi kuning, garis tebal navy, latar titik halftone; slide terakhir CTA (latar teal gelap, tokoh, tombol oranye "Coba demo gratis"). Basis: `template/carousel-komik/`.
- Ilustrasi HP/aplikasi memakai contoh "Homestay Anda" dengan kamar Standar/Deluxe/Keluarga.
- Saat tokoh memegang HP (atau benda lain), tangan selalu di BELAKANG HP, tidak boleh menutupi layar.

## Penamaan file
Folder per minggu: `2026-11-minggu2/`. Nama: `v1_2nov.mp4`, `3nov_1.jpg` dst., plus `caption.md` berisi caption IG/TikTok dan jadwal tiap konten.
