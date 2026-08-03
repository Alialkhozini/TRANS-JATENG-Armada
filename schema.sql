-- ==========================================
-- SKEMA DATABASE UNTUK TRANS JATENG ARMADA
-- Jalankan skrip ini di SQL Editor Supabase
-- ==========================================

-- 1. Membuat Tabel Laporan
CREATE TABLE IF NOT EXISTS public.laporan (
    id TEXT PRIMARY KEY, -- Format: LP-<timestamp>
    timestamp_lapor TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    tanggal_kerusakan DATE NOT NULL,
    hari_kerusakan TEXT NOT NULL,
    tahun_kerusakan INTEGER NOT NULL,
    no_armada TEXT NOT NULL,
    nama_sopir TEXT NOT NULL,
    deskripsi TEXT NOT NULL,
    foto_sebelum TEXT NOT NULL, -- URL dari Supabase Storage
    status TEXT NOT NULL DEFAULT 'Menunggu Verifikasi', -- Menunggu Verifikasi / Diproses / Selesai / Ditolak
    catatan_operasional TEXT,
    nama_mekanik TEXT,
    foto_pasca_penanganan TEXT,
    keterangan_pasca_penanganan TEXT,
    foto_hasil_perbaikan TEXT,
    keterangan_hasil_perbaikan TEXT,
    waktu_selesai TIMESTAMPTZ
);

-- Mengaktifkan RLS (Row Level Security) agar aman
ALTER TABLE public.laporan ENABLE ROW LEVEL SECURITY;

-- Kebijakan RLS untuk Laporan:
-- Siapapun (termasuk anonim) bisa membaca laporan (untuk tracker & dashboard)
CREATE POLICY "Allow public read access" ON public.laporan
    FOR SELECT USING (true);

-- Siapapun bisa membuat laporan baru (Sopir melapor tanpa login)
CREATE POLICY "Allow public insert access" ON public.laporan
    FOR INSERT WITH CHECK (true);

-- Siapapun bisa mengupdate laporan (Operasional mengubah status/mekanik, Mekanik mengunggah hasil perbaikan)
-- Catatan: Untuk produksi skala besar, bisa dibatasi berdasarkan API Key / Roles, namun untuk kemudahan 
-- implementasi di lapangan menggunakan PIN/Passcode kustom, kita perbolehkan update publik secara selektif.
CREATE POLICY "Allow public update access" ON public.laporan
    FOR UPDATE USING (true);


-- 2. Setup Supabase Storage untuk Foto
-- Jalankan skrip di bawah untuk membuat bucket 'armada-photos' jika belum dibuat secara manual di dashboard.
-- Supabase menyimpan bucket di tabel storage.buckets.

INSERT INTO storage.buckets (id, name, public) 
VALUES ('armada-photos', 'armada-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Kebijakan RLS untuk Storage Bucket 'armada-photos' agar bisa diakses oleh publik:

-- Mengizinkan siapa saja untuk melihat/mengunduh foto
CREATE POLICY "Allow public select on photos" ON storage.objects
    FOR SELECT TO public USING (bucket_id = 'armada-photos');

-- Mengizinkan siapa saja untuk mengunggah foto (untuk Sopir & Mekanik tanpa akun login formal)
CREATE POLICY "Allow public insert on photos" ON storage.objects
    FOR INSERT TO public WITH CHECK (bucket_id = 'armada-photos');

-- Mengizinkan siapa saja untuk mengupdate/menghapus foto (opsional)
CREATE POLICY "Allow public update/delete on photos" ON storage.objects
    FOR ALL TO public USING (bucket_id = 'armada-photos');
