import clsxm from '@/lib/clsxm'
import { HomeIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { signOut } from 'next-auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const StudentNavigation = ({ isOpen, toggle }) => {
  const router = useRouter()
  const user = useSelector((state) => state.user.data)

  return (
    <>
      <div className="bg-primary p-4 rounded-tr-2xl h-screen rounded-br-3xl mr-4 text-white w-[300px] hidden lg:block">
        <div className="flex items-center mt-10">
          <div
            className={clsxm(
              'rounded-full flex items-center  justify-center flex-shrink-0 h-12 w-12 bg-white',
              'text-3xl font-extrabold text-primary mr-4'
            )}
          >
            Y
          </div>
          <div className="text-3xl font-extrabold text-white">Youvatar</div>
        </div>
        <div className="relative mt-24">
          <input
            type="text"
            className={clsxm(
              'bg-white py-4 pl-12 pr-5  rounded-[10px]  text-black',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
            )}
            placeholder="Search"
          />
          <div className="absolute transform top-[18.6px] left-4 flex items-center">
            <img src="/svg/search.svg" alt="search" className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-7">
          <Link
            href="/"
            className={`flex flex-row gap-2 items-center cursor-pointer p-3 mb-3 rounded-md `}
          >
            <HomeIcon className="h-6 w-6" />
            <span>Explore</span>
          </Link>
          <Link
            href={'/mentor/dashboard'}
            className={`flex flex-row gap-2 items-center cursor-pointer p-2 rounded-md `}
          >
            <HomeIcon className="h-6 w-6" />

            {'Mentor dashboard'}
          </Link>
          <Link
            href="/student/dashboard"
            className={`flex flex-row gap-2 items-center cursor-pointer  p-3 mb-3 rounded-md `}
          >
            <HomeIcon className="h-6 w-6" />
            <span>Student dashboard</span>
          </Link>
        </div>

        <div className="flex items-center absolute bottom-10">
          <img
            className=" mr-2"
            src="/png/mentor.png"
            alt="mentor"
            width={50}
            height={50}
          />
          <div className="flex flex-col">
            <span className="text-white text-md">Nidihi Singh</span>
          </div>
        </div>
      </div>

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
              href="/student/dashboard"
              className={`flex flex-row gap-2 items-center cursor-pointer p-2 rounded-md`}
            >
              <HomeIcon className="h-6 w-6 text-primary" />
              <span>Home</span>
            </Link>
            <Link
              href="/"
              className={`flex flex-row gap-2 items-center cursor-pointer p-2 rounded-md`}
            >
              <HomeIcon className="h-6 w-6 text-primary" />
              <span>Explore</span>
            </Link>
            <Link
              href="/student/findcourses"
              className={`flex flex-row gap-2 items-center cursor-pointer p-2 rounded-md`}
            >
              <HomeIcon className="h-6 w-6 text-primary" />
              <span>Find courses</span>
            </Link>
            <Link
              href="/student/courses"
              className={`flex flex-row gap-2 items-center cursor-pointer p-2 rounded-md `}
            >
              <HomeIcon className="h-6 w-6" />
              <span>Your courses</span>
            </Link>
            <Link
              href="/student/assignments"
              className={`flex flex-row gap-2 items-center cursor-pointer p-2 rounded-md `}
            >
              <HomeIcon className="h-6 w-6" />
              <span>Exams and Assignments</span>
            </Link>
            <button
              onClick={signOut}
              className="bg-red-500 p-2 w-52 text-white rounded-md font-bold mt-5"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default StudentNavigation
