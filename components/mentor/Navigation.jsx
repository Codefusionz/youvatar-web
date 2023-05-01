import clsxm from '@/lib/clsxm'
import { HomeIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'

const MentorNavigation = ({ isOpen, toggle }) => {
  const router = useRouter()

  return (
    <>
      <div className="bg-primary p-8 mr-4 text-white w-[300px] h-screen hidden lg:block">
        <h1 className="font-bold text-2xl mb-6">Logo</h1>
        <Link
          href="/mentor/dashboard"
          className={`flex flex-row gap-2 items-center cursor-pointer p-2 rounded-md ${
            router.pathname === '/mentor/dashboard' && 'bg-white text-primary'
          }`}
        >
          <HomeIcon className="h-6 w-6" />
          <span>Home</span>
        </Link>
        <Link
          href="/mentor/dashboard/courses"
          className={`flex flex-row gap-2 items-center cursor-pointer my-2 p-2 rounded-md ${
            router.pathname === '/mentor/dashboard/courses' &&
            'bg-white text-primary'
          }`}
        >
          <HomeIcon className="h-6 w-6" />
          <span>Your courses</span>
        </Link>
        <div
          className={`flex flex-row gap-2 items-center cursor-pointer my-2 p-2 rounded-md ${
            router.pathname === '/mentor/calendar' && 'bg-white text-primary'
          }`}
        >
          <HomeIcon className="h-6 w-6" />
          <span>Calendar</span>
        </div>
        <div
          className={`flex flex-row gap-2 items-center cursor-pointer my-2 p-2 rounded-md ${
            router.pathname === '/mentor/test' && 'bg-white text-primary'
          }`}
        >
          <HomeIcon className="h-6 w-6" />
          <span>Test</span>
        </div>
        <div
          className={`flex flex-row gap-2 items-center cursor-pointer my-2 p-2 rounded-md ${
            router.pathname === '/mentor/assignment' && 'bg-white text-primary'
          }`}
        >
          <HomeIcon className="h-6 w-6" />
          <span>Assignment</span>
        </div>
        <div
          className={`flex flex-row gap-2 items-center cursor-pointer my-2 p-2 rounded-md ${
            router.pathname === '/mentor/assessment' && 'bg-white text-primary'
          }`}
        >
          <HomeIcon className="h-6 w-6" />
          <span>Assessment</span>
        </div>
        <div
          className={`flex flex-row gap-2 items-center cursor-pointer my-2 p-2 rounded-md ${
            router.pathname === '/mentor/notification' &&
            'bg-white text-primary'
          }`}
        >
          <HomeIcon className="h-6 w-6" />
          <span>Notification</span>
        </div>

        <div className="flex items-center absolute bottom-10">
          <img
            className="w-12 h-full mr-2 rounded-full"
            src="/png/student1.png"
            alt="mentor"
          />
          <div className="flex flex-col">
            <span className="text-white text-md">Nidihi Singh</span>
            <span className="text-gray-300 text-sm">UX Developer</span>
          </div>
        </div>
      </div>

      {/* mobile screen */}
      {/* <div className={clsxm('lg:hidden text-white', 'bg-primary p-4')}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Bars3Icon className="h-8 w-8 text-white mr-2" onClick={toggle} />
            <div className="text-sm font-black">Youvatar</div>
          </div>

          <div className="flex items-center">
            <MagnifyingGlassIcon className="h-6 w-6 text-white mr-3" />
            <img
              src="/svg/question.svg"
              alt="question"
              className="w-6 h-6 mr-3"
            />
            <BellIcon className="h-6 w-6 text-white mr-3" />
            <UserBadge className="w-10 h-10" />
          </div>
        </div>
      </div> */}
      {isOpen && (
        <div
          className={clsxm(
            'absolute top-0 left-0 block w-72 bg-white lg:hidden',
            'h-screen overflow-y-auto duration-300 ease-in-out z-50',
            isOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="my-6 mx-5">
            <div className="flex items-center justify-between mb-8">
              <div className="text-2xl text-primary font-bold">Youvatar</div>
              <button type="button" onClick={toggle}>
                <XMarkIcon
                  alt="close"
                  className="absolute top-6 right-6 w-7 h-7 text-primary"
                />
              </button>
            </div>
            <div className="text-primary">
              <Link
                href="/mentor/dashboard"
                className={`flex flex-row gap-2 items-center cursor-pointer p-2 rounded-md`}
              >
                <HomeIcon className="h-6 w-6 text-primary" />
                <span>Home</span>
              </Link>
              <Link
                href="/mentor/dashboard/courses"
                className={`flex flex-row gap-2 items-center cursor-pointer p-2 rounded-md `}
              >
                <HomeIcon className="h-6 w-6" />
                <span>Your courses</span>
              </Link>
              <Link
                href="/mentor/dashboard/courses/create"
                className={`flex flex-row gap-2 items-center cursor-pointer p-2 rounded-md `}
              >
                <HomeIcon className="h-6 w-6" />
                <span>Create courses</span>
              </Link>
              <Link
                href="/"
                className={`flex flex-row gap-2 items-center cursor-pointer p-2 rounded-md `}
              >
                <HomeIcon className="h-6 w-6" />
                <span>Calendar</span>
              </Link>
              <Link
                href="/"
                className={`flex flex-row gap-2 items-center cursor-pointer p-2 rounded-md ${
                  router.pathname === '/mentor/dashboard' &&
                  'bg-white text-primary'
                }`}
              >
                <HomeIcon className="h-6 w-6" />
                <span>Test & Assignment</span>
              </Link>
              <Link
                href="/"
                className={`flex flex-row gap-2 items-center cursor-pointer p-2 rounded-md ${
                  router.pathname === '/mentor/dashboard' &&
                  'bg-white text-primary'
                }`}
              >
                <HomeIcon className="h-6 w-6" />
                <span>Explore</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MentorNavigation
