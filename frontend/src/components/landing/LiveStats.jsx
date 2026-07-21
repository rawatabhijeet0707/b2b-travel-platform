import { motion } from 'framer-motion'
import { Plane, Hotel, Users, TrendingUp, Calendar, Globe, Zap } from 'lucide-react'
import AnimatedCounter from '../ui/AnimatedCounter.jsx'

const stats = [
  {
    icon: Users, value: 60000, suffix: '+', label: 'Active Travel Agents', sublabel: 'Across 190+ countries',
    color: '#3B82F6', bg: '#EFF6FF',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80',
  },
  {
    icon: Plane, value: 800, suffix: '+', label: 'Airlines Connected', sublabel: 'Domestic & international',
    color: '#8B5CF6', bg: '#EDE9FE',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
  },
  {
    icon: Hotel, value: 2000000, suffix: '+', label: 'Hotels Worldwide', sublabel: 'Budget to luxury stays',
    color: '#F59E0B', bg: '#FEF3C7',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099948?w=800&q=80',
  },
  {
    icon: TrendingUp, value: 50000000, suffix: '+', label: 'Bookings Processed', sublabel: 'With 99.9% uptime',
    color: '#22C55E', bg: '#DCFCE7',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
  },
  {
    icon: Globe, value: 190, suffix: '+', label: 'Countries Covered', sublabel: 'Global reach',
    color: '#EF4444', bg: '#FEE2E2',
    image: 'https://images.unsplash.com/photo-1451187580459-9546f8937761?w=800&q=80',
  },
  {
    icon: Calendar, value: 15, suffix: '+', label: 'Years of Excellence', sublabel: 'Industry leader',
    color: '#1D4ED8', bg: '#DBEAFE',
    image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80',
  },
]

export default function LiveStats() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E40AF] to-[#0F172A]" />
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#2563EB]/20 blur-3xl animate-blob" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#06B6D4]/10 blur-3xl animate-blob" style={{ animationDelay: '6s' }} />
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="container-max section-padding relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 glass border border-white/20 rounded-full">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">Live Statistics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance leading-tight font-heading">
            Numbers That Speak for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] to-[#A5F3FC]">Themselves</span>
          </h2>
          <p className="mt-4 text-white/70 text-lg">
            Trusted by thousands of agencies across India and beyond.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: 'spring' }}
              whileHover={{ scale: 1.04, y: -4 }}
              className="group relative rounded-2xl overflow-hidden border border-white/10 cursor-pointer transition-all duration-300"
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <img
                  src={s.image}
                  alt={s.label}
                  className="w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/85 to-[#0F172A]/60" />
              </div>

              {/* Top accent line */}
              <div className="absolute inset-x-0 top-0 h-1 z-10" style={{ background: `linear-gradient(90deg, ${s.color}, ${s.color}88)` }} />

              {/* Content */}
              <div className="relative z-10 p-6 lg:p-8 text-center">
                {/* Icon */}
                <div
                  className="inline-flex w-14 h-14 rounded-2xl items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: s.bg + '22', border: `1px solid ${s.color}44` }}
                >
                  <s.icon className="w-7 h-7" style={{ color: s.color }} />
                </div>

                {/* Value */}
                <div className="text-3xl lg:text-4xl font-extrabold text-white mb-1 drop-shadow-lg">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>

                {/* Label */}
                <p className="text-sm font-semibold text-white/90">{s.label}</p>
                <p className="text-xs text-white/50 mt-1">{s.sublabel}</p>
              </div>

              {/* Hover glow border */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: `inset 0 0 0 1px ${s.color}66, 0 0 30px ${s.color}22` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
