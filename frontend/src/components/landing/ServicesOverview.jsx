import { motion } from 'framer-motion'
import { Tag as TagIcon } from 'lucide-react'

const services = [
  {
    title: 'Flights',
    desc: '300+ airline carriers with live fare comparison, instant ticketing and zero hidden charges on every booking.',
    tag: 'Most Popular',
    tagColor: 'bg-[#2563EB] text-white',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop',
    stat: '300+',
    statLabel: 'Airlines',
    accentColor: '#2563EB',
  },
  {
    title: 'Hotels',
    desc: 'From budget to luxury  8 lakh+ properties with real-time availability and best B2B rates worldwide.',
    tag: 'Top Selling',
    tagColor: 'bg-orange-500 text-white',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=800&auto=format&fit=crop',
    stat: '8L+',
    statLabel: 'Properties',
    accentColor: '#F59E0B',
  },
  {
    title: 'Homestays',
    desc: 'Authentic local experiences with verified homestays across India and abroad for unique travel memories.',
    tag: 'Trending',
    tagColor: 'bg-purple-500 text-white',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop',
    stat: '50K+',
    statLabel: 'Homestays',
    accentColor: '#8B5CF6',
  },
  {
    title: 'Resorts',
    desc: 'Premium resorts for leisure and corporate bookings with exclusive B2B pricing and group deals.',
    tag: 'Premium',
    tagColor: 'bg-amber-500 text-white',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
    stat: '10K+',
    statLabel: 'Resorts',
    accentColor: '#D97706',
  },
  {
    title: 'Villas',
    desc: 'Private villas for luxury getaways  fully equipped with best-in-class amenities and concierge service.',
    tag: 'Luxury',
    tagColor: 'bg-rose-600 text-white',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop',
    stat: '5K+',
    statLabel: 'Villas',
    accentColor: '#E11D48',
  },
  {
    title: 'Apartments',
    desc: 'Serviced apartments for short and long stays with flexible check-in options and home-like comfort.',
    tag: '',
    tagColor: '',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop',
    stat: '30K+',
    statLabel: 'Apartments',
    accentColor: '#22C55E',
  },
]

export default function ServicesOverview() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-[#F5F7FA]">
      <div className="container-max section-padding">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] rounded-full">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F2937] text-balance">
            Everything Your Customer Needs!
          </h2>
          <p className="mt-4 text-[#6B7280] text-lg">
            Helping you find a perfect stay for everyone. Don't wait, start growing your business with myPartner today!
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative bg-card rounded-2xl overflow-hidden border border-[#E5E7EB] hover:shadow-[0_16px_48px_rgba(0,140,255,0.15)] transition-all duration-400"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Tag badge */}
                {s.tag && (
                  <span className={`absolute top-3 left-3 px-3 py-1 text-[10px] font-extrabold rounded-full ${s.tagColor}`}>
                    {s.tag}
                  </span>
                )}

                {/* Stat on image */}
                <div className="absolute bottom-3 right-3 text-right">
                  <p className="text-xl font-extrabold text-white drop-shadow">{s.stat}</p>
                  <p className="text-xs text-white/80">{s.statLabel}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-[#1F2937] mb-3">{s.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{s.desc}</p>
              </div>

              {/* Bottom accent line on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, ${s.accentColor}, ${s.accentColor}55)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
