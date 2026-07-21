import { motion } from 'framer-motion'
import LandingNavbar from '../components/landing/LandingNavbar.jsx'
import Hero from '../components/landing/Hero.jsx'
import SearchWidget from '../components/landing/SearchWidget.jsx'
import QuickLogin from '../components/landing/QuickLogin.jsx'
import WhyChooseUs from '../components/landing/WhyChooseUs.jsx'
import PlatformHighlights from '../components/landing/PlatformHighlights.jsx'
import ServicesOverview from '../components/landing/ServicesOverview.jsx'
import BusinessBenefits from '../components/landing/BusinessBenefits.jsx'
import LiveStats from '../components/landing/LiveStats.jsx'
import FeaturedDestinations from '../components/landing/FeaturedDestinations.jsx'
import HotelShowcase from '../components/landing/HotelShowcase.jsx'
import FlightPartners from '../components/landing/FlightPartners.jsx'
import HotelChains from '../components/landing/HotelChains.jsx'
import PartnerCompanies from '../components/landing/PartnerCompanies.jsx'
import Testimonials from '../components/landing/Testimonials.jsx'
import BusinessAdvantages from '../components/landing/BusinessAdvantages.jsx'
import FAQ from '../components/landing/FAQ.jsx'
import LatestBlogs from '../components/landing/LatestBlogs.jsx'
import Newsletter from '../components/landing/Newsletter.jsx'
import LiveBookingTicker from '../components/landing/LiveBookingTicker.jsx'
import AppDownload from '../components/landing/AppDownload.jsx'
import ScrollProgress from '../components/landing/ScrollProgress.jsx'
import Footer from '../components/landing/Footer.jsx'

export default function LandingPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <ScrollProgress />
      <LandingNavbar />
      <main>
        <Hero />
        <SearchWidget />
        <QuickLogin />
        <WhyChooseUs />
        <PlatformHighlights />
        <ServicesOverview />
        <BusinessBenefits />
        <LiveStats />
        <FeaturedDestinations />
        <HotelShowcase />
        <FlightPartners />
        <HotelChains />
        <PartnerCompanies />
        <Testimonials />
        <BusinessAdvantages />
        <FAQ />
        <LatestBlogs />
        <AppDownload />
        <Newsletter />
      </main>
      <Footer />
      <LiveBookingTicker />
    </motion.div>
  )
}
