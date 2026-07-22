// Agent-specific mock data (separate from existing mockDb and adminMockDb)

const agentCustomers = [
  { id: 1, name: 'Rajesh Kumar', email: 'rajesh@gmail.com', mobile: '9876501234', bookings: 12, totalSpent: 185000, status: 'active', created_at: '2024-01-15' },
  { id: 2, name: 'Priya Sharma', email: 'priya@gmail.com', mobile: '9876501235', bookings: 8, totalSpent: 142000, status: 'active', created_at: '2024-02-20' },
  { id: 3, name: 'Mohammed Ali', email: 'mohammed@gmail.com', mobile: '9876501236', bookings: 15, totalSpent: 320000, status: 'active', created_at: '2024-01-08' },
  { id: 4, name: 'Anita Desai', email: 'anita@gmail.com', mobile: '9876501237', bookings: 5, totalSpent: 68000, status: 'active', created_at: '2024-03-12' },
  { id: 5, name: 'Vikram Singh', email: 'vikram@gmail.com', mobile: '9876501238', bookings: 22, totalSpent: 450000, status: 'vip', created_at: '2023-11-05' },
  { id: 6, name: 'Sneha Patel', email: 'sneha@gmail.com', mobile: '9876501239', bookings: 3, totalSpent: 42000, status: 'active', created_at: '2024-04-18' },
  { id: 7, name: 'Arjun Mehta', email: 'arjun@gmail.com', mobile: '9876501240', bookings: 9, totalSpent: 156000, status: 'active', created_at: '2024-02-01' },
  { id: 8, name: 'Kavya Reddy', email: 'kavya@gmail.com', mobile: '9876501241', bookings: 7, totalSpent: 198000, status: 'active', created_at: '2024-03-22' },
]

const agentBookings = [
  { id: 'AG-3401', agent_id: 2, type: 'Flight', customer: 'Rajesh Kumar', route: 'DEL → DXB', date: '2025-07-21', amount: 18999, commission: 2850, status: 'confirmed', payment: 'paid' },
  { id: 'AG-3400', agent_id: 2, type: 'Hotel', customer: 'Priya Sharma', route: 'Dubai Marina - 3N', date: '2025-07-20', amount: 8500, commission: 1275, status: 'confirmed', payment: 'paid' },
  { id: 'AG-3399', agent_id: 2, type: 'Package', customer: 'Mohammed Ali', route: 'Bali Tour 5N/6D', date: '2025-07-20', amount: 24999, commission: 3750, status: 'pending', payment: 'pending' },
  { id: 'AG-3398', agent_id: 2, type: 'Visa', customer: 'Anita Desai', route: 'Singapore Visa', date: '2025-07-19', amount: 3500, commission: 525, status: 'processing', payment: 'paid' },
  { id: 'AG-3397', agent_id: 2, type: 'Insurance', customer: 'Vikram Singh', route: 'Travel Cover Premium', date: '2025-07-18', amount: 1200, commission: 180, status: 'confirmed', payment: 'paid' },
  { id: 'AG-3396', agent_id: 2, type: 'Flight', customer: 'Sneha Patel', route: 'BOM → SIN', date: '2025-07-17', amount: 22500, commission: 3375, status: 'cancelled', payment: 'refunded' },
  { id: 'AG-3395', agent_id: 2, type: 'Hotel', customer: 'Arjun Mehta', route: 'Goa - 2N', date: '2025-07-16', amount: 6500, commission: 975, status: 'confirmed', payment: 'paid' },
  { id: 'AG-3394', agent_id: 2, type: 'Package', customer: 'Kavya Reddy', route: 'Maldives 4N/5D', date: '2025-07-15', amount: 35999, commission: 5400, status: 'confirmed', payment: 'paid' },
  { id: 'AG-3393', agent_id: 2, type: 'Flight', customer: 'Rajesh Kumar', route: 'DEL → BKK', date: '2025-07-14', amount: 15500, commission: 2325, status: 'confirmed', payment: 'paid' },
  { id: 'AG-3392', agent_id: 2, type: 'Visa', customer: 'Priya Sharma', route: 'UAE Tourist Visa', date: '2025-07-13', amount: 4500, commission: 675, status: 'confirmed', payment: 'paid' },
]

