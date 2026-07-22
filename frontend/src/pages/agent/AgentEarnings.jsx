import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, Wallet, ArrowDownRight, Loader2, Award } from 'lucide-react'
import { agentService } from '../../services/agentService.js'

export default function AgentEarnings() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    agentService.getEarnings()
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-heading">My Earnings & Commission</h1>
        <p className="text-sm text-text-secondary mt-0.5">Track your commission and earnings performance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Commission', value: fmt(data?.totalCommission || 0), icon: DollarSign, color: 'bg-gradient-to-br from-blue-500 to-blue-600', delay: 0 },
          { label: 'This Month', value: fmt(data?.thisMonthCommission || 0), icon: TrendingUp, color: 'bg-gradient-to-br from-emerald-500 to-emerald-600', delay: 0.05 },
          { label: 'Pending Commission', value: fmt(data?.pendingCommission || 0), icon: Wallet, color: 'bg-gradient-to-br from-amber-500 to-orange-500', delay: 0.1 },
          { label: 'Available for Withdrawal', value: fmt(data?.availableForWithdrawal || 0), icon: Award, color: 'bg-gradient-to-br from-cyan-500 to-cyan-600', delay: 0.15 },
        ].map((s) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: s.delay }}
            className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color} mb-3`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs text-text-tertiary font-medium mb-0.5">{s.label}</p>
            <p className="text-xl font-extrabold text-heading">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Commission Chart */}
      {data?.commissionHistory && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-heading mb-5">Monthly Commission Trend</h3>
          <div className="flex items-end justify-between gap-2 h-48">
            {data.commissionHistory.map((d, i) => {
              const max = Math.max(...data.commissionHistory.map(x => x.commission))
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                  <div className="w-full flex items-end justify-center h-40">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(d.commission / max) * 100}%` }}
                      transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
                      className="w-8 sm:w-12 rounded-t-lg bg-gradient-to-t from-[#2563EB] to-[#06B6D4]"
                      title={`Commission: ${fmt(d.commission)}`}
                    />
                  </div>
                  <span className="text-[10px] font-medium text-text-tertiary">{d.month}</span>
                  <span className="text-[10px] font-bold text-heading">{fmt(d.commission)}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Service-wise Commission */}
      {data?.serviceWiseCommission && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-heading mb-5">Commission by Service Type</h3>
          <div className="space-y-3">
            {data.serviceWiseCommission.map((s, i) => {
              const max = Math.max(...data.serviceWiseCommission.map(x => x.commission))
              const colors = ['from-blue-500 to-blue-600', 'from-cyan-500 to-cyan-600', 'from-violet-500 to-purple-500', 'from-amber-500 to-orange-500', 'from-emerald-500 to-emerald-600']
              return (
                <motion.div
                  key={s.service}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-sm font-medium text-heading w-20 shrink-0">{s.service}</span>
                  <div className="flex-1 h-8 bg-slate-100 rounded-lg overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(s.commission / max) * 100}%` }}
                      transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
                      className={`h-full rounded-lg bg-gradient-to-r ${colors[i % colors.length]} flex items-center justify-end pr-2`}
                    >
                      <span className="text-[10px] font-bold text-white">{fmt(s.commission)}</span>
                    </motion.div>
                  </div>
                  <span className="text-xs font-semibold text-text-tertiary w-16 text-right shrink-0">{s.count} bookings</span>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {/* Withdrawal Info */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-heading">Total Withdrawn</h3>
            <p className="text-2xl font-extrabold text-heading mt-1">{fmt(data?.totalWithdrawn || 0)}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
            <ArrowDownRight className="w-6 h-6 text-red-500" />
          </div>
        </div>
      </div>
    </div>
  )
}
