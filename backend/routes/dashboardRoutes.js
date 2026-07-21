import { Router } from 'express'
import { query, mockDb, isMockMode } from '../config/db.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = Router()

// All dashboard routes require authentication
router.use(authMiddleware)

// GET /api/dashboard/stats
router.get('/stats', async (req, res) => {
  try {
    const userId = req.user.id

    if (isMockMode()) {
      const stats = await mockDb.getStats(userId)
      if (!stats) return res.status(404).json({ success: false, message: 'User not found' })
      return res.json({ success: true, stats })
    }

    const [bookingCount] = await query(
      'SELECT COUNT(*) as total, SUM(CASE WHEN status = "confirmed" THEN 1 ELSE 0 END) as confirmed, SUM(CASE WHEN status = "pending" THEN 1 ELSE 0 END) as pending, SUM(CASE WHEN status = "cancelled" THEN 1 ELSE 0 END) as cancelled FROM bookings WHERE user_id = ?',
      [userId]
    )

    const [revenue] = await query(
      'SELECT COALESCE(SUM(amount), 0) as total_revenue, COALESCE(SUM(commission), 0) as total_commission FROM bookings WHERE user_id = ? AND status = "confirmed"',
      [userId]
    )

    const [user] = await query(
      'SELECT wallet_balance, reward_points, credit_limit, credit_used FROM users WHERE id = ?',
      [userId]
    )

    res.json({
      success: true,
      stats: {
        walletBalance: user[0]?.wallet_balance || 0,
        rewardPoints: user[0]?.reward_points || 0,
        creditLimit: user[0]?.credit_limit || 0,
        creditUsed: user[0]?.credit_used || 0,
        totalBookings: bookingCount[0]?.total || 0,
        confirmedBookings: bookingCount[0]?.confirmed || 0,
        pendingBookings: bookingCount[0]?.pending || 0,
        cancelledBookings: bookingCount[0]?.cancelled || 0,
        totalRevenue: revenue[0]?.total_revenue || 0,
        totalCommission: revenue[0]?.total_commission || 0,
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch stats', error: error.message })
  }
})

// GET /api/dashboard/bookings
router.get('/bookings', async (req, res) => {
  try {
    const userId = req.user.id
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit

    if (isMockMode()) {
      const result = await mockDb.getBookings(userId, page, limit)
      return res.json({ success: true, ...result })
    }

    const bookings = await query(
      'SELECT * FROM bookings WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [userId, limit, offset]
    )

    const [count] = await query(
      'SELECT COUNT(*) as total FROM bookings WHERE user_id = ?',
      [userId]
    )

    res.json({
      success: true,
      bookings,
      pagination: {
        page,
        limit,
        total: count[0]?.total || 0,
        totalPages: Math.ceil((count[0]?.total || 0) / limit),
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch bookings', error: error.message })
  }
})

// GET /api/dashboard/invoices
router.get('/invoices', async (req, res) => {
  try {
    const userId = req.user.id
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20

    if (isMockMode()) {
      const result = await mockDb.getInvoices(userId, page, limit)
      return res.json({ success: true, ...result })
    }

    const offset = (page - 1) * limit
    const invoices = await query(
      'SELECT * FROM invoices WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [userId, limit, offset]
    )

    const [count] = await query(
      'SELECT COUNT(*) as total FROM invoices WHERE user_id = ?',
      [userId]
    )

    const [stats] = await query(
      `SELECT COUNT(*) as total,
              COALESCE(SUM(amount), 0) as total_amount,
              SUM(CASE WHEN status = 'paid' THEN 1 ELSE 0 END) as paid,
              SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
              SUM(CASE WHEN status = 'overdue' THEN 1 ELSE 0 END) as overdue
       FROM invoices WHERE user_id = ?`,
      [userId]
    )

    res.json({
      success: true,
      invoices,
      stats: {
        total: count[0]?.total || 0,
        totalAmount: stats[0]?.total_amount || 0,
        paid: stats[0]?.paid || 0,
        pending: stats[0]?.pending || 0,
        overdue: stats[0]?.overdue || 0,
      },
      pagination: {
        page,
        limit,
        total: count[0]?.total || 0,
        totalPages: Math.ceil((count[0]?.total || 0) / limit),
      },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch invoices', error: error.message })
  }
})

// GET /api/dashboard/wallet/transactions
router.get('/wallet/transactions', async (req, res) => {
  try {
    const userId = req.user.id
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const offset = (page - 1) * limit

    const transactions = await query(
      'SELECT * FROM wallet_transactions WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [userId, limit, offset]
    )

    res.json({ success: true, transactions })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch transactions', error: error.message })
  }
})

// GET /api/dashboard/reports
router.get('/reports', async (req, res) => {
  try {
    const userId = req.user.id

    if (isMockMode()) {
      const reports = await mockDb.getReports(userId)
      return res.json({ success: true, ...reports })
    }

    const monthlyRevenue = await query(
      `SELECT DATE_FORMAT(created_at, '%b') as month,
              COALESCE(SUM(amount), 0) as revenue,
              COALESCE(SUM(commission), 0) as commission
       FROM bookings WHERE user_id = ? AND status = 'confirmed'
       AND created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
       GROUP BY DATE_FORMAT(created_at, '%Y-%m')
       ORDER BY created_at ASC`,
      [userId]
    )

    const serviceBreakdown = await query(
      `SELECT type, COUNT(*) as count, COALESCE(SUM(amount), 0) as revenue
       FROM bookings WHERE user_id = ?
       GROUP BY type`,
      [userId]
    )

    res.json({ success: true, monthlyRevenue, serviceBreakdown })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch reports', error: error.message })
  }
})

// GET /api/dashboard/tickets
router.get('/tickets', async (req, res) => {
  try {
    const userId = req.user.id
    const tickets = await query(
      'SELECT * FROM support_tickets WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    )
    res.json({ success: true, tickets })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch tickets', error: error.message })
  }
})

export default router
