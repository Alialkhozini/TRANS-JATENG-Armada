<template>
  <div class="admin-page-root">
    <!-- Auth Screen Full Page with Cyber Midnight Expressway -->
    <div v-if="!isAuthenticated" class="auth-fullscreen-page auth-admin-theme">
      <div class="auth-road-backdrop">
        <svg class="road-anim-svg" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="cyberSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#090514"/>
              <stop offset="55%" stop-color="#2e1065" stop-opacity="0.6"/>
              <stop offset="100%" stop-color="#1e1b4b" stop-opacity="0.3"/>
            </linearGradient>
            <linearGradient id="cyberMtn" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#3b0764" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#1e1b4b" stop-opacity="0.4"/>
            </linearGradient>
          </defs>

          <!-- Midnight Cyber Sky -->
          <rect width="1440" height="700" fill="url(#cyberSky)"/>

          <!-- Cyber Starfield -->
          <g fill="#c084fc" opacity="0.65">
            <circle cx="120" cy="50" r="1.5"/><circle cx="310" cy="90" r="1.2"/><circle cx="540" cy="40" r="1.8"/>
            <circle cx="780" cy="70" r="1.4"/><circle cx="980" cy="45" r="2"/><circle cx="1240" cy="85" r="1.3"/>
            <circle cx="1380" cy="120" r="1.5"/><circle cx="210" cy="130" r="1.2"/>
          </g>

          <!-- LAYER 1: Full-Width Distant Digital Mountain Ridge -->
          <path d="M-60,370 L130,210 L330,300 L540,180 L740,310 L960,190 L1170,300 L1350,170 L1500,370 L1500,400 L-60,400 Z" fill="url(#cyberMtn)"/>

          <!-- LAYER 2: Panoramic Digital City Skyline (Seamless across entire width) -->
          <g fill="#120a2a" opacity="0.92">
            <rect x="20" y="240" width="45" height="160" rx="2"/>
            <rect x="75" y="190" width="55" height="210" rx="3"/>
            <rect x="140" y="140" width="70" height="260" rx="4"/>
            <polygon points="175,70 165,140 185,140" fill="#a855f7" opacity="0.8"/>
            <rect x="220" y="210" width="55" height="190" rx="3"/>
            <rect x="285" y="170" width="65" height="230" rx="3"/>
            <rect x="360" y="230" width="60" height="170" rx="2"/>
            
            <rect x="1020" y="220" width="55" height="180" rx="3"/>
            <rect x="1085" y="160" width="65" height="240" rx="3"/>
            <rect x="1160" y="130" width="75" height="270" rx="4"/>
            <polygon points="1198,60 1188,130 1208,130" fill="#c084fc" opacity="0.8"/>
            <rect x="1245" y="200" width="60" height="200" rx="3"/>
            <rect x="1315" y="150" width="60" height="250" rx="3"/>
            <rect x="1385" y="220" width="50" height="180" rx="2"/>
          </g>

          <!-- Skyline Window Lights Twinkle -->
          <g fill="#e9d5ff" opacity="0.75">
            <circle cx="160" cy="170" r="2.5"/><circle cx="190" cy="170" r="2.5"/><circle cx="160" cy="200" r="2.5"/><circle cx="190" cy="200" r="2.5"/>
            <circle cx="100" cy="220" r="2"/><circle cx="310" cy="200" r="2"/><circle cx="310" cy="230" r="2"/>
            <circle cx="1185" cy="160" r="2.5"/><circle cx="1215" cy="160" r="2.5"/><circle cx="1185" cy="190" r="2.5"/><circle cx="1215" cy="190" r="2.5"/>
            <circle cx="1115" cy="190" r="2"/><circle cx="1340" cy="180" r="2"/><circle cx="1340" cy="210" r="2"/>
          </g>

          <!-- 3D Perspective Cyber Expressway -->
          <polygon points="560,330 880,330 1650,750 -210,750" fill="#090514"/>
          
          <!-- Neon Purple Edge Barriers -->
          <line x1="560" y1="330" x2="-210" y2="750" stroke="#a855f7" stroke-width="5" opacity="0.95"/>
          <line x1="880" y1="330" x2="1650" y2="750" stroke="#a855f7" stroke-width="5" opacity="0.95"/>
          
          <!-- Multi-lane Neon Speed Light Streams -->
          <g class="anim-road-stripes">
            <line x1="720" y1="330" x2="720" y2="750" stroke="#c084fc" stroke-width="7" stroke-dasharray="45,30" class="moving-dashes-cyber"/>
            <line x1="640" y1="330" x2="260" y2="750" stroke="#818cf8" stroke-width="4" stroke-dasharray="35,35" class="moving-dashes-cyber"/>
            <line x1="800" y1="330" x2="1180" y2="750" stroke="#818cf8" stroke-width="4" stroke-dasharray="35,35" class="moving-dashes-cyber"/>
          </g>



          <!-- Modern Cyber Highway Street Luminescence Poles -->
          <g stroke="#6b21a8" stroke-width="3" fill="none">
            <path d="M370,475 Q350,415 330,415 L310,415"/>
            <circle cx="310" cy="418" r="5" fill="#c084fc" stroke="none"/>
            <ellipse cx="310" cy="430" rx="20" ry="8" fill="#a855f7" opacity="0.4" stroke="none"/>
            
            <path d="M1070,475 Q1090,415 1110,415 L1130,415"/>
            <circle cx="1130" cy="418" r="5" fill="#c084fc" stroke="none"/>
            <ellipse cx="1130" cy="430" rx="20" ry="8" fill="#a855f7" opacity="0.4" stroke="none"/>
          </g>
        </svg>
      </div>

      <div class="card auth-card text-center fade-in-up">
        <div class="portal-logo-wrapper">
          <div class="portal-icon-box admin-icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
        </div>
        <h2 class="auth-title">Akses Portal Admin & Korlay</h2>
        <p class="auth-desc">Masukkan PIN atau kata sandi akun untuk membuka dashboard.</p>
        
        <form @submit.prevent="verifyAuth" class="auth-form">
          <div class="form-group text-left">
            <label class="form-label" for="loginUser">Username</label>
            <input 
              v-model="loginUsername" 
              type="text" 
              id="loginUser"
              class="form-control" 
              placeholder="Contoh: admin / korlay" 
              ref="usernameInputRef"
            />
          </div>
          <div class="form-group text-left">
            <label class="form-label" for="loginPin">PIN / Kata Sandi</label>
            <div class="input-with-eye">
              <input 
                v-model="pinInput" 
                :type="showLoginPin ? 'text' : 'password'" 
                id="loginPin"
                class="form-control" 
                placeholder="Ketik PIN atau Sandi" 
                required 
                ref="pinInputRef"
              />
              <button 
                type="button" 
                @click="showLoginPin = !showLoginPin" 
                class="eye-toggle-btn"
                :title="showLoginPin ? 'Sembunyikan Sandi' : 'Tampilkan Sandi'"
              >
                <svg v-if="!showLoginPin" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                  <line x1="2" x2="22" y1="2" y2="22"/>
                </svg>
              </button>
            </div>
          </div>
          <p v-if="authError" class="error-text text-sm mb-4">❌ {{ authErrorMessage || 'PIN atau kredensial salah.' }}</p>
          <button type="submit" class="btn btn-primary w-full">Masuk Dashboard</button>
        </form>
        <NuxtLink to="/" class="btn btn-secondary w-full mt-4">&larr; Kembali ke Beranda</NuxtLink>
      </div>
    </div>

    <!-- Main Dashboard Screen -->
    <div v-else class="container fade-in-up">
      <!-- Header -->
      <div class="page-header">
        <div>
          <NuxtLink to="/" class="btn btn-secondary btn-sm mb-2">&larr; Kembali ke Beranda</NuxtLink>
          <div class="title-with-badge">
            <h1 class="page-title">{{ isKorlay ? 'Dashboard Monitoring Korlay' : 'Dashboard Admin' }}</h1>
            <span v-if="isKorlay" class="badge badge-korlay">👁️ {{ currentUsername }}</span>
            <span v-else class="badge badge-admin">👑 {{ currentUsername }}</span>
          </div>
          <p class="page-subtitle">
            {{ isKorlay 
              ? 'Pantau data dan analitik kerusakan armada secara real-time serta ekspor laporan PDF bulanan.' 
              : 'Kelola kredensial pengguna, pantau analisis armada, rekapitulasi data, dan cetak laporan PDF bulanan.' 
            }}
          </p>
        </div>
        <div class="header-actions">
          <div class="user-profile-badge">
            <span class="user-role-label">Masuk sebagai: <strong>{{ currentUsername }}</strong> ({{ currentUserRole }})</span>
          </div>
          <button @click="logout" class="btn btn-danger btn-sm">Keluar</button>
        </div>
      </div>

      <!-- Tabs Navigation -->
      <div class="tabs-nav card mb-6 p-2">
        <button 
          @click="activeTab = 'table'" 
          class="tab-btn" 
          :class="{ active: activeTab === 'table' }"
        >
          📋 Rekap Data Laporan
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
        <button 
          v-if="!isKorlay"
          @click="activeTab = 'users'" 
          class="tab-btn" 
          :class="{ active: activeTab === 'users' }"
        >
          👤 Kelola Pengguna
        </button>
      </div>

      <!-- Content Tab 1: User Management (Admin Only) -->
      <div v-if="activeTab === 'users' && !isKorlay" class="card p-6">
        <div class="card-header-flex">
          <div>
            <h2 class="card-title">👤 Kredensial Pengguna</h2>
            <p class="text-sm text-secondary">Kelola akses akun Sopir, Mekanik, Tim Operasional, dan Korlay.</p>
          </div>
          <button @click="openAddUserModal" class="btn btn-primary btn-sm">+ Tambah Pengguna</button>
        </div>

        <div class="table-container mt-4">
          <table class="data-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Role</th>
                <th>
                  <div class="th-pin-wrapper">
                    <span>PIN / Sandi</span>
                    <button 
                      type="button" 
                      @click="toggleAllPins" 
                      class="btn-icon-xs" 
                      :title="isAllPinsVisible ? 'Sembunyikan Semua PIN' : 'Tampilkan Semua PIN'"
                    >
                      <svg v-if="!isAllPinsVisible" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                        <line x1="2" x2="22" y1="2" y2="22"/>
                      </svg>
                    </button>
                  </div>
                </th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in usersList" :key="user.id">
                <td><strong>{{ user.username }}</strong></td>
                <td><span class="role-tag" :class="user.role.toLowerCase()">{{ user.role }}</span></td>
                <td>
                  <div class="pin-cell-wrapper">
                    <code class="pin-code">{{ visiblePins[user.id] ? user.pin : '••••••••' }}</code>
                    <button 
                      type="button" 
                      @click="togglePinVisibility(user.id)" 
                      class="btn-pin-toggle" 
                      :title="visiblePins[user.id] ? 'Sembunyikan PIN' : 'Lihat PIN'"
                    >
                      <svg v-if="!visiblePins[user.id]" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                        <line x1="2" x2="22" y1="2" y2="22"/>
                      </svg>
                    </button>
                  </div>
                </td>
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

      <!-- Content Tab 3: Table Monitoring -->
      <div v-else-if="activeTab === 'table'" class="card p-6">
        <div class="card-header-flex">
          <div>
            <h2 class="card-title">📋 Rekapitulasi Data Laporan</h2>
            <p class="text-sm text-secondary">Tabel pemantauan seluruh riwayat laporan kerusakan armada Trans Jateng.</p>
          </div>
          <button @click="loadData" class="btn btn-secondary btn-sm" :disabled="isLoading">
            {{ isLoading ? '🔄 Memuat...' : '🔄 Segarkan Data' }}
          </button>
        </div>

        <!-- Filter and Search Bar -->
        <div class="filter-search-bar mt-4 mb-4">
          <input 
            v-model="searchQuery" 
            type="text" 
            class="form-control flex-1" 
            placeholder="🔍 Cari No Armada, Nama Sopir, atau Deskripsi Kerusakan..."
          />
          <select v-model="statusFilter" class="form-select select-filter">
            <option value="Semua">Semua Status</option>
            <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
            <option value="Diproses">Diproses</option>
            <option value="Selesai">Selesai</option>
            <option value="Ditolak">Ditolak</option>
          </select>
        </div>

        <!-- Table View -->
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>No</th>
                <th>ID Laporan</th>
                <th>Tgl Lapor</th>
                <th>No Armada</th>
                <th>Pelapor (Sopir)</th>
                <th>Kerusakan</th>
                <th>Mekanik</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filteredReports.length === 0">
                <td colspan="9" class="text-center py-6 text-secondary">
                  Tidak ditemukan laporan yang sesuai kriteria pencarian.
                </td>
              </tr>
              <tr v-for="(r, idx) in filteredReports" :key="r.id">
                <td>{{ idx + 1 }}</td>
                <td><code class="text-xs">{{ r.id }}</code></td>
                <td>{{ r.tanggal_kerusakan }}</td>
                <td><strong class="text-primary">{{ r.no_armada }}</strong></td>
                <td>{{ r.nama_sopir }}</td>
                <td>{{ truncate(r.deskripsi, 40) }}</td>
                <td>{{ r.nama_mekanik || '-' }}</td>
                <td>
                  <span class="badge" :class="getStatusBadgeClass(r.status)">
                    {{ r.status }}
                  </span>
                </td>
                <td>
                  <div class="action-buttons-cell">
                    <button @click="openReportDetail(r)" class="btn btn-secondary btn-sm" title="Lihat Detail">
                      👁️ Detail
                    </button>
                    <button 
                      v-if="!isKorlay" 
                      @click="handleDeleteReport(r)" 
                      class="btn btn-danger btn-sm" 
                      title="Hapus Laporan Ini"
                    >
                      🗑️ Hapus
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Content Tab 4: Monthly PDF Report -->
      <div v-else-if="activeTab === 'reports'" class="card max-w-xl mx-auto">
        <h2 class="card-title">📅 Cetak Laporan Bulanan & Foto Dokumentasi</h2>
        <p class="card-desc">Pilih bulan dan tahun untuk mengekspor rekapitulasi data kerusakan armada lengkap dengan lampiran foto bukti perbaikan ke format PDF resmi.</p>
        
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

          <!-- Pilihan Lampiran Foto -->
          <div class="pdf-options-box mb-4">
            <label class="checkbox-label">
              <input type="checkbox" v-model="pdfExport.includePhotos" class="form-checkbox" />
              <span class="font-bold">📸 Tampilkan Kolom Foto Kerusakan & Hasil Perbaikan di Tabel</span>
            </label>
            <p class="text-xs text-secondary mt-1 ml-6">
              Menyertakan foto visual kondisi sebelum &amp; sesudah perbaikan langsung dalam 1 tabel di samping kolom deskripsi kerusakan.
            </p>
          </div>

          <button type="submit" class="btn btn-primary w-full" :disabled="isGeneratingPdf">
            <span v-if="isGeneratingPdf" class="btn-loading-flex">
              <span class="loader">&nbsp;</span>
              <span>Memproses Foto & Membuat PDF...</span>
            </span>
            <span v-else>📥 Buat & Download Laporan PDF</span>
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
            <input v-model="modalUser.form.username" type="text" id="newUsername" class="form-control" placeholder="Contoh: korlay2, aris, operasional2" required />
          </div>
          <div class="form-group">
            <label class="form-label" for="newPin">PIN / Kode Akses</label>
            <input v-model="modalUser.form.pin" type="text" id="newPin" class="form-control" placeholder="Contoh: password123, 2222, 1234" required />
          </div>
          <div class="form-group">
            <label class="form-label" for="newRole">Role</label>
            <select v-model="modalUser.form.role" id="newRole" class="form-select" required>
              <option value="Mekanik">Mekanik</option>
              <option value="Operasional">Operasional</option>
              <option value="Korlay">Korlay (Koordinator Layanan)</option>
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
              <option value="Korlay">Korlay (Koordinator Layanan)</option>
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

    <!-- Report Detail Modal (for monitoring) -->
    <div v-if="selectedReport" class="modal-overlay" @click.self="selectedReport = null">
      <div class="modal-content max-w-xl">
        <div class="modal-header-flex">
          <h3 class="modal-title">📄 Rincian Laporan Kerusakan</h3>
          <button @click="selectedReport = null" class="btn-close">&times;</button>
        </div>
        
        <div class="detail-body mt-4">
          <div class="detail-grid mb-4">
            <div>
              <span class="detail-label">ID Laporan:</span>
              <p class="detail-val font-mono">{{ selectedReport.id }}</p>
            </div>
            <div>
              <span class="detail-label">Status:</span>
              <p><span class="badge" :class="getStatusBadgeClass(selectedReport.status)">{{ selectedReport.status }}</span></p>
            </div>
            <div>
              <span class="detail-label">Nomor Armada:</span>
              <p class="detail-val text-primary font-bold">{{ selectedReport.no_armada }}</p>
            </div>
            <div>
              <span class="detail-label">Tanggal Lapor:</span>
              <p class="detail-val">{{ selectedReport.hari_kerusakan }}, {{ selectedReport.tanggal_kerusakan }}</p>
            </div>
            <div>
              <span class="detail-label">Nama Pengemudi:</span>
              <p class="detail-val">{{ selectedReport.nama_sopir }}</p>
            </div>
            <div>
              <span class="detail-label">Mekanik Penanggung Jawab:</span>
              <p class="detail-val">{{ selectedReport.nama_mekanik || 'Belum ditugaskan' }}</p>
            </div>
          </div>

          <div class="detail-box mb-4">
            <span class="detail-label">Deskripsi Kerusakan:</span>
            <p class="detail-text">{{ selectedReport.deskripsi }}</p>
          </div>

          <div v-if="selectedReport.catatan_operasional" class="detail-box alert-box mb-4">
            <span class="detail-label">Catatan Operasional:</span>
            <p class="detail-text">{{ selectedReport.catatan_operasional }}</p>
          </div>

          <div v-if="selectedReport.keterangan_hasil_perbaikan" class="detail-box success-box mb-4">
            <span class="detail-label">Hasil Perbaikan Mekanik:</span>
            <p class="detail-text">{{ selectedReport.keterangan_hasil_perbaikan }}</p>
            <small v-if="selectedReport.waktu_selesai" class="text-xs text-secondary">
              Diselesaikan pada: {{ formatDateTime(selectedReport.waktu_selesai) }}
            </small>
          </div>

          <!-- Documentation Photos -->
          <div class="photos-grid mb-4">
            <div v-if="selectedReport.foto_sebelum" class="photo-item">
              <span class="photo-label">Foto Awal (Sopir)</span>
              <img :src="selectedReport.foto_sebelum" alt="Foto Sebelum" class="photo-thumb" @click="openPhotoZoom(selectedReport.foto_sebelum)" />
            </div>
            <div v-if="selectedReport.foto_pasca_penanganan" class="photo-item">
              <span class="photo-label">Pasca Penanganan</span>
              <img :src="selectedReport.foto_pasca_penanganan" alt="Pasca Penanganan" class="photo-thumb" @click="openPhotoZoom(selectedReport.foto_pasca_penanganan)" />
            </div>
            <div v-if="selectedReport.foto_hasil_perbaikan" class="photo-item">
              <span class="photo-label">Hasil Perbaikan</span>
              <img :src="selectedReport.foto_hasil_perbaikan" alt="Hasil Perbaikan" class="photo-thumb" @click="openPhotoZoom(selectedReport.foto_hasil_perbaikan)" />
            </div>
          </div>

          <div class="modal-buttons mt-4">
            <button type="button" @click="selectedReport = null" class="btn btn-secondary flex-1">Tutup</button>
            <button 
              v-if="!isKorlay" 
              type="button" 
              @click="handleDeleteReport(selectedReport)" 
              class="btn btn-danger flex-1"
            >
              🗑️ Hapus Laporan
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Zoom Lightbox Modal -->
    <div v-if="zoomedPhotoUrl" class="modal-overlay" @click.self="zoomedPhotoUrl = null">
      <div class="lightbox-content">
        <img :src="zoomedPhotoUrl" alt="Zoomed Photo" class="lightbox-img" />
        <button @click="zoomedPhotoUrl = null" class="btn btn-secondary btn-sm lightbox-close">✕ Tutup</button>
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

