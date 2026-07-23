import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Briefcase, Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft,
  AlertCircle, Sparkles, User, Phone, CheckCircle2, Building2
} from 'lucide-react'
import { authService } from '../../services/authService.js'

export default function AgentLogin() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')

  return (
    <div className="min-h-screen gradient-mesh relative flex items-center justify-center p-4 overflow-hidden">
      {/* Animated blobs */}
      <motion.div
        animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[#F36812]/20 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#EA580C]/20 blur-3xl pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative w-full max-w-md"
      >
        <div className="glass-strong rounded-[32px] shadow-floating border border-white/40 p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
              className="w-16 h-16 rounded-3xl flex items-center justify-center shadow-glow mb-4"
              style={{ background: 'linear-gradient(135deg, #F36812, #d45e0e)' }}
            >
              <Briefcase className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-2xl font-extrabold text-heading font-heading">Agent Portal</h1>
            <p className="text-sm text-text-secondary mt-1">Travel Agent Partner Platform</p>
          </div>

          {/* Mode toggle */}
          <div className="flex gap-1 p-1 bg-white/30 rounded-xl mb-6 border border-white/40">
            {[
              { key: 'login', label: 'Login' },
              { key: 'register', label: 'Sign Up' },
            ].map((m) => (
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                  mode === m.key
                    ? 'bg-white text-[#F36812] shadow-[0_2px_8px_rgba(0,0,0,0.08)]'
                    : 'text-text-secondary hover:text-heading'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {mode === 'login' ? (
              <LoginForm key="login" onSuccess={() => navigate('/agent/dashboard')} onSwitch={() => setMode('register')} />
            ) : (
              <RegisterForm key="register" onSuccess={() => navigate('/agent/dashboard')} onSwitch={() => setMode('login')} />
            )}
          </AnimatePresence>
        </div>

        <p className="text-center text-xs text-text-tertiary mt-6">
          <Link to="/" className="hover:text-primary transition-colors">← Back to home</Link>
        </p>
      </motion.div>
    </div>
  )
}

function LoginForm({ onSuccess, onSwitch }) {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!identifier || !password) { setError('Enter email/mobile and password'); return }
    setError(''); setLoading(true)
    try {
      const res = await authService.loginWithPassword(identifier, password)
      if (res.token) {
        authService.setAuth(res.token, res.user)
        onSuccess()
      }
    } catch (err) { setError(err.message || 'Login failed') }
    finally { setLoading(false) }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -15 }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-text-secondary mb-1.5 block">Email or Mobile</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="agent@example.com"
              required
              className="w-full pl-11 pr-4 py-3 bg-white/50 border border-white/50 rounded-2xl text-sm text-heading placeholder:text-text-tertiary focus:outline-none focus:border-[#F36812] focus:ring-2 focus:ring-[#F36812]/20 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-text-secondary mb-1.5 block">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full pl-11 pr-11 py-3 bg-white/50 border border-white/50 rounded-2xl text-sm text-heading placeholder:text-text-tertiary focus:outline-none focus:border-[#F36812] focus:ring-2 focus:ring-[#F36812]/20 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-[#F36812] transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-2xl bg-red-50 border border-red-200 flex items-center gap-2 text-sm text-red-600">
            <AlertCircle className="w-4 h-4 shrink-0" /> {error}
          </div>
        )}

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full flex items-center justify-center gap-2 py-3.5 text-white font-bold rounded-2xl shadow-glow disabled:opacity-60 transition-all"
          style={{ background: 'linear-gradient(135deg, #F36812, #d45e0e)' }}
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            />
          ) : (
            <>Sign In <ArrowRight className="w-4 h-4" /></>
          )}
        </motion.button>
      </form>

      <div className="mt-5 p-3 rounded-2xl bg-white/30 border border-white/40">
        <p className="text-xs text-text-tertiary flex items-center gap-1.5 mb-1">
          <Sparkles className="w-3 h-3" /> Demo Credentials
        </p>
        <p className="text-xs text-text-secondary font-mono">
          agent@example.com · Agent@123
        </p>
      </div>

      <p className="mt-5 text-center text-sm text-text-secondary">
        New agent?{' '}
        <button onClick={onSwitch} className="text-[#F36812] font-bold hover:underline">
          Register here
        </button>
      </p>
    </motion.div>
  )
}

