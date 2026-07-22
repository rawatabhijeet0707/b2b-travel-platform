import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plane, Hotel, Gift, Sparkles, TrendingUp, Users, Star,
  ChevronLeft, ChevronRight, ArrowRight, MapPin
} from 'lucide-react'
import Button from '../ui/Button.jsx'
import AnimatedCounter from '../ui/AnimatedCounter.jsx'

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop',
    tag: '\u2708\uFE0F Best Flight Deals',
    title: 'The Smart Way to',
    highlight: 'Grow Your Business',
    subtitle: 'A platform built exclusively for travel agents to fulfill all their customer travel needs with amazing deals.',
  },
  {
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
    tag: '\u{1F3D4}\uFE0F Explore Mountains',
    title: 'Best Ever Rates on',
    highlight: 'Flights & Hotels',
    subtitle: 'Access 300+ airlines and 8 lakh+ properties at exclusive B2B rates unavailable to the public.',
  },
  {
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop',
    tag: '\u{1F3D6}\uFE0F Beach Getaways',
    title: 'Earn More with',
    highlight: 'Every Booking',
    subtitle: 'Maximize your margins with the highest commissions in the industry and exclusive promo cash rewards.',
  },
]

export default function Hero() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const slide = heroSlides[currentSlide]

  return (
    <section id="home" className="relative min-h-screen flex items-end overflow-hidden">
      {/* Full-bleed Background Slideshow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.img
            key={currentSlide}
            src={slide.image}
            alt="Travel Background"
            referrerPolicy="no-referrer"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        {/* Dark gradient from bottom  text lives here */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/85 via-[#0F172A]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/50 via-transparent to-transparent" />
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(ellipse at 20% 80%, rgba(37,99,235,0.3), transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(6,182,212,0.2), transparent 50%)' }} />
      </div>

      {/* Slide dot indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`transition-all duration-400 rounded-full ${
              i === currentSlide ? 'w-8 h-2.5 bg-white' : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={() => setCurrentSlide((p) => (p - 1 + heroSlides.length) % heroSlides.length)}
        className="hidden sm:flex absolute left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full glass border border-white/30 text-white hover:bg-white/20 transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => setCurrentSlide((p) => (p + 1) % heroSlides.length)}
        className="hidden sm:flex absolute right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full glass border border-white/30 text-white hover:bg-white/20 transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Content  pinned to bottom */}
      <div className="container-max section-padding w-full pb-24 sm:pb-28 pt-28 sm:pt-36 z-10">
        {/* Slide tag pill */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide + '-tag'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-5"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 glass border border-white/25 rounded-full text-white text-sm font-semibold">
              {slide.tag}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 glass border border-white/20 rounded-full"
        >
          <div className="flex -space-x-2">
            {[
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&auto=format&fit=crop&crop=face',
              'https://images.unsplash.com/photo-1494790108755-2616b1b4e3b6?w=50&h=50&auto=format&fit=crop&crop=face',
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&auto=format&fit=crop&crop=face',
            ].map((src, i) => (
              <img key={i} src={src} alt="Agent" referrerPolicy="no-referrer" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
            ))}
          </div>
          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold text-white">Preferred by 60,000+ Travel Agents</span>
        </motion.div>

        {/* Headline */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentSlide + '-title'}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.55 }}
            className="text-3xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.08] max-w-4xl text-balance drop-shadow-lg"
          >
            {slide.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] to-[#A5F3FC]">
              {slide.highlight}
            </span>
          </motion.h1>
        </AnimatePresence>

        {/* Subtitle */}
        <AnimatePresence mode="wait">
          <motion.p
            key={currentSlide + '-sub'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 sm:mt-5 text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl"
          >
            {slide.subtitle}
          </motion.p>
        </AnimatePresence>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate('/register')}
            className="flex items-center gap-2 px-8 py-4 gradient-bg text-white font-bold rounded-2xl shadow-glow hover:shadow-floating transition-all text-base"
          >
            <Sparkles className="w-5 h-5" />
            Get Started
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
