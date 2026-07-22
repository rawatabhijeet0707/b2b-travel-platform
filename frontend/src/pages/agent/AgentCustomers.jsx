import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Search, Loader2, Mail, Phone, BookOpen, Wallet } from 'lucide-react'
import { agentService } from '../../services/agentService.js'

export default function AgentCustomers() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setLoading(true)
    agentService.getCustomers({ search })
      .then(data => setCustomers(data.data || []))
      .catch(() => setCustomers([]))
      .finally(() => setLoading(false))
  }, [search])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-heading">Customers</h1>
        <p className="text-sm text-text-secondary mt-0.5">Manage your customer relationships</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-heading placeholder:text-text-tertiary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      {/* Customer Cards */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
          <span className="ml-2 text-sm text-text-secondary">Loading customers...</span>
        </div>
      ) : customers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Users className="w-10 h-10 text-text-tertiary mb-2" />
          <span className="text-sm text-text-secondary">No customers found</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {customers.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -2 }}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-lg font-bold shrink-0">
                  {c.name?.charAt(0) || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-heading truncate">{c.name}</p>
                    {c.status === 'vip' && (
                      <span className="px-2 py-0.5 text-[10px] font-bold text-amber-600 bg-amber-50 rounded-full">VIP</span>
                    )}
                  </div>
                  <p className="text-xs text-text-tertiary">Customer since {c.created_at?.slice(0, 7) || '2024'}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2 text-text-secondary">
                  <Mail className="w-3.5 h-3.5 text-text-tertiary" /> {c.email}
                </p>
                <p className="flex items-center gap-2 text-text-secondary">
                  <Phone className="w-3.5 h-3.5 text-text-tertiary" /> +91 {c.mobile}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100">
                <div>
                  <div className="flex items-center gap-1.5 text-text-tertiary">
                    <BookOpen className="w-3.5 h-3.5" />
                    <p className="text-[10px] font-bold uppercase tracking-wide">Bookings</p>
                  </div>
                  <p className="text-lg font-extrabold text-heading mt-0.5">{c.bookings}</p>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-text-tertiary">
                    <Wallet className="w-3.5 h-3.5" />
                    <p className="text-[10px] font-bold uppercase tracking-wide">Total Spent</p>
                  </div>
                  <p className="text-lg font-extrabold text-heading mt-0.5">₹{(c.totalSpent || 0).toLocaleString('en-IN')}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
