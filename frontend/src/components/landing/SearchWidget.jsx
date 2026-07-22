import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plane, Hotel, Stamp, Package, MapPin, Calendar,
  Users, Search, ArrowLeftRight, Building2, Umbrella,
  ShieldCheck, Zap, BadgeCheck, Sparkles
} from 'lucide-react'

const tabs = [
  { id: 'flights', label: 'Flights', icon: Plane, activeColor: '#2563EB', activeBg: '#EFF6FF' },
  { id: 'hotels', label: 'Hotels', icon: Hotel, activeColor: '#EA580C', activeBg: '#FFF7ED' },
  { id: 'packages', label: 'Packages', icon: Package, activeColor: '#9333EA', activeBg: '#FAF5FF' },
  { id: 'insurance', label: 'Insurance', icon: Umbrella, activeColor: '#16A34A', activeBg: '#F0FDF4' },
  { id: 'visa', label: 'Visa', icon: Stamp, activeColor: '#CA8A04', activeBg: '#FEFCE8' },
]

const trustBadges = [
  { icon: BadgeCheck, text: 'No Hidden Charges' },
  { icon: ShieldCheck, text: '100% Secure Payments' },
  { icon: Zap, text: 'Instant Confirmation' },
  { icon: Sparkles, text: 'Best Price Guarantee' },
]

export default function SearchWidget() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('flights')
  const [tripType, setTripType] = useState('round-trip')
  const activeTabData = tabs.find(t => t.id === activeTab)

  return (
    <section className="relative -mt-8 z-20">
      <div className="container-max section-padding">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="glass-strong rounded-card shadow-floating overflow-hidden max-w-6xl mx-auto"
        >
          {/* Tabs */}
          <div className="flex items-center gap-1 px-2 pt-3 sm:px-3 bg-gradient-to-b from-white/40 to-white/20 border-b border-white/30 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-3 sm:px-5 py-3.5 text-sm font-bold rounded-t-2xl transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? 'bg-white/60 text-heading shadow-soft'
                      : 'text-text-secondary hover:text-heading hover:bg-white/30'
                  }`}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: isActive ? tab.activeColor : 'transparent',
                    }}
                  >
                    <tab.icon
                      className={`w-4 h-4 transition-colors duration-300 ${isActive ? 'text-white' : 'text-text-tertiary'}`}
                    />
                  </div>
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="searchTabUnderline"
                      className="absolute bottom-0 left-4 right-4 h-[3px] rounded-full"
                      style={{ backgroundColor: tab.activeColor }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Tab Content */}
          <div className="px-4 py-6 bg-white/30 sm:px-8 sm:py-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                {activeTab === 'flights' && <FlightSearch tripType={tripType} setTripType={setTripType} navigate={navigate} />}
                {activeTab === 'hotels' && <HotelSearch navigate={navigate} />}
                {activeTab === 'insurance' && <InsuranceSearch navigate={navigate} />}
                {activeTab === 'visa' && <VisaSearch navigate={navigate} />}
                {activeTab === 'packages' && <PackageSearch navigate={navigate} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-6">
          {trustBadges.map((badge) => (
            <div key={badge.text} className="flex items-center gap-2">
              <badge.icon className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-text-secondary">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Field({ icon: Icon, label, placeholder, className = '', type = 'text' }) {
  return (
    <div className={`flex-1 min-w-0 ${className}`}>
      <label className="block text-[11px] font-bold text-heading uppercase tracking-wider mb-2">{label}</label>
      <div className="relative group">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center transition-all group-hover:bg-primary group-hover:scale-110 group-focus-within:bg-primary">
            <Icon className="w-3 h-3 text-primary group-hover:text-white group-focus-within:text-white transition-colors" />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-3.5 bg-white/40 border-[1.5px] border-border rounded-xl text-heading text-sm font-medium placeholder:text-text-tertiary placeholder:font-normal focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 focus:bg-white/60 transition-all duration-200 hover:border-primary/30`}
        />
      </div>
    </div>
  )
}

