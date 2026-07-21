import { query, mockDb, isMockMode } from '../config/db.js'
import { generateOtp, getOtpExpiry, isOtpExpired, sendOtpSms } from '../utils/otpUtils.js'

export async function storeOtp(mobile, otp, purpose = 'login') {
  if (isMockMode()) {
    return mockDb.storeOtp(mobile, otp, purpose)
  }

  // Mark previous unused OTPs as used
  await query(
    'UPDATE otp_store SET is_used = TRUE WHERE mobile = ? AND purpose = ? AND is_used = FALSE',
    [mobile, purpose]
  )

  const expiry = getOtpExpiry()
  const result = await query(
    'INSERT INTO otp_store (mobile, otp_code, purpose, expires_at) VALUES (?, ?, ?, ?)',
    [mobile, otp, purpose, expiry]
  )

  return result.insertId
}

export async function verifyOtpRecord(mobile, otp, purpose = 'login') {
  if (isMockMode()) {
    return mockDb.verifyOtpRecord(mobile, otp, purpose)
  }

  const rows = await query(
    `SELECT * FROM otp_store
     WHERE mobile = ? AND otp_code = ? AND purpose = ? AND is_used = FALSE
     ORDER BY created_at DESC LIMIT 1`,
    [mobile, otp, purpose]
  )

  if (rows.length === 0) {
    return { valid: false, message: 'Invalid OTP' }
  }

  const record = rows[0]

  if (isOtpExpired(record.expires_at)) {
    return { valid: false, message: 'OTP has expired. Please request a new one.' }
  }

  // Mark as used
  await query('UPDATE otp_store SET is_used = TRUE WHERE id = ?', [record.id])

  return { valid: true }
}

export async function sendOtp(mobile, purpose = 'login') {
  const otp = generateOtp()
  await storeOtp(mobile, otp, purpose)
  await sendOtpSms(mobile, otp)
  return otp
}
