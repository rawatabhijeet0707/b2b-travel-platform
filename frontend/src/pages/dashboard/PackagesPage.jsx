import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Search, MapPin, Star, Clock, Users, ArrowRight, ChevronRight,
  ChevronLeft, Heart, X, Check, SlidersHorizontal,
  Flame, TrendingUp, Award, Zap, ChevronDown, Package, Calendar,
  BadgeCheck, ThumbsUp, Mountain, Leaf, Camera, Shield,
  Globe, Headphones, CreditCard, Sparkles, Play, Eye
} from 'lucide-react'
import PaymentModal from '../../components/payment/PaymentModal.jsx'

/* ═══════════════════════════════════════════
   HD IMAGES — Unsplash best quality (auto=format&fit=crop&w=800&q=90)
═══════════════════════════════════════════ */
const IMG = {
  dubai:       'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=90',
  bali:        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=90',
  singapore:   'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=90',
  kerala:      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=90',
  europe:      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=90',
  maldives:    'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=90',
  thailand:    'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=90',
  andaman:     'https://images.unsplash.com/photo-1586094798770-6e2e1e9df7dd?auto=format&fit=crop&w=800&q=90',
  kashmir:     'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=90',
  ladakh:      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=90',
  japan:       'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=90',
  switzerland: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=90',
  paris:       'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=90',
  goa:         'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=90',
  newzealand:  'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&q=90',
  greece:      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=90',
  hero1:       'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=90',
  hero2:       'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=90',
  hero3:       'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=1600&q=90',
}

