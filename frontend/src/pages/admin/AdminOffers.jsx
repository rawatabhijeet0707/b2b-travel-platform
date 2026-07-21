import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gift, Plus, Edit2, Trash2, X } from 'lucide-react'
import { adminService } from '../../services/adminService.js'

export default function AdminOffers() {
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', description: '', type: 'homepage', image_url: '', link_url: '', start_date: '', end_date: '', status: 'active' })

  useEffect(() => { loadOffers() }, [])

  const loadOffers = async () => {
    setLoading(true)
    try { const res = await adminService.getOffers(); setOffers(res.data || []) } catch (e) { console.error(e) }
    setLoading(false)
  }

  const handleSave = async () => {
    try {
      if (editing) { await adminService.updateOffer(editing.id, form) }
      else { await adminService.createOffer(form) }
      setShowModal(false); setEditing(null); loadOffers()
    } catch (e) { console.error(e) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this offer?')) return
    try { await adminService.deleteOffer(id); loadOffers() } catch (e) { console.error(e) }
  }

  const openEdit = (o) => { setEditing(o); setForm(o); setShowModal(true) }
  const openCreate = () => { setEditing(null); setForm({ title: '', description: '', type: 'homepage', image_url: '', link_url: '', start_date: '', end_date: '', status: 'active' }); setShowModal(true) }

  const typeColors = { homepage: 'bg-blue-50 text-blue-600', popup: 'bg-purple-50 text-purple-600', banner: 'bg-amber-50 text-amber-600', festival: 'bg-pink-50 text-pink-600' }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-heading">Offers</h1>
          <p className="text-sm text-text-secondary mt-0.5">Manage promotional offers</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 gradient-bg text-white text-xs font-bold rounded-xl shadow-glow">
          <Plus className="w-4 h-4" /> New Offer
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? <p className="text-text-tertiary text-sm col-span-full text-center py-12">Loading...</p> :
         offers.length === 0 ? <p className="text-text-tertiary text-sm col-span-full text-center py-12">No offers found</p> :
         offers.map((o, i) => (
          <motion.div key={o.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            {o.image_url && <div className="h-32 overflow-hidden"><img src={o.image_url} alt={o.title} className="w-full h-full object-cover" /></div>}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeColors[o.type] || ''}`}>{o.type}</span>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(o)} className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-text-secondary hover:text-primary"><Edit2 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleDelete(o.id)} className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-text-secondary hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <p className="text-sm font-bold text-heading">{o.title}</p>
              <p className="text-xs text-text-secondary mt-1">{o.description}</p>
              <div className="flex items-center gap-2 mt-3 text-xs text-text-tertiary">
                <Gift className="w-3 h-3" /> {o.start_date} → {o.end_date}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-heading">{editing ? 'Edit Offer' : 'New Offer'}</h3>
                <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center"><X className="w-4 h-4 text-text-secondary" /></button>
              </div>
              <div className="space-y-3">
                <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
                <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary" rows="2" />
                <div className="grid grid-cols-2 gap-3">
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary">
                    <option value="homepage">Homepage</option><option value="popup">Popup</option><option value="banner">Banner</option><option value="festival">Festival</option>
                  </select>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary">
                    <option value="active">Active</option><option value="inactive">Inactive</option>
                  </select>
                  <input type="date" placeholder="Start" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} className="px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
                  <input type="date" placeholder="End" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} className="px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
                </div>
                <input placeholder="Image URL" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
                <input placeholder="Link URL" value={form.link_url} onChange={(e) => setForm({ ...form, link_url: e.target.value })} className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
              </div>
              <button onClick={handleSave} className="w-full mt-4 py-3 gradient-bg text-white text-sm font-bold rounded-xl shadow-glow">{editing ? 'Update' : 'Create'} Offer</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
