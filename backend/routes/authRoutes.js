import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import {
  handleSendOtp, handleVerifyOtp, handleRegister,
  handleLoginPassword, handleGetCurrentUser, handleUpdateProfile,
} from '../controllers/authController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import {
  validateBody, sendOtpSchema, verifyOtpSchema,
  completeRegistrationSchema, loginPasswordSchema,
} from '../middleware/validation.js'

const router = Router()

// Rate limiting for auth endpoints
const otpLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3, // 3 OTP requests per minute
  message: { success: false, message: 'Too many OTP requests. Please wait a minute.' },
})

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 login attempts per 15 minutes
  message: { success: false, message: 'Too many login attempts. Please try again later.' },
})

// Routes
router.post('/send-otp', otpLimiter, validateBody(sendOtpSchema), handleSendOtp)
router.post('/verify-otp', validateBody(verifyOtpSchema), handleVerifyOtp)
router.post('/register', validateBody(completeRegistrationSchema), handleRegister)
router.post('/login', loginLimiter, validateBody(loginPasswordSchema), handleLoginPassword)
router.get('/me', authMiddleware, handleGetCurrentUser)
router.put('/profile', authMiddleware, handleUpdateProfile)

export default router
