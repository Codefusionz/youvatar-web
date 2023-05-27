'use client'

import { useRouter, usePathname } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

import Spinner from '@/components/Spinner'
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { LOGIN_ROUTE } from '@/utils/routes'
import { user } from '@/signals/auth'
import supabase from '@/lib/supabase-browser'

type SupabaseContext = {
  supabase: SupabaseClient
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') router.replace('/dashboard')
      else if (event === 'SIGNED_OUT') router.replace('/login')

      if (session) {
        const { data, error } = await supabase
          .from('profiles')
          .select()
          .eq('id', session.user.id)
          .single()
        user.value = data
      }

      if (pathname === LOGIN_ROUTE && session) {
        router.replace('/dashboard')
      }

      if (event === 'INITIAL_SESSION' && !session) {
        router.replace(LOGIN_ROUTE)
      }
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase])

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner style={{ height: 50, width: 50, color: '#3949ab' }} />
      </div>
    )
  }

  return (
    <Context.Provider value={{ supabase }}>
      <>{children}</>
    </Context.Provider>
  )
}

export const useSupabase = () => {
  let context = useContext(Context)

  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider')
  }

  return context
}
