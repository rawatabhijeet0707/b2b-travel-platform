import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, CreditCard, Check, X, Clock, DollarSign, TrendingUp } from 'lucide-react'

const dummyPayments = [
  { id: 'PAY001', user: 'Rahul Sharma', gateway: 'Razorpay', method: 'UPI', amount: 18999, bookingId: 'BK001', txnId: 'rzp_abc123', date: '2024-07-20 14:35', status: 'captured' },
  { id: 'PAY002', user: 'Priya Patel', gateway: 'PhonePe', method: 'Wallet', amount: 13500, bookingId: 'BK002', txnId: 'pp_xyz789', date: '2024-07-20 12:18', status: 'captured' },
  { id: 'PAY003', user: 'Amit Kumar', gateway: 'Cashfree', method: 'Net Banking', amount: 79999, bookingId: 'BK003', txnId: 'cf_def456', date: '2024-07-19 18:48', status: 'pending' },
  { id: 'PAY004', user: 'Sneha Reddy', gateway: 'Stripe', method: 'Card', amount: 5500, bookingId: 'BK004', txnId: 'st_ghi789', date: '2024-07-18 11:32', status: 'captured' },
  { id: 'PAY005', user: 'Vikram Singh', gateway: 'PayU', method: 'UPI', amount: 899, bookingId: 'BK005', txnId: 'pu_jkl012', date: '2024-07-17 17:38', status: 'captured' },
  { id: 'PAY006', user: 'Rahul Sharma', gateway: 'Razorpay', method: 'Card', amount: 22500, bookingId: 'BK006', txnId: 'rzp_mno345', date: '2024-07-15 09:20', status: 'refunded' },
  { id: 'PAY007', user: 'Priya Patel', gateway: 'Razorpay', method: 'UPI', amount: 28000, bookingId: 'BK007', txnId: 'rzp_pqr678', date: '2024-07-14 16:25', status: 'captured' },
  { id: 'PAY008', user: 'Rajesh Kumar', gateway: 'Stripe', method: 'Card', amount: 159999, bookingId: 'BK008', txnId: 'st_stu901', date: '2024-07-12 14:15', status: 'failed' },
  { id: 'PAY009', user: 'Neha Gupta', gateway: 'PhonePe', method: 'Wallet', amount: 5499, bookingId: 'BK009', txnId: 'pp_vwx234', date: '2024-07-10 11:30', status: 'captured' },
  { id: 'PAY010', user: 'Anita Desai', gateway: 'Cashfree', method: 'Net Banking', amount: 32000, bookingId: 'BK010', txnId: 'cf_yza567', date: '2024-07-08 10:55', status: 'captured' },
]

const statusColors = { captured: 'text-green-600 bg-green-50 border-green-200', pending: 'text-amber-600 bg-amber-50 border-amber-200', failed: 'text-red-600 bg-red-50 border-red-200', refunded: 'text-blue-600 bg-blue-50 border-blue-200' }
const statusIcons = { captured: Check, pending: Clock, failed: X, refunded: TrendingUp }
const gatewayColors = { Razorpay: '#3395FF', PhonePe: '#5F259F', Cashfree: '#FF6B35', Stripe: '#635BFF', PayU: '#00B85C' }

export default function AdminPayments() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filtered = dummyPayments.filter(p => {
    if (search && !p.id.toLowerCase().includes(search.toLowerCase()) && !p.user.toLowerCase().includes(search.toLowerCase()) && !p.txnId.toLowerCase().includes(search.toLowerCase())) return false
    if (statusFilter && p.status !== statusFilter) return false
    return true
  })

  const totalCaptured = dummyPayments.filter(p => p.status === 'captured').reduce((s, p) => s + p.amount, 0)
  const totalRefunded = dummyPayments.filter(p => p.status === 'refunded').reduce((s, p) => s + p.amount, 0)

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-extrabold text-heading">Payments</h1><p className="text-sm text-text-secondary mt-0.5">Track all payment gateway transactions</p></div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Payments', value: dummyPayments.length, color: 'from-blue-500 to-blue-600' },
          { label: 'Captured', value: `\u20B9${(totalCaptured / 100000).toFixed(1)}L`, color: 'from-green-500 to-green-600' },
          { label: 'Refunded', value: `\u20B9${(totalRefunded / 100000).toFixed(1)}L`, color: 'from-blue-500 to-blue-600' },
          { label: 'Failed', value: dummyPayments.filter(p => p.status === 'failed').length, color: 'from-red-500 to-red-600' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-2`}><DollarSign className="w-4.5 h-4.5 text-white" /></div>
            <p className="text-xs text-text-tertiary font-medium">{s.label}</p><p className="text-lg font-extrabold text-heading">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" /><input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by ID, user, or txn ID..." className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" /></div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary"><option value="">All Status</option><option value="captured">Captured</option><option value="pending">Pending</option><option value="failed">Failed</option><option value="refunded">Refunded</option></select>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto"><table className="w-full">
          <thead><tr className="border-b border-slate-200 bg-slate-50">
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3">Payment ID</th>
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3">User</th>
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3 hidden sm:table-cell">Gateway</th>
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3 hidden md:table-cell">Method</th>
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3">Amount</th>
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3 hidden lg:table-cell">Txn ID</th>
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3 hidden lg:table-cell">Date</th>
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3">Status</th>
          </tr></thead>
          <tbody>
            {filtered.map((p, i) => {
              const StatusIcon = statusIcons[p.status] || Clock
              return (
                <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm font-bold text-heading">{p.id}</td>
                  <td className="px-4 py-3 text-sm text-heading">{p.user}</td>
                  <td className="px-4 py-3 hidden sm:table-cell"><span className="flex items-center gap-1.5 text-xs font-medium"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: gatewayColors[p.gateway] || '#2563EB' }} />{p.gateway}</span></td>
                  <td className="px-4 py-3 hidden md:table-cell"><span className="flex items-center gap-1 text-xs text-text-secondary"><CreditCard className="w-3 h-3 text-text-tertiary" />{p.method}</span></td>
                  <td className="px-4 py-3 text-sm font-bold text-heading">{"\u20B9"}{p.amount.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-xs font-mono text-text-tertiary">{p.txnId}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-xs text-text-tertiary">{p.date}</td>
                  <td className="px-4 py-3"><span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${statusColors[p.status] || ''}`}><StatusIcon className="w-2.5 h-2.5" />{p.status}</span></td>
                </motion.tr>
              )
            })}
          </tbody>
        </table></div>
      </div>
    </div>
  )
}
