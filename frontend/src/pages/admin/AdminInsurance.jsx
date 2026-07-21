import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Plus, Search, Edit2, Trash2, Check, Star } from 'lucide-react'

const dummyInsurance = [
  { id: 1, provider: 'TATA AIG', plan: 'Premium Travel Shield', price: 899, duration: '7 Days', coverage: 500000, features: ['Medical Coverage', 'Trip Cancellation', 'Baggage Loss', 'Emergency Evacuation', '24/7 Support'], rating: 4.8, sold: 1248, status: 'active' },
  { id: 2, provider: 'ICICI Lombard', plan: 'International Plus', price: 1299, duration: '15 Days', coverage: 1000000, features: ['Medical Coverage', 'Trip Cancellation', 'Baggage Loss', 'Flight Delay', 'Adventure Sports'], rating: 4.6, sold: 892, status: 'active' },
  { id: 3, provider: 'HDFC ERGO', plan: 'Student Travel Care', price: 2100, duration: '365 Days', coverage: 2000000, features: ['Medical Coverage', 'Study Interruption', 'Baggage Loss', 'Emergency Evacuation', 'Mental Health Support'], rating: 4.7, sold: 567, status: 'active' },
  { id: 4, provider: 'Bajaj Allianz', plan: 'Family Travel Secure', price: 1599, duration: '30 Days', coverage: 1500000, features: ['Family Coverage', 'Medical Coverage', 'Trip Cancellation', 'Baggage Loss', '24/7 Support'], rating: 4.5, sold: 734, status: 'active' },
  { id: 5, provider: 'Reliance General', plan: 'Budget Travel Lite', price: 499, duration: '5 Days', coverage: 250000, features: ['Medical Coverage', 'Baggage Loss', '24/7 Support'], rating: 4.2, sold: 2156, status: 'active' },
  { id: 6, provider: 'Star Health', plan: 'Senior Citizen Travel', price: 2899, duration: '60 Days', coverage: 3000000, features: ['Pre-existing Coverage', 'Medical Coverage', 'Emergency Evacuation', '24/7 Support', 'Dental Coverage'], rating: 4.4, sold: 345, status: 'active' },
  { id: 7, provider: 'SBI General', plan: 'Schengen Visa Insurance', price: 899, duration: '15 Days', coverage: 3000000, features: ['Schengen Compliant', 'Medical Coverage', 'Emergency Evacuation', '24/7 Support'], rating: 4.3, sold: 678, status: 'active' },
  { id: 8, provider: 'GoDigit', plan: 'Adventure Travel Pro', price: 1799, duration: '10 Days', coverage: 1200000, features: ['Adventure Sports', 'Medical Coverage', 'Equipment Loss', 'Emergency Evacuation', '24/7 Support'], rating: 4.6, sold: 423, status: 'inactive' },
]

const providerColors = { 'TATA AIG': '#1B4D89', 'ICICI Lombard': '#F47216', 'HDFC ERGO': '#004C91', 'Bajaj Allianz': '#0033A0', 'Reliance General': '#0072BC', 'Star Health': '#ED1C24', 'SBI General': '#00529B', 'GoDigit': '#A8002D' }

export default function AdminInsurance() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filtered = dummyInsurance.filter(p => {
    if (search && !p.provider.toLowerCase().includes(search.toLowerCase()) && !p.plan.toLowerCase().includes(search.toLowerCase())) return false
    if (statusFilter && p.status !== statusFilter) return false
    return true
  })

  const totalSold = dummyInsurance.reduce((s, p) => s + p.sold, 0)
  const totalRevenue = dummyInsurance.reduce((s, p) => s + p.sold * p.price, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-extrabold text-heading">Insurance Management</h1><p className="text-sm text-text-secondary mt-0.5">Manage travel insurance plans and providers</p></div>
        <button className="flex items-center gap-2 px-4 py-2.5 gradient-bg text-white text-xs font-bold rounded-xl shadow-glow"><Plus className="w-4 h-4" /> Add Insurance Plan</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Plans', value: dummyInsurance.length, color: 'from-green-500 to-green-600' },
          { label: 'Policies Sold', value: totalSold.toLocaleString(), color: 'from-blue-500 to-blue-600' },
          { label: 'Revenue', value: `\u20B9${(totalRevenue / 100000).toFixed(1)}L`, color: 'from-purple-500 to-purple-600' },
          { label: 'Active Plans', value: dummyInsurance.filter(p => p.status === 'active').length, color: 'from-amber-500 to-orange-500' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-2`}><ShieldCheck className="w-4.5 h-4.5 text-white" /></div>
            <p className="text-xs text-text-tertiary font-medium">{s.label}</p><p className="text-lg font-extrabold text-heading">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" /><input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search provider or plan..." className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" /></div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary"><option value="">All Status</option><option value="active">Active</option><option value="inactive">Inactive</option></select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} whileHover={{ y: -2 }} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: providerColors[p.provider] || '#2563EB' }}>{p.provider.slice(0, 2).toUpperCase()}</div>
                <div><p className="text-sm font-bold text-heading">{p.provider}</p><p className="text-xs text-text-tertiary">{p.plan}</p></div>
              </div>
              <div className="flex gap-1"><button className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-text-secondary hover:text-primary"><Edit2 className="w-3.5 h-3.5" /></button><button className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-text-secondary hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button></div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="p-2 bg-slate-50 rounded-xl text-center"><p className="text-[10px] text-text-tertiary">Duration</p><p className="text-xs font-bold text-heading">{p.duration}</p></div>
              <div className="p-2 bg-slate-50 rounded-xl text-center"><p className="text-[10px] text-text-tertiary">Coverage</p><p className="text-xs font-bold text-heading">{"\u20B9"}{(p.coverage / 100000).toFixed(0)}L</p></div>
              <div className="p-2 bg-slate-50 rounded-xl text-center"><p className="text-[10px] text-text-tertiary flex items-center justify-center gap-0.5"><Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />Rating</p><p className="text-xs font-bold text-heading">{p.rating}</p></div>
            </div>
            <div className="mb-3"><div className="flex flex-wrap gap-1">{p.features.map(f => <span key={f} className="text-[10px] font-medium px-2 py-0.5 rounded-full text-green-600 bg-green-50 border border-green-200 flex items-center gap-0.5"><Check className="w-2.5 h-2.5" />{f}</span>)}</div></div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div><p className="text-[10px] text-text-tertiary">Price</p><p className="text-base font-extrabold text-heading">{"\u20B9"}{p.price.toLocaleString('en-IN')}</p></div>
              <div className="text-right"><p className="text-[10px] text-text-tertiary">Policies Sold</p><p className="text-xs font-bold text-heading">{p.sold.toLocaleString()}</p></div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${p.status === 'active' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>{p.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
