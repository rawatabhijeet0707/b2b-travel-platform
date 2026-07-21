import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Plus, Search, Edit2, Trash2, Eye, Calendar, Tag } from 'lucide-react'

const dummyBlogs = [
  { id: 1, title: 'Top 10 Destinations to Visit in 2024', author: 'TravelHub Team', category: 'Destinations', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80', excerpt: 'Discover the most breathtaking destinations around the world that should be on your bucket list this year.', date: '2024-07-18', views: 12453, status: 'published', tags: ['travel', 'destinations', '2024'] },
  { id: 2, title: 'How to Plan Your First International Trip', author: 'Priya Sharma', category: 'Travel Tips', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80', excerpt: 'A complete beginner guide to planning your first international vacation without any hassle.', date: '2024-07-15', views: 8932, status: 'published', tags: ['guide', 'beginner', 'planning'] },
  { id: 3, title: 'Best Time to Visit Dubai: A Complete Guide', author: 'Rahul Verma', category: 'Destinations', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80', excerpt: 'Everything you need to know about the best seasons, weather, and events in Dubai.', date: '2024-07-12', views: 15678, status: 'published', tags: ['dubai', 'guide', 'weather'] },
  { id: 4, title: 'Understanding Visa Requirements for Schengen Countries', author: 'Legal Team', category: 'Visa Guide', image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=600&q=80', excerpt: 'Complete breakdown of Schengen visa requirements, documents needed, and application process.', date: '2024-07-10', views: 9821, status: 'published', tags: ['visa', 'schengen', 'europe'] },
  { id: 5, title: 'Why Travel Insurance is Essential', author: 'Sneha Reddy', category: 'Insurance', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', excerpt: 'Real stories and reasons why you should never travel without proper insurance coverage.', date: '2024-07-08', views: 6234, status: 'published', tags: ['insurance', 'safety', 'tips'] },
  { id: 6, title: 'Maldives on a Budget: Is It Possible?', author: 'TravelHub Team', category: 'Budget Travel', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80', excerpt: 'Tips and tricks to experience the beauty of Maldives without breaking the bank.', date: '2024-07-05', views: 11245, status: 'published', tags: ['maldives', 'budget', 'tips'] },
  { id: 7, title: 'B2B Travel Industry Trends 2024', author: 'Industry Report', category: 'Industry', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80', excerpt: 'Analysis of the latest trends shaping the B2B travel distribution industry.', date: '2024-07-03', views: 4567, status: 'draft', tags: ['industry', 'trends', 'b2b'] },
  { id: 8, title: 'How to Choose the Right Holiday Package', author: 'Vikram Singh', category: 'Travel Tips', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80', excerpt: 'Factors to consider when selecting a holiday package for your clients.', date: '2024-06-28', views: 7890, status: 'published', tags: ['packages', 'guide', 'tips'] },
]

const categoryColors = { Destinations: 'text-blue-600 bg-blue-50 border-blue-200', 'Travel Tips': 'text-green-600 bg-green-50 border-green-200', 'Visa Guide': 'text-purple-600 bg-purple-50 border-purple-200', Insurance: 'text-orange-600 bg-orange-50 border-orange-200', 'Budget Travel': 'text-amber-600 bg-amber-50 border-amber-200', Industry: 'text-slate-600 bg-slate-100 border-slate-200' }

export default function AdminBlogs() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filtered = dummyBlogs.filter(b => {
    if (search && !b.title.toLowerCase().includes(search.toLowerCase()) && !b.author.toLowerCase().includes(search.toLowerCase())) return false
    if (statusFilter && b.status !== statusFilter) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-extrabold text-heading">Blogs</h1><p className="text-sm text-text-secondary mt-0.5">Manage blog posts and articles</p></div>
        <button className="flex items-center gap-2 px-4 py-2.5 gradient-bg text-white text-xs font-bold rounded-xl shadow-glow"><Plus className="w-4 h-4" /> Write Blog</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Blogs', value: dummyBlogs.length, color: 'from-blue-500 to-blue-600' },
          { label: 'Published', value: dummyBlogs.filter(b => b.status === 'published').length, color: 'from-green-500 to-green-600' },
          { label: 'Total Views', value: dummyBlogs.reduce((s, b) => s + b.views, 0).toLocaleString(), color: 'from-purple-500 to-purple-600' },
          { label: 'Drafts', value: dummyBlogs.filter(b => b.status === 'draft').length, color: 'from-amber-500 to-orange-500' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-2`}><FileText className="w-4.5 h-4.5 text-white" /></div>
            <p className="text-xs text-text-tertiary font-medium">{s.label}</p><p className="text-lg font-extrabold text-heading">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" /><input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search blogs..." className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" /></div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary"><option value="">All Status</option><option value="published">Published</option><option value="draft">Draft</option></select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((b, i) => (
          <motion.div key={b.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }} whileHover={{ y: -3 }} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div className="relative h-32 overflow-hidden"><img src={b.image} alt={b.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 flex gap-1.5"><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${categoryColors[b.category] || ''}`}>{b.category}</span><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${b.status === 'published' ? 'text-green-600 bg-green-50 border-green-200' : 'text-amber-600 bg-amber-50 border-amber-200'}`}>{b.status}</span></div>
              <div className="absolute top-2 right-2 flex gap-1"><button className="w-7 h-7 rounded-lg bg-white/80 backdrop-blur flex items-center justify-center text-text-secondary hover:text-primary"><Edit2 className="w-3.5 h-3.5" /></button><button className="w-7 h-7 rounded-lg bg-white/80 backdrop-blur flex items-center justify-center text-text-secondary hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button></div>
            </div>
            <div className="p-4">
              <p className="text-sm font-bold text-heading line-clamp-2 mb-1">{b.title}</p>
              <p className="text-xs text-text-tertiary line-clamp-2 mb-2">{b.excerpt}</p>
              <div className="flex items-center gap-2 text-[10px] text-text-tertiary mb-2"><Calendar className="w-2.5 h-2.5" />{b.date} · <Eye className="w-2.5 h-2.5" />{b.views.toLocaleString()} views</div>
              <div className="flex flex-wrap gap-1">{b.tags.map(t => <span key={t} className="text-[10px] font-medium px-1.5 py-0.5 rounded-full text-text-secondary bg-slate-50 border border-slate-200 flex items-center gap-0.5"><Tag className="w-2 h-2" />{t}</span>)}</div>
              <p className="text-[10px] text-text-tertiary mt-2">By {b.author}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
