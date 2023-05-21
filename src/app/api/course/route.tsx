import supabaseServer from '@/lib/supabase-server'
import { Batch, Course } from '@/lib/types/course'

export async function GET(request: Request) {}

export async function POST(request: Request) {
  const supabase = supabaseServer()

  const payload = await request.json()

  function calculateLectureDays(course: Course) {
    const weekOffDays = course.weekOff.map((weekOff) => weekOff)
    const classStartDate = new Date(course.classStartDate)

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

  const parsed = calculateLectureDays(payload)

  const { data: courseData, error: courseError } = await supabase
    .from('course')
    .insert([
      {
        title: parsed.title,
        subTitle: parsed.subTitle,
        description: parsed.description,
        language: parsed.language,
        level: parsed.level,
        category: parsed.category,
        introFile: parsed.introFile,
        thumbnail: parsed.thumbnail,
        duration: parsed.duration,
        weekOff: parsed.weekOff,
        applicationCloseDate: parsed.applicationCloseDate,
        classStartDate: parsed.classStartDate,
        price: parsed.price,
        learningObjectives: parsed.learningObjectives,
        prerequisites: parsed.prerequisites,
        courseFor: parsed.courseFor,
        welcomeMessage: parsed.welcomeMessage,
        congratulationsMessage: parsed.congratulationsMessage,
      },
    ])
    .select()

  if (courseError) {
    console.error('Error inserting course:', courseError)
    return
  }

  const { data: batchData, error: batchError } = await supabase
    .from('batches')
    .insert(
      parsed.batches.map((batch: Batch) => ({
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

  for (let i = 0; i < parsed.modules.length; i++) {
    const module = parsed.modules[i]

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

      const { error: lectureError } = await supabase
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
    }
  }

  return new Response(
    JSON.stringify({
      message: 'Course created successfully',
      data: courseData[0].id,
    }),
    { status: 201 }
  )
}
