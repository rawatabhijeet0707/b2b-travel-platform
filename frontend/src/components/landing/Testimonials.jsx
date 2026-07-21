import { motion } from 'framer-motion'
import { Star, Quote, ShieldCheck, ThumbsUp } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading.jsx'

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'CEO, SkyHigh Travels',
    city: 'Mumbai',
    text: 'TravelDistrib has transformed our business. The exclusive rates and instant booking confirmation have helped us increase margins by 40%. The platform is incredibly fast and reliable.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&auto=format&fit=crop&crop=face',
    bookings: '2,400+ bookings',
    verified: true,
  },
  {
    name: 'Priya Sharma',
    role: 'Director, Wanderlust Holidays',
    city: 'Delhi',
    text: 'The largest inventory I have ever seen. From flights to hotels to visas, everything in one place. Our team productivity has doubled since switching to this platform.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b1b4e3b6?w=100&h=100&auto=format&fit=crop&crop=face',
    bookings: '1,800+ bookings',
    verified: true,
  },
  {
    name: 'Mohammed Ali',
    role: 'Founder, Falcon Travel',
    city: 'Hyderabad',
    text: 'Express support is truly express. Issues get resolved in minutes, not hours. The dedicated account manager feature is a game-changer for our agency.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&auto=format&fit=crop&crop=face',
    bookings: '3,100+ bookings',
    verified: true,
  },
  {
    name: 'Anita Desai',
    role: 'Owner, Globe Trotter Tours',
    city: 'Bangalore',
    text: 'The reward points system is fantastic. We earn on every booking and redeem for cashback. It is like getting paid to grow our business.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&auto=format&fit=crop&crop=face',
    bookings: '900+ bookings',
    verified: true,
  },
  {
    name: 'Vikram Singh',
    role: 'MD, Royal Voyages',
    city: 'Jaipur',
    text: 'Best B2B platform in India, hands down. The real-time analytics dashboard gives us complete visibility into our bookings and revenue.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&auto=format&fit=crop&crop=face',
    bookings: '1,200+ bookings',
    verified: true,
  },
  {
    name: 'Sneha Reddy',
    role: 'Partner, TripCrafters',
    city: 'Chennai',
    text: 'The visa services module alone has saved us countless hours. Document verification and application tracking are seamless. Highly recommended.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&auto=format&fit=crop&crop=face',
    bookings: '680+ bookings',
    verified: true,
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FA] to-white">
      <div className="container-max section-padding">
        {/* Overall rating summary */}
        <div className="flex flex-col items-center mb-14">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] rounded-full">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#1F2937] text-center text-balance mb-4">
            What Our Partners Say
          </h2>
          <p className="text-[#6B7280] text-center max-w-2xl mb-8">
            Join 60,000+ travel agencies who trust TravelDistrib to power their business.
          </p>
          {/* Aggregate rating */}
          <div className="flex items-center gap-6 bg-card rounded-2xl border border-[#E5E7EB] shadow-soft px-8 py-5">
            <div className="text-center">
              <div className="text-4xl font-extrabold text-[#1F2937]">4.9</div>
              <div className="flex gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-warning fill-warning" />)}
              </div>
              <div className="text-xs text-[#6B7280] mt-1">Overall Rating</div>
            </div>
            <div className="w-px h-14 bg-[#E5E7EB]" />
            <div className="text-center">
              <div className="text-4xl font-extrabold text-[#1F2937]">60K+</div>
              <div className="text-xs text-[#6B7280] mt-1">Happy Partners</div>
            </div>
            <div className="w-px h-14 bg-[#E5E7EB]" />
            <div className="text-center">
              <div className="text-4xl font-extrabold text-[#22C55E]">98%</div>
              <div className="text-xs text-[#6B7280] mt-1">Recommend Us</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative bg-card rounded-2xl border border-[#E5E7EB] p-7 hover:shadow-[0_12px_40px_rgba(0,140,255,0.12)] hover:border-[#2563EB]/20 transition-all duration-400"
            >
              {/* Quote icon */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-[#EFF6FF] group-hover:text-[#2563EB]/20 transition-colors" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 text-warning fill-warning" />
                ))}
                <span className="ml-2 text-xs font-bold text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded-full">Verified</span>
              </div>

              {/* Review text */}
              <p className="text-[#374151] leading-relaxed mb-6 relative z-10 text-sm">"{t.text}"</p>

              {/* Bookings stat */}
              <div className="flex items-center gap-2 mb-5">
                <ThumbsUp className="w-3.5 h-3.5 text-[#2563EB]" />
                <span className="text-xs font-semibold text-[#2563EB]">{t.bookings}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#E5E7EB]">
                <div className="relative">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#EFF6FF]"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div
                    className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] hidden items-center justify-center text-white font-bold text-sm border-2 border-[#EFF6FF]"
                  >
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {t.verified && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#22C55E] rounded-full flex items-center justify-center border-2 border-card">
                      <ShieldCheck className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-bold text-[#1F2937] text-sm">{t.name}</p>
                  <p className="text-xs text-[#6B7280]">{t.role}, {t.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
