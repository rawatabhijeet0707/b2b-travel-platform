import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ScrollText, Activity, LogIn, LogOut, Edit, Trash2, Plus, User } from 'lucide-react'
import { adminService } from '../../services/adminService.js'

const actionIcons = {
  login: LogIn, logout: LogOut, failed_login: LogIn,
  create: Plus, update: Edit, delete: Trash2,
  update_user_status: User, update_user_kyc: User, update_wallet: User,
  update_settings: Edit, update_chatbot: Edit,
}

const actionColors = {
  login: 'text-green-600 bg-green-50', logout: 'text-blue-600 bg-blue-50',
  failed_login: 'text-red-600 bg-red-50',
  create: 'text-green-600 bg-green-50', update: 'text-amber-600 bg-amber-50',
  delete: 'text-red-600 bg-red-50',
}

export default function AdminAuditLogs() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    adminService.getAuditLogs({ limit: 100 }).then(res => { setLogs(res.data || []); setLoading(false) })
  }, [])

  const filtered = logs.filter(l => !search || l.action?.toLowerCase().includes(search.toLowerCase()) || l.admin_name?.toLowerCase().includes(search.toLowerCase()) || l.description?.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-heading">Audit Logs</h1>
        <p className="text-sm text-text-secondary mt-0.5">Track all admin activities</p>
      </div>

      <div className="relative">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search logs..." className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3">Action</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3">Admin</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3 hidden sm:table-cell">Module</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3">Description</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3 hidden md:table-cell">IP</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3 hidden lg:table-cell">Time</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" className="text-center py-12 text-text-tertiary text-sm">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-12 text-text-tertiary text-sm">
                  <ScrollText className="w-8 h-8 mx-auto mb-2 text-text-tertiary" />
                  No audit logs yet
                </td></tr>
              ) : filtered.map((log, i) => {
                const Icon = actionIcons[log.action] || Activity
                const colorClass = actionColors[log.action] || 'text-text-secondary bg-slate-50'
                return (
                  <motion.tr key={log.id || i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-lg ${colorClass}`}>
                        <Icon className="w-3 h-3" /> {log.action}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-heading">{log.admin_name || 'System'}</td>
                    <td className="px-4 py-3 hidden sm:table-cell text-sm text-text-secondary">{log.module}</td>
                    <td className="px-4 py-3 text-sm text-text-secondary">{log.description}</td>
                    <td className="px-4 py-3 hidden md:table-cell text-xs text-text-tertiary font-mono">{log.ip_address}</td>
                    <td className="px-4 py-3 hidden lg:table-cell text-xs text-text-tertiary">{new Date(log.created_at).toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })}</td>
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
