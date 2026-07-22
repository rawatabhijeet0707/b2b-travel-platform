import { useState, memo, useMemo, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Plane, ArrowLeftRight, Calendar, Users, Clock, Star, Filter,
  ChevronRight, ChevronDown, X, Check, Wifi, Coffee, Briefcase, Leaf, Heart,
  Share2, TrendingUp, TrendingDown, Zap, Award, Sparkles,
  Wallet, RefreshCw, Headphones, Bot, Plus, Minus,
  Navigation, Ticket, ArrowRight, ArrowUpRight, Info, Search,
  ShieldCheck, Globe, MapPin, BadgeCheck, Flame, SlidersHorizontal,
} from 'lucide-react'
import PaymentModal from '../../components/payment/PaymentModal.jsx'

/* ═══════════ AIRLINE DATA ═══════════ */
const AIRLINES = {
  EK:  { name: 'Emirates',           color: '#D71921', bg: '#fff0f0', logo: '🇦🇪', rating: 4.8, reviews: 2841 },
  QR:  { name: 'Qatar Airways',      color: '#5C068C', bg: '#f5f0ff', logo: '🇶🇦', rating: 4.9, reviews: 3201 },
  AI:  { name: 'Air India',          color: '#ED1C24', bg: '#fff0f0', logo: '🇮🇳', rating: 4.5, reviews: 1856 },
  '6E':{ name: 'IndiGo',             color: '#0066B3', bg: '#f0f7ff', logo: '✈️', rating: 4.3, reviews: 4521 },
  UK:  { name: 'Vistara',            color: '#8B1A4D', bg: '#fff0f6', logo: '🇮🇳', rating: 4.7, reviews: 2103 },
  SG:  { name: 'SpiceJet',           color: '#E2001A', bg: '#fff0f0', logo: '🌶️', rating: 4.1, reviews: 3287 },
  EY:  { name: 'Etihad Airways',     color: '#BD8B13', bg: '#fffbf0', logo: '🇦🇪', rating: 4.6, reviews: 1672 },
  SQ:  { name: 'Singapore Airlines', color: '#F99F1C', bg: '#fffbf0', logo: '🇸🇬', rating: 4.9, reviews: 3401 },
  TG:  { name: 'Thai Airways',       color: '#711719', bg: '#fff0f0', logo: '🇹🇭', rating: 4.5, reviews: 1872 },
}

