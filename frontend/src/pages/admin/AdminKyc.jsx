import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Eye, X, CheckCircle2, Clock, XCircle, FileCheck, FileText, Upload, ShieldCheck, AlertCircle } from 'lucide-react'

const dummyKyc = [
  { id: 'KYC-001', agent: 'Rajesh Kumar', agency: 'SkyHigh Travels', email: 'rajesh@skyhightravels.com', mobile: '+91 98765 43210', status: 'verified', submittedDate: 'Jan 15, 2024', verifiedDate: 'Jan 16, 2024', documents: ['PAN Card', 'Aadhaar', 'Business License', 'GST Certificate'], city: 'New Delhi' },
  { id: 'KYC-002', agent: 'Priya Sharma', agency: 'Wanderlust Tours', email: 'priya@wanderlusttours.in', mobile: '+91 99876 54321', status: 'verified', submittedDate: 'Feb 20, 2024', verifiedDate: 'Feb 22, 2024', documents: ['PAN Card', 'Aadhaar', 'IATA Certificate'], city: 'Mumbai' },
  { id: 'KYC-003', agent: 'Mohammed Ali', agency: 'Global Voyage LLC', email: 'ali@globalvoyage.ae', mobile: '+971 50 123 4567', status: 'verified', submittedDate: 'Dec 10, 2023', verifiedDate: 'Dec 12, 2023', documents: ['Trade License', 'Passport Copy', 'Tax Registration'], city: 'Dubai' },
  { id: 'KYC-004', agent: 'Anita Desai', agency: 'Horizon Holidays', email: 'anita@horizonholidays.com', mobile: '+91 90123 45678', status: 'pending', submittedDate: 'Mar 05, 2024', verifiedDate: null, documents: ['PAN Card', 'Aadhaar'], city: 'Bangalore' },
  { id: 'KYC-005', agent: 'Vikram Singh', agency: 'Royal Journeys', email: 'vikram@royaljourneys.com', mobile: '+91 98111 22233', status: 'verified', submittedDate: 'Jan 22, 2024', verifiedDate: 'Jan 25, 2024', documents: ['PAN Card', 'Aadhaar', 'Business License'], city: 'Jaipur' },
  { id: 'KYC-006', agent: 'Sneha Reddy', agency: 'FlyHigh Solutions', email: 'sneha@flyhighsolutions.in', mobile: '+91 97000 55667', status: 'verified', submittedDate: 'Nov 15, 2023', verifiedDate: 'Nov 18, 2023', documents: ['PAN Card', 'Aadhaar', 'GST Certificate', 'IATA Certificate'], city: 'Hyderabad' },
  { id: 'KYC-007', agent: 'Arjun Mehta', agency: 'TravelCraft', email: 'arjun@travelcraft.co', mobile: '+91 98300 11234', status: 'pending', submittedDate: 'Apr 10, 2024', verifiedDate: null, documents: ['PAN Card'], city: 'Pune' },
  { id: 'KYC-008', agent: 'Kavya Nair', agency: 'Globe Trotter Hub', email: 'kavya@globetrotterhub.com', mobile: '+91 97455 66778', status: 'verified', submittedDate: 'Oct 08, 2023', verifiedDate: 'Oct 10, 2023', documents: ['PAN Card', 'Aadhaar', 'Business License', 'GST Certificate'], city: 'Kochi' },
  { id: 'KYC-009', agent: 'Daniel Park', agency: 'Asia Pacific Travel', email: 'daniel@asiapacifictravel.sg', mobile: '+65 8123 4567', status: 'verified', submittedDate: 'Sep 12, 2023', verifiedDate: 'Sep 15, 2023', documents: ['ACRA Profile', 'Passport Copy', 'Business License'], city: 'Singapore' },
  { id: 'KYC-010', agent: 'Fatima Khan', agency: 'Elegant Escapes', email: 'fatima@elegantescapes.pk', mobile: '+92 300 1234567', status: 'rejected', submittedDate: 'May 01, 2024', verifiedDate: null, documents: ['CNIC', 'Business License'], city: 'Karachi', rejectReason: 'Business license expired. Please submit a valid renewed license.' },
  { id: 'KYC-011', agent: 'Rohit Gupta', agency: 'Discover India', email: 'rohit@discoverindia.co', mobile: '+91 98998 88776', status: 'verified', submittedDate: 'Feb 18, 2024', verifiedDate: 'Feb 20, 2024', documents: ['PAN Card', 'Aadhaar', 'GST Certificate'], city: 'Lucknow' },
  { id: 'KYC-012', agent: 'Lisa Chen', agency: 'China Travel Solutions', email: 'lisa@chinatravelsolutions.cn', mobile: '+86 138 1234 5678', status: 'verified', submittedDate: 'Aug 05, 2023', verifiedDate: 'Aug 08, 2023', documents: ['Business License', 'Passport Copy', 'Tax Certificate'], city: 'Shanghai' },
]

const statusConfig = {
  verified: { color: 'text-green-600 bg-green-50 border-green-200', icon: CheckCircle2 },
  pending: { color: 'text-amber-600 bg-amber-50 border-amber-200', icon: Clock },
  rejected: { color: 'text-red-600 bg-red-50 border-red-200', icon: XCircle },
}

