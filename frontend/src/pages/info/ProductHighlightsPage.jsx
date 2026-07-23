import { useState } from 'react'
import InfoPageLayout from '../../layouts/InfoPageLayout.jsx'
import PlatformHighlights from '../../components/landing/PlatformHighlights.jsx'
import { motion } from 'framer-motion'
import { Plane, Hotel, ShieldCheck, Stamp, Package, Wallet, ArrowRight } from 'lucide-react'
import AuthModal from '../../components/AuthModal.jsx'

function ProductHero() {
  const [authOpen, setAuthOpen] = useState(false)
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0057B8] via-[#008CFF] to-[#003E8A] pt-28 pb-20">
      {/* Background travel image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1920&auto=format&fit=crop"
          alt="Travel"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      {/* Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-card/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#008CFF]/30 blur-3xl" />

      <div className="container-max section-padding relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-card/15 backdrop-blur-sm rounded-full border border-card/25 mb-6"
        >
          <span className="text-yellow-400 text-sm">🚀</span>
          <span className="text-white text-sm font-semibold">Platform Highlights</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white text-balance leading-tight max-w-4xl mx-auto"
        >
          One Platform.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60C8FF] to-[#EAF5FF]">
            Every Travel Service.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-5 text-white/75 text-lg max-w-2xl mx-auto"
        >
          A unified distribution system covering the entire travel ecosystem — flights, hotels, visa, insurance, packages and more — all from one powerful dashboard.
        </motion.p>

        {/* Quick service pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mt-10"
        >
          {[
            { icon: Plane, label: 'Flights' },
            { icon: Hotel, label: 'Hotels' },
            { icon: ShieldCheck, label: 'Insurance' },
            { icon: Stamp, label: 'Visa' },
            { icon: Package, label: 'Packages' },
            { icon: Wallet, label: 'Wallet' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 px-4 py-2.5 bg-card/10 backdrop-blur-sm border border-card/20 rounded-full text-white text-sm font-semibold">
              <Icon className="w-4 h-4 text-[#60C8FF]" />
              {label}
            </div>
          ))}
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => setAuthOpen(true)}
          className="mt-10 inline-flex items-center gap-2 px-8 py-4 bg-card text-[#008CFF] font-bold rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)] transition-all active:scale-95"
        >
          Get Started Free
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} initialMode="login" />
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-10">
          <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}

export default function ProductHighlightsPage() {
  return (
    <InfoPageLayout>
      <ProductHero />
      <PlatformHighlights />
    </InfoPageLayout>
  )
}
