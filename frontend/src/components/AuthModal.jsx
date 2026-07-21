import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone, KeyRound, Lock, Mail, ArrowRight, ArrowLeft,
  AlertCircle, Eye, EyeOff, User, CheckCircle2, X,
  Star, TrendingUp, ShieldCheck, Gift, Building2
} from 'lucide-react'
import { authService } from '../services/authService.js'

const loginImage = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop'
const registerImage = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop'

const loginFeatures = [
  { icon: TrendingUp, title: 'Best B2B Rates', desc: 'Up to 40% higher margins' },
  { icon: ShieldCheck, title: 'Bank-grade Security', desc: 'Your data fully protected' },
  { icon: Gift, title: 'Earn Promo Cash', desc: 'Rewards on every booking' },
]

const registerPerks = [
  { icon: TrendingUp, title: 'Instant Activation', desc: 'Start booking immediately' },
  { icon: Gift, title: 'Welcome Bonus ₹500', desc: 'On your first booking' },
  { icon: ShieldCheck, title: 'Confidentiality', desc: 'Data always safe & secure' },
]

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-card rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.25)] border border-[#E5E7EB] flex flex-col sm:flex-row"
          >
            {/* ── Image Panel (left) ── */}
            <div className="hidden sm:block sm:w-[42%] relative overflow-hidden shrink-0">
              <img
                src={mode === 'login' ? loginImage : registerImage}
                alt="Travel"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className={`absolute inset-0 ${mode === 'login' ? 'bg-gradient-to-br from-[#0057B8]/90 via-[#003E8A]/80 to-black/70' : 'bg-gradient-to-br from-[#1F2937]/90 via-[#0057B8]/80 to-[#003E8A]/90'} transition-all duration-500`} />

              {/* Decorative blobs */}
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#008CFF]/20 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-card/5 blur-3xl" />

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-between p-8 text-white h-full">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-card/10 backdrop-blur-sm rounded-xl border border-card/20 mb-6">
                    <Building2 className="w-4 h-4 text-blue-300" />
                    <span className="text-xs font-bold">myPartner</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />)}
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={mode}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl font-extrabold leading-tight mb-3">
                        {mode === 'login' ? (
                          <>Welcome back to India's leading <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60C8FF] to-[#EAF5FF]">B2B travel platform</span></>
                        ) : (
                          <>Start your journey with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60C8FF] to-[#EAF5FF]">myPartner</span></>
                        )}
                      </h3>
                      <p className="text-white/70 text-sm mb-6">
                        {mode === 'login'
                          ? 'Access exclusive rates, manage bookings, and grow your travel business.'
                          : 'Join 60,000+ travel agencies growing their business with exclusive B2B rates.'}
                      </p>

                      <div className="space-y-3.5">
                        {(mode === 'login' ? loginFeatures : registerPerks).map((f, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-card/10 backdrop-blur-sm flex items-center justify-center shrink-0">
                              <f.icon className="w-4 h-4 text-blue-200" />
                            </div>
                            <div>
                              <p className="font-semibold text-white text-xs">{f.title}</p>
                              <p className="text-[10px] text-white/60">{f.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <p className="text-white/40 text-[10px] mt-6">© 2026 MakeMyTrip Pvt. Ltd.</p>
              </div>
            </div>

            {/* ── Form Panel (right) ── */}
            <div className="flex-1 max-h-[90vh] overflow-y-auto relative">
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#008CFF] to-[#0057B8] z-10" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center text-[#6B7280] hover:text-[#1F2937] hover:bg-[#F5F7FA] transition-all z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 pt-10">
                {/* Mode toggle */}
                <div className="flex gap-1 p-1 bg-[#F5F7FA] rounded-xl mb-6 border border-[#E5E7EB]">
                  {[
                    { key: 'login', label: 'Login' },
                    { key: 'register', label: 'Sign Up' },
                  ].map((m) => (
                    <button
                      key={m.key}
                      onClick={() => setMode(m.key)}
                      className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                        mode === m.key
                          ? 'bg-card text-[#008CFF] shadow-[0_2px_8px_rgba(0,0,0,0.08)]'
                          : 'text-[#6B7280] hover:text-[#1F2937]'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {mode === 'login' ? (
                    <LoginForm key="login" onSuccess={onClose} onSwitch={() => setMode('register')} />
                  ) : (
                    <RegisterForm key="register" onSuccess={onClose} onSwitch={() => setMode('login')} />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Login Form ──
function LoginForm({ onSuccess, onSwitch }) {
  const navigate = useNavigate()
  const [loginMode, setLoginMode] = useState('password')
  const [step, setStep] = useState('input')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(['', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [devOtp, setDevOtp] = useState('')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')

  const handleSendOtp = async (e) => {
    e.preventDefault()
    if (phone.length < 10) { setError('Enter a valid 10-digit mobile number'); return }
    setError(''); setLoading(true)
    try {
      const res = await authService.sendOtp(phone, 'login')
      if (res.devOtp) setDevOtp(res.devOtp)
      setStep('verify')
    } catch (err) {
      setError(err.message || 'Failed to send OTP')
    } finally { setLoading(false) }
  }

  const handleOtpChange = (idx, val) => {
    if (val.length > 1) return
    const n = [...otp]; n[idx] = val; setOtp(n)
    if (val && idx < 3) document.getElementById(`modal-otp-${idx + 1}`)?.focus()
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    const otpStr = otp.join('')
    if (otpStr.length < 4) { setError('Enter the 4-digit OTP'); return }
    setError(''); setLoading(true)
    try {
      const res = await authService.verifyOtp(phone, otpStr, 'login')
      if (res.token) { authService.setAuth(res.token, res.user); onSuccess(); navigate('/app') }
    } catch (err) { setError(err.message || 'OTP verification failed') }
    finally { setLoading(false) }
  }

  const handlePasswordLogin = async (e) => {
    e.preventDefault()
    if (!identifier || !password) { setError('Enter email/mobile and password'); return }
    setError(''); setLoading(true)
    try {
      const res = await authService.loginWithPassword(identifier, password)
      if (res.token) { authService.setAuth(res.token, res.user); onSuccess(); navigate('/app') }
    } catch (err) { setError(err.message || 'Login failed') }
    finally { setLoading(false) }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    >
      <div className="mb-5">
        <h2 className="text-xl font-extrabold text-[#1F2937]">Partner Login</h2>
        <p className="text-[#6B7280] mt-0.5 text-sm">Sign in to your travel agency account</p>
      </div>

      {/* Sub-mode toggle */}
      <div className="flex gap-1 p-1 bg-[#F5F7FA] rounded-xl mb-5 border border-[#E5E7EB]">
        {[
          { key: 'password', label: '🔒 Password' },
          { key: 'otp', label: '📱 OTP Login' },
        ].map((m) => (
          <button
            key={m.key}
            onClick={() => { setLoginMode(m.key); setStep('input'); setError('') }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              loginMode === m.key
                ? 'bg-card text-[#008CFF] shadow-[0_2px_8px_rgba(0,0,0,0.06)]'
                : 'text-[#6B7280] hover:text-[#1F2937]'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {loginMode === 'otp' ? (
          <motion.div
            key="otp"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
          >
            {step === 'input' ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <Field label="Mobile Number">
                  <div className="flex items-center rounded-xl border border-[#E5E7EB] focus-within:border-[#008CFF] focus-within:ring-2 focus-within:ring-[#008CFF]/15 transition-all overflow-hidden bg-[#F5F7FA]">
                    <div className="flex items-center gap-2 pl-4 pr-3 py-3.5 border-r border-[#E5E7EB]">
                      <Phone className="w-4 h-4 text-[#008CFF]" />
                      <span className="text-[#374151] font-semibold text-sm">+91</span>
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="Enter mobile number"
                      className="flex-1 px-3 py-3.5 bg-transparent text-[#1F2937] placeholder:text-[#9CA3AF] focus:outline-none text-sm"
                    />
                  </div>
                </Field>
                {error && <ErrorMsg msg={error} />}
                <SubmitBtn loading={loading} label="Send OTP" />
              </form>
            ) : (
              <form onSubmit={handleVerify} className="space-y-5">
                <div className="text-center p-4 bg-[#EAF5FF] rounded-2xl">
                  <div className="inline-flex w-12 h-12 rounded-xl bg-[#008CFF]/10 items-center justify-center mb-3">
                    <KeyRound className="w-6 h-6 text-[#008CFF]" />
                  </div>
                  <p className="text-sm text-[#374151]">OTP sent to <span className="font-bold text-[#1F2937]">+91 {phone}</span></p>
                  {devOtp && (
                    <p className="text-xs text-[#F59E0B] bg-[#F59E0B]/10 rounded-lg px-3 py-1.5 mt-2 inline-block font-semibold">
                      Dev OTP: {devOtp}
                    </p>
                  )}
                </div>
                <div className="flex justify-center gap-3">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`modal-otp-${idx}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value.replace(/\D/g, ''))}
                      className="w-14 h-14 text-center text-2xl font-bold border-2 border-[#E5E7EB] rounded-2xl text-[#1F2937] focus:outline-none focus:border-[#008CFF] focus:ring-2 focus:ring-[#008CFF]/20 transition-all bg-[#F5F7FA]"
                    />
                  ))}
                </div>
                {error && <ErrorMsg msg={error} />}
                <SubmitBtn loading={loading} label="Verify & Login" />
                <div className="flex items-center justify-between text-sm">
                  <button type="button" onClick={() => { setStep('input'); setError(''); setOtp(['','','','']) }} className="text-[#6B7280] hover:text-[#008CFF] flex items-center gap-1 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Change number
                  </button>
                  <button type="button" onClick={handleSendOtp} className="text-[#008CFF] font-semibold hover:underline">Resend OTP</button>
                </div>
              </form>
            )}
          </motion.div>
        ) : (
          <motion.form
            key="password"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            onSubmit={handlePasswordLogin}
            className="space-y-4"
          >
            <Field label="Email or Mobile">
              <InputWrap icon={<Mail className="w-4 h-4 text-[#008CFF]" />}>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter email or mobile"
                  className="flex-1 px-3 py-3.5 bg-transparent text-[#1F2937] placeholder:text-[#9CA3AF] focus:outline-none text-sm"
                />
              </InputWrap>
            </Field>
            <Field label={
              <div className="flex items-center justify-between w-full">
                <span>Password</span>
                <button type="button" className="text-xs text-[#008CFF] font-semibold hover:underline">Forgot?</button>
              </div>
            }>
              <InputWrap icon={<Lock className="w-4 h-4 text-[#008CFF]" />}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="flex-1 px-3 py-3.5 bg-transparent text-[#1F2937] placeholder:text-[#9CA3AF] focus:outline-none text-sm"
                />
              </InputWrap>
            </Field>
            {error && <ErrorMsg msg={error} />}
            <SubmitBtn loading={loading} label="Sign In" />
          </motion.form>
        )}
      </AnimatePresence>

      <p className="mt-5 text-center text-sm text-[#6B7280]">
        New partner?{' '}
        <button onClick={onSwitch} className="text-[#008CFF] font-bold hover:underline">
          Register your agency →
        </button>
      </p>
    </motion.div>
  )
}

// ── Register Form ──
function RegisterForm({ onSuccess, onSwitch }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullName: '', mobile: '', email: '', password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const update = (field, value) => { setForm(prev => ({ ...prev, [field]: value })); setError('') }

  const handleNext = (e) => {
    e.preventDefault()
    if (!form.fullName || !form.mobile) { setError('Please fill all fields'); return }
    if (form.mobile.length < 10) { setError('Enter a valid 10-digit mobile number'); return }
    setError(''); setCurrentStep(1)
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) { setError('All fields are required'); return }
    if (form.password.length < 8) { setError('Password must be at least 8 characters'); return }
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return }
    setLoading(true); setError('')
    try {
      const res = await authService.register({
        fullName: form.fullName, email: form.email, mobile: form.mobile, password: form.password,
      })
      if (res.token) { authService.setAuth(res.token, res.user); onSuccess(); navigate('/app') }
    } catch (err) { setError(err.message || 'Registration failed') }
    finally { setLoading(false) }
  }

  const steps = ['Personal Info', 'Account Security']

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    >
      <div className="mb-4">
        <h2 className="text-xl font-extrabold text-[#1F2937]">Create Account</h2>
        <p className="text-[#6B7280] mt-0.5 text-sm">Register your travel agency in seconds</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-6">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2 flex-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
              i < currentStep ? 'bg-[#22C55E] border-[#22C55E] text-white'
              : i === currentStep ? 'bg-[#008CFF] border-[#008CFF] text-white'
              : 'bg-card border-[#E5E7EB] text-[#9CA3AF]'
            }`}>
              {i < currentStep ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${i === currentStep ? 'text-[#008CFF]' : i < currentStep ? 'text-[#22C55E]' : 'text-[#9CA3AF]'}`}>{s}</span>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 rounded-full transition-all ${i < currentStep ? 'bg-[#22C55E]' : 'bg-[#E5E7EB]'}`} />}
          </div>
        ))}
      </div>

      {currentStep === 0 ? (
        <form onSubmit={handleNext} className="space-y-4">
          <Field label="Full Name">
            <InputWrap icon={<User className="w-4 h-4 text-[#008CFF]" />}>
              <input type="text" required value={form.fullName} onChange={(e) => update('fullName', e.target.value)} placeholder="Enter your full name" className="flex-1 px-3 py-3.5 bg-transparent text-[#1F2937] placeholder:text-[#9CA3AF] focus:outline-none text-sm" />
            </InputWrap>
          </Field>
          <Field label="Phone Number">
            <div className="flex items-center rounded-xl border border-[#E5E7EB] focus-within:border-[#008CFF] focus-within:ring-2 focus-within:ring-[#008CFF]/15 transition-all overflow-hidden bg-[#F5F7FA]">
              <div className="flex items-center gap-2 pl-4 pr-3 py-3.5 border-r border-[#E5E7EB] shrink-0">
                <Phone className="w-4 h-4 text-[#008CFF]" />
                <span className="text-[#374151] font-semibold text-sm">+91</span>
              </div>
              <input type="tel" required value={form.mobile} onChange={(e) => update('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="Enter mobile number" className="flex-1 px-3 py-3.5 bg-transparent text-[#1F2937] placeholder:text-[#9CA3AF] focus:outline-none text-sm" />
            </div>
          </Field>
          {error && <ErrorMsg msg={error} />}
          <SubmitBtn loading={false} label="Continue" />
        </form>
      ) : (
        <form onSubmit={handleRegister} className="space-y-4">
          <Field label="Email Address">
            <InputWrap icon={<Mail className="w-4 h-4 text-[#008CFF]" />}>
              <input type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="business@example.com" className="flex-1 px-3 py-3.5 bg-transparent text-[#1F2937] placeholder:text-[#9CA3AF] focus:outline-none text-sm" />
            </InputWrap>
          </Field>
          <Field label="Password">
            <InputWrap icon={<Lock className="w-4 h-4 text-[#008CFF]" />}>
              <input type={showPassword ? 'text' : 'password'} required value={form.password} onChange={(e) => update('password', e.target.value)} placeholder="Min 8 characters" className="flex-1 px-3 py-3.5 bg-transparent text-[#1F2937] placeholder:text-[#9CA3AF] focus:outline-none text-sm" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="pr-4 text-[#9CA3AF] hover:text-[#008CFF] transition-colors">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </InputWrap>
          </Field>
          <Field label="Confirm Password">
            <InputWrap icon={<Lock className="w-4 h-4 text-[#008CFF]" />}>
              <input type={showConfirm ? 'text' : 'password'} required value={form.confirmPassword} onChange={(e) => update('confirmPassword', e.target.value)} placeholder="Re-enter password" className="flex-1 px-3 py-3.5 bg-transparent text-[#1F2937] placeholder:text-[#9CA3AF] focus:outline-none text-sm" />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="pr-4 text-[#9CA3AF] hover:text-[#008CFF] transition-colors">
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </InputWrap>
          </Field>
          {form.password && (
            <div className="space-y-1">
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-all ${
                    form.password.length >= (i + 1) * 3
                      ? form.password.length >= 12 ? 'bg-[#22C55E]' : form.password.length >= 8 ? 'bg-[#F59E0B]' : 'bg-[#EF4444]'
                      : 'bg-[#E5E7EB]'
                  }`} />
                ))}
              </div>
              <p className="text-xs text-[#6B7280]">
                {form.password.length < 8 ? 'Too short' : form.password.length < 12 ? 'Good' : 'Strong password'}
              </p>
            </div>
          )}
          {error && <ErrorMsg msg={error} />}
          <SubmitBtn loading={loading} label="Create Account" />
          <button type="button" onClick={() => { setCurrentStep(0); setError('') }} className="w-full flex items-center justify-center gap-1.5 text-sm text-[#6B7280] hover:text-[#008CFF] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </form>
      )}

      <p className="mt-5 text-center text-sm text-[#6B7280]">
        Already a partner?{' '}
        <button onClick={onSwitch} className="text-[#008CFF] font-bold hover:underline">Sign in →</button>
      </p>
    </motion.div>
  )
}

// ── Shared sub-components ──
function Field({ label, children }) {
  return (
    <div>
      <label className="flex text-[10px] font-bold text-[#6B7280] uppercase tracking-widest mb-1.5">
        {typeof label === 'string' ? label : <div className="flex items-center justify-between w-full">{label}</div>}
      </label>
      {children}
    </div>
  )
}

function InputWrap({ icon, children }) {
  return (
    <div className="flex items-center rounded-xl border border-[#E5E7EB] focus-within:border-[#008CFF] focus-within:ring-2 focus-within:ring-[#008CFF]/15 transition-all overflow-hidden bg-[#F5F7FA]">
      <div className="pl-4 pr-3">{icon}</div>
      {children}
    </div>
  )
}

function ErrorMsg({ msg }) {
  return (
    <p className="text-sm text-[#EF4444] flex items-center gap-1.5 bg-[#EF4444]/5 px-3 py-2 rounded-xl border border-[#EF4444]/15">
      <AlertCircle className="w-4 h-4 shrink-0" />{msg}
    </p>
  )
}

function SubmitBtn({ loading, label }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#008CFF] to-[#0057B8] hover:from-[#0073D9] hover:to-[#003E8A] disabled:opacity-60 text-white font-bold rounded-xl shadow-[0_6px_20px_rgba(0,140,255,0.35)] hover:shadow-[0_8px_25px_rgba(0,140,255,0.45)] transition-all active:scale-95 text-sm"
    >
      {loading ? (
        <svg className="animate-spin w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
      ) : (
        <>{label}<ArrowRight className="w-4 h-4" /></>
      )}
    </button>
  )
}
