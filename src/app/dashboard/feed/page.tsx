'use client'

import { useSupabase } from '@/app/supabase-provider'
import { useState } from 'react'

export default function Page() {
  const [content, setContent] = useState('')
  const { supabase } = useSupabase()

  return <div>Feed Page</div>
}
