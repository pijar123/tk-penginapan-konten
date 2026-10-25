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
Kode tokoh ada di `template/` (fungsi rara(), bimo(), jaka() dan versi video di scene.html). Selalu pakai kode ini supaya tokoh konsisten tiap episode.

## Format
- **Video cerita (Senin & Jumat)**: kartun 2D flat ala `sampel/video-kartun-libur-ramai.mp4`, tokoh series bergerak (jalan, kedip, rambut bergoyang, ganti ekspresi, gerak tangan) + mockup HP untuk menunjukkan fitur. 1080×1920, 15–30 detik, hook teks besar di detik pertama, penutup CTA demo + alamat web. Basis: `template/video-kartun/`.
- **Video demo (Rabu)**: mockup HP/kartu/teks seperti `2026-10-minggu1/`, boleh ada tokoh kecil.
- **Sound design wajib di semua video**: musik latar ceria buatan sendiri + efek suara yang pas dengan gerakan (langkah, bel, whoosh, pop teks, stempel, ting, ta-da). Buat dengan `template/video-kartun/sound.py` (disintesis sendiri, aman hak cipta). Jangan pakai lagu/sound milik orang lain. Loudness akhir sekitar -14 LUFS.
- **Carousel**: gaya komik ala `sampel/komik-sampel-*.jpg`. 1080×1350, 5–7 slide. Slide 1 sampul komik (latar navy, judul besar miring, ledakan warna, efek "BZZT!"), slide isi = 2 panel (atas: masalah dari sisi tamu, bawah: solusinya) dengan balon kata, kotak narasi kuning, garis tebal navy, latar titik halftone; slide terakhir CTA (latar teal gelap, tokoh, tombol oranye "Coba demo gratis"). Basis: `template/carousel-komik/`.
- Ilustrasi HP/aplikasi memakai contoh "Homestay Anda" dengan kamar Standar/Deluxe/Keluarga.

## Penamaan file
Folder per minggu: `2026-11-minggu2/`. Nama: `v1_2nov.mp4`, `3nov_1.jpg` dst., plus `caption.md` berisi caption IG/TikTok dan jadwal tiap konten.