const agentTransactions = [
  { id: 'TXN-5001', agent_id: 2, type: 'credit', amount: 2850, description: 'Commission - Flight DEL→DXB', reference: 'AG-3401', balance_after: 54250, created_at: '2025-07-21T10:30:00' },
  { id: 'TXN-5002', agent_id: 2, type: 'credit', amount: 1275, description: 'Commission - Hotel Dubai Marina', reference: 'AG-3400', balance_after: 55525, created_at: '2025-07-20T14:15:00' },
  { id: 'TXN-5003', agent_id: 2, type: 'debit', amount: 10000, description: 'Wallet withdrawal to bank', reference: 'WD-210', balance_after: 45525, created_at: '2025-07-19T09:00:00' },
  { id: 'TXN-5004', agent_id: 2, type: 'credit', amount: 525, description: 'Commission - Visa Singapore', reference: 'AG-3398', balance_after: 46050, created_at: '2025-07-19T16:45:00' },
  { id: 'TXN-5005', agent_id: 2, type: 'credit', amount: 180, description: 'Commission - Insurance Premium', reference: 'AG-3397', balance_after: 46230, created_at: '2025-07-18T11:20:00' },
  { id: 'TXN-5006', agent_id: 2, type: 'credit', amount: 5400, description: 'Commission - Package Maldives', reference: 'AG-3394', balance_after: 51630, created_at: '2025-07-15T12:00:00' },
  { id: 'TXN-5007', agent_id: 2, type: 'credit', amount: 2325, description: 'Commission - Flight DEL→BKK', reference: 'AG-3393', balance_after: 53955, created_at: '2025-07-14T08:00:00' },
  { id: 'TXN-5008', agent_id: 2, type: 'debit', amount: 5000, description: 'Wallet withdrawal to bank', reference: 'WD-209', balance_after: 48955, created_at: '2025-07-12T15:30:00' },
]

const agentNotifications = [
  { id: 1, title: 'New Booking Confirmed', desc: 'Flight DEL→DXB booking confirmed for Rajesh Kumar', time: '5 min ago', color: 'bg-emerald-500', read: false, type: 'booking' },
  { id: 2, title: 'Commission Credited', desc: '₹2,850 commission credited for AG-3401', time: '10 min ago', color: 'bg-primary', read: false, type: 'payment' },
  { id: 3, title: 'Pending Payment', desc: 'Package booking AG-3399 awaiting payment', time: '1 hour ago', color: 'bg-amber-500', read: false, type: 'payment' },
  { id: 4, title: 'New Customer Registered', desc: 'Kavya Reddy added as a new customer', time: '3 hours ago', color: 'bg-cyan-500', read: true, type: 'customer' },
  { id: 5, title: 'Visa Processing Update', desc: 'Singapore visa for Anita Desai is under processing', time: '5 hours ago', color: 'bg-violet-500', read: true, type: 'visa' },
  { id: 6, title: 'Weekly Report Available', desc: 'Your weekly performance report is ready to view', time: '1 day ago', color: 'bg-slate-500', read: true, type: 'report' },
]

const agentEarnings = {
  totalCommission: 187200,
  thisMonthCommission: 28560,
  lastMonthCommission: 24800,
  pendingCommission: 3750,
  availableForWithdrawal: 51630,
  totalWithdrawn: 135000,
  commissionHistory: [
    { month: 'Feb', commission: 18500, bookings: 32 },
    { month: 'Mar', commission: 22300, bookings: 41 },
    { month: 'Apr', commission: 19800, bookings: 36 },
    { month: 'May', commission: 26100, bookings: 48 },
    { month: 'Jun', commission: 24800, bookings: 45 },
    { month: 'Jul', commission: 28560, bookings: 52 },
  ],
  serviceWiseCommission: [
    { service: 'Flight', commission: 84200, count: 142 },
    { service: 'Hotel', commission: 38600, count: 86 },
    { service: 'Package', commission: 45200, count: 24 },
    { service: 'Visa', commission: 12600, count: 38 },
    { service: 'Insurance', commission: 6600, count: 28 },
  ],
}

const agentReports = {
  keyMetrics: {
    totalRevenue: 1248000,
    totalCommission: 187200,
    avgBookingValue: 14976,
    cancellationRate: 4.2,
    conversionRate: 68.5,
    repeatCustomerRate: 42.3,
  },
  monthlyPerformance: [
    { month: 'Feb', revenue: 124000, commission: 18600, bookings: 32 },
    { month: 'Mar', revenue: 149000, commission: 22350, bookings: 41 },
    { month: 'Apr', revenue: 132000, commission: 19800, bookings: 36 },
    { month: 'May', revenue: 174000, commission: 26100, bookings: 48 },
    { month: 'Jun', revenue: 165000, commission: 24750, bookings: 45 },
    { month: 'Jul', revenue: 190000, commission: 28500, bookings: 52 },
  ],
  serviceBreakdown: [
    { type: 'Flight', count: 142, revenue: 564000, percentage: 45 },
    { type: 'Hotel', count: 86, revenue: 258000, percentage: 21 },
    { type: 'Package', count: 24, revenue: 302000, percentage: 24 },
    { type: 'Visa', count: 38, revenue: 76000, percentage: 6 },
    { type: 'Insurance', count: 28, revenue: 48000, percentage: 4 },
  ],
  topCustomers: [
    { name: 'Vikram Singh', bookings: 22, revenue: 450000, commission: 67500 },
    { name: 'Mohammed Ali', bookings: 15, revenue: 320000, commission: 48000 },
    { name: 'Rajesh Kumar', bookings: 12, revenue: 185000, commission: 27750 },
    { name: 'Kavya Reddy', bookings: 7, revenue: 198000, commission: 29700 },
    { name: 'Priya Sharma', bookings: 8, revenue: 142000, commission: 21300 },
  ],
}