const { fetchReports, fetchUsers, createUser, updateUser, deleteUser, deleteReport, clearAllReports, authenticateUser } = useReports()

useHead({
  title: 'Dashboard Admin & Monitoring - Trans Jateng',
  meta: [
    { name: 'description', content: 'Manajemen pengguna, analitik armada, pemantauan korlay, dan ekspor laporan PDF.' }
  ]
})

// Authentication State
const isAuthenticated = ref(false)
const loginUsername = ref('')
const pinInput = ref('')
const authError = ref(false)
const authErrorMessage = ref('')
const usernameInputRef = ref(null)
const pinInputRef = ref(null)
const showLoginPin = ref(false)
const visiblePins = ref({})

const togglePinVisibility = (userId) => {
  visiblePins.value[userId] = !visiblePins.value[userId]
}

const isAllPinsVisible = computed(() => {
  if (!usersList.value || usersList.value.length === 0) return false
  return usersList.value.every(u => visiblePins.value[u.id])
})

const toggleAllPins = () => {
  const willShow = !isAllPinsVisible.value
  const newMap = {}
  usersList.value.forEach(u => {
    newMap[u.id] = willShow
  })
  visiblePins.value = newMap
}

const currentUserRole = ref('Admin')
const currentUsername = ref('admin')

const isKorlay = computed(() => currentUserRole.value === 'Korlay')

