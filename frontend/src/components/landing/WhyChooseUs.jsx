import { motion } from 'framer-motion'
import { Percent, Headphones, Globe, ShieldCheck, Zap, Award, TrendingUp, Clock } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading.jsx'

const features = [
  {
    icon: Percent,
    title: 'Best Ever Rates',
    desc: 'Exclusive rates for our partners that help you maximize your margins on every booking.',
    color: '#2563EB',
    bg: '#EFF6FF',
    stat: 'Up to 40% more margins',
    image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=400&auto=format&fit=crop',
  },
  {
    icon: Headphones,
    title: 'Express Care',
    desc: 'Easy-to-use tools for query resolutions with dedicated support channels available 24/7.',
    color: '#22C55E',
    bg: '#DCFCE7',
    stat: '< 2 min response time',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=400&auto=format&fit=crop',
  },
  {
    icon: Globe,
    title: 'Widest Inventory',
    desc: '300+ airline carriers and 8 lac+ hotel properties  the largest inventory in the industry.',
    color: '#8B5CF6',
    bg: '#EDE9FE',
    stat: '2M+ rooms available',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=400&auto=format&fit=crop',
  },
  {
    icon: ShieldCheck,
    title: 'Confidentiality Assured',
    desc: 'Complete confidentiality of your customer details & bookings guaranteed with enterprise-grade security.',
    color: '#F59E0B',
    bg: '#FEF3C7',
    stat: '100% data protected',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=400&auto=format&fit=crop',
  },
]

export default function WhyChooseUs() {
  return (
    <section id="why" className="py-14 sm:py-20 lg:py-28 bg-card">
      <div className="container-max section-padding">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          {/* Left: Image collage */}
          <div className="hidden lg:block relative w-[420px] shrink-0 h-[480px]">
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop"
              alt="Travel"
              className="absolute top-0 left-0 w-64 h-64 rounded-2xl object-cover shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
            />
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop"
              alt="Beach"
              className="absolute bottom-0 right-0 w-52 h-52 rounded-2xl object-cover shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
            />
            <img
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=400&auto=format&fit=crop"
              alt="Hotel"
              className="absolute bottom-12 left-8 w-48 h-36 rounded-2xl object-cover shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
            />
            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-56 right-4 bg-card rounded-2xl shadow-[0_8px_30px_rgba(0,140,255,0.2)] p-4 border border-[#EFF6FF]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div>
                  <p className="text-xs text-[#6B7280]">This month</p>
                  <p className="text-sm font-extrabold text-[#1F2937]">2.4M+ Bookings</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-4 right-0 bg-[#2563EB] rounded-2xl shadow-lg p-3 text-white"
            >
              <Award className="w-6 h-6" />
              <p className="text-xs font-bold mt-1">#1 B2B</p>
              <p className="text-[10px] opacity-80">Platform</p>
            </motion.div>
          </div>

          {/* Right: Feature cards */}
          <div className="flex-1">
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] rounded-full">
              Why myPartner?
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2937] mb-4 text-balance">
              Join us to discover the smart way to{' '}
              <span className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] bg-clip-text text-transparent">
                grow your business
              </span>
            </h2>
            <p className="text-[#6B7280] mb-10 max-w-lg">
              Everything you need to run and scale your travel business  from exclusive pricing to enterprise-grade security.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group bg-card rounded-2xl border border-[#E5E7EB] p-6 hover:shadow-[0_8px_30px_rgba(0,140,255,0.12)] hover:border-[#2563EB]/20 transition-all duration-300"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: f.bg }}
                  >
                    <f.icon className="w-6 h-6" style={{ color: f.color }} />
                  </div>
                  <h3 className="text-base font-bold text-[#1F2937] mb-2">{f.title}</h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed mb-3">{f.desc}</p>
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                    style={{ background: f.bg, color: f.color }}
                  >
                    <Zap className="w-3 h-3" />
                    {f.stat}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
