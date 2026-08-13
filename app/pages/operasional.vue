<template>
  <div class="container fade-in-up">
    <!-- PIN Auth Screen -->
    <div v-if="!isAuthenticated" class="card max-w-sm mx-auto my-12 text-center">
      <div class="lock-icon">🔒</div>
      <h2 class="auth-title">Akses Khusus Operasional</h2>
      <p class="auth-desc">Masukkan username dan PIN Operasional untuk mengakses halaman ini.</p>
      
      <form @submit.prevent="verifyPIN" class="auth-form">
        <div class="form-group">
          <input 
            v-model="usernameInput" 
            type="text" 
            class="form-control text-center" 
            placeholder="Username Operasional" 
            required 
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

    <!-- Main Dashboard Screen -->
    <div v-else>
      <div class="page-header">
        <div>
          <h1 class="page-title">Dashboard Operasional</h1>
          <p class="page-subtitle">Kelola verifikasi, penugasan mekanik, dan pantau status perbaikan armada.</p>
        </div>
        <div class="header-actions">
          <button @click="logout" class="btn btn-danger btn-sm">Keluar</button>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="stat-grid">
        <div class="stat-card">
          <div class="stat-icon-wrapper bg-blue-500/10 text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
          <div>
            <div class="stat-value">{{ reports.length }}</div>
            <div class="stat-label">Total Laporan</div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon-wrapper bg-amber-500/10 text-amber-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div>
            <div class="stat-value">{{ countByStatus('Menunggu Verifikasi') }}</div>
            <div class="stat-label">Menunggu Verifikasi</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrapper bg-sky-500/10 text-sky-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
          </div>
          <div>
            <div class="stat-value">{{ countByStatus('Diproses') }}</div>
            <div class="stat-label">Sedang Diproses</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon-wrapper bg-emerald-500/10 text-emerald-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <div>
            <div class="stat-value">{{ countByStatus('Selesai') }}</div>
            <div class="stat-label">Selesai Diperbaiki</div>
          </div>
        </div>
      </div>

      <!-- Filters & Refresh -->
      <div class="filter-bar card mb-6">
        <div class="filter-left">
          <span class="filter-label">Filter Status:</span>
          <div class="chip-container">
            <button 
              v-for="status in statusFilters" 
              :key="status"
              @click="activeFilter = status"
              class="chip-btn"
              :class="{ active: activeFilter === status }"
            >
              {{ status }}
            </button>
          </div>
        </div>
        <button @click="loadData" class="btn btn-secondary btn-sm" :disabled="isLoading">
          <span :class="{ 'spin-animation': isLoading }" style="display: inline-block; margin-right: 4px;">🔄</span>
          {{ isLoading ? 'Memuat...' : 'Segarkan Data' }}
        </button>
      </div>

      <!-- Reports List / Table -->
      <div v-if="isLoading" class="text-center py-12">
        <div class="spinner"></div>
        <p class="text-secondary mt-4">Memuat data laporan...</p>
      </div>

      <div v-else-if="filteredReports.length === 0" class="card text-center py-12 text-secondary">
        📭 Tidak ada laporan dengan status "{{ activeFilter }}"
      </div>

      <div v-else class="report-grid">
        <div v-for="rep in filteredReports" :key="rep.id" class="card report-card">
          <!-- Card Header -->
          <div class="report-card-header">
            <div class="armada-badge">🚌 {{ rep.no_armada }}</div>
            <span class="badge" :class="getStatusBadgeClass(rep.status)">
              {{ rep.status }}
            </span>
          </div>

          <!-- Card Info -->
          <h3 class="report-card-title">Laporan {{ rep.id }}</h3>
          <p class="report-card-meta">
            Pelapor: <strong>{{ rep.nama_sopir }}</strong> | 
            Tanggal Rusak: <span>{{ formatDate(rep.tanggal_kerusakan) }} ({{ rep.hari_kerusakan }})</span>
          </p>
          
          <p class="report-card-desc">{{ rep.deskripsi }}</p>

          <!-- Foto Sebelum Penanganan -->
          <div class="report-media-section" @click="openImageModal(rep.foto_sebelum, 'Foto Sebelum Perbaikan')">
            <img :src="rep.foto_sebelum" alt="Foto Sebelum" class="report-card-thumbnail" />
            <div class="media-overlay">🔍 Lihat Foto Awal</div>
          </div>

          <!-- Section Tindakan Mekanik (Jika ada) -->
          <div v-if="rep.nama_mekanik" class="mechanic-details">
            <p class="detail-row">🔧 <strong>Mekanik Ditugaskan:</strong> {{ rep.nama_mekanik }}</p>
            
            <!-- Pasca Penanganan -->
            <div v-if="rep.keterangan_pasca_penanganan" class="nested-status-box">
              <span class="box-title">🛠️ Tindakan Awal (Pasca Penanganan):</span>
              <p class="box-text">{{ rep.keterangan_pasca_penanganan }}</p>
              <div v-if="rep.foto_pasca_penanganan" class="media-link" @click="openImageModal(rep.foto_pasca_penanganan, 'Foto Pasca Penanganan')">
                🖼️ Lihat Foto Penanganan
              </div>
            </div>

            <!-- Hasil Perbaikan -->
            <div v-if="rep.keterangan_hasil_perbaikan" class="nested-status-box success-border">
              <span class="box-title text-emerald-500">✅ Hasil Akhir Perbaikan:</span>
              <p class="box-text">{{ rep.keterangan_hasil_perbaikan }}</p>
              <div v-if="rep.foto_hasil_perbaikan" class="media-link" @click="openImageModal(rep.foto_hasil_perbaikan, 'Foto Hasil Perbaikan')">
                🖼️ Lihat Foto Hasil Akhir
              </div>
              <small class="text-xs text-muted" v-if="rep.waktu_selesai">
                Diselesaikan pada: {{ formatDateWithTime(rep.waktu_selesai) }}
              </small>
            </div>
          </div>

          <!-- Catatan Penolakan (Jika ditolak) -->
          <div v-if="rep.status === 'Ditolak' && rep.catatan_operasional" class="nested-status-box danger-border">
            <span class="box-title text-red-500">❌ Alasan Ditolak:</span>
            <p class="box-text">{{ rep.catatan_operasional }}</p>
          </div>

          <!-- Actions (Hanya jika berstatus Menunggu Verifikasi) -->
          <div v-if="rep.status === 'Menunggu Verifikasi'" class="card-actions-row">
            <button @click="triggerApprove(rep)" class="btn btn-primary btn-sm flex-1">
              ✓ Setujui & Tugaskan
            </button>
            <button @click="triggerReject(rep)" class="btn btn-danger btn-sm flex-1">
              ✕ Tolak Laporan
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <!-- 1. Modal Setujui & Tugaskan Mekanik -->
    <div v-if="modalApprove.show" class="modal-overlay">
      <div class="modal-content">
        <h3 class="modal-title">✓ Setujui Laporan & Tugaskan Mekanik</h3>
        <p class="modal-desc">
          Laporan ID: {{ modalApprove.report?.id }} (Armada: {{ modalApprove.report?.no_armada }})
        </p>

        <form @submit.prevent="submitApproval">
          <div class="form-group">
            <label class="form-label" for="namaMekanik">Nama Mekanik</label>
            <select 
              v-model="modalApprove.nama_mekanik" 
              id="namaMekanik" 
              class="form-control" 
              required
            >
              <option value="" disabled>-- Pilih Mekanik --</option>
              <option v-for="mech in mechanicsList" :key="mech.id" :value="mech.username">
                {{ mech.username }}
              </option>
            </select>
          </div>
          <div class="modal-buttons">
            <button type="button" @click="modalApprove.show = false" class="btn btn-secondary flex-1">Batal</button>
            <button type="submit" class="btn btn-primary flex-1" :disabled="isActionPending">Setujui & Kirim</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 2. Modal Tolak Laporan -->
    <div v-if="modalReject.show" class="modal-overlay">
      <div class="modal-content">
        <h3 class="modal-title">✕ Tolak Laporan Kerusakan</h3>
        <p class="modal-desc">
          Laporan ID: {{ modalReject.report?.id }} (Armada: {{ modalReject.report?.no_armada }})
        </p>

        <form @submit.prevent="submitRejection">
          <div class="form-group">
            <label class="form-label" for="catatanOperasional">Alasan Penolakan</label>
            <textarea 
              v-model="modalReject.catatan_operasional" 
              id="catatanOperasional" 
              rows="3" 
              class="form-control" 
              placeholder="Sebutkan alasan penolakan laporan ini secara jelas..." 
              required
            ></textarea>
          </div>
          <div class="modal-buttons">
            <button type="button" @click="modalReject.show = false" class="btn btn-secondary flex-1">Batal</button>
            <button type="submit" class="btn btn-accent flex-1" :disabled="isActionPending">Tolak Laporan</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 3. Modal Image Viewer -->
    <div v-if="modalImage.show" class="modal-overlay" @click="modalImage.show = false">
      <div class="modal-content max-w-lg p-2" @click.stop>
        <div class="modal-image-header">
          <h4 class="font-semibold text-white">{{ modalImage.title }}</h4>
          <button @click="modalImage.show = false" class="close-btn">&times;</button>
        </div>
        <img :src="modalImage.url" class="modal-img-large" />
      </div>
    </div>

    <!-- Notification Toast -->
    <div v-if="toast.show" class="toast">
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { useReports } from '~/composables/useReports'

