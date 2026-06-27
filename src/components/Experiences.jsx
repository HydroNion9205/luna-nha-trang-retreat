import { useEffect, useRef, useState } from 'react'
import {
  Sun, Waves, Palette, Anchor, Leaf, ChefHat, Clock,
} from 'lucide-react'

const experiences = [
  {
    icon: <Sun size={22} strokeWidth={1.4} />,
    title: 'Yoga Bình Minh',
    desc: 'Đón bình minh trên vách đá cùng giảng viên yoga cao cấp. Bắt đầu ngày mới trong sự tĩnh lặng hoàn toàn.',
    time: '05:30 – 07:00',
    tag: 'Wellness',
  },
  {
    icon: <Anchor size={22} strokeWidth={1.4} />,
    title: 'Lặn Biển Nha Trang',
    desc: 'Khám phá rạn san hô đa sắc với hướng dẫn viên chuyên nghiệp. Bộ thiết bị lặn cao cấp được cung cấp.',
    time: '08:00 – 12:00',
    tag: 'Adventure',
  },
  {
    icon: <Palette size={22} strokeWidth={1.4} />,
    title: 'Vẽ Tranh Thủy Mặc',
    desc: 'Học nghệ thuật thủy mặc truyền thống với nghệ nhân địa phương trong studio nhìn ra vịnh biển.',
    time: '14:00 – 16:00',
    tag: 'Culture',
  },
  {
    icon: <Waves size={22} strokeWidth={1.4} />,
    title: 'Du Thuyền Hoàng Hôn',
    desc: 'Ngắm hoàng hôn trên du thuyền riêng với rượu champagne và hải sản tươi. Trải nghiệm không thể quên.',
    time: '17:00 – 20:00',
    tag: 'Romantic',
  },
  {
    icon: <Leaf size={22} strokeWidth={1.4} />,
    title: 'Spa & Khoáng Nóng',
    desc: 'Liệu pháp trị liệu tổng thể kết hợp kỹ thuật massage truyền thống Việt Nam và tinh dầu thiên nhiên.',
    time: 'Cả ngày',
    tag: 'Spa',
  },
  {
    icon: <ChefHat size={22} strokeWidth={1.4} />,
    title: 'Lớp Học Nấu Ăn',
    desc: 'Học nấu các món hải sản Nha Trang cùng bếp trưởng. Thưởng thức thành quả của chính mình ngay sau đó.',
    time: '09:00 – 12:00',
    tag: 'Culinary',
  },
]

const experienceImages = [
  '/images/yoga.jpg',
  '/images/lanbien.jpg',
  '/images/tranhthuymac.jpg',
  '/images/duthuyen.jpg',
  '/images/spakhoang.jpg',
  '/images/lophocnauan.jpg',
]

export default function Experiences() {
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
    <section id="experiences" className="py-24 sm:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-px bg-luxury-gold" />
            <span className="text-luxury-gold text-[10px] tracking-[0.4em] uppercase">Curated</span>
            <div className="w-8 h-px bg-luxury-gold" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-gray-900 font-light mb-4">
            Trải Nghiệm
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto font-light">
            Mỗi khoảnh khắc tại Luna đều được curate để trở thành ký ức khó quên.
          </p>
        </div>

        {/* Grid — 6 cards với nền ảnh */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, index) => (
            <div
              key={exp.title}
              className={`group relative p-7 rounded-2xl border border-white/10 overflow-hidden
                          hover:border-white/30 hover:shadow-2xl transition-all duration-500
                          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: isVisible ? `${index * 90}ms` : '0ms' }}
            >
              {/* Ảnh nền */}
              <img
                src={experienceImages[index]}
                alt={exp.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              
              {/* Lớp phủ gradient tối mỏng để đảm bảo chữ trắng luôn đọc được, tập trung tối dần ở phía dưới */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80 transition-all duration-500 group-hover:to-black/90" />

              {/* Nội dung bên trên lớp phủ */}
              <div className="relative z-10 flex flex-col h-full text-white">
                {/* Tag badge */}
                <div className="mb-5">
                  <span className="inline-block text-[9px] tracking-[0.3em] uppercase text-white
                                   bg-white/20 border border-white/30 backdrop-blur-md px-2.5 py-1 rounded-full">
                    {exp.tag}
                  </span>
                </div>

                {/* Icon */}
                <div className="mb-4 text-white/90 group-hover:text-ocean-400 transition-colors duration-300">
                  {exp.icon}
                </div>

                {/* Tiêu đề */}
                <h3 className="font-serif text-xl text-white font-light mb-2
                               group-hover:text-ocean-300 transition-colors">
                  {exp.title}
                </h3>

                {/* Mô tả */}
                <p className="text-white/70 text-sm leading-relaxed mb-5">{exp.desc}</p>

                {/* Giờ */}
                <div className="flex items-center gap-1.5 text-[10px] tracking-wider text-white/50 uppercase mt-auto pt-2">
                  <Clock size={11} strokeWidth={1.5} />
                  {exp.time}
                </div>
              </div>

              {/* Accent bottom */}
              <div className="absolute bottom-0 left-7 right-7 h-px bg-ocean-400 z-10
                              scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
