<template>
  <div class="container fade-in-up">
    <!-- Auth Screen -->
    <div v-if="!isAuthenticated" class="card max-w-sm mx-auto my-12 text-center">
      <div class="lock-icon">🔒</div>
      <h2 class="auth-title">Akses Portal Admin</h2>
      <p class="auth-desc">Masukkan PIN Admin untuk mengakses dashboard manajemen.</p>
      
      <form @submit.prevent="verifyPIN" class="auth-form">
        <div class="form-group">
          <input 
            v-model="pinInput" 
            type="password" 
            class="form-control text-center" 
            placeholder="Ketik PIN Admin" 
            required 
            ref="pinInputRef"
          />
        </div>
        <p v-if="authError" class="error-text text-sm mb-4">❌ PIN salah. Silakan coba lagi.</p>
        <button type="submit" class="btn btn-primary w-full">Masuk Dashboard</button>
      </form>
      <NuxtLink to="/" class="btn btn-secondary w-full mt-4">&larr; Kembali ke Beranda</NuxtLink>
    </div>

    <!-- Main Dashboard Screen -->
    <div v-else>
      <!-- Header -->
      <div class="page-header">
        <div>
          <NuxtLink to="/" class="btn btn-secondary btn-sm mb-2">&larr; Kembali ke Beranda</NuxtLink>
          <h1 class="page-title">Dashboard Admin</h1>
          <p class="page-subtitle">Kelola pengguna login, analisis tren kerusakan, dan cetak laporan PDF bulanan.</p>
        </div>
        <div class="header-actions">
          <button @click="logout" class="btn btn-danger btn-sm">Keluar</button>
        </div>
      </div>

      <!-- Tabs Navigation -->
      <div class="tabs-nav card mb-6 p-2">
        <button 
          @click="activeTab = 'users'" 
          class="tab-btn" 
          :class="{ active: activeTab === 'users' }"
        >
          👤 Kelola Pengguna
        </button>
        <button 
          @click="activeTab = 'analytics'" 
          class="tab-btn" 
          :class="{ active: activeTab === 'analytics' }"
        >
          📈 Analitik & Grafik
        </button>
        <button 
          @click="activeTab = 'reports'" 
          class="tab-btn" 
          :class="{ active: activeTab === 'reports' }"
        >
          📄 Cetak Laporan PDF
        </button>
      </div>

      <!-- Content Tab 1: User Management -->
      <div v-if="activeTab === 'users'" class="card p-6">
        <div class="card-header-flex">
          <h2 class="card-title">👤 Kredensial Pengguna</h2>
          <button @click="openAddUserModal" class="btn btn-primary btn-sm">+ Tambah Pengguna</button>
        </div>

        <div class="table-container mt-4">
          <table class="data-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Role</th>
                <th>PIN / Sandi</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in usersList" :key="user.id">
                <td><strong>{{ user.username }}</strong></td>
                <td><span class="role-tag" :class="user.role.toLowerCase()">{{ user.role }}</span></td>
                <td><code>{{ user.pin }}</code></td>
                <td>
                  <div class="action-buttons-cell">
                    <button @click="openEditUserModal(user)" class="btn btn-secondary btn-sm">✏️ Edit</button>
                    <button @click="handleDeleteUser(user)" class="btn btn-danger btn-sm" :disabled="user.username === 'admin'">🗑️ Hapus</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Content Tab 2: Analytics & Graphs -->
      <div v-else-if="activeTab === 'analytics'">
        <!-- Stats Grid -->
        <div class="stat-grid mb-6">
          <div class="stat-card">
            <div class="stat-icon-wrapper bg-slate-500/10 text-slate-300">📄</div>
            <div>
              <div class="stat-value">{{ reports.length }}</div>
              <div class="stat-label">Total Laporan</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon-wrapper bg-amber-500/10 text-amber-500">⏳</div>
            <div>
              <div class="stat-value">{{ countByStatus('Menunggu Verifikasi') }}</div>
              <div class="stat-label">Menunggu Verifikasi</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon-wrapper bg-sky-500/10 text-sky-500">🛠️</div>
            <div>
              <div class="stat-value">{{ countByStatus('Diproses') }}</div>
              <div class="stat-label">Dalam Proses</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon-wrapper bg-emerald-500/10 text-emerald-500">✅</div>
            <div>
              <div class="stat-value">{{ countByStatus('Selesai') }}</div>
              <div class="stat-label">Selesai Perbaikan</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon-wrapper bg-red-500/10 text-red-500">❌</div>
            <div>
              <div class="stat-value">{{ countByStatus('Ditolak') }}</div>
              <div class="stat-label">Laporan Ditolak</div>
            </div>
          </div>
        </div>

        <div class="card col-span-2">
          <div class="card-header-flex">
            <h2 class="card-title">📈 Frekuensi Kerusakan Bulanan</h2>
            <div class="year-selector">
              <label for="pilihTahun" class="text-xs mr-2 text-secondary">Tahun:</label>
              <select id="pilihTahun" v-model="selectedYear" class="form-select select-inline">
                <option v-for="yr in availableYears" :key="yr" :value="yr">{{ yr }}</option>
              </select>
            </div>
          </div>

          <div class="chart-container">
            <div v-if="reports.length === 0" class="no-chart-data">
              Tidak ada data untuk memuat grafik.
            </div>
            
            <svg v-else class="svg-chart" viewBox="0 0 600 320">
              <line x1="50" y1="50" x2="560" y2="50" stroke="var(--border-glass)" stroke-dasharray="4,4" />
              <line x1="50" y1="100" x2="560" y2="100" stroke="var(--border-glass)" stroke-dasharray="4,4" />
              <line x1="50" y1="150" x2="560" y2="150" stroke="var(--border-glass)" stroke-dasharray="4,4" />
              <line x1="50" y1="200" x2="560" y2="200" stroke="var(--border-glass)" stroke-dasharray="4,4" />
              <line x1="50" y1="250" x2="560" y2="250" stroke="var(--border-glass)" stroke-width="1.5" />

              <text x="40" y="54" fill="var(--text-secondary)" font-size="10" font-weight="500" text-anchor="end">{{ Math.round(maxChartVal) }}</text>
              <text x="40" y="154" fill="var(--text-secondary)" font-size="10" font-weight="500" text-anchor="end">{{ Math.round(maxChartVal / 2) }}</text>
              <text x="40" y="254" fill="var(--text-secondary)" font-size="10" font-weight="500" text-anchor="end">0</text>

              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#f97316" />
                  <stop offset="100%" stop-color="#fbbf24" />
                </linearGradient>
              </defs>

              <g v-for="(count, idx) in monthlyCounts" :key="idx">
                <rect 
                  :x="55 + idx * 42" 
                  :y="250 - getBarHeight(count)" 
                  width="28" 
                  :height="getBarHeight(count)" 
                  rx="4"
                  fill="url(#barGradient)"
                  class="chart-bar"
                >
                  <title>{{ monthNames[idx] }}: {{ count }} Laporan</title>
                </rect>
                
                <text 
                  v-if="count > 0"
                  :x="69 + idx * 42" 
                  :y="240 - getBarHeight(count)" 
                  class="chart-val-text"
                  font-size="11" 
                  font-weight="bold"
                  text-anchor="middle"
                >
                  {{ count }}
                </text>
                
                <text 
                  :x="69 + idx * 42" 
                  y="272" 
                  fill="var(--text-secondary)" 
                  font-size="10" 
                  font-weight="500"
                  text-anchor="middle"
                >
                  {{ monthNamesShort[idx] }}
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>

      <!-- Content Tab 3: Monthly PDF Report -->
      <div v-else-if="activeTab === 'reports'" class="card max-w-xl mx-auto">
        <h2 class="card-title">📅 Cetak Laporan Bulanan</h2>
        <p class="card-desc">Pilih bulan dan tahun untuk mengekspor rekapitulasi data kerusakan armada ke format PDF resmi.</p>
        
        <form @submit.prevent="generatePDFReport" class="mt-4">
          <div class="form-group">
            <label class="form-label" for="exportMonth">Pilih Bulan</label>
            <select id="exportMonth" v-model="pdfExport.month" class="form-select">
              <option v-for="(mName, idx) in monthNames" :key="idx" :value="idx">{{ mName }}</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="exportYear">Pilih Tahun</label>
            <select id="exportYear" v-model="pdfExport.year" class="form-select">
              <option v-for="yr in availableYears" :key="yr" :value="yr">{{ yr }}</option>
            </select>
          </div>

          <button type="submit" class="btn btn-primary w-full" :disabled="isGeneratingPdf">
            📥 {{ isGeneratingPdf ? 'Membuat PDF...' : 'Buat & Download PDF' }}
          </button>
        </form>
      </div>
    </div>

    <!-- Modals -->
    <!-- Add User Modal -->
    <div v-if="modalUser.showAdd" class="modal-overlay">
      <div class="modal-content">
        <h3 class="modal-title">👤 Tambah Pengguna Baru</h3>
        <p class="modal-desc">Masukkan detail akun untuk didaftarkan ke sistem.</p>

        <form @submit.prevent="submitCreateUser">
          <div class="form-group">
            <label class="form-label" for="newUsername">Username</label>
            <input v-model="modalUser.form.username" type="text" id="newUsername" class="form-control" placeholder="Contoh: aris, operasional2" required />
          </div>
          <div class="form-group">
            <label class="form-label" for="newPin">PIN / Kode Akses</label>
            <input v-model="modalUser.form.pin" type="text" id="newPin" class="form-control" placeholder="Contoh: 2222, 1234" required />
          </div>
          <div class="form-group">
            <label class="form-label" for="newRole">Role</label>
            <select v-model="modalUser.form.role" id="newRole" class="form-select" required>
              <option value="Mekanik">Mekanik</option>
              <option value="Operasional">Operasional</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div class="modal-buttons">
            <button type="button" @click="modalUser.showAdd = false" class="btn btn-secondary flex-1">Batal</button>
            <button type="submit" class="btn btn-primary flex-1">Tambah</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit User Modal -->
    <div v-if="modalUser.showEdit" class="modal-overlay">
      <div class="modal-content">
        <h3 class="modal-title">✏️ Edit Pengguna</h3>
        <p class="modal-desc">Ubah kredensial akun pengguna.</p>

        <form @submit.prevent="submitEditUser">
          <div class="form-group">
            <label class="form-label" for="editUsername">Username</label>
            <input v-model="modalUser.form.username" type="text" id="editUsername" class="form-control" :disabled="modalUser.editingUser?.username === 'admin'" required />
          </div>
          <div class="form-group">
            <label class="form-label" for="editPin">PIN / Kode Akses</label>
            <input v-model="modalUser.form.pin" type="text" id="editPin" class="form-control" required />
          </div>
          <div class="form-group">
            <label class="form-label" for="editRole">Role</label>
            <select v-model="modalUser.form.role" id="editRole" class="form-select" :disabled="modalUser.editingUser?.username === 'admin'" required>
              <option value="Mekanik">Mekanik</option>
              <option value="Operasional">Operasional</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div class="modal-buttons">
            <button type="button" @click="modalUser.showEdit = false" class="btn btn-secondary flex-1">Batal</button>
            <button type="submit" class="btn btn-primary flex-1">Simpan</button>
          </div>
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
import { ref, reactive, computed, onMounted } from 'vue'
import { useReports } from '~/composables/useReports'

