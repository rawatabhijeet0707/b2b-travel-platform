import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Compass, Home, ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-lg"
      >
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="inline-flex w-24 h-24 rounded-3xl gradient-bg items-center justify-center mb-8 shadow-glow"
        >
          <Compass className="w-12 h-12 text-white" />
        </motion.div>

        <h1 className="text-8xl font-extrabold gradient-text">404</h1>
        <h2 className="text-2xl font-bold text-heading mt-4">Page Not Found</h2>
        <p className="text-text-secondary mt-3 text-lg">
          Looks like you've wandered off the map. The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 gradient-bg text-white font-semibold rounded-btn hover:shadow-glow transition-all">
            <Home className="w-5 h-5" /> Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border text-heading font-semibold rounded-btn hover:shadow-card transition-all"
          >
            <ArrowLeft className="w-5 h-5" /> Go Back
          </button>
        </div>
      </motion.div>
    </div>
  )
}
