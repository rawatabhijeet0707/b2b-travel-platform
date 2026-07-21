import { motion } from 'framer-motion'
import { TrendingUp, Percent, Download, DollarSign, Award, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const monthlyCommission = [
  { month: 'Jan', commission: 187000, payout: 168000 },
  { month: 'Feb', commission: 198000, payout: 178000 },
  { month: 'Mar', commission: 165000, payout: 148000 },
  { month: 'Apr', commission: 225000, payout: 202000 },
  { month: 'May', commission: 208000, payout: 187000 },
  { month: 'Jun', commission: 242000, payout: 218000 },
  { month: 'Jul', commission: 268000, payout: 241000 },
  { month: 'Aug', commission: 252000, payout: 226000 },
  { month: 'Sep', commission: 285000, payout: 256000 },
  { month: 'Oct', commission: 305000, payout: 274000 },
  { month: 'Nov', commission: 272000, payout: 244000 },
  { month: 'Dec', commission: 342000, payout: 307000 },
]

const agentCommission = [
  { agent: 'Daniel Park', agency: 'Asia Pacific Travel', commission: 342000, bookings: 2104, rate: 16.2, trend: 'up', change: 22.5 },
  { agent: 'Mohammed Ali', agency: 'Global Voyage LLC', commission: 285000, bookings: 1856, rate: 15.3, trend: 'up', change: 18.2 },
  { agent: 'Lisa Chen', agency: 'China Travel Solutions', commission: 268000, bookings: 1722, rate: 15.6, trend: 'up', change: 14.8 },
  { agent: 'Kavya Nair', agency: 'Globe Trotter Hub', commission: 215000, bookings: 1432, rate: 15.0, trend: 'up', change: 12.3 },
  { agent: 'Rajesh Kumar', agency: 'SkyHigh Travels', commission: 187000, bookings: 1248, rate: 14.9, trend: 'up', change: 10.5 },
  { agent: 'Sneha Reddy', agency: 'FlyHigh Solutions', commission: 168000, bookings: 1056, rate: 15.9, trend: 'up', change: 8.7 },
  { agent: 'Priya Sharma', agency: 'Wanderlust Tours', commission: 142500, bookings: 982, rate: 14.5, trend: 'up', change: 6.2 },
  { agent: 'Rohit Gupta', agency: 'Discover India', commission: 92000, bookings: 645, rate: 14.2, trend: 'down', change: -2.1 },
]

const serviceRates = [
  { service: 'Flight Bookings', rate: 15, totalCommission: 723000, color: 'bg-blue-500' },
  { service: 'Hotel Bookings', rate: 12, totalCommission: 385000, color: 'bg-violet-500' },
  { service: 'Holiday Packages', rate: 18, totalCommission: 313000, color: 'bg-emerald-500' },
  { service: 'Visa Processing', rate: 8, totalCommission: 55000, color: 'bg-amber-500' },
  { service: 'Insurance', rate: 10, totalCommission: 58000, color: 'bg-red-500' },
]

const formatAmount = (amt) => `₹${amt.toLocaleString('en-IN')}`
const maxComm = Math.max(...monthlyCommission.map(m => Math.max(m.commission, m.payout)))

export default function AdminCommission() {
  const totalCommission = monthlyCommission.reduce((s, m) => s + m.commission, 0)
  const totalPayout = monthlyCommission.reduce((s, m) => s + m.payout, 0)
  const pendingPayout = totalCommission - totalPayout
  const avgRate = (serviceRates.reduce((s, r) => s + r.rate, 0) / serviceRates.length).toFixed(1)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-heading">Commission</h1>
          <p className="text-sm text-text-secondary mt-0.5">Commission tracking and payout management</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 gradient-bg text-white text-sm font-semibold rounded-xl shadow-glow">
          <Download className="w-4 h-4" /> Export
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Commission', value: formatAmount(totalCommission), change: '+15.8%', trend: 'up', icon: Percent, color: 'text-blue-600 bg-blue-50' },
          { label: 'Total Payout', value: formatAmount(totalPayout), change: '+14.2%', trend: 'up', icon: DollarSign, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Pending Payout', value: formatAmount(pendingPayout), change: 'Awaiting', trend: 'up', icon: Award, color: 'text-amber-600 bg-amber-50' },
          { label: 'Avg. Commission Rate', value: `${avgRate}%`, change: '+0.3%', trend: 'up', icon: TrendingUp, color: 'text-violet-600 bg-violet-50' },
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

      {/* Commission vs Payout Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div><h3 className="text-lg font-bold text-heading">Commission vs Payout</h3><p className="text-sm text-text-secondary">Monthly earned vs paid commission</p></div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-500" /> Earned</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-400" /> Paid</span>
          </div>
        </div>
        <div className="flex items-end justify-between gap-2 sm:gap-4 h-56">
          {monthlyCommission.map((m, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="relative w-full flex items-end justify-center h-full gap-1">
                <div className="relative w-1/2 flex items-end h-full">
                  <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-heading bg-white px-2 py-1 rounded shadow-sm whitespace-nowrap z-10">{formatAmount(m.commission)}</div>
                  <motion.div initial={{ height: 0 }} animate={{ height: `${(m.commission / maxComm) * 100}%` }} transition={{ delay: 0.4 + i * 0.05, duration: 0.5 }} className="w-full bg-blue-500 rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer" />
                </div>
                <div className="w-1/2 flex items-end h-full">
                  <motion.div initial={{ height: 0 }} animate={{ height: `${(m.payout / maxComm) * 100}%` }} transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }} className="w-full bg-emerald-400 rounded-t-lg" />
                </div>
              </div>
              <span className="text-xs text-text-secondary font-medium">{m.month}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Commission Rates */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-heading mb-1">Commission Rates by Service</h3>
          <p className="text-sm text-text-secondary mb-6">Current commission structure</p>
          <div className="space-y-4">
            {serviceRates.map((s, i) => (
              <div key={s.service}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${s.color}`} />
                    <span className="text-sm font-medium text-heading">{s.service}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-heading tabular-nums">{formatAmount(s.totalCommission)}</span>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{s.rate}%</span>
                  </div>
                </div>
                <div className="h-2 bg-slate-200/70 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(s.totalCommission / 723000) * 100}%` }} transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }} className={`h-full ${s.color} rounded-full`} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Agents by Commission */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100"><h3 className="text-lg font-bold text-heading">Top Agents by Commission</h3><p className="text-sm text-text-secondary mt-0.5">Highest earning agents</p></div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Agent</th>
                <th className="text-right text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Bookings</th>
                <th className="text-right text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Commission</th>
                <th className="text-center text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden md:table-cell">Rate</th>
                <th className="text-center text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Trend</th>
              </tr></thead>
              <tbody>
                {agentCommission.map((a, i) => (
                  <tr key={a.agent} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center text-white text-xs font-bold shrink-0">{a.agent.charAt(0)}</div>
                        <div><p className="text-sm font-semibold text-heading">{a.agent}</p><p className="text-xs text-text-tertiary">{a.agency}</p></div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right hidden sm:table-cell text-sm text-text-secondary tabular-nums">{a.bookings.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3 text-right text-sm font-bold text-heading tabular-nums">{formatAmount(a.commission)}</td>
                    <td className="px-4 py-3 text-center hidden md:table-cell"><span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{a.rate}%</span></td>
                    <td className="px-4 py-3 text-center hidden lg:table-cell">
                      <span className={`inline-flex items-center gap-0.5 text-xs font-bold ${a.trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
                        {a.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}{Math.abs(a.change)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
