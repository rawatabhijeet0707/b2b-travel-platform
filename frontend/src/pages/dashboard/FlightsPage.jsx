import { useState, memo, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plane, ArrowLeftRight, Calendar, Users, Clock, Star, Filter,
  ChevronRight, ChevronDown, X, Check, Wifi, Coffee, Briefcase, Leaf, Heart,
  Share2, GitCompare, TrendingUp, TrendingDown, Zap, Award, Sparkles, Target,
  Wallet, FileText, RefreshCw, Headphones, Bot, Plus, Minus, Building2,
  Navigation, RotateCw, Ticket, Ban, ArrowRight, ArrowUpRight, Info, Search,
} from 'lucide-react'
import AnimatedBlobs from '../../components/ui/AnimatedBlobs.jsx'

/* ─────────── DATA ─────────── */

const tripTypes = ['Round Trip', 'One Way', 'Multi City']
const fareTypes = ['Special Fare', 'Corporate Fare', 'Promo Code']

const airlineData = {
  EK: { name: 'Emirates', color: '#D71921', rating: 4.8, reviews: 2841 },
  QR: { name: 'Qatar Airways', color: '#5C068C', rating: 4.9, reviews: 3201 },
  AI: { name: 'Air India', color: '#ED1C24', rating: 4.5, reviews: 1856 },
  '6E': { name: 'IndiGo', color: '#0066B3', rating: 4.3, reviews: 4521 },
  UK: { name: 'Vistara', color: '#8B1A4D', rating: 4.7, reviews: 2103 },
  SG: { name: 'SpiceJet', color: '#E2001A', rating: 4.1, reviews: 3287 },
  EY: { name: 'Etihad', color: '#BD8B13', rating: 4.6, reviews: 1672 },
  SQ: { name: 'Singapore Airlines', color: '#F99F1C', rating: 4.9, reviews: 3401 },
  TG: { name: 'Thai Airways', color: '#711719', rating: 4.5, reviews: 1872 },
}

