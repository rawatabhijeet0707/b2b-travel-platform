import { query, isMockMode } from '../config/db.js'
import { agentMockDb } from '../config/agentMockDb.js'

// Helper to get agentId from req.user
const getAgentId = (req) => req.user?.id || req.user?.userId || 2

export const getDashboard = async (req, res) => {
  try {
    const agentId = getAgentId(req)
    if (isMockMode) {
      const stats = await agentMockDb.getDashboardStats(agentId)
      return res.json({ success: true, ...stats })
    }
    // MySQL mode - build stats from queries
    const [bookings] = await query(
      `SELECT COUNT(*) as total, 
              SUM(CASE WHEN DATE(created_at) = CURDATE() THEN 1 ELSE 0 END) as today,
              SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) as confirmed,
              SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
              SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled,
              COALESCE(SUM(CASE WHEN status = 'confirmed' THEN amount ELSE 0 END), 0) as revenue
       FROM bookings WHERE user_id = ?`,
      [agentId]
    )
    const [customers] = await query(
      `SELECT COUNT(DISTINCT customer_name) as total FROM bookings WHERE user_id = ?`,
      [agentId]
    )
    const [wallet] = await query(
      `SELECT COALESCE(SUM(CASE WHEN type = 'credit' THEN amount ELSE -amount END), 0) as balance FROM wallet_transactions WHERE user_id = ?`,
      [agentId]
    )
    const [recentBookings] = await query(
      `SELECT * FROM bookings WHERE user_id = ? ORDER BY created_at DESC LIMIT 5`,
      [agentId]
    )
    return res.json({
      success: true,
      totalBookings: bookings?.total || 0,
      todayBookings: bookings?.today || 0,
      confirmedBookings: bookings?.confirmed || 0,
      pendingBookings: bookings?.pending || 0,
      cancelledBookings: bookings?.cancelled || 0,
      totalCustomers: customers?.total || 0,
      totalRevenue: bookings?.revenue || 0,
      totalCommission: 0,
      commissionEarned: 0,
      walletBalance: wallet?.balance || 0,
      recentBookings: recentBookings || [],
      latestCustomers: [],
      notifications: [],
      performanceChart: [],
      serviceBreakdown: [],
    })
  } catch (err) {
    console.error('Agent dashboard error:', err)
    return res.status(500).json({ success: false, message: 'Failed to load dashboard' })
  }
}

export const getBookings = async (req, res) => {
  try {
    const agentId = getAgentId(req)
    const filters = {
      type: req.query.type,
      status: req.query.status,
      search: req.query.search,
    }
    if (isMockMode) {
      const result = await agentMockDb.getBookings(agentId, filters)
      return res.json({ success: true, ...result })
    }
    let sql = `SELECT * FROM bookings WHERE user_id = ?`
    const params = [agentId]
    if (filters.type) { sql += ` AND type = ?`; params.push(filters.type) }
    if (filters.status) { sql += ` AND status = ?`; params.push(filters.status) }
    sql += ` ORDER BY created_at DESC`
    const [rows] = await query(sql, params)
    return res.json({ success: true, data: rows, total: rows.length })
  } catch (err) {
    console.error('Agent bookings error:', err)
    return res.status(500).json({ success: false, message: 'Failed to load bookings' })
  }
}