const { fetchReports, updateReport, fetchUsers, authenticateUser } = useReports()
const mechanicsList = ref([])
const usernameInput = ref('')
const loggedInName = ref('')

const loadMechanics = async () => {
  try {
    const list = await fetchUsers()
    mechanicsList.value = list.filter(u => u.role === 'Mekanik')
  } catch (err) {
    console.error('Failed to load mechanics:', err)
  }
}

useHead({
  title: 'Dashboard Operasional - Trans Jateng',
  meta: [
    { name: 'description', content: 'Manajemen dan verifikasi laporan kerusakan bus.' }
  ]
})

// Authentication State
const isAuthenticated = ref(false)
const pinInput = ref('')
const authError = ref(false)
const pinInputRef = ref(null)

onMounted(() => {
  if (typeof window !== 'undefined') {
    const isAuthed = sessionStorage.getItem('transjateng_operasional_authed')
    if (isAuthed === 'true') {
      isAuthenticated.value = true
      loggedInName.value = sessionStorage.getItem('transjateng_operasional_nama') || ''
      loadData()
      loadMechanics()
    } else {
      setTimeout(() => {
        pinInputRef.value?.focus()
      }, 200)
    }
  }
})

const verifyPIN = async () => {
  try {
    const user = await authenticateUser(usernameInput.value, pinInput.value, 'Operasional')
    if (user) {
      isAuthenticated.value = true
      authError.value = false
      loggedInName.value = user.username
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('transjateng_operasional_authed', 'true')
        sessionStorage.setItem('transjateng_operasional_nama', user.username)
      }
      loadData()
      loadMechanics()
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
    sessionStorage.removeItem('transjateng_operasional_authed')
    sessionStorage.removeItem('transjateng_operasional_nama')
  }
}

