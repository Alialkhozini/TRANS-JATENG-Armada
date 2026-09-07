<template>
  <div class="sopir-page-root">
    <!-- Auth Screen Full Page -->
    <div v-if="!isAuthenticated" class="auth-fullscreen-page auth-sopir-theme">
      <div class="auth-road-backdrop">
        <svg class="road-anim-svg" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="sopirDaySky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#0284c7" stop-opacity="0.9"/>
              <stop offset="50%" stop-color="#38bdf8" stop-opacity="0.6"/>
              <stop offset="100%" stop-color="#bae6fd" stop-opacity="0.3"/>
            </linearGradient>
            <linearGradient id="sopirMtnFar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#1e3a8a" stop-opacity="0.75"/>
              <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.4"/>
            </linearGradient>
            <linearGradient id="sopirMtnNear" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#0f766e" stop-opacity="0.85"/>
              <stop offset="100%" stop-color="#14b8a6" stop-opacity="0.5"/>
            </linearGradient>
            <linearGradient id="sopirHills" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#15803d" stop-opacity="0.9"/>
              <stop offset="100%" stop-color="#22c55e" stop-opacity="0.4"/>
            </linearGradient>
            <linearGradient id="sopirRoadGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#1e293b"/>
              <stop offset="60%" stop-color="#0f172a"/>
              <stop offset="100%" stop-color="#020617"/>
            </linearGradient>
          </defs>

          <!-- Sky Background -->
          <rect width="1440" height="420" fill="url(#sopirDaySky)"/>

          <!-- Animated Soft Clouds -->
          <g class="anim-clouds" fill="#ffffff" opacity="0.45">
            <path d="M120,90 Q140,65 175,70 Q215,60 245,85 Q275,80 290,105 Q280,130 240,125 Q180,135 130,120 Q105,115 120,90 Z"/>
            <path d="M780,70 Q805,45 845,50 Q885,40 920,68 Q955,62 970,90 Q955,115 915,110 Q850,120 800,102 Q770,95 780,70 Z"/>
            <path d="M1180,110 Q1200,85 1235,90 Q1275,80 1305,105 Q1335,100 1350,125 Q1340,150 1300,145 Q1240,155 1190,140 Q1165,135 1180,110 Z"/>
          </g>

          <!-- LAYER 1: Distant Majestic Volcano Mountain Peaks (Continuous Full Width) -->
          <path d="M-60,400 L110,210 L280,320 L460,180 L650,340 L880,190 L1080,310 L1260,170 L1420,290 L1500,400 L1500,420 L-60,420 Z" fill="url(#sopirMtnFar)"/>

          <!-- LAYER 2: Mid-ground Foothill Ridges (Continuous Full Width) -->
          <path d="M-60,410 L180,290 L390,370 L600,280 L790,360 L1010,270 L1220,350 L1450,260 L1500,410 L1500,440 L-60,440 Z" fill="url(#sopirMtnNear)"/>

          <!-- LAYER 3: Foreground Green Valleys & Embankments flanking the highway -->
          <path d="M-60,430 Q220,350 560,390 L880,390 Q1220,350 1500,430 L1500,750 L-60,750 Z" fill="url(#sopirHills)"/>

          <!-- Roadside Soil & Shoulder -->
          <polygon points="-60,430 540,390 560,390 -160,750 -220,750" fill="#334155" opacity="0.6"/>
          <polygon points="1500,430 900,390 880,390 1600,750 1660,750" fill="#334155" opacity="0.6"/>

          <!-- 3D Perspective Road (Main Highway Tarmac) -->
          <polygon points="560,385 880,385 1600,750 -160,750" fill="url(#sopirRoadGrad)"/>

          <!-- Red & White Safety Guide Curb Lines -->
          <polygon points="550,385 560,385 -160,750 -195,750" fill="#ef4444" opacity="0.95"/>
          <polygon points="880,385 890,385 1635,750 1600,750" fill="#ef4444" opacity="0.95"/>

          <!-- Animated Road Dashes -->
          <g class="anim-road-stripes">
            <!-- Center Double Yellow Flow -->
            <line x1="720" y1="385" x2="720" y2="750" stroke="#fbbf24" stroke-width="8" stroke-dasharray="40,40" class="moving-dashes"/>
            <!-- Left & Right Lane Divider Dashes -->
            <line x1="640" y1="385" x2="280" y2="750" stroke="#ffffff" stroke-width="4" stroke-dasharray="30,35" opacity="0.85" class="moving-dashes"/>
            <line x1="800" y1="385" x2="1160" y2="750" stroke="#ffffff" stroke-width="4" stroke-dasharray="30,35" opacity="0.85" class="moving-dashes"/>
          </g>

          <!-- Modern Highway Street Lights (Left & Right Shoulder) -->
          <g stroke="#64748b" stroke-width="3" fill="none">
            <!-- Left Lamp 1 -->
            <path d="M380,480 Q360,420 340,420 L320,420"/>
            <circle cx="320" cy="423" r="5" fill="#fef08a" stroke="none"/>
            <ellipse cx="320" cy="435" rx="18" ry="8" fill="#fef08a" opacity="0.3" stroke="none"/>
            
            <!-- Right Lamp 1 -->
            <path d="M1060,480 Q1080,420 1100,420 L1120,420"/>
            <circle cx="1120" cy="423" r="5" fill="#fef08a" stroke="none"/>
            <ellipse cx="1120" cy="435" rx="18" ry="8" fill="#fef08a" opacity="0.3" stroke="none"/>
          </g>

          <!-- Trans Jateng Red-Blue Bus Cruising on Road -->
          <g class="anim-cruising-bus">
            <ellipse cx="0" cy="42" rx="46" ry="12" fill="#000000" opacity="0.45"/>
            <!-- Bus Chassis Red Trans Jateng -->
            <rect x="-38" y="-20" width="76" height="54" rx="9" fill="#dc2626"/>
            <!-- Front Windshield & Windows -->
            <rect x="-32" y="-14" width="64" height="26" rx="4" fill="#0f172a"/>
            <rect x="-28" y="-11" width="56" height="22" rx="3" fill="#93c5fd" opacity="0.9"/>
            <!-- Trans Jateng Blue Accent Stripe -->
            <rect x="-38" y="14" width="76" height="7" fill="#2563eb"/>
            <!-- Headlights -->
            <circle cx="-26" cy="25" r="5.5" fill="#fef08a"/>
            <circle cx="26" cy="25" r="5.5" fill="#fef08a"/>
            <!-- Grille & License Plate -->
            <rect x="-16" y="20" width="32" height="10" rx="2" fill="#1e293b"/>
            <rect x="-12" y="6" width="24" height="6" rx="1" fill="#ffffff"/>
            <!-- Headlight Beams Glow -->
            <polygon points="-26,27 -70,80 -10,80" fill="#fef08a" opacity="0.25"/>
            <polygon points="26,27 10,80 70,80" fill="#fef08a" opacity="0.25"/>
          </g>
        </svg>
      </div>

      <div class="card auth-card text-center fade-in-up">
        <div class="portal-logo-wrapper">
          <img src="/bus-portal.png" alt="Bus Trans Jateng" class="portal-logo-img" />
        </div>
        <h2 class="auth-title">Akses Portal Sopir</h2>
        <p class="auth-desc">Masukkan kode untuk membuka akses portal sopir trans jateng armada.</p>
        
        <form @submit.prevent="verifyPIN" class="auth-form">
          <div class="form-group">
            <input 
              v-model="pinInput" 
              type="text" 
              class="form-control text-center" 
              placeholder="Ketik Kode / Sandi" 
              required 
              ref="pinInputRef"
            />
          </div>
          <p v-if="authError" class="error-text text-sm mb-4">❌ Nomor lambung bus salah atau tidak terdaftar (1 s/d 14).</p>
          <button type="submit" class="btn btn-primary w-full">Masuk Dashboard</button>
        </form>
        <NuxtLink to="/" class="btn btn-secondary w-full mt-4">&larr; Kembali ke Beranda</NuxtLink>
      </div>
    </div>

    <!-- Main Screen -->
    <div v-else class="container fade-in-up">
      <!-- Header -->
      <div class="page-header">
        <div>
          <NuxtLink to="/" class="btn btn-secondary btn-sm mb-2">&larr; Kembali ke Beranda</NuxtLink>
          <div class="title-with-badge">
            <h1 class="page-title">Portal Sopir Armada</h1>
            <span class="badge badge-bus">🚌 {{ form.no_armada }}</span>
          </div>
          <p class="page-subtitle">Laporkan kerusakan bus dan pantau progres perbaikan dari tim mekanik & operasional.</p>
        </div>
        <div class="header-actions">
          <button @click="logout" class="btn btn-danger btn-sm">Keluar</button>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="tabs-nav card mb-6 p-2">
        <button 
          @click="activeTab = 'form'" 
          class="tab-btn" 
          :class="{ active: activeTab === 'form' }"
        >
          📝 Buat Laporan Kerusakan
        </button>
        <button 
          @click="switchTabToStatus" 
          class="tab-btn" 
          :class="{ active: activeTab === 'status' }"
        >
          📋 Status Laporan Armada
          <span v-if="myReports.length > 0" class="tab-badge">{{ myReports.length }}</span>
        </button>
      </div>

      <!-- TAB 1: FORM LAPORAN KERUSAKAN -->
      <div v-if="activeTab === 'form'" class="card max-w-xl mx-auto">
        <div class="card-header-flex mb-4">
          <h2 class="card-title">📝 Formulir Laporan Kerusakan</h2>
          <span class="text-xs text-secondary">Nomor Armada: <strong class="text-primary">{{ form.no_armada }}</strong></span>
        </div>

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
                placeholder="Otomatis terisi" 
                readonly
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
              placeholder="Jelaskan secara detail kerusakan yang terjadi (misal: AC tidak dingin, rem bunyi berdecit, pintu hidrolik macet)" 
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
                <small v-else>Format: JPG, PNG. Kompresi otomatis aktif.</small>
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
            <span v-else>🚀 Kirim Laporan Kerusakan</span>
          </button>
        </form>
      </div>

      <!-- TAB 2: STATUS LAPORAN ARMADA -->
      <div v-else-if="activeTab === 'status'" class="status-tab-container">
        <!-- Status Header & Filters -->
        <div class="card mb-6 p-4">
          <div class="card-header-flex flex-wrap gap-3">
            <div>
              <h2 class="card-title">📋 Riwayat & Status Laporan Armada</h2>
              <p class="text-sm text-secondary">Pantau persetujuan operasional dan hasil perbaikan mekanik untuk armada <strong>{{ form.no_armada }}</strong>.</p>
            </div>
            <button @click="loadMyReports" class="btn btn-secondary btn-sm" :disabled="isLoadingReports">
              {{ isLoadingReports ? '🔄 Memperbarui...' : '🔄 Segarkan Status' }}
            </button>
          </div>

          <!-- Filter Pills -->
          <div class="filter-pills mt-4">
            <button 
              @click="statusFilter = 'Semua'" 
              class="pill-btn" 
              :class="{ active: statusFilter === 'Semua' }"
            >
              Semua ({{ myReports.length }})
            </button>
            <button 
              @click="statusFilter = 'Menunggu Verifikasi'" 
              class="pill-btn pill-pending" 
              :class="{ active: statusFilter === 'Menunggu Verifikasi' }"
            >
              ⏳ Menunggu Verifikasi ({{ countByStatus('Menunggu Verifikasi') }})
            </button>
            <button 
              @click="statusFilter = 'Diproses'" 
              class="pill-btn pill-processing" 
              :class="{ active: statusFilter === 'Diproses' }"
            >
              🛠️ Diproses ({{ countByStatus('Diproses') }})
            </button>
            <button 
              @click="statusFilter = 'Selesai'" 
              class="pill-btn pill-completed" 
              :class="{ active: statusFilter === 'Selesai' }"
            >
              ✅ Selesai ({{ countByStatus('Selesai') }})
            </button>
            <button 
              @click="statusFilter = 'Ditolak'" 
              class="pill-btn pill-rejected" 
              :class="{ active: statusFilter === 'Ditolak' }"
            >
              ❌ Ditolak ({{ countByStatus('Ditolak') }})
            </button>
          </div>
        </div>

        <!-- Reports List -->
        <div v-if="isLoadingReports" class="card text-center py-12">
          <div class="loader-lg mb-2"></div>
          <p class="text-secondary">Memuat data laporan armada...</p>
        </div>

        <div v-else-if="filteredMyReports.length === 0" class="card text-center py-12">
          <div class="empty-icon">📭</div>
          <h3 class="auth-title">Tidak Ada Laporan Ditemukan</h3>
          <p class="text-secondary mb-4">
            {{ statusFilter === 'Semua' 
              ? 'Belum ada riwayat laporan kerusakan untuk armada ' + form.no_armada + '.' 
              : 'Tidak ada laporan dengan status ' + statusFilter + '.' 
            }}
          </p>
          <button @click="activeTab = 'form'" class="btn btn-primary btn-sm">
            + Buat Laporan Baru Sekarang
          </button>
        </div>

        <div v-else class="report-cards-grid">
          <div 
            v-for="rep in filteredMyReports" 
            :key="rep.id" 
            class="card report-status-card"
            :class="'border-' + getStatusClassKey(rep.status)"
          >
            <!-- Card Header -->
            <div class="report-card-header">
              <div>
                <div class="report-id-row">
                  <span class="report-id">{{ rep.id }}</span>
                  <span class="report-date">{{ rep.hari_kerusakan }}, {{ rep.tanggal_kerusakan }}</span>
                </div>
                <div class="report-sopir-name">Pelapor: <strong>{{ rep.nama_sopir }}</strong></div>
              </div>
              <span class="badge" :class="getStatusBadgeClass(rep.status)">
                {{ rep.status }}
              </span>
            </div>

            <!-- Progress Step Bar -->
            <div class="status-stepper mt-4 mb-4">
              <div class="step-item completed">
                <div class="step-circle">1</div>
                <span class="step-label">Laporan Dikirim</span>
              </div>
              <div class="step-line" :class="{ active: rep.status !== 'Menunggu Verifikasi' }"></div>
              
              <div class="step-item" :class="{
                completed: rep.status === 'Diproses' || rep.status === 'Selesai',
                rejected: rep.status === 'Ditolak',
                active: rep.status === 'Menunggu Verifikasi'
              }">
                <div class="step-circle">
                  <span v-if="rep.status === 'Ditolak'">✕</span>
                  <span v-else>2</span>
                </div>
                <span class="step-label">
                  {{ rep.status === 'Ditolak' ? 'Ditolak Operasional' : 'Verifikasi Operasional' }}
                </span>
              </div>
              <div class="step-line" :class="{ active: rep.status === 'Diproses' || rep.status === 'Selesai' }"></div>
              
              <div class="step-item" :class="{
                completed: rep.status === 'Selesai',
                active: rep.status === 'Diproses',
                disabled: rep.status === 'Menunggu Verifikasi' || rep.status === 'Ditolak'
              }">
                <div class="step-circle">3</div>
                <span class="step-label">Perbaikan Mekanik</span>
              </div>
              <div class="step-line" :class="{ active: rep.status === 'Selesai' }"></div>
              
              <div class="step-item" :class="{
                completed: rep.status === 'Selesai',
                disabled: rep.status !== 'Selesai'
              }">
                <div class="step-circle">4</div>
                <span class="step-label">Selesai</span>
              </div>
            </div>

            <!-- Card Content Body -->
            <div class="report-card-body">
              <!-- Issue Description -->
              <div class="issue-box">
                <span class="box-label">Kerusakan yang Dilaporkan:</span>
                <p class="box-text">{{ rep.deskripsi }}</p>
              </div>

              <!-- Status Specific Callouts -->
              <!-- 1. Pending Verification -->
              <div v-if="rep.status === 'Menunggu Verifikasi'" class="status-box pending-box">
                <span class="status-box-icon">⏳</span>
                <div>
                  <strong>Menunggu Peninjauan</strong>
                  <p>Laporan Anda telah berhasil masuk ke sistem dan sedang menunggu verifikasi dari Tim Operasional.</p>
                </div>
              </div>

              <!-- 2. In Progress / Diproses -->
              <div v-else-if="rep.status === 'Diproses'" class="status-box processing-box">
                <span class="status-box-icon">🛠️</span>
                <div>
                  <strong>Laporan Disetujui - Sedang Ditangani</strong>
                  <p>Ditugaskan kepada Mekanik: <strong class="text-primary">{{ rep.nama_mekanik || 'Tim Mekanik' }}</strong></p>
                  <p v-if="rep.keterangan_pasca_penanganan" class="mt-1 text-xs text-secondary">
                    Catatan Mekanik: {{ rep.keterangan_pasca_penanganan }}
                  </p>
                </div>
              </div>

              <!-- 3. Completed / Selesai -->
              <div v-else-if="rep.status === 'Selesai'" class="status-box completed-box">
                <span class="status-box-icon">✅</span>
                <div>
                  <strong>Perbaikan Selesai & Berhasil Divalidasi</strong>
                  <p v-if="rep.nama_mekanik">Ditangani oleh: <strong>{{ rep.nama_mekanik }}</strong></p>
                  <p v-if="rep.keterangan_hasil_perbaikan" class="mt-1">
                    Hasil: <em>"{{ rep.keterangan_hasil_perbaikan }}"</em>
                  </p>
                  <small v-if="rep.waktu_selesai" class="text-xs text-secondary block mt-1">
                    ⏱️ Waktu Selesai: {{ formatDateTime(rep.waktu_selesai) }}
                  </small>
                </div>
              </div>

              <!-- 4. Rejected / Ditolak -->
              <div v-else-if="rep.status === 'Ditolak'" class="status-box rejected-box">
                <span class="status-box-icon">❌</span>
                <div>
                  <strong>Laporan Ditolak oleh Tim Operasional</strong>
                  <p>Alasan: <em>{{ rep.catatan_operasional || 'Laporan tidak memenuhi kriteria penanganan armada.' }}</em></p>
                </div>
              </div>

              <!-- Photos Gallery -->
              <div class="photos-section mt-4">
                <span class="box-label mb-2 block">Dokumentasi Foto:</span>
                <div class="photos-row">
                  <!-- Foto Awal -->
                  <div class="photo-card" @click="openPhotoZoom(rep.foto_sebelum)">
                    <img :src="rep.foto_sebelum" alt="Foto Kerusakan Awal" class="photo-img" />
                    <span class="photo-tag">Foto Awal Kerusakan</span>
                  </div>

                  <!-- Foto Pasca Penanganan (jika ada) -->
                  <div v-if="rep.foto_pasca_penanganan" class="photo-card" @click="openPhotoZoom(rep.foto_pasca_penanganan)">
                    <img :src="rep.foto_pasca_penanganan" alt="Pasca Penanganan" class="photo-img" />
                    <span class="photo-tag">Pasca Penanganan</span>
                  </div>

                  <!-- Foto Selesai (jika ada) -->
                  <div v-if="rep.foto_hasil_perbaikan" class="photo-card" @click="openPhotoZoom(rep.foto_hasil_perbaikan)">
                    <img :src="rep.foto_hasil_perbaikan" alt="Hasil Selesai" class="photo-img" />
                    <span class="photo-tag tag-success">Hasil Selesai</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Zoom Lightbox Modal -->
    <div v-if="zoomedPhotoUrl" class="modal-overlay" @click.self="zoomedPhotoUrl = null">
      <div class="lightbox-content">
        <img :src="zoomedPhotoUrl" alt="Zoomed Foto Kerusakan" class="lightbox-img" />
        <button @click="zoomedPhotoUrl = null" class="btn btn-secondary btn-sm lightbox-close">✕ Tutup Tampilan</button>
      </div>
    </div>

    <!-- Success Toast -->
    <div v-if="toast.show" class="toast">
      <span>{{ toast.message }}</span>
    </div>
  </div>
  

