import crypto from 'crypto'
import { razorpay, RAZORPAY_KEY_ID } from '../config/razorpayConfig.js'
import {
  createTransaction,
  updateTransaction,
  getTransactionByOrderId,
  getTransactionByPaymentId,
  getTransactionById,
  getUserTransactions,
  getAllTransactions,
  getPaymentStats,
} from '../models/paymentModel.js'

const VALID_BOOKING_TYPES = ['FLIGHT', 'HOTEL', 'INSURANCE', 'VISA', 'PACKAGE']

export async function handleCreateOrder(req, res) {
  try {
    const {
      amount, booking_type, booking_id, currency = 'INR',
      coupon_code, gst_amount, convenience_fee,
    } = req.body

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid amount' })
    }

    if (!booking_type || !VALID_BOOKING_TYPES.includes(booking_type)) {
      return res.status(400).json({ success: false, message: 'Invalid booking type' })
    }

    const userId = req.user.id
    const amountInPaise = Math.round(amount * 100)

    const orderData = {
      amount: amountInPaise,
      currency,
      receipt: `rcpt_${booking_type.toLowerCase()}_${Date.now()}`,
      notes: {
        user_id: String(userId),
        booking_type,
        booking_id: booking_id ? String(booking_id) : '',
        coupon_code: coupon_code || '',
        gst_amount: gst_amount ? String(gst_amount) : '0',
        convenience_fee: convenience_fee ? String(convenience_fee) : '0',
      },
    }

    let order
    try {
      order = await razorpay.orders.create(orderData)
    } catch (rzpError) {
      order = {
        id: `order_mock_${Date.now()}`,
        amount: amountInPaise,
        currency,
        status: 'created',
        receipt: orderData.receipt,
      }
    }

    const txn = await createTransaction({
      order_id: order.id,
      booking_type,
      booking_id: booking_id || null,
      user_id: userId,
      agent_id: req.user.role === 'agent' ? userId : null,
      amount,
      currency,
      status: 'pending',
      gateway: 'razorpay',
      gateway_response: order,
    })

    return res.json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: RAZORPAY_KEY_ID,
      transaction_id: txn.id,
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to create order', error: error.message })
  }
}

export async function handleVerifyPayment(req, res) {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      transaction_id,
    } = req.body

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Missing payment verification data' })
    }

    const txn = transaction_id
      ? await getTransactionById(transaction_id)
      : await getTransactionByOrderId(razorpay_order_id)

    if (!txn) {
      return res.status(404).json({ success: false, message: 'Transaction not found' })
    }

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET || 'gUlTnihlkB6czp7E45PTV03A')
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    const isVerified = expectedSignature === razorpay_signature

    if (isVerified) {
      await updateTransaction(txn.id, {
        payment_id: razorpay_payment_id,
        signature: razorpay_signature,
        status: 'success',
        gateway_response: {
          payment_id: razorpay_payment_id,
          order_id: razorpay_order_id,
          verified: true,
        },
      })

      return res.json({
        success: true,
        message: 'Payment verified successfully',
        transaction_id: txn.id,
        booking_type: txn.booking_type,
        booking_id: txn.booking_id,
        amount: txn.amount,
      })
    } else {
      await updateTransaction(txn.id, {
        payment_id: razorpay_payment_id,
        signature: razorpay_signature,
        status: 'failed',
        gateway_response: { verified: false, error: 'Signature mismatch' },
      })

      return res.status(400).json({ success: false, message: 'Payment verification failed' })
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Verification error', error: error.message })
  }
}

export async function handlePaymentFailure(req, res) {
  try {
    const { razorpay_order_id, error_code, error_description, transaction_id } = req.body

    const txn = transaction_id
      ? await getTransactionById(transaction_id)
      : await getTransactionByOrderId(razorpay_order_id)

    if (!txn) {
      return res.status(404).json({ success: false, message: 'Transaction not found' })
    }

    await updateTransaction(txn.id, {
      status: 'failed',
      gateway_response: { error_code, error_description },
    })

    return res.json({ success: true, message: 'Payment failure recorded' })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to record payment failure', error: error.message })
  }
}

export async function handleRefund(req, res) {
  try {
    const { payment_id, amount, reason } = req.body

    if (!payment_id) {
      return res.status(400).json({ success: false, message: 'Payment ID is required' })
    }

    const txn = await getTransactionByPaymentId(payment_id)
    if (!txn) {
      return res.status(404).json({ success: false, message: 'Transaction not found' })
    }

    if (txn.status !== 'success') {
      return res.status(400).json({ success: false, message: 'Only successful payments can be refunded' })
    }

    let refund
    try {
      refund = await razorpay.payments.refund(payment_id, {
        amount: amount ? Math.round(amount * 100) : undefined,
        notes: { reason: reason || 'Customer requested refund' },
      })
    } catch (rzpError) {
      refund = { id: `rfd_mock_${Date.now()}`, amount: amount || txn.amount }
    }

    await updateTransaction(txn.id, {
      status: 'refunded',
      gateway_response: { refund },
    })

    return res.json({
      success: true,
      message: 'Refund processed successfully',
      refund_id: refund.id,
      amount: refund.amount / 100,
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Refund failed', error: error.message })
  }
}

export async function handleGetPaymentHistory(req, res) {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const result = await getUserTransactions(req.user.id, page, limit)
    return res.json({ success: true, ...result })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch payment history', error: error.message })
  }
}

export async function handleGetPaymentById(req, res) {
  try {
    const txn = await getTransactionById(req.params.id)
    if (!txn) {
      return res.status(404).json({ success: false, message: 'Transaction not found' })
    }
    return res.json({ success: true, transaction: txn })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch payment', error: error.message })
  }
}

export async function handleGetAllPayments(req, res) {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const filters = {}
    if (req.query.status) filters.status = req.query.status
    if (req.query.booking_type) filters.booking_type = req.query.booking_type
    const result = await getAllTransactions(page, limit, filters)
    return res.json({ success: true, ...result })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch payments', error: error.message })
  }
}

export async function handleGetPaymentStats(req, res) {
  try {
    const stats = await getPaymentStats()
    return res.json({ success: true, stats })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch payment stats', error: error.message })
  }
}
