import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, Wallet, Download, ArrowUpRight, ArrowDownRight, CreditCard, Banknote } from 'lucide-react'

const monthlyRevenue = [
  { month: 'Jan', revenue: 845000, target: 800000 },
  { month: 'Feb', revenue: 920000, target: 850000 },
  { month: 'Mar', revenue: 780000, target: 900000 },
  { month: 'Apr', revenue: 1050000, target: 950000 },
  { month: 'May', revenue: 980000, target: 1000000 },
  { month: 'Jun', revenue: 1120000, target: 1050000 },
  { month: 'Jul', revenue: 1245000, target: 1100000 },
  { month: 'Aug', revenue: 1180000, target: 1150000 },
  { month: 'Sep', revenue: 1320000, target: 1200000 },
  { month: 'Oct', revenue: 1410000, target: 1250000 },
  { month: 'Nov', revenue: 1280000, target: 1300000 },
  { month: 'Dec', revenue: 1560000, target: 1350000 },
]

const revenueStreams = [
  { source: 'Flight Bookings', amount: 4820000, percent: 42, color: 'bg-blue-500', trend: 'up', change: 18.2 },
  { source: 'Hotel Bookings', amount: 3210000, percent: 28, color: 'bg-violet-500', trend: 'up', change: 14.5 },
  { source: 'Holiday Packages', amount: 1740000, percent: 15, color: 'bg-emerald-500', trend: 'up', change: 22.8 },
  { source: 'Visa Processing', amount: 690000, percent: 6, color: 'bg-amber-500', trend: 'up', change: 8.3 },
  { source: 'Insurance Premium', amount: 580000, percent: 5, color: 'bg-red-500', trend: 'down', change: -2.1 },
  { source: 'Other Services', amount: 520000, percent: 4, color: 'bg-cyan-500', trend: 'up', change: 6.7 },
]

const transactions = [
  { id: 'TXN-9201', type: 'Credit', source: 'Flight Booking - DEL→DXB', agent: 'Rajesh Kumar', amount: 18999, date: 'Jul 20, 2025 10:30 AM', method: 'Wallet' },
  { id: 'TXN-9200', type: 'Credit', source: 'Hotel Booking - Dubai Marina', agent: 'Priya Sharma', amount: 8500, date: 'Jul 20, 2025 9:15 AM', method: 'Card' },
  { id: 'TXN-9199', type: 'Debit', source: 'Refund - TD-2395', agent: 'Arjun Mehta', amount: 12999, date: 'Jul 20, 2025 8:45 AM', method: 'Wallet' },
  { id: 'TXN-9198', type: 'Credit', source: 'Package - Europe Tour', agent: 'Kavya Nair', amount: 89999, date: 'Jul 19, 2025 6:20 PM', method: 'UPI' },
  { id: 'TXN-9197', type: 'Credit', source: 'Visa Processing - Singapore', agent: 'Anita Desai', amount: 3500, date: 'Jul 19, 2025 4:00 PM', method: 'Wallet' },
  { id: 'TXN-9196', type: 'Debit', source: 'Commission Payout', agent: 'Mohammed Ali', amount: 28500, date: 'Jul 19, 2025 2:30 PM', method: 'Bank Transfer' },
  { id: 'TXN-9195', type: 'Credit', source: 'Insurance Premium', agent: 'Vikram Singh', amount: 1200, date: 'Jul 19, 2025 11:00 AM', method: 'Wallet' },
  { id: 'TXN-9194', type: 'Credit', source: 'Flight Booking - BOM→SIN', agent: 'Sneha Reddy', amount: 32999, date: 'Jul 19, 2025 9:45 AM', method: 'Card' },
]

const formatAmount = (amt) => `₹${amt.toLocaleString('en-IN')}`
const maxRev = Math.max(...monthlyRevenue.map(m => Math.max(m.revenue, m.target)))

