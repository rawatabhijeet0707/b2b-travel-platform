import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function EmptyState({ icon: Icon, title, description, actionLabel, actionTo }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        {Icon && <Icon className="w-10 h-10 text-primary" />}
      </div>
      <h3 className="text-xl font-semibold text-heading mb-2">{title}</h3>
      <p className="text-text-secondary max-w-md mb-6">{description}</p>
      {actionLabel && actionTo && (
        <Link to={actionTo} className="btn-primary">
          {actionLabel}
        </Link>
      )}
    </motion.div>
  )
}
