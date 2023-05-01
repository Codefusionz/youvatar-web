import HomeNavigation from '@/components/HomeNavigation'
import ChatWindow from '@/components/messages/ChatWindow'
import UserChatCard from '@/components/messages/UserChatCard'
import Carousel from '@/components/messages/carousel'
import { ArrowLeftIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import usersData from '../../components/messages/data.json'

export default function Messages() {
  const { courseData } = useSelector((state) => state.cart)
  const [currentUser, setCurrentUser] = useState(usersData.usersList[0])
  const [chatModalOpen, setChatModelStatus] = useState(false)
  const router = useRouter()
  // console.log("current user", currentUser)
  const x = [1, 2, 3]
  return (
    <div className="flex h-screen">
      <div className="hidden sm:flex">
        <HomeNavigation courseData={courseData.length} />
      </div>
      <div className="overflow-hidden w-full flex justify-center md:justify-start relative max-w-[1400px] lg:my-8 rounded-sm border border-gray-200 mx-auto">
        <div className="flex flex-col py-4 w-[100%] border-r border-r-gray-200 sm:w-[80%] md:min-w-[400px] md:max-w-[400px] relative">
          <div className="messages-header w-full flex mb-5 justify-center md:hidden relative">
            <ArrowLeftIcon
              className="w-6 h-6 absolute left-4 top-[2px] cursor-pointer"
              onClick={() => {
                router.back()
              }}
            />
            <p className="font-semibold text-lg">Messages</p>
          </div>
          <div className="search-bar flex items-center bg-[#ececec] rounded-[50px] mx-[10px] px-4 py-3 mb-[24px] max-w-2xl">
            <span className="text-gray-400 mr-2">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </span>
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent focus:outline-none"
            />
          </div>
          <div className="flex flex-col overflow-y-scroll scrollbar-none">
            <div>
              <Carousel />
            </div>

            <div className="messages-title flex justify-between items-center px-2 py-2 border-y-[1px] border-[#EBEBEB]">
              <p>Messages</p>
              <a className="text-primary font-medium cursor-pointer">
                1 Request
              </a>
            </div>

            <div className="chat-list flex flex-col h-[100%] md:scrollbar-thumb-rounded-2xl">
              {usersData.usersList.map((userData) => (
                <UserChatCard
                  name={userData.name}
                  last_message={
                    userData.messages[userData.messages.length - 1].message
                  }
                  key={userData.name}
                  last_time={userData.last_time}
                  isCurrentUser={currentUser.uid === userData.uid}
                  setChatModelStatus={setChatModelStatus}
                  onClick={() => {
                    console.log(userData)
                    setCurrentUser(userData)
                  }}
                />
              ))}

              <UserChatCard />
              <UserChatCard />
              <UserChatCard />
              <UserChatCard />
              <UserChatCard />
            </div>
          </div>
          <div
            className={`absolute w-[100%] h-[100%] pb-5 sm:pb-7 md:hidden bg-white ${
              !chatModalOpen && 'hidden'
            } `}
          >
            <div className="h-full ">
              <ChatWindow
                currentUser={currentUser}
                setChatModelStatus={setChatModelStatus}
              />
            </div>
          </div>
        </div>
        <div className="hidden md:block w-full">
          <ChatWindow
            currentUser={currentUser}
            setChatModelStatus={setChatModelStatus}
          />
        </div>
      </div>
    </div>
  )
}

Messages.auth = true