export default function AdminRevenue() {
  const totalRevenue = monthlyRevenue.reduce((s, m) => s + m.revenue, 0)
  const totalTarget = monthlyRevenue.reduce((s, m) => s + m.target, 0)
  const achievement = Math.round((totalRevenue / totalTarget) * 100)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-heading">Revenue</h1>
          <p className="text-sm text-text-secondary mt-0.5">Revenue tracking and financial performance</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 gradient-bg text-white text-sm font-semibold rounded-xl shadow-glow">
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: formatAmount(totalRevenue), change: '+18.2%', trend: 'up', icon: DollarSign, color: 'text-blue-600 bg-blue-50' },
          { label: 'Target Achievement', value: `${achievement}%`, change: `of ${formatAmount(totalTarget)}`, trend: 'up', icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Avg. Monthly', value: formatAmount(Math.round(totalRevenue / 12)), change: '+12.5%', trend: 'up', icon: Wallet, color: 'text-violet-600 bg-violet-50' },
          { label: 'Best Month', value: 'December', change: formatAmount(1560000), trend: 'up', icon: ArrowUpRight, color: 'text-amber-600 bg-amber-50' },
        ].map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${m.color}`}><m.icon className="w-5 h-5" /></div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${m.trend === 'up' ? 'text-emerald-700 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>{m.change}</span>
            </div>
            <p className="text-sm text-text-secondary font-medium">{m.label}</p>
            <p className="text-2xl font-extrabold text-heading mt-1 tabular-nums">{m.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Revenue vs Target Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-heading">Revenue vs Target</h3>
            <p className="text-sm text-text-secondary">Monthly revenue against targets</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded gradient-bg" /> Revenue</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-slate-300" /> Target</span>
          </div>
        </div>
        <div className="flex items-end justify-between gap-2 sm:gap-4 h-56">
          {monthlyRevenue.map((m, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="relative w-full flex items-end justify-center h-full gap-1">
                <div className="relative w-1/2 flex items-end h-full">
                  <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-heading bg-white px-2 py-1 rounded shadow-sm whitespace-nowrap z-10">{formatAmount(m.revenue)}</div>
                  <motion.div initial={{ height: 0 }} animate={{ height: `${(m.revenue / maxRev) * 100}%` }} transition={{ delay: 0.4 + i * 0.05, duration: 0.5 }} className="w-full gradient-bg rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer" />
                </div>
                <div className="w-1/2 flex items-end h-full">
                  <motion.div initial={{ height: 0 }} animate={{ height: `${(m.target / maxRev) * 100}%` }} transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }} className="w-full bg-slate-300 rounded-t-lg" />
                </div>
              </div>
              <span className="text-xs text-text-secondary font-medium">{m.month}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Streams */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-heading mb-1">Revenue Streams</h3>
          <p className="text-sm text-text-secondary mb-6">Revenue by service type</p>
          <div className="space-y-4">
            {revenueStreams.map((s, i) => (
              <div key={s.source}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${s.color}`} />
                    <span className="text-sm font-medium text-heading">{s.source}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-heading tabular-nums">{formatAmount(s.amount)}</span>
                    <span className={`inline-flex items-center gap-0.5 text-xs font-bold ${s.trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
                      {s.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}{Math.abs(s.change)}%
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-slate-200/70 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${s.percent}%` }} transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }} className={`h-full ${s.color} rounded-full`} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100"><h3 className="text-lg font-bold text-heading">Recent Transactions</h3><p className="text-sm text-text-secondary mt-0.5">Latest revenue transactions</p></div>
          <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto">
            {transactions.map(t => (
              <div key={t.id} className="px-5 py-3 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${t.type === 'Credit' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                      {t.type === 'Credit' ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-heading">{t.source}</p>
                      <p className="text-xs text-text-tertiary">{t.id} · {t.agent} · {t.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold tabular-nums ${t.type === 'Credit' ? 'text-emerald-600' : 'text-red-500'}`}>{t.type === 'Credit' ? '+' : '-'}{formatAmount(t.amount)}</p>
                    <p className="text-xs text-text-tertiary">{t.method}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
