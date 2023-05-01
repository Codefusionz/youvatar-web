import React from 'react'

const Exams = () => {
  return (
    <div className="border border-solid rounded  border-[#C7C9D9] py-6 px-8 mb-3">
      <div className="flex items-center justify-between mb-6">
        <div className="text-xl font-medium">
          Guitar level 1 <span className="text-xs text-muted">(exam)</span>
        </div>
        <button className="bg-primary text-white px-8 py-2 rounded">
          View
        </button>
      </div>
      <div className=" flex items-center mb-4">
        <div className="text-sm text-muted font-semibold mr-3">Deadline</div>
        <div className="text-sm font-semibold">12/02/2023</div>
      </div>
      <div className="flex items-center">
        <div className="text-sm font-semibold text-muted mr-4">Status</div>
        <div className="text-sm font-semibold rounded bg-[#E6F3E5 ] w-fit p-1.5 text-submitted">
          Submitted
        </div>
      </div>
    </div>
  )
}

export default Exams