const { fetchReports, fetchUsers, createUser, updateUser, deleteUser } = useReports()

useHead({
  title: 'Dashboard Admin - Trans Jateng',
  meta: [
    { name: 'description', content: 'Manajemen pengguna, grafik analisis bulanan, dan ekspor laporan PDF.' }
  ]
})

// Authentication State
const isAuthenticated = ref(false)
const pinInput = ref('')
const authError = ref(false)
const pinInputRef = ref(null)

const verifyPIN = async () => {
  try {
    const list = await fetchUsers()
    const foundAdmin = list.find(u => u.role === 'Admin' && u.pin === pinInput.value)
    if (foundAdmin) {
      isAuthenticated.value = true
      authError.value = false
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('transjateng_admin_authed', 'true')
      }
      loadData()
      loadUsers()
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
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('transjateng_admin_authed')
  }
}

// Active Tab
const activeTab = ref('users') // 'users' | 'analytics' | 'reports'

// User Management State
const usersList = ref([])
const modalUser = reactive({
  showAdd: false,
  showEdit: false,
  editingUser: null,
  form: {
    username: '',
    pin: '',
    role: 'Mekanik'
  }
})

const loadUsers = async () => {
  try {
    usersList.value = await fetchUsers()
  } catch (err) {
    console.error('Failed to load users:', err)
  }
}

