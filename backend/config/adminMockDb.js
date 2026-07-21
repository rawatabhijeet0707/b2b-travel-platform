import bcrypt from 'bcryptjs'

// In-memory admin store (fallback when MySQL is not available)

const adminRoles = [
  {
    id: 1,
    name: 'super_admin',
    display_name: 'Super Admin',
    description: 'Full access to all modules and settings',
    permissions: { all: true },
    is_system: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    name: 'admin',
    display_name: 'Admin',
    description: 'Access to most modules except system settings',
    permissions: {
      dashboard: ['view'],
      users: ['view', 'create', 'update', 'delete'],
      bookings: ['view', 'create', 'update', 'delete'],
      reports: ['view', 'export'],
      cms: ['view', 'create', 'update', 'delete'],
      coupons: ['view', 'create', 'update', 'delete'],
      offers: ['view', 'create', 'update', 'delete'],
      support: ['view', 'update'],
    },
    is_system: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 3,
    name: 'manager',
    display_name: 'Manager',
    description: 'Manage users, bookings, and view reports',
    permissions: {
      dashboard: ['view'],
      users: ['view', 'update'],
      bookings: ['view', 'update'],
      reports: ['view'],
    },
    is_system: false,
    created_at: new Date(),
    updated_at: new Date(),
  },
]

const adminPassword = bcrypt.hashSync('Admin@123456', 10)
const adminUsers = [
  {
    id: 1,
    full_name: 'Super Admin',
    email: 'admin@travelhub.com',
    mobile: '9999999999',
    password_hash: adminPassword,
    role_id: 1,
    avatar_url: null,
    status: 'active',
    last_login: null,
    login_attempts: 0,
    two_factor_enabled: false,
    created_at: new Date(),
    updated_at: new Date(),
  },
]

let nextAdminId = 2
let nextRoleId = 4
const auditLogs = []
let nextLogId = 1

// Sample data for management
const sampleUsers = [
  { id: 1, full_name: 'Rahul Sharma', email: 'rahul@skyhigh.com', mobile: '9876543210', agency_name: 'SkyHigh Travels', kyc_status: 'verified', account_status: 'active', wallet_balance: 248500, reward_points: 45200, role: 'agent', created_at: '2024-01-15', last_login: '2024-07-20' },
  { id: 2, full_name: 'Priya Patel', email: 'priya@wanderlust.com', mobile: '9876543211', agency_name: 'Wanderlust Tours', kyc_status: 'verified', account_status: 'active', wallet_balance: 156000, reward_points: 28900, role: 'agent', created_at: '2024-02-10', last_login: '2024-07-19' },
  { id: 3, full_name: 'Amit Kumar', email: 'amit@globetrotter.com', mobile: '9876543212', agency_name: 'Globe Trotter', kyc_status: 'pending', account_status: 'active', wallet_balance: 52000, reward_points: 8400, role: 'agent', created_at: '2024-03-05', last_login: '2024-07-18' },
  { id: 4, full_name: 'Sneha Reddy', email: 'sneha@travelxp.com', mobile: '9876543213', agency_name: 'Travel XP', kyc_status: 'verified', account_status: 'suspended', wallet_balance: 89000, reward_points: 15200, role: 'agent', created_at: '2024-01-20', last_login: '2024-07-10' },
  { id: 5, full_name: 'Vikram Singh', email: 'vikram@holidays.com', mobile: '9876543214', agency_name: 'Happy Holidays', kyc_status: 'verified', account_status: 'active', wallet_balance: 312000, reward_points: 67800, role: 'agent', created_at: '2023-12-01', last_login: '2024-07-20' },
]

