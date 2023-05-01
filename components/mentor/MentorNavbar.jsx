import clsxm from '@/lib/clsxm'
import { S3_PREFIX } from '@/utils/constants'
import { createProfileImage } from '@/utils/helpers'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Bars3Icon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import MentorNavigation from './Navigation'

const MentorDashboardTabs = [
  {
    id: 1,
    title: 'Home',
    href: '/mentor/dashboard',
  },
  {
    id: 2,
    title: 'Your courses ',
    href: '/mentor/dashboard/courses',
  },

  {
    id: 3,
    title: 'Create course',
    href: '/mentor/dashboard/courses/create',
  },
  {
    id: 4,
    title: 'Calender',
    href: '/mentor/dashboard/calender',
  },
  {
    id: 5,
    title: 'Test & Assignment',
    href: '/mentor/test',
  },
  {
    id: 6,
    title: 'Explore',
    href: '/',
  },
]
const MentorNavbar = () => {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const user = useSelector((state) => state.user.data)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

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
                className={
                  href === router.route ? 'text-primary' : 'text-gray-900'
                }
              >
                {title}
              </span>
              {href === router.route && (
                <div className="mt-1 h-1.5 w-[80%] bg-primary rounded-lg"></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
          <img src="/svg/question.svg" alt="question" className="w-6 h-6" />
          <img
            className="rounded-full aspect-square object-cover w-[36px] h-full border border-white"
            src={
              user?.image
                ? S3_PREFIX + user?.image
                : createProfileImage(user?.username)
            }
            alt="mentor"
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
            className={clsxm(
              'bg-[#F7F7F7] py-2 lg:py-4 pl-2 pr-10 w-full  rounded-xl  text-black',
              'focus:outline-none focus:ring-2 focus:ring-gray focus:border-transparent'
            )}
            placeholder="Search"
          />
          <div className="absolute transform top-2.5 right-4 flex items-center">
            <img src="/svg/search.svg" alt="search" className="w-5 h-5" />
          </div>
        </div>
      </div>
      {isOpen && <MentorNavigation isOpen={isOpen} toggle={toggle} />}
    </>
  )
}

export default MentorNavbar
