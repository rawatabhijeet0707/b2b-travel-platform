import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, CreditCard, Check, X, Clock, DollarSign, TrendingUp, Loader2, Download, RotateCw } from 'lucide-react'
import { paymentService } from '../../services/paymentService.js'

const statusColors = { success: 'text-green-600 bg-green-50 border-green-200', pending: 'text-amber-600 bg-amber-50 border-amber-200', failed: 'text-red-600 bg-red-50 border-red-200', refunded: 'text-blue-600 bg-blue-50 border-blue-200', processing: 'text-blue-600 bg-blue-50 border-blue-200', cancelled: 'text-slate-600 bg-slate-100 border-slate-200' }
const statusIcons = { success: Check, pending: Clock, failed: X, refunded: RotateCw, processing: Clock, cancelled: X }

export default function AdminPayments() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [payments, setPayments] = useState([])
  const [stats, setStats] = useState({ total: 0, success: 0, failed: 0, refunded: 0, totalAmount: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      paymentService.getAllPayments({ limit: 100 }).catch(() => ({ transactions: [] })),
      paymentService.getStats().catch(() => ({ stats: {} })),
    ]).then(([payRes, statsRes]) => {
      setPayments(payRes.transactions || [])
      setStats(statsRes.stats || { total: 0, success: 0, failed: 0, refunded: 0, totalAmount: 0 })
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const filtered = payments.filter(p => {
    if (search && !String(p.id).includes(search) && !String(p.order_id).includes(search) && !String(p.payment_id).includes(search)) return false
    if (statusFilter && p.status !== statusFilter) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-extrabold text-heading">Payments</h1><p className="text-sm text-text-secondary mt-0.5">Track all payment gateway transactions</p></div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white gradient-bg rounded-xl shadow-glow">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Payments', value: stats.total || 0, color: 'from-blue-500 to-blue-600' },
          { label: 'Captured', value: `\u20B9${((stats.totalAmount || 0) / 100000).toFixed(1)}L`, color: 'from-green-500 to-green-600' },
          { label: 'Refunded', value: stats.refunded || 0, color: 'from-blue-500 to-blue-600' },
          { label: 'Failed', value: stats.failed || 0, color: 'from-red-500 to-red-600' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-2`}><DollarSign className="w-4.5 h-4.5 text-white" /></div>
            <p className="text-xs text-text-tertiary font-medium">{s.label}</p><p className="text-lg font-extrabold text-heading">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" /><input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by ID, order ID, or payment ID..." className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" /></div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary"><option value="">All Status</option><option value="success">Success</option><option value="pending">Pending</option><option value="failed">Failed</option><option value="refunded">Refunded</option></select>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 flex items-center justify-center"><Loader2 className="w-6 h-6 text-primary animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-sm text-text-secondary">No payment transactions found</div>
        ) : (
          <div className="overflow-x-auto"><table className="w-full">
            <thead><tr className="border-b border-slate-200 bg-slate-50">
              <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3">Txn ID</th>
              <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3">Booking Type</th>
              <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3 hidden sm:table-cell">Order ID</th>
              <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3 hidden md:table-cell">Payment ID</th>
              <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3">Amount</th>
              <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3 hidden lg:table-cell">Date</th>
              <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3">Status</th>
            </tr></thead>
            <tbody>
              {filtered.map((p, i) => {
                const StatusIcon = statusIcons[p.status] || Clock
                return (
                  <motion.tr key={p.id || i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm font-bold text-heading">#{p.id}</td>
                    <td className="px-4 py-3 text-sm text-heading">{p.booking_type}</td>
                    <td className="px-4 py-3 hidden sm:table-cell text-xs font-mono text-text-tertiary">{p.order_id?.slice(-12)}</td>
                    <td className="px-4 py-3 hidden md:table-cell text-xs font-mono text-text-tertiary">{p.payment_id || '-'}</td>
                    <td className="px-4 py-3 text-sm font-bold text-heading">{'\u20B9'}{Number(p.amount || 0).toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3 hidden lg:table-cell text-xs text-text-tertiary">{new Date(p.created_at).toLocaleDateString('en-IN')}</td>
                    <td className="px-4 py-3"><span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${statusColors[p.status] || ''}`}><StatusIcon className="w-2.5 h-2.5" />{p.status}</span></td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table></div>
        )}
      </div>
    </div>
  )
}
