<template>
  <div class="container fade-in-up">
    <!-- Hero Section -->
    <div class="hero-container">
      <div class="hero-logo-wrapper">
        <img src="https://upload.wikimedia.org/wikipedia/id/a/a9/Logo_Trans_Jateng.svg" alt="Trans Jateng Logo Logo" class="hero-logo" />
      </div>
      <h1 class="hero-title">Sistem Pelacakan Kerusakan & Perbaikan Armada</h1>
      <p class="hero-desc">
        Solusi terintegrasi untuk mendokumentasikan kerusakan bus Trans Jateng secara terstruktur. Menggantikan tumpukan pesan WhatsApp dengan database terpusat yang terpantau secara real-time.
      </p>

      <!-- Curvy Road Bus Loop Animation (MotoGP Style - Non-crossing Circuit) -->
      <div class="road-animation-container">
        <svg ref="svgRef" class="road-svg" viewBox="0 0 600 240">
          <filter id="road-shadow" x="-10%" y="-20%" width="120%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#000" flood-opacity="0.25"/>
          </filter>
          
          <!-- Scenery Decor: Trees -->
          <!-- Tree 1 (Left Loop) -->
          <g transform="translate(140, 70)">
            <rect x="-2" y="5" width="4" height="8" fill="#78350f" />
            <circle cx="0" cy="0" r="10" fill="#16a34a" />
            <circle cx="-5" cy="-3" r="8" fill="#15803d" />
          </g>
          <!-- Tree 2 (Right Hairpin) -->
          <g transform="translate(500, 110)">
            <rect x="-2" y="5" width="4" height="8" fill="#78350f" />
            <circle cx="0" cy="0" r="10" fill="#16a34a" />
            <circle cx="5" cy="-3" r="8" fill="#15803d" />
          </g>
          <!-- Tree 3 (Center Inner Area) -->
          <g transform="translate(300, 140)">
            <rect x="-2" y="5" width="4" height="8" fill="#78350f" />
            <circle cx="0" cy="0" r="8" fill="#22c55e" />
          </g>
          <!-- Tree 4 (Bottom-Right Area) -->
          <g transform="translate(380, 205)">
            <rect x="-2" y="5" width="4" height="8" fill="#78350f" />
            <circle cx="0" cy="0" r="9" fill="#15803d" />
          </g>

          <!-- Scenery Decor: Bus Stop Shelter -->
          <g transform="translate(160, 205)">
            <rect x="-15" y="-8" width="30" height="16" rx="2" fill="#334155" />
            <rect x="-13" y="-6" width="26" height="12" fill="#cbd5e1" />
            <text x="0" y="3" font-size="8" text-anchor="middle" fill="#0f172a" font-weight="bold">BUS</text>
          </g>
          
          <!-- Road Background border (simulates gravel/edge) -->
          <path d="M 80,120 C 80,120 150,120 250,120 C 290,120 310,60 370,60 L 470,60 C 530,60 550,160 470,160 C 410,160 390,100 330,100 C 270,100 250,180 190,180 L 120,180 C 60,180 60,120 80,120 Z" fill="none" stroke="var(--border-glass)" stroke-width="26" stroke-linecap="round" stroke-linejoin="round" />
          
          <!-- Asphalt Road (Clockwise Path) -->
          <path id="road-path" ref="roadPathRef" d="M 80,120 C 80,120 150,120 250,120 C 290,120 310,60 370,60 L 470,60 C 530,60 550,160 470,160 C 410,160 390,100 330,100 C 270,100 250,180 190,180 L 120,180 C 60,180 60,120 80,120 Z" fill="none" stroke="#253043" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" filter="url(#road-shadow)" />
          
          <!-- Center Dashed Line -->
          <path d="M 80,120 C 80,120 150,120 250,120 C 290,120 310,60 370,60 L 470,60 C 530,60 550,160 470,160 C 410,160 390,100 330,100 C 270,100 250,180 190,180 L 120,180 C 60,180 60,120 80,120 Z" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="8,8" opacity="0.8" />
          
          <!-- Traffic Light Pole at top straight section -->
          <g transform="translate(430, 25)">
            <!-- Pole -->
            <line x1="0" y1="0" x2="0" y2="25" stroke="#64748b" stroke-width="2.5" />
            <!-- Light Box -->
            <rect x="-6" y="-18" width="12" height="20" rx="2" fill="#0f172a" stroke="#475569" stroke-width="1" />
            <!-- Lights (Toggle fill color) -->
            <circle cx="0" cy="-13" r="3.5" :fill="isGreen ? '#ef444422' : '#ef4444'" />
            <circle cx="0" cy="-5" r="3.5" :fill="isGreen ? '#22c55e' : '#22c55e22'" />
          </g>

          <!-- Render 3 Buses using reactive JS coordinates -->
          <g v-for="bus in buses" :key="bus.id" :transform="`translate(${bus.x}, ${bus.y}) rotate(${bus.angle})`">
            <!-- Wheels -->
            <rect x="-10" y="-9" width="6" height="2" fill="#0c111d" rx="0.5" />
            <rect x="6" y="-9" width="6" height="2" fill="#0c111d" rx="0.5" />
            <rect x="-10" y="7" width="6" height="2" fill="#0c111d" rx="0.5" />
            <rect x="6" y="7" width="6" height="2" fill="#0c111d" rx="0.5" />
            
            <!-- Bus Body -->
            <rect x="-14" y="-7" width="28" height="14" rx="3" :fill="bus.color" />
            
            <!-- Roof -->
            <rect x="-9" y="-5" width="18" height="10" rx="1.5" fill="#f8fafc" />
            
            <!-- Front Windshield -->
            <path d="M 9,-4 L 12,-3 L 12,3 L 9,4 Z" fill="#7dd3fc" />
            
            <!-- Headlights -->
            <circle cx="13" cy="-3" r="1.2" fill="#fbbf24" />
            <circle cx="13" cy="3" r="1.2" fill="#fbbf24" />
            
            <!-- Side Windows -->
            <rect x="-7" y="-6" width="3" height="1" fill="#1e293b" />
            <rect x="-3" y="-6" width="3" height="1" fill="#1e293b" />
            <rect x="1" y="-6" width="3" height="1" fill="#1e293b" />
            <rect x="-7" y="5" width="3" height="1" fill="#1e293b" />
            <rect x="-3" y="5" width="3" height="1" fill="#1e293b" />
            <rect x="1" y="5" width="3" height="1" fill="#1e293b" />
          </g>
        </svg>
      </div>
    </div>

    <!-- Live Report Tracker Card -->
    <div class="live-tracker-card card mb-12">
      <div class="tracker-header">
        <div class="tracker-header-left">
          <span class="pulse-indicator"></span>
          <h3 class="tracker-title">Pelacakan Aktivitas Laporan Terbaru</h3>
        </div>
        <button @click="loadRecentReports" class="refresh-btn" :disabled="isLoading">
          {{ isLoading ? '🔄' : 'Refresh' }}
        </button>
      </div>

      <div v-if="isLoading" class="tracker-loading">
        <div class="mini-spinner"></div>
        <span>Memperbarui aktivitas...</span>
      </div>
      <div v-else-if="recentReports.length === 0" class="tracker-empty">
        📭 Belum ada laporan masuk di sistem.
      </div>
      <div v-else class="tracker-grid">
        <div v-for="rep in recentReports" :key="rep.id" class="tracker-item">
          <div class="tracker-item-header">
            <span class="tracker-bus">🚌 {{ rep.no_armada }}</span>
            <span class="tracker-time">{{ formatTimeAgo(rep.timestamp_lapor) }}</span>
          </div>
          <p class="tracker-desc">{{ truncateText(rep.deskripsi, 75) }}</p>
          <div class="tracker-footer">
            <span class="badge badge-mini" :class="getStatusBadgeClass(rep.status)">{{ rep.status }}</span>
            <span class="tracker-sopir">Sopir: {{ rep.nama_sopir }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Portal Cards Grid -->
    <div class="portal-grid">
      <!-- Sopir Card -->
      <NuxtLink to="/sopir" class="portal-card group">
        <div class="portal-header">
          <div class="portal-icon-wrapper sopir-color">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
          </div>
          <span class="role-badge">Untuk Sopir</span>
        </div>
        <h2 class="portal-card-title">Lapor Kerusakan</h2>
        <p class="portal-card-desc">
          Formulir input kerusakan bus bagi pengemudi di jalan. Lengkap dengan kompresi foto otomatis untuk upload cepat.
        </p>
        <span class="portal-card-action">
          Buka Formulir Lapor &rarr;
        </span>
      </NuxtLink>

      <!-- Operasional Card -->
      <NuxtLink to="/operasional" class="portal-card group">
        <div class="portal-header">
          <div class="portal-icon-wrapper operasional-color">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
          </div>
          <span class="role-badge">Untuk Operasional</span>
        </div>
        <h2 class="portal-card-title">Dashboard Verifikasi</h2>
        <p class="portal-card-desc">
          Validasi laporan kerusakan dari pengemudi. Tugaskan mekanik lapangan untuk memproses perbaikan atau tolak laporan yang tidak valid.
        </p>
        <span class="portal-card-action">
          Masuk Dashboard &rarr;
        </span>
      </NuxtLink>

      <!-- Mekanik Card -->
      <NuxtLink to="/mekanik" class="portal-card group">
        <div class="portal-header">
          <div class="portal-icon-wrapper mekanik-color">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
          </div>
          <span class="role-badge">Untuk Mekanik</span>
        </div>
        <h2 class="portal-card-title">Portal Tugas Mekanik</h2>
        <p class="portal-card-desc">
          Lihat daftar penugasan perbaikan yang tertuju kepada Anda. Unggah dokumentasi pasca penanganan awal dan hasil akhir perbaikan.
        </p>
        <span class="portal-card-action">
          Buka Tugas Perbaikan &rarr;
        </span>
      </NuxtLink>

      <!-- Admin Card -->
      <NuxtLink to="/admin" class="portal-card group">
        <div class="portal-header">
          <div class="portal-icon-wrapper rekap-color">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <span class="role-badge">Administrator</span>
        </div>
        <h2 class="portal-card-title">Portal Admin</h2>
        <p class="portal-card-desc">
          Kelola kredensial login pengguna, lihat grafik analitik frekuensi kerusakan bulanan, dan cetak laporan PDF bulanan resmi.
        </p>
        <span class="portal-card-action">
          Masuk Dashboard &rarr;
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useReports } from '~/composables/useReports'

const { fetchReports } = useReports()

useHead({
  title: 'Trans Jateng Armada - Sistem Laporan Kerusakan',
  meta: [
    { name: 'description', content: 'Sistem pelacakan dan pelaporan kerusakan armada bus Trans Jateng terintegrasi.' }
  ]
})

const recentReports = ref([])
const isLoading = ref(false)
// Traffic Light State
const isGreen = ref(true)
const roadPathRef = ref(null)
const pathLength = ref(0)
const stopLineDistValue = ref(0)
let trafficInterval = null
let animationFrameId = null

// Physics-based Bus Simulation State
const buses = ref([
  { id: 1, color: '#dc2626', dist: 0, speed: 1.5, currentSpeed: 1.5, x: 0, y: 0, angle: 0 },
  { id: 2, color: '#0284c7', dist: 0, speed: 1.5, currentSpeed: 1.5, x: 0, y: 0, angle: 0 },
  { id: 3, color: '#f97316', dist: 0, speed: 1.5, currentSpeed: 1.5, x: 0, y: 0, angle: 0 }
])

const loadRecentReports = async () => {
  isLoading.value = true
  try {
    const list = await fetchReports()
    // Ambil maksimal 3 laporan teratas
    recentReports.value = list.slice(0, 3)
  } catch (err) {
    console.error('Failed to load recent reports:', err)
  } finally {
    isLoading.value = false
  }
}

// Javascript frame update simulation loop
const updateFrame = () => {
  const L = pathLength.value
  if (!L || !roadPathRef.value) {
    animationFrameId = requestAnimationFrame(updateFrame)
    return
  }

  // The stop line is situated right before the traffic light
  const stopLineDist = stopLineDistValue.value

  buses.value.forEach((bus) => {
    let targetSpeed = bus.speed

    // 1. Check Traffic Light: Red Light halts the bus at stop line
    if (!isGreen.value) {
      let distToStop = stopLineDist - bus.dist
      // Adjust wrapping logic
      if (distToStop < -L / 2) distToStop += L
      
      // If within 50 pixels behind the stop line
      if (distToStop > 5 && distToStop < 55) {
        targetSpeed = 0
      }
    }

    // 2. Collision Avoidance: stops if too close to the bus in front
    buses.value.forEach((otherBus) => {
      if (otherBus.id === bus.id) return

      let gap = otherBus.dist - bus.dist
      if (gap < 0) gap += L // wrap around

      // If the other bus is ahead and within safety margins
      if (gap > 0 && gap < 60) {
        if (otherBus.currentSpeed === 0 || gap < 42) {
          targetSpeed = 0
        } else {
          // Slowly align speed to avoid collision
          targetSpeed = Math.min(targetSpeed, otherBus.currentSpeed * 0.9)
        }
      }
    })

    // 3. Smooth Acceleration and Braking Deceleration
    if (bus.currentSpeed < targetSpeed) {
      bus.currentSpeed = Math.min(bus.currentSpeed + 0.06, targetSpeed)
    } else if (bus.currentSpeed > targetSpeed) {
      bus.currentSpeed = Math.max(bus.currentSpeed - 0.12, targetSpeed)
    }

    // Update path distance
    bus.dist = (bus.dist + bus.currentSpeed) % L

    // Fetch SVG geometry coordinate points
    try {
      const p1 = roadPathRef.value.getPointAtLength(bus.dist)
      const p2 = roadPathRef.value.getPointAtLength((bus.dist + 2) % L)
      bus.x = p1.x
      bus.y = p1.y
      bus.angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI)
    } catch (e) {
      // fallback in case of errors
    }
  })

  animationFrameId = requestAnimationFrame(updateFrame)
}

