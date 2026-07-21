import { useState } from 'react'
import { motion } from 'framer-motion'
import { Package, Plus, Search, Edit2, Trash2, Star, MapPin, Clock, Check } from 'lucide-react'

const dummyPackages = [
  { id: 1, title: 'Maldives Paradise 4N/5D', destination: 'Maldives', duration: '4N/5D', price: 79999, discount: 15, rating: 4.9, reviews: 342, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80', highlights: ['Overwater Villa', 'All Meals Included', 'Sunset Cruise', 'Snorkeling', 'Spa Session'], bookings: 234, status: 'active', featured: true },
  { id: 2, title: 'Dubai Extravaganza 3N/4D', destination: 'Dubai', duration: '3N/4D', price: 49999, discount: 20, rating: 4.7, reviews: 567, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80', highlights: ['Burj Khalifa', 'Desert Safari', 'Dhow Cruise', 'City Tour', 'Airport Transfer'], bookings: 412, status: 'active', featured: true },
  { id: 3, title: 'Goa Beach Party 2N/3D', destination: 'Goa', duration: '2N/3D', price: 12999, discount: 10, rating: 4.4, reviews: 891, image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7d2?w=600&q=80', highlights: ['Befront Resort', 'Beach Party', 'Water Sports', 'Casino Visit', 'Breakfast'], bookings: 678, status: 'active', featured: false },
  { id: 4, title: 'Singapore Highlights 4N/5D', destination: 'Singapore', duration: '4N/5D', price: 64999, discount: 12, rating: 4.6, reviews: 423, image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=600&q=80', highlights: ['Universal Studios', 'Gardens by the Bay', 'Night Safari', 'Sentosa Island', 'City Tour'], bookings: 189, status: 'active', featured: true },
  { id: 5, title: 'Thailand Explorer 5N/6D', destination: 'Thailand', duration: '5N/6D', price: 39999, discount: 25, rating: 4.5, reviews: 654, image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=600&q=80', highlights: ['Bangkok Tour', 'Pattaya Beach', 'Coral Island', 'Nong Nooch Garden', 'All Meals'], bookings: 534, status: 'active', featured: false },
  { id: 6, title: 'Kashmir Heaven 3N/4D', destination: 'Kashmir', duration: '3N/4D', price: 24999, discount: 8, rating: 4.8, reviews: 234, image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600&q=80', highlights: ['Shikara Ride', 'Gulmarg Gondola', 'Pahalgam Visit', 'Houseboat Stay', 'All Meals'], bookings: 345, status: 'active', featured: true },
  { id: 7, title: 'Europe Grand Tour 7N/8D', destination: 'Europe', duration: '7N/8D', price: 159999, discount: 10, rating: 4.9, reviews: 156, image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80', highlights: ['Paris', 'Switzerland', 'Italy', 'Amsterdam', 'Schengen Visa Support'], bookings: 89, status: 'active', featured: true },
  { id: 8, title: 'Andaman Islands 4N/5D', destination: 'Andaman', duration: '4N/5D', price: 34999, discount: 15, rating: 4.6, reviews: 345, image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80', highlights: ['Scuba Diving', 'Radhanagar Beach', 'Cellular Jail', 'Island Hopping', 'Water Sports'], bookings: 267, status: 'inactive', featured: false },
]

export default function AdminPackages() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filtered = dummyPackages.filter(p => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.destination.toLowerCase().includes(search.toLowerCase())) return false
    if (statusFilter && p.status !== statusFilter) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-extrabold text-heading">Packages Management</h1><p className="text-sm text-text-secondary mt-0.5">Create and manage holiday packages</p></div>
        <button className="flex items-center gap-2 px-4 py-2.5 gradient-bg text-white text-xs font-bold rounded-xl shadow-glow"><Plus className="w-4 h-4" /> Add Package</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Packages', value: dummyPackages.length, color: 'from-pink-500 to-rose-500' },
          { label: 'Total Bookings', value: dummyPackages.reduce((s, p) => s + p.bookings, 0).toLocaleString(), color: 'from-green-500 to-green-600' },
          { label: 'Featured', value: dummyPackages.filter(p => p.featured).length, color: 'from-amber-500 to-orange-500' },
          { label: 'Avg Discount', value: `${Math.round(dummyPackages.reduce((s, p) => s + p.discount, 0) / dummyPackages.length)}%`, color: 'from-purple-500 to-purple-600' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-2`}><Package className="w-4.5 h-4.5 text-white" /></div>
            <p className="text-xs text-text-tertiary font-medium">{s.label}</p><p className="text-lg font-extrabold text-heading">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" /><input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search package or destination..." className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" /></div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary"><option value="">All Status</option><option value="active">Active</option><option value="inactive">Inactive</option></select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }} whileHover={{ y: -3 }} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div className="relative h-36 overflow-hidden">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 flex gap-1.5">
                {p.discount > 0 && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white bg-red-500">{p.discount}% OFF</span>}
                {p.featured && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-amber-600 bg-amber-50 border border-amber-200 flex items-center gap-0.5"><Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />Featured</span>}
              </div>
              <div className="absolute top-2 right-2 flex gap-1">
                <button className="w-7 h-7 rounded-lg bg-white/80 backdrop-blur flex items-center justify-center text-text-secondary hover:text-primary"><Edit2 className="w-3.5 h-3.5" /></button>
                <button className="w-7 h-7 rounded-lg bg-white/80 backdrop-blur flex items-center justify-center text-text-secondary hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <div className="p-3.5">
              <p className="text-sm font-bold text-heading truncate">{p.title}</p>
              <p className="text-xs text-text-tertiary flex items-center gap-1 mb-1"><MapPin className="w-3 h-3" />{p.destination} · <Clock className="w-3 h-3" />{p.duration}</p>
              <div className="flex items-center gap-1 mb-2"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /><span className="text-xs font-bold text-heading">{p.rating}</span><span className="text-[10px] text-text-tertiary">({p.reviews} reviews)</span></div>
              <div className="flex flex-wrap gap-1 mb-2.5">{p.highlights.slice(0, 3).map(h => <span key={h} className="text-[10px] font-medium px-1.5 py-0.5 rounded-full text-text-secondary bg-slate-50 border border-slate-200 flex items-center gap-0.5"><Check className="w-2.5 h-2.5" />{h}</span>)}</div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div><p className="text-[10px] text-text-tertiary">Price</p><div className="flex items-center gap-1"><span className="text-sm font-extrabold text-heading">{"\u20B9"}{Math.round(p.price * (1 - p.discount / 100)).toLocaleString('en-IN')}</span>{p.discount > 0 && <span className="text-[10px] text-text-tertiary line-through">{"\u20B9"}{p.price.toLocaleString('en-IN')}</span>}</div></div>
                <div className="text-right"><p className="text-[10px] text-text-tertiary">Bookings</p><p className="text-xs font-bold text-heading">{p.bookings}</p></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
