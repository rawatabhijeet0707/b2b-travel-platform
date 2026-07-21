import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plane, Hotel, Stamp, Ticket, X, MapPin } from 'lucide-react'

const bookings = [
  { name: 'Rajesh K.', city: 'Mumbai', type: 'flight', detail: 'Delhi → Dubai', amount: '₹18,999', icon: Plane },
  { name: 'Priya S.', city: 'Delhi', type: 'hotel', detail: 'Taj Hotel, Goa', amount: '₹12,500', icon: Hotel },
  { name: 'Mohammed A.', city: 'Hyderabad', type: 'visa', detail: 'Singapore Visa', amount: '₹3,200', icon: Stamp },
  { name: 'Anita D.', city: 'Bangalore', type: 'package', detail: 'Bali Holiday Package', amount: '₹24,999', icon: Ticket },
  { name: 'Vikram S.', city: 'Jaipur', type: 'flight', detail: 'Mumbai → Singapore', amount: '₹32,999', icon: Plane },
  { name: 'Sneha R.', city: 'Chennai', type: 'hotel', detail: 'Marriott, Maldives', amount: '₹45,999', icon: Hotel },
  { name: 'Arjun M.', city: 'Pune', type: 'package', detail: 'Thailand Tour', amount: '₹15,999', icon: Ticket },
  { name: 'Deepak G.', city: 'Kolkata', type: 'flight', detail: 'Chennai → Dubai', amount: '₹22,499', icon: Plane },
  { name: 'Kavya N.', city: 'Surat', type: 'visa', detail: 'Dubai Visa', amount: '₹2,800', icon: Stamp },
  { name: 'Rohit V.', city: 'Ahmedabad', type: 'hotel', detail: 'Hyatt, Singapore', amount: '₹18,500', icon: Hotel },
  { name: 'Pooja J.', city: 'Lucknow', type: 'package', detail: 'Europe Tour', amount: '₹89,999', icon: Ticket },
  { name: 'Sanjay T.', city: 'Chandigarh', type: 'flight', detail: 'Delhi → Maldives', amount: '₹45,999', icon: Plane },
]

const typeColors = {
  flight: 'text-primary bg-primary/10',
  hotel: 'text-accent bg-accent/10',
  visa: 'text-secondary bg-secondary/10',
  package: 'text-warning bg-warning/10',
}

export default function LiveBookingTicker() {
  const [currentBooking, setCurrentBooking] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [index, setIndex] = useState(0)

  const showNextBooking = useCallback(() => {
    if (dismissed) return
    setCurrentBooking(bookings[index % bookings.length])
    setIsVisible(true)
    setTimeout(() => setIsVisible(false), 5000)
    setIndex((prev) => prev + 1)
  }, [dismissed, index])

  useEffect(() => {
    if (dismissed) return
    const initialTimer = setTimeout(showNextBooking, 3000)
    const interval = setInterval(showNextBooking, 8000)
    return () => {
      clearTimeout(initialTimer)
      clearInterval(interval)
    }
  }, [dismissed, showNextBooking])

  if (dismissed) return null

  return (
    <AnimatePresence>
      {isVisible && currentBooking && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-6 z-50 max-w-xs"
        >
          <div className="glass rounded-2xl shadow-floating p-4 pr-10 relative border border-border/60">
            <button
              onClick={() => setDismissed(true)}
              className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-text-secondary hover:text-heading hover:bg-bg transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${typeColors[currentBooking.type]}`}>
                <currentBooking.icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-text-secondary font-medium">
                  {currentBooking.name} from {currentBooking.city}
                </p>
                <p className="text-sm font-bold text-heading truncate">
                  {currentBooking.detail}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-xs font-semibold text-success">
                    {currentBooking.amount}
                  </span>
                  <span className="text-[10px] text-text-secondary"> just now</span>
                </div>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
              </span>
              <span className="text-[10px] font-medium text-text-secondary">Live booking</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
