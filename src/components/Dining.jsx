import { useEffect, useRef, useState } from 'react'
import { Utensils, Wine, Fish, Flame, Clock, Star, X } from 'lucide-react'

// ─── Dữ liệu nổi bật trên trang chính ────────────────────────────────────────
const menuHighlights = [
  { icon: <Fish size={20} />, name: 'Cá Hồng Hấp Nha Trang', desc: 'Cá tươi đánh bắt hàng ngày, hấp với gừng và sả địa phương', tag: 'Signature Dish' },
  { icon: <Utensils size={20} />, name: 'Tôm Hùm Vịnh Nha Trang', desc: 'Tôm hùm tươi sống với bơ chanh thảo mộc và rau thơm địa phương', tag: "Chef's Special" },
  { icon: <Wine size={20} />, name: 'Luna Sunset Cocktail', desc: 'Pha chế độc quyền từ mít non, nước cốt dừa và vodka hữu cơ', tag: 'Bar Exclusive' },
  { icon: <Flame size={20} />, name: 'Bò Wagyu Nướng Miso', desc: 'Wagyu A5 nhập khẩu, ướp miso Nhật Bản, nướng trên than hoa', tag: 'Land & Sea' },
]

// ─── Thực đơn đầy đủ ──────────────────────────────────────────────────────────
const fullMenu = {
  'Khai Vị': [
    { name: 'Gỏi Cuốn Tôm Hùm', desc: 'Tôm hùm tươi cuộn bánh tráng, rau thơm vườn, chấm mắm me đặc biệt', price: '320.000 ₫', tag: 'Signature' },
    { name: 'Súp Bí Đỏ Cua Hoàng Đế', desc: 'Bí đỏ hầm cùng thịt cua, kem tươi và truffle dầu', price: '280.000 ₫', tag: '' },
    { name: 'Sò Điệp Áp Chảo', desc: 'Sò điệp tươi áp chảo bơ, sốt chanh leo và măng tây xanh', price: '350.000 ₫', tag: "Chef's Pick" },
    { name: 'Foie Gras Gan Ngỗng', desc: 'Gan ngỗng nhập khẩu nướng nhẹ, ăn kèm mứt sung và bánh brioche nướng', price: '480.000 ₫', tag: '' },
    { name: 'Salad Địa Trung Hải', desc: 'Rau xanh hữu cơ, cà chua bi, olive Kalamata, phô mai feta và sốt mật ong mù tạt', price: '220.000 ₫', tag: '' },
  ],
  'Món Chính': [
    { name: 'Tôm Hùm Vịnh Nha Trang', desc: 'Tôm hùm tươi sống nướng hoặc hấp, với bơ chanh thảo mộc và khoai tây nghiền truffles', price: '1.800.000 ₫', tag: "Chef's Special" },
    { name: 'Cá Hồng Hấp Nha Trang', desc: 'Cá hồng tươi đánh bắt hàng ngày, hấp với gừng tươi, sả và nước tương ngon', price: '650.000 ₫', tag: 'Signature' },
    { name: 'Bò Wagyu Nướng Miso', desc: 'Thăn bò Wagyu A5 Nhật Bản ướp miso 48 giờ, nướng than hoa, sốt demi-glace và rau củ mùa', price: '1.200.000 ₫', tag: 'Land & Sea' },
    { name: 'Cá Bass Sốt Thảo Mộc', desc: 'Cá bass biển phi lê áp chảo, sốt beurre blanc chanh, rau củ hầm và khoai tây rosti', price: '520.000 ₫', tag: '' },
    { name: 'Mực Nhồi Thịt Cua', desc: 'Mực ống tươi nhồi thịt cua và nấm truffle, áp chảo dầu ô liu nguyên chất', price: '480.000 ₫', tag: '' },
    { name: 'Vịt Confit Lá Chanh', desc: 'Vịt ủ lạnh 12 giờ với lá chanh và tỏi, áp chảo giòn, kèm lê caramel và khoai lang tím', price: '580.000 ₫', tag: '' },
  ],
  'Tráng Miệng': [
    { name: 'Soufflé Chocolate Đen', desc: 'Soufflé nóng hổi làm từ chocolate Valrhona 70%, kem vanilla Madagascar bên trong', price: '220.000 ₫', tag: 'Must Try' },
    { name: 'Bánh Tart Chanh Dây', desc: 'Vỏ tart bơ giòn, nhân chanh dây nhiệt đới, meringue Ý nướng vàng', price: '195.000 ₫', tag: '' },
    { name: 'Kem Dừa Nha Trang', desc: 'Kem dừa non đặc biệt từ vườn dừa địa phương, dùng trong vỏ dừa tươi', price: '165.000 ₫', tag: 'Local Favourite' },
    { name: 'Mille-Feuille Vani', desc: 'Lớp bánh puff pastry giòn xen kẽ kem vani Tahiti và dâu tây tươi', price: '210.000 ₫', tag: '' },
  ],
  'Đồ Uống': [
    { name: 'Luna Sunset Cocktail', desc: 'Mít non, nước cốt dừa, vodka hữu cơ, soda — pha chế độc quyền của La Mer', price: '220.000 ₫', tag: 'Bar Exclusive' },
    { name: 'Mocktail Biển Xanh', desc: 'Nước cốt dừa, nước chanh, siro bạc hà và soda, không cồn', price: '150.000 ₫', tag: 'Non-Alcoholic' },
    { name: 'Vang Đỏ Pháp (ly)', desc: 'Tuyển chọn từ hầm rượu La Mer — Bordeaux, Burgundy, Côtes du Rhône', price: '320.000 ₫', tag: '' },
    { name: 'Champagne Moët & Chandon', desc: 'Champagne Brut Impérial NV — bọt mịn, vị táo xanh và bánh mì nướng', price: '450.000 ₫', tag: '' },
    { name: 'Trà Thảo Mộc Địa Phương', desc: 'Pha từ thảo mộc vùng cao Đà Lạt — hoa cúc, bạc hà, mật ong rừng', price: '120.000 ₫', tag: '' },
    { name: 'Cà Phê Moka Cầu Đất', desc: 'Cà phê nguyên chất từ vườn Cầu Đất Đà Lạt, pha pour-over hoặc espresso', price: '110.000 ₫', tag: '' },
  ],
}

