import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Waves } from 'lucide-react'

// ─── Hero video background (stays within 100vh) ─────────────────────────
const HeroBackground = () => (
  <div className="absolute inset-0 overflow-hidden -z-10">
    {/* Video Element */}
    <video
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-screen object-cover absolute top-0 left-0 -z-10"
    >
      <source src="/videos/hero-sea.mp4" type="video/mp4" />
      Trình duyệt của bạn không hỗ trợ thẻ video.
    </video>

    {/* Elegant dark overlay to make text highly readable */}
    <div className="absolute inset-0 bg-slate-950/30" />

    {/* Subtle gradient overlay for extra depth & bottom darkening */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
  </div>
)

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Scroll to booking bar (now fully separate section below hero)
  const scrollToBooking = () => {
    const el = document.querySelector('#booking-section')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex flex-col overflow-hidden"
    >
      <HeroBackground />

      {/* Main hero content — vertically centred within the dark sky */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center
                      max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-20">
        {/* Pre-title */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="inline-flex items-center gap-3 text-ocean-200 text-[10px] tracking-[0.5em] uppercase mb-8">
            <span className="w-8 h-px bg-ocean-300/60" />
            Nha Trang, Việt Nam
            <span className="w-8 h-px bg-ocean-300/60" />
          </span>
        </div>

        {/* Title */}
        <h1 className={`font-serif text-white mb-5 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="block text-5xl sm:text-7xl lg:text-8xl font-light tracking-wider leading-none">Luna</span>
          <span className="block text-xl sm:text-2xl lg:text-3xl font-light tracking-[0.5em] mt-3 text-ocean-200">
            NHA TRANG RETREAT
          </span>
        </h1>

        {/* Gold divider */}
        <div className={`flex items-center gap-4 mb-7 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-12 h-px bg-luxury-gold/60" />
          <span className="text-luxury-gold text-lg">✦</span>
          <div className="w-12 h-px bg-luxury-gold/60" />
        </div>

        {/* Subtitle */}
        <p className={`text-white/70 text-base sm:text-lg font-light max-w-xl leading-relaxed mb-9
                       transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          Nơi vách đá gặp biển cả, nơi sự sang trọng hòa quyện cùng thiên nhiên.
          Trải nghiệm kỳ nghỉ hoàn hảo nhất tại vịnh Nha Trang.
        </p>

        {/* CTA Buttons — "Đặt Phòng Ngay" scrolls to BookingBar below hero */}
        <div className={`flex flex-col sm:flex-row gap-4 mb-12 transition-all duration-1000 delay-500
                         ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <button
            onClick={scrollToBooking}
            className="px-10 py-4 bg-white text-ocean-900 text-xs tracking-[0.3em] uppercase font-medium
                       hover:bg-ocean-50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer"
          >
            Đặt Phòng Ngay
          </button>
          <button
            onClick={() => {
              const el = document.querySelector('#rooms')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-10 py-4 border border-white/50 text-white text-xs tracking-[0.3em] uppercase font-light
                       hover:bg-white/10 transition-all duration-300 cursor-pointer"
          >
            Khám Phá Phòng
          </button>
        </div>

        {/* Stats — fully inside the dark night sky */}
        <div className={`grid grid-cols-3 gap-8 sm:gap-20 transition-all duration-1000 delay-600
                         ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center">
            <div className="font-serif text-3xl sm:text-4xl text-white font-light mb-1">24</div>
            <div className="text-white/40 text-[9px] tracking-widest uppercase">Phòng &amp; Suite</div>
          </div>
          <div className="text-center">
            <div className="font-serif text-3xl sm:text-4xl text-white font-light mb-1">5★</div>
            <div className="text-white/40 text-[9px] tracking-widest uppercase">Luxury Hotel</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-1.5">
              <Waves size={30} className="text-white/80 stroke-[1.2]" />
            </div>
            <div className="text-white/40 text-[9px] tracking-widest uppercase">Tầm nhìn biển</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — pinned to bottom of 100vh hero */}
      <button
        onClick={scrollToBooking}
        className="relative z-10 mb-6 flex flex-col items-center gap-1.5 text-white/40
                   hover:text-white/70 transition-colors mx-auto cursor-pointer"
        aria-label="Scroll to booking"
      >
        <span className="text-[9px] tracking-widest uppercase">Khám phá</span>
        <ChevronDown size={16} className="animate-bounce" />
      </button>
    </section>
  )
}
