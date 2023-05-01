import clsxm from '@/lib/clsxm'
import { PlayIcon } from '@heroicons/react/24/solid'
import React from 'react'

const ClassRecordings = () => {
  return (
    <>
      <div className="text-sm font-medium mb-4">Module 1</div>
      <div className="border border-solid rounded flex border-[#C7C9D9] py-2.5 px-5 mb-4 ">
        <div className="relative mr-5">
          <img
            src="https://images.unsplash.com/photo-1542856391-010fb87dcfed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="video"
            className="mr-2 w-16 h-16 opacity-50"
          />
          <button
            className={clsxm(
              ' rounded-full bg-white w-6 h-6 p-1',
              'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
            )}
          >
            <PlayIcon />
          </button>
        </div>
        <div>
          <div className="text-sm font-semibold mb-5">1. Introduction</div>
          <div className="text-sm font-semibold ">04:40</div>
        </div>
      </div>
    </>
  )
}

export default ClassRecordings