const verifyAuth = async () => {
  authError.value = false
  authErrorMessage.value = ''

  if (!pinInput.value.trim()) {
    authError.value = true
    authErrorMessage.value = 'Silakan masukkan PIN atau kata sandi.'
    return
  }

  try {
    // Verifikasi aman langsung ke backend auth API
    const user = await authenticateUser(loginUsername.value, pinInput.value, 'Admin')
    if (user && (user.role === 'Admin' || user.role === 'Korlay')) {
      setSessionAndLogin(user)
      return
    }

    // Jika username tidak diisi, periksa kecocokan PIN untuk Admin / Korlay
    if (!loginUsername.value.trim()) {
      const userByPin = await authenticateUser('', pinInput.value)
      if (userByPin && (userByPin.role === 'Admin' || userByPin.role === 'Korlay')) {
        setSessionAndLogin(userByPin)
        return
      }
    }

    authError.value = true
    authErrorMessage.value = 'Username atau PIN / Sandi tidak sesuai.'
    pinInput.value = ''
  } catch (err) {
    console.error('Auth check error:', err)
    authError.value = true
    authErrorMessage.value = 'Terjadi kesalahan saat memverifikasi akses.'
  }
}

const setSessionAndLogin = (user) => {
  isAuthenticated.value = true
  currentUserRole.value = user.role
  currentUsername.value = user.username
  
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('transjateng_admin_authed', 'true')
    sessionStorage.setItem('transjateng_admin_role', user.role)
    sessionStorage.setItem('transjateng_admin_username', user.username)
  }

  activeTab.value = 'table'

  loadData()
  loadUsers()
}

