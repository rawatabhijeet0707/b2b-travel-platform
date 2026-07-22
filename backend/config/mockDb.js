import bcrypt from 'bcryptjs'

// In-memory user store (fallback when MySQL is not available)
const users = []

// Create default test user
const testPassword = bcrypt.hashSync('Test@1234', 10)
users.push({
  id: 1,
  full_name: 'Test Admin',
  email: 'admin@traveldistrib.com',
  mobile: '9876543210',
  password_hash: testPassword,
  agency_name: 'SkyHigh Travels',
  pan_number: 'ABCDE1234F',
  gst_number: '29ABCDE1234F1Z5',
  business_address: 'Cyber City, Gurugram, Haryana 122002',
  kyc_status: 'verified',
  account_status: 'active',
  role: 'agent',
  wallet_balance: 248500.00,
  reward_points: 45200,
  credit_limit: 50000.00,
  credit_used: 15000.00,
  is_mobile_verified: true,
  is_email_verified: true,
  last_login: null,
  created_at: new Date(),
  updated_at: new Date(),
})

// Demo Agent account for Agent Panel testing
const agentPassword = bcrypt.hashSync('Agent@123', 10)
users.push({
  id: 2,
  full_name: 'Demo Agent',
  email: 'agent@example.com',
  mobile: '9876543220',
  password_hash: agentPassword,
  agency_name: 'Global Travel Connect',
  pan_number: 'FGHIJ5678G',
  gst_number: '29FGHIJ5678G1Z5',
  business_address: 'Connaught Place, New Delhi, 110001',
  kyc_status: 'verified',
  account_status: 'active',
  role: 'agent',
  wallet_balance: 51630.00,
  reward_points: 12500,
  credit_limit: 100000.00,
  credit_used: 25000.00,
  is_mobile_verified: true,
  is_email_verified: true,
  last_login: null,
  created_at: new Date(),
  updated_at: new Date(),
})

// Demo User account for User Panel testing
const userPassword = bcrypt.hashSync('User@123', 10)
users.push({
  id: 3,
  full_name: 'Demo User',
  email: 'user@example.com',
  mobile: '9876543230',
  password_hash: userPassword,
  agency_name: '',
  pan_number: '',
  gst_number: '',
  business_address: '',
  kyc_status: 'pending',
  account_status: 'active',
  role: 'user',
  wallet_balance: 15000.00,
  reward_points: 5000,
  credit_limit: 20000.00,
  credit_used: 5000.00,
  is_mobile_verified: true,
  is_email_verified: true,
  last_login: null,
  created_at: new Date(),
  updated_at: new Date(),
})

let nextId = 4