const openAddUserModal = () => {
  modalUser.form.username = ''
  modalUser.form.pin = ''
  modalUser.form.role = 'Mekanik'
  modalUser.showAdd = true
}

const submitCreateUser = async () => {
  try {
    await createUser({
      username: modalUser.form.username,
      pin: modalUser.form.pin,
      role: modalUser.form.role
    })
    showToast('Pengguna baru berhasil ditambahkan.')
    modalUser.showAdd = false
    loadUsers()
  } catch (err) {
    showToast(err.message || 'Gagal menambahkan pengguna.')
  }
}

const openEditUserModal = (user) => {
  modalUser.editingUser = user
  modalUser.form.username = user.username
  modalUser.form.pin = user.pin
  modalUser.form.role = user.role
  modalUser.showEdit = true
}

const submitEditUser = async () => {
  try {
    await updateUser(modalUser.editingUser.id, {
      username: modalUser.form.username,
      pin: modalUser.form.pin,
      role: modalUser.form.role
    })
    showToast('Detail pengguna berhasil diperbarui.')
    modalUser.showEdit = false
    loadUsers()
  } catch (err) {
    showToast(err.message || 'Gagal memperbarui pengguna.')
  }
}

const handleDeleteUser = async (user) => {
  if (user.username === 'admin') {
    showToast('Admin utama tidak dapat dihapus.')
    return
  }
  if (confirm(`Apakah Anda yakin ingin menghapus pengguna "${user.username}"?`)) {
    try {
      await deleteUser(user.id)
      showToast(`Pengguna "${user.username}" telah dihapus.`)
      loadUsers()
    } catch (err) {
      showToast('Gagal menghapus pengguna.')
    }
  }
}

