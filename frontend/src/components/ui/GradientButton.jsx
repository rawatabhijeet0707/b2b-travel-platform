import { motion } from 'framer-motion'

export default function GradientButton({ children, className = '', onClick, type = 'button', loading = false, ...props }) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-btn font-semibold text-white transition-all duration-300 shadow-card hover:shadow-glow ${loading ? 'opacity-70 pointer-events-none' : ''} ${className}`}
      style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' }}
      {...props}
    >
      {loading && (
        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </motion.button>
  )
}