// Mock bookings for the test user (id: 1)
const bookings = [
  { id: 'TD-2401', user_id: 1, type: 'Flight', customer: 'Rajesh Kumar', route: 'DEL → DXB', date: '2024-07-18', amount: 18999, status: 'confirmed', created_at: new Date('2024-07-18T10:30:00') },
  { id: 'TD-2400', user_id: 1, type: 'Hotel', customer: 'Priya Sharma', route: 'Dubai Marina', date: '2024-07-17', amount: 8500, status: 'confirmed', created_at: new Date('2024-07-17T14:15:00') },
  { id: 'TD-2399', user_id: 1, type: 'Package', customer: 'Mohammed Ali', route: 'Bali Tour', date: '2024-07-17', amount: 24999, status: 'pending', created_at: new Date('2024-07-17T09:00:00') },
  { id: 'TD-2398', user_id: 1, type: 'Visa', customer: 'Anita Desai', route: 'Singapore Visa', date: '2024-07-16', amount: 3500, status: 'processing', created_at: new Date('2024-07-16T16:45:00') },
  { id: 'TD-2397', user_id: 1, type: 'Insurance', customer: 'Vikram Singh', route: 'Travel Cover', date: '2024-07-15', amount: 1200, status: 'confirmed', created_at: new Date('2024-07-15T11:20:00') },
  // Demo user bookings (id: 3)
  { id: 'TD-3401', user_id: 3, type: 'Flight', customer: 'Aarav Sharma', route: 'BOM → SIN', date: '2025-01-18', amount: 22500, status: 'confirmed', created_at: new Date('2025-01-18T10:30:00') },
  { id: 'TD-3402', user_id: 3, type: 'Hotel', customer: 'Aarav Sharma', route: 'Marina Bay Sands', date: '2025-01-18', amount: 12500, status: 'confirmed', created_at: new Date('2025-01-18T14:15:00') },
  { id: 'TD-3403', user_id: 3, type: 'Package', customer: 'Diya Patel', route: 'Thailand Tour', date: '2025-01-15', amount: 18999, status: 'confirmed', created_at: new Date('2025-01-15T09:00:00') },
  { id: 'TD-3404', user_id: 3, type: 'Visa', customer: 'Diya Patel', route: 'Thailand Visa', date: '2025-01-10', amount: 2500, status: 'confirmed', created_at: new Date('2025-01-10T16:45:00') },
  { id: 'TD-3405', user_id: 3, type: 'Flight', customer: 'Rohan Gupta', route: 'DEL → DXB', date: '2025-01-08', amount: 15999, status: 'confirmed', created_at: new Date('2025-01-08T11:20:00') },
  { id: 'TD-3406', user_id: 3, type: 'Insurance', customer: 'Rohan Gupta', route: 'Travel Cover', date: '2025-01-08', amount: 999, status: 'confirmed', created_at: new Date('2025-01-08T11:25:00') },
  { id: 'TD-3407', user_id: 3, type: 'Hotel', customer: 'Sara Khan', route: 'Burj View Suite', date: '2025-01-05', amount: 18500, status: 'pending', created_at: new Date('2025-01-05T13:30:00') },
  { id: 'TD-3408', user_id: 3, type: 'Flight', customer: 'Karan Mehta', route: 'BLR → KUL', date: '2025-01-03', amount: 13500, status: 'cancelled', created_at: new Date('2025-01-03T08:00:00') },
  { id: 'TD-3409', user_id: 3, type: 'Package', customer: 'Anaya Reddy', route: 'Maldives Honeymoon', date: '2024-12-28', amount: 45999, status: 'confirmed', created_at: new Date('2024-12-28T10:00:00') },
  { id: 'TD-3410', user_id: 3, type: 'Visa', customer: 'Anaya Reddy', route: 'Maldives Visa', date: '2024-12-20', amount: 1800, status: 'confirmed', created_at: new Date('2024-12-20T15:00:00') },
]

// Mock invoices for the test user (id: 1)
const invoices = [
  { id: 'INV-2025-001', user_id: 1, booking_id: 'TD-2401', type: 'Flight', customer: 'Rajesh Kumar', date: '2024-07-18', amount: 18999, status: 'paid', created_at: new Date('2024-07-18T10:30:00') },
  { id: 'INV-2025-002', user_id: 1, booking_id: 'TD-2400', type: 'Hotel', customer: 'Priya Sharma', date: '2024-07-17', amount: 8500, status: 'paid', created_at: new Date('2024-07-17T14:15:00') },
  { id: 'INV-2025-003', user_id: 1, booking_id: 'TD-2399', type: 'Package', customer: 'Mohammed Ali', date: '2024-07-17', amount: 24999, status: 'pending', created_at: new Date('2024-07-17T09:00:00') },
  { id: 'INV-2025-004', user_id: 1, booking_id: 'TD-2398', type: 'Visa', customer: 'Anita Desai', date: '2024-07-16', amount: 3500, status: 'paid', created_at: new Date('2024-07-16T16:45:00') },
  { id: 'INV-2025-005', user_id: 1, booking_id: 'TD-2397', type: 'Insurance', customer: 'Vikram Singh', date: '2024-07-15', amount: 1200, status: 'paid', created_at: new Date('2024-07-15T11:20:00') },
  { id: 'INV-2025-006', user_id: 1, booking_id: 'TD-2396', type: 'Flight', customer: 'Sneha Patel', date: '2024-07-14', amount: 22500, status: 'overdue', created_at: new Date('2024-07-14T08:00:00') },
  { id: 'INV-2025-007', user_id: 1, booking_id: 'TD-2395', type: 'Hotel', customer: 'Arjun Mehta', date: '2024-07-13', amount: 12000, status: 'paid', created_at: new Date('2024-07-13T15:30:00') },
  { id: 'INV-2025-008', user_id: 1, booking_id: 'TD-2394', type: 'Package', customer: 'Kavya Reddy', date: '2024-07-12', amount: 35999, status: 'pending', created_at: new Date('2024-07-12T12:00:00') },
  // Demo user invoices (id: 3)
  { id: 'INV-2025-101', user_id: 3, booking_id: 'TD-3401', type: 'Flight', customer: 'Aarav Sharma', date: '2025-01-18', amount: 22500, status: 'paid', created_at: new Date('2025-01-18T10:30:00') },
  { id: 'INV-2025-102', user_id: 3, booking_id: 'TD-3402', type: 'Hotel', customer: 'Aarav Sharma', date: '2025-01-18', amount: 12500, status: 'paid', created_at: new Date('2025-01-18T14:15:00') },
  { id: 'INV-2025-103', user_id: 3, booking_id: 'TD-3403', type: 'Package', customer: 'Diya Patel', date: '2025-01-15', amount: 18999, status: 'paid', created_at: new Date('2025-01-15T09:00:00') },
  { id: 'INV-2025-104', user_id: 3, booking_id: 'TD-3404', type: 'Visa', customer: 'Diya Patel', date: '2025-01-10', amount: 2500, status: 'paid', created_at: new Date('2025-01-10T16:45:00') },
  { id: 'INV-2025-105', user_id: 3, booking_id: 'TD-3405', type: 'Flight', customer: 'Rohan Gupta', date: '2025-01-08', amount: 15999, status: 'paid', created_at: new Date('2025-01-08T11:20:00') },
  { id: 'INV-2025-106', user_id: 3, booking_id: 'TD-3407', type: 'Hotel', customer: 'Sara Khan', date: '2025-01-05', amount: 18500, status: 'pending', created_at: new Date('2025-01-05T13:30:00') },
  { id: 'INV-2025-107', user_id: 3, booking_id: 'TD-3409', type: 'Package', customer: 'Anaya Reddy', date: '2024-12-28', amount: 45999, status: 'paid', created_at: new Date('2024-12-28T10:00:00') },
  { id: 'INV-2025-108', user_id: 3, booking_id: 'TD-3410', type: 'Visa', customer: 'Anaya Reddy', date: '2024-12-20', amount: 1800, status: 'paid', created_at: new Date('2024-12-20T15:00:00') },
]

