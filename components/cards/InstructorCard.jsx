import clsxm from '@/lib/clsxm'
import React from 'react'

const InstructorCard = () => {
  return (
    <div
      className={clsxm(
        'bg-[#FAFAFA] rounded-xl p-2.5',
        'border border-solid border-white',
        'lg:w-60 lg:h-60 w-40 h-40'
      )}
    >
      <img
        src="https://images.unsplash.com/photo-1542856391-010fb87dcfed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt="instructor"
        className="h-[105px] w-36 lg:w-full lg:h-40 rounded-md object-cover"
      />
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm font-medium">Melissa</div>
        <div className="text-muted font-medium">programmer</div>
      </div>
    </div>
  )
}

export default InstructorCard
