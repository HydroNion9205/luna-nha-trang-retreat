import { useEffect, useRef, useState } from 'react'
import RoomCard, { rooms } from './RoomCard'

export default function Rooms() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="rooms" className="py-24 sm:py-32 bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-px bg-luxury-gold" />
            <span className="text-luxury-gold text-[10px] tracking-[0.4em] uppercase">Chỗ Ở</span>
            <div className="w-8 h-px bg-luxury-gold" />
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-gray-900 font-light mb-6">
            Phòng &amp; Suite
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            Mỗi không gian tại Luna được thiết kế như một tác phẩm nghệ thuật sống — nơi ánh sáng tự nhiên, vật liệu hữu cơ và tầm nhìn biển cả tạo nên trải nghiệm độc nhất vô nhị.
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <RoomCard key={room.id} room={room} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <p className="text-gray-400 text-sm mb-4">Cần thêm thông tin hoặc yêu cầu đặc biệt?</p>
          <a
            href="tel:+84368789135"
            className="inline-flex items-center gap-3 text-ocean-700 hover:text-ocean-900 text-sm tracking-wider font-medium transition-colors border-b border-ocean-200 hover:border-ocean-700 pb-0.5"
          >
            Gọi cho chúng tôi: +84 368 789 135
          </a>
        </div>
      </div>
    </section>
  )
}
