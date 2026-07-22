import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Wallet, Plus, ArrowUpRight, ArrowDownRight, Download, CreditCard, TrendingUp } from 'lucide-react'
import AnimatedCounter from '../../components/ui/AnimatedCounter.jsx'
import AnimatedBlobs from '../../components/ui/AnimatedBlobs.jsx'
import Badge from '../../components/ui/Badge.jsx'

const transactions = [
  { desc: 'Flight Booking TD-2401', type: 'debit', amount: '₹18,999', date: 'Jan 18, 2025', time: '14:32' },
  { desc: 'Wallet Top-up', type: 'credit', amount: '₹50,000', date: 'Jan 17, 2025', time: '10:15' },
  { desc: 'Hotel Booking TD-2400', type: 'debit', amount: '₹8,500', date: 'Jan 17, 2025', time: '09:20' },
  { desc: 'Refund - TD-2395', type: 'credit', amount: '₹12,999', date: 'Jan 16, 2025', time: '16:45' },
  { desc: 'Visa Application TD-2398', type: 'debit', amount: '₹3,500', date: 'Jan 16, 2025', time: '11:30' },
  { desc: 'Reward Cashback', type: 'credit', amount: '₹2,400', date: 'Jan 15, 2025', time: '08:00' },
]

export default function WalletPage() {
  const navigate = useNavigate()
  return (
    <div className="relative p-4 sm:p-6 lg:p-8 space-y-6 gradient-mesh min-h-screen">
      <AnimatedBlobs />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl lg:text-3xl font-bold text-heading font-heading">Wallet & Credits</h1>
        <p className="text-text-secondary mt-1">Manage your funds, credit limits, and transactions.</p>
      </motion.div>

      {/* Wallet Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative gradient-bg-animated rounded-card p-6 text-white overflow-hidden lg:col-span-2"
        >
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-card/10 blur-3xl" />
          <div className="relative">
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="text-white/70 text-sm">Available Balance</p>
                <p className="text-4xl font-extrabold mt-1">
                  ₹<AnimatedCounter value={248500} />
                </p>
              </div>
              <Wallet className="w-8 h-8 text-white/70" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-xs">Account Holder</p>
                <p className="font-semibold">SkyHigh Travels</p>
              </div>
              <div className="text-right">
                <p className="text-white/60 text-xs">Account ID</p>
                <p className="font-semibold">TD-WAL-001234</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Credit Limit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-strong rounded-card p-6 shadow-card"
        >
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-heading font-heading">Credit Facility</h3>
          </div>
          <p className="text-3xl font-extrabold text-heading">₹35,000</p>
          <p className="text-sm text-text-secondary mt-1">Available credit limit</p>
          <div className="mt-4 h-2 bg-white/40 rounded-full overflow-hidden">
            <div className="h-full bg-success rounded-full" style={{ width: '70%' }} />
          </div>
          <div className="flex justify-between mt-2 text-xs text-text-secondary">
            <span>Used: ₹15,000</span>
            <span>Total: ₹50,000</span>
          </div>
          <button onClick={() => navigate('/app/payments')} className="w-full mt-4 py-2.5 text-sm font-semibold text-primary bg-primary/10 rounded-xl hover:bg-primary hover:text-white transition-all">
            Request Credit Increase
          </button>
        </motion.div>
      </div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap gap-3"
      >
        <button onClick={() => navigate('/app/payments')} className="inline-flex items-center gap-2 px-6 py-3 gradient-bg text-white font-semibold rounded-xl hover:shadow-glow transition-all">
          <Plus className="w-5 h-5" /> Add Money
        </button>
        <button onClick={() => navigate('/app/reports')} className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border text-heading font-semibold rounded-xl hover:shadow-card transition-all">
          <Download className="w-5 h-5" /> Download Statement
        </button>
        <button onClick={() => navigate('/app/reports')} className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border text-heading font-semibold rounded-xl hover:shadow-card transition-all">
          <TrendingUp className="w-5 h-5" /> Transaction Report
        </button>
      </motion.div>

      {/* Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-strong rounded-card shadow-card overflow-hidden"
      >
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-bold text-heading font-heading">Recent Transactions</h3>
        </div>
        <div className="divide-y divide-border/40">
          {transactions.map((t, i) => (
            <div key={i} className="flex items-center gap-4 p-5 hover:bg-bg/50 transition-colors">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.type === 'credit' ? 'bg-success/10' : 'bg-danger/10'}`}>
                {t.type === 'credit' ? <ArrowDownRight className="w-5 h-5 text-success" /> : <ArrowUpRight className="w-5 h-5 text-danger" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-heading truncate">{t.desc}</p>
                <p className="text-xs text-text-secondary">{t.date} at {t.time}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold ${t.type === 'credit' ? 'text-success' : 'text-heading'}`}>
                  {t.type === 'credit' ? '+' : '-'}{t.amount}
                </p>
                <Badge variant={t.type === 'credit' ? 'success' : 'neutral'}>{t.type}</Badge>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
