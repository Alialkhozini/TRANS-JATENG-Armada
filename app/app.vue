<template>
  <div class="app-layout">
    <!-- Banner Instansi Dinas Perhubungan -->
    <div class="demo-banner">
      Dinas Perhubungan Provinsi Jawa Tengah
    </div>

    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="navbar-container">
        <NuxtLink to="/" class="navbar-brand">
          <img src="https://upload.wikimedia.org/wikipedia/id/a/a9/Logo_Trans_Jateng.svg" alt="Trans Jateng Logo" class="navbar-logo-img" />
          <span>Trans</span>Jateng <small class="brand-sub">Armada</small>
        </NuxtLink>

        <!-- Right Side Nav Actions -->
        <div class="navbar-nav-group">
          <ul class="navbar-nav" :class="{ open: isMobileMenuOpen }">
            <li><NuxtLink to="/" class="navbar-link" @click="isMobileMenuOpen = false">Beranda</NuxtLink></li>
            <li><NuxtLink to="/sopir" class="navbar-link" @click="isMobileMenuOpen = false">Sopir</NuxtLink></li>
            <li><NuxtLink to="/operasional" class="navbar-link" @click="isMobileMenuOpen = false">Operasional</NuxtLink></li>
            <li><NuxtLink to="/mekanik" class="navbar-link" @click="isMobileMenuOpen = false">Mekanik</NuxtLink></li>
            <li><NuxtLink to="/rekap" class="navbar-link" @click="isMobileMenuOpen = false">Rekap & Laporan</NuxtLink></li>
          </ul>

          <!-- Theme Toggle Switch -->
          <button @click="toggleTheme" class="theme-toggle-btn" aria-label="Toggle Theme">
            <!-- Moon Icon (shown in light theme to switch to dark) -->
            <svg v-if="isLightTheme" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            <!-- Sun Icon (shown in dark theme to switch to light) -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
          </button>

          <!-- Burger Menu for Mobile -->
          <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="menu-toggle-btn" aria-label="Menu">
            <!-- Close SVG (when menu open) -->
            <svg v-if="isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            <!-- Hamburger SVG (when menu closed) -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </div>
    </nav>

    <!-- Page Content -->
    <main>
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer class="app-footer">
      <div class="footer-container">
        <p>&copy; 2026 Trans Jateng Armada. Sistem Pelaporan & Pelacakan Kerusakan Armada.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useReports } from '~/composables/useReports'

const { isMock } = useReports()

const isMobileMenuOpen = ref(false)
const isLightTheme = ref(false)

onMounted(() => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('transjateng_theme')
    const userPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
    
    if (savedTheme === 'light' || (!savedTheme && userPrefersLight)) {
      document.documentElement.classList.add('light')
      isLightTheme.value = true
    } else {
      document.documentElement.classList.remove('light')
      isLightTheme.value = false
    }
  }
})

const toggleTheme = () => {
  if (typeof window !== 'undefined') {
    if (document.documentElement.classList.contains('light')) {
      document.documentElement.classList.remove('light')
      localStorage.setItem('transjateng_theme', 'dark')
      isLightTheme.value = false
    } else {
      document.documentElement.classList.add('light')
      localStorage.setItem('transjateng_theme', 'light')
      isLightTheme.value = true
    }
  }
}
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.demo-banner {
  background: linear-gradient(90deg, #0a0f1d, #1e3a8a);
  color: #ffffff;
  text-align: center;
  padding: 0.45rem 1rem;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  z-index: 101;
  position: relative;
  border-bottom: 1.5px solid #d97706;
}
.brand-sub {
  font-size: 0.75rem;
  opacity: 0.6;
  margin-left: 0.35rem;
  font-weight: 400;
  border-left: 1px solid var(--border-glass);
  padding-left: 0.35rem;
  color: var(--text-secondary);
}
main {
  flex: 1;
}
.app-footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-glass);
  padding: 2rem 0;
  text-align: center;
  margin-top: 4rem;
  transition: background-color var(--transition-normal);
}
.footer-container p { 
  color: var(--text-muted);
  font-size: 0.85rem;
}

/* Overrides for Mobile Layout */
@media (max-width: 900px) {
  .demo-banner {
    display: none !important;
  }
  .brand-sub {
    display: none !important;
  }
  .theme-toggle-btn {
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }
  .navbar-logo-img {
    height: 30px; /* slightly smaller logo on mobile */
  }
  .navbar-brand {
    font-size: 1.25rem; /* smaller brand name on mobile */
  }
}
</style>
