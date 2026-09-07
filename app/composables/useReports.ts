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

export interface User {
  id: string
  username: string
  pin: string
  role: 'Admin' | 'Operasional' | 'Mekanik' | 'Korlay'
  created_at: string
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
  const getHariIndo = (dateStr: string): string => {
    const date = new Date(dateStr)
    const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    return hari[date.getDay()] || 'Senin'
  }

  // --- IMPLEMENTASI MOCK USER ---
  const getMockUsers = (): User[] => {
    if (typeof window === 'undefined') return []

    // Ensure Korlay user is seeded into localStorage
    const saved = localStorage.getItem('transjateng_users')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (!parsed.some((u: User) => u.username.toLowerCase() === 'korlay')) {
          parsed.push({ id: 'USR-6', username: 'korlay', pin: 'password123', role: 'Korlay', created_at: new Date().toISOString() })
          localStorage.setItem('transjateng_users', JSON.stringify(parsed))
        }
        return parsed
      } catch (e) {
        console.error('Error parsing saved users:', e)
      }
    }
    const defaultUsers: User[] = [
      { id: 'USR-1', username: 'admin', pin: '9999', role: 'Admin', created_at: new Date().toISOString() },
      { id: 'USR-2', username: 'wardana', pin: '1234', role: 'Operasional', created_at: new Date().toISOString() },
      { id: 'USR-3', username: 'aris', pin: '2222', role: 'Mekanik', created_at: new Date().toISOString() },
      { id: 'USR-4', username: 'daryanto', pin: '2222', role: 'Mekanik', created_at: new Date().toISOString() },
      { id: 'USR-5', username: 'indra', pin: '1234', role: 'Operasional', created_at: new Date().toISOString() },
      { id: 'USR-6', username: 'korlay', pin: 'password123', role: 'Korlay', created_at: new Date().toISOString() },
    ]
    localStorage.setItem('transjateng_users', JSON.stringify(defaultUsers))
    return defaultUsers
  }

  const saveMockUsers = (users: User[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('transjateng_users', JSON.stringify(users))
    }
  }

  const fetchUsers = async (): Promise<User[]> => {
    if (isMock.value) {
      return getMockUsers()
    }
    try {
      const { data, error } = await supabase
        .from('pengguna')
        .select('*')
        .order('username', { ascending: true })
      if (error) throw error
      return data || []
    } catch (err) {
      console.warn('Error fetching users from Supabase, falling back to mock:', err)
      return getMockUsers()
    }
  }

  const createUser = async (user: Omit<User, 'id' | 'created_at'>) => {
    const newUser: User = {
      ...user,
      id: `USR-${Date.now()}`,
      created_at: new Date().toISOString()
    }
    if (isMock.value) {
      const list = getMockUsers()
      if (list.some(u => u.username.toLowerCase() === user.username.toLowerCase())) {
        throw new Error('Username sudah digunakan.')
      }
      list.push(newUser)
      saveMockUsers(list)
      return newUser
    }
    try {
      const { data, error } = await supabase
        .from('pengguna')
        .insert([newUser])
        .select()
      if (error) throw error
      return data?.[0] || newUser
    } catch (err) {
      console.error('Failed to create user in Supabase:', err)
      throw err
    }
  }

  const updateUser = async (id: string, updates: Partial<User>) => {
    if (isMock.value) {
      const list = getMockUsers()
      const index = list.findIndex(u => u.id === id)
      if (index !== -1) {
        if (updates.username) {
          const newUsername = updates.username.toLowerCase()
          if (list.some(u => u.id !== id && u.username.toLowerCase() === newUsername)) {
            throw new Error('Username sudah digunakan.')
          }
        }
        list[index] = { ...list[index], ...updates } as User
        saveMockUsers(list)
      }
      return list[index]
    }
    try {
      const { data, error } = await supabase
        .from('pengguna')
        .update(updates)
        .eq('id', id)
        .select()
      if (error) throw error
      return data?.[0] || null
    } catch (err) {
      console.error(`Failed to update user ${id}:`, err)
      throw err
    }
  }

  const deleteUser = async (id: string) => {
    if (isMock.value) {
      const list = getMockUsers()
      const filtered = list.filter(u => u.id !== id)
      saveMockUsers(filtered)
      return true
    }
    try {
      const { error } = await supabase
        .from('pengguna')
        .delete()
        .eq('id', id)
      if (error) throw error
      return true
    } catch (err) {
      console.error(`Failed to delete user ${id}:`, err)
      throw err
    }
  }

  const authenticateUser = async (username: string, pin: string, role?: string): Promise<User | null> => {
    const cleanUsername = username.trim().toLowerCase()
    const cleanPin = pin.trim()

    if (isMock.value) {
      const list = getMockUsers()
      const found = list.find(u =>
        u.username.toLowerCase() === cleanUsername &&
        u.pin === cleanPin &&
        (!role || u.role === role)
      )
      return found || null
    }

    try {
      let query = supabase
        .from('pengguna')
        .select('*')
        .eq('username', username)
        .eq('pin', pin)
      if (role) {
        query = query.eq('role', role)
      }
      const { data, error } = await query
      if (error) throw error
      if (data && data.length > 0) {
        return data[0]
      }
      return null
    } catch (err) {
      console.warn('Error authenticating from Supabase, falling back to mock:', err)
      const list = getMockUsers()
      const found = list.find(u =>
        u.username.toLowerCase() === cleanUsername &&
        u.pin === cleanPin &&
        (!role || u.role === role)
      )
      return found || null
    }
  }

  // --- IMPLEMENTASI MOCK (LOCALSTORAGE) ---
  const getMockReports = (): Laporan[] => {
    if (typeof window === 'undefined') return []
    
    // One-time migration to drop old mock dummy reports and start fresh
    if (!localStorage.getItem('transjateng_reports_fresh_v2')) {
      localStorage.removeItem('transjateng_reports')
      localStorage.setItem('transjateng_reports_fresh_v2', 'true')
    }

    const saved = localStorage.getItem('transjateng_reports')
    if (saved) {
      return JSON.parse(saved)
    }
    const defaultReports: Laporan[] = []
    localStorage.setItem('transjateng_reports', JSON.stringify(defaultReports))
    return defaultReports
  }

  const saveMockReports = (reports: Laporan[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('transjateng_reports', JSON.stringify(reports))
    }
  }

  // Fungsi Pembantu Hapus Foto dari Cloudinary
  const deleteCloudinaryImages = async (urls: (string | undefined | null)[]) => {
    const validUrls = urls.filter((u): u is string => typeof u === 'string' && u.length > 0 && u.includes('cloudinary.com'))
    if (validUrls.length === 0) return
    try {
      await $fetch('/api/delete-image', {
        method: 'POST',
        body: { urls: validUrls }
      })
    } catch (err) {
      console.warn('Failed to delete image from Cloudinary:', err)
    }
  }

  // Hapus Laporan Tunggal & Fotonya di Cloudinary
  const deleteReport = async (id: string, reportObj?: Laporan) => {
    let target = reportObj
    if (!target) {
      if (isMock.value) {
        target = getMockReports().find(r => r.id === id)
      } else {
        try {
          const { data } = await supabase.from('laporan').select('*').eq('id', id).single()
          target = data || undefined
        } catch (_) {}
      }
    }

    // Hapus foto terkait di Cloudinary secara otomatis
    if (target) {
      const photos = [
        target.foto_sebelum,
        target.foto_pasca_penanganan,
        target.foto_hasil_perbaikan
      ]
      await deleteCloudinaryImages(photos)
    }

    if (isMock.value) {
      const list = getMockReports()
      const filtered = list.filter(r => r.id !== id)
      saveMockReports(filtered)
      return true
    }

    try {
      const { error } = await supabase
        .from('laporan')
        .delete()
        .eq('id', id)

      if (error) throw error
      return true
    } catch (err) {
      console.error(`Failed to delete report ${id}:`, err)
      throw err
    }
  }

  // Kosongkan Seluruh Data Laporan & Semua Fotonya di Cloudinary
  const clearAllReports = async () => {
    try {
      const allReports = await fetchReports()
      const allPhotos: string[] = []
      allReports.forEach(r => {
        if (r.foto_sebelum) allPhotos.push(r.foto_sebelum)
        if (r.foto_pasca_penanganan) allPhotos.push(r.foto_pasca_penanganan)
        if (r.foto_hasil_perbaikan) allPhotos.push(r.foto_hasil_perbaikan)
      })
      if (allPhotos.length > 0) {
        await deleteCloudinaryImages(allPhotos)
      }
    } catch (e) {
      console.warn('Error collecting photos for deletion:', e)
    }

    if (isMock.value) {
      saveMockReports([])
      return true
    }

    try {
      const { error } = await supabase
        .from('laporan')
        .delete()
        .neq('id', '')

      if (error) throw error
      saveMockReports([])
      return true
    } catch (err) {
      console.error('Failed to clear all reports:', err)
      throw err
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
      triggerTelegramNotification(newReport).catch(console.error)
      return newReport
    }

    try {
      const { data, error } = await supabase
        .from('laporan')
        .insert([newReport])
        .select()

      if (error) throw error

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

  // Upload Foto ke Cloudinary (Prioritas) atau Supabase Storage (atau return Base64 jika Mock)
  const uploadPhoto = async (file: File): Promise<string> => {
    // 1. Coba upload via Cloudinary Server Route terlebih dahulu jika di-deploy / diaktifkan
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response: any = await $fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      if (response && response.url) {
        return response.url
      }
    } catch (cloudinaryErr) {
      console.warn('Cloudinary upload not active or failed, trying fallback storage:', cloudinaryErr)
    }

    // 2. Fallback ke Supabase Storage jika bukan mode Mock
    if (!isMock.value) {
      try {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`
        const filePath = `reports/${fileName}`

        const { data, error } = await supabase.storage
          .from('armada-photos')
          .upload(filePath, file)

        if (error) throw error

        const { data: { publicUrl } } = supabase.storage
          .from('armada-photos')
          .getPublicUrl(filePath)

        return publicUrl
      } catch (err) {
        console.error('Failed to upload file to Supabase Storage:', err)
        throw err
      }
    }

    // 3. Fallback terakhir ke Base64 (untuk mode Mock / Pengembangan Lokal)
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  // Memicu Notifikasi Telegram melalui Server Route
  const triggerTelegramNotification = async (report: Laporan) => {
    try {
      await $fetch('/api/notify-telegram', {
        method: 'POST',
        body: report
      })
    } catch (err) {
      console.warn('Telegram notification failed:', err)
    }
  }

  return {
    isMock,
    fetchReports,
    createReport,
    updateReport,
    uploadPhoto,
    getHariIndo,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    authenticateUser,
    deleteReport,
    clearAllReports,
    deleteCloudinaryImages
  }
}
