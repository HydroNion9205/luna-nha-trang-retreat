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

// ─── Desktop Fast-Scroll Links (trên Header) ──────────────────────────────────
const fastLinks = [
  { label: 'Phòng & Suite',  href: '#rooms' },
  { label: 'Ẩm Thực',        href: '#dining' },
  { label: 'Trải Nghiệm',    href: '#experiences' },
  { label: 'Về Chúng Tôi',   href: '#concept' },
]

// ─── Mega Menu Dropdown Data ──────────────────────────────────────────────────
const menuSections = [
  {
    title: 'KHÁCH SẠN',
    links: [
      { label: 'Giới Thiệu',         href: '#concept' },
      { label: 'Phòng & Suite',      href: '#rooms' },
      { label: 'Ẩm Thực',            href: '#dining' },
      { label: 'Trải Nghiệm',        href: '#experiences' },
      { label: 'Hội Nghị & Sự Kiện', href: '#events' },
    ]
  },
  {
    title: 'THÔNG TIN',
    links: [
      { label: 'Chính Sách Đặt Phòng', href: '#booking-policy' },
      { label: 'Chính Sách Hủy Phòng', href: '#cancel-policy' },
      { label: 'Điều Khoản Dịch Vụ',   href: '#terms' },
      { label: 'Bảo Mật Thông Tin',    href: '#privacy' },
      { label: 'Trợ Giúp & FAQ',       href: '#faq' },
    ]
  },
  {
    title: 'LIÊN KẾT',
    links: [
      { label: 'Tuyển Dụng',              href: '#careers' },
      { label: 'Đối Tác Du Lịch',         href: '#partners' },
      { label: 'Báo Chí & Media',         href: '#media' },
      { label: 'Chương Trình Thành Viên', href: '#membership' },
    ]
  }
]

// Hero height: trang Hero chiếm 100vh
const HERO_HEIGHT = () => window.innerHeight

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [pastHero, setPastHero]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setIsScrolled(y > 60)
      setPastHero(y > HERO_HEIGHT() * 0.85)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href) => {
    setMenuOpen(false)
    if (href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Nếu menu đang mở, ta ép Header sang theme tối (giống giao diện menu dropdown) để tạo khối liền mạch
  // Hoặc ta vẫn giữ theme cuộn. Ở đây chọn giữ theme cuộn của Header.
  const headerSolid  = isScrolled || menuOpen
  const isDarkTheme  = menuOpen || !isScrolled

  // ── Màu text theo ngữ cảnh ─────────────────────────────────────────────────
  const textColor = isDarkTheme ? 'text-white/90' : 'text-gray-700'
  const textHover = isDarkTheme ? 'hover:text-white' : 'hover:text-ocean-700'
  const iconColor = isDarkTheme ? 'text-white/70' : 'text-gray-500'
  const iconHover = isDarkTheme ? 'hover:text-white' : 'hover:text-ocean-700'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        menuOpen
          ? 'bg-[#0a0f18] border-b border-white/10' // Màu tối khi mở menu
          : isScrolled
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
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              className={`transition-colors duration-300 ${textColor} ${textHover}`}
            >
              {menuOpen ? <X size={22} /> : <IconHamburger />}
            </button>

            {/* Logo — tên khách sạn ẩn khi ở Hero, hiện khi scroll ra */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setMenuOpen(false); }}
              className="flex flex-col leading-none"
            >
              {/* "LUNA" */}
              <span
                className={`font-serif text-2xl font-light tracking-widest transition-all duration-500 overflow-hidden block ${
                  isDarkTheme ? 'text-white' : 'text-ocean-900'
                } ${
                  pastHero || menuOpen
                    ? 'max-h-12 opacity-100 translate-y-0'
                    : 'max-h-0 opacity-0 -translate-y-1'
                }`}
                style={{ transition: 'max-height 0.4s ease, opacity 0.4s ease, transform 0.4s ease' }}
              >
                LUNA
              </span>

              {/* "Nha Trang Retreat" */}
              <span
                className={`text-[9px] tracking-[0.3em] uppercase font-light transition-all duration-500 overflow-hidden block ${
                  isDarkTheme ? 'text-ocean-200' : 'text-luxury-gold'
                } ${
                  pastHero || menuOpen
                    ? 'max-h-6 opacity-100 translate-y-0'
                    : 'max-h-0 opacity-0 -translate-y-1'
                }`}
                style={{ transition: 'max-height 0.45s ease, opacity 0.45s ease, transform 0.45s ease' }}
              >
                Nha Trang Retreat
              </span>
            </a>
          </div>

          {/* ── Center: Desktop Fast-Scroll Nav ── */}
          {/* Sẽ ẩn đi khi menuOpen = true */}
          <nav
            className={`hidden md:flex items-center gap-8 transition-all duration-300 ${
              menuOpen ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
            }`}
          >
            {fastLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`text-[13px] tracking-widest uppercase font-light transition-all duration-300 relative group ${textColor} ${textHover}`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
                  isDarkTheme ? 'bg-white' : 'bg-ocean-600'
                }`} />
              </button>
            ))}
          </nav>

          {/* ── Right: Social icons + Book Now ── */}
          <div className="flex items-center gap-4">
            {/* 3 social icons (Desktop only) - Ẩn khi menuOpen = true */}
            <div
              className={`hidden md:flex items-center gap-4 transition-all duration-300 ${
                menuOpen ? 'opacity-0 pointer-events-none translate-x-4' : 'opacity-100 translate-x-0'
              }`}
            >
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
              <div className={`w-px h-5 ${isDarkTheme ? 'bg-white/20' : 'bg-sand-200'}`} />
            </div>

            {/* Book Now — bo góc (Luôn hiển thị) */}
            <button
              onClick={() => handleNavClick('#booking-section')}
              className={`px-4 md:px-6 py-1.5 md:py-2.5 rounded-full text-[10px] md:text-xs tracking-widest uppercase font-medium transition-all duration-300 ${
                isDarkTheme
                  ? 'bg-white/20 text-white border border-white/50 hover:bg-white hover:text-ocean-900 backdrop-blur-sm'
                  : 'bg-ocean-700 text-white hover:bg-ocean-800 shadow-md hover:shadow-lg'
              }`}
            >
              Book Now
            </button>
          </div>

        </div>
      </div>

      {/* ── Mega Menu Dropdown ── */}
      <div
        className={`absolute top-20 left-0 right-0 w-full transition-all duration-500 overflow-hidden ${
          menuOpen ? 'max-h-[85vh] opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-[#0a0f18] text-white border-t border-white/10 shadow-2xl h-full pb-12 pt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-y-auto max-h-[calc(85vh-20px)] scrollbar-thin scrollbar-thumb-white/10">
            {/* Desktop: 3 cột ngang | Mobile: 3 phần dọc */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              {menuSections.map(section => (
                <div key={section.title} className="flex flex-col gap-5">
                  <h3 className="text-[13px] tracking-[0.25em] font-medium uppercase text-white/90">
                    {section.title}
                  </h3>
                  <div className="flex flex-col gap-3.5">
                    {section.links.map(link => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                        className="text-[15px] font-light text-white/50 hover:text-white transition-colors block w-fit"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Thêm Social Icons trên Mobile cho menu */}
            <div className="mt-12 pt-8 border-t border-white/10 flex md:hidden items-center gap-6">
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
                  className="text-white/40 hover:text-white transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
