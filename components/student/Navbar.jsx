import clsxm from '@/lib/clsxm'
import { S3_PREFIX } from '@/utils/constants'
import { createProfileImage } from '@/utils/helpers'
import { Bars3Icon, BellIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import StudentNavigation from './StudentNavigation'

const StudentDashboardTabs = [
  {
    id: 1,
    title: 'Home',
    href: '/student/dashboard',
  },
  {
    id: 2,
    title: 'Find Courses ',
    href: '/student/findcourses',
  },

  {
    id: 3,
    title: 'Your Courses',
    href: '/student/courses',
  },
  {
    id: 4,
    title: 'Exams and assignments',
    href: '/student/assignments',
  },
  {
    id: 5,
    title: 'Explore',
    href: '/',
  },
]

const Navbar = () => {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const user = useSelector((state) => state.user.data)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div className="pt-12 pl-12 pr-7 hidden lg:block">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-10">
            <span className="text-5xl font-extrabold text-primary">
              Youvatar
            </span>
            <div className="flex flex-row gap-6 mt-2">
              {StudentDashboardTabs.map(({ id, title, href, index }) => (
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
          </div>
          <div className="flex items-center gap-4">
            <BellIcon className="h-7 w-7 text-primary" />
            <div className="flex items-center">
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
        </div>
      </div>
      <div className="pt-5 pl-12 pr-[90px] hidden lg:block">
        <div className="flex items-center justify-between">
          <div className="relative w-full mr-9">
            <input
              type="text"
              className={clsxm(
                'bg-[#F7F7F7] py-4 pl-3 pr-10 w-full  rounded-xl  text-black',
                'focus:outline-none focus:ring-2 focus:ring-gray focus:border-transparent',
                'placeholder-black'
              )}
              placeholder="Search anything"
            />
            <div className="absolute transform top-[18.6px] right-4 flex items-center">
              <img src="/svg/search.svg" alt="search" className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black">
            Search among <span className="text-primary font-medium">580</span>{' '}
            courses and find your favourite course
          </div>
        </div>
      </div>
      {/* mobile screen */}
      <div className="px-5 pb-3 pt-5 lg:hidden">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <button onClick={toggle}>
              <Bars3Icon className="h-8 w-8 text-primary mr-2" />
            </button>
            <div className="text-3xl lg:text-5xl font-extrabold text-primary mr-10">
              Youvatar
            </div>
          </div>
          <div className="rounded-full flex items-center  justify-center flex-shrink-0 h-16 w-16  bg-gray">
            <img src="/svg/notification.svg" />
          </div>
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
      {isOpen && <StudentNavigation isOpen={isOpen} toggle={toggle} />}
    </>
  )
}

export default Navbar