</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useReports } from '~/composables/useReports'

const { createReport, uploadPhoto, fetchReports } = useReports()

useHead({
  title: 'Portal Sopir - Trans Jateng',
  meta: [
    { name: 'description', content: 'Kirim laporan kerusakan dan pantau status perbaikan armada secara real-time.' }
  ]
})

// Authentication State
const isAuthenticated = ref(false)
const pinInput = ref('')
const authError = ref(false)
const pinInputRef = ref(null)

// Tab state: 'form' | 'status'
const activeTab = ref('form')

// Helper to validate hull number from "lambung 01" to "lambung 14" (or just 1 to 14)
const validateLambung = (input) => {
  const cleaned = input.trim().toLowerCase()
  const match = cleaned.match(/^(?:lambung\s*|lambung-?)?(0?[1-9]|1[0-4])$/)
  if (match) {
    return parseInt(match[1], 10)
  }
  return null
}

const verifyPIN = () => {
  const lambungNum = validateLambung(pinInput.value)
  if (lambungNum !== null) {
    isAuthenticated.value = true
    authError.value = false
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('transjateng_sopir_authed', 'true')
      sessionStorage.setItem('transjateng_sopir_lambung', lambungNum.toString())
    }
    // Auto-fill armada number
    form.no_armada = 'TJ-' + String(lambungNum).padStart(3, '0')
    pinInput.value = ''
    loadMyReports()
  } else {
    authError.value = true
    pinInput.value = ''
  }
}