// Analytics and PDF State
const reports = ref([])
const isLoading = ref(false)
const isGeneratingPdf = ref(false)
const selectedYear = ref(new Date().getFullYear())

const monthNames = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
]

const monthNamesShort = [
  'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 
  'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
]

const pdfExport = reactive({
  month: new Date().getMonth(),
  year: new Date().getFullYear()
})

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

onMounted(() => {
  if (typeof window !== 'undefined') {
    const isAuthed = sessionStorage.getItem('transjateng_admin_authed')
    if (isAuthed === 'true') {
      isAuthenticated.value = true
      loadData()
      loadUsers()
    } else {
      setTimeout(() => {
        pinInputRef.value?.focus()
      }, 200)
    }
  }
})

const loadData = async () => {
  isLoading.value = true
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

const availableYears = computed(() => {
  const years = reports.value.map(r => r.tahun_kerusakan)
  const currentYear = new Date().getFullYear()
  years.push(currentYear)
  return [...new Set(years)].sort((a, b) => b - a)
})

const monthlyCounts = computed(() => {
  const counts = Array(12).fill(0)
  reports.value.forEach(r => {
    if (r.tahun_kerusakan === selectedYear.value) {
      const month = new Date(r.tanggal_kerusakan).getMonth()
      counts[month]++
    }
  })
  return counts
})

const maxChartVal = computed(() => {
  const max = Math.max(...monthlyCounts.value)
  return max > 0 ? max : 5
})

const getBarHeight = (count) => {
  if (count === 0) return 0
  return (count / maxChartVal.value) * 190
}

const generatePDFReport = async () => {
  if (isGeneratingPdf.value) return
  isGeneratingPdf.value = true

  try {
    const filtered = reports.value.filter(r => {
      const date = new Date(r.tanggal_kerusakan)
      return date.getMonth() === pdfExport.month && r.tahun_kerusakan === pdfExport.year
    })

    if (filtered.length === 0) {
      showToast(`Tidak ada laporan kerusakan pada bulan ${monthNames[pdfExport.month]} ${pdfExport.year}.`)
      isGeneratingPdf.value = false
      return
    }

    const { jsPDF } = await import('jspdf')
    const { default: autoTable } = await import('jspdf-autotable')

    const doc = new jsPDF()

    doc.setFont('Helvetica', 'bold')
    doc.setFontSize(16)
    doc.text('LAPORAN BULANAN KERUSAKAN ARMADA TRANS JATENG', 105, 20, { align: 'center' })
    
    doc.setFont('Helvetica', 'normal')
    doc.setFontSize(11)
    doc.text(`Periode: ${monthNames[pdfExport.month]} ${pdfExport.year}`, 105, 27, { align: 'center' })
    
    doc.setDrawColor(249, 115, 22)
    doc.setLineWidth(1)
    doc.line(14, 32, 196, 32)

    const tableBody = filtered.map((r, index) => [
      index + 1,
      r.id,
      r.tanggal_kerusakan,
      r.no_armada,
      r.nama_sopir,
      r.deskripsi,
      r.nama_mekanik || 'Belum Ditugaskan',
      r.status
    ])

    autoTable(doc, {
      startY: 40,
      head: [['No', 'ID Laporan', 'Tgl Rusak', 'No Armada', 'Pelapor (Sopir)', 'Kerusakan', 'Mekanik', 'Status']],
      body: tableBody,
      headStyles: {
        fillColor: [15, 23, 42],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      styles: {
        fontSize: 9,
        cellPadding: 3
      },
      columnStyles: {
        0: { width: 8 },
        1: { width: 25 },
        2: { width: 22 },
        3: { width: 20 },
        4: { width: 25 },
        5: { width: 50 },
        6: { width: 25 },
        7: { width: 25 }
      }
    })

    const finalY = doc.previousAutoTable.finalY + 20
    
    let sigDoc = doc
    if (finalY > 240) {
      doc.addPage()
      sigDoc = doc
    }

    const currentY = sigDoc.previousAutoTable.finalY > 240 ? 30 : finalY

    sigDoc.setFontSize(10)
    sigDoc.text('Semarang, ' + new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }), 140, currentY)
    sigDoc.text('Mengetahui,', 140, currentY + 7)
    sigDoc.text('Kepala Operasional Trans Jateng', 140, currentY + 12)
    
    sigDoc.line(140, currentY + 32, 190, currentY + 32)
    sigDoc.setFont('Helvetica', 'bold')
    sigDoc.text('( ______________________ )', 140, currentY + 37)

    const fileName = `Laporan_Kerusakan_${monthNames[pdfExport.month]}_${pdfExport.year}.pdf`
    doc.save(fileName)

    showToast('Laporan PDF berhasil dibuat dan diunduh!')
  } catch (err) {
    console.error(err)
    showToast('Gagal memproses ekspor PDF.')
  } finally {
    isGeneratingPdf.value = false
  }
}
</script>

