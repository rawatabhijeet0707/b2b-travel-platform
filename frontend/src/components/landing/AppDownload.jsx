import { motion } from 'framer-motion'
import { Star, Smartphone } from 'lucide-react'

const features = [
  '\u{1F50D} Real-time booking tracking',
  '\u{1F4B3} Instant payment & wallet',
  '\u{1F4AC} Smart price alerts',
  '\u{1F4CB} E-tickets & vouchers',
]

export default function AppDownload() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-[#0B1A30] via-[#1D4ED8] to-[#1E40AF] relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-card/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-[#2563EB]/20 blur-3xl pointer-events-none" />
      {/* Watermark travel icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {['\u2708\uFE0F','\u{1F3E8}','\u{1F5FA}\uFE0F','\u{1F3AF}','\u{1F30D}','\u{1F3D6}\uFE0F'].map((e, i) => (
          <span
            key={i}
            className="absolute text-white/5 text-7xl"
            style={{
              top: `${15 + (i * 14) % 70}%`,
              left: `${(i * 17) % 90}%`,
              transform: `rotate(${(i * 25) - 30}deg)`,
            }}
          >
            {e}
          </span>
        ))}
      </div>

      <div className="container-max section-padding relative">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/*  Left: Phone mockup  */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative shrink-0"
          >
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-b from-[#2563EB]/40 to-transparent blur-2xl scale-110" />

            {/* Phone frame */}
            <div className="relative w-56 h-[460px] sm:w-64 sm:h-[520px] bg-[#0B1A30] rounded-[2.5rem] border-[3px] border-card/20 shadow-[0_40px_80px_rgba(0,0,0,0.5)] overflow-hidden">
              {/* Screen header */}
              <div className="absolute top-0 inset-x-0 h-10 bg-[#0B1A30] flex items-center justify-center">
                <div className="w-20 h-5 rounded-full bg-black/60" />
              </div>
              {/* Screen content */}
              <div className="absolute inset-0 mt-10 bg-gradient-to-b from-[#0B2550] to-[#0B1A30]">
                {/* App UI preview */}
                <div className="p-4 pt-3">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-white/50 text-[10px]">Good morning {"\u{1F44B}"}</p>
                      <p className="text-white font-bold text-sm">Rahul Sharma</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center">
                      <span className="text-white text-xs font-bold">RS</span>
                    </div>
                  </div>
                  {/* Wallet card */}
                  <div className="bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-2xl p-4 mb-4">
                    <p className="text-white/70 text-[10px] mb-1">Wallet Balance</p>
                    <p className="text-white font-extrabold text-xl">{"\u20B9"}24,500</p>
                    <div className="flex justify-between mt-3">
                      <div>
                        <p className="text-white/60 text-[9px]">Reward Points</p>
                        <p className="text-[#F5C842] font-bold text-xs">2,480 pts</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white/60 text-[9px]">This Month</p>
                        <p className="text-[#22C55E] font-bold text-xs">+{"\u20B9"}3,200</p>
                      </div>
                    </div>
                  </div>
                  {/* Quick actions */}
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {['\u{1F3E0}','\u2708\uFE0F','\u{1F3E8}','\u{1F9D1}'].map((icon, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <div className="w-9 h-9 rounded-xl bg-card/10 flex items-center justify-center text-base">{icon}</div>
                        <span className="text-white/50 text-[8px]">{['Flights','Hotels','Visa','Wallet'][i]}</span>
                      </div>
                    ))}
                  </div>
                  {/* Recent booking */}
                  <div className="bg-card/5 rounded-xl p-3">
                    <p className="text-white/50 text-[9px] mb-2 uppercase tracking-wider">Recent Booking</p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#2563EB]/30 flex items-center justify-center text-sm">œˆï¸</div>
                      <div>
                        <p className="text-white text-[11px] font-semibold">DEL → BOM</p>
                        <p className="text-white/50 text-[9px]">IndiGo  2 Pax  ₹8,450</p>
                      </div>
                      <div className="ml-auto px-2 py-0.5 rounded-full bg-[#22C55E]/20 text-[#22C55E] text-[8px] font-bold">CONFIRMED</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Bottom nav bar */}
              <div className="absolute bottom-0 inset-x-0 h-14 bg-[#0B1A30]/90 backdrop-blur border-t border-card/10 flex items-center justify-around px-4">
                {['\u{1F3E0}','\u2708\uFE0F','\u{1F3E8}','\u{1F9D1}'].map((icon, i) => (
                  <button key={i} className={`flex flex-col items-center gap-0.5 ${i === 0 ? 'text-[#2563EB]' : 'text-white/30'}`}>
                    <span className="text-sm">{icon}</span>
                    <div className={`w-1 h-1 rounded-full ${i === 0 ? 'bg-[#2563EB]' : 'bg-transparent'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Floating notification card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -right-4 top-16 bg-card rounded-2xl shadow-2xl px-3 py-2.5 flex items-center gap-2 min-w-[150px]"
            >
              <div className="w-8 h-8 rounded-xl bg-[#22C55E]/10 flex items-center justify-center shrink-0">
                <span className="text-base">{"\u{1F389}"}</span>
              </div>
              <div>
                <p className="text-[#1F2937] text-[10px] font-bold leading-tight">Booking Confirmed!</p>
                <p className="text-[#6B7280] text-[9px]">DEL → GOA  3 seats</p>
              </div>
            </motion.div>

            {/* Floating rating card */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
              className="absolute -left-6 bottom-24 bg-card rounded-2xl shadow-2xl px-3 py-2.5 flex items-center gap-2"
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-[#F5C842] fill-[#F5C842]" />
                ))}
              </div>
              <p className="text-[#1F2937] text-[10px] font-bold">4.8 / 5.0</p>
            </motion.div>
          </motion.div>

          {/*  Right: Content  */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex-1 text-white"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/10 border border-card/20 rounded-full mb-6">
              <Smartphone className="w-4 h-4 text-[#60A5FA]" />
              <span className="text-sm font-semibold text-[#60A5FA]">Now Available on Mobile</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-5">
              Download the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] to-[#F5C842]">
                TravelHub App
              </span>
            </h2>

            <p className="text-white/70 text-lg max-w-xl mb-8">
              Manage all your bookings, track commissions, access e-tickets and wallet  all on the go. Your entire travel business, in your pocket.
            </p>

            {/* Feature list */}
            <ul className="space-y-3 mb-10">
              {features.map((f, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="flex items-center gap-3 text-white/80 text-base font-medium"
                >
                  <div className="w-7 h-7 rounded-lg bg-card/10 flex items-center justify-center shrink-0 text-sm">
                    {f.split(' ')[0]}
                  </div>
                  {f.substring(f.indexOf(' ') + 1)}
                </motion.li>
              ))}
            </ul>

            {/* Download buttons with official badge images */}
            <div className="flex flex-wrap gap-4">
              {/* App Store */}
              <a
                href="#"
                className="group relative flex items-center gap-3 bg-black hover:bg-[#111] border border-card/20 hover:border-card/40 px-5 py-3.5 rounded-2xl transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] active:scale-95"
              >
                {/* Apple icon SVG */}
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-white fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <p className="text-white/60 text-[10px] leading-tight">Download on the</p>
                  <p className="text-white font-bold text-base leading-tight">App Store</p>
                </div>
                {/* Shine effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              {/* Google Play */}
              <a
                href="#"
                className="group relative flex items-center gap-3 bg-black hover:bg-[#111] border border-card/20 hover:border-card/40 px-5 py-3.5 rounded-2xl transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] active:scale-95"
              >
                {/* Google Play icon SVG */}
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.18 23.76A2 2 0 0 1 2 22V2a2 2 0 0 1 1.18-1.76l11.64 11.76L3.18 23.76z" fill="#EA4335"/>
                  <path d="M20.53 10.27L17.3 8.46 13.88 12l3.42 3.54 3.23-1.81a2 2 0 0 0 0-3.46z" fill="#FBBC05"/>
                  <path d="M2 2a2 2 0 0 1 1.18-.24L14.82 12 3.18 23.76A2 2 0 0 1 2 22V2z" fill="#4285F4"/>
                  <path d="M3.18.24L14.82 12 17.3 8.46 5.04.46A2 2 0 0 0 3.18.24z" fill="#34A853"/>
                </svg>
                <div className="text-left">
                  <p className="text-white/60 text-[10px] leading-tight">Get it on</p>
                  <p className="text-white font-bold text-base leading-tight">Google Play</p>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-card/10">
              {[
                { val: '4.8˜', label: 'App Store Rating' },
                { val: '1M+', label: 'Downloads' },
                { val: '60K+', label: 'Active Agents' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-extrabold text-white">{s.val}</p>
                  <p className="text-white/50 text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