const sampleFlights = [
  // DEL → DXB
  { id: 1, code: 'EK', flightNo: 'EK517', aircraft: 'Boeing 777-300ER', from: 'DEL', fromCity: 'New Delhi', to: 'DXB', toCity: 'Dubai', depart: '08:30', arrive: '10:45', duration: '3h 15m', stops: 0, layover: '', terminal: 'T3', gate: 'B12', refundable: true, meal: true, cabinBag: '7kg', checkinBag: '30kg', wifi: true, carbon: 185, price: 18999, oldPrice: 24000, savings: 5001, seatPitch: '32"', type: 'Economy' },
  { id: 2, code: 'QR', flightNo: 'QR571', aircraft: 'Airbus A350-1000', from: 'DEL', fromCity: 'New Delhi', to: 'DXB', toCity: 'Dubai', depart: '04:00', arrive: '05:35', duration: '4h 05m', stops: 1, layover: 'DOH 1h 20m', terminal: 'T3', gate: 'A08', refundable: true, meal: true, cabinBag: '7kg', checkinBag: '30kg', wifi: true, carbon: 210, price: 16500, oldPrice: 19500, savings: 3000, seatPitch: '33"', type: 'Economy' },
  { id: 3, code: 'AI', flightNo: 'AI995', aircraft: 'Boeing 787-8', from: 'DEL', fromCity: 'New Delhi', to: 'DXB', toCity: 'Dubai', depart: '19:45', arrive: '22:15', duration: '3h 30m', stops: 0, layover: '', terminal: 'T3', gate: 'C15', refundable: false, meal: true, cabinBag: '7kg', checkinBag: '25kg', wifi: false, carbon: 192, price: 15499, oldPrice: 18000, savings: 2501, seatPitch: '31"', type: 'Economy' },
  { id: 4, code: '6E', flightNo: '6E-1801', aircraft: 'Airbus A320neo', from: 'DEL', fromCity: 'New Delhi', to: 'DXB', toCity: 'Dubai', depart: '06:00', arrive: '08:30', duration: '3h 30m', stops: 0, layover: '', terminal: 'T3', gate: 'D05', refundable: false, meal: false, cabinBag: '7kg', checkinBag: '15kg', wifi: false, carbon: 178, price: 12999, oldPrice: 15000, savings: 2001, seatPitch: '29"', type: 'Economy' },
  { id: 5, code: 'UK', flightNo: 'UK205', aircraft: 'Airbus A321neo', from: 'DEL', fromCity: 'New Delhi', to: 'DXB', toCity: 'Dubai', depart: '11:20', arrive: '13:50', duration: '3h 30m', stops: 0, layover: '', terminal: 'T3', gate: 'B07', refundable: true, meal: true, cabinBag: '7kg', checkinBag: '25kg', wifi: true, carbon: 180, price: 16799, oldPrice: 21000, savings: 4201, seatPitch: '32"', type: 'Economy' },
  { id: 6, code: 'EY', flightNo: 'EY223', aircraft: 'Boeing 787-9', from: 'DEL', fromCity: 'New Delhi', to: 'DXB', toCity: 'Dubai', depart: '09:45', arrive: '11:30', duration: '3h 15m', stops: 1, layover: 'AUH 45m', terminal: 'T3', gate: 'A11', refundable: true, meal: true, cabinBag: '7kg', checkinBag: '30kg', wifi: true, carbon: 195, price: 17200, oldPrice: 22000, savings: 4800, seatPitch: '33"', type: 'Economy' },
  // DEL → BKK (Delhi to Bangkok)
  { id: 7, code: 'TG', flightNo: 'TG317', aircraft: 'Boeing 787-9', from: 'DEL', fromCity: 'New Delhi', to: 'BKK', toCity: 'Bangkok', depart: '01:10', arrive: '06:55', duration: '4h 15m', stops: 0, layover: '', terminal: 'T3', gate: 'A14', refundable: true, meal: true, cabinBag: '7kg', checkinBag: '30kg', wifi: true, carbon: 245, price: 14200, oldPrice: 18500, savings: 4300, seatPitch: '33"', type: 'Economy' },
  { id: 8, code: 'AI', flightNo: 'AI332', aircraft: 'Boeing 787-8', from: 'DEL', fromCity: 'New Delhi', to: 'BKK', toCity: 'Bangkok', depart: '23:30', arrive: '05:10', duration: '4h 10m', stops: 0, layover: '', terminal: 'T3', gate: 'C09', refundable: false, meal: true, cabinBag: '7kg', checkinBag: '25kg', wifi: false, carbon: 238, price: 11999, oldPrice: 15500, savings: 3501, seatPitch: '31"', type: 'Economy' },
  { id: 9, code: '6E', flightNo: '6E-1083', aircraft: 'Airbus A320neo', from: 'DEL', fromCity: 'New Delhi', to: 'BKK', toCity: 'Bangkok', depart: '05:45', arrive: '11:30', duration: '4h 15m', stops: 0, layover: '', terminal: 'T3', gate: 'D12', refundable: false, meal: false, cabinBag: '7kg', checkinBag: '15kg', wifi: false, carbon: 230, price: 9999, oldPrice: 14000, savings: 4001, seatPitch: '29"', type: 'Economy' },
  { id: 10, code: 'SQ', flightNo: 'SQ403', aircraft: 'Airbus A350-900', from: 'DEL', fromCity: 'New Delhi', to: 'BKK', toCity: 'Bangkok', depart: '09:25', arrive: '15:20', duration: '5h 25m', stops: 1, layover: 'SIN 1h 10m', terminal: 'T3', gate: 'B05', refundable: true, meal: true, cabinBag: '7kg', checkinBag: '30kg', wifi: true, carbon: 268, price: 18999, oldPrice: 25000, savings: 6001, seatPitch: '34"', type: 'Economy' },
  { id: 11, code: 'EY', flightNo: 'EY211', aircraft: 'Boeing 787-9', from: 'DEL', fromCity: 'New Delhi', to: 'BKK', toCity: 'Bangkok', depart: '04:15', arrive: '10:05', duration: '5h 20m', stops: 1, layover: 'AUH 1h 05m', terminal: 'T3', gate: 'A03', refundable: true, meal: true, cabinBag: '7kg', checkinBag: '30kg', wifi: true, carbon: 260, price: 16500, oldPrice: 21000, savings: 4500, seatPitch: '33"', type: 'Economy' },
  { id: 12, code: 'QR', flightNo: 'QR570', aircraft: 'Airbus A350-1000', from: 'DEL', fromCity: 'New Delhi', to: 'BKK', toCity: 'Bangkok', depart: '02:40', arrive: '08:15', duration: '5h 05m', stops: 1, layover: 'DOH 55m', terminal: 'T3', gate: 'A07', refundable: true, meal: true, cabinBag: '7kg', checkinBag: '30kg', wifi: true, carbon: 255, price: 17800, oldPrice: 22500, savings: 4700, seatPitch: '33"', type: 'Economy' },
  // LKO → GOI (Lucknow to Goa)
  { id: 13, code: '6E', flightNo: '6E-6341', aircraft: 'Airbus A320neo', from: 'LKO', fromCity: 'Lucknow', to: 'GOI', toCity: 'Goa', depart: '06:20', arrive: '08:50', duration: '2h 30m', stops: 0, layover: '', terminal: 'T1', gate: 'B03', refundable: false, meal: false, cabinBag: '7kg', checkinBag: '15kg', wifi: false, carbon: 142, price: 5499, oldPrice: 8000, savings: 2501, seatPitch: '29"', type: 'Economy' },
  { id: 14, code: 'SG', flightNo: 'SG-8169', aircraft: 'Boeing 737-800', from: 'LKO', fromCity: 'Lucknow', to: 'GOI', toCity: 'Goa', depart: '09:15', arrive: '12:05', duration: '2h 50m', stops: 0, layover: '', terminal: 'T1', gate: 'A05', refundable: false, meal: true, cabinBag: '7kg', checkinBag: '20kg', wifi: false, carbon: 150, price: 6200, oldPrice: 9500, savings: 3300, seatPitch: '30"', type: 'Economy' },
  { id: 15, code: 'AI', flightNo: 'AI410', aircraft: 'Airbus A319', from: 'LKO', fromCity: 'Lucknow', to: 'GOI', toCity: 'Goa', depart: '14:30', arrive: '17:10', duration: '2h 40m', stops: 0, layover: '', terminal: 'T1', gate: 'C02', refundable: true, meal: true, cabinBag: '7kg', checkinBag: '25kg', wifi: false, carbon: 148, price: 7499, oldPrice: 11000, savings: 3501, seatPitch: '31"', type: 'Economy' },
  { id: 16, code: '6E', flightNo: '6E-7291', aircraft: 'Airbus A320neo', from: 'LKO', fromCity: 'Lucknow', to: 'GOI', toCity: 'Goa', depart: '11:45', arrive: '14:20', duration: '2h 35m', stops: 0, layover: '', terminal: 'T1', gate: 'B07', refundable: false, meal: false, cabinBag: '7kg', checkinBag: '15kg', wifi: false, carbon: 145, price: 4999, oldPrice: 7500, savings: 2501, seatPitch: '29"', type: 'Economy' },
  { id: 17, code: 'UK', flightNo: 'UK741', aircraft: 'Airbus A320neo', from: 'LKO', fromCity: 'Lucknow', to: 'GOI', toCity: 'Goa', depart: '17:55', arrive: '20:35', duration: '2h 40m', stops: 0, layover: '', terminal: 'T1', gate: 'D01', refundable: true, meal: true, cabinBag: '7kg', checkinBag: '25kg', wifi: true, carbon: 146, price: 8499, oldPrice: 12000, savings: 3501, seatPitch: '32"', type: 'Economy' },
]

