<template>
  <div class="container fade-in-up">
    <!-- PIN Auth Screen -->
    <div v-if="!isAuthenticated" class="card max-w-sm mx-auto my-12 text-center">
      <div class="lock-icon">🔒</div>
      <h2 class="auth-title">Akses Portal Mekanik</h2>
      <p class="auth-desc">Masukkan PIN Mekanik untuk mengakses daftar tugas perbaikan.</p>
      
      <form @submit.prevent="verifyPIN" class="auth-form">
        <div class="form-group">
          <input 
            v-model="pinInput" 
            type="password" 
            class="form-control text-center" 
            placeholder="Ketik PIN (Default: 2222)" 
            maxlength="4" 
            required 
            ref="pinInputRef"
          />
        </div>
        <p v-if="authError" class="error-text text-sm mb-4">❌ PIN salah. Silakan coba lagi.</p>
        <button type="submit" class="btn btn-primary w-full">Masuk Dashboard</button>
      </form>
      <NuxtLink to="/" class="btn btn-secondary w-full mt-4">&larr; Kembali ke Beranda</NuxtLink>
    </div>

    <!-- Active Tasks Screen -->
    <div v-else>
      <div class="page-header">
        <div>
          <NuxtLink to="/" class="btn btn-secondary btn-sm mb-2">&larr; Kembali ke Beranda</NuxtLink>
          <h1 class="page-title">Portal Tugas Mekanik</h1>
          <p class="page-subtitle">Daftar perbaikan aktif dan penanganan armada bus yang sedang diproses oleh tim mekanik.</p>
        </div>
        <div class="header-actions">
          <button @click="logout" class="btn btn-secondary btn-sm">Keluar 🔓</button>
        </div>
      </div>

      <!-- Search Name Input -->
      <div class="card mb-6 p-4">
        <div class="form-group mb-0">
          <label class="form-label" for="cariMekanik">🔍 Cari Berdasarkan Nama Mekanik</label>
          <input 
            v-model="searchQuery" 
            type="text" 
            id="cariMekanik" 
            class="form-control" 
            placeholder="Ketik nama mekanik untuk menyaring tugas (misal: Hendro). Kosongkan untuk melihat semua." 
          />
        </div>
      </div>

      <!-- Filters & Refresh -->
      <div class="filter-bar card mb-6">
        <div class="filter-left">
          <span class="filter-label">Tipe Tugas:</span>
          <div class="chip-container">
            <button 
              @click="activeStatusFilter = 'Diproses'" 
              class="chip-btn"
              :class="{ active: activeStatusFilter === 'Diproses' }"
            >
              Tugas Aktif (Diproses)
            </button>
            <button 
              @click="activeStatusFilter = 'Selesai'" 
              class="chip-btn"
              :class="{ active: activeStatusFilter === 'Selesai' }"
            >
              Riwayat Selesai ({{ historyCount }})
            </button>
          </div>
        </div>
        <button @click="loadTasks" class="btn btn-secondary btn-sm" :disabled="isLoading">
          🔄 {{ isLoading ? 'Memuat...' : 'Segarkan Tugas' }}
        </button>
      </div>

      <!-- Tasks List -->
      <div v-if="isLoading" class="text-center py-12">
        <div class="spinner"></div>
        <p class="text-secondary mt-4">Memuat daftar tugas perbaikan...</p>
      </div>

      <div v-else-if="filteredTasks.length === 0" class="card text-center py-12 text-secondary">
        🎉 Tidak ada tugas "{{ activeStatusFilter }}" yang ditemukan{{ searchQuery ? ' untuk mekanik "' + searchQuery + '"' : '' }}.
      </div>

      <div v-else class="task-list-container">
        <div v-for="task in filteredTasks" :key="task.id" class="card task-card mb-6">
          
          <!-- Task Header -->
          <div class="task-card-header">
            <div class="bus-badge">🚌 Armada {{ task.no_armada }}</div>
            <div class="header-right-meta">
              <span class="mechanic-assigned-tag">🔧 Mekanik: <strong>{{ task.nama_mekanik }}</strong></span>
              <span class="badge" :class="task.status === 'Selesai' ? 'badge-completed' : 'badge-processing'">
                {{ task.status }}
              </span>
            </div>
          </div>

          <!-- Problem Section -->
          <div class="task-details-grid">
            <div class="detail-col">
              <h3 class="section-title">📌 Detail Laporan Kerusakan ({{ task.id }})</h3>
              <p class="meta-txt">Sopir: <strong>{{ task.nama_sopir }}</strong> | Dilaporkan: {{ formatDate(task.tanggal_kerusakan) }}</p>
              <div class="desc-box">{{ task.deskripsi }}</div>
              
              <div class="media-preview-box">
                <span class="preview-label">Foto Kerusakan Awal:</span>
                <img :src="task.foto_sebelum" class="thumbnail-medium" @click="openImageModal(task.foto_sebelum, 'Foto Sebelum Perbaikan')" />
              </div>
            </div>

            <!-- Handlings Section -->
            <div class="detail-col action-col">
              
              <!-- 1. PASCA PENANGANAN (TINDAKAN AWAL) -->
              <div class="sub-form-section" :class="{ disabled: task.status === 'Selesai' }">
                <h4 class="sub-section-title">1. Tindakan Awal (Pasca Penanganan)</h4>
                
                <!-- Jika sudah disimpan -->
                <div v-if="task.keterangan_pasca_penanganan" class="saved-info-box">
                  <p class="saved-text">{{ task.keterangan_pasca_penanganan }}</p>
                  <div v-if="task.foto_pasca_penanganan" class="media-link" @click="openImageModal(task.foto_pasca_penanganan, 'Foto Pasca Penanganan')">
                    🖼️ Lihat Foto Pasca Penanganan
                  </div>
                  <span class="success-tick">✔️ Sudah Tersimpan</span>
                </div>

                <!-- Formulir Input jika belum disimpan -->
                <form v-else-if="task.status === 'Diproses'" @submit.prevent="submitPasca(task)">
                  <div class="form-group">
                    <textarea 
                      v-model="actionsData[task.id].keterangan_pasca" 
                      rows="2" 
                      class="form-control text-sm" 
                      placeholder="Tulis tindakan sementara yang telah dilakukan..." 
                      required
                    ></textarea>
                  </div>

                  <div class="form-group mb-3">
                    <div class="file-upload-wrapper py-3">
                      <input 
                        type="file" 
                        class="file-upload-input" 
                        accept="image/*" 
                        @change="handleFileChange($event, task.id, 'pasca')" 
                        required
                      />
                      <div class="file-upload-content">
                        <span class="text-xs">{{ actionsData[task.id].pasca_stats || 'Upload Foto Pasca Penanganan' }}</span>
                      </div>
                    </div>
                    <!-- Mini Preview -->
                    <img v-if="actionsData[task.id].pasca_preview" :src="actionsData[task.id].pasca_preview" class="image-preview-mini" />
                  </div>

                  <button type="submit" class="btn btn-secondary btn-sm w-full" :disabled="isActionPending">
                    Simpan Pasca Penanganan
                  </button>
                </form>
              </div>

              <!-- 2. HASIL PERBAIKAN (PENYELESAIAN TUGAS) -->
              <div class="sub-form-section border-top-glow" :class="{ disabled: task.status === 'Selesai' }">
                <h4 class="sub-section-title">2. Hasil Akhir (Perbaikan Selesai)</h4>

                <!-- Jika sudah selesai -->
                <div v-if="task.status === 'Selesai'" class="saved-info-box border-emerald">
                  <p class="saved-text"><strong>Hasil Akhir:</strong> {{ task.keterangan_hasil_perbaikan }}</p>
                  <div v-if="task.foto_hasil_perbaikan" class="media-link" @click="openImageModal(task.foto_hasil_perbaikan, 'Foto Hasil Perbaikan')">
                    🖼️ Lihat Foto Hasil Perbaikan
                  </div>
                  <span class="success-tick text-emerald-500">🏆 Perbaikan Selesai ({{ formatDateWithTime(task.waktu_selesai) }})</span>
                </div>

                <!-- Formulir Input jika belum selesai -->
                <form v-else @submit.prevent="submitSelesai(task)">
                  <div class="form-group">
                    <textarea 
                      v-model="actionsData[task.id].keterangan_hasil" 
                      rows="2" 
                      class="form-control text-sm" 
                      placeholder="Jelaskan perbaikan permanen yang telah selesai dilakukan..." 
                      required
                    ></textarea>
                  </div>

                  <div class="form-group mb-3">
                    <div class="file-upload-wrapper py-3">
                      <input 
                        type="file" 
                        class="file-upload-input" 
                        accept="image/*" 
                        @change="handleFileChange($event, task.id, 'hasil')" 
                        required
                      />
                      <div class="file-upload-content">
                        <span class="text-xs">{{ actionsData[task.id].hasil_stats || 'Upload Foto Hasil Perbaikan' }}</span>
                      </div>
                    </div>
                    <!-- Mini Preview -->
                    <img v-if="actionsData[task.id].hasil_preview" :src="actionsData[task.id].hasil_preview" class="image-preview-mini" />
                  </div>

                  <button type="submit" class="btn btn-primary btn-sm w-full" :disabled="isActionPending">
                    Tandai Selesai & Kirim
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Modal Viewer -->
    <div v-if="modalImage.show" class="modal-overlay" @click="modalImage.show = false">
      <div class="modal-content max-w-lg p-2" @click.stop>
        <div class="modal-image-header">
          <h4 class="font-semibold text-white">{{ modalImage.title }}</h4>
          <button @click="modalImage.show = false" class="close-btn">&times;</button>
        </div>
        <img :src="modalImage.url" class="modal-img-large" />
      </div>
    </div>

    <!-- Toast Notify -->
    <div v-if="toast.show" class="toast">
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useReports } from '~/composables/useReports'