onMounted(() => {
  loadRecentReports()
  
  // Toggle traffic light every 5 seconds
  trafficInterval = setInterval(() => {
    isGreen.value = !isGreen.value
  }, 5000)

  // Start the frame updates loop once SVG path is loaded
  if (roadPathRef.value) {
    try {
      const L = roadPathRef.value.getTotalLength()
      pathLength.value = L
      
      // Calculate the stop line point closest to coordinate (430, 60) on the MotoGP path
      let stopLine = L * 0.32 // fallback
      let minDist = Infinity
      for (let d = 0; d < L; d += 2) {
        const p = roadPathRef.value.getPointAtLength(d)
        const distToPoint = Math.hypot(p.x - 430, p.y - 60)
        if (distToPoint < minDist) {
          minDist = distToPoint
          stopLine = d
        }
      }
      stopLineDistValue.value = stopLine
      
      // Spaced out starting positions (75%, 45%, 15% of track)
      buses.value[0].dist = L * 0.75
      buses.value[1].dist = L * 0.45
      buses.value[2].dist = L * 0.15
      
      updateFrame()
    } catch (err) {
      console.error('Failed to get path length:', err)
    }
  }
})

onUnmounted(() => {
  if (trafficInterval) clearInterval(trafficInterval)
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
})

// Helpers
const truncateText = (text, limit) => {
  if (!text) return ''
  return text.length > limit ? text.substring(0, limit) + '...' : text
}

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'Menunggu Verifikasi': return 'badge-pending'
    case 'Diproses': return 'badge-processing'
    case 'Selesai': return 'badge-completed'
    case 'Ditolak': return 'badge-rejected'
    default: return ''
  }
}

