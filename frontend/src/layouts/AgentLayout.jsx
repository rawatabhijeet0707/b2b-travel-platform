import { useState, useEffect, useRef } from 'react'
import { Link, Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Plane, Hotel, Package, Stamp, ShieldCheck,
  BookOpen, Users, Wallet, CreditCard, FileText, BarChart3,
  TrendingUp, Headphones, Bell, Settings, LogOut, Menu, X,
  Search, ChevronLeft, ChevronRight, User, DollarSign, Clock,
  Home, ArrowRight
} from 'lucide-react'
import { authService } from '../services/authService.js'

const sidebarGroups = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, to: '/agent/dashboard' },
    ],
  },
  {
    title: 'Booking Services',
    items: [
      { label: 'Flight Booking', icon: Plane, to: '/agent/flights' },
      { label: 'Hotel Booking', icon: Hotel, to: '/agent/hotels' },
      { label: 'Holiday Packages', icon: Package, to: '/agent/packages' },
      { label: 'Visa Services', icon: Stamp, to: '/agent/visa' },
      { label: 'Travel Insurance', icon: ShieldCheck, to: '/agent/insurance' },
    ],
  },
  {
    title: 'Management',
    items: [
      { label: 'Customers', icon: Users, to: '/agent/customers' },
      { label: 'Bookings', icon: BookOpen, to: '/agent/bookings' },
      { label: 'My Bookings', icon: FileText, to: '/agent/my-bookings' },
    ],
  },
  {
    title: 'Finance',
    items: [
      { label: 'My Earnings', icon: DollarSign, to: '/agent/earnings' },
      { label: 'Wallet', icon: Wallet, to: '/agent/wallet' },
      { label: 'Transactions', icon: CreditCard, to: '/agent/transactions' },
    ],
  },
  {
    title: 'Reports & Support',
    items: [
      { label: 'Reports', icon: BarChart3, to: '/agent/reports' },
      { label: 'Support Tickets', icon: Headphones, to: '/agent/support' },
      { label: 'Notifications', icon: Bell, to: '/agent/notifications' },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'Profile', icon: User, to: '/agent/profile' },
      { label: 'Settings', icon: Settings, to: '/agent/settings' },
    ],
  },
]

// Breadcrumb mapping
const breadcrumbMap = {
  '/agent/dashboard': 'Dashboard',
  '/agent/flights': 'Flight Booking',
  '/agent/hotels': 'Hotel Booking',
  '/agent/packages': 'Holiday Packages',
  '/agent/visa': 'Visa Services',
  '/agent/insurance': 'Travel Insurance',
  '/agent/customers': 'Customers',
  '/agent/bookings': 'Bookings',
  '/agent/my-bookings': 'My Bookings',
  '/agent/earnings': 'My Earnings',
  '/agent/wallet': 'Wallet',
  '/agent/transactions': 'Transactions',
  '/agent/reports': 'Reports',
  '/agent/support': 'Support Tickets',
  '/agent/notifications': 'Notifications',
  '/agent/profile': 'Profile',
  '/agent/settings': 'Settings',
}