const logout = () => {
  isAuthenticated.value = false
  currentUserRole.value = 'Admin'
  currentUsername.value = 'admin'
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('transjateng_admin_authed')
    sessionStorage.removeItem('transjateng_admin_role')
    sessionStorage.removeItem('transjateng_admin_username')
  }
  loginUsername.value = ''
  pinInput.value = ''
}

// Active Tab
const activeTab = ref('table') // 'table' | 'analytics' | 'reports' | 'users'

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
  if (isKorlay.value) {
    showToast('Akun Korlay tidak memiliki izin mengelola pengguna.')
    return
  }
  modalUser.form.username = ''
  modalUser.form.pin = ''
  modalUser.form.role = 'Mekanik'
  modalUser.showAdd = true
}

const submitCreateUser = async () => {
  if (isKorlay.value) return
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
  if (isKorlay.value) {
    showToast('Akun Korlay tidak memiliki izin mengelola pengguna.')
    return
  }
  modalUser.editingUser = user
  modalUser.form.username = user.username
  modalUser.form.pin = user.pin
  modalUser.form.role = user.role
  modalUser.showEdit = true
}

const submitEditUser = async () => {
  if (isKorlay.value) return
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
  if (isKorlay.value) {
    showToast('Akun Korlay tidak memiliki izin mengelola pengguna.')
    return
  }
  if (user.username === 'admin') {
    showToast('Admin utama tidak dapat dihapus.')
    return
  }
  if (confirm('Apakah Anda yakin ingin menghapus pengguna "' + user.username + '"?')) {
    try {
      await deleteUser(user.id)
      showToast('Pengguna "' + user.username + '" telah dihapus.')
      loadUsers()
    } catch (err) {
      showToast('Gagal menghapus pengguna.')
    }
  }
}

