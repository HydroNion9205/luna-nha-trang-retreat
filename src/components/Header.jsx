import { useState, useEffect } from 'react'
import { Menu, X, Phone, ChevronDown, Calendar } from 'lucide-react' 
import { useBooking } from '../context/BookingContext' 
import { BookingManagement } from './SearchResults'
import LoginModal from './LoginModal' 

const navLinks = [
  { label: 'Phòng & Suite', href: '#rooms' },
  { label: 'Ẩm Thực', href: '#dining' },
  { label: 'Trải Nghiệm', href: '#experiences' },
  { label: 'Về Chúng Tôi', href: '#concept' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false) // Giữ lại 1 định nghĩa duy nhất

  // Lấy dữ liệu từ Context (Giữ lại 1 định nghĩa duy nhất)
  const { bookings, view, navigateHome } = useBooking()
  const activeBookingsCount = bookings.filter(b => b.status === 'active').length

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href) => {
    setMobileOpen(false)
    
    if (view !== 'home') {
      navigateHome()
      setTimeout(() => {
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } else {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || mobileOpen
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-sand-100'
          : 'bg-transparent'
      }`}
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={navigateHome}
          className={`font-serif text-2xl tracking-[0.2em] uppercase font-light cursor-pointer ${
            isScrolled || mobileOpen ? 'text-gray-900' : 'text-white'
          }`}
        >
          Luna
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`text-xs tracking-widest uppercase transition-colors font-light cursor-pointer ${
                isScrolled ? 'text-gray-600 hover:text-ocean-700' : 'text-white/80 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => setLoginOpen(true)}
            className={`text-xs tracking-widest uppercase font-medium transition-colors cursor-pointer ${
              isScrolled ? 'text-gray-600 hover:text-ocean-700' : 'text-white/80 hover:text-white'
            }`}
          >
            Đăng Nhập
          </button>
          
          <a
            href="tel:+84368789135"
            className={`flex items-center gap-2 text-xs tracking-wider transition-colors ${
              isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/80 hover:text-white'
            }`}
          >
            <Phone size={13} strokeWidth={1.8} />
            +84 368 789 135
          </a>

          <button
            onClick={() => setHistoryOpen(true)}
            className={`relative flex items-center gap-1.5 text-xs tracking-widest uppercase transition-colors font-medium cursor-pointer ${
              isScrolled ? 'text-gray-600 hover:text-ocean-700' : 'text-white/90 hover:text-white'
            }`}
          >
            <Calendar size={13} />
            Lịch sử
            {activeBookingsCount > 0 && (
              <span className="absolute -top-2.5 -right-3.5 bg-ocean-700 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-mono font-bold animate-pulse">
                {activeBookingsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => handleNavClick('#booking-section')}
            className={`border px-5 py-2.5 text-xs tracking-widest uppercase font-medium transition-all duration-300 rounded-xl cursor-pointer ${
              isScrolled
                ? 'bg-gray-900 text-white border-transparent hover:bg-gray-800 hover:shadow-md'
                : 'bg-white/10 text-white border-white/20 backdrop-blur-sm hover:bg-white hover:text-gray-900'
            }`}
          >
            Đặt Phòng
          </button>
        </div>

        {/* Hamburger Menu (Mobile/Tablet Toggle) */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setHistoryOpen(true)}
            className={`relative p-2 cursor-pointer ${
              isScrolled || mobileOpen ? 'text-gray-800' : 'text-white'
            }`}
            aria-label="Xem lịch sử đặt phòng"
          >
            <Calendar size={20} />
            {activeBookingsCount > 0 && (
              <span className="absolute top-1 right-1 bg-ocean-700 text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-mono font-bold">
                {activeBookingsCount}
              </span>
            )}
          </button>

          <button
            className={`p-2 transition-colors cursor-pointer ${
              isScrolled || mobileOpen ? 'text-gray-800' : 'text-white'
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-[26rem] opacity-100 border-t border-sand-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-white/98 backdrop-blur-lg px-6 py-6 space-y-4">
          <button
            onClick={() => { setMobileOpen(false); setLoginOpen(true); }}
            className="block w-full text-left text-sm tracking-widest uppercase text-gray-700 hover:text-ocean-700 font-light py-2 border-b border-sand-100 transition-colors cursor-pointer"
          >
            Đăng Nhập / Đăng Ký
          </button>

          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="block w-full text-left text-sm tracking-widest uppercase text-gray-700 hover:text-ocean-700 font-light py-2 border-b border-sand-100 transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          
          <button
            onClick={() => { setMobileOpen(false); setHistoryOpen(true); }}
            className="flex items-center justify-between w-full text-left text-sm tracking-widest uppercase text-gray-700 hover:text-ocean-700 font-light py-2 border-b border-sand-100 transition-colors cursor-pointer"
          >
            <span>Trạng thái &amp; Lịch sử đặt phòng</span>
            <span class="bg-sand-100 text-gray-600 font-mono text-xs px-2 py-0.5 rounded-md">{bookings.length} đơn</span>
          </button>

          <button
            onClick={() => handleNavClick('#booking-section')}
            className="w-full mt-4 py-3 bg-ocean-700 text-white text-xs tracking-widest uppercase font-medium hover:bg-ocean-800 transition-colors rounded-xl cursor-pointer"
          >
            Đặt Phòng Ngay
          </button>
          
          <div className="pt-2 flex justify-center">
            <a
              href="tel:+84368789135"
              className="flex items-center gap-2 text-xs tracking-wider text-gray-500 font-light"
            >
              <Phone size={12} />
              +84 368 789 135
            </a>
          </div>
        </div>
      </div>

      {/* Modal Lịch sử đặt phòng (Chỉ giữ lại 1 block duy nhất) */}
      {historyOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm"
          onClick={() => setHistoryOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-sand-100 relative max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setHistoryOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 cursor-pointer">
              <X size={18} />
            </button>
            <div className="pt-2">
              <BookingManagement />
            </div>
          </div>
        </div>
      )}

      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </header>
  )
}
