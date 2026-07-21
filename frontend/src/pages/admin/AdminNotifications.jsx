import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Send, CheckCircle2, Clock, X, Plus, Search } from 'lucide-react'

const dummyNotifications = [
  { id: 'NOT-001', title: 'New Airline Partnership with Qatar Airways', type: 'success', audience: 'All Agents', sentBy: 'Aarav Patel', date: 'Jul 20, 2025 10:30 AM', status: 'sent', recipients: 1248, opened: 892 },
  { id: 'NOT-002', title: 'Festive Season Commission Boost - Up to 20%', type: 'promo', audience: 'Active Agents', sentBy: 'Ananya Iyer', date: 'Jul 19, 2025 4:15 PM', status: 'sent', recipients: 1056, opened: 743 },
  { id: 'NOT-003', title: 'Scheduled Maintenance - Jan 20, 2AM-4AM IST', type: 'warning', audience: 'All Users', sentBy: 'Vihaan Singh', date: 'Jul 19, 2025 11:00 AM', status: 'sent', recipients: 2840, opened: 2104 },
  { id: 'NOT-004', title: 'New Visa Application Feature Released', type: 'info', audience: 'All Agents', sentBy: 'Arnav Gupta', date: 'Jul 18, 2025 2:00 PM', status: 'sent', recipients: 1248, opened: 654 },
  { id: 'NOT-005', title: 'Wallet Top-up Bonus - 5% Extra', type: 'promo', audience: 'Active Agents', sentBy: 'Ananya Iyer', date: 'Jul 18, 2025 9:00 AM', status: 'sent', recipients: 1056, opened: 821 },
  { id: 'NOT-006', title: 'KYC Deadline Reminder - Submit by Jul 25', type: 'warning', audience: 'Pending KYC', sentBy: 'Diya Sharma', date: 'Jul 17, 2025 5:30 PM', status: 'sent', recipients: 86, opened: 54 },
  { id: 'NOT-007', title: 'Weekly Performance Report Available', type: 'info', audience: 'All Agents', sentBy: 'Karan Mehta', date: 'Jul 17, 2025 8:00 AM', status: 'sent', recipients: 1248, opened: 412 },
  { id: 'NOT-008', title: 'Holiday Package Flash Sale - 48 Hours Only', type: 'promo', audience: 'All Agents', sentBy: 'Ananya Iyer', date: 'Jul 16, 2025 12:00 PM', status: 'scheduled', recipients: 0, opened: 0 },
  { id: 'NOT-009', title: 'New Hotel Supplier Integration - Marriott', type: 'success', audience: 'All Agents', sentBy: 'Aarav Patel', date: 'Jul 15, 2025 3:00 PM', status: 'sent', recipients: 1248, opened: 987 },
  { id: 'NOT-010', title: 'Payment Gateway Upgrade Notice', type: 'warning', audience: 'All Users', sentBy: 'Vihaan Singh', date: 'Jul 15, 2025 10:00 AM', status: 'draft', recipients: 0, opened: 0 },
]

const typeColor = {
  success: 'text-green-600 bg-green-50 border-green-200',
  promo: 'text-purple-600 bg-purple-50 border-purple-200',
  warning: 'text-amber-600 bg-amber-50 border-amber-200',
  info: 'text-blue-600 bg-blue-50 border-blue-200',
}

const statusColor = {
  sent: 'text-green-600 bg-green-50 border-green-200',
  scheduled: 'text-blue-600 bg-blue-50 border-blue-200',
  draft: 'text-slate-600 bg-slate-100 border-slate-200',
}

export default function AdminNotifications() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filtered = dummyNotifications.filter(n => {
    if (search && !n.title.toLowerCase().includes(search.toLowerCase())) return false
    if (statusFilter && n.status !== statusFilter) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-heading">Notifications</h1>
          <p className="text-sm text-text-secondary mt-0.5">Send and manage push notifications</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 gradient-bg text-white text-sm font-semibold rounded-xl shadow-glow">
          <Plus className="w-4 h-4" /> New Notification
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Sent', value: dummyNotifications.filter(n => n.status === 'sent').length, icon: Send, color: 'text-blue-600 bg-blue-50' },
          { label: 'Total Recipients', value: dummyNotifications.filter(n => n.status === 'sent').reduce((s, n) => s + n.recipients, 0).toLocaleString('en-IN'), icon: Bell, color: 'text-violet-600 bg-violet-50' },
          { label: 'Avg. Open Rate', value: '68%', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Scheduled', value: dummyNotifications.filter(n => n.status === 'scheduled').length, icon: Clock, color: 'text-amber-600 bg-amber-50' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}><s.icon className="w-5 h-5" /></div>
            <p className="text-sm text-text-secondary font-medium">{s.label}</p>
            <p className="text-2xl font-extrabold text-heading mt-1">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search notifications..." className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-heading placeholder:text-text-tertiary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary">
          <option value="">All Status</option>
          <option value="sent">Sent</option>
          <option value="scheduled">Scheduled</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Title</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Type</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden md:table-cell">Audience</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Recipients</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Open Rate</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-12 text-text-tertiary text-sm">No notifications found</td></tr>
              ) : filtered.map((n, i) => (
                <motion.tr key={n.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-sm font-semibold text-heading">{n.title}</p>
                    <p className="text-xs text-text-tertiary">{n.date} · by {n.sentBy}</p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full border capitalize ${typeColor[n.type]}`}>{n.type}</span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell"><p className="text-sm text-text-secondary">{n.audience}</p></td>
                  <td className="px-4 py-3 hidden lg:table-cell"><p className="text-sm font-semibold text-heading tabular-nums">{n.recipients.toLocaleString('en-IN')}</p></td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {n.recipients > 0 ? (
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.round((n.opened / n.recipients) * 100)}%` }} /></div>
                        <span className="text-xs font-semibold text-heading">{Math.round((n.opened / n.recipients) * 100)}%</span>
                      </div>
                    ) : <span className="text-xs text-text-tertiary">-</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border capitalize ${statusColor[n.status]}`}>
                      {n.status === 'sent' ? <CheckCircle2 className="w-3 h-3" /> : n.status === 'scheduled' ? <Clock className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      {n.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100"><p className="text-sm text-text-tertiary">Showing {filtered.length} of {dummyNotifications.length} notifications</p></div>
      </div>
    </div>
  )
}
