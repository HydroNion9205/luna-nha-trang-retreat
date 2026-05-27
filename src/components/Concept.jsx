import { useEffect, useRef, useState } from 'react'
import { Waves, MountainSnow, Paintbrush2, Leaf } from 'lucide-react'

const useIntersectionObserver = (options = {}) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.15, ...options })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

export default function Concept() {
  const { ref, isVisible } = useIntersectionObserver()

  return (
    <section id="concept" className="py-24 sm:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Text */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-luxury-gold" />
              <span className="text-luxury-gold text-[10px] tracking-[0.4em] uppercase">Triết Lý</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-gray-900 font-light leading-tight mb-8">
              Nơi Yên Bình<br />
              <em className="italic text-ocean-700">Gặp Gỡ</em><br />
              Sang Trọng
            </h2>

            <div className="space-y-5 text-gray-500 font-light leading-relaxed">
              <p>
                Luna Nha Trang Retreat được sinh ra từ triết lý rằng sự xa xỉ thực sự không nằm ở những gì bạn có thể nhìn thấy, mà là những gì bạn cảm nhận được — làn gió biển mặn mà buổi sớm, tiếng sóng vỗ nhẹ khi đêm về, và khoảng không gian tĩnh lặng chỉ dành riêng cho bạn.
              </p>
              <p>
                Tọa lạc trên vách đá nhìn ra toàn cảnh vịnh Nha Trang — một trong những vịnh biển đẹp nhất thế giới — mỗi phòng tại Luna đều được thiết kế theo triết lý tối giản Nhật Bản kết hợp với hơi thở nghệ thuật đương đại Việt Nam.
              </p>
              <p>
                Chúng tôi tin vào những khoảnh khắc không nói nên lời — một bữa sáng trong thinh lặng với tầm nhìn ra biển, hay buổi hoàng hôn chỉ dành riêng cho hai người.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-8">
              {[
                { icon: <Waves size={18} strokeWidth={1.4} className="text-ocean-700" />, label: 'Tầm nhìn 180°\nra vịnh biển' },
                { icon: <MountainSnow size={18} strokeWidth={1.4} className="text-gray-600" />, label: 'Trên vách đá\n45 mét' },
                { icon: <Paintbrush2 size={18} strokeWidth={1.4} className="text-gray-600" />, label: 'Nghệ thuật\nđương đại' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0">{item.icon}</span>
                  <span className="text-xs text-gray-400 tracking-wide leading-relaxed whitespace-pre-line">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                const el = document.querySelector('#rooms')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="mt-10 group flex items-center gap-4 text-xs tracking-[0.3em] uppercase text-ocean-700 font-medium hover:text-ocean-900 transition-colors cursor-pointer"
            >
              <span>Khám Phá Không Gian</span>
              <span className="w-8 h-px bg-ocean-700 group-hover:w-14 transition-all duration-300" />
            </button>
          </div>

          {/* Right: Visual Art Grid */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="grid grid-cols-2 gap-4">
              {/* Tall left column */}
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden h-56 sm:h-72 bg-gradient-to-br from-ocean-800 to-ocean-900 group hover-scale">
                  {/* Ocean view local image */}
                  <img
                    src="/images/TamNhinVinh.jpg"
                    alt="Tầm nhìn Vịnh Biển"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-4 left-4 text-white z-10">
                    <p className="text-[9px] tracking-widest uppercase text-white/60">Tầm nhìn</p>
                    <p className="font-serif text-xl font-light">Vịnh Biển</p>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden h-40 bg-gradient-to-br from-sand-100 to-sand-200 group hover-scale">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="font-serif text-5xl text-sand-700 font-light mb-2">24</div>
                      <div className="text-[9px] tracking-[0.3em] uppercase text-sand-500">Phòng Suite</div>
                    </div>
                  </div>
                  {/* Decorative circles */}
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full border border-sand-300" />
                  <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full border border-sand-300" />
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-4 mt-8">
                <div className="relative rounded-2xl overflow-hidden h-40 bg-gradient-to-br from-ocean-100 to-ocean-200 group hover-scale">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="flex justify-center mb-3">
                        <Leaf size={32} strokeWidth={1.3} className="text-ocean-600" />
                      </div>
                      <div className="text-[9px] tracking-[0.3em] uppercase text-ocean-700">Bền vững</div>
                      <div className="text-xs text-ocean-600 font-light mt-1">Eco-Luxury</div>
                    </div>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden h-64 sm:h-72 bg-gradient-to-br from-gray-900 to-ocean-950 group hover-scale">
                  {/* Sunset local image */}
                  <img
                    src="/images/HoangHon.jpg"
                    alt="Hoàng hôn tại Luna Retreat"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-4 left-4 text-white z-10">
                    <p className="text-[9px] tracking-widest uppercase text-white/50">Hoàng hôn tại</p>
                    <p className="font-serif text-lg font-light">Luna Retreat</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="mt-6 p-6 bg-ocean-50 rounded-xl border-l-2 border-ocean-300">
              <p className="font-serif text-lg text-ocean-800 italic font-light leading-relaxed">
                "Nơi đây không chỉ là một khách sạn — đây là nơi để tâm hồn bạn được nghỉ ngơi."
              </p>
              <p className="text-[10px] tracking-widest uppercase text-ocean-400 mt-3">— Thành Nguyễn, Founder</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
