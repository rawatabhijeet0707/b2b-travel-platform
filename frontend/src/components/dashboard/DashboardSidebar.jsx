import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home, BookOpen, Wallet, Headphones, FileCheck,
  FileText, CreditCard, LogOut, ChevronLeft, ChevronRight, Plane,
  Bell, Settings,
  Search,
} from 'lucide-react'
import { authService } from '../../services/authService.js'

const sidebarGroups = [
  {
    title: 'Overview',
    items: [
      { label: 'Home', icon: Home, to: '/app' },
    ],
  },
  {
    title: 'Management',
    items: [
      { label: 'Bookings', icon: BookOpen, to: '/app/bookings' },
      { label: 'Invoices', icon: FileText, to: '/app/invoices' },
      { label: 'Payments', icon: CreditCard, to: '/app/payments' },
    ],
  },
  {
    title: 'Finance',
    items: [
      { label: 'Wallet', icon: Wallet, to: '/app/wallet' },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'KYC', icon: FileCheck, to: '/app/kyc' },
      { label: 'Notifications', icon: Bell, to: '/app/notifications' },
      { label: 'Support', icon: Headphones, to: '/app/support' },
      { label: 'Settings', icon: Settings, to: '/app/profile' },
    ],
  },
]

export default function DashboardSidebar({ onCollapseChange }) {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (to) => location.pathname === to

  const handleLogout = () => {
    authService.clearAuth()
    navigate('/login', { replace: true })
  }

  const toggleCollapsed = () => {
    const next = !collapsed
    setCollapsed(next)
    if (onCollapseChange) onCollapseChange(next)
  }

  return (
    <>
      <AnimatePresence initial={false}>
        <motion.aside
          initial={false}
          animate={{ width: collapsed ? 72 : 248 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex fixed left-0 top-16 bottom-0 flex-col glass-strong border-r border-white/40 z-40"
        >
          {/* Toggle button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleCollapsed}
            className="absolute -right-3 top-8 w-7 h-7 rounded-full glass-strong border border-white/60 flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-all shadow-card z-10"
          >
            {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </motion.button>

          {/* Nav items */}
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-4">
            {sidebarGroups.map((group, gi) => (
              <div key={gi}>
                {!collapsed && (
                  <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider px-3 mb-1.5">{group.title}</p>
                )}
                <div className="space-y-1">
                  {group.items.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (gi * 0.1) + (i * 0.03) }}
                    >
                      <Link
                        to={item.to}
                        className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group ${
                          isActive(item.to)
                            ? 'text-white shadow-glow'
                            : 'text-text-secondary hover:text-heading hover:bg-white/50'
                        }`}
                        title={collapsed ? item.label : ''}
                      >
                        {isActive(item.to) && (
                          <motion.div
                            layoutId="sidebarActive"
                            className="absolute inset-0 rounded-xl"
                            style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' }}
                            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                          />
                        )}
                        <item.icon className={`w-5 h-5 shrink-0 relative z-10 ${isActive(item.to) ? 'text-white' : 'group-hover:text-primary'}`} />
                        {!collapsed && <span className="truncate relative z-10">{item.label}</span>}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Logout at bottom */}
          <div className="p-3 border-t border-white/30">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-danger hover:bg-red-50 transition-all"
              title={collapsed ? 'Logout' : ''}
            >
              <LogOut className="w-5 h-5 shrink-0" />
              {!collapsed && <span>Logout</span>}
            </motion.button>
          </div>
        </motion.aside>
      </AnimatePresence>

      <MobileSidebar />
    </>
  )
}

function MobileSidebar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (to) => location.pathname === to

  const handleLogout = () => {
    authService.clearAuth()
    navigate('/login', { replace: true })
  }

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(true)}
        className="lg:hidden fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full gradient-bg text-white shadow-glow flex items-center justify-center"
      >
        <Plane className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="lg:hidden fixed inset-0 bg-dark/40 backdrop-blur-sm z-50"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 glass-strong border-r border-white/40 z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/30">
                <Link to="/app" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
                  <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-glow">
                    <Plane className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-extrabold text-heading font-heading">
                    my<span className="gradient-text">Partner</span>
                  </span>
                </Link>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setOpen(false)}
                  className="w-9 h-9 rounded-xl hover:bg-white/40 flex items-center justify-center text-text"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
              </div>

              <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-4">
                {sidebarGroups.map((group, gi) => (
                  <div key={gi}>
                    <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider px-3 mb-1.5">{group.title}</p>
                    <div className="space-y-1">
                      {group.items.map((item, i) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (gi * 0.1) + (i * 0.03) }}
                        >
                          <Link
                            to={item.to}
                            onClick={() => setOpen(false)}
                            className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                              isActive(item.to) ? 'text-white shadow-glow' : 'text-text-secondary hover:text-heading hover:bg-white/50'
                            }`}
                          >
                            {isActive(item.to) && (
                              <div className="absolute inset-0 rounded-xl gradient-bg" />
                            )}
                            <item.icon className={`w-5 h-5 shrink-0 relative z-10 ${isActive(item.to) ? 'text-white' : ''}`} />
                            <span className="relative z-10">{item.label}</span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>

              <div className="p-3 border-t border-white/30">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-danger hover:bg-red-50 transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
