import { forwardRef, useState } from 'react'
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react'

const Input = forwardRef(({ label, icon: Icon, error, success, type = 'text', className = '', ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-heading mb-1.5">{label}</label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary pointer-events-none" />
        )}
        <input
          ref={ref}
          type={inputType}
          className={`w-full ${Icon ? 'pl-11' : 'pl-4'} ${isPassword ? 'pr-11' : 'pr-4'} py-3 bg-card border rounded-input text-heading placeholder:text-text-secondary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 ${
            error ? 'border-danger focus:border-danger focus:ring-danger/20' : success ? 'border-success focus:border-success focus:ring-success/20' : 'border-border focus:border-primary'
          } ${className}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-heading transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
        {error && !isPassword && (
          <AlertCircle className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-danger pointer-events-none" />
        )}
        {success && !isPassword && !error && (
          <CheckCircle2 className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-success pointer-events-none" />
        )}
      </div>
      {error && <p className="mt-1.5 text-sm text-danger flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{error}</p>}
    </div>
  )
})

Input.displayName = 'Input'
export default Input
