import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Globe, Clock, CheckCircle2, FileText, ArrowRight,
  ChevronDown, MapPin, Shield, Zap, Phone, CreditCard, Award,
  BadgeCheck, Cpu, Plane, Calendar, X, Star
} from 'lucide-react'
import AnimatedBlobs from '../../components/ui/AnimatedBlobs.jsx'

const VISA_COUNTRIES = [
  { name: 'Thailand', flag: '\u{1F1F9}\u{1F1ED}', type: 'e-Visa', valid: '90 days', fee: '₹1,500', docs: ['Passport'], processing: '3-5 Days', img: 'https://images.unsplash.com/photo-1528181304800-e25fffa40b28?w=400&q=80&auto=format&fit=crop', popular: true },
  { name: 'United Arab Emirates', flag: '\u{1F1E6}\u{1F1EA}', type: 'e-Visa', valid: '60 days', fee: '₹5,500', docs: ['Photo', 'Passport'], processing: '3-5 Days', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80&auto=format&fit=crop', popular: true },
  { name: 'Singapore', flag: '\u{1F1F8}\u{1F1EC}', type: 'e-Visa', valid: '30 days', fee: '₹1,800', docs: ['Passport'], processing: '3-5 Days', img: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&q=80&auto=format&fit=crop', popular: false },
  { name: 'Malaysia', flag: '\u{1F1F2}\u{1F1FE}', type: 'e-Visa', valid: '30 days', fee: '₹2,200', docs: ['Passport'], processing: '5-7 Days', img: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&q=80&auto=format&fit=crop', popular: false },
  { name: 'Vietnam', flag: '\u{1F1FB}\u{1F1F3}', type: 'e-Visa', valid: '90 days', fee: '₹2,500', docs: ['Photo', 'Passport'], processing: '5-7 Days', img: 'https://images.unsplash.com/photo-1509010174408-7b3bb3c23c37?w=400&q=80&auto=format&fit=crop', popular: false },
  { name: 'Indonesia', flag: '\u{1F1EE}\u{1F1E9}', type: 'e-Visa', valid: '90 days', fee: '₹2,800', docs: ['Passport'], processing: '5-7 Days', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80&auto=format&fit=crop', popular: false },
  { name: 'Maldives', flag: '\u{1F1F2}\u{1F1FB}', type: 'e-Visa', valid: '30 days', fee: '₹3,500', docs: ['Passport'], processing: '5-7 Days', img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80&auto=format&fit=crop', popular: true },
  { name: 'Sri Lanka', flag: '\u{1F1F1}\u{1F1F0}', type: 'e-Visa', valid: '180 days', fee: '₹1,200', docs: ['Passport'], processing: '3-5 Days', img: 'https://images.unsplash.com/photo-1546708587-61c6ac3b4d94?w=400&q=80&auto=format&fit=crop', popular: false },
  { name: 'United States', flag: '\u{1F1FA}\u{1F1F8}', type: 'Sticker', valid: '10 years', fee: '₹13,200', docs: ['Passport'], processing: '7-15 Days', img: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=400&q=80&auto=format&fit=crop', popular: true },
  { name: 'United Kingdom', flag: '\u{1F1EC}\u{1F1E7}', type: 'Sticker', valid: '6 months', fee: '₹10,500', docs: ['Passport'], processing: '10-15 Days', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80&auto=format&fit=crop', popular: false },
  { name: 'Schengen', flag: '\u{1F1EA}\u{1F1FA}', type: 'Sticker', valid: '90 days', fee: '₹7,800', docs: ['Passport'], processing: '10-20 Days', img: 'https://images.unsplash.com/photo-1499856871958-e5b311639e12?w=400&q=80&auto=format&fit=crop', popular: true },
  { name: 'Australia', flag: '\u{1F1E6}\u{1F1FA}', type: 'e-Visa', valid: '12 months', fee: '₹9,500', docs: ['Passport'], processing: '15-25 Days', img: 'https://images.unsplash.com/photo-1524121751884-9c3826c0e9b2?w=400&q=80&auto=format&fit=crop', popular: false },
  { name: 'Japan', flag: '\u{1F1EF}\u{1F1F5}', type: 'Sticker', valid: '90 days', fee: '₹8,000', docs: ['ITR', 'Bank Statements', 'Photo', 'Passport'], processing: '7-10 Days', img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80&auto=format&fit=crop', popular: false },
  { name: 'Canada', flag: '\u{1F1E8}\u{1F1E6}', type: 'Sticker', valid: '6 months', fee: '₹6,500', docs: ['Passport'], processing: '15-30 Days', img: 'https://images.unsplash.com/photo-1503614472-8c93d0e87ec7?w=400&q=80&auto=format&fit=crop', popular: false },
  { name: 'Hong Kong', flag: '\u{1F1ED}\u{1F1F0}', type: 'e-Visa', valid: '180 days', fee: '₹1,600', docs: ['Passport'], processing: '5-7 Days', img: 'https://images.unsplash.com/photo-1536599018102-62f023de085d?w=400&q=80&auto=format&fit=crop', popular: false },
  { name: 'Egypt', flag: '\u{1F1EA}\u{1F1EC}', type: 'e-Visa', valid: '90 days', fee: '₹3,200', docs: ['Photo', 'Passport'], processing: '7-10 Days', img: 'https://images.unsplash.com/photo-1539650116534-9c6c66eb2f7c?w=400&q=80&auto=format&fit=crop', popular: false },
]

const documents = [
  'Valid Passport (6+ months validity)',
  'Passport-size photographs',
  'Bank statements (last 6 months)',
  'Travel itinerary & flight tickets',
  'Hotel booking confirmation',
  'Income tax returns (last 3 years)',
  'Employment letter / NOC',
  'Cover letter',
]

const STEPS = [
  { step: '01', title: 'Choose Destination', desc: 'Select from 120+ countries and pick the visa type that suits your travel needs.' },
  { step: '02', title: 'Upload Documents', desc: 'Upload your documents securely. We verify and process them with precision.' },
  { step: '03', title: 'Get Your Visa', desc: 'Receive your approved visa on time, guaranteed. Track status in real-time.' },
]

export default function VisaPage() {
  const [search, setSearch] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [visaType, setVisaType] = useState('All')
  const [showType, setShowType] = useState(false)
  const suggestRef = useRef(null)
  const typeRef = useRef(null)

  useEffect(() => {
    const handler = e => {
      if (suggestRef.current && !suggestRef.current.contains(e.target)) setShowSuggestions(false)
      if (typeRef.current && !typeRef.current.contains(e.target)) setShowType(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const filtered = VISA_COUNTRIES.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) &&
    (visaType === 'All' || v.type === visaType)
  )

  const filteredSugg = VISA_COUNTRIES.filter(v =>
    search.length > 0 && v.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen gradient-mesh relative">
      <AnimatedBlobs />

      {/*  HERO  */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=2000&q=100&auto=format&fit=crop"
            alt="Visa hero"
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=2000&q=100&auto=format&fit=crop' }}
          />
        </div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-3 drop-shadow-lg">
              Apply for Visas Online
            </h1>
            <p className="text-white text-lg font-medium drop-shadow-lg">
              120+ Countries &nbsp;&nbsp; Guaranteed On-Time Delivery
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="max-w-3xl mx-auto bg-white rounded-full shadow-2xl flex flex-wrap md:flex-nowrap items-center p-2 gap-1"
          >
            {/* Destination */}
            <div ref={suggestRef} className="relative flex-1 min-w-[45%] md:min-w-0">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-full focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/30 transition-all">
                <Globe className="w-4 h-4 text-primary flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search country..."
                  value={search}
                  onChange={e => { setSearch(e.target.value); setShowSuggestions(true) }}
                  onFocus={() => setShowSuggestions(true)}
                  className="w-full text-sm font-semibold text-gray-800 placeholder:text-gray-400 bg-transparent outline-none"
                />
                {search && (
                  <button onClick={() => setSearch('')}>
                    <X className="w-3.5 h-3.5 text-gray-400 hover:text-gray-700" />
                  </button>
                )}
              </div>
              <AnimatePresence>
                {showSuggestions && filteredSugg.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                    className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden"
                  >
                    {filteredSugg.map(v => (
                      <button
                        key={v.name}
                        onClick={() => { setSearch(v.name); setShowSuggestions(false) }}
                        className="flex items-center gap-2.5 w-full px-4 py-2.5 hover:bg-blue-50 text-left transition-colors"
                      >
                        <span className="text-xl">{v.flag}</span>
                        <span className="text-sm text-gray-700">{v.name}</span>
                        <span className="text-xs text-gray-400 ml-auto">{v.type}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Visa Type */}
            <div ref={typeRef} className="relative flex-1">
              <button
                onClick={() => setShowType(!showType)}
                className="w-full flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-all"
              >
                <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm font-semibold text-gray-700 flex-1 text-left">{visaType}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>
              <AnimatePresence>
                {showType && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                    className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden"
                  >
                    {['All', 'e-Visa', 'Sticker'].map(t => (
                      <button
                        key={t}
                        onClick={() => { setVisaType(t); setShowType(false) }}
                        className={`flex items-center justify-between w-full px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors ${visaType === t ? 'text-primary font-bold bg-blue-50' : 'text-gray-700'}`}
                      >
                        {t}
                        {visaType === t && <CheckCircle2 className="w-3.5 h-3.5 text-primary" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search Button */}
            <button className="w-12 h-12 shrink-0 gradient-bg text-white rounded-full flex items-center justify-center hover:shadow-glow transition-all active:scale-95">
              <Search className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>

      {/*  VISA CARDS  */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900">Popular Visas</h2>
            <p className="text-sm text-gray-500 mt-0.5">Apply for visas to 120+ countries with guaranteed on-time delivery</p>
          </div>
          <span className="text-sm font-semibold text-gray-400">{filtered.length} destinations</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden hover:shadow-floating hover:-translate-y-1 transition-all duration-300"
            >
              {/* Country image */}
              <div className="relative h-32 overflow-hidden">
                <img
                  src={v.img}
                  alt={v.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute top-3 left-3 text-3xl drop-shadow-lg">{v.flag}</span>
                {v.popular && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 bg-primary text-white text-[10px] font-bold rounded-full">Popular</span>
                )}
                <h3 className="absolute bottom-2 left-3 text-white font-bold text-base drop-shadow-lg">{v.name}</h3>
              </div>

              {/* Details */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-blue-50 text-primary text-xs font-bold rounded-md">{v.type}</span>
                  <span className="text-xs text-gray-400">Valid: {v.valid}</span>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Processing</span>
                    <span className="font-semibold text-gray-800">{v.processing}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> Documents</span>
                    <span className="font-semibold text-gray-800 text-xs">{v.docs.join(', ')}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-end justify-between mb-3">
                    <div>
                      <p className="text-xs text-gray-400">Visa Fee</p>
                      <p className="text-lg font-extrabold text-primary">{v.fee}</p>
                    </div>
                  </div>
                  <button className="w-full py-2.5 text-sm font-semibold text-white gradient-bg rounded-xl hover:shadow-glow transition-all flex items-center justify-center gap-2">
                    Apply Now <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <Globe className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-semibold">No visas match your search.</p>
            <button onClick={() => { setSearch(''); setVisaType('All') }} className="mt-3 text-primary text-sm font-bold hover:underline">
              Clear Search
            </button>
          </div>
        )}
      </section>

      {/*  HOW IT WORKS  */}
      <section className="bg-white border-t border-gray-100 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-extrabold text-gray-900 mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map(({ step, title, desc }) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="relative text-center p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:border-primary/30 hover:bg-blue-50/30 transition-all group"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-white text-xs font-extrabold flex items-center justify-center shadow-md">{step}</div>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 mt-2 group-hover:bg-primary/20 transition-colors">
                  {step === '01' && <Globe className="w-7 h-7 text-primary" />}
                  {step === '02' && <FileText className="w-7 h-7 text-primary" />}
                  {step === '03' && <CheckCircle2 className="w-7 h-7 text-primary" />}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/*  WHY CHOOSE US  */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
        <h2 className="text-xl font-extrabold text-gray-900 mb-6 text-center">Why Apply With Us?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { Icon: Shield, label: 'Guaranteed On-Time', sub: 'Visa delivery promise', color: 'text-blue-500 bg-blue-50' },
            { Icon: Zap, label: 'Fast Processing', sub: 'As quick as 24 hours', color: 'text-orange-500 bg-orange-50' },
            { Icon: CheckCircle2, label: '100% Approval', sub: 'Expert verification', color: 'text-green-500 bg-green-50' },
            { Icon: Phone, label: '24/7 Support', sub: 'Always here to help', color: 'text-purple-500 bg-purple-50' },
          ].map(({ Icon, label, sub, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 text-center hover:shadow-floating transition-all">
              <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mx-auto mb-3`}>
                <Icon className="w-6 h-6" />
              </div>
              <p className="font-bold text-gray-900 text-sm">{label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/*  DOCUMENTS REQUIRED  */}
      <section className="bg-white border-t border-gray-100 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Documents Required</h3>
              <p className="text-sm text-gray-500">Common documents needed for visa applications</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {documents.map((doc, i) => (
              <motion.div
                key={doc}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
              >
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span className="text-sm text-gray-700">{doc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/*  FOOTER TRUST  */}
      <footer className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-12">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80&auto=format&fit=crop"
          alt="Footer"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E40AF]/95 via-[#1D4ED8]/90 to-[#2563EB]/85" />
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
          {[
            { icon: CreditCard, title: 'We Accept', items: ['Visa','Mastercard','RuPay','UPI'] },
            { icon: Award, title: 'Member of', items: ['IATA','TAAI','ASTA','OTOAI'] },
            { icon: BadgeCheck, title: 'Certified By', items: ['ISO 27001','PCI DSS','GDPR','SSL'] },
            { icon: Cpu, title: 'Powered By', items: ['Amadeus','Travelport','Sabre','Booking.com'] },
          ].map(({ icon: Icon, title, items }) => (
            <div key={title} className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-5 hover:bg-white/15 transition-all">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm font-bold text-white">{title}</p>
              </div>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                {items.map(item => (
                  <span key={item} className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold rounded-lg transition-all">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </footer>

    </div>
  )
}