// Analytics, Table & PDF State
const reports = ref([])
const isLoading = ref(false)
const isGeneratingPdf = ref(false)
const selectedYear = ref(new Date().getFullYear())

// Table Search & Filter
const searchQuery = ref('')
const statusFilter = ref('Semua')
const selectedReport = ref(null)
const zoomedPhotoUrl = ref(null)

const openReportDetail = (report) => {
  selectedReport.value = report
}

const openPhotoZoom = (url) => {
  zoomedPhotoUrl.value = url
}

const handleDeleteReport = async (report) => {
  if (!report) return
  if (confirm(`Apakah Anda yakin ingin menghapus laporan armada "${report.no_armada}" (ID: ${report.id})?`)) {
    try {
      await deleteReport(report.id)
      showToast(`Laporan ${report.id} berhasil dihapus.`)
      if (selectedReport.value?.id === report.id) {
        selectedReport.value = null
      }
      await loadData()
    } catch (err) {
      console.error('Failed to delete report:', err)
      showToast('Gagal menghapus laporan.')
    }
  }
}

const handleClearAllReports = async () => {
  const confirmText = prompt('Ketik "HAPUS" untuk mengonfirmasi penghapusan seluruh riwayat data laporan:')
  if (confirmText === 'HAPUS') {
    try {
      await clearAllReports()
      showToast('Semua riwayat data laporan berhasil dibersihkan.')
      selectedReport.value = null
      await loadData()
    } catch (err) {
      console.error('Failed to clear all reports:', err)
      showToast('Gagal mengosongkan data laporan.')
    }
  } else if (confirmText !== null) {
    showToast('Konfirmasi dibatalkan (kata kunci tidak sesuai).')
  }
}

const filteredReports = computed(() => {
  return reports.value.filter(r => {
    // Status Filter
    if (statusFilter.value !== 'Semua' && r.status !== statusFilter.value) {
      return false
    }
    // Search Query
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase().trim()
      const matchNo = (r.no_armada || '').toLowerCase().includes(q)
      const matchSopir = (r.nama_sopir || '').toLowerCase().includes(q)
      const matchDesc = (r.deskripsi || '').toLowerCase().includes(q)
      const matchMekanik = (r.nama_mekanik || '').toLowerCase().includes(q)
      const matchId = (r.id || '').toLowerCase().includes(q)
      return matchNo || matchSopir || matchDesc || matchMekanik || matchId
    }
    return true
  })
})

