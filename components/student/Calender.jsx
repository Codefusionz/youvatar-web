import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import clsxm from '@/lib/clsxm'

const Calender = () => {
  return (
    <div className="relative">
      <div className="flex items-center justify-end mb-5">
        <button
          className={clsxm(
            '  w-24 h-10 rounded flex items-center justify-between px-4',
            'border border-solid border-[#C7C9D9] p-2.5'
          )}
        >
          <div className="text-xs font-semibold mr-1.5">Feb</div>
          <ChevronRightIcon className="h-5 w-5 rotate-90" />
        </button>
      </div>

      <div className="flex w-full items-center justify-between mt-7 mb-14">
        <ChevronLeftIcon className="h-8 w-8 text-primary" />
        <div className="bg-primary w-12 h-14 rounded-xl p-2.5">
          <div className="text-xs font-semibold text-white ">MON</div>
          <div className="text-base font-bold text-white ">10</div>
        </div>
        <div className=" p-2.5">
          <div className="text-xs font-semibold text-black ">MON</div>
          <div className="text-base font-bold text-black ">10</div>
        </div>
        <div className=" p-2.5">
          <div className="text-xs font-semibold text-black ">MON</div>
          <div className="text-base font-bold text-black ">10</div>
        </div>
        <div className=" p-2.5">
          <div className="text-xs font-semibold text-black ">MON</div>
          <div className="text-base font-bold text-black ">10</div>
        </div>
        <div className=" p-2.5">
          <div className="text-xs font-semibold text-black ">MON</div>
          <div className="text-base font-bold text-black ">10</div>
        </div>
        <div className=" p-2.5">
          <div className="text-xs font-semibold text-black ">MON</div>
          <div className="text-base font-bold text-black ">10</div>
        </div>
        <ChevronRightIcon className="h-8 w-8 text-primary" />
      </div>

      <div className="text-base font-semibold text-muted mb-5">09:30</div>

      <div className="text-base w-fit p-2.5 mb-5 bg-[#C8B5FF] rounded-[20px] font-medium text-muted">
        09:00
      </div>

      <div className="bg-[#C8B5FF] rounded-[20px] left-20 -bottom-24 p-2.5 w-[296px] h-28 absolute">
        <div className="rounded-[20px] bg-white w-3/6 h-9 p-2.5 text-base text-center font-semibold mb-6">
          09:30 - 10:30
        </div>
        <div className="text-base font-semibold">
          Introduction of guitar class
        </div>
      </div>
    </div>
  )
}

export default Calender
