import joi from 'joi'

export const createPostSchema = joi.object({
  courseId: joi.string(),
  image: joi.string().required(),
  content: joi.string().required(),
})

export const createLikeSchema = joi.object({
  postId: joi.string().required(),
})

export const createCommentSchema = joi.object({
  postId: joi.string().required(),
  content: joi.string().required(),
})
