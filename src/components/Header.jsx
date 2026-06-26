import { useState, useEffect } from 'react'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'

const navLinks = [
  { label: 'Phòng & Suite', href: '#rooms' },
  { label: 'Ẩm Thực', href: '#dining' },
  { label: 'Trải Nghiệm', href: '#experiences' },
  { label: 'Về Chúng Tôi', href: '#concept' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeLink, setActiveLink] = useState(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

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
          {/* Logo */}
          <a
            href="#"
            className="flex flex-col leading-none group"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          >
            <span
              className={`font-serif text-2xl font-light tracking-widest transition-colors duration-300 ${
                isScrolled ? 'text-ocean-900' : 'text-white'
              }`}
            >
              LUNA
            </span>
            <span
              className={`text-[9px] tracking-[0.3em] uppercase font-light transition-colors duration-300 ${
                isScrolled ? 'text-luxury-gold' : 'text-ocean-200'
              }`}
            >
              Nha Trang Retreat
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`text-[13px] tracking-widest uppercase font-light transition-all duration-300 relative group ${
                  isScrolled ? 'text-gray-700 hover:text-ocean-700' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
                  isScrolled ? 'bg-ocean-600' : 'bg-white'
                }`} />
              </button>
            ))}
          </nav>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+84368789135"
              className={`flex items-center gap-2 text-xs tracking-wider transition-colors duration-300 ${
                isScrolled ? 'text-gray-500 hover:text-ocean-700' : 'text-white/80 hover:text-white'
              }`}
            >
              <Phone size={13} />
              <span>+84 368 789 135</span>
            </a>
            <button
              onClick={() => handleNavClick('#booking-section')}
              className={`px-6 py-2.5 text-xs tracking-widest uppercase font-medium transition-all duration-300 ${
                isScrolled
                  ? 'bg-ocean-700 text-white hover:bg-ocean-800 shadow-md hover:shadow-lg'
                  : 'bg-white/20 text-white border border-white/50 hover:bg-white hover:text-ocean-900 backdrop-blur-sm'
              }`}
            >
              Book Now
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            id="mobile-menu-btn"
            className={`md:hidden p-2 rounded-md transition-colors ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/98 backdrop-blur-lg border-t border-sand-100 px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="block w-full text-left text-sm tracking-widest uppercase text-gray-700 hover:text-ocean-700 font-light py-2 border-b border-sand-100 transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('#booking-section')}
            className="w-full mt-4 py-3 bg-ocean-700 text-white text-xs tracking-widest uppercase font-medium hover:bg-ocean-800 transition-colors"
          >
            Đặt Phòng Ngay
          </button>
          <a href="tel:+84368789135" className="flex items-center gap-2 text-xs text-gray-500 mt-2">
            <Phone size={12} /> +84 368 789 135
          </a>
        </div>
      </div>
    </header>
  )
}
