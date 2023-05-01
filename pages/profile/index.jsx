import HomeNavigation from '@/components/HomeNavigation'
import Modal from '@/components/Modal'
import Spinner from '@/components/Spinner'
import ExploreModal from '@/components/explore/ExploreModal'
import ExploreModalMobile from '@/components/explore/ExploreModalMobile'

import { S3_PREFIX } from '@/utils/constants'
import { createProfileImage, formatNumber } from '@/utils/helpers'
import {
  ChevronLeftIcon,
  Cog6ToothIcon,
  PencilIcon,
  ShareIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline'
import axios from 'axios'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'
import { useSelector } from 'react-redux'

export default function Profile() {
  const { courseData } = useSelector((state) => state.cart)
  const [openExploreModal, setIsOpenExploreModal] = useState(false)
  const user = useSelector((state) => state.user.data)
  const [exploreCardData, setExploreCardData] = useState([])
  const [courseDetails, setCourseDetails] = useState({})
  const [loading, setLoading] = useState(true)
  const [currentModalIndex, setCurrentModalIndex] = useState(0)
  const [mobileCardOptionsOpen, setMobileCardOptionsOpen] = useState(null)
  const [showNavbar, setShowNavbar] = useState(false)

  const router = useRouter()
  const windowSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  }
  const componentRef = useRef(null)
  const [touchedTop, setTouchedTop] = useState(false)

  useEffect(() => {
    let startY = 0

    function handleTouchStart(e) {
      startY = e.touches[0].clientY
    }

    function handleTouchMove(e) {
      const div = componentRef.current
      const divRect = div.getBoundingClientRect()

      if (divRect.top <= 0 && e.touches[0].clientY > startY) {
        setTouchedTop(false)
      } else if (divRect.top <= 50) {
        setTouchedTop(true)
      } else {
        setTouchedTop(false)
      }

      if (divRect.top <= 50) {
        setShowNavbar(true)
      } else if (divRect.bottom >= window.innerHeight) {
        setShowNavbar(false)
      }
    }

    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchmove', handleTouchMove)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  const [defaultDragPosition, setDefaultDragPosition] = useState({
    x: 0,
    y: -100,
  })

  const fetchExploreCardData = async () => {
    setLoading(true)
    const response = await axios.get('/api/posts')
    setExploreCardData(response?.data?.data)
    setLoading(false)
  }

  const handleOpenExploreModal = (id, e, index) => {
    e.stopPropagation()
    setIsOpenExploreModal(true)
    setCurrentModalIndex(index)
    setCourseDetails(exploreCardData.find((item) => item.id === id))
  }

  const handleCloseExploreModal = () => {
    setIsOpenExploreModal(false)
  }

  useEffect(() => {
    fetchExploreCardData()
    if (windowSize.width < 786) {
      setDefaultDragPosition({
        x: 0,
        y: -100,
      })
    } else setDefaultDragPosition({ x: 0, y: 0 })
  }, [])

  if (loading || !user)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner height={50} width={50} color="#3949ab" />
      </div>
    )

  return (
    <div className="flex">
      <HomeNavigation courseData={courseData.length} />
      <div>
        {!openExploreModal && (
          <div
            className={clsx(
              'fixed md:hidden top-0 left-0 right-0 flex items-center justify-between z-50 p-2',
              showNavbar && 'bg-black'
            )}
          >
            <div className="bg-black/50 rounded-full p-2 flex flex-row gap-2 items-center">
              <ChevronLeftIcon
                className="w-5 h-5 text-white cursor-pointer "
                onClick={() => {
                  router.back()
                }}
              />
              {showNavbar && (
                <span className="text-white">{user.displayName}</span>
              )}
            </div>
            <div className="flex gap-4">
              <div className="bg-black/50 rounded-full p-2">
                <ShareIcon className="h-4 w-4 text-white md:hidden" />
              </div>
              <div className="bg-black/50 rounded-full p-2">
                <Cog6ToothIcon className="h-4 w-4 text-white md:hidden" />
              </div>
            </div>
          </div>
        )}
        <img
          className="w-full h-80 object-fill md:rounded-b-xl"
          src={
            user?.cover
              ? S3_PREFIX + user?.cover
              : '/png/profile_background.png'
          }
        />
        <Draggable
          axis="y"
          bounds="parent"
          disabled={touchedTop}
          defaultPosition={defaultDragPosition}
        >
          <div
            ref={componentRef}
            className="flex gap-4 flex-col w-full p-4 bg-white rounded-t-lg -mb-60 md:mb-0"
          >
            <button className="bg-gray-300 h-1 w-12 rounded-md mx-auto md:hidden"></button>
            <div className="md:-translate-y-12 flex flex-col gap-4">
              <div className="flex gap-4 md:gap-8 items-center">
                <img
                  className="w-[120px] h-[120px] md:w-[200px] md:h-[200px] object-cover aspect-square border-4 border-primary rounded-full"
                  src={
                    user.image
                      ? S3_PREFIX + user?.image
                      : createProfileImage(user?.username)
                  }
                  alt="profile"
                />
                <div className="flex flex-col gap-2">
                  <div className="flex gap-4">
                    <span className="text-gray-700 flex flex-col items-center">
                      <span>Post</span>
                      <span className="text-lg font-medium text-gray-900">
                        {formatNumber(654)}
                      </span>
                    </span>
                    <span className="text-gray-700 flex flex-col items-center">
                      <span>Buddies</span>
                      <span className="text-lg font-medium text-gray-900">
                        {formatNumber(134)}
                      </span>
                    </span>
                    <span className="text-gray-700 flex flex-col items-center">
                      <span>Score</span>
                      <span className="text-lg font-medium text-gray-900">
                        {formatNumber(1006)}
                      </span>
                    </span>
                  </div>
                  <div className="flex gap-2 items-center w-full">
                    <Link
                      href={'/profile/edit'}
                      className="text-gray-800 w-full md:w-min p-2 flex items-center justify-center gap-2 rounded-md bg-none bg-gray-200 whitespace-nowrap"
                    >
                      <PencilIcon className="h-4 w-4 md:h-4 md:w-4 text-primary" />
                      <span className="text-sm text-primary">Edit Profile</span>
                    </Link>
                    <Link
                      href={'/profile/share'}
                      className="hidden text-gray-800 p-2 md:flex items-center gap-2 rounded-md bg-none md:bg-gray-200 whitespace-nowrap"
                    >
                      <ShareIcon className="h-6 w-6 md:h-4 md:w-4 text-primary" />
                      <span className="text-sm text-primary hidden md:block">
                        Share Profile
                      </span>
                    </Link>
                    <div className="hidden md:block bg-gray-200 p-2 rounded-md">
                      <Cog6ToothIcon className="hidden md:block w-5 h-5 text-primary" />
                    </div>
                    <div className="flex bg-gray-200 p-2 rounded-md">
                      <UserPlusIcon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:ml-60 md:-mt-14">
                <div>
                  <span className="text-2xl font-medium">{user.username}</span>
                  <h1 className="text-gray-500">{user.displayName}</h1>
                </div>
                <div className="flex gap-2 flex-col">
                  <span className="text-gray-800">{user.bio}</span>
                  <div className="flex flex-wrap flex-row gap-1">
                    {user.intrests.intrests.map((intrest, index) => (
                      <span className="text-sm whitespace-nowrap">
                        {intrest}
                        {index + 1 !== user.intrests.intrests.length && ', '}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="md:-translate-y-12 flex flex-col gap-4">
              <div className="w-full flex gap-4">
                <div>
                  <div className="w-10/12 mx-auto h-1 bg-primary rounded-xl"></div>
                  <button className="text-primary mt-2">Personal Feed</button>
                </div>
                <div>
                  <div className="w-10/12 mx-auto h-1 bg-white rounded-xl"></div>
                  <button className="text-gray-800 mt-2">Public Feed</button>
                </div>
              </div>
              <div className="grid gap-0.5 pb-4 grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {exploreCardData?.map((details, index) => (
                  <img
                    key={details.id}
                    onClick={(e) =>
                      handleOpenExploreModal(details.id, e, index)
                    }
                    src={S3_PREFIX + details.image}
                    alt="explore"
                    className="object-cover aspect-square brightness-75 h-full w-full rounded-sm"
                  />
                ))}
              </div>
            </div>
          </div>
        </Draggable>
        {openExploreModal &&
          (windowSize.width > 640 ? (
            <Modal onClose={handleCloseExploreModal}>
              <ExploreModal
                courseDetails={courseDetails}
                exploreCardData={exploreCardData}
                setCurrentModalIndex={setCurrentModalIndex}
                currentModalIndex={currentModalIndex}
                onClose={handleCloseExploreModal}
              />
            </Modal>
          ) : (
            <div className="fixed inset-0 h-screen w-screen overflow-y-scroll p-4 scrollbar-thin pb-16 bg-white">
              <div className="flex items-center text-gray-900 font-medium">
                <ChevronLeftIcon
                  onClick={handleCloseExploreModal}
                  className="h-6 w-6 cursor-pointer mr-2"
                />
                <span className="text-lg">Explore</span>
              </div>
              {exploreCardData
                .slice(currentModalIndex)
                ?.map((coursedetails) => (
                  <ExploreModalMobile
                    key={coursedetails.id}
                    courseDetails={coursedetails}
                    onClose={() => setMobileCardOptionsOpen(null)}
                    setMobileCardOptionsOpen={() => {
                      setMobileCardOptionsOpen(coursedetails.id)
                      setCourseDetails(coursedetails)
                    }}
                  />
                ))}
              {mobileCardOptionsOpen && (
                <Modal>
                  <ExploreModal
                    courseDetails={courseDetails}
                    onClose={() => setMobileCardOptionsOpen(null)}
                  />
                </Modal>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}

Profile.auth = true