const formatTimeAgo = (isoString) => {
  if (!isoString) return ''
  const date = new Date(isoString)
  const seconds = Math.floor((new Date() - date) / 1000)
  
  if (seconds < 60) return 'Baru saja'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} menit lalu`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} jam lalu`
  const days = Math.floor(hours / 24)
  return `${days} hari lalu`
}
</script>

<style scoped>
.hero-container {
  text-align: center;
  max-width: 800px;
  margin: 2.5rem auto 3.5rem auto;
}
.hero-logo-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}
.hero-logo {
  height: 90px;
  width: auto;
  object-fit: contain;
  animation: float 4s ease-in-out infinite;
}

.hero-title {
  font-size: 2.75rem;
  font-weight: 800;
  line-height: 1.25;
  margin-bottom: 1.25rem;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, var(--text-primary) 30%, var(--primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hero-desc {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 2rem;
}

/* Curvy Road Animation */
.road-animation-container {
  width: 100%;
  max-width: 500px;
  margin: 1.5rem auto 0 auto;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.road-svg {
  width: 100%;
  height: auto;
  overflow: visible;
}

/* Live Report Tracker Card */
.mb-12 {
  margin-bottom: 3rem;
}
.live-tracker-card {
  background: var(--bg-glass);
  border: 1px solid var(--border-glass);
  padding: 1.5rem 2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  margin-top: 1rem;
}
.tracker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-glass);
  padding-bottom: 0.75rem;
  margin-bottom: 1.25rem;
}
.tracker-header-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.pulse-indicator {
  width: 10px;
  height: 10px;
  background-color: #ef4444;
  border-radius: 50%;
  display: inline-block;
  animation: pulse 1.8s infinite;
}
.tracker-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
}
.refresh-btn {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-glass);
  color: var(--text-primary);
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-fast);
}
.refresh-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}
.tracker-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
  padding: 1.5rem 0;
}
.mini-spinner {
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-top: 2px solid var(--primary);
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 0.8s linear infinite;
}
.tracker-empty {
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.9rem;
  padding: 1.5rem 0;
}
.tracker-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
}
.tracker-item {
  background: rgba(15, 23, 42, 0.3);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-md);
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: var(--transition-fast);
}
:root.light .tracker-item {
  background: rgba(0, 0, 0, 0.02);
}
.tracker-item:hover {
  border-color: rgba(249, 115, 22, 0.15);
  transform: translateY(-2px);
}
.tracker-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
}
.tracker-bus {
  font-weight: 700;
  color: var(--text-primary);
}
.tracker-time {
  color: var(--text-muted);
}
.tracker-desc {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.4;
  flex: 1;
}
.tracker-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.25rem;
  border-top: 1px dashed var(--border-glass);
  padding-top: 0.5rem;
  font-size: 0.75rem;
}
.badge-mini {
  padding: 0.2rem 0.5rem;
  font-size: 0.7rem;
}
.tracker-sopir {
  color: var(--text-muted);
}

