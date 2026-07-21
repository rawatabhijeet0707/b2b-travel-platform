import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, CheckCircle2, Gift, Bell, Tag, Plane } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section className="py-20 lg:py-28 bg-card">
      <div className="container-max section-padding">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background image with overlay */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1920&auto=format&fit=crop"
              alt="Travel"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1D4ED8]/95 via-[#2563EB]/90 to-[#1D4ED8]/80" />
          </div>

          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-card/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-card/10 blur-3xl" />
          {/* Floating plane icon */}
          <motion.div
            animate={{ x: [0, 30, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-8 right-12 opacity-20"
          >
            <Plane className="w-20 h-20 text-white" />
          </motion.div>

          <div className="relative px-8 py-16 lg:px-16 lg:py-20 text-center">
            {/* Icon */}
            <div className="inline-flex w-16 h-16 rounded-2xl bg-card/20 backdrop-blur-sm items-center justify-center mb-6 border border-card/30">
              <Bell className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance mb-4">
              Stay Updated with Travel Industry Insights
            </h2>
            <p className="text-white/80 text-lg text-balance max-w-2xl mx-auto mb-8">
              Subscribe to our newsletter for exclusive deals, industry updates, and business growth tips.
            </p>

            {/* Perks row */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              {[
                { icon: Gift, text: '₹500 welcome bonus' },
                { icon: Tag, text: 'Exclusive deals first' },
                { icon: Mail, text: 'Weekly insights' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 px-4 py-2 bg-card/15 backdrop-blur-sm rounded-full border border-card/20">
                  <Icon className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm font-semibold text-white">{text}</span>
                </div>
              ))}
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-card rounded-2xl shadow-floating"
              >
                <CheckCircle2 className="w-6 h-6 text-[#22C55E]" />
                <span className="font-semibold text-[#1F2937]">Thank you for subscribing! {"\u{1F389}"}</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl text-[#1F2937] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-card/30 bg-card shadow-lg"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold rounded-2xl shadow-[0_6px_20px_rgba(245,158,11,0.4)] transition-all whitespace-nowrap"
                >
                  Subscribe Now
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>
            )}

            <p className="text-white/50 text-xs mt-4">No spam, unsubscribe anytime.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