const sampleBookings = [
  { id: 'BK001', type: 'Flight', customer: 'Rahul Sharma', route: 'DEL → DXB', date: '2024-07-20', amount: 18999, status: 'confirmed', payment: 'paid' },
  { id: 'BK002', type: 'Hotel', customer: 'Priya Patel', route: 'Goa - 3N', date: '2024-07-19', amount: 13500, status: 'confirmed', payment: 'paid' },
  { id: 'BK003', type: 'Package', customer: 'Amit Kumar', route: 'Maldives 4N/5D', date: '2024-07-18', amount: 79999, status: 'pending', payment: 'pending' },
  { id: 'BK004', type: 'Visa', customer: 'Sneha Reddy', route: 'UAE Visa', date: '2024-07-17', amount: 5500, status: 'confirmed', payment: 'paid' },
  { id: 'BK005', type: 'Insurance', customer: 'Vikram Singh', route: 'Premium Plan', date: '2024-07-16', amount: 899, status: 'confirmed', payment: 'paid' },
  { id: 'BK006', type: 'Flight', customer: 'Rahul Sharma', route: 'BOM → SIN', date: '2024-07-15', amount: 22500, status: 'cancelled', payment: 'refunded' },
  { id: 'BK007', type: 'Hotel', customer: 'Priya Patel', route: 'Dubai - 5N', date: '2024-07-14', amount: 28000, status: 'confirmed', payment: 'paid' },
]

const sampleCoupons = [
  { id: 1, code: 'DUBAI15', description: 'Flat 15% off on Dubai flights', type: 'percentage', value: 15, min_booking_amount: 5000, max_discount: 5000, usage_limit: 1000, used_count: 342, valid_from: '2024-01-01', valid_until: '2024-03-31', status: 'active' },
  { id: 2, code: 'MALDIVES20', description: '20% off on Maldives packages', type: 'percentage', value: 20, min_booking_amount: 50000, max_discount: 15000, usage_limit: 500, used_count: 128, valid_from: '2024-01-01', valid_until: '2024-02-28', status: 'active' },
  { id: 3, code: 'INSUREFREE', description: 'Free travel insurance on bookings above 50000', type: 'flat', value: 899, min_booking_amount: 50000, max_discount: null, usage_limit: 2000, used_count: 567, valid_from: '2024-01-01', valid_until: '2024-04-15', status: 'active' },
  { id: 4, code: 'WELCOME500', description: 'Flat 500 off for new users', type: 'flat', value: 500, min_booking_amount: 2000, max_discount: null, usage_limit: 5000, used_count: 1893, valid_from: '2023-06-01', valid_until: '2024-12-31', status: 'active' },
]

