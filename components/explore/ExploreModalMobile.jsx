import { S3_PREFIX } from '@/utils/constants'
import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  ChevronRightIcon,
  EllipsisVerticalIcon,
  HeartIcon,
  ShareIcon,
} from '@heroicons/react/24/outline'
import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'
import UserBadge from '../UserBadge'

const ExploreModalMobile = ({ courseDetails, setMobileCardOptionsOpen }) => {
  const [showMore, setShowMore] = useState(false)
  const [studentCourses, setStudentCourses] = useState([])

  const getStudentOrders = async () => {
    try {
      const { data } = await axios.get(
        `/api/student/course/${courseDetails.courseId}`
      )

      if (data?.success) {
        setStudentCourses(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getStudentOrders()
  }, [])

  const { courseThumbnail, classStartDate, description } =
    studentCourses.data || {}

  const descriptionText = showMore
    ? description
    : description?.length > 80
    ? description?.slice(0, 80) + '...'
    : description

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  if (!courseDetails) return null

  return (
    <div className="rounded-md my-6 flex flex-col gap-2">
      <div className="flex items-center">
        <div className="flex">
          <UserBadge className="w-9 h-9 mr-3" />
          <div className="text-sm font-normal">
            <div className="text-sm font-semibold">Guitar academy</div>
            <span className="text-xs">Starts from </span>
            <span className="text-xs font-semibold text-primary">
              {classStartDate && moment(classStartDate).format('DD MMMM YYYY')}
            </span>
          </div>
        </div>
        <EllipsisVerticalIcon className="h-6 w-6 ml-auto" />
      </div>
      <div className="border shadow-md rounded-md overflow-hidden">
        <img
          src={S3_PREFIX + courseThumbnail}
          alt="course"
          className="w-full h-full block object-cover"
        />
        <div
          className="flex items-center justify-between p-2.5 px-4 cursor-pointer"
          onClick={setMobileCardOptionsOpen}
        >
          <span className="font-medium">Learn now</span>
          <ChevronRightIcon className="h-6 w-6" />
        </div>
      </div>
      <div className="flex items-center justify-between my-1">
        <div className="flex gap-4 items-center">
          <HeartIcon className="h-6 w-6" />
          <ChatBubbleOvalLeftIcon className="h-6 w-6" />
          <ShareIcon className="h-6 w-6" />
        </div>
        <BookmarkIcon className="h-6 w-6" />
      </div>
      <div className="font-medium">Description</div>
      <div className="text-sm font-normal text-gray-600 text-start capitalize">
        {descriptionText}
        {description?.length > 80 && (
          <button
            className="text-primary text-sm whitespace-nowrap ml-2"
            onClick={() => setShowMore(!showMore)}
          >
            {!showMore ? 'Show More' : 'Show Less'}
          </button>
        )}
      </div>
    </div>
  )
}

export default ExploreModalMobile
