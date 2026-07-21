import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import {
  adminLogin, adminGetCurrent, adminDashboard,
  adminGetUsers, adminUpdateUserStatus, adminUpdateUserKyc, adminUpdateWallet,
  adminGetBookings,
  adminGetRoles, adminCreateRole, adminUpdateRole, adminDeleteRole,
  adminGetCoupons, adminCreateCoupon, adminUpdateCoupon, adminDeleteCoupon,
  adminGetOffers, adminCreateOffer, adminUpdateOffer, adminDeleteOffer,
  adminGetTickets, adminUpdateTicket,
  adminGetSettings, adminUpdateSettings,
  adminGetChatbotSettings, adminUpdateChatbotSettings,
  adminGetAuditLogs,
} from '../controllers/adminController.js'
import { adminAuth } from '../middleware/adminAuth.js'

const router = Router()

// Login rate limiter
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many login attempts. Please try again after 15 minutes.' },
})

// Public
router.post('/login', loginLimiter, adminLogin)

// Protected
router.use(adminAuth)

router.get('/me', adminGetCurrent)
router.get('/dashboard', adminDashboard)

// Users
router.get('/users', adminGetUsers)
router.put('/users/:id/status', adminUpdateUserStatus)
router.put('/users/:id/kyc', adminUpdateUserKyc)
router.put('/users/:id/wallet', adminUpdateWallet)

// Bookings
router.get('/bookings', adminGetBookings)

// Roles
router.get('/roles', adminGetRoles)
router.post('/roles', adminCreateRole)
router.put('/roles/:id', adminUpdateRole)
router.delete('/roles/:id', adminDeleteRole)

// Coupons
router.get('/coupons', adminGetCoupons)
router.post('/coupons', adminCreateCoupon)
router.put('/coupons/:id', adminUpdateCoupon)
router.delete('/coupons/:id', adminDeleteCoupon)

// Offers
router.get('/offers', adminGetOffers)
router.post('/offers', adminCreateOffer)
router.put('/offers/:id', adminUpdateOffer)
router.delete('/offers/:id', adminDeleteOffer)

// Tickets
router.get('/tickets', adminGetTickets)
router.put('/tickets/:id', adminUpdateTicket)

// Settings
router.get('/settings', adminGetSettings)
router.put('/settings', adminUpdateSettings)

// Chatbot
router.get('/chatbot/settings', adminGetChatbotSettings)
router.put('/chatbot/settings', adminUpdateChatbotSettings)

// Audit Logs
router.get('/audit-logs', adminGetAuditLogs)

export default router
