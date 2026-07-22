import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bell, Loader2, CheckCircle2 } from 'lucide-react'
import { agentService } from '../../services/agentService.js'

export default function AgentNotifications() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    agentService.getNotifications()
      .then(data => setNotifications(data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-heading">Notifications</h1>
          <p className="text-sm text-text-secondary mt-0.5">Stay updated with your latest activities</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-text-secondary hover:bg-slate-100 transition-all">
          <CheckCircle2 className="w-4 h-4" /> Mark All Read
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Bell className="w-10 h-10 text-text-tertiary mb-2" />
            <span className="text-sm text-text-secondary">No notifications</span>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {notifications.map((n, i) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-start gap-3 p-5 hover:bg-slate-50 transition-colors ${!n.read ? 'bg-primary/5' : ''}`}
              >
                <div className={`w-2 h-2 rounded-full ${n.color} mt-1.5 shrink-0`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-heading">{n.title}</p>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-primary" />}
                  </div>
                  <p className="text-sm text-text-secondary mt-0.5">{n.desc}</p>
                  <p className="text-xs text-text-tertiary mt-1">{n.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
