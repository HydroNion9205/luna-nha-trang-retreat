import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const IconHamburger = ({ className = '' }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className={className}>
    <line x1="3" y1="6"  x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

const IconFacebook = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const IconInstagram = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const IconMapPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

// ─── Nav Links ────────────────────────────────────────────────────────────────
const navLinks = [
  { label: 'Phòng & Suite',  href: '#rooms' },
  { label: 'Ẩm Thực',        href: '#dining' },
  { label: 'Trải Nghiệm',    href: '#experiences' },
  { label: 'Về Chúng Tôi',   href: '#concept' },
]

// Hero height: trang Hero chiếm 100vh
const HERO_HEIGHT = () => window.innerHeight

export default function Header() {
  const [isScrolled, setIsScrolled]   = useState(false)
  const [pastHero,   setPastHero]     = useState(false)   // đã scroll qua hero?
  const [mobileOpen, setMobileOpen]   = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setIsScrolled(y > 60)
      setPastHero(y > HERO_HEIGHT() * 0.85)   // 85% chiều cao hero
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // ── Màu text theo ngữ cảnh ─────────────────────────────────────────────────
  const textColor    = isScrolled ? 'text-gray-700'     : 'text-white/90'
  const textHover    = isScrolled ? 'hover:text-ocean-700' : 'hover:text-white'
  const iconColor    = isScrolled ? 'text-gray-500'     : 'text-white/70'
  const iconHover    = isScrolled ? 'hover:text-ocean-700' : 'hover:text-white'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-sand-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* ── Left: Hamburger + Logo ── */}
          <div className="flex items-center gap-4">
            {/* Hamburger menu icon */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
              className={`transition-colors duration-300 ${textColor} ${textHover}`}
            >
              {mobileOpen ? <X size={22} /> : <IconHamburger />}
            </button>


            {/* Logo — tên khách sạn ẩn khi ở Hero, hiện khi scroll ra */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="flex flex-col leading-none"
            >
              {/* "LUNA" — ẩn khi ở hero, sổ xuống khi scroll ra */}
              <span
                className={`font-serif text-2xl font-light tracking-widest transition-all duration-500 overflow-hidden block ${
                  isScrolled ? 'text-ocean-900' : 'text-white'
                } ${
                  pastHero
                    ? 'max-h-12 opacity-100 translate-y-0'
                    : 'max-h-0 opacity-0 -translate-y-1'
                }`}
                style={{ transition: 'max-height 0.4s ease, opacity 0.4s ease, transform 0.4s ease' }}
              >
                LUNA
              </span>

              {/* "Nha Trang Retreat" — ẩn khi ở hero, sổ xuống khi scroll ra */}
              <span
                className={`text-[9px] tracking-[0.3em] uppercase font-light transition-all duration-500 overflow-hidden block ${
                  isScrolled ? 'text-luxury-gold' : 'text-ocean-200'
                } ${
                  pastHero
                    ? 'max-h-6 opacity-100 translate-y-0'
                    : 'max-h-0 opacity-0 -translate-y-1'
                }`}
                style={{ transition: 'max-height 0.45s ease, opacity 0.45s ease, transform 0.45s ease' }}
              >
                Nha Trang Retreat
              </span>
            </a>
          </div>

          {/* ── Center: Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`text-[13px] tracking-widest uppercase font-light transition-all duration-300 relative group ${textColor} ${textHover}`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
                  isScrolled ? 'bg-ocean-600' : 'bg-white'
                }`} />
              </button>
            ))}
          </nav>

          {/* ── Right: Social icons + Book Now ── */}
          <div className="flex items-center gap-4">
            {/* 3 social icons (Desktop only) */}
            <div className="hidden md:flex items-center gap-4">
              {[
                { icon: <IconFacebook />,  label: 'Facebook',    href: 'https://www.facebook.com/TraVinhUniversity.TVU' },
                { icon: <IconInstagram />, label: 'Instagram',   href: 'https://www.instagram.com/travinhuniversity/' },
                { icon: <IconMapPin />,    label: 'Google Maps', href: 'https://maps.app.goo.gl/pZtuayjqhBhWh2om8' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors duration-300 ${iconColor} ${iconHover}`}
                >
                  {s.icon}
                </a>
              ))}

              {/* Divider */}
              <div className={`w-px h-5 ${isScrolled ? 'bg-sand-200' : 'bg-white/20'}`} />
            </div>

            {/* Book Now — bo góc (hiện trên cả Mobile và Desktop) */}
            <button
              onClick={() => handleNavClick('#booking-section')}
              className={`px-4 md:px-6 py-1.5 md:py-2.5 rounded-full text-[10px] md:text-xs tracking-widest uppercase font-medium transition-all duration-300 ${
                isScrolled
                  ? 'bg-ocean-700 text-white hover:bg-ocean-800 shadow-md hover:shadow-lg'
                  : 'bg-white/20 text-white border border-white/50 hover:bg-white hover:text-ocean-900 backdrop-blur-sm'
              }`}
            >
              Book Now
            </button>
          </div>

          {/* ── Mobile: chỉ hiện hamburger (đã tích hợp trên) ── */}
          {/* Hamburger mobile riêng (md:hidden) — ẩn desktop */}
        </div>
      </div>

      {/* ── Mobile / Hamburger Menu Dropdown ── */}
      <div
        className={`transition-all duration-400 overflow-hidden ${
          mobileOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className={`backdrop-blur-xl border-t px-6 py-6 space-y-4 ${
          isScrolled
            ? 'bg-white/98 border-sand-100'
            : 'bg-gray-950/80 border-white/10'
        }`}>
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`block w-full text-left text-sm tracking-widest uppercase font-light py-2 border-b transition-colors ${
                isScrolled
                  ? 'text-gray-700 hover:text-ocean-700 border-sand-100'
                  : 'text-white/80 hover:text-white border-white/10'
              }`}
            >
              {link.label}
            </button>
          ))}


          {/* Social icons trong mobile menu */}
          <div className="flex items-center gap-5 pt-2">
            {[
              { icon: <IconFacebook />,  label: 'Facebook',    href: 'https://www.facebook.com/TraVinhUniversity.TVU' },
              { icon: <IconInstagram />, label: 'Instagram',   href: 'https://www.instagram.com/travinhuniversity/' },
              { icon: <IconMapPin />,    label: 'Google Maps', href: 'https://maps.app.goo.gl/pZtuayjqhBhWh2om8' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${isScrolled ? 'text-gray-400 hover:text-ocean-700' : 'text-white/50 hover:text-white'}`}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
