import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tag, Plus, Edit2, Trash2, X, Search } from 'lucide-react'
import { adminService } from '../../services/adminService.js'

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ code: '', description: '', type: 'percentage', value: 0, min_booking_amount: 0, max_discount: '', usage_limit: 0, valid_from: '', valid_until: '', status: 'active' })

  useEffect(() => { loadCoupons() }, [])

  const loadCoupons = async () => {
    setLoading(true)
    try { const res = await adminService.getCoupons(); setCoupons(res.data || []) } catch (e) { console.error(e) }
    setLoading(false)
  }

  const filtered = coupons.filter(c => !search || c.code.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase()))

  const handleSave = async () => {
    try {
      if (editing) { await adminService.updateCoupon(editing.id, form) }
      else { await adminService.createCoupon(form) }
      setShowModal(false); setEditing(null); loadCoupons()
    } catch (e) { console.error(e) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this coupon?')) return
    try { await adminService.deleteCoupon(id); loadCoupons() } catch (e) { console.error(e) }
  }

  const openEdit = (c) => { setEditing(c); setForm(c); setShowModal(true) }
  const openCreate = () => { setEditing(null); setForm({ code: '', description: '', type: 'percentage', value: 0, min_booking_amount: 0, max_discount: '', usage_limit: 0, valid_from: '', valid_until: '', status: 'active' }); setShowModal(true) }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-heading">Coupons</h1>
          <p className="text-sm text-text-secondary mt-0.5">Manage discount coupons</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 gradient-bg text-white text-xs font-bold rounded-xl shadow-glow">
          <Plus className="w-4 h-4" /> New Coupon
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search coupons..." className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {loading ? <p className="text-text-tertiary text-sm col-span-full text-center py-12">Loading...</p> :
         filtered.length === 0 ? <p className="text-text-tertiary text-sm col-span-full text-center py-12">No coupons found</p> :
         filtered.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Tag className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(c)} className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-text-secondary hover:text-primary"><Edit2 className="w-3.5 h-3.5" /></button>
                <button onClick={() => handleDelete(c.id)} className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-text-secondary hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <p className="text-sm font-bold text-heading">{c.code}</p>
            <p className="text-xs text-text-secondary mb-3">{c.description}</p>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-lg">{c.type === 'percentage' ? `${c.value}% OFF` : `\u20B9${c.value} OFF`}</span>
              <span className="text-text-tertiary">{c.used_count}/{c.usage_limit} used</span>
            </div>
            <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full gradient-bg rounded-full" style={{ width: `${c.usage_limit ? (c.used_count / c.usage_limit) * 100 : 0}%` }} />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-heading">{editing ? 'Edit Coupon' : 'New Coupon'}</h3>
                <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center"><X className="w-4 h-4 text-text-secondary" /></button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} className="px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary">
                  <option value="percentage">Percentage</option><option value="flat">Flat</option>
                </select>
                <input type="number" placeholder="Value" value={form.value} onChange={(e) => setForm({ ...form, value: parseFloat(e.target.value) })} className="px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
                <input type="number" placeholder="Min Amount" value={form.min_booking_amount} onChange={(e) => setForm({ ...form, min_booking_amount: parseFloat(e.target.value) })} className="px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
                <input type="number" placeholder="Usage Limit" value={form.usage_limit} onChange={(e) => setForm({ ...form, usage_limit: parseInt(e.target.value) })} className="px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary">
                  <option value="active">Active</option><option value="inactive">Inactive</option>
                </select>
                <input className="col-span-2 px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <button onClick={handleSave} className="w-full mt-4 py-3 gradient-bg text-white text-sm font-bold rounded-xl shadow-glow">{editing ? 'Update' : 'Create'} Coupon</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