/* ═══════════════════════════════════════════  PACKAGES DATA  ═══════ */
const ALL_PACKAGES = [
  {
    id: 1, title: 'Dubai Desert Safari & City Tour', dest: 'Dubai, UAE',
    nights: 4, price: 34999, old: 45000, rating: 4.8, reviews: 2847,
    img: IMG.dubai, tag: 'Best Seller', tagBg: '#FF6B35', tagText: '#fff',
    inc: ['Flights', '4★ Hotel', 'Desert Safari', 'Dhow Cruise', 'City Tour', 'Visa'],
    hl: 'Burj Khalifa • Palm Jumeirah • Desert Camp', disc: 22,
    type: ['international','luxury'], theme: ['family','couple'], cat: 'International', hot: true,
  },
  {
    id: 2, title: 'Bali – Tropical Island Paradise', dest: 'Bali, Indonesia',
    nights: 5, price: 29999, old: 38000, rating: 4.7, reviews: 3412,
    img: IMG.bali, tag: 'Trending 🔥', tagBg: '#10B981', tagText: '#fff',
    inc: ['Flights', 'Private Villa', 'Kintamani Tour', 'Water Sports', 'Spa Day'],
    hl: 'Ubud Rice Terraces • Tanah Lot • Seminyak', disc: 21,
    type: ['international','budget'], theme: ['couple','honeymoon'], cat: 'International', hot: true,
  },
  {
    id: 3, title: 'Singapore – Futuristic Garden City', dest: 'Singapore',
    nights: 3, price: 42999, old: 52000, rating: 4.9, reviews: 1985,
    img: IMG.singapore, tag: 'Family Fav', tagBg: '#8B5CF6', tagText: '#fff',
    inc: ['Flights', '4★ Hotel', 'Universal Studios', 'Night Safari', 'Gardens by the Bay', 'Visa'],
    hl: 'Sentosa Island • Marina Bay • Universal', disc: 17,
    type: ['international','luxury'], theme: ['family'], cat: 'International',
  },
  {
    id: 4, title: 'Kerala – God\'s Own Country', dest: 'Kerala, India',
    nights: 4, price: 18999, old: 25000, rating: 4.6, reviews: 4218,
    img: IMG.kerala, tag: 'Domestic', tagBg: '#059669', tagText: '#fff',
    inc: ['Hotels', 'Houseboat Stay', 'Munnar Tour', 'Thekkady Safari', 'Alleppey Cruise'],
    hl: 'Munnar Tea Gardens • Backwaters • Thekkady', disc: 24,
    type: ['domestic','budget'], theme: ['family','couple'], cat: 'India',
  },
  {
    id: 5, title: 'Europe Grand Tour – The Iconic 3', dest: 'Paris • Switzerland • Italy',
    nights: 9, price: 129999, old: 155000, rating: 4.9, reviews: 1247,
    img: IMG.europe, tag: 'Premium ✈️', tagBg: '#2563EB', tagText: '#fff',
    inc: ['Flights', '4★ Hotels', 'Euro Rail Pass', 'Eiffel Tower', 'Swiss Alps', 'Venice Gondola', 'Visa'],
    hl: 'Paris • Lucerne • Rome • Venice', disc: 16,
    type: ['international','luxury'], theme: ['couple','honeymoon'], cat: 'International', hot: true,
  },
  {
    id: 6, title: 'Maldives – Overwater Villa Luxury', dest: 'Maldives',
    nights: 3, price: 64999, old: 80000, rating: 5.0, reviews: 892,
    img: IMG.maldives, tag: '⭐ 5.0 Rated', tagBg: '#F59E0B', tagText: '#fff',
    inc: ['Flights', 'Overwater Villa', 'All Meals', 'Snorkeling', 'Sunset Cruise', 'Spa'],
    hl: 'Private Beach • Coral Reef Diving • Sunset Sail', disc: 19,
    type: ['international','luxury'], theme: ['couple','honeymoon'], cat: 'International', hot: true,
  },
  {
    id: 7, title: 'Thailand – Bangkok & Phuket Explorer', dest: 'Bangkok + Phuket',
    nights: 5, price: 24999, old: 32000, rating: 4.5, reviews: 5671,
    img: IMG.thailand, tag: 'Budget Pick', tagBg: '#F59E0B', tagText: '#fff',
    inc: ['Flights', '3★ Hotels', 'Coral Island Tour', 'Phi Phi Day Trip', 'Temple Tour', 'Visa'],
    hl: 'Bangkok Temples • Phi Phi Islands • Phuket Beach', disc: 22,
    type: ['international','budget'], theme: ['family','adventure'], cat: 'International',
  },
  {
    id: 8, title: 'Andaman – Tropical Island Adventure', dest: 'Andaman & Nicobar',
    nights: 4, price: 22999, old: 30000, rating: 4.7, reviews: 3104,
    img: IMG.andaman, tag: 'Adventure', tagBg: '#EF4444', tagText: '#fff',
    inc: ['Flights', 'Beach Resort', 'Island Hopping', 'Scuba Diving', 'Sea Walk', 'Snorkeling'],
    hl: 'Havelock Island • Radhanagar Beach • Neil Island', disc: 23,
    type: ['domestic','adventure'], theme: ['adventure','couple'], cat: 'India',
  },
  {
    id: 9, title: 'Kashmir – Heaven on Earth', dest: 'Kashmir, India',
    nights: 5, price: 27999, old: 36000, rating: 4.8, reviews: 6382,
    img: IMG.kashmir, tag: '❤️ Most Loved', tagBg: '#EC4899', tagText: '#fff',
    inc: ['Flights', 'Luxury Houseboat', 'Shikara Ride', 'Gulmarg Cable Car', 'Pahalgam Trip'],
    hl: 'Dal Lake • Gulmarg • Pahalgam • Sonamarg', disc: 22,
    type: ['domestic','budget'], theme: ['honeymoon','family'], cat: 'India',
  },
  {
    id: 10, title: 'Ladakh – High Altitude Bike Expedition', dest: 'Ladakh, India',
    nights: 6, price: 32999, old: 42000, rating: 4.9, reviews: 2167,
    img: IMG.ladakh, tag: '🏔️ Adventure', tagBg: '#EF4444', tagText: '#fff',
    inc: ['Bike Rental', 'Camping Tents', 'Nubra Valley Visit', 'Pangong Lake Day', 'Khardung La Pass'],
    hl: 'Pangong Lake • Nubra Valley • Khardung La Pass', disc: 21,
    type: ['domestic','adventure'], theme: ['adventure'], cat: 'India',
  },
  {
    id: 11, title: 'Japan – Sakura Season Trail', dest: 'Tokyo • Kyoto • Osaka',
    nights: 7, price: 99999, old: 125000, rating: 4.9, reviews: 743,
    img: IMG.japan, tag: 'Exclusive', tagBg: '#2563EB', tagText: '#fff',
    inc: ['Flights', '4★ Hotels', 'JR Rail Pass', 'Mount Fuji Day Trip', 'Tea Ceremony', 'Visa'],
    hl: 'Tokyo Skyline • Kyoto Temples • Mount Fuji • Nara', disc: 20,
    type: ['international','luxury'], theme: ['couple','family'], cat: 'International',
  },
  {
    id: 12, title: 'Switzerland – Alpine Honeymoon Special', dest: 'Zurich • Interlaken • Lucerne',
    nights: 6, price: 109999, old: 138000, rating: 4.8, reviews: 512,
    img: IMG.switzerland, tag: '💑 Honeymoon', tagBg: '#EC4899', tagText: '#fff',
    inc: ['Flights', '5★ Hotels', 'Swiss Rail', 'Jungfraujoch', 'Rhine Falls', 'Chocolate Tour', 'Visa'],
    hl: 'Jungfrau Peak • Interlaken • Lucerne • Rhine Falls', disc: 20,
    type: ['international','luxury'], theme: ['honeymoon','couple'], cat: 'International',
  },
  {
    id: 13, title: 'Paris – City of Love', dest: 'Paris, France',
    nights: 5, price: 74999, old: 95000, rating: 4.8, reviews: 1834,
    img: IMG.paris, tag: 'Romantic', tagBg: '#EC4899', tagText: '#fff',
    inc: ['Flights', '4★ Hotel', 'Eiffel Tower', 'Seine River Cruise', 'Louvre Museum', 'Visa'],
    hl: 'Eiffel Tower • Louvre • Versailles • Seine Cruise', disc: 21,
    type: ['international','luxury'], theme: ['honeymoon','couple'], cat: 'International',
  },
  {
    id: 14, title: 'Goa – Sun, Sand & Shacks', dest: 'Goa, India',
    nights: 3, price: 12999, old: 18000, rating: 4.4, reviews: 8920,
    img: IMG.goa, tag: 'Weekend Escape', tagBg: '#F59E0B', tagText: '#fff',
    inc: ['Hotel', 'North Goa Tour', 'South Goa Tour', 'Water Sports', 'Beach BBQ'],
    hl: 'Calangute Beach • Anjuna • Old Goa Churches', disc: 28,
    type: ['domestic','budget'], theme: ['family','adventure'], cat: 'India',
  },
  {
    id: 15, title: 'New Zealand – Land of the Long White Cloud', dest: 'Auckland • Queenstown',
    nights: 8, price: 149999, old: 185000, rating: 4.9, reviews: 398,
    img: IMG.newzealand, tag: 'Bucket List', tagBg: '#2563EB', tagText: '#fff',
    inc: ['Flights', '4★ Hotels', 'Milford Sound', 'Skydiving', 'Hobbiton Tour', 'Visa'],
    hl: 'Milford Sound • Queenstown • Hobbiton • Skydiving', disc: 19,
    type: ['international','luxury','adventure'], theme: ['adventure','couple'], cat: 'International',
  },
  {
    id: 16, title: 'Santorini & Athens – Greek Odyssey', dest: 'Athens + Santorini, Greece',
    nights: 6, price: 89999, old: 115000, rating: 4.9, reviews: 678,
    img: IMG.greece, tag: '🌊 Island Life', tagBg: '#0EA5E9', tagText: '#fff',
    inc: ['Flights', 'Boutique Hotel', 'Caldera View Room', 'Volcano Tour', 'Wine Tasting', 'Visa'],
    hl: 'Oia Sunset • Caldera • Athens Acropolis • Ferry', disc: 22,
    type: ['international','luxury'], theme: ['honeymoon','couple'], cat: 'International',
  },
]