// OTP store
const otps = []

export const mockDb = {
  // User operations
  async createUser(data) {
    const password_hash = await bcrypt.hash(data.password, 10)
    const user = {
      id: nextId++,
      full_name: data.full_name,
      email: data.email,
      mobile: data.mobile,
      password_hash,
      agency_name: data.agency_name || null,
      pan_number: data.pan_number || null,
      gst_number: data.gst_number || null,
      business_address: data.business_address || null,
      kyc_status: 'pending',
      account_status: 'active',
      role: 'agent',
      wallet_balance: 0,
      reward_points: 0,
      credit_limit: 50000,
      credit_used: 0,
      is_mobile_verified: true,
      is_email_verified: false,
      last_login: null,
      created_at: new Date(),
      updated_at: new Date(),
    }
    users.push(user)
    const { password_hash: _, ...sanitized } = user
    return sanitized
  },

  async findUserByEmail(email) {
    return users.find(u => u.email === email) || null
  },

  async findUserByMobile(mobile) {
    return users.find(u => u.mobile === mobile) || null
  },

  async findUserById(id) {
    return users.find(u => u.id === id) || null
  },

  async findUserByIdentifier(identifier) {
    if (identifier.includes('@')) return this.findUserByEmail(identifier)
    return this.findUserByMobile(identifier)
  },

  async updateLastLogin(userId) {
    const user = users.find(u => u.id === userId)
    if (user) user.last_login = new Date()
  },

  async verifyPassword(user, password) {
    if (!user || !user.password_hash) return false
    return bcrypt.compare(password, user.password_hash)
  },

  sanitizeUser(user) {
    if (!user) return null
    const { password_hash, ...sanitized } = user
    return sanitized
  },

  // OTP operations
  async storeOtp(mobile, otp, purpose = 'login') {
    otps.push({
      id: otps.length + 1,
      mobile,
      otp_code: otp,
      purpose,
      expires_at: new Date(Date.now() + 5 * 60 * 1000),
      is_used: false,
      created_at: new Date(),
    })
  },

  async verifyOtpRecord(mobile, otp, purpose = 'login') {
    const record = otps
      .filter(o => o.mobile === mobile && o.otp_code === otp && o.purpose === purpose && !o.is_used)
      .sort((a, b) => b.created_at - a.created_at)[0]

    if (!record) return { valid: false, message: 'Invalid OTP' }
    if (new Date() > new Date(record.expires_at)) {
      return { valid: false, message: 'OTP has expired. Please request a new one.' }
    }

    record.is_used = true
    return { valid: true }
  },

  // Bookings
  async getBookings(userId, page = 1, limit = 10) {
    const userBookings = bookings.filter(b => b.user_id === userId)
    const offset = (page - 1) * limit
    const paged = userBookings.slice(offset, offset + limit)
    return {
      bookings: paged,
      pagination: {
        page,
        limit,
        total: userBookings.length,
        totalPages: Math.ceil(userBookings.length / limit),
      },
    }
  },

  // Invoices
  async getInvoices(userId, page = 1, limit = 20) {
    const userInvoices = invoices.filter(inv => inv.user_id === userId)
    const offset = (page - 1) * limit
    const paged = userInvoices.slice(offset, offset + limit)
    const totalAmount = userInvoices.reduce((sum, inv) => sum + inv.amount, 0)
    const paidCount = userInvoices.filter(inv => inv.status === 'paid').length
    const pendingCount = userInvoices.filter(inv => inv.status === 'pending').length
    const overdueCount = userInvoices.filter(inv => inv.status === 'overdue').length
    return {
      invoices: paged,
      stats: {
        total: userInvoices.length,
        totalAmount,
        paid: paidCount,
        pending: pendingCount,
        overdue: overdueCount,
      },
      pagination: {
        page,
        limit,
        total: userInvoices.length,
        totalPages: Math.ceil(userInvoices.length / limit),
      },
    }
  },

  // Reports
  async getReports(userId) {
    const userBookings = bookings.filter(b => b.user_id === userId)
    const confirmed = userBookings.filter(b => b.status === 'confirmed')
    const totalRevenue = confirmed.reduce((sum, b) => sum + b.amount, 0)
    const totalCommission = Math.round(totalRevenue * 0.15)
    const avgBookingValue = userBookings.length > 0 ? Math.round(totalRevenue / confirmed.length) : 0
    const cancelled = userBookings.filter(b => b.status === 'cancelled').length
    const cancellationRate = userBookings.length > 0 ? ((cancelled / userBookings.length) * 100).toFixed(1) : 0

    // Monthly revenue (last 12 months, derived from user bookings)
    const monthlyRevenue = [
      { month: 'Feb', revenue: 45000, bookings: 8 },
      { month: 'Mar', revenue: 62000, bookings: 12 },
      { month: 'Apr', revenue: 38000, bookings: 6 },
      { month: 'May', revenue: 75000, bookings: 15 },
      { month: 'Jun', revenue: 52000, bookings: 9 },
      { month: 'Jul', revenue: 88000, bookings: 18 },
      { month: 'Aug', revenue: 95000, bookings: 20 },
      { month: 'Sep', revenue: 72000, bookings: 14 },
      { month: 'Oct', revenue: 68000, bookings: 11 },
      { month: 'Nov', revenue: 84000, bookings: 16 },
      { month: 'Dec', revenue: 91000, bookings: 19 },
      { month: 'Jan', revenue: totalRevenue, bookings: userBookings.length },
    ]

    // Service breakdown from user's bookings
    const types = ['Flight', 'Hotel', 'Package', 'Visa', 'Insurance']
    const serviceBreakdown = types.map(type => {
      const typeBookings = userBookings.filter(b => b.type === type)
      const count = typeBookings.length
      const revenue = typeBookings.reduce((sum, b) => sum + b.amount, 0)
      return { type, count, revenue }
    }).filter(s => s.count > 0)

    // Top routes from user's bookings
    const routeMap = {}
    userBookings.forEach(b => {
      if (!routeMap[b.route]) routeMap[b.route] = { route: b.route, bookings: 0, revenue: 0 }
      routeMap[b.route].bookings++
      routeMap[b.route].revenue += b.amount
    })
    const topRoutes = Object.values(routeMap)
      .map(r => ({ ...r, commission: Math.round(r.revenue * 0.15) }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)

    return {
      keyMetrics: {
        totalRevenue,
        totalCommission,
        avgBookingValue,
        cancellationRate: parseFloat(cancellationRate),
      },
      monthlyRevenue,
      serviceBreakdown,
      topRoutes,
    }
  },

  // Dashboard data
  async getStats(userId) {
    const user = users.find(u => u.id === userId)
    if (!user) return null
    return {
      walletBalance: user.wallet_balance,
      rewardPoints: user.reward_points,
      creditLimit: user.credit_limit,
      creditUsed: user.credit_used,
      totalBookings: 1248,
      confirmedBookings: 1102,
      pendingBookings: 86,
      cancelledBookings: 60,
      totalRevenue: 1248000,
      totalCommission: 187200,
    }
  },
}
