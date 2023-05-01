import joi from 'joi'

export const registerUserSchema = joi.object({
  displayName: joi.string(),
  username: joi.string().required(),
  email: joi.string().email({ tlds: { allow: false } }),
  phone: joi.string().length(10),
  password: joi.string().min(6).required(),
  dateOfBirth: joi.date(),
  source: joi.string().required().valid('email', 'phone'),
})

export const userPatchSchema = joi.object({
  displayName: joi.string(),
  dateOfBirth: joi.date(),
  intrests: joi.object(),
  image: joi.string(),
  profileColor: joi.string(),
  bio: joi.string(),
  cover: joi.string(),
  isMentor: joi.boolean(),
})

export const passwordSchema = joi.object({
  password: joi.string().min(6).required(),
  source: joi.string().required().valid('email', 'phone'),
  email: joi.string().email({ tlds: { allow: false } }),
  phone: joi.string().length(10),
})

// Frontend
export const updateProfileSchema = joi.object({
  displayName: joi.string(),
  email: joi.string().email({ tlds: { allow: false } }),
  dateOfBirth: joi.date(),
  username: joi.string(),
  intrests: joi.object(),
  image: joi.string(),
  cover: joi.string(),
  bio: joi.string(),
})
