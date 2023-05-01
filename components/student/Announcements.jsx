import React from 'react'
import TextInput from '../TextInput'
import UserBadge from '../UserBadge'

const Announcements = () => {
  return (
    <>
      <div className="flex items-center mb-7">
        <UserBadge className="w-12 h-12" />
        <div className="ml-4">
          <div className="text-sm font-semibold text-primary">Melissa</div>
          <div className="text-base font-normal ">
            posted an announcement · 15 days ago ·
          </div>
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1542856391-010fb87dcfed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt="announcement"
        className="w-full h-44  mb-7 object-cover"
      />
      <div className="text-sm font-normal mb-7 ">
        Lorem ipsum dolor sit amet consectetur. A elementum cras egestas
        viverra. Amet egestas nibh a arcu. Felis consequat morbi venenatis nam.
        Tortor volutpat ultricies faucibus augue nisi id netus ac enim.
      </div>
      <div className="flex items-center">
        <UserBadge className="w-12 h-12 mr-3" />
        <TextInput placeholder="Enter your comment" wrapperClassName="mt-0" />
      </div>
      <div className="w-full border border-b border-gray-300 my-11" />

      <div className="flex items-center mb-7">
        <UserBadge className="w-12 h-12" />
        <div className="ml-4">
          <div className="text-sm font-semibold text-primary">Melissa</div>
          <div className="text-base font-normal ">
            posted an announcement · 15 days ago ·
          </div>
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1542856391-010fb87dcfed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt="announcement"
        className="w-full h-44  mb-7 object-cover"
      />
      <div className="text-sm font-normal mb-7 ">
        Lorem ipsum dolor sit amet consectetur. A elementum cras egestas
        viverra. Amet egestas nibh a arcu. Felis consequat morbi venenatis nam.
        Tortor volutpat ultricies faucibus augue nisi id netus ac enim.
      </div>
      <div className="flex items-center">
        <UserBadge className="w-12 h-12 mr-3" />
        <TextInput placeholder="Enter your comment" wrapperClassName="mt-0" />
      </div>
      <div className="w-full border border-b border-gray-300 my-11" />
    </>
  )
}

export default Announcements