const logout = () => {
  isAuthenticated.value = false
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('transjateng_sopir_authed')
    sessionStorage.removeItem('transjateng_sopir_lambung')
  }
  // Reset Form
  form.nama_sopir = ''
  form.no_armada = ''
  form.tanggal_kerusakan = getTodayDateString()
  form.deskripsi = ''
  imageFile.value = null
  previewUrl.value = null
  compressionStats.value = ''
  allReports.value = []
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

// Reports state for driver's bus
const allReports = ref([])
const isLoadingReports = ref(false)
const statusFilter = ref('Semua')
const zoomedPhotoUrl = ref(null)

const openPhotoZoom = (url) => {
  if (url) {
    zoomedPhotoUrl.value = url
  }
}

const loadMyReports = async () => {
  isLoadingReports.value = true
  try {
    const data = await fetchReports()
    allReports.value = data || []
  } catch (err) {
    console.error('Error fetching reports for driver:', err)
  } finally {
    isLoadingReports.value = false
  }
}

const switchTabToStatus = () => {
  activeTab.value = 'status'
  loadMyReports()
}

const myReports = computed(() => {
  if (!form.no_armada) return []
  return allReports.value.filter(r => r.no_armada === form.no_armada)
})

const countByStatus = (st) => {
  return myReports.value.filter(r => r.status === st).length
}

