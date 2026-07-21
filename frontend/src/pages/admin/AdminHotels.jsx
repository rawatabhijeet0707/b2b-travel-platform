import { useState } from 'react'
import { motion } from 'framer-motion'
import { Hotel, Plus, Search, Edit2, Trash2, Star, MapPin, Wifi, Coffee, Waves, Car, Dumbbell } from 'lucide-react'

const dummyHotels = [
  { id: 1, name: 'Burj Al Arab', location: 'Dubai, UAE', category: 'Luxury', rating: 5.0, reviews: 2841, price: 85000, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80', amenities: ['wifi', 'pool', 'spa', 'gym', 'parking'], rooms: 202, booked: 168, status: 'active', featured: true },
  { id: 2, name: 'Taj Exotica', location: 'Goa, India', category: 'Premium', rating: 4.8, reviews: 1956, price: 18500, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80', amenities: ['wifi', 'pool', 'gym', 'parking'], rooms: 140, booked: 112, status: 'active', featured: true },
  { id: 3, name: 'Marina Bay Sands', location: 'Singapore', category: 'Luxury', rating: 4.9, reviews: 3421, price: 65000, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80', amenities: ['wifi', 'pool', 'spa', 'gym', 'parking', 'breakfast'], rooms: 2560, booked: 2104, status: 'active', featured: true },
  { id: 4, name: 'The Leela Palace', location: 'Udaipur, India', category: 'Heritage', rating: 4.7, reviews: 1234, price: 32000, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80', amenities: ['wifi', 'pool', 'spa', 'parking'], rooms: 80, booked: 54, status: 'active', featured: false },
  { id: 5, name: 'Conrad Maldives', location: 'Maldives', category: 'Resort', rating: 4.9, reviews: 2087, price: 95000, image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=80', amenities: ['wifi', 'pool', 'spa', 'gym', 'parking', 'breakfast'], rooms: 103, booked: 89, status: 'active', featured: true },
  { id: 6, name: 'Bangkok Marriott', location: 'Bangkok, Thailand', category: 'Business', rating: 4.5, reviews: 1672, price: 12500, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80', amenities: ['wifi', 'gym', 'parking', 'breakfast'], rooms: 320, booked: 256, status: 'active', featured: false },
  { id: 7, name: 'Rambagh Palace', location: 'Jaipur, India', category: 'Heritage', rating: 4.8, reviews: 987, price: 45000, image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=600&q=80', amenities: ['wifi', 'pool', 'spa', 'gym', 'parking'], rooms: 78, booked: 62, status: 'active', featured: true },
  { id: 8, name: 'Four Seasons', location: 'Mumbai, India', category: 'Luxury', rating: 4.6, reviews: 1456, price: 38000, image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80', amenities: ['wifi', 'pool', 'spa', 'gym', 'parking', 'breakfast'], rooms: 202, booked: 178, status: 'inactive', featured: false },
]

const amenityIcons = { wifi: Wifi, pool: Waves, spa: Star, gym: Dumbbell, parking: Car, breakfast: Coffee }
const categoryColors = { Luxury: 'text-purple-600 bg-purple-50 border-purple-200', Premium: 'text-blue-600 bg-blue-50 border-blue-200', Heritage: 'text-amber-600 bg-amber-50 border-amber-200', Resort: 'text-green-600 bg-green-50 border-green-200', Business: 'text-slate-600 bg-slate-100 border-slate-200' }

export default function AdminHotels() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  const filtered = dummyHotels.filter(h => {
    if (search && !h.name.toLowerCase().includes(search.toLowerCase()) && !h.location.toLowerCase().includes(search.toLowerCase())) return false
    if (categoryFilter && h.category !== categoryFilter) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-heading">Hotels Management</h1>
          <p className="text-sm text-text-secondary mt-0.5">Manage hotel listings, pricing, and availability</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 gradient-bg text-white text-xs font-bold rounded-xl shadow-glow"><Plus className="w-4 h-4" /> Add Hotel</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Hotels', value: dummyHotels.length, color: 'from-purple-500 to-purple-600' },
          { label: 'Featured', value: dummyHotels.filter(h => h.featured).length, color: 'from-amber-500 to-orange-500' },
          { label: 'Active', value: dummyHotels.filter(h => h.status === 'active').length, color: 'from-green-500 to-green-600' },
          { label: 'Avg Rating', value: (dummyHotels.reduce((s, h) => s + h.rating, 0) / dummyHotels.length).toFixed(1), color: 'from-blue-500 to-blue-600' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-2`}><Hotel className="w-4.5 h-4.5 text-white" /></div>
            <p className="text-xs text-text-tertiary font-medium">{s.label}</p>
            <p className="text-lg font-extrabold text-heading">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search hotel name or location..." className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" />
        </div>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary">
          <option value="">All Categories</option><option>Luxury</option><option>Premium</option><option>Heritage</option><option>Resort</option><option>Business</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((h, i) => (
          <motion.div key={h.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }} whileHover={{ y: -3 }} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div className="relative h-36 overflow-hidden">
              <img src={h.image} alt={h.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 flex gap-1.5">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${categoryColors[h.category] || ''}`}>{h.category}</span>
                {h.featured && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-amber-600 bg-amber-50 border border-amber-200 flex items-center gap-0.5"><Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" /> Featured</span>}
              </div>
              <div className="absolute top-2 right-2 flex gap-1">
                <button className="w-7 h-7 rounded-lg bg-white/80 backdrop-blur flex items-center justify-center text-text-secondary hover:text-primary"><Edit2 className="w-3.5 h-3.5" /></button>
                <button className="w-7 h-7 rounded-lg bg-white/80 backdrop-blur flex items-center justify-center text-text-secondary hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <div className="p-3.5">
              <div className="flex items-start justify-between mb-1">
                <p className="text-sm font-bold text-heading truncate">{h.name}</p>
                <span className="flex items-center gap-0.5 text-xs font-bold text-amber-500 shrink-0"><Star className="w-3 h-3 fill-amber-400 text-amber-400" />{h.rating}</span>
              </div>
              <p className="text-xs text-text-tertiary flex items-center gap-1 mb-2"><MapPin className="w-3 h-3" />{h.location}</p>
              <div className="flex gap-1.5 mb-2.5">
                {h.amenities.slice(0, 4).map(a => { const Icon = amenityIcons[a] || Star; return <Icon key={a} className="w-3.5 h-3.5 text-text-tertiary" /> })}
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div>
                  <p className="text-xs text-text-tertiary">Price/Night</p>
                  <p className="text-base font-extrabold text-heading">{"\u20B9"}{h.price.toLocaleString('en-IN')}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-text-tertiary">Occupancy</p>
                  <p className="text-xs font-bold text-heading">{h.booked}/{h.rooms}</p>
                </div>
              </div>
              <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full gradient-bg rounded-full" style={{ width: `${(h.booked / h.rooms) * 100}%` }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
