import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    // Return a dummy client that always returns empty data
    // This prevents crashes when env vars are missing
    console.warn('[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
    return {
      from: () => ({
        select: () => ({
          eq: function(this: any) { return this },
          order: function(this: any) { return this },
          limit: function(this: any) { return this },
          single: () => Promise.resolve({ data: null, error: { message: 'No Supabase credentials' } }),
          then: (resolve: any) => resolve({ data: [], error: { message: 'No Supabase credentials' } }),
        }),
        insert: () => Promise.resolve({ data: null, error: { message: 'No Supabase credentials' } }),
      }),
    } as any
  }

  const cookieStore = cookies()
  return createServerClient(url, key, {
    cookies: {
      getAll() { return cookieStore.getAll() },
      setAll(cookiesToSet: any[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {}
      },
    },
  })
}
