import {
  createUser, findUserByMobile, findUserByIdentifier,
  findUserByEmail, updateLastLogin, verifyPassword, sanitizeUser,
  updateUserProfile,
} from '../models/userModel.js'
import { sendOtp, verifyOtpRecord } from '../models/otpModel.js'
import { generateToken } from '../utils/jwtUtils.js'

// POST /api/auth/send-otp
export async function handleSendOtp(req, res) {
  try {
    const { mobile, purpose } = req.body

    // For registration, check if user already exists
    if (purpose === 'registration') {
      const existing = await findUserByMobile(mobile)
      if (existing) {
        return res.status(409).json({
          success: false,
          message: 'This mobile number is already registered.',
        })
      }
    }

    // For login, check if user exists
    if (purpose === 'login') {
      const user = await findUserByMobile(mobile)
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'No account found with this mobile number. Please register first.',
        })
      }
    }

    const otp = await sendOtp(mobile, purpose)

    res.json({
      success: true,
      message: 'OTP sent successfully',
      devOtp: process.env.NODE_ENV !== 'production' ? otp : undefined,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send OTP', error: error.message })
  }
}

// POST /api/auth/verify-otp
export async function handleVerifyOtp(req, res) {
  try {
    const { mobile, otp, purpose } = req.body

    const result = await verifyOtpRecord(mobile, otp, purpose)

    if (!result.valid) {
      return res.status(400).json({ success: false, message: result.message })
    }

    // For login, generate JWT
    if (purpose === 'login') {
      const user = await findUserByMobile(mobile)
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' })
      }

      if (user.account_status !== 'active') {
        return res.status(403).json({ success: false, message: 'Account is suspended. Contact support.' })
      }

      await updateLastLogin(user.id)
      const token = generateToken({ id: user.id, mobile: user.mobile, role: user.role })

      return res.json({
        success: true,
        message: 'Login successful',
        token,
        user: sanitizeUser(user),
      })
    }

    // For registration/password reset, just confirm OTP is valid
    res.json({
      success: true,
      message: 'OTP verified successfully',
      verified: true,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'OTP verification failed', error: error.message })
  }
}

// POST /api/auth/register
export async function handleRegister(req, res) {
  try {
    const { fullName, email, mobile, password, agencyName, panNumber, gstNumber, businessAddress } = req.body

    // Check if email already exists
    const existingEmail = await findUserByEmail(email)
    if (existingEmail) {
      return res.status(409).json({ success: false, message: 'Email already registered' })
    }

    // Check if mobile already exists
    const existingMobile = await findUserByMobile(mobile)
    if (existingMobile) {
      return res.status(409).json({ success: false, message: 'Mobile number already registered' })
    }

    const user = await createUser({
      full_name: fullName,
      email,
      mobile,
      password,
      agency_name: agencyName,
      pan_number: panNumber,
      gst_number: gstNumber,
      business_address: businessAddress,
    })

    const token = generateToken({ id: user.id, mobile: user.mobile, role: 'agent' })

    res.status(201).json({
      success: true,
      message: 'Registration successful. KYC verification will be completed within 24 hours.',
      token,
      user: sanitizeUser(user),
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Registration failed', error: error.message })
  }
}

// POST /api/auth/login
export async function handleLoginPassword(req, res) {
  try {
    const { identifier, password } = req.body

    const user = await findUserByIdentifier(identifier)
    if (!user) {
      return res.status(404).json({ success: false, message: 'Account not found. Please register first.' })
    }

    if (user.account_status !== 'active') {
      return res.status(403).json({ success: false, message: 'Account is suspended. Contact support.' })
    }

    const isValid = await verifyPassword(user, password)
    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid password' })
    }

    await updateLastLogin(user.id)
    const token = generateToken({ id: user.id, mobile: user.mobile, role: user.role })

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: sanitizeUser(user),
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login failed', error: error.message })
  }
}

// GET /api/auth/me
export async function handleGetCurrentUser(req, res) {
  try {
    const user = await findUserByIdentifier(req.user.mobile)
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    res.json({ success: true, user: sanitizeUser(user) })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch user', error: error.message })
  }
}

// PUT /api/auth/profile
export async function handleUpdateProfile(req, res) {
  try {
    const allowed = ['full_name', 'email', 'agency_name', 'pan_number', 'gst_number', 'business_address']
    const data = {}
    allowed.forEach(key => {
      if (req.body[key] !== undefined) data[key] = req.body[key]
    })
    const updated = await updateUserProfile(req.user.id, data)
    if (!updated) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    res.json({ success: true, user: updated, message: 'Profile updated successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update profile', error: error.message })
  }
}
