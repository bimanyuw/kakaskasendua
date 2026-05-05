# Panduan Update Konten Website Kakaskasen Dua

Panduan ini dibuat agar website tetap bisa dilanjutkan oleh perangkat desa,
karang taruna, pelaku UMKM, atau tim konten lokal setelah program selesai.

## Konten yang Paling Sering Diubah

1. Data wisata dan aktivitas
   - File: `src/data/wisata.js`
   - Ubah judul, deskripsi, kategori, durasi, dan link foto.

2. Titik Journey Map
   - File: `src/data/journeyPoints.js`
   - Ubah nama lokasi, kategori, koordinat, cerita singkat, dan foto dummy/lokasi.

3. UMKM dan produk lokal
   - File: `src/data/umkm.js`
   - Ubah nama produk, harga, deskripsi, foto, dan nomor WhatsApp.

4. Galeri kegiatan desa
   - File: `src/data/gallery.js`
   - Tambahkan dokumentasi kegiatan, destinasi, UMKM, atau event desa.

## Alur Kerja Admin Desa

1. Kumpulkan informasi terbaru dari pengelola wisata, UMKM, dan perangkat desa.
2. Pilih foto terbaik dengan orientasi landscape agar cocok untuk kartu website.
3. Update file data sesuai bagian konten.
4. Jalankan `npm run dev` untuk cek tampilan lokal.
5. Jalankan `npm run build` sebelum publikasi.
6. Jadwalkan kurasi konten minimal satu kali setiap bulan.

## Standar Konten

- Gunakan deskripsi singkat, jelas, dan ramah wisatawan.
- Hindari informasi harga atau kontak yang belum dikonfirmasi.
- Gunakan foto milik warga/desa agar identitas lokal lebih kuat.
- Untuk titik peta, koordinat ditulis dalam format `[longitude, latitude]`.
- Jika belum ada foto asli, gunakan foto dummy dulu dan beri catatan untuk diganti.

## Struktur Tim Sederhana

- Koordinator konten: perangkat desa atau karang taruna.
- Pengumpul data: perwakilan UMKM, pengelola wisata, dan warga.
- Pemeriksa akhir: satu orang yang mengecek ejaan, kontak, dan foto sebelum naik.

Dengan alur ini, website tidak berhenti sebagai output lomba, tetapi bisa menjadi
media promosi desa yang terus diperbarui.
