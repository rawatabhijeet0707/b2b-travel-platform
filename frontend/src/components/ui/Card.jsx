import { motion } from 'framer-motion'

export default function Card({ children, className = '', hover = true, glass = false, ...props }) {
  const base = glass ? 'glass' : 'bg-card border border-border/60'
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`${base} rounded-card shadow-card transition-shadow duration-300 ${hover ? 'hover:shadow-floating' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
