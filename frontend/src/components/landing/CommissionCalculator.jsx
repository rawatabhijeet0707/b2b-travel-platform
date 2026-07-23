import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Calculator, TrendingUp, Plane, Hotel, Package, ArrowRight, Sparkles } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading.jsx'
import Button from '../ui/Button.jsx'
import AuthModal from '../AuthModal.jsx'

const services = [
  { key: 'flights', label: 'Flight Bookings', icon: Plane, avgCommission: 350, color: 'text-primary', bg: 'bg-primary/10' },
  { key: 'hotels', label: 'Hotel Bookings', icon: Hotel, avgCommission: 800, color: 'text-accent', bg: 'bg-accent/10' },
  { key: 'packages', label: 'Holiday Packages', icon: Package, avgCommission: 2500, color: 'text-warning', bg: 'bg-warning/10' },
]

export default function CommissionCalculator() {
  const [authOpen, setAuthOpen] = useState(false)
  const [counts, setCounts] = useState({
    flights: 30,
    hotels: 15,
    packages: 5,
  })

  const { monthly, yearly, breakdown } = useMemo(() => {
    const breakdown = services.map((s) => ({
      ...s,
      earnings: counts[s.key] * s.avgCommission,
    }))
    const monthly = breakdown.reduce((sum, b) => sum + b.earnings, 0)
    const yearly = monthly * 12
    return { monthly, yearly, breakdown }
  }, [counts])

  const handleSlider = (key, value) => {
    setCounts((prev) => ({ ...prev, [key]: parseInt(value) }))
  }

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-gradient-to-b from-white to-bg">
      <div className="container-max section-padding">
        <SectionHeading
          eyebrow="Earnings Calculator"
          title="Calculate Your Monthly Earnings"
          subtitle="See how much commission you can earn based on your booking volume. Adjust the sliders to match your expected bookings."
        />

        <div className="mt-10 sm:mt-14 grid lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* Sliders */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-card border border-border/60 shadow-card p-5 sm:p-8 space-y-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center shadow-glow">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-heading">Monthly Bookings</h3>
                <p className="text-sm text-text-secondary">Drag sliders to adjust</p>
              </div>
            </div>

            {services.map((s) => (
              <div key={s.key}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center`}>
                      <s.icon className={`w-4.5 h-4.5 ${s.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-heading">{s.label}</p>
                      <p className="text-xs text-text-secondary">Avg ₹{s.avgCommission} commission/booking</p>
                    </div>
                  </div>
                  <span className="text-lg font-extrabold text-heading tabular-nums">
                    {counts[s.key]}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={counts[s.key]}
                  onChange={(e) => handleSlider(s.key, e.target.value)}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer slider-custom"
                  style={{
                    background: `linear-gradient(to right, #0066FF 0%, #0066FF ${counts[s.key]}%, #E5E7EB ${counts[s.key]}%, #E5E7EB 100%)`,
                  }}
                />
              </div>
            ))}
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-0.5 gradient-bg rounded-card opacity-10 blur-xl" />
            <div className="relative glass rounded-card shadow-premium p-5 sm:p-8">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-success" />
                <span className="text-sm font-bold text-text-secondary uppercase tracking-wide">Your Earnings</span>
              </div>

              {/* Breakdown */}
              <div className="space-y-4 mb-6">
                {breakdown.map((b) => (
                  <div key={b.key} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <b.icon className={`w-4 h-4 ${b.color}`} />
                      <span className="text-sm font-medium text-text">{b.label}</span>
                    </div>
                    <span className="text-sm font-bold text-heading tabular-nums">
                      ₹{b.earnings.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Monthly total */}
              <div className="pt-6 border-t border-border/60">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-text-secondary">Monthly Commission</span>
                  <motion.span
                    key={monthly}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="text-2xl font-extrabold text-heading tabular-nums"
                  >
                    ₹{monthly.toLocaleString('en-IN')}
                  </motion.span>
                </div>

                {/* Yearly highlight */}
                <div className="bg-gradient-to-r from-success/10 to-primary/10 rounded-2xl p-5 border border-success/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Yearly Potential</p>
                      <motion.p
                        key={yearly}
                        initial={{ scale: 1.05 }}
                        animate={{ scale: 1 }}
                        className="text-3xl font-extrabold gradient-text mt-1 tabular-nums"
                      >
                        ₹{yearly.toLocaleString('en-IN')}
                      </motion.p>
                    </div>
                    <Sparkles className="w-8 h-8 text-success" />
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full mt-6"
                onClick={() => setAuthOpen(true)}
              >
                Start Earning Now
                <ArrowRight className="w-4 h-4" />
              </Button>
              <p className="text-center text-xs text-text-secondary mt-3">
                * Estimates based on average commission rates. Actual earnings may vary.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} initialMode="login" />
    </section>
  )
}