const categoryIcons = {
  'Khai Vị':     <Utensils size={14} />,
  'Món Chính':   <Flame size={14} />,
  'Tráng Miệng': <Star size={14} />,
  'Đồ Uống':     <Wine size={14} />,
}

// ─── Modal Thực Đơn Đầy Đủ ───────────────────────────────────────────────────
function MenuModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('Khai Vị')
  const categories = Object.keys(fullMenu)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-gray-950 border border-white/10 w-full sm:max-w-2xl sm:rounded-3xl max-h-[92vh] sm:max-h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-fade-in-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10 flex-shrink-0">
          <div>
            <p className="text-luxury-gold text-[9px] tracking-[0.4em] uppercase mb-1">La Mer · Fine Dining</p>
            <h3 className="font-serif text-2xl text-white font-light">Thực Đơn Đầy Đủ</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Đóng thực đơn"
            className="w-9 h-9 bg-white/5 hover:bg-white/15 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-6 pt-4 pb-2 flex-shrink-0 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`flex items-center gap-1.5 flex-shrink-0 px-4 py-2 rounded-full text-[11px] tracking-wider uppercase transition-all duration-200 ${
                activeTab === cat
                  ? 'bg-ocean-700 text-white shadow-lg shadow-ocean-900/50'
                  : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/70 border border-white/10'
              }`}
            >
              {categoryIcons[cat]}
              {cat}
            </button>
          ))}
        </div>

        {/* Danh sách món */}
        <div className="overflow-y-auto flex-1 px-6 py-3 space-y-2">
          {fullMenu[activeTab].map((dish, i) => (
            <div
              key={dish.name}
              className="flex gap-4 p-4 rounded-2xl border border-white/8 hover:border-white/20 hover:bg-white/5 transition-all duration-200"
            >
              {/* Số thứ tự */}
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/25 text-[10px] font-medium mt-0.5">
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Nội dung */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <div className="flex items-center gap-2 flex-wrap min-w-0">
                    <h4 className="text-white text-sm font-medium">{dish.name}</h4>
                    {dish.tag && (
                      <span className="text-[8px] bg-luxury-gold/20 text-luxury-gold px-2 py-0.5 rounded-full tracking-wide flex-shrink-0">
                        {dish.tag}
                      </span>
                    )}
                  </div>
                  <span className="text-ocean-400 text-sm font-medium flex-shrink-0">{dish.price}</span>
                </div>
                <p className="text-white/35 text-xs leading-relaxed">{dish.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 flex-shrink-0 space-y-3">
          <p className="text-white/20 text-[10px] text-center">
            Giá chưa bao gồm thuế VAT (10%) · Vui lòng thông báo dị ứng thực phẩm trước khi gọi món
          </p>
          <a
            href="tel:+84368789135"
            className="flex items-center justify-center gap-2 w-full py-3 bg-ocean-700 hover:bg-ocean-600 text-white text-xs tracking-widest uppercase rounded-xl transition-colors font-medium"
          >
            Đặt Bàn Ngay · +84 368 789 135
          </a>
        </div>
      </div>
    </div>
  )
}

// ─── Dining Section ───────────────────────────────────────────────────────────
export default function Dining() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeItem, setActiveItem] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
            <div className="relative rounded-3xl overflow-hidden h-[500px] shadow-2xl group">
              <img
                src="/images/la-mer.jpg"
                alt="Nhà Hàng La Mer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/35" />
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

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="h-32 rounded-2xl overflow-hidden relative group">
                <img src="/images/Wine_Cellar.jpg" alt="Wine Cellar" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute bottom-3 left-3 text-white text-xs font-light z-10">Wine Cellar</div>
              </div>
              <div className="h-32 rounded-2xl overflow-hidden relative group">
                <img src="/images/HaiSan.jpg" alt="Hải Sản Tươi" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
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
              Nhà hàng La Mer tọa lạc trên tầng thượng nhìn ra toàn cảnh vịnh Nha Trang. Chef Executive Đinh Hữu Nhân — được đào tạo tại Le Cordon Bleu Paris — mang đến những tác phẩm ẩm thực kết hợp tinh tế giữa kỹ thuật Pháp và hương vị địa phương.
            </p>

            {/* Thông tin nhanh */}
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

            {/* Món đặc trưng */}
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

            {/* Nút mở thực đơn */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-3 text-ocean-400 hover:text-white text-xs tracking-[0.3em] uppercase transition-colors group cursor-pointer"
            >
              <span>Xem Thực Đơn Đầy Đủ</span>
              <span className="w-6 h-px bg-ocean-400 group-hover:w-12 group-hover:bg-white transition-all duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal thực đơn */}
      <MenuModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </section>
  )
}
