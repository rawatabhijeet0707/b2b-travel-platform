import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { isMockMode, query } from '../config/db.js'
import { adminMockDb } from '../config/adminMockDb.js'

const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'admin_secret_change_in_production'
const ADMIN_JWT_EXPIRES = process.env.ADMIN_JWT_EXPIRES || '24h'

function getClientIp(req) {
  return req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown'
}

function getUserAgent(req) {
  return req.headers['user-agent'] || 'unknown'
}

async function logAction(adminId, adminName, action, module, description, req, metadata = {}) {
  const logData = {
    admin_id: adminId,
    admin_name: adminName,
    action,
    module,
    description,
    ip_address: getClientIp(req),
    user_agent: getUserAgent(req),
    metadata: JSON.stringify(metadata),
  }
  if (isMockMode()) {
    await adminMockDb.addLog(logData)
  } else {
    try {
      await query(`INSERT INTO audit_logs (admin_id, admin_name, action, module, description, ip_address, user_agent, metadata) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [logData.admin_id, logData.admin_name, logData.action, logData.module, logData.description, logData.ip_address, logData.user_agent, logData.metadata])
    } catch (e) { console.error('Audit log error:', e.message) }
  }
}

// POST /api/admin/login
export async function adminLogin(req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' })
    }

    let admin = null
    try {
      if (isMockMode()) {
        admin = await adminMockDb.findAdminByEmail(email)
      } else {
        const rows = await query('SELECT * FROM admin_users WHERE email = ?', [email])
        admin = rows[0]
      }
    } catch (e) {
      admin = await adminMockDb.findAdminByEmail(email)
    }

    if (!admin) {
      await logAction(null, email, 'failed_login', 'auth', `Failed login attempt for ${email}`, req)
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    if (admin.status !== 'active') {
      return res.status(403).json({ success: false, message: 'Account suspended. Contact Super Admin.' })
    }

    let isValid = false
    if (isMockMode() || !admin.password_hash) {
      isValid = await adminMockDb.verifyAdminPassword(admin, password)
    } else {
      try {
        isValid = await bcrypt.compare(password, admin.password_hash)
      } catch (e) {
        isValid = await adminMockDb.verifyAdminPassword(admin, password)
      }
    }

    if (!isValid) {
      await logAction(admin.id, admin.full_name, 'failed_login', 'auth', 'Failed login - wrong password', req)
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    // Get role
    let role = null
    if (isMockMode()) {
      role = await adminMockDb.getRoleById(admin.role_id)
    } else {
      try {
        const roleRows = await query('SELECT * FROM admin_roles WHERE id = ?', [admin.role_id])
        role = roleRows[0]
      } catch (e) {
        role = await adminMockDb.getRoleById(admin.role_id)
      }
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, type: 'admin', role: role?.name },
      ADMIN_JWT_SECRET,
      { expiresIn: ADMIN_JWT_EXPIRES }
    )

    if (isMockMode()) {
      await adminMockDb.updateAdminLogin(admin.id)
    } else {
      await query('UPDATE admin_users SET last_login = NOW() WHERE id = ?', [admin.id])
    }

    await logAction(admin.id, admin.full_name, 'login', 'auth', 'Admin logged in successfully', req)

    const sanitized = isMockMode() ? adminMockDb.sanitizeAdmin(admin) : (() => {
      const { password_hash, ...s } = admin
      return { ...s, role }
    })()

    res.json({
      success: true,
      message: 'Admin login successful',
      token,
      admin: sanitized,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login failed', error: error.message })
  }
}

// GET /api/admin/me
export async function adminGetCurrent(req, res) {
  res.json({ success: true, admin: isMockMode() ? adminMockDb.sanitizeAdmin(req.admin) : req.admin })
}

// GET /api/admin/dashboard
export async function adminDashboard(req, res) {
  try {
    let stats
    if (isMockMode()) {
      stats = await adminMockDb.getDashboardStats()
    } else {
      // Build from DB queries
      stats = await adminMockDb.getDashboardStats() // fallback to mock for now
    }
    res.json({ success: true, data: stats })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard data', error: error.message })
  }
}

// GET /api/admin/users
export async function adminGetUsers(req, res) {
  try {
    const { status, kyc, search, page = 1, limit = 20 } = req.query
    let result
    if (isMockMode()) {
      result = await adminMockDb.getUsers({ status, kyc, search })
    } else {
      result = await adminMockDb.getUsers({ status, kyc, search }) // fallback
    }
    res.json({ success: true, ...result })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch users', error: error.message })
  }
}

// PUT /api/admin/users/:id/status
export async function adminUpdateUserStatus(req, res) {
  try {
    const { id } = req.params
    const { status } = req.body
    let user
    if (isMockMode()) {
      user = await adminMockDb.updateUserStatus(parseInt(id), status)
    } else {
      user = await adminMockDb.updateUserStatus(parseInt(id), status)
    }
    if (!user) return res.status(404).json({ success: false, message: 'User not found' })
    await logAction(req.admin.id, req.admin.full_name, 'update_user_status', 'users', `Updated user ${id} status to ${status}`, req)
    res.json({ success: true, message: 'User status updated', data: user })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update user', error: error.message })
  }
}

// PUT /api/admin/users/:id/kyc
export async function adminUpdateUserKyc(req, res) {
  try {
    const { id } = req.params
    const { status } = req.body
    let user
    if (isMockMode()) {
      user = await adminMockDb.updateUserKyc(parseInt(id), status)
    } else {
      user = await adminMockDb.updateUserKyc(parseInt(id), status)
    }
    if (!user) return res.status(404).json({ success: false, message: 'User not found' })
    await logAction(req.admin.id, req.admin.full_name, 'update_user_kyc', 'users', `Updated user ${id} KYC to ${status}`, req)
    res.json({ success: true, message: 'KYC status updated', data: user })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update KYC', error: error.message })
  }
}

// PUT /api/admin/users/:id/wallet
export async function adminUpdateWallet(req, res) {
  try {
    const { id } = req.params
    const { amount } = req.body
    let user
    if (isMockMode()) {
      user = await adminMockDb.updateWallet(parseInt(id), parseFloat(amount))
    } else {
      user = await adminMockDb.updateWallet(parseInt(id), parseFloat(amount))
    }
    if (!user) return res.status(404).json({ success: false, message: 'User not found' })
    await logAction(req.admin.id, req.admin.full_name, 'update_wallet', 'users', `Updated user ${id} wallet by ${amount}`, req, { amount })
    res.json({ success: true, message: 'Wallet updated', data: user })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update wallet', error: error.message })
  }
}

// GET /api/admin/bookings
export async function adminGetBookings(req, res) {
  try {
    const { type, status, search } = req.query
    const result = await adminMockDb.getBookings({ type, status, search })
    res.json({ success: true, ...result })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch bookings', error: error.message })
  }
}

// GET /api/admin/roles
export async function adminGetRoles(req, res) {
  try {
    const roles = isMockMode() ? await adminMockDb.getRoles() : await adminMockDb.getRoles()
    res.json({ success: true, data: roles })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch roles', error: error.message })
  }
}

// POST /api/admin/roles
export async function adminCreateRole(req, res) {
  try {
    const { name, display_name, description, permissions } = req.body
    const role = await adminMockDb.createRole({ name, display_name, description, permissions })
    await logAction(req.admin.id, req.admin.full_name, 'create_role', 'roles', `Created role ${name}`, req)
    res.json({ success: true, message: 'Role created', data: role })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create role', error: error.message })
  }
}

// PUT /api/admin/roles/:id
export async function adminUpdateRole(req, res) {
  try {
    const { id } = req.params
    const role = await adminMockDb.updateRole(parseInt(id), req.body)
    if (!role) return res.status(404).json({ success: false, message: 'Role not found' })
    await logAction(req.admin.id, req.admin.full_name, 'update_role', 'roles', `Updated role ${id}`, req)
    res.json({ success: true, message: 'Role updated', data: role })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update role', error: error.message })
  }
}

// DELETE /api/admin/roles/:id
export async function adminDeleteRole(req, res) {
  try {
    const { id } = req.params
    const deleted = await adminMockDb.deleteRole(parseInt(id))
    if (!deleted) return res.status(400).json({ success: false, message: 'Cannot delete system role' })
    await logAction(req.admin.id, req.admin.full_name, 'delete_role', 'roles', `Deleted role ${id}`, req)
    res.json({ success: true, message: 'Role deleted' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete role', error: error.message })
  }
}

// GET /api/admin/coupons
export async function adminGetCoupons(req, res) {
  try {
    const result = await adminMockDb.getCoupons()
    res.json({ success: true, ...result })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch coupons', error: error.message })
  }
}

// POST /api/admin/coupons
export async function adminCreateCoupon(req, res) {
  try {
    const coupon = await adminMockDb.createCoupon(req.body)
    await logAction(req.admin.id, req.admin.full_name, 'create_coupon', 'coupons', `Created coupon ${req.body.code}`, req)
    res.json({ success: true, message: 'Coupon created', data: coupon })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create coupon', error: error.message })
  }
}

// PUT /api/admin/coupons/:id
export async function adminUpdateCoupon(req, res) {
  try {
    const { id } = req.params
    const coupon = await adminMockDb.updateCoupon(parseInt(id), req.body)
    if (!coupon) return res.status(404).json({ success: false, message: 'Coupon not found' })
    await logAction(req.admin.id, req.admin.full_name, 'update_coupon', 'coupons', `Updated coupon ${id}`, req)
    res.json({ success: true, message: 'Coupon updated', data: coupon })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update coupon', error: error.message })
  }
}

// DELETE /api/admin/coupons/:id
export async function adminDeleteCoupon(req, res) {
  try {
    const { id } = req.params
    const deleted = await adminMockDb.deleteCoupon(parseInt(id))
    if (!deleted) return res.status(404).json({ success: false, message: 'Coupon not found' })
    await logAction(req.admin.id, req.admin.full_name, 'delete_coupon', 'coupons', `Deleted coupon ${id}`, req)
    res.json({ success: true, message: 'Coupon deleted' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete coupon', error: error.message })
  }
}

// GET /api/admin/offers
export async function adminGetOffers(req, res) {
  try {
    const result = await adminMockDb.getOffers()
    res.json({ success: true, ...result })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch offers', error: error.message })
  }
}

// POST /api/admin/offers
export async function adminCreateOffer(req, res) {
  try {
    const offer = await adminMockDb.createOffer(req.body)
    await logAction(req.admin.id, req.admin.full_name, 'create_offer', 'offers', `Created offer ${req.body.title}`, req)
    res.json({ success: true, message: 'Offer created', data: offer })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create offer', error: error.message })
  }
}

// PUT /api/admin/offers/:id
export async function adminUpdateOffer(req, res) {
  try {
    const { id } = req.params
    const offer = await adminMockDb.updateOffer(parseInt(id), req.body)
    if (!offer) return res.status(404).json({ success: false, message: 'Offer not found' })
    await logAction(req.admin.id, req.admin.full_name, 'update_offer', 'offers', `Updated offer ${id}`, req)
    res.json({ success: true, message: 'Offer updated', data: offer })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update offer', error: error.message })
  }
}

// DELETE /api/admin/offers/:id
export async function adminDeleteOffer(req, res) {
  try {
    const { id } = req.params
    const deleted = await adminMockDb.deleteOffer(parseInt(id))
    if (!deleted) return res.status(404).json({ success: false, message: 'Offer not found' })
    await logAction(req.admin.id, req.admin.full_name, 'delete_offer', 'offers', `Deleted offer ${id}`, req)
    res.json({ success: true, message: 'Offer deleted' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete offer', error: error.message })
  }
}

// GET /api/admin/tickets
export async function adminGetTickets(req, res) {
  try {
    const { status } = req.query
    const result = await adminMockDb.getTickets({ status })
    res.json({ success: true, ...result })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch tickets', error: error.message })
  }
}

// PUT /api/admin/tickets/:id
export async function adminUpdateTicket(req, res) {
  try {
    const { id } = req.params
    const ticket = await adminMockDb.updateTicket(parseInt(id), req.body)
    if (!ticket) return res.status(404).json({ success: false, message: 'Ticket not found' })
    await logAction(req.admin.id, req.admin.full_name, 'update_ticket', 'support', `Updated ticket ${id}`, req)
    res.json({ success: true, message: 'Ticket updated', data: ticket })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update ticket', error: error.message })
  }
}

// GET /api/admin/settings
export async function adminGetSettings(req, res) {
  try {
    const settings = isMockMode() ? await adminMockDb.getSettings() : await adminMockDb.getSettings()
    res.json({ success: true, data: settings })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch settings', error: error.message })
  }
}

// PUT /api/admin/settings
export async function adminUpdateSettings(req, res) {
  try {
    const settings = await adminMockDb.updateSettings(req.body)
    await logAction(req.admin.id, req.admin.full_name, 'update_settings', 'settings', 'Updated system settings', req)
    res.json({ success: true, message: 'Settings updated', data: settings })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update settings', error: error.message })
  }
}

// GET /api/admin/chatbot/settings
export async function adminGetChatbotSettings(req, res) {
  try {
    const settings = await adminMockDb.getChatbotSettings()
    res.json({ success: true, data: settings })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch chatbot settings', error: error.message })
  }
}

// PUT /api/admin/chatbot/settings
export async function adminUpdateChatbotSettings(req, res) {
  try {
    const settings = await adminMockDb.updateChatbotSettings(req.body)
    await logAction(req.admin.id, req.admin.full_name, 'update_chatbot', 'chatbot', 'Updated chatbot settings', req)
    res.json({ success: true, message: 'Chatbot settings updated', data: settings })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update chatbot settings', error: error.message })
  }
}

// GET /api/admin/audit-logs
export async function adminGetAuditLogs(req, res) {
  try {
    const { limit = 50, offset = 0 } = req.query
    const result = await adminMockDb.getLogs(parseInt(limit), parseInt(offset))
    res.json({ success: true, ...result })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch audit logs', error: error.message })
  }
}
