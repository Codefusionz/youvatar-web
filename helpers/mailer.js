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

export const sendOrderReceipt = async (email, orderId, orderAmount) => {
  const mailOptions = {
    from: `Youvatar ${process.env.EMAIL_FROM}`,
    to: email,
    subject: 'Your Order Receipt',
    text: `
        Thank you for purchasing. Your Order Receipt: ${orderId}
        Your order Amount: ${orderAmount}
        `,
  }

  await transporter.sendMail(mailOptions)
}

export const sendOrderDetailsToMentor = async (email, orderId, orderAmount) => {
  const mailOptions = {
    from: `Youvatar ${process.env.EMAIL_FROM}`,
    to: email,
    subject: 'New Order Received',
    text: `
      Congratulations! You have received a new order. Order Details:
      Order ID: ${orderId}
      Order Amount: ${orderAmount}
    `,
  }

  await transporter.sendMail(mailOptions)
}
