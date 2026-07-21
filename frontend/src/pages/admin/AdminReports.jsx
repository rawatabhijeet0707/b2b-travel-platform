import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Download, DollarSign, ShoppingCart, Percent, Users, Plane } from 'lucide-react'

const monthlyData = [
  { month: 'Jan', revenue: 845000, bookings: 1248, commission: 187000 },
  { month: 'Feb', revenue: 920000, bookings: 1356, commission: 198000 },
  { month: 'Mar', revenue: 780000, bookings: 1102, commission: 165000 },
  { month: 'Apr', revenue: 1050000, bookings: 1487, commission: 225000 },
  { month: 'May', revenue: 980000, bookings: 1398, commission: 208000 },
  { month: 'Jun', revenue: 1120000, bookings: 1567, commission: 242000 },
  { month: 'Jul', revenue: 1245000, bookings: 1722, commission: 268000 },
  { month: 'Aug', revenue: 1180000, bookings: 1645, commission: 252000 },
  { month: 'Sep', revenue: 1320000, bookings: 1834, commission: 285000 },
  { month: 'Oct', revenue: 1410000, bookings: 1956, commission: 305000 },
  { month: 'Nov', revenue: 1280000, bookings: 1789, commission: 272000 },
  { month: 'Dec', revenue: 1560000, bookings: 2104, commission: 342000 },
]

const serviceBreakdown = [
  { type: 'Flights', revenue: 4820000, percent: 42, color: 'bg-blue-500' },
  { type: 'Hotels', revenue: 3210000, percent: 28, color: 'bg-violet-500' },
  { type: 'Packages', revenue: 1740000, percent: 15, color: 'bg-emerald-500' },
  { type: 'Visa', revenue: 690000, percent: 6, color: 'bg-amber-500' },
  { type: 'Insurance', revenue: 580000, percent: 5, color: 'bg-red-500' },
  { type: 'Other', revenue: 520000, percent: 4, color: 'bg-cyan-500' },
]

const topRoutes = [
  { route: 'DEL → DXB', bookings: 342, revenue: 648000, commission: 112000, growth: 18.2 },
  { route: 'BOM → SIN', bookings: 287, revenue: 892000, commission: 156000, growth: 22.5 },
  { route: 'BLR → BKK', bookings: 256, revenue: 412000, commission: 78000, growth: 15.8 },
  { route: 'MAA → KUL', bookings: 198, revenue: 287000, commission: 52000, growth: 12.3 },
  { route: 'DEL → BKK', bookings: 187, revenue: 356000, commission: 68000, growth: 9.7 },
  { route: 'HYD → DXB', bookings: 165, revenue: 298000, commission: 54000, growth: 14.1 },
  { route: 'CCU → SIN', bookings: 142, revenue: 425000, commission: 76000, growth: 8.5 },
  { route: 'AMD → MLE', bookings: 128, revenue: 512000, commission: 92000, growth: 28.3 },
]

const formatAmount = (amt) => `₹${amt.toLocaleString('en-IN')}`
const maxRevenue = Math.max(...monthlyData.map(m => m.revenue))

export default function AdminReports() {
  const [period, setPeriod] = useState('yearly')

  const totalRevenue = monthlyData.reduce((s, m) => s + m.revenue, 0)
  const totalBookings = monthlyData.reduce((s, m) => s + m.bookings, 0)
  const totalCommission = monthlyData.reduce((s, m) => s + m.commission, 0)
  const avgBookingValue = Math.round(totalRevenue / totalBookings)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-heading">Reports</h1>
          <p className="text-sm text-text-secondary mt-0.5">Business performance reports and insights</p>
        </div>
        <div className="flex items-center gap-3">
          <select value={period} onChange={(e) => setPeriod(e.target.value)} className="px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary">
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 gradient-bg text-white text-sm font-semibold rounded-xl shadow-glow">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: formatAmount(totalRevenue), change: '+18.2%', trend: 'up', icon: DollarSign, color: 'text-blue-600 bg-blue-50' },
          { label: 'Total Bookings', value: totalBookings.toLocaleString('en-IN'), change: '+12.5%', trend: 'up', icon: ShoppingCart, color: 'text-violet-600 bg-violet-50' },
          { label: 'Total Commission', value: formatAmount(totalCommission), change: '+15.8%', trend: 'up', icon: Percent, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Avg. Booking Value', value: formatAmount(avgBookingValue), change: '+3.2%', trend: 'up', icon: TrendingUp, color: 'text-amber-600 bg-amber-50' },
        ].map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${m.color}`}><m.icon className="w-5 h-5" /></div>
              <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${m.trend === 'up' ? 'text-emerald-700 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
                {m.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{m.change}
              </span>
            </div>
            <p className="text-sm text-text-secondary font-medium">{m.label}</p>
            <p className="text-2xl font-extrabold text-heading mt-1 tabular-nums">{m.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart + Service Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-heading mb-1">Monthly Revenue Trend</h3>
          <p className="text-sm text-text-secondary mb-6">Revenue and commission over 12 months</p>
          <div className="flex items-end justify-between gap-2 h-56">
            {monthlyData.map((m, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="relative w-full flex items-end justify-center h-full">
                  <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-heading bg-white px-2 py-1 rounded shadow-sm whitespace-nowrap z-10">{formatAmount(m.revenue)}</div>
                  <motion.div initial={{ height: 0 }} animate={{ height: `${(m.revenue / maxRevenue) * 100}%` }} transition={{ delay: 0.4 + i * 0.05, duration: 0.5 }} className="w-full max-w-[32px] gradient-bg rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer" />
                </div>
                <span className="text-xs text-text-secondary font-medium">{m.month}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-heading mb-1">Revenue by Service</h3>
          <p className="text-sm text-text-secondary mb-6">Breakdown by service type</p>
          <div className="space-y-4">
            {serviceBreakdown.map((s, i) => (
              <div key={s.type}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-heading">{s.type}</span>
                  <span className="text-sm font-bold text-heading tabular-nums">{formatAmount(s.revenue)}</span>
                </div>
                <div className="h-2.5 bg-slate-200/70 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${s.percent}%` }} transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }} className={`h-full ${s.color} rounded-full`} />
                </div>
                <p className="text-xs text-text-tertiary mt-1">{s.percent}% of total</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Top Routes */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-heading">Top Performing Routes</h3>
            <p className="text-sm text-text-secondary mt-0.5">Best routes by revenue and growth</p>
          </div>
          <Plane className="w-5 h-5 text-text-tertiary" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Route</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Bookings</th>
                <th className="text-right text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Revenue</th>
                <th className="text-right text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden md:table-cell">Commission</th>
                <th className="text-center text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Growth</th>
              </tr>
            </thead>
            <tbody>
              {topRoutes.map((r) => (
                <tr key={r.route} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-bold text-heading">{r.route}</td>
                  <td className="px-4 py-3 hidden sm:table-cell text-sm text-text-secondary tabular-nums">{r.bookings}</td>
                  <td className="px-4 py-3 text-right text-sm font-bold text-heading tabular-nums">{formatAmount(r.revenue)}</td>
                  <td className="px-4 py-3 text-right hidden md:table-cell text-sm font-semibold text-emerald-600 tabular-nums">{formatAmount(r.commission)}</td>
                  <td className="px-4 py-3 text-center"><span className="inline-flex items-center gap-1 text-sm font-bold text-emerald-600"><TrendingUp className="w-3 h-3" />+{r.growth}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
