import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Eye, X, Mail, Phone, Shield, CheckCircle2, Ban, UserCog } from 'lucide-react'

const dummyStaff = [
  { id: 'STF-001', name: 'Aarav Patel', email: 'aarav@travelhub.com', mobile: '+91 98765 11111', role: 'Super Admin', department: 'Management', status: 'active', joined: 'Jan 2023', lastActive: '2 min ago' },
  { id: 'STF-002', name: 'Diya Sharma', email: 'diya@travelhub.com', mobile: '+91 98765 22222', role: 'Operations Manager', department: 'Operations', status: 'active', joined: 'Mar 2023', lastActive: '15 min ago' },
  { id: 'STF-003', name: 'Karan Mehta', email: 'karan@travelhub.com', mobile: '+91 98765 33333', role: 'Finance Officer', department: 'Finance', status: 'active', joined: 'Jun 2023', lastActive: '1 hour ago' },
  { id: 'STF-004', name: 'Isha Reddy', email: 'isha@travelhub.com', mobile: '+91 98765 44444', role: 'Support Lead', department: 'Customer Support', status: 'active', joined: 'Aug 2023', lastActive: '3 hours ago' },
  { id: 'STF-005', name: 'Arnav Gupta', email: 'arnav@travelhub.com', mobile: '+91 98765 55555', role: 'Content Manager', department: 'Content', status: 'active', joined: 'Sep 2023', lastActive: '5 hours ago' },
  { id: 'STF-006', name: 'Saanvi Nair', email: 'saanvi@travelhub.com', mobile: '+91 98765 66666', role: 'Sales Executive', department: 'Sales', status: 'suspended', joined: 'Nov 2023', lastActive: '2 days ago' },
  { id: 'STF-007', name: 'Vihaan Singh', email: 'vihaan@travelhub.com', mobile: '+91 98765 77777', role: 'IT Administrator', department: 'Technology', status: 'active', joined: 'Dec 2023', lastActive: '10 min ago' },
  { id: 'STF-008', name: 'Ananya Iyer', email: 'ananya@travelhub.com', mobile: '+91 98765 88888', role: 'Marketing Specialist', department: 'Marketing', status: 'active', joined: 'Feb 2024', lastActive: '30 min ago' },
]

const roleColor = {
  'Super Admin': 'text-purple-600 bg-purple-50 border-purple-200',
  'Operations Manager': 'text-blue-600 bg-blue-50 border-blue-200',
  'Finance Officer': 'text-emerald-600 bg-emerald-50 border-emerald-200',
  'Support Lead': 'text-amber-600 bg-amber-50 border-amber-200',
  'Content Manager': 'text-pink-600 bg-pink-50 border-pink-200',
  'Sales Executive': 'text-cyan-600 bg-cyan-50 border-cyan-200',
  'IT Administrator': 'text-indigo-600 bg-indigo-50 border-indigo-200',
  'Marketing Specialist': 'text-red-600 bg-red-50 border-red-200',
}

export default function AdminStaff() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = dummyStaff.filter(s => {
    if (search) {
      const q = search.toLowerCase()
      if (!s.name.toLowerCase().includes(q) && !s.email.toLowerCase().includes(q) && !s.role.toLowerCase().includes(q)) return false
    }
    if (statusFilter && s.status !== statusFilter) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-heading">Staff Management</h1>
        <p className="text-sm text-text-secondary mt-0.5">Manage internal staff and their roles</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Staff', value: dummyStaff.length, icon: UserCog, color: 'text-blue-600 bg-blue-50' },
          { label: 'Active', value: dummyStaff.filter(s => s.status === 'active').length, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Suspended', value: dummyStaff.filter(s => s.status === 'suspended').length, icon: Ban, color: 'text-red-600 bg-red-50' },
          { label: 'Departments', value: [...new Set(dummyStaff.map(s => s.department))].length, icon: Shield, color: 'text-violet-600 bg-violet-50' },
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
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, email, or role..." className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-heading placeholder:text-text-tertiary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Staff</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Role</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden md:table-cell">Department</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Last Active</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-right text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-12 text-text-tertiary text-sm">No staff found</td></tr>
              ) : filtered.map((s, i) => (
                <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white text-xs font-bold shrink-0">{s.name.charAt(0)}</div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-heading truncate">{s.name}</p>
                        <p className="text-xs text-text-tertiary truncate">{s.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${roleColor[s.role] || 'text-slate-600 bg-slate-50 border-slate-200'}`}>{s.role}</span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell"><p className="text-sm text-text-secondary">{s.department}</p></td>
                  <td className="px-4 py-3 hidden lg:table-cell"><p className="text-sm text-text-tertiary">{s.lastActive}</p></td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${s.status === 'active' ? 'text-green-600 bg-green-50 border border-green-200' : 'text-red-600 bg-red-50 border border-red-200'}`}>
                      {s.status === 'active' ? <CheckCircle2 className="w-3 h-3" /> : <Ban className="w-3 h-3" />}{s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => setSelected(s)} className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-text-secondary hover:text-primary" title="View Details"><Eye className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100"><p className="text-sm text-text-tertiary">Showing {filtered.length} of {dummyStaff.length} staff members</p></div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-heading">Staff Details</h3>
                <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center"><X className="w-4 h-4 text-text-secondary" /></button>
              </div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center text-white text-2xl font-bold">{selected.name.charAt(0)}</div>
                <div><p className="text-lg font-bold text-heading">{selected.name}</p><p className="text-sm text-text-secondary">{selected.role}</p><p className="text-xs text-text-tertiary">{selected.id}</p></div>
              </div>
              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4 text-text-tertiary" /><span className="text-text-secondary">{selected.email}</span></div>
                <div className="flex items-center gap-2 text-sm"><Phone className="w-4 h-4 text-text-tertiary" /><span className="text-text-secondary">{selected.mobile}</span></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl"><p className="text-xs text-text-tertiary">Department</p><p className="text-sm font-semibold text-heading">{selected.department}</p></div>
                <div className="p-3 bg-slate-50 rounded-xl"><p className="text-xs text-text-tertiary">Joined</p><p className="text-sm font-semibold text-heading">{selected.joined}</p></div>
                <div className="p-3 bg-slate-50 rounded-xl"><p className="text-xs text-text-tertiary">Last Active</p><p className="text-sm font-semibold text-heading">{selected.lastActive}</p></div>
                <div className="p-3 bg-slate-50 rounded-xl"><p className="text-xs text-text-tertiary">Status</p><p className="text-sm font-semibold text-heading capitalize">{selected.status}</p></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
