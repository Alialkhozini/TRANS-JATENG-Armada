<template>
  <div class="mekanik-page-root">
    <!-- PIN Auth Screen Full Page with Night Maintenance Depot Drive-Through -->
    <div v-if="!isAuthenticated" class="auth-fullscreen-page auth-mekanik-theme">
      <div class="auth-road-backdrop">
        <svg class="road-anim-svg" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="depotNightSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#022c22"/>
              <stop offset="55%" stop-color="#064e3b" stop-opacity="0.6"/>
              <stop offset="100%" stop-color="#0f172a" stop-opacity="0.3"/>
            </linearGradient>
            <linearGradient id="depotMtnFar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#064e3b" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#022c22" stop-opacity="0.5"/>
            </linearGradient>
            <linearGradient id="depotMtnNear" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#047857" stop-opacity="0.9"/>
              <stop offset="100%" stop-color="#065f46" stop-opacity="0.6"/>
            </linearGradient>
            <linearGradient id="depotTarmac" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#111827"/>
              <stop offset="50%" stop-color="#090d16"/>
              <stop offset="100%" stop-color="#030712"/>
            </linearGradient>
            <linearGradient id="depotTerrain" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#064e3b"/>
              <stop offset="100%" stop-color="#022c22"/>
            </linearGradient>
          </defs>

          <!-- Deep Emerald Night Sky -->
          <rect width="1440" height="420" fill="url(#depotNightSky)"/>

          <!-- Starry Night Twinkles -->
          <g fill="#a7f3d0" opacity="0.6">
            <circle cx="150" cy="60" r="1.5"/><circle cx="340" cy="110" r="1.2"/><circle cx="580" cy="45" r="1.8"/>
            <circle cx="820" cy="80" r="1.5"/><circle cx="1060" cy="50" r="2"/><circle cx="1280" cy="95" r="1.3"/>
            <circle cx="220" cy="140" r="1.2"/><circle cx="1190" cy="130" r="1.6"/>
          </g>

          <!-- LAYER 1: Full-Width Distant Mountain Ridge -->
          <path d="M-60,400 L120,220 L310,310 L510,190 L710,330 L930,200 L1140,310 L1320,180 L1500,400 L1500,430 L-60,430 Z" fill="url(#depotMtnFar)"/>

          <!-- LAYER 2: Full-Width Mid-Ground Forest Hills -->
          <path d="M-60,415 L190,295 L420,365 L650,285 L860,355 L1080,275 L1290,345 L1500,270 L1500,440 L-60,440 Z" fill="url(#depotMtnNear)"/>

          <!-- LAYER 3: Foreground Terrain flanking the Inspection Lane -->
          <path d="M-60,430 Q220,360 560,390 L880,390 Q1220,360 1500,430 L1500,750 L-60,750 Z" fill="url(#depotTerrain)"/>

          <!-- Clean Modern Depot Workshop Silhouettes on far horizon (Clean, flush, no clumsy poles) -->
          <g fill="#0f172a" opacity="0.85">
            <!-- Left Modern Service Bay -->
            <polygon points="60,340 180,310 320,340 320,400 60,400"/>
            <rect x="110" y="350" width="35" height="40" rx="2" fill="#34d399" opacity="0.4"/>
            <rect x="180" y="350" width="35" height="40" rx="2" fill="#34d399" opacity="0.4"/>

            <!-- Right Modern Service Bay -->
            <polygon points="1120,340 1260,310 1380,340 1380,400 1120,400"/>
            <rect x="1170" y="350" width="35" height="40" rx="2" fill="#34d399" opacity="0.4"/>
            <rect x="1240" y="350" width="35" height="40" rx="2" fill="#34d399" opacity="0.4"/>
          </g>

          <!-- 3D Perspective Depot Tarmac & Pit Road -->
          <polygon points="560,385 880,385 1650,750 -210,750" fill="url(#depotTarmac)"/>

          <!-- Hazard Striped Border Curbs (Emerald Neon & Dark Slate) -->
          <polygon points="550,385 560,385 -210,750 -245,750" fill="#10b981" opacity="0.9"/>
          <polygon points="880,385 890,385 1685,750 1650,750" fill="#10b981" opacity="0.9"/>

          <!-- Glowing Green Depot Runway Center Lines -->
          <g class="anim-road-stripes">
            <line x1="720" y1="385" x2="720" y2="750" stroke="#10b981" stroke-width="8" stroke-dasharray="45,40" class="moving-dashes-green"/>
            <line x1="640" y1="385" x2="260" y2="750" stroke="#34d399" stroke-width="4" stroke-dasharray="30,35" opacity="0.75" class="moving-dashes-green"/>
            <line x1="800" y1="385" x2="1180" y2="750" stroke="#34d399" stroke-width="4" stroke-dasharray="30,35" opacity="0.75" class="moving-dashes-green"/>
          </g>

          <!-- Modern Sleek Depot Floodlights (Clean roadside lamps with green glow) -->
          <g stroke="#334155" stroke-width="3" fill="none">
            <!-- Left Lamp -->
            <path d="M370,475 Q350,415 330,415 L310,415"/>
            <circle cx="310" cy="418" r="5" fill="#34d399" stroke="none"/>
            <ellipse cx="310" cy="430" rx="20" ry="8" fill="#10b981" opacity="0.35" stroke="none"/>
            
            <!-- Right Lamp -->
            <path d="M1070,475 Q1090,415 1110,415 L1130,415"/>
            <circle cx="1130" cy="418" r="5" fill="#34d399" stroke="none"/>
            <ellipse cx="1130" cy="430" rx="20" ry="8" fill="#10b981" opacity="0.35" stroke="none"/>
          </g>

          <!-- Mobile Service Maintenance Unit on Side Lane -->
          <g class="anim-service-truck" transform="translate(860, 490)">
            <ellipse cx="0" cy="38" rx="44" ry="11" fill="#000000" opacity="0.5"/>
            <!-- Service Van Body Emerald -->
            <rect x="-35" y="-18" width="70" height="48" rx="8" fill="#047857"/>
            <rect x="-30" y="-12" width="60" height="22" rx="4" fill="#0f172a"/>
            <rect x="-26" y="-9" width="52" height="18" rx="3" fill="#a7f3d0" opacity="0.9"/>
            <circle cx="-24" cy="20" r="5" fill="#fef08a"/>
            <circle cx="24" cy="20" r="5" fill="#fef08a"/>
            <!-- Top Flashing Amber Service Beacon -->
            <rect x="-8" y="-24" width="16" height="6" rx="2" fill="#f59e0b" class="service-beacon-blink"/>
            <!-- Headlight Cones -->
            <polygon points="-24,22 -60,70 -10,70" fill="#fef08a" opacity="0.25"/>
            <polygon points="24,22 10,70 60,70" fill="#fef08a" opacity="0.25"/>
          </g>
        </svg>
      </div>

      <div class="card auth-card text-center fade-in-up">
        <div class="portal-logo-wrapper">
          <div class="portal-icon-box mekanik-icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
          </div>
        </div>
        <h2 class="auth-title">Akses Portal Mekanik</h2>
        <p class="auth-desc">Masukkan username dan PIN untuk melihat tugas perbaikan Anda.</p>
        
        <form @submit.prevent="verifyPIN" class="auth-form">
          <div class="form-group">
            <input 
              v-model="usernameInput" 
              type="text" 
              class="form-control text-center" 
              placeholder="Username Mekanik" 
              required 
              ref="usernameInputRef"
            />
          </div>
          <div class="form-group mt-3">
            <input 
              v-model="pinInput" 
              type="password" 
              class="form-control text-center" 
              placeholder="Ketik PIN" 
              required 
              ref="pinInputRef"
            />
          </div>
          <p v-if="authError" class="error-text text-sm mb-4">❌ Username atau PIN salah.</p>
          <button type="submit" class="btn btn-primary w-full">Masuk Dashboard</button>
        </form>
        <NuxtLink to="/" class="btn btn-secondary w-full mt-4">&larr; Kembali ke Beranda</NuxtLink>
      </div>
    </div>

    <!-- Active Tasks Screen -->
    <div v-else class="container fade-in-up">
      <div class="page-header">
        <div>
          <NuxtLink to="/" class="btn btn-secondary btn-sm mb-2">&larr; Kembali ke Beranda</NuxtLink>
          <h1 class="page-title">Portal Tugas Mekanik</h1>
          <p class="page-subtitle">Daftar perbaikan aktif dan penanganan armada bus yang sedang diproses oleh tim mekanik.</p>
        </div>
        <div class="header-actions">
          <button @click="logout" class="btn btn-danger btn-sm">Keluar</button>
        </div>
      </div>

      <!-- Search Input -->
      <div class="search-bar-container mb-6">
        <div class="search-input-wrapper">
          <input 
            v-model="searchQuery" 
            type="text" 
            id="cariTugas" 
            class="search-input" 
            placeholder="Cari tugas perbaikan..." 
          />
          <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
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
          <span :class="{ 'spin-animation': isLoading }" style="display: inline-block; margin-right: 4px;">🔄</span>
          {{ isLoading ? 'Memuat...' : 'Segarkan Tugas' }}
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

