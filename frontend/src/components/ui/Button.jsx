import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

const variants = {
  primary: 'bg-primary text-white hover:bg-secondary hover:shadow-glow',
  secondary: 'bg-card text-primary border-2 border-primary hover:bg-primary hover:text-white',
  outline: 'bg-transparent text-heading border-2 border-border hover:border-primary hover:text-primary',
  danger: 'bg-danger text-white hover:brightness-110',
  ghost: 'bg-transparent text-text hover:bg-bg',
}

const sizes = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-sm gap-2',
  lg: 'px-8 py-4 text-base gap-2.5',
  icon: 'p-2.5',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center justify-center font-semibold rounded-btn transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </motion.button>
  )
}
