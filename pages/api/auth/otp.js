import prisma from '@/lib/prisma'
import otpSchema from '@/schema/otp'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

const generateOTP = () => {
  const digits = '0123456789'
  let OTP = ''
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)]
  }
  return OTP
}

export default async function (req, res) {
  try {
    const value = await otpSchema.validateAsync(req.query)
    let field = 'email'
    if (value.phone) field = 'phone'

    let user

    switch (req.method) {
      case 'GET':
        switch (req.query.reason) {
          case 'register':
            user = await prisma.user.findUnique({
              where: {
                [field]: value[field],
              },
            })

            if (user) {
              res.status(400).send({ message: 'User already exists' })
              return
            }

            const OTP = generateOTP()

            await prisma.otp.deleteMany({ where: { source: value[field] } })

            await prisma.otp.create({
              data: {
                source: value[field],
                otp: OTP,
                reason: value.reason?.toUpperCase(),
              },
            })

            if (field === 'email') {
              const mailOptions = {
                from: `Youvatar ${process.env.EMAIL_FROM}`,
                to: value[field],
                subject: 'Confirm your account',
                html: OTP,
              }

              await transporter.sendMail(mailOptions)
            }

            res.status(200).send({ success: true })

            break
          case 'forgot_password':
            user = await prisma.user.findUnique({
              where: {
                [field]: value[field],
              },
            })
            break
          default:
            res.status(400).send({ message: 'Not a valid request' })
            return
        }

        break
      case 'POST':
        const otp = await prisma.otp.findFirst({
          where: {
            source: value[field],
            reason: value.reason?.toUpperCase(),
          },
        })
        if (otp.otp === value.otp) {
          await prisma.otp.delete({ where: { id: otp.id } })
          res.status(200).send({ success: true })
        } else {
          res.status(401).send({ message: 'Wrong OTP' })
        }
        break
      default:
        res.status(405).json({ message: 'This request cannot be processed' })
    }
  } catch (err) {
    console.log(err)
    res.status(401).send({ message: 'Something went wrong' })
  }
}