const { fetchReports, updateReport, uploadPhoto, authenticateUser } = useReports()

useHead({
  title: 'Portal Mekanik - Trans Jateng',
  meta: [
    { name: 'description', content: 'Daftar penugasan dan perekaman progres kerja mekanik.' }
  ]
})

// Authentication State
const isAuthenticated = ref(false)
const usernameInput = ref('')
const pinInput = ref('')
const authError = ref(false)
const usernameInputRef = ref(null)
const pinInputRef = ref(null)
const loggedInName = ref('')

const verifyPIN = async () => {
  try {
    const user = await authenticateUser(usernameInput.value, pinInput.value, 'Mekanik')
    if (user) {
      isAuthenticated.value = true
      authError.value = false
      loggedInName.value = user.username
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('transjateng_mekanik_authed', 'true')
        sessionStorage.setItem('transjateng_mekanik_nama', user.username)
      }
      loadTasks()
    } else {
      authError.value = true
      pinInput.value = ''
    }
  } catch (err) {
    console.error(err)
    authError.value = true
    pinInput.value = ''
  }
}

const logout = () => {
  isAuthenticated.value = false
  loggedInName.value = ''
  usernameInput.value = ''
  pinInput.value = ''
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('transjateng_mekanik_authed')
    sessionStorage.removeItem('transjateng_mekanik_nama')
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
      loggedInName.value = sessionStorage.getItem('transjateng_mekanik_nama') || ''
      loadTasks()
    } else {
      setTimeout(() => {
        usernameInputRef.value?.focus()
      }, 200)
    }
  }
})

