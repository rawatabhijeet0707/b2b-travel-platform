import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp, TrendingDown, Download, Plane, Hotel, Package, Stamp,
  Loader2, ArrowUpRight, DollarSign, ShoppingCart, Clock, CheckCircle2,
  XCircle, Calendar, BarChart3, Wallet, Award, Target,
} from 'lucide-react'
import AnimatedCounter from '../../components/ui/AnimatedCounter.jsx'
import AnimatedBlobs from '../../components/ui/AnimatedBlobs.jsx'
import { dashboardService } from '../../services/authService.js'

const serviceIcon = {
  Flight: Plane,
  Hotel: Hotel,
  Package: Package,
  Visa: Stamp,
  Insurance: Stamp,
}

const serviceColor = {
  Flight: 'bg-blue-500',
  Hotel: 'bg-cyan-500',
  Package: 'bg-emerald-500',
  Visa: 'bg-amber-500',
  Insurance: 'bg-rose-500',
}

const formatAmount = (amt) => {
  if (typeof amt === 'number') return `₹${amt.toLocaleString('en-IN')}`
  return amt
}

const formatLakh = (v) => {
  if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`
  return `₹${v.toLocaleString('en-IN')}`
}

export default function ReportsPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    dashboardService.getReports()
      .then((d) => {
        setData(d)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || 'Failed to load reports')
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="relative p-4 sm:p-6 lg:p-8 space-y-6 gradient-mesh min-h-screen flex items-center justify-center">
        <AnimatedBlobs />
        <div className="relative flex items-center">
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
          <span className="ml-2 text-sm text-text-secondary">Loading your reports...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="relative p-4 sm:p-6 lg:p-8 space-y-6 gradient-mesh min-h-screen flex items-center justify-center">
        <AnimatedBlobs />
        <span className="relative text-sm text-red-500">{error}</span>
      </div>
    )
  }

  const keyMetrics = data?.keyMetrics || {}
  const monthlyRevenue = data?.monthlyRevenue || []
  const serviceBreakdown = data?.serviceBreakdown || []
  const topRoutes = data?.topRoutes || []

  const max = Math.max(...monthlyRevenue.map(m => m.revenue), 1)
  const maxBookings = Math.max(...monthlyRevenue.map(m => m.bookings || 0), 1)
  const totalServiceCount = serviceBreakdown.reduce((sum, s) => sum + s.count, 0) || 1
  const totalServiceRevenue = serviceBreakdown.reduce((sum, s) => sum + s.revenue, 0) || 1

  return (
    <div className="relative p-4 sm:p-6 lg:p-8 space-y-6 gradient-mesh min-h-screen">
      <AnimatedBlobs />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-heading font-heading tracking-tight">Reports & Analytics</h1>
          <p className="text-text-secondary mt-1">Track your business performance with detailed insights.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white gradient-bg rounded-xl shadow-glow"
        >
          <Download className="w-4 h-4" /> Export Report
        </motion.button>
      </motion.div>

      {/* Key Metrics - 6 Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[
          { label: 'Total Revenue', value: keyMetrics.totalRevenue || 0, prefix: '₹', change: '+18.2%', trend: 'up', icon: DollarSign, color: 'bg-gradient-to-br from-blue-500 to-blue-600' },
          { label: 'Commission', value: keyMetrics.totalCommission || 0, prefix: '₹', change: '+12.5%', trend: 'up', icon: TrendingUp, color: 'bg-gradient-to-br from-emerald-500 to-emerald-600' },
          { label: 'Avg. Booking', value: keyMetrics.avgBookingValue || 0, prefix: '₹', change: '+3.8%', trend: 'up', icon: BarChart3, color: 'bg-gradient-to-br from-cyan-500 to-cyan-600' },
          { label: 'Cancellation', value: keyMetrics.cancellationRate || 0, suffix: '%', change: '-1.2%', trend: 'down', icon: XCircle, color: 'bg-gradient-to-br from-red-500 to-rose-500' },
          { label: 'Total Bookings', value: monthlyRevenue.reduce((sum, m) => sum + (m.bookings || 0), 0), change: '+8.4%', trend: 'up', icon: ShoppingCart, color: 'bg-gradient-to-br from-violet-500 to-purple-500' },
          { label: 'Growth Rate', value: 18, suffix: '%', change: '+5.1%', trend: 'up', icon: Target, color: 'bg-gradient-to-br from-amber-500 to-orange-500' },
        ].map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-strong rounded-card p-5 shadow-card"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${m.color} mb-3`}>
              <m.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs text-text-secondary font-medium mb-0.5">{m.label}</p>
            <p className="text-xl font-extrabold text-heading tabular-nums">
              {m.prefix}<AnimatedCounter value={m.value} suffix={m.suffix || ''} />
            </p>
            <span className={`inline-flex items-center gap-1 text-xs font-bold mt-2 ${m.trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
              {m.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {m.change}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Revenue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass-strong rounded-card p-6 shadow-card"
        >
          <h3 className="text-lg font-bold text-heading font-heading mb-1">Monthly Revenue</h3>
          <p className="text-sm text-text-secondary mb-6">Revenue trend over the last 12 months</p>
          <div className="flex items-end justify-between gap-2 h-56">
            {monthlyRevenue.map((m, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="relative w-full flex items-end justify-center h-full">
                  <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-heading font-heading bg-card px-2 py-1 rounded shadow-soft whitespace-nowrap z-10">
                    ₹{Math.round(m.revenue / 1000)}K
                  </div>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(m.revenue / max) * 100}%` }}
                    transition={{ delay: 0.4 + i * 0.05, duration: 0.5 }}
                    className="w-full max-w-[32px] gradient-bg rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer"
                  />
                </div>
                <span className="text-xs text-text-secondary font-medium">{m.month}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Service Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-strong rounded-card p-6 shadow-card"
        >
          <h3 className="text-lg font-bold text-heading font-heading mb-1">Service Breakdown</h3>
          <p className="text-sm text-text-secondary mb-6">Bookings by service type</p>
          <div className="space-y-4">
            {serviceBreakdown.map((s, i) => {
              const Icon = serviceIcon[s.type] || Package
              const percent = Math.round((s.count / totalServiceCount) * 100)
              return (
                <div key={s.type}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-text-secondary" />
                      <span className="text-sm font-medium text-heading">{s.type}s</span>
                    </div>
                    <span className="text-sm font-bold text-heading font-heading">{percent}%</span>
                  </div>
                  <div className="h-2.5 bg-slate-200/70 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                      className={`h-full ${serviceColor[s.type] || 'bg-primary'} rounded-full`}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Top Routes Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-strong rounded-card shadow-card overflow-hidden"
      >
        <div className="p-6 border-b border-border/60 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-heading font-heading">Top Performing Routes</h3>
            <p className="text-sm text-text-secondary mt-0.5">Best performing routes by revenue and bookings</p>
          </div>
          <ArrowUpRight className="w-5 h-5 text-text-secondary" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/60 bg-slate-100/60">
                <th className="text-left text-xs font-bold text-text-secondary uppercase tracking-wide px-6 py-3">Route</th>
                <th className="text-left text-xs font-bold text-text-secondary uppercase tracking-wide px-6 py-3 hidden sm:table-cell">Bookings</th>
                <th className="text-right text-xs font-bold text-text-secondary uppercase tracking-wide px-6 py-3">Revenue</th>
                <th className="text-right text-xs font-bold text-text-secondary uppercase tracking-wide px-6 py-3 hidden sm:table-cell">Commission</th>
                <th className="text-center text-xs font-bold text-text-secondary uppercase tracking-wide px-6 py-3">Growth</th>
              </tr>
            </thead>
            <tbody>
              {topRoutes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-text-secondary">No route data available yet.</td>
                </tr>
              ) : topRoutes.map((r) => (
                <tr key={r.route} className="border-b border-border/40 hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-heading font-heading">{r.route}</td>
                  <td className="px-6 py-4 text-sm text-text hidden sm:table-cell">{r.bookings}</td>
                  <td className="px-6 py-4 text-sm font-bold text-heading font-heading text-right">{formatAmount(r.revenue)}</td>
                  <td className="px-6 py-4 text-sm text-success font-semibold text-right hidden sm:table-cell">{formatAmount(r.commission)}</td>
                  <td className="px-6 py-4 text-center"><span className="text-sm font-bold text-success">+{Math.round(r.commission / r.revenue * 100)}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
