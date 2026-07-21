import { Link } from 'react-router-dom'
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react'
import TravelHubLogo from '../ui/TravelHubLogo.jsx'

const socials = [
  { icon: Facebook,  label: 'Facebook',  href: '#', color: 'hover:bg-blue-600  hover:border-blue-600' },
  { icon: Twitter,   label: 'Twitter',   href: '#', color: 'hover:bg-sky-500   hover:border-sky-500'  },
  { icon: Linkedin,  label: 'LinkedIn',  href: '#', color: 'hover:bg-blue-700  hover:border-blue-700' },
  { icon: Instagram, label: 'Instagram', href: '#', color: 'hover:bg-pink-600  hover:border-pink-600' },
  { icon: Youtube,   label: 'YouTube',   href: '#', color: 'hover:bg-red-600   hover:border-red-600'  },
]

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white relative overflow-hidden">
      {/* Top gradient accent line */}
      <div className="h-[3px] gradient-bg" />

      <div className="container-max section-padding py-14 flex flex-col items-center gap-10">

        {/* Logo */}
        <Link to="/">
          <TravelHubLogo size="lg" light />
        </Link>

        {/* Social icons  large, centered */}
        <div className="flex items-center justify-center gap-5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center
                          transition-all duration-300 hover:scale-110 hover:-translate-y-1
                          hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)] ${s.color}`}
            >
              <s.icon className="w-6 h-6 text-white" />
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full max-w-xs h-px bg-white/10" />

        {/* Copyright */}
        <p className="text-sm text-white/40 text-center">
          © 2026 TRAVELHUB  All rights reserved.
        </p>
      </div>
    </footer>
  )
}