/* Portal Menu Grid */
.portal-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.75rem;
  margin-bottom: 4rem;
}

.portal-card {
  background: var(--bg-glass);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-lg);
  padding: 2rem;
  text-decoration: none;
  color: inherit;
  transition: all var(--transition-normal);
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
  position: relative;
  overflow: hidden;
}

.portal-card:hover {
  transform: translateY(-8px);
  border-color: rgba(249, 115, 22, 0.25);
  box-shadow: var(--shadow-lg);
}

.portal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}
.portal-icon-wrapper {
  width: 50px;
  height: 50px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-fast);
}
.role-badge {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-muted);
  background: var(--bg-tertiary);
  padding: 0.25rem 0.65rem;
  border-radius: 50px;
  border: 1px solid var(--border-glass);
}

.sopir-color { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
.operasional-color { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
.mekanik-color { background: rgba(16, 185, 129, 0.1); color: #10b981; }
.rekap-color { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; }

.portal-card:hover .portal-icon-wrapper.sopir-color { background: #3b82f6; color: white; box-shadow: 0 4px 14px rgba(59, 130, 246, 0.35); }
.portal-card:hover .portal-icon-wrapper.operasional-color { background: #f59e0b; color: white; box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35); }
.portal-card:hover .portal-icon-wrapper.mekanik-color { background: #10b981; color: white; box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35); }
.portal-card:hover .portal-icon-wrapper.rekap-color { background: #8b5cf6; color: white; box-shadow: 0 4px 14px rgba(139, 92, 246, 0.35); }

.portal-card-title {
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
}

.portal-card-desc {
  color: var(--text-secondary);
  font-size: 0.92rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  flex: 1;
}

.portal-card-action {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: var(--transition-fast);
}

.portal-card:hover .portal-card-action {
  transform: translateX(4px);
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.5); }
  70% { box-shadow: 0 0 0 8px rgba(239, 68, 68, 0); }
  100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.25rem;
  }
  .live-tracker-card {
    padding: 1.25rem;
  }
}
</style>
