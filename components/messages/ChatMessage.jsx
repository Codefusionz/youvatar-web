import React from 'react'

const ChatMessageCard = ({
  isUserMessage = false,
  message = 'Message',
  time = '11:59 AM',
}) => {
  return (
    <div className={`w-full flex my-1 ${isUserMessage && 'justify-end'}`}>
      <div
        className={
          'flex items-end gap-2 rounded-xl px-3 py-1 my-1 break-words max-w-[75%] text-sm sm:text-base' +
          (isUserMessage ? ' bg-greenLight' : ' bg-primaryLighter')
        }
      >
        <p>{message}</p>
        <p className="text-xs text-gray-500 hidden sm:block">{time}</p>
      </div>
    </div>
  )
}

export default ChatMessageCard
