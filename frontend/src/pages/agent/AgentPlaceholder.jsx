import { motion } from 'framer-motion'
import { Construction, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AgentPlaceholder({ title, icon: Icon, description }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-6"
      >
        {Icon && <Icon className="w-10 h-10 text-primary" />}
      </motion.div>
      <h2 className="text-xl font-bold text-heading mb-2">{title}</h2>
      <p className="text-text-secondary max-w-md mb-6">{description || 'This module is being prepared with full functionality.'}</p>
      <Link to="/agent/dashboard" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:shadow-glow transition-all">
        Back to Dashboard <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}
