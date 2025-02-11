
let nodemailer = require('nodemailer')

async function sendEmail(options) {
  // Looking to send emails in production? Check out our Email API/SMTP product!
  var transport = nodemailer.createTransport({
    host: process.env.HMTP_HOST,
    port: process.env.HMTP_PORT,
    auth: {
      user: process.env.HMTP_EMAIL,
      pass: process.env.HMTP_PASSWORD,
    }
  })

  let message = {
    from : `${process.env.HMTP_EMAIL}`,
    to: options.email,
    subject: options.subject,
    html: options.message
  }

  await transport.sendMail(message)

}

module.exports = sendEmail