import { verifyToken } from '../utils/jwtUtils.js'
import { isMockMode, query } from '../config/db.js'
import { adminMockDb } from '../config/adminMockDb.js'

const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'admin_secret_change_in_production'

export async function adminAuth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ success: false, message: 'Admin token required' })
  }

  try {
    // Try verifying with admin secret first, then fallback to regular secret
    const jwt = (await import('jsonwebtoken')).default
    let decoded = null
    try {
      decoded = jwt.verify(token, ADMIN_JWT_SECRET)
    } catch {
      decoded = verifyToken(token)
    }

    if (!decoded || decoded.type !== 'admin') {
      return res.status(403).json({ success: false, message: 'Invalid admin token' })
    }

    if (isMockMode()) {
      const admin = await adminMockDb.findAdminById(decoded.id)
      if (!admin || admin.status !== 'active') {
        return res.status(403).json({ success: false, message: 'Admin account not found or suspended' })
      }
      req.admin = admin
    } else {
      const rows = await query('SELECT * FROM admin_users WHERE id = ? AND status = "active"', [decoded.id])
      if (!rows[0]) {
        return res.status(403).json({ success: false, message: 'Admin account not found or suspended' })
      }
      req.admin = rows[0]
    }

    next()
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' })
  }
}

export function hasPermission(module, action) {
  return (req, res, next) => {
    if (!req.admin) return res.status(401).json({ success: false, message: 'Not authenticated' })

    // Super admin has all permissions
    if (req.admin.role?.permissions?.all) return next()

    const perms = req.admin.role?.permissions
    if (!perms || !perms[module] || !perms[module].includes(action)) {
      return res.status(403).json({ success: false, message: `Permission denied: ${action} ${module}` })
    }

    next()
  }
}
