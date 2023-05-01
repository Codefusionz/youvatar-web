import prisma from '@/lib/prisma'
import { createCourseSchema } from '@/schema/course'
import { getToken } from 'next-auth/jwt'

export default async function handler(req, res) {
  const token = await getToken({ req })

  if (!token) {
    res.status(401).send({ message: 'Unauthorized' })
    return
  }

  try {
    switch (req.method) {
      case 'GET':
        const mentor = await prisma.mentor.findUnique({
          where: {
            userId: token.sub,
          },
        })

        const courses = await prisma.courses.findMany({
          where: {
            mentorId: mentor.id,
          },
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            batches: {
              include: {
                modules: {
                  include: {
                    lectures: true,
                  },
                },
              },
            },
          },
        })

        res.status(200).send({ success: true, data: courses })
        break
      case 'POST':
        const payload = await createCourseSchema.validateAsync(req.body)
        const course = await prisma.courses.create({
          data: {
            title: payload.title,
            subTitle: payload.subTitle,
            description: payload.description,
            courseLanguage: payload.courseLanguage,
            courseLevel: payload.courseLevel,
            courseCategory: payload.courseCategory,
            courseIntroFile: payload.courseIntroFile,
            courseThumbnail: payload.courseThumbnail,
            classDuration: payload.classDuration,
            batchWeekOff: { set: payload.batchWeekOff },
            learningObjectives: { set: payload.learningObjectives },
            coursePrerequisites: { set: payload.coursePrerequisites },
            courseFor: { set: payload.courseFor },
            welcomeMessage: payload.welcomeMessage,
            congratulationsMessage: payload.congratulationsMessage,
            applicationCloseDate: payload.applicationCloseDate,
            classStartDate: payload.classStartDate,
            price: payload.price,
            mentor: { connect: { id: payload.mentorId } },
            batches: {
              create: payload.batches.map((batch) => ({
                timeSlot: batch.timeSlot,
                numberOfStudents: batch.numberOfStudents,
                modules: {
                  create: payload.modules.map((module) => ({
                    title: module.name,
                    lectures: {
                      create: module.lectures.map((lecture) => ({
                        title: lecture.name,
                        lectureDate: lecture.lectureDate,
                      })),
                    },
                  })),
                },
              })),
            },
          },
          include: {
            batches: {
              include: {
                modules: {
                  include: {
                    lectures: true,
                  },
                },
              },
            },
          },
        })

        await prisma.post.create({
          data: {
            authorId: token.sub,
            courseId: course.id,
            image: course.courseThumbnail,
            content: `I just created a new course: ${course.title}`,
          },
        })

        res.status(200).send({ success: true })
        break
      default:
        res.status(405).json({ message: 'This request cannot be processed' })
    }
  } catch (error) {
    console.log(error)
    return res.status(503).send({ message: 'Something went wrong' })
  }
}
