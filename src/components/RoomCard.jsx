import { useState, useEffect, useRef } from 'react'
import { Eye, Users, Maximize2, Wifi, Coffee, Waves, Star, ArrowRight, X } from 'lucide-react'

const amenities = [
  { icon: <Wifi size={14} />, label: 'Wi-Fi 5G' },
  { icon: <Coffee size={14} />, label: 'Mini Bar' },
  { icon: <Waves size={14} />, label: 'Bồn Tắm' },
  { icon: <Star size={14} />, label: 'Butler 24/7' },
]

const rooms = [
  {
    id: 'angelina-suite',
    type: 'suite',
    name: 'Angelina Suite',
    tagline: 'Toàn cảnh vịnh Nha Trang',
    description: 'Căn suite đỉnh cao với ban công riêng nhìn thẳng ra vịnh biển. Không gian mở thoáng đãng với nội thất cao cấp và bồn tắm khoáng nước nóng hướng biển.',
    price: 4800000,
    size: 85,
    maxGuests: 2,
    views: 'Toàn cảnh Vịnh',
    badge: 'Signature',
    badgeColor: 'bg-luxury-gold text-white',
    highlights: ['Ban công riêng 30m²', 'Bồn tắm hướng biển', 'Phòng khách riêng', 'Butler cá nhân'],
    image: '/public/Angelina_Suite.jpg',
  },
  {
    id: 'grand-deluxe',
    type: 'deluxe',
    name: 'Grand De Luxe',
    tagline: 'Sang trọng & Tinh tế',
    description: 'Phòng Grand De Luxe kết hợp hoàn hảo giữa thiết kế tối giản hiện đại và sự ấm áp của vật liệu tự nhiên. Tầm nhìn một phần ra vịnh và vườn nhiệt đới.',
    price: 2900000,
    size: 55,
    maxGuests: 2,
    views: 'Vịnh biển & Vườn',
    badge: 'Phổ biến nhất',
    badgeColor: 'bg-ocean-700 text-white',
    highlights: ['Giường King 2m × 2m', 'Phòng tắm đá cẩm thạch', 'Bàn làm việc cao cấp', 'Sân thượng riêng'],
    image: '/public/Grand_De_Luxe.jpg',
  },
  {
    id: 'romantic-hideaway',
    type: 'hideaway',
    name: 'Romantic Hideaway',
    tagline: 'Bí ẩn & Lãng mạn',
    description: 'Được thiết kế đặc biệt cho các cặp đôi, Romantic Hideaway mang đến không gian riêng tư hoàn toàn với tầm nhìn hoàng hôn tuyệt đẹp và những chi tiết lãng mạn.',
    price: 3500000,
    size: 65,
    maxGuests: 2,
    views: 'Hoàng hôn & Vịnh',
    badge: 'Dành cho cặp đôi',
    badgeColor: 'bg-rose-500 text-white',
    highlights: ['Giường Canopy', 'Hồ bơi nước muối riêng', 'Gói hoa hồng & rượu', 'Tầm nhìn hoàng hôn'],
    image: '/public/Romantic_Hideaway.jpg',
  },
]

function RoomModal({ room, onClose }) {
  if (!room) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Room image */}
        <div className="h-64 relative rounded-t-2xl overflow-hidden">
          <img 
            src={room.image} 
            alt={room.name} 
            className="w-full h-full object-cover" 
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-medium ${room.badgeColor}`}>
            {room.badge}
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-serif text-3xl text-gray-900 font-light">{room.name}</h3>
              <p className="text-ocean-600 text-sm mt-1 italic">{room.tagline}</p>
            </div>
            <div className="text-right">
              <div className="font-serif text-3xl text-ocean-800">{room.price.toLocaleString('vi-VN')}₫</div>
              <div className="text-gray-400 text-xs tracking-wide">/ mỗi đêm</div>
            </div>
          </div>

          <p className="text-gray-500 leading-relaxed mb-6">{room.description}</p>

          <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-sand-50 rounded-xl">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-ocean-700 mb-1"><Maximize2 size={14} /></div>
              <div className="font-medium text-gray-800">{room.size}m²</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wide">Diện tích</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-ocean-700 mb-1"><Users size={14} /></div>
              <div className="font-medium text-gray-800">{room.maxGuests} người</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wide">Tối đa</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-ocean-700 mb-1"><Eye size={14} /></div>
              <div className="font-medium text-gray-800 text-xs">{room.views}</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wide">Tầm nhìn</div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-[11px] tracking-widest uppercase text-gray-400 mb-3">Điểm nổi bật</p>
            <div className="grid grid-cols-2 gap-2">
              {room.highlights.map((h) => (
                <div key={h} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-ocean-400 flex-shrink-0" />
                  {h}
                </div>
              ))}
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}

export default function RoomCard({ room, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setIsVisible(true), index * 150)
        observer.disconnect()
      }
    }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [index])

  return (
    <>
      <div
        ref={ref}
        className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 cursor-pointer border border-sand-100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setModalOpen(true)}
      >
        {/* Room Visual */}
        <div className="relative h-60 overflow-hidden">
          <img 
            src={room.image} 
            alt={room.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
          <div className={`absolute inset-0 bg-black/15 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`} />

          {/* Badge */}
          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[9px] tracking-widest uppercase font-medium ${room.badgeColor}`}>
            {room.badge}
          </div>

          {/* Quick view on hover (Clean: NO overlaid eye icon) */}
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-white/90 backdrop-blur-sm text-gray-800 px-5 py-2.5 rounded-full text-xs tracking-widest uppercase font-medium shadow-lg">
              Xem Chi Tiết
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Meta */}
          <div className="flex items-center gap-4 mb-3 text-[10px] tracking-widest uppercase text-gray-400">
            <span className="flex items-center gap-1"><Maximize2 size={10} /> {room.size}m²</span>
            <span className="flex items-center gap-1"><Users size={10} /> {room.maxGuests} khách</span>
            <span className="flex items-center gap-1"><Eye size={10} /> {room.views}</span>
          </div>

          <h3 className="font-serif text-2xl text-gray-900 font-light mb-1 group-hover:text-ocean-800 transition-colors">
            {room.name}
          </h3>
          <p className="text-ocean-500 text-xs italic mb-4">{room.tagline}</p>
          <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-2">{room.description}</p>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-5">
            {amenities.map((a) => (
              <span key={a.label} className="flex items-center gap-1.5 text-[10px] tracking-wide text-gray-500 bg-sand-50 px-2.5 py-1.5 rounded-full">
                <span className="text-ocean-500">{a.icon}</span> {a.label}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-end justify-between pt-5 border-t border-sand-100">
            <div>
              <span className="text-[10px] text-gray-400 tracking-wide">Từ</span>
              <div className="font-serif text-2xl text-ocean-800 font-light">
                {room.price.toLocaleString('vi-VN')}₫
              </div>
              <span className="text-[10px] text-gray-400">/ đêm</span>
            </div>
            <span
              className="flex items-center gap-2 text-xs tracking-wider uppercase text-ocean-700 font-medium group-hover:gap-3 transition-all hover:text-ocean-900"
            >
              Xem Chi Tiết <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </div>

      {modalOpen && <RoomModal room={room} onClose={() => setModalOpen(false)} />}
    </>
  )
}

export { rooms }
