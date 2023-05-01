import MentorNavbar from '@/components/mentor/MentorNavbar'
import MentorNavigation from '@/components/mentor/Navigation'
import NotificationCard from '@/components/mentor/NotificationCard'
import Progressbar from '@/components/Progressbar'
import Spinner from '@/components/Spinner'
import useClickOutside from '@/hooks/useClickOutside'
import clsxm from '@/lib/clsxm'
import {
  ArrowLeftIcon,
  BellIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

const CourseModule = ({ module, index }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  function toggleCollapse() {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="w-full">
      <div className="flex w-full justify-between p-4 bg-[#E6F3E5]">
        <div className="flex flex-col">
          <h1 className="font-bold text-lg">{`Module ${index + 1}: ${
            module.title
          }`}</h1>
          <span className="text-gray-500">{`0/${module.lectures.length} classes`}</span>
        </div>
        {isExpanded ? (
          <ChevronUpIcon
            className="h-5 w-5 cursor-pointer"
            onClick={toggleCollapse}
          />
        ) : (
          <ChevronDownIcon
            className="h-5 w-5 cursor-pointer"
            onClick={toggleCollapse}
          />
        )}
      </div>
      {isExpanded && (
        <div className="flex flex-col gap-4 p-4">
          {module.lectures.map((lecture, index) => (
            <div className="flex flex-row justify-between w-full" key={index}>
              <div className="flex flex-row">
                <div className="flex flex-row gap-3">
                  <input type="checkbox" />
                  <div className="flex flex-col items-start gap-2">
                    <span className="font-semibold text-sm">
                      {`Class ${index + 1}: ${lecture.title}`}
                    </span>
                    <span className="text-gray-500 ml-2 text-sm">
                      1/1 students
                    </span>
                  </div>
                </div>
              </div>
              <VideoCameraIcon className="h-5 w-5" />
            </div>
          ))}
        </div>
      )}
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
  const [batch, setBatch] = useState(null)

  useClickOutside(notificationRef, () => {
    setShowNotification(false)
  })

  const fetchCourse = async (courseId, batchId) => {
    try {
      const response = await axios.get(`/api/course/${courseId}`)
      setCourse(response.data?.data)
      const batchIndex = response.data?.data?.batches?.findIndex(
        (batch) => batch.id === batchId
      )
      setBatch(response.data?.data?.batches[batchIndex])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const { course, batch } = router.query
    if (course) fetchCourse(course, batch)
  }, [])

  // if (!course)
  //   return (
  //     <div className="w-screen h-screen flex items-center justify-center">
  //       <Spinner height={50} width={50} color="#3949ab" />
  //     </div>
  //   )

  return (
    <div>
      <MentorNavbar />
      <div className="w-full p-4 overflow-y-scroll h-screen">
        <div className="lg:flex flex-row justify-between p-4 border-b w-full h-fit border-b-gray-300 hidden">
          <div className="flex flex-row gap-2 items-center">
            <ArrowLeftIcon
              className="h-5 w-5 text-primary cursor-pointer"
              onClick={() => router.back()}
            />
            <span className="text-2xl font-black">Course - </span>
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
        </div>
        <div className="lg:grid grid-cols-3 mt-6">
          <section className="bg-white col-span-2 shadow-md rounded-md">
            <h1 className="m-4">Course Progress</h1>
            <Progressbar progress={80} />
            <div className="max-h-[500px] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-track-rounded-2xl">
              {batch?.modules?.map((module, index) => (
                <CourseModule key={module.id} module={module} index={index} />
              ))}
            </div>
          </section>
          <section className="p-4 hidden lg:block">
            <h1 className="text-lg font-bold mb-4">Questions</h1>
            <div className="rounded-md w-full" ref={notificationRef}>
              {notifications.map((notification, index) => (
                <NotificationCard
                  key={index}
                  type={notification.type}
                  description={notification.description}
                  time={notification.time}
                />
              ))}
            </div>
          </section>
        </div>
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
