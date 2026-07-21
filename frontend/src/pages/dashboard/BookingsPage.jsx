import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Download, Plane, Hotel, Package, Stamp, ShieldCheck, Eye, Loader2, PackageX } from 'lucide-react'
import Badge from '../../components/ui/Badge.jsx'
import AnimatedBlobs from '../../components/ui/AnimatedBlobs.jsx'
import { dashboardService } from '../../services/authService.js'

const statusVariant = { confirmed: 'success', pending: 'warning', processing: 'primary', cancelled: 'danger' }
const typeIcon = { Flight: Plane, Hotel: Hotel, Package: Package, Visa: Stamp, Insurance: ShieldCheck }

const formatAmount = (amt) => {
  if (typeof amt === 'number') return `₹${amt.toLocaleString('en-IN')}`
  return amt
}

const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

const formatStatus = (status) => {
  if (!status) return 'Pending'
  return status.charAt(0).toUpperCase() + status.slice(1)
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    dashboardService.getBookings(1, 50)
      .then((data) => {
        setBookings(data.bookings || [])
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || 'Failed to load bookings')
        setLoading(false)
      })
  }, [])

  const filtered = bookings.filter((b) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      (b.id && b.id.toLowerCase().includes(q)) ||
      (b.type && b.type.toLowerCase().includes(q)) ||
      (b.customer && b.customer.toLowerCase().includes(q)) ||
      (b.route && b.route.toLowerCase().includes(q)) ||
      (b.status && b.status.toLowerCase().includes(q))
    )
  })

  const stats = [
    { label: 'Total Bookings', value: bookings.length, color: 'text-primary' },
    { label: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, color: 'text-success' },
    { label: 'Pending', value: bookings.filter(b => b.status === 'pending' || b.status === 'processing').length, color: 'text-warning' },
    { label: 'Cancelled', value: bookings.filter(b => b.status === 'cancelled').length, color: 'text-danger' },
  ]

  return (
    <div className="relative p-4 sm:p-6 lg:p-8 space-y-6 gradient-mesh min-h-screen">
      <AnimatedBlobs />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-heading font-heading tracking-tight">All Bookings</h1>
          <p className="text-text-secondary mt-1">Manage and track all your bookings.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-xl text-sm font-semibold text-heading hover:shadow-card transition-all">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-strong rounded-card p-5 shadow-card"
          >
            <p className="text-sm text-text-secondary font-medium">{s.label}</p>
            <p className={`text-2xl font-extrabold mt-1 tabular-nums ${s.color}`}>{s.value.toLocaleString('en-IN')}</p>
          </motion.div>
        ))}
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-strong rounded-card shadow-card overflow-hidden"
      >
        <div className="p-6 border-b border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-heading font-heading">Booking History</h3>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search bookings..."
                className="w-full sm:w-56 pl-9 pr-3 py-2 bg-white/50 border border-border rounded-lg text-sm text-heading placeholder:text-text-tertiary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <button className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/50 border border-border rounded-lg text-sm font-medium text-text hover:text-heading transition-all">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
            <span className="ml-2 text-sm text-text-secondary">Loading your bookings...</span>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-16">
            <span className="text-sm text-red-500">{error}</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <PackageX className="w-10 h-10 text-text-tertiary mb-2" />
            <span className="text-sm text-text-secondary">{search ? 'No bookings match your search.' : 'No bookings yet. Start booking to see them here.'}</span>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/60 bg-slate-100/60">
                    <th className="text-left text-xs font-bold text-text-secondary uppercase tracking-wide px-6 py-3">Booking ID</th>
                    <th className="text-left text-xs font-bold text-text-secondary uppercase tracking-wide px-6 py-3">Type</th>
                    <th className="text-left text-xs font-bold text-text-secondary uppercase tracking-wide px-6 py-3 hidden sm:table-cell">Customer</th>
                    <th className="text-left text-xs font-bold text-text-secondary uppercase tracking-wide px-6 py-3 hidden md:table-cell">Details</th>
                    <th className="text-left text-xs font-bold text-text-secondary uppercase tracking-wide px-6 py-3 hidden lg:table-cell">Date</th>
                    <th className="text-right text-xs font-bold text-text-secondary uppercase tracking-wide px-6 py-3">Amount</th>
                    <th className="text-center text-xs font-bold text-text-secondary uppercase tracking-wide px-6 py-3">Status</th>
                    <th className="text-center text-xs font-bold text-text-secondary uppercase tracking-wide px-6 py-3 hidden sm:table-cell">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((b, i) => {
                    const Icon = typeIcon[b.type] || Package
                    return (
                      <motion.tr
                        key={b.id || i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.04 }}
                        className="border-b border-border/40 hover:bg-slate-50/80 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-bold text-heading font-heading">{b.id}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Icon className="w-3.5 h-3.5 text-primary" />
                            </div>
                            <span className="text-sm font-medium text-heading">{b.type}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-text hidden sm:table-cell">{b.customer}</td>
                        <td className="px-6 py-4 text-sm text-text hidden md:table-cell">{b.route}</td>
                        <td className="px-6 py-4 text-sm text-text-secondary hidden lg:table-cell">{formatDate(b.date || b.created_at)}</td>
                        <td className="px-6 py-4 text-sm font-bold text-heading font-heading text-right">{formatAmount(b.amount)}</td>
                        <td className="px-6 py-4 text-center"><Badge variant={statusVariant[b.status] || 'warning'}>{formatStatus(b.status)}</Badge></td>
                        <td className="px-6 py-4 text-center hidden sm:table-cell">
                          <button className="w-8 h-8 rounded-lg bg-white/50 hover:bg-primary/10 flex items-center justify-center mx-auto transition-all">
                            <Eye className="w-4 h-4 text-text-secondary" />
                          </button>
                        </td>
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-border/60 flex items-center justify-between">
              <p className="text-sm text-text-secondary">Showing {filtered.length} of {bookings.length} bookings</p>
            </div>
          </>
        )}
      </motion.div>
    </div>
  )
}
