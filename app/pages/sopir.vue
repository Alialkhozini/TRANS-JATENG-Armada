<template>
  <div class="container fade-in-up">
    <!-- PIN Auth Screen -->
    <div v-if="!isAuthenticated" class="card max-w-sm mx-auto my-12 text-center">
      <div class="lock-icon">🔒</div>
      <h2 class="auth-title">Akses Portal Sopir</h2>
      <p class="auth-desc">Masukkan PIN Sopir untuk mengakses form laporan kerusakan.</p>
      
      <form @submit.prevent="verifyPIN" class="auth-form">
        <div class="form-group">
          <input 
            v-model="pinInput" 
            type="password" 
            class="form-control text-center" 
            placeholder="Ketik PIN (Default: 1111)" 
            maxlength="4" 
            required 
            ref="pinInputRef"
          />
        </div>
        <p v-if="authError" class="error-text text-sm mb-4">❌ PIN salah. Silakan coba lagi.</p>
        <button type="submit" class="btn btn-primary w-full">Masuk Portal</button>
      </form>
      <NuxtLink to="/" class="btn btn-secondary btn-sm w-full mt-4">&larr; Kembali ke Beranda</NuxtLink>
    </div>

    <!-- Main Form Screen -->
    <div v-else>
      <!-- Header -->
      <div class="page-header">
        <div>
          <NuxtLink to="/" class="btn btn-secondary btn-sm mb-2">&larr; Kembali ke Portal</NuxtLink>
          <h1 class="page-title">Lapor Kerusakan Armada</h1>
          <p class="page-subtitle">Silakan isi formulir di bawah ini untuk melaporkan kerusakan armada bus.</p>
        </div>
        <div class="header-actions">
          <button @click="logout" class="btn btn-secondary btn-sm">Keluar 🔓</button>
        </div>
      </div>

      <!-- Form Card -->
      <div class="card max-w-xl mx-auto">
        <form @submit.prevent="handleSubmit">
          <!-- Nama Sopir -->
          <div class="form-group">
            <label class="form-label" for="namaSopir">Nama Pengemudi / Sopir</label>
            <input 
              v-model="form.nama_sopir" 
              type="text" 
              id="namaSopir" 
              class="form-control" 
              placeholder="Masukkan nama lengkap Anda" 
              required 
            />
          </div>

          <!-- No Armada & Tanggal Kerusakan -->
          <div class="form-row">
            <div class="form-group flex-1">
              <label class="form-label" for="noArmada">Nomor Bus / Armada</label>
              <input 
                v-model="form.no_armada" 
                type="text" 
                id="noArmada" 
                class="form-control" 
                placeholder="Contoh: TJ-045" 
                required 
              />
            </div>

            <div class="form-group flex-1">
              <label class="form-label" for="tanggalKerusakan">Tanggal Kerusakan</label>
              <input 
                v-model="form.tanggal_kerusakan" 
                type="date" 
                id="tanggalKerusakan" 
                class="form-control" 
                required 
              />
            </div>
          </div>

          <!-- Deskripsi Masalah -->
          <div class="form-group">
            <label class="form-label" for="deskripsi">Deskripsi Kerusakan</label>
            <textarea 
              v-model="form.deskripsi" 
              id="deskripsi" 
              rows="4" 
              class="form-control" 
              placeholder="Jelaskan secara detail kerusakan yang terjadi (misal: AC tidak dingin, rem bunyi berdecit, ban kiri belakang bocor halus)" 
              required
            ></textarea>
          </div>

          <!-- Unggah Foto Kondisi Sebelum -->
          <div class="form-group">
            <label class="form-label">Foto Bukti Kerusakan</label>
            
            <div class="file-upload-wrapper">
              <input 
                type="file" 
                class="file-upload-input" 
                accept="image/*" 
                @change="handleFileChange" 
                :required="!previewUrl"
              />
              <div class="file-upload-content">
                <svg xmlns="http://www.w3.org/2000/svg" class="file-upload-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{{ imageFile ? 'Ubah Foto' : 'Klik atau seret foto kerusakan di sini' }}</span>
                <small v-if="compressionStats" class="text-xs text-orange-500 font-medium">
                  {{ compressionStats }}
                </small>
                <small v-else>Format: JPG, PNG. Kompresi otomatis akan diaktifkan.</small>
              </div>
            </div>

            <!-- Image Preview -->
            <div v-if="previewUrl" class="preview-container">
              <img :src="previewUrl" alt="Preview Kerusakan" class="image-preview" />
            </div>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            class="btn btn-primary w-full" 
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting" class="loader">&nbsp; Mengunggah...</span>
            <span v-else>Kirim Laporan Kerusakan</span>
          </button>
        </form>
      </div>
    </div>

    <!-- Success Toast -->
    <div v-if="toast.show" class="toast">
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useReports } from '~/composables/useReports'

const { createReport, uploadPhoto } = useReports()

useHead({
  title: 'Lapor Kerusakan - Sopir Trans Jateng',
  meta: [
    { name: 'description', content: 'Kirim laporan kerusakan armada secara cepat dan terstruktur.' }
  ]
})

// Authentication State
const isAuthenticated = ref(false)
const pinInput = ref('')
const authError = ref(false)
const pinInputRef = ref(null)

