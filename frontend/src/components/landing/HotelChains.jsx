import { motion } from 'framer-motion'
import { Star, ArrowUpRight } from 'lucide-react'

const chains = [
  {
    name: 'Taj Hotels',
    abbr: 'TAJ',
    category: 'Luxury',
    properties: '150+',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400&auto=format&fit=crop',
    brandBg: '#1A1A1A',
    brandText: '#C9A84C',
    tagColor: 'bg-amber-700',
  },
  {
    name: 'Marriott',
    abbr: 'M',
    category: 'Premium',
    properties: '8,000+',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=400&auto=format&fit=crop',
    brandBg: '#8B0000',
    brandText: '#FFFFFF',
    tagColor: 'bg-red-700',
  },
  {
    name: 'Hyatt',
    abbr: 'H',
    category: 'Luxury',
    properties: '1,000+',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=400&auto=format&fit=crop',
    brandBg: '#1B4332',
    brandText: '#FFFFFF',
    tagColor: 'bg-emerald-800',
  },
  {
    name: 'Hilton',
    abbr: 'Hi',
    category: 'Premium',
    properties: '7,000+',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=400&auto=format&fit=crop',
    brandBg: '#003087',
    brandText: '#FFFFFF',
    tagColor: 'bg-blue-800',
  },
  {
    name: 'Accor',
    abbr: 'AC',
    category: 'Multi-Brand',
    properties: '5,600+',
    image: 'https://images.unsplash.com/photo-1444201983204-c43cbd584d93?q=80&w=400&auto=format&fit=crop',
    brandBg: '#C41E3A',
    brandText: '#FFFFFF',
    tagColor: 'bg-rose-700',
  },
  {
    name: 'IHG',
    abbr: 'IHG',
    category: 'Global',
    properties: '6,000+',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=400&auto=format&fit=crop',
    brandBg: '#004E98',
    brandText: '#FFFFFF',
    tagColor: 'bg-blue-700',
  },
  {
    name: 'Radisson',
    abbr: 'R',
    category: 'Premium',
    properties: '1,400+',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=400&auto=format&fit=crop',
    brandBg: '#003865',
    brandText: '#FFFFFF',
    tagColor: 'bg-blue-900',
  },
  {
    name: 'Shangri-La',
    abbr: 'SL',
    category: 'Luxury',
    properties: '100+',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=400&auto=format&fit=crop',
    brandBg: '#7C5C1E',
    brandText: '#F5E6C8',
    tagColor: 'bg-yellow-800',
  },
  {
    name: 'Four Seasons',
    abbr: 'FS',
    category: 'Ultra Luxury',
    properties: '120+',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=400&auto=format&fit=crop',
    brandBg: '#2C3E50',
    brandText: '#CFA96D',
    tagColor: 'bg-slate-700',
  },
  {
    name: 'The Leela',
    abbr: 'TL',
    category: 'Luxury',
    properties: '12+',
    image: 'https://images.unsplash.com/photo-1506059612708-99d6128b4e7d?q=80&w=400&auto=format&fit=crop',
    brandBg: '#4A0E5B',
    brandText: '#E8C98F',
    tagColor: 'bg-purple-800',
  },
  {
    name: 'ITC Hotels',
    abbr: 'ITC',
    category: 'Luxury',
    properties: '120+',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=400&auto=format&fit=crop',
    brandBg: '#5C2700',
    brandText: '#F5C842',
    tagColor: 'bg-orange-900',
  },
  {
    name: 'Novotel',
    abbr: 'NV',
    category: 'Business',
    properties: '550+',
    image: 'https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=400&auto=format&fit=crop',
    brandBg: '#0A7ABF',
    brandText: '#FFFFFF',
    tagColor: 'bg-sky-700',
  },
]

export default function HotelChains() {
  return (
    <section className="py-20 lg:py-28 bg-[#F5F7FA]">
      <div className="container-max section-padding">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] rounded-full">
            Hotel Chains
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F2937] text-balance">
            Partnered with Leading Hotel Chains
          </h2>
          <p className="mt-4 text-[#6B7280] text-lg">
            Access premium hotel chains and independent properties at the best B2B rates.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {chains.map((chain, i) => (
            <motion.div
              key={chain.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative bg-card rounded-2xl border border-[#E5E7EB] overflow-hidden hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-300 cursor-pointer"
            >
              {/* Top image strip */}
              <div className="relative h-24 overflow-hidden">
                <img
                  src={chain.image}
                  alt={chain.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {/* Category tag */}
                <span className={`absolute bottom-2 left-2 px-2 py-0.5 text-[9px] font-extrabold text-white rounded-full ${chain.tagColor}`}>
                  {chain.category}
                </span>
                {/* Arrow icon */}
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-3 h-3 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-3 flex flex-col items-center text-center gap-2">
                {/* Inline brand logo badge  always renders, zero network */}
                <div
                  className="w-10 h-10 rounded-xl border-2 border-card shadow-md flex items-center justify-center -mt-5 relative z-10 shrink-0"
                  style={{ background: chain.brandBg }}
                >
                  <span
                    className="font-black leading-none tracking-tight"
                    style={{
                      color: chain.brandText,
                      fontSize: chain.abbr.length > 2 ? '8px' : chain.abbr.length === 2 ? '11px' : '16px',
                    }}
                  >
                    {chain.abbr}
                  </span>
                </div>

                <div>
                  <p className="text-xs font-bold text-[#1F2937] leading-tight">{chain.name}</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Star className="w-2.5 h-2.5 text-[#F59E0B] fill-[#F59E0B]" />
                    <span className="text-[10px] text-[#6B7280]">{chain.properties} props</span>
                  </div>
                </div>
              </div>

              {/* Brand color bottom hover line */}
              <div
                className="h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: chain.brandBg }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
