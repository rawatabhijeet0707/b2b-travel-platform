import { motion } from 'framer-motion'
import { Star, Clock, Plane, Check, X, ArrowRight, MapPin, Wifi, Waves, Dumbbell, Coffee, UtensilsCrossed, Car, Shield, Zap } from 'lucide-react'

const amenityIcons = { WiFi: Wifi, Pool: Waves, Gym: Dumbbell, Restaurant: UtensilsCrossed, Bar: Coffee, Beach: Waves, 'Cultural Tours': MapPin, Spa: Shield }

export function FlightCard({ flight, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ scale: 1.01 }}
      className="glass-strong rounded-2xl p-4 border border-white/40 shadow-soft cursor-pointer group"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-11 h-11 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-xs shrink-0">
          {flight.logo}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-heading truncate">{flight.airline}</p>
          <div className="flex items-center gap-1 text-xs text-text-secondary">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span className="font-semibold">{flight.rating}</span>
            <span>·</span>
            <span>{flight.stops}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div className="text-center">
          <p className="text-base font-bold text-heading">{flight.depart}</p>
          <p className="text-[10px] text-text-tertiary">{flight.from}</p>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <Clock className="w-3 h-3 text-text-tertiary mb-0.5" />
          <div className="w-full h-px bg-border relative">
            <div className="absolute -top-1 left-0 w-1.5 h-1.5 rounded-full bg-primary" />
            <div className="absolute -top-1 right-0 w-1.5 h-1.5 rounded-full bg-primary" />
          </div>
          <p className="text-[10px] text-text-tertiary mt-0.5">{flight.duration}</p>
        </div>
        <div className="text-center">
          <p className="text-base font-bold text-heading">{flight.arrive}</p>
          <p className="text-[10px] text-text-tertiary">{flight.to}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {flight.refundable && (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
            <Check className="w-2.5 h-2.5" /> Refundable
          </span>
        )}
        {flight.meal && (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
            <UtensilsCrossed className="w-2.5 h-2.5" /> Meal
          </span>
        )}
        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-text-secondary bg-white/40 border border-border px-2 py-0.5 rounded-full">
          {flight.baggage}
        </span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <div>
          <p className="text-lg font-extrabold text-heading">{"\u20B9"}{flight.price.toLocaleString('en-IN')}</p>
          <p className="text-[10px] text-text-tertiary">per person</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="px-4 py-2 gradient-bg text-white text-xs font-bold rounded-xl shadow-glow flex items-center gap-1"
        >
          Book <ArrowRight className="w-3 h-3" />
        </motion.button>
      </div>
    </motion.div>
  )
}

