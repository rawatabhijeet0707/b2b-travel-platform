import { Router } from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { agentAuth } from '../middleware/agentAuth.js'
import {
  getDashboard,
  getBookings,
  getMyBookings,
  getCustomers,
  getEarnings,
  getWallet,
  getTransactions,
  getReports,
  getTickets,
  getNotifications,
  getSettings,
  updateSettings,
} from '../controllers/agentController.js'

const router = Router()

// All agent routes require authentication + agent role
router.use(authMiddleware)
router.use(agentAuth)

// Dashboard
router.get('/dashboard', getDashboard)

// Bookings
router.get('/bookings', getBookings)
router.get('/my-bookings', getMyBookings)

// Customers
router.get('/customers', getCustomers)

// Earnings / Commission
router.get('/earnings', getEarnings)

// Wallet
router.get('/wallet', getWallet)

// Transactions
router.get('/transactions', getTransactions)

// Reports
router.get('/reports', getReports)

// Support Tickets
router.get('/tickets', getTickets)

// Notifications
router.get('/notifications', getNotifications)

// Settings
router.get('/settings', getSettings)
router.put('/settings', updateSettings)

export default router
