import { useState, useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Users, UserCog, Shield, BookOpen, Plane, Hotel, Stamp,
  ShieldCheck, Package, Wallet, CreditCard, FileText, Tag, Gift, Image,
  FileEdit, MessageSquare, Bot, BarChart3, TrendingUp, Percent, FileCheck,
  ScrollText, Settings, LogOut, Menu, X, Bell, Search, ChevronLeft, ChevronRight,
  Globe, Headphones, Mail, Database
} from 'lucide-react'
import { adminService } from '../services/adminService.js'

const sidebarGroups = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, to: '/admin/dashboard' },
    ],
  },
  {
    title: 'Management',
    items: [
      { label: 'Users', icon: Users, to: '/admin/users' },
      { label: 'Agents', icon: UserCog, to: '/admin/agents' },
      { label: 'Staff', icon: Shield, to: '/admin/staff' },
      { label: 'Roles', icon: Shield, to: '/admin/roles' },
      { label: 'Bookings', icon: BookOpen, to: '/admin/bookings' },
    ],
  },
  {
    title: 'Travel Services',
    items: [
      { label: 'Flights', icon: Plane, to: '/admin/flights' },
      { label: 'Hotels', icon: Hotel, to: '/admin/hotels' },
      { label: 'Visa', icon: Stamp, to: '/admin/visa' },
      { label: 'Insurance', icon: ShieldCheck, to: '/admin/insurance' },
      { label: 'Packages', icon: Package, to: '/admin/packages' },
    ],
  },
  {
    title: 'Finance',
    items: [
      { label: 'Wallet', icon: Wallet, to: '/admin/wallet' },
      { label: 'Transactions', icon: CreditCard, to: '/admin/transactions' },
      { label: 'Invoices', icon: FileText, to: '/admin/invoices' },
      { label: 'Payments', icon: CreditCard, to: '/admin/payments' },
    ],
  },
  {
    title: 'Marketing',
    items: [
      { label: 'Coupons', icon: Tag, to: '/admin/coupons' },
      { label: 'Offers', icon: Gift, to: '/admin/offers' },
      { label: 'Promotions', icon: Percent, to: '/admin/promotions' },
    ],
  },
  {
    title: 'Content',
    items: [
      { label: 'CMS', icon: FileEdit, to: '/admin/cms' },
      { label: 'Blogs', icon: FileText, to: '/admin/blogs' },
      { label: 'Testimonials', icon: MessageSquare, to: '/admin/testimonials' },
      { label: 'FAQ', icon: MessageSquare, to: '/admin/faq' },
      { label: 'Newsletter', icon: Mail, to: '/admin/newsletter' },
    ],
  },
  {
    title: 'Support & AI',
    items: [
      { label: 'Notifications', icon: Bell, to: '/admin/notifications' },
      { label: 'Support Tickets', icon: Headphones, to: '/admin/tickets' },
      { label: 'Chatbot', icon: Bot, to: '/admin/chatbot' },
      { label: 'AI Settings', icon: Bot, to: '/admin/ai-settings' },
    ],
  },
  {
    title: 'Reports',
    items: [
      { label: 'Reports', icon: BarChart3, to: '/admin/reports' },
      { label: 'Analytics', icon: TrendingUp, to: '/admin/analytics' },
      { label: 'Revenue', icon: TrendingUp, to: '/admin/revenue' },
      { label: 'Commission', icon: Percent, to: '/admin/commission' },
    ],
  },
  {
    title: 'Compliance',
    items: [
      { label: 'KYC', icon: FileCheck, to: '/admin/kyc' },
      { label: 'Documents', icon: FileText, to: '/admin/documents' },
      { label: 'Audit Logs', icon: ScrollText, to: '/admin/audit-logs' },
    ],
  },
  {
    title: 'System',
    items: [
      { label: 'Settings', icon: Settings, to: '/admin/settings' },
      { label: 'System Config', icon: Database, to: '/admin/system-config' },
      { label: 'API Config', icon: Globe, to: '/admin/api-config' },
      { label: 'SMTP', icon: Mail, to: '/admin/smtp' },
      { label: 'Payment Gateway', icon: CreditCard, to: '/admin/payment-gateway' },
    ],
  },
]

export default function AdminLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const admin = adminService.getUser()

  if (!adminService.isAuthenticated()) {
    return <Navigate to="/admin" replace />
  }

  const handleLogout = () => {
    adminService.logout()
  }

  const isActive = (to) => location.pathname === to

  // Flatten all items for search
  const allItems = sidebarGroups.flatMap(g => g.items)
  const filteredGroups = searchQuery
    ? sidebarGroups.map(g => ({
        ...g,
        items: g.items.filter(i => i.label.toLowerCase().includes(searchQuery.toLowerCase()))
      })).filter(g => g.items.length > 0)
    : sidebarGroups

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
              <Shield className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <p className="text-sm font-extrabold text-heading font-heading">TravelHub</p>
                <p className="text-[10px] text-text-tertiary font-medium">Admin Panel</p>
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
                          layoutId="adminSidebarActive"
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
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-heading">TravelHub</p>
                    <p className="text-[10px] text-text-tertiary">Admin Panel</p>
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
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div
        className="transition-all duration-300"
        style={{ marginLeft: window.innerWidth >= 1024 ? (collapsed ? 72 : 260) : 0 }}
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
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-200">
              <Search className="w-3.5 h-3.5 text-text-tertiary" />
              <input
                type="text"
                placeholder="Search anything..."
                className="bg-transparent text-xs text-heading placeholder:text-text-tertiary focus:outline-none w-48"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center transition-all">
              <Bell className="w-4 h-4 text-text-secondary" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
            </button>
            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center text-white text-xs font-bold shrink-0">
                {admin?.full_name?.charAt(0) || 'A'}
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-bold text-heading">{admin?.full_name || 'Admin'}</p>
                <p className="text-[10px] text-text-tertiary">{admin?.role?.display_name || 'Super Admin'}</p>
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