/* ═══════════ FLIGHT DATA ═══════════ */
const ALL_FLIGHTS = [
  { id:1,  code:'EK', no:'EK517',   ac:'Boeing 777-300ER',  from:'DEL',fromC:'New Delhi',  to:'DXB',toC:'Dubai',      dep:'08:30',arr:'10:45',dur:'3h 15m',stops:0,lay:'',       term:'T3',gate:'B12',ref:true, meal:true, cbag:'7kg',chbag:'30kg',wifi:true, co2:185,price:18999,old:24000,save:5001,pitch:'32"',cls:'Economy' },
  { id:2,  code:'QR', no:'QR571',   ac:'Airbus A350-1000',  from:'DEL',fromC:'New Delhi',  to:'DXB',toC:'Dubai',      dep:'04:00',arr:'05:35',dur:'4h 05m',stops:1,lay:'DOH 1h20m',term:'T3',gate:'A08',ref:true, meal:true, cbag:'7kg',chbag:'30kg',wifi:true, co2:210,price:16500,old:19500,save:3000,pitch:'33"',cls:'Economy' },
  { id:3,  code:'AI', no:'AI995',   ac:'Boeing 787-8',      from:'DEL',fromC:'New Delhi',  to:'DXB',toC:'Dubai',      dep:'19:45',arr:'22:15',dur:'3h 30m',stops:0,lay:'',       term:'T3',gate:'C15',ref:false,meal:true, cbag:'7kg',chbag:'25kg',wifi:false,co2:192,price:15499,old:18000,save:2501,pitch:'31"',cls:'Economy' },
  { id:4,  code:'6E', no:'6E-1801', ac:'Airbus A320neo',    from:'DEL',fromC:'New Delhi',  to:'DXB',toC:'Dubai',      dep:'06:00',arr:'08:30',dur:'3h 30m',stops:0,lay:'',       term:'T3',gate:'D05',ref:false,meal:false,cbag:'7kg',chbag:'15kg',wifi:false,co2:178,price:12999,old:15000,save:2001,pitch:'29"',cls:'Economy' },
  { id:5,  code:'UK', no:'UK205',   ac:'Airbus A321neo',    from:'DEL',fromC:'New Delhi',  to:'DXB',toC:'Dubai',      dep:'11:20',arr:'13:50',dur:'3h 30m',stops:0,lay:'',       term:'T3',gate:'B07',ref:true, meal:true, cbag:'7kg',chbag:'25kg',wifi:true, co2:180,price:16799,old:21000,save:4201,pitch:'32"',cls:'Economy' },
  { id:6,  code:'EY', no:'EY223',   ac:'Boeing 787-9',      from:'DEL',fromC:'New Delhi',  to:'DXB',toC:'Dubai',      dep:'09:45',arr:'11:30',dur:'3h 15m',stops:1,lay:'AUH 45m',term:'T3',gate:'A11',ref:true, meal:true, cbag:'7kg',chbag:'30kg',wifi:true, co2:195,price:17200,old:22000,save:4800,pitch:'33"',cls:'Economy' },
  { id:7,  code:'TG', no:'TG317',   ac:'Boeing 787-9',      from:'DEL',fromC:'New Delhi',  to:'BKK',toC:'Bangkok',    dep:'01:10',arr:'06:55',dur:'4h 15m',stops:0,lay:'',       term:'T3',gate:'A14',ref:true, meal:true, cbag:'7kg',chbag:'30kg',wifi:true, co2:245,price:14200,old:18500,save:4300,pitch:'33"',cls:'Economy' },
  { id:8,  code:'AI', no:'AI332',   ac:'Boeing 787-8',      from:'DEL',fromC:'New Delhi',  to:'BKK',toC:'Bangkok',    dep:'23:30',arr:'05:10',dur:'4h 10m',stops:0,lay:'',       term:'T3',gate:'C09',ref:false,meal:true, cbag:'7kg',chbag:'25kg',wifi:false,co2:238,price:11999,old:15500,save:3501,pitch:'31"',cls:'Economy' },
  { id:9,  code:'6E', no:'6E-1083', ac:'Airbus A320neo',    from:'DEL',fromC:'New Delhi',  to:'BKK',toC:'Bangkok',    dep:'05:45',arr:'11:30',dur:'4h 15m',stops:0,lay:'',       term:'T3',gate:'D12',ref:false,meal:false,cbag:'7kg',chbag:'15kg',wifi:false,co2:230,price:9999, old:14000,save:4001,pitch:'29"',cls:'Economy' },
  { id:10, code:'SQ', no:'SQ403',   ac:'Airbus A350-900',   from:'DEL',fromC:'New Delhi',  to:'BKK',toC:'Bangkok',    dep:'09:25',arr:'15:20',dur:'5h 25m',stops:1,lay:'SIN 1h10m',term:'T3',gate:'B05',ref:true, meal:true, cbag:'7kg',chbag:'30kg',wifi:true, co2:268,price:18999,old:25000,save:6001,pitch:'34"',cls:'Economy' },
  { id:11, code:'EY', no:'EY211',   ac:'Boeing 787-9',      from:'DEL',fromC:'New Delhi',  to:'BKK',toC:'Bangkok',    dep:'04:15',arr:'10:05',dur:'5h 20m',stops:1,lay:'AUH 1h5m',term:'T3',gate:'A03',ref:true, meal:true, cbag:'7kg',chbag:'30kg',wifi:true, co2:260,price:16500,old:21000,save:4500,pitch:'33"',cls:'Economy' },
  { id:12, code:'QR', no:'QR570',   ac:'Airbus A350-1000',  from:'DEL',fromC:'New Delhi',  to:'BKK',toC:'Bangkok',    dep:'02:40',arr:'08:15',dur:'5h 05m',stops:1,lay:'DOH 55m', term:'T3',gate:'A07',ref:true, meal:true, cbag:'7kg',chbag:'30kg',wifi:true, co2:255,price:17800,old:22500,save:4700,pitch:'33"',cls:'Economy' },
  { id:13, code:'6E', no:'6E-6341', ac:'Airbus A320neo',    from:'LKO',fromC:'Lucknow',    to:'GOI',toC:'Goa',        dep:'06:20',arr:'08:50',dur:'2h 30m',stops:0,lay:'',       term:'T1',gate:'B03',ref:false,meal:false,cbag:'7kg',chbag:'15kg',wifi:false,co2:142,price:5499, old:8000, save:2501,pitch:'29"',cls:'Economy' },
  { id:14, code:'SG', no:'SG-8169', ac:'Boeing 737-800',    from:'LKO',fromC:'Lucknow',    to:'GOI',toC:'Goa',        dep:'09:15',arr:'12:05',dur:'2h 50m',stops:0,lay:'',       term:'T1',gate:'A05',ref:false,meal:true, cbag:'7kg',chbag:'20kg',wifi:false,co2:150,price:6200, old:9500, save:3300,pitch:'30"',cls:'Economy' },
  { id:15, code:'AI', no:'AI410',   ac:'Airbus A319',       from:'LKO',fromC:'Lucknow',    to:'GOI',toC:'Goa',        dep:'14:30',arr:'17:10',dur:'2h 40m',stops:0,lay:'',       term:'T1',gate:'C02',ref:true, meal:true, cbag:'7kg',chbag:'25kg',wifi:false,co2:148,price:7499, old:11000,save:3501,pitch:'31"',cls:'Economy' },
  { id:16, code:'6E', no:'6E-7291', ac:'Airbus A320neo',    from:'LKO',fromC:'Lucknow',    to:'GOI',toC:'Goa',        dep:'11:45',arr:'14:20',dur:'2h 35m',stops:0,lay:'',       term:'T1',gate:'B07',ref:false,meal:false,cbag:'7kg',chbag:'15kg',wifi:false,co2:145,price:4999, old:7500, save:2501,pitch:'29"',cls:'Economy' },
  { id:17, code:'UK', no:'UK741',   ac:'Airbus A320neo',    from:'LKO',fromC:'Lucknow',    to:'GOI',toC:'Goa',        dep:'17:55',arr:'20:35',dur:'2h 40m',stops:0,lay:'',       term:'T1',gate:'D01',ref:true, meal:true, cbag:'7kg',chbag:'25kg',wifi:true, co2:146,price:8499, old:12000,save:3501,pitch:'32"',cls:'Economy' },
]

