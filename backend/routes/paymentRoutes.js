import express from 'express'
import rateLimit from 'express-rate-limit'
import { authMiddleware } from '../middleware/authMiddleware.js'
import {
  handleCreateOrder,
  handleVerifyPayment,
  handlePaymentFailure,
  handleRefund,
  handleGetPaymentHistory,
  handleGetPaymentById,
  handleGetAllPayments,
  handleGetPaymentStats,
} from '../controllers/paymentController.js'

const router = express.Router()

const orderLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { success: false, message: 'Too many order requests, please try again later' },
})

const verifyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { success: false, message: 'Too many verification requests, please try again later' },
})

router.post('/create-order', authMiddleware, orderLimiter, handleCreateOrder)
router.post('/verify', authMiddleware, verifyLimiter, handleVerifyPayment)
router.post('/failure', authMiddleware, handlePaymentFailure)
router.post('/refund', authMiddleware, handleRefund)
router.get('/history', authMiddleware, handleGetPaymentHistory)
router.get('/stats', authMiddleware, handleGetPaymentStats)
router.get('/all', authMiddleware, handleGetAllPayments)
router.get('/:id', authMiddleware, handleGetPaymentById)

export default router