function RegisterForm({ onSuccess, onSwitch }) {
  const [form, setForm] = useState({ fullName: '', mobile: '', email: '', agencyName: '', password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const update = (field, value) => { setForm(prev => ({ ...prev, [field]: value })); setError('') }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.fullName || !form.mobile || !form.email || !form.password) { setError('All fields are required'); return }
    if (form.mobile.length < 10) { setError('Enter a valid 10-digit mobile number'); return }
    if (form.password.length < 8) { setError('Password must be at least 8 characters'); return }
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return }
    setLoading(true); setError('')
    try {
      const res = await authService.register({
        fullName: form.fullName, email: form.email, mobile: form.mobile, password: form.password,
        agencyName: form.agencyName,
      })
      if (res.token) {
        authService.setAuth(res.token, res.user)
        onSuccess()
      }
    } catch (err) { setError(err.message || 'Registration failed') }
    finally { setLoading(false) }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -15 }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-text-secondary mb-1.5 block">Full Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            <input type="text" required value={form.fullName} onChange={(e) => update('fullName', e.target.value)} placeholder="Enter your full name"
              className="w-full pl-11 pr-4 py-3 bg-white/50 border border-white/50 rounded-2xl text-sm text-heading placeholder:text-text-tertiary focus:outline-none focus:border-[#F36812] focus:ring-2 focus:ring-[#F36812]/20 transition-all" />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-text-secondary mb-1.5 block">Mobile Number</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            <input type="tel" required value={form.mobile} onChange={(e) => update('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="10-digit mobile number"
              className="w-full pl-11 pr-4 py-3 bg-white/50 border border-white/50 rounded-2xl text-sm text-heading placeholder:text-text-tertiary focus:outline-none focus:border-[#F36812] focus:ring-2 focus:ring-[#F36812]/20 transition-all" />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-text-secondary mb-1.5 block">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            <input type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="business@example.com"
              className="w-full pl-11 pr-4 py-3 bg-white/50 border border-white/50 rounded-2xl text-sm text-heading placeholder:text-text-tertiary focus:outline-none focus:border-[#F36812] focus:ring-2 focus:ring-[#F36812]/20 transition-all" />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-text-secondary mb-1.5 block">Agency Name (Optional)</label>
          <div className="relative">
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            <input type="text" value={form.agencyName} onChange={(e) => update('agencyName', e.target.value)} placeholder="Your travel agency name"
              className="w-full pl-11 pr-4 py-3 bg-white/50 border border-white/50 rounded-2xl text-sm text-heading placeholder:text-text-tertiary focus:outline-none focus:border-[#F36812] focus:ring-2 focus:ring-[#F36812]/20 transition-all" />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-text-secondary mb-1.5 block">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            <input type={showPassword ? 'text' : 'password'} required value={form.password} onChange={(e) => update('password', e.target.value)} placeholder="Min 8 characters"
              className="w-full pl-11 pr-11 py-3 bg-white/50 border border-white/50 rounded-2xl text-sm text-heading placeholder:text-text-tertiary focus:outline-none focus:border-[#F36812] focus:ring-2 focus:ring-[#F36812]/20 transition-all" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-[#F36812] transition-colors">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-text-secondary mb-1.5 block">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            <input type={showPassword ? 'text' : 'password'} required value={form.confirmPassword} onChange={(e) => update('confirmPassword', e.target.value)} placeholder="Re-enter password"
              className="w-full pl-11 pr-4 py-3 bg-white/50 border border-white/50 rounded-2xl text-sm text-heading placeholder:text-text-tertiary focus:outline-none focus:border-[#F36812] focus:ring-2 focus:ring-[#F36812]/20 transition-all" />
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-2xl bg-red-50 border border-red-200 flex items-center gap-2 text-sm text-red-600">
            <AlertCircle className="w-4 h-4 shrink-0" /> {error}
          </div>
        )}

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full flex items-center justify-center gap-2 py-3.5 text-white font-bold rounded-2xl shadow-glow disabled:opacity-60 transition-all"
          style={{ background: 'linear-gradient(135deg, #F36812, #d45e0e)' }}
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            />
          ) : (
            <>Create Agent Account <ArrowRight className="w-4 h-4" /></>
          )}
        </motion.button>
      </form>

      <p className="mt-5 text-center text-sm text-text-secondary">
        Already an agent?{' '}
        <button onClick={onSwitch} className="text-[#F36812] font-bold hover:underline">
          Sign in →
        </button>
      </p>
    </motion.div>
  )
}