// Data Loading & Filter State
const reports = ref([])
const isLoading = ref(false)
const isActionPending = ref(false)

const statusFilters = ['Semua', 'Menunggu Verifikasi', 'Diproses', 'Selesai', 'Ditolak']
const activeFilter = ref('Semua')

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

const loadData = async () => {
  isLoading.value = true
  // Artificial delay 600ms for a satisfying loading visual effect
  await new Promise(resolve => setTimeout(resolve, 600))
  try {
    reports.value = await fetchReports()
  } catch (err) {
    console.error(err)
    showToast('Gagal memuat data laporan.')
  } finally {
    isLoading.value = false
  }
}

const countByStatus = (statusName) => {
  return reports.value.filter(r => r.status === statusName).length
}

const filteredReports = computed(() => {
  if (activeFilter.value === 'Semua') {
    return reports.value
  }
  return reports.value.filter(r => r.status === activeFilter.value)
})

// Modals State
const modalApprove = reactive({
  show: false,
  report: null,
  nama_mekanik: ''
})

const modalReject = reactive({
  show: false,
  report: null,
  catatan_operasional: ''
})

const modalImage = reactive({
  show: false,
  url: '',
  title: ''
})

const triggerApprove = (report) => {
  modalApprove.report = report
  modalApprove.nama_mekanik = ''
  modalApprove.show = true
}

const triggerReject = (report) => {
  modalReject.report = report
  modalReject.catatan_operasional = ''
  modalReject.show = true
}

const openImageModal = (url, title) => {
  modalImage.url = url
  modalImage.title = title
  modalImage.show = true
}

