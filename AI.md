# AI.md — konten @tk.penginapan

Repo materi IG + TikTok untuk TK Penginapan (booking online untuk pemilik penginapan kecil). Pemilik: pijar123.

## Cara kerja
- Hemat token. Rencanakan dulu, baru eksekusi. Jangan coba-coba.
- Jangan menebak. Cek file di repo; kalau tidak ada, tanya singkat.
- Balas singkat, dalam bahasa Indonesia.
- Konten dibuat AI sendiri, gaya 2D. Pemilik hanya ACC.

## Baca dulu (sesuai tugas)
- `panduan-gaya.md`: fitur yang boleh disebut, overlay, warna, tokoh, format. **Wajib.**
- `rencana/2026-11.md`: jadwal dan status ACC.
- `template/`: basis produksi. Ubah salinannya, jangan aslinya.

## Aturan keras
- Overlay di setiap slide/video: `IG · TikTok @tk.penginapan` + `titikkumpul.id/layanan-penginapan` (alamat lengkap).
- Hanya sebut fitur yang ada di daftar panduan. Tanpa testimoni, klien, promo, atau angka palsu. Hitungan diberi label "Contoh hitungan".
- Tokoh (Rara, Bimo, Bos Jaka, Pak Acong, Bu Yanti) hanya dari kode di `template/`; untuk video pakai `template/video-kartun/tokoh.js`. Tokoh yang sudah tayang tidak boleh berubah ciri dan sifat. Tangan selalu di belakang HP.
- Semua tokoh di layar harus hidup (bungkus dengan `T.hidup`).
- Musik/SFX hanya buatan sendiri (`sound.py`).

## Cerita harus kena ke penonton (wajib untuk video cerita)
Penonton = pemilik penginapan kecil. Data 26 Okt-13 Nov: reel ditonton ±70% tapi interaksi nol, artinya cerita lewat tanpa terasa.
- Satu momen nyata yang pernah dialami pemilik, lengkap dengan waktu, tempat, dan bendanya. Bukan "Pemilik A vs B".
- Ada taruhan (uang, malu, tidur, tamu kecewa) dan satu emosi utama. Fitur muncul belakangan sebagai jalan keluar, cukup satu.
- Tiga babak, 15-25 detik: momen kena → makin parah → jalan keluar + punchline. Jangan 8-9 detik.
- Frame pertama tiap video harus beda (close-up wajah + teks hook), jangan adegan pembuka yang sama.
- Tutup dengan pertanyaan yang gampang dijawab di komentar.
- Lolos tes "ini gue banget" dulu sebelum render. Detail: skill `strategi-konten-kreatif-penginapan` bagian "Cerita yang kena".

## Produksi
- Video 1080×1920, 30 fps: `template/video-kartun/`. Periksa frame dulu: `render.py check`. Setelah benar: `render.py` → frame di `f/` → ffmpeg + `sound.py out.wav`.
- Video kartun versi baru: salin `template/video-kartun/scene-baru.html`. Cek: `render-baru.py <file> <detik> check`. Penuh: `render-baru.py <file> <detik> f`.
- Video komik bergerak: salin `template/video-komik/video-komik.html`. Cek: `render.py <file> 21 check`. Suara: `s_komik.py out.wav` (salin dan ubah waktunya per video).
- Draf yang belum ACC: `draf/YYYY-MM-DD/`.
- Carousel 1080×1350: `template/carousel-komik/`. Jalankan `shot.py` (hasil `komik_N.png` + `sheet.jpg`).
- Cek satu lembar contact sheet sebelum render penuh. Kirim draf ke pemilik.

## Simpan & jadwal
- Folder `2026-MM-mingguN/`. Nama file `v1_2nov.mp4`, `3nov_1.jpg`. `caption.md` berisi caption + jadwal.
- Commit lalu push ke `main`.
- Jadwalkan di Postingkuy: `list_brands` → `upload_media` → `schedule_post`. Waktu WIB, default 19:00, IG + TikTok.
- Perbarui status di `rencana/` setelah terjadwal.