const loadTasks = async () => {
  isLoading.value = true
  // Artificial delay 600ms for a satisfying loading visual effect
  await new Promise(resolve => setTimeout(resolve, 600))
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
  if (loggedInName.value) {
    list = list.filter(t => t.nama_mekanik && t.nama_mekanik.toLowerCase() === loggedInName.value.toLowerCase())
  }
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    list = list.filter(t => 
      (t.no_armada && t.no_armada.toLowerCase().includes(query)) ||
      (t.deskripsi && t.deskripsi.toLowerCase().includes(query))
    )
  }
  return list
})

const historyCount = computed(() => {
  let list = tasks.value.filter(t => t.status === 'Selesai')
  if (loggedInName.value) {
    list = list.filter(t => t.nama_mekanik && t.nama_mekanik.toLowerCase() === loggedInName.value.toLowerCase())
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
  overflow-wrap: anywhere;
  word-break: break-word;
  white-space: pre-wrap;
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
  .filter-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  .filter-left {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    width: 100%;
  }
  .chip-container {
    flex-wrap: nowrap;
    overflow-x: auto;
    width: 100%;
    padding-bottom: 0.25rem;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .chip-container::-webkit-scrollbar {
    display: none;
  }
  .chip-btn {
    flex-shrink: 0;
  }
}

.spin-animation {
  animation: spin-icon 1s linear infinite;
}
@keyframes spin-icon {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-360deg); }
}

/* Rounded Pill Search Bar */
.search-bar-container {
  width: 100%;
}
.search-input-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}
.search-input {
  width: 100%;
  padding: 0.85rem 3rem 0.85rem 1.5rem;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  background-color: var(--bg-glass);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border-glass);
  border-radius: 9999px;
  color: var(--text-primary);
  transition: var(--transition-fast);
  box-shadow: var(--shadow-sm);
}
.search-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-glow);
}
.search-icon {
  position: absolute;
  right: 1.25rem;
  width: 1.25rem;
  height: 1.25rem;
  color: var(--text-secondary);
  pointer-events: none;
  opacity: 0.7;
  transition: var(--transition-fast);
}
.search-input:focus + .search-icon {
  color: var(--primary);
  opacity: 1;
}

/* ==========================================================================
   Full Page Animated Night Maintenance Depot Login (Mekanik Theme)
   ========================================================================== */
.mekanik-page-root {
  width: 100%;
}

.auth-fullscreen-page {
  position: relative;
  width: 100%;
  min-height: calc(100vh - 65px);
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 3rem 1.5rem;
  background: #022c22;
}

:root.light .auth-fullscreen-page {
  background: #d1fae5;
}

.auth-road-backdrop {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  pointer-events: none;
}

.road-anim-svg {
  width: 100%;
  height: 100%;
  display: block;
}

.auth-card {
  position: relative;
  z-index: 10;
  max-width: 420px;
  width: 100%;
  background: var(--bg-glass);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-lg);
  padding: 2.25rem 2rem;
  box-shadow: var(--shadow-lg);
}

:root.light .auth-card {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.15);
}

.portal-icon-box {
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem auto;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mekanik-icon-box {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
}

.moving-dashes-green {
  animation: dashGreenDepot 1s linear infinite;
}

.service-beacon-blink {
  animation: beaconFlash 1.2s infinite;
}

.anim-service-truck {
  animation: truckCruise 3.8s ease-in-out infinite;
}

@keyframes dashGreenDepot {
  0% { stroke-dashoffset: 85; }
  100% { stroke-dashoffset: 0; }
}

@keyframes beaconFlash {
  0%, 45% { opacity: 1; filter: drop-shadow(0 0 8px #f59e0b); }
  50%, 100% { opacity: 0.2; filter: none; }
}

@keyframes truckCruise {
  0% { transform: translate(860px, 490px) translateY(0); }
  50% { transform: translate(860px, 490px) translateY(-5px); }
  100% { transform: translate(860px, 490px) translateY(0); }
}
</style>
