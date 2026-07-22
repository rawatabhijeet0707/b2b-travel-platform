import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Shield, ShieldCheck, Plane, Users, Calendar, MapPin, ChevronDown,
  Globe, Clock, Zap, Heart, Briefcase, GraduationCap, PlaneTakeoff,
  Home, Baby, Check, ArrowRight, Star, TrendingUp, Award, Headphones,
  CreditCard, FileText, Sparkles, ChevronRight, X, Activity,
  Luggage, Stethoscope, PhoneCall, BadgeCheck, Building2,
  ChevronLeft, Phone, Mail, Layers, RefreshCw, HelpCircle,
  AlertCircle, CheckCircle, Send, ExternalLink, Quote,
  Anchor, DollarSign, Umbrella, Car, Cpu, Leaf
} from 'lucide-react'
import PaymentModal from '../../components/payment/PaymentModal.jsx'

/* ─────────── HERO SLIDES DATA ─────────── */
const heroSlides = [
  {
    id: 1,
    image: '/insurance_hero_chess.png',
    title: 'Innovative Strategies',
    subtitle: 'Our solid professionalism and unique customer focus positions MyPartner to become a market leader in providing insurance and risk management services across the Asia Pacific Region.',
    tag: 'Strategic Excellence',
    accent: 'from-amber-700/80 via-amber-900/70',
  },
  {
    id: 2,
    image: '/insurance_hero_globe.png',
    title: 'Global Protection Network',
    subtitle: 'With partners spanning 180+ countries, we deliver seamless international insurance coverage tailored to your travel and business needs wherever you go.',
    tag: 'Worldwide Coverage',
    accent: 'from-blue-900/80 via-blue-800/70',
  },
  {
    id: 3,
    image: '/insurance_hero_family.png',
    title: 'Protecting What Matters Most',
    subtitle: 'Comprehensive family and personal insurance solutions that give you peace of mind, knowing your loved ones are secured against life\'s uncertainties.',
    tag: 'Family First',
    accent: 'from-slate-900/80 via-slate-800/70',
  },
]

/* ─────────── SCOPE OF SERVICES ─────────── */
const services = [
  {
    icon: Globe,
    title: 'Global Insurance Solution',
    desc: 'End-to-end global insurance solutions covering every corner of the world.',
    details: 'We provide comprehensive insurance coverage across 150+ countries, ensuring you and your business are protected wherever you operate. Our global network of partners enables seamless policy issuance and claims handling worldwide.',
    color: '#8B2252',
    bg: 'rgba(139,34,82,0.08)',
  },
  {
    icon: Layers,
    title: 'Insurance Services',
    desc: 'Comprehensive suite of personal, commercial, and specialty insurance products.',
    details: 'From life and health insurance to property, marine, aviation, and liability coverage, we offer a complete portfolio of insurance products tailored to meet diverse personal and business needs.',
    color: '#8B2252',
    bg: 'rgba(139,34,82,0.08)',
  },
  {
    icon: RefreshCw,
    title: 'Reinsurance Broking',
    desc: 'Expert reinsurance broking and risk transfer strategies for carriers.',
    details: 'Our reinsurance broking services help insurance companies manage risk exposure through treaty and facultative reinsurance placements, structured reinsurance programs, and innovative risk transfer solutions.',
    color: '#8B2252',
    bg: 'rgba(139,34,82,0.08)',
  },
  {
    icon: Shield,
    title: 'Risk Management',
    desc: 'Proactive risk identification, assessment, and mitigation consulting.',
    details: 'Our risk management consultants conduct thorough risk assessments, develop customized mitigation strategies, and provide ongoing monitoring to help organizations minimize exposure and optimize insurance costs.',
    color: '#8B2252',
    bg: 'rgba(139,34,82,0.08)',
  },
  {
    icon: Headphones,
    title: 'Claims Services',
    desc: '24×7 dedicated claims support with fast-track processing and settlement.',
    details: 'Our dedicated claims team ensures quick filing, processing, and settlement of claims. We advocate on behalf of our clients to maximize claim recovery and provide transparent status updates throughout the process.',
    color: '#8B2252',
    bg: 'rgba(139,34,82,0.08)',
  },
  {
    icon: DollarSign,
    title: 'Alternative Risk Financing',
    desc: 'Innovative risk financing solutions including captives and structured products.',
    details: 'We design and implement alternative risk transfer mechanisms such as captive insurance programs, risk retention groups, and structured finance solutions to help clients manage complex risks cost-effectively.',
    color: '#8B2252',
    bg: 'rgba(139,34,82,0.08)',
  },
]

