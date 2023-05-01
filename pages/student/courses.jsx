import StudentCourseCard from '@/components/cards/StudentCourseCard'
import Footer from '@/components/Footer'
import Navbar from '@/components/student/Navbar'
import clsxm from '@/lib/clsxm'
import { useState } from 'react'

const Courses = () => {
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
          Active courses
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
          Recommend for you
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
      </div>
      <div className="lg:mt-20 mt-7 w-full">
        <Footer />
      </div>
    </>
  )
}

export default Courses
Courses.auth = true
