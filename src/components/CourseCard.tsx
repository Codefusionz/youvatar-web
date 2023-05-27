import {
  CalendarDaysIcon,
  ClockIcon,
  UserIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type CourseCardProps = {
  item: any
}

export default function CourseCard(props: CourseCardProps) {
  const [startClass, setStartClass] = useState(true)
  const router = useRouter()

  useEffect(() => {
    updateStartClass()
  }, [])

  const updateStartClass = () => {
    const now = moment()
    const lectureDateTime = moment(props.item?.timestamp, 'YYYY-MM-DD h:mm A')

    const durationInMinutes = props.item.duration
    const lectureEndTime = moment(lectureDateTime).add(
      durationInMinutes,
      'minutes'
    )

    setStartClass(now.isBetween(lectureDateTime, lectureEndTime))
  }

  return (
    <div className="flex flex-col min-w-[260px] lg:min-w-[350px] gap-4 p-2 lg:p-6 shadow-2xl rounded-md mb-2">
      <h1 className=" lg:text-xl font-bold">
        {props.item.course.title} - {props.item.lectures.title}
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <ClockIcon className="h-5 w-5 text-gray-500" />
          <span className="text-[10px] text-gray-500">
            {props.item.batches.timeSlot}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <VideoCameraIcon className="h-5 w-5 text-gray-500" />
          <span className="text-[10px] text-gray-500">Meet</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDaysIcon className="h-5 w-5 text-gray-500 shrink-0" />
          <span className="text-[10px] text-gray-500 ">
            {moment(props.item.timestamp).format('LL')}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <UserIcon className="h-5 w-5 text-gray-500" />
          <span className="text-[10px] text-gray-500">
            Batch - {props.item.batch_id}
          </span>
        </div>
      </div>
      <span>Students</span>
      <div className="flex flex-row gap-2 items-center">
        <div className="flex">
          <img
            className=" rounded-full w-5 h-5 lg:w-10 lg:h-10"
            src="/png/student1.png"
            alt="student"
          />
          <img
            className="-ml-2 rounded-full w-5 h-5 lg:w-10 lg:h-10"
            src="/png/student2.png"
            alt="student"
          />
          <img
            className="-ml-2 rounded-full w-5 h-5 lg:w-10 lg:h-10"
            src="/png/student3.png"
            alt="student"
          />
        </div>
        <span className="text-gray-500 text-sm">
          + {props.item.batches.numberOfStudents} students
        </span>
      </div>
      <button
        onClick={() => {
          router.push(
            `/classes/meet/${props.item?.meetId}?lecture=${props.item.id}`
          )
        }}
        disabled={!startClass}
        className="text-sm lg:text-base w-full p-2 disabled:bg-secondary bg-primary rounded-md text-white"
      >
        Start class
      </button>
    </div>
  )
}
