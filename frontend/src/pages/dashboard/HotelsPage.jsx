import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, MapPin, Calendar, Users, Star, Wifi, Waves, Dumbbell,
  Coffee, UtensilsCrossed, Car, Wind, Tv, ChevronDown, ChevronUp,
  SlidersHorizontal, X, Heart, ArrowUpDown, Check, Building2,
  TreePalm, Hotel, Tent, Home, ChevronRight, ChevronLeft, Shield,
  Clock, ThumbsUp, Zap, Phone, Globe, Info,
  CreditCard, Award, BadgeCheck, Cpu, Mail, Send, Inbox, Paperclip,
  Trash2, FileText, User, Building
} from 'lucide-react'
import AnimatedBlobs from '../../components/ui/AnimatedBlobs.jsx'
import PaymentModal from '../../components/payment/PaymentModal.jsx'

/* →→→ Static Data →→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→ */

const SUGGESTIONS = [
  'Dubai, UAE', 'Goa, India', 'Mumbai, India', 'Bali, Indonesia',
  'Singapore', 'Bangkok, Thailand', 'Jaipur, India', 'Maldives',
  'Manali, India', 'Shimla, India', 'Kerala, India', 'London, UK',
]

const HOTELS = [
  {
    id: 1,
    name: 'The Grand Palace Hotel',
    location: 'Dubai Marina, Dubai',
    stars: 5,
    rating: 4.8,
    reviews: 2340,
    ratingLabel: 'Excellent',
    price: 8999,
    originalPrice: 11999,
    discount: '25% OFF',
    perks: ['Free Cancellation', 'Breakfast Included'],
    amenities: ['wifi', 'pool', 'gym', 'restaurant', 'spa', 'parking'],
    type: 'luxury',
    tag: 'Best Seller',
    tagColor: 'bg-orange-500',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
  },
  {
    id: 2,
    name: 'Ocean Breeze Resort & Spa',
    location: 'Calangute Beach, Goa',
    stars: 4,
    rating: 4.5,
    reviews: 1892,
    ratingLabel: 'Very Good',
    price: 3499,
    originalPrice: 4999,
    discount: '30% OFF',
    perks: ['Free Cancellation'],
    amenities: ['wifi', 'pool', 'restaurant', 'parking'],
    type: 'resort',
    tag: 'Trending',
    tagColor: 'bg-green-500',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80',
  },
  {
    id: 3,
    name: 'Metropolitan Luxury Suites',
    location: 'Marina Bay, Singapore',
    stars: 5,
    rating: 4.9,
    reviews: 3105,
    ratingLabel: 'Exceptional',
    price: 12999,
    originalPrice: 16999,
    discount: '24% OFF',
    perks: ['Free Cancellation', 'Breakfast Included', 'Airport Transfer'],
    amenities: ['wifi', 'pool', 'gym', 'restaurant', 'spa'],
    type: 'luxury',
    tag: 'Premium',
    tagColor: 'bg-violet-600',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80',
  },
  {
    id: 4,
    name: 'Royal Heritage Haveli',
    location: 'Old City, Jaipur',
    stars: 4,
    rating: 4.6,
    reviews: 978,
    ratingLabel: 'Excellent',
    price: 2899,
    originalPrice: 3999,
    discount: '28% OFF',
    perks: ['Free Cancellation', 'Breakfast Included'],
    amenities: ['wifi', 'restaurant', 'parking', 'ac'],
    type: 'heritage',
    tag: 'Heritage Stay',
    tagColor: 'bg-amber-600',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80',
  },
  {
    id: 5,
    name: 'Skyline Business Hotel',
    location: 'Bandra Kurla Complex, Mumbai',
    stars: 4,
    rating: 4.4,
    reviews: 1567,
    ratingLabel: 'Very Good',
    price: 5499,
    originalPrice: 6999,
    discount: '21% OFF',
    perks: ['Free Cancellation'],
    amenities: ['wifi', 'gym', 'restaurant', 'parking', 'ac'],
    type: 'business',
    tag: 'Business',
    tagColor: 'bg-blue-600',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80',
  },
  {
    id: 6,
    name: 'Tropical Water Villa Maldives',
    location: 'North Malƒ© Atoll, Maldives',
    stars: 5,
    rating: 5.0,
    reviews: 4210,
    ratingLabel: 'Exceptional',
    price: 45999,
    originalPrice: 59999,
    discount: '23% OFF',
    perks: ['Breakfast Included', 'All Inclusive Available'],
    amenities: ['wifi', 'pool', 'gym', 'restaurant', 'spa', 'ac'],
    type: 'luxury',
    tag: 'Luxury',
    tagColor: 'bg-cyan-600',
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&q=80',
  },
  {
    id: 7,
    name: 'Snow Peak Mountain Resort',
    location: 'Mall Road, Manali',
    stars: 3,
    rating: 4.2,
    reviews: 743,
    ratingLabel: 'Good',
    price: 1999,
    originalPrice: 2999,
    discount: '33% OFF',
    perks: ['Free Cancellation', 'Breakfast Included'],
    amenities: ['wifi', 'restaurant', 'parking', 'ac'],
    type: 'resort',
    tag: 'Budget Pick',
    tagColor: 'bg-teal-600',
    image: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=600&q=80',
  },
  {
    id: 8,
    name: 'Bangkok Riverside Boutique',
    location: 'Riverside, Bangkok',
    stars: 4,
    rating: 4.7,
    reviews: 1234,
    ratingLabel: 'Excellent',
    price: 6799,
    originalPrice: 8999,
    discount: '24% OFF',
    perks: ['Free Cancellation'],
    amenities: ['wifi', 'pool', 'restaurant', 'spa', 'ac'],
    type: 'boutique',
    tag: 'Popular',
    tagColor: 'bg-rose-500',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80',
  },
]

