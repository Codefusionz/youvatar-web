'use client'

import PrimaryButton from '@/components/Button/Primary'
import SecondaryButton from '@/components/Button/Secondary'
import CourseMessage from '@/components/CourseMessage'
import SemiCircleProgressBar from '@/components/SemiCircleProgress'
import Spinner from '@/components/Spinner'
import CourseBatches from '@/components/course/CourseBatches'
import CourseCirriculum from '@/components/course/CourseCirriculum'
import CourseDetails from '@/components/course/CourseDetails'
import CourseObjective from '@/components/course/CourseObjective'
import CoursePricing from '@/components/course/CoursePricing'
import CourseRequirements from '@/components/course/CourseRequirement'
import supabase from '@/lib/supabase-browser'
import { Course } from '@/lib/types/course'
import { mentor } from '@/signals/auth'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

export default function Page() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<Course>()

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
  ]
  const parentRef = useRef<HTMLDivElement | null>(null)
  const focusedStepRef = useRef<HTMLDivElement | null>(null)
  const previousStepRef = useRef<number | null>(null)
  const router = useRouter()
  const params = useSearchParams()
  const draftId = params.get('draftId')

  const duration = watch('duration')

  function calculateLectureDays(course: Course, startDate: Date) {
    const weekOffDays = course.weekOff.map((weekOff) => weekOff)

    const classStartDate = new Date(startDate)

    function isWeekOff(day: string) {
      return weekOffDays.includes(day)
    }

    function getNextClassDate(currentDate: Date) {
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
          lecture.date = currentDate.toISOString().split('T')[0]
        }
        currentDate = getNextClassDate(currentDate)
      })
    })

    return course
  }

  const onSubmit: SubmitHandler<Course> = async (event) => {
    try {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
        setProgress(Math.round(((currentStep + 1) / (steps.length - 1)) * 100))
        return
      }

      setLoading(true)

      const thumbnailUrl = await supabase.storage
        .from('youvatar')
        .upload(
          `course/${mentor.value?.id}/thumbnail-${Date.now()}.jpg`,
          event.thumbnail,
          { upsert: true }
        )

      const introFileUrl = await supabase.storage
        .from('youvatar')
        .upload(
          `course/${mentor.value?.id}/introFile-${Date.now()}.jpg`,
          event.introFile,
          { upsert: true }
        )

      calculateLectureDays(event, event.classStartDate)

      const pretty = {
        ...event,
        // @ts-ignore
        language: event.language.value,
        // @ts-ignore
        level: event.level.value,
        // @ts-ignore
        category: event.category.value,
        // @ts-ignore
        duration: event.duration.value,
        // @ts-ignore
        weekOff: event.weekOff.map((e) => e.value),
        batches: event.batches.map((e) => ({
          ...e,
          // @ts-ignore
          timeSlot: e.timeSlot.value,
        })),
        modules: event.modules.map((e) => {
          delete e.id
          e.lectures = e.lectures.map((x) => {
            delete x.id
            return x
          })
          return e
        }),
        introFile: introFileUrl,
        thumbnail: thumbnailUrl,
      }

      const clone = JSON.parse(JSON.stringify(pretty))
      delete clone.batches
      delete clone.modules

      console.log('clone', clone)
      console.log('pretty', pretty)

      const { data: courseData, error: courseError } = await supabase
        .from('course')
        .insert([clone])
        .select()

      if (courseError) {
        console.error('Error inserting course:', courseError)
        return
      }

      const { data: batchData, error: batchError } = await supabase
        .from('batches')
        .insert(
          pretty.batches.map((batch) => ({
            timeSlot: batch.timeSlot,
            numberOfStudents: batch.numberOfStudents,
            courseId: courseData[0].id,
          }))
        )
        .select()

      if (batchError) {
        console.error('Error inserting batches:', batchError)
        return
      }
      console.log('batchData', batchData)

      for (let i = 0; i < pretty.modules.length; i++) {
        const module = pretty.modules[i]

        const { data: moduleData, error: moduleError } = await supabase
          .from('modules')
          .insert({ title: module.title })
          .select()

        if (moduleError) {
          console.error('Error inserting module:', moduleError)
          return
        }

        for (let j = 0; j < module.lectures.length; j++) {
          const lecture = module.lectures[j]

          const { error: lectureError, data: lectureData } = await supabase
            .from('lectures')
            .insert({
              title: lecture.title,
              moduleId: moduleData[0].id,
              date: lecture.date,
            })
            .select()

          if (lectureError) {
            console.error('Error inserting lecture:', lectureError)
            return
          }

          for (let i = 0; i < batchData.length; i++) {
            await supabase.from('classes').insert({
              batch_id: batchData[i].id,
              course_id: courseData[0].id,
              lecture_id: lectureData[0].id,
              timestamp: lecture.date,
              module_id: moduleData[0].id,
            })
          }
        }
      }

      // if (draftId) await axios.delete(`/api/course/draft?id=${draftId}`)

      setLoading(false)

      router.push(`/mentor/dashboard/courses/${courseData[0].id}`)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const fetchMentorDetails = async () => {
    try {
      // const response = await axios.get('/api/mentor')
      // setMentorDetails(response.data?.data)
    } catch (error) {
      console.log(error)
    }
  }

  const saveDraft = async () => {
    // try {
    //   setDraftLoading(true)
    //   if (draftId) {
    //     await axios.patch(`/api/course/draft?id=${draftId}`, {
    //       content: JSON.stringify(form),
    //       progress: progress,
    //     })
    //   } else {
    //     await axios.post('/api/course/draft', {
    //       content: JSON.stringify(form),
    //       progress: progress,
    //     })
    //   }
    //   router.push(`/mentor/dashboard/courses/draft`)
    // } catch (error) {
    //   console.log(error)
    // }
    // setDraftLoading(false)
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

    if (previousStepRef.current) {
      if (previousStepRef.current > currentStep) {
        parentDiv.scroll({ left: offsetTop - 100, behavior: 'smooth' })
      } else {
        parentDiv.scroll({ left: offsetTop + 100, behavior: 'smooth' })
      }
      previousStepRef.current = currentStep
    }
  }, [currentStep])

  const fetchDraft = async () => {
    // try {
    //   setDraftLoading(true)
    //   const response = await axios.get(`/api/course/draft?id=${draftId}`)
    //   setForm(JSON.parse(response.data?.data?.content))
    // } catch (error) {
    //   console.log(error)
    // }
    // setDraftLoading(false)
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
          {draftLoading && (
            <Spinner style={{ height: 19, width: 19, color: '#fff' }} />
          )}
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
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
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
              <CourseDetails
                register={register}
                errors={errors}
                control={control}
              />
            )}
            {currentStep === 1 && (
              <CourseBatches
                register={register}
                errors={errors}
                control={control}
                // @ts-ignore
                duration={duration?.value}
              />
            )}
            {currentStep === 2 && (
              <CourseObjective
                register={register}
                errors={errors}
                control={control}
              />
            )}
            {currentStep === 3 && (
              <CourseCirriculum
                register={register}
                errors={errors}
                control={control}
              />
            )}
            {currentStep === 4 && (
              <CourseRequirements
                register={register}
                errors={errors}
                control={control}
              />
            )}
            {currentStep === 5 && (
              <CourseMessage
                register={register}
                errors={errors}
                control={control}
              />
            )}
            {currentStep === 6 && (
              <CoursePricing
                register={register}
                errors={errors}
                control={control}
              />
            )}
            <div className="flex justify-between w-full mt-4">
              <SecondaryButton
                title="back"
                onClick={() => {
                  setCurrentStep(currentStep - 1)
                  setProgress(
                    Math.round(((currentStep - 1) / (steps.length - 1)) * 100)
                  )
                }}
                type="button"
              />
              <PrimaryButton title="Next" type="submit" loading={loading} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
