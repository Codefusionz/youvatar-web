'use client'

import CourseCard from '@/components/CourseCard'
import Spinner from '@/components/Spinner'
import useClickOutside from '@/hooks/useClickOutside'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisVerticalIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from 'react'
import ReactDatePicker from 'react-datepicker'

type ReminderCardProps = {
  id?: string
  type: string
  title: string
  time: string
  students: number
  description: string
}

const Card = () => {
  return (
    <div className="flex flex-col gap-4 mb-3 p-3 lg:p-6 shadow-md rounded-md">
      <div className="flex w-40 lg:w-full justify-between">
        <span>students</span>
        <EllipsisVerticalIcon className="h-5 w-5" />
      </div>
      <h1 className="text-2xl font-bold">10</h1>
      <span className="text-sm whitespace-nowrap">
        <span className="text-green-500 mr-1 ">13.2%</span> from may
      </span>
    </div>
  )
}

export const ReminderCard = (props: ReminderCardProps) => {
  const getColorForType = (type: string) => {
    switch (type) {
      case 'class':
        return 'border-l-orange-500'
      case 'assignment':
        return 'border-l-blue-500'
      case 'test':
        return 'border-l-green-500'
      default:
        return 'border-l-orange-500'
    }
  }

  return (
    <div
      className={` p-1.5 lg:p-4 border-l-8 rounded-md ${getColorForType(
        props.type
      )} shadow-lg mb-2.5`}
    >
      <div className="w-full flex flex-row items-center justify-between gap-2">
        <h1 className="font-bold lg:text-lg">
          {props.title}
          <span className="font-medium text-sm"> - {props.time}</span>
        </h1>
        <div className="flex items-center flex-row gap-1">
          <UserIcon className="w-3 h-3 lg:h-5 lg:w-5 text-gray-500" />
          <span className="text-xs lg:text-sm text-gray-900 font-bold">
            {props.students}
            <span className="text-gray-500 font-normal">Students</span>
          </span>
        </div>
      </div>
      <span className="text-xs lg:text-sm text-gray-500">
        {props.description}
      </span>
    </div>
  )
}

const ProductCard = () => {
  return (
    <div className="shadow-xl rounded-xl p-3 min-w-[216px] lg:min-w-[360px]">
      <img
        src="https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhbWVyYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        alt="student"
        className="w-full lg:h-60 h-32 overflow-hidden rounded-xl object-cover"
      />
      <h1 className="text-sm lg:text-lg font-bold">Guitar Class</h1>
      <div className="w-full flex items-center justify-between">
        <span className="text-gray-600">$1000</span>
        <button className="bg-primary text-xs lg:text-sm text-white p-1 lg:p-2 rounded-lg">
          Buy now
        </button>
      </div>
    </div>
  )
}

export default function Page() {
  const [reminders, setReminders] = useState([])
  const [notifications, setNotifications] = useState([
    {
      type: 'message',
      description: 'This is a new comment for your post',
      time: '10 mins ago',
    },
    {
      type: 'accomplishment',
      description: 'Great job! You have completed 10 tasks today',
      time: '20 mins ago',
    },
  ])

  const [showNotification, setShowNotification] = useState(false)
  const notificationRef = useRef()
  const [upcomingLiveClasses, setUpcomingLiveClasses] = useState([])
  const [reminderDate, setReminderDate] = useState(new Date())
  const [remindersLoading, setRemindersLoading] = useState(false)

  useClickOutside(notificationRef, () => {
    setShowNotification(false)
  })

  const fetchData = async () => {
    // const data = await fetchUpcomingLiveClasses()
    // setUpcomingLiveClasses(data)
  }

  const changeDateToNextDay = (date: Date) => {
    const nextDate = new Date(date)
    nextDate.setDate(nextDate.getDate() + 1)
    return nextDate
  }

  const changeDateToPreviousDay = (date: Date) => {
    const prevDate = new Date(date)
    prevDate.setDate(prevDate.getDate() - 1)
    return prevDate
  }

  const fetchReminders = async (date: Date) => {
    // setRemindersLoading(true)
    // try {
    //   const response = await axios.get(`/api/mentor/reminders?date=${date}`)
    //   setReminders(response.data.data)
    // } catch (error) {
    //   console.log(error)
    // }
    // setRemindersLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchReminders(reminderDate)
  }, [reminderDate])

  return (
    <div className="w-full h-screen">
      <div className="lg:grid grid-cols-2 gap-4 lg:p-4">
        <section className="col-span-1">
          <h1 className="text-3xl hidden lg:block">Mentor Dashboard</h1>
          <div className="lg:grid flex grid-cols-2 lg:mt-4 gap-4 overflow-y-scroll">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </section>
        <div className="my-6 ml-4 lg:my-0">
          <h1 className="text-xl font-bold lg:text-gray-700">
            Upcoming live Courses
          </h1>
          <div className="flex flex-row gap-4 w-full overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-track-rounded-2xl mt-4">
            {upcomingLiveClasses.map((item, index) => (
              <CourseCard key={index} item={item} />
            ))}
          </div>
        </div>
        <section className="flex my-6 p-4 lg:my-0 flex-col gap-4 w-full h-[400px]">
          <div className="flex flex-row justify-between gap-4 w-full">
            <h1 className="text-xl font-bold lg:text-gray-700">Reminders</h1>
            <div className="flex flex-row items-center justify-between gap-2 max-w-[200px]">
              <ChevronLeftIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => {
                  setReminderDate((currentDate) =>
                    changeDateToPreviousDay(currentDate)
                  )
                }}
              />
              <ReactDatePicker
                selected={reminderDate}
                onChange={(date: Date) => setReminderDate(date)}
                className="text-gray-500 w-full outline-none border-none text-center"
              />
              <ChevronRightIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => {
                  setReminderDate((currentDate) =>
                    changeDateToNextDay(currentDate)
                  )
                }}
              />
            </div>
          </div>
          <div className="flex flex-row gap-4 w-full ">
            <span className="bg-orange-800 text-white pt-2 pb-1 px-3 text-sm rounded-t-lg ">
              All
            </span>
            <span className="bg-orange-500 text-white pt-2 pb-1 px-3 text-sm rounded-t-lg">
              class
            </span>
            <span className="bg-blue-500 text-white pt-2 pb-1 px-3 text-sm rounded-t-lg">
              Assignment
            </span>
            <span className="bg-green-500 text-white pt-2 pb-1 px-3 text-sm rounded-t-lg">
              Test
            </span>
          </div>
          {remindersLoading ? (
            <div className="flex w-full h-full items-center justify-center">
              <Spinner style={{ height: 30, width: 30, color: '#3949ab' }} />
            </div>
          ) : (
            <div className="flex flex-col gap-4 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-track-rounded-2xl">
              {reminders.map((item: ReminderCardProps) => (
                <ReminderCard
                  key={item.id}
                  type={item.type}
                  title={item.title}
                  time={item.time}
                  students={item.students}
                  description={item.description}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      <div className="mt-8 ml-4 mb-4">
        <h1 className="text-xl font-bold lg:text-3xl mb-4">
          Recommended Products
        </h1>
        <div className="w-full flex flex-row gap-4">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </div>
  )
}
