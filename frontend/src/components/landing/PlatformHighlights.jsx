import { motion } from 'framer-motion'
import { Plane, Hotel, ShieldCheck, Stamp, Package, Wallet, ArrowUpRight, Zap } from 'lucide-react'

const highlights = [
  {
    icon: Plane,
    title: 'Flights',
    desc: '800+ airlines with real-time availability, multi-city search and instant e-ticketing for all carriers.',
    stat: '800+',
    statLabel: 'Airlines',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop',
    color: '#2563EB',
    bg: '#EFF6FF',
    badge: 'Live Inventory',
  },
  {
    icon: Hotel,
    title: 'Hotels',
    desc: '2M+ properties worldwide  from budget guesthouses to 5-star luxury hotels with best B2B rates.',
    stat: '2M+',
    statLabel: 'Properties',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
    color: '#F59E0B',
    bg: '#FEF3C7',
    badge: 'Instant Confirm',
  },
  {
    icon: ShieldCheck,
    title: 'Insurance',
    desc: 'Comprehensive travel insurance with instant policy generation covering medical, trip cancellation and more.',
    stat: '50+',
    statLabel: 'Plans',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop',
    color: '#22C55E',
    bg: '#DCFCE7',
    badge: 'Paperless',
  },
  {
    icon: Stamp,
    title: 'Visa Services',
    desc: 'Visa processing for 190+ countries with expert guidance, document verification and real-time tracking.',
    stat: '190+',
    statLabel: 'Countries',
    image: 'https://images.unsplash.com/photo-1741795881248-fcc1d1a88b76?q=80&w=800&auto=format&fit=crop',
    color: '#8B5CF6',
    bg: '#EDE9FE',
    badge: 'Expert Help',
  },
  {
    icon: Package,
    title: 'Holiday Packages',
    desc: 'Curated holiday packages with fully customizable itineraries, group booking discounts and sightseeing.',
    stat: '5,000+',
    statLabel: 'Packages',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop',
    color: '#EF4444',
    bg: '#FEE2E2',
    badge: 'Customizable',
  },
  {
    icon: Wallet,
    title: 'B2B Wallet',
    desc: 'Secure digital wallet with instant credit facility, reward redemption and 24/7 balance access.',
    stat: '24/7',
    statLabel: 'Access',
    image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=800&auto=format&fit=crop',
    color: '#1D4ED8',
    bg: '#DBEAFE',
    badge: 'Secure',
  },
]

export default function PlatformHighlights() {
  return (
    <section className="py-20 lg:py-28 bg-card">
      <div className="container-max section-padding">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] rounded-full">
            Platform Highlights
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F2937] text-balance">
            One Platform. Every Travel Service.
          </h2>
          <p className="mt-4 text-[#6B7280] text-lg max-w-2xl mx-auto">
            A unified distribution system covering the entire travel ecosystem  all accessible from a single dashboard.
          </p>
        </div>

        {/* Highlights grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group bg-card rounded-2xl border border-[#E5E7EB] overflow-hidden hover:shadow-[0_16px_48px_rgba(0,140,255,0.15)] transition-all duration-400"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={h.image}
                  alt={h.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 hidden" style={{ background: `linear-gradient(135deg, ${h.color}, ${h.color}88)` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                {/* Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-card/95 backdrop-blur-sm rounded-full border border-card/60">
                  <Zap className="w-3 h-3" style={{ color: h.color }} />
                  <span className="text-[10px] font-bold" style={{ color: h.color }}>{h.badge}</span>
                </div>

                {/* Stat */}
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-extrabold text-white drop-shadow">{h.stat}</p>
                    <p className="text-xs text-white/80">{h.statLabel}</p>
                  </div>
                  {/* Icon circle */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-card/80"
                    style={{ background: h.color }}
                  >
                    <h.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-lg font-bold text-[#1F2937]">{h.title}</h3>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: h.bg }}
                  >
                    <ArrowUpRight className="w-4 h-4" style={{ color: h.color }} />
                  </div>
                </div>
                <p className="text-sm text-[#6B7280] leading-relaxed">{h.desc}</p>

                {/* Color bottom bar */}
                <div
                  className="mt-5 h-1 rounded-full opacity-30 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, ${h.color}, ${h.color}55)` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
