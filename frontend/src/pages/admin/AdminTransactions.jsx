import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ArrowUpRight, ArrowDownRight, Download, CreditCard, Wallet, Banknote } from 'lucide-react'

const dummyTxns = [
  { id: 'TXN001', user: 'Rahul Sharma', type: 'credit', method: 'Razorpay', amount: 50000, description: 'Wallet Top-up', date: '2024-07-20 14:32', status: 'success' },
  { id: 'TXN002', user: 'Priya Patel', type: 'debit', method: 'Wallet', amount: 13500, description: 'Hotel Booking - Goa', date: '2024-07-20 12:15', status: 'success' },
  { id: 'TXN003', user: 'Amit Kumar', type: 'debit', method: 'Wallet', amount: 79999, description: 'Package Booking - Maldives', date: '2024-07-19 18:45', status: 'pending' },
  { id: 'TXN004', user: 'Vikram Singh', type: 'credit', method: 'Bank Transfer', amount: 100000, description: 'Wallet Top-up', date: '2024-07-19 15:20', status: 'success' },
  { id: 'TXN005', user: 'Sneha Reddy', type: 'debit', method: 'Stripe', amount: 5500, description: 'Visa Booking - UAE', date: '2024-07-18 11:30', status: 'success' },
  { id: 'TXN006', user: 'Rahul Sharma', type: 'debit', method: 'Wallet', amount: 18999, description: 'Flight Booking - DEL to DXB', date: '2024-07-18 09:15', status: 'success' },
  { id: 'TXN007', user: 'Neha Gupta', type: 'credit', method: 'PhonePe', amount: 20000, description: 'Wallet Top-up', date: '2024-07-17 16:42', status: 'success' },
  { id: 'TXN008', user: 'Rajesh Kumar', type: 'debit', method: 'Wallet', amount: 22500, description: 'Flight Booking - BOM to SIN', date: '2024-07-17 14:10', status: 'failed' },
  { id: 'TXN009', user: 'Priya Patel', type: 'credit', method: 'Razorpay', amount: 30000, description: 'Wallet Top-up', date: '2024-07-16 13:25', status: 'success' },
  { id: 'TXN010', user: 'Anita Desai', type: 'debit', method: 'Cashfree', amount: 28000, description: 'Hotel Booking - Dubai', date: '2024-07-16 10:50', status: 'success' },
  { id: 'TXN011', user: 'Vikram Singh', type: 'debit', method: 'Wallet', amount: 899, description: 'Travel Insurance', date: '2024-07-15 17:35', status: 'success' },
  { id: 'TXN012', user: 'Rajesh Kumar', type: 'credit', method: 'PayU', amount: 75000, description: 'Wallet Top-up', date: '2024-07-15 11:20', status: 'success' },
]

const methodIcons = { Razorpay: CreditCard, Wallet: Wallet, 'Bank Transfer': Banknote, Stripe: CreditCard, PhonePe: CreditCard, Cashfree: CreditCard, 'PayU': CreditCard }
const statusColors = { success: 'text-green-600 bg-green-50 border-green-200', pending: 'text-amber-600 bg-amber-50 border-amber-200', failed: 'text-red-600 bg-red-50 border-red-200' }

export default function AdminTransactions() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')

  const filtered = dummyTxns.filter(t => {
    if (search && !t.id.toLowerCase().includes(search.toLowerCase()) && !t.user.toLowerCase().includes(search.toLowerCase()) && !t.description.toLowerCase().includes(search.toLowerCase())) return false
    if (typeFilter && t.type !== typeFilter) return false
    return true
  })

  const totalCredit = dummyTxns.filter(t => t.type === 'credit' && t.status === 'success').reduce((s, t) => s + t.amount, 0)
  const totalDebit = dummyTxns.filter(t => t.type === 'debit' && t.status === 'success').reduce((s, t) => s + t.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-extrabold text-heading">Transactions</h1><p className="text-sm text-text-secondary mt-0.5">All wallet and payment transactions</p></div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-heading hover:bg-slate-50"><Download className="w-3.5 h-3.5" /> Export</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Transactions', value: dummyTxns.length, color: 'from-blue-500 to-blue-600' },
          { label: 'Total Credit', value: `\u20B9${(totalCredit / 100000).toFixed(1)}L`, color: 'from-green-500 to-green-600' },
          { label: 'Total Debit', value: `\u20B9${(totalDebit / 100000).toFixed(1)}L`, color: 'from-red-500 to-red-600' },
          { label: 'Success Rate', value: `${Math.round((dummyTxns.filter(t => t.status === 'success').length / dummyTxns.length) * 100)}%`, color: 'from-purple-500 to-purple-600' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-2`}><CreditCard className="w-4.5 h-4.5 text-white" /></div>
            <p className="text-xs text-text-tertiary font-medium">{s.label}</p><p className="text-lg font-extrabold text-heading">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" /><input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by ID, user, or description..." className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" /></div>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary"><option value="">All Types</option><option value="credit">Credit</option><option value="debit">Debit</option></select>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto"><table className="w-full">
          <thead><tr className="border-b border-slate-200 bg-slate-50">
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3">ID</th>
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3">User</th>
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3 hidden sm:table-cell">Description</th>
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3 hidden md:table-cell">Method</th>
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3">Amount</th>
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3 hidden lg:table-cell">Date</th>
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3">Status</th>
          </tr></thead>
          <tbody>
            {filtered.map((t, i) => {
              const Icon = methodIcons[t.method] || CreditCard
              return (
                <motion.tr key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm font-bold text-heading">{t.id}</td>
                  <td className="px-4 py-3 text-sm text-heading">{t.user}</td>
                  <td className="px-4 py-3 hidden sm:table-cell text-sm text-text-secondary">{t.description}</td>
                  <td className="px-4 py-3 hidden md:table-cell"><span className="flex items-center gap-1.5 text-xs font-medium text-text-secondary"><Icon className="w-3.5 h-3.5 text-primary" />{t.method}</span></td>
                  <td className="px-4 py-3"><span className={`flex items-center gap-1 text-sm font-bold ${t.type === 'credit' ? 'text-green-600' : 'text-red-500'}`}>{t.type === 'credit' ? <ArrowDownRight className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}{"\u20B9"}{t.amount.toLocaleString('en-IN')}</span></td>
                  <td className="px-4 py-3 hidden lg:table-cell text-xs text-text-tertiary">{t.date}</td>
                  <td className="px-4 py-3"><span className={`inline-flex text-xs font-medium px-2 py-0.5 rounded-full border ${statusColors[t.status] || ''}`}>{t.status}</span></td>
                </motion.tr>
              )
            })}
          </tbody>
        </table></div>
      </div>
    </div>
  )
}
