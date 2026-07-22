import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Globe, Menu, X, Sparkles, LogIn, MoreHorizontal } from 'lucide-react'
import TravelHubLogo from '../ui/TravelHubLogo.jsx'
import AuthModal from '../AuthModal.jsx'

const mainLinks = [
  { label: 'Why myPartner', to: '/why-mypartner', emoji: '' },
  { label: 'Product Highlights', to: '/product-highlights', emoji: '\u{1F680}' },
]

const moreLinks = [
  { label: 'Services', to: '/services', emoji: '\u{1F4CB}' },
  { label: 'Steps to Apply', to: '/steps-to-apply', emoji: '\u{1F4DD}' },
  { label: 'FAQ', to: '/faq', emoji: '\u2753' },
]

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [countryOpen, setCountryOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [authModal, setAuthModal] = useState({ open: false, mode: 'login' })
  const [selectedCountry, setSelectedCountry] = useState({ flag: '\u{1F1EE}\u{1F1F3}', name: 'India', currency: 'INR' })
  const navigate = useNavigate()
  const location = useLocation()
  const dropdownRef = useRef(null)
  const moreRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCountryOpen(false)
      }
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const countries = [
    { flag: '\u{1F1EE}\u{1F1F3}', name: 'India', currency: 'INR' },
    { flag: '\u{1F1E6}\u{1F1EA}', name: 'UAE', currency: 'AED' },
    { flag: '\u{1F1F8}\u{1F1EC}', name: 'Singapore', currency: 'SGD' },
    { flag: '\u{1F1FA}\u{1F1F8}', name: 'USA', currency: 'USD' },
    { flag: '\u{1F1EC}\u{1F1F7}', name: 'UK', currency: 'GBP' },
  ]

  const isActive = (to) => location.pathname === to

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-strong shadow-card border-b border-white/40'
            : 'glass border-b border-white/20'
        }`}
      >
        <div className="container-max section-padding flex items-center justify-between h-16">

          {/*  Logo  */}
          <Link to="/" className="flex items-center shrink-0">
            <TravelHubLogo size="sm" />
          </Link>

          {/*  Desktop Nav  */}
          <nav className="hidden lg:flex items-center gap-1 ml-auto mr-4">
            {mainLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => navigate(link.to)}
                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                  isActive(link.to)
                    ? 'text-primary bg-primary/10'
                    : 'text-heading hover:text-primary hover:bg-white/40'
                }`}
              >
                <span className="text-xs">{link.emoji}</span>
                {link.label}
                {/* Active indicator dot */}
                {isActive(link.to) && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
              </button>
            ))}

            {/* More dropdown (3 dots) */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  moreLinks.some((l) => isActive(l.to))
                    ? 'text-primary bg-primary/10'
                    : 'text-heading hover:text-primary hover:bg-white/40'
                } ${moreOpen ? 'bg-white/40' : ''}`}
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-52 glass-strong rounded-2xl shadow-floating p-1.5 z-50"
                  >
                    {moreLinks.map((link) => (
                      <button
                        key={link.label}
                        onClick={() => { navigate(link.to); setMoreOpen(false) }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors text-left ${
                          isActive(link.to)
                            ? 'bg-primary/10 text-primary'
                            : 'hover:bg-white/40 text-heading'
                        }`}
                      >
                        <span className="text-xs">{link.emoji}</span>
                        {link.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/*  Right Side  */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Country Selector */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCountryOpen(!countryOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-heading hover:bg-white/40 transition-all border ${
                  countryOpen ? 'bg-white/40 border-white/50' : 'border-transparent'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-text-tertiary" />
                <span className="text-base">{selectedCountry.flag}</span>
                <span className="text-xs font-semibold text-heading">{selectedCountry.currency}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-text-tertiary transition-transform duration-200 ${countryOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {countryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-44 glass-strong rounded-2xl shadow-floating p-1.5 z-50"
                  >
                    {countries.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => { setSelectedCountry(c); setCountryOpen(false) }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors text-left ${
                          selectedCountry.name === c.name
                            ? 'bg-primary/10 text-primary'
                            : 'hover:bg-white/40 text-heading'
                        }`}
                      >
                        <span className="text-lg">{c.flag}</span>
                        <span className="font-medium flex-1">{c.name}</span>
                        <span className="text-[10px] font-bold text-text-tertiary">{c.currency}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-border" />

            {/* Login */}
            <button
              onClick={() => setAuthModal({ open: true, mode: 'login' })}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white gradient-bg rounded-xl shadow-glow hover:shadow-floating transition-all active:scale-[0.97]"
            >
              <LogIn className="w-4 h-4" />
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl text-heading hover:bg-white/40 transition-colors"
          >
            <AnimatePresence mode="wait">
              {mobileOpen
                ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X className="w-5 h-5" /></motion.div>
                : <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu className="w-5 h-5" /></motion.div>
              }
            </AnimatePresence>
          </button>
        </div>

        {/*  Mobile Menu  */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden glass-strong border-t border-white/30"
            >
              <div className="container-max section-padding py-4 flex flex-col gap-1">
                {[...mainLinks, ...moreLinks].map((link) => (
                  <button
                    key={link.label}
                    onClick={() => { navigate(link.to); setMobileOpen(false) }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-left w-full ${
                      isActive(link.to)
                        ? 'bg-primary/10 text-primary'
                        : 'text-heading hover:bg-white/40'
                    }`}
                  >
                    <span>{link.emoji}</span>
                    {link.label}
                  </button>
                ))}

                {/* Country selector in mobile */}
                <div className="flex items-center gap-2 px-4 py-2 mt-1">
                  <Globe className="w-4 h-4 text-text-tertiary" />
                  <span className="text-sm text-text-secondary">{selectedCountry.flag} {selectedCountry.name} | {selectedCountry.currency}</span>
                </div>

                <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                  <button
                    onClick={() => { setAuthModal({ open: true, mode: 'login' }); setMobileOpen(false) }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-bold text-white gradient-bg rounded-xl shadow-glow"
                  >
                    <LogIn className="w-4 h-4" />
                    Login
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <AuthModal
        isOpen={authModal.open}
        onClose={() => setAuthModal({ open: false, mode: 'login' })}
        initialMode={authModal.mode}
      />
    </>
  )
}
