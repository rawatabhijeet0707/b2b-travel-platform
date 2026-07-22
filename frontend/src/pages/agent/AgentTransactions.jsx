import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight, Loader2, CreditCard, Search } from 'lucide-react'
import { agentService } from '../../services/agentService.js'

export default function AgentTransactions() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({})

  useEffect(() => {
    setLoading(true)
    agentService.getTransactions(page, 20)
      .then(data => {
        setTransactions(data.transactions || [])
        setPagination(data.pagination || {})
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [page])

  const fmt = (v) => `\u20B9${v.toLocaleString('en-IN')}`

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-heading">Transactions</h1>
        <p className="text-sm text-text-secondary mt-0.5">View all your wallet transactions</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <CreditCard className="w-10 h-10 text-text-tertiary mb-2" />
            <span className="text-sm text-text-secondary">No transactions found</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50">
                  <th className="text-left text-xs font-bold text-text-secondary uppercase tracking-wide px-5 py-3">TXN ID</th>
                  <th className="text-left text-xs font-bold text-text-secondary uppercase tracking-wide px-5 py-3">Description</th>
                  <th className="text-left text-xs font-bold text-text-secondary uppercase tracking-wide px-5 py-3 hidden sm:table-cell">Reference</th>
                  <th className="text-left text-xs font-bold text-text-secondary uppercase tracking-wide px-5 py-3 hidden md:table-cell">Date</th>
                  <th className="text-right text-xs font-bold text-text-secondary uppercase tracking-wide px-5 py-3">Amount</th>
                  <th className="text-right text-xs font-bold text-text-secondary uppercase tracking-wide px-5 py-3 hidden lg:table-cell">Balance After</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, i) => (
                  <motion.tr
                    key={t.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-5 py-4 text-sm font-bold text-heading">{t.id}</td>
                    <td className="px-5 py-4 text-sm text-text">{t.description}</td>
                    <td className="px-5 py-4 text-sm text-text-secondary hidden sm:table-cell">{t.reference}</td>
                    <td className="px-5 py-4 text-sm text-text-secondary hidden md:table-cell">{new Date(t.created_at).toLocaleDateString('en-IN')}</td>
                    <td className="px-5 py-4 text-right">
                      <span className={`text-sm font-bold ${t.type === 'credit' ? 'text-emerald-600' : 'text-red-500'}`}>
                        {t.type === 'credit' ? '+' : '-'}{fmt(t.amount)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-heading text-right hidden lg:table-cell">{fmt(t.balance_after)}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
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
                Previous
              </button>
              <button
                onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                disabled={page === pagination.totalPages}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 disabled:opacity-50 transition-all"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
