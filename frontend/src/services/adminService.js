import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'https://b2b-travel-backend.onrender.com/api'

const adminApi = axios.create({
  baseURL: `${API_BASE}/admin`,
  headers: { 'Content-Type': 'application/json' },
})

// Inject token
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Handle 401
adminApi.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminUser')
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin') {
        window.location.href = '/admin'
      }
    }
    return Promise.reject(error)
  }
)

export const adminService = {
  // Auth
  async login(email, password) {
    const { data } = await adminApi.post('/login', { email, password })
    if (data.success) {
      localStorage.setItem('adminToken', data.token)
      localStorage.setItem('adminUser', JSON.stringify(data.admin))
    }
    return data
  },
  logout() {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    window.location.href = '/admin'
  },
  getToken() { return localStorage.getItem('adminToken') },
  getUser() {
    try { return JSON.parse(localStorage.getItem('adminUser') || 'null') } catch { return null }
  },
  isAuthenticated() { return !!this.getToken() },

  // Dashboard
  async getDashboard() {
    const { data } = await adminApi.get('/dashboard')
    return data
  },

  // Users
  async getUsers(params = {}) {
    const { data } = await adminApi.get('/users', { params })
    return data
  },
  async updateUserStatus(id, status) {
    const { data } = await adminApi.put(`/users/${id}/status`, { status })
    return data
  },
  async updateUserKyc(id, status) {
    const { data } = await adminApi.put(`/users/${id}/kyc`, { status })
    return data
  },
  async updateWallet(id, amount) {
    const { data } = await adminApi.put(`/users/${id}/wallet`, { amount })
    return data
  },

  // Bookings
  async getBookings(params = {}) {
    const { data } = await adminApi.get('/bookings', { params })
    return data
  },

  // Roles
  async getRoles() {
    const { data } = await adminApi.get('/roles')
    return data
  },
  async createRole(body) {
    const { data } = await adminApi.post('/roles', body)
    return data
  },
  async updateRole(id, body) {
    const { data } = await adminApi.put(`/roles/${id}`, body)
    return data
  },
  async deleteRole(id) {
    const { data } = await adminApi.delete(`/roles/${id}`)
    return data
  },

  // Coupons
  async getCoupons() {
    const { data } = await adminApi.get('/coupons')
    return data
  },
  async createCoupon(body) {
    const { data } = await adminApi.post('/coupons', body)
    return data
  },
  async updateCoupon(id, body) {
    const { data } = await adminApi.put(`/coupons/${id}`, body)
    return data
  },
  async deleteCoupon(id) {
    const { data } = await adminApi.delete(`/coupons/${id}`)
    return data
  },

  // Offers
  async getOffers() {
    const { data } = await adminApi.get('/offers')
    return data
  },
  async createOffer(body) {
    const { data } = await adminApi.post('/offers', body)
    return data
  },
  async updateOffer(id, body) {
    const { data } = await adminApi.put(`/offers/${id}`, body)
    return data
  },
  async deleteOffer(id) {
    const { data } = await adminApi.delete(`/offers/${id}`)
    return data
  },

  // Tickets
  async getTickets(params = {}) {
    const { data } = await adminApi.get('/tickets', { params })
    return data
  },
  async updateTicket(id, body) {
    const { data } = await adminApi.put(`/tickets/${id}`, body)
    return data
  },

  // Settings
  async getSettings() {
    const { data } = await adminApi.get('/settings')
    return data
  },
  async updateSettings(body) {
    const { data } = await adminApi.put('/settings', body)
    return data
  },

  // Chatbot
  async getChatbotSettings() {
    const { data } = await adminApi.get('/chatbot/settings')
    return data
  },
  async updateChatbotSettings(body) {
    const { data } = await adminApi.put('/chatbot/settings', body)
    return data
  },

  // Audit Logs
  async getAuditLogs(params = {}) {
    const { data } = await adminApi.get('/audit-logs', { params })
    return data
  },
}
