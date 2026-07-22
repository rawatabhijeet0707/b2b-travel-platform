import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone, KeyRound, Lock, Mail, ArrowRight, ArrowLeft,
  ShieldCheck, Star, TrendingUp, AlertCircle, Gift, Users, Award
} from 'lucide-react'
import Button from '../../components/ui/Button.jsx'
import { authService } from '../../services/authService.js'
import TravelHubLogo from '../../components/ui/TravelHubLogo.jsx'

const slides = [
  'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200&auto=format&fit=crop',
]

const features = [
  { icon: TrendingUp, title: 'Best B2B Rates', desc: 'Up to 40% higher margins on every booking', color: 'bg-blue-500/20 text-blue-200' },
  { icon: ShieldCheck, title: 'Bank-grade Security', desc: 'Your data & customer info fully protected', color: 'bg-emerald-500/20 text-emerald-200' },
  { icon: Gift, title: 'Earn Promo Cash', desc: 'Rewards on every flight & hotel booking', color: 'bg-amber-500/20 text-amber-200' },
]

export default function LoginPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('password')
  const [step, setStep] = useState('input')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(['', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [devOtp, setDevOtp] = useState('')
  const [passwordIdentifier, setPasswordIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [bgIdx] = useState(0)

  const handleSendOtp = async (e) => {
    e.preventDefault()
    if (phone.length < 10) { setError('Enter a valid 10-digit mobile number'); return }
    setError('')
    setLoading(true)
    try {
      const res = await authService.sendOtp(phone, 'login')
      if (res.devOtp) setDevOtp(res.devOtp)
      setStep('verify')
    } catch (err) {
      setError(err.message || 'Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleOtpChange = (idx, val) => {
    if (val.length > 1) return
    const newOtp = [...otp]
    newOtp[idx] = val
    setOtp(newOtp)
    if (val && idx < 3) document.getElementById(`login-otp-${idx + 1}`)?.focus()
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    const otpStr = otp.join('')
    if (otpStr.length < 4) { setError('Enter the 4-digit OTP'); return }
    setError('')
    setLoading(true)
    try {
      const res = await authService.verifyOtp(phone, otpStr, 'login')
      if (res.token) {
        authService.setAuth(res.token, res.user)
        const role = res.user?.role
        if (role === 'admin') navigate('/admin/dashboard')
        else if (role === 'agent') navigate('/agent/dashboard')
        else navigate('/app')
      }
    } catch (err) {
      setError(err.message || 'OTP verification failed')
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordLogin = async (e) => {
    e.preventDefault()
    if (!passwordIdentifier || !password) { setError('Enter email/mobile and password'); return }
    setError('')
    setLoading(true)
    try {
      const res = await authService.loginWithPassword(passwordIdentifier, password)
      if (res.token) {
        authService.setAuth(res.token, res.user)
        const role = res.user?.role
        if (role === 'admin') navigate('/admin/dashboard')
        else if (role === 'agent') navigate('/agent/dashboard')
        else navigate('/app')
      }
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left: Full-bleed travel image panel ── */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden">
        {/* Background image */}
        <img
          src={slides[bgIdx]}
          alt="Travel"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E40AF]/90 via-[#1D4ED8]/80 to-[#0F172A]/85" />

        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#2563EB]/20 blur-3xl animate-blob" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#06B6D4]/10 blur-3xl animate-blob" style={{ animationDelay: '6s' }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-card/5 blur-3xl" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 text-white w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <TravelHubLogo size="md" light />
          </Link>

          {/* Main text */}
          <div>
            {/* Floating stats badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-flex items-center gap-3 px-4 py-2.5 bg-card/10 backdrop-blur-sm rounded-2xl border border-card/20 mb-8"
            >
              <div className="flex -space-x-2">
                {[
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&auto=format&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1494790108755-2616b1b4e3b6?w=40&h=40&auto=format&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&auto=format&fit=crop&crop=face',
                ].map((src, i) => (
                  <img key={i} src={src} alt="" className="w-8 h-8 rounded-full border-2 border-card object-cover" />
                ))}
              </div>
              <div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-xs text-white/70">60,000+ happy partners</p>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl xl:text-5xl font-extrabold leading-tight text-balance"
            >
              Welcome back to India's leading{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] to-[#A5F3FC]">
                B2B travel platform
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-5 text-white/70 text-lg max-w-md"
            >
              Access exclusive rates, manage bookings, and grow your travel business.
            </motion.p>

            <div className="mt-10 space-y-4">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${f.color}`}>
                    <f.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{f.title}</p>
                    <p className="text-xs text-white/60">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Image thumbnails row */}
            <div className="mt-10 flex gap-3">
              {[
                'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=120&h=80&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=120&h=80&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=120&h=80&auto=format&fit=crop',
              ].map((src, i) => (
                <img key={i} src={src} alt="destination" className="w-20 h-14 rounded-xl object-cover opacity-80 hover:opacity-100 transition-opacity border border-card/20" />
              ))}
              <div className="w-20 h-14 rounded-xl bg-card/10 border border-card/20 flex items-center justify-center text-white/70 text-xs font-bold">
                +190<br/>more
              </div>
            </div>
          </div>

          <p className="text-white/40 text-xs">© 2026 MakeMyTrip Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>

      {/* ── Right: Login form ── */}
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

          {/* Card */}
          <div className="glass-strong rounded-[28px] shadow-[0_20px_60px_rgba(37,99,235,0.12)] p-8 relative overflow-hidden">
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-1 gradient-bg" />

            <div className="mb-7">
              <h2 className="text-2xl font-extrabold text-heading font-heading">Partner Login</h2>
              <p className="text-text-secondary mt-1 text-sm">Sign in to your travel agency account</p>
            </div>

            {/* Mode toggle */}
            <div className="flex gap-1 p-1 bg-white/40 rounded-xl mb-6 border border-white/50">
              {[
                { key: 'password', label: '🔒 Password' },
                { key: 'otp', label: '📱 OTP Login' },
              ].map((m) => (
                <button
                  key={m.key}
                  onClick={() => { setMode(m.key); setStep('input'); setError('') }}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                    mode === m.key
                      ? 'bg-white text-primary shadow-soft'
                      : 'text-text-secondary hover:text-heading'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {mode === 'otp' ? (
                <motion.div
                  key="otp-mode"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  {step === 'input' ? (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                      <FormField label="Mobile Number">
                        <div className="flex items-center rounded-xl border border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 transition-all overflow-hidden bg-white/50">
                          <div className="flex items-center gap-2 pl-4 pr-3 py-3.5 border-r border-border">
                            <Phone className="w-4 h-4 text-primary" />
                            <span className="text-[#374151] font-semibold text-sm">+91</span>
                          </div>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                            placeholder="Enter mobile number"
                            className="flex-1 px-3 py-3.5 bg-transparent text-heading placeholder:text-text-tertiary focus:outline-none text-sm"
                          />
                        </div>
                      </FormField>
                      {error && <ErrorMsg msg={error} />}
                      <SubmitBtn loading={loading} label="Send OTP" />
                    </form>
                  ) : (
                    <form onSubmit={handleVerify} className="space-y-5">
                      <div className="text-center p-4 bg-primary/5 rounded-2xl border border-primary/10">
                        <div className="inline-flex w-12 h-12 rounded-xl bg-primary/10 items-center justify-center mb-3">
                          <KeyRound className="w-6 h-6 text-primary" />
                        </div>
                        <p className="text-sm text-text">OTP sent to <span className="font-bold text-heading">+91 {phone}</span></p>
                        {devOtp && (
                          <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-1.5 mt-2 inline-block font-semibold">
                            Dev OTP: {devOtp}
                          </p>
                        )}
                      </div>
                      <div className="flex justify-center gap-3">
                        {otp.map((digit, idx) => (
                          <input
                            key={idx}
                            id={`login-otp-${idx}`}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(idx, e.target.value.replace(/\D/g, ''))}
                            className="w-14 h-14 text-center text-2xl font-bold border-2 border-border rounded-2xl text-heading focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white/50"
                          />
                        ))}
                      </div>
                      {error && <ErrorMsg msg={error} />}
                      <SubmitBtn loading={loading} label="Verify & Login" />
                      <div className="flex items-center justify-between text-sm">
                        <button type="button" onClick={() => { setStep('input'); setError(''); setOtp(['','','','']) }} className="text-text-secondary hover:text-primary flex items-center gap-1 transition-colors">
                          <ArrowLeft className="w-4 h-4" /> Change number
                        </button>
                        <button type="button" onClick={handleSendOtp} className="text-primary font-semibold hover:underline">Resend OTP</button>
                      </div>
                    </form>
                  )}
                </motion.div>
              ) : (
                <motion.form
                  key="password-mode"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handlePasswordLogin}
                  className="space-y-4"
                >
                  <FormField label="Email or Mobile">
                    <InputWrap icon={<Mail className="w-4 h-4 text-primary" />}>
                      <input
                        type="text"
                        value={passwordIdentifier}
                        onChange={(e) => setPasswordIdentifier(e.target.value)}
                        placeholder="Enter email or mobile"
                        className="flex-1 px-3 py-3.5 bg-transparent text-heading placeholder:text-text-tertiary focus:outline-none text-sm"
                      />
                    </InputWrap>
                  </FormField>
                  <FormField label={
                    <div className="flex items-center justify-between w-full">
                      <span>Password</span>
                      <button type="button" className="text-xs text-primary font-semibold hover:underline">Forgot password?</button>
                    </div>
                  }>
                    <InputWrap icon={<Lock className="w-4 h-4 text-primary" />}>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="flex-1 px-3 py-3.5 bg-transparent text-heading placeholder:text-text-tertiary focus:outline-none text-sm"
                      />
                    </InputWrap>
                  </FormField>
                  {error && <ErrorMsg msg={error} />}
                  <SubmitBtn loading={loading} label="Sign In" />
                </motion.form>
              )}
            </AnimatePresence>

            <p className="mt-6 text-center text-sm text-text-secondary">
              New partner?{' '}
              <Link to="/register" className="text-primary font-bold hover:underline">
                Register your agency →
              </Link>
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

function FormField({ label, children }) {
  return (
    <div>
      <label className="flex text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1.5">
        {typeof label === 'string' ? label : <div className="flex items-center justify-between w-full">{label}</div>}
      </label>
      {children}
    </div>
  )
}

function InputWrap({ icon, children }) {
  return (
    <div className="flex items-center rounded-xl border border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 transition-all overflow-hidden bg-white/50">
      <div className="pl-4 pr-3">{icon}</div>
      {children}
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
        <svg className="animate-spin w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
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
