import { z } from 'zod'

export const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian mobile number'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  agencyName: z.string().optional(),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format').optional(),
  gstNumber: z.string().optional(),
  businessAddress: z.string().optional(),
})

export const loginPasswordSchema = z.object({
  identifier: z.string().min(1, 'Email or mobile is required'),
  password: z.string().min(1, 'Password is required'),
})

export const sendOtpSchema = z.object({
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian mobile number'),
  purpose: z.enum(['registration', 'login', 'password_reset']).default('login'),
})

export const verifyOtpSchema = z.object({
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian mobile number'),
  otp: z.string().length(4, 'OTP must be 4 digits'),
  purpose: z.enum(['registration', 'login', 'password_reset']).default('login'),
})

export const completeRegistrationSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian mobile number'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  agencyName: z.string().optional(),
  panNumber: z.string().optional(),
  gstNumber: z.string().optional(),
  businessAddress: z.string().optional(),
})

export function validateBody(schema) {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body)
      next()
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.errors.map(e => ({ field: e.path.join('.'), message: e.message })),
      })
    }
  }
}