const { fetchReports, updateReport, uploadPhoto } = useReports()

useHead({
  title: 'Portal Mekanik - Trans Jateng',
  meta: [
    { name: 'description', content: 'Daftar penugasan dan perekaman progres kerja mekanik.' }
  ]
})

// Authentication State
const isAuthenticated = ref(false)
const pinInput = ref('')
const authError = ref(false)
const pinInputRef = ref(null)

const verifyPIN = () => {
  if (pinInput.value === '2222') {
    isAuthenticated.value = true
    authError.value = false
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('transjateng_mekanik_authed', 'true')
    }
    loadTasks()
  } else {
    authError.value = true
    pinInput.value = ''
  }
}

const logout = () => {
  isAuthenticated.value = false
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('transjateng_mekanik_authed')
  }
}

const searchQuery = ref('')
const tasks = ref([])
const isLoading = ref(false)
const isActionPending = ref(false)
const activeStatusFilter = ref('Diproses')

// Reactive local form holder for each task to allow upload files & previews separately
const actionsData = reactive({})

const toast = reactive({
  show: false,
  message: ''
})

const modalImage = reactive({
  show: false,
  url: '',
  title: ''
})

const showToast = (msg) => {
  toast.message = msg
  toast.show = true
  setTimeout(() => {
    toast.show = false
  }, 4000)
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    const isAuthed = sessionStorage.getItem('transjateng_mekanik_authed')
    if (isAuthed === 'true') {
      isAuthenticated.value = true
      loadTasks()
    } else {
      setTimeout(() => {
        pinInputRef.value?.focus()
      }, 200)
    }
  }
})

