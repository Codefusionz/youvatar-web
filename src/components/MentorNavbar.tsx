'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ASSET_PREFIX, MentorDashboardTabs } from '@/utils/constants'
import Link from 'next/link'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import clsx from 'clsx'
import { mentor, user } from '@/signals/auth'
import { createProfileImage } from '@/utils/helpers'
import { Mentor } from '@/lib/types/mentor'

export default function MentorNavbar(props: { mentor: Mentor }) {
  const pathname = usePathname()
  const [sidebareOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    mentor.value = props.mentor
  }, [])

  return (
    <div>
      <div className="hidden p-6 lg:flex items-center justify-between">
        <div className="text-4xl font-extrabold text-primary">Youvatar</div>

        <div className="flex flex-row gap-6 mt-2">
          {MentorDashboardTabs.map(({ id, title, href }) => (
            <Link
              className="flex flex-col items-center justify-start cursor-pointer"
              key={id}
              href={href}
            >
              <span
                className={href === pathname ? 'text-primary' : 'text-gray-900'}
              >
                {title}
              </span>
              {href === pathname && (
                <div className="mt-1 h-1.5 w-[80%] bg-primary rounded-lg"></div>
              )}
            </Link>
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
              user.value?.image
                ? ASSET_PREFIX + user.value?.image
                : createProfileImage(user.value?.username)
            }
          />
        </div>
      </div>
      <div className="px-5 pb-3 pt-5 lg:hidden">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <button onClick={() => setSidebarOpen((e) => !e)}>
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

      {sidebareOpen && (
        <div
          className={clsx(
            'absolute top-0 left-0 block w-72 bg-white lg:hidden',
            'h-screen overflow-y-auto duration-300 ease-in-out z-50',
            sidebareOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="my-6 mx-5">
            <div className="flex items-center justify-between mb-8">
              <div className="text-2xl text-primary font-bold">Youvatar</div>
              <button type="button" onClick={() => setSidebarOpen((e) => !e)}>
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
    </div>
  )
}
