import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plane, Hotel, Package, Stamp, ShieldCheck, Search, Filter, Loader2, BookOpen } from 'lucide-react'
import { agentService } from '../../services/agentService.js'

export default function AgentBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    loadBookings()
  }, [search, typeFilter, statusFilter])

  const loadBookings = () => {
    setLoading(true)
    agentService.getBookings({ search, type: typeFilter, status: statusFilter })
      .then(data => setBookings(data.data || []))
      .catch(err => setError(err.message || 'Failed to load bookings'))
      .finally(() => setLoading(false))
  }

  const typeIcon = { Flight: Plane, Hotel: Hotel, Package: Package, Visa: Stamp, Insurance: ShieldCheck }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-heading">All Bookings</h1>
        <p className="text-sm text-text-secondary mt-0.5">Manage and track all your bookings</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by booking ID or customer..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-heading placeholder:text-text-tertiary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-heading focus:outline-none focus:border-primary transition-all"
          >
            <option value="">All Types</option>
            <option value="Flight">Flight</option>
            <option value="Hotel">Hotel</option>
            <option value="Package">Package</option>
            <option value="Visa">Visa</option>
            <option value="Insurance">Insurance</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-heading focus:outline-none focus:border-primary transition-all"
          >
            <option value="">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
            <span className="ml-2 text-sm text-text-secondary">Loading bookings...</span>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-12 text-sm text-red-500">{error}</div>
        ) : bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <BookOpen className="w-10 h-10 text-text-tertiary mb-2" />
            <span className="text-sm text-text-secondary">No bookings found</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50">
                  <th className="text-left text-xs font-bold text-text-secondary uppercase tracking-wide px-5 py-3">Booking ID</th>
                  <th className="text-left text-xs font-bold text-text-secondary uppercase tracking-wide px-5 py-3">Type</th>
                  <th className="text-left text-xs font-bold text-text-secondary uppercase tracking-wide px-5 py-3 hidden sm:table-cell">Customer</th>
                  <th className="text-left text-xs font-bold text-text-secondary uppercase tracking-wide px-5 py-3 hidden md:table-cell">Details</th>
                  <th className="text-left text-xs font-bold text-text-secondary uppercase tracking-wide px-5 py-3 hidden lg:table-cell">Date</th>
                  <th className="text-right text-xs font-bold text-text-secondary uppercase tracking-wide px-5 py-3">Amount</th>
                  <th className="text-right text-xs font-bold text-text-secondary uppercase tracking-wide px-5 py-3 hidden xl:table-cell">Commission</th>
                  <th className="text-center text-xs font-bold text-text-secondary uppercase tracking-wide px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, i) => {
                  const Icon = typeIcon[b.type] || Package
                  return (
                    <motion.tr
                      key={b.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-5 py-4 text-sm font-bold text-heading">{b.id}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon className="w-3.5 h-3.5 text-primary" />
                          </div>
                          <span className="text-sm font-medium text-heading">{b.type}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-text hidden sm:table-cell">{b.customer}</td>
                      <td className="px-5 py-4 text-sm text-text hidden md:table-cell">{b.route}</td>
                      <td className="px-5 py-4 text-sm text-text-secondary hidden lg:table-cell">{b.date}</td>
                      <td className="px-5 py-4 text-sm font-bold text-heading text-right">₹{b.amount.toLocaleString('en-IN')}</td>
                      <td className="px-5 py-4 text-sm font-semibold text-emerald-600 text-right hidden xl:table-cell">₹{b.commission?.toLocaleString('en-IN') || 0}</td>
                      <td className="px-5 py-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                          b.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                          b.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                          b.status === 'processing' ? 'bg-primary-50 text-primary border-primary/20' :
                          'bg-red-50 text-red-600 border-red-200'
                        }`}>
                          {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                        </span>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