const loadTasks = async () => {
  isLoading.value = true
  try {
    const all = await fetchReports()
    
    // Ambil semua laporan yang berstatus Diproses atau Selesai
    tasks.value = all.filter(r => r.status === 'Diproses' || r.status === 'Selesai')

    // Inisialisasi model form reactive untuk setiap tugas
    tasks.value.forEach(t => {
      if (!actionsData[t.id]) {
        actionsData[t.id] = {
          keterangan_pasca: '',
          pasca_file: null,
          pasca_stats: '',
          pasca_preview: null,
          keterangan_hasil: '',
          hasil_file: null,
          hasil_stats: '',
          hasil_preview: null
        }
      }
    })
  } catch (err) {
    console.error(err)
    showToast('Gagal memuat tugas.')
  } finally {
    isLoading.value = false
  }
}

// Filter list based on status tab and name search query
const filteredTasks = computed(() => {
  let list = tasks.value.filter(t => t.status === activeStatusFilter.value)
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    list = list.filter(t => t.nama_mekanik && t.nama_mekanik.toLowerCase().includes(query))
  }
  return list
})

const historyCount = computed(() => {
  let list = tasks.value.filter(t => t.status === 'Selesai')
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    list = list.filter(t => t.nama_mekanik && t.nama_mekanik.toLowerCase().includes(query))
  }
  return list.length
})

