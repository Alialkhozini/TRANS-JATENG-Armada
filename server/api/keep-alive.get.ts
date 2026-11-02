import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const url = config.public.supabaseUrl
  const key = config.supabaseSecretKey || config.public.supabaseKey

  const hasValidConfig = url && key && !url.includes('your-supabase') && !key.includes('your-supabase')

  if (!hasValidConfig) {
    return {
      status: 'skipped',
      message: 'Supabase credentials not configured',
      timestamp: new Date().toISOString()
    }
  }

  try {
    const supabase = createClient(url, key)
    // Query ringan ke tabel pengguna untuk mentrigger aktivitas database Supabase
    const { data, error } = await supabase
      .from('pengguna')
      .select('id')
      .limit(1)

    if (error) {
      throw error
    }

    return {
      status: 'ok',
      message: 'Supabase database is active and awake! 🚀',
      queryCount: data?.length ?? 0,
      timestamp: new Date().toISOString()
    }
  } catch (err: any) {
    setResponseStatus(event, 500)
    return {
      status: 'error',
      message: err.message || 'Failed to ping Supabase',
      timestamp: new Date().toISOString()
    }
  }
})
