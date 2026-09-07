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
            <input 
              v-model="pinInput" 
              type="password" 
              id="loginPin"
              class="form-control" 
              placeholder="Ketik PIN atau Sandi" 
              required 
              ref="pinInputRef"
            />
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
            <span v-if="isKorlay" class="badge badge-korlay">👁️ Mode Pantau Korlay</span>
            <span v-else class="badge badge-admin">👑 Administrator</span>
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
          v-if="!isKorlay"
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
          @click="activeTab = 'table'" 
          class="tab-btn" 
          :class="{ active: activeTab === 'table' }"
        >
          📋 Rekap Data Laporan
        </button>
        <button 
          @click="activeTab = 'reports'" 
          class="tab-btn" 
          :class="{ active: activeTab === 'reports' }"
        >
          📄 Cetak Laporan PDF
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

const { fetchReports, fetchUsers, createUser, updateUser, deleteUser, deleteReport, clearAllReports } = useReports()

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

const currentUserRole = ref('Admin')
const currentUsername = ref('admin')

const isKorlay = computed(() => currentUserRole.value === 'Korlay')

const verifyAuth = async () => {
  authError.value = false
  authErrorMessage.value = ''

  try {
    const list = await fetchUsers()
    
    // 1. Check if user specified a username
    if (loginUsername.value.trim()) {
      const uname = loginUsername.value.trim().toLowerCase()
      const found = list.find(u => 
        u.username.toLowerCase() === uname && 
        u.pin === pinInput.value.trim() &&
        (u.role === 'Admin' || u.role === 'Korlay')
      )
      
      if (found) {
        setSessionAndLogin(found)
        return
      }
    }

    // 2. If no username or username didn't match, check PIN / password directly
    const inputPin = pinInput.value.trim()
    const foundByPin = list.find(u => 
      u.pin === inputPin && 
      (u.role === 'Admin' || u.role === 'Korlay')
    )

    if (foundByPin) {
      setSessionAndLogin(foundByPin)
      return
    }

    // Direct fallback check for default credentials
    if (inputPin === '9999' || (loginUsername.value.toLowerCase() === 'admin' && inputPin === '9999')) {
      setSessionAndLogin({ username: 'admin', role: 'Admin' })
      return
    }

    if (inputPin === 'password123' || (loginUsername.value.toLowerCase() === 'korlay' && inputPin === 'password123')) {
      setSessionAndLogin({ username: 'korlay', role: 'Korlay' })
      return
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

  if (user.role === 'Korlay') {
    activeTab.value = 'analytics'
  } else {
    activeTab.value = 'users'
  }

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
const activeTab = ref('users') // 'users' | 'analytics' | 'table' | 'reports'

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
      currentUserRole.value = sessionStorage.getItem('transjateng_admin_role') || 'Admin'
      currentUsername.value = sessionStorage.getItem('transjateng_admin_username') || 'admin'
      
      if (currentUserRole.value === 'Korlay') {
        activeTab.value = 'analytics'
      } else {
        activeTab.value = 'users'
      }

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

    const { jsPDF } = await import('jspdf')
    const { default: autoTable } = await import('jspdf-autotable')

    // Gunakan format A4 Landscape (297mm x 210mm) agar tabel 8 kolom proporsional & rapi
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    })

    // Judul Kop Dokumen
    doc.setFont('Helvetica', 'bold')
    doc.setFontSize(15)
    doc.setTextColor(15, 23, 42)
    doc.text('LAPORAN BULANAN KERUSAKAN ARMADA TRANS JATENG', 148.5, 18, { align: 'center' })
    
    doc.setFont('Helvetica', 'normal')
    doc.setFontSize(10.5)
    doc.setTextColor(100, 116, 139)
    doc.text('Periode: ' + monthNames[pdfExport.month] + ' ' + pdfExport.year, 148.5, 25, { align: 'center' })
    
    // Garis Aksen Oranye Khas Trans Jateng
    doc.setDrawColor(249, 115, 22)
    doc.setLineWidth(0.8)
    doc.line(14, 29, 283, 29)

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
      startY: 34,
      margin: { left: 14, right: 14 },
      head: [['No', 'ID Laporan', 'Tgl Rusak', 'No Armada', 'Pelapor (Sopir)', 'Deskripsi Kerusakan', 'Mekanik', 'Status']],
      body: tableBody,
      theme: 'grid',
      headStyles: {
        fillColor: [15, 23, 42],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 9,
        halign: 'center',
        valign: 'middle',
        cellPadding: 3
      },
      styles: {
        fontSize: 8.5,
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
        2: { cellWidth: 24, halign: 'center' },
        3: { cellWidth: 24, halign: 'center', fontStyle: 'bold' },
        4: { cellWidth: 32 },
        5: { cellWidth: 77 },
        6: { cellWidth: 35 },
        7: { cellWidth: 35, halign: 'center' }
      }
    })

    const lastTableY = doc.lastAutoTable?.finalY || 100
    const finalY = lastTableY + 15
    
    let currentY = finalY
    if (finalY > 165) {
      doc.addPage()
      currentY = 25
    }

    doc.setFont('Helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(30, 41, 59)
    doc.text('Semarang, ' + new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }), 225, currentY, { align: 'center' })
    doc.text('Mengetahui,', 225, currentY + 6, { align: 'center' })
    doc.text(isKorlay.value ? 'Koordinator Layanan Trans Jateng' : 'Kepala Operasional Trans Jateng', 225, currentY + 11, { align: 'center' })
    
    doc.setDrawColor(148, 163, 184)
    doc.setLineWidth(0.5)
    doc.line(195, currentY + 30, 255, currentY + 30)
    doc.setFont('Helvetica', 'bold')
    doc.text('( ______________________ )', 225, currentY + 35, { align: 'center' })

    const fileName = 'Laporan_Kerusakan_' + monthNames[pdfExport.month] + '_' + pdfExport.year + '.pdf'
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
  padding-bottom: 1rem;
}
.btn-close {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: var(--text-secondary);
  cursor: pointer;
}
.btn-close:hover {
  color: var(--text-primary);
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
  }
}

@media (max-width: 640px) {
  .tabs-nav {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding: 0.35rem;
    scrollbar-width: none;
  }
  .tabs-nav::-webkit-scrollbar {
    display: none;
  }
  .tab-btn {
    flex: 0 0 auto;
    padding: 0.5rem 1rem;
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
</style>
