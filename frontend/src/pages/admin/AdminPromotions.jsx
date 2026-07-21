import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Percent, Plus, Edit2, Trash2, X, Calendar, Target, TrendingUp } from 'lucide-react'

const dummyPromotions = [
  { id: 1, name: 'Monsoon Madness', code: 'MONSOON25', type: 'Seasonal', discount: '25%', applicableOn: 'Hotels, Packages', startDate: '2024-07-01', endDate: '2024-09-30', target: 'All Users', usage: 1248, limit: 5000, revenue: 8450000, status: 'active' },
  { id: 2, name: 'First Booking Bonus', code: 'FIRST500', type: 'New User', discount: 'Flat \u20B9500', applicableOn: 'All Services', startDate: '2024-01-01', endDate: '2024-12-31', target: 'New Users', usage: 3421, limit: 10000, revenue: 4200000, status: 'active' },
  { id: 3, name: 'Weekend Flight Deal', code: 'WEEKEND10', type: 'Flash Sale', discount: '10%', applicableOn: 'Flights', startDate: '2024-07-15', endDate: '2024-07-21', target: 'All Users', usage: 567, limit: 2000, revenue: 1850000, status: 'active' },
  { id: 4, name: 'Visa Festival Offer', code: 'VISAFREE', type: 'Festival', discount: 'Free Processing', applicableOn: 'Visa', startDate: '2024-08-01', endDate: '2024-08-15', target: 'All Users', usage: 0, limit: 500, revenue: 0, status: 'scheduled' },
  { id: 5, name: 'Premium Agent Reward', code: 'PREMIUM15', type: 'Loyalty', discount: '15%', applicableOn: 'All Services', startDate: '2024-06-01', endDate: '2024-12-31', target: 'Premium Agents', usage: 234, limit: 1000, revenue: 3200000, status: 'active' },
  { id: 6, name: 'Summer Holiday Special', code: 'SUMMER30', type: 'Seasonal', discount: '30%', applicableOn: 'Packages', startDate: '2024-05-01', endDate: '2024-06-30', target: 'All Users', usage: 1893, limit: 2000, revenue: 12800000, status: 'expired' },
]

const typeColors = { Seasonal: 'text-blue-600 bg-blue-50 border-blue-200', 'New User': 'text-green-600 bg-green-50 border-green-200', 'Flash Sale': 'text-red-600 bg-red-50 border-red-200', Festival: 'text-purple-600 bg-purple-50 border-purple-200', Loyalty: 'text-amber-600 bg-amber-50 border-amber-200' }
const statusColors = { active: 'text-green-600 bg-green-50 border-green-200', scheduled: 'text-blue-600 bg-blue-50 border-blue-200', expired: 'text-text-tertiary bg-slate-100 border-slate-200' }

export default function AdminPromotions() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-extrabold text-heading">Promotions</h1><p className="text-sm text-text-secondary mt-0.5">Create and manage promotional campaigns</p></div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2.5 gradient-bg text-white text-xs font-bold rounded-xl shadow-glow"><Plus className="w-4 h-4" /> New Promotion</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Active Promotions', value: dummyPromotions.filter(p => p.status === 'active').length, color: 'from-green-500 to-green-600' },
          { label: 'Total Usage', value: dummyPromotions.reduce((s, p) => s + p.usage, 0).toLocaleString(), color: 'from-blue-500 to-blue-600' },
          { label: 'Revenue Impact', value: `\u20B9${(dummyPromotions.reduce((s, p) => s + p.revenue, 0) / 100000).toFixed(1)}L`, color: 'from-purple-500 to-purple-600' },
          { label: 'Scheduled', value: dummyPromotions.filter(p => p.status === 'scheduled').length, color: 'from-amber-500 to-orange-500' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-2`}><Percent className="w-4.5 h-4.5 text-white" /></div>
            <p className="text-xs text-text-tertiary font-medium">{s.label}</p><p className="text-lg font-extrabold text-heading">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {dummyPromotions.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} whileHover={{ y: -2 }} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2.5"><div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center"><Percent className="w-5 h-5 text-white" /></div><div><p className="text-sm font-bold text-heading">{p.name}</p><p className="text-xs font-mono text-primary">{p.code}</p></div></div>
              <div className="flex gap-1"><button className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-text-secondary hover:text-primary"><Edit2 className="w-3.5 h-3.5" /></button><button className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-text-secondary hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button></div>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3"><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${typeColors[p.type] || ''}`}>{p.type}</span><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColors[p.status] || ''}`}>{p.status}</span></div>
            <div className="space-y-2 mb-3">
              <div className="flex items-center justify-between text-xs"><span className="text-text-tertiary flex items-center gap-1"><Target className="w-3 h-3" />Discount</span><span className="font-bold text-heading">{p.discount}</span></div>
              <div className="flex items-center justify-between text-xs"><span className="text-text-tertiary">Applicable On</span><span className="font-medium text-heading">{p.applicableOn}</span></div>
              <div className="flex items-center justify-between text-xs"><span className="text-text-tertiary flex items-center gap-1"><Calendar className="w-3 h-3" />Duration</span><span className="font-medium text-heading">{p.startDate} → {p.endDate}</span></div>
              <div className="flex items-center justify-between text-xs"><span className="text-text-tertiary">Target</span><span className="font-medium text-heading">{p.target}</span></div>
            </div>
            <div className="pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between mb-1.5"><span className="text-xs text-text-tertiary flex items-center gap-1"><TrendingUp className="w-3 h-3" />Usage</span><span className="text-xs font-bold text-heading">{p.usage.toLocaleString()} / {p.limit.toLocaleString()}</span></div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full gradient-bg rounded-full" style={{ width: `${Math.min((p.usage / p.limit) * 100, 100)}%` }} /></div>
              <p className="text-xs text-text-tertiary mt-1.5">Revenue: <span className="font-bold text-green-600">{"\u20B9"}{(p.revenue / 100000).toFixed(1)}L</span></p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>{showModal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5"><h3 className="text-lg font-bold text-heading">New Promotion</h3><button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center"><X className="w-4 h-4 text-text-secondary" /></button></div>
            <div className="space-y-3">
              <input placeholder="Promotion Name" className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
              <input placeholder="Promo Code" className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary font-mono" />
              <select className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary"><option>Seasonal</option><option>New User</option><option>Flash Sale</option><option>Festival</option><option>Loyalty</option></select>
              <input placeholder="Discount Value" className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
              <div className="grid grid-cols-2 gap-3"><input type="date" className="px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary" /><input type="date" className="px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary" /></div>
            </div>
            <button onClick={() => setShowModal(false)} className="w-full mt-4 py-3 gradient-bg text-white text-sm font-bold rounded-xl shadow-glow">Create Promotion</button>
          </motion.div>
        </motion.div>
      )}</AnimatePresence>
    </div>
  )
}