const truncate = (text, max = 35) => {
  if (!text) return '-'
  return text.length > max ? text.substring(0, max) + '...' : text
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

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'Menunggu Verifikasi': return 'badge-pending'
    case 'Diproses': return 'badge-processing'
    case 'Selesai': return 'badge-completed'
    case 'Ditolak': return 'badge-rejected'
    default: return 'badge-pending'
  }
}

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
  year: new Date().getFullYear(),
  includePhotos: true
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
      currentUserRole.value = sessionStorage.getItem('transjateng_admin_role') || 'Admin'
      currentUsername.value = sessionStorage.getItem('transjateng_admin_username') || 'admin'
      
      activeTab.value = 'table'

      loadData()
      loadUsers()
    } else {
      setTimeout(() => {
        usernameInputRef.value?.focus()
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

// Helper untuk memuat gambar dari URL menjadi format Base64 yang siap dimasukkan ke jsPDF
const loadImageAsBase64 = async (url) => {
  if (!url) return null
  if (typeof url === 'string' && url.startsWith('data:image/')) return url

  try {
    const response = await fetch(url, { mode: 'cors' })
    if (!response.ok) throw new Error('Fetch failed with status ' + response.status)
    const blob = await response.blob()
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = () => resolve(null)
      reader.readAsDataURL(blob)
    })
  } catch (err) {
    // Fallback: Gunakan HTML Image element dan Canvas
    return new Promise((resolve) => {
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas')
          canvas.width = img.naturalWidth || img.width
          canvas.height = img.naturalHeight || img.height
          const ctx = canvas.getContext('2d')
          if (!ctx) return resolve(null)
          ctx.drawImage(img, 0, 0)
          resolve(canvas.toDataURL('image/jpeg', 0.85))
        } catch {
          resolve(null)
        }
      }
      img.onerror = () => resolve(null)
      setTimeout(() => resolve(null), 4000)
      img.src = url
    })
  }
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
      showToast('Tidak ada laporan kerusakan pada bulan ' + monthNames[pdfExport.month] + ' ' + pdfExport.year + '.')
      isGeneratingPdf.value = false
      return
    }

    showToast('⏳ Sedang memproses data dan foto laporan...')

    // Muat semua foto terlebih dahulu jika opsi foto diaktifkan
    let processedReports = filtered
    if (pdfExport.includePhotos) {
      processedReports = await Promise.all(
        filtered.map(async (r) => {
          const fotoSebelumBase64 = r.foto_sebelum ? await loadImageAsBase64(r.foto_sebelum) : null
          const fotoSesudahUrl = r.foto_hasil_perbaikan || r.foto_pasca_penanganan
          const fotoSesudahBase64 = fotoSesudahUrl ? await loadImageAsBase64(fotoSesudahUrl) : null
          return {
            ...r,
            loadedFotoSebelum: fotoSebelumBase64,
            loadedFotoSesudah: fotoSesudahBase64
          }
        })
      )
    }

    const { jsPDF } = await import('jspdf')
    const { default: autoTable } = await import('jspdf-autotable')

    // Format A4 Landscape (297mm x 210mm) untuk tabel lebar dengan foto
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    })

    // ========================================================
    // HEADER KOP DOKUMEN RESMI
    // ========================================================
    doc.setFont('Helvetica', 'bold')
    doc.setFontSize(13)
    doc.setTextColor(15, 23, 42)
    doc.text('PEMERINTAH PROVINSI JAWA TENGAH - DINAS PERHUBUNGAN', 148.5, 13, { align: 'center' })
    doc.setFontSize(12.5)
    doc.text('LAPORAN REKAPITULASI KERUSAKAN & PERBAIKAN ARMADA TRANS JATENG', 148.5, 19, { align: 'center' })
    
    doc.setFont('Helvetica', 'normal')
    doc.setFontSize(9.5)
    doc.setTextColor(100, 116, 139)
    doc.text('Periode: ' + monthNames[pdfExport.month] + ' ' + pdfExport.year + '  |  Total Laporan: ' + filtered.length + ' Data', 148.5, 24.5, { align: 'center' })
    
    // Garis Aksen Oranye Trans Jateng
    doc.setDrawColor(249, 115, 22)
    doc.setLineWidth(0.8)
    doc.line(10, 27.5, 287, 27.5)

    // ========================================================
    // TABEL TUNGGAL REKAPITULASI LAPORAN (DENGAN KOLOM FOTO)
    // ========================================================
    if (pdfExport.includePhotos) {
      // Tabel lengkap dengan 2 kolom foto tepat di samping deskripsi kerusakan
      const tableHead = [[
        'No',
        'ID Laporan',
        'Tgl Rusak',
        'No Armada',
        'Pelapor (Sopir)',
        'Deskripsi Kerusakan',
        'Foto Kerusakan (Sebelum)',
        'Foto Hasil (Sesudah)',
        'Mekanik',
        'Status'
      ]]

      const tableBody = processedReports.map((r, index) => {
        let deskripsiContent = r.deskripsi || '-'
        if (r.keterangan_hasil_perbaikan) {
          deskripsiContent += '\n\nPenanganan: ' + r.keterangan_hasil_perbaikan
        }

        let fotoSebelumText = ''
        if (!r.loadedFotoSebelum) {
          fotoSebelumText = r.foto_sebelum ? '(Gagal memuat)' : '(Tidak ada foto)'
        }

        let fotoSesudahText = ''
        const hasFotoSesudah = r.foto_hasil_perbaikan || r.foto_pasca_penanganan
        if (!r.loadedFotoSesudah) {
          if (hasFotoSesudah) {
            fotoSesudahText = '(Gagal memuat)'
          } else if (r.status === 'Selesai') {
            fotoSesudahText = '(Tidak ada foto)'
          } else {
            fotoSesudahText = '(Belum selesai)'
          }
        }

        return [
          index + 1,
          r.id,
          r.tanggal_kerusakan,
          r.no_armada,
          r.nama_sopir,
          deskripsiContent,
          fotoSebelumText,
          fotoSesudahText,
          r.nama_mekanik || 'Belum Ditugaskan',
          r.status
        ]
      })

      autoTable(doc, {
        startY: 31,
        margin: { left: 10, right: 10, top: 15, bottom: 15 },
        head: tableHead,
        body: tableBody,
        theme: 'grid',
        headStyles: {
          fillColor: [15, 23, 42],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 8,
          halign: 'center',
          valign: 'middle',
          cellPadding: 2
        },
        bodyStyles: {
          fontSize: 7.5,
          cellPadding: 2,
          overflow: 'linebreak',
          valign: 'middle',
          textColor: [30, 41, 59],
          minCellHeight: 25
        },
        alternateRowStyles: {
          fillColor: [248, 250, 252]
        },
        columnStyles: {
          0: { cellWidth: 8, halign: 'center' },
          1: { cellWidth: 26, halign: 'center', fontSize: 7 },
          2: { cellWidth: 18, halign: 'center', fontSize: 7.5 },
          3: { cellWidth: 18, halign: 'center', fontStyle: 'bold' },
          4: { cellWidth: 26 },
          5: { cellWidth: 53 },
          6: { cellWidth: 35, halign: 'center', valign: 'middle', fontSize: 7, textColor: [148, 163, 184], fontStyle: 'italic' },
          7: { cellWidth: 35, halign: 'center', valign: 'middle', fontSize: 7, textColor: [148, 163, 184], fontStyle: 'italic' },
          8: { cellWidth: 26 },
          9: { cellWidth: 32, halign: 'center', fontStyle: 'bold' }
        },
        didDrawCell: (data) => {
          if (data.section === 'body') {
            const rowIndex = data.row.index
            const r = processedReports[rowIndex]
            if (!r) return

            // Kolom 6: Foto Sebelum (Laporan Sopir)
            if (data.column.index === 6 && r.loadedFotoSebelum) {
              const cell = data.cell
              const pad = 1.5
              const imgW = cell.width - pad * 2
              const imgH = cell.height - pad * 2
              try {
                doc.addImage(r.loadedFotoSebelum, 'JPEG', cell.x + pad, cell.y + pad, imgW, imgH)
              } catch (e) {
                console.warn('Failed to embed before photo:', e)
              }
            } 
            // Kolom 7: Foto Sesudah (Hasil Perbaikan Mekanik)
            else if (data.column.index === 7 && r.loadedFotoSesudah) {
              const cell = data.cell
              const pad = 1.5
              const imgW = cell.width - pad * 2
              const imgH = cell.height - pad * 2
              try {
                doc.addImage(r.loadedFotoSesudah, 'JPEG', cell.x + pad, cell.y + pad, imgW, imgH)
              } catch (e) {
                console.warn('Failed to embed after photo:', e)
              }
            }
          }
        }
      })
    } else {
      // Tabel standar tanpa kolom foto
      const tableHead = [[
        'No',
        'ID Laporan',
        'Tgl Rusak',
        'No Armada',
        'Pelapor (Sopir)',
        'Deskripsi & Penanganan Kerusakan',
        'Mekanik',
        'Status'
      ]]

      const tableBody = processedReports.map((r, index) => {
        let deskripsiContent = r.deskripsi || '-'
        if (r.keterangan_hasil_perbaikan) {
          deskripsiContent += '\n\nPenanganan: ' + r.keterangan_hasil_perbaikan
        }
        return [
          index + 1,
          r.id,
          r.tanggal_kerusakan,
          r.no_armada,
          r.nama_sopir,
          deskripsiContent,
          r.nama_mekanik || 'Belum Ditugaskan',
          r.status
        ]
      })

      autoTable(doc, {
        startY: 31,
        margin: { left: 10, right: 10, top: 15, bottom: 15 },
        head: tableHead,
        body: tableBody,
        theme: 'grid',
        headStyles: {
          fillColor: [15, 23, 42],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 8.5,
          halign: 'center',
          valign: 'middle',
          cellPadding: 2.5
        },
        styles: {
          fontSize: 8,
          cellPadding: 2.5,
          overflow: 'linebreak',
          valign: 'middle',
          textColor: [30, 41, 59]
        },
        alternateRowStyles: {
          fillColor: [248, 250, 252]
        },
        columnStyles: {
          0: { cellWidth: 10, halign: 'center' },
          1: { cellWidth: 32, halign: 'center' },
          2: { cellWidth: 22, halign: 'center' },
          3: { cellWidth: 22, halign: 'center', fontStyle: 'bold' },
          4: { cellWidth: 32 },
          5: { cellWidth: 93 },
          6: { cellWidth: 32 },
          7: { cellWidth: 34, halign: 'center', fontStyle: 'bold' }
        }
      })
    }

    // ========================================================
    // TANDA TANGAN & PENGESAHAN DOKUMEN
    // ========================================================
    const finalY = doc.lastAutoTable?.finalY || 100
    let signY = finalY + 12

    // Pindah ke halaman baru jika ruang tidak cukup untuk tanda tangan
    if (signY > 165) {
      doc.addPage('a4', 'landscape')
      signY = 25
    }

    doc.setFont('Helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(30, 41, 59)
    doc.text('Purwokerto, ' + new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }), 235, signY, { align: 'center' })
    doc.text('Mengetahui,', 235, signY + 5, { align: 'center' })
    doc.text(isKorlay.value ? 'Koordinator Layanan Trans Jateng' : 'Kepala Operasional Trans Jateng', 235, signY + 10, { align: 'center' })
    
    doc.setDrawColor(148, 163, 184)
    doc.setLineWidth(0.5)
    doc.line(205, signY + 28, 265, signY + 28)
    doc.setFont('Helvetica', 'bold')
    doc.text('( ______________________ )', 235, signY + 33, { align: 'center' })

    // ========================================================
    // NOMOR HALAMAN & FOOTER DOKUMEN
    // ========================================================
    const totalPages = doc.getNumberOfPages()
    for (let p = 1; p <= totalPages; p++) {
      doc.setPage(p)
      doc.setFont('Helvetica', 'normal')
      doc.setFontSize(7.5)
      doc.setTextColor(148, 163, 184)
      doc.text(`Trans Jateng Armada Management System  |  Halaman ${p} dari ${totalPages}`, 148.5, 204, { align: 'center' })
    }

    const fileName = 'Laporan_Kerusakan_' + monthNames[pdfExport.month] + '_' + pdfExport.year + '.pdf'
    doc.save(fileName)

    showToast('🎉 Laporan PDF lengkap dengan tabel foto berhasil dibuat dan diunduh!')
  } catch (err) {
    console.error('PDF Generation Error:', err)
    showToast('Gagal memproses ekspor PDF.')
  } finally {
    isGeneratingPdf.value = false
  }
}
</script>

