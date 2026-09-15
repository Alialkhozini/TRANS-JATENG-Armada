import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => ({}))
  const { username, pin, role } = body || {}

  const cleanPin = typeof pin === 'string' ? pin.trim() : ''
  const cleanUsername = typeof username === 'string' ? username.trim().toLowerCase() : ''

  if (!cleanPin) {
    return {
      success: false,
      message: 'Silakan masukkan PIN atau kata sandi.'
    }
  }

  const config = useRuntimeConfig(event)
  const url = config.public.supabaseUrl
  const key = config.supabaseSecretKey || config.public.supabaseKey

  const hasValidConfig = url && key && !url.includes('your-supabase') && !key.includes('your-supabase')

  if (hasValidConfig) {
    try {
      const supabase = createClient(url, key)
      let query = supabase.from('pengguna').select('id, username, role, pin')

      if (cleanUsername) {
        query = query.ilike('username', cleanUsername)
      }

      if (role) {
        if (role === 'Admin' || role === 'Korlay') {
          query = query.in('role', ['Admin', 'Korlay'])
        } else {
          query = query.eq('role', role)
        }
      }

      const { data, error } = await query

      if (error) {
        console.error('Supabase query error during login:', error)
      } else if (data && data.length > 0) {
        const matched = data.find((u: any) => {
          const pinMatches = String(u.pin).trim() === cleanPin
          const userMatches = !cleanUsername || u.username.toLowerCase() === cleanUsername
          const roleMatches = !role || (role === 'Admin' || role === 'Korlay' ? (u.role === 'Admin' || u.role === 'Korlay') : u.role === role)
          return pinMatches && userMatches && roleMatches
        })

        if (matched) {
          return {
            success: true,
            user: {
              id: matched.id,
              username: matched.username,
              role: matched.role
            }
          }
        }
      }
    } catch (err) {
      console.error('Failed to verify credentials on Supabase:', err)
    }
  }

  return {
    success: false,
    message: 'Username atau PIN / Sandi tidak sesuai.'
  }
})
