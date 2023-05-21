import { BellIcon, CheckIcon } from '@heroicons/react/24/outline'
import { InboxIcon } from '@heroicons/react/24/solid'

type NotificationCardProps = {
  type: string
  description: string
  time: string
}

export default function NotificationCard(props: NotificationCardProps) {
  const getIconForType = (type: string) => {
    switch (type) {
      case 'message':
        return (
          <div className="p-2 rounded-full flex items-center h-fit bg-blue-500">
            <InboxIcon className="h-5 w-5 text-white" />
          </div>
        )
      case 'accomplishment':
        return (
          <div className="p-2 rounded-full flex items-center h-fit bg-green-500">
            <CheckIcon className="h-5 w-5 text-white" />
          </div>
        )
      default:
        return <BellIcon className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="flex flex-row gap-4 p-4 w-full min-w-[300px] overflow-hidden shadow-md bg-white z-[1000]">
      {getIconForType(props.type)}
      <div className="flex flex-col w-full text-left gap-2">
        <span className="text-sm text-gray-600">{props.description}</span>
        <span className="text-xs text-left text-gray-400">{props.time}</span>
      </div>
    </div>
  )
}
