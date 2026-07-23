import { query, mockDb, isMockMode } from '../config/db.js'
import bcrypt from 'bcryptjs'

export async function createUser(data) {
  const {
    full_name, email, mobile, password, agency_name,
    pan_number, gst_number, business_address,
  } = data

  if (isMockMode()) {
    return mockDb.createUser({
      full_name, email, mobile, password,
      agency_name, pan_number, gst_number, business_address,
    })
  }

  const password_hash = await bcrypt.hash(password, 10)

  const result = await query(
    `INSERT INTO users (
      full_name, email, mobile, password_hash, agency_name,
      pan_number, gst_number, business_address, kyc_status,
      is_mobile_verified, is_email_verified, wallet_balance, reward_points, credit_limit
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', TRUE, FALSE, 0.00, 0, 50000.00)`,
    [full_name, email, mobile, password_hash, agency_name || null,
     pan_number || null, gst_number || null, business_address || null]
  )

  return { id: result.insertId, full_name, email, mobile, agency_name }
}

export async function findUserByEmail(email) {
  if (isMockMode()) return mockDb.findUserByEmail(email)
  const rows = await query('SELECT * FROM users WHERE email = ? LIMIT 1', [email])
  return rows[0]
}

export async function findUserByMobile(mobile) {
  if (isMockMode()) return mockDb.findUserByMobile(mobile)
  const rows = await query('SELECT * FROM users WHERE mobile = ? LIMIT 1', [mobile])
  return rows[0]
}

export async function findUserById(id) {
  if (isMockMode()) return mockDb.findUserById(id)
  const rows = await query('SELECT * FROM users WHERE id = ? LIMIT 1', [id])
  return rows[0]
}

export async function findUserByIdentifier(identifier) {
  if (isMockMode()) return mockDb.findUserByIdentifier(identifier)
  const isEmail = identifier.includes('@')
  if (isEmail) return findUserByEmail(identifier)
  return findUserByMobile(identifier)
}

export async function updateLastLogin(userId) {
  if (isMockMode()) return mockDb.updateLastLogin(userId)
  await query('UPDATE users SET last_login = NOW() WHERE id = ?', [userId])
}

export async function verifyPassword(user, password) {
  if (isMockMode()) return mockDb.verifyPassword(user, password)
  if (!user || !user.password_hash) return false
  return bcrypt.compare(password, user.password_hash)
}

export async function updateKycStatus(userId, status) {
  if (isMockMode()) return
  await query('UPDATE users SET kyc_status = ? WHERE id = ?', [userId, status])
}

export async function updateUserProfile(userId, data) {
  if (isMockMode()) {
    const user = mockDb.findUserById(userId)
    if (!user) return null
    const allowed = ['full_name', 'email', 'agency_name', 'pan_number', 'gst_number', 'business_address']
    allowed.forEach(key => {
      if (data[key] !== undefined) user[key] = data[key]
    })
    user.updated_at = new Date()
    return sanitizeUser(user)
  }
  const allowed = ['full_name', 'email', 'agency_name', 'pan_number', 'gst_number', 'business_address']
  const fields = []
  const values = []
  allowed.forEach(key => {
    if (data[key] !== undefined) {
      fields.push(`${key} = ?`)
      values.push(data[key])
    }
  })
  if (fields.length === 0) return null
  values.push(userId)
  await query(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, values)
  const rows = await query('SELECT * FROM users WHERE id = ? LIMIT 1', [userId])
  return sanitizeUser(rows[0])
}

export async function updateWalletBalance(userId, amount) {
  if (isMockMode()) return
  await query('UPDATE users SET wallet_balance = wallet_balance + ? WHERE id = ?', [userId, amount])
}

export function sanitizeUser(user) {
  if (!user) return null
  const { password_hash, ...sanitized } = user
  return sanitized
}
