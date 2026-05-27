import { useEffect, useRef, useState } from 'react'
import { Utensils, Wine, Fish, Flame, Clock, Star } from 'lucide-react'

const menuHighlights = [
  { icon: <Fish size={20} />, name: 'Cá Hồng Hấp Nha Trang', desc: 'Cá tươi đánh bắt hàng ngày, hấp với gừng và sả địa phương', tag: 'Signature Dish' },
  { icon: <Utensils size={20} />, name: 'Tôm Hùm Vịnh Nha Trang', desc: 'Tôm hùm tươi sống với bơ chanh thảo mộc và rau thơm địa phương', tag: 'Chef\'s Special' },
  { icon: <Wine size={20} />, name: 'Luna Sunset Cocktail', desc: 'Pha chế độc quyền từ mít non, nước cốt dừa và vodka hữu cơ', tag: 'Bar Exclusive' },
  { icon: <Flame size={20} />, name: 'Bò Wagyu Nướng Miso', desc: 'Wagyu A5 nhập khẩu, ướp miso Nhật Bản, nướng trên than hoa', tag: 'Land & Sea' },
]

export default function Dining() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeItem, setActiveItem] = useState(null)

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
    <section id="dining" className="py-24 sm:py-32 bg-gray-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Visual */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-x-12'}`}>
            {/* Main dining visual */}
            <div className="relative rounded-3xl overflow-hidden h-[500px] shadow-2xl group">
              <img
                src="/public/La_Mer.jpg"
                alt="Nhà Hàng La Mer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/35" />
              {/* Restaurant name overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <div className="glass-dark rounded-xl p-5">
                  <p className="text-white/50 text-[9px] tracking-[0.4em] uppercase mb-1">Nhà Hàng</p>
                  <h3 className="font-serif text-3xl font-light">La Mer</h3>
                  <p className="text-white/50 text-xs mt-1">Fine Dining · Tầng thượng · Mở: 18:00 – 23:00</p>
                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} className="fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-white/40 text-[10px] ml-1">5.0 · 248 đánh giá</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub images */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="h-32 rounded-2xl overflow-hidden relative group">
                <img
                  src="/public/Wine_Cellar.jpg"
                  alt="Wine Cellar"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute bottom-3 left-3 text-white text-xs font-light z-10">Wine Cellar</div>
              </div>
              <div className="h-32 rounded-2xl overflow-hidden relative group">
                <img
                  src="/public/HaiSan.jpg"
                  alt="Hải Sản Tươi"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute bottom-3 left-3 text-white text-xs font-light z-10">Hải Sản Tươi</div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-luxury-gold" />
              <span className="text-luxury-gold text-[10px] tracking-[0.4em] uppercase">Fine Dining</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl text-white font-light leading-tight mb-6">
              Ẩm Thực Lấy Cảm<br />
              Hứng Từ{' '}
              <em className="italic text-ocean-400">Biển Cả</em>
            </h2>

            <p className="text-white/50 leading-relaxed mb-8 font-light">
              Nhà hàng La Mer tọa lạc trên tầng thượng nhìn ra toàn cảnh vịnh Nha Trang. Chef Executive Trần Minh Khoa — được đào tạo tại Le Cordon Bleu Paris — mang đến những tác phẩm ẩm thực kết hợp tinh tế giữa kỹ thuật Pháp và hương vị địa phương.
            </p>

            {/* Highlights info */}
            <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-white/5 rounded-xl border border-white/10">
              {[
                { icon: <Clock size={14} />, label: '18:00 – 23:00', sub: 'Giờ mở cửa' },
                { icon: <Utensils size={14} />, label: '7 khóa học', sub: 'Tasting Menu' },
                { icon: <Fish size={14} />, label: 'Hàng ngày', sub: 'Nguyên liệu tươi' },
              ].map((item) => (
                <div key={item.sub} className="text-center">
                  <div className="flex justify-center text-ocean-400 mb-2">{item.icon}</div>
                  <div className="text-white text-xs font-medium">{item.label}</div>
                  <div className="text-white/30 text-[9px] uppercase tracking-wide mt-0.5">{item.sub}</div>
                </div>
              ))}
            </div>

            {/* Menu highlights */}
            <div className="space-y-3 mb-8">
              <p className="text-white/30 text-[10px] tracking-[0.4em] uppercase mb-4">Món Đặc Trưng</p>
              {menuHighlights.map((item, index) => (
                <div
                  key={item.name}
                  className={`group flex gap-4 p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                    activeItem === index
                      ? 'bg-ocean-900/50 border-ocean-700'
                      : 'border-white/5 hover:border-white/20 hover:bg-white/5'
                  }`}
                  onClick={() => setActiveItem(activeItem === index ? null : index)}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-ocean-900 rounded-xl flex items-center justify-center text-ocean-400 group-hover:bg-ocean-800 transition-colors">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white text-sm font-medium truncate">{item.name}</h4>
                      <span className="flex-shrink-0 text-[8px] bg-luxury-gold/20 text-luxury-gold px-2 py-0.5 rounded-full tracking-wide">{item.tag}</span>
                    </div>
                    <p className={`text-white/40 text-xs leading-relaxed transition-all duration-300 ${activeItem === index ? 'max-h-20 opacity-100' : 'max-h-0 overflow-hidden opacity-0 md:max-h-20 md:opacity-100'}`}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="flex items-center gap-3 text-ocean-400 hover:text-white text-xs tracking-[0.3em] uppercase transition-colors group cursor-pointer">
              <span>Xem Thực Đơn Đầy Đủ</span>
              <span className="w-6 h-px bg-ocean-400 group-hover:w-12 group-hover:bg-white transition-all duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
