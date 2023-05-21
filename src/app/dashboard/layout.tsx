'use client'

import { useSupabase } from '@/app/providers/supabase-provider'
import {
  ArrowTopRightOnSquareIcon,
  HomeIcon as HomeIconOutline,
  MagnifyingGlassIcon as MagnifyingGlassIconOutline,
  PaperAirplaneIcon,
  ShoppingCartIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import {
  HomeIcon as HomeIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
  PaperAirplaneIcon as PaperAirplaceIconSolid,
} from '@heroicons/react/24/solid'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { supabase } = useSupabase()
  const user = useSelector((state: any) => state?.user?.data)
  const pathname = usePathname()
  const router = useRouter()

  const NavLink = (props: {
    path: string
    name: string
    SolidIcon: React.ComponentType<any>
    OutlineIcon: React.ComponentType<any>
  }) => {
    const { SolidIcon, OutlineIcon } = props

    return (
      <Link
        href={props.path}
        className={clsx(
          pathname === props.path && 'text-primary font-bold',
          'flex flex-row items-center text-gray-800 gap-4 cursor-pointer p-2 rounded-md'
        )}
      >
        {pathname === props.path ? (
          <SolidIcon className="h-7 w-7" />
        ) : (
          <OutlineIcon className="h-7 w-7" />
        )}
        <span className="">{props.name}</span>
      </Link>
    )
  }

  return (
    <div className="h-screen flex flex-row">
      <div className="bg-white text-gray-800 hidden justify-between h-full flex-col gap-4 border-r border-gray-200 lg:flex">
        <div className="w-[250px] p-4">
          <div className="text-3xl mt-4 w-full text-primary font-extrabold">
            Youvatar
          </div>
          <div className="flex flex-col gap-2 mt-7">
            <NavLink
              path="/dashboard"
              name="Home"
              SolidIcon={HomeIconSolid}
              OutlineIcon={HomeIconOutline}
            />
            <NavLink
              path="/dashboard/explore"
              name="Explore"
              SolidIcon={MagnifyingGlassIconSolid}
              OutlineIcon={MagnifyingGlassIconOutline}
            />
            <NavLink
              path="/dashboard/cart"
              name="Cart"
              SolidIcon={ShoppingCartIcon}
              OutlineIcon={ShoppingCartIcon}
            />
            <NavLink
              path="/dashboard/chat"
              name="Chat"
              SolidIcon={PaperAirplaceIconSolid}
              OutlineIcon={PaperAirplaneIcon}
            />
            <NavLink
              path="/dashboard/profile"
              name="Profile"
              SolidIcon={UserIcon}
              OutlineIcon={UserIcon}
            />

            <Link
              href="/student/dashboard"
              className={`flex flex-row gap-4 items-center cursor-pointer p-2 rounded-md`}
            >
              <ArrowTopRightOnSquareIcon className="h-7 w-7" />
              <span>Student Dashboard</span>
            </Link>
            <Link
              href={user?.isMentor ? '/mentor/dashboard' : '/mentor/onboard'}
              className={`flex flex-row gap-4 items-center cursor-pointer p-2 rounded-md`}
            >
              <ArrowTopRightOnSquareIcon className="h-7 w-7" />
              <span>
                {user?.isMentor ? 'Mentor Dashboard' : 'Become a mentor'}
              </span>
            </Link>
            <button
              className="flex flex-row gap-4 items-center mt-4 cursor-pointer p-2 bg-primary text-center mx-auto w-full rounded-md"
              onClick={async () => {
                await supabase.auth.signOut()
                router.push('/')
              }}
            >
              <span className="text-center w-full text-white">Logout</span>
            </button>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}
