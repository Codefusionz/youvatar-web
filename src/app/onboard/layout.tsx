import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  })

  const { data } = await supabase.auth.getSession()

  if (!data.session) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select()
    .eq('id', data.session?.user?.id)
    .single()

  if (profile) redirect('/dashboard/feed')

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 h-screen">
      <div className="col-span-2 hidden lg:block bg-primary"></div>
      <div className="col-span-1 w-full p-4 md:max-w-md md:mx-auto">
        {children}
      </div>
    </div>
  )
}
