import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Search, Send, Trash2, Users, TrendingUp, Eye, Check, X } from 'lucide-react'

const dummySubscribers = [
  { id: 1, email: 'rahul@skyhigh.com', name: 'Rahul Sharma', agency: 'SkyHigh Travels', subscribed: '2024-01-15', status: 'active', emailsSent: 24, emailsOpened: 21, lastOpen: '2024-07-20' },
  { id: 2, email: 'priya@wanderlust.com', name: 'Priya Patel', agency: 'Wanderlust Tours', subscribed: '2024-02-10', status: 'active', emailsSent: 22, emailsOpened: 18, lastOpen: '2024-07-19' },
  { id: 3, email: 'amit@globetrotter.com', name: 'Amit Kumar', agency: 'Globe Trotter', subscribed: '2024-03-05', status: 'active', emailsSent: 19, emailsOpened: 12, lastOpen: '2024-07-18' },
  { id: 4, email: 'sneha@travelxp.com', name: 'Sneha Reddy', agency: 'Travel XP', subscribed: '2024-01-20', status: 'unsubscribed', emailsSent: 24, emailsOpened: 5, lastOpen: '2024-06-15' },
  { id: 5, email: 'vikram@holidays.com', name: 'Vikram Singh', agency: 'Happy Holidays', subscribed: '2023-12-01', status: 'active', emailsSent: 30, emailsOpened: 28, lastOpen: '2024-07-20' },
  { id: 6, email: 'neha@flyhigh.com', name: 'Neha Gupta', agency: 'Fly High Travels', subscribed: '2024-04-12', status: 'active', emailsSent: 15, emailsOpened: 10, lastOpen: '2024-07-17' },
  { id: 7, email: 'rajesh@worldtours.com', name: 'Rajesh Kumar', agency: 'World Tours', subscribed: '2023-11-15', status: 'active', emailsSent: 32, emailsOpened: 30, lastOpen: '2024-07-20' },
  { id: 8, email: 'anita@premiumtravels.com', name: 'Anita Desai', agency: 'Premium Travels', subscribed: '2024-05-20', status: 'active', emailsSent: 12, emailsOpened: 9, lastOpen: '2024-07-16' },
  { id: 9, email: 'suresh@globaltravels.com', name: 'Suresh Iyer', agency: 'Global Travels', subscribed: '2024-02-28', status: 'active', emailsSent: 21, emailsOpened: 3, lastOpen: '2024-05-10' },
  { id: 10, email: 'kavita@holidayexpress.com', name: 'Kavita Joshi', agency: 'Holiday Express', subscribed: '2024-06-01', status: 'active', emailsSent: 8, emailsOpened: 7, lastOpen: '2024-07-19' },
]

const dummyCampaigns = [
  { id: 1, subject: 'Summer Sale - Up to 40% Off Holiday Packages!', sent: 856, opened: 542, clicked: 234, date: '2024-07-15' },
  { id: 2, subject: 'New Visa-on-Arrival Destinations Added', sent: 856, opened: 678, clicked: 312, date: '2024-07-08' },
  { id: 3, subject: 'Monsoon Travel Tips & Exclusive Deals', sent: 834, opened: 489, clicked: 178, date: '2024-07-01' },
  { id: 4, subject: 'Premium Agent Program - Higher Commissions', sent: 820, opened: 612, clicked: 289, date: '2024-06-20' },
]

