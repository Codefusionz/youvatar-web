import InstructorCard from '@/components/cards/InstructorCard'
import StudentCourseCard from '@/components/cards/StudentCourseCard'
import Footer from '@/components/Footer'
import CourseCard from '@/components/mentor/CourseCard'
import Spinner from '@/components/Spinner'
import Navbar from '@/components/student/Navbar'
import clsxm from '@/lib/clsxm'
import { ReminderCard } from '@/pages/mentor/dashboard'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { useSelector } from 'react-redux'

const StudentDashboard = () => {
  const [loading, setLoading] = useState({
    courses: true,
    reminders: true,
  })
  const [reminderDate, setReminderDate] = useState(new Date())
  const [upcomingLiveClasses, setUpcomingLiveClasses] = useState([])

  const [reminders, setReminders] = useState([])
  const user = useSelector((state) => state.user.data)

  const fetchUpcomingLiveClasses = async () => {
    try {
      const response = await axios.get('/api/student/classes')
      setUpcomingLiveClasses(response.data.data)
    } catch (error) {
      console.log(error)
    }
    setLoading((e) => ({ ...e, courses: false }))
  }

  const fetchReminders = async (date) => {
    try {
      setLoading((e) => ({ ...e, reminders: true }))
      const response = await axios.get(`/api/student/reminders?date=${date}`)
      setReminders(response.data.data)
    } catch (error) {
      console.log(error)
    }
    setLoading((e) => ({ ...e, reminders: false }))
  }

  const changeDateToNextDay = (date) => {
    const nextDate = new Date(date)
    nextDate.setDate(nextDate.getDate() + 1)
    return nextDate
  }

  const changeDateToPreviousDay = (date) => {
    const prevDate = new Date(date)
    prevDate.setDate(prevDate.getDate() - 1)
    return prevDate
  }

  const [courseDetails, setCourseDetails] = useState([
    {
      title: 'Learn Figma - UI/UX Design Essential Training',
      lessons: '10',
      students: '50',
      level: 'Beginner',
    },
    {
      title: 'Learn Figma - UI/UX Design Essential Training',
      lessons: '10',
      students: '50',
      level: 'Beginner',
    },
    {
      title: 'Learn Figma - UI/UX Design Essential Training',
      lessons: '10',
      students: '50',
      level: 'Beginner',
    },
    {
      title: 'Learn Figma - UI/UX Design Essential Training',
      lessons: '10',
      students: '50',
      level: 'Beginner',
    },
  ])

  useEffect(() => {
    fetchUpcomingLiveClasses()
  }, [])

  useEffect(() => {
    fetchReminders(reminderDate)
  }, [reminderDate])

  if (!user)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner height={50} width={50} color="#3949ab" />
      </div>
    )

  return (
    <>
      <Navbar />
      <div className="lg:mt-6 relative">
        <div className="text-xl lg:text-4xl font-bold lg:mb-7  py-1 lg:py-0 px-5">
          Your Classes
        </div>
        {loading.courses ? (
          <div className="flex w-full h-full items-center justify-center">
            <Spinner height={30} width={30} color="#3949ab" />
          </div>
        ) : (
          <div className="flex flex-row gap-4 pl-5 overflow-x-scroll mt-2">
            {upcomingLiveClasses.map((item) => (
              <CourseCard key={item.id} item={item} />
            ))}
          </div>
        )}
        <div className="lg:grid grid-cols-2">
          <div>
            <div className="flex items-center justify-between mt-7 px-5 ">
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
                  onChange={(date) => setReminderDate(date)}
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
            <div className="flex flex-row gap-4 mt-6 mb-4 px-5">
              <span className="bg-orange-800 text-white pt-2 pb-1 px-3 text-sm w-44 text-center rounded-t-lg">
                All
              </span>
              <span className="bg-orange-500 text-white pt-2 pb-1 px-3 text-sm w-44 text-center rounded-t-lg">
                class
              </span>
              <span className="bg-blue-500 text-white pt-2 pb-1 px-3 text-sm w-44 text-center rounded-t-lg">
                Assignment
              </span>
              <span className="bg-green-500 text-white pt-2 pb-1 px-3 text-sm w-44 text-center rounded-t-lg">
                Test
              </span>
            </div>
            {loading.reminders ? (
              <div className="flex w-full h-full items-center justify-center">
                <Spinner height={30} width={30} color="#3949ab" />
              </div>
            ) : (
              <div className="px-5 flex flex-col gap-4 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-track-rounded-2xl">
                {reminders.map((item, index) => (
                  <ReminderCard
                    key={index}
                    type={item.type}
                    title={item.title}
                    time={item.time}
                    students={item.students}
                    description={item.description}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="text-xl lg:text-4xl font-bold my-5 lg:my-7 px-5">
          Recommended for you
        </div>
        <div
          className={clsxm(
            'pl-5 flex flex-row gap-4 ',
            'overflow-y-scroll scrollbar-track-inherit scrollbar-thumb-gray-300  scrollbar-track-rounded-2xl'
          )}
        >
          {courseDetails.map((item, index) => (
            <StudentCourseCard key={index} item={item} />
          ))}
        </div>

        <div className="mt-48 mb-36 hidden lg:block ">
          <div className="flex items-center justify-between">
            <div className="w-96 mr-28">
              <div className="text-4xl font-black mb-3">
                <span className="text-primary">Best</span> Instructors
              </div>
              <div className="text-sm font-normal mb-20">
                At the Youvatar, we strive to bring together the best professors
                for the best courses
              </div>

              <button className="w-36 p-2 flex items-center justify-center bg-primary rounded-md text-white">
                All Instructors{' '}
                <span className=" inline-block">
                  <ChevronRightIcon className="h-5 w-5 " />
                </span>
              </button>
            </div>
            <div className="absolute  right-0">
              <img src="/png/background.png" alt="background" />
              <div
                className={clsxm(
                  'grid grid-cols-2 w-[500px] gap-y-6 absolute',
                  'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                )}
              >
                <InstructorCard />
                <InstructorCard />
                <InstructorCard />
                <InstructorCard />
              </div>
            </div>
          </div>
        </div>
        <div className="text-xl lg:text-4xl font-bold my-5 lg:my-7 px-5">
          Top Courses
        </div>
        <div
          className={clsxm(
            'flex flex-row gap-4 pl-5',
            'overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-track-rounded-2xl'
          )}
        >
          {courseDetails.map((item, index) => (
            <StudentCourseCard key={index} item={item} />
          ))}
        </div>
      </div>
      <div className="mt-20 w-full">
        <Footer />
      </div>
    </>
  )
}

export default StudentDashboard
StudentDashboard.auth = true
