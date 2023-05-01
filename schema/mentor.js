import joi from 'joi'

export const mentorSchema = joi.object({
  schoolName: joi.string().required(),
  schoolMotive: joi.string().required(),
  schoolNiche: joi.string().required(),
  schoolDescription: joi.string().required(),
  mentorLanguage: joi.string().required(),
  mentorIdentity: joi.string().required(),
  mentorIsTeacher: joi.string().required(),
  mentorExperience: joi.string().required(),
  mentorHaveDocuments: joi.string().required(),
  addressLine1: joi.string().required(),
  addressLine2: joi.string(),
  city: joi.string().required(),
  state: joi.string().required(),
  postalCode: joi.string().required(),
  mentorPanCard: joi.string().required(),
  mentorVideo: joi.string().required(),
})
