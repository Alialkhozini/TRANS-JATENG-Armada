# RINGKASAN WEBSITE

Website ini menjawab masalah di lapangan: **foto hasil perbaikan/penanganan armada belum tersimpan rapi di database**, biasanya cuma nyebar di WhatsApp grup dan susah ditelusuri lagi.

## Fitur Utama

| Fitur | Untuk Siapa | Keterangan |
|---|---|---|
| Form lapor kerusakan + foto | Sopir | Termasuk tanggal kerusakan (hari, tanggal, bulan, tahun otomatis) |
| Cek & Setujui/Tolak laporan | Operasional | Verifikasi laporan sebelum diteruskan ke mekanik |
| Upload foto Pasca Penanganan | Mekanik | Dokumentasi tindakan awal yang dilakukan |
| Upload foto Hasil Perbaikan | Mekanik | Dokumentasi hasil akhir, menandai laporan selesai |
| Grafik & Rekap | Operasional/Pimpinan | Grafik jumlah laporan per bulan + ringkasan status |
| Export PDF Bulanan | Operasional/Pimpinan | Laporan bulanan siap cetak/kirim ke atasan |
| Notifikasi Telegram | Operasional | Notifikasi otomatis saat ada laporan baru masuk |

## 2. ALUR KERJA SISTEM

```
┌─────────┐      ┌──────────────────┐      ┌───────────┐      ┌─────────┐
│  SOPIR  │ ───▶ │ Menunggu         │ ───▶ │ OPERASIONAL│ ───▶ │  Ditolak │ (selesai, dengan alasan)
│ Lapor + │      │ Verifikasi       │      │ cek laporan│      └─────────┘
│  foto   │      └──────────────────┘      └─────┬─────┘
└─────────┘                                       │ Setujui + tugaskan mekanik
                                                   ▼
                                          ┌───────────────┐
                                          │   Diproses    │
                                          └───────┬───────┘
                                                   │
                          ┌────────────────────────┴────────────────────────┐
                          ▼                                                 ▼
                 ┌─────────────────────┐                         ┌─────────────────────┐
                 │ MEKANIK             │                         │ MEKANIK              │
                 │ 1. Pasca Penanganan │  ───────────────────▶  │ 2. Hasil Perbaikan    │
                 │ (foto + keterangan) │                         │ (foto + keterangan)  │
                 │ status tetap        │                         │ status → Selesai     │
                 │ "Diproses"          │                         └─────────────────────┘
                 └─────────────────────┘
```

**Poin penting:**
- Status **"Menunggu Verifikasi"** hanya bisa diubah oleh Operasional (Setuju/Tolak)
- Setelah disetujui, laporan otomatis pindah status **"Diproses"** dan tercatat nama mekaniknya
- Mekanik bisa melihat & memilih mengerjakan tugas yang **namanya sendiri** dengan yang ditugaskan Operasional
- **Pasca Penanganan** boleh disimpan kapan saja tanpa mengubah status (dokumentasi tindakan sementara)
- **Hasil Perbaikan** adalah tahap akhir — begitu disimpan, status otomatis jadi **"Selesai"**

---

## 4. STRUKTUR DATA (DATABASE)


| Kolom | Nama Field | Diisi Oleh | Keterangan |
|---|---|---|---|
| A | ID | Sistem | ID unik otomatis, format `LP-<timestamp>` |
| B | TimestampLapor | Sistem | Waktu laporan dikirim (otomatis) |
| C | TanggalKerusakan | Sopir | Tanggal kejadian kerusakan (input manual, bisa beda dari waktu lapor) |
| D | HariKerusakan | Sistem | Otomatis dihitung dari TanggalKerusakan (Senin/Selasa/dst) |
| E | TahunKerusakan | Sistem | Otomatis dihitung dari TanggalKerusakan |
| F | NoArmada | Sopir | Nomor bus/armada |
| G | NamaSopir | Sopir | Nama pelapor |
| H | Deskripsi | Sopir | Deskripsi masalah/kerusakan |
| I | FotoSebelum | Sopir | Link foto kondisi awal (Google Drive) |
| J | Status | Sistem | Menunggu Verifikasi / Diproses / Selesai / Ditolak |
| K | CatatanOperasional | Operasional | Alasan penolakan (jika ditolak) |
| L | NamaMekanik | Operasional | Mekanik yang ditugaskan |
| M | FotoPascaPenanganan | Mekanik | Link foto tindakan awal |
| N | KeteranganPascaPenanganan | Mekanik | Deskripsi tindakan awal |
| O | FotoHasilPerbaikan | Mekanik | Link foto hasil akhir |
| P | KeteranganHasilPerbaikan | Mekanik | Deskripsi hasil akhir |
| Q | WaktuSelesai | Sistem | Otomatis terisi saat mekanik menandai selesai |

###Sopir
- Form: Nama, No Armada, **Tanggal Kerusakan** (date picker, default hari ini), Deskripsi, Foto (Kompresi foto otomatis** — supaya ukuran file lebih kecil)
- Fungsi JS: `submitLaporan()`
##Operasional
- Filter status (chip: Semua/Menunggu Verifikasi/Diproses/Selesai/Ditolak)
- Setiap laporan berstatus "Menunggu Verifikasi" menampilkan kolom nama mekanik + tombol **✓ Setujui** dan **✕ Tolak**
##Mekanik
- fitur pencarian nama mekanik untuk memudahkan jika terdapat banyak laporan
- Setiap tugas menampilkan 2 bagian form:
  1. **Pasca Penanganan** — textarea keterangan + input foto + tombol "Simpan Pasca Penanganan" (Kompresi foto otomatis** — supaya ukuran file lebih kecil)
  2. **Hasil Perbaikan** — textarea keterangan + input foto + tombol "Tandai Selesai" (Kompresi foto otomatis** — supaya ukuran file lebih kecil)
##Rekap
- Dropdown pilih tahun → menampilkan grafik batang jumlah laporan per bulan
- Kartu ringkasan jumlah status (Total, Selesai, Diproses, Menunggu, Ditolak)
- Dropdown pilih bulan + tahun → tombol "Buat & Download PDF" → hasil PDF muncul otomatis bisa dilihat dan diunduh