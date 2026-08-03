<template>
  <div class="container fade-in-up">
    <!-- Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Rekapitulasi & Statistik</h1>
        <p class="page-subtitle">Visualisasi performa armada, frekuensi laporan bulanan, dan ekspor laporan bulanan.</p>
      </div>
      <div class="header-actions">
        <button @click="loadData" class="btn btn-secondary btn-sm" :disabled="isLoading">
          🔄 {{ isLoading ? 'Memuat...' : 'Segarkan Data' }}
        </button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-icon-wrapper bg-slate-500/10 text-slate-300">
          📄
        </div>
        <div>
          <div class="stat-value">{{ reports.length }}</div>
          <div class="stat-label">Total Masuk</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon-wrapper bg-amber-500/10 text-amber-500">
          ⏳
        </div>
        <div>
          <div class="stat-value">{{ countByStatus('Menunggu Verifikasi') }}</div>
          <div class="stat-label">Menunggu Verifikasi</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon-wrapper bg-sky-500/10 text-sky-500">
          🛠️
        </div>
        <div>
          <div class="stat-value">{{ countByStatus('Diproses') }}</div>
          <div class="stat-label">Dalam Proses</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon-wrapper bg-emerald-500/10 text-emerald-500">
          ✅
        </div>
        <div>
          <div class="stat-value">{{ countByStatus('Selesai') }}</div>
          <div class="stat-label">Selesai Perbaikan</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon-wrapper bg-red-500/10 text-red-500">
          ❌
        </div>
        <div>
          <div class="stat-value">{{ countByStatus('Ditolak') }}</div>
          <div class="stat-label">Laporan Ditolak</div>
        </div>
      </div>
    </div>

    <!-- Dashboard Content Grid -->
    <div class="dashboard-grid">
      
      <!-- 1. GRAFIK BATANG BULANAN -->
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
          
          <!-- Pure SVG Chart -->
          <svg v-else class="svg-chart" viewBox="0 0 600 320">
            <!-- Grids & Guidelines -->
            <line x1="50" y1="50" x2="560" y2="50" stroke="var(--border-glass)" stroke-dasharray="4,4" />
            <line x1="50" y1="100" x2="560" y2="100" stroke="var(--border-glass)" stroke-dasharray="4,4" />
            <line x1="50" y1="150" x2="560" y2="150" stroke="var(--border-glass)" stroke-dasharray="4,4" />
            <line x1="50" y1="200" x2="560" y2="200" stroke="var(--border-glass)" stroke-dasharray="4,4" />
            <line x1="50" y1="250" x2="560" y2="250" stroke="var(--border-glass)" stroke-width="1.5" />

            <!-- Y Axis Label -->
            <text x="40" y="54" fill="var(--text-secondary)" font-size="10" font-weight="500" text-anchor="end">{{ Math.round(maxChartVal) }}</text>
            <text x="40" y="154" fill="var(--text-secondary)" font-size="10" font-weight="500" text-anchor="end">{{ Math.round(maxChartVal / 2) }}</text>
            <text x="40" y="254" fill="var(--text-secondary)" font-size="10" font-weight="500" text-anchor="end">0</text>

            <!-- Bar Gradient Definition -->
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#f97316" />
                <stop offset="100%" stop-color="#fbbf24" />
              </linearGradient>
            </defs>

            <!-- Columns Rendering -->
            <g v-for="(count, idx) in monthlyCounts" :key="idx">
              <!-- Bar -->
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
              
              <!-- Value Text (Adapts to Light/Dark background via text-primary) -->
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
              
              <!-- Month X Label -->
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

      <!-- 2. EKSPOR LAPORAN PDF -->
      <div class="card">
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

    <!-- Success Toast -->
    <div v-if="toast.show" class="toast">
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useReports } from '~/composables/useReports'

const { fetchReports } = useReports()

useHead({
  title: 'Rekapitulasi & Statistik - Trans Jateng',
  meta: [
    { name: 'description', content: 'Grafik laporan bulanan dan fitur ekspor PDF laporan kerusakan armada.' }
  ]
})

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
  loadData()
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

// Available years from reports for selectors
const availableYears = computed(() => {
  const years = reports.value.map(r => r.tahun_kerusakan)
  const currentYear = new Date().getFullYear()
  years.push(currentYear)
  // return unique sorted years
  return [...new Set(years)].sort((a, b) => b - a)
})

// Calculate monthly count for selected year
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
  // max height of SVG chart is 200px (between y=50 and y=250)
  return (count / maxChartVal.value) * 190
}

// PDF Exporter using jsPDF and jspdf-autotable
const generatePDFReport = async () => {
  if (isGeneratingPdf.value) return
  isGeneratingPdf.value = true

  try {
    // Saring laporan berdasarkan bulan & tahun yang dipilih
    const filtered = reports.value.filter(r => {
      const date = new Date(r.tanggal_kerusakan)
      return date.getMonth() === pdfExport.month && r.tahun_kerusakan === pdfExport.year
    })

    if (filtered.length === 0) {
      showToast(`Tidak ada laporan kerusakan pada bulan ${monthNames[pdfExport.month]} ${pdfExport.year}.`)
      isGeneratingPdf.value = false
      return
    }

    // Dynamic import to prevent SSR build issue in Nuxt
    const { jsPDF } = await import('jspdf')
    const { default: autoTable } = await import('jspdf-autotable')

    const doc = new jsPDF()

    // Title / Header PDF
    doc.setFont('Helvetica', 'bold')
    doc.setFontSize(16)
    doc.text('LAPORAN BULANAN KERUSAKAN ARMADA TRANS JATENG', 105, 20, { align: 'center' })
    
    doc.setFont('Helvetica', 'normal')
    doc.setFontSize(11)
    doc.text(`Periode: ${monthNames[pdfExport.month]} ${pdfExport.year}`, 105, 27, { align: 'center' })
    
    // Line separator
    doc.setDrawColor(249, 115, 22) // Trans Jateng orange line
    doc.setLineWidth(1)
    doc.line(14, 32, 196, 32)

    // Table Data preparation
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

    // Render Table
    autoTable(doc, {
      startY: 40,
      head: [['No', 'ID Laporan', 'Tgl Rusak', 'No Armada', 'Pelapor (Sopir)', 'Kerusakan', 'Mekanik', 'Status']],
      body: tableBody,
      headStyles: {
        fillColor: [15, 23, 42], // Slate Navy Color
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

    // Footer signature / validation
    const finalY = doc.previousAutoTable.finalY + 20
    
    // Check if signature section fits page, otherwise add page
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
    
    sigDoc.line(140, currentY + 32, 190, currentY + 32) // signature line
    sigDoc.setFont('Helvetica', 'bold')
    sigDoc.text('( ______________________ )', 140, currentY + 37)

    // Save File
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
</style>
