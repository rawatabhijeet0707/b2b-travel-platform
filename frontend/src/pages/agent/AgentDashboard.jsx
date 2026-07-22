import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen, Wallet, Users, DollarSign, TrendingUp, TrendingDown,
  Clock, CheckCircle2, XCircle, Plane, Hotel, Package, Stamp,
  ShieldCheck, Bell, Headphones, Activity, ArrowUpRight, ArrowDownRight,
  Sparkles, Calendar, Award, CreditCard, Loader2, Search, Filter,
} from 'lucide-react'
import { agentService } from '../../services/agentService.js'

function KpiCard({ label, value, icon: Icon, trend, color, delay = 0, prefix = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {trend !== undefined && (
          <span className={`text-xs font-bold flex items-center gap-0.5 ${trend > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {trend > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className="text-xs text-text-tertiary font-medium mb-0.5">{label}</p>
      <p className="text-xl font-extrabold text-heading">{prefix}{value}</p>
    </motion.div>
  )
}

function PerformanceChart({ data }) {
  const maxCommission = Math.max(...data.map(d => d.commission))
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-heading">Commission & Bookings Trend</h3>
          <p className="text-xs text-text-tertiary mt-0.5">Last 6 months performance</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" /> Commission</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#06B6D4]" /> Bookings</span>
        </div>
      </div>
      <div className="flex items-end justify-between gap-2 h-48">
        {data.map((d, i) => (
          <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
            <div className="w-full flex items-end justify-center gap-1 h-40">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.commission / maxCommission) * 100}%` }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
                className="w-3 sm:w-5 rounded-t-lg bg-gradient-to-t from-[#2563EB] to-[#06B6D4]"
                title={`Commission: ₹${d.commission.toLocaleString('en-IN')}`}
              />
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.bookings / Math.max(...data.map(x => x.bookings))) * 100}%` }}
                transition={{ delay: i * 0.1 + 0.1, type: 'spring', stiffness: 100 }}
                className="w-3 sm:w-5 rounded-t-lg bg-[#06B6D4]/40"
                title={`Bookings: ${d.bookings}`}
              />
            </div>
            <span className="text-[10px] font-medium text-text-tertiary">{d.month}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ServiceBreakdown({ data }) {
  const colors = ['#2563EB', '#06B6D4', '#8B5CF6', '#F59E0B', '#10B981']
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"
    >
      <h3 className="text-sm font-bold text-heading mb-4">Service-wise Breakdown</h3>
      <div className="space-y-2.5">
        {data.map((s, i) => (
          <div key={s.type} className="flex items-center gap-3">
            <span className="text-xs font-medium text-heading w-20 shrink-0">{s.type}</span>
            <div className="flex-1 h-6 bg-slate-100 rounded-lg overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${s.percentage}%` }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
                className="h-full rounded-lg flex items-center justify-end pr-2"
                style={{ backgroundColor: colors[i % colors.length] }}
              >
                <span className="text-[10px] font-bold text-white">{s.percentage}%</span>
              </motion.div>
            </div>
            <span className="text-xs font-semibold text-heading w-16 text-right shrink-0">{s.count}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function AgentDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    agentService.getDashboard()
      .then(data => setStats(data))
      .catch(err => setError(err.message || 'Failed to load dashboard'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-10 h-10 border-3 border-slate-200 border-t-[#2563EB] rounded-full"
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <span className="text-sm text-red-500">{error}</span>
      </div>
    )
  }

  const fmt = (v) => {
    if (typeof v === 'number') return `\u20B9${v.toLocaleString('en-IN')}`
    return v
  }
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  const statusVariant = {
    confirmed: 'success',
    pending: 'warning',
    processing: 'primary',
    cancelled: 'danger',
  }
  const typeIcon = {
    Flight: Plane, Hotel: Hotel, Package: Package, Visa: Stamp, Insurance: ShieldCheck,
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl shadow-premium"
      >
        <div className="absolute inset-0 gradient-bg-animated" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-cyan-300/20 rounded-full blur-3xl animate-float-delayed" />

        <div className="relative p-6 sm:p-8 text-white">
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
              <h1 className="text-2xl lg:text-3xl font-extrabold font-heading tracking-tight">
                Welcome back, Agent! 🤝
              </h1>
              <p className="text-white/70 mt-2 text-sm lg:text-base">Here's your business performance at a glance.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full lg:w-auto">
              <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center min-w-[90px]">
                <Wallet className="w-4 h-4 mx-auto mb-1.5 text-white/80" />
                <p className="text-lg font-extrabold font-heading leading-none">{fmt(stats.walletBalance)}</p>
                <p className="text-[10px] text-white/60 mt-1 uppercase tracking-wide">Wallet</p>
              </div>
              <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center min-w-[90px]">
                <Award className="w-4 h-4 mx-auto mb-1.5 text-white/80" />
                <p className="text-lg font-extrabold font-heading leading-none">{stats.totalBookings}</p>
                <p className="text-[10px] text-white/60 mt-1 uppercase tracking-wide">Bookings</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards - Row 1 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        <KpiCard label="Total Bookings" value={stats.totalBookings} icon={BookOpen} trend={5} color="bg-gradient-to-br from-blue-500 to-blue-600" delay={0} />
        <KpiCard label="Today's Bookings" value={stats.todayBookings} icon={Clock} color="bg-gradient-to-br from-cyan-500 to-cyan-600" delay={0.05} />
        <KpiCard label="Confirmed" value={stats.confirmedBookings} icon={CheckCircle2} trend={8} color="bg-gradient-to-br from-green-500 to-green-600" delay={0.1} />
        <KpiCard label="Pending" value={stats.pendingBookings} icon={Clock} color="bg-gradient-to-br from-amber-500 to-orange-500" delay={0.15} />
        <KpiCard label="Cancelled" value={stats.cancelledBookings} icon={XCircle} color="bg-gradient-to-br from-red-500 to-rose-500" delay={0.2} />
        <KpiCard label="Total Customers" value={stats.totalCustomers} icon={Users} trend={12} color="bg-gradient-to-br from-indigo-500 to-purple-500" delay={0.25} />
      </div>

      {/* KPI Cards - Row 2 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        <KpiCard label="Total Revenue" value={fmt(stats.totalRevenue)} icon={DollarSign} trend={15} color="bg-gradient-to-br from-emerald-500 to-emerald-600" delay={0.3} />
        <KpiCard label="Commission Earned" value={fmt(stats.commissionEarned)} icon={TrendingUp} trend={10} color="bg-gradient-to-br from-blue-500 to-blue-600" delay={0.35} />
        <KpiCard label="Wallet Balance" value={fmt(stats.walletBalance)} icon={Wallet} color="bg-gradient-to-br from-cyan-500 to-cyan-600" delay={0.4} />
        <KpiCard label="Available Credit" value={fmt(75000)} icon={CreditCard} color="bg-gradient-to-br from-violet-500 to-purple-500" delay={0.45} />
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-bold text-heading uppercase tracking-wide">Quick Actions</h3>
        </div>
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
          {[
            { icon: Plane, label: 'Book Flight', color: 'from-blue-500 to-cyan-500' },
            { icon: Hotel, label: 'Book Hotel', color: 'from-violet-500 to-purple-500' },
            { icon: Package, label: 'Packages', color: 'from-indigo-500 to-blue-500' },
            { icon: Stamp, label: 'Apply Visa', color: 'from-orange-500 to-red-500' },
            { icon: ShieldCheck, label: 'Insurance', color: 'from-emerald-500 to-teal-500' },
            { icon: Users, label: 'Add Customer', color: 'from-pink-500 to-rose-500' },
          ].map((action) => (
            <motion.button
              key={action.label}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-md transition-all min-w-[110px]"
            >
              <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform`}>
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-semibold text-heading">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          {stats.performanceChart && stats.performanceChart.length > 0 && (
            <PerformanceChart data={stats.performanceChart} />
          )}
        </div>
        {stats.serviceBreakdown && stats.serviceBreakdown.length > 0 && (
          <ServiceBreakdown data={stats.serviceBreakdown} />
        )}
      </div>

      {/* Recent Bookings + Latest Customers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Bookings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-heading">Recent Bookings</h3>
              <p className="text-xs text-text-tertiary mt-0.5">Latest transactions and their status</p>
            </div>
            <div className="flex gap-2">
              <button className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-colors">
                <Search className="w-4 h-4 text-text-secondary" />
              </button>
              <button className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-colors">
                <Filter className="w-4 h-4 text-text-secondary" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            {stats.recentBookings && stats.recentBookings.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/50">
                    <th className="text-left text-xs font-bold text-text-secondary uppercase tracking-wide px-5 py-3">Booking ID</th>
                    <th className="text-left text-xs font-bold text-text-secondary uppercase tracking-wide px-5 py-3">Type</th>
                    <th className="text-left text-xs font-bold text-text-secondary uppercase tracking-wide px-5 py-3 hidden sm:table-cell">Customer</th>
                    <th className="text-left text-xs font-bold text-text-secondary uppercase tracking-wide px-5 py-3 hidden md:table-cell">Details</th>
                    <th className="text-right text-xs font-bold text-text-secondary uppercase tracking-wide px-5 py-3">Amount</th>
                    <th className="text-center text-xs font-bold text-text-secondary uppercase tracking-wide px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentBookings.map((b, i) => {
                    const Icon = typeIcon[b.type] || Package
                    return (
                      <motion.tr
                        key={b.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 + i * 0.05 }}
                        className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-5 py-4 text-sm font-bold text-heading">{b.id}</td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Icon className="w-3.5 h-3.5 text-primary" />
                            </div>
                            <span className="text-sm font-medium text-heading">{b.type}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-sm text-text hidden sm:table-cell">{b.customer}</td>
                        <td className="px-5 py-4 text-sm text-text hidden md:table-cell">{b.route}</td>
                        <td className="px-5 py-4 text-sm font-bold text-heading text-right">₹{b.amount.toLocaleString('en-IN')}</td>
                        <td className="px-5 py-4 text-center">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                            b.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                            b.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                            b.status === 'processing' ? 'bg-primary-50 text-primary border-primary/20' :
                            'bg-red-50 text-red-600 border-red-200'
                          }`}>
                            {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                          </span>
                        </td>
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <Package className="w-10 h-10 text-text-tertiary mb-2" />
                <span className="text-sm text-text-secondary">No bookings yet</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Latest Customers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-bold text-heading">Latest Customers</h3>
            <Users className="w-4 h-4 text-text-secondary" />
          </div>
          <div className="space-y-3">
            {(stats.latestCustomers || []).map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {c.name?.charAt(0) || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-heading truncate">{c.name}</p>
                  <p className="text-xs text-text-tertiary">{c.bookings} bookings · ₹{(c.totalSpent || 0).toLocaleString('en-IN')}</p>
                </div>
                {c.status === 'vip' && (
                  <span className="px-2 py-0.5 text-[10px] font-bold text-amber-600 bg-amber-50 rounded-full">VIP</span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Notifications + Support */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-bold text-heading">Recent Notifications</h3>
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Bell className="w-4 h-4 text-primary" />
            </div>
          </div>
          <div className="space-y-3">
            {(stats.notifications || []).map((n, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className={`w-2 h-2 rounded-full ${n.color} mt-1.5 shrink-0`} />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-heading">{n.title}</p>
                  <p className="text-xs text-text-secondary">{n.desc}</p>
                  <p className="text-xs text-text-tertiary mt-1">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Support Tickets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-bold text-heading">Support Tickets</h3>
            <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center">
              <Headphones className="w-4 h-4 text-violet-600" />
            </div>
          </div>
          <div className="space-y-3">
            {[
              { id: '#TKT-501', subject: 'Flight refund delay', status: 'Open', variant: 'warning' },
              { id: '#TKT-500', subject: 'Hotel modification request', status: 'In Progress', variant: 'primary' },
              { id: '#TKT-499', subject: 'Visa document query', status: 'Resolved', variant: 'success' },
            ].map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-text-tertiary">{ticket.id}</p>
                  <p className="text-sm font-medium text-heading truncate">{ticket.subject}</p>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                  ticket.variant === 'success' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                  ticket.variant === 'warning' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                  'bg-primary-50 text-primary border-primary/20'
                }`}>
                  {ticket.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
