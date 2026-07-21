import { motion } from 'framer-motion'
import { Rocket, TrendingUp, Award, Globe2 } from 'lucide-react'
import AnimatedCounter from '../ui/AnimatedCounter.jsx'

const milestones = [
  { year: '2010', title: 'Founded', desc: 'Started with a vision to digitize B2B travel distribution in India.', icon: Rocket },
  { year: '2014', title: '10,000 Agents', desc: 'Crossed 10,000 active travel agent partners across India.', icon: TrendingUp },
  { year: '2018', title: 'Global Expansion', desc: 'Expanded operations to UAE, Singapore, and Southeast Asia.', icon: Globe2 },
  { year: '2021', title: 'Industry Leader', desc: 'Became India\'s most preferred B2B travel distribution platform.', icon: Award },
  { year: '2024', title: '60,000+ Partners', desc: 'Now serving 60,000+ agencies with 50M+ bookings processed.', icon: TrendingUp },
]

export default function GrowthTimeline() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-bg">
      <div className="container-max section-padding">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 rounded-full">
            Business Growth Timeline
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-h3 font-bold text-heading text-balance">
            Our Journey of Excellence
          </h2>
          <p className="mt-4 text-text text-lg text-balance">
            From a startup to India's leading B2B travel platform  15 years of innovation and growth.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20 -translate-x-1/2" />

          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative flex items-center gap-8 mb-12 last:mb-0 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
            >
              {/* Dot */}
              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-10">
                <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center shadow-glow ring-4 ring-card">
                  <m.icon className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className={`ml-16 sm:ml-0 sm:w-1/2 ${i % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'}`}>
                <div className="bg-card rounded-card border border-border/60 p-6 shadow-card hover:shadow-floating transition-all duration-300">
                  <span className="text-2xl font-extrabold gradient-text">{m.year}</span>
                  <h3 className="text-lg font-bold text-heading mt-1">{m.title}</h3>
                  <p className="text-sm text-text-secondary mt-2">{m.desc}</p>
                </div>
              </div>

              {/* Spacer for other side */}
              <div className="hidden sm:block sm:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
