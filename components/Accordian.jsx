import clsxm from '@/lib/clsxm'
import React, { useState } from 'react'

const Accordion = ({ title, children, className, wrapperClassName }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={clsxm('border bg-[#F7F9FA] border-[#C7C9D9] p-2.5', className)}
    >
      <div
        className="flex justify-between  py-2 cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className={clsxm('', wrapperClassName)}>{title}</h2>
        <img
          src="/svg/chevron.svg"
          alt="arrow-down"
          className="w-4 h-4 -rotate-90"
        />
      </div>
      {isOpen && <div className="pl-1.5  pt-2 lg:pb-4">{children}</div>}
    </div>
  )
}

export default Accordion
