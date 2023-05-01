import clsxm from '@/lib/clsxm'
import React from 'react'
import {
  ClockIcon,
  UserIcon,
  VideoCameraIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'

const StudentCourseCard = () => {
  return (
    <div
      className={clsxm(
        'bg-[#FAFAFA] rounded-xl lg:min-w-[350px]',
        'border border-solid border-white p-2.5 pb-5',
        'shadow-2xl mb-1.5'
      )}
    >
      <img
        src="/png/cart.png"
        alt="cart"
        className="lg:w-[350px] w-full lg:h-[240px] h-44 rounded-lg object-cover"
      />

      <div className="text-sm font-medium my-2 lg:my-4 text-[#080808]">
        Learn Figma - UI/UX Design Essential Training
      </div>

      <div className="flex items-center mb-3 lg:mb-6">
        <div className="flex items-center gap-2 mr-7">
          <UserIcon className="h-5 w-5 text-gray-500" />
          <span className="text-[10px] text-gray-500 whitespace-nowrap">
            Lesson : 6
          </span>
        </div>
        <div className="flex items-center gap-2 mr-7">
          <ClockIcon className="h-5 w-5 text-gray-500" />
          <span className="text-[10px] text-gray-500 whitespace-nowrap">
            student : 198
          </span>
        </div>
        <div className="flex items-center gap-2">
          <VideoCameraIcon className="h-5 w-5 text-gray-500" />
          <span className="text-[10px] text-gray-500">Beginner</span>
        </div>
      </div>
      <div className="flex items-center  justify-between">
        <button className="w-36 text-xs p-2 flex items-center justify-center bg-primary rounded-md text-white">
          Buy Course{' '}
          <span className="inline-block">
            <ChevronRightIcon className="h-5 w-5 " />
          </span>
        </button>
        <div className="flex items-center gap-1">
          <img src="/svg/review.svg" alt="star" className="w-4 h-4" />
          <img src="/svg/review.svg" alt="star" className="w-4 h-4" />
          <img src="/svg/review.svg" alt="star" className="w-4 h-4" />
        </div>
      </div>
    </div>
  )
}

export default StudentCourseCard