const agentSettings = {
  notifications: {
    email_alerts: true,
    sms_alerts: true,
    booking_confirmations: true,
    commission_updates: true,
    weekly_reports: true,
    promotional_offers: false,
  },
  preferences: {
    currency: 'INR',
    language: 'en',
    timezone: 'Asia/Kolkata',
    default_service: 'flight',
  },
  security: {
    two_factor_enabled: true,
    login_alerts: true,
    session_timeout: '30',
  },
}

export const agentMockDb = {
  // Dashboard stats
  async getDashboardStats(agentId) {
    const todayBookings = agentBookings.filter(b => b.agent_id === agentId && b.date === '2025-07-21').length
    const confirmed = agentBookings.filter(b => b.agent_id === agentId && b.status === 'confirmed').length
    const pending = agentBookings.filter(b => b.agent_id === agentId && b.status === 'pending').length
    const cancelled = agentBookings.filter(b => b.agent_id === agentId && b.status === 'cancelled').length
    const totalRevenue = agentBookings.filter(b => b.agent_id === agentId && b.status === 'confirmed').reduce((s, b) => s + b.amount, 0)
    const totalCommission = agentBookings.filter(b => b.agent_id === agentId && b.status === 'confirmed').reduce((s, b) => s + b.commission, 0)

    return {
      totalBookings: agentBookings.filter(b => b.agent_id === agentId).length,
      todayBookings,
      pendingBookings: pending,
      confirmedBookings: confirmed,
      cancelledBookings: cancelled,
      totalCustomers: agentCustomers.length,
      totalRevenue,
      totalCommission,
      commissionEarned: agentEarnings.totalCommission,
      walletBalance: agentEarnings.availableForWithdrawal,
      recentBookings: agentBookings.filter(b => b.agent_id === agentId).slice(0, 5),
      latestCustomers: agentCustomers.slice(0, 4),
      notifications: agentNotifications.filter(n => !n.read).slice(0, 3),
      performanceChart: agentEarnings.commissionHistory,
      serviceBreakdown: agentReports.serviceBreakdown,
    }
  },

  // Bookings
  async getBookings(agentId, filters = {}) {
    let result = agentBookings.filter(b => b.agent_id === agentId)
    if (filters.type) result = result.filter(b => b.type === filters.type)
    if (filters.status) result = result.filter(b => b.status === filters.status)
    if (filters.search) {
      const s = filters.search.toLowerCase()
      result = result.filter(b => b.id.toLowerCase().includes(s) || b.customer.toLowerCase().includes(s))
    }
    return { data: result, total: result.length }
  },

  async getMyBookings(agentId, page = 1, limit = 10) {
    const result = agentBookings.filter(b => b.agent_id === agentId)
    const offset = (page - 1) * limit
    const paged = result.slice(offset, offset + limit)
    return {
      bookings: paged,
      pagination: { page, limit, total: result.length, totalPages: Math.ceil(result.length / limit) },
    }
  },

  // Customers
  async getCustomers(agentId, filters = {}) {
    let result = [...agentCustomers]
    if (filters.status) result = result.filter(c => c.status === filters.status)
    if (filters.search) {
      const s = filters.search.toLowerCase()
      result = result.filter(c => c.name.toLowerCase().includes(s) || c.email.toLowerCase().includes(s))
    }
    return { data: result, total: result.length }
  },

  // Earnings
  async getEarnings(agentId) {
    return agentEarnings
  },

  // Wallet
  async getWallet(agentId) {
    return {
      balance: agentEarnings.availableForWithdrawal,
      pendingCommission: agentEarnings.pendingCommission,
      totalEarned: agentEarnings.totalCommission,
      totalWithdrawn: agentEarnings.totalWithdrawn,
    }
  },

  // Transactions
  async getTransactions(agentId, page = 1, limit = 20) {
    const result = agentTransactions.filter(t => t.agent_id === agentId)
    const offset = (page - 1) * limit
    const paged = result.slice(offset, offset + limit)
    return {
      transactions: paged,
      pagination: { page, limit, total: result.length, totalPages: Math.ceil(result.length / limit) },
    }
  },

  // Reports
  async getReports(agentId) {
    return agentReports
  },

  // Tickets
  async getTickets(agentId) {
    return {
      data: [
        { id: 'TKT-501', subject: 'Flight refund delay', category: 'Booking', priority: 'high', status: 'open', created_at: '2025-07-20' },
        { id: 'TKT-500', subject: 'Hotel modification request', category: 'Booking', priority: 'medium', status: 'in_progress', created_at: '2025-07-19' },
        { id: 'TKT-499', subject: 'Visa document query', category: 'Visa', priority: 'low', status: 'resolved', created_at: '2025-07-18' },
      ],
      total: 3,
    }
  },

  // Notifications
  async getNotifications(agentId) {
    return { data: agentNotifications, total: agentNotifications.length, unread: agentNotifications.filter(n => !n.read).length }
  },

  // Settings
  async getSettings(agentId) {
    return agentSettings
  },

  async updateSettings(agentId, data) {
    Object.assign(agentSettings, data)
    return agentSettings
  },
}
