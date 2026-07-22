import Razorpay from 'razorpay'
import dotenv from 'dotenv'

dotenv.config()

export const razorpayKeyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_SCLKT5gvaOwzN3'
export const razorpaySecret = process.env.RAZORPAY_SECRET || 'gUlTnihlkB6czp7E45PTV03A'

export const razorpay = new Razorpay({
  key_id: razorpayKeyId,
  key_secret: razorpaySecret,
})

export const RAZORPAY_KEY_ID = razorpayKeyId
