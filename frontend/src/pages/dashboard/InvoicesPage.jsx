import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  FileText, Download, Search, Filter, Eye, Calendar,
  Plane, Hotel, Stamp, Package, ShieldCheck, Wallet, Receipt, Loader2
} from 'lucide-react'
import PremiumBadge from '../../components/ui/PremiumBadge.jsx'
import StatCard from '../../components/ui/StatCard.jsx'
import AnimatedBlobs from '../../components/ui/AnimatedBlobs.jsx'
import { dashboardService } from '../../services/authService.js'

const statusVariant = { paid: 'success', pending: 'warning', overdue: 'danger' }

const typeIcon = {
  Flight: Plane,
  Hotel: Hotel,
  Package: Package,
  Visa: Stamp,
  Insurance: ShieldCheck,
}

const formatAmount = (amt) => {
  if (typeof amt === 'number') return `₹${amt.toLocaleString('en-IN')}`
  return amt
}

const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function InvoicesPage() {
  const [search, setSearch] = useState('')
  const [invoices, setInvoices] = useState([])
  const [stats, setStats] = useState({ total: 0, totalAmount: 0, paid: 0, pending: 0, overdue: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    dashboardService.getInvoices(1, 50)
      .then((data) => {
        setInvoices(data.invoices || [])
        setStats(data.stats || { total: 0, totalAmount: 0, paid: 0, pending: 0, overdue: 0 })
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || 'Failed to load invoices')
        setLoading(false)
      })
  }, [])

  const filtered = invoices.filter(inv =>
    inv.id.toLowerCase().includes(search.toLowerCase()) ||
    (inv.customer || '').toLowerCase().includes(search.toLowerCase()) ||
    (inv.type || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="relative p-4 sm:p-6 lg:p-8 space-y-6 gradient-mesh min-h-screen">
      <AnimatedBlobs />

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-heading font-heading">Invoices</h1>
          <p className="text-text-secondary mt-1">Manage and download your invoices</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/40 border border-white/50 text-sm font-semibold text-heading hover:shadow-card transition-all"
        >
          <Download className="w-4 h-4" /> Download All
        </motion.button>
      </motion.div>

      {/* Stats */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Receipt} label="Total Invoices" value={String(stats.total)} delay={0} color="primary" />
        <StatCard icon={Wallet} label="Total Amount" value={formatAmount(stats.totalAmount)} delay={0.1} color="success" />
        <StatCard icon={Calendar} label="Pending" value={String(stats.pending)} delay={0.2} color="warning" />
        <StatCard icon={FileText} label="Overdue" value={String(stats.overdue)} delay={0.3} color="danger" />
      </div>

      {/* Invoice Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative glass-strong rounded-card shadow-card overflow-hidden"
      >
        <div className="p-6 border-b border-border/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-heading font-heading font-heading">Invoice List</h3>
            <p className="text-sm text-text-secondary">All your generated invoices</p>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/40 border border-white/50">
              <Search className="w-4 h-4 text-text-secondary" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search invoices..."
                className="bg-transparent text-sm text-heading placeholder:text-text-tertiary focus:outline-none w-40"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
              <span className="ml-2 text-sm text-text-secondary">Loading your invoices...</span>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-12">
              <span className="text-sm text-red-500">{error}</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Receipt className="w-10 h-10 text-text-tertiary mb-2" />
              <span className="text-sm text-text-secondary">No invoices found.</span>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/40 bg-white/20">
                  <th className="text-left text-xs font-bold text-text-secondary uppercase tracking-wide px-6 py-3">Invoice ID</th>
                  <th className="text-left text-xs font-bold text-text-secondary uppercase tracking-wide px-6 py-3">Type</th>
                  <th className="text-left text-xs font-bold text-text-secondary uppercase tracking-wide px-6 py-3 hidden sm:table-cell">Customer</th>
                  <th className="text-left text-xs font-bold text-text-secondary uppercase tracking-wide px-6 py-3 hidden md:table-cell">Date</th>
                  <th className="text-right text-xs font-bold text-text-secondary uppercase tracking-wide px-6 py-3">Amount</th>
                  <th className="text-center text-xs font-bold text-text-secondary uppercase tracking-wide px-6 py-3">Status</th>
                  <th className="text-center text-xs font-bold text-text-secondary uppercase tracking-wide px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((inv, i) => {
                  const Icon = typeIcon[inv.type] || FileText
                  return (
                    <motion.tr
                      key={inv.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 + i * 0.05 }}
                      className="border-b border-border/20 hover:bg-white/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-heading font-heading">{inv.id}</p>
                        <p className="text-xs text-text-tertiary">{inv.booking_id}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon className="w-3.5 h-3.5 text-primary" />
                          </div>
                          <span className="text-sm font-medium text-heading">{inv.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-text hidden sm:table-cell">{inv.customer}</td>
                      <td className="px-6 py-4 text-sm text-text-secondary hidden md:table-cell">{formatDate(inv.date || inv.created_at)}</td>
                      <td className="px-6 py-4 text-sm font-bold text-heading font-heading text-right">{formatAmount(inv.amount)}</td>
                      <td className="px-6 py-4 text-center">
                        <PremiumBadge variant={statusVariant[inv.status]}>{inv.status.toUpperCase()}</PremiumBadge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-8 h-8 rounded-lg bg-white/40 border border-white/50 flex items-center justify-center hover:bg-white/60 transition-colors">
                            <Eye className="w-3.5 h-3.5 text-text-secondary" />
                          </motion.button>
                          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-8 h-8 rounded-lg bg-white/40 border border-white/50 flex items-center justify-center hover:bg-white/60 transition-colors">
                            <Download className="w-3.5 h-3.5 text-text-secondary" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>
    </div>
  )
}