<style scoped>
.title-with-badge {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.badge-admin {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
}
.badge-korlay {
  background: rgba(168, 85, 247, 0.15);
  color: #c084fc;
  border: 1px solid rgba(168, 85, 247, 0.3);
}
.user-profile-badge {
  background: var(--bg-tertiary);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-glass);
  font-size: 0.85rem;
  color: var(--text-secondary);
}
.user-role-label strong {
  color: var(--text-primary);
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
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

.filter-search-bar {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.select-filter {
  width: auto;
  min-width: 200px;
}

.table-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-glass);
  background: var(--bg-secondary);
  width: 100%;
}
.data-table {
  width: 100%;
  min-width: 850px;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.95rem;
}
.data-table th, .data-table td {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid var(--border-glass);
  white-space: nowrap;
}
.data-table th {
  background: var(--bg-tertiary);
  font-weight: 700;
  color: var(--text-primary);
  white-space: nowrap;
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
.role-tag.korlay {
  background: rgba(168, 85, 247, 0.15);
  color: #a855f7;
}
.action-buttons-cell {
  display: flex;
  gap: 0.5rem;
}

.table-actions-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
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
.text-left {
  text-align: left;
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
.max-w-md {
  max-width: 460px;
}
.max-w-lg {
  max-width: 600px;
}
.max-w-xl {
  max-width: 700px;
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
.py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}
.w-full {
  width: 100%;
}
.flex-1 {
  flex: 1;
}
.mr-2 {
  margin-right: 0.5rem;
}
.text-xs {
  font-size: 0.75rem;
}
.text-sm {
  font-size: 0.875rem;
}
.font-mono {
  font-family: monospace;
}
.font-bold {
  font-weight: 700;
}
.text-primary {
  color: var(--primary);
}
.text-secondary {
  color: var(--text-secondary);
}

.modal-header-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-glass);
  padding-bottom: 0.85rem;
  position: sticky;
  top: -1.75rem;
  background: var(--bg-secondary);
  z-index: 10;
  margin: -1.75rem -1.75rem 0 -1.75rem;
  padding: 1.25rem 1.75rem 0.85rem 1.75rem;
  border-top-left-radius: var(--radius-lg);
  border-top-right-radius: var(--radius-lg);
}
.btn-close {
  background: transparent;
  border: none;
  font-size: 1.6rem;
  line-height: 1;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-sm);
  transition: color var(--transition-fast), background-color var(--transition-fast), transform var(--transition-fast);
}
.btn-close:hover,
.btn-close:active,
.btn-close:focus {
  color: #ef4444 !important;
  background: rgba(239, 68, 68, 0.12);
  transform: scale(1.15);
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
.detail-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  display: block;
  margin-bottom: 0.25rem;
}
.detail-val {
  font-size: 0.95rem;
  color: var(--text-primary);
}
.detail-box {
  background: var(--bg-tertiary);
  padding: 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-glass);
  overflow-wrap: anywhere;
  word-break: break-word;
}
.detail-text {
  font-size: 0.9rem;
  color: var(--text-primary);
  margin-top: 0.25rem;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  word-break: break-word;
}
.alert-box {
  background: rgba(239, 68, 68, 0.08);
  border-color: rgba(239, 68, 68, 0.2);
}
.success-box {
  background: rgba(16, 185, 129, 0.08);
  border-color: rgba(16, 185, 129, 0.2);
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
}
.photo-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.photo-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-secondary);
}
.photo-thumb {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-glass);
  cursor: pointer;
  transition: transform var(--transition-fast);
}
.photo-thumb:hover {
  transform: scale(1.03);
}

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