const verifyPIN = () => {
  if (pinInput.value === '1111') {
    isAuthenticated.value = true
    authError.value = false
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('transjateng_sopir_authed', 'true')
    }
  } else {
    authError.value = true
    pinInput.value = ''
  }
}

const logout = () => {
  isAuthenticated.value = false
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('transjateng_sopir_authed')
  }
}

// Set default date to today
const getTodayDateString = () => {
  const d = new Date()
  const month = '' + (d.getMonth() + 1)
  const day = '' + d.getDate()
  const year = d.getFullYear()
  return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-')
}

const form = reactive({
  nama_sopir: '',
  no_armada: '',
  tanggal_kerusakan: '',
  deskripsi: ''
})

onMounted(() => {
  form.tanggal_kerusakan = getTodayDateString()
  if (typeof window !== 'undefined') {
    const isAuthed = sessionStorage.getItem('transjateng_sopir_authed')
    if (isAuthed === 'true') {
      isAuthenticated.value = true
    } else {
      setTimeout(() => {
        pinInputRef.value?.focus()
      }, 200)
    }
  }
})

const imageFile = ref(null)
const previewUrl = ref(null)
const isSubmitting = ref(false)
const compressionStats = ref('')

const toast = reactive({
  show: false,
  message: ''
})

const showToast = (msg) => {
  toast.message = msg
  toast.show = true
  setTimeout(() => {
    toast.show = false
  }, 4000)
}

// Client-side image compression
const compressImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (ev) => {
      const img = new Image()
      img.src = ev.target.result
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height
        
        // Batasi ukuran maksimal 1200px
        const maxDim = 1200
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width)
            width = maxDim
          } else {
            width = Math.round((width * maxDim) / height)
            height = maxDim
          }
        }
        
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        
        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now()
            })
            resolve(compressedFile)
          } else {
            resolve(file)
          }
        }, 'image/jpeg', 0.7) // Kualitas kompresi 70%
      }
      img.onerror = (e) => reject(e)
    }
    reader.onerror = (e) => reject(e)
  })
}

const handleFileChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Tampilkan preview awal
  previewUrl.value = URL.createObjectURL(file)
  
  const originalSizeKb = (file.size / 1024).toFixed(1)
  compressionStats.value = `Mengompresi foto (${originalSizeKb} KB)...`

  try {
    const compressed = await compressImage(file)
    imageFile.value = compressed
    const compressedSizeKb = (compressed.size / 1024).toFixed(1)
    compressionStats.value = `Foto terkompresi: ${originalSizeKb} KB → ${compressedSizeKb} KB`
    
    // Update preview URL dengan foto terkompresi
    previewUrl.value = URL.createObjectURL(compressed)
  } catch (err) {
    console.error('Image compression failed, using original file:', err)
    imageFile.value = file
    compressionStats.value = `Gagal kompresi. Menggunakan ukuran asli (${originalSizeKb} KB)`
  }
}

const handleSubmit = async () => {
  if (isSubmitting.value) return
  if (!imageFile.value) {
    showToast('Silakan unggah foto kerusakan terlebih dahulu.')
    return
  }

  isSubmitting.value = true
  
  try {
    // 1. Upload foto
    const fotoUrl = await uploadPhoto(imageFile.value)
    
    // 2. Simpan Laporan
    await createReport({
      nama_sopir: form.nama_sopir,
      no_armada: form.no_armada,
      tanggal_kerusakan: form.tanggal_kerusakan,
      deskripsi: form.deskripsi,
      foto_sebelum: fotoUrl
    })

    showToast('Laporan kerusakan berhasil dikirim! Mengalihkan...')
    
    // Reset Form
    form.nama_sopir = ''
    form.no_armada = ''
    form.tanggal_kerusakan = getTodayDateString()
    form.deskripsi = ''
    imageFile.value = null
    previewUrl.value = null
    compressionStats.value = ''

    // Redirect to home after 2 seconds
    setTimeout(() => {
      navigateTo('/')
    }, 2000)
    
  } catch (err) {
    console.error(err)
    showToast('Terjadi kesalahan saat mengirim laporan. Silakan coba lagi.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.lock-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}
.my-12 {
  margin-top: 3rem;
  margin-bottom: 3rem;
}
.text-center {
  text-align: center;
}
.auth-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}
.auth-desc {
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}
.error-text {
  color: #ef4444;
}
.max-w-sm {
  max-width: 400px;
}
.max-w-xl {
  max-width: 600px;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.mb-4 {
  margin-bottom: 1rem;
}
.mt-4 {
  margin-top: 1rem;
}
.mb-2 {
  margin-bottom: 0.75rem;
}
.text-xs {
  font-size: 0.75rem;
}
.text-orange-500 {
  color: var(--primary);
}
.font-medium {
  font-weight: 500;
}
.form-row {
  display: flex;
  gap: 1rem;
}
.flex-1 {
  flex: 1;
}
.w-full {
  width: 100%;
}
.preview-container {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
.loader {
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-top: 2px solid #fff;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 0.8s linear infinite;
  display: inline-block;
  vertical-align: middle;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 640px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }
}
</style>
