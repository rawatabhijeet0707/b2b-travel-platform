import api from './api.js'
import { fallbackAuth } from './fallbackAuth.js'

// Helper: try backend API first, fall back to local mock on network error/timeout
async function withFallback(apiCall, fallbackCall) {
  try {
    return await apiCall()
  } catch (err) {
    // If it's a network error, timeout, or server unreachable, use fallback
    const isNetworkError =
      !err.response ||
      err.code === 'ECONNABORTED' ||
      err.message?.includes('timeout') ||
      err.message?.includes('Network') ||
      err.message?.includes('fetch') ||
      err.message?.includes('Server is taking too long')

    if (isNetworkError) {
      return await fallbackCall()
    }
    // If it's a real API error (401, 404, etc.), throw it
    throw err
  }
}

export const authService = {
  // Send OTP to mobile
  sendOtp: (mobile, purpose = 'login') =>
    withFallback(
      () => api.post('/auth/send-otp', { mobile, purpose }),
      () => fallbackAuth.sendOtp(mobile, purpose)
    ),

  // Verify OTP
  verifyOtp: (mobile, otp, purpose = 'login') =>
    withFallback(
      () => api.post('/auth/verify-otp', { mobile, otp, purpose }),
      () => fallbackAuth.verifyOtp(mobile, otp, purpose)
    ),

  // Register new agency
  register: (data) =>
    withFallback(
      () => api.post('/auth/register', data),
      () => fallbackAuth.register(data)
    ),

  // Login with email/mobile + password
  loginWithPassword: (identifier, password) =>
    withFallback(
      () => api.post('/auth/login', { identifier, password }),
      () => fallbackAuth.loginWithPassword(identifier, password)
    ),

  // Get current user
  getMe: () => api.get('/auth/me'),

  // Update profile
  updateProfile: (data) =>
    withFallback(
      () => api.put('/auth/profile', data),
      () => {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        return fallbackAuth.updateProfile(user.id, data)
      }
    ),

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
