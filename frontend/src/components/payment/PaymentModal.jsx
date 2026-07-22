import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Loader2, CheckCircle2, XCircle, ArrowRight, Tag, Receipt,
  Shield, CreditCard, Wallet, TrendingUp, AlertCircle, RotateCw,
} from 'lucide-react'
import { authService } from '../../services/authService.js'

const GST_RATE = 0.18
const CONVENIENCE_FEE = 50

export default function PaymentModal({
  isOpen, onClose, bookingType, bookingId, baseAmount, title, description, onSuccess,
}) {
  const [step, setStep] = useState('summary')
  const [couponCode, setCouponCode] = useState('')
  const [couponApplied, setCouponApplied] = useState(null)
  const [couponError, setCouponError] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [paymentResult, setPaymentResult] = useState(null)

  useEffect(() => {
    if (isOpen) {
      setStep('summary')
      setCouponCode('')
      setCouponApplied(null)
      setCouponError('')
      setError('')
      setPaymentResult(null)
      setLoading(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  const user = authService.getUser() || {}
  const base = Number(baseAmount) || 0
  const discount = couponApplied ? Math.round(base * couponApplied.discountPercent / 100) : 0
  const afterDiscount = base - discount
  const gst = Math.round(afterDiscount * GST_RATE)
  const total = afterDiscount + gst + CONVENIENCE_FEE

  const handleApplyCoupon = () => {
    setCouponError('')
    const code = couponCode.trim().toUpperCase()
    if (!code) { setCouponError('Enter a coupon code'); return }
    const coupons = {
      WELCOME10: { code: 'WELCOME10', discountPercent: 10 },
      TRAVEL20: { code: 'TRAVEL20', discountPercent: 20 },
      B2B15: { code: 'B2B15', discountPercent: 15 },
    }
    if (coupons[code]) {
      setCouponApplied(coupons[code])
    } else {
      setCouponError('Invalid or expired coupon code')
    }
  }

  const handleRemoveCoupon = () => {
    setCouponApplied(null)
    setCouponCode('')
  }

  const handlePayNow = async () => {
    setError('')
    setLoading(true)
    setStep('processing')
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      const mockTxnId = 'TXN' + Date.now()
      setPaymentResult({ success: true, data: { transaction_id: mockTxnId } })
      setStep('success')
      setLoading(false)
      if (onSuccess) onSuccess({ transaction_id: mockTxnId })
    } catch (err) {
      setPaymentResult({ success: false, message: err.message || 'Payment failed' })
      setStep('failed')
      setLoading(false)
    }
  }

  const handleRetry = () => {
    setStep('summary')
    setError('')
    setPaymentResult(null)
  }

  const formatAmt = (v) => `₹${v.toLocaleString('en-IN')}`

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="relative gradient-bg p-5 text-white">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold">Payment Checkout</h2>
                  <p className="text-xs text-white/80">{bookingType} Booking</p>
                </div>
              </div>
            </div>

            {/* Summary Step */}
            {step === 'summary' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-5 space-y-5"
              >
                {/* Booking Info */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Receipt className="w-4 h-4 text-primary" />
                    <span className="text-sm font-bold text-heading">Order Summary</span>
                  </div>
                  <p className="text-sm font-semibold text-heading">{title || `${bookingType} Booking`}</p>
                  {description && <p className="text-xs text-text-secondary mt-1">{description}</p>}
                </div>

                {/* Coupon Section */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-4 h-4 text-primary" />
                    <span className="text-sm font-bold text-heading">Apply Coupon</span>
                  </div>
                  {couponApplied ? (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                      <div>
                        <p className="text-sm font-bold text-emerald-700">{couponApplied.code}</p>
                        <p className="text-xs text-emerald-600">{couponApplied.discountPercent}% off applied</p>
                      </div>
                      <button onClick={handleRemoveCoupon} className="text-xs font-semibold text-red-500 hover:underline">Remove</button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        placeholder="Enter coupon code"
                        className="flex-1 px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-4 py-2.5 text-sm font-semibold text-white gradient-bg rounded-xl hover:shadow-glow transition-all"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                  {couponError && <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{couponError}</p>}
                  <p className="text-xs text-text-tertiary mt-1.5">Try: WELCOME10, TRAVEL20, B2B15</p>
                </div>

                {/* Price Breakdown */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Base Price</span>
                    <span className="font-semibold text-heading">{formatAmt(base)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-emerald-600">Discount ({couponApplied?.discountPercent}%)</span>
                      <span className="font-semibold text-emerald-600">-{formatAmt(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">GST (18%)</span>
                    <span className="font-semibold text-heading">{formatAmt(gst)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Convenience Fee</span>
                    <span className="font-semibold text-heading">{formatAmt(CONVENIENCE_FEE)}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2.5 flex justify-between">
                    <span className="text-base font-bold text-heading">Total Amount</span>
                    <span className="text-base font-extrabold text-primary">{formatAmt(total)}</span>
                  </div>
                </div>

                {/* Payment Methods Info */}
                <div className="flex items-center gap-2 text-xs text-text-tertiary">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Secured by Razorpay · UPI · Cards · Net Banking · Wallets · EMI</span>
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />{error}
                  </div>
                )}

                {/* Pay Button */}
                <button
                  onClick={handlePayNow}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-4 gradient-bg text-white font-bold rounded-xl shadow-glow hover:shadow-floating transition-all active:scale-95 disabled:opacity-60"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>
                    Pay {formatAmt(total)} <ArrowRight className="w-4 h-4" />
                  </>}
                </button>
              </motion.div>
            )}

            {/* Processing Step */}
            {step === 'processing' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-10 flex flex-col items-center justify-center"
              >
                <Loader2 className="w-16 h-16 text-primary animate-spin mb-4" />
                <h3 className="text-lg font-bold text-heading">Processing Payment</h3>
                <p className="text-sm text-text-secondary mt-1 text-center">Please wait while we process your payment. Do not close this window.</p>
              </motion.div>
            )}

            {/* Success Step */}
            {step === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 flex flex-col items-center justify-center text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-4"
                >
                  <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                </motion.div>
                <h3 className="text-xl font-extrabold text-heading">Payment Successful!</h3>
                <p className="text-sm text-text-secondary mt-2">Your {bookingType} booking payment has been verified.</p>
                {paymentResult?.data?.transaction_id && (
                  <p className="text-xs text-text-tertiary mt-2">Transaction ID: #{paymentResult.data.transaction_id}</p>
                )}
                <div className="w-full mt-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Amount Paid</span>
                    <span className="font-bold text-emerald-700">{formatAmt(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1.5">
                    <span className="text-text-secondary">Booking Type</span>
                    <span className="font-bold text-heading">{bookingType}</span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-full mt-5 py-3.5 gradient-bg text-white font-bold rounded-xl shadow-glow hover:shadow-floating transition-all"
                >
                  Done
                </button>
              </motion.div>
            )}

            {/* Failed Step */}
            {step === 'failed' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 flex flex-col items-center justify-center text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-4"
                >
                  <XCircle className="w-12 h-12 text-red-500" />
                </motion.div>
                <h3 className="text-xl font-extrabold text-heading">Payment Failed</h3>
                <p className="text-sm text-text-secondary mt-2">{paymentResult?.message || 'Your payment could not be processed. Please try again.'}</p>
                <div className="flex gap-3 w-full mt-5">
                  <button
                    onClick={onClose}
                    className="flex-1 py-3.5 bg-slate-100 text-heading font-bold rounded-xl hover:bg-slate-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRetry}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 gradient-bg text-white font-bold rounded-xl shadow-glow hover:shadow-floating transition-all"
                  >
                    <RotateCw className="w-4 h-4" /> Retry
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
