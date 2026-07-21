import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Plus, Search, Edit2, Trash2, Star, Quote } from 'lucide-react'

const dummyTestimonials = [
  { id: 1, name: 'Rahul Sharma', agency: 'SkyHigh Travels', avatar: 'RS', rating: 5, text: 'TravelHub has transformed our business. The platform is incredibly easy to use and the support team is always available. Our bookings have increased by 40% since we started using it.', status: 'published', date: '2024-07-19' },
  { id: 2, name: 'Priya Patel', agency: 'Wanderlust Tours', avatar: 'PP', rating: 5, text: 'The best B2B travel platform I have used. The multi-currency wallet and commission tracking features are game-changers for our agency.', status: 'published', date: '2024-07-15' },
  { id: 3, name: 'Amit Kumar', agency: 'Globe Trotter', avatar: 'AK', rating: 4, text: 'Great platform with excellent flight and hotel inventory. The visa processing feature saves us so much time. Would recommend to any travel agency.', status: 'published', date: '2024-07-12' },
  { id: 4, name: 'Sneha Reddy', agency: 'Travel XP', avatar: 'SR', rating: 5, text: 'The AI chatbot feature is brilliant! It handles most of our customer queries automatically. The dashboard gives us complete visibility of our business.', status: 'published', date: '2024-07-10' },
  { id: 5, name: 'Vikram Singh', agency: 'Happy Holidays', avatar: 'VS', rating: 5, text: 'TravelHub commission rates are the best in the industry. The white-label solution helped us launch our own brand in just 2 days.', status: 'published', date: '2024-07-08' },
  { id: 6, name: 'Neha Gupta', agency: 'Fly High Travels', avatar: 'NG', rating: 4, text: 'Good platform with lots of features. The mobile app is very convenient for on-the-go bookings. Customer support is responsive.', status: 'pending', date: '2024-07-05' },
  { id: 7, name: 'Rajesh Kumar', agency: 'World Tours', avatar: 'RK', rating: 5, text: 'We have been using TravelHub for 2 years now. The platform keeps getting better with each update. Highly recommended for B2B travel agencies.', status: 'published', date: '2024-07-01' },
  { id: 8, name: 'Anita Desai', agency: 'Premium Travels', avatar: 'AD', rating: 5, text: 'The holiday packages section is very well curated. Our clients love the variety and the prices are very competitive. Great platform!', status: 'pending', date: '2024-06-28' },
]

export default function AdminTestimonials() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filtered = dummyTestimonials.filter(t => {
    if (search && !t.name.toLowerCase().includes(search.toLowerCase()) && !t.agency.toLowerCase().includes(search.toLowerCase()) && !t.text.toLowerCase().includes(search.toLowerCase())) return false
    if (statusFilter && t.status !== statusFilter) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-extrabold text-heading">Testimonials</h1><p className="text-sm text-text-secondary mt-0.5">Manage customer reviews and testimonials</p></div>
        <button className="flex items-center gap-2 px-4 py-2.5 gradient-bg text-white text-xs font-bold rounded-xl shadow-glow"><Plus className="w-4 h-4" /> Add Testimonial</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total', value: dummyTestimonials.length, color: 'from-blue-500 to-blue-600' },
          { label: 'Published', value: dummyTestimonials.filter(t => t.status === 'published').length, color: 'from-green-500 to-green-600' },
          { label: 'Pending', value: dummyTestimonials.filter(t => t.status === 'pending').length, color: 'from-amber-500 to-orange-500' },
          { label: 'Avg Rating', value: (dummyTestimonials.reduce((s, t) => s + t.rating, 0) / dummyTestimonials.length).toFixed(1), color: 'from-purple-500 to-purple-600' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-2`}><MessageSquare className="w-4.5 h-4.5 text-white" /></div>
            <p className="text-xs text-text-tertiary font-medium">{s.label}</p><p className="text-lg font-extrabold text-heading">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" /><input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search testimonials..." className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" /></div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary"><option value="">All Status</option><option value="published">Published</option><option value="pending">Pending</option></select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((t, i) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} whileHover={{ y: -2 }} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
            <Quote className="absolute top-3 right-3 w-12 h-12 text-slate-100" />
            <div className="flex items-start justify-between mb-3 relative">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl gradient-bg flex items-center justify-center text-white text-sm font-bold">{t.avatar}</div>
                <div><p className="text-sm font-bold text-heading">{t.name}</p><p className="text-xs text-text-tertiary">{t.agency}</p></div>
              </div>
              <div className="flex gap-1"><button className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-text-secondary hover:text-primary"><Edit2 className="w-3.5 h-3.5" /></button><button className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-text-secondary hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button></div>
            </div>
            <div className="flex items-center gap-0.5 mb-2">{Array.from({ length: 5 }).map((_, idx) => <Star key={idx} className={`w-3.5 h-3.5 ${idx < t.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />)}</div>
            <p className="text-sm text-text-secondary leading-relaxed relative">"{t.text}"</p>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
              <p className="text-[10px] text-text-tertiary">{t.date}</p>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${t.status === 'published' ? 'text-green-600 bg-green-50 border border-green-200' : 'text-amber-600 bg-amber-50 border border-amber-200'}`}>{t.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
