// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Trans Jateng Armada - Sistem Laporan Kerusakan',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Sistem pelaporan & monitoring perbaikan kerusakan armada BRT Trans Jateng.' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: 'https://upload.wikimedia.org/wikipedia/id/a/a9/Logo_Trans_Jateng.svg' }
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
