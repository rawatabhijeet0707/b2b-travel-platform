import dotenv from 'dotenv'

dotenv.config()

const OTP_LENGTH = parseInt(process.env.OTP_LENGTH) || 4
const OTP_EXPIRY_MINUTES = parseInt(process.env.OTP_EXPIRY_MINUTES) || 5

export function generateOtp() {
  let otp = ''
  for (let i = 0; i < OTP_LENGTH; i++) {
    otp += Math.floor(Math.random() * 10).toString()
  }
  return otp
}

export function getOtpExpiry() {
  const expiry = new Date()
  expiry.setMinutes(expiry.getMinutes() + OTP_EXPIRY_MINUTES)
  return expiry
}

export function isOtpExpired(expiryDate) {
  return new Date() > new Date(expiryDate)
}

// In production, integrate SMS gateway (MSG91, Twilio, etc.)
export async function sendOtpSms(mobile, otp) {
  if (process.env.NODE_ENV === 'production') {
    // TODO: Integrate SMS gateway
    // const msg91 = require('msg91-sdk')
    // await msg91.send({ mobile, message: `Your TravelDistrib OTP is ${otp}` })
  } else {
    console.log(`\n📱 [DEV MODE] OTP for +91 ${mobile}: ${otp}\n`)
  }
  return true
}