const DESTINATIONS = [
  { name: 'Dubai', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80', hotels: '5,200+', tag: 'Most Popular' },
  { name: 'Goa', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=80', hotels: '3,800+', tag: 'Beach Getaway' },
  { name: 'Singapore', img: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&q=80', hotels: '2,100+', tag: 'City Break' },
  { name: 'Maldives', img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80', hotels: '480+', tag: 'Luxury Escape' },
  { name: 'Bangkok', img: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&q=80', hotels: '4,600+', tag: 'Budget Friendly' },
  { name: 'Jaipur', img: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&q=80&auto=format&fit=crop', hotels: '1,900+', tag: 'Heritage' },
]

const AMENITY_META = {
  wifi:       { icon: Wifi,             label: 'Free WiFi' },
  pool:       { icon: Waves,            label: 'Pool' },
  gym:        { icon: Dumbbell,         label: 'Gym' },
  restaurant: { icon: UtensilsCrossed,  label: 'Restaurant' },
  spa:        { icon: Wind,             label: 'Spa' },
  parking:    { icon: Car,              label: 'Parking' },
  ac:         { icon: Tv,               label: 'AC' },
}

const SORT_OPTIONS = [
  { value: 'popular',    label: 'Most Popular' },
  { value: 'price_asc',  label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Top Rated' },
  { value: 'discount',   label: 'Highest Discount' },
]

/* →→→ Small reusable components →→→→→→→→→→→→→→→→→→→→ */

function StarRow({ count, size = 'sm' }) {
  const cls = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'
  return (
    <span className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} className={`${cls} ${i <= count ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}`} />
      ))}
    </span>
  )
}

function RatingBadge({ rating, label }) {
  const bg = rating >= 4.8 ? 'bg-green-600' : rating >= 4.5 ? 'bg-green-500' : rating >= 4.0 ? 'bg-blue-500' : 'bg-yellow-500'
  return (
    <div className="flex items-center gap-1.5">
      <span className={`${bg} text-white text-xs font-bold px-1.5 py-0.5 rounded`}>{rating.toFixed(1)}</span>
      <span className="text-xs font-medium text-gray-500">{label}</span>
    </div>
  )
}

/* →→→ Guest Picker →→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→ */

function GuestPicker({ guests, setGuests, rooms, setRooms, open, setOpen }) {
  return (
    <div className="relative">
      <button
        id="guest-picker-btn"
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-3 px-4 py-3.5 bg-gray-50 border-2 border-transparent hover:border-gray-200 focus:border-primary rounded-xl text-left transition-all"
      >
        <Users className="w-5 h-5 text-primary flex-shrink-0" />
        <div>
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Guests &amp; Rooms</p>
          <p className="text-sm font-semibold text-gray-800">{guests} Guest{guests > 1 ? 's' : ''}, {rooms} Room{rooms > 1 ? 's' : ''}</p>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 ml-auto transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
            className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-2xl shadow-2xl p-5 z-50"
          >
            {[
              { label: 'Guests', value: guests, set: setGuests, min: 1, max: 10 },
              { label: 'Rooms',  value: rooms,  set: setRooms,  min: 1, max: 5  },
            ].map(({ label, value, set, min, max }) => (
              <div key={label} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-semibold text-gray-800">{label}</p>
                  <p className="text-xs text-gray-400">{label === 'Rooms' ? 'Max 5 rooms' : 'Max 10 guests'}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => set(Math.max(min, value - 1))} className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary font-bold transition-all">→™</button>
                  <span className="w-5 text-center font-bold text-gray-800">{value}</span>
                  <button onClick={() => set(Math.min(max, value + 1))} className="w-8 h-8 rounded-full border-2 border-primary bg-primary text-white flex items-center justify-center font-bold hover:bg-secondary transition-all">+</button>
                </div>
              </div>
            ))}
            <button onClick={() => setOpen(false)} className="mt-3 w-full py-2 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-secondary transition-all">Done</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* →→→ Filter Sidebar →→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→ */

function FilterSidebar({ filters, setFilters }) {
  const [openSections, setOpenSections] = useState({ price: true, stars: true, amenities: true, type: true, meal: false })
  const toggle = k => setOpenSections(p => ({ ...p, [k]: !p[k] }))

  const toggleArr = (key, val) =>
    setFilters(f => ({ ...f, [key]: f[key].includes(val) ? f[key].filter(x => x !== val) : [...f[key], val] }))

  const Section = ({ id, title, children }) => (
    <div className="border-b border-gray-100 pb-4 mb-4 last:border-0">
      <button onClick={() => toggle(id)} className="flex items-center justify-between w-full mb-3 group">
        <span className="font-bold text-gray-800 text-sm group-hover:text-primary transition-colors">{title}</span>
        {openSections[id] ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      <AnimatePresence>
        {openSections[id] && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  const Checkbox = ({ label, checked, onChange }) => (
    <label className="flex items-center gap-2.5 cursor-pointer group mb-2.5">
      <div
        onClick={onChange}
        style={{ width: 18, height: 18 }}
        className={`rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${checked ? 'bg-primary border-primary' : 'border-gray-300 group-hover:border-primary'}`}
      >
        {checked && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
      </div>
      <span className="text-sm text-gray-600 group-hover:text-gray-800">{label}</span>
    </label>
  )

  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-5 sticky top-20">
      {/* Stars */}
      <Section id="stars" title="Star Rating">
        {[5,4,3,2,1].map(s => (
          <Checkbox
            key={s}
            label={<span className="flex items-center gap-1.5"><StarRow count={s} /> <span className="text-gray-500">{s} Star{s>1?'s':''}</span></span>}
            checked={filters.stars.includes(s)}
            onChange={() => toggleArr('stars', s)}
          />
        ))}
      </Section>

      {/* Amenities */}
      <Section id="amenities" title="Amenities">
        {Object.entries(AMENITY_META).map(([key, { label }]) => (
          <Checkbox key={key} label={label} checked={filters.amenities.includes(key)} onChange={() => toggleArr('amenities', key)} />
        ))}
      </Section>

      {/* Property Type */}
      <Section id="type" title="Property Type">
        {[
          { val: 'luxury',   label: 'Luxury Hotel',   Icon: Hotel },
          { val: 'resort',   label: 'Resort',          Icon: TreePalm },
          { val: 'business', label: 'Business Hotel',  Icon: Building2 },
          { val: 'boutique', label: 'Boutique Hotel',  Icon: Home },
          { val: 'heritage', label: 'Heritage Hotel',  Icon: Tent },
        ].map(({ val, label, Icon }) => (
          <Checkbox
            key={val}
            label={<span className="flex items-center gap-1.5"><Icon className="w-3.5 h-3.5 text-gray-400" />{label}</span>}
            checked={filters.types.includes(val)}
            onChange={() => toggleArr('types', val)}
          />
        ))}
      </Section>

      {/* Meal Plan */}
      <Section id="meal" title="Meal Plan">
        {['Breakfast Included','All Inclusive','Room Only'].map(m => (
          <Checkbox key={m} label={m} checked={filters.meal.includes(m)} onChange={() => toggleArr('meal', m)} />
        ))}
      </Section>

      <button className="w-full py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-secondary transition-all shadow-md hover:shadow-glow mt-1">
        Apply Filters
      </button>
    </div>
  )
}

/* →→→ Hotel Card →→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→ */

function HotelCard({ hotel, index, onViewDetails, onBookNow }) {
  const [liked, setLiked] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden hover:shadow-floating transition-all duration-300 group flex flex-col md:flex-row"
    >
      {/* Image */}
      <div className="relative md:w-72 lg:w-80 flex-shrink-0 h-52 md:h-auto overflow-hidden">
        <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <span className={`absolute top-3 left-3 ${hotel.tagColor} text-white text-[11px] font-bold px-2.5 py-1 rounded-full`}>{hotel.tag}</span>
        <button
          onClick={() => setLiked(v => !v)}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all backdrop-blur-sm ${liked ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-500 hover:text-red-500'}`}
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-white' : ''}`} />
        </button>
        <div className="absolute bottom-3 left-3">
          <StarRow count={hotel.stars} size="md" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex-1">
          {/* Name + Rating */}
          <div className="flex items-start justify-between gap-3 mb-1.5">
            <h3 className="text-base font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors">{hotel.name}</h3>
            <div className="flex-shrink-0 text-right">
              <RatingBadge rating={hotel.rating} label={hotel.ratingLabel} />
              <p className="text-[11px] text-gray-400 mt-0.5">{hotel.reviews.toLocaleString()} reviews</p>
            </div>
          </div>

          {/* Location */}
          <p className="text-sm text-gray-500 flex items-center gap-1 mb-3">
            <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            {hotel.location}
          </p>

          {/* Perks */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {hotel.perks.map(p => (
              <span key={p} className="inline-flex items-center gap-1 text-[11px] font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                <Check className="w-2.5 h-2.5" strokeWidth={3} /> {p}
              </span>
            ))}
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-1.5">
            {hotel.amenities.slice(0, 5).map(key => {
              const meta = AMENITY_META[key]
              if (!meta) return null
              const { icon: Icon, label } = meta
              return (
                <span key={key} title={label} className="inline-flex items-center gap-1 text-[11px] text-gray-500 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full">
                  <Icon className="w-3 h-3 text-gray-400" /> {label}
                </span>
              )
            })}
            {hotel.amenities.length > 5 && (
              <span className="text-[11px] text-primary font-semibold self-center">+{hotel.amenities.length - 5} more</span>
            )}
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex items-end justify-between pt-4 mt-3 border-t border-gray-100">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-400 line-through">₹{hotel.originalPrice.toLocaleString()}</span>
              <span className="text-xs font-bold text-red-500">{hotel.discount}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-primary">₹{hotel.price.toLocaleString()}</span>
              <span className="text-xs text-gray-400">/night</span>
            </div>
            <p className="text-[11px] text-gray-400">+ taxes &amp; fees</p>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <button
              onClick={() => onBookNow(hotel)}
              className="px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-secondary transition-all shadow-md hover:shadow-glow active:scale-95"
            >
              Book Now
            </button>
            <button
              onClick={() => onViewDetails(hotel)}
              className="text-xs text-primary font-semibold hover:underline"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* →→→ Main Page →→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→→ */

/* Hotel Mailing System Data */
const MAIL_TEMPLATES = [
  { id: 'quote', label: 'Hotel Quote', subject: 'Hotel Quotation - {HotelName}', body: 'Dear {ClientName},\n\nPlease find below the hotel quotation as per your requirement:\n\nHotel: {HotelName}\nLocation: {Location}\nCheck-in: {CheckIn}\nCheck-out: {CheckOut}\nGuests: {Guests}\nRooms: {Rooms}\n\nPrice: Rs. {Price}/night (Inclusive of all taxes)\n\nPlease let us know if you need any modifications.\n\nBest Regards,\nTravel Team' },
  { id: 'booking', label: 'Booking Confirmation', subject: 'Booking Confirmed - {HotelName}', body: 'Dear {ClientName},\n\nYour hotel booking has been confirmed!\n\nHotel: {HotelName}\nLocation: {Location}\nCheck-in: {CheckIn}\nCheck-out: {CheckOut}\nBooking ID: HTL{Date}\n\nWe have attached the voucher to this email. Please carry a printout at check-in.\n\nBest Regards,\nTravel Team' },
  { id: 'inquiry', label: 'Hotel Inquiry', subject: 'Hotel Availability Inquiry - {Location}', body: 'Dear {ClientName},\n\nThank you for your inquiry. We are checking availability for the following:\n\nDestination: {Location}\nCheck-in: {CheckIn}\nCheck-out: {CheckOut}\nGuests: {Guests}\nRooms: {Rooms}\n\nWe will get back to you within 2 hours with the best available options.\n\nBest Regards,\nTravel Team' },
  { id: 'voucher', label: 'Voucher Email', subject: 'Hotel Voucher - {HotelName}', body: 'Dear {ClientName},\n\nPlease find your hotel voucher attached for your upcoming stay:\n\nHotel: {HotelName}\nLocation: {Location}\nCheck-in: {CheckIn}\nCheck-out: {CheckOut}\n\nImportant: Please present this voucher at the reception during check-in.\n\nBest Regards,\nTravel Team' },
]

const SENT_MAILS = [
  { id: 1, to: 'rajesh@corporate.in', client: 'Rajesh Kumar', hotel: 'The Grand Palace Hotel', subject: 'Hotel Quotation - The Grand Palace Hotel', status: 'delivered', time: '2 hours ago', template: 'quote' },
  { id: 2, to: 'priya@gmail.com', client: 'Priya Sharma', hotel: 'Ocean Breeze Resort & Spa', subject: 'Booking Confirmed - Ocean Breeze Resort', status: 'opened', time: '5 hours ago', template: 'booking' },
  { id: 3, to: 'amit@business.co', client: 'Amit Verma', hotel: 'Skyline Business Hotel', subject: 'Hotel Availability Inquiry - Mumbai', status: 'delivered', time: '1 day ago', template: 'inquiry' },
  { id: 4, to: 'sneha@yahoo.com', client: 'Sneha Patel', hotel: 'Tropical Water Villa Maldives', subject: 'Hotel Voucher - Tropical Water Villa', status: 'opened', time: '2 days ago', template: 'voucher' },
]

function HotelMailingSystem() {
  const [activeTab, setActiveTab] = useState('compose')
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [recipient, setRecipient] = useState('')
  const [clientName, setClientName] = useState('')
  const [selectedHotel, setSelectedHotel] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [attachments, setAttachments] = useState([])
  const [sentMails, setSentMails] = useState(SENT_MAILS)
  const [sending, setSending] = useState(false)
  const [sentSuccess, setSentSuccess] = useState(false)

  const applyTemplate = (tpl) => {
    setSelectedTemplate(tpl.id)
    const hotel = HOTELS.find(h => h.name === selectedHotel) || HOTELS[0]
    const filledSubject = tpl.subject
      .replace('{HotelName}', hotel.name)
      .replace('{Location}', hotel.location)
    const filledBody = tpl.body
      .replace('{ClientName}', clientName || 'Client')
      .replace('{HotelName}', hotel.name)
      .replace('{Location}', hotel.location)
      .replace('{CheckIn}', '20 Jul 2025')
      .replace('{CheckOut}', '23 Jul 2025')
      .replace('{Guests}', '2 Guests')
      .replace('{Rooms}', '1 Room')
      .replace('{Price}', hotel.price.toLocaleString('en-IN'))
      .replace('{Date}', new Date().toISOString().slice(0,10).replace(/-/g,''))
    setSubject(filledSubject)
    setBody(filledBody)
  }

  const handleSend = () => {
    if (!recipient || !subject || !body) return
    setSending(true)
    setTimeout(() => {
      setSending(false)
      const hotel = HOTELS.find(h => h.name === selectedHotel) || HOTELS[0]
      const newMail = {
        id: Date.now(),
        to: recipient,
        client: clientName || 'Client',
        hotel: hotel.name,
        subject,
        status: 'delivered',
        time: 'Just now',
        template: selectedTemplate || 'custom',
      }
      setSentMails([newMail, ...sentMails])
      setSentSuccess(true)
      setRecipient('')
      setClientName('')
      setSubject('')
      setBody('')
      setAttachments([])
      setSelectedTemplate(null)
      setTimeout(() => setSentSuccess(false), 3000)
    }, 1500)
  }

  const handleAttach = () => {
    const types = ['Voucher.pdf', 'Invoice.pdf', 'Terms.pdf', 'Photos.zip']
    const random = types[Math.floor(Math.random() * types.length)]
    if (!attachments.includes(random)) setAttachments([...attachments, random])
  }

  const statusColor = {
    delivered: 'text-green-600 bg-green-50 border-green-200',
    opened: 'text-blue-600 bg-blue-50 border-blue-200',
    bounced: 'text-red-600 bg-red-50 border-red-200',
  }

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-[#0B1A30] via-[#1D4ED8] to-[#1E40AF] relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-[#2563EB]/20 blur-3xl pointer-events-none" />

      <div className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-glow">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">Hotel Mailing System</h2>
            <p className="text-sm text-white/60">Send quotes, vouchers &amp; booking confirmations directly to clients</p>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab('compose')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold transition-all ${activeTab === 'compose' ? 'text-primary border-b-2 border-primary bg-blue-50/50' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Send className="w-4 h-4" /> Compose
          </button>
          <button
            onClick={() => setActiveTab('sent')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold transition-all ${activeTab === 'sent' ? 'text-primary border-b-2 border-primary bg-blue-50/50' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Inbox className="w-4 h-4" /> Sent Mails
            <span className="ml-1 text-[10px] bg-primary text-white px-1.5 py-0.5 rounded-full">{sentMails.length}</span>
          </button>
        </div>

        <div className="p-5">
          {activeTab === 'compose' ? (
            <div className="space-y-4">
              {/* Templates */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Quick Templates</p>
                <div className="flex flex-wrap gap-2">
                  {MAIL_TEMPLATES.map(tpl => (
                    <button
                      key={tpl.id}
                      onClick={() => applyTemplate(tpl)}
                      className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-all ${selectedTemplate === tpl.id ? 'bg-primary text-white border-primary shadow-md' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-primary hover:text-primary'}`}
                    >
                      <FileText className="w-3.5 h-3.5" /> {tpl.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipient + Client Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Recipient Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={recipient}
                      onChange={e => setRecipient(e.target.value)}
                      placeholder="client@example.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-2 border-transparent rounded-xl text-sm font-medium text-gray-800 focus:border-primary focus:bg-white outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Client Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={clientName}
                      onChange={e => setClientName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-2 border-transparent rounded-xl text-sm font-medium text-gray-800 focus:border-primary focus:bg-white outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Hotel Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Select Hotel</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={selectedHotel}
                    onChange={e => { setSelectedHotel(e.target.value); if (selectedTemplate) { const tpl = MAIL_TEMPLATES.find(t => t.id === selectedTemplate); if (tpl) applyTemplate(tpl) } }}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-2 border-transparent rounded-xl text-sm font-medium text-gray-800 focus:border-primary focus:bg-white outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="">-- Select a hotel --</option>
                    {HOTELS.map(h => (
                      <option key={h.id} value={h.name}>{h.name} - {h.location}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder="Email subject"
                  className="w-full px-4 py-2.5 bg-gray-50 border-2 border-transparent rounded-xl text-sm font-medium text-gray-800 focus:border-primary focus:bg-white outline-none transition-all"
                />
              </div>

              {/* Body */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Message</label>
                <textarea
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  rows={8}
                  placeholder="Type your message here..."
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl text-sm font-medium text-gray-800 focus:border-primary focus:bg-white outline-none transition-all resize-y"
                />
              </div>

              {/* Attachments */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Attachments</p>
                  <button onClick={handleAttach} className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                    <Paperclip className="w-3.5 h-3.5" /> Add Attachment
                  </button>
                </div>
                {attachments.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {attachments.map((file, i) => (
                      <div key={i} className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-xs font-semibold text-blue-700">
                        <FileText className="w-3.5 h-3.5" />
                        {file}
                        <button onClick={() => setAttachments(attachments.filter((_, idx) => idx !== i))} className="ml-1 hover:text-red-500">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 italic">No attachments added</p>
                )}
              </div>

              {/* Send Button */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                {sentSuccess ? (
                  <div className="inline-flex items-center gap-2 text-sm font-bold text-green-600">
                    <Check className="w-4 h-4" /> Email sent successfully!
                  </div>
                ) : (
                  <p className="text-xs text-gray-400">{recipient ? `Sending to: ${recipient}` : 'Fill in recipient to send'}</p>
                )}
                <button
                  onClick={handleSend}
                  disabled={!recipient || !subject || !body || sending}
                  className="inline-flex items-center gap-2 px-6 py-2.5 gradient-bg text-white text-sm font-bold rounded-xl shadow-md hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                  {sending ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                      Sending...
                    </>
                  ) : (
                    <><Send className="w-4 h-4" /> Send Email</>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {sentMails.length === 0 ? (
                <div className="text-center py-12">
                  <Inbox className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-400 font-semibold text-sm">No emails sent yet</p>
                </div>
              ) : (
                sentMails.map(mail => (
                  <div key={mail.id} className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-blue-50/30 transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-bold text-gray-900 truncate">{mail.subject}</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColor[mail.status] || statusColor.delivered}`}>{mail.status}</span>
                      </div>
                      <p className="text-xs text-gray-500">To: {mail.client} &lt;{mail.to}&gt;</p>
                      <p className="text-xs text-gray-400 mt-0.5">Hotel: {mail.hotel} - {mail.time}</p>
                    </div>
                    <button
                      onClick={() => setSentMails(sentMails.filter(m => m.id !== mail.id))}
                      className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        </div>
      </div>
    </section>
  )
}

function HotelDetailModal({ hotel, onClose, onBookNow }) {
  if (!hotel) return null

  const galleryImages = [
    hotel.image,
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80',
  ]

  const reviews = [
    { name: 'Rajesh Kumar', rating: 5, date: '2 weeks ago', text: 'Excellent stay! The staff was very courteous and the rooms were spotless. Great value for money.' },
    { name: 'Priya Sharma', rating: 4, date: '1 month ago', text: 'Beautiful property with amazing views. The breakfast spread could be better but overall a lovely experience.' },
    { name: 'Amit Verma', rating: 5, date: '1 month ago', text: 'Perfect location, walking distance to all attractions. The pool and gym facilities are top-notch.' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold text-white ${hotel.tagColor}`}>{hotel.tag}</span>
              <StarRow count={hotel.stars} size="md" />
            </div>
            <h2 className="text-2xl font-extrabold text-white">{hotel.name}</h2>
            <p className="text-sm text-white/80 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5" /> {hotel.location}
            </p>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <span className="inline-block bg-green-600 text-white text-lg font-bold px-3 py-1 rounded-lg">{hotel.rating.toFixed(1)}</span>
                <p className="text-xs text-gray-500 mt-1 font-medium">{hotel.ratingLabel}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{hotel.reviews.toLocaleString()} reviews</p>
                <p className="text-xs text-gray-400">Based on guest feedback</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end">
                <span className="text-sm text-gray-400 line-through">₹{hotel.originalPrice.toLocaleString()}</span>
                <span className="text-xs font-bold text-red-500">{hotel.discount}</span>
              </div>
              <div className="flex items-baseline gap-1 justify-end">
                <span className="text-3xl font-extrabold text-primary">₹{hotel.price.toLocaleString()}</span>
                <span className="text-xs text-gray-400">/night</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3">What's Included</h3>
            <div className="flex flex-wrap gap-2">
              {hotel.perks.map(p => (
                <span key={p} className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
                  <Check className="w-3 h-3" strokeWidth={3} /> {p}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3">Amenities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {hotel.amenities.map(key => {
                const meta = AMENITY_META[key]
                if (!meta) return null
                const { icon: Icon, label } = meta
                return (
                  <div key={key} className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3">Gallery</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {galleryImages.map((img, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden h-24 group cursor-pointer">
                  <img src={img} alt={`Gallery ${i+1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3">Guest Reviews</h3>
            <div className="space-y-3">
              {reviews.map((rev, i) => (
                <div key={i} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                        {rev.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{rev.name}</p>
                        <p className="text-xs text-gray-400">{rev.date}</p>
                      </div>
                    </div>
                    <StarRow count={rev.rating} />
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{rev.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-gray-100">
            <button
              onClick={onClose}
              className="flex-1 py-3.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all"
            >
              Close
            </button>
            <button
              onClick={() => onBookNow(hotel)}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 gradient-bg text-white font-bold rounded-xl shadow-glow hover:shadow-floating transition-all active:scale-95"
            >
              Book Now - ₹{hotel.price.toLocaleString()}/night
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function HotelsPage() {
  const [destination, setDestination]   = useState('')
  const [showSuggestions, setShowSugg]  = useState(false)
  const [checkIn,  setCheckIn]          = useState('')
  const [checkOut, setCheckOut]         = useState('')
  const [guests,   setGuests]           = useState(2)
  const [rooms,    setRooms]            = useState(1)
  const [guestOpen, setGuestOpen]       = useState(false)
  const [sortBy,   setSortBy]           = useState('popular')
  const [showSort, setShowSort]         = useState(false)
  const [activePage, setActivePage]     = useState(1)
  const [filters, setFilters]           = useState({ priceMax: 60000, stars: [], amenities: [], types: [], meal: [] })
  const [detailHotel, setDetailHotel]   = useState(null)
  const [paymentHotel, setPaymentHotel] = useState(null)

  const suggestRef = useRef(null)
  const sortRef    = useRef(null)

  const filteredSugg = SUGGESTIONS.filter(s =>
    destination.length > 0 && s.toLowerCase().includes(destination.toLowerCase())
  )

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = e => {
      if (suggestRef.current && !suggestRef.current.contains(e.target)) setShowSugg(false)
      if (sortRef.current    && !sortRef.current.contains(e.target))    setShowSort(false)
      if (!e.target.closest('#guest-picker-btn') && !e.target.closest('[data-guest-picker]')) setGuestOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Filter + sort
  const visibleHotels = HOTELS
    .filter(h => {
      if (h.price > filters.priceMax) return false
      if (filters.stars.length     && !filters.stars.includes(h.stars))                       return false
      if (filters.amenities.length && !filters.amenities.every(a => h.amenities.includes(a))) return false
      if (filters.types.length     && !filters.types.includes(h.type))                        return false
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'price_asc')  return a.price - b.price
      if (sortBy === 'price_desc') return b.price - a.price
      if (sortBy === 'rating')     return b.rating - a.rating
      if (sortBy === 'discount')   return parseInt(b.discount) - parseInt(a.discount)
      return b.reviews - a.reviews
    })

  return (
    <div className="min-h-screen gradient-mesh relative">
      <AnimatedBlobs />

      {/*  HERO SEARCH  */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=2000&q=100&auto=format&fit=crop"
            alt="Hotel hero"
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=2000&q=100&auto=format&fit=crop' }}
          />
        </div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          {/* Search box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="max-w-3xl mx-auto bg-white rounded-full shadow-2xl flex flex-wrap md:flex-nowrap items-center p-2 gap-1"
          >
            {/* Destination */}
            <div ref={suggestRef} className="relative flex-1 min-w-[45%] md:min-w-0">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-full focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/30 transition-all">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Where to?"
                  value={destination}
                  onChange={e => { setDestination(e.target.value); setShowSugg(true) }}
                  onFocus={() => setShowSugg(true)}
                  className="w-full text-sm font-semibold text-gray-800 placeholder:text-gray-400 bg-transparent outline-none"
                />
              </div>
              <AnimatePresence>
                {showSuggestions && filteredSugg.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                    className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden"
                  >
                    {filteredSugg.map(s => (
                      <button key={s} onClick={() => { setDestination(s); setShowSugg(false) }}
                        className="flex items-center gap-2.5 w-full px-4 py-2.5 hover:bg-blue-50 text-left transition-colors">
                        <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span className="text-sm text-gray-700">{s}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Check-in */}
            <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-full">
              <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
              <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)}
                className="w-full text-sm font-semibold text-gray-800 bg-transparent outline-none cursor-pointer" />
            </div>

            {/* Check-out */}
            <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-full">
              <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
              <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)}
                className="w-full text-sm font-semibold text-gray-800 bg-transparent outline-none cursor-pointer" />
            </div>

            {/* Guests */}
            <div data-guest-picker className="flex-1">
              <GuestPicker guests={guests} setGuests={setGuests} rooms={rooms} setRooms={setRooms} open={guestOpen} setOpen={setGuestOpen} />
            </div>

            {/* Search Button */}
            <button className="w-12 h-12 shrink-0 gradient-bg text-white rounded-full flex items-center justify-center hover:shadow-glow transition-all active:scale-95">
              <Search className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>

      {/*  POPULAR DESTINATIONS  */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900">Popular Destinations</h2>
            <p className="text-sm text-gray-500 mt-0.5">Explore top-rated destinations with the best hotel deals</p>
          </div>
          <button className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {DESTINATIONS.map((d, i) => (
            <motion.button
              key={d.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-floating transition-all duration-300"
              style={{ aspectRatio: '3/4' }}
            >
              <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                <p className="text-white font-bold text-sm leading-tight">{d.name}</p>
                <p className="text-white/70 text-[11px]">{d.hotels} Hotels</p>
                <span className="mt-1 inline-block text-[10px] bg-primary/80 text-white px-1.5 py-0.5 rounded-full font-semibold">{d.tag}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/*  SEARCH RESULTS  */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12 max-w-7xl mx-auto">
        <div>

          {/* Results column */}
          <div className="flex-1 min-w-0">

            {/* Sort / count bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 bg-white rounded-xl border border-gray-100 shadow-soft px-4 py-3">
              <div>
                <span className="text-sm font-bold text-gray-900">{visibleHotels.length} Hotels found</span>
                {destination && (
                  <span className="text-sm text-gray-400"> in <span className="text-primary font-semibold">{destination}</span></span>
                )}
              </div>
              <div className="flex items-center gap-3" ref={sortRef}>
                {/* Sort dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowSort(v => !v)}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg px-3 py-1.5 hover:border-primary hover:text-primary transition-all bg-white"
                  >
                    <ArrowUpDown className="w-3.5 h-3.5" />
                    {SORT_OPTIONS.find(s => s.value === sortBy)?.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <AnimatePresence>
                    {showSort && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                        className="absolute right-0 top-full mt-1.5 w-52 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden"
                      >
                        {SORT_OPTIONS.map(opt => (
                          <button key={opt.value} onClick={() => { setSortBy(opt.value); setShowSort(false) }}
                            className={`flex items-center justify-between w-full px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors ${sortBy === opt.value ? 'text-primary font-bold bg-blue-50' : 'text-gray-700'}`}>
                            {opt.label}
                            {sortBy === opt.value && <Check className="w-3.5 h-3.5 text-primary" />}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Cards */}
            {visibleHotels.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <Hotel className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-semibold">No hotels match your filters.</p>
                <button
                  onClick={() => setFilters({ priceMax: 60000, stars: [], amenities: [], types: [], meal: [] })}
                  className="mt-3 text-primary text-sm font-bold hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {visibleHotels.map((hotel, i) => (
                  <HotelCard
                    key={hotel.id}
                    hotel={hotel}
                    index={i}
                    onViewDetails={setDetailHotel}
                    onBookNow={setPaymentHotel}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {visibleHotels.length > 0 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setActivePage(p => Math.max(1, p - 1))}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:border-primary hover:text-primary transition-all text-gray-500"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {[1,2,3,'...',8].map((p, i) => (
                  <button
                    key={i}
                    onClick={() => typeof p === 'number' && setActivePage(p)}
                    className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all ${
                      p === activePage
                        ? 'bg-primary text-white shadow-md'
                        : p === '...'
                          ? 'cursor-default text-gray-400'
                          : 'border border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setActivePage(p => Math.min(8, p + 1))}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:border-primary hover:text-primary transition-all text-gray-500"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/*  HOTEL MAILING SYSTEM  */}
      <HotelMailingSystem />

      {/*  HOW TO BOOK  */}
      <section className="bg-white border-t border-gray-100 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-extrabold text-gray-900 mb-8 text-center">How to Book Hotels</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step:'01', Icon: Search,  title:'Search Your Stay',   desc:'Enter your destination, dates and guests. Use filters to narrow down the perfect property for your needs.' },
              { step:'02', Icon: Star,    title:'Compare & Choose',   desc:'Browse listings with real photos, ratings, transparent pricing and amenities. Compare deals side by side.' },
              { step:'03', Icon: Zap,     title:'Instant Booking',    desc:'Book in 3 clicks with secure payment. Receive instant confirmation via email with all your booking details.' },
            ].map(({ step, Icon, title, desc }) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="relative text-center p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:border-primary/30 hover:bg-blue-50/30 transition-all group"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-white text-xs font-extrabold flex items-center justify-center shadow-md">{step}</div>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 mt-2 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/*  WHY BOOK WITH US  */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
        <h2 className="text-xl font-extrabold text-gray-900 mb-6 text-center">Why Book Hotels With Us?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { Icon: Globe,    label:'2M+ Properties',  sub:'Worldwide coverage',       color:'text-blue-500 bg-blue-50' },
            { Icon: Shield,   label:'Secure Payments', sub:'256-bit SSL encrypted',    color:'text-green-500 bg-green-50' },
            { Icon: ThumbsUp, label:'Best Price',      sub:'Price match guarantee',    color:'text-orange-500 bg-orange-50' },
            { Icon: Clock,    label:'24/7 Support',    sub:'Always here to help',      color:'text-purple-500 bg-purple-50' },
          ].map(({ Icon, label, sub, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-soft p-5 text-center hover:shadow-card transition-all">
              <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mx-auto mb-3`}>
                <Icon className="w-6 h-6" />
              </div>
              <p className="font-bold text-gray-900 text-sm">{label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/*  POPULAR HOTEL LINKS  */}
      <section className="bg-white border-t border-gray-100 px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-base font-bold text-gray-700 mb-4 flex items-center gap-2">
            <Info className="w-4 h-4 text-primary" /> Popular Hotel Searches
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              'Best Hotels in Mumbai','Luxury Hotels in Dubai','Budget Hotels in Goa',
              'Hotels in Jaipur','Resorts in Maldives','Hotels in Singapore',
              'Hotels in Bangkok','Heritage Hotels in Rajasthan','Hotels in Manali',
              'Hotels in Shimla','Hotels in Kerala','Hotels in Ooty',
              'Hotels in Coorg','Beach Resorts in Goa','Hotels in Agra',
            ].map(link => (
              <button key={link} className="text-xs text-blue-600 hover:text-primary border border-blue-100 bg-blue-50 px-3 py-1.5 rounded-full transition-all hover:bg-blue-100 hover:border-blue-200">
                {link}
              </button>
            ))}
          </div>
        </div>
      </section>


      {/* Hotel Detail Modal */}
      <AnimatePresence>
        {detailHotel && (
          <HotelDetailModal
            hotel={detailHotel}
            onClose={() => setDetailHotel(null)}
            onBookNow={(hotel) => {
              setDetailHotel(null)
              setPaymentHotel(hotel)
            }}
          />
        )}
      </AnimatePresence>

      {/* Razorpay Payment Modal */}
      <PaymentModal
        isOpen={!!paymentHotel}
        onClose={() => setPaymentHotel(null)}
        bookingType="HOTEL"
        bookingId={`HTL-${paymentHotel?.id || ''}`}
        baseAmount={paymentHotel?.price || 0}
        title={paymentHotel?.name || 'Hotel Booking'}
        description={`${paymentHotel?.location || ''} - ${paymentHotel?.perks?.join(', ') || ''}`}
        onSuccess={(result) => {
          setPaymentHotel(null)
        }}
      />

      {/* Footer */}
      <div className="w-full mt-8">
        <img src="/f2.png" alt="Footer" className="w-full max-h-[250px] object-cover" />
      </div>
    </div>
  )
}
