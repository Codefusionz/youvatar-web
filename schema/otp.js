import joi from 'joi'

const otpSchema = joi
  .object({
    email: joi.string().email(),
    phone: joi.string().length(10),
    otp: joi.string().length(6),
    reason: joi.string().valid('register', 'forgot_password').required(),
  })
  .or('email', 'phone')

export default otpSchema
