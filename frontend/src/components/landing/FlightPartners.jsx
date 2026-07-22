import { motion } from 'framer-motion'
import { Plane, Zap, Clock, TrendingDown, Star } from 'lucide-react'

const tagConfig = {
  Fastest:  { color: 'bg-[#2563EB] text-white',  dot: 'bg-[#2563EB]' },
  Premium:  { color: 'bg-amber-500 text-white',   dot: 'bg-amber-500'  },
  Cheapest: { color: 'bg-[#22C55E] text-white',   dot: 'bg-[#22C55E]'  },
  Luxury:   { color: 'bg-rose-600 text-white',    dot: 'bg-rose-600'   },
  Popular:  { color: 'bg-purple-500 text-white',  dot: 'bg-purple-500' },
}

const airlines = [
  {
    name: 'IndiGo',        code: '6E',
    price: '₹3,499',  route: 'DEL → BOM', tag: 'Fastest',
    logo: 'https://images.kiwi.com/airlines/128/6E.png',
    bg: '#00539F',
  },
  {
    name: 'Air India',     code: 'AI',
    price: '₹4,199',  route: 'BOM → DEL', tag: 'Premium',
    logo: 'https://images.kiwi.com/airlines/128/AI.png',
    bg: '#B22222',
  },
  {
    name: 'Vistara',       code: 'UK',
    price: '₹5,299',  route: 'DEL → GOI', tag: 'Cheapest',
    logo: 'https://images.kiwi.com/airlines/128/UK.png',
    bg: '#6B21A8',
  },
  {
    name: 'SpiceJet',      code: 'SG',
    price: '₹2,999',  route: 'HYD → DEL', tag: 'Cheapest',
    logo: 'https://images.kiwi.com/airlines/128/SG.png',
    bg: '#C2410C',
  },
  {
    name: 'Emirates',      code: 'EK',
    price: '₹28,999', route: 'BOM → DXB', tag: 'Luxury',
    logo: 'https://images.kiwi.com/airlines/128/EK.png',
    bg: '#BE0000',
  },
  {
    name: 'Qatar Airways', code: 'QR',
    price: '₹32,500', route: 'DEL → DOH', tag: 'Fastest',
    logo: 'https://images.kiwi.com/airlines/128/QR.png',
    bg: '#5C0632',
  },
  {
    name: 'Singapore Air', code: 'SQ',
    price: '₹35,999', route: 'BOM → SIN', tag: 'Premium',
    logo: 'https://images.kiwi.com/airlines/128/SQ.png',
    bg: '#003F87',
  },
  {
    name: 'Lufthansa',     code: 'LH',
    price: '₹45,000', route: 'DEL → FRA', tag: 'Popular',
    logo: 'https://images.kiwi.com/airlines/128/LH.png',
    bg: '#05164D',
  },
  {
    name: 'Etihad',        code: 'EY',
    price: '₹27,500', route: 'BOM → AUH', tag: 'Cheapest',
    logo: 'https://images.kiwi.com/airlines/128/EY.png',
    bg: '#B08D57',
  },
  {
    name: 'Thai Airways',  code: 'TG',
    price: '₹22,999', route: 'DEL → BKK', tag: 'Popular',
    logo: 'https://images.kiwi.com/airlines/128/TG.png',
    bg: '#512888',
  },
  {
    name: 'Malaysia Air',  code: 'MH',
    price: '₹24,000', route: 'BOM → KUL', tag: 'Fastest',
    logo: 'https://images.kiwi.com/airlines/128/MH.png',
    bg: '#003580',
  },
  {
    name: 'Cathay Pacific', code: 'CX',
    price: '₹38,500', route: 'DEL → HKG', tag: 'Premium',
    logo: 'https://images.kiwi.com/airlines/128/CX.png',
    bg: '#006564',
  },
]

export default function FlightPartners() {
  return (
    <section className="py-20 lg:py-28 bg-[#F5F7FA]">
      <div className="container-max section-padding">

        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] rounded-full">
            Flight Partners
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F2937] text-balance">
            Connected with 800+ Airlines Worldwide
          </h2>
          <p className="mt-4 text-[#6B7280] text-lg">
            Search and book flights across domestic and international carriers with live availability and best fares.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-10 justify-center">
          {[
            { tag: 'Cheapest', icon: TrendingDown, dot: 'bg-[#22C55E]' },
            { tag: 'Fastest',  icon: Zap,          dot: 'bg-[#2563EB]' },
            { tag: 'Premium',  icon: Star,          dot: 'bg-amber-500' },
            { tag: 'Popular',  icon: Plane,         dot: 'bg-purple-500' },
            { tag: 'Luxury',   icon: Clock,         dot: 'bg-rose-600'  },
          ].map(({ tag, icon: Icon, dot }) => (
            <div key={tag} className="flex items-center gap-1.5 text-xs text-[#6B7280]">
              <span className={`w-3.5 h-3.5 rounded-full ${dot} flex items-center justify-center`}>
                <Icon className="w-2 h-2 text-white" />
              </span>
              {tag}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {airlines.map((airline, i) => {
            const tc = tagConfig[airline.tag]
            return (
              <motion.div
                key={airline.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="group relative bg-card rounded-2xl border border-[#E5E7EB] overflow-hidden hover:shadow-[0_12px_32px_rgba(0,140,255,0.18)] transition-all duration-300"
              >
                {/* Tag badge */}
                <span className={`absolute top-2.5 right-2.5 px-2 py-0.5 text-[9px] font-extrabold rounded-full ${tc.color}`}>
                  {airline.tag}
                </span>

                <div className="p-4 flex flex-col items-center text-center gap-2.5">
                  {/* Airline logo */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden shadow-md border border-card/20 shrink-0"
                    style={{ background: airline.bg }}
                  >
                    <img
                      src={airline.logo}
                      alt={airline.name}
                      className="w-9 h-9 object-contain"
                      onError={(e) => {
                        // Fallback to code text if logo fails to load
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.parentElement.innerHTML =
                          `<span style="color:white;font-weight:900;font-size:13px;letter-spacing:0.05em;">${airline.code}</span>`
                      }}
                    />
                  </div>

                  {/* Name + route */}
                  <div>
                    <p className="text-xs font-bold text-[#1F2937] leading-snug">{airline.name}</p>
                    <p className="text-[10px] text-[#6B7280] mt-0.5">{airline.route}</p>
                  </div>

                  {/* Price */}
                  <div className="w-full pt-2 border-t border-[#E5E7EB]">
                    <p className="text-[10px] text-[#9CA3AF]">from</p>
                    <p className="text-sm font-extrabold text-[#2563EB]">{airline.price}</p>
                  </div>
                </div>

                {/* Bottom hover bar */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity ${tc.dot}`} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
