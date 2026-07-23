// Client-side fallback auth - used when backend is unreachable (Render free tier sleep)
// Mirrors the backend mock users so login always works

const FALLBACK_USERS = [
  {
    id: 1,
    full_name: 'Test Admin',
    email: 'admin@traveldistrib.com',
    mobile: '9876543210',
    password: 'Test@1234',
    agency_name: 'SkyHigh Travels',
    pan_number: 'ABCDE1234F',
    gst_number: '29ABCDE1234F1Z5',
    business_address: 'Cyber City, Gurugram, Haryana 122002',
    kyc_status: 'verified',
    account_status: 'active',
    role: 'agent',
    wallet_balance: 248500.00,
    reward_points: 45200,
    credit_limit: 50000.00,
    credit_used: 15000.00,
    is_mobile_verified: true,
    is_email_verified: true,
  },
  {
    id: 2,
    full_name: 'Demo Agent',
    email: 'agent@example.com',
    mobile: '9876543220',
    password: 'Agent@123',
    agency_name: 'Global Travel Connect',
    pan_number: 'FGHIJ5678G',
    gst_number: '29FGHIJ5678G1Z5',
    business_address: 'Connaught Place, New Delhi, 110001',
    kyc_status: 'verified',
    account_status: 'active',
    role: 'agent',
    wallet_balance: 51630.00,
    reward_points: 12500,
    credit_limit: 100000.00,
    credit_used: 25000.00,
    is_mobile_verified: true,
    is_email_verified: true,
  },
  {
    id: 3,
    full_name: 'Demo User',
    email: 'user@example.com',
    mobile: '9876543230',
    password: 'User@123',
    agency_name: '',
    pan_number: '',
    gst_number: '',
    business_address: '',
    kyc_status: 'pending',
    account_status: 'active',
    role: 'user',
    wallet_balance: 15000.00,
    reward_points: 5000,
    credit_limit: 20000.00,
    credit_used: 5000.00,
    is_mobile_verified: true,
    is_email_verified: true,
  },
]

function sanitizeUser(user) {
  if (!user) return null
  const { password, ...sanitized } = user
  return sanitized
}

function generateFallbackToken(user) {
  const payload = { id: user.id, mobile: user.mobile, role: user.role }
  return btoa(JSON.stringify(payload)) + '.fallback.' + Date.now()
}

const otpStore = {}

export const fallbackAuth = {
  isAvailable: true,

  async sendOtp(mobile, purpose = 'login') {
    if (purpose === 'login') {
      const user = FALLBACK_USERS.find(u => u.mobile === mobile)
      if (!user) {
        throw { success: false, message: 'No account found with this mobile number. Please register first.' }
      }
    }
    const otp = String(Math.floor(1000 + Math.random() * 9000))
    otpStore[mobile + '_' + purpose] = { otp, expires: Date.now() + 5 * 60 * 1000 }
    return { success: true, message: 'OTP sent successfully', devOtp: otp }
  },

  async verifyOtp(mobile, otp, purpose = 'login') {
    const key = mobile + '_' + purpose
    const record = otpStore[key]
    if (!record) {
      throw { success: false, message: 'Invalid OTP. Please request a new one.' }
    }
    if (Date.now() > record.expires) {
      delete otpStore[key]
      throw { success: false, message: 'OTP has expired. Please request a new one.' }
    }
    if (record.otp !== otp) {
      throw { success: false, message: 'Invalid OTP' }
    }
    delete otpStore[key]

    if (purpose === 'login') {
      const user = FALLBACK_USERS.find(u => u.mobile === mobile)
      if (!user) {
        throw { success: false, message: 'User not found' }
      }
      const token = generateFallbackToken(user)
      return { success: true, message: 'Login successful', token, user: sanitizeUser(user) }
    }
    return { success: true, message: 'OTP verified successfully', verified: true }
  },

  async loginWithPassword(identifier, password) {
    const user = FALLBACK_USERS.find(u => u.email === identifier || u.mobile === identifier)
    if (!user) {
      throw { success: false, message: 'Account not found. Please register first.' }
    }
    if (user.account_status !== 'active') {
      throw { success: false, message: 'Account is suspended. Contact support.' }
    }
    if (user.password !== password) {
      throw { success: false, message: 'Invalid password' }
    }
    const token = generateFallbackToken(user)
    return { success: true, message: 'Login successful', token, user: sanitizeUser(user) }
  },

  async register(data) {
    const existing = FALLBACK_USERS.find(u => u.email === data.email || u.mobile === data.mobile)
    if (existing) {
      throw { success: false, message: 'Email or mobile already registered' }
    }
    const newUser = {
      id: FALLBACK_USERS.length + 1,
      full_name: data.fullName,
      email: data.email,
      mobile: data.mobile,
      password: data.password,
      agency_name: data.agencyName || '',
      pan_number: data.panNumber || '',
      gst_number: data.gstNumber || '',
      business_address: data.businessAddress || '',
      kyc_status: 'pending',
      account_status: 'active',
      role: 'agent',
      wallet_balance: 0,
      reward_points: 0,
      credit_limit: 50000,
      credit_used: 0,
      is_mobile_verified: true,
      is_email_verified: false,
    }
    FALLBACK_USERS.push(newUser)
    const token = generateFallbackToken(newUser)
    return { success: true, message: 'Registration successful', token, user: sanitizeUser(newUser) }
  },

  async updateProfile(userId, data) {
    const user = FALLBACK_USERS.find(u => u.id === userId)
    if (!user) {
      throw { success: false, message: 'User not found' }
    }
    const allowed = ['full_name', 'email', 'agency_name', 'pan_number', 'gst_number', 'business_address']
    allowed.forEach(key => {
      if (data[key] !== undefined) user[key] = data[key]
    })
    return { success: true, user: sanitizeUser(user), message: 'Profile updated successfully' }
  },
}
