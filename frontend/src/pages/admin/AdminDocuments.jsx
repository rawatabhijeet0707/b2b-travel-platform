import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, FileText, Download, Eye, FileCheck, Clock, XCircle, FileX, Upload } from 'lucide-react'

const dummyDocs = [
  { id: 'DOC-001', name: 'PAN Card - SkyHigh Travels', agent: 'Rajesh Kumar', agency: 'SkyHigh Travels', type: 'PAN Card', size: '245 KB', uploaded: 'Jan 15, 2024', status: 'verified', format: 'PDF' },
  { id: 'DOC-002', name: 'GST Certificate - Wanderlust Tours', agent: 'Priya Sharma', agency: 'Wanderlust Tours', type: 'GST Certificate', size: '512 KB', uploaded: 'Feb 20, 2024', status: 'verified', format: 'PDF' },
  { id: 'DOC-003', name: 'Business License - Global Voyage', agent: 'Mohammed Ali', agency: 'Global Voyage LLC', type: 'Business License', size: '1.2 MB', uploaded: 'Dec 10, 2023', status: 'verified', format: 'JPG' },
  { id: 'DOC-004', name: 'Aadhaar Card - Horizon Holidays', agent: 'Anita Desai', agency: 'Horizon Holidays', type: 'Aadhaar', size: '189 KB', uploaded: 'Mar 05, 2024', status: 'pending', format: 'PDF' },
  { id: 'DOC-005', name: 'IATA Certificate - FlyHigh Solutions', agent: 'Sneha Reddy', agency: 'FlyHigh Solutions', type: 'IATA Certificate', size: '356 KB', uploaded: 'Nov 15, 2023', status: 'verified', format: 'PDF' },
  { id: 'DOC-006', name: 'PAN Card - TravelCraft', agent: 'Arjun Mehta', agency: 'TravelCraft', type: 'PAN Card', size: '198 KB', uploaded: 'Apr 10, 2024', status: 'pending', format: 'PNG' },
  { id: 'DOC-007', name: 'Business License - Elegant Escapes', agent: 'Fatima Khan', agency: 'Elegant Escapes', type: 'Business License', size: '890 KB', uploaded: 'May 01, 2024', status: 'rejected', format: 'JPG' },
  { id: 'DOC-008', name: 'GST Certificate - Globe Trotter Hub', agent: 'Kavya Nair', agency: 'Globe Trotter Hub', type: 'GST Certificate', size: '478 KB', uploaded: 'Oct 08, 2023', status: 'verified', format: 'PDF' },
  { id: 'DOC-009', name: 'ACRA Profile - Asia Pacific Travel', agent: 'Daniel Park', agency: 'Asia Pacific Travel', type: 'Business License', size: '654 KB', uploaded: 'Sep 12, 2023', status: 'verified', format: 'PDF' },
  { id: 'DOC-010', name: 'Tax Certificate - China Travel Solutions', agent: 'Lisa Chen', agency: 'China Travel Solutions', type: 'Tax Certificate', size: '312 KB', uploaded: 'Aug 05, 2023', status: 'verified', format: 'PDF' },
  { id: 'DOC-011', name: 'Passport Copy - Royal Journeys', agent: 'Vikram Singh', agency: 'Royal Journeys', type: 'Passport', size: '423 KB', uploaded: 'Jan 22, 2024', status: 'verified', format: 'JPG' },
  { id: 'DOC-012', name: 'GST Certificate - Discover India', agent: 'Rohit Gupta', agency: 'Discover India', type: 'GST Certificate', size: '567 KB', uploaded: 'Feb 18, 2024', status: 'verified', format: 'PDF' },
]

const statusConfig = {
  verified: { color: 'text-green-600 bg-green-50 border-green-200', icon: FileCheck },
  pending: { color: 'text-amber-600 bg-amber-50 border-amber-200', icon: Clock },
  rejected: { color: 'text-red-600 bg-red-50 border-red-200', icon: XCircle },
}

const formatColor = {
  PDF: 'text-red-600 bg-red-50',
  JPG: 'text-blue-600 bg-blue-50',
  PNG: 'text-violet-600 bg-violet-50',
}

export default function AdminDocuments() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')

  const filtered = dummyDocs.filter(d => {
    if (search) {
      const q = search.toLowerCase()
      if (!d.name.toLowerCase().includes(q) && !d.agent.toLowerCase().includes(q) && !d.agency.toLowerCase().includes(q)) return false
    }
    if (statusFilter && d.status !== statusFilter) return false
    if (typeFilter && d.type !== typeFilter) return false
    return true
  })

  const docTypes = [...new Set(dummyDocs.map(d => d.type))]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-heading">Documents</h1>
          <p className="text-sm text-text-secondary mt-0.5">Manage and verify uploaded documents</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 gradient-bg text-white text-sm font-semibold rounded-xl shadow-glow">
          <Upload className="w-4 h-4" /> Upload Document
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Documents', value: dummyDocs.length, icon: FileText, color: 'text-blue-600 bg-blue-50' },
          { label: 'Verified', value: dummyDocs.filter(d => d.status === 'verified').length, icon: FileCheck, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Pending Review', value: dummyDocs.filter(d => d.status === 'pending').length, icon: Clock, color: 'text-amber-600 bg-amber-50' },
          { label: 'Rejected', value: dummyDocs.filter(d => d.status === 'rejected').length, icon: FileX, color: 'text-red-600 bg-red-50' },
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
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search documents..." className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-heading placeholder:text-text-tertiary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
        </div>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary">
          <option value="">All Types</option>
          {docTypes.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
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
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Document</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Agent</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden md:table-cell">Type</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Size</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Uploaded</th>
                <th className="text-left text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-right text-xs font-bold text-text-tertiary uppercase tracking-wider px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="7" className="text-center py-12 text-text-tertiary text-sm">No documents found</td></tr>
              ) : filtered.map((d, i) => {
                const StatusIcon = statusConfig[d.status].icon
                return (
                  <motion.tr key={d.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${formatColor[d.format] || 'text-slate-600 bg-slate-100'}`}>{d.format}</div>
                        <div><p className="text-sm font-semibold text-heading">{d.name}</p><p className="text-xs text-text-tertiary">{d.id}</p></div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell"><p className="text-sm text-text-secondary">{d.agent}</p><p className="text-xs text-text-tertiary">{d.agency}</p></td>
                    <td className="px-4 py-3 hidden md:table-cell"><span className="text-xs font-medium text-text-secondary bg-slate-100 px-2 py-0.5 rounded-full">{d.type}</span></td>
                    <td className="px-4 py-3 hidden lg:table-cell"><p className="text-sm text-text-secondary">{d.size}</p></td>
                    <td className="px-4 py-3 hidden lg:table-cell"><p className="text-sm text-text-secondary">{d.uploaded}</p></td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border capitalize ${statusConfig[d.status].color}`}>
                        <StatusIcon className="w-3 h-3" />{d.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-text-secondary hover:text-primary" title="View"><Eye className="w-3.5 h-3.5" /></button>
                        <button className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-text-secondary hover:text-primary" title="Download"><Download className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100"><p className="text-sm text-text-tertiary">Showing {filtered.length} of {dummyDocs.length} documents</p></div>
      </div>
    </div>
  )
}
