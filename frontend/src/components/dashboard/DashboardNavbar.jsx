import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plane, Hotel, ShieldCheck, Stamp, Package, Wallet, BookOpen, BarChart3,
  Headphones, Bell, ChevronDown, LogOut, User, Settings, Menu, X, Search,
  FileCheck, FileText, CreditCard, Home
} from 'lucide-react'
import { authService } from '../../services/authService.js'

const navItems = [
  { label: 'Flights', icon: Plane, to: '/app/flights' },
  { label: 'Hotels', icon: Hotel, to: '/app/hotels' },
  { label: 'Insurance', icon: ShieldCheck, to: '/app/insurance' },
  { label: 'Visa', icon: Stamp, to: '/app/visa' },
  { label: 'Packages', icon: Package, to: '/app/packages' },
]

export default function DashboardNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const profileRef = useRef(null)
  const notifRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
  const user = authService.getUser() || {}

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = e => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    const checkSession = () => {
      const token = localStorage.getItem('token')
      if (!token) { navigate('/login', { replace: true }); return }
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        if (payload.exp && Date.now() >= payload.exp * 1000) {
          authService.clearAuth()
          navigate('/login', { replace: true })
        }
      } catch {
        authService.clearAuth()
        navigate('/login', { replace: true })
      }
    }
    checkSession()
    const interval = setInterval(checkSession, 60000)
    return () => clearInterval(interval)
  }, [navigate])

  const handleLogout = () => {
    authService.clearAuth()
    setProfileOpen(false)
    navigate('/login', { replace: true })
  }

  const isActive = (to) => location.pathname === to

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-strong shadow-card' : 'glass border-b border-white/40'
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/app" className="flex items-center gap-2.5 shrink-0 group">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-glow"
              >
                <Plane className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-lg font-extrabold text-heading hidden sm:block font-heading">
                my<span className="gradient-text">Partner</span>
              </span>
            </Link>

            {/* Center: Desktop Nav */}
            <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-1 bg-white/40 backdrop-blur-xl rounded-2xl p-1 border border-white/60 shadow-soft">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className={`relative flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
                      isActive(item.to) ? 'text-white' : 'text-text-secondary hover:text-heading hover:bg-white/60'
                    }`}
                  >
                    {isActive(item.to) && (
                      <motion.div
                        layoutId="navPill"
                        className="absolute inset-0 rounded-xl shadow-glow"
                        style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' }}
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    <item.icon className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: Notifications, Profile */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Notifications */}
              <div ref={notifRef} className="relative">
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="relative w-10 h-10 rounded-xl hover:bg-white/60 flex items-center justify-center transition-colors"
                >
                  <Bell className="w-5 h-5 text-text" />
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-1.5 right-1.5 w-4 h-4 bg-danger text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                  >3</motion.span>
                </motion.button>
                <AnimatePresence>
                  {notifOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-80 glass-strong rounded-dropdown shadow-floating overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-border/40">
                        <h4 className="font-bold text-heading">Notifications</h4>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {[
                          { title: 'Booking Confirmed', desc: 'Flight DEL→DXB confirmed', time: '2 min ago', color: 'bg-emerald-500' },
                          { title: 'Refund Processed', desc: '₹12,500 credited to wallet', time: '1 hour ago', color: 'bg-primary' },
                          { title: 'New Reward', desc: 'You earned 500 reward points', time: '3 hours ago', color: 'bg-amber-500' },
                        ].map((n, i) => (
                          <div key={i} className="flex items-start gap-3 p-4 hover:bg-white/40 transition-colors border-b border-border/20">
                            <div className={`w-2 h-2 rounded-full ${n.color} mt-1.5 shrink-0`} />
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-heading">{n.title}</p>
                              <p className="text-xs text-text-secondary">{n.desc}</p>
                              <p className="text-xs text-text-tertiary mt-1">{n.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button className="w-full p-3 text-sm font-semibold text-primary hover:bg-white/40 transition-colors">
                        View All Notifications
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile */}
              <div ref={profileRef} className="relative">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-white/60 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-sm shadow-soft">
                    {(user.full_name || user.agency_name || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-semibold text-heading leading-tight">{user.agency_name || user.full_name || 'User'}</p>
                    <p className="text-xs text-text-secondary">{user.role === 'admin' ? 'Admin' : 'Partner'}</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-text-secondary hidden sm:block transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                </motion.button>
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-60 glass-strong rounded-dropdown shadow-floating overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-border/40">
                        <p className="font-bold text-heading">{user.agency_name || user.full_name || 'User'}</p>
                        <p className="text-xs text-text-secondary">{user.email || ''}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${user.kyc_status === 'verified' ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50'}`}>{(user.kyc_status || 'pending').toUpperCase()}</span>
                          {user.role === 'admin' && <span className="px-2 py-0.5 text-[10px] font-bold text-primary bg-primary-50 rounded-full">ADMIN</span>}
                        </div>
                      </div>
                      <div className="p-2">
                        {[
                          { icon: User, label: 'My Profile', to: '/app/profile' },
                          { icon: Wallet, label: 'Wallet & Credits', to: '/app/wallet' },
                          { icon: Settings, label: 'Settings', to: '/app/profile' },
                        ].map((item) => (
                          <Link key={item.label} to={item.to} onClick={() => setProfileOpen(false)}>
                            <div className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-text hover:bg-white/40 hover:text-heading transition-colors text-left cursor-pointer">
                              <item.icon className="w-4 h-4" />
                              {item.label}
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="p-2 border-t border-border/40">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-danger hover:bg-red-50 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile menu button */}
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-10 h-10 rounded-xl hover:bg-white/60 flex items-center justify-center transition-colors"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden glass-strong border-t border-white/40"
            >
              <div className="px-4 py-4 grid grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive(item.to) ? 'text-white gradient-bg shadow-glow' : 'text-text hover:bg-white/40'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