const popularRoutes = [
  { from: 'Delhi', to: 'Dubai', price: '12,999', duration: '3h 15m', airlines: ['EK', 'AI', '6E'], image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80', trending: true },
  { from: 'Mumbai', to: 'Singapore', price: '18,500', duration: '5h 25m', airlines: ['SQ', 'AI', '6E'], image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=600&q=80', trending: true },
  { from: 'Delhi', to: 'Bangkok', price: '14,200', duration: '4h 15m', airlines: ['AI', 'TG', '6E'], image: 'https://images.unsplash.com/photo-1508009703815-7f01b4ddb045?w=600&q=80', trending: false },
  { from: 'Lucknow', to: 'Goa', price: '5,499', duration: '2h 45m', airlines: ['6E', 'SG'], image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7d2?w=600&q=80', trending: false },
  { from: 'Hyderabad', to: 'Bali', price: '28,999', duration: '8h 30m', airlines: ['AI', 'EY'], image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', trending: true },
]

const recentSearches = [
  { from: 'Delhi', to: 'Dubai', date: '20 Jul' },
  { from: 'Mumbai', to: 'Goa', date: '25 Jul' },
  { from: 'Delhi', to: 'Singapore', date: '15 Aug' },
  { from: 'Goa', to: 'Bangkok', date: '10 Sep' },
]

const fareCal = [
  { day: 'Mon', date: 15, fare: 12999, cheapest: true },
  { day: 'Tue', date: 16, fare: 13500, cheapest: false },
  { day: 'Wed', date: 17, fare: 12999, cheapest: true },
  { day: 'Thu', date: 18, fare: 14200, cheapest: false },
  { day: 'Fri', date: 19, fare: 18999, cheapest: false, weekend: true },
  { day: 'Sat', date: 20, fare: 19500, cheapest: false, weekend: true },
  { day: 'Sun', date: 21, fare: 15499, cheapest: false, weekend: true },
]

const routeImages = {
  'DEL-BKK': { image: 'https://images.unsplash.com/photo-1508009703815-7f01b4ddb045?w=1600&q=80', from: 'New Delhi', to: 'Bangkok', tag: 'Thailand' },
  'LKO-GOI': { image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7d2?w=1600&q=80', from: 'Lucknow', to: 'Goa', tag: 'India' },
  'DEL-DXB': { image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80', from: 'New Delhi', to: 'Dubai', tag: 'UAE' },
}

const filterSections = [
  { key: 'price', label: 'Price Range', icon: Wallet, type: 'slider', min: 5000, max: 50000, step: 1000 },
  { key: 'stops', label: 'Stops', icon: Plane, type: 'checkbox', options: ['Non-stop', '1 Stop', '2+ Stops'] },
  { key: 'airlines', label: 'Airlines', icon: Navigation, type: 'checkbox', options: ['Emirates', 'Qatar Airways', 'Air India', 'IndiGo', 'Vistara', 'Etihad'] },
  { key: 'depart', label: 'Departure Time', icon: Clock, type: 'checkbox', options: ['Early Morning (12AM-6AM)', 'Morning (6AM-12PM)', 'Afternoon (12PM-6PM)', 'Evening (6PM-12AM)'] },
  { key: 'refundable', label: 'Refundable', icon: RefreshCw, type: 'checkbox', options: ['Refundable', 'Non-Refundable'] },
  { key: 'meals', label: 'Meals & Baggage', icon: Coffee, type: 'checkbox', options: ['Meal Included', 'Free Cabin Bag', 'Extra Baggage'] },
]

/* ─────────── HERO ─────────── */

function HeroSection() {
  const stats = [
    { label: "Today's Bookings", value: '1,248', icon: Plane, color: 'text-blue-400' },
    { label: "Today's Revenue", value: '\u20B984.2L', icon: TrendingUp, color: 'text-green-400' },
    { label: 'Available Airlines', value: '800+', icon: Navigation, color: 'text-cyan-400' },
    { label: 'Avg. Savings', value: '23%', icon: Award, color: 'text-amber-400' },
  ]
  return (
    <div className="relative h-[500px] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80" alt="Airport" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-cyan-900/20" />
      </div>
      <motion.div animate={{ x: [0, 100, 0] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} className="absolute top-20 left-0 w-64 h-32 bg-white/5 rounded-full blur-3xl" />
      <motion.div animate={{ x: [0, -80, 0] }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }} className="absolute top-40 right-0 w-80 h-40 bg-white/5 rounded-full blur-3xl" />
      <motion.div initial={{ x: -100, y: 50, opacity: 0 }} animate={{ x: 200, y: -20, opacity: 0.15 }} transition={{ duration: 8, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }} className="absolute top-24 left-0"><Plane className="w-24 h-24 text-white -rotate-45" /></motion.div>
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" /><span className="text-xs font-semibold text-white">B2B Exclusive Pricing</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">Book Domestic & International Flights</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-base sm:text-lg text-white/70 mt-3 max-w-2xl mx-auto">Find the best fares with exclusive B2B pricing across 800+ airlines worldwide.</motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-wrap items-center justify-center gap-4 mt-6">
          {['10,000+ Travel Agents', 'Instant Ticketing', 'Best B2B Fare', '24x7 Support'].map((t, i) => (
            <motion.div key={t} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.1 }} className="flex items-center gap-1.5 text-sm text-white/80">
              <div className="w-4 h-4 rounded-full bg-green-400/20 flex items-center justify-center"><Check className="w-2.5 h-2.5 text-green-400" /></div>{t}
            </motion.div>
          ))}
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 max-w-3xl mx-auto">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }} whileHover={{ y: -3 }} className="glass-strong rounded-2xl p-3 border border-white/20">
              <s.icon className={`w-5 h-5 ${s.color} mx-auto mb-1.5`} /><p className="text-lg font-extrabold text-white">{s.value}</p><p className="text-[10px] text-white/60 font-medium">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

/* ─────────── SEARCH WIDGET ─────────── */

function SearchWidget({ onSearch }) {
  const [activeTrip, setActiveTrip] = useState(0)
  const [activeFare, setActiveFare] = useState(0)
  const [origin, setOrigin] = useState('Delhi (DEL)')
  const [destination, setDestination] = useState('Dubai (DXB)')
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedDate, setSelectedDate] = useState(17)
  const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0 })
  const [cabin, setCabin] = useState('Economy')
  const [showPax, setShowPax] = useState(false)
  const [searching, setSearching] = useState(false)
  const swap = () => { const t = origin; setOrigin(destination); setDestination(t) }
  const handleSearch = () => { setSearching(true); setTimeout(() => { setSearching(false); onSearch({ origin, destination }) }, 1500) }
  const totalPax = passengers.adults + passengers.children + passengers.infants

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="relative -mt-20 z-20 mx-auto max-w-6xl px-4">
      <div className="glass-strong rounded-[32px] shadow-floating border border-white/40 p-6 sm:p-8">
        <div className="flex gap-1 mb-6 p-1 bg-white/30 rounded-2xl w-fit">
          {tripTypes.map((t, i) => (
            <button key={t} onClick={() => setActiveTrip(i)} className={`relative px-5 py-2 text-sm font-semibold rounded-xl transition-all ${activeTrip === i ? 'text-white' : 'text-text-secondary hover:text-heading'}`}>
              {activeTrip === i && <motion.div layoutId="tripTab" className="absolute inset-0 gradient-bg rounded-xl shadow-glow" transition={{ type: 'spring', stiffness: 300, damping: 25 }} />}
              <span className="relative z-10">{t}</span>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          <div className="lg:col-span-3">
            <label className="block text-[10px] font-bold text-text-tertiary uppercase tracking-wider mb-1.5">From</label>
            <div className="relative group">
              <Plane className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary rotate-90 group-focus-within:text-primary transition-colors" />
              <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/50 rounded-2xl text-heading text-sm font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
            </div>
          </div>
          <div className="hidden lg:flex items-end justify-center pb-2">
            <motion.button whileHover={{ scale: 1.1, rotate: 180 }} whileTap={{ scale: 0.9 }} onClick={swap} className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white shadow-glow"><ArrowLeftRight className="w-4 h-4" /></motion.button>
          </div>
          <div className="lg:col-span-3">
            <label className="block text-[10px] font-bold text-text-tertiary uppercase tracking-wider mb-1.5">To</label>
            <div className="relative group">
              <Plane className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary -rotate-90 group-focus-within:text-primary transition-colors" />
              <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/50 rounded-2xl text-heading text-sm font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
            </div>
          </div>
          <div className="lg:col-span-2">
            <label className="block text-[10px] font-bold text-text-tertiary uppercase tracking-wider mb-1.5">Departure</label>
            <button onClick={() => setShowCalendar(!showCalendar)} className="w-full px-4 py-3 bg-white/50 border border-white/50 rounded-2xl text-heading text-sm font-semibold flex items-center gap-2 hover:border-primary transition-all"><Calendar className="w-4 h-4 text-text-tertiary" /><span>{selectedDate} Jul</span></button>
          </div>
          {activeTrip === 0 && (
            <div className="lg:col-span-2">
              <label className="block text-[10px] font-bold text-text-tertiary uppercase tracking-wider mb-1.5">Return</label>
              <button className="w-full px-4 py-3 bg-white/50 border border-white/50 rounded-2xl text-text-tertiary text-sm font-semibold flex items-center gap-2 hover:border-primary transition-all"><Calendar className="w-4 h-4" /><span>Add return</span></button>
            </div>
          )}
          <div className={activeTrip === 0 ? "lg:col-span-2" : "lg:col-span-4"}>
            <label className="block text-[10px] font-bold text-text-tertiary uppercase tracking-wider mb-1.5">Travellers & Cabin</label>
            <button onClick={() => setShowPax(!showPax)} className="w-full px-4 py-3 bg-white/50 border border-white/50 rounded-2xl text-heading text-sm font-semibold flex items-center gap-2 hover:border-primary transition-all"><Users className="w-4 h-4 text-text-tertiary" /><span>{totalPax} Pax, {cabin}</span><ChevronDown className="w-3.5 h-3.5 ml-auto text-text-tertiary" /></button>
            <AnimatePresence>
              {showPax && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute mt-2 right-4 w-72 glass-strong rounded-2xl border border-white/40 p-4 shadow-floating z-30">
                  {['adults', 'children', 'infants'].map(type => (
                    <div key={type} className="flex items-center justify-between py-2">
                      <div><p className="text-sm font-semibold text-heading capitalize">{type}</p><p className="text-[10px] text-text-tertiary">{type === 'adults' ? '12+ years' : type === 'children' ? '2-12 years' : 'Below 2 years'}</p></div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => setPassengers(p => ({ ...p, [type]: Math.max(type === 'adults' ? 1 : 0, p[type] - 1) }))} className="w-7 h-7 rounded-lg bg-white/50 border border-white/50 flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Minus className="w-3 h-3" /></button>
                        <span className="text-sm font-bold text-heading w-6 text-center">{passengers[type]}</span>
                        <button onClick={() => setPassengers(p => ({ ...p, [type]: p[type] + 1 }))} className="w-7 h-7 rounded-lg bg-white/50 border border-white/50 flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Plus className="w-3 h-3" /></button>
                      </div>
                    </div>
                  ))}
                  <div className="mt-3 pt-3 border-t border-white/30">
                    <p className="text-xs font-semibold text-text-secondary mb-2">Cabin Class</p>
                    <div className="flex flex-wrap gap-1.5">{['Economy', 'Premium', 'Business', 'First'].map(c => <button key={c} onClick={() => setCabin(c)} className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${cabin === c ? 'gradient-bg text-white shadow-glow' : 'bg-white/50 text-text-secondary hover:bg-white/70'}`}>{c}</button>)}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4">
          <div className="flex gap-1.5 flex-wrap items-center">
            {fareTypes.map((f, i) => (
              <button key={f} onClick={() => setActiveFare(activeFare === i ? -1 : i)} className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${activeFare === i ? 'gradient-bg text-white shadow-glow' : 'bg-white/40 text-text-secondary border border-white/50 hover:bg-white/60'}`}>{f}</button>
            ))}
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-red-500 text-white shadow-md hover:bg-red-600 transition-all">
              <Search className="w-3.5 h-3.5" /> PNR Status
            </motion.button>
          </div>
          <div className="flex-1" />
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSearch} disabled={searching} className="relative overflow-hidden inline-flex items-center justify-center gap-2 px-10 py-3.5 gradient-bg text-white font-bold rounded-2xl shadow-glow disabled:opacity-70 transition-all min-w-[200px]">
            {searching ? (<><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" /> Searching...</>) : (<>Search Flights <ArrowRight className="w-4 h-4" /></>)}
          </motion.button>
        </div>
        <AnimatePresence>
          {showCalendar && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mt-4">
              <div className="glass rounded-2xl border border-white/30 p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-bold text-heading">Fare Calendar - July 2024</p>
                  <div className="flex items-center gap-3 text-[10px]">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-green-400" />Cheapest</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" />Medium</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-400" />Expensive</span>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {fareCal.map((d, i) => (
                    <motion.button key={i} whileHover={{ y: -3 }} onClick={() => { setSelectedDate(d.date); setShowCalendar(false) }} className={`relative p-2.5 rounded-xl border transition-all ${selectedDate === d.date ? 'gradient-bg text-white border-transparent shadow-glow' : d.cheapest ? 'bg-green-50 border-green-200 text-heading' : d.weekend ? 'bg-red-50 border-red-200 text-heading' : 'bg-white/40 border-white/50 text-heading'}`}>
                      <p className="text-[10px] font-medium opacity-70">{d.day}</p><p className="text-sm font-bold">{d.date}</p>
                      <p className={`text-[10px] font-semibold ${selectedDate === d.date ? 'text-white/80' : d.cheapest ? 'text-green-600' : d.weekend ? 'text-red-500' : 'text-text-tertiary'}`}>{"\u20B9"}{(d.fare / 1000).toFixed(0)}K</p>
                      {d.cheapest && selectedDate !== d.date && <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-green-400" />}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

/* ─────────── PRICE INSIGHTS ─────────── */

function PriceInsights() {
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="glass-strong rounded-2xl border border-white/40 p-4 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2"><div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center"><TrendingDown className="w-4.5 h-4.5 text-green-600" /></div><div><p className="text-xs text-text-tertiary font-medium">Today's Lowest Fare</p><p className="text-lg font-extrabold text-heading">{"\u20B9"}12,999</p></div></div>
        <div className="flex items-center gap-2"><div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center"><TrendingUp className="w-4.5 h-4.5 text-blue-600" /></div><div><p className="text-xs text-text-tertiary font-medium">Price Trend</p><p className="text-sm font-bold text-heading flex items-center gap-1"><ArrowUpRight className="w-3.5 h-3.5 text-amber-500" /> Rising 8% / week</p></div></div>
        <div className="flex items-center gap-2"><div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center"><Zap className="w-4.5 h-4.5 text-amber-600" /></div><div><p className="text-xs text-text-tertiary font-medium">AI Prediction</p><p className="text-sm font-bold text-heading">Book Now - Expected +12% increase</p></div></div>
        <div className="hidden lg:block w-32 h-10"><svg viewBox="0 0 120 40" className="w-full h-full"><polyline points="0,30 20,25 40,28 60,15 80,18 100,8 120,5" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" /></svg></div>
      </div>
    </motion.div>
  )
}

/* ─────────── FILTERS ─────────── */

function SmartFilters({ filters, setFilters }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between"><h3 className="text-sm font-bold text-heading flex items-center gap-2"><Filter className="w-4 h-4 text-primary" /> Smart Filters</h3><button onClick={() => setFilters({})} className="text-xs text-primary font-semibold hover:underline">Clear All</button></div>
      {filterSections.map((section, si) => (
        <motion.div key={section.key} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: si * 0.05 }} className="glass-strong rounded-2xl border border-white/40 p-4">
          <div className="flex items-center gap-2 mb-3"><section.icon className="w-3.5 h-3.5 text-text-tertiary" /><p className="text-xs font-bold text-heading">{section.label}</p></div>
          {section.type === 'slider' ? (
            <div>
              <div className="flex items-center justify-between text-xs text-text-secondary mb-2"><span>{"\u20B9"}{(filters[section.key + 'Min'] || section.min).toLocaleString()}</span><span>{"\u20B9"}{(filters[section.key + 'Max'] || section.max).toLocaleString()}</span></div>
              <input type="range" min={section.min} max={section.max} step={section.step} value={filters[section.key + 'Max'] || section.max} onChange={(e) => setFilters({ ...filters, [section.key + 'Max']: parseInt(e.target.value) })} className="w-full accent-primary" />
            </div>
          ) : (
            <div className="space-y-2">
              {section.options.map(opt => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" checked={filters[section.key + '_' + opt] || false} onChange={(e) => setFilters({ ...filters, [section.key + '_' + opt]: e.target.checked })} className="w-4 h-4 rounded accent-primary" />
                  <span className="text-xs text-text-secondary group-hover:text-heading transition-colors">{opt}</span>
                </label>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

/* ─────────── FLIGHT CARD ─────────── */

const FlightCard = memo(function FlightCard({ flight, onExpand }) {
  const airline = airlineData[flight.code]
  const [liked, setLiked] = useState(false)
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -2 }} className="glass-strong rounded-2xl border border-white/40 shadow-card hover:shadow-floating transition-all overflow-hidden">
      <div className="p-4 sm:p-5">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
          <div className="flex items-center gap-3 lg:w-44 shrink-0">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ backgroundColor: airline.color }}>{flight.code}</div>
            <div className="min-w-0"><p className="text-sm font-bold text-heading truncate">{airline.name}</p><p className="text-[10px] text-text-tertiary">{flight.flightNo} · {flight.aircraft}</p><div className="flex items-center gap-0.5 mt-0.5"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /><span className="text-[10px] font-bold text-heading">{airline.rating}</span><span className="text-[10px] text-text-tertiary">({airline.reviews})</span></div></div>
          </div>
          <div className="flex items-center gap-3 sm:gap-5 flex-1">
            <div className="text-center"><p className="text-lg font-extrabold text-heading">{flight.depart}</p><p className="text-[10px] text-text-tertiary font-semibold">{flight.from} · {flight.terminal}</p></div>
            <div className="flex-1 flex flex-col items-center">
              <p className="text-[10px] text-text-tertiary font-medium">{flight.duration}</p>
              <div className="w-full flex items-center gap-1 my-1"><div className="w-1.5 h-1.5 rounded-full bg-primary" /><div className="flex-1 h-px bg-gradient-to-r from-primary/40 to-primary/40" /><Plane className="w-3 h-3 text-primary" /><div className="flex-1 h-px bg-gradient-to-r from-primary/40 to-primary/40" /><div className="w-1.5 h-1.5 rounded-full bg-primary" /></div>
              <p className="text-[10px] font-semibold text-text-secondary">{flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop · ${flight.layover}`}</p>
            </div>
            <div className="text-center"><p className="text-lg font-extrabold text-heading">{flight.arrive}</p><p className="text-[10px] text-text-tertiary font-semibold">{flight.to}</p></div>
          </div>
          <div className="flex flex-wrap gap-1 lg:w-32 shrink-0">
            {flight.refundable && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-green-600 bg-green-50 border border-green-200 flex items-center gap-0.5"><Check className="w-2 h-2" />Refund</span>}
            {flight.meal && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-blue-600 bg-blue-50 border border-blue-200 flex items-center gap-0.5"><Coffee className="w-2 h-2" />Meal</span>}
            {flight.wifi && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-purple-600 bg-purple-50 border border-purple-200 flex items-center gap-0.5"><Wifi className="w-2 h-2" />WiFi</span>}
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-amber-600 bg-amber-50 border border-amber-200 flex items-center gap-0.5"><Briefcase className="w-2 h-2" />{flight.checkinBag}</span>
          </div>
          <div className="flex items-center gap-3 lg:w-40 shrink-0 justify-between lg:justify-end">
            <div className="text-right">
              <div className="flex items-center gap-1.5 justify-end"><span className="text-xs text-text-tertiary line-through">{"\u20B9"}{flight.oldPrice.toLocaleString('en-IN')}</span><span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">-{"\u20B9"}{flight.savings.toLocaleString('en-IN')}</span></div>
              <p className="text-xl font-extrabold text-heading">{"\u20B9"}{flight.price.toLocaleString('en-IN')}</p><p className="text-[10px] text-text-tertiary">per person · {flight.type}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/30">
          <div className="flex items-center gap-3">
            <button onClick={() => onExpand(flight)} className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"><Info className="w-3 h-3" /> Flight Details</button>
            <span className="text-[10px] text-text-tertiary flex items-center gap-0.5"><Leaf className="w-2.5 h-2.5" />{flight.carbon}kg CO2</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setLiked(!liked)} className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${liked ? 'bg-red-50 text-red-500' : 'hover:bg-white/50 text-text-tertiary'}`}><Heart className={`w-3.5 h-3.5 ${liked ? 'fill-red-500' : ''}`} /></button>
            <button className="w-7 h-7 rounded-lg hover:bg-white/50 flex items-center justify-center text-text-tertiary"><Share2 className="w-3.5 h-3.5" /></button>
            <button className="w-7 h-7 rounded-lg hover:bg-white/50 flex items-center justify-center text-text-tertiary"><GitCompare className="w-3.5 h-3.5" /></button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-1 px-4 py-2 gradient-bg text-white text-xs font-bold rounded-xl shadow-glow">Book Now <ChevronRight className="w-3.5 h-3.5" /></motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
})

/* ─────────── FLIGHT DRAWER ─────────── */

function FlightDrawer({ flight, onClose }) {
  return (
    <AnimatePresence>
      {flight && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-white z-50 overflow-y-auto shadow-2xl">
            {(() => {
              const airline = airlineData[flight.code]
              return (
                <>
                  <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex items-center justify-between z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: airline.color }}>{flight.code}</div>
                      <div><p className="text-sm font-bold text-heading">{airline.name} · {flight.flightNo}</p><p className="text-xs text-text-tertiary">{flight.aircraft}</p></div>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center"><X className="w-4 h-4 text-text-secondary" /></button>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="bg-slate-50 rounded-2xl p-4">
                      <h4 className="text-xs font-bold text-heading mb-4">Flight Timeline</h4>
                      <div className="space-y-4">
                        <div className="flex gap-3"><div className="flex flex-col items-center"><div className="w-3 h-3 rounded-full bg-green-500" /><div className="w-0.5 h-16 bg-slate-200" /></div><div className="flex-1"><p className="text-sm font-bold text-heading">{flight.depart} · {flight.fromCity}</p><p className="text-xs text-text-tertiary">Terminal {flight.terminal} · Gate {flight.gate}</p><p className="text-[10px] text-text-tertiary mt-1">Departure</p></div></div>
                        <div className="flex gap-3"><div className="flex flex-col items-center"><div className="w-3 h-3 rounded-full bg-blue-500" /></div><div className="flex-1"><p className="text-sm font-bold text-heading">{flight.duration} · {flight.stops === 0 ? 'Non-stop' : flight.layover}</p><p className="text-xs text-text-tertiary">{flight.aircraft} · Seat Pitch {flight.seatPitch}</p>{flight.wifi && <p className="text-[10px] text-purple-600 mt-1 flex items-center gap-0.5"><Wifi className="w-2.5 h-2.5" /> WiFi Available</p>}</div></div>
                        <div className="flex gap-3"><div className="flex flex-col items-center"><div className="w-3 h-3 rounded-full bg-red-500" /></div><div className="flex-1"><p className="text-sm font-bold text-heading">{flight.arrive} · {flight.toCity}</p><p className="text-xs text-text-tertiary">Local time</p><p className="text-[10px] text-text-tertiary mt-1">Arrival</p></div></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[{ label: 'Meal', value: flight.meal ? 'Included' : 'Not included', icon: Coffee }, { label: 'Cabin Bag', value: flight.cabinBag, icon: Briefcase }, { label: 'Check-in Bag', value: flight.checkinBag, icon: Briefcase }, { label: 'Refundable', value: flight.refundable ? 'Yes' : 'No', icon: RefreshCw }, { label: 'Seat Pitch', value: flight.seatPitch, icon: Users }, { label: 'Carbon', value: `${flight.carbon}kg CO2`, icon: Leaf }].map(d => (
                        <div key={d.label} className="p-3 bg-slate-50 rounded-xl"><p className="text-[10px] text-text-tertiary flex items-center gap-1 mb-0.5"><d.icon className="w-2.5 h-2.5" />{d.label}</p><p className="text-sm font-bold text-heading">{d.value}</p></div>
                      ))}
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-4">
                      <h4 className="text-xs font-bold text-heading mb-3">Fare Rules & Policy</h4>
                      <div className="space-y-2 text-xs text-text-secondary">
                        <div className="flex items-start gap-2"><Check className="w-3 h-3 text-green-500 mt-0.5 shrink-0" /><span>Cancellation: {flight.refundable ? 'Refundable with \u20B91,500 fee' : 'Non-refundable'}</span></div>
                        <div className="flex items-start gap-2"><Check className="w-3 h-3 text-green-500 mt-0.5 shrink-0" /><span>Date Change: Allowed with \u20B92,000 fee</span></div>
                        <div className="flex items-start gap-2"><Check className="w-3 h-3 text-green-500 mt-0.5 shrink-0" /><span>Name Change: Not permitted</span></div>
                        <div className="flex items-start gap-2"><Check className="w-3 h-3 text-green-500 mt-0.5 shrink-0" /><span>No-show: Ticket forfeited</span></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 gradient-bg rounded-2xl">
                      <div><p className="text-xs text-white/70">Total Price</p><p className="text-2xl font-extrabold text-white">{"\u20B9"}{flight.price.toLocaleString('en-IN')}</p><p className="text-[10px] text-white/60">per person · {flight.type}</p></div>
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-3 bg-white text-primary text-sm font-bold rounded-xl shadow-lg">Book Now</motion.button>
                    </div>
                  </div>
                </>
              )
            })()}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ─────────── AI RECOMMENDATIONS ─────────── */

function AIRecommendations({ onExpand, flights }) {
  const recs = useMemo(() => {
    if (!flights || flights.length === 0) return []
    const sorted = [...flights]
    const cheapest = sorted.sort((a, b) => a.price - b.price)[0]
    const fastest = [...flights].sort((a, b) => {
      const parseDur = (d) => { const h = parseInt(d.match(/(\d+)h/)?.[1] || 0); const m = parseInt(d.match(/(\d+)m/)?.[1] || 0); return h * 60 + m }
      return parseDur(a.duration) - parseDur(b.duration)
    })[0]
    const bestValue = [...flights].sort((a, b) => (a.price / (a.stops === 0 ? 1 : 1.5)) - (b.price / (b.stops === 0 ? 1 : 1.5)))[0]
    const business = [...flights].sort((a, b) => (b.wifi ? 1 : 0) + (b.meal ? 1 : 0) + (b.refundable ? 1 : 0) - ((a.wifi ? 1 : 0) + (a.meal ? 1 : 0) + (a.refundable ? 1 : 0)))[0]
    return [
      { tag: 'Best Value', icon: Award, color: 'from-amber-400 to-orange-500', flight: bestValue, desc: 'Best price-to-duration ratio' },
      { tag: 'Fastest', icon: Zap, color: 'from-blue-400 to-cyan-500', flight: fastest, desc: 'Shortest flight time' },
      { tag: 'Cheapest', icon: TrendingDown, color: 'from-green-400 to-emerald-500', flight: cheapest, desc: 'Lowest fare available' },
      { tag: 'Business', icon: Briefcase, color: 'from-purple-400 to-violet-500', flight: business, desc: 'Best for business travel' },
    ].filter(r => r.flight)
  }, [flights])
  if (recs.length === 0) return null
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-primary" /><h3 className="text-sm font-bold text-heading">AI Recommendations</h3></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {recs.map((rec, i) => (
          <motion.button key={rec.tag} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -3 }} onClick={() => onExpand(rec.flight)} className="glass-strong rounded-2xl border border-white/40 p-4 text-left shadow-card hover:shadow-floating transition-all group">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${rec.color} flex items-center justify-center mb-3`}><rec.icon className="w-4.5 h-4.5 text-white" /></div>
            <p className="text-xs font-bold text-primary mb-0.5">{rec.tag}</p>
            <p className="text-sm font-bold text-heading">{airlineData[rec.flight.code].name}</p>
            <p className="text-[10px] text-text-tertiary">{rec.flight.depart} → {rec.flight.arrive} · {rec.flight.duration}</p>
            <p className="text-xs text-text-secondary mt-2">{rec.desc}</p>
            <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/30"><p className="text-base font-extrabold text-heading">{"\u20B9"}{rec.flight.price.toLocaleString('en-IN')}</p><ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" /></div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

/* ─────────── POPULAR ROUTES ─────────── */

function PopularRoutes() {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-heading">Popular Routes</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {popularRoutes.map((r, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }} className="relative rounded-2xl overflow-hidden shadow-card hover:shadow-floating transition-all group cursor-pointer h-44">
            <img src={r.image} alt={`${r.from} to ${r.to}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            {r.trending && <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full text-white bg-red-500 flex items-center gap-0.5"><Zap className="w-2.5 h-2.5 fill-white" />Trending</span>}
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p className="text-sm font-bold text-white">{r.from} → {r.to}</p><p className="text-[10px] text-white/70">{r.duration}</p>
              <div className="flex items-center justify-between mt-2"><p className="text-base font-extrabold text-white">{"\u20B9"}{r.price}</p><div className="flex -space-x-1">{r.airlines.map(a => <div key={a} className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center text-[8px] font-bold text-white" style={{ backgroundColor: airlineData[a]?.color || '#2563EB' }}>{a}</div>)}</div></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ─────────── RECENT SEARCHES ─────────── */

function RecentSearches() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold text-text-tertiary">Recent:</span>
      {recentSearches.map((s, i) => (
        <motion.button key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -2, scale: 1.03 }} className="inline-flex items-center gap-1.5 px-3 py-1.5 glass rounded-full border border-white/40 text-xs font-semibold text-heading hover:border-primary transition-all">
          <Plane className="w-3 h-3 text-primary" />{s.from} → {s.to} <span className="text-text-tertiary">· {s.date}</span>
        </motion.button>
      ))}
    </div>
  )
}

/* ─────────── AGENT PANEL ─────────── */

function AgentPanel() {
  const stats = [
    { label: 'Wallet Balance', value: '\u20B92,48,500', icon: Wallet, color: 'text-green-600 bg-green-50' },
    { label: 'Credit Limit', value: '\u20B950,000', icon: Target, color: 'text-blue-600 bg-blue-50' },
    { label: "Today's Commission", value: '\u20B94,250', icon: TrendingUp, color: 'text-purple-600 bg-purple-50' },
    { label: 'Pending Tickets', value: '3', icon: Ticket, color: 'text-amber-600 bg-amber-50' },
  ]
  const actions = [
    { label: 'Quick Booking', icon: Zap }, { label: 'Import PNR', icon: FileText }, { label: 'Issue Ticket', icon: Ticket },
    { label: 'Reissue', icon: RotateCw }, { label: 'Refund', icon: RefreshCw }, { label: 'Offline Booking', icon: Building2 },
  ]
  return (
    <div className="space-y-3">
      <div className="glass-strong rounded-2xl border border-white/40 p-4 shadow-card">
        <div className="flex items-center gap-2 mb-3"><Building2 className="w-4 h-4 text-primary" /><h3 className="text-sm font-bold text-heading">Agent Information</h3></div>
        <div className="grid grid-cols-2 gap-2">
          {stats.map(s => (
            <div key={s.label} className="p-2.5 bg-white/40 rounded-xl"><div className={`w-7 h-7 rounded-lg ${s.color} flex items-center justify-center mb-1.5`}><s.icon className="w-3.5 h-3.5" /></div><p className="text-[10px] text-text-tertiary">{s.label}</p><p className="text-sm font-bold text-heading">{s.value}</p></div>
          ))}
        </div>
      </div>
      <div className="glass-strong rounded-2xl border border-white/40 p-4 shadow-card">
        <p className="text-xs font-bold text-heading mb-3">Quick Actions</p>
        <div className="grid grid-cols-2 gap-2">
          {actions.map(a => (
            <motion.button key={a.label} whileHover={{ y: -2 }} className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-white/40 border border-white/50 hover:border-primary transition-all"><div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center"><a.icon className="w-4 h-4 text-primary" /></div><span className="text-[10px] font-semibold text-heading text-center">{a.label}</span></motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────── LOADING SKELETON ─────────── */

function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="glass-strong rounded-2xl border border-white/40 p-5 overflow-hidden">
          <div className="flex items-center gap-4"><div className="w-11 h-11 rounded-xl bg-slate-200 animate-pulse" /><div className="flex-1 space-y-2"><div className="h-3 w-32 bg-slate-200 animate-pulse rounded" /><div className="h-2 w-24 bg-slate-200 animate-pulse rounded" /></div><div className="h-8 w-20 bg-slate-200 animate-pulse rounded-xl" /></div>
          <div className="flex items-center justify-between mt-4"><div className="h-2 w-40 bg-slate-200 animate-pulse rounded" /><div className="h-8 w-24 bg-slate-200 animate-pulse rounded-xl" /></div>
        </div>
      ))}
    </div>
  )
}

/* ─────────── EMPTY STATE ─────────── */

function EmptyState() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-strong rounded-2xl border border-white/40 p-12 text-center shadow-card">
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="inline-flex w-20 h-20 rounded-3xl bg-primary/10 items-center justify-center mb-4"><Plane className="w-10 h-10 text-primary" /></motion.div>
      <h3 className="text-lg font-bold text-heading">Ready to take off?</h3>
      <p className="text-text-secondary mt-2 max-w-md mx-auto text-sm">Enter your travel details above and search to browse available flights with exclusive B2B rates from 800+ airlines.</p>
      <div className="flex flex-wrap justify-center gap-2 mt-6">
        {['Delhi → Dubai', 'Mumbai → Singapore', 'Delhi → Bangkok'].map(r => <button key={r} className="px-3 py-1.5 text-xs font-semibold glass rounded-full border border-white/40 text-heading hover:border-primary transition-all">{r}</button>)}
      </div>
    </motion.div>
  )
}

/* ─────────── QUICK ACTION BAR ─────────── */

function QuickActionBar() {
  const actions = [
    { label: 'Book Flight', icon: Plane, color: 'from-blue-500 to-cyan-500' }, { label: 'Group Booking', icon: Users, color: 'from-purple-500 to-violet-500' },
    { label: 'Import PNR', icon: FileText, color: 'from-amber-500 to-orange-500' }, { label: 'Void Ticket', icon: Ban, color: 'from-red-500 to-rose-500' },
    { label: 'Refund', icon: RefreshCw, color: 'from-green-500 to-emerald-500' }, { label: 'Support', icon: Headphones, color: 'from-indigo-500 to-blue-500' },
    { label: 'AI Assistant', icon: Bot, color: 'from-pink-500 to-rose-500' },
  ]
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="fixed bottom-4 right-4 z-40 hidden lg:block">
      <div className="glass-strong rounded-2xl border border-white/40 p-2 shadow-floating flex items-center gap-1">
        {actions.map(a => (
          <motion.button key={a.label} whileHover={{ y: -3 }} className="group flex flex-col items-center gap-1 p-2.5 rounded-xl hover:bg-white/50 transition-all">
            <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${a.color} flex items-center justify-center shadow-soft`}><a.icon className="w-4 h-4 text-white" /></div>
            <span className="text-[9px] font-semibold text-text-secondary group-hover:text-heading transition-colors">{a.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

/* ─────────── MAIN PAGE ─────────── */

export default function FlightsPage() {
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({})
  const [drawerFlight, setDrawerFlight] = useState(null)
  const [searchParams, setSearchParams] = useState({ origin: '', destination: '' })
  const handleSearch = (params) => { setSearchParams(params); setLoading(true); setSearched(true); setTimeout(() => setLoading(false), 1500) }
  const filteredFlights = useMemo(() => {
    const extractCode = (s) => { const m = s.match(/\((\w+)\)/); return m ? m[1] : '' }
    const fromCode = extractCode(searchParams.origin)
    const toCode = extractCode(searchParams.destination)
    if (!fromCode && !toCode) return sampleFlights
    return sampleFlights.filter(f => (!fromCode || f.from === fromCode) && (!toCode || f.to === toCode))
  }, [searchParams])

  return (
    <div className="relative min-h-screen gradient-mesh">
      <AnimatedBlobs />
      <HeroSection />
      <SearchWidget onSearch={handleSearch} />
      <div className="relative max-w-7xl mx-auto px-4 py-8 space-y-6">
        <RecentSearches />
        {searched ? (
          <>
            <PriceInsights />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1"><div className="sticky top-24"><SmartFilters filters={filters} setFilters={setFilters} /></div></div>
              <div className="lg:col-span-3 space-y-3">
                {/* Route Image Banner */}
                {(() => {
                  const extractCode = (s) => { const m = s.match(/\((\w+)\)/); return m ? m[1] : '' }
                  const fromCode = extractCode(searchParams.origin)
                  const toCode = extractCode(searchParams.destination)
                  const routeKey = `${fromCode}-${toCode}`
                  const routeData = routeImages[routeKey]
                  if (!routeData) return null
                  return (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="relative rounded-2xl overflow-hidden shadow-card h-44 mb-3">
                      <img src={routeData.image} alt={`${routeData.from} to ${routeData.to}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                      <div className="absolute inset-0 flex items-center px-6">
                        <div>
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[10px] font-bold text-white mb-2">{routeData.tag}</span>
                          <h3 className="text-2xl font-extrabold text-white drop-shadow-lg">{routeData.from} → {routeData.to}</h3>
                          <p className="text-sm text-white/80 mt-1">{filteredFlights.length} flights available · Best B2B fares</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })()}
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-heading">{filteredFlights.length} flights found · {searchParams.origin} → {searchParams.destination}</p>
                  <select className="px-3 py-2 text-xs font-semibold bg-white/50 border border-white/50 rounded-xl text-heading focus:outline-none focus:border-primary"><option>Sort by: Best Value</option><option>Sort by: Cheapest</option><option>Sort by: Fastest</option><option>Sort by: Departure Time</option></select>
                </div>
                {loading ? <LoadingSkeleton /> : filteredFlights.length > 0 ? <AnimatePresence>{filteredFlights.map(flight => <FlightCard key={flight.id} flight={flight} onExpand={setDrawerFlight} />)}</AnimatePresence> : <EmptyState />}
              </div>
            </div>
            <AIRecommendations onExpand={setDrawerFlight} flights={filteredFlights} />
          </>
        ) : (
          <>
            <EmptyState />
            <AIRecommendations onExpand={setDrawerFlight} flights={sampleFlights} />
          </>
        )}
        <PopularRoutes />
        <div className="hidden lg:block">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2"><PopularRoutes /></div>
            <div><AgentPanel /></div>
          </div>
        </div>
      </div>
      <QuickActionBar />
      <FlightDrawer flight={drawerFlight} onClose={() => setDrawerFlight(null)} />
    </div>
  )
}