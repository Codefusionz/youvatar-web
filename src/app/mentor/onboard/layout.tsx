import Image from 'next/image'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      <div className="col-span-1 hidden bg-primary relative lg:flex items-center justify-center">
        <h1 className="text-white text-[50px] font-black">
          Come teach <br /> with us.
        </h1>
        <Image
          className="absolute bottom-0 -right-24 w-auto"
          src="/png/mentor.png"
          alt="mentor"
          width={300}
          height={300}
          priority
        />
      </div>
      {children}
    </div>
  )
}
