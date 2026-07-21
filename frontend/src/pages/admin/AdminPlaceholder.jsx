import { motion } from 'framer-motion'
import { Construction } from 'lucide-react'

export default function AdminPlaceholder({ title, description }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-heading">{title}</h1>
        <p className="text-sm text-text-secondary mt-0.5">{description || `Manage ${title.toLowerCase()} settings`}</p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-slate-200 p-12 shadow-sm flex flex-col items-center justify-center text-center"
      >
        <div className="w-16 h-16 rounded-3xl bg-amber-50 flex items-center justify-center mb-4">
          <Construction className="w-8 h-8 text-amber-500" />
        </div>
        <h3 className="text-lg font-bold text-heading mb-1">{title} Module</h3>
        <p className="text-sm text-text-secondary max-w-md">This module is part of the enterprise admin panel. Full CRUD functionality will be available here with data tables, filters, and management tools.</p>
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {['Create', 'View', 'Update', 'Delete', 'Export'].map(a => (
            <span key={a} className="px-3 py-1.5 text-xs font-medium text-text-secondary bg-slate-50 border border-slate-200 rounded-full">{a}</span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