export default function AgentLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const notifRef = useRef(null)
  const profileRef = useRef(null)

  const user = authService.getStoredUser()

  useEffect(() => {
    const handler = e => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Auth + role check
  const token = localStorage.getItem('token')
  if (!token) return <Navigate to="/" replace />
  if (!user || user.role !== 'agent') {
    if (user?.role === 'admin') return <Navigate to="/admin/dashboard" replace />
    return <Navigate to="/app" replace />
  }

  // JWT expiry check
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      authService.clearAuth()
      return <Navigate to="/" replace />
    }
  } catch {
    authService.clearAuth()
    return <Navigate to="/" replace />
  }

  const handleLogout = () => {
    authService.clearAuth()
    navigate('/', { replace: true })
  }

  const isActive = (to) => location.pathname === to
  const currentBreadcrumb = breadcrumbMap[location.pathname] || 'Dashboard'

  const allItems = sidebarGroups.flatMap(g => g.items)
  const filteredGroups = searchQuery
    ? sidebarGroups.map(g => ({
        ...g,
        items: g.items.filter(i => i.label.toLowerCase().includes(searchQuery.toLowerCase()))
      })).filter(g => g.items.length > 0)
    : sidebarGroups

  const displayName = user?.agency_name || user?.full_name || 'Agent'
  const initials = displayName.charAt(0).toUpperCase()

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Desktop Sidebar */}
      <AnimatePresence initial={false}>
        <motion.aside
          initial={false}
          animate={{ width: collapsed ? 72 : 260 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex fixed left-0 top-0 bottom-0 flex-col bg-white border-r border-slate-200 z-40"
        >
          {/* Logo */}
          <div className="h-16 flex items-center gap-2.5 px-4 border-b border-slate-200 shrink-0">
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-glow shrink-0">
              <Plane className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <p className="text-sm font-extrabold text-heading font-heading">TravelHub</p>
                <p className="text-[10px] text-text-tertiary font-medium">Agent Panel</p>
              </div>
            )}
          </div>

          {/* Search */}
          {!collapsed && (
            <div className="p-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-tertiary" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search menu..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-heading placeholder:text-text-tertiary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>
          )}

          {/* Nav items */}
          <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-4 scrollbar-thin">
            {filteredGroups.map((group, gi) => (
              <div key={gi}>
                {!collapsed && (
                  <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider px-3 mb-1.5">{group.title}</p>
                )}
                <div className="space-y-0.5">
                  {group.items.map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      title={collapsed ? item.label : ''}
                      className={`relative flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all group ${
                        isActive(item.to)
                          ? 'text-white shadow-glow'
                          : 'text-text-secondary hover:text-heading hover:bg-slate-50'
                      }`}
                    >
                      {isActive(item.to) && (
                        <motion.div
                          layoutId="agentSidebarActive"
                          className="absolute inset-0 rounded-xl"
                          style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' }}
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}
                      <item.icon className={`w-4 h-4 shrink-0 relative z-10 ${isActive(item.to) ? 'text-white' : 'group-hover:text-primary'}`} />
                      {!collapsed && <span className="truncate relative z-10">{item.label}</span>}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Collapse toggle */}
          <div className="p-3 border-t border-slate-200">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-text-secondary hover:bg-slate-50 hover:text-heading transition-all text-xs font-medium"
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <><ChevronLeft className="w-4 h-4" /> Collapse</>}
            </button>
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-white z-50 flex flex-col"
            >
              <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-glow">
                    <Plane className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-heading">TravelHub</p>
                    <p className="text-[10px] text-text-tertiary">Agent Panel</p>
                  </div>
                </div>
                <button onClick={() => setMobileOpen(false)} className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center">
                  <X className="w-4 h-4 text-text-secondary" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
                {sidebarGroups.map((group, gi) => (
                  <div key={gi}>
                    <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider px-3 mb-1.5">{group.title}</p>
                    <div className="space-y-0.5">
                      {group.items.map((item) => (
                        <Link
                          key={item.label}
                          to={item.to}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                            isActive(item.to) ? 'text-white gradient-bg shadow-glow' : 'text-text-secondary hover:bg-slate-50'
                          }`}
                        >
                          <item.icon className="w-4 h-4 shrink-0" />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
              <div className="p-3 border-t border-slate-200">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-danger hover:bg-red-50 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${collapsed ? 'lg:ml-[72px]' : 'lg:ml-[260px]'}`}
      >
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center"
            >
              <Menu className="w-5 h-5 text-text-secondary" />
            </button>
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm">
              <Link to="/agent/dashboard" className="text-text-tertiary hover:text-primary transition-colors">
                Agent
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-text-tertiary" />
              <span className="font-semibold text-heading">{currentBreadcrumb}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-200">
              <Search className="w-3.5 h-3.5 text-text-tertiary" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-xs text-heading placeholder:text-text-tertiary focus:outline-none w-40"
              />
            </div>

            {/* Notifications */}
            <div ref={notifRef} className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center transition-all"
              >
                <Bell className="w-4 h-4 text-text-secondary" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-floating border border-slate-200 overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-slate-200">
                      <h4 className="font-bold text-heading">Notifications</h4>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {[
                        { title: 'New Booking Confirmed', desc: 'Flight DEL→DXB confirmed', time: '5 min ago', color: 'bg-emerald-500' },
                        { title: 'Commission Credited', desc: '₹2,850 credited for AG-3401', time: '10 min ago', color: 'bg-primary' },
                        { title: 'Pending Payment', desc: 'Package AG-3399 awaiting payment', time: '1 hour ago', color: 'bg-amber-500' },
                      ].map((n, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 hover:bg-slate-50 transition-colors border-b border-slate-100">
                          <div className={`w-2 h-2 rounded-full ${n.color} mt-1.5 shrink-0`} />
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-heading">{n.title}</p>
                            <p className="text-xs text-text-secondary">{n.desc}</p>
                            <p className="text-xs text-text-tertiary mt-1">{n.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link to="/agent/notifications" onClick={() => setNotifOpen(false)} className="block w-full p-3 text-sm font-semibold text-primary hover:bg-slate-50 transition-colors text-center">
                      View All Notifications
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile */}
            <div ref={profileRef} className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center text-white text-xs font-bold shrink-0">
                {initials}
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-bold text-heading">{displayName}</p>
                <p className="text-[10px] text-text-tertiary">Agent</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-8 h-8 rounded-xl hover:bg-red-50 flex items-center justify-center text-text-secondary hover:text-red-500 transition-all"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
