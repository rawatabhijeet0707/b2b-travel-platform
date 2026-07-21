import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Wallet, Plane, Hotel,
  Search, Filter,
  Bell, Headphones, Clock,
  Stamp, ShieldCheck, Package, Award, Activity, Loader2,
  TrendingUp, Gift, CreditCard, Calendar, ArrowUpRight, Sparkles,
} from 'lucide-react'
import StatCard from '../../components/ui/StatCard.jsx'
import PremiumBadge from '../../components/ui/PremiumBadge.jsx'
import AnimatedBlobs from '../../components/ui/AnimatedBlobs.jsx'
import { dashboardService } from '../../services/authService.js'

export default function Dashboard() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  const displayName = user?.agency_name || user?.full_name || 'SkyHigh'
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="relative p-4 sm:p-6 lg:p-8 space-y-6 gradient-mesh min-h-screen">
      <AnimatedBlobs />

      {/* ── Hero Welcome Banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-card shadow-premium"
      >
        <div className="absolute inset-0 gradient-bg-animated" />
        <div className="absolute inset-0 bg-noise opacity-[0.03]" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-cyan-300/20 rounded-full blur-3xl animate-float-delayed" />

        <div className="relative p-6 sm:p-8 lg:p-10 text-white">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-semibold text-white border border-white/20">
                  <Calendar className="w-3.5 h-3.5" /> {today}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/20 backdrop-blur-sm text-xs font-semibold text-emerald-100 border border-emerald-300/30">
                  <Activity className="w-3.5 h-3.5" /> Live
                </span>
              </div>
              <h1 className="text-2xl lg:text-4xl font-extrabold font-heading tracking-tight leading-tight">
                Welcome back, {displayName}! <span className="inline-block animate-bounce-soft">{"\u{1F44B}"}</span>
              </h1>
              <p className="text-white/70 mt-2 text-sm lg:text-base">Here's what's happening with your business today.</p>
            </div>

            {/* Hero mini-stats */}
            <div className="grid grid-cols-2 gap-3 w-full lg:w-auto">
              {[
                { icon: Wallet, label: 'Wallet', value: '₹2.48L' },
                { icon: Award, label: 'Points', value: '45.2K' },
              ].map((stat) => (
                <div key={stat.label} className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center min-w-[90px]">
                  <stat.icon className="w-4 h-4 mx-auto mb-1.5 text-white/80" />
                  <p className="text-lg font-extrabold font-heading leading-none">{stat.value}</p>
                  <p className="text-[10px] text-white/60 mt-1 uppercase tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Stat Cards Row ── */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Wallet} label="Wallet Balance" value="2,48,500" change="12.5%" trend="up" color="primary" delay={0.05} prefix="₹" />
        <StatCard icon={Gift} label="Reward Points" value="45,200" change="8.2%" trend="up" color="accent" delay={0.1} />
        <StatCard icon={CreditCard} label="Credit Available" value="35,000" change="₹15K used" trend="up" color="success" delay={0.15} prefix="₹" />
        <StatCard icon={Package} label="Total Bookings" value="1,248" change="3.1%" trend="up" color="warning" delay={0.2} />
      </div>

      {/* ── Quick Actions Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="relative glass-strong rounded-card p-5 shadow-card"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-bold text-heading font-heading uppercase tracking-wide">Quick Actions</h3>
        </div>
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
          {[
            { icon: Plane, label: 'Book Flight', color: 'from-blue-500 to-cyan-500' },
            { icon: Hotel, label: 'Book Hotel', color: 'from-violet-500 to-purple-500' },
            { icon: Stamp, label: 'Apply Visa', color: 'from-orange-500 to-red-500' },
            { icon: ShieldCheck, label: 'Insurance', color: 'from-emerald-500 to-teal-500' },
            { icon: Package, label: 'Packages', color: 'from-indigo-500 to-blue-500' },
            { icon: Wallet, label: 'Add Funds', color: 'from-amber-500 to-orange-500' },
          ].map((action) => (
            <motion.button
              key={action.label}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/40 border border-white/50 hover:shadow-floating transition-all min-w-[110px]"
            >
              <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform`}>
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-semibold text-heading">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ── Recent Bookings + Top Destinations ── */}
      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass-strong rounded-card shadow-card overflow-hidden"
        >
          <div className="p-6 border-b border-border/40 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-heading font-heading">Recent Bookings</h3>
              <p className="text-sm text-text-secondary">Latest transactions and their status</p>
            </div>
            <div className="flex gap-2">
              <button className="w-9 h-9 rounded-xl bg-white/40 flex items-center justify-center hover:bg-white/60 transition-colors">
                <Search className="w-4 h-4 text-text-secondary" />
              </button>
              <button className="w-9 h-9 rounded-xl bg-white/40 flex items-center justify-center hover:bg-white/60 transition-colors">
                <Filter className="w-4 h-4 text-text-secondary" />
              </button>
            </div>
          </div>
          <BookingsTable />
        </motion.div>

        {/* Top Destinations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-strong rounded-card p-6 shadow-card"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-heading font-heading">Top Destinations</h3>
            <ArrowUpRight className="w-5 h-5 text-text-secondary" />
          </div>
          <div className="space-y-4">
            {[
              { name: 'Dubai', bookings: 142, gradient: 'from-orange-400 to-red-500', percent: 85, emoji: '🇦🇪' },
              { name: 'Singapore', bookings: 98, gradient: 'from-emerald-400 to-teal-500', percent: 65, emoji: '🇸🇬' },
              { name: 'Bali', bookings: 76, gradient: 'from-violet-400 to-purple-500', percent: 52, emoji: '🇮🇩' },
              { name: 'Thailand', bookings: 64, gradient: 'from-blue-400 to-cyan-500', percent: 45, emoji: '🇹🇭' },
              { name: 'Maldives', bookings: 38, gradient: 'from-sky-400 to-blue-500', percent: 28, emoji: '🇲🇻' },
            ].map((dest, i) => (
              <div key={dest.name} className="group">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${dest.gradient} shadow-soft flex items-center justify-center text-base`}>
                      {dest.emoji}
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-heading block leading-tight">{dest.name}</span>
                      <span className="text-[10px] text-text-tertiary">{dest.bookings} bookings</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-text-secondary tabular-nums">{dest.percent}%</span>
                </div>
                <div className="h-2 bg-slate-200/60 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${dest.percent}%` }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }}
                    className={`h-full bg-gradient-to-r ${dest.gradient} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Bottom Row: Activity + Announcements + Support ── */}
      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="glass-strong rounded-card p-6 shadow-card"
        >
          <h3 className="text-lg font-bold text-heading font-heading mb-5">Recent Activity</h3>
          <div className="relative">
            <div className="absolute left-[18px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/30 via-border to-transparent" />
            <div className="space-y-5">
              {[
                { icon: Plane, text: 'Flight booked: DEL → DXB', time: '5 min ago', color: 'bg-primary/10 text-primary' },
                { icon: Wallet, text: '₹12,500 added to wallet', time: '1 hour ago', color: 'bg-emerald-50 text-emerald-600' },
                { icon: Hotel, text: 'Hotel booked: The Grand Palace', time: '2 hours ago', color: 'bg-cyan-50 text-cyan-600' },
                { icon: Stamp, text: 'Visa application submitted', time: '4 hours ago', color: 'bg-amber-50 text-amber-600' },
                { icon: Award, text: 'Earned 500 reward points', time: '6 hours ago', color: 'bg-sky-50 text-sky-600' },
              ].map((act, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.65 + i * 0.1 }}
                  className="flex items-start gap-3 relative"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ring-4 ring-white/80 z-10 ${act.color}`}>
                    <act.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <p className="text-sm font-medium text-heading truncate">{act.text}</p>
                    <p className="text-xs text-text-tertiary flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> {act.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Announcements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-strong rounded-card p-6 shadow-card"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-heading font-heading">Announcements</h3>
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Bell className="w-4 h-4 text-primary" />
            </div>
          </div>
          <div className="space-y-3">
            {[
              { title: 'New Airline Partnership', desc: 'Now offering Qatar Airways with exclusive B2B rates.', variant: 'success', label: 'New', gradient: 'from-emerald-500 to-teal-500' },
              { title: 'Festive Season Offers', desc: 'Up to 20% extra commission on holiday packages.', variant: 'danger', label: 'Hot', gradient: 'from-orange-500 to-red-500' },
              { title: 'System Maintenance', desc: 'Scheduled maintenance on Jan 20, 2AM-4AM IST.', variant: 'warning', label: 'Info', gradient: 'from-amber-500 to-yellow-500' },
            ].map((ann, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="relative p-4 rounded-2xl bg-white/40 border border-white/50 hover:shadow-card transition-all overflow-hidden"
              >
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${ann.gradient}`} />
                <div className="flex items-start justify-between gap-2 mb-1 pl-2">
                  <h4 className="text-sm font-bold text-heading font-heading">{ann.title}</h4>
                  <PremiumBadge variant={ann.variant}>{ann.label}</PremiumBadge>
                </div>
                <p className="text-xs text-text-secondary pl-2">{ann.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Support Tickets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="glass-strong rounded-card p-6 shadow-card"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-heading font-heading">Support Tickets</h3>
            <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center">
              <Headphones className="w-4 h-4 text-violet-600" />
            </div>
          </div>
          <div className="space-y-3">
            {[
              { id: '#TKT-2401', subject: 'Refund delay for flight', status: 'Open', variant: 'warning' },
              { id: '#TKT-2398', subject: 'Hotel booking modification', status: 'Resolved', variant: 'success' },
              { id: '#TKT-2390', subject: 'Visa document query', status: 'Active', variant: 'primary' },
            ].map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between p-3 rounded-xl bg-white/40 border border-white/50 hover:shadow-card transition-all">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-text-tertiary">{ticket.id}</p>
                  <p className="text-sm font-medium text-heading truncate">{ticket.subject}</p>
                </div>
                <PremiumBadge variant={ticket.variant}>{ticket.status}</PremiumBadge>
              </div>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 py-2.5 text-sm font-semibold text-primary bg-primary/10 rounded-xl hover:text-white hover:bg-primary transition-all"
          >
            View All Tickets
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

function BookingsTable() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    dashboardService.getBookings(1, 5)
      .then((data) => {
        setBookings(data.bookings || [])
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || 'Failed to load bookings')
        setLoading(false)
      })
  }, [])

  const statusVariant = {
    confirmed: 'success',
    pending: 'warning',
    processing: 'primary',
    cancelled: 'danger',
  }

  const typeIcon = {
    Flight: Plane,
    Hotel: Hotel,
    Package: Package,
    Visa: Stamp,
    Insurance: ShieldCheck,
  }

  const formatAmount = (amt) => {
    if (typeof amt === 'number') return `₹${amt.toLocaleString('en-IN')}`
    return amt
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '-'
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
  }

  const formatStatus = (status) => {
    if (!status) return 'Pending'
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
        <span className="ml-2 text-sm text-text-secondary">Loading your bookings...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <span className="text-sm text-red-500">{error}</span>
      </div>
    )
  }

  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Package className="w-10 h-10 text-text-tertiary mb-2" />
        <span className="text-sm text-text-secondary">No bookings yet. Start booking to see them here.</span>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border/40 bg-white/20">
            <th className="text-left text-xs font-bold text-text-secondary uppercase tracking-wide px-6 py-3">Booking ID</th>
            <th className="text-left text-xs font-bold text-text-secondary uppercase tracking-wide px-6 py-3">Type</th>
            <th className="text-left text-xs font-bold text-text-secondary uppercase tracking-wide px-6 py-3 hidden sm:table-cell">Customer</th>
            <th className="text-left text-xs font-bold text-text-secondary uppercase tracking-wide px-6 py-3 hidden md:table-cell">Details</th>
            <th className="text-left text-xs font-bold text-text-secondary uppercase tracking-wide px-6 py-3 hidden lg:table-cell">Date</th>
            <th className="text-right text-xs font-bold text-text-secondary uppercase tracking-wide px-6 py-3">Amount</th>
            <th className="text-center text-xs font-bold text-text-secondary uppercase tracking-wide px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, i) => {
            const Icon = typeIcon[b.type] || Package
            return (
              <motion.tr
                key={b.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="border-b border-border/20 hover:bg-white/30 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-bold text-heading font-heading">{b.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-heading">{b.type}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-text hidden sm:table-cell">{b.customer}</td>
                <td className="px-6 py-4 text-sm text-text hidden md:table-cell">{b.route}</td>
                <td className="px-6 py-4 text-sm text-text-secondary hidden lg:table-cell">{formatDate(b.date || b.created_at)}</td>
                <td className="px-6 py-4 text-sm font-bold text-heading font-heading text-right">{formatAmount(b.amount)}</td>
                <td className="px-6 py-4 text-center">
                  <PremiumBadge variant={statusVariant[b.status] || 'warning'}>{formatStatus(b.status)}</PremiumBadge>
                </td>
              </motion.tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
