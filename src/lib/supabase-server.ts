import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'
import { Database, Json } from '@/lib/types/supabase'

export default () =>
  createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })
