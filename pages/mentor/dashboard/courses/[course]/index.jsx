import MentorNavbar from '@/components/mentor/MentorNavbar'
import Spinner from '@/components/Spinner'
import useClickOutside from '@/hooks/useClickOutside'
import clsxm from '@/lib/clsxm'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

const Card = () => {
  return (
    <div className="flex flex-col w-full gap-4 p-6 shadow-md rounded-md mb-4">
      <div className="flex w-full justify-between">
        <span>Students</span>
        <EllipsisVerticalIcon className="h-5 w-5" />
      </div>
      <h1 className="text-2xl font-bold">10</h1>
      <span className="text-sm whitespace-nowrap">
        <span className="text-green-500 mr-1">13.2%</span> from May
      </span>
    </div>
  )
}

const Course = () => {
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
  const router = useRouter()
  const [course, setCourse] = useState(null)

  useClickOutside(notificationRef, () => {
    setShowNotification(false)
  })

  const fetchCourse = async (courseId) => {
    try {
      const response = await axios.get(`/api/course/${courseId}`)
      setCourse(response.data?.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const { course } = router.query
    if (course) fetchCourse(course)
  }, [])

  if (!course)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner height={50} width={50} color="#3949ab" />
      </div>
    )

  return (
    <div>
      <MentorNavbar />
      <div className="w-full p-4 overflow-y-scroll h-screen">
        {/* <div className="lg:flex flex-row justify-between p-4 border-b w-full h-fit border-b-gray-300 items-center hidden ">
          <div className="flex items-center flex-row gap-2">
            <ArrowLeftIcon
              className="h-5 w-5 text-primary cursor-pointer"
              onClick={() => router.back()}
            />
            <span className="text-xl font-black text-gray-600">
              {course.title}
            </span>
          </div>
          <div className="flex flex-row items-center gap-4">
            <div className="relative">
              <BellIcon
                className="h-6 w-6 cursor-pointer"
                onClick={() => setShowNotification(!showNotification)}
              />
              <span className="absolute top-0 right-0 bg-primary rounded-full h-3 w-3"></span>
              {showNotification && (
                <div
                  className="absolute top-7 -right-9 rounded-md"
                  ref={notificationRef}
                >
                  {notifications.map((notification, index) => (
                    <NotificationCard
                      key={index}
                      type={notification.type}
                      description={notification.description}
                      time={notification.time}
                    />
                  ))}
                </div>
              )}
            </div>
            <MagnifyingGlassIcon className="h-6 w-6" />
          </div>
        </div> */}
        {/* <section className="mt-6">
          <div className="grid grid-cols-4 mt-4 gap-4">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </section> */}
        <section className="col-span-1">
          {/* <span className="text-xl">{course.title}</span> */}
          <div
            className={clsxm(
              'lg:grid flex grid-cols-2 lg:mt-4 gap-4 ',
              'overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-track-rounded-2xl'
            )}
          >
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </section>
        <div className="my-8 text-xl font-bold">Students of the course</div>
        <table className="table-auto  overflow-scroll w-full p-8 shadow-md rounded-md">
          <thead className="">
            <tr
              className={clsxm(
                'w-full m-4 lg:text-gray-600 text-left text-xs font-normal',
                'lg:text-sm'
              )}
            >
              <th className="p-4">Name</th>
              <th className="p-4 hidden ">Email</th>
              <th className="p-4">Batch</th>
              <th className="p-4">Attendance</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="lg:flex items-center gap-2 p-4">
                <img
                  className="-ml-2 rounded-full w-12 h-12 hidden lg:block"
                  src="/png/student1.png"
                  alt="student"
                />
                <span className="text-black text-xs lg:text-sm font-bold">
                  Shanmukeshwar
                </span>
                <div className="text-primary text-xs lg:hidden font-normal">
                  thestackdev@fullstacklab.org
                </div>
              </td>
              <td className="p-4 hidden">thestackdev@fullstacklab.org</td>
              <td className="p-4 text-xs font-semibold lg:font-normal lg:text-base">
                01
              </td>
              <td className="p-4 text-xs font-semibold lg:font-normal lg:text-base">
                <span className="bg-green-200 lg:py-2 lg:px-6 p-1.5 rounded-md text-green-700">
                  80%
                </span>
              </td>
              <td className="lg:p-4 py-1.5 px-1">
                <button className="bg-primary p-2 text-[10px] lg:text-xs whitespace-nowrap text-white rounded-md">
                  Report Card
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Course
Course.auth = true
