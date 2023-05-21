import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'
import Link from 'next/link'

export default async function Page() {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  })

  const { data } = await supabase.auth.getSession()

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-4">
      <h1 className="text-6xl font-bold text-primary">Landing Page</h1>
      {data.session ? (
        <Link
          className="text-lg px-3 mt-4 rounded-md py-1 font-semibold text-white bg-primary"
          href="/dashboard"
        >
          Go to Dashboard
        </Link>
      ) : (
        <Link
          className="text-lg px-3 mt-4 rounded-md py-1 font-semibold text-white bg-primary"
          href="/login"
        >
          Login
        </Link>
      )}
    </div>
  )
}