const filteredMyReports = computed(() => {
  if (statusFilter.value === 'Semua') {
    return myReports.value
  }
  return myReports.value.filter(r => r.status === statusFilter.value)
})

const getStatusClassKey = (status) => {
  switch (status) {
    case 'Menunggu Verifikasi': return 'pending'
    case 'Diproses': return 'processing'
    case 'Selesai': return 'completed'
    case 'Ditolak': return 'rejected'
    default: return 'pending'
  }
}

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'Menunggu Verifikasi': return 'badge-pending'
    case 'Diproses': return 'badge-processing'
    case 'Selesai': return 'badge-completed'
    case 'Ditolak': return 'badge-rejected'
    default: return 'badge-pending'
  }
}

const formatDateTime = (isoStr) => {
  if (!isoStr) return '-'
  try {
    return new Date(isoStr).toLocaleString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (e) {
    return isoStr
  }
}

onMounted(() => {
  form.tanggal_kerusakan = getTodayDateString()
  if (typeof window !== 'undefined') {
    const isAuthed = sessionStorage.getItem('transjateng_sopir_authed')
    if (isAuthed === 'true') {
      isAuthenticated.value = true
      const lambung = sessionStorage.getItem('transjateng_sopir_lambung')
      if (lambung) {
        form.no_armada = 'TJ-' + String(lambung).padStart(3, '0')
        loadMyReports()
      }
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
      img.onerror = (e) => reject(e)
    }
    reader.onerror = (e) => reject(e)
  })
}

const handleFileChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  previewUrl.value = URL.createObjectURL(file)
  
  const originalSizeKb = (file.size / 1024).toFixed(1)
  compressionStats.value = 'Mengompresi foto (' + originalSizeKb + ' KB)...'

  try {
    const compressed = await compressImage(file)
    imageFile.value = compressed
    const compressedSizeKb = (compressed.size / 1024).toFixed(1)
    compressionStats.value = 'Foto terkompresi: ' + originalSizeKb + ' KB → ' + compressedSizeKb + ' KB'
    previewUrl.value = URL.createObjectURL(compressed)
  } catch (err) {
    console.error('Image compression failed, using original file:', err)
    imageFile.value = file
    compressionStats.value = 'Gagal kompresi. Menggunakan ukuran asli (' + originalSizeKb + ' KB)'
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

    showToast('Laporan kerusakan berhasil dikirim! Menampilkan status armada...')
    
    // Reset Form fields
    form.nama_sopir = ''
    form.tanggal_kerusakan = getTodayDateString()
    form.deskripsi = ''
    imageFile.value = null
    previewUrl.value = null
    compressionStats.value = ''

    // Refresh reports list and switch to Status Tab
    await loadMyReports()
    activeTab.value = 'status'
    
  } catch (err) {
    console.error(err)
    showToast('Terjadi kesalahan saat mengirim laporan. Silakan coba lagi.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.form-control[readonly] {
  background-color: var(--border-glass);
  cursor: not-allowed;
  opacity: 0.8;
}
.portal-logo-wrapper {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.portal-logo-img {
  width: 100%;
  max-width: 220px;
  height: auto;
  object-fit: contain;
}
.title-with-badge {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.badge-bus {
  background: rgba(249, 115, 22, 0.15);
  color: var(--primary);
  border: 1px solid rgba(249, 115, 22, 0.3);
  font-size: 0.95rem;
  padding: 0.35rem 0.85rem;
}

.tabs-nav {
  display: flex;
  gap: 0.5rem;
  background: var(--bg-secondary);
}
.tab-btn {
  flex: 1;
  padding: 0.75rem 1rem;
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 0.95rem;
  border-radius: var(--radius-sm);
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
.tab-btn:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.03);
}
.tab-btn.active {
  background: var(--primary);
  color: #fff;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.2);
}
.tab-badge {
  background: rgba(255, 255, 255, 0.25);
  padding: 0.1rem 0.45rem;
  border-radius: 50px;
  font-size: 0.75rem;
}

/* Filter Pills */
.filter-pills {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.pill-btn {
  padding: 0.4rem 0.85rem;
  border-radius: 50px;
  border: 1px solid var(--border-glass);
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  font-size: 0.825rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-fast);
}
.pill-btn:hover {
  border-color: var(--primary);
  color: var(--text-primary);
}
.pill-btn.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}
.pill-pending.active {
  background: #f59e0b;
  border-color: #f59e0b;
}
.pill-processing.active {
  background: #3b82f6;
  border-color: #3b82f6;
}
.pill-completed.active {
  background: #10b981;
  border-color: #10b981;
}
.pill-rejected.active {
  background: #ef4444;
  border-color: #ef4444;
}

/* Report Status Cards */
.report-cards-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.report-status-card {
  border-left: 5px solid var(--border-glass);
  transition: transform var(--transition-fast), border-color var(--transition-fast);
}
.border-pending {
  border-left-color: #f59e0b;
}
.border-processing {
  border-left-color: #3b82f6;
}
.border-completed {
  border-left-color: #10b981;
}
.border-rejected {
  border-left-color: #ef4444;
}

.report-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid var(--border-glass);
  padding-bottom: 1rem;
}
.report-id-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.25rem;
}
.report-id {
  font-family: monospace;
  font-weight: 700;
  font-size: 1rem;
  color: var(--primary);
}
.report-date {
  font-size: 0.85rem;
  color: var(--text-secondary);
}
.report-sopir-name {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

/* Stepper Progress Bar */
.status-stepper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0.5rem;
  background: var(--bg-tertiary);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-glass);
}
.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  text-align: center;
  flex: 1;
}
.step-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--bg-secondary);
  border: 2px solid var(--border-glass);
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  transition: var(--transition-fast);
}
.step-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 500;
}
.step-line {
  height: 2px;
  flex: 1;
  background: var(--border-glass);
  margin-bottom: 1.25rem;
  transition: var(--transition-fast);
}
.step-line.active {
  background: var(--primary);
}

