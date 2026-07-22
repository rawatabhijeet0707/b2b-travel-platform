import { motion } from 'framer-motion'
import { TrendingUp, Clock, Award, Headphones, BarChart3, RefreshCw } from 'lucide-react'

const benefits = [
  {
    icon: TrendingUp,
    title: 'Higher Margins',
    desc: 'Earn up to 15% commission on every booking with our exclusive B2B rate cards.',
    image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=400&auto=format&fit=crop',
    stat: '15%', statLabel: 'Max Commission',
    color: '#2563EB',
  },
  {
    icon: Clock,
    title: 'Save Time',
    desc: 'Automated booking workflows reduce processing time by 80% compared to manual systems.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=400&auto=format&fit=crop',
    stat: '80%', statLabel: 'Time Saved',
    color: '#22C55E',
  },
  {
    icon: Award,
    title: 'Reward Points',
    desc: 'Earn loyalty points on every transaction, redeemable for cashback and premium services.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=400&auto=format&fit=crop',
    stat: '2X', statLabel: 'Points on Flights',
    color: '#F59E0B',
  },
  {
    icon: Headphones,
    title: 'Dedicated Manager',
    desc: 'Personal account manager assigned to your agency for priority support and guidance.',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=400&auto=format&fit=crop',
    stat: '24/7', statLabel: 'Support',
    color: '#8B5CF6',
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    desc: 'Track bookings, revenue, and performance with detailed dashboards and exportable reports.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop',
    stat: '100+', statLabel: 'Metrics Tracked',
    color: '#EF4444',
  },
  {
    icon: RefreshCw,
    title: 'Instant Refunds',
    desc: 'Automated refund processing with real-time status tracking and quick settlements.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=400&auto=format&fit=crop',
    stat: '<2hr', statLabel: 'Avg. Settlement',
    color: '#1D4ED8',
  },
]

export default function BusinessBenefits() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-[#1F2937] via-[#1D4ED8] to-[#1E40AF] relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#2563EB]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-card/5 blur-3xl pointer-events-none" />

      <div className="container-max section-padding relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-wider text-[#60A5FA] bg-card/10 rounded-full border border-card/20">
            Business Opportunity
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance leading-tight">
            Start a Profitable Business Today with the Best{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] to-[#EFF6FF]">
              B2B Travel Portal in India!
            </span>
          </h2>
          <p className="mt-4 text-white/60 text-lg">
            It is a feature loaded platform! Sign up now and start growing your business.
          </p>
        </div>

        {/* Benefits cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group bg-card/10 backdrop-blur-sm border border-card/15 rounded-2xl overflow-hidden hover:bg-card/15 hover:border-card/30 transition-all duration-400"
            >
              {/* Image strip */}
              <div className="relative h-36 overflow-hidden">
                <img
                  src={b.image}
                  alt={b.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                {/* Stat on image */}
                <div className="absolute bottom-3 left-4">
                  <p className="text-2xl font-extrabold text-white drop-shadow">{b.stat}</p>
                  <p className="text-xs text-white/70">{b.statLabel}</p>
                </div>
                {/* Icon badge */}
                <div
                  className="absolute top-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: b.color + 'CC' }}
                >
                  <b.icon className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">{b.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{b.desc}</p>
                <div
                  className="mt-4 h-0.5 rounded-full opacity-40 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, ${b.color}, transparent)` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
