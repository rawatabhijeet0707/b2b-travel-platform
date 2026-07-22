import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Wallet, Download, CheckCircle2, Clock, XCircle, RotateCw,
  Plane, Hotel, Stamp, Package, ShieldCheck, Loader2,
  CreditCard, Receipt,
} from 'lucide-react'
import PremiumBadge from '../../components/ui/PremiumBadge.jsx'
import StatCard from '../../components/ui/StatCard.jsx'
import AnimatedBlobs from '../../components/ui/AnimatedBlobs.jsx'
import { paymentService } from '../../services/paymentService.js'

const bookingIcons = {
  FLIGHT: Plane,
  HOTEL: Hotel,
  VISA: Stamp,
  PACKAGE: Package,
  INSURANCE: ShieldCheck,
}

const statusConfig = {
  success: { badge: 'success', label: 'COMPLETED' },
  pending: { badge: 'warning', label: 'PENDING' },
  processing: { badge: 'primary', label: 'PROCESSING' },
  failed: { badge: 'danger', label: 'FAILED' },
  cancelled: { badge: 'neutral', label: 'CANCELLED' },
  refunded: { badge: 'primary', label: 'REFUNDED' },
}

const formatAmt = (amt) => {
  const n = Number(amt) || 0
  return `\u20B9${n.toLocaleString('en-IN')}`
}

export default function PaymentsPage() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState({ total: 0, success: 0, failed: 0, refunded: 0, totalAmount: 0 })

  useEffect(() => {
    Promise.all([
      paymentService.getHistory(1, 50).catch(() => ({ transactions: [] })),
      paymentService.getStats().catch(() => ({ stats: {} })),
    ]).then(([histRes, statsRes]) => {
      setTransactions(histRes.transactions || [])
      setStats(statsRes.stats || { total: 0, success: 0, failed: 0, refunded: 0, totalAmount: 0 })
      setLoading(false)
    }).catch(() => {
      setError('Failed to load payment history')
      setLoading(false)
    })
  }, [])

  const filtered = filter === 'all'
    ? transactions
    : filter === 'credit'
    ? transactions.filter(t => t.status === 'refunded')
    : transactions.filter(t => t.status === filter)

  return (
    <div className="relative p-4 sm:p-6 lg:p-8 space-y-6 gradient-mesh min-h-screen">
      <AnimatedBlobs />

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-heading font-heading">Payments</h1>
          <p className="text-text-secondary mt-1">Track your transactions and payment history</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/40 border border-white/50 text-sm font-semibold text-heading hover:shadow-card transition-all"
        >
          <Download className="w-4 h-4" /> Export Statement
        </motion.button>
      </motion.div>

      {/* Stats */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={CreditCard} label="Total Payments" value={stats.total || 0} delay={0} color="primary" />
        <StatCard icon={CheckCircle2} label="Successful" value={stats.success || 0} delay={0.1} color="success" />
        <StatCard icon={XCircle} label="Failed" value={stats.failed || 0} delay={0.2} color="warning" />
        <StatCard icon={Wallet} label="Total Amount" value={formatAmt(stats.totalAmount || 0)} delay={0.3} color="accent" />
      </div>

      {/* Transaction History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative glass-strong rounded-card shadow-card overflow-hidden"
      >
        <div className="p-6 border-b border-border/40 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h3 className="text-lg font-bold text-heading font-heading">Transaction History</h3>
            <p className="text-sm text-text-secondary">All your payments and credits</p>
          </div>
          <div className="flex gap-1 bg-white/40 rounded-xl p-1">
            {['all', 'success', 'failed', 'refunded'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all capitalize ${filter === f ? 'gradient-bg text-white shadow-soft' : 'text-text-secondary hover:text-heading'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="p-12 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
            <span className="ml-2 text-sm text-text-secondary">Loading transactions...</span>
          </div>
        )}

        {error && !loading && (
          <div className="p-12 text-center text-sm text-red-500">{error}</div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="p-12 text-center">
            <Receipt className="w-12 h-12 text-text-tertiary mx-auto mb-3" />
            <p className="text-sm text-text-secondary">No transactions found</p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="p-6 space-y-1">
            {filtered.map((txn, i) => {
              const cfg = statusConfig[txn.status] || statusConfig.pending
              const Icon = bookingIcons[txn.booking_type] || CreditCard
              const isCredit = txn.status === 'refunded'
              return (
                <motion.div
                  key={txn.id || i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/30 transition-colors group cursor-pointer"
                  onClick={() => navigate('/app/wallet')}
                >
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${isCredit ? 'bg-emerald-50' : 'bg-red-50'}`}>
                    <Icon className={`w-5 h-5 ${isCredit ? 'text-emerald-600' : 'text-red-500'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-heading truncate">
                      {txn.booking_type} Booking
                    </p>
                    <p className="text-xs text-text-tertiary flex items-center gap-2 mt-0.5">
                      <span>#{txn.order_id?.slice(-8) || txn.id}</span>
                      <span>·</span>
                      <span>{new Date(txn.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-sm font-bold ${isCredit ? 'text-emerald-600' : 'text-heading'}`}>
                      {isCredit ? '+' : '-'}{formatAmt(txn.amount)}
                    </p>
                    <PremiumBadge variant={cfg.badge}>{cfg.label}</PremiumBadge>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </motion.div>
    </div>
  )
}
