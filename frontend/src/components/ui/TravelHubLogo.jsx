/**
 * TravelHubLogo  reusable brand logo component
 * Recreates the TRAVELHUB logo: navy globe badge + bold text + gold underline + tagline
 *
 * Props:
 *   size      'sm' | 'md' | 'lg'  (default: 'md')
 *   dark      bool, use dark (navy) text (default: false  adapts to context)
 *   light     bool, use white text (for dark backgrounds)
 *   noTagline  bool, hide the tagline row
 */
export default function TravelHubLogo({
  size = 'md',
  light = false,
  noTagline = false,
}) {
  const sizeMap = {
    sm: { badge: 32, plane: 14, name: 'text-lg', sub: 'text-[9px]', gap: 'gap-2', bar: 'h-[2px] mt-0.5' },
    md: { badge: 40, plane: 18, name: 'text-[22px]', sub: 'text-[10px]', gap: 'gap-2.5', bar: 'h-[2.5px] mt-0.5' },
    lg: { badge: 52, plane: 24, name: 'text-[30px]', sub: 'text-xs', gap: 'gap-3', bar: 'h-[3px] mt-1' },
  }
  const s = sizeMap[size]
  const textColor = light ? 'text-white' : 'text-[#1A2D5A]'

  return (
    <div className={`flex items-center ${s.gap} select-none`}>
      {/*  Globe Badge  */}
      <div
        className="shrink-0 relative"
        style={{ width: s.badge, height: s.badge }}
      >
        <svg
          width={s.badge}
          height={s.badge}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer gold ring */}
          <circle cx="24" cy="24" r="23" stroke="#DAA520" strokeWidth="2" fill="#1A2D5A"/>
          {/* Inner glow circle */}
          <circle cx="24" cy="24" r="19" fill="#162445" />

          {/* Globe latitude lines */}
          <ellipse cx="24" cy="24" rx="13" ry="13" stroke="#ffffff22" strokeWidth="0.8"/>
          <ellipse cx="24" cy="24" rx="13" ry="6" stroke="#ffffff22" strokeWidth="0.8"/>
          <line x1="24" y1="11" x2="24" y2="37" stroke="#ffffff22" strokeWidth="0.8"/>
          <line x1="11" y1="24" x2="37" y2="24" stroke="#ffffff22" strokeWidth="0.8"/>

          {/* Compass arrow pointing up  gold */}
          <polygon points="24,10 21,22 24,20 27,22" fill="#DAA520"/>
          {/* Lower arrow  white/light */}
          <polygon points="24,38 21,26 24,28 27,26" fill="#ffffff55"/>

          {/* Center dot */}
          <circle cx="24" cy="24" r="2.5" fill="#ffffff"/>

          {/* Small teal checkmark badge bottom-right */}
          <rect x="30" y="31" width="11" height="11" rx="2.5" fill="#00BCD4" />
          <polyline points="33,36.5 35.5,39 38.5,34" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/*  Text block  */}
      <div>
        {/* Brand name */}
        <div className={`font-black tracking-[0.08em] uppercase leading-none ${s.name} ${textColor}`}>
          TRAVELHUB
        </div>
        {/* Gold underline */}
        <div className={`${s.bar} rounded-full bg-gradient-to-r from-[#DAA520] to-[#F5C842]`} />
        {/* Tagline */}
        {!noTagline && (
          <div className={`flex items-center gap-1 ${s.sub} font-semibold tracking-wide mt-1 ${light ? 'opacity-90' : ''}`}>
            <span className="text-[#00BCD4]">Tour</span>
            <span className={light ? 'text-white/50' : 'text-[#9CA3AF]'}></span>
            <span className={light ? 'text-white/80' : 'text-[#374151]'}>Insurance</span>
            <span className={light ? 'text-white/50' : 'text-[#9CA3AF]'}></span>
            <span className="text-[#DAA520]">Visa</span>
            <span className={light ? 'text-white/50' : 'text-[#9CA3AF]'}></span>
            <span className={light ? 'text-white/80' : 'text-[#374151]'}>Hotels</span>
          </div>
        )}
      </div>
    </div>
  )
}