/* ═══════════════════════════════════════════  TRENDING DESTS  ═══════ */
const TRENDING = [
  { name: 'Ladakh', img: IMG.ladakh, count: '234', emoji: '🏔️' },
  { name: 'Kashmir', img: IMG.kashmir, count: '189', emoji: '🌸' },
  { name: 'Bali', img: IMG.bali, count: '156', emoji: '🌴' },
  { name: 'Maldives', img: IMG.maldives, count: '143', emoji: '🏝️' },
  { name: 'Thailand', img: IMG.thailand, count: '128', emoji: '🐘' },
  { name: 'Switzerland', img: IMG.switzerland, count: '97', emoji: '🏔️' },
  { name: 'Paris', img: IMG.paris, count: '87', emoji: '🗼' },
  { name: 'Santorini', img: IMG.greece, count: '74', emoji: '🌊' },
]

/* ═══════════════════════════════════════════  HERO SLIDES  ═══════ */
const HERO_SLIDES = [
  { img: IMG.hero1, title: 'Discover Your Dream Holiday', sub: 'Handcrafted itineraries · Verified stays · 24/7 support' },
  { img: IMG.hero2, title: 'Adventure Awaits You', sub: '125+ destinations · Custom packages · Best price promise' },
  { img: IMG.hero3, title: 'Travel More. Worry Less.', sub: '1 Million+ happy travellers · Rated 4.8★ · Instant booking' },
]

/* ═══════════════════════════════════════════  CATEGORY TABS  ═══════ */
const CATS = [
  { id: 'all', label: 'All', icon: Globe },
  { id: 'India', label: 'India', icon: Leaf },
  { id: 'International', label: 'International', icon: Mountain },
  { id: 'honeymoon', label: 'Honeymoon', icon: Heart },
  { id: 'adventure', label: 'Adventure', icon: Zap },
  { id: 'family', label: 'Family', icon: Users },
  { id: 'luxury', label: 'Luxury', icon: Award },
  { id: 'budget', label: 'Budget', icon: ThumbsUp },
]

const SORTS = [
  { id: 'popular', label: 'Most Popular' },
  { id: 'price_low', label: 'Price: Low → High' },
  { id: 'price_high', label: 'Price: High → Low' },
  { id: 'rating', label: 'Top Rated' },
  { id: 'discount', label: 'Best Discount' },
]

