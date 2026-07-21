import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowDownLeft, ArrowUpRight, CreditCard, Wallet, TrendingUp,
  Search, Filter, Download, MoreVertical, CheckCircle2, Clock,
  Plane, Hotel, Stamp, Package, ShieldCheck
} from 'lucide-react'
import PremiumBadge from '../../components/ui/PremiumBadge.jsx'
import StatCard from '../../components/ui/StatCard.jsx'
import AnimatedBlobs from '../../components/ui/AnimatedBlobs.jsx'

const transactions = [
  { id: 'TXN-9021', type: 'Credit', desc: 'Wallet top-up via UPI', amount: '+₹50,000', time: 'Today, 2:30 PM', status: 'success', icon: Wallet },
  { id: 'TXN-9020', type: 'Debit', desc: 'Flight booking: DEL →™ DXB', amount: '-₹18,999', time: 'Today, 11:15 AM', status: 'success', icon: Plane },
  { id: 'TXN-9019', type: 'Debit', desc: 'Hotel booking: Grand Palace', amount: '-₹8,500', time: 'Yesterday, 4:45 PM', status: 'success', icon: Hotel },
  { id: 'TXN-9018', type: 'Credit', desc: 'Refund: Cancelled visa', amount: '+₹3,500', time: 'Yesterday, 1:20 PM', status: 'success', icon: Stamp },
  { id: 'TXN-9017', type: 'Debit', desc: 'Holiday package: Bali Tour', amount: '-₹24,999', time: 'Jan 16, 10:00 AM', status: 'success', icon: Package },
  { id: 'TXN-9016', type: 'Debit', desc: 'Travel insurance premium', amount: '-₹1,200', time: 'Jan 15, 3:30 PM', status: 'success', icon: ShieldCheck },
  { id: 'TXN-9015', type: 'Credit', desc: 'Commission payout', amount: '+₹12,450', time: 'Jan 15, 9:00 AM', status: 'success', icon: TrendingUp },
  { id: 'TXN-9014', type: 'Debit', desc: 'Flight booking: BOM →™ SIN', amount: '-₹22,500', time: 'Jan 14, 6:15 PM', status: 'pending', icon: Plane },
]

export default function PaymentsPage() {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? transactions : transactions.filter(t => t.type.toLowerCase() === filter)

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
        <StatCard icon={Wallet} label="Current Balance" value="2,48,500" delay={0} prefix="₹" color="primary" />
        <StatCard icon={ArrowDownLeft} label="Total Credited" value="5,62,450" delay={0.1} prefix="₹" color="success" />
        <StatCard icon={ArrowUpRight} label="Total Debited" value="3,13,950" delay={0.2} prefix="₹" color="warning" />
        <StatCard icon={TrendingUp} label="Commission Earned" value="1,87,200" delay={0.3} prefix="₹" color="accent" />
      </div>

      {/* Transaction Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative glass-strong rounded-card shadow-card overflow-hidden"
      >
        <div className="p-6 border-b border-border/40 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-heading font-heading font-heading">Transaction History</h3>
            <p className="text-sm text-text-secondary">All your payments and credits</p>
          </div>
          <div className="flex gap-2">
            <div className="flex gap-1 bg-white/40 rounded-xl p-1">
              {['all', 'credit', 'debit'].map(f => (
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
        </div>

        {/* Timeline */}
        <div className="p-6 space-y-1">
          {filtered.map((txn, i) => (
            <motion.div
              key={txn.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/30 transition-colors group"
            >
              {/* Icon */}
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${txn.type === 'Credit' ? 'bg-emerald-50' : 'bg-red-50'}`}>
                <txn.icon className={`w-5 h-5 ${txn.type === 'Credit' ? 'text-emerald-600' : 'text-red-500'}`} />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-heading truncate">{txn.desc}</p>
                <p className="text-xs text-text-tertiary flex items-center gap-2 mt-0.5">
                  <span>{txn.id}</span>
                  <span>→</span>
                  <span>{txn.time}</span>
                </p>
              </div>

              {/* Amount */}
              <div className="text-right shrink-0">
                <p className={`text-sm font-bold ${txn.type === 'Credit' ? 'text-emerald-600' : 'text-heading'}`}>
                  {txn.amount}
                </p>
                <PremiumBadge variant={txn.status === 'success' ? 'success' : 'warning'}>
                  {txn.status === 'success' ? 'COMPLETED' : 'PENDING'}
                </PremiumBadge>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