/* ─────────── INSURANCE PRODUCTS ─────────── */
const insuranceProducts = [
  {
    id: 1,
    category: 'Travel Insurance',
    icon: Plane,
    color: '#2563EB',
    bgColor: 'rgba(37,99,235,0.08)',
    tagColor: '#2563EB',
    plans: [
      { name: 'Single Trip', price: '₹499', coverage: '$50,000', tag: 'Most Affordable' },
      { name: 'Annual Multi-Trip', price: '₹1,299', coverage: '$200,000', tag: 'Best Value', popular: true },
      { name: 'Family Travel', price: '₹1,899', coverage: '$300,000', tag: 'Family Shield' },
    ],
    features: ['Emergency Medical', 'Trip Cancellation', 'Baggage Loss', 'Flight Delay', '24×7 Support'],
  },
  {
    id: 2,
    category: 'Health Insurance',
    icon: Heart,
    color: '#DC2626',
    bgColor: 'rgba(220,38,38,0.08)',
    tagColor: '#DC2626',
    plans: [
      { name: 'Basic Health', price: '₹799', coverage: '₹3,00,000', tag: 'Essential Care' },
      { name: 'Premium Health', price: '₹1,499', coverage: '₹10,00,000', tag: 'Comprehensive', popular: true },
      { name: 'Elite Health', price: '₹2,499', coverage: '₹50,00,000', tag: 'Elite Cover' },
    ],
    features: ['Cashless Hospitals', 'Pre & Post Hospitalization', 'Day Care Procedures', 'Mental Health', 'Wellness Benefits'],
  },
  {
    id: 3,
    category: 'Business Insurance',
    icon: Building2,
    color: '#7C3AED',
    bgColor: 'rgba(124,58,237,0.08)',
    tagColor: '#7C3AED',
    plans: [
      { name: 'SME Shield', price: '₹2,999', coverage: '₹25,00,000', tag: 'For SMEs' },
      { name: 'Corporate Pack', price: '₹7,499', coverage: '₹1,00,00,000', tag: 'Enterprise', popular: true },
      { name: 'Global Business', price: 'Custom', coverage: 'Unlimited', tag: 'Enterprise+' },
    ],
    features: ['Property Damage', 'Public Liability', 'Employee Benefits', 'Trade Credit', 'Cyber Risk'],
  },
  {
    id: 4,
    category: 'Life Insurance',
    icon: Users,
    color: '#059669',
    bgColor: 'rgba(5,150,105,0.08)',
    tagColor: '#059669',
    plans: [
      { name: 'Term Life', price: '₹599', coverage: '₹50,00,000', tag: 'Pure Protection' },
      { name: 'Whole Life', price: '₹1,199', coverage: '₹1,00,00,000', tag: 'Lifetime Cover', popular: true },
      { name: 'ULIP Plan', price: '₹2,000', coverage: '₹2,00,00,000', tag: 'Invest + Protect' },
    ],
    features: ['Death Benefit', 'Critical Illness Rider', 'Accidental Cover', 'Waiver of Premium', 'Tax Benefits'],
  },
]

