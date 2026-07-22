import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, ArrowLeft, User, Mail, Lock, Phone,
  AlertCircle, CheckCircle2, Eye, EyeOff, Building2, Star, TrendingUp, Gift, ShieldCheck
} from 'lucide-react'
import { authService } from '../../services/authService.js'
import TravelHubLogo from '../../components/ui/TravelHubLogo.jsx'

const steps = ['Personal Info', 'Account Security']

const perks = [
  { icon: TrendingUp, title: 'Instant Account Activation', desc: 'Start booking immediately after registration', color: 'bg-blue-500/20 text-blue-200' },
  { icon: Gift, title: 'Welcome Bonus ₹500', desc: 'Credited on your first booking', color: 'bg-amber-500/20 text-amber-200' },
  { icon: ShieldCheck, title: 'Confidentiality Guaranteed', desc: 'Your & your customers\' data is always safe', color: 'bg-emerald-500/20 text-emerald-200' },
]

export default function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullName: '', mobile: '', email: '', password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const update = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  const handleNext = (e) => {
    e.preventDefault()
    if (!form.fullName || !form.mobile) { setError('Please fill all fields'); return }
    if (form.mobile.length < 10) { setError('Enter a valid 10-digit mobile number'); return }
    setError('')
    setCurrentStep(1)
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) { setError('All fields are required'); return }
    if (form.password.length < 8) { setError('Password must be at least 8 characters'); return }
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return }
    setLoading(true)
    setError('')
    try {
      const res = await authService.register({
        fullName: form.fullName,
        email: form.email,
        mobile: form.mobile,
        password: form.password,
      })
      if (res.token) {
        authService.setAuth(res.token, res.user)
        navigate('/app')
      }
    } catch (err) {
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left: Full-bleed image panel ── */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop"
          alt="Travel"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/90 via-[#1D4ED8]/80 to-[#1E40AF]/90" />
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[#2563EB]/15 blur-3xl animate-blob" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-[#06B6D4]/10 blur-3xl animate-blob" style={{ animationDelay: '6s' }} />

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 text-white w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <TravelHubLogo size="md" light />
          </Link>

          {/* Main content */}
          <div>
            {/* Social proof */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-flex items-center gap-3 px-4 py-2.5 bg-card/10 backdrop-blur-sm rounded-2xl border border-card/20 mb-8"
            >
              <Building2 className="w-5 h-5 text-blue-300" />
              <div>
                <p className="text-sm font-bold text-white">60,000+ Agencies</p>
                <p className="text-xs text-white/60">already using myPartner</p>
              </div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />)}
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl xl:text-5xl font-extrabold leading-tight text-balance"
            >
              Start your journey with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] to-[#A5F3FC]">
                myPartner
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-5 text-white/70 text-lg max-w-md"
            >
              Join 60,000+ travel agencies growing their business with exclusive B2B rates.
            </motion.p>

            <div className="mt-10 space-y-4">
              {perks.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${p.color}`}>
                    <p.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{p.title}</p>
                    <p className="text-xs text-white/60">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Destination images */}
            <div className="mt-10 flex gap-3">
              {[
                'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=120&h=80&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=120&h=80&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=120&h=80&auto=format&fit=crop',
              ].map((src, i) => (
                <img key={i} src={src} alt="" className="w-20 h-14 rounded-xl object-cover opacity-80 hover:opacity-100 transition-opacity border border-card/20" />
              ))}
              <div className="w-20 h-14 rounded-xl bg-card/10 border border-card/20 flex items-center justify-center text-white/70 text-xs font-bold text-center leading-tight px-2">
                +190<br/>destinations
              </div>
            </div>
          </div>

          <p className="text-white/40 text-xs">© 2026 MakeMyTrip Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>

      {/* ── Right: Register form ── */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[#F8FAFC] overflow-y-auto gradient-mesh">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[420px] py-8"
        >
          {/* Mobile logo */}
          <Link to="/" className="lg:hidden flex justify-center mb-8">
            <TravelHubLogo size="md" />
          </Link>

          <div className="glass-strong rounded-[28px] shadow-[0_20px_60px_rgba(37,99,235,0.12)] p-8 relative overflow-hidden">
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-1 gradient-bg" />

            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-heading font-heading">Create Account</h2>
              <p className="text-text-secondary mt-1 text-sm">Register your travel agency in seconds</p>
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-8">
              {steps.map((s, i) => (
                <div key={i} className="flex items-center gap-2 flex-1">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                    i < currentStep
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : i === currentStep
                      ? 'gradient-bg border-primary text-white'
                      : 'bg-white border-border text-text-tertiary'
                  }`}>
                    {i < currentStep ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${i === currentStep ? 'text-primary' : i < currentStep ? 'text-emerald-600' : 'text-text-tertiary'}`}>
                    {s}
                  </span>
                  {i < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 rounded-full transition-all ${i < currentStep ? 'bg-emerald-500' : 'bg-border'}`} />
                  )}
                </div>
              ))}
            </div>

            {currentStep === 0 ? (
              <form onSubmit={handleNext} className="space-y-4">
                {/* Full Name */}
                <RegField label="Full Name" icon={<User className="w-4 h-4 text-primary" />}>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => update('fullName', e.target.value)}
                    placeholder="Enter your full name"
                    className="flex-1 px-3 py-3.5 bg-transparent text-heading placeholder:text-text-tertiary focus:outline-none text-sm"
                  />
                </RegField>

                {/* Phone */}
                <div>
                  <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1.5">Phone Number</label>
                  <div className="flex items-center rounded-xl border border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 transition-all overflow-hidden bg-white/50">
                    <div className="flex items-center gap-2 pl-4 pr-3 py-3.5 border-r border-border shrink-0">
                      <Phone className="w-4 h-4 text-primary" />
                      <span className="text-[#374151] font-semibold text-sm">+91</span>
                    </div>
                    <input
                      type="tel"
                      required
                      value={form.mobile}
                      onChange={(e) => update('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="Enter mobile number"
                      className="flex-1 px-3 py-3.5 bg-transparent text-heading placeholder:text-text-tertiary focus:outline-none text-sm"
                    />
                  </div>
                </div>

                {error && <ErrorMsg msg={error} />}
                <SubmitBtn loading={false} label="Continue" />
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                {/* Email */}
                <RegField label="Email Address" icon={<Mail className="w-4 h-4 text-primary" />}>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="business@example.com"
                    className="flex-1 px-3 py-3.5 bg-transparent text-heading placeholder:text-text-tertiary focus:outline-none text-sm"
                  />
                </RegField>

                {/* Password */}
                <RegField label="Password" icon={<Lock className="w-4 h-4 text-primary" />}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={form.password}
                    onChange={(e) => update('password', e.target.value)}
                    placeholder="Min 8 characters"
                    className="flex-1 px-3 py-3.5 bg-transparent text-heading placeholder:text-text-tertiary focus:outline-none text-sm"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="pr-4 text-text-tertiary hover:text-primary transition-colors">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </RegField>

                {/* Confirm Password */}
                <RegField label="Confirm Password" icon={<Lock className="w-4 h-4 text-primary" />}>
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    required
                    value={form.confirmPassword}
                    onChange={(e) => update('confirmPassword', e.target.value)}
                    placeholder="Re-enter password"
                    className="flex-1 px-3 py-3.5 bg-transparent text-heading placeholder:text-text-tertiary focus:outline-none text-sm"
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="pr-4 text-text-tertiary hover:text-primary transition-colors">
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </RegField>

                {/* Password strength indicator */}
                {form.password && (
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-all ${
                          form.password.length >= (i + 1) * 3
                            ? form.password.length >= 12 ? 'bg-emerald-500' : form.password.length >= 8 ? 'bg-amber-500' : 'bg-red-500'
                            : 'bg-border'
                        }`} />
                      ))}
                    </div>
                    <p className="text-xs text-text-secondary">
                      {form.password.length < 8 ? '⚠️ Too short' : form.password.length < 12 ? '👍 Good' : '✅ Strong password'}
                    </p>
                  </div>
                )}

                {error && <ErrorMsg msg={error} />}
                <SubmitBtn loading={loading} label="Create Account" />

                <button type="button" onClick={() => { setCurrentStep(0); setError('') }} className="w-full flex items-center justify-center gap-1.5 text-sm text-text-secondary hover:text-primary transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back to previous step
                </button>
              </form>
            )}

            <p className="mt-6 text-center text-sm text-text-secondary">
              Already a partner?{' '}
              <Link to="/register" className="text-primary font-bold hover:underline">Sign in →</Link>
            </p>
          </div>

          <Link to="/" className="mt-6 flex items-center justify-center gap-1.5 text-sm text-text-secondary hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

// ── Reusable sub-components ──
function RegField({ label, icon, children }) {
  return (
    <div>
      <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1.5">{label}</label>
      <div className="flex items-center rounded-xl border border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 transition-all overflow-hidden bg-white/50">
        <div className="pl-4 pr-2">{icon}</div>
        {children}
      </div>
    </div>
  )
}

function ErrorMsg({ msg }) {
  return (
    <p className="text-sm text-danger flex items-center gap-1.5 bg-red-50 px-3 py-2 rounded-xl border border-red-200">
      <AlertCircle className="w-4 h-4 shrink-0" />{msg}
    </p>
  )
}

function SubmitBtn({ loading, label }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 py-4 gradient-bg disabled:opacity-60 text-white font-bold rounded-xl shadow-glow hover:shadow-floating transition-all active:scale-95 text-base"
    >
      {loading ? (
        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
      ) : (
        <>
          {label}
          <ArrowRight className="w-4 h-4" />
        </>
      )}
    </button>
  )
}
