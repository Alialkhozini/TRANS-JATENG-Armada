import { createClient } from '@supabase/supabase-js'

export interface Laporan {
  id: string
  timestamp_lapor: string
  tanggal_kerusakan: string
  hari_kerusakan: string
  tahun_kerusakan: number
  no_armada: string
  nama_sopir: string
  deskripsi: string
  foto_sebelum: string
  status: 'Menunggu Verifikasi' | 'Diproses' | 'Selesai' | 'Ditolak'
  catatan_operasional?: string
  nama_mekanik?: string
  foto_pasca_penanganan?: string
  keterangan_pasca_penanganan?: string
  foto_hasil_perbaikan?: string
  keterangan_hasil_perbaikan?: string
  waktu_selesai?: string
}

export const useReports = () => {
  const config = useRuntimeConfig()
  const url = config.public.supabaseUrl
  const key = config.public.supabaseKey

  // Cek apakah kredensial Supabase valid
  const hasValidConfig = url && key && !url.includes('your-supabase') && !key.includes('your-supabase')

  let supabase: any = null
  if (hasValidConfig) {
    supabase = createClient(url, key)
  }

  const isMock = ref(!hasValidConfig)

  // Fungsi pembantu untuk format Hari
  const getHariIndo = (dateStr: string) => {
    const date = new Date(dateStr)
    const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    return hari[date.getDay()]
  }

  // --- IMPLEMENTASI MOCK (LOCALSTORAGE) ---
  const getMockReports = (): Laporan[] => {
    if (typeof window === 'undefined') return []
    const saved = localStorage.getItem('transjateng_reports')
    if (saved) {
      return JSON.parse(saved)
    }
    // Data dummy awal agar tampilan tidak kosong saat pertama kali dicoba
    const dummy: Laporan[] = [
      {
        id: 'LP-1712123456000',
        timestamp_lapor: new Date(Date.now() - 3600000 * 24 * 3).toISOString(), // 3 hari lalu
        tanggal_kerusakan: new Date(Date.now() - 3600000 * 24 * 3).toISOString().split('T')[0],
        hari_kerusakan: getHariIndo(new Date(Date.now() - 3600000 * 24 * 3).toISOString().split('T')[0]),
        tahun_kerusakan: new Date().getFullYear(),
        no_armada: 'TJ-042',
        nama_sopir: 'Budiono Siregar',
        deskripsi: 'AC bagian belakang kurang dingin, penumpang mengeluh kepanasan selama perjalanan.',
        foto_sebelum: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=400',
        status: 'Menunggu Verifikasi'
      },
      {
        id: 'LP-1712123488000',
        timestamp_lapor: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
        tanggal_kerusakan: new Date(Date.now() - 3600000 * 24 * 5).toISOString().split('T')[0],
        hari_kerusakan: getHariIndo(new Date(Date.now() - 3600000 * 24 * 5).toISOString().split('T')[0]),
        tahun_kerusakan: new Date().getFullYear(),
        no_armada: 'TJ-015',
        nama_sopir: 'Agus Setiawan',
        deskripsi: 'Lampu utama sebelah kiri mati total, berbahaya jika jalan malam hari.',
        foto_sebelum: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400',
        status: 'Diproses',
        nama_mekanik: 'Hendro'
      },
      {
        id: 'LP-1712123511000',
        timestamp_lapor: new Date(Date.now() - 3600000 * 24 * 8).toISOString(),
        tanggal_kerusakan: new Date(Date.now() - 3600000 * 24 * 8).toISOString().split('T')[0],
        hari_kerusakan: getHariIndo(new Date(Date.now() - 3600000 * 24 * 8).toISOString().split('T')[0]),
        tahun_kerusakan: new Date().getFullYear(),
        no_armada: 'TJ-088',
        nama_sopir: 'Joko Widodo',
        deskripsi: 'Rem berbunyi derit keras saat pedal rem diinjak.',
        foto_sebelum: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=400',
        status: 'Selesai',
        nama_mekanik: 'Hendro',
        foto_pasca_penanganan: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=400',
        keterangan_pasca_penanganan: 'Pengecekan awal kampas rem, sudah sangat tipis.',
        foto_hasil_perbaikan: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=400',
        keterangan_hasil_perbaikan: 'Mengganti kampas rem depan kiri & kanan dengan part baru. Rem sudah senyap dan pakem.',
        waktu_selesai: new Date(Date.now() - 3600000 * 24 * 7).toISOString()
      }
    ]
    localStorage.setItem('transjateng_reports', JSON.stringify(dummy))
    return dummy
  }

  const saveMockReports = (reports: Laporan[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('transjateng_reports', JSON.stringify(reports))
    }
  }

  // --- API DATABASE INTERFACE ---

  // Ambil Semua Laporan
  const fetchReports = async (): Promise<Laporan[]> => {
    if (isMock.value) {
      return getMockReports()
    }
    
    try {
      const { data, error } = await supabase
        .from('laporan')
        .select('*')
        .order('timestamp_lapor', { ascending: false })
      
      if (error) throw error
      return data || []
    } catch (err) {
      console.error('Error fetching from Supabase, falling back to mock:', err)
      isMock.value = true
      return getMockReports()
    }
  }

  // Buat Laporan Baru
  const createReport = async (report: Omit<Laporan, 'id' | 'timestamp_lapor' | 'status' | 'hari_kerusakan' | 'tahun_kerusakan'> & { id?: string }) => {
    const id = report.id || `LP-${Date.now()}`
    const timestamp_lapor = new Date().toISOString()
    const hari_kerusakan = getHariIndo(report.tanggal_kerusakan)
    const tahun_kerusakan = new Date(report.tanggal_kerusakan).getFullYear()
    
    const newReport: Laporan = {
      ...report,
      id,
      timestamp_lapor,
      status: 'Menunggu Verifikasi',
      hari_kerusakan,
      tahun_kerusakan
    }

    if (isMock.value) {
      const list = getMockReports()
      list.unshift(newReport)
      saveMockReports(list)
      // Kirim Telegram Notif (jika terkonfigurasi di server, biarpun mock tetap bisa)
      triggerTelegramNotification(newReport).catch(console.error)
      return newReport
    }

    try {
      const { data, error } = await supabase
        .from('laporan')
        .insert([newReport])
        .select()
      
      if (error) throw error
      
      // Kirim Notifikasi Telegram
      triggerTelegramNotification(newReport).catch(console.error)
      
      return data?.[0] || newReport
    } catch (err) {
      console.error('Failed to create report in Supabase:', err)
      throw err
    }
  }

  // Update Laporan (Verifikasi, Pasca, Selesai, Tolak)
  const updateReport = async (id: string, updates: Partial<Laporan>) => {
    if (isMock.value) {
      const list = getMockReports()
      const index = list.findIndex(r => r.id === id)
      if (index !== -1) {
        list[index] = { ...list[index], ...updates } as Laporan
        saveMockReports(list)
      }
      return list[index]
    }

    try {
      const { data, error } = await supabase
        .from('laporan')
        .update(updates)
        .eq('id', id)
        .select()
      
      if (error) throw error
      return data?.[0] || null
    } catch (err) {
      console.error(`Failed to update report ${id}:`, err)
      throw err
    }
  }

  // Upload Foto ke Supabase Storage (atau return Base64 jika Mock)
  const uploadPhoto = async (file: File): Promise<string> => {
    if (isMock.value) {
      // Mock: ubah file menjadi dataUrl base64 untuk penyimpanan lokal
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
    }

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`
      const filePath = `reports/${fileName}`

      const { data, error } = await supabase.storage
        .from('armada-photos')
        .upload(filePath, file)

      if (error) throw error

      // Dapatkan URL Publik
      const { data: { publicUrl } } = supabase.storage
        .from('armada-photos')
        .getPublicUrl(filePath)

      return publicUrl
    } catch (err) {
      console.error('Failed to upload file to Supabase Storage:', err)
      throw err
    }
  }

  // Memicu Notifikasi Telegram melalui Server Route
  const triggerTelegramNotification = async (report: Laporan) => {
    try {
      await $fetch('/api/notify-telegram', {
        method: 'POST',
        body: report
      })
    } catch (err) {
      // Abaikan error di sisi UI agar user tidak melihat error notifikasi
      console.warn('Telegram notification failed:', err)
    }
  }

  return {
    isMock,
    fetchReports,
    createReport,
    updateReport,
    uploadPhoto,
    getHariIndo
  }
}
