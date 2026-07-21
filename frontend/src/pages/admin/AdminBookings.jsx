import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Plane, Hotel, Package, Stamp, ShieldCheck, Download } from 'lucide-react'
import { adminService } from '../../services/adminService.js'

const typeIcons = { Flight: Plane, Hotel: Hotel, Package: Package, Visa: Stamp, Insurance: ShieldCheck }
const statusColors = {
  confirmed: 'text-green-600 bg-green-50 border-green-200',
  pending: 'text-amber-600 bg-amber-50 border-amber-200',
  cancelled: 'text-red-600 bg-red-50 border-red-200',
}
const paymentColors = {
  paid: 'text-green-600 bg-green-50 border-green-200',
  pending: 'text-amber-600 bg-amber-50 border-amber-200',
  refunded: 'text-blue-600 bg-blue-50 border-blue-200',
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    adminService.getBookings().then(res => { setBookings(res.data || []); setLoading(false) })
  }, [])

  const filtered = bookings.filter(b => {
    if (search && !b.id.toLowerCase().includes(search.toLowerCase()) && !b.customer.toLowerCase().includes(search.toLowerCase())) return false
    if (typeFilter && b.type !== typeFilter) return false
    if (statusFilter && b.status !== statusFilter) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-heading">Bookings</h1>
          <p className="text-sm text-text-secondary mt-0.5">Manage all bookings across services</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-heading hover:bg-slate-50">
          <Download className="w-3.5 h-3.5" /> Export
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by booking ID or customer..." className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
        </div>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary">
          <option value="">All Types</option>
          <option>Flight</option><option>Hotel</option><option>Package</option><option>Visa</option><option>Insurance</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary">
          <option value="">All Status</option>
          <option>confirmed</option><option>pending</option><option>cancelled</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3">ID</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3">Type</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3">Customer</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3 hidden sm:table-cell">Details</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3 hidden md:table-cell">Date</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3">Amount</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3">Status</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3">Payment</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="8" className="text-center py-12 text-text-tertiary text-sm">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan="8" className="text-center py-12 text-text-tertiary text-sm">No bookings found</td></tr>
              ) : filtered.map((b, i) => {
                const Icon = typeIcons[b.type] || Package
                return (
                  <motion.tr key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm font-bold text-heading">{b.id}</td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1.5 text-xs font-medium text-text-secondary">
                        <Icon className="w-3.5 h-3.5 text-primary" /> {b.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-heading">{b.customer}</td>
                    <td className="px-4 py-3 hidden sm:table-cell text-sm text-text-secondary">{b.route}</td>
                    <td className="px-4 py-3 hidden md:table-cell text-sm text-text-secondary">{b.date}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-heading">{"\u20B9"}{b.amount.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex text-xs font-medium px-2 py-0.5 rounded-full border ${statusColors[b.status] || ''}`}>{b.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex text-xs font-medium px-2 py-0.5 rounded-full border ${paymentColors[b.payment] || ''}`}>{b.payment}</span>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
