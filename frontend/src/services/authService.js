import api from './api.js'

export const authService = {
  // Send OTP to mobile
  sendOtp: (mobile, purpose = 'login') =>
    api.post('/auth/send-otp', { mobile, purpose }),

  // Verify OTP
  verifyOtp: (mobile, otp, purpose = 'login') =>
    api.post('/auth/verify-otp', { mobile, otp, purpose }),

  // Register new agency
  register: (data) =>
    api.post('/auth/register', data),

  // Login with email/mobile + password
  loginWithPassword: (identifier, password) =>
    api.post('/auth/login', { identifier, password }),

  // Get current user
  getMe: () =>
    api.get('/auth/me'),

  // Store auth data
  setAuth: (token, user) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
  },

  // Clear auth data
  clearAuth: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  // Get stored user
  getStoredUser: () => {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  // Alias for getStoredUser
  getUser: function() {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  // Check if authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token')
  },
}

export const dashboardService = {
  getStats: () => api.get('/dashboard/stats'),
  getBookings: (page = 1, limit = 10) => api.get(`/dashboard/bookings?page=${page}&limit=${limit}`),
  getInvoices: (page = 1, limit = 20) => api.get(`/dashboard/invoices?page=${page}&limit=${limit}`),
  getWalletTransactions: (page = 1, limit = 20) => api.get(`/dashboard/wallet/transactions?page=${page}&limit=${limit}`),
  getReports: () => api.get('/dashboard/reports'),
  getTickets: () => api.get('/dashboard/tickets'),
}