/* ═══════════ POPULAR ROUTES ═══════════ */
const ROUTES = [
  { from:'Delhi',    to:'Dubai',     price:'12,999', dur:'3h 15m', img:'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=90', hot:true  },
  { from:'Mumbai',   to:'Singapore', price:'18,500', dur:'5h 25m', img:'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=90', hot:true  },
  { from:'Delhi',    to:'Bangkok',   price:'9,999',  dur:'4h 15m', img:'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=600&q=90', hot:false },
  { from:'Lucknow',  to:'Goa',       price:'4,999',  dur:'2h 30m', img:'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=90', hot:false },
  { from:'Hyderabad',to:'Bali',      price:'28,999', dur:'8h 30m', img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=90', hot:true  },
  { from:'Delhi',    to:'London',    price:'52,999', dur:'9h 30m', img:'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=90', hot:false },
]

/* ═══════════ FARE CALENDAR ═══════════ */
const FARE_CAL = [
  { day:'Mon', date:15, fare:12999, cheap:true },
  { day:'Tue', date:16, fare:13500, cheap:false },
  { day:'Wed', date:17, fare:12999, cheap:true },
  { day:'Thu', date:18, fare:14200, cheap:false },
  { day:'Fri', date:19, fare:18999, cheap:false, wknd:true },
  { day:'Sat', date:20, fare:19500, cheap:false, wknd:true },
  { day:'Sun', date:21, fare:15499, cheap:false, wknd:true },
]

/* ═══════════════════════════════════════════
   HERO SECTION
═══════════════════════════════════════════ */
function Hero() {
  return (
    <div className="relative h-[420px] sm:h-[480px] overflow-hidden">
      {/* BG Image */}
      <img
        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920&q=90"
        alt="Flights"
        className="w-full h-full object-cover"
        onError={e => e.target.src='https://images.unsplash.com/photo-1569154941061-e231b4aa8eda?w=1920&q=80'}
      />
      {/* layered gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f2c]/80 via-[#0a0f2c]/50 to-[#0a0f2c]/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-transparent" />

      {/* animated plane */}
      <motion.div
        initial={{ x: -120, y: 60, opacity: 0 }}
        animate={{ x: '110vw', y: -20, opacity: [0, 0.25, 0.25, 0] }}
        transition={{ duration: 9, repeat: Infinity, repeatDelay: 4, ease: 'linear' }}
        className="absolute top-28 left-0 z-10 pointer-events-none"
      >
        <Plane className="w-14 h-14 text-white -rotate-12 drop-shadow-2xl" />
      </motion.div>

      {/* floating glow orbs */}
      <motion.div animate={{ scale: [1,1.15,1], opacity:[0.2,0.35,0.2] }} transition={{ duration:5, repeat:Infinity }}
        className="absolute top-16 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <motion.div animate={{ scale: [1,1.1,1], opacity:[0.15,0.3,0.15] }} transition={{ duration:7, repeat:Infinity, delay:2 }}
        className="absolute bottom-8 right-1/4 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />

      {/* content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center z-10">
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 border border-white/20"
          style={{ background:'rgba(37,99,235,0.5)', backdropFilter:'blur(12px)' }}>
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span className="text-white text-xs font-bold tracking-widest uppercase">B2B Exclusive Pricing</span>
        </motion.div>

        <motion.h1 initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3 drop-shadow-2xl"
          style={{ fontFamily:"'Poppins',sans-serif", letterSpacing:'-0.02em' }}>
          Fly Anywhere.<br />
          <span style={{ WebkitTextFillColor:'transparent', WebkitBackgroundClip:'text', backgroundImage:'linear-gradient(135deg, #60a5fa, #34d399)' }}>
            Best Fares.
          </span>
        </motion.h1>

        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}
          className="text-white/70 text-base sm:text-lg mb-7">
          800+ airlines · Instant ticketing · Exclusive B2B rates · 24×7 support
        </motion.p>

        {/* feature pills */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-6">
          {['10,000+ Travel Agents','Instant Ticketing','Best B2B Fare','24×7 Support'].map(t => (
            <div key={t} className="flex items-center gap-1.5 text-xs text-white/80 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/15">
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-400/30 flex items-center justify-center">
                <Check className="w-2 h-2 text-emerald-400" strokeWidth={3} />
              </div>
              {t}
            </div>
          ))}
        </motion.div>

        {/* stat mini cards */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4 }}
          className="flex flex-wrap justify-center gap-3">
          {[
            { label:"Today's Bookings", val:'1,248', icon:Ticket, col:'#60a5fa' },
            { label:"Today's Revenue",  val:'₹84.2L', icon:TrendingUp, col:'#34d399' },
            { label:'Airlines',         val:'800+',  icon:Globe,     col:'#a78bfa' },
            { label:'Avg. Savings',     val:'23%',   icon:Award,     col:'#fbbf24' },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border border-white/15"
              style={{ background:'rgba(255,255,255,0.08)', backdropFilter:'blur(12px)' }}>
              <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background:`${s.col}25` }}>
                <s.icon className="w-3.5 h-3.5" style={{ color:s.col }} />
              </div>
              <div>
                <p className="text-white font-extrabold text-sm leading-none">{s.val}</p>
                <p className="text-white/50 text-[10px] mt-0.5">{s.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   SEARCH WIDGET
═══════════════════════════════════════════ */
function SearchWidget({ onSearch }) {
  const tripTypes = ['Round Trip','One Way','Multi City']
  const [activeTrip, setActiveTrip] = useState(0)
  const [origin, setOrigin]  = useState('Delhi (DEL)')
  const [dest, setDest]      = useState('Dubai (DXB)')
  const [date, setDate]      = useState(17)
  const [showCal, setShowCal]= useState(false)
  const [pax, setPax]        = useState({ adults:1, children:0, infants:0 })
  const [cabin, setCabin]    = useState('Economy')
  const [showPax, setShowPax]= useState(false)
  const [loading, setLoading]= useState(false)

  const swap = () => { const t = origin; setOrigin(dest); setDest(t) }
  const totalPax = pax.adults + pax.children + pax.infants
  const handleSearch = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); onSearch({ origin, dest }) }, 1500)
  }

  return (
    <motion.div initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
      className="relative -mt-16 z-20 mx-auto max-w-6xl px-4">
      <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-100 p-6 sm:p-8">
        {/* Trip type tabs */}
        <div className="flex gap-1 mb-6 p-1 bg-gray-100 rounded-2xl w-fit">
          {tripTypes.map((t,i) => (
            <button key={t} onClick={() => setActiveTrip(i)}
              className={`relative px-5 py-2 text-sm font-bold rounded-xl transition-all ${activeTrip===i ? 'text-white shadow-lg' : 'text-gray-500 hover:text-gray-800'}`}
              style={activeTrip===i ? { background:'linear-gradient(135deg,#1d4ed8,#2563eb)' } : {}}>
              {t}
            </button>
          ))}
        </div>

        {/* Inputs row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-4">
          {/* Origin */}
          <div className="lg:col-span-3">
            <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">From</label>
            <div className="relative group">
              <Plane className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 rotate-90" />
              <input value={origin} onChange={e => setOrigin(e.target.value)}
                className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl text-gray-900 text-sm font-bold focus:outline-none focus:border-blue-500 focus:bg-white transition-all" />
            </div>
          </div>

          {/* Swap */}
          <div className="hidden lg:flex items-end justify-center pb-1.5">
            <motion.button whileHover={{ rotate:180, scale:1.1 }} whileTap={{ scale:0.9 }}
              onClick={swap}
              className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg hover:bg-blue-700 transition-colors">
              <ArrowLeftRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Destination */}
          <div className="lg:col-span-3">
            <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">To</label>
            <div className="relative group">
              <Plane className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 -rotate-90" />
              <input value={dest} onChange={e => setDest(e.target.value)}
                className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl text-gray-900 text-sm font-bold focus:outline-none focus:border-blue-500 focus:bg-white transition-all" />
            </div>
          </div>

          {/* Departure */}
          <div className="lg:col-span-2">
            <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">Departure</label>
            <button onClick={() => setShowCal(!showCal)}
              className="w-full flex items-center gap-2 px-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl text-gray-900 text-sm font-bold hover:border-blue-500 transition-all">
              <Calendar className="w-4 h-4 text-blue-500" />
              {date} Jul
            </button>
          </div>

          {/* Return (round trip only) */}
          {activeTrip === 0 && (
            <div className="lg:col-span-2">
              <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">Return</label>
              <button className="w-full flex items-center gap-2 px-4 py-3.5 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 text-sm font-semibold hover:border-blue-400 transition-all">
                <Calendar className="w-4 h-4" />
                Add date
              </button>
            </div>
          )}

          {/* Pax + Cabin */}
          <div className={activeTrip===0 ? 'lg:col-span-2' : 'lg:col-span-4'}>
            <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1.5">Travellers & Class</label>
            <div className="relative">
              <button onClick={() => setShowPax(!showPax)}
                className="w-full flex items-center gap-2 px-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl text-gray-900 text-sm font-bold hover:border-blue-500 transition-all">
                <Users className="w-4 h-4 text-blue-500" />
                {totalPax} Pax, {cabin}
                <ChevronDown className={`w-3.5 h-3.5 ml-auto text-gray-400 transition-transform ${showPax?'rotate-180':''}`} />
              </button>
              <AnimatePresence>
                {showPax && (
                  <motion.div initial={{ opacity:0, y:-8, scale:0.96 }} animate={{ opacity:1, y:0, scale:1 }}
                    exit={{ opacity:0, y:-8, scale:0.96 }}
                    className="absolute top-full mt-2 right-0 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-40">
                    {['adults','children','infants'].map(type => (
                      <div key={type} className="flex items-center justify-between py-2.5">
                        <div>
                          <p className="text-sm font-bold text-gray-900 capitalize">{type}</p>
                          <p className="text-[10px] text-gray-400">{type==='adults'?'12+ yrs':type==='children'?'2-12 yrs':'Below 2 yrs'}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setPax(p => ({...p,[type]:Math.max(type==='adults'?1:0,p[type]-1)}))}
                            className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-blue-100 hover:text-blue-600 transition-all font-bold text-gray-600">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-extrabold text-gray-900 w-6 text-center">{pax[type]}</span>
                          <button onClick={() => setPax(p => ({...p,[type]:p[type]+1}))}
                            className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-blue-100 hover:text-blue-600 transition-all font-bold text-gray-600">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Cabin Class</p>
                      <div className="flex flex-wrap gap-1.5">
                        {['Economy','Premium Economy','Business','First'].map(c => (
                          <button key={c} onClick={() => setCabin(c)}
                            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${cabin===c?'bg-blue-600 text-white shadow-md':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Fare Calendar */}
        <AnimatePresence>
          {showCal && (
            <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }}
              exit={{ opacity:0, height:0 }} className="overflow-hidden mb-4">
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" /> Fare Calendar – July 2024
                  </p>
                  <div className="flex items-center gap-3 text-[10px]">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400" />Cheapest</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" />Moderate</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400" />Weekend</span>
                  </div>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {FARE_CAL.map(d => (
                    <motion.button key={d.date} whileHover={{ y:-3 }}
                      onClick={() => { setDate(d.date); setShowCal(false) }}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${
                        date===d.date ? 'border-blue-600 bg-blue-600 text-white shadow-lg' :
                        d.cheap ? 'border-emerald-200 bg-emerald-50 hover:border-emerald-400' :
                        d.wknd  ? 'border-red-200 bg-red-50 hover:border-red-400' :
                        'border-gray-200 bg-white hover:border-blue-300'
                      }`}>
                      <p className="text-[10px] font-medium opacity-70">{d.day}</p>
                      <p className="text-sm font-extrabold">{d.date}</p>
                      <p className={`text-[10px] font-bold ${date===d.date?'text-white/80':d.cheap?'text-emerald-600':d.wknd?'text-red-500':'text-gray-500'}`}>
                        ₹{(d.fare/1000).toFixed(0)}K
                      </p>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom row: fare types + search btn */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex flex-wrap gap-2">
            {['Special Fare','Corporate Fare','Student Fare','Senior Citizen'].map(f => (
              <button key={f} onClick={handleSearch} className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-all cursor-pointer">
                {f}
              </button>
            ))}
          </div>
          <div className="flex-1" />
          <motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
            onClick={handleSearch} disabled={loading}
            className="flex items-center justify-center gap-2 px-8 py-3.5 text-white font-extrabold text-sm rounded-2xl shadow-xl disabled:opacity-70 transition-all"
            style={{ background:'linear-gradient(135deg,#1d4ed8,#2563eb,#0ea5e9)', minWidth:200 }}>
            {loading ? (
              <>
                <motion.div animate={{ rotate:360 }} transition={{ duration:1, repeat:Infinity, ease:'linear' }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                Searching...
              </>
            ) : (
              <><Search className="w-4 h-4" /> Search Flights <ArrowRight className="w-4 h-4" /></>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════
   PRICE INSIGHTS BAR
═══════════════════════════════════════════ */
function PriceInsights() {
  return (
    <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
      className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-4 text-white shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <TrendingDown className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-[11px] text-white/70 font-medium">Today's Lowest Fare</p>
            <p className="text-xl font-extrabold">₹9,999</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-[11px] text-white/70 font-medium">Price Trend</p>
            <p className="text-sm font-bold flex items-center gap-1"><ArrowUpRight className="w-3.5 h-3.5 text-amber-300" /> Rising 8% / week</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-[11px] text-white/70 font-medium">AI Prediction</p>
            <p className="text-sm font-bold">Book Now — Expected +12% rise</p>
          </div>
        </div>
        {/* mini sparkline */}
        <div className="hidden lg:block">
          <svg viewBox="0 0 120 40" className="w-32 h-10">
            <polyline points="0,35 20,28 40,30 60,18 80,20 100,10 120,6"
              fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round"/>
            <polyline points="0,35 20,28 40,30 60,18 80,20 100,10 120,6"
              fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 2"/>
          </svg>
        </div>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════
   PREMIUM FLIGHT CARD
═══════════════════════════════════════════ */
const FlightCard = memo(function FlightCard({ flight, onExpand, onBook, idx }) {
  const airline = AIRLINES[flight.code]
  const [liked, setLiked] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const discPct = Math.round((flight.save / flight.old) * 100)

  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:20 }} animate={inView?{ opacity:1, y:0 }:{}}
      transition={{ delay: (idx%8)*0.05, duration:0.4 }}
      whileHover={{ y:-3, boxShadow:'0 20px 60px rgba(0,0,0,0.12)' }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 cursor-pointer">

      {/* Colored top accent bar */}
      <div className="h-1 w-full" style={{ background:`linear-gradient(90deg, ${airline.color}, ${airline.color}99)` }} />

      <div className="p-4 sm:p-5">
        {/* main row */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">

          {/* AIRLINE */}
          <div className="flex items-center gap-3 lg:w-48 flex-shrink-0">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-sm font-extrabold shadow-md flex-shrink-0"
              style={{ backgroundColor: airline.color }}>
              {flight.code}
            </div>
            <div>
              <p className="text-sm font-extrabold text-gray-900">{airline.name}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{flight.no} · {flight.ac.split(' ')[0]} {flight.ac.split(' ')[1]}</p>
              <div className="flex items-center gap-0.5 mt-1">
                {[...Array(5)].map((_,j) => (
                  <Star key={j} className={`w-2.5 h-2.5 ${j < Math.floor(airline.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
                ))}
                <span className="text-[10px] text-gray-500 ml-1">({airline.reviews.toLocaleString()})</span>
              </div>
            </div>
          </div>

          {/* ROUTE TIMELINE */}
          <div className="flex items-center gap-3 sm:gap-5 flex-1">
            {/* depart */}
            <div className="text-center">
              <p className="text-2xl font-extrabold text-gray-900">{flight.dep}</p>
              <p className="text-[11px] font-bold text-gray-500 mt-0.5">{flight.from}</p>
              <p className="text-[10px] text-gray-400">Terminal {flight.term}</p>
            </div>

            {/* timeline line */}
            <div className="flex-1 flex flex-col items-center">
              <p className="text-[10px] text-gray-400 font-medium mb-1">{flight.dur}</p>
              <div className="w-full flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                <div className="flex-1 h-px bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Plane className="w-4 h-4 text-blue-500 drop-shadow" />
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
              </div>
              <p className={`text-[11px] font-semibold mt-1 ${flight.stops===0?'text-emerald-600':'text-amber-500'}`}>
                {flight.stops===0 ? '✈ Non-stop' : `${flight.stops} stop · ${flight.lay}`}
              </p>
            </div>

            {/* arrive */}
            <div className="text-center">
              <p className="text-2xl font-extrabold text-gray-900">{flight.arr}</p>
              <p className="text-[11px] font-bold text-gray-500 mt-0.5">{flight.to}</p>
              <p className="text-[10px] text-gray-400">Local time</p>
            </div>
          </div>

          {/* AMENITY PILLS */}
          <div className="flex flex-wrap gap-1.5 lg:w-36 flex-shrink-0">
            {flight.ref  && <span className="text-[10px] font-bold px-2 py-1 rounded-full text-emerald-700 bg-emerald-50 border border-emerald-200 flex items-center gap-1"><ShieldCheck className="w-2.5 h-2.5"/>Refund</span>}
            {flight.meal && <span className="text-[10px] font-bold px-2 py-1 rounded-full text-blue-700 bg-blue-50 border border-blue-200 flex items-center gap-1"><Coffee className="w-2.5 h-2.5"/>Meal</span>}
            {flight.wifi && <span className="text-[10px] font-bold px-2 py-1 rounded-full text-violet-700 bg-violet-50 border border-violet-200 flex items-center gap-1"><Wifi className="w-2.5 h-2.5"/>WiFi</span>}
            <span className="text-[10px] font-bold px-2 py-1 rounded-full text-amber-700 bg-amber-50 border border-amber-200 flex items-center gap-1"><Briefcase className="w-2.5 h-2.5"/>{flight.chbag}</span>
          </div>

          {/* PRICE */}
          <div className="flex-shrink-0 text-right">
            <div className="flex items-center gap-2 justify-end mb-1">
              <span className="text-xs text-gray-400 line-through">₹{flight.old.toLocaleString()}</span>
              <span className="text-[10px] font-extrabold text-white bg-emerald-500 px-2 py-0.5 rounded-full">{discPct}% off</span>
            </div>
            <p className="text-2xl font-extrabold text-gray-900">₹{flight.price.toLocaleString()}</p>
            <p className="text-[11px] text-gray-400">/ person · {flight.cls}</p>
            <p className="text-[11px] text-emerald-600 font-bold">Save ₹{flight.save.toLocaleString()}</p>
          </div>
        </div>

        {/* bottom actions row */}
        <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <button onClick={() => onExpand(flight)}
              className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
              <Info className="w-3.5 h-3.5" /> Flight Details
            </button>
            <span className="text-[11px] text-gray-400 flex items-center gap-1">
              <Leaf className="w-3 h-3 text-emerald-400" />{flight.co2}kg CO₂
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setLiked(!liked)}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${liked?'bg-red-50 text-red-500':'hover:bg-gray-100 text-gray-400'}`}>
              <Heart className={`w-4 h-4 ${liked?'fill-red-500':''}`} />
            </button>
            <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
              onClick={() => onBook(flight)}
              className="flex items-center gap-1.5 px-5 py-2.5 text-white text-xs font-extrabold rounded-xl shadow-md transition-all"
              style={{ background:'linear-gradient(135deg,#1d4ed8,#2563eb)' }}>
              Book Now <ChevronRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
})

/* ═══════════════════════════════════════════
   FLIGHT DETAIL DRAWER
═══════════════════════════════════════════ */
function FlightDrawer({ flight, onClose, onBook }) {
  const airline = flight ? AIRLINES[flight.code] : null
  return (
    <AnimatePresence>
      {flight && (
        <>
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
          <motion.div initial={{ x:'100%' }} animate={{ x:0 }} exit={{ x:'100%' }}
            transition={{ type:'spring', stiffness:300, damping:30 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-white z-50 overflow-y-auto shadow-2xl">

            {/* header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-100">
              <div className="h-1.5" style={{ background:`linear-gradient(90deg, ${airline.color}, ${airline.color}80)` }} />
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-white text-sm font-extrabold shadow"
                    style={{ backgroundColor: airline.color }}>{flight.code}</div>
                  <div>
                    <p className="font-extrabold text-gray-900">{airline.name} · {flight.no}</p>
                    <p className="text-xs text-gray-400">{flight.ac}</p>
                  </div>
                </div>
                <button onClick={onClose} className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-5 space-y-5">
              {/* Timeline */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5">
                <p className="text-xs font-extrabold text-blue-800 uppercase tracking-widest mb-4">Flight Timeline</p>
                <div className="space-y-4">
                  {[
                    { col:'bg-emerald-500', time:flight.dep, loc:flight.fromC, info:`Terminal ${flight.term} · Gate ${flight.gate}`, label:'Departure' },
                    { col:'bg-blue-500',    time:flight.dur, loc:flight.stops===0?'Non-stop':flight.lay, info:`${flight.ac} · Seat Pitch ${flight.pitch}`, label:'In-flight' },
                    { col:'bg-rose-500',    time:flight.arr, loc:flight.toC,   info:'Local time', label:'Arrival' },
                  ].map((s,i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-3.5 h-3.5 rounded-full ${s.col} shadow-md flex-shrink-0`} />
                        {i < 2 && <div className="w-0.5 flex-1 bg-gray-200 mt-1 mb-1 min-h-[32px]" />}
                      </div>
                      <div className="pb-2">
                        <div className="flex items-center gap-2">
                          <p className="text-base font-extrabold text-gray-900">{s.time}</p>
                          <span className="text-[10px] font-bold text-gray-500 bg-white px-2 py-0.5 rounded-full border border-gray-200">{s.label}</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-700 mt-0.5">{s.loc}</p>
                        <p className="text-[11px] text-gray-400">{s.info}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities grid */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label:'Meal',      val:flight.meal?'Included':'Not incl.', icon:Coffee,   col:'#2563eb' },
                  { label:'Cabin Bag', val:flight.cbag,  icon:Briefcase, col:'#7c3aed' },
                  { label:'Check-in',  val:flight.chbag, icon:Briefcase, col:'#0891b2' },
                  { label:'Refund',    val:flight.ref?'Yes':'No', icon:RefreshCw, col:flight.ref?'#059669':'#dc2626' },
                  { label:'WiFi',      val:flight.wifi?'Available':'No',  icon:Wifi,      col:flight.wifi?'#7c3aed':'#9ca3af' },
                  { label:'CO₂',       val:`${flight.co2}kg`,              icon:Leaf,      col:'#16a34a' },
                ].map(d => (
                  <div key={d.label} className="bg-gray-50 rounded-2xl p-3.5 text-center">
                    <div className="w-8 h-8 rounded-xl mx-auto mb-2 flex items-center justify-center" style={{ background:`${d.col}15` }}>
                      <d.icon className="w-4 h-4" style={{ color:d.col }} />
                    </div>
                    <p className="text-[10px] text-gray-400 font-medium">{d.label}</p>
                    <p className="text-xs font-extrabold text-gray-900 mt-0.5">{d.val}</p>
                  </div>
                ))}
              </div>

              {/* Fare rules */}
              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-xs font-extrabold text-gray-700 uppercase tracking-widest mb-3">Fare Rules</p>
                <div className="space-y-2.5">
                  {[
                    { ok:flight.ref,  txt:`Cancellation: ${flight.ref?'Refundable (₹1,500 fee)':'Non-refundable'}` },
                    { ok:true,        txt:'Date Change: Allowed (₹2,000 fee)' },
                    { ok:false,       txt:'Name Change: Not permitted' },
                    { ok:false,       txt:'No-show: Ticket forfeited' },
                  ].map((r,i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${r.ok?'bg-emerald-100':'bg-red-100'}`}>
                        {r.ok ? <Check className="w-2.5 h-2.5 text-emerald-600" strokeWidth={3}/> : <X className="w-2.5 h-2.5 text-red-500" strokeWidth={3}/>}
                      </div>
                      <span className="text-xs text-gray-600">{r.txt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Book CTA */}
              <div className="rounded-2xl p-5 text-white flex items-center justify-between"
                style={{ background:'linear-gradient(135deg,#1d4ed8,#0ea5e9)' }}>
                <div>
                  <p className="text-xs text-white/70 mb-0.5">Total Price</p>
                  <p className="text-3xl font-extrabold">₹{flight.price.toLocaleString()}</p>
                  <p className="text-[11px] text-white/60">/ person · {flight.cls}</p>
                </div>
                <motion.button whileHover={{ scale:1.06 }} whileTap={{ scale:0.94 }}
                  onClick={() => onBook(flight)}
                  className="px-6 py-3.5 bg-white font-extrabold text-sm rounded-2xl shadow-xl"
                  style={{ color:'#1d4ed8' }}>
                  Book Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ═══════════════════════════════════════════
   AI RECOMMENDATIONS
═══════════════════════════════════════════ */
function AIRecs({ flights, onExpand }) {
  const recs = useMemo(() => {
    if (!flights?.length) return []
    const cheapest   = [...flights].sort((a,b)=>a.price-b.price)[0]
    const fastest    = [...flights].sort((a,b)=>parseInt(a.dur)-parseInt(b.dur))[0]
    const bestValue  = [...flights].sort((a,b)=>(a.price/(a.stops===0?1:1.5))-(b.price/(b.stops===0?1:1.5)))[0]
    const premium    = [...flights].sort((a,b)=>((b.wifi?1:0)+(b.meal?1:0)+(b.ref?1:0))-((a.wifi?1:0)+(a.meal?1:0)+(a.ref?1:0)))[0]
    return [
      { tag:'Best Value', icon:Award,       grad:'linear-gradient(135deg,#f59e0b,#f97316)', flight:bestValue,  desc:'Best price-to-comfort ratio' },
      { tag:'Fastest',    icon:Zap,         grad:'linear-gradient(135deg,#3b82f6,#06b6d4)', flight:fastest,    desc:'Shortest total journey time' },
      { tag:'Cheapest',   icon:TrendingDown,grad:'linear-gradient(135deg,#10b981,#059669)', flight:cheapest,   desc:'Lowest available fare today' },
      { tag:'Premium',    icon:Sparkles,    grad:'linear-gradient(135deg,#8b5cf6,#6d28d9)', flight:premium,    desc:'Best amenities & comfort' },
    ].filter(r=>r.flight)
  }, [flights])

  if (!recs.length) return null
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-sm font-extrabold text-gray-900">AI Recommendations</h3>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {recs.map((rec,i) => (
          <motion.button key={rec.tag}
            initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.06 }}
            whileHover={{ y:-5, scale:1.02 }}
            onClick={() => onExpand(rec.flight)}
            className="bg-white rounded-2xl border border-gray-100 p-4 text-left shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-3 shadow-md"
              style={{ background:rec.grad }}>
              <rec.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-[11px] font-extrabold text-blue-600 uppercase tracking-wider mb-0.5">{rec.tag}</p>
            <p className="text-sm font-extrabold text-gray-900 leading-snug">{AIRLINES[rec.flight.code].name}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{rec.flight.dep} → {rec.flight.arr} · {rec.flight.dur}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{rec.desc}</p>
            <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-100">
              <p className="text-base font-extrabold text-gray-900">₹{rec.flight.price.toLocaleString()}</p>
              <ArrowRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   POPULAR ROUTES
═══════════════════════════════════════════ */
function PopularRoutes({ onSelect }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-blue-600 rounded-full" />
          <h3 className="font-extrabold text-gray-900 text-sm">Popular Routes</h3>
          <span className="bg-blue-50 text-blue-600 text-[10px] font-extrabold px-2 py-0.5 rounded-full">HOT</span>
        </div>
        <button onClick={() => onSelect(ROUTES[0])} className="text-blue-600 text-xs font-bold hover:underline flex items-center gap-1">
          View All <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ROUTES.map((r,i) => (
          <motion.div key={i}
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            transition={{ delay:i*0.07 }}
            whileHover={{ y:-6 }}
            onClick={() => onSelect(r)}
            className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-2xl transition-all duration-300"
            style={{ minHeight:160 }}>
            <img src={r.img} alt={`${r.from}-${r.to}`}
              className="w-full h-full absolute inset-0 object-cover group-hover:scale-110 transition-transform duration-600"
              onError={e => e.target.src='https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80'} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            {r.hot && (
              <div className="absolute top-3 left-3">
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-white text-[10px] font-extrabold"
                  style={{ background:'linear-gradient(135deg,#ef4444,#f97316)' }}>
                  <Flame className="w-3 h-3" /> Hot Deal
                </span>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center gap-2 text-white font-extrabold text-base mb-1">
                <span>{r.from}</span>
                <Plane className="w-4 h-4 text-blue-300" />
                <span>{r.to}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70 text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {r.dur}
                </span>
                <span className="text-white font-extrabold text-sm">from ₹{r.price}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   SMART FILTERS SIDEBAR
═══════════════════════════════════════════ */
function SmartFilters({ filters, setFilters }) {
  const sections = [
    { key:'price', label:'Max Price', icon:Wallet, type:'slider', min:5000, max:50000 },
    { key:'stops', label:'Stops', icon:Plane, type:'check', opts:['Non-stop','1 Stop','2+ Stops'] },
    { key:'airline', label:'Airlines', icon:Navigation, type:'check', opts:['Emirates','Qatar Airways','Air India','IndiGo','Vistara','Etihad'] },
    { key:'depart', label:'Departure', icon:Clock, type:'check', opts:['Early Morning','Morning','Afternoon','Evening'] },
    { key:'meal', label:'Meal & Baggage', icon:Coffee, type:'check', opts:['Meal Included','Free Cabin Bag','Extra Baggage'] },
    { key:'ref', label:'Refundable', icon:RefreshCw, type:'check', opts:['Refundable','Non-Refundable'] },
  ]

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-blue-600" /> Smart Filters
        </h3>
        <button onClick={() => setFilters({})} className="text-[11px] text-blue-600 font-bold hover:underline">
          Clear All
        </button>
      </div>
      {sections.map((s,si) => (
        <motion.div key={s.key}
          initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:si*0.04 }}
          className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center">
              <s.icon className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <p className="text-xs font-extrabold text-gray-800">{s.label}</p>
          </div>
          {s.type==='slider' ? (
            <div>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <span>₹{(filters.priceMin||5000).toLocaleString()}</span>
                <span>₹{(filters.priceMax||50000).toLocaleString()}</span>
              </div>
              <input type="range" min={s.min} max={s.max} step={1000}
                value={filters.priceMax||s.max}
                onChange={e => setFilters({...filters, priceMax:parseInt(e.target.value)})}
                className="w-full accent-blue-600" />
            </div>
          ) : (
            <div className="space-y-2">
              {s.opts.map(opt => (
                <label key={opt} className="flex items-center gap-2.5 cursor-pointer group">
                  <div onClick={() => setFilters({...filters, [`${s.key}_${opt}`]:!filters[`${s.key}_${opt}`]})}
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${filters[`${s.key}_${opt}`]?'border-blue-600 bg-blue-600':'border-gray-300 group-hover:border-blue-400'}`}>
                    {filters[`${s.key}_${opt}`] && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3}/>}
                  </div>
                  <span className="text-xs text-gray-600 group-hover:text-gray-900 transition-colors">{opt}</span>
                </label>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════ */
export default function FlightsPage() {
  const [searched, setSearched] = useState(false)
  const [route, setRoute]       = useState({ from:'DEL', to:'DXB' })
  const [filters, setFilters]   = useState({})
  const [sortBy, setSortBy]     = useState('price')
  const [showSort, setShowSort] = useState(false)
  const [expanded, setExpanded] = useState(null)
  const [paymentFlight, setPaymentFlight] = useState(null)

  const filteredFlights = useMemo(() => {
    let res = ALL_FLIGHTS.filter(f => {
      if (searched) {
        const or = route.origin?.match(/\(([A-Z]+)\)/)?.[1] || 'DEL'
        const ds = route.dest?.match(/\(([A-Z]+)\)/)?.[1] || 'DXB'
        if (!f.from.includes(or) && !f.to.includes(ds)) return false
      }
      if (filters.priceMax && f.price > filters.priceMax) return false
      return true
    })
    if (sortBy==='price')  res.sort((a,b)=>a.price-b.price)
    if (sortBy==='rating') res.sort((a,b)=>AIRLINES[b.code].rating-AIRLINES[a.code].rating)
    if (sortBy==='dur')    res.sort((a,b)=>parseInt(a.dur)-parseInt(b.dur))
    if (sortBy==='dep')    res.sort((a,b)=>a.dep.localeCompare(b.dep))
    return res
  }, [searched, route, filters, sortBy])

  return (
    <div className="min-h-screen" style={{ background:'#F0F2F5', fontFamily:"'Poppins','Inter',sans-serif" }}>

      {/* HERO */}
      <Hero />

      {/* SEARCH WIDGET */}
      <SearchWidget onSearch={r => { setRoute(r); setSearched(true) }} />

      {/* ── MAIN LAYOUT ── */}
      <div className="max-w-7xl mx-auto px-4 py-8 mt-6">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* LEFT SIDEBAR: filters */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="lg:sticky lg:top-4">
              <SmartFilters filters={filters} setFilters={setFilters} />
            </div>
          </div>

          {/* RIGHT MAIN */}
          <div className="flex-1 space-y-6">

            {/* Price Insights */}
            <PriceInsights />

            {/* AI Recommendations */}
            <AIRecs flights={filteredFlights} onExpand={setExpanded} />

            {/* Sort bar */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-extrabold text-gray-900 text-sm">
                  {filteredFlights.length} Flights Found
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Showing cheapest results · Prices per person
                </p>
              </div>
              <div className="relative">
                <button onClick={() => setShowSort(!showSort)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${showSort?'bg-blue-600 text-white':'bg-white text-gray-700 border border-gray-200 hover:border-blue-400'}`}>
                  <TrendingUp className="w-3.5 h-3.5" />
                  Sort
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showSort?'rotate-180':''}`} />
                </button>
                <AnimatePresence>
                  {showSort && (
                    <motion.div initial={{ opacity:0, y:-8, scale:0.96 }} animate={{ opacity:1, y:0, scale:1 }}
                      exit={{ opacity:0, y:-8, scale:0.96 }}
                      className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 w-52 z-30">
                      {[
                        { id:'price',  label:'Price: Low to High' },
                        { id:'rating', label:'Top Rated Airlines' },
                        { id:'dur',    label:'Shortest Duration' },
                        { id:'dep',    label:'Earliest Departure' },
                      ].map(s => (
                        <button key={s.id} onClick={() => { setSortBy(s.id); setShowSort(false) }}
                          className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors ${sortBy===s.id?'bg-blue-50 text-blue-700':'text-gray-700 hover:bg-gray-50'}`}>
                          {sortBy===s.id && '✓ '}{s.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* FLIGHT CARDS */}
            <div className="space-y-3">
              {filteredFlights.map((f,i) => (
                <FlightCard key={f.id} flight={f} idx={i} onExpand={setExpanded} onBook={setPaymentFlight} />
              ))}
              {filteredFlights.length === 0 && (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-3">
                    <Plane className="w-8 h-8 text-blue-500" />
                  </div>
                  <p className="font-extrabold text-gray-900">No flights match your filters</p>
                  <p className="text-sm text-gray-400 mt-1 mb-4">Try removing some filters</p>
                  <button onClick={() => setFilters({})} className="px-5 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors">
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

            {/* Popular Routes */}
            <div className="pt-2">
              <PopularRoutes onSelect={r => {
                setRoute({ origin:`${r.from} (${r.from.slice(0,3).toUpperCase()})`, dest:`${r.to} (${r.to.slice(0,3).toUpperCase()})` })
                setSearched(true)
              }} />
            </div>

            {/* Why Book CTA */}
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              className="rounded-3xl overflow-hidden"
              style={{ background:'linear-gradient(135deg,#1e3a8a 0%,#1d4ed8 50%,#0284c7 100%)' }}>
              <div className="p-7 sm:p-10">
                <div className="text-center mb-7">
                  <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-2">Exclusive B2B Benefits</p>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white" style={{ fontFamily:"'Poppins',sans-serif" }}>
                    Why Book with MyPartner?
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { icon:BadgeCheck, title:'Net Fares',        desc:'Exclusive B2B pricing unavailable publicly', col:'#34d399' },
                    { icon:Zap,        title:'Instant Ticketing', desc:'Get e-tickets in under 60 seconds',         col:'#60a5fa' },
                    { icon:Headphones, title:'24×7 Support',     desc:'Dedicated agent helpdesk at all times',      col:'#a78bfa' },
                    { icon:ShieldCheck,title:'Safe Booking',     desc:'Bank-grade secure payment gateway',          col:'#fbbf24' },
                  ].map(w => (
                    <div key={w.title} className="text-center">
                      <div className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center"
                        style={{ background:`${w.col}25`, border:`1px solid ${w.col}40` }}>
                        <w.icon className="w-6 h-6" style={{ color:w.col }} />
                      </div>
                      <p className="text-white font-extrabold text-sm mb-1">{w.title}</p>
                      <p className="text-white/50 text-[11px] leading-relaxed">{w.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* FLIGHT DETAIL DRAWER */}
      <FlightDrawer flight={expanded} onClose={() => setExpanded(null)} onBook={(f) => { setExpanded(null); setPaymentFlight(f) }} />

      {/* RAZORPAY PAYMENT MODAL */}
      <PaymentModal
        isOpen={!!paymentFlight}
        onClose={() => setPaymentFlight(null)}
        bookingType="FLIGHT"
        bookingId={`FLT-${paymentFlight?.id || ''}`}
        baseAmount={paymentFlight?.price || 0}
        title={paymentFlight ? `${AIRLINES[paymentFlight.code]?.name || ''} ${paymentFlight.no}` : 'Flight Booking'}
        description={paymentFlight ? `${paymentFlight.fromC} → ${paymentFlight.toC} · ${paymentFlight.dep} - ${paymentFlight.arr} · ${paymentFlight.cls}` : ''}
        onSuccess={() => setPaymentFlight(null)}
      />

      {/* Footer */}
      <div className="w-full mt-8">
        <img src="/f2.png" alt="Footer" className="w-full max-h-[250px] object-cover" />
      </div>
    </div>
  )
}