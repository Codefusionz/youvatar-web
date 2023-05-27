import Navbar from '@/components/Navbar'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen flex flex-row">
      <Navbar />
      {children}
    </div>
  )
}
