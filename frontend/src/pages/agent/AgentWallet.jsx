import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight, Loader2, DollarSign } from 'lucide-react'
import { agentService } from '../../services/agentService.js'

export default function AgentWallet() {
  const [wallet, setWallet] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      agentService.getWallet(),
      agentService.getTransactions(1, 5),
    ])
      .then(([w, t]) => {
        setWallet(w)
        setTransactions(t.transactions || [])
      })
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
        <h1 className="text-2xl font-extrabold text-heading">Wallet</h1>
        <p className="text-sm text-text-secondary mt-0.5">Manage your wallet balance and withdrawals</p>
      </div>

      {/* Wallet Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl shadow-premium"
      >
        <div className="absolute inset-0 gradient-bg-animated" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="relative p-6 sm:p-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-white/60 text-sm">Available Balance</p>
              <p className="text-3xl font-extrabold font-heading mt-1">{fmt(wallet?.balance || 0)}</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
              <Wallet className="w-7 h-7 text-white" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="px-3 py-2 rounded-xl bg-white/10 backdrop-blur-sm">
              <p className="text-[10px] text-white/60 uppercase tracking-wide">Total Earned</p>
              <p className="text-sm font-bold mt-0.5">{fmt(wallet?.totalEarned || 0)}</p>
            </div>
            <div className="px-3 py-2 rounded-xl bg-white/10 backdrop-blur-sm">
              <p className="text-[10px] text-white/60 uppercase tracking-wide">Pending</p>
              <p className="text-sm font-bold mt-0.5">{fmt(wallet?.pendingCommission || 0)}</p>
            </div>
            <div className="px-3 py-2 rounded-xl bg-white/10 backdrop-blur-sm">
              <p className="text-[10px] text-white/60 uppercase tracking-wide">Withdrawn</p>
              <p className="text-sm font-bold mt-0.5">{fmt(wallet?.totalWithdrawn || 0)}</p>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button className="flex-1 py-2.5 bg-white text-primary rounded-xl text-sm font-bold hover:shadow-lg transition-all">
              Add Funds
            </button>
            <button className="flex-1 py-2.5 bg-white/15 backdrop-blur-sm text-white border border-white/20 rounded-xl text-sm font-bold hover:bg-white/25 transition-all">
              Withdraw
            </button>
          </div>
        </div>
      </motion.div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-heading mb-4">Recent Transactions</h3>
        <div className="space-y-2">
          {transactions.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                t.type === 'credit' ? 'bg-emerald-50' : 'bg-red-50'
              }`}>
                {t.type === 'credit'
                  ? <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                  : <ArrowDownRight className="w-4 h-4 text-red-500" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-heading truncate">{t.description}</p>
                <p className="text-xs text-text-tertiary">{t.id} · {new Date(t.created_at).toLocaleDateString('en-IN')}</p>
              </div>
              <p className={`text-sm font-bold shrink-0 ${t.type === 'credit' ? 'text-emerald-600' : 'text-red-500'}`}>
                {t.type === 'credit' ? '+' : '-'}{fmt(t.amount)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
