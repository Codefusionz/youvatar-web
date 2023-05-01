import CreatePostModal from '@/components/posts/CreatePostModal'
import CreatePostModalThree from '@/components/posts/CreatePostModalThree'
import CreatePostModalTwo from '@/components/posts/CreatePostModalTwo'
import { S3_PREFIX } from '@/utils/constants'
import { createProfileImage } from '@/utils/helpers'
import {
  ArrowRightOnRectangleIcon,
  BuildingStorefrontIcon,
  HomeIcon as HomeIconOutline,
  MagnifyingGlassIcon as MagnifyingGlassIconOutline,
  PaperAirplaneIcon,
  PlusCircleIcon,
  ShoppingCartIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import {
  HomeIcon as HomeIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
  PaperAirplaneIcon as PaperAirplaceIconSolid,
} from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLongPress } from 'use-long-press'

const HomeNavigation = ({ isOpen, toggle, courseData }) => {
  const router = useRouter()
  const user = useSelector((state) => state.user.data)
  const [overflowOptionsOpen, setOverflowOptionsOpen] = useState(false)
  const overflowOptionsRef = useRef(null)
  // console.log(user)
  const [showPostModal, setShowPostModal] = useState(false)
  const [modalNo, setModalNo] = useState(1)

  const bind = useLongPress(() => {
    setOverflowOptionsOpen(true)
  })

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        overflowOptionsRef.current &&
        !overflowOptionsRef.current.contains(event.target)
      ) {
        setOverflowOptionsOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)

    return () => document.removeEventListener('click', handleClickOutside)
  }, [overflowOptionsRef])

  const handleContextMenu = (event) => {
    event.preventDefault()
  }

  if (!user) return <></>

  return (
    <>
      {modalNo === 1 && showPostModal && (
        <CreatePostModal
          setShowPostModal={setShowPostModal}
          setModalNo={setModalNo}
        ></CreatePostModal>
      )}
      {modalNo === 2 && showPostModal && (
        <CreatePostModalTwo
          setShowPostModalTwo={setShowPostModal}
          setModalNo={setModalNo}
        ></CreatePostModalTwo>
      )}
      {modalNo === 3 && showPostModal && (
        <CreatePostModalThree
          setShowPostModalThree={setShowPostModal}
          setModalNo={setModalNo}
        ></CreatePostModalThree>
      )}
      <div className="bg-white p-4 text-gray-800 hidden lg:flex justify-between h-screen flex-col gap-4">
        <div className="w-[250px]">
          <div className="text-3xl mt-5 w-full text-primary font-extrabold">
            Youvatar
          </div>
          <div className="flex flex-col gap-2 mt-7">
            <Link
              href="/"
              className={clsx(
                'flex flex-row gap-4 items-center cursor-pointer text-gray-800 p-2 rounded-md',
                router.pathname === '/' && 'text-primary font-bold'
              )}
            >
              {router.pathname === '/' ? (
                <HomeIconSolid className="h-7 w-7 " />
              ) : (
                <HomeIconOutline className="h-7 w-7" />
              )}
              <span>Home</span>
            </Link>
            <Link
              href="/explore"
              className={clsx(
                'flex flex-row gap-4 items-center cursor-pointer text-gray-800 p-2 rounded-md',
                router.pathname === '/explore' && 'text-primary font-bold'
              )}
            >
              {router.pathname === '/explore' ? (
                <MagnifyingGlassIconSolid className="h-7 w-7" />
              ) : (
                <MagnifyingGlassIconOutline className="h-7 w-7" />
              )}
              <span>Explore</span>
            </Link>
            <Link
              href="/cart"
              className="flex flex-row gap-4 items-center cursor-pointer p-2 rounded-md"
            >
              <div className="relative">
                <ShoppingCartIcon className="h-7 w-7" />
                {courseData > 0 && (
                  <div className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 mr-2 mt-2 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {courseData}
                  </div>
                )}
              </div>
              Cart
            </Link>
            <Link
              href="/messages"
              className={clsx(
                'flex flex-row gap-4 items-center cursor-pointer text-gray-800 p-2 rounded-md',
                router.pathname === '/messages' && 'text-primary font-bold'
              )}
            >
              {router.pathname === '/messages' ? (
                <PaperAirplaceIconSolid className="h-7 w-7 " />
              ) : (
                <PaperAirplaneIcon className="h-7 w-7" />
              )}
              <span>Messages</span>
            </Link>
            <Link
              href="/student/dashboard"
              className={`flex flex-row gap-4 items-center cursor-pointer p-2 rounded-md `}
            >
              <UserIcon className="h-7 w-7" />
              <span>Student dashboard</span>
            </Link>
            <Link
              href={user?.isMentor ? '/mentor/dashboard' : '/mentor/onboard'}
              className={`flex flex-row gap-4 items-center cursor-pointer p-2 rounded-md `}
            >
              <BuildingStorefrontIcon className="h-7 w-7" />
              {user?.isMentor ? 'Mentor dashboard' : 'Become a mentor'}
            </Link>
            <Link
              href="/profile"
              className={clsx(
                'flex flex-row gap-4 items-center cursor-pointer p-2 rounded-md',
                router.pathname === '/profile' && 'text-primary font-bold'
              )}
            >
              <img
                className="rounded-full aspect-square object-cover w-[36px] h-full border border-white"
                src={
                  user?.image
                    ? S3_PREFIX + user?.image
                    : createProfileImage(user?.username)
                }
                alt="mentor"
              />
              <span>Profile</span>
              <ArrowRightOnRectangleIcon
                onClick={signOut}
                className="w-6 h-6 cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="fixed bottom-5 rounded-full shadow-2xl z-50 w-full h-[7vh] bg-white border border-gray-200 flex justify-around items-center lg:hidden">
        <Link href="/" className="flex flex-col items-center cursor-pointer">
          <HomeIconOutline
            className={clsx(
              'h-6 w-6',
              router.pathname === '/' && 'text-primary'
            )}
          />
        </Link>
        <Link
          href="/explore"
          className="flex flex-col items-center cursor-pointer"
        >
          <MagnifyingGlassIconOutline
            className={clsx(
              'h-6 w-6',
              router.pathname === '/explore' && 'text-primary'
            )}
          />
        </Link>
        <button onClick={() => setShowPostModal(true)}>
          <PlusCircleIcon className="h-8 w-8 text-primary" />
        </button>
        <Link
          href="/cart"
          className="flex flex-col items-center cursor-pointer"
        >
          <div className="relative">
            <ShoppingCartIcon className="h-6 w-6" />
            {courseData > 0 && (
              <div className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 mr-2 mt-2 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {courseData}
              </div>
            )}
          </div>
        </Link>
        <Link
          href="/profile"
          className="flex flex-col items-center cursor-pointer relative"
          onClick={() => setOverflowOptionsOpen((prev) => !prev)}
          ref={overflowOptionsRef}
        >
          <img
            className="w-6 h-6 object-cover aspect-square rounded-full"
            onContextMenu={(e) => e.preventDefault()}
            src={
              user.image
                ? S3_PREFIX + user?.image
                : createProfileImage(user?.username)
            }
            alt="profile"
          />
        </Link>
        {overflowOptionsOpen && (
          <div className="absolute top-0 right-0 -translate-y-full bg-white p-4 flex flex-col gap-3 rounded-md shadow-lg whitespace-nowrap">
            <Link
              href="/student/dashboard"
              className="text-gray-800 flex items-center gap-4"
            >
              <UserIcon className="h-6 w-6" />
              <span>Student Dashboard</span>
            </Link>
            <Link
              href="/mentor/dashboard"
              className="text-gray-800 flex items-center gap-4"
            >
              <BuildingStorefrontIcon className="h-6 w-6" />
              Mentor Dashboard
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default HomeNavigation
