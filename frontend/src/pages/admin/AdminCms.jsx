import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileEdit, Edit2, Search, Eye, Save, Layout, Image, Type, Link } from 'lucide-react'

const dummyCms = [
  { id: 1, page: 'Home', section: 'Hero', key: 'title', content: 'Empowering Travel Businesses Worldwide', type: 'text', status: 'published', updated: '2024-07-19' },
  { id: 2, page: 'Home', section: 'Hero', key: 'subtitle', content: 'Complete B2B Travel Distribution Platform for Agencies, Agents & Distributors', type: 'text', status: 'published', updated: '2024-07-19' },
  { id: 3, page: 'Home', section: 'Hero', key: 'cta_button', content: 'Get Started Free', type: 'text', status: 'published', updated: '2024-07-19' },
  { id: 4, page: 'Home', section: 'Hero', key: 'background_image', content: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80', type: 'image', status: 'published', updated: '2024-07-15' },
  { id: 5, page: 'Home', section: 'Services', key: 'services_list', content: 'Flights, Hotels, Visa, Insurance, Holiday Packages, Forex', type: 'text', status: 'published', updated: '2024-07-18' },
  { id: 6, page: 'Home', section: 'About', key: 'about_title', content: 'Why Choose TravelHub?', type: 'text', status: 'published', updated: '2024-07-10' },
  { id: 7, page: 'Home', section: 'About', key: 'about_content', content: 'We provide the most comprehensive B2B travel distribution platform with 500+ airline integrations, 2M+ hotels, and 24/7 support.', type: 'text', status: 'published', updated: '2024-07-10' },
  { id: 8, page: 'Home', section: 'Features', key: 'features_list', content: 'Real-time booking, Multi-currency wallet, Commission tracking, White-label solution, API access, Mobile app', type: 'text', status: 'published', updated: '2024-07-12' },
  { id: 9, page: 'Home', section: 'Footer', key: 'footer_links', content: 'About, Services, Pricing, Contact, Privacy, Terms', type: 'link', status: 'published', updated: '2024-07-01' },
  { id: 10, page: 'Home', section: 'Footer', key: 'social_links', content: 'Facebook, Twitter, Instagram, LinkedIn, YouTube', type: 'link', status: 'published', updated: '2024-07-01' },
  { id: 11, page: 'About', section: 'Main', key: 'story', content: 'Founded in 2020, TravelHub has grown to serve 10,000+ travel agencies across India.', type: 'text', status: 'published', updated: '2024-06-28' },
  { id: 12, page: 'Contact', section: 'Main', key: 'address', content: 'Cyber City, Gurugram, Haryana 122002', type: 'text', status: 'published', updated: '2024-06-15' },
]

const typeIcons = { text: Type, image: Image, link: Link, html: Layout }
const pageColors = { Home: 'text-blue-600 bg-blue-50 border-blue-200', About: 'text-purple-600 bg-purple-50 border-purple-200', Contact: 'text-green-600 bg-green-50 border-green-200' }

export default function AdminCms() {
  const [search, setSearch] = useState('')
  const [pageFilter, setPageFilter] = useState('')
  const [editing, setEditing] = useState(null)
  const [editValue, setEditValue] = useState('')

  const filtered = dummyCms.filter(c => {
    if (search && !c.section.toLowerCase().includes(search.toLowerCase()) && !c.key.toLowerCase().includes(search.toLowerCase()) && !c.content.toLowerCase().includes(search.toLowerCase())) return false
    if (pageFilter && c.page !== pageFilter) return false
    return true
  })

  const pages = [...new Set(dummyCms.map(c => c.page))]

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-extrabold text-heading">CMS Management</h1><p className="text-sm text-text-secondary mt-0.5">Edit all website content dynamically</p></div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Pages', value: pages.length, color: 'from-blue-500 to-blue-600' },
          { label: 'Content Blocks', value: dummyCms.length, color: 'from-purple-500 to-purple-600' },
          { label: 'Published', value: dummyCms.filter(c => c.status === 'published').length, color: 'from-green-500 to-green-600' },
          { label: 'Draft', value: dummyCms.filter(c => c.status === 'draft').length, color: 'from-amber-500 to-orange-500' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-2`}><FileEdit className="w-4.5 h-4.5 text-white" /></div>
            <p className="text-xs text-text-tertiary font-medium">{s.label}</p><p className="text-lg font-extrabold text-heading">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" /><input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search content..." className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary" /></div>
        <select value={pageFilter} onChange={(e) => setPageFilter(e.target.value)} className="px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary"><option value="">All Pages</option>{pages.map(p => <option key={p}>{p}</option>)}</select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((c, i) => {
          const TypeIcon = typeIcons[c.type] || Type
          return (
            <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2"><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${pageColors[c.page] || ''}`}>{c.page}</span><span className="text-[10px] font-medium text-text-tertiary">{c.section}</span></div>
                <div className="flex gap-1"><button onClick={() => { setEditing(c.id); setEditValue(c.content) }} className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-text-secondary hover:text-primary"><Edit2 className="w-3.5 h-3.5" /></button><button className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-text-secondary hover:text-primary"><Eye className="w-3.5 h-3.5" /></button></div>
              </div>
              <div className="flex items-center gap-1.5 mb-1.5"><TypeIcon className="w-3 h-3 text-text-tertiary" /><p className="text-xs font-mono font-semibold text-text-secondary">{c.key}</p></div>
              {editing === c.id ? (
                <div className="space-y-2"><textarea value={editValue} onChange={(e) => setEditValue(e.target.value)} rows="3" className="w-full px-3 py-2 text-sm bg-slate-50 border border-primary/30 rounded-xl focus:outline-none focus:border-primary" /><div className="flex gap-2"><button onClick={() => setEditing(null)} className="flex items-center gap-1 px-3 py-1.5 gradient-bg text-white text-xs font-bold rounded-lg"><Save className="w-3 h-3" />Save</button><button onClick={() => setEditing(null)} className="px-3 py-1.5 text-xs font-bold text-text-secondary bg-slate-100 rounded-lg">Cancel</button></div></div>
              ) : (
                <>
                  <p className="text-sm text-heading line-clamp-2">{c.content}</p>
                  {c.type === 'image' && <img src={c.content} alt={c.key} className="mt-2 w-full h-20 object-cover rounded-lg" />}
                  <p className="text-[10px] text-text-tertiary mt-2">Updated: {c.updated}</p>
                </>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
