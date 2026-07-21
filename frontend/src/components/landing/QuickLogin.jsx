import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone, ArrowRight, ShieldCheck, TrendingUp, Star, Gift, Users
} from 'lucide-react'
import Button from '../ui/Button.jsx'
import TravelHubLogo from '../ui/TravelHubLogo.jsx'

export default function QuickLogin() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState(['', '', '', ''])

  const handleSendOtp = (e) => {
    e.preventDefault()
    if (phone.length >= 10) setOtpSent(true)
  }

  const handleOtpChange = (idx, val) => {
    if (val.length > 1) return
    const newOtp = [...otp]
    newOtp[idx] = val
    setOtp(newOtp)
    if (val && idx < 3) {
      const next = document.getElementById(`otp-${idx + 1}`)
      next?.focus()
    }
  }

  const handleVerify = (e) => {
    e.preventDefault()
    navigate('/app')
  }

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-[#EFF6FF] via-white to-[#F5F7FA]">
      <div className="container-max section-padding">
        <div className="flex flex-col lg:flex-row gap-10 items-center">

          {/* Left: Benefits / Social proof */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 max-w-xl"
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] rounded-full border border-[#2563EB]/20">
              Quick Access
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] mb-4 leading-tight">
              Start Booking in{' '}
              <span className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] bg-clip-text text-transparent">
                60 Seconds
              </span>
            </h2>
            <p className="text-[#6B7280] text-lg mb-8 leading-relaxed">
              Log in or register with just your mobile number. No lengthy forms, no waiting  instant access to India's largest B2B travel platform.
            </p>

            {/* Feature list */}
            <div className="space-y-4 mb-8">
              {[
                { icon: TrendingUp, color: 'bg-[#EFF6FF] text-[#2563EB]', title: 'Exclusive B2B Rates', desc: 'Up to 40% better margins than public fares' },
                { icon: ShieldCheck, color: 'bg-[#DCFCE7] text-[#22C55E]', title: '100% Secure & Confidential', desc: 'Your customer data is always protected' },
                { icon: Gift, color: 'bg-[#FEF3C7] text-[#F59E0B]', title: 'Earn Promo Cash', desc: 'Rewards on every flight & hotel booking' },
              ].map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${f.color}`}>
                    <f.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1F2937] text-sm">{f.title}</p>
                    <p className="text-xs text-[#6B7280] mt-0.5">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social proof row */}
            <div className="flex items-center gap-4 pt-6 border-t border-[#E5E7EB]">
              <div className="flex -space-x-2">
                {[
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&auto=format&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1494790108755-2616b1b4e3b6?w=50&h=50&auto=format&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&auto=format&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&auto=format&fit=crop&crop=face',
                ].map((src, i) => (
                  <img key={i} src={src} alt="Agent" className="w-9 h-9 rounded-full border-2 border-card object-cover" />
                ))}
              </div>
              <div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />)}
                </div>
                <p className="text-xs text-[#6B7280] mt-0.5">Trusted by <span className="font-bold text-[#1F2937]">60,000+</span> travel agents</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Login card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="w-full lg:w-[420px] shrink-0"
          >
            <div className="relative bg-card rounded-3xl shadow-[0_20px_60px_rgba(0,140,255,0.12)] border border-[#E5E7EB] p-8 overflow-hidden">
              {/* Top accent gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] rounded-t-3xl" />
              {/* Background glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#EFF6FF] blur-3xl opacity-60" />

              <div className="relative text-center mb-7">
                <div className="flex justify-center mb-3">
                  <TravelHubLogo size="sm" noTagline />
                </div>
                <h3 className="text-2xl font-bold text-[#1F2937]">Get Started</h3>
                <p className="text-sm text-[#6B7280] mt-1.5">Log in or create an account using your mobile number</p>
              </div>

              <AnimatePresence mode="wait">
                {!otpSent ? (
                  <motion.form
                    key="phone"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleSendOtp}
                    className="relative space-y-4"
                  >
                    <div>
                      <label className="block text-[10px] font-bold text-[#6B7280] uppercase tracking-widest mb-1.5">Mobile Number</label>
                      <div className="flex items-center rounded-xl border border-[#E5E7EB] focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-[#2563EB]/15 transition-all overflow-hidden bg-[#F5F7FA]">
                        <div className="flex items-center gap-2 pl-4 pr-3 py-3.5 border-r border-[#E5E7EB] shrink-0">
                          <Phone className="w-4 h-4 text-[#2563EB]" />
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
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#3B82F6] hover:to-[#1E40AF] text-white font-bold rounded-xl shadow-[0_6px_20px_rgba(0,140,255,0.35)] transition-all active:scale-95 text-base"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.form
                    key="otp"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleVerify}
                    className="relative space-y-4"
                  >
                    <p className="text-sm text-[#374151] text-center">
                      OTP sent to <span className="font-bold text-[#1F2937]">+91 {phone}</span>
                    </p>
                    <div className="flex justify-center gap-3">
                      {otp.map((digit, idx) => (
                        <input
                          key={idx}
                          id={`otp-${idx}`}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value.replace(/\D/g, ''))}
                          className="w-13 h-14 text-center text-xl font-bold border-2 border-[#E5E7EB] rounded-xl text-[#1F2937] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all bg-[#F5F7FA]"
                        />
                      ))}
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white font-bold rounded-xl shadow-[0_6px_20px_rgba(0,140,255,0.35)] transition-all active:scale-95 text-base"
                    >
                      Verify & Login
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="w-full text-sm text-[#6B7280] hover:text-[#2563EB] transition-colors"
                    >
                      → Change number
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Quick benefits */}
              <div className="relative mt-7 pt-6 border-t border-[#E5E7EB]">
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { icon: TrendingUp, label: 'Best Rates', color: 'bg-[#EFF6FF] text-[#2563EB]' },
                    { icon: ShieldCheck, label: 'Secure', color: 'bg-[#DCFCE7] text-[#22C55E]' },
                    { icon: Star, label: 'Rewards', color: 'bg-[#FEF3C7] text-[#F59E0B]' },
                  ].map((b, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${b.color}`}>
                        <b.icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-medium text-[#6B7280]">{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="relative mt-5 text-center text-sm text-[#6B7280]">
                New partner?{' '}
                <button
                  onClick={() => navigate('/register')}
                  className="text-[#2563EB] font-bold hover:underline"
                >
                  Register your agency →
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
