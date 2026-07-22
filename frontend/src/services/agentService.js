import api from './api.js'

export const agentService = {
  // Dashboard
  getDashboard: () => api.get('/agent/dashboard'),

  // Bookings
  getBookings: (params = {}) => api.get('/agent/bookings', { params }),
  getMyBookings: (page = 1, limit = 10) => api.get(`/agent/my-bookings?page=${page}&limit=${limit}`),

  // Customers
  getCustomers: (params = {}) => api.get('/agent/customers', { params }),

  // Earnings / Commission
  getEarnings: () => api.get('/agent/earnings'),

  // Wallet
  getWallet: () => api.get('/agent/wallet'),

  // Transactions
  getTransactions: (page = 1, limit = 20) => api.get(`/agent/transactions?page=${page}&limit=${limit}`),

  // Reports
  getReports: () => api.get('/agent/reports'),

  // Support Tickets
  getTickets: () => api.get('/agent/tickets'),

  // Notifications
  getNotifications: () => api.get('/agent/notifications'),

  // Settings
  getSettings: () => api.get('/agent/settings'),
  updateSettings: (data) => api.put('/agent/settings', data),

  // Auth helpers (reuse same token as user auth)
  isAuthenticated: () => !!localStorage.getItem('token'),
  getUser: () => {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },
  isAgent: () => {
    const userStr = localStorage.getItem('user')
    const user = userStr ? JSON.parse(userStr) : null
    return user?.role === 'agent'
  },
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
  },
}
