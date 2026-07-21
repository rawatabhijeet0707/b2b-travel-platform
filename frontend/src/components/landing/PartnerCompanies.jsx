import { motion } from 'framer-motion'
import { BadgeCheck } from 'lucide-react'

const partners = ['IATA Certified', 'TAAI Member', 'ADTOI Member', 'ISO 27001', 'PCI DSS Compliant', 'Make in India']

export default function PartnerCompanies() {
  return (
    <section className="py-16 border-y border-border">
      <div className="container-max section-padding">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm font-semibold uppercase tracking-wider text-text-secondary mb-8"
        >
          Certified & Trusted by Industry Leaders
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12">
          {partners.map((p, i) => (
            <motion.div
              key={p}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-2 text-heading font-bold text-lg hover:text-primary transition-colors cursor-default"
            >
              <BadgeCheck className="w-5 h-5 text-success" />
              {p}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