const sampleOffers = [
  { id: 1, title: 'Summer Sale - Up to 40% Off', description: 'Best deals on summer holiday packages', type: 'homepage', image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', link_url: '/packages', start_date: '2024-06-01', end_date: '2024-08-31', status: 'active' },
  { id: 2, title: 'Dubai Festival Offer', description: 'Special rates on Dubai flights and hotels', type: 'banner', image_url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80', link_url: '/flights', start_date: '2024-07-01', end_date: '2024-07-31', status: 'active' },
  { id: 3, title: 'Monsoon Getaway', description: 'Rain-friendly destinations at best prices', type: 'popup', image_url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80', link_url: '/packages', start_date: '2024-07-01', end_date: '2024-09-30', status: 'active' },
]

const sampleTickets = [
  { id: 1, user_id: 3, subject: 'KYC verification pending', category: 'KYC', priority: 'high', status: 'open', created_at: '2024-07-19' },
  { id: 2, user_id: 4, subject: 'Wallet withdrawal issue', category: 'Wallet', priority: 'urgent', status: 'in_progress', created_at: '2024-07-18' },
  { id: 3, user_id: 2, subject: 'Invoice not generated', category: 'Billing', priority: 'medium', status: 'open', created_at: '2024-07-17' },
  { id: 4, user_id: 5, subject: 'Flight booking error', category: 'Booking', priority: 'high', status: 'resolved', created_at: '2024-07-15' },
]

const systemSettings = {
  site_name: 'TravelHub',
  site_tagline: 'B2B Travel Distribution Platform',
  currency: 'INR',
  currency_symbol: '\u20B9',
  timezone: 'Asia/Kolkata',
  language: 'en',
  maintenance_mode: 'false',
  smtp_host: '',
  smtp_port: '587',
  smtp_user: '',
  smtp_pass: '',
  sms_provider: '',
  sms_api_key: '',
  whatsapp_api_key: '',
  razorpay_key_id: '',
  razorpay_key_secret: '',
  stripe_secret_key: '',
  stripe_publishable_key: '',
  google_maps_key: '',
  google_analytics_id: '',
  firebase_server_key: '',
}

const chatbotSettings = {
  ai_name: 'Travel Assistant',
  welcome_message: 'Hello! I am your AI Travel Assistant. How can I help you today?',
  online_status: 'true',
  theme_color: '#2563EB',
  suggestions: ['Book Flight', 'Book Hotel', 'Visa', 'Travel Insurance', 'Holiday Packages', 'Check Booking', 'Wallet Balance', 'Latest Offers', 'Popular Destinations'],
  quick_replies: ['Flights', 'Hotels', 'Visa', 'Insurance', 'Packages', 'Support', 'Bookings', 'Wallet', 'Offers'],
  auto_reply_enabled: 'true',
  typing_delay: '800',
}

export const adminMockDb = {
  // Admin auth
  async findAdminByEmail(email) {
    return adminUsers.find(a => a.email === email) || null
  },
  async findAdminById(id) {
    return adminUsers.find(a => a.id === id) || null
  },
  async updateAdminLogin(id) {
    const admin = adminUsers.find(a => a.id === id)
    if (admin) admin.last_login = new Date()
  },
  async verifyAdminPassword(admin, password) {
    if (!admin || !admin.password_hash) return false
    return bcrypt.compare(password, admin.password_hash)
  },
  sanitizeAdmin(admin) {
    if (!admin) return null
    const { password_hash, ...sanitized } = admin
    return { ...sanitized, role: adminRoles.find(r => r.id === admin.role_id) }
  },

  // Roles
  async getRoles() { return adminRoles },
  async getRoleById(id) { return adminRoles.find(r => r.id === id) || null },
  async createRole(data) {
    const role = { id: nextRoleId++, ...data, is_system: false, created_at: new Date(), updated_at: new Date() }
    adminRoles.push(role)
    return role
  },
  async updateRole(id, data) {
    const role = adminRoles.find(r => r.id === id)
    if (role) { Object.assign(role, data, { updated_at: new Date() }); return role }
    return null
  },
  async deleteRole(id) {
    const idx = adminRoles.findIndex(r => r.id === id && !r.is_system)
    if (idx >= 0) { adminRoles.splice(idx, 1); return true }
    return false
  },

  // Audit logs
  async addLog(data) {
    const log = { id: nextLogId++, ...data, created_at: new Date() }
    auditLogs.unshift(log)
    return log
  },
  async getLogs(limit = 50, offset = 0) {
    return { data: auditLogs.slice(offset, offset + limit), total: auditLogs.length }
  },

  // Users management
  async getUsers(filters = {}) {
    let result = [...sampleUsers]
    if (filters.status) result = result.filter(u => u.account_status === filters.status)
    if (filters.kyc) result = result.filter(u => u.kyc_status === filters.kyc)
    if (filters.search) {
      const s = filters.search.toLowerCase()
      result = result.filter(u => u.full_name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s) || u.agency_name.toLowerCase().includes(s))
    }
    return { data: result, total: result.length }
  },
  async getUserById(id) { return sampleUsers.find(u => u.id === id) || null },
  async updateUserStatus(id, status) {
    const user = sampleUsers.find(u => u.id === id)
    if (user) { user.account_status = status; return user }
    return null
  },
  async updateUserKyc(id, status) {
    const user = sampleUsers.find(u => u.id === id)
    if (user) { user.kyc_status = status; return user }
    return null
  },
  async updateWallet(id, amount) {
    const user = sampleUsers.find(u => u.id === id)
    if (user) { user.wallet_balance += amount; return user }
    return null
  },

  // Bookings
  async getBookings(filters = {}) {
    let result = [...sampleBookings]
    if (filters.type) result = result.filter(b => b.type === filters.type)
    if (filters.status) result = result.filter(b => b.status === filters.status)
    if (filters.search) {
      const s = filters.search.toLowerCase()
      result = result.filter(b => b.id.toLowerCase().includes(s) || b.customer.toLowerCase().includes(s))
    }
    return { data: result, total: result.length }
  },

  // Coupons
  async getCoupons() { return { data: sampleCoupons, total: sampleCoupons.length } },
  async createCoupon(data) {
    const coupon = { id: sampleCoupons.length + 1, ...data, used_count: 0 }
    sampleCoupons.push(coupon)
    return coupon
  },
  async updateCoupon(id, data) {
    const c = sampleCoupons.find(c => c.id === id)
    if (c) { Object.assign(c, data); return c }
    return null
  },
  async deleteCoupon(id) {
    const idx = sampleCoupons.findIndex(c => c.id === id)
    if (idx >= 0) { sampleCoupons.splice(idx, 1); return true }
    return false
  },

  // Offers
  async getOffers() { return { data: sampleOffers, total: sampleOffers.length } },
  async createOffer(data) {
    const offer = { id: sampleOffers.length + 1, ...data }
    sampleOffers.push(offer)
    return offer
  },
  async updateOffer(id, data) {
    const o = sampleOffers.find(o => o.id === id)
    if (o) { Object.assign(o, data); return o }
    return null
  },
  async deleteOffer(id) {
    const idx = sampleOffers.findIndex(o => o.id === id)
    if (idx >= 0) { sampleOffers.splice(idx, 1); return true }
    return false
  },

  // Tickets
  async getTickets(filters = {}) {
    let result = [...sampleTickets]
    if (filters.status) result = result.filter(t => t.status === filters.status)
    return { data: result, total: result.length }
  },
  async updateTicket(id, data) {
    const t = sampleTickets.find(t => t.id === id)
    if (t) { Object.assign(t, data); return t }
    return null
  },

  // Settings
  async getSettings() { return systemSettings },
  async updateSettings(data) { Object.assign(systemSettings, data); return systemSettings },

  // Chatbot settings
  async getChatbotSettings() { return chatbotSettings },
  async updateChatbotSettings(data) { Object.assign(chatbotSettings, data); return chatbotSettings },

  // Dashboard stats
  async getDashboardStats() {
    return {
      todayRevenue: 284560,
      monthlyRevenue: 8456200,
      totalBookings: 1248,
      flightBookings: 542,
      hotelBookings: 386,
      packageBookings: 124,
      visaBookings: 98,
      insuranceBookings: 98,
      totalWallet: 12480000,
      totalCommission: 1872000,
      totalCustomers: 3420,
      totalAgents: 856,
      pendingKyc: 42,
      pendingTickets: 18,
      pendingPayments: 7,
      liveUsers: 124,
      activeSessions: 89,
      todayProfit: 142280,
      revenueChart: [
        { month: 'Jan', revenue: 5200000, bookings: 890 },
        { month: 'Feb', revenue: 6100000, bookings: 1020 },
        { month: 'Mar', revenue: 5800000, bookings: 980 },
        { month: 'Apr', revenue: 7200000, bookings: 1150 },
        { month: 'May', revenue: 6800000, bookings: 1080 },
        { month: 'Jun', revenue: 7900000, bookings: 1240 },
        { month: 'Jul', revenue: 8456200, bookings: 1248 },
      ],
      topDestinations: [
        { name: 'Dubai', bookings: 342, revenue: 12800000 },
        { name: 'Goa', bookings: 286, revenue: 4200000 },
        { name: 'Maldives', bookings: 178, revenue: 15600000 },
        { name: 'Singapore', bookings: 156, revenue: 6800000 },
        { name: 'Thailand', bookings: 142, revenue: 5200000 },
      ],
      topAgents: [
        { name: 'SkyHigh Travels', revenue: 8450000, bookings: 342 },
        { name: 'Happy Holidays', revenue: 6200000, bookings: 286 },
        { name: 'Wanderlust Tours', revenue: 4800000, bookings: 198 },
        { name: 'Travel XP', revenue: 3200000, bookings: 142 },
      ],
      countrySales: [
        { country: 'UAE', sales: 12800000, percentage: 32 },
        { country: 'India', sales: 8400000, percentage: 21 },
        { country: 'Maldives', sales: 6200000, percentage: 15 },
        { country: 'Singapore', sales: 4800000, percentage: 12 },
        { country: 'Thailand', sales: 3800000, percentage: 9 },
        { country: 'Others', sales: 4200000, percentage: 11 },
      ],
    }
  },
}
