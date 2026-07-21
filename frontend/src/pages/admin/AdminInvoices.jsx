import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, FileText, Download, Eye, Calendar, DollarSign } from 'lucide-react'

const dummyInvoices = [
  { id: 'INV-2024-001', user: 'Rahul Sharma', agency: 'SkyHigh Travels', type: 'Flight', amount: 18999, tax: 3420, total: 22419, date: '2024-07-20', dueDate: '2024-08-19', status: 'paid' },
  { id: 'INV-2024-002', user: 'Priya Patel', agency: 'Wanderlust Tours', type: 'Hotel', amount: 13500, tax: 2430, total: 15930, date: '2024-07-20', dueDate: '2024-08-19', status: 'paid' },
  { id: 'INV-2024-003', user: 'Amit Kumar', agency: 'Globe Trotter', type: 'Package', amount: 79999, tax: 14399, total: 94398, date: '2024-07-19', dueDate: '2024-08-18', status: 'pending' },
  { id: 'INV-2024-004', user: 'Sneha Reddy', agency: 'Travel XP', type: 'Visa', amount: 5500, tax: 990, total: 6490, date: '2024-07-18', dueDate: '2024-08-17', status: 'paid' },
  { id: 'INV-2024-005', user: 'Vikram Singh', agency: 'Happy Holidays', type: 'Insurance', amount: 899, tax: 162, total: 1061, date: '2024-07-17', dueDate: '2024-08-16', status: 'paid' },
  { id: 'INV-2024-006', user: 'Rahul Sharma', agency: 'SkyHigh Travels', type: 'Flight', amount: 22500, tax: 4050, total: 26550, date: '2024-07-15', dueDate: '2024-08-14', status: 'cancelled' },
  { id: 'INV-2024-007', user: 'Priya Patel', agency: 'Wanderlust Tours', type: 'Hotel', amount: 28000, tax: 5040, total: 33040, date: '2024-07-14', dueDate: '2024-08-13', status: 'paid' },
  { id: 'INV-2024-008', user: 'Rajesh Kumar', agency: 'World Tours', type: 'Package', amount: 159999, tax: 28799, total: 188798, date: '2024-07-12', dueDate: '2024-08-11', status: 'pending' },
  { id: 'INV-2024-009', user: 'Neha Gupta', agency: 'Fly High Travels', type: 'Flight', amount: 5499, tax: 990, total: 6489, date: '2024-07-10', dueDate: '2024-08-09', status: 'paid' },
  { id: 'INV-2024-010', user: 'Anita Desai', agency: 'Premium Travels', type: 'Hotel', amount: 32000, tax: 5760, total: 37760, date: '2024-07-08', dueDate: '2024-08-07', status: 'overdue' },
]

const statusColors = { paid: 'text-green-600 bg-green-50 border-green-200', pending: 'text-amber-600 bg-amber-50 border-amber-200', cancelled: 'text-red-600 bg-red-50 border-red-200', overdue: 'text-red-600 bg-red-50 border-red-200' }

export default function AdminInvoices() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filtered = dummyInvoices.filter(inv => {
    if (search && !inv.id.toLowerCase().includes(search.toLowerCase()) && !inv.user.toLowerCase().includes(search.toLowerCase())) return false
    if (statusFilter && inv.status !== statusFilter) return false
    return true
  })

  const totalAmount = dummyInvoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.total, 0)
  const pendingAmount = dummyInvoices.filter(i => i.status === 'pending' || i.status === 'overdue').reduce((s, i) => s + i.total, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-extrabold text-heading">Invoices</h1><p className="text-sm text-text-secondary mt-0.5">Manage and track all invoices</p></div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-heading hover:bg-slate-50"><Download className="w-3.5 h-3.5" /> Export All</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Invoices', value: dummyInvoices.length, color: 'from-blue-500 to-blue-600' },
          { label: 'Paid Amount', value: `\u20B9${(totalAmount / 100000).toFixed(1)}L`, color: 'from-green-500 to-green-600' },
          { label: 'Pending Amount', value: `\u20B9${(pendingAmount / 100000).toFixed(1)}L`, color: 'from-amber-500 to-orange-500' },
          { label: 'Overdue', value: dummyInvoices.filter(i => i.status === 'overdue').length, color: 'from-red-500 to-red-600' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-2`}><FileText className="w-4.5 h-4.5 text-white" /></div>
            <p className="text-xs text-text-tertiary font-medium">{s.label}</p><p className="text-lg font-extrabold text-heading">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" /><input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search invoice ID or user..." className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" /></div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary"><option value="">All Status</option><option value="paid">Paid</option><option value="pending">Pending</option><option value="overdue">Overdue</option><option value="cancelled">Cancelled</option></select>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto"><table className="w-full">
          <thead><tr className="border-b border-slate-200 bg-slate-50">
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3">Invoice ID</th>
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3">User</th>
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3 hidden sm:table-cell">Type</th>
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3">Amount</th>
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3 hidden md:table-cell">Tax (GST)</th>
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3">Total</th>
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3 hidden lg:table-cell">Date</th>
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3">Status</th>
            <th className="text-right text-xs font-bold text-text-tertiary uppercase px-4 py-3">Actions</th>
          </tr></thead>
          <tbody>
            {filtered.map((inv, i) => (
              <motion.tr key={inv.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3 text-sm font-bold text-heading">{inv.id}</td>
                <td className="px-4 py-3"><p className="text-sm font-semibold text-heading">{inv.user}</p><p className="text-xs text-text-tertiary">{inv.agency}</p></td>
                <td className="px-4 py-3 hidden sm:table-cell"><span className="text-xs font-medium px-2 py-0.5 rounded-full text-primary bg-primary/10">{inv.type}</span></td>
                <td className="px-4 py-3 text-sm font-semibold text-heading">{"\u20B9"}{inv.amount.toLocaleString('en-IN')}</td>
                <td className="px-4 py-3 hidden md:table-cell text-sm text-text-secondary">{"\u20B9"}{inv.tax.toLocaleString('en-IN')}</td>
                <td className="px-4 py-3 text-sm font-bold text-heading">{"\u20B9"}{inv.total.toLocaleString('en-IN')}</td>
                <td className="px-4 py-3 hidden lg:table-cell text-xs text-text-tertiary flex items-center gap-1 mt-3"><Calendar className="w-3 h-3" />{inv.date}</td>
                <td className="px-4 py-3"><span className={`inline-flex text-xs font-medium px-2 py-0.5 rounded-full border ${statusColors[inv.status] || ''}`}>{inv.status}</span></td>
                <td className="px-4 py-3"><div className="flex items-center justify-end gap-1"><button className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-text-secondary hover:text-primary"><Eye className="w-3.5 h-3.5" /></button><button className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-text-secondary hover:text-primary"><Download className="w-3.5 h-3.5" /></button></div></td>
              </motion.tr>
            ))}
          </tbody>
        </table></div>
      </div>
    </div>
  )
}
