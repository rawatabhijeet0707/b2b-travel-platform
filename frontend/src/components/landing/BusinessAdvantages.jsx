import { motion } from 'framer-motion'
import { TrendingUp, Globe, Headphones, ShieldCheck, Award } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading.jsx'

const advantages = [
  { icon: TrendingUp, title: 'Best Rates Ever', desc: 'myPartner offers exclusive rates for its network of travel agents.', stat: 'Best', statLabel: 'Rates' },
  { icon: Globe, title: 'Widest Inventory', desc: '300+ airline carriers and 8 lacs+ hotel properties at your fingertips.', stat: '8 lac+', statLabel: 'Hotels' },
  { icon: Headphones, title: 'Express Care', desc: 'Easy-to-use tools for query resolution with our Express Care system.', stat: '24/7', statLabel: 'Support' },
  { icon: ShieldCheck, title: 'Confidentiality', desc: 'Guaranteed and complete confidentiality of your customer bookings and details.', stat: '100%', statLabel: 'Private' },
  { icon: Award, title: 'Your Brand', desc: "Booking confirmations printed under your agency's logo.", stat: 'Your', statLabel: 'Logo' },
  { icon: ShieldCheck, title: 'Best Cancellation', desc: 'Best-in-class hotel cancellation policies for maximum flexibility.', stat: 'Flexi', statLabel: 'Policy' },
]

export default function BusinessAdvantages() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-bg to-white">
      <div className="container-max section-padding">
        <SectionHeading
          eyebrow="Why Choose myPartner"
          title="Reasons to start your own business with myPartner"
          subtitle="With myPartner, one of the best B2B portal for travel agents, you get to experience a whole new level of seamless booking and payment process."
        />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative bg-card rounded-card border border-border/60 p-7 overflow-hidden hover:shadow-floating transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />
              <div className="relative">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
                    <a.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-extrabold gradient-text">{a.stat}</div>
                    <div className="text-[10px] text-text-secondary font-medium uppercase tracking-wide">{a.statLabel}</div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-heading mb-2">{a.title}</h3>
                <p className="text-sm text-text leading-relaxed">{a.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