// Image compression
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
        }, 'image/jpeg', 0.7)
      }
      img.onerror = reject
    }
    reader.onerror = reject
  })
}

const handleFileChange = async (event, taskId, type) => {
  const file = event.target.files[0]
  if (!file) return

  const originalSizeKb = (file.size / 1024).toFixed(1)
  
  if (type === 'pasca') {
    actionsData[taskId].pasca_preview = URL.createObjectURL(file)
    actionsData[taskId].pasca_stats = `Mengompresi (${originalSizeKb} KB)...`
    try {
      const compressed = await compressImage(file)
      actionsData[taskId].pasca_file = compressed
      actionsData[taskId].pasca_preview = URL.createObjectURL(compressed)
      actionsData[taskId].pasca_stats = `Foto: ${originalSizeKb} KB → ${(compressed.size / 1024).toFixed(1)} KB`
    } catch {
      actionsData[taskId].pasca_file = file
      actionsData[taskId].pasca_stats = `Ukuran asli: ${originalSizeKb} KB`
    }
  } else {
    actionsData[taskId].hasil_preview = URL.createObjectURL(file)
    actionsData[taskId].hasil_stats = `Mengompresi (${originalSizeKb} KB)...`
    try {
      const compressed = await compressImage(file)
      actionsData[taskId].hasil_file = compressed
      actionsData[taskId].hasil_preview = URL.createObjectURL(compressed)
      actionsData[taskId].hasil_stats = `Foto: ${originalSizeKb} KB → ${(compressed.size / 1024).toFixed(1)} KB`
    } catch {
      actionsData[taskId].hasil_file = file
      actionsData[taskId].hasil_stats = `Ukuran asli: ${originalSizeKb} KB`
    }
  }
}

// Submits
const submitPasca = async (task) => {
  const data = actionsData[task.id]
  if (!data.pasca_file || isActionPending.value) return

  isActionPending.value = true
  showToast('Mengunggah berkas pasca penanganan...')

  try {
    const photoUrl = await uploadPhoto(data.pasca_file)
    await updateReport(task.id, {
      foto_pasca_penanganan: photoUrl,
      keterangan_pasca_penanganan: data.keterangan_pasca.trim()
    })
    
    showToast('Tindakan pasca penanganan berhasil disimpan!')
    await loadTasks()
  } catch (err) {
    console.error(err)
    showToast('Gagal menyimpan pasca penanganan.')
  } finally {
    isActionPending.value = false
  }
}

const submitSelesai = async (task) => {
  const data = actionsData[task.id]
  if (!data.hasil_file || isActionPending.value) return

  isActionPending.value = true
  showToast('Mengunggah berkas perbaikan selesai...')

  try {
    const photoUrl = await uploadPhoto(data.hasil_file)
    await updateReport(task.id, {
      status: 'Selesai',
      foto_hasil_perbaikan: photoUrl,
      keterangan_hasil_perbaikan: data.keterangan_hasil.trim(),
      waktu_selesai: new Date().toISOString()
    })
    
    showToast('Perbaikan ditandai Selesai! Selamat atas kerja bagus Anda!')
    await loadTasks()
  } catch (err) {
    console.error(err)
    showToast('Gagal menyimpan perbaikan selesai.')
  } finally {
    isActionPending.value = false
  }
}

