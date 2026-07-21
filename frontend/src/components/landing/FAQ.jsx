import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading.jsx'

const faqs = [
  { q: 'What is a B2B travel portal?', a: 'A B2B travel agency portal is an online platform that connects businesses in the travel industry, such as travel agents, tour operators, and hotels, enabling them to efficiently manage bookings, inventory, and customer relationships. It streamlines processes, increases efficiency, and offers competitive pricing to its users.' },
  { q: 'How do you become a B2B travel agent in India?', a: 'To become a B2B travel agent in India, you must register your business, obtain relevant licenses, and partner with a reputable travel platform. Joining a reputable B2B travel platform will help you access exclusive deals and support, ensuring success in the competitive market.' },
  { q: 'What are the key features offered by travel portals?', a: 'Some of the key features offered by renowned travel platforms in India include, easy access to booking and payments, cancellation policies, express care system in place, wide inventory, competitive pricing, confidentiality and more.' },
  { q: 'How to choose the best B2B travel agency in India?', a: 'Choosing the best B2B travel portal in India requires careful consideration of several factors that can help streamline your travel business operations. A well-designed, easy-to-navigate, and user-friendly interface allows travel agents to quickly access necessary information and complete bookings with ease, saving time and effort. Also, look for a travel portal that offers competitive pricing and a commission structure that allows your business to grow and generate profits. And lastly, a B2B travel portal with a vast network of suppliers enables your business to access a wide range of inventory, offering your clients more choices and better deals.' },
  { q: 'How to start a travel agency in India?', a: 'To start a travel agency in India, you need to first register your company and obtain necessary licenses, such as GST registration and IATA accreditation. Build an online presence with a user-friendly website and active social media accounts. Establish partnerships with hotels, airlines, and other service providers to offer competitive pricing. Travel agents in India can even join hands with an established B2B travel agency and get access to their wide inventory, good pricing and more such benefits.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)
  const [search, setSearch] = useState('')

  const filtered = faqs.filter(f =>
    f.q.toLowerCase().includes(search.toLowerCase()) ||
    f.a.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <section id="faq" className="py-20 lg:py-28">
      <div className="container-max section-padding">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about partnering with myPartner."
        />

        {/* Search */}
        <div className="max-w-xl mx-auto mt-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-12 pr-4 py-3.5 bg-card border border-border rounded-input text-heading placeholder:text-text-secondary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto mt-10 space-y-3">
          {filtered.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-card border border-border/60 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-semibold text-heading text-sm sm:text-base">{faq.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-5 h-5 text-primary shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-text leading-relaxed text-sm">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-text-secondary py-8">No questions found. Try a different search.</p>
          )}
        </div>
      </div>
    </section>
  )
}
