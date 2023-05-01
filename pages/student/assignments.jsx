import Accordion from '@/components/Accordian'
import CircularProgressBar from '@/components/CircularProgressBar'
import Announcements from '@/components/student/Announcements'
import Calender from '@/components/student/Calender'
import ClassRecordings from '@/components/student/ClassRecordings'
import CourseMaterial from '@/components/student/CourseMaterial'
import Exams from '@/components/student/Exams'
import Navbar from '@/components/student/Navbar'
import clsxm from '@/lib/clsxm'
import { useState } from 'react'

const courseTabs = [
  {
    id: 1,
    name: 'Course material',
  },
  {
    id: 2,
    name: 'Announcements',
  },
  {
    id: 3,
    name: 'Class recordings',
  },
  {
    id: 4,
    name: 'Exams',
  },
  {
    id: 5,
    name: 'assignment',
  },
  {
    id: 6,
    name: 'Calender',
  },
]

const Assignments = () => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <>
      <Navbar />
      <div className="lg:pl-14 lg:py-10 lg:px-10 p-5">
        <div className="flex lg:flex-row flex-col">
          <div className="flex flex-col lg:mr-6">
            {/* module section */}
            <div
              className={clsxm(
                'lg:border border-solid border-muted rounded-[20px]',
                'lg:pt-6 lg:px-9 lg:pb-9 lg:w-[558px] lg:h-[382px] lg:mb-6 mb-9',
                'overflow-scroll  scrollable-div'
              )}
            >
              <div className="text-xl px-1.5 lg:text-2xl font-medium mb-5 lg:mb-7">
                30 days beginner guitar class
              </div>
              <Accordion title="Module 1" className="mb-2">
                <div className="border border-solid border-[#C7C9D9] p-2.5 mb-0.5">
                  Intro
                </div>
                <div className="border border-solid border-[#C7C9D9] p-2.5 mb-0.5">
                  Holding the guitar
                </div>
                <div className="border border-solid border-[#C7C9D9] p-2.5">
                  First chord
                </div>
              </Accordion>
              <Accordion title="Module 2" className="mb-2">
                <p className="text-gray-700">
                  Content for section 1 goes here.
                </p>
              </Accordion>
              <Accordion title="Module 3">
                <p className="text-gray-700">
                  Content for section 1 goes here.
                </p>
              </Accordion>
            </div>
            {/* progress section */}
            <div
              className={clsxm(
                'lg:border border-solid border-muted rounded-[20px] mb-9 lg:mb-0',
                'lg:pt-5 lg:px-7 lg:pb-9 lg:w-[558px] lg:h-[265px] order-first lg:order-none'
              )}
            >
              <div className="text-xl font-medium mb-7">My Progress</div>
              <div className="flex">
                <CircularProgressBar percentage={40} />
                <div className="ml-20">
                  <div className="flex">
                    <div className="w-1.5 bg-primary h-9 rounded" />
                    <div className="ml-5">
                      <div>12/24</div>
                      <div className="text-xs font-medium">Completed</div>
                    </div>
                  </div>
                  <div className="mt-6 text-sm font-normal">
                    Total hours{' '}
                    <span className="text-lg font-semibold">7h 30 m </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={clsxm(
              'lg:border border-solid border-muted lg:rounded-[20px] w-full',
              'h-[672px] overflow-y-scroll scrollable-div'
            )}
          >
            <div className="mb-7 lg:p-5 flex items-center z-50 overflow-auto scrollable-div sticky top-0 bg-[#F7F7F7] shadow-lg">
              {courseTabs.map((tab, index) => (
                <div
                  className={clsxm(
                    'p-2.5 mr-5 whitespace-nowrap cursor-pointer text-sm font-medium',
                    {
                      'text-primary underline': activeTab === index,
                      'text-muted': activeTab !== index,
                    }
                  )}
                  key={index}
                  onClick={() => setActiveTab(index)}
                >
                  {tab.name}
                </div>
              ))}
            </div>
            <div className="lg:py-6 lg:px-10">
              {activeTab === 0 && <CourseMaterial />}
              {activeTab === 1 && <Announcements />}
              {activeTab === 2 && <ClassRecordings />}
              {activeTab === 3 && <Exams />}
              {activeTab === 4 && <Exams />}
              {activeTab === 5 && <Calender />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Assignments
Assignments.auth = true
