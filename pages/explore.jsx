import HomeNavigation from '@/components/HomeNavigation'
import Modal from '@/components/Modal'
import Spinner from '@/components/Spinner'
import ExploreModal from '@/components/explore/ExploreModal'
import ExploreModalMobile from '@/components/explore/ExploreModalMobile'
import { S3_PREFIX } from '@/utils/constants'
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const [openExploreModal, setIsOpenExploreModal] = useState(false)
  const [courseId, setCourseId] = useState(null)
  const [currentModalIndex, setCurrentModalIndex] = useState(0)
  const [exploreCardData, setExploreCardData] = useState([])
  const { courseData } = useSelector((state) => state.cart)
  const [loading, setLoading] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const [mobileCardOptionsOpen, setMobileCardOptionsOpen] = useState(null)
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const handleOpenExploreModal = (id, e, index) => {
    e.stopPropagation()
    if (!id) return
    setCourseId(id)
    setIsOpenExploreModal(true)
    setCurrentModalIndex(index)
  }

  const handleCloseExploreModal = () => {
    setIsOpenExploreModal(false)
  }

  const fetchExploreCardData = async () => {
    setLoading(true)
    const response = await axios.get('/api/posts')
    setExploreCardData(response?.data?.data)
    setLoading(false)
  }

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  }

  useEffect(() => {
    fetchExploreCardData()
  }, [])

  // useEffect(() => {
  //   setCourseId(exploreCardData[currentModalIndex])
  // }, [currentModalIndex, exploreCardData])

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (loading)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner height={50} width={50} color="#3949ab" />
      </div>
    )

  return (
    <div className="flex">
      <HomeNavigation courseData={courseData.length} />
      <div className="h-screen pb-20 scrollbar-thin overflow-y-scroll px-4">
        <div className="flex items-center bg-white rounded-md shadow-md px-4 py-3 max-w-2xl mx-auto mt-4">
          <span className="text-gray-400 mr-2">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </span>
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={handleSearch}
            className="w-full bg-transparent focus:outline-none"
          />
        </div>
        <div className="grid gap-[2px] lg:gap-1 grid-cols-3 xl:grid-cols-4 mx-auto mt-4">
          {exploreCardData?.map((details, index) => (
            <img
              key={details.id}
              onClick={(e) =>
                handleOpenExploreModal(details.courseId, e, index)
              }
              src={S3_PREFIX + details.image}
              alt="explore"
              className="object-cover aspect-square brightness-75 h-full w-full rounded-sm"
            />
          ))}
        </div>
      </div>
      {openExploreModal &&
        (windowSize.width > 640 ? (
          <Modal onClose={handleCloseExploreModal}>
            <ExploreModal
              courseId={courseId}
              exploreCardData={exploreCardData}
              setCurrentModalIndex={setCurrentModalIndex}
              currentModalIndex={currentModalIndex}
              onClose={handleCloseExploreModal}
            />
          </Modal>
        ) : (
          <div className="fixed inset-0 h-[93vh] w-full bg-white overflow-y-scroll scrollbar-thin p-6">
            <div className="flex items-center text-gray-900 font-medium">
              <ChevronLeftIcon
                onClick={handleCloseExploreModal}
                className="h-6 w-6 cursor-pointer mr-2"
              />
              <span className="text-lg">Explore</span>
            </div>
            {exploreCardData.slice(currentModalIndex)?.map((details) => (
              <ExploreModalMobile
                key={details.id}
                courseDetails={details}
                onClose={() => setMobileCardOptionsOpen(null)}
                setMobileCardOptionsOpen={() => {
                  setMobileCardOptionsOpen(true)
                  setCourseId(details.courseId)
                }}
              />
            ))}
            {mobileCardOptionsOpen && (
              <Modal>
                <ExploreModal
                  courseId={courseId}
                  onClose={() => setMobileCardOptionsOpen(null)}
                />
              </Modal>
            )}
          </div>
        ))}
    </div>
  )
}

export default Home
Home.auth = true