export const getMyBookings = async (req, res) => {
  try {
    const agentId = getAgentId(req)
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    if (isMockMode) {
      const result = await agentMockDb.getMyBookings(agentId, page, limit)
      return res.json({ success: true, ...result })
    }
    const offset = (page - 1) * limit
    const [rows] = await query(
      `SELECT * FROM bookings WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [agentId, limit, offset]
    )
    const [[{ total }]] = await query(
      `SELECT COUNT(*) as total FROM bookings WHERE user_id = ?`,
      [agentId]
    )
    return res.json({
      success: true,
      bookings: rows,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    })
  } catch (err) {
    console.error('Agent my-bookings error:', err)
    return res.status(500).json({ success: false, message: 'Failed to load bookings' })
  }
}

export const getCustomers = async (req, res) => {
  try {
    const agentId = getAgentId(req)
    const filters = {
      status: req.query.status,
      search: req.query.search,
    }
    if (isMockMode) {
      const result = await agentMockDb.getCustomers(agentId, filters)
      return res.json({ success: true, ...result })
    }
    // MySQL fallback - derive from bookings
    const [rows] = await query(
      `SELECT DISTINCT customer_name as name, 
              COUNT(*) as bookings,
              COALESCE(SUM(amount), 0) as totalSpent
       FROM bookings WHERE user_id = ? GROUP BY customer_name`,
      [agentId]
    )
    return res.json({ success: true, data: rows, total: rows.length })
  } catch (err) {
    console.error('Agent customers error:', err)
    return res.status(500).json({ success: false, message: 'Failed to load customers' })
  }
}

export const getEarnings = async (req, res) => {
  try {
    const agentId = getAgentId(req)
    if (isMockMode) {
      const result = await agentMockDb.getEarnings(agentId)
      return res.json({ success: true, ...result })
    }
    return res.json({ success: true, totalCommission: 0, thisMonthCommission: 0, pendingCommission: 0, commissionHistory: [], serviceWiseCommission: [] })
  } catch (err) {
    console.error('Agent earnings error:', err)
    return res.status(500).json({ success: false, message: 'Failed to load earnings' })
  }
}

export const getWallet = async (req, res) => {
  try {
    const agentId = getAgentId(req)
    if (isMockMode) {
      const result = await agentMockDb.getWallet(agentId)
      return res.json({ success: true, ...result })
    }
    const [[row]] = await query(
      `SELECT COALESCE(SUM(CASE WHEN type = 'credit' THEN amount ELSE -amount END), 0) as balance FROM wallet_transactions WHERE user_id = ?`,
      [agentId]
    )
    return res.json({ success: true, balance: row?.balance || 0, pendingCommission: 0, totalEarned: 0, totalWithdrawn: 0 })
  } catch (err) {
    console.error('Agent wallet error:', err)
    return res.status(500).json({ success: false, message: 'Failed to load wallet' })
  }
}

export const getTransactions = async (req, res) => {
  try {
    const agentId = getAgentId(req)
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    if (isMockMode) {
      const result = await agentMockDb.getTransactions(agentId, page, limit)
      return res.json({ success: true, ...result })
    }
    const offset = (page - 1) * limit
    const [rows] = await query(
      `SELECT * FROM wallet_transactions WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [agentId, limit, offset]
    )
    const [[{ total }]] = await query(
      `SELECT COUNT(*) as total FROM wallet_transactions WHERE user_id = ?`,
      [agentId]
    )
    return res.json({
      success: true,
      transactions: rows,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    })
  } catch (err) {
    console.error('Agent transactions error:', err)
    return res.status(500).json({ success: false, message: 'Failed to load transactions' })
  }
}

export const getReports = async (req, res) => {
  try {
    const agentId = getAgentId(req)
    if (isMockMode) {
      const result = await agentMockDb.getReports(agentId)
      return res.json({ success: true, ...result })
    }
    return res.json({ success: true, keyMetrics: {}, monthlyPerformance: [], serviceBreakdown: [], topCustomers: [] })
  } catch (err) {
    console.error('Agent reports error:', err)
    return res.status(500).json({ success: false, message: 'Failed to load reports' })
  }
}

export const getTickets = async (req, res) => {
  try {
    const agentId = getAgentId(req)
    if (isMockMode) {
      const result = await agentMockDb.getTickets(agentId)
      return res.json({ success: true, ...result })
    }
    const [rows] = await query(
      `SELECT * FROM support_tickets WHERE user_id = ? ORDER BY created_at DESC`,
      [agentId]
    )
    return res.json({ success: true, data: rows, total: rows.length })
  } catch (err) {
    console.error('Agent tickets error:', err)
    return res.status(500).json({ success: false, message: 'Failed to load tickets' })
  }
}

export const getNotifications = async (req, res) => {
  try {
    const agentId = getAgentId(req)
    if (isMockMode) {
      const result = await agentMockDb.getNotifications(agentId)
      return res.json({ success: true, ...result })
    }
    return res.json({ success: true, data: [], total: 0, unread: 0 })
  } catch (err) {
    console.error('Agent notifications error:', err)
    return res.status(500).json({ success: false, message: 'Failed to load notifications' })
  }
}

export const getSettings = async (req, res) => {
  try {
    const agentId = getAgentId(req)
    if (isMockMode) {
      const result = await agentMockDb.getSettings(agentId)
      return res.json({ success: true, ...result })
    }
    return res.json({ success: true, notifications: {}, preferences: {}, security: {} })
  } catch (err) {
    console.error('Agent settings error:', err)
    return res.status(500).json({ success: false, message: 'Failed to load settings' })
  }
}

export const updateSettings = async (req, res) => {
  try {
    const agentId = getAgentId(req)
    if (isMockMode) {
      const result = await agentMockDb.updateSettings(agentId, req.body)
      return res.json({ success: true, ...result })
    }
    return res.json({ success: true, ...req.body })
  } catch (err) {
    console.error('Agent update settings error:', err)
    return res.status(500).json({ success: false, message: 'Failed to update settings' })
  }
}
