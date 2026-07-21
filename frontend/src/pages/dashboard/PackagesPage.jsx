import { useState } from 'react'
import { motion } from 'framer-motion'
import { Package, Search, MapPin, Clock, Users, Star, ArrowRight, Calendar, Plane, Hotel, Check } from 'lucide-react'
import Badge from '../../components/ui/Badge.jsx'
import AnimatedBlobs from '../../components/ui/AnimatedBlobs.jsx'

const packages = [
  {
    title: 'Dubai Desert Safari',
    destination: 'Dubai, UAE',
    nights: '4N / 5D',
    price: '₹34,999',
    oldPrice: '₹45,000',
    rating: 4.8,
    includes: ['Flights', '4-Star Hotel', 'Desert Safari', 'Dhow Cruise', 'City Tour', 'Visa'],
    gradient: 'from-amber-400 to-orange-500',
    tag: 'Best Seller',
    highlights: 'Burj Khalifa + Palm Jumeirah',
  },
  {
    title: 'Bali Beach Retreat',
    destination: 'Bali, Indonesia',
    nights: '5N / 6D',
    price: '₹29,999',
    oldPrice: '₹38,000',
    rating: 4.7,
    includes: ['Flights', 'Villa Stay', 'Kintamani Tour', 'Water Sports', 'Spa Session'],
    gradient: 'from-teal-400 to-cyan-500',
    tag: 'Trending',
    highlights: 'Ubud Rice Terraces + Tanah Lot',
  },
  {
    title: 'Singapore Highlights',
    destination: 'Singapore',
    nights: '3N / 4D',
    price: '₹42,999',
    oldPrice: '₹52,000',
    rating: 4.9,
    includes: ['Flights', '4-Star Hotel', 'Universal Studios', 'Night Safari', 'Gardens by the Bay', 'Visa'],
    gradient: 'from-violet-400 to-purple-500',
    tag: 'Family Special',
    highlights: 'Sentosa Island + Marina Bay Sands',
  },
  {
    title: 'Kerala Backwaters',
    destination: 'Kerala, India',
    nights: '4N / 5D',
    price: '₹18,999',
    oldPrice: '₹25,000',
    rating: 4.6,
    includes: ['Hotels', 'Houseboat', 'Munnar Tour', 'Thekkady Safari', 'Alleppey Cruise'],
    gradient: 'from-green-400 to-emerald-500',
    tag: 'Domestic',
    highlights: 'Munnar Tea Gardens + Backwater Stay',
  },
  {
    title: 'Europe Grand Tour',
    destination: 'Paris, Switzerland, Italy',
    nights: '9N / 10D',
    price: '₹1,29,999',
    oldPrice: '₹1,55,000',
    rating: 4.9,
    includes: ['Flights', '4-Star Hotels', 'Euro Rail', 'Eiffel Tower', 'Swiss Alps', 'Venice Gondola', 'Visa'],
    gradient: 'from-blue-400 to-indigo-500',
    tag: 'Premium',
    highlights: 'Paris + Lucerne + Rome + Venice',
  },
  {
    title: 'Maldives Paradise',
    destination: 'Maldives',
    nights: '3N / 4D',
    price: '₹64,999',
    oldPrice: '₹80,000',
    rating: 5.0,
    includes: ['Flights', 'Overwater Villa', 'All Meals', 'Snorkeling', 'Sunset Cruise', 'Spa'],
    gradient: 'from-sky-400 to-blue-500',
    tag: 'Luxury',
    highlights: 'Private Beach Villa + Reef Diving',
  },
  {
    title: 'Thailand Explorer',
    destination: 'Bangkok + Phuket',
    nights: '5N / 6D',
    price: '₹24,999',
    oldPrice: '₹32,000',
    rating: 4.5,
    includes: ['Flights', '3-Star Hotels', 'Coral Island', 'Phi Phi Tour', 'City Temple Tour', 'Visa'],
    gradient: 'from-rose-400 to-pink-500',
    tag: 'Budget',
    highlights: 'Bangkok Temples + Phuket Beaches',
  },
  {
    title: 'Andaman Islands',
    destination: 'Port Blair, India',
    nights: '4N / 5D',
    price: '₹22,999',
    oldPrice: '₹30,000',
    rating: 4.7,
    includes: ['Flights', 'Beach Resort', 'Island Hopping', 'Scuba Diving', 'Cellular Jail', 'Sea Walk'],
    gradient: 'from-cyan-400 to-teal-500',
    tag: 'Adventure',
    highlights: 'Havelock Island + Neil Island',
  },
]

