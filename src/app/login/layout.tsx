export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 h-screen">
      <div className="col-span-2 hidden lg:block bg-primary"></div>
      {children}
    </div>
  )
}
