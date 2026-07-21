import { motion } from 'framer-motion'

const colorMap = {
  primary: { bg: 'bg-primary/10', text: 'text-primary', glow: 'shadow-glow' },
  success: { bg: 'bg-emerald-50', text: 'text-emerald-600', glow: 'shadow-glow-success' },
  warning: { bg: 'bg-amber-50', text: 'text-amber-600', glow: '' },
  danger:  { bg: 'bg-red-50', text: 'text-red-600', glow: '' },
  accent:  { bg: 'bg-cyan-50', text: 'text-cyan-600', glow: 'shadow-glow-accent' },
}

export default function StatCard({ icon: Icon, label, value, change, trend = 'up', color = 'primary', delay = 0, prefix = '', suffix = '' }) {
  const c = colorMap[color] || colorMap.primary
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="relative bg-card rounded-card border border-border/60 p-5 shadow-card hover:shadow-floating transition-all duration-300 overflow-hidden group"
    >
      <div className={`absolute top-0 right-0 w-24 h-24 ${c.bg} rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity`} />
      <div className="relative flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-2xl ${c.bg} flex items-center justify-center`}>
          <Icon className={`w-5.5 h-5.5 ${c.text}`} />
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-xs font-bold ${trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
            {trend === 'up' ? '→' : '→'} {change}
          </div>
        )}
      </div>
      <p className="text-sm text-text-secondary font-medium mb-1">{label}</p>
      <p className="text-2xl font-extrabold text-heading tracking-tight">
        {prefix}{value}{suffix}
      </p>
    </motion.div>
  )
}
