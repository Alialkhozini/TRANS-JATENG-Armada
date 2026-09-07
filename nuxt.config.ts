// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: {
        lang: 'id'
      },
      title: 'Trans Jateng Armada - Sistem Laporan & Monitoring Kerusakan Bus',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Sistem resmi pelaporan, validasi, dan monitoring perbaikan kerusakan armada bus BRT Trans Jateng secara real-time.' },
        { name: 'keywords', content: 'Trans Jateng, BRT Trans Jateng, Armada Trans Jateng, Dishub Jateng, Dinas Perhubungan Jawa Tengah, Laporan Kerusakan Bus, Bus Trans Jateng, transjateng.my.id' },
        { name: 'author', content: 'Dinas Perhubungan Provinsi Jawa Tengah' },
        { name: 'robots', content: 'index, follow' },
        { name: 'theme-color', content: '#f97316' },
        
        // OpenGraph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://transjateng.my.id/' },
        { property: 'og:title', content: 'Trans Jateng Armada - Sistem Laporan & Monitoring Kerusakan Bus' },
        { property: 'og:description', content: 'Solusi terintegrasi untuk mendokumentasikan kerusakan dan pemantauan perbaikan armada bus BRT Trans Jateng secara terpusat dan real-time.' },
        { property: 'og:image', content: 'https://upload.wikimedia.org/wikipedia/id/a/a9/Logo_Trans_Jateng.svg' },
        { property: 'og:site_name', content: 'BRT Trans Jateng Armada' },
        { property: 'og:locale', content: 'id_ID' },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: 'https://transjateng.my.id/' },
        { name: 'twitter:title', content: 'Trans Jateng Armada - Sistem Laporan & Monitoring Kerusakan Bus' },
        { name: 'twitter:description', content: 'Sistem resmi pelaporan & monitoring perbaikan armada BRT Trans Jateng.' },
        { name: 'twitter:image', content: 'https://upload.wikimedia.org/wikipedia/id/a/a9/Logo_Trans_Jateng.svg' },
        
        // Google Search Console Verification Meta
        { name: 'google-site-verification', content: process.env.GOOGLE_SITE_VERIFICATION || 'nPLNgvfPk3cqqaUT4NE_9zj85mCOiBqzONBvqZk2Lpc' }
      ],
      link: [
        { rel: 'canonical', href: 'https://transjateng.my.id/' },
        { rel: 'manifest', href: '/manifest.json' },
        { rel: 'icon', type: 'image/svg+xml', href: 'https://upload.wikimedia.org/wikipedia/id/a/a9/Logo_Trans_Jateng.svg' }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'GovernmentService',
            name: 'Trans Jateng Armada - Sistem Pelaporan Kerusakan Bus',
            serviceType: 'Public Transportation Fleet Management',
            provider: {
              '@type': 'GovernmentOrganization',
              name: 'Dinas Perhubungan Provinsi Jawa Tengah',
              url: 'https://transjateng.my.id/'
            },
            description: 'Sistem terintegrasi untuk dokumentasi laporan kerusakan, penugasan mekanik, dan monitoring perbaikan bus Trans Jateng.',
            url: 'https://transjateng.my.id/'
          })
        }
      ]
    }
  },
  runtimeConfig: {
    // Kunci rahasia server
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || '',
    telegramChatId: process.env.TELEGRAM_CHAT_ID || '',
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || '',
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || '',
    supabaseSecretKey: process.env.SUPABASE_SECRET_KEY || '',
    
    // Kunci publik client-side
    public: {
      supabaseUrl: process.env.SUPABASE_URL || process.env.NUXT_PUBLIC_SUPABASE_URL || '',
      supabaseKey: process.env.SUPABASE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NUXT_PUBLIC_SUPABASE_KEY || ''
    }
  }
})
