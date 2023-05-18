'use client'

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

import Spinner from '@/components/Spinner'
import { setUser } from '@/redux/slice/user'
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useDispatch } from 'react-redux'

type SupabaseContext = {
  supabase: SupabaseClient
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const dispatch = useDispatch()

  const getUser = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('id', userId)
      .single()

    if (error) {
      router.push('/onboard')
    }

    setLoading(false)
    dispatch(setUser(data))
  }

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) getUser(session?.user.id)
      else setLoading(false)
      router.refresh()
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
