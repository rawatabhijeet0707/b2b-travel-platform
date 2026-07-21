import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Shield, ShieldCheck, Plane, Users, Calendar, MapPin, ChevronDown,
  Globe, Clock, Zap, Heart, Briefcase, GraduationCap, PlaneTakeoff,
  Home, Baby, Check, ArrowRight, Star, TrendingUp, Award, Headphones,
  CreditCard, FileText, Sparkles, ChevronRight, X, Activity,
  Luggage, Stethoscope, PhoneCall, BadgeCheck, Building2,
} from 'lucide-react'
import AnimatedBlobs from '../../components/ui/AnimatedBlobs.jsx'

/* ─────────── DATA ─────────── */

const trustBadges = [
  { label: 'Instant Policy', icon: Zap },
  { label: 'Worldwide Coverage', icon: Globe },
  { label: '24×7 Claims Support', icon: Headphones },
  { label: 'Secure Payment', icon: ShieldCheck },
  { label: 'Trusted Partners', icon: BadgeCheck },
]

const heroStats = [
  { value: 100, suffix: '+', label: 'Insurance Partners' },
  { value: 500, suffix: 'K+', label: 'Policies Issued' },
  { value: 99.8, suffix: '%', label: 'Claim Support' },
  { value: 180, suffix: '+', label: 'Countries Covered' },
]

const quickOptions = [
  { label: 'Single Trip', icon: Plane, color: 'from-blue-500 to-cyan-500' },
  { label: 'Family Trip', icon: Users, color: 'from-purple-500 to-violet-500' },
  { label: 'Student Travel', icon: GraduationCap, color: 'from-green-500 to-emerald-500' },
  { label: 'Senior Citizen', icon: Heart, color: 'from-rose-500 to-pink-500' },
  { label: 'Business Travel', icon: Briefcase, color: 'from-amber-500 to-orange-500' },
  { label: 'Schengen Visa', icon: FileText, color: 'from-indigo-500 to-blue-500' },
  { label: 'International', icon: PlaneTakeoff, color: 'from-cyan-500 to-teal-500' },
  { label: 'Domestic Travel', icon: Home, color: 'from-slate-500 to-gray-500' },
]

const whyChooseUs = [
  { title: 'Fast Claims', desc: 'Claims processed within 24 hours with minimal documentation.', icon: Zap, color: 'text-blue-600 bg-blue-50' },
  { title: 'Global Assistance', desc: '24×7 emergency support across 180+ countries worldwide.', icon: Globe, color: 'text-cyan-600 bg-cyan-50' },
  { title: 'Cashless Hospital', desc: 'Access 10,000+ network hospitals with cashless treatment.', icon: Stethoscope, color: 'text-green-600 bg-green-50' },
  { title: 'Secure Coverage', desc: 'Bank-grade encryption protects your policy and personal data.', icon: ShieldCheck, color: 'text-purple-600 bg-purple-50' },
]

const coverageTypes = ['Medical Only', 'Comprehensive', 'Premium Coverage']
const tripTypes = ['Single Trip', 'Annual Multi-Trip', 'Long Stay']
const ageGroups = ['18-40', '41-60', '61-70', '71+']

const insurancePlans = [
  {
    id: 1,
    name: 'Basic Travel Shield',
    price: 499,
    originalPrice: 799,
    duration: 'Per Trip',
    coverage: '$50,000',
    rating: 4.5,
    reviews: 1240,
    features: ['Medical Coverage', 'Trip Cancellation', 'Baggage Loss', '24/7 Support'],
    popular: false,
    color: 'from-slate-500 to-gray-600',
  },
  {
    id: 2,
    name: 'Premium Travel Protect',
    price: 899,
    originalPrice: 1299,
    duration: 'Per Trip',
    coverage: '$200,000',
    rating: 4.8,
    reviews: 3580,
    features: ['Medical Coverage', 'Trip Cancellation', 'Baggage Protection', 'Emergency Assistance', 'Cashless Hospital', 'Adventure Sports'],
    popular: true,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 3,
    name: 'Elite Global Coverage',
    price: 1499,
    originalPrice: 1999,
    duration: 'Annual',
    coverage: '$500,000',
    rating: 4.9,
    reviews: 2150,
    features: ['Medical Coverage', 'Trip Cancellation', 'Baggage Protection', 'Emergency Assistance', 'Cashless Hospital', 'Adventure Sports', 'Pre-existing Conditions', 'Family Coverage'],
    popular: false,
    color: 'from-purple-500 to-violet-600',
  },
]