/* ══════════════════════════════════════════════════════
   HERO CAROUSEL
══════════════════════════════════════════════════════ */
function HeroCarousel({ search, setSearch }) {
  const [cur, setCur] = useState(0)
  const [destination, setDestination] = useState('')

  /* auto-play */
  useRef((() => {
    const t = setInterval(() => setCur(p => (p + 1) % HERO_SLIDES.length), 5000)
    return () => clearInterval(t)
  })())

  const slide = HERO_SLIDES[cur]

  return (
    <div className="relative h-[420px] sm:h-[500px] overflow-hidden">
      {/* bg slides */}
      <AnimatePresence mode="wait">
        <motion.div key={cur} initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0">
          <img src={slide.img} alt="hero" className="w-full h-full object-cover"
            onError={e => e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=90'} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/75" />
        </motion.div>
      </AnimatePresence>

      {/* floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div key={i}
          animate={{ y: [0, -18, 0], opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
          className="absolute w-1.5 h-1.5 rounded-full bg-white/40"
          style={{ left: `${8 + i * 12}%`, top: `${20 + (i % 3) * 20}%` }} />
      ))}

      {/* content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
        {/* pill badge */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
          style={{ background: 'rgba(243,104,18,0.9)', backdropFilter: 'blur(8px)' }}>
          <Flame className="w-3.5 h-3.5 text-white" />
          <span className="text-white text-xs font-bold tracking-wide">Rated 4.8★ by 1M+ Travellers</span>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={cur} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3 drop-shadow-xl"
              style={{ fontFamily: "'Poppins', sans-serif" }}>
              {slide.title}
            </h1>
            <p className="text-white/75 text-sm sm:text-base mb-7 font-medium">{slide.sub}</p>
          </motion.div>
        </AnimatePresence>

        {/* HERO SEARCH BAR */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="w-full max-w-2xl">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 flex flex-col sm:flex-row gap-0 overflow-hidden">
            {/* destination input */}
            <div className="flex items-center gap-2 flex-1 px-4 py-3.5 sm:border-r border-gray-200">
              <MapPin className="w-5 h-5 text-[#F36812] flex-shrink-0" />
              <input value={destination} onChange={e => setDestination(e.target.value)}
                placeholder="Where do you want to go?"
                className="flex-1 text-sm font-medium text-gray-800 placeholder:text-gray-400 outline-none bg-transparent" />
            </div>
            {/* date */}
            <div className="hidden sm:flex items-center gap-2 px-4 py-3.5 sm:border-r border-gray-200">
              <Calendar className="w-4 h-4 text-gray-400" />
              <input type="month" className="text-sm text-gray-600 outline-none bg-transparent w-28" />
            </div>
            {/* CTA */}
            <button onClick={() => setSearch(destination)}
              className="flex items-center justify-center gap-2 px-6 py-3.5 font-bold text-sm text-white transition-all hover:brightness-110 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #F36812, #d45e0e)' }}>
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </motion.div>

        {/* slide dots */}
        <div className="flex gap-2 mt-6">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setCur(i)}
              className={`rounded-full transition-all duration-300 ${i === cur ? 'w-6 h-2 bg-[#F36812]' : 'w-2 h-2 bg-white/40 hover:bg-white/60'}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   STATS STRIP
══════════════════════════════════════════════════════ */
function StatsStrip() {
  return (
    <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] py-3">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-around gap-4 overflow-x-auto no-scrollbar">
          {[
            { icon: Users, val: '1M+', lab: 'Happy Travellers', col: '#F36812' },
            { icon: BadgeCheck, val: '100%', lab: 'Verified Packages', col: '#10B981' },
            { icon: Zap, val: '2 min', lab: 'Instant Confirmation', col: '#8B5CF6' },
            { icon: Star, val: '4.8★', lab: 'Average Rating', col: '#F59E0B' },
            { icon: Globe, val: '125+', lab: 'Destinations', col: '#0EA5E9' },
          ].map(s => (
            <div key={s.lab} className="flex items-center gap-2.5 flex-shrink-0 py-1">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${s.col}25` }}>
                <s.icon className="w-4 h-4" style={{ color: s.col }} />
              </div>
              <div>
                <p className="text-white font-extrabold text-sm leading-none">{s.val}</p>
                <p className="text-white/50 text-[10px] leading-tight mt-0.5">{s.lab}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   TRENDING DESTINATIONS HORIZONTAL SCROLL
══════════════════════════════════════════════════════ */
function TrendingDests({ onSelect }) {
  return (
    <div className="bg-white py-6 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 bg-[#F36812] rounded-full" />
            <h2 className="font-extrabold text-gray-900 text-base" style={{ fontFamily: "'Poppins',sans-serif" }}>
              Trending Destinations
            </h2>
            <span className="bg-[#F36812]/10 text-[#F36812] text-[10px] font-bold px-2 py-0.5 rounded-full">HOT</span>
          </div>
          <button className="text-[#F36812] text-xs font-bold flex items-center gap-1 hover:underline">
            Explore All <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {TRENDING.map((d, i) => (
            <motion.div key={d.name}
              initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6, scale: 1.03 }}
              onClick={() => onSelect(d.name)}
              className="flex-shrink-0 relative w-32 sm:w-40 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 group">
              {/* image */}
              <div className="h-44 sm:h-52 relative">
                <img src={d.img} alt={d.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600"
                  onError={e => e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&q=80'} />
                {/* gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                {/* shine on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/10 group-hover:to-transparent transition-all duration-500" />
                {/* content */}
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <p className="text-white font-extrabold text-sm leading-tight">{d.name}</p>
                  <p className="text-white/60 text-[10px] mt-0.5">{d.count} packages</p>
                </div>
                {/* emoji badge */}
                <div className="absolute top-2 right-2 text-base">{d.emoji}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   PREMIUM PACKAGE CARD
══════════════════════════════════════════════════════ */
function PkgCard({ pkg, idx, onView, onBook }) {
  const [wish, setWish] = useState(false)
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (idx % 8) * 0.07, duration: 0.45, ease: 'easeOut' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-100 hover:border-[#F36812]/20 transition-all duration-400 cursor-pointer flex flex-col"
      style={{ transform: hovered ? 'translateY(-8px)' : 'translateY(0)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>

      {/* IMAGE */}
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        <img src={pkg.img} alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          onError={e => e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80'} />

        {/* gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* TOP LEFT: tag badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-lg text-[11px] font-extrabold shadow-lg" style={{ background: pkg.tagBg, color: pkg.tagText }}>
            {pkg.tag}
          </span>
        </div>

        {/* TOP RIGHT: actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          <motion.button whileTap={{ scale: 0.85 }}
            onClick={e => { e.stopPropagation(); setWish(!wish) }}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition">
            <Heart className={`w-4 h-4 transition-colors ${wish ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
          </motion.button>
        </div>

        {/* DISCOUNT RIBBON */}
        <div className="absolute top-0 right-0">
          <div className="relative">
            <div className="w-14 h-14 bg-[#F36812] rounded-bl-2xl flex flex-col items-center justify-center shadow-lg">
              <span className="text-white font-extrabold text-base leading-none">{pkg.disc}%</span>
              <span className="text-white/80 text-[9px] font-bold leading-none mt-0.5">OFF</span>
            </div>
          </div>
        </div>

        {/* BOTTOM: dest + duration */}
        <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between">
          <div className="flex items-center gap-1.5 text-white">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-[#F36812]" />
            <span className="text-xs font-semibold drop-shadow">{pkg.dest}</span>
          </div>
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
            <Clock className="w-3 h-3 text-[#F36812]" />
            <span className="text-[11px] text-white font-bold">{pkg.nights}N / {pkg.nights + 1}D</span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-1">
        {/* title */}
        <h3 className="font-extrabold text-gray-900 text-sm leading-snug mb-1.5 line-clamp-2 group-hover:text-[#F36812] transition-colors duration-200"
          style={{ fontFamily: "'Poppins',sans-serif" }}>
          {pkg.title}
        </h3>

        {/* highlights */}
        <p className="text-[11px] text-gray-400 mb-2.5 flex items-start gap-1 leading-relaxed">
          <Camera className="w-3 h-3 flex-shrink-0 mt-0.5 text-gray-300" />
          <span className="line-clamp-1">{pkg.hl}</span>
        </p>

        {/* RATING */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg" style={{ background: pkg.rating === 5.0 ? '#F59E0B20' : '#F3680820' }}>
            {[...Array(5)].map((_, j) => (
              <Star key={j} className={`w-3 h-3 ${j < Math.floor(pkg.rating) ? 'text-[#F36812] fill-[#F36812]' : 'text-gray-300'}`} />
            ))}
            <span className="text-xs font-extrabold text-[#F36812] ml-0.5">{pkg.rating}</span>
          </div>
          <span className="text-[11px] text-gray-400">({pkg.reviews.toLocaleString()})</span>
          {pkg.hot && (
            <span className="ml-auto flex items-center gap-1 text-[10px] font-bold text-[#F36812] bg-[#F36812]/8 px-2 py-0.5 rounded-full">
              <Flame className="w-2.5 h-2.5" /> Hot
            </span>
          )}
        </div>

        {/* INCLUDES PILLS */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {pkg.inc.slice(0, 3).map(inc => (
            <span key={inc} className="flex items-center gap-1 px-2 py-0.5 bg-green-50 border border-green-100 rounded-full text-[10px] font-semibold text-green-700">
              <Check className="w-2.5 h-2.5 text-green-500" strokeWidth={3} />{inc}
            </span>
          ))}
          {pkg.inc.length > 3 && (
            <span className="px-2 py-0.5 bg-[#F36812]/8 rounded-full text-[10px] font-bold text-[#F36812]">
              +{pkg.inc.length - 3} more
            </span>
          )}
        </div>

        {/* spacer */}
        <div className="flex-1" />

        {/* PRICE + CTA */}
        <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[11px] text-gray-400 line-through">₹{pkg.old.toLocaleString()}</span>
              <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">Save ₹{(pkg.old - pkg.price).toLocaleString()}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-gray-900" style={{ fontFamily: "'Poppins',sans-serif" }}>
                ₹{pkg.price.toLocaleString()}
              </span>
              <span className="text-[10px] text-gray-400">/person</span>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
            onClick={() => onView(pkg)}
            className="flex items-center gap-1.5 px-4 py-2.5 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all"
            style={{ background: 'linear-gradient(135deg, #F36812 0%, #d45e0e 100%)' }}>
            View <ChevronRight className="w-3.5 h-3.5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
            onClick={() => onBook(pkg)}
            className="flex items-center gap-1.5 px-4 py-2.5 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all"
            style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}>
            Book <ChevronRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════
   FEATURED BANNER CARD (wide card)
══════════════════════════════════════════════════════ */
function FeaturedBanner({ pkg, onBook }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="relative rounded-3xl overflow-hidden shadow-xl cursor-pointer group col-span-1 sm:col-span-2"
      style={{ minHeight: 260 }}>
      <img src={pkg.img} alt={pkg.title}
        className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-700"
        onError={e => e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80'} />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold mb-3 text-white"
              style={{ background: pkg.tagBg }}>
              ⭐ Featured Deal
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-1" style={{ fontFamily: "'Poppins',sans-serif" }}>
              {pkg.title}
            </h3>
            <p className="text-white/70 text-sm mb-3 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#F36812]" /> {pkg.dest}
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-[#F36812] fill-[#F36812]" />
                <span className="text-white font-bold text-sm">{pkg.rating}</span>
                <span className="text-white/60 text-xs">({pkg.reviews.toLocaleString()})</span>
              </div>
              <span className="text-white/50">|</span>
              <span className="text-white/80 text-xs flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {pkg.nights}N / {pkg.nights + 1}D
              </span>
              <span className="bg-[#F36812] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {pkg.disc}% OFF
              </span>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-white/50 text-xs line-through">₹{pkg.old.toLocaleString()}</p>
            <p className="text-white text-2xl font-extrabold">₹{pkg.price.toLocaleString()}</p>
            <p className="text-white/50 text-xs">/person</p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => onBook(pkg)}
              className="mt-3 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-xl"
              style={{ background: 'linear-gradient(135deg, #F36812, #d45e0e)' }}>
              Book Now <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function PkgDetailModal({ pkg, onClose, onBook }) {
  if (!pkg) return null
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
      <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-white z-50 overflow-y-auto shadow-2xl">
        <div className="relative h-48 overflow-hidden">
          <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover"
            onError={e => e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80'} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <button onClick={onClose} className="absolute top-3 right-3 w-9 h-9 rounded-xl bg-white/90 flex items-center justify-center hover:bg-white transition">
            <X className="w-4 h-4 text-gray-600" />
          </button>
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[11px] font-extrabold shadow-lg" style={{ background: pkg.tagBg, color: pkg.tagText }}>{pkg.tag}</span>
          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="text-white font-extrabold text-lg drop-shadow-lg leading-snug">{pkg.title}</h3>
            <p className="text-white/80 text-xs flex items-center gap-1 mt-1"><MapPin className="w-3 h-3 text-[#F36812]" /> {pkg.dest}</p>
          </div>
        </div>
        <div className="p-5 space-y-5">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg" style={{ background: '#F3680820' }}>
              {[...Array(5)].map((_, j) => (
                <Star key={j} className={`w-3 h-3 ${j < Math.floor(pkg.rating) ? 'text-[#F36812] fill-[#F36812]' : 'text-gray-300'}`} />
              ))}
              <span className="text-xs font-extrabold text-[#F36812] ml-0.5">{pkg.rating}</span>
            </div>
            <span className="text-[11px] text-gray-400">({pkg.reviews.toLocaleString()} reviews)</span>
            <span className="flex items-center gap-1 text-xs text-gray-500"><Clock className="w-3.5 h-3.5" /> {pkg.nights}N / {pkg.nights + 1}D</span>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Highlights</p>
            <p className="text-sm text-gray-600 leading-relaxed">{pkg.hl}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Inclusions</p>
            <div className="flex flex-wrap gap-2">
              {pkg.inc.map(item => (
                <span key={item} className="flex items-center gap-1 px-2.5 py-1 bg-green-50 border border-green-100 rounded-full text-xs font-semibold text-green-700">
                  <Check className="w-3 h-3 text-green-500" strokeWidth={3} />{item}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4">
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">Itinerary</p>
            <div className="space-y-3">
              {Array.from({ length: Math.min(pkg.nights, 5) }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#F36812] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</div>
                  <div className="pb-2">
                    <p className="text-sm font-bold text-gray-900">Day {i + 1}</p>
                    <p className="text-xs text-gray-500">{pkg.hl}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl p-5 text-white flex items-center justify-between"
            style={{ background: 'linear-gradient(135deg,#F36812,#d45e0e)' }}>
            <div>
              <p className="text-xs text-white/70 mb-0.5">Total Price</p>
              <p className="text-3xl font-extrabold">₹{pkg.price.toLocaleString()}</p>
              <p className="text-[11px] text-white/60">/ person · {pkg.nights}N / {pkg.nights + 1}D</p>
            </div>
            <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
              onClick={() => onBook(pkg)}
              className="px-6 py-3.5 bg-white font-extrabold text-sm rounded-2xl shadow-xl"
              style={{ color: '#F36812' }}>
              Book Now
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ══════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════ */
export default function PackagesPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('all')
  const [sortBy, setSortBy] = useState('popular')
  const [showSort, setShowSort] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [priceMax, setPriceMax] = useState(200000)
  const [dur, setDur] = useState('all')
  const [detailPkg, setDetailPkg] = useState(null)
  const [paymentPkg, setPaymentPkg] = useState(null)
  const catRef = useRef(null)

  /* filter + sort */
  const filtered = ALL_PACKAGES.filter(p => {
    const q = search.toLowerCase()
    const mSearch = !q || p.title.toLowerCase().includes(q) || p.dest.toLowerCase().includes(q)
    const mCat = cat === 'all' || p.cat === cat || p.theme.includes(cat) || p.type.includes(cat)
    const mPrice = p.price <= priceMax
    const mDur = dur === 'all'
      || (dur === 'short' && p.nights <= 3)
      || (dur === 'medium' && p.nights >= 4 && p.nights <= 6)
      || (dur === 'long' && p.nights >= 7)
    return mSearch && mCat && mPrice && mDur
  }).sort((a, b) => {
    if (sortBy === 'price_low') return a.price - b.price
    if (sortBy === 'price_high') return b.price - a.price
    if (sortBy === 'rating') return b.rating - a.rating
    if (sortBy === 'discount') return b.disc - a.disc
    return b.reviews - a.reviews
  })

  const scrollCat = d => catRef.current?.scrollBy({ left: d * 200, behavior: 'smooth' })

  /* featured picks */
  const featured = cat === 'all' ? [] : filtered.filter(p => p.hot).slice(0, 2)
  const rest = cat === 'all' ? filtered : filtered.filter(p => !p.hot || featured.indexOf(p) === -1)

  return (
    <div className="min-h-screen" style={{ background: '#F4F5F7', fontFamily: "'Poppins','Inter',sans-serif" }}>

      {/* ── HERO ── */}
      <HeroCarousel search={search} setSearch={setSearch} />

      {/* ── STATS ── */}
      <StatsStrip />

      {/* ── TRENDING ── */}
      <TrendingDests onSelect={q => setSearch(q)} />

      {/* ── STICKY CATEGORY + SORT/FILTER BAR ── */}
      <div className="bg-white sticky top-0 z-30 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 py-0.5">
            <button onClick={() => scrollCat(-1)}
              className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>

            <div ref={catRef} className="flex gap-1.5 overflow-x-auto no-scrollbar py-3 flex-1">
              {CATS.map(c => (
                <button key={c.id} onClick={() => setCat(c.id)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                    cat === c.id
                      ? 'text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                  }`}
                  style={cat === c.id ? { background: 'linear-gradient(135deg, #F36812, #d45e0e)', boxShadow: '0 4px 14px rgba(243,104,18,0.35)' } : {}}>
                  <c.icon className="w-3.5 h-3.5" />
                  {c.label}
                </button>
              ))}
            </div>

            <button onClick={() => scrollCat(1)}
              className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>

            <div className="flex-shrink-0 flex items-center gap-2 pl-2 border-l border-gray-200 ml-1">
              {/* SORT */}
              <div className="relative">
                <button onClick={() => { setShowSort(!showSort); setShowFilter(false) }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${showSort ? 'bg-[#F36812] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sort</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${showSort ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {showSort && (
                    <motion.div initial={{ opacity: 0, y: -8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 w-52 z-50">
                      {SORTS.map(s => (
                        <button key={s.id} onClick={() => { setSortBy(s.id); setShowSort(false) }}
                          className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors ${sortBy === s.id ? 'bg-[#F36812]/10 text-[#F36812]' : 'text-gray-700 hover:bg-gray-50'}`}>
                          {sortBy === s.id && <span className="mr-2">✓</span>}{s.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* FILTER */}
              <button onClick={() => { setShowFilter(!showFilter); setShowSort(false) }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${showFilter ? 'text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                style={showFilter ? { background: 'linear-gradient(135deg, #F36812, #d45e0e)' } : {}}>
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Filter</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── FILTER PANEL ── */}
      <AnimatePresence>
        {showFilter && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} className="bg-white border-b border-gray-200 overflow-hidden shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Budget */}
                <div>
                  <p className="text-xs font-extrabold text-gray-700 uppercase tracking-widest mb-3">Max Budget</p>
                  <div className="space-y-2">
                    {[
                      { label: 'Under ₹20,000', val: 20000 },
                      { label: 'Under ₹50,000', val: 50000 },
                      { label: 'Under ₹1,00,000', val: 100000 },
                      { label: 'No Limit', val: 200000 },
                    ].map(r => (
                      <label key={r.val} onClick={() => setPriceMax(r.val)}
                        className="flex items-center gap-2.5 cursor-pointer group">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${priceMax === r.val ? 'border-[#F36812] bg-[#F36812]' : 'border-gray-300 group-hover:border-[#F36812]'}`}>
                          {priceMax === r.val && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{r.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {/* Duration */}
                <div>
                  <p className="text-xs font-extrabold text-gray-700 uppercase tracking-widest mb-3">Trip Duration</p>
                  <div className="space-y-2">
                    {[
                      { label: 'All Durations', id: 'all' },
                      { label: '1–3 Nights (Short Break)', id: 'short' },
                      { label: '4–6 Nights (Regular)', id: 'medium' },
                      { label: '7+ Nights (Extended)', id: 'long' },
                    ].map(d => (
                      <label key={d.id} onClick={() => setDur(d.id)}
                        className="flex items-center gap-2.5 cursor-pointer group">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${dur === d.id ? 'border-[#F36812] bg-[#F36812]' : 'border-gray-300 group-hover:border-[#F36812]'}`}>
                          {dur === d.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{d.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {/* Reset */}
                <div className="flex items-end">
                  <div className="space-y-2 w-full">
                    <button onClick={() => { setPriceMax(200000); setDur('all') }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-[#F36812] text-[#F36812] text-sm font-bold rounded-xl hover:bg-[#F36812]/5 transition-all">
                      <X className="w-4 h-4" /> Reset Filters
                    </button>
                    <button onClick={() => setShowFilter(false)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 text-white text-sm font-bold rounded-xl transition-all"
                      style={{ background: 'linear-gradient(135deg, #F36812, #d45e0e)' }}>
                      <Check className="w-4 h-4" /> Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Results header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-extrabold text-gray-900 text-lg" style={{ fontFamily: "'Poppins',sans-serif" }}>
              {cat === 'all' ? 'All Holiday Packages' : `${CATS.find(c => c.id === cat)?.label} Packages`}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              <span className="font-bold text-[#F36812]">{filtered.length}</span> packages found
              {search && <> matching "<span className="font-semibold text-gray-800">{search}</span>"</>}
              <span className="text-gray-400 mx-1">·</span>
              <span className="text-gray-500">Sorted by <span className="font-semibold text-gray-700">{SORTS.find(s => s.id === sortBy)?.label}</span></span>
            </p>
          </div>
        </div>

        {filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <div className="w-24 h-24 rounded-full bg-[#F36812]/10 flex items-center justify-center mx-auto mb-5">
              <Package className="w-12 h-12 text-[#F36812]" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-2">No packages found</h3>
            <p className="text-gray-500 text-sm mb-6">Try adjusting your filters or search term.</p>
            <button onClick={() => { setSearch(''); setCat('all'); setPriceMax(200000); setDur('all') }}
              className="px-6 py-3 text-white font-bold rounded-xl text-sm"
              style={{ background: 'linear-gradient(135deg, #F36812, #d45e0e)' }}>
              Clear All & Browse
            </button>
          </motion.div>
        ) : (
          <>
            {/* ── FEATURED WIDE CARDS ── */}
            {featured.length > 0 && (
              <div className="mb-7">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 bg-[#F36812] rounded-full" />
                  <h3 className="font-extrabold text-gray-900 text-sm">⭐ Featured Deals</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {featured.map(p => <FeaturedBanner key={p.id} pkg={p} onBook={setPaymentPkg} />)}
                </div>
              </div>
            )}

            {/* ── ALL PACKAGE CARDS GRID ── */}
            {rest.length > 0 && (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 bg-gray-800 rounded-full" />
                  <h3 className="font-extrabold text-gray-900 text-sm">All Packages</h3>
                  <span className="text-xs text-gray-400">({rest.length})</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {rest.map((p, i) => <PkgCard key={p.id} pkg={p} idx={i} onView={setDetailPkg} onBook={setPaymentPkg} />)}
                </div>
              </>
            )}
          </>
        )}

        {/* ── WHY BOOK WITH US ── */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-14 rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
          <div className="p-7 sm:p-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#F36812]" />
                <span className="text-white text-xs font-bold">Why Thousands Trust Us</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white" style={{ fontFamily: "'Poppins',sans-serif" }}>
                The MyPartner Promise
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {[
                { icon: BadgeCheck, title: 'Verified Stays', desc: 'Every hotel personally inspected', col: '#10B981' },
                { icon: Headphones, title: '24/7 Support', desc: 'On-ground team at every destination', col: '#F36812' },
                { icon: Zap, title: 'Instant Booking', desc: 'Confirm your package in 2 minutes', col: '#8B5CF6' },
                { icon: Shield, title: 'Safe & Secure', desc: 'Bank-grade secure payments only', col: '#F59E0B' },
              ].map(w => (
                <div key={w.title} className="text-center group">
                  <div className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{ background: `${w.col}25`, border: `1px solid ${w.col}40` }}>
                    <w.icon className="w-7 h-7" style={{ color: w.col }} />
                  </div>
                  <p className="text-white font-extrabold text-sm mb-1">{w.title}</p>
                  <p className="text-white/50 text-[11px] leading-relaxed">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── CUSTOM PACKAGE CTA ── */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-6 rounded-3xl overflow-hidden relative"
          style={{ background: 'linear-gradient(135deg, #F36812 0%, #e05500 40%, #c24700 100%)' }}>
          {/* decorations */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/8 rounded-full" />
          <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-white/8 rounded-full" />
          <div className="absolute top-4 right-40 w-6 h-6 bg-white/15 rounded-full" />
          <div className="absolute bottom-6 right-20 w-4 h-4 bg-white/15 rounded-full" />

          <div className="relative p-7 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0 shadow-xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">Personalized Experience</p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight" style={{ fontFamily: "'Poppins',sans-serif" }}>
                  Build Your Dream Package
                </h3>
                <p className="text-white/70 text-sm mt-1">Custom itinerary · Your budget · Your dates · Your way</p>
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/app/support')}
              className="flex-shrink-0 flex items-center gap-2.5 px-7 py-4 bg-white font-extrabold text-sm rounded-2xl shadow-2xl hover:shadow-white/30 transition-all"
              style={{ color: '#F36812' }}>
              <Package className="w-5 h-5" />
              Create Custom Package
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* PACKAGE DETAIL MODAL */}
      <AnimatePresence>
        {detailPkg && (
          <PkgDetailModal pkg={detailPkg} onClose={() => setDetailPkg(null)}
            onBook={(p) => { setDetailPkg(null); setPaymentPkg(p) }} />
        )}
      </AnimatePresence>

      {/* RAZORPAY PAYMENT MODAL */}
      <PaymentModal
        isOpen={!!paymentPkg}
        onClose={() => setPaymentPkg(null)}
        bookingType="PACKAGE"
        bookingId={`PKG-${paymentPkg?.id || ''}`}
        baseAmount={paymentPkg?.price || 0}
        title={paymentPkg?.title || 'Package Booking'}
        description={paymentPkg ? `${paymentPkg.dest} · ${paymentPkg.nights}N / ${paymentPkg.nights + 1}D` : ''}
        onSuccess={() => setPaymentPkg(null)}
      />

      {/* Footer */}
      <div className="w-full mt-8">
        <img src="/f2.png" alt="Footer" className="w-full max-h-[250px] object-cover" />
      </div>
    </div>
  )
}
