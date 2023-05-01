/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import UserBadge from '../UserBadge'

const ReviewCard = () => {
  return (
    <div className="border bg-[#F7F9FA] border-[#C7C9D9] pl-7 pr-12 pb-9 pt-3 mb-5">
      <div className="flex">
        <UserBadge className="h-[55px] w-[55px]" />
        <div className="flex w-full justify-center flex-col ml-4">
          <div className="text-lg font-bold text-black mb-2.5">Pau A.</div>
          <div className="flex">
            <img src="/svg/review.svg" alt="star" className="w-4 h-4" />
            <img src="/svg/review.svg" alt="star" className="w-4 h-4" />
            <img src="/svg/review.svg" alt="star" className="w-4 h-4" />
            <img src="/svg/review.svg" alt="star" className="w-4 h-4" />
            <img src="/svg/review.svg" alt="star" className="w-4 h-4" />
          </div>
        </div>
      </div>
      <div className="text-sm font-normal text-[#3E3E3E] mt-6">
        It's a great course with simple explanations about how and why use the
        tools and the code, highly recommended for beginners who want to learn
        how to make games with Godot.
      </div>
    </div>
  )
}

export default ReviewCard
