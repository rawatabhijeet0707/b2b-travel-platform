import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plane, Hotel, Package, Stamp, ShieldCheck, Loader2, FileText, ChevronLeft, ChevronRight } from 'lucide-react'
import { agentService } from '../../services/agentService.js'

export default function AgentMyBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({})

  useEffect(() => {
    setLoading(true)
    agentService.getMyBookings(page, 10)
      .then(data => {
        setBookings(data.bookings || [])
        setPagination(data.pagination || {})
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [page])

  const typeIcon = { Flight: Plane, Hotel: Hotel, Package: Package, Visa: Stamp, Insurance: ShieldCheck }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-heading">My Bookings</h1>
        <p className="text-sm text-text-secondary mt-0.5">Your personal booking history</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <FileText className="w-10 h-10 text-text-tertiary mb-2" />
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

        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-slate-200">
            <p className="text-xs text-text-tertiary">
              Page {pagination.page} of {pagination.totalPages} · {pagination.total} total
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 disabled:opacity-50 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                disabled={page === pagination.totalPages}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 disabled:opacity-50 transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
