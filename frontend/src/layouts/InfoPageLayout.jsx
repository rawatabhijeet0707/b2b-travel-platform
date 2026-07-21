import { motion } from 'framer-motion'
import LandingNavbar from '../components/landing/LandingNavbar.jsx'
import Footer from '../components/landing/Footer.jsx'
import ScrollProgress from '../components/landing/ScrollProgress.jsx'

export default function InfoPageLayout({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <ScrollProgress />
      <LandingNavbar />
      <main className="pt-20">
        {children}
      </main>
      <Footer />
    </motion.div>
  )
}
