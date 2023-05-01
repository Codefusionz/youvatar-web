import { S3_PREFIX } from '@/utils/constants'
import {
  ArrowLeftIcon,
  CameraIcon,
  InformationCircleIcon,
  MicrophoneIcon,
  PaperAirplaneIcon,
  PhoneIcon,
  PhotoIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ResizableTextArea from '../ResizableTextArea'
import ChatMessageCard from './ChatMessage'

const ChatWindow = ({ currentUser, setChatModelStatus }) => {
  const user = useSelector((state) => state.user.data)
  const [chatMessage, setChatMessage] = useState('')
  const [messages, setMessages] = useState(currentUser.messages)
  const router = useRouter()
  const [overflowOptionsOpen, setOverflowOptionsOpen] = useState(false)

  useEffect(() => {
    setMessages(currentUser.messages)
  }, [currentUser])

  const sendChat = () => {
    setMessages((prev) => [
      ...prev,
      { isUserMessage: true, message: chatMessage },
    ])
    setChatMessage('')
  }

  return (
    <div className="flex flex-col h-full md:pt-2 md:pb-4">
      {/* Message header */}
      <div
        className="chat-window-header w-full pl-12 md:px-4 relative shadow-[0_5px_8px_0_rgba(0,0,0,0.04)]"
        // style={{ boxShadow: '0px 5px 8px rgba(0, 0, 0, 0.04)' }}
      >
        <ArrowLeftIcon
          className="w-5 h-5 sm:w-6 sm:h-6 absolute left-3 top-[38%] cursor-pointer md:hidden"
          onClick={() => {
            setChatModelStatus(false)
            // router.back()
          }}
        />
        <div className="w-full py-3 flex justify-between items-center md:min-w-[440px]">
          <div className="profile-uid flex items-center">
            <img
              className="w-11 h-11 mr-2 md:mr-4 rounded-full"
              src={user?.image ? S3_PREFIX + user?.image : '/png/profile.png'}
            />
            <div className="flex flex-col justify-between">
              <p className="text-sm sm:text-md md:text-base font-semibold">
                {currentUser.name}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                {currentUser.uid}
              </p>
            </div>
          </div>

          <div className="rightside-icons mr-5 sm:mr-14 flex gap-5">
            <VideoCameraIcon className="h-5 w-5 md:h-7 md:w-7 cursor-pointer" />
            <PhoneIcon className="h-5 w-5 md:h-7 md:w-7 cursor-pointer" />
            <InformationCircleIcon className="h-5 w-5 md:h-7 md:w-7 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="flex mt-4 flex-col gap-1 overflow-auto md:scrollbar-thin md:scrollbar-thumb-gray-300 md:scrollbar-track-rounded-2xl md:scrollbar-track-gray-100 h-[100%] md:scrollbar-thumb-rounded-2xl scrollbar-none">
        <div className="px-4">
          {messages.map((message) => {
            // console.log(message)
            return (
              <ChatMessageCard
                isUserMessage={message.isUserMessage}
                message={message.message}
                time={message.time}
              />
            )
          })}
          <ChatMessageCard />
          <ChatMessageCard />
          <ChatMessageCard />
          <ChatMessageCard />
          <ChatMessageCard />
          <ChatMessageCard />
          <ChatMessageCard />
          <ChatMessageCard />
          <ChatMessageCard />
          <ChatMessageCard />
        </div>
      </div>
      <div className="flex items-center rounded-full shadow-lg p-4 mx-4">
        <CameraIcon className="w-7 h-7 mr-4 cursor-pointer" />
        <ResizableTextArea
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
          onSubmit={() => sendChat()}
        />
        {chatMessage.length > 0 ? (
          <PaperAirplaneIcon
            onClick={() => sendChat()}
            className="w-7 h-7 ml-4 cursor-pointer"
          />
        ) : (
          <div className="flex gap-2">
            <PhotoIcon className="w-7 h-7" />
            <MicrophoneIcon className="w-7 h-7 cursor-pointer" />
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatWindow
