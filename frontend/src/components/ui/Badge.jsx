const variants = {
  primary: 'bg-primary/10 text-primary border-primary/20',
  success: 'bg-success/10 text-success border-success/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
  danger: 'bg-danger/10 text-danger border-danger/20',
  accent: 'bg-accent/10 text-accent border-accent/20',
  neutral: 'bg-bg text-text-secondary border-border',
}

export default function Badge({ children, variant = 'primary', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
