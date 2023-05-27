import MentorNavbar from '@/components/MentorNavbar'
import supabaseServer from '@/lib/supabase-server'
import { redirect } from 'next/navigation'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = supabaseServer()

  const { data, error } = await supabase.auth.getSession()

  if (error) redirect('/login')

  const { data: mentor, error: failed } = await supabase
    .from('mentor')
    .select()
    .eq('id', data.session?.user.id)
    .single()

  if (failed) redirect('/mentor/onboard')

  return (
    <>
      <MentorNavbar mentor={mentor} />
      {children}
    </>
  )
}
