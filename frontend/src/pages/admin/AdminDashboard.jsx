import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp, TrendingDown, DollarSign, BookOpen, Plane, Hotel, Package,
  Stamp, ShieldCheck, Wallet, Users, UserCog, FileCheck, Headphones,
  CreditCard, Activity, ArrowUpRight, ArrowDownRight, Percent
} from 'lucide-react'
import { adminService } from '../../services/adminService.js'

function KpiCard({ label, value, icon: Icon, trend, color, delay = 0 }) {
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
      <p className="text-xl font-extrabold text-heading">{value}</p>
    </motion.div>
  )
}

function RevenueChart({ data }) {
  const maxRevenue = Math.max(...data.map(d => d.revenue))
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-heading">Revenue & Bookings Trend</h3>
          <p className="text-xs text-text-tertiary mt-0.5">Last 7 months performance</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" /> Revenue</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#06B6D4]" /> Bookings</span>
        </div>
      </div>
      <div className="flex items-end justify-between gap-2 h-48">
        {data.map((d, i) => (
          <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
            <div className="w-full flex items-end justify-center gap-1 h-40">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
                className="w-3 sm:w-5 rounded-t-lg bg-gradient-to-t from-[#2563EB] to-[#06B6D4]"
                title={`Revenue: ${d.revenue.toLocaleString('en-IN')}`}
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

function TopList({ title, items, valueLabel, delay = 0 }) {
  const maxValue = Math.max(...items.map(i => i.revenue))
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"
    >
      <h3 className="text-sm font-bold text-heading mb-4">{title}</h3>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-text-secondary shrink-0">
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-semibold text-heading truncate">{item.name}</p>
                <p className="text-xs font-bold text-heading shrink-0 ml-2">{"\u20B9"}{(item.revenue / 100000).toFixed(1)}L</p>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.revenue / maxValue) * 100}%` }}
                  transition={{ delay: delay + i * 0.05, type: 'spring', stiffness: 100 }}
                  className="h-full rounded-full gradient-bg"
                />
              </div>
              <p className="text-[10px] text-text-tertiary mt-0.5">{item.bookings} bookings</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function CountrySales({ data }) {
  const colors = ['#2563EB', '#06B6D4', '#8B5CF6', '#F59E0B', '#10B981', '#94A3B8']
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"
    >
      <h3 className="text-sm font-bold text-heading mb-4">Country-wise Sales</h3>
      <div className="space-y-2.5">
        {data.map((c, i) => (
          <div key={c.country} className="flex items-center gap-3">
            <span className="text-xs font-medium text-heading w-20 shrink-0">{c.country}</span>
            <div className="flex-1 h-6 bg-slate-100 rounded-lg overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${c.percentage}%` }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
                className="h-full rounded-lg flex items-center justify-end pr-2"
                style={{ backgroundColor: colors[i % colors.length] }}
              >
                <span className="text-[10px] font-bold text-white">{c.percentage}%</span>
              </motion.div>
            </div>
            <span className="text-xs font-semibold text-heading w-16 text-right shrink-0">{"\u20B9"}{(c.sales / 100000).toFixed(1)}L</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminService.getDashboard()
      .then(res => setStats(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading || !stats) {
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

  const fmt = (v) => `\u20B9${v.toLocaleString('en-IN')}`
  const fmtL = (v) => `\u20B9${(v / 100000).toFixed(1)}L`

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-heading">Dashboard</h1>
          <p className="text-sm text-text-secondary mt-0.5">Welcome back, here's your platform overview</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-xl">
          <Activity className="w-3.5 h-3.5 text-green-600" />
          <span className="text-xs font-bold text-green-600">{stats.liveUsers} Live Users</span>
        </div>
      </div>

      {/* KPI Cards - Row 1 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        <KpiCard label="Today's Revenue" value={fmt(stats.todayRevenue)} icon={DollarSign} trend={12} color="bg-gradient-to-br from-blue-500 to-blue-600" delay={0} />
        <KpiCard label="Monthly Revenue" value={fmtL(stats.monthlyRevenue)} icon={TrendingUp} trend={8} color="bg-gradient-to-br from-cyan-500 to-cyan-600" delay={0.05} />
        <KpiCard label="Today's Profit" value={fmt(stats.todayProfit)} icon={Activity} trend={15} color="bg-gradient-to-br from-green-500 to-green-600" delay={0.1} />
        <KpiCard label="Total Bookings" value={stats.totalBookings.toLocaleString()} icon={BookOpen} trend={5} color="bg-gradient-to-br from-purple-500 to-purple-600" delay={0.15} />
        <KpiCard label="Total Commission" value={fmtL(stats.totalCommission)} icon={Percent} trend={10} color="bg-gradient-to-br from-amber-500 to-orange-500" delay={0.2} />
        <KpiCard label="Total Wallet" value={fmtL(stats.totalWallet)} icon={Wallet} color="bg-gradient-to-br from-emerald-500 to-emerald-600" delay={0.25} />
      </div>

      {/* KPI Cards - Row 2 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        <KpiCard label="Flights" value={stats.flightBookings} icon={Plane} color="bg-blue-500" delay={0.3} />
        <KpiCard label="Hotels" value={stats.hotelBookings} icon={Hotel} color="bg-purple-500" delay={0.35} />
        <KpiCard label="Packages" value={stats.packageBookings} icon={Package} color="bg-pink-500" delay={0.4} />
        <KpiCard label="Visa" value={stats.visaBookings} icon={Stamp} color="bg-green-500" delay={0.45} />
        <KpiCard label="Insurance" value={stats.insuranceBookings} icon={ShieldCheck} color="bg-orange-500" delay={0.5} />
        <KpiCard label="Active Sessions" value={stats.activeSessions} icon={Activity} color="bg-cyan-500" delay={0.55} />
      </div>

      {/* KPI Cards - Row 3 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        <KpiCard label="Customers" value={stats.totalCustomers.toLocaleString()} icon={Users} color="bg-indigo-500" delay={0.6} />
        <KpiCard label="Agents" value={stats.totalAgents} icon={UserCog} color="bg-teal-500" delay={0.65} />
        <KpiCard label="Pending KYC" value={stats.pendingKyc} icon={FileCheck} color="bg-red-500" delay={0.7} />
        <KpiCard label="Pending Tickets" value={stats.pendingTickets} icon={Headphones} color="bg-yellow-500" delay={0.75} />
        <KpiCard label="Pending Payments" value={stats.pendingPayments} icon={CreditCard} color="bg-rose-500" delay={0.8} />
        <KpiCard label="Live Users" value={stats.liveUsers} icon={Activity} color="bg-green-500" delay={0.85} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RevenueChart data={stats.revenueChart} />
        </div>
        <CountrySales data={stats.countrySales} />
      </div>

      {/* Top Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TopList title="Top Destinations" items={stats.topDestinations} delay={0.4} />
        <TopList title="Top Agents" items={stats.topAgents} delay={0.5} />
      </div>
    </div>
  )
}