function SearchButton({ children, gradient, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full lg:w-auto shrink-0 flex items-center justify-center gap-2.5 px-8 py-3.5 ${gradient} text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 active:scale-95 active:translate-y-0`}
    >
      <Search className="w-5 h-5" />
      {children}
    </button>
  )
}

function FlightSearch({ tripType, setTripType, navigate }) {
  const tripOptions = [
    { id: 'round-trip', label: 'Round Trip', icon: ArrowLeftRight },
    { id: 'one-way', label: 'One Way', icon: Plane },
    { id: 'multi-city', label: 'Multi City', icon: MapPin },
  ]

  return (
    <div>
      {/* Trip type selector */}
      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-1">
        {tripOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setTripType(opt.id)}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2 text-xs font-bold rounded-full border-[1.5px] transition-all duration-200 whitespace-nowrap ${
              tripType === opt.id
                ? 'gradient-bg text-white border-primary shadow-glow'
                : 'bg-white/40 text-text-secondary border-border hover:border-primary/40 hover:text-primary'
            }`}
          >
            <opt.icon className="w-3.5 h-3.5" />
            {opt.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-3 items-end">
        <Field icon={MapPin} label="From" placeholder="City or Airport" />
        <div className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full border-2 border-primary/20 bg-primary/10 text-primary shrink-0 hover:bg-primary hover:text-white hover:rotate-180 transition-all duration-300 cursor-pointer mb-1">
          <ArrowLeftRight className="w-4 h-4" />
        </div>
        <Field icon={MapPin} label="To" placeholder="City or Airport" />
        <Field icon={Calendar} label="Departure" placeholder="dd-mm-yyyy" type="date" />
        {tripType === 'round-trip' && <Field icon={Calendar} label="Return" placeholder="dd-mm-yyyy" type="date" />}
        <Field icon={Users} label="Passengers & Class" placeholder="1 Adult, Economy" />
        <SearchButton gradient="gradient-bg" onClick={() => navigate('/login')}>
          Search Flights
        </SearchButton>
      </div>
    </div>
  )
}

function HotelSearch({ navigate }) {
  return (
    <div className="flex flex-col lg:flex-row gap-3 items-end">
      <Field icon={Building2} label="City or Hotel" placeholder="Enter city, hotel, or area" className="lg:flex-[2]" />
      <Field icon={Calendar} label="Check-in" placeholder="dd-mm-yyyy" type="date" />
      <Field icon={Calendar} label="Check-out" placeholder="dd-mm-yyyy" type="date" />
      <Field icon={Users} label="Guests & Rooms" placeholder="2 Guests, 1 Room" />
      <SearchButton gradient="bg-gradient-to-r from-[#EA580C] to-[#C2410C]" onClick={() => navigate('/login')}>
        Search Hotels
      </SearchButton>
    </div>
  )
}

function InsuranceSearch({ navigate }) {
  return (
    <div className="flex flex-col lg:flex-row gap-3 items-end">
      <Field icon={MapPin} label="Destination" placeholder="Travel destination" className="lg:flex-[2]" />
      <Field icon={Calendar} label="Start Date" placeholder="dd-mm-yyyy" type="date" />
      <Field icon={Calendar} label="End Date" placeholder="dd-mm-yyyy" type="date" />
      <Field icon={Users} label="Travelers" placeholder="Number of travelers" />
      <SearchButton gradient="bg-gradient-to-r from-[#16A34A] to-[#15803D]" onClick={() => navigate('/login')}>
        Get Quote
      </SearchButton>
    </div>
  )
}

function VisaSearch({ navigate }) {
  return (
    <div className="flex flex-col lg:flex-row gap-3 items-end">
      <Field icon={MapPin} label="Destination Country" placeholder="Visa country" className="lg:flex-[2]" />
      <Field icon={MapPin} label="Applying From" placeholder="Your country" />
      <Field icon={Users} label="Visa Type" placeholder="Tourist / Business" />
      <Field icon={Users} label="Applicants" placeholder="Number of applicants" />
      <SearchButton gradient="bg-gradient-to-r from-[#CA8A04] to-[#A16207]" onClick={() => navigate('/login')}>
        Check Visa
      </SearchButton>
    </div>
  )
}

function PackageSearch({ navigate }) {
  return (
    <div className="flex flex-col lg:flex-row gap-3 items-end">
      <Field icon={MapPin} label="Destination" placeholder="Where to?" className="lg:flex-[2]" />
      <Field icon={Calendar} label="Travel Date" placeholder="dd-mm-yyyy" type="date" />
      <Field icon={Calendar} label="Duration" placeholder="No. of days" />
      <Field icon={Users} label="Travelers" placeholder="Number of travelers" />
      <SearchButton gradient="bg-gradient-to-r from-[#9333EA] to-[#7E22CE]" onClick={() => navigate('/login')}>
        Search Packages
      </SearchButton>
    </div>
  )
}