.step-item.completed .step-circle {
  background: #10b981;
  border-color: #10b981;
  color: white;
}
.step-item.completed .step-label {
  color: #10b981;
  font-weight: 600;
}

.step-item.active .step-circle {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
  box-shadow: 0 0 10px var(--primary-glow);
}
.step-item.active .step-label {
  color: var(--primary);
  font-weight: 700;
}

.step-item.rejected .step-circle {
  background: #ef4444;
  border-color: #ef4444;
  color: white;
}
.step-item.rejected .step-label {
  color: #ef4444;
  font-weight: 600;
}

/* Body and Callouts */
.issue-box {
  background: var(--bg-secondary);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-md);
  padding: 1rem;
  margin-bottom: 1rem;
}
.box-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-weight: 600;
}
.box-text {
  font-size: 0.95rem;
  color: var(--text-primary);
  margin-top: 0.25rem;
  white-space: pre-wrap;
}

.status-box {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: var(--radius-md);
  margin-bottom: 1rem;
  font-size: 0.9rem;
}
.status-box-icon {
  font-size: 1.25rem;
}
.pending-box {
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.25);
  color: #fbbf24;
}
.pending-box p {
  color: var(--text-primary);
  font-size: 0.85rem;
  margin-top: 0.2rem;
}
.processing-box {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.25);
  color: #60a5fa;
}
.processing-box p {
  color: var(--text-primary);
  font-size: 0.85rem;
  margin-top: 0.2rem;
}
.completed-box {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.25);
  color: #34d399;
}
.completed-box p {
  color: var(--text-primary);
  font-size: 0.85rem;
  margin-top: 0.2rem;
}
.rejected-box {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.25);
  color: #f87171;
}
.rejected-box p {
  color: var(--text-primary);
  font-size: 0.85rem;
  margin-top: 0.2rem;
}