export default function PackagesPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = packages.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.destination.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || (filter === 'domestic' && p.destination.includes('India')) || (filter === 'international' && !p.destination.includes('India'))
    return matchSearch && matchFilter
  })

  return (
    <div className="relative p-4 sm:p-6 lg:p-8 space-y-6 gradient-mesh min-h-screen">
      <AnimatedBlobs />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl lg:text-3xl font-bold text-heading font-heading">Holiday Packages</h1>
        <p className="text-text-secondary mt-1">Pre-built and customizable packages for domestic and international destinations.</p>
      </motion.div>

      {/* Search & Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-strong rounded-card p-6 shadow-card"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="lg:col-span-2">
            <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1.5">Search Packages</label>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by destination or package name..."
                className="w-full pl-11 pr-4 py-3 bg-white/40 border border-border rounded-xl text-heading text-sm placeholder:text-text-secondary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1.5">Filter</label>
            <div className="flex gap-2">
              {['all', 'domestic', 'international'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`flex-1 px-3 py-3 text-sm font-semibold rounded-lg capitalize transition-all ${filter === f ? 'bg-primary text-white' : 'bg-white/40 text-text-secondary hover:text-heading'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Package Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((pkg, i) => (
          <motion.div
            key={pkg.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.06 }}
            className="group glass-strong rounded-card overflow-hidden hover:shadow-floating hover:-translate-y-1 transition-all duration-300"
          >
            {/* Image placeholder */}
            <div className={`relative h-44 bg-gradient-to-br ${pkg.gradient} overflow-hidden`}>
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `radial-gradient(circle at 30% 50%, white 0%, transparent 50%), radial-gradient(circle at 70% 80%, white 0%, transparent 50%)`
              }} />
              <div className="absolute top-3 left-3">
                <Badge variant="primary" className="bg-black/30 text-white border-card/20">{pkg.tag}</Badge>
              </div>
              <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-card/90 rounded-full">
                <Star className="w-3.5 h-3.5 text-warning fill-warning" />
                <span className="text-xs font-bold text-heading font-heading">{pkg.rating}</span>
              </div>
              <div className="absolute bottom-3 left-3 text-white">
                <p className="text-xs font-medium opacity-90 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {pkg.destination}
                </p>
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-lg font-bold text-heading font-heading mb-1">{pkg.title}</h3>
              <p className="text-sm text-text-secondary mb-3">{pkg.highlights}</p>

              <div className="flex items-center gap-3 mb-3 text-xs text-text-secondary">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {pkg.nights}</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Per person</span>
              </div>

              {/* Includes */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {pkg.includes.slice(0, 4).map((inc) => (
                  <span key={inc} className="px-2 py-0.5 text-[10px] font-medium text-primary bg-primary/10 rounded-full flex items-center gap-1">
                    <Check className="w-2.5 h-2.5" /> {inc}
                  </span>
                ))}
                {pkg.includes.length > 4 && (
                  <span className="px-2 py-0.5 text-[10px] font-medium text-text-secondary bg-white/40 rounded-full">
                    +{pkg.includes.length - 4} more
                  </span>
                )}
              </div>

              <div className="flex items-end justify-between pt-3 border-t border-border/60">
                <div>
                  <p className="text-xs text-text-secondary line-through">{pkg.oldPrice}</p>
                  <p className="text-xl font-extrabold text-primary">{pkg.price}</p>
                </div>
                <button className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-xl hover:bg-secondary transition-all flex items-center gap-1.5">
                  Book Now <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="glass-strong rounded-card p-12 text-center">
          <Package className="w-12 h-12 text-text-secondary mx-auto mb-3" />
          <h3 className="text-lg font-bold text-heading font-heading">No packages found</h3>
          <p className="text-text-secondary mt-1">Try a different search or filter.</p>
        </div>
      )}

      {/* Custom Package CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-card border border-primary/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
            <Package className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h4 className="font-bold text-heading font-heading">Need a custom package?</h4>
            <p className="text-sm text-text-secondary">Build personalized itineraries for your customers with our custom package builder.</p>
          </div>
        </div>
        <button className="px-6 py-3 text-sm font-semibold text-white gradient-bg rounded-xl hover:shadow-glow transition-all flex items-center gap-2 shrink-0">
          Create Custom Package <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  )
}