/* ─────────── ANIMATED COUNTER ─────────── */

function AnimatedCounter({ value, suffix, duration = 2 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let startTime = null
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(value * eased)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [inView, value, duration])

  const display = value % 1 !== 0 ? count.toFixed(1) : Math.floor(count)
  return <span ref={ref}>{display}{suffix}</span>
}

/* ─────────── HERO SECTION ─────────── */

function InsuranceHero() {
  const [destination, setDestination] = useState('')
  const [traveller, setTraveller] = useState('1 Traveller')
  const [tripType, setTripType] = useState('Single Trip')
  const [coverageType, setCoverageType] = useState('Comprehensive')
  const [ageGroup, setAgeGroup] = useState('18-40')
  const [showTrip, setShowTrip] = useState(false)
  const [showCoverage, setShowCoverage] = useState(false)
  const [showAge, setShowAge] = useState(false)
  const [quoting, setQuoting] = useState(false)
  const [quoteDone, setQuoteDone] = useState(false)

  const handleQuote = () => {
    setQuoting(true)
    setTimeout(() => {
      setQuoting(false)
      setQuoteDone(true)
      setTimeout(() => setQuoteDone(false), 3000)
    }, 1800)
  }

  return (
    <section className="relative min-h-[750px] overflow-hidden bg-[#0F172A]">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1547234935-80c7145ecba9?w=1920&q=80"
          alt="Travel insurance"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/95 via-[#0F172A]/80 to-[#1E3A5F]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-transparent to-[#0F172A]/40" />
      </div>

      {/* Mesh gradient overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at 15% 80%, rgba(37,99,235,0.35), transparent 50%), radial-gradient(ellipse at 85% 20%, rgba(6,182,212,0.25), transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(14,165,233,0.15), transparent 60%)',
        }}
      />

      {/* Animated blur circles */}
      <motion.div
        animate={{ x: [0, 80, 0], y: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-20 left-10 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-32 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 right-1/3 w-64 h-64 bg-sky-400/8 rounded-full blur-3xl"
      />

      {/* Floating geometric shapes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute top-24 right-1/4 w-20 h-20 border border-white/8 rounded-3xl"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-40 left-1/4 w-16 h-16 border border-white/8 rounded-full"
      />

      {/* Subtle particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 3 + i * 0.3, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          style={{ top: `${10 + (i * 7) % 80}%`, left: `${5 + (i * 11) % 90}%` }}
        />
      ))}

      {/* Light rays */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-blue-400/20 to-transparent" />
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-cyan-400/15 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-20 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* LEFT: Content */}
          <div className="pt-4 lg:pt-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span className="text-xs font-semibold text-white">Trusted by 500K+ Travellers Worldwide</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight"
            >
              Protect Every Journey
              <br />
              With{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] via-[#38BDF8] to-[#22D3EE]">
                Smart Travel Insurance
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-white/70 mt-5 max-w-xl leading-relaxed"
            >
              Comprehensive travel insurance with instant policy issuance, worldwide medical coverage, cashless hospitalisation, and 24×7 emergency assistance. Travel worry-free, wherever you go.
            </motion.p>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-2.5 mt-6"
            >
              {trustBadges.map((badge, i) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  whileHover={{ y: -2 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/8 backdrop-blur-md border border-white/15"
                >
                  <badge.icon className="w-3.5 h-3.5 text-cyan-300" />
                  <span className="text-xs font-semibold text-white/90">{badge.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-4 gap-3 mt-8"
            >
              {heroStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ y: -3 }}
                  className="glass-strong rounded-2xl p-3 border border-white/15 text-center"
                >
                  <p className="text-xl sm:text-2xl font-extrabold text-white">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-[10px] text-white/60 font-medium mt-0.5 leading-tight">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Floating Insurance Dashboard Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden lg:block relative"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              {/* Glow */}
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-500/30 to-cyan-500/20 blur-2xl scale-110" />

              {/* Main card */}
              <div className="relative glass-strong rounded-[2rem] border border-white/25 p-6 shadow-2xl">
                {/* Card header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg"
                    >
                      <Shield className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <p className="text-sm font-bold text-white">Travel Insurance Card</p>
                      <p className="text-[10px] text-white/50">Policy #TI-2025-08432</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-400/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Active
                  </span>
                </div>

                {/* Coverage amount */}
                <div className="bg-gradient-to-br from-blue-500/15 to-cyan-500/10 rounded-2xl p-4 mb-4 border border-white/10">
                  <p className="text-[10px] text-white/50 uppercase tracking-wider mb-1">Total Coverage Amount</p>
                  <p className="text-3xl font-extrabold text-white">$200,000</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-3 h-3 text-green-400" />
                    <span className="text-[10px] text-green-300 font-semibold">Premium Plan · Annual</span>
                  </div>
                </div>

                {/* Coverage items */}
                <div className="grid grid-cols-2 gap-2.5 mb-4">
                  {[
                    { label: 'Medical', value: '$100K', icon: Stethoscope },
                    { label: 'Trip Cancel', value: '$5K', icon: FileText },
                    { label: 'Baggage', value: '$2K', icon: Luggage },
                    { label: 'Emergency', value: '24×7', icon: PhoneCall },
                  ].map((item) => (
                    <div key={item.label} className="bg-white/5 rounded-xl p-3 border border-white/8">
                      <item.icon className="w-4 h-4 text-cyan-300 mb-1.5" />
                      <p className="text-[10px] text-white/50">{item.label}</p>
                      <p className="text-sm font-bold text-white">{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Digital card preview */}
                <div className="bg-gradient-to-r from-[#0B1A30] to-[#1E3A5F] rounded-2xl p-4 border border-white/10 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] text-white/40 uppercase tracking-wider">Digital Insurance Card</p>
                    <CreditCard className="w-4 h-4 text-white/30" />
                  </div>
                  <p className="text-sm font-bold text-white mb-1">Rahul Sharma</p>
                  <p className="text-[10px] text-white/40">Valid: 20 Jul 2025 - 19 Jul 2026</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[10px] text-cyan-300 font-semibold">TI ···· 08432</span>
                    <BadgeCheck className="w-4 h-4 text-green-400" />
                  </div>
                </div>

                {/* Claim status */}
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/8">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-white">Claim Status</p>
                    <p className="text-[10px] text-white/50">No active claims</p>
                  </div>
                  <span className="text-[10px] font-bold text-green-300">Healthy</span>
                </div>
              </div>

              {/* Floating success badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-5 -right-5 glass-strong rounded-2xl border border-white/25 px-3 py-2.5 flex items-center gap-2 shadow-xl"
              >
                <div className="w-8 h-8 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white">Policy Issued</p>
                  <p className="text-[9px] text-white/50">Instant coverage</p>
                </div>
              </motion.div>

              {/* Floating rating badge */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.5, ease: 'easeInOut' }}
                className="absolute -bottom-5 -left-5 glass-strong rounded-2xl border border-white/25 px-3 py-2.5 flex items-center gap-2 shadow-xl"
              >
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <div>
                  <p className="text-[10px] font-bold text-white">4.9 / 5.0</p>
                  <p className="text-[9px] text-white/50">3,580 reviews</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* QUOTE BOX */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 lg:mt-6"
        >
          <div className="glass-strong rounded-[30px] border border-white/25 shadow-2xl p-5 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
              {/* Destination */}
              <div>
                <label className="block text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1.5">Destination</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Where to?"
                    className="w-full pl-9 pr-3 py-2.5 bg-white/8 border border-white/15 rounded-xl text-sm font-medium text-white placeholder:text-white/40 focus:border-cyan-400 focus:bg-white/12 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Traveller */}
              <div>
                <label className="block text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1.5">Traveller</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    value={traveller}
                    onChange={(e) => setTraveller(e.target.value)}
                    placeholder="1 Traveller"
                    className="w-full pl-9 pr-3 py-2.5 bg-white/8 border border-white/15 rounded-xl text-sm font-medium text-white placeholder:text-white/40 focus:border-cyan-400 focus:bg-white/12 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Travel Dates */}
              <div>
                <label className="block text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1.5">Travel Dates</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="date"
                    className="w-full pl-9 pr-3 py-2.5 bg-white/8 border border-white/15 rounded-xl text-sm font-medium text-white placeholder:text-white/40 focus:border-cyan-400 focus:bg-white/12 outline-none transition-all [color-scheme:dark]"
                  />
                </div>
              </div>

              {/* Trip Type */}
              <div className="relative">
                <label className="block text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1.5">Trip Type</label>
                <button
                  onClick={() => { setShowTrip(!showTrip); setShowCoverage(false); setShowAge(false) }}
                  className="w-full flex items-center justify-between px-3 py-2.5 bg-white/8 border border-white/15 rounded-xl text-sm font-medium text-white focus:border-cyan-400 outline-none transition-all"
                >
                  <span className="truncate">{tripType}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-white/40 transition-transform ${showTrip ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {showTrip && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute top-full left-0 right-0 mt-1.5 glass-strong rounded-xl border border-white/20 shadow-xl z-30 overflow-hidden"
                    >
                      {tripTypes.map(t => (
                        <button
                          key={t}
                          onClick={() => { setTripType(t); setShowTrip(false) }}
                          className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-white/10 transition-colors ${tripType === t ? 'text-cyan-300 font-bold bg-white/5' : 'text-white/80'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Coverage Type */}
              <div className="relative">
                <label className="block text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1.5">Coverage Type</label>
                <button
                  onClick={() => { setShowCoverage(!showCoverage); setShowTrip(false); setShowAge(false) }}
                  className="w-full flex items-center justify-between px-3 py-2.5 bg-white/8 border border-white/15 rounded-xl text-sm font-medium text-white focus:border-cyan-400 outline-none transition-all"
                >
                  <span className="truncate">{coverageType}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-white/40 transition-transform ${showCoverage ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {showCoverage && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute top-full left-0 right-0 mt-1.5 glass-strong rounded-xl border border-white/20 shadow-xl z-30 overflow-hidden"
                    >
                      {coverageTypes.map(c => (
                        <button
                          key={c}
                          onClick={() => { setCoverageType(c); setShowCoverage(false) }}
                          className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-white/10 transition-colors ${coverageType === c ? 'text-cyan-300 font-bold bg-white/5' : 'text-white/80'}`}
                        >
                          {c}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Age Group */}
              <div className="relative">
                <label className="block text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1.5">Age Group</label>
                <button
                  onClick={() => { setShowAge(!showAge); setShowTrip(false); setShowCoverage(false) }}
                  className="w-full flex items-center justify-between px-3 py-2.5 bg-white/8 border border-white/15 rounded-xl text-sm font-medium text-white focus:border-cyan-400 outline-none transition-all"
                >
                  <span className="truncate">{ageGroup}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-white/40 transition-transform ${showAge ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {showAge && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute top-full left-0 right-0 mt-1.5 glass-strong rounded-xl border border-white/20 shadow-xl z-30 overflow-hidden"
                    >
                      {ageGroups.map(a => (
                        <button
                          key={a}
                          onClick={() => { setAgeGroup(a); setShowAge(false) }}
                          className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-white/10 transition-colors ${ageGroup === a ? 'text-cyan-300 font-bold bg-white/5' : 'text-white/80'}`}
                        >
                          {a}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
              {quoteDone ? (
                <div className="inline-flex items-center gap-2 text-sm font-bold text-green-400">
                  <Check className="w-4 h-4" /> Quote generated! Scroll down to view plans.
                </div>
              ) : (
                <p className="text-xs text-white/40">Get instant quotes from 100+ insurers</p>
              )}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleQuote}
                disabled={quoting}
                className="relative overflow-hidden inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white font-bold rounded-2xl shadow-lg hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] disabled:opacity-70 transition-all"
              >
                {quoting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Getting Quote...
                  </>
                ) : (
                  <>
                    Get Quote
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </>
                )}
                {/* Ripple effect */}
                <motion.div
                  animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-2xl bg-white/10"
                />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* QUICK INSURANCE OPTIONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {quickOptions.map((opt, i) => (
              <motion.button
                key={opt.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                whileHover={{ y: -4, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group relative glass-strong rounded-2xl border border-white/15 p-3 text-center overflow-hidden"
              >
                {/* Gradient border on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br ${opt.color} rounded-2xl`} style={{ padding: 1 }}>
                  <div className="w-full h-full rounded-2xl bg-[#0F172A]/80" />
                </div>
                <div className="relative">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${opt.color} flex items-center justify-center mx-auto mb-2 shadow-md`}>
                    <opt.icon className="w-4.5 h-4.5 text-white" />
                  </div>
                  <span className="text-[11px] font-semibold text-white/80 group-hover:text-white transition-colors">{opt.label}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────── WHY CHOOSE US ─────────── */

function WhyChooseUs() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-extrabold text-gray-900"
        >
          Why Choose Our Insurance
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm text-gray-500 mt-2 max-w-xl mx-auto"
        >
          Trusted by travellers worldwide for fast claims, global assistance, and comprehensive coverage.
        </motion.p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {whyChooseUs.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-floating transition-all p-6 text-center group"
          >
            <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
              <item.icon className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ─────────── INSURANCE PLANS ─────────── */

function InsurancePlans() {
  const [selectedPlan, setSelectedPlan] = useState(null)

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Insurance Plans</h2>
        <p className="text-sm text-gray-500 mt-2">Choose the perfect coverage for your travel needs</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insurancePlans.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className={`relative bg-white rounded-3xl border-2 shadow-card hover:shadow-floating transition-all overflow-hidden ${plan.popular ? 'border-blue-500' : 'border-gray-100'}`}
          >
            {plan.popular && (
              <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-center text-xs font-bold py-2">
                Most Popular
              </div>
            )}
            <div className={`p-6 ${plan.popular ? 'pt-12' : ''}`}>
              {/* Plan name + rating */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{plan.duration}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-bold text-gray-700">{plan.rating}</span>
                  <span className="text-[10px] text-gray-400">({plan.reviews})</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-extrabold text-gray-900">₹{plan.price}</span>
                <span className="text-sm text-gray-400 line-through">₹{plan.originalPrice}</span>
              </div>
              <p className="text-xs text-gray-400 mb-5">Coverage: {plan.coverage}</p>

              {/* Features */}
              <div className="space-y-2.5 mb-6">
                {plan.features.map(f => (
                  <div key={f} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center">
                      <Check className="w-3 h-3 text-green-600" strokeWidth={3} />
                    </div>
                    <span className="text-sm text-gray-600">{f}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => setSelectedPlan(plan)}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all active:scale-95 ${plan.popular ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md hover:shadow-lg' : 'bg-gray-50 text-gray-800 border border-gray-200 hover:border-blue-300 hover:text-blue-600'}`}
              >
                Buy Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Plan detail drawer */}
      <AnimatePresence>
        {selectedPlan && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlan(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-white z-50 overflow-y-auto shadow-2xl"
            >
              <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between z-10">
                <div>
                  <p className="text-sm font-bold text-gray-900">{selectedPlan.name}</p>
                  <p className="text-xs text-gray-400">{selectedPlan.coverage} coverage · {selectedPlan.duration}</p>
                </div>
                <button onClick={() => setSelectedPlan(null)} className="w-8 h-8 rounded-xl hover:bg-gray-100 flex items-center justify-center">
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Premium Amount</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-gray-900">₹{selectedPlan.price}</span>
                    <span className="text-sm text-gray-400 line-through">₹{selectedPlan.originalPrice}</span>
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                      Save ₹{selectedPlan.originalPrice - selectedPlan.price}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 mb-3">Coverage Details</h4>
                  <div className="space-y-2">
                    {selectedPlan.features.map(f => (
                      <div key={f} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-green-600" strokeWidth={3} />
                        </div>
                        <span className="text-sm text-gray-700 font-medium">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <h4 className="text-xs font-bold text-gray-900 mb-3">Policy Terms</h4>
                  <div className="space-y-2 text-xs text-gray-500">
                    <p>• Cancellation: Free within 14 days of purchase</p>
                    <p>• Claim processing: Within 24-48 hours</p>
                    <p>• Validity: As per trip duration or annual</p>
                    <p>• Cashless hospitalisation at 10,000+ network hospitals</p>
                  </div>
                </div>
                <button className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95">
                  Proceed to Checkout · ₹{selectedPlan.price}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ─────────── INFO BANNER ─────────── */

function InfoBanner() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-[#0B1A30] via-[#1D4ED8] to-[#1E40AF] rounded-3xl p-8 lg:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-4">
              <ShieldCheck className="w-4 h-4 text-cyan-300" />
              <span className="text-xs font-semibold text-white">Trusted Protection</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white mb-3">
              Travel with confidence, anywhere in the world
            </h2>
            <p className="text-white/70 text-sm lg:text-base max-w-2xl">
              Our travel insurance covers medical emergencies, trip cancellations, baggage loss, and more. With 24×7 global assistance and cashless hospitalisation, you're never alone when travelling.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              {['Medical Coverage up to $500K', '180+ Countries', 'Instant Policy', '24×7 Claims'].map(t => (
                <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs font-semibold text-white">
                  <Check className="w-3 h-3 text-green-400" /> {t}
                </span>
              ))}
            </div>
          </div>
          <div className="text-center lg:text-right">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex w-24 h-24 rounded-3xl bg-white/10 border border-white/20 items-center justify-center mb-4"
            >
              <Shield className="w-12 h-12 text-white" />
            </motion.div>
            <p className="text-white/50 text-xs">Protected by</p>
            <p className="text-white font-bold text-lg">IRDAI Certified</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────── MAIN PAGE ─────────── */

export default function InsurancePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] relative">
      <AnimatedBlobs />
      <InsuranceHero />
      <WhyChooseUs />
      <InsurancePlans />
      <InfoBanner />
    </div>
  )
}