// Submit Actions
const submitApproval = async () => {
  if (!modalApprove.nama_mekanik.trim() || isActionPending.value) return
  
  isActionPending.value = true
  const repId = modalApprove.report.id

  try {
    await updateReport(repId, {
      status: 'Diproses',
      nama_mekanik: modalApprove.nama_mekanik.trim()
    })
    
    showToast(`Laporan ${repId} berhasil disetujui. Mekanik ditugaskan.`)
    modalApprove.show = false
    await loadData()
  } catch (err) {
    console.error(err)
    showToast('Gagal memperbarui status laporan.')
  } finally {
    isActionPending.value = false
  }
}

const submitRejection = async () => {
  if (!modalReject.catatan_operasional.trim() || isActionPending.value) return
  
  isActionPending.value = true
  const repId = modalReject.report.id

  try {
    await updateReport(repId, {
      status: 'Ditolak',
      catatan_operasional: modalReject.catatan_operasional.trim()
    })
    
    showToast(`Laporan ${repId} berhasil ditolak dengan alasan.`)
    modalReject.show = false
    await loadData()
  } catch (err) {
    console.error(err)
    showToast('Gagal menolak laporan.')
  } finally {
    isActionPending.value = false
  }
}

// Helpers
const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'Menunggu Verifikasi': return 'badge-pending'
    case 'Diproses': return 'badge-processing'
    case 'Selesai': return 'badge-completed'
    case 'Ditolak': return 'badge-rejected'
    default: return ''
  }
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
.mb-4 {
  margin-bottom: 1rem;
}
.mb-6 {
  margin-bottom: 1.5rem;
}
.header-actions {
  display: flex;
  align-items: center;
}
.bg-blue-500\/10 { background: rgba(59, 130, 246, 0.1); }
.text-blue-500 { color: #3b82f6; }
.bg-amber-500\/10 { background: rgba(245, 158, 11, 0.1); }
.text-amber-500 { color: #f59e0b; }
.bg-sky-500\/10 { background: rgba(14, 165, 233, 0.1); }
.text-sky-500 { color: #0ea5e9; }
.bg-emerald-500\/10 { background: rgba(16, 185, 129, 0.1); }
.text-emerald-500 { color: #10b981; }

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

.report-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.5rem;
  margin-bottom: 4rem;
}
.report-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--bg-glass);
}
.report-card:hover {
  transform: translateY(-4px);
}
.report-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.armada-badge {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--text-primary);
}
.report-card-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
}
.report-card-meta {
  font-size: 0.85rem;
  color: var(--text-secondary);
}
.report-card-meta strong {
  color: var(--text-primary);
}
.report-card-desc {
  font-size: 0.95rem;
  color: var(--text-primary);
  line-height: 1.5;
  background: var(--bg-primary);
  padding: 0.75rem 1rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-glass);
}

.report-media-section {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  height: 150px;
  border: 1px solid var(--border-glass);
  cursor: pointer;
}
.report-card-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-fast);
}
.media-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(9, 13, 22, 0.7);
  padding: 0.5rem;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 600;
  color: #fff;
  opacity: 0;
  transform: translateY(10px);
  transition: var(--transition-fast);
}
.report-media-section:hover .media-overlay {
  opacity: 1;
  transform: translateY(0);
}
.report-media-section:hover .report-card-thumbnail {
  transform: scale(1.05);
}

.mechanic-details {
  border-top: 1px solid var(--border-glass);
  padding-top: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.detail-row {
  font-size: 0.9rem;
}

.nested-status-box {
  background: var(--bg-primary);
  border-left: 3px solid var(--status-processing);
  padding: 0.75rem;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  border: 1px solid var(--border-glass);
  border-left-width: 3px;
}
.nested-status-box.success-border {
  border-left-color: var(--status-completed);
}
.nested-status-box.danger-border {
  border-left-color: var(--status-rejected);
}
.box-title {
  font-size: 0.8rem;
  font-weight: 700;
  display: block;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
}
.box-text {
  font-size: 0.85rem;
  color: var(--text-primary);
  line-height: 1.4;
}
.media-link {
  font-size: 0.8rem;
  color: var(--primary);
  cursor: pointer;
  margin-top: 0.5rem;
  display: inline-flex;
  align-items: center;
  font-weight: 600;
}
.media-link:hover {
  text-decoration: underline;
}

.card-actions-row {
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(--border-glass);
}
.flex-1 {
  flex: 1;
}

/* Modals Custom Styles */
.modal-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}
.modal-desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}
.modal-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}
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

@media (max-width: 640px) {
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
</style>
