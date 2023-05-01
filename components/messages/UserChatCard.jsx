import { S3_PREFIX } from '@/utils/constants'
import { useSelector } from 'react-redux'

const UserChatCard = ({
  name = 'Name',
  last_message = 'Last Message',
  last_time = '02:50 am',
  onClick,
  isCurrentUser = false,
  setChatModelStatus,
}) => {
  // console.log(name, isCurrentUser)
  const user = useSelector((state) => state.user.data)
  return (
    <div
      className={
        'py-4 px-2 flex gap-2 border-b-[1px] border-gray-200 items-center w-full cursor-pointer hover:bg-gray-200 ' +
        (isCurrentUser && ' md:hover:bg-primaryLight md:bg-primaryLight')
      }
      onClick={() => {
        onClick()
        setChatModelStatus(true)
      }}
    >
      <img
        className="w-[55px] h-[55px] mr-4 rounded-full"
        src={user?.image ? S3_PREFIX + user?.image : '/png/profile.png'}
      />
      <div className="flex flex-col justify-between">
        <p className="font-medium">{name}</p>
        <p className="text-gray-500">{last_message}</p>
      </div>
      <div className="ml-auto h-full">
        <p className="text-sm text-gray-500">{last_time}</p>
      </div>
    </div>
  )
}

export default UserChatCard
