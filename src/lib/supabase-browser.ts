import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/types/supabase'

const supabase = createBrowserSupabaseClient<Database>()

export default supabase