.modal-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
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
  .detail-grid {
    grid-template-columns: 1fr;
  }
  .filter-search-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
  .select-filter {
    width: 100%;
    min-width: unset;
  }
}

@media (max-width: 640px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  .header-actions {
    width: 100%;
    justify-content: space-between;
  }
  .card-header-flex {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
  .card-header-flex .btn {
    width: 100%;
  }
  .tabs-nav {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding: 0.35rem;
    scrollbar-width: none;
    -ms-overflow-style: none;
    gap: 0.35rem;
  }
  .tabs-nav::-webkit-scrollbar {
    display: none;
  }
  .tab-btn {
    flex: 0 0 auto;
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
    white-space: nowrap;
  }
}

/* ==========================================================================
   Full Page Animated Cyber Midnight Expressway (Admin Theme)
   ========================================================================== */
.admin-page-root {
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
  background: #090514;
}

:root.light .auth-fullscreen-page {
  background: #f3e8ff;
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

.admin-icon-box {
  background: rgba(139, 92, 246, 0.15);
  color: #8b5cf6;
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.35);
}

.moving-dashes-cyber {
  animation: dashCyber 0.8s linear infinite;
}

.shield-pulse-ring {
  animation: shieldPulse 2.5s ease-out infinite;
  transform-origin: center;
}

@keyframes dashCyber {
  0% { stroke-dashoffset: 75; }
  100% { stroke-dashoffset: 0; }
}

@keyframes shieldPulse {
  0% { transform: scale(0.7); opacity: 0.95; }
  100% { transform: scale(2.2); opacity: 0; }
}

/* PDF Options Box */
.pdf-options-box {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-md);
  padding: 1rem;
}
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: var(--text-primary);
}
.form-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: var(--primary);
}
.btn-loading-flex {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
}


/* PIN show/hide eye toggle styling */
.input-with-eye {
  position: relative;
  display: flex;
  align-items: center;
}

.input-with-eye .form-control {
  padding-right: 2.75rem;
}

.eye-toggle-btn {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  color: var(--text-secondary, #94a3b8);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 4px;
  transition: color 0.2s ease;
}

.eye-toggle-btn:hover {
  color: #f97316;
}

.th-pin-wrapper {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.pin-cell-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.pin-code {
  font-family: var(--font-mono, monospace);
  font-size: 0.9rem;
  letter-spacing: 1px;
}

.btn-pin-toggle,
.btn-icon-xs {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(148, 163, 184, 0.15);
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: var(--text-secondary, #94a3b8);
  padding: 0.25rem 0.35rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-pin-toggle:hover,
.btn-icon-xs:hover {
  background: rgba(249, 115, 22, 0.15);
  border-color: rgba(249, 115, 22, 0.5);
  color: #f97316;
  transform: scale(1.08);
}

</style>