const openImageModal = (url, title) => {
  modalImage.url = url
  modalImage.title = title
  modalImage.show = true
}

const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

const formatDateWithTime = (dateStr) => {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return d.toLocaleDateString('id-ID', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }) + ' WIB'
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
.max-w-lg {
  max-width: 600px;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.mb-2 {
  margin-bottom: 0.75rem;
}
.mb-3 {
  margin-bottom: 1rem;
}
.mb-4 {
  margin-bottom: 1rem;
}
.mt-4 {
  margin-top: 1rem;
}
.mb-6 {
  margin-bottom: 1.5rem;
}
.py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.text-xs {
  font-size: 0.75rem;
}
.header-actions {
  display: flex;
  align-items: center;
}
.header-right-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.mechanic-assigned-tag {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-glass);
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  color: var(--text-primary);
}

.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 1.25rem 1.5rem;
}
.filter-left {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.filter-label {
  font-weight: 600;
  font-size: 0.9rem;
}
.chip-container {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.chip-btn {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-glass);
  padding: 0.4rem 1rem;
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 500;
  border-radius: 50px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--transition-fast);
}
.chip-btn:hover {
  background: rgba(249, 115, 22, 0.1);
  color: var(--primary);
  border-color: var(--primary);
}
.chip-btn.active {
  background: var(--primary);
  color: #fff;
  border-color: var(--primary);
}

.task-card {
  padding: 2rem;
  background: var(--bg-glass);
}
.task-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-glass);
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}
.bus-badge {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-primary);
}

.task-details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}
.meta-txt {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}
.meta-txt strong {
  color: var(--text-primary);
}
.desc-box {
  background: var(--bg-primary);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-md);
  padding: 1rem;
  color: var(--text-primary);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.media-preview-box {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.preview-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
}
.thumbnail-medium {
  width: 150px;
  height: 110px;
  object-fit: cover;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-glass);
  cursor: pointer;
  transition: var(--transition-fast);
}
.thumbnail-medium:hover {
  transform: scale(1.03);
  border-color: var(--primary);
}

.action-col {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sub-form-section {
  background: var(--bg-primary);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-md);
  padding: 1.25rem;
  transition: var(--transition-fast);
}
.sub-form-section.disabled {
  opacity: 0.85;
}
.border-top-glow {
  border-top: 2px solid var(--primary);
}

.sub-section-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.image-preview-mini {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid var(--border-glass);
  margin-top: 0.5rem;
}

.saved-info-box {
  border-left: 3px solid var(--status-processing);
  padding-left: 0.75rem;
  position: relative;
  padding-bottom: 0.5rem;
}
.saved-info-box.border-emerald {
  border-left-color: var(--status-completed);
}
.saved-text {
  font-size: 0.88rem;
  color: var(--text-primary);
  margin-bottom: 0.35rem;
}
.media-link {
  font-size: 0.8rem;
  color: var(--primary);
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
}
.media-link:hover {
  text-decoration: underline;
}
.success-tick {
  display: block;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--status-processing);
  margin-top: 0.5rem;
  text-transform: uppercase;
}

/* Modal CSS styling */
.modal-image-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem 1rem 1rem;
}
.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-secondary);
  cursor: pointer;
}
.close-btn:hover {
  color: #fff;
}
.modal-img-large {
  width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: var(--radius-md);
}

.spinner {
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top: 4px solid var(--primary);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .task-details-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .task-card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  .header-right-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    width: 100%;
  }
  .mechanic-assigned-tag {
    width: 100%;
    text-align: center;
  }
}
</style>