/* Photos Section */
.photos-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
}
.photo-card {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border-glass);
  cursor: pointer;
  background: var(--bg-secondary);
  transition: transform var(--transition-fast), border-color var(--transition-fast);
}
.photo-card:hover {
  transform: scale(1.03);
  border-color: var(--primary);
}
.photo-img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  display: block;
}
.photo-tag {
  display: block;
  font-size: 0.75rem;
  text-align: center;
  padding: 0.35rem 0.5rem;
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  font-weight: 600;
}
.tag-success {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
}

/* Lightbox Modal */
.lightbox-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.lightbox-img {
  max-width: 100%;
  max-height: 80vh;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  object-fit: contain;
}
.lightbox-close {
  align-self: center;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}
.py-12 {
  padding-top: 3rem;
  padding-bottom: 3rem;
}
.block {
  display: block;
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
  max-width: 650px;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.mb-4 {
  margin-bottom: 1rem;
}
.mb-6 {
  margin-bottom: 1.5rem;
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
.text-sm {
  font-size: 0.875rem;
}
.text-primary {
  color: var(--primary);
}
.text-secondary {
  color: var(--text-secondary);
}
.text-orange-500 {
  color: var(--primary);
}
.font-medium {
  font-weight: 500;
}
.font-bold {
  font-weight: 700;
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
.loader-lg {
  border: 3px solid var(--border-glass);
  border-top: 3px solid var(--primary);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  animation: spin 0.8s linear infinite;
  display: inline-block;
  margin: 0 auto;
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
  .status-stepper {
    flex-direction: column;
    gap: 0.75rem;
    align-items: stretch;
  }
  .step-line {
    display: none;
  }
  .step-item {
    flex-direction: row;
    text-align: left;
    gap: 0.75rem;
  }
  .filter-pills {
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: 0.5rem;
  }
  .pill-btn {
    white-space: nowrap;
  }
}

/* ==========================================================================
   Full Page Animated Road Login (Sopir Theme)
   ========================================================================== */
.sopir-page-root {
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
  background: #080c14;
}

:root.light .auth-fullscreen-page {
  background: #e0f2fe;
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

.moving-dashes {
  animation: dashForward 1s linear infinite;
}

.anim-clouds {
  animation: floatClouds 25s linear infinite alternate;
}

.anim-cruising-bus {
  animation: busCruising 3.5s ease-in-out infinite;
}

@keyframes dashForward {
  0% { stroke-dashoffset: 80; }
  100% { stroke-dashoffset: 0; }
}

@keyframes floatClouds {
  0% { transform: translateX(0); }
  100% { transform: translateX(-80px); }
}

@keyframes busCruising {
  0% { transform: translate(860px, 480px) translateY(0); }
  50% { transform: translate(860px, 480px) translateY(-5px); }
  100% { transform: translate(860px, 480px) translateY(0); }
}
</style>
