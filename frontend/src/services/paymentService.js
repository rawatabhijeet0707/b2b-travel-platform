import api from './api.js'

export const paymentService = {
  createOrder: (data) => api.post('/payments/create-order', data),
  verifyPayment: (data) => api.post('/payments/verify', data),
  reportFailure: (data) => api.post('/payments/failure', data),
  refund: (data) => api.post('/payments/refund', data),
  getHistory: (page = 1, limit = 20) => api.get(`/payments/history?page=${page}&limit=${limit}`),
  getPaymentById: (id) => api.get(`/payments/${id}`),
  getAllPayments: (params = {}) => api.get('/payments/all', { params }),
  getStats: () => api.get('/payments/stats'),
}

export const RAZORPAY_KEY_ID = 'rzp_test_SCLKT5gvaOwzN3'

export function loadRazorpayScript() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve(true)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => reject(new Error('Failed to load Razorpay SDK'))
    document.body.appendChild(script)
  })
}

export async function initiateRazorpayPayment({
  orderId, amount, currency, userDetails, bookingType, bookingId,
  onSuccess, onFailure,
}) {
  try {
    await loadRazorpayScript()

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: Math.round(amount * 100),
      currency: currency || 'INR',
      order_id: orderId,
      name: 'myPartner B2B Travel',
      description: `${bookingType} Booking Payment`,
      prefill: {
        name: userDetails?.full_name || userDetails?.agency_name || '',
        email: userDetails?.email || '',
        contact: userDetails?.mobile || '',
      },
      theme: { color: '#2563EB' },
      method: {
        upi: true,
        card: true,
        netbanking: true,
        wallet: true,
        emi: true,
      },
      handler: async (response) => {
        if (onSuccess) onSuccess(response)
      },
      modal: {
        ondismiss: () => {
          if (onFailure) onFailure({ reason: 'dismissed', message: 'Payment cancelled by user' })
        },
      },
    }

    const rzp = new window.Razorpay(options)
    rzp.on('payment.failed', (response) => {
      if (onFailure) onFailure({
        reason: 'failed',
        message: response.error?.description || 'Payment failed',
        code: response.error?.code,
      })
    })
    rzp.open()
  } catch (error) {
    if (onFailure) onFailure({ reason: 'sdk_error', message: error.message })
  }
}
