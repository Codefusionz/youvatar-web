import joi from 'joi'

export const createCourseSchema = joi.object({
  mentorId: joi.string().required(),
  title: joi.string().required(),
  subTitle: joi.string().required(),
  description: joi.string().required(),
  courseLanguage: joi.string().required(),
  courseLevel: joi.string().required(),
  courseCategory: joi.string().required(),
  courseIntroFile: joi.string().required(),
  courseThumbnail: joi.string().required(),
  classDuration: joi.number().required(),
  batchWeekOff: joi.array().required(),
  learningObjectives: joi.array().required(),
  coursePrerequisites: joi.array().required(),
  courseFor: joi.array().required(),
  welcomeMessage: joi.string().required(),
  congratulationsMessage: joi.string().required(),
  price: joi.number().required(),
  applicationCloseDate: joi.date().required(),
  classStartDate: joi.date().required(),
  batches: joi.array().required().items({
    timeSlot: joi.string().required(),
    numberOfStudents: joi.number().required(),
  }),
  modules: joi
    .array()
    .required()
    .items({
      name: joi.string().required(),
      lectures: joi.array().required().items({
        name: joi.string().required(),
        lectureDate: joi.date().required(),
      }),
    }),
})

export const draftCourseSchema = joi.object({
  content: joi.string().required(),
  progress: joi.number().required(),
})

export const courseCartSchema = joi.object({
  courseId: joi.string().required(),
  batchId: joi.string().required(),
})
