import { motion } from 'framer-motion'

export default function GlassCard({ children, className = '', hover = true, glow = false, onClick, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className={`glass-card rounded-card ${glow ? 'shadow-glow' : ''} ${hover ? 'hover:shadow-floating cursor-default' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
