import CourseBatches from '@/components/mentor/create/CourseBatches'
import CourseCirriculum from '@/components/mentor/create/CourseCirriculum'
import CourseDetails from '@/components/mentor/create/CourseDetails'
import CourseMessage from '@/components/mentor/create/CourseMessage'
import CourseObjective from '@/components/mentor/create/CourseObjective'
import CoursePricing from '@/components/mentor/create/CoursePricing'
import CourseReferal from '@/components/mentor/create/CourseReferal'
import CourseRequirements from '@/components/mentor/create/CourseRequirement'
import SemiCircleProgressBar from '@/components/SemiCircleProgress'
import Spinner from '@/components/Spinner'
import { getSingedUrl } from '@/utils/helpers'
import axios from 'axios'
import crypto from 'crypto'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

function CreateCourse() {
  const [mentorDetails, setMentorDetails] = useState({})
  const [form, setForm] = useState({
    title: '',
    subTitle: '',
    description: '',
    courseLanguage: '',
    courseLevel: '',
    courseCategory: '',
    courseIntroFile: null,
    courseThumbnail: null,
    classDuration: { label: '30 minutes', value: 30 },
    batches: [],
    learningObjectives: ['', ''],
    modules: [],
    coursePrerequisites: [''],
    courseFor: [''],
    welcomeMessage: '',
    congratulationsMessage: '',
    price: '',
    batchWeekOff: [],
    applicationCloseDate: Date.now(),
    classStartDate: Date.now(),
  })
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)
  const [draftLoading, setDraftLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const steps = [
    { title: 'Course Landing Page' },
    { title: 'Batches' },
    { title: 'Intended Learners' },
    { title: 'Cirriculum' },
    { title: 'Course Requirement' },
    { title: 'Course Message' },
    { title: 'Pricing' },
    { title: 'Promotions' },
  ]
  const parentRef = useRef(null)
  const focusedStepRef = useRef(null)
  const previousStepRef = useRef(null)
  const router = useRouter()
  const draftId = router.query.draftId

  function calculateLectureDays(course, startDate) {
    const weekOffDays = course.batchWeekOff.map((weekOff) => weekOff.value)
    const classStartDate = new Date(startDate)

    function isWeekOff(day) {
      return weekOffDays.includes(day)
    }

    function getNextClassDate(currentDate) {
      let nextDate = new Date(currentDate)

      do {
        nextDate.setDate(nextDate.getDate() + 1)
      } while (
        isWeekOff(nextDate.toLocaleDateString('en-US', { weekday: 'long' }))
      )

      return nextDate
    }

    let currentDate = classStartDate

    course.modules.forEach((module) => {
      module.lectures.forEach((lecture) => {
        if (
          !isWeekOff(
            currentDate.toLocaleDateString('en-US', { weekday: 'long' })
          )
        ) {
          lecture.lectureDate = currentDate.toISOString().split('T')[0]
        }
        currentDate = getNextClassDate(currentDate)
      })
    })

    return course
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (currentStep < steps.length - 1) {
        if (currentStep === 0) {
          if (!form.courseIntroFile || !form.courseThumbnail) {
            alert('Please upload course intro file and thumbnail')
            return
          }
        }
        setCurrentStep(currentStep + 1)
        setProgress(Math.round(((currentStep + 1) / (steps.length - 1)) * 100))
        return
      }

      setForm(calculateLectureDays(form, form.classStartDate))

      setLoading(true)

      const courseIntroHex = crypto.randomBytes(16).toString('hex')
      const courseThumbnailHex = crypto.randomBytes(16).toString('hex')

      const courseIntroUrl = await getSingedUrl(courseIntroHex)
      const courseThumbnailUrl = await getSingedUrl(courseThumbnailHex)

      await axios.put(courseIntroUrl, form.courseIntroFile, {
        headers: {
          'Content-Type': 'image/jpg',
        },
      })

      await axios.put(courseThumbnailUrl, form.courseThumbnail, {
        headers: {
          'Content-Type': 'image/jpg',
        },
      })

      await axios.post('/api/course', {
        ...form,
        courseLanguage: form.courseLanguage.value,
        courseLevel: form.courseLevel.value,
        courseCategory: form.courseCategory.value,
        classDuration: form.classDuration.value,
        batchWeekOff: form.batchWeekOff.map((e) => e.value),
        batches: form.batches.map((e) => ({
          ...e,
          timeSlot: e.timeSlot.value,
        })),
        modules: form.modules.map((e) => {
          delete e.id
          e.lectures = e.lectures.map((x) => {
            delete x.id
            return x
          })
          return e
        }),
        courseIntroFile: courseIntroHex,
        courseThumbnail: courseThumbnailHex,
        mentorId: mentorDetails.id,
      })

      if (draftId) await axios.delete(`/api/course/draft?id=${draftId}`)

      router.push('/mentor/dashboard/courses')
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const fetchMentorDetails = async () => {
    try {
      const response = await axios.get('/api/mentor')
      setMentorDetails(response.data?.data)
    } catch (error) {
      console.log(error)
    }
  }

  const saveDraft = async () => {
    console.log(form)
    try {
      setDraftLoading(true)
      if (draftId) {
        await axios.patch(`/api/course/draft?id=${draftId}`, {
          content: JSON.stringify(form),
          progress: progress,
        })
      } else {
        await axios.post('/api/course/draft', {
          content: JSON.stringify(form),
          progress: progress,
        })
      }
      router.push(`/mentor/dashboard/courses/draft`)
    } catch (error) {
      console.log(error)
    }
    setDraftLoading(false)
  }

  useEffect(() => {
    if (!parentRef.current || !focusedStepRef.current) return

    const parentDiv = parentRef.current
    const focusedStep = focusedStepRef.current
    const offsetTop = focusedStep.offsetTop

    if (currentStep === 0) {
      parentDiv.scroll({ left: -1000, behavior: 'smooth' })
      return
    }

    if (currentStep === steps.length - 1) {
      parentDiv.scroll({ left: +1000, behavior: 'smooth' })
      return
    }

    if (previousStepRef.current > currentStep) {
      parentDiv.scroll({ left: offsetTop - 100, behavior: 'smooth' })
    } else {
      parentDiv.scroll({ left: offsetTop + 100, behavior: 'smooth' })
    }
    previousStepRef.current = currentStep
  }, [currentStep])

  const fetchDraft = async () => {
    try {
      setDraftLoading(true)
      const response = await axios.get(`/api/course/draft?id=${draftId}`)
      setForm(JSON.parse(response.data?.data?.content))
    } catch (error) {
      console.log(error)
    }
    setDraftLoading(false)
  }

  useEffect(() => {
    fetchMentorDetails()
  }, [])

  useEffect(() => {
    if (draftId) fetchDraft()
  }, [draftId])

  return (
    <div className="flex flex-col max-w-[1200px] mx-auto p-10">
      <div className="flex flex-row justify-end md:justify-between mb-10">
        <h1 className="text-[#3949AB] text-4xl font-extrabold leading-9 tracking-normal text-center hidden lg:block">
          Youvatar
        </h1>
        <button
          onClick={() => saveDraft()}
          className="bg-primary w-32 text-white rounded px-3 py-2 text-sm"
        >
          {draftLoading && <Spinner height={19} width={19} color="#fff" />}
          Save Draft
        </button>
      </div>
      <div className="flex justify-between gap-[100px]">
        <img
          className="h-[548px] w-[265px] rounded-sm hidden lg:block"
          src="/png/mobile.png"
        />
        <div className="w-full max-w-screen-md">
          <div
            ref={parentRef}
            className="flex flex-nowrap border mb-8 max-w-screen-md border-gray-300 px-4 pt-4 w-full rounded-lg overflow-x-scroll scrollbar-none cursor-pointer"
          >
            {steps.map((step, index) => (
              <span
                key={index}
                ref={index === currentStep ? focusedStepRef : null}
                className={`whitespace-nowrap mr-5 ${
                  index === currentStep && 'font-semibold text-primary'
                }`}
              >
                {step.title} <br />
                {index === currentStep && (
                  <div className="h-2 bg-primary w-full rounded-lg mt-1"></div>
                )}
              </span>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex flex-row gap-4">
              <img className="w-full lg:w-[300px]" src="/png/girl.png" />
              <div className="relative hidden lg:block">
                <SemiCircleProgressBar
                  background="#3949AB33"
                  diameter={350}
                  strokeWidth={30}
                  stroke="#3949AB"
                  percentage={progress}
                />
                <div className="absolute bottom-0 right-0 left-0 flex flex-col items-center bg-white w-fit mx-auto">
                  <span>Percentage</span>
                  <span className="text-4xl font-bold">{progress}%</span>
                </div>
              </div>
            </div>
            {currentStep === 0 && (
              <CourseDetails form={form} setForm={setForm} />
            )}
            {currentStep === 1 && (
              <CourseBatches form={form} setForm={setForm} />
            )}
            {currentStep === 2 && (
              <CourseObjective form={form} setForm={setForm} />
            )}
            {currentStep === 3 && (
              <CourseCirriculum form={form} setForm={setForm} />
            )}
            {currentStep === 4 && (
              <CourseRequirements form={form} setForm={setForm} />
            )}
            {currentStep === 5 && (
              <CourseMessage form={form} setForm={setForm} />
            )}
            {currentStep === 6 && (
              <CoursePricing form={form} setForm={setForm} />
            )}
            {currentStep === 7 && (
              <CourseReferal form={form} setForm={setForm} />
            )}
            <div className="flex justify-between w-full mt-4">
              <button
                disabled={currentStep === 0}
                onClick={() => {
                  setCurrentStep(currentStep - 1)
                  setProgress(
                    Math.round(((currentStep - 1) / (steps.length - 1)) * 100)
                  )
                }}
                className="w-full p-2 text-primary"
                type="button"
              >
                Back
              </button>
              <button
                disabled={loading}
                className="w-full disabled:bg-secondary bg-primary text-white rounded-md p-2 font-semibold flex items-center justify-center"
              >
                {loading && <Spinner height={19} width={19} color="#fff" />}
                Proceed
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateCourse
CreateCourse.auth = true
