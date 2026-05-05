# Deploy Vercel + Supabase

Panduan ini untuk deploy website Kakaskasen Dua ke Vercel dengan Supabase
sebagai database konten dan storage foto.

## 1. Buat Project Supabase

1. Buka Supabase Dashboard dan buat project baru.
2. Masuk ke **SQL Editor**.
3. Jalankan isi file `supabase-schema.sql`.
4. Masuk ke **Authentication > Users**.
5. Buat user admin, misalnya `admin@kakaskasen.id`, lalu set password.
6. Masuk ke **Storage** dan pastikan bucket `kakaskasen-media` sudah ada dan public.

## 2. Ambil Environment Variables

Di Supabase Dashboard, buka **Project Settings > API**:

- Project URL
- anon public key

Buat file `.env.local` untuk development:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_SUPABASE_MEDIA_BUCKET=kakaskasen-media
```

Jalankan lokal:

```bash
npm run dev
```

Admin panel:

```text
http://localhost:5173/#admin
```

Login memakai email dan password admin Supabase Auth.

## 3. Deploy ke Vercel

1. Push project ke GitHub.
2. Buka Vercel dan pilih **Add New Project**.
3. Import repository.
4. Framework preset: **Vite**.
5. Build command: `npm run build`.
6. Output directory: `dist`.
7. Tambahkan environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_SUPABASE_MEDIA_BUCKET`
8. Klik **Deploy**.

## 4. Alur Admin

Admin membuka:

```text
https://domain-vercel-kamu.vercel.app/#admin
```

Admin bisa CRUD:

- Story Map
- Wisata & Aktivitas
- Marketplace
- Galeri Kakaskasen

User biasa hanya membuka halaman utama dan tidak mendapat tombol CRUD.

## 5. Catatan Keamanan

Konfigurasi saat ini memakai Supabase Auth dan Row Level Security:

- Semua pengunjung boleh membaca konten.
- Hanya user yang login Supabase Auth yang boleh menambah, mengubah, dan menghapus konten.

Untuk produksi yang lebih ketat, matikan public signup di Supabase dan hanya buat
akun admin secara manual dari dashboard.
