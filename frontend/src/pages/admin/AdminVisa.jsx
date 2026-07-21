import { useState } from 'react'
import { motion } from 'framer-motion'
import { Stamp, Plus, Search, Edit2, Trash2, Clock, FileText, DollarSign } from 'lucide-react'

const dummyVisas = [
  { id: 1, country: 'UAE', flag: '\u{1F1E6}\u{1F1EA}', type: 'Tourist', validity: '30 Days', processing: '3-5 Days', fee: 5500, documents: ['Passport', 'Photo', 'Bank Statement', 'Return Ticket'], applications: 892, approved: 834, rejected: 58, status: 'active' },
  { id: 2, country: 'Singapore', flag: '\u{1F1F8}\u{1F1EC}', type: 'Tourist', validity: '30 Days', processing: '5-7 Days', fee: 3200, documents: ['Passport', 'Photo', 'Employment Proof', 'Bank Statement'], applications: 567, approved: 521, rejected: 46, status: 'active' },
  { id: 3, country: 'Thailand', flag: '\u{1F1F9}\u{1F1ED}', type: 'Tourist', validity: '60 Days', processing: '2-3 Days', fee: 2800, documents: ['Passport', 'Photo', 'Return Ticket'], applications: 1248, approved: 1198, rejected: 50, status: 'active' },
  { id: 4, country: 'USA', flag: '\u{1F1FA}\u{1F1F8}', type: 'B1/B2', validity: '10 Years', processing: '15-30 Days', fee: 14500, documents: ['Passport', 'DS-160', 'Photo', 'Employment Proof', 'Bank Statement', 'Invitation Letter'], applications: 445, approved: 312, rejected: 133, status: 'active' },
  { id: 5, country: 'Maldives', flag: '\u{1F1F2}\u{1F1FB}', type: 'Tourist', validity: '30 Days', processing: 'On Arrival', fee: 0, documents: ['Passport', 'Return Ticket', 'Hotel Booking'], applications: 678, approved: 675, rejected: 3, status: 'active' },
  { id: 6, country: 'UK', flag: '\u{1F1EC}\u{1F1E7}', type: 'Standard Visitor', validity: '6 Months', processing: '10-15 Days', fee: 11200, documents: ['Passport', 'Photo', 'Bank Statement', 'Employment Proof', 'Travel Itinerary'], applications: 389, approved: 345, rejected: 44, status: 'active' },
  { id: 7, country: 'Schengen', flag: '\u{1F1EA}\u{1F1FA}', type: 'Tourist', validity: '90 Days', processing: '10-15 Days', fee: 8800, documents: ['Passport', 'Photo', 'Travel Insurance', 'Bank Statement', 'Flight Ticket', 'Hotel Booking'], applications: 534, approved: 478, rejected: 56, status: 'active' },
  { id: 8, country: 'Australia', flag: '\u{1F1E6}\u{1F1FA}', type: 'Visitor', validity: '3 Months', processing: '15-20 Days', fee: 9500, documents: ['Passport', 'Photo', 'Bank Statement', 'Employment Proof'], applications: 234, approved: 198, rejected: 36, status: 'inactive' },
]

export default function AdminVisa() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filtered = dummyVisas.filter(v => {
    if (search && !v.country.toLowerCase().includes(search.toLowerCase()) && !v.type.toLowerCase().includes(search.toLowerCase())) return false
    if (statusFilter && v.status !== statusFilter) return false
    return true
  })

  const totalApps = dummyVisas.reduce((s, v) => s + v.applications, 0)
  const totalApproved = dummyVisas.reduce((s, v) => s + v.approved, 0)
  const totalRevenue = dummyVisas.reduce((s, v) => s + v.applications * v.fee, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-extrabold text-heading">Visa Management</h1><p className="text-sm text-text-secondary mt-0.5">Manage visa types, requirements, and fees</p></div>
        <button className="flex items-center gap-2 px-4 py-2.5 gradient-bg text-white text-xs font-bold rounded-xl shadow-glow"><Plus className="w-4 h-4" /> Add Visa Type</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Countries', value: dummyVisas.length, color: 'from-blue-500 to-blue-600' },
          { label: 'Total Applications', value: totalApps.toLocaleString(), color: 'from-green-500 to-green-600' },
          { label: 'Approval Rate', value: `${((totalApproved / totalApps) * 100).toFixed(1)}%`, color: 'from-purple-500 to-purple-600' },
          { label: 'Revenue', value: `\u20B9${(totalRevenue / 100000).toFixed(1)}L`, color: 'from-amber-500 to-orange-500' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-2`}><Stamp className="w-4.5 h-4.5 text-white" /></div>
            <p className="text-xs text-text-tertiary font-medium">{s.label}</p>
            <p className="text-lg font-extrabold text-heading">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" /><input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search country or visa type..." className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" /></div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary"><option value="">All Status</option><option value="active">Active</option><option value="inactive">Inactive</option></select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((v, i) => (
          <motion.div key={v.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} whileHover={{ y: -2 }} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{v.flag}</span>
                <div><p className="text-sm font-bold text-heading">{v.country}</p><p className="text-xs text-text-tertiary">{v.type}</p></div>
              </div>
              <div className="flex gap-1"><button className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-text-secondary hover:text-primary"><Edit2 className="w-3.5 h-3.5" /></button><button className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-text-secondary hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button></div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="p-2 bg-slate-50 rounded-xl"><p className="text-[10px] text-text-tertiary flex items-center gap-1"><Clock className="w-2.5 h-2.5" />Processing</p><p className="text-xs font-bold text-heading">{v.processing}</p></div>
              <div className="p-2 bg-slate-50 rounded-xl"><p className="text-[10px] text-text-tertiary">Validity</p><p className="text-xs font-bold text-heading">{v.validity}</p></div>
            </div>
            <div className="mb-3">
              <p className="text-[10px] text-text-tertiary font-semibold uppercase mb-1.5 flex items-center gap-1"><FileText className="w-2.5 h-2.5" />Required Documents</p>
              <div className="flex flex-wrap gap-1">{v.documents.map(d => <span key={d} className="text-[10px] font-medium px-2 py-0.5 rounded-full text-text-secondary bg-slate-50 border border-slate-200">{d}</span>)}</div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div><p className="text-[10px] text-text-tertiary flex items-center gap-0.5"><DollarSign className="w-2.5 h-2.5" />Fee</p><p className="text-base font-extrabold text-heading">{v.fee === 0 ? 'Free' : `\u20B9${v.fee.toLocaleString('en-IN')}`}</p></div>
              <div className="text-right"><p className="text-[10px] text-text-tertiary">Applications</p><p className="text-xs font-bold text-heading">{v.applications.toLocaleString()}</p></div>
              <div className="text-right"><p className="text-[10px] text-text-tertiary">Approved</p><p className="text-xs font-bold text-green-600">{v.approved}</p></div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${v.status === 'active' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>{v.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