<style scoped>
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

.table-container {
  overflow-x: auto;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-glass);
  background: var(--bg-secondary);
}
.data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.95rem;
}
.data-table th, .data-table td {
  padding: 1rem;
  border-bottom: 1px solid var(--border-glass);
}
.data-table th {
  background: var(--bg-tertiary);
  font-weight: 700;
  color: var(--text-primary);
}
.data-table tr:hover {
  background-color: rgba(255, 255, 255, 0.02);
}
.role-tag {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}
.role-tag.admin {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}
.role-tag.operasional {
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
}
.role-tag.mekanik {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
}
.action-buttons-cell {
  display: flex;
  gap: 0.5rem;
}

.select-inline {
  display: inline-block;
  width: auto;
  padding: 0.25rem 2rem 0.25rem 0.75rem;
  font-size: 0.85rem;
}
.year-selector {
  display: flex;
  align-items: center;
}
.card-header-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}
.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 280px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  position: relative;
  overflow: hidden;
}
.chart-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: var(--radius-md);
  background: linear-gradient(180deg, rgba(249, 115, 22, 0.02), transparent);
  pointer-events: none;
}
.no-chart-data {
  color: var(--text-muted);
  font-size: 0.9rem;
}
.svg-chart {
  width: 100%;
  max-width: 550px;
  height: auto;
  z-index: 1;
}
.chart-bar {
  transition: all var(--transition-fast) ease;
  cursor: pointer;
}
.chart-bar:hover {
  fill: #f97316;
  filter: drop-shadow(0 2px 6px rgba(249, 115, 22, 0.4));
}
.chart-val-text {
  fill: var(--text-primary);
  font-family: var(--font-sans);
}

.col-span-2 {
  grid-column: span 2;
}

.card-desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 1rem;
}
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
.mt-4 {
  margin-top: 1rem;
}
.w-full {
  width: 100%;
}
.mr-2 {
  margin-right: 0.5rem;
}
.bg-slate-500\/10 {
  background: rgba(148, 163, 184, 0.1);
}
.text-slate-300 {
  color: #cbd5e1;
}
.bg-amber-500\/10 {
  background: rgba(245, 158, 11, 0.1);
}
.text-amber-500 {
  color: #f59e0b;
}
.bg-sky-500\/10 {
  background: rgba(59, 130, 246, 0.1);
}
.text-sky-500 {
  color: #3b82f6;
}
.bg-emerald-500\/10 {
  background: rgba(16, 185, 129, 0.1);
}
.text-emerald-500 {
  color: #10b981;
}
.bg-red-500\/10 {
  background: rgba(239, 68, 68, 0.1);
}
.text-red-500 {
  color: #ef4444;
}

@media (max-width: 900px) {
  .col-span-2 {
    grid-column: span 1;
  }
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .tabs-nav {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding: 0.35rem;
    scrollbar-width: none; /* Firefox */
  }
  .tabs-nav::-webkit-scrollbar {
    display: none; /* Safari/Chrome */
  }
  .tab-btn {
    flex: 0 0 auto;
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
    white-space: nowrap;
  }
}
</style>
