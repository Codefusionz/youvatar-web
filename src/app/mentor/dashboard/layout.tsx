'use client'

import { useSupabase } from '@/app/providers/supabase-provider'
import Spinner from '@/components/Spinner'
import { setMentor } from '@/redux/slice/user'
import { ASSET_PREFIX } from '@/utils/constants'
import { createProfileImage } from '@/utils/helpers'
import {
  HomeIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Bars3Icon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const MentorDashboardTabs = [
  {
    id: 1,
    title: 'Home',
    href: '/mentor/dashboard',
    Icon: <HomeIcon className="h-6 w-6 text-primary" />,
  },
  {
    id: 2,
    title: 'Your courses ',
    href: '/mentor/dashboard/courses',
    Icon: <HomeIcon className="h-6 w-6 text-primary" />,
  },

  {
    id: 3,
    title: 'Create course',
    href: '/mentor/dashboard/courses/create',
    Icon: <HomeIcon className="h-6 w-6 text-primary" />,
  },
  {
    id: 4,
    title: 'Calender',
    href: '/mentor/dashboard/calender',
    Icon: <HomeIcon className="h-6 w-6 text-primary" />,
  },
  {
    id: 5,
    title: 'Test & Assignment',
    href: '/mentor/test',
    Icon: <HomeIcon className="h-6 w-6 text-primary" />,
  },
  {
    id: 6,
    title: 'Explore',
    href: '/',
    Icon: <HomeIcon className="h-6 w-6 text-primary" />,
  },
]
export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const user = useSelector((state: any) => state?.user?.data)
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  const { supabase } = useSupabase()
  const dispatch = useDispatch()

  const toggle = () => setIsOpen(!isOpen)

  const fetchMentor = async () => {
    const { data, error } = await supabase
      .from('mentor')
      .select()
      .eq('id', user?.id)
      .single()

    if (!error) {
      dispatch(setMentor(data))
      setLoading(false)
    } else router.replace('/mentor/onboard')
  }

  useEffect(() => {
    if (!user) router.replace('/login')
    fetchMentor()
  }, [user])

  if (loading)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner style={{ width: 50, height: 50, color: '#3949ab' }} />
      </div>
    )

  return (
    <>
      <div className="hidden p-6 lg:flex items-center justify-between">
        <div className="text-4xl font-extrabold text-primary">Youvatar</div>
        <div className="flex flex-row gap-6 mt-2">
          {MentorDashboardTabs.map(({ id, title, href }) => (
            <div
              className="flex flex-col items-center justify-start cursor-pointer"
              key={id}
              onClick={() => router.push(href)}
            >
              <span
                className={href === pathname ? 'text-primary' : 'text-gray-900'}
              >
                {title}
              </span>
              {href === pathname && (
                <div className="mt-1 h-1.5 w-[80%] bg-primary rounded-lg"></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
          <img src="/svg/question.svg" alt="question" className="w-6 h-6" />
          <Image
            className="rounded-full aspect-square object-cover w-[36px] h-full border border-white"
            alt="mentor-image"
            width={36}
            height={36}
            src={
              user?.image
                ? ASSET_PREFIX + user?.image
                : createProfileImage(user?.username)
            }
          />
        </div>
      </div>
      <div className="px-5 pb-3 pt-5 lg:hidden">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <button onClick={toggle}>
              <Bars3Icon className="h-8 w-8 text-primary" />
            </button>
            <div className="text-3xl lg:text-5xl font-extrabold text-primary ml-3">
              Youvatar
            </div>
          </div>
          <img src="/svg/question.svg" alt="question" className="w-6 h-6" />
        </div>
        <div className="relative w-full">
          <input
            type="text"
            className="bg-[#F7F7F7] py-2 lg:py-4 pl-2 pr-10 w-full  rounded-xl  text-black focus:outline-none focus:ring-2 focus:ring-gray focus:border-transparent"
            placeholder="Search"
          />
          <div className="absolute transform top-2.5 right-4 flex items-center">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className={clsx(
            'absolute top-0 left-0 block w-72 bg-white lg:hidden',
            'h-screen overflow-y-auto duration-300 ease-in-out z-50',
            isOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="my-6 mx-5">
            <div className="flex items-center justify-between mb-8">
              <div className="text-2xl text-primary font-bold">Youvatar</div>
              <button type="button" onClick={toggle}>
                <XMarkIcon className="absolute top-6 right-6 w-7 h-7 text-primary" />
              </button>
            </div>
            <div className="text-primary">
              {MentorDashboardTabs.map(({ id, title, href, Icon }) => (
                <Link
                  key={id}
                  href={href}
                  className="flex flex-row gap-2 items-center cursor-pointer p-2 rounded-md"
                >
                  {Icon}
                  <span>{title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  )
}