/* ─────────── PARTNER NETWORKS ─────────── */
const propertyPartners = [
  'AIG India', 'Bajaj Allianz', 'HDFC ERGO', 'ICICI Lombard',
  'New India Assurance', 'Oriental Insurance', 'Reliance General', 'SBI General',
  'Tata AIG', 'United India', 'National Insurance', 'Chola MS',
]
const lifePartners = [
  'LIC India', 'HDFC Life', 'ICICI Prudential', 'SBI Life',
  'Max Life', 'Bajaj Allianz Life', 'Kotak Life', 'Aditya Birla Life',
]

/* ─────────── NEWS TICKER ─────────── */
const newsItems = [
  'Travel insurance claims surge 40% post-COVID as travellers prioritize safety',
  'MyPartner now covers 180+ countries with instant policy issuance',
  'New family floater plans launched with enhanced maternity benefits',
  'Cashless hospital network expanded to 12,000+ hospitals across India',
  'Business travel insurance now includes cyber incident coverage',
]

/* ─────────── ANIMATED COUNTER ─────────── */
function AnimatedCounter({ value, suffix = '', duration = 2 }) {
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

/* ─────────── NEWS TICKER COMPONENT ─────────── */
function NewsTicker() {
  return (
    <div className="bg-[#8B2252] text-white py-3 overflow-hidden relative">
      <div className="flex items-center gap-4 px-4">
        <span className="flex-shrink-0 font-bold text-sm tracking-widest uppercase bg-white/20 px-3 py-1 rounded">
          NEWS
        </span>
        <div className="overflow-hidden flex-1">
          <motion.div
            animate={{ x: ['100%', '-100%'] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="whitespace-nowrap flex gap-12"
          >
            {[...newsItems, ...newsItems].map((item, i) => (
              <span key={i} className="text-sm font-medium opacity-90">
                {item}
                <span className="mx-8 opacity-40">•</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

/* ─────────── HERO CAROUSEL ─────────── */
function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timerRef = useRef(null)

  const goTo = useCallback((idx) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrent(idx)
      setIsTransitioning(false)
    }, 300)
  }, [isTransitioning])

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % heroSlides.length)
    }, 5500)
    return () => clearInterval(timerRef.current)
  }, [])

  const prev = () => {
    clearInterval(timerRef.current)
    goTo((current - 1 + heroSlides.length) % heroSlides.length)
  }
  const next = () => {
    clearInterval(timerRef.current)
    goTo((current + 1) % heroSlides.length)
  }

  const slide = heroSlides[current]

  return (
    <div className="relative w-full h-[500px] sm:h-[580px] lg:h-[640px] overflow-hidden bg-slate-900">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1547234935-80c7145ecba9?w=1920&q=80'
            }}
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${slide.accent} to-transparent`} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${current}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8B2252]/80 backdrop-blur-sm border border-white/20 mb-5">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span className="text-xs font-bold text-white tracking-wide uppercase">{slide.tag}</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5 drop-shadow-lg"
                  style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '-0.02em' }}>
                  {slide.title}
                </h1>
                <p className="text-base sm:text-lg text-white/85 leading-relaxed mb-8 max-w-xl">
                  {slide.subtitle}
                </p>
                <div className="flex flex-wrap gap-3">
                  <motion.a
                    href="#insurance-products"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#8B2252] text-white font-bold rounded-full shadow-2xl hover:bg-[#7a1d47] transition-all text-sm"
                  >
                    Explore Plans <ArrowRight className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    href="#contact-form"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/15 backdrop-blur-md text-white font-bold rounded-full border border-white/30 hover:bg-white/25 transition-all text-sm"
                  >
                    Get Quote <ChevronRight className="w-4 h-4" />
                  </motion.a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${i === current
              ? 'w-8 h-2.5 bg-[#8B2252]'
              : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Stats overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/60 to-transparent pb-14 pt-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-wrap gap-6 sm:gap-10">
            {[
              { v: 500, s: 'K+', l: 'Policies Issued' },
              { v: 180, s: '+', l: 'Countries Covered' },
              { v: 100, s: '+', l: 'Insurance Partners' },
              { v: 99, s: '%', l: 'Claim Satisfaction' },
            ].map((stat) => (
              <div key={stat.l} className="text-white">
                <p className="text-2xl sm:text-3xl font-extrabold">
                  <AnimatedCounter value={stat.v} suffix={stat.s} />
                </p>
                <p className="text-xs text-white/70 font-medium">{stat.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────── SCOPE OF SERVICES ─────────── */
function ScopeOfServices() {
  const [expanded, setExpanded] = useState(null)
  return (
    <section className="py-20 bg-white" id="scope-of-services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#8B2252] font-bold text-sm uppercase tracking-widest mb-3">What We Offer</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              SCOPE OF SERVICES
            </h2>
            <div className="w-16 h-1 bg-[#8B2252] mx-auto rounded-full mb-5" />
            <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
              <strong className="text-gray-800">MyPartner Insurance Brokers</strong> is the one-stop solution for Insurance and Risk Management Services in the Asia Pacific Region.
            </p>
          </motion.div>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group flex flex-col items-center text-center p-8 rounded-3xl border-2 border-transparent hover:border-[#8B2252]/20 bg-white hover:shadow-2xl transition-all duration-300"
            >
              {/* Circular icon with ring */}
              <div className="relative mb-6">
                <div
                  className="w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(139,34,82,0.06)', border: '2px solid rgba(139,34,82,0.25)' }}
                >
                  <service.icon
                    className="w-12 h-12 transition-all duration-300"
                    style={{ color: '#8B2252' }}
                    strokeWidth={1.5}
                  />
                </div>
                {/* Pulsing ring on hover */}
                <div className="absolute inset-0 rounded-full border-2 border-[#8B2252]/0 group-hover:border-[#8B2252]/30 scale-125 transition-all duration-500 opacity-0 group-hover:opacity-100" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#8B2252] transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{service.desc}</p>
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="mt-5 flex items-center gap-1 text-[#8B2252] text-sm font-semibold transition-all duration-300"
              >
                Learn More <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${expanded === i ? 'rotate-90' : ''}`} />
              </button>
              <AnimatePresence>
                {expanded === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden w-full"
                  >
                    <p className="text-sm text-gray-600 leading-relaxed mt-4 text-left bg-[#8B2252]/5 rounded-2xl p-4">
                      {service.details}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────── INSURANCE PRODUCTS SECTION ─────────── */
function InsuranceProductsSection() {
  const [activeTab, setActiveTab] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [paymentPlan, setPaymentPlan] = useState(null)

  const product = insuranceProducts[activeTab]

  return (
    <section className="py-20 bg-gray-50" id="insurance-products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#8B2252] font-bold text-sm uppercase tracking-widest mb-3">Our Plans</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              INSURANCE PRODUCTS
            </h2>
            <div className="w-16 h-1 bg-[#8B2252] mx-auto rounded-full mb-5" />
            <p className="text-gray-500 max-w-xl mx-auto text-base">
              Choose from our comprehensive range of insurance products designed to protect you, your family, and your business.
            </p>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {insuranceProducts.map((p, i) => (
            <motion.button
              key={p.id}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${activeTab === i
                ? 'bg-[#8B2252] text-white shadow-lg shadow-[#8B2252]/30'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-[#8B2252]/50 hover:text-[#8B2252]'
              }`}
            >
              <p.icon className="w-4 h-4" />
              {p.category}
            </motion.button>
          ))}
        </div>

        {/* Product Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Plans */}
            {product.plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className={`relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 ${plan.popular ? 'ring-2 ring-[#8B2252]' : 'border border-gray-100'}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 inset-x-0 bg-[#8B2252] text-white text-center text-xs font-bold py-2 uppercase tracking-wider">
                    ★ Most Popular
                  </div>
                )}

                <div className={`p-7 ${plan.popular ? 'pt-11' : ''}`}>
                  {/* Tag */}
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mb-4"
                    style={{ background: product.bgColor, color: product.color }}
                  >
                    {plan.tag}
                  </span>

                  {/* Plan name */}
                  <h3 className="text-xl font-extrabold text-gray-900 mb-1">{plan.name}</h3>
                  <p className="text-sm text-gray-400 mb-5">{product.category}</p>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                    <span className="text-sm text-gray-400">/ trip</span>
                  </div>
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold mb-6"
                    style={{ background: product.bgColor, color: product.color }}
                  >
                    <Shield className="w-3.5 h-3.5" />
                    Coverage: {plan.coverage}
                  </div>

                  {/* Features */}
                  <div className="space-y-2.5 mb-7">
                    {product.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: product.bgColor }}
                        >
                          <Check className="w-3 h-3" style={{ color: product.color }} strokeWidth={3} />
                        </div>
                        <span className="text-sm text-gray-600">{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedPlan({ ...plan, product })}
                    className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all ${plan.popular
                      ? 'bg-[#8B2252] text-white shadow-lg hover:shadow-[#8B2252]/40 hover:bg-[#7a1d47]'
                      : 'bg-gray-50 text-gray-800 border-2 border-gray-200 hover:border-[#8B2252] hover:text-[#8B2252] hover:bg-[#8B2252]/5'
                    }`}
                  >
                    Get This Plan
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Plan detail modal */}
      <AnimatePresence>
        {selectedPlan && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlan(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-white z-50 overflow-y-auto shadow-2xl"
            >
              <div className="sticky top-0 bg-white border-b border-gray-100 p-5 flex items-center justify-between">
                <div>
                  <p className="font-extrabold text-gray-900">{selectedPlan.name}</p>
                  <p className="text-xs text-gray-400">{selectedPlan.product?.category}</p>
                </div>
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="bg-gradient-to-br from-[#8B2252]/10 to-[#8B2252]/5 rounded-3xl p-6">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Premium Amount</p>
                  <p className="text-4xl font-extrabold text-gray-900">{selectedPlan.price}</p>
                  <p className="text-sm text-[#8B2252] font-semibold mt-1">Coverage: {selectedPlan.coverage}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-3">What's Included</p>
                  <div className="space-y-3">
                    {selectedPlan.product?.features.map((f) => (
                      <div key={f} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-[#8B2252] flex-shrink-0" />
                        <span className="text-sm text-gray-700">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() => { setPaymentPlan({ ...selectedPlan, product: selectedPlan.product }); setSelectedPlan(null) }}
                    className="w-full py-4 bg-[#8B2252] text-white font-bold rounded-2xl hover:bg-[#7a1d47] transition-all"
                  >
                    Buy Now & Pay
                  </button>
                  <button
                    onClick={() => setSelectedPlan(null)}
                    className="w-full py-4 bg-gray-100 text-gray-700 font-semibold rounded-2xl hover:bg-gray-200 transition-all"
                  >
                    Continue Browsing
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* RAZORPAY PAYMENT MODAL */}
      <PaymentModal
        isOpen={!!paymentPlan}
        onClose={() => setPaymentPlan(null)}
        bookingType="INSURANCE"
        bookingId={`INS-${paymentPlan?.product?.id || ''}-${paymentPlan?.name?.slice(0,3).toUpperCase() || ''}`}
        baseAmount={paymentPlan ? parseInt(String(paymentPlan.price).replace(/[^0-9]/g, '')) || 0 : 0}
        title={paymentPlan ? `${paymentPlan.name} - ${paymentPlan.product?.category || ''}` : 'Insurance Plan'}
        description={paymentPlan ? `Coverage: ${paymentPlan.coverage}` : ''}
        onSuccess={() => setPaymentPlan(null)}
      />
    </section>
  )
}

/* ─────────── WHY CHOOSE US ─────────── */
function WhyChooseUs() {
  const reasons = [
    {
      icon: Zap,
      title: 'Instant Policy Issuance',
      desc: 'Get your policy documents within minutes of payment. No waiting, no paperwork delays.',
    },
    {
      icon: Globe,
      title: '180+ Countries Coverage',
      desc: 'Truly global protection network with local expertise in every major destination.',
    },
    {
      icon: Stethoscope,
      title: '12,000+ Cashless Hospitals',
      desc: 'Access the largest cashless hospital network across India and internationally.',
    },
    {
      icon: Clock,
      title: '24×7 Emergency Support',
      desc: 'Round-the-clock emergency assistance with multilingual support teams worldwide.',
    },
    {
      icon: ShieldCheck,
      title: 'Trusted Partners',
      desc: 'We work exclusively with A-rated insurance carriers for maximum claim security.',
    },
    {
      icon: FileText,
      title: 'Paperless Claims',
      desc: 'File claims from your phone in minutes with our streamlined digital process.',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/insurance_partner_banner.png"
                alt="Insurance partners"
                className="w-full h-[440px] object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#8B2252]/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-extrabold text-2xl drop-shadow">Our Promise</p>
                <p className="text-white/80 text-sm mt-1">Your trust is our greatest asset</p>
              </div>
            </div>
            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#8B2252]/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#8B2252]" />
                </div>
                <div>
                  <p className="font-extrabold text-gray-900 text-sm">Top Rated</p>
                  <div className="flex gap-0.5 mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-extrabold text-gray-900 text-sm">500K+ Claims</p>
                  <p className="text-xs text-gray-400">Successfully settled</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#8B2252] font-bold text-sm uppercase tracking-widest mb-3">Why Us</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Why Choose MyPartner
            </h2>
            <div className="w-12 h-1 bg-[#8B2252] rounded-full mb-5" />
            <p className="text-gray-500 mb-8 text-base leading-relaxed">
              Trusted by 500,000+ travellers and businesses, we combine world-class insurance products with unparalleled service excellence.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reasons.map((r, i) => (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-gray-50 hover:bg-[#8B2252]/5 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#8B2252]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#8B2252]/20 transition-colors">
                    <r.icon className="w-5 h-5 text-[#8B2252]" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm mb-0.5">{r.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{r.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─────────── PARTNER NETWORK ─────────── */
function PartnerNetwork() {
  return (
    <section className="py-16 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-[#8B2252] font-bold text-sm uppercase tracking-widest mb-2">Our Network</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Trusted Insurance Partners
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Property / General Insurance */}
          <div className="bg-white rounded-3xl p-7 shadow-md border border-gray-100">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-extrabold text-gray-900">General / Property Insurance</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {propertyPartners.map((p) => (
                <span
                  key={p}
                  className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
          {/* Life Insurance */}
          <div className="bg-white rounded-3xl p-7 shadow-md border border-gray-100">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
                <Heart className="w-5 h-5 text-rose-600" />
              </div>
              <h3 className="font-extrabold text-gray-900">Life Insurance</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {lifePartners.map((p) => (
                <span
                  key={p}
                  className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────── CONTACT / INQUIRY FORM ─────────── */
function ContactInquiry() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    company: '', website: '', contact: '', phone: '', email: '', message: '', insuranceType: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 4000)
      setForm({ company: '', website: '', contact: '', phone: '', email: '', message: '', insuranceType: '' })
    }, 1800)
  }

  return (
    <section className="py-20 bg-white" id="contact-form">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Service inquiry info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#8B2252] font-bold text-sm uppercase tracking-widest mb-3">Get In Touch</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Service Inquiry
            </h2>
            <div className="w-12 h-1 bg-[#8B2252] rounded-full mb-6" />
            <p className="text-gray-500 mb-8 leading-relaxed">
              Our insurance specialists are ready to help you find the perfect coverage. Get in touch for a personalised consultation.
            </p>

            {/* Agent card */}
            <div className="bg-gradient-to-br from-[#8B2252]/8 to-[#8B2252]/4 rounded-3xl p-6 border border-[#8B2252]/15 mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-[#8B2252] flex items-center justify-center text-white font-extrabold text-xl shadow-lg">
                  MP
                </div>
                <div>
                  <p className="font-extrabold text-gray-900">MyPartner Support Team</p>
                  <p className="text-sm text-[#8B2252] font-semibold">Insurance Consultants</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-[#8B2252]" />
                  </div>
                  +91 1800-123-456 (Toll Free)
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-[#8B2252]" />
                  </div>
                  insurance@mypartner.com
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-[#8B2252]" />
                  </div>
                  Mon – Sat, 9:00 AM – 6:00 PM
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="space-y-2">
              {[
                { label: 'View All Insurance Products', action: () => document.getElementById('insurance-products')?.scrollIntoView({ behavior: 'smooth' }) },
                { label: 'Download Policy Documents', action: () => navigate('/app/support') },
                { label: 'Track Your Claim Status', action: () => navigate('/app/support') },
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={link.action}
                  className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl bg-gray-50 hover:bg-[#8B2252]/5 border border-gray-200 hover:border-[#8B2252]/30 text-sm font-semibold text-gray-700 hover:text-[#8B2252] transition-all group"
                >
                  {link.label}
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: Email Us Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-extrabold text-gray-900 mb-2">Email Us</h3>
              <p className="text-sm text-gray-500 mb-7">
                Please complete the form below. We will respond to your inquiry within 1 business day.
              </p>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-2xl mb-5"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-sm font-semibold text-green-800">
                      Message sent! Our team will contact you shortly.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Company Name</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Your Company"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B2252]/20 focus:border-[#8B2252]/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Website</label>
                    <input
                      type="url"
                      value={form.website}
                      onChange={(e) => setForm({ ...form, website: e.target.value })}
                      placeholder="https://yourcompany.com"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B2252]/20 focus:border-[#8B2252]/50 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Contact Person</label>
                  <input
                    type="text"
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    placeholder="Full Name"
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B2252]/20 focus:border-[#8B2252]/50 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B2252]/20 focus:border-[#8B2252]/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@company.com"
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B2252]/20 focus:border-[#8B2252]/50 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Insurance Type</label>
                  <select
                    value={form.insuranceType}
                    onChange={(e) => setForm({ ...form, insuranceType: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8B2252]/20 focus:border-[#8B2252]/50 transition-all appearance-none"
                  >
                    <option value="">Select Insurance Type</option>
                    <option value="travel">Travel Insurance</option>
                    <option value="health">Health Insurance</option>
                    <option value="life">Life Insurance</option>
                    <option value="business">Business Insurance</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your insurance needs..."
                    rows={4}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B2252]/20 focus:border-[#8B2252]/50 transition-all resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-4 bg-[#8B2252] text-white font-bold text-sm rounded-2xl shadow-lg hover:bg-[#7a1d47] disabled:opacity-60 transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  {submitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Inquiry
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─────────── TESTIMONIALS ─────────── */
function Testimonials() {
  const testimonials = [
    {
      name: 'Ravi Mehta',
      role: 'Business Traveller',
      text: 'MyPartner handled my emergency hospitalization abroad within 2 hours. Truly exceptional service and seamless cashless treatment.',
      rating: 5,
      avatar: 'RM',
    },
    {
      name: 'Priya Sharma',
      role: 'HR Manager',
      text: 'We enrolled our entire team on the corporate plan. The process was smooth and the coverage is comprehensive. Highly recommend!',
      rating: 5,
      avatar: 'PS',
    },
    {
      name: 'Arjun Kapoor',
      role: 'Frequent Flyer',
      text: 'The annual multi-trip plan is a game changer. I no longer worry about flight delays or lost baggage. Great peace of mind!',
      rating: 5,
      avatar: 'AK',
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-[#8B2252] to-[#5a1535] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-white/70 font-bold text-sm uppercase tracking-widest mb-3">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            What Our Customers Say
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-7 border border-white/20 hover:bg-white/15 transition-all"
            >
              <Quote className="w-8 h-8 text-white/30 mb-4" />
              <p className="text-white/90 text-sm leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center text-white font-extrabold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{t.name}</p>
                  <p className="text-white/60 text-xs">{t.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────── QUICK QUOTE BANNER ─────────── */
function QuickQuoteBanner() {
  const [destination, setDestination] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [travellers, setTravellers] = useState('1')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleQuote = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setDone(true)
      setTimeout(() => {
        setDone(false)
        document.getElementById('insurance-products')?.scrollIntoView({ behavior: 'smooth' })
      }, 1500)
    }, 1800)
  }

  return (
    <section className="py-12 bg-[#F8FAFC] border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#8B2252]/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#8B2252]" />
            </div>
            <div>
              <h3 className="font-extrabold text-gray-900">Get Instant Insurance Quote</h3>
              <p className="text-xs text-gray-500">Compare 100+ plans in seconds</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-1">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Destination</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Where to?"
                  className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B2252]/20 focus:border-[#8B2252]/50 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Start Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B2252]/20 focus:border-[#8B2252]/50 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">End Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B2252]/20 focus:border-[#8B2252]/50 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Travellers</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={travellers}
                  onChange={(e) => setTravellers(e.target.value)}
                  className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B2252]/20 focus:border-[#8B2252]/50 transition-all appearance-none"
                >
                  {[1, 2, 3, 4, 5, '6+'].map(n => <option key={n} value={n}>{n} Traveller{n !== 1 ? 's' : ''}</option>)}
                </select>
              </div>
            </div>
            <div className="flex items-end">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleQuote}
                disabled={loading || done}
                className="w-full py-3 bg-[#8B2252] text-white font-bold text-sm rounded-xl hover:bg-[#7a1d47] disabled:opacity-70 transition-all flex items-center justify-center gap-2 uppercase tracking-wider shadow-lg"
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Searching...
                  </>
                ) : done ? (
                  <><CheckCircle className="w-4 h-4" /> Done!</>
                ) : (
                  <>Get Quote <ArrowRight className="w-4 h-4" /></>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────── FLOATING CHAT BUTTON ─────────── */
function FloatingChat() {
  const [open, setOpen] = useState(false)
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-3 bg-white rounded-3xl shadow-2xl border border-gray-200 p-5 w-72"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#8B2252] flex items-center justify-center text-white text-xs font-bold">
                  MP
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">MyPartner Support</p>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-green-600 font-medium">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-3">Hi! 👋 How can we help you with insurance today?</p>
            <button
              onClick={() => { setOpen(false); document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="w-full py-2.5 bg-[#8B2252] text-white text-sm font-bold rounded-xl hover:bg-[#7a1d47] transition-all"
            >
              Send a Message
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-[#8B2252] text-white shadow-2xl flex items-center justify-center hover:bg-[#7a1d47] transition-all"
      >
        {open ? <X className="w-6 h-6" /> : <PhoneCall className="w-6 h-6" />}
      </motion.button>
    </div>
  )
}

/* ─────────── MAIN INSURANCE PAGE ─────────── */
export default function InsurancePage() {
  return (
    <div className="relative bg-white min-h-screen">
      {/* Hero Carousel (TW-Insure style) */}
      <HeroCarousel />

      {/* News Ticker */}
      <NewsTicker />

      {/* Quick Quote Bar */}
      <QuickQuoteBanner />

      {/* Scope of Services */}
      <ScopeOfServices />

      {/* Insurance Products */}
      <InsuranceProductsSection />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Testimonials */}
      <Testimonials />

      {/* Partner Network */}
      <PartnerNetwork />

      {/* Contact / Inquiry Form */}
      <ContactInquiry />

      {/* Floating Chat Button */}
      <FloatingChat />

      {/* Footer */}
      <div className="w-full">
        <img src="/f2.png" alt="Footer" className="w-full max-h-[250px] object-cover" />
      </div>
    </div>
  )
}
