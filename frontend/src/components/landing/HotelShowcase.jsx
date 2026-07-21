import { motion } from 'framer-motion'
import { Star, MapPin, Wifi, Waves, Dumbbell, Coffee, Tag, Award, ShieldCheck } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading.jsx'

const hotels = [
  {
    name: 'The Grand Palace Hotel',
    location: 'Dubai Marina, Dubai',
    rating: 5.0,
    reviews: 1842,
    price: '₹8,999',
    originalPrice: '₹12,500',
    discount: '28% OFF',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=800&auto=format&fit=crop',
    amenities: [Wifi, Waves, Dumbbell],
    badge: 'Luxury Pick',
    badgeColor: 'bg-amber-500',
  },
  {
    name: 'Ocean View Resort',
    location: 'Kuta, Bali',
    rating: 4.8,
    reviews: 3104,
    price: '₹4,999',
    originalPrice: '₹6,800',
    discount: '26% OFF',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop',
    amenities: [Wifi, Waves, Coffee],
    badge: 'Best Value',
    badgeColor: 'bg-[#2563EB]',
  },
  {
    name: 'Metropolitan Luxury',
    location: 'Marina Bay, Singapore',
    rating: 4.9,
    reviews: 2341,
    price: '₹12,999',
    originalPrice: '₹17,500',
    discount: '26% OFF',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
    amenities: [Wifi, Dumbbell, Coffee],
    badge: 'Highly Rated',
    badgeColor: 'bg-purple-600',
  },
  {
    name: 'Royal Heritage Hotel',
    location: 'Jaipur, India',
    rating: 4.7,
    reviews: 4219,
    price: '₹3,499',
    originalPrice: '₹4,800',
    discount: '27% OFF',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop',
    amenities: [Wifi, Waves, Coffee],
    badge: 'Top Rated',
    badgeColor: 'bg-[#22C55E]',
  },
]

const amenityLabels = {
  [Wifi.toString()]: 'WiFi',
}

export default function HotelShowcase() {
  return (
    <section className="py-20 lg:py-28 bg-card">
      <div className="container-max section-padding">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-14">
          <SectionHeading
            eyebrow="Hotel Showcase"
            title="Premium Hotels at Exclusive B2B Rates"
            subtitle="Access 2M+ properties worldwide  from budget stays to luxury resorts."
          />
          <a href="#" className="shrink-0 text-sm font-semibold text-[#2563EB] hover:underline flex items-center gap-1">
            View All Hotels →
          </a>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {hotels.map((h, i) => (
            <motion.div
              key={h.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group flex bg-card rounded-2xl border border-[#E5E7EB] overflow-hidden hover:shadow-[0_12px_40px_rgba(0,140,255,0.15)] transition-all duration-400 cursor-pointer"
            >
              {/* Image side */}
              <div className="relative w-44 sm:w-52 shrink-0 overflow-hidden">
                <img
                  src={h.image}
                  alt={h.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Discount badge */}
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-extrabold px-2 py-1 rounded-lg flex items-center gap-1">
                  <Tag className="w-2.5 h-2.5" />
                  {h.discount}
                </div>
                {/* Rating */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-card/95 backdrop-blur-sm px-2 py-1 rounded-lg">
                  <Star className="w-3 h-3 text-warning fill-warning" />
                  <span className="text-xs font-bold text-heading">{h.rating}</span>
                </div>
              </div>

              {/* Content side */}
              <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
                <div>
                  {/* Badge */}
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold text-white rounded-full mb-3 ${h.badgeColor}`}>
                    <Award className="w-3 h-3" />
                    {h.badge}
                  </span>
                  <h3 className="text-base font-bold text-[#1F2937] mb-1 leading-snug">{h.name}</h3>
                  <p className="text-xs text-[#6B7280] flex items-center gap-1 mb-3">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{h.location}</span>
                  </p>
                  {/* Review count */}
                  <p className="text-xs text-[#6B7280] mb-3">
                    <span className="text-[#22C55E] font-semibold">{h.rating} Excellent</span>
                    {' '} {h.reviews.toLocaleString()} reviews
                  </p>
                  {/* Amenities */}
                  <div className="flex gap-2">
                    {h.amenities.map((AmenityIcon, idx) => (
                      <div key={idx} className="w-7 h-7 rounded-lg bg-[#EFF6FF] flex items-center justify-center">
                        <AmenityIcon className="w-3.5 h-3.5 text-[#2563EB]" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price + CTA */}
                <div className="flex items-end justify-between mt-4 pt-4 border-t border-[#E5E7EB]">
                  <div>
                    <p className="text-xs text-[#6B7280]">per night from</p>
                    <div className="flex items-baseline gap-1.5">
                      <p className="text-lg font-extrabold text-[#2563EB]">{h.price}</p>
                      <p className="text-xs text-[#9CA3AF] line-through">{h.originalPrice}</p>
                    </div>
                    <p className="text-[10px] text-[#22C55E] font-semibold">incl. taxes & fees</p>
                  </div>
                  <button className="px-4 py-2 text-xs font-bold text-[#2563EB] bg-[#EFF6FF] rounded-xl hover:bg-[#2563EB] hover:text-white transition-all duration-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
