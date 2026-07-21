import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-primary-50 text-primary border-primary/20',
  success: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  warning: 'bg-amber-50 text-amber-600 border-amber-200',
  danger:  'bg-red-50 text-red-600 border-red-200',
  neutral: 'bg-slate-100 text-slate-600 border-slate-200',
  accent:  'bg-cyan-50 text-cyan-600 border-cyan-200',
}

export default function PremiumBadge({ children, variant = 'primary', icon: Icon, className = '', ...props }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
    </motion.span>
  )
}