export default function AdminKyc() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = dummyKyc.filter(k => {
    if (search) {
      const q = search.toLowerCase()
      if (!k.agent.toLowerCase().includes(q) && !k.agency.toLowerCase().includes(q) && !k.id.toLowerCase().includes(q)) return false
    }
    if (statusFilter && k.status !== statusFilter) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-heading">KYC Management</h1>
        <p className="text-sm text-text-secondary mt-0.5">Review and verify agent KYC documents</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total KYC', value: dummyKyc.length, icon: FileCheck, color: 'text-blue-600 bg-blue-50' },
          { label: 'Verified', value: dummyKyc.filter(k => k.status === 'verified').length, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Pending Review', value: dummyKyc.filter(k => k.status === 'pending').length, icon: Clock, color: 'text-amber-600 bg-amber-50' },
          { label: 'Rejected', value: dummyKyc.filter(k => k.status === 'rejected').length, icon: XCircle, color: 'text-red-600 bg-red-50' },
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
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by agent, agency, or KYC ID..." className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-heading placeholder:text-text-tertiary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary">
          <option value="">All Status</option>
          <option value="verified">Verified</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Agent</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Agency</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden md:table-cell">Documents</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Submitted</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-right text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-12 text-text-tertiary text-sm">No KYC records found</td></tr>
              ) : filtered.map((k, i) => {
                const StatusIcon = statusConfig[k.status].icon
                return (
                  <motion.tr key={k.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white text-xs font-bold shrink-0">{k.agent.charAt(0)}</div>
                        <div><p className="text-sm font-semibold text-heading">{k.agent}</p><p className="text-xs text-text-tertiary">{k.id}</p></div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell"><p className="text-sm text-text-secondary">{k.agency}</p><p className="text-xs text-text-tertiary">{k.city}</p></td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-text-tertiary" />
                        <span className="text-sm text-text-secondary">{k.documents.length} docs</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell"><p className="text-sm text-text-secondary">{k.submittedDate}</p></td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border capitalize ${statusConfig[k.status].color}`}>
                        <StatusIcon className="w-3 h-3" />{k.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => setSelected(k)} className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-text-secondary hover:text-primary" title="Review KYC"><Eye className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100"><p className="text-sm text-text-tertiary">Showing {filtered.length} of {dummyKyc.length} KYC records</p></div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-heading">KYC Review - {selected.id}</h3>
                <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center"><X className="w-4 h-4 text-text-secondary" /></button>
              </div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center text-white text-2xl font-bold">{selected.agent.charAt(0)}</div>
                <div><p className="text-lg font-bold text-heading">{selected.agent}</p><p className="text-sm text-text-secondary">{selected.agency}</p><p className="text-xs text-text-tertiary">{selected.city}</p></div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="p-3 bg-slate-50 rounded-xl"><p className="text-xs text-text-tertiary">Email</p><p className="text-sm font-semibold text-heading truncate">{selected.email}</p></div>
                <div className="p-3 bg-slate-50 rounded-xl"><p className="text-xs text-text-tertiary">Mobile</p><p className="text-sm font-semibold text-heading">{selected.mobile}</p></div>
                <div className="p-3 bg-slate-50 rounded-xl"><p className="text-xs text-text-tertiary">Submitted</p><p className="text-sm font-semibold text-heading">{selected.submittedDate}</p></div>
                <div className="p-3 bg-slate-50 rounded-xl"><p className="text-xs text-text-tertiary">Verified</p><p className="text-sm font-semibold text-heading">{selected.verifiedDate || 'Pending'}</p></div>
              </div>
              <div className="mb-5">
                <p className="text-sm font-semibold text-heading mb-2">Submitted Documents</p>
                <div className="space-y-2">
                  {selected.documents.map(doc => (
                    <div key={doc} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-text-tertiary" /><span className="text-sm text-text-secondary">{doc}</span></div>
                      <button className="text-xs font-semibold text-primary hover:underline">View</button>
                    </div>
                  ))}
                </div>
              </div>
              {selected.status === 'rejected' && selected.rejectReason && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl mb-4 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div><p className="text-xs font-semibold text-red-600">Rejection Reason</p><p className="text-sm text-red-600 mt-0.5">{selected.rejectReason}</p></div>
                </div>
              )}
              <div className="flex items-center gap-2 mb-4">
                <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border capitalize ${statusConfig[selected.status].color}`}>
                  {selected.status}
                </span>
              </div>
              {selected.status === 'pending' && (
                <div className="flex gap-2">
                  <button className="flex-1 py-2.5 bg-green-50 border border-green-200 text-green-600 text-xs font-bold rounded-xl hover:bg-green-100 flex items-center justify-center gap-1.5"><ShieldCheck className="w-4 h-4" /> Approve KYC</button>
                  <button className="flex-1 py-2.5 bg-red-50 border border-red-200 text-red-600 text-xs font-bold rounded-xl hover:bg-red-100 flex items-center justify-center gap-1.5"><XCircle className="w-4 h-4" /> Reject</button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
