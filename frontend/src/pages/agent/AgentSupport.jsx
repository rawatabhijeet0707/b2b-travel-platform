import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Headphones, Loader2, Plus } from 'lucide-react'
import { agentService } from '../../services/agentService.js'

export default function AgentSupport() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    agentService.getTickets()
      .then(data => setTickets(data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-heading">Support Tickets</h1>
          <p className="text-sm text-text-secondary mt-0.5">Get help and track your support requests</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:shadow-glow transition-all">
          <Plus className="w-4 h-4" /> New Ticket
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          </div>
        ) : tickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Headphones className="w-10 h-10 text-text-tertiary mb-2" />
            <span className="text-sm text-text-secondary">No support tickets</span>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {tickets.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    t.priority === 'high' ? 'bg-red-50' : t.priority === 'medium' ? 'bg-amber-50' : 'bg-slate-50'
                  }`}>
                    <Headphones className={`w-5 h-5 ${
                      t.priority === 'high' ? 'text-red-500' : t.priority === 'medium' ? 'text-amber-600' : 'text-text-secondary'
                    }`} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-text-tertiary">{t.id}</p>
                    <p className="text-sm font-semibold text-heading">{t.subject}</p>
                    <p className="text-xs text-text-tertiary mt-0.5">{t.category} · {t.created_at}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                  t.status === 'open' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                  t.status === 'in_progress' ? 'bg-primary-50 text-primary border-primary/20' :
                  t.status === 'resolved' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                  'bg-slate-50 text-text-secondary border-slate-200'
                }`}>
                  {t.status === 'in_progress' ? 'In Progress' : t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
