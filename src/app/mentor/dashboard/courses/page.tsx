'use client'

import CourseCard from '@/components/CourseCard'
import NotificationCard from '@/components/NotificationCard'
import Spinner from '@/components/Spinner'
import { Course } from '@/lib/types/course'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const BatchCard = (props: {
  course: Course
  onClick: React.MouseEventHandler
}) => {
  return (
    <div className="bg-white lg:flex flex-row justify-between border border-gray-300 rounded-md p-4">
      <div className="lg:border-r w-full flex flex-col gap-4 justify-between lg:p-4 border-r-gray-300">
        <div>
          <h1
            className="text-lg lg:text-xl font-bold text-gray-800 cursor-pointer"
            onClick={props.onClick}
          >
            {props.course.title}
          </h1>
          <p className="text-gray-700 text-xs lg:text-base font-semibold">
            {props.course.description}
          </p>
        </div>
        <div className="flex items-center">
          <div className="mr-4">
            <span className="text-xs lg:text-base">Students</span>
            <div className="flex flex-row mt-2">
              <img
                className=" rounded-full h-5 w-5 lg:w-10 lg:h-10"
                src="/png/student1.png"
                alt="student"
              />
              <img
                className="-ml-2 rounded-full h-5 w-5 lg:w-10 lg:h-10"
                src="/png/student2.png"
                alt="student"
              />
              <img
                className="-ml-2 rounded-full h-5 w-5 lg:w-10 lg:h-10"
                src="/png/student3.png"
                alt="student"
              />
            </div>
          </div>
          <div>
            <div className="ml-4">
              <span className="text-xs lg:text-base">Batches</span>
              <div className="flex flex-row mt-1.5">
                <span className="text-sm lg:text-2xl">
                  {props.course.batches.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:flex flex-col mt-5 lg:mt-0 lg:ml-4 gap-4">
        {props.course.batches.map((batch, index) => (
          <Link
            key={`batchcard-${index}`}
            href={`/mentor/dashboard/courses/${props.course.id}/batch/${batch.id}`}
            className="text-gray-700 text-sm lg:text-base font-medium lg:font-semibold p-4 bg-white border flex items-center justify-between lg:w-[300px] border-gray-300 rounded-md"
          >
            <div className="w-40">
              <span className="text-sm">Batch {index + 1} </span>{' '}
              <span className="mx-3">|</span>{' '}
              <span className="text-xs">{batch.timeSlot}</span>
            </div>
            <ChevronRightIcon className="h-4 w-4 text-primary" />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function Page() {
  const [upcomingLiveCourses, setUpcomingLiveCourses] = useState([])
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

  const [courses, setCourses] = useState<Course[] | []>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [draftCourses, setDraftCourses] = useState([])

  const handleCreateCourseRouter = () => {
    if (draftCourses.length > 0) router.push('/mentor/dashboard/courses/draft')
    else router.push('/mentor/dashboard/courses/create')
  }

  const fetchData = async () => {
    // setLoading(true)
    // const classesResponse = await fetchUpcomingLiveClasses()
    // setUpcomingLiveCourses(classesResponse)
    // const draftsResponse = await fetchDraftCourses()
    // setDraftCourses(draftsResponse)
    // const coursesResponse = await fetchCourses()
    // setCourses(coursesResponse)
    // setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner style={{ height: 50, width: 50, color: '#3949ab' }} />
      </div>
    )

  return (
    <div className="w-full p-8 overflow-y-scroll h-screen lg:grid grid-cols-2 gap-10">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center gap-2">
          <h1 className="text-xl font-medium text-gray-700">Your Courses</h1>
          <button
            onClick={handleCreateCourseRouter}
            className="bg-primary text-white px-4 py-2 rounded-md"
          >
            Create Course
          </button>
        </div>
        {courses.map((course) => (
          <BatchCard
            key={course.id}
            course={course}
            onClick={() =>
              router.push(`/mentor/dashboard/courses/${course.id}`)
            }
          />
        ))}
      </div>
      <div className="w-full hidden lg:block">
        <h1 className="text-lg text-gray-700">Upcoming live Courses</h1>
        <div className="flex flex-row gap-4 mt-4 w-full overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-track-rounded-2xl">
          {upcomingLiveCourses.map((item, index) => (
            <CourseCard key={`course-${index}`} item={item} />
          ))}
        </div>
        <section className="p-4">
          <h1 className="text-lg font-bold mb-4">Questions</h1>
          <div className="rounded-md w-full">
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
    </div>
  )
}
