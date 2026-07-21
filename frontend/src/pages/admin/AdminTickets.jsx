import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Eye, X, Mail, Clock, CheckCircle2, AlertCircle, MessageSquare, Headphones, Plus } from 'lucide-react'

const dummyTickets = [
  { id: 'TKT-2401', subject: 'Refund delay for flight booking TD-2401', agent: 'Rajesh Kumar', agency: 'SkyHigh Travels', priority: 'high', status: 'open', category: 'Refund', created: 'Jul 20, 2025 10:15 AM', lastReply: 'Agent', messages: 4 },
  { id: 'TKT-2400', subject: 'Hotel booking modification request', agent: 'Priya Sharma', agency: 'Wanderlust Tours', priority: 'medium', status: 'active', category: 'Modification', created: 'Jul 20, 2025 9:30 AM', lastReply: 'Support', messages: 3 },
  { id: 'TKT-2399', subject: 'Visa document upload failing', agent: 'Anita Desai', agency: 'Horizon Holidays', priority: 'high', status: 'active', category: 'Technical', created: 'Jul 20, 2025 8:45 AM', lastReply: 'Support', messages: 6 },
  { id: 'TKT-2398', subject: 'Wallet balance not updated after payment', agent: 'Mohammed Ali', agency: 'Global Voyage LLC', priority: 'urgent', status: 'open', category: 'Wallet', created: 'Jul 19, 2025 6:20 PM', lastReply: 'Agent', messages: 2 },
  { id: 'TKT-2397', subject: 'Unable to download invoice for TD-2395', agent: 'Sneha Reddy', agency: 'FlyHigh Solutions', priority: 'low', status: 'resolved', category: 'Invoice', created: 'Jul 19, 2025 3:00 PM', lastReply: 'Support', messages: 5 },
  { id: 'TKT-2396', subject: 'Commission rate query for Qatar Airways', agent: 'Kavya Nair', agency: 'Globe Trotter Hub', priority: 'medium', status: 'resolved', category: 'Commission', created: 'Jul 19, 2025 1:15 PM', lastReply: 'Support', messages: 3 },
  { id: 'TKT-2395', subject: 'Package booking error - Europe Tour', agent: 'Arjun Mehta', agency: 'TravelCraft', priority: 'high', status: 'active', category: 'Booking', created: 'Jul 19, 2025 11:00 AM', lastReply: 'Agent', messages: 7 },
  { id: 'TKT-2394', subject: 'Login OTP not received', agent: 'Rohit Gupta', agency: 'Discover India', priority: 'medium', status: 'resolved', category: 'Authentication', created: 'Jul 18, 2025 4:45 PM', lastReply: 'Support', messages: 4 },
  { id: 'TKT-2393', subject: 'Request for higher credit limit', agent: 'Daniel Park', agency: 'Asia Pacific Travel', priority: 'low', status: 'open', category: 'Account', created: 'Jul 18, 2025 2:00 PM', lastReply: 'Agent', messages: 2 },
  { id: 'TKT-2392', subject: 'Insurance claim status check', agent: 'Vikram Singh', agency: 'Royal Journeys', priority: 'medium', status: 'resolved', category: 'Insurance', created: 'Jul 18, 2025 10:30 AM', lastReply: 'Support', messages: 6 },
  { id: 'TKT-2391', subject: 'Bulk booking discount inquiry', agent: 'Lisa Chen', agency: 'China Travel Solutions', priority: 'low', status: 'active', category: 'Sales', created: 'Jul 17, 2025 5:00 PM', lastReply: 'Support', messages: 3 },
  { id: 'TKT-2390', subject: 'Visa application status - Singapore', agent: 'Anita Desai', agency: 'Horizon Holidays', priority: 'medium', status: 'resolved', category: 'Visa', created: 'Jul 17, 2025 9:00 AM', lastReply: 'Support', messages: 5 },
]

const priorityColor = {
  urgent: 'text-red-600 bg-red-50 border-red-200',
  high: 'text-orange-600 bg-orange-50 border-orange-200',
  medium: 'text-amber-600 bg-amber-50 border-amber-200',
  low: 'text-blue-600 bg-blue-50 border-blue-200',
}

const statusColor = {
  open: 'text-blue-600 bg-blue-50 border-blue-200',
  active: 'text-amber-600 bg-amber-50 border-amber-200',
  resolved: 'text-green-600 bg-green-50 border-green-200',
}

