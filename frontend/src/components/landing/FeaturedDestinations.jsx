import { motion } from 'framer-motion'
import { ArrowUpRight, Star, Tag, Flame, Award, TrendingUp, Zap } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading.jsx'

const destinations = [
  {
    name: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop',
    price: '₹18,999',
    originalPrice: '₹24,999',
    rating: 4.9,
    reviews: 2841,
    tag: 'Bestseller',
    tagIcon: Award,
    discount: '24% OFF',
  },
  {
    name: 'Singapore',
    country: 'Singapore',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=800&auto=format&fit=crop',
    price: '₹32,999',
    originalPrice: '₹43,000',
    rating: 4.8,
    reviews: 1923,
    tag: 'Trending',
    tagIcon: TrendingUp,
    discount: '23% OFF',
  },
  {
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop',
    price: '₹24,999',
    originalPrice: '₹33,500',
    rating: 4.9,
    reviews: 3102,
    tag: 'Popular',
    tagIcon: Flame,
    discount: '25% OFF',
  },
  {
    name: 'Thailand',
    country: 'Thailand',
    image: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?q=80&w=800&auto=format&fit=crop',
    price: '₹15,999',
    originalPrice: '₹21,000',
    rating: 4.7,
    reviews: 4560,
    tag: 'Hot Deal',
    tagIcon: Zap,
    discount: '24% OFF',
  },
  {
    name: 'Maldives',
    country: 'Maldives',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    price: '₹45,999',
    originalPrice: '₹62,000',
    rating: 5.0,
    reviews: 1205,
    tag: 'Luxury',
    tagIcon: Award,
    discount: '26% OFF',
  },
  {
    name: 'Europe',
    country: 'Multi-Country',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=800&auto=format&fit=crop',
    price: '₹89,999',
    originalPrice: '₹1,20,000',
    rating: 4.8,
    reviews: 987,
    tag: 'Premium',
    tagIcon: Award,
    discount: '25% OFF',
  },
]

const tagColors = {
  Bestseller: 'bg-[#2563EB] text-white',
  Trending: 'bg-purple-500 text-white',
  Popular: 'bg-orange-500 text-white',
  'Hot Deal': 'bg-red-500 text-white',
  Luxury: 'bg-amber-500 text-white',
  Premium: 'bg-emerald-600 text-white',
}

export default function FeaturedDestinations() {
  return (
    <section className="py-20 lg:py-28 bg-[#F5F7FA]">
      <div className="container-max section-padding">
        <SectionHeading
          eyebrow="Featured Destinations"
          title="Trending Destinations for Your Clients"
          subtitle="Hand-picked destinations with the best B2B rates and highest commission margins."
        />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.07)] hover:shadow-[0_12px_40px_rgba(0,140,255,0.15)] transition-all duration-400 cursor-pointer border border-[#E5E7EB]"
              whileHover={{ y: -6 }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={d.image}
                  alt={d.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  style={{ transition: 'transform 0.7s ease' }}
                  onError={(e) => { e.target.style.display='none'; e.target.parentNode.style.background='linear-gradient(135deg, #2563EB, #1D4ED8)'; }}
                />
                {/* Dark gradient for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Tag badge */}
                <div className={`absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${tagColors[d.tag]}`}>
                  <d.tagIcon className="w-3 h-3" />
                  {d.tag}
                </div>

                {/* Discount badge */}
                <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-extrabold px-2.5 py-1.5 rounded-lg flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {d.discount}
                </div>

                {/* Rating on image */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
                  <div className="flex items-center gap-1 bg-card/95 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <Star className="w-3.5 h-3.5 text-warning fill-warning" />
                    <span className="text-xs font-bold text-heading">{d.rating}</span>
                    <span className="text-xs text-[#6B7280]">({d.reviews.toLocaleString()})</span>
                  </div>
                </div>

                {/* Destination name on image */}
                <div className="absolute bottom-4 right-4 text-right">
                  <h3 className="text-xl font-extrabold text-white drop-shadow">{d.name}</h3>
                  <p className="text-xs text-white/80">{d.country}</p>
                </div>
              </div>

              {/* Card footer */}
              <div className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#6B7280]">Starting from</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-xl font-extrabold text-[#2563EB]">{d.price}</p>
                    <p className="text-sm text-[#9CA3AF] line-through">{d.originalPrice}</p>
                  </div>
                  <p className="text-xs text-[#22C55E] font-semibold mt-0.5">per person incl. taxes</p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center group-hover:bg-[#2563EB] transition-all duration-300"
                >
                  <ArrowUpRight className="w-5 h-5 text-[#2563EB] group-hover:text-white transition-colors" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