export function HotelCard({ hotel, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ scale: 1.01 }}
      className="glass-strong rounded-2xl overflow-hidden border border-white/40 shadow-soft cursor-pointer group"
    >
      <div className="relative h-32 overflow-hidden">
        <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute top-2 left-2 px-2 py-0.5 glass-strong rounded-full text-[10px] font-bold text-heading">
          {hotel.tag}
        </div>
        <div className="absolute top-2 right-2 px-2 py-0.5 bg-green-500 rounded-full text-[10px] font-bold text-white flex items-center gap-1">
          <Star className="w-2.5 h-2.5 fill-white" /> {hotel.rating}
        </div>
      </div>
      <div className="p-3.5">
        <p className="text-sm font-bold text-heading truncate">{hotel.name}</p>
        <p className="text-xs text-text-secondary flex items-center gap-1 mb-2">
          <MapPin className="w-3 h-3" /> {hotel.location}
        </p>
        <div className="flex flex-wrap gap-1 mb-3">
          {hotel.amenities.slice(0, 4).map(a => {
            const Icon = amenityIcons[a] || Check
            return (
              <span key={a} className="inline-flex items-center gap-1 text-[10px] text-text-secondary bg-white/40 border border-border px-1.5 py-0.5 rounded-full">
                <Icon className="w-2.5 h-2.5" /> {a}
              </span>
            )
          })}
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div>
            <p className="text-base font-extrabold text-heading">{"\u20B9"}{hotel.price.toLocaleString('en-IN')}</p>
            <p className="text-[10px] text-text-tertiary">per night · {hotel.reviews} reviews</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="px-3 py-1.5 gradient-bg text-white text-xs font-bold rounded-xl shadow-glow"
          >
            Book Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export function PackageCard({ pkg, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ scale: 1.01 }}
      className="glass-strong rounded-2xl overflow-hidden border border-white/40 shadow-soft cursor-pointer group"
    >
      <div className="relative h-32 overflow-hidden">
        <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute top-2 left-2 px-2 py-0.5 gradient-bg rounded-full text-[10px] font-bold text-white">
          {pkg.tag}
        </div>
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-2">
          <p className="text-white text-sm font-bold">{pkg.title}</p>
          <p className="text-white/80 text-xs">{pkg.destination}</p>
        </div>
      </div>
      <div className="p-3.5">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
            <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {pkg.rating}
          </span>
          <span className="text-xs text-text-tertiary">·</span>
          <span className="text-xs text-text-secondary">{pkg.nights}N / {pkg.nights + 1}D</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {pkg.highlights.slice(0, 3).map(h => (
            <span key={h} className="text-[10px] text-text-secondary bg-white/40 border border-border px-1.5 py-0.5 rounded-full">
              {h}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div>
            <p className="text-base font-extrabold text-heading">{"\u20B9"}{pkg.price.toLocaleString('en-IN')}</p>
            <p className="text-[10px] text-text-tertiary">per person</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="px-3 py-1.5 gradient-bg text-white text-xs font-bold rounded-xl shadow-glow"
          >
            Book Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export function VisaCard({ visa, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ scale: 1.01 }}
      className="glass-strong rounded-2xl p-4 border border-white/40 shadow-soft cursor-pointer"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{visa.flag}</span>
        <div className="flex-1">
          <p className="text-sm font-bold text-heading">{visa.country}</p>
          <p className="text-xs text-text-secondary">{visa.type} · {visa.valid}</p>
        </div>
        {visa.popular && (
          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
            Popular
          </span>
        )}
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-border/50">
        <div>
          <p className="text-base font-extrabold text-heading">{"\u20B9"}{visa.fee.toLocaleString('en-IN')}</p>
          <p className="text-[10px] text-text-tertiary">Processing: {visa.processing}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="px-3 py-1.5 gradient-bg text-white text-xs font-bold rounded-xl shadow-glow"
        >
          Apply Now
        </motion.button>
      </div>
    </motion.div>
  )
}

export function InsuranceCard({ plan, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ scale: 1.01 }}
      className="glass-strong rounded-2xl p-4 border border-white/40 shadow-soft cursor-pointer"
    >
      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${plan.color} text-white text-[10px] font-bold mb-3`}>
        <Shield className="w-3 h-3" /> {plan.provider}
      </div>
      <p className="text-sm font-bold text-heading mb-1">{plan.name}</p>
      <p className="text-xs text-text-secondary mb-3">{plan.duration} · Coverage up to {"\u20B9"}{plan.coverage.toLocaleString('en-IN')}</p>
      <div className="space-y-1.5 mb-3">
        {plan.features.slice(0, 4).map(f => (
          <div key={f} className="flex items-center gap-2 text-xs text-text-secondary">
            <Check className="w-3 h-3 text-green-500 shrink-0" /> {f}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-border/50">
        <div>
          <p className="text-base font-extrabold text-heading">{"\u20B9"}{plan.price}</p>
          <p className="text-[10px] text-text-tertiary">one-time</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="px-3 py-1.5 gradient-bg text-white text-xs font-bold rounded-xl shadow-glow"
        >
          Buy Now
        </motion.button>
      </div>
    </motion.div>
  )
}

export function OfferCard({ offer, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="glass-strong rounded-2xl p-4 border border-white/40 shadow-soft"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shrink-0">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-heading">{offer.title}</p>
          <p className="text-xs text-text-secondary mt-0.5">{offer.desc}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="font-mono text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-lg">
              {offer.code}
            </span>
            <span className="text-[10px] text-text-tertiary">{offer.valid}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function DestinationCard({ dest, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ scale: 1.02 }}
      className="glass-strong rounded-2xl overflow-hidden border border-white/40 shadow-soft cursor-pointer group"
    >
      <div className="relative h-24 overflow-hidden">
        <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-2 left-3">
          <p className="text-white text-sm font-bold">{dest.name}</p>
          <p className="text-white/70 text-xs">{dest.country}</p>
        </div>
      </div>
      <div className="p-3 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-text-tertiary">Best Season</p>
          <p className="text-xs font-semibold text-heading">{dest.bestSeason}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-text-tertiary">From</p>
          <p className="text-xs font-bold text-heading">{"\u20B9"}{dest.avgPrice.toLocaleString('en-IN')}</p>
        </div>
      </div>
    </motion.div>
  )
}

export function TipsCard({ tips, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="glass-strong rounded-2xl p-4 border border-white/40 shadow-soft"
    >
      <div className="space-y-2.5">
        {tips.map((tip, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full gradient-bg flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-white text-[10px] font-bold">{i + 1}</span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">{tip}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