export default function AdminTickets() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = dummyTickets.filter(t => {
    if (search) {
      const q = search.toLowerCase()
      if (!t.subject.toLowerCase().includes(q) && !t.id.toLowerCase().includes(q) && !t.agent.toLowerCase().includes(q)) return false
    }
    if (statusFilter && t.status !== statusFilter) return false
    if (priorityFilter && t.priority !== priorityFilter) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-heading">Support Tickets</h1>
        <p className="text-sm text-text-secondary mt-0.5">Manage and resolve agent support tickets</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Tickets', value: dummyTickets.length, icon: Headphones, color: 'text-blue-600 bg-blue-50' },
          { label: 'Open', value: dummyTickets.filter(t => t.status === 'open').length, icon: AlertCircle, color: 'text-red-600 bg-red-50' },
          { label: 'Active', value: dummyTickets.filter(t => t.status === 'active').length, icon: Clock, color: 'text-amber-600 bg-amber-50' },
          { label: 'Resolved', value: dummyTickets.filter(t => t.status === 'resolved').length, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
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
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by ID, subject, or agent..." className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-heading placeholder:text-text-tertiary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary">
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="active">Active</option>
          <option value="resolved">Resolved</option>
        </select>
        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary">
          <option value="">All Priority</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Ticket</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Agent</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden md:table-cell">Category</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Priority</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Messages</th>
                <th className="text-right text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="7" className="text-center py-12 text-text-tertiary text-sm">No tickets found</td></tr>
              ) : filtered.map((t, i) => (
                <motion.tr key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-sm font-semibold text-heading">{t.subject}</p>
                    <p className="text-xs text-text-tertiary">{t.id} · {t.created}</p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <p className="text-sm text-text-secondary">{t.agent}</p>
                    <p className="text-xs text-text-tertiary">{t.agency}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell"><span className="text-xs font-medium text-text-secondary bg-slate-100 px-2 py-0.5 rounded-full">{t.category}</span></td>
                  <td className="px-4 py-3"><span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full border capitalize ${priorityColor[t.priority]}`}>{t.priority}</span></td>
                  <td className="px-4 py-3"><span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border capitalize ${statusColor[t.status]}`}>{t.status}</span></td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-text-tertiary" />
                      <span className="text-sm font-semibold text-heading">{t.messages}</span>
                      <span className="text-xs text-text-tertiary">· {t.lastReply}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => setSelected(t)} className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-text-secondary hover:text-primary" title="View Ticket"><Eye className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100"><p className="text-sm text-text-tertiary">Showing {filtered.length} of {dummyTickets.length} tickets</p></div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 w-full max-w-lg">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-lg font-bold text-heading">{selected.id}</h3>
                  <p className="text-sm text-text-secondary mt-0.5">{selected.subject}</p>
                </div>
                <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center"><X className="w-4 h-4 text-text-secondary" /></button>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="p-3 bg-slate-50 rounded-xl"><p className="text-xs text-text-tertiary">Agent</p><p className="text-sm font-semibold text-heading">{selected.agent}</p></div>
                <div className="p-3 bg-slate-50 rounded-xl"><p className="text-xs text-text-tertiary">Agency</p><p className="text-sm font-semibold text-heading">{selected.agency}</p></div>
                <div className="p-3 bg-slate-50 rounded-xl"><p className="text-xs text-text-tertiary">Category</p><p className="text-sm font-semibold text-heading">{selected.category}</p></div>
                <div className="p-3 bg-slate-50 rounded-xl"><p className="text-xs text-text-tertiary">Created</p><p className="text-sm font-semibold text-heading">{selected.created}</p></div>
              </div>
              <div className="flex items-center gap-3 mb-5">
                <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border capitalize ${priorityColor[selected.priority]}`}>Priority: {selected.priority}</span>
                <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border capitalize ${statusColor[selected.status]}`}>Status: {selected.status}</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-text-tertiary" />
                  <p className="text-xs font-semibold text-text-secondary">Conversation ({selected.messages} messages)</p>
                </div>
                <p className="text-sm text-text-secondary">Last reply by <span className="font-semibold text-heading">{selected.lastReply}</span></p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2.5 gradient-bg text-white text-xs font-bold rounded-xl shadow-glow">Reply to Ticket</button>
                <button className="flex-1 py-2.5 bg-green-50 border border-green-200 text-green-600 text-xs font-bold rounded-xl hover:bg-green-100">Mark Resolved</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
