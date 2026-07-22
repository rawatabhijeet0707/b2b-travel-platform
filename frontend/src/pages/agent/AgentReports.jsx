import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, DollarSign, Users, Loader2, Plane, Hotel, Package, Stamp, ShieldCheck } from 'lucide-react'
import { agentService } from '../../services/agentService.js'

export default function AgentReports() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    agentService.getReports()
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </div>
    )
  }

  const fmt = (v) => `\u20B9${v.toLocaleString('en-IN')}`
  const fmtL = (v) => `\u20B9${(v / 100000).toFixed(1)}L`
  const typeIcon = { Flight: Plane, Hotel: Hotel, Package: Package, Visa: Stamp, Insurance: ShieldCheck }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-heading">Reports & Analytics</h1>
        <p className="text-sm text-text-secondary mt-0.5">Comprehensive performance insights</p>
      </div>

      {/* Key Metrics */}
      {data?.keyMetrics && (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {[
            { label: 'Total Revenue', value: fmtL(data.keyMetrics.totalRevenue || 0), icon: DollarSign, color: 'bg-gradient-to-br from-blue-500 to-blue-600' },
            { label: 'Total Commission', value: fmtL(data.keyMetrics.totalCommission || 0), icon: TrendingUp, color: 'bg-gradient-to-br from-emerald-500 to-emerald-600' },
            { label: 'Avg Booking Value', value: fmt(data.keyMetrics.avgBookingValue || 0), icon: BarChart3, color: 'bg-gradient-to-br from-cyan-500 to-cyan-600' },
            { label: 'Cancellation Rate', value: `${data.keyMetrics.cancellationRate || 0}%`, icon: TrendingUp, color: 'bg-gradient-to-br from-red-500 to-rose-500' },
            { label: 'Conversion Rate', value: `${data.keyMetrics.conversionRate || 0}%`, icon: Users, color: 'bg-gradient-to-br from-violet-500 to-purple-500' },
            { label: 'Repeat Customer', value: `${data.keyMetrics.repeatCustomerRate || 0}%`, icon: Users, color: 'bg-gradient-to-br from-amber-500 to-orange-500' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color} mb-3`}>
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-xs text-text-tertiary font-medium mb-0.5">{s.label}</p>
              <p className="text-lg font-extrabold text-heading">{s.value}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Monthly Performance Chart */}
      {data?.monthlyPerformance && data.monthlyPerformance.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-heading mb-5">Revenue & Commission Trend</h3>
          <div className="flex items-end justify-between gap-2 h-48">
            {data.monthlyPerformance.map((d, i) => {
              const maxRev = Math.max(...data.monthlyPerformance.map(x => x.revenue))
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                  <div className="w-full flex items-end justify-center gap-1 h-40">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(d.revenue / maxRev) * 100}%` }}
                      transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
                      className="w-4 sm:w-6 rounded-t-lg bg-gradient-to-t from-[#2563EB] to-[#06B6D4]"
                      title={`Revenue: ${fmt(d.revenue)}`}
                    />
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(d.commission / maxRev) * 100}%` }}
                      transition={{ delay: i * 0.1 + 0.1, type: 'spring', stiffness: 100 }}
                      className="w-4 sm:w-6 rounded-t-lg bg-emerald-400/60"
                      title={`Commission: ${fmt(d.commission)}`}
                    />
                  </div>
                  <span className="text-[10px] font-medium text-text-tertiary">{d.month}</span>
                </div>
              )
            })}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" /> Revenue</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Commission</span>
          </div>
        </div>
      )}

      {/* Service Breakdown + Top Customers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {data?.serviceBreakdown && (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-bold text-heading mb-4">Service-wise Breakdown</h3>
            <div className="space-y-3">
              {data.serviceBreakdown.map((s, i) => {
                const Icon = typeIcon[s.type] || Package
                return (
                  <motion.div
                    key={s.type}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-heading w-20 shrink-0">{s.type}</span>
                    <div className="flex-1 h-6 bg-slate-100 rounded-lg overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${s.percentage}%` }}
                        transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
                        className="h-full rounded-lg gradient-bg flex items-center justify-end pr-2"
                      >
                        <span className="text-[10px] font-bold text-white">{s.percentage}%</span>
                      </motion.div>
                    </div>
                    <span className="text-xs font-semibold text-heading w-20 text-right shrink-0">{fmt(s.revenue)}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}

        {data?.topCustomers && data.topCustomers.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-bold text-heading mb-4">Top Customers</h3>
            <div className="space-y-3">
              {data.topCustomers.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-text-secondary shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-semibold text-heading truncate">{c.name}</p>
                      <p className="text-xs font-bold text-heading shrink-0 ml-2">{fmtL(c.revenue)}</p>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(c.revenue / Math.max(...data.topCustomers.map(x => x.revenue))) * 100}%` }}
                        transition={{ delay: i * 0.05, type: 'spring', stiffness: 100 }}
                        className="h-full rounded-full gradient-bg"
                      />
                    </div>
                    <p className="text-[10px] text-text-tertiary mt-0.5">{c.bookings} bookings · {fmt(c.commission)} commission</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