export default function AdminNewsletter() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filtered = dummySubscribers.filter(s => {
    if (search && !s.email.toLowerCase().includes(search.toLowerCase()) && !s.name.toLowerCase().includes(search.toLowerCase())) return false
    if (statusFilter && s.status !== statusFilter) return false
    return true
  })

  const activeCount = dummySubscribers.filter(s => s.status === 'active').length
  const totalOpens = dummySubscribers.reduce((s, sub) => s + sub.emailsOpened, 0)
  const totalSent = dummySubscribers.reduce((s, sub) => s + sub.emailsSent, 0)
  const openRate = ((totalOpens / totalSent) * 100).toFixed(1)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-extrabold text-heading">Newsletter</h1><p className="text-sm text-text-secondary mt-0.5">Manage subscribers and email campaigns</p></div>
        <button className="flex items-center gap-2 px-4 py-2.5 gradient-bg text-white text-xs font-bold rounded-xl shadow-glow"><Send className="w-4 h-4" /> Send Campaign</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Subscribers', value: dummySubscribers.length, color: 'from-blue-500 to-blue-600' },
          { label: 'Active', value: activeCount, color: 'from-green-500 to-green-600' },
          { label: 'Open Rate', value: `${openRate}%`, color: 'from-purple-500 to-purple-600' },
          { label: 'Campaigns Sent', value: dummyCampaigns.length, color: 'from-amber-500 to-orange-500' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-2`}><Mail className="w-4.5 h-4.5 text-white" /></div>
            <p className="text-xs text-text-tertiary font-medium">{s.label}</p><p className="text-lg font-extrabold text-heading">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Campaigns */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-heading mb-4">Recent Campaigns</h3>
        <div className="space-y-3">
          {dummyCampaigns.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center"><Mail className="w-4 h-4 text-blue-500" /></div>
              <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-heading truncate">{c.subject}</p><p className="text-xs text-text-tertiary">{c.date}</p></div>
              <div className="hidden sm:flex items-center gap-4 text-xs">
                <div className="text-center"><p className="text-text-tertiary">Sent</p><p className="font-bold text-heading">{c.sent}</p></div>
                <div className="text-center"><p className="text-text-tertiary flex items-center gap-0.5"><Eye className="w-2.5 h-2.5" />Opened</p><p className="font-bold text-heading">{c.opened}</p></div>
                <div className="text-center"><p className="text-text-tertiary flex items-center gap-0.5"><TrendingUp className="w-2.5 h-2.5" />Clicked</p><p className="font-bold text-heading">{c.clicked}</p></div>
                <div className="text-center"><p className="text-text-tertiary">Open Rate</p><p className="font-bold text-green-600">{((c.opened / c.sent) * 100).toFixed(0)}%</p></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="flex gap-3">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" /><input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search subscribers..." className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" /></div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary"><option value="">All Status</option><option value="active">Active</option><option value="unsubscribed">Unsubscribed</option></select>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto"><table className="w-full">
          <thead><tr className="border-b border-slate-200 bg-slate-50">
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3">Subscriber</th>
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3 hidden sm:table-cell">Agency</th>
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3 hidden md:table-cell">Subscribed</th>
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3 hidden lg:table-cell">Emails Sent</th>
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3 hidden lg:table-cell">Open Rate</th>
            <th className="text-left text-xs font-bold text-text-tertiary uppercase px-4 py-3">Status</th>
            <th className="text-right text-xs font-bold text-text-tertiary uppercase px-4 py-3">Actions</th>
          </tr></thead>
          <tbody>
            {filtered.map((s, i) => (
              <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3"><div className="flex items-center gap-2.5"><div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white text-xs font-bold">{s.name.charAt(0)}</div><div><p className="text-sm font-semibold text-heading">{s.name}</p><p className="text-xs text-text-tertiary">{s.email}</p></div></div></td>
                <td className="px-4 py-3 hidden sm:table-cell text-sm text-text-secondary">{s.agency}</td>
                <td className="px-4 py-3 hidden md:table-cell text-xs text-text-tertiary">{s.subscribed}</td>
                <td className="px-4 py-3 hidden lg:table-cell text-sm text-heading">{s.emailsSent}</td>
                <td className="px-4 py-3 hidden lg:table-cell"><div className="flex items-center gap-2"><div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full gradient-bg rounded-full" style={{ width: `${(s.emailsOpened / s.emailsSent) * 100}%` }} /></div><span className="text-xs font-bold text-heading">{((s.emailsOpened / s.emailsSent) * 100).toFixed(0)}%</span></div></td>
                <td className="px-4 py-3"><span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${s.status === 'active' ? 'text-green-600 bg-green-50 border-green-200' : 'text-red-600 bg-red-50 border-red-200'}`}>{s.status === 'active' ? <Check className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5" />}{s.status}</span></td>
                <td className="px-4 py-3"><div className="flex items-center justify-end gap-1"><button className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-text-secondary hover:text-primary"><Send className="w-3.5 h-3.5" /></button><button className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-text-secondary hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button></div></td>
              </motion.tr>
            ))}
          </tbody>
        </table></div>
      </div>
    </div>
  )
}
