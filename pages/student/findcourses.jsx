import InstructorCard from '@/components/cards/InstructorCard'
import StudentCourseCard from '@/components/cards/StudentCourseCard'
import Footer from '@/components/Footer'
import Navbar from '@/components/student/Navbar'
import clsxm from '@/lib/clsxm'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

const FindCourses = () => {
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
  return (
    <>
      <Navbar />
      <div className="lg:pt-6">
        <div className="text-xl lg:text-4xl font-bold lg:my-7 mb-2.5 px-5">
          Upcoming Courses
        </div>

        <div
          className={clsxm(
            'pl-5 flex flex-row gap-4 mb-5',
            'overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-track-rounded-2xl'
          )}
        >
          {courseDetails.map((item, index) => (
            <StudentCourseCard key={index} item={item} />
          ))}
        </div>

        <div className="text-xl lg:text-4xl font-bold lg:my-7 mb-2.5 px-5">
          Recommended for you
        </div>
        <div
          className={clsxm(
            'pl-5 flex flex-row gap-4 mb-5',
            'overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-track-rounded-2xl'
          )}
        >
          {courseDetails.map((item, index) => (
            <StudentCourseCard key={index} item={item} />
          ))}
        </div>
        <div className="lg:mt-48 lg:mb-36 hidden lg:block">
          <div className="lg:flex items-center justify-between ">
            <div className="w-96 mr-28">
              <div className="text-4xl leading-[68px] font-black mb-3">
                <span className="text-primary">Best</span> Instructors
              </div>
              <div className="text-sm font-normal mb-5 lg:mb-20">
                At the Youvatar, we strive to bring together the best professors
                for the best courses
              </div>

              <button className="p-4 flex items-center justify-center bg-primary rounded-md text-white">
                All Instructors{' '}
                <span className=" inline-block">
                  <ChevronRightIcon className="h-5 w-5 ml-4 " />
                </span>
              </button>
            </div>
            <div className="absolute right-0">
              <img src="/png/background.png" alt="background" />
              <div
                className={clsxm(
                  'grid grid-cols-2 lg:w-[500px] gap-y-6 absolute',
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

        <div className="text-xl px-5 lg:text-4xl font-bold my-5">
          Top Courses
        </div>
        <div
          className={clsxm(
            'pl-5 flex flex-row gap-4',
            'overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-track-rounded-2xl'
          )}
        >
          {courseDetails.map((item, index) => (
            <StudentCourseCard key={index} item={item} />
          ))}
        </div>
      </div>
      <div className="mt-7 lg:mt-20 w-full">
        <Footer />
      </div>
    </>
  )
}

export default FindCourses
FindCourses.auth = true
