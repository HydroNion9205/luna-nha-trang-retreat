import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react'


const IconFacebook = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const IconInstagram = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const IconYoutube = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" stroke="currentColor" fill="currentColor" />
  </svg>
)

const footerLinks = {
  'Khách Sạn': ['Giới Thiệu', 'Phòng & Suite', 'Ẩm Thực', 'Trải Nghiệm', 'Hội Nghị & Sự Kiện'],
  'Thông Tin': ['Chính Sách Đặt Phòng', 'Chính Sách Hủy Phòng', 'Điều Khoản Dịch Vụ', 'Bảo Mật Thông Tin', 'Trợ Giúp & FAQ'],
  'Liên Kết': ['Tuyển Dụng', 'Đối Tác Du Lịch', 'Báo Chí & Media', 'Chương Trình Thành Viên'],
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  return (
    <footer className="bg-gray-950 text-white">
      {/* Newsletter Band */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-luxury-gold text-[10px] tracking-[0.4em] uppercase mb-3">Newsletter</p>
              <h3 className="font-serif text-3xl text-white font-light mb-2">
                Đăng Ký Nhận Ưu Đãi
              </h3>
              <p className="text-white/40 text-sm font-light leading-relaxed">
                Nhận ngay ưu đãi độc quyền, tin tức về các gói nghỉ dưỡng mới nhất và lời mời ưu tiên đặc biệt từ Luna.
              </p>
            </div>

            <div>
              {submitted ? (
                <div className="flex items-center gap-3 bg-green-900/30 border border-green-700/50 rounded-xl px-6 py-4">
                  <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check size={16} />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Cảm ơn bạn đã đăng ký!</p>
                    <p className="text-white/50 text-xs mt-0.5">Chúng tôi sẽ gửi ưu đãi đặc biệt đến {email}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-3">
                  <div className="flex-1 relative">
                    <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      id="newsletter-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Địa chỉ email của bạn"
                      required
                      className="w-full bg-white/5 border border-white/15 text-white rounded-xl pl-10 pr-4 py-3.5 text-sm placeholder-white/30 focus:outline-none focus:border-ocean-500 focus:bg-white/10 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-shrink-0 bg-ocean-700 hover:bg-ocean-600 text-white px-6 py-3.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send size={15} />
                    )}
                    <span className="hidden sm:inline">Đăng Ký</span>
                  </button>
                </form>
              )}
              <p className="text-white/20 text-[10px] mt-3 tracking-wide">
                Chúng tôi cam kết không chia sẻ thông tin của bạn với bên thứ ba. Xem{' '}
                <a href="#" className="underline hover:text-white/50 transition-colors">Chính Sách Bảo Mật</a>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="font-serif text-3xl font-light text-white tracking-widest">LUNA</div>
              <div className="text-luxury-gold text-[9px] tracking-[0.4em] uppercase mt-1">Nha Trang Retreat</div>
            </div>

            <p className="text-white/40 text-sm font-light leading-relaxed mb-6">
              Nơi vách đá gặp biển cả, nơi sự sang trọng hòa quyện cùng thiên nhiên hoang sơ của vịnh Nha Trang.
            </p>

            {/* Contact */}
            <div className="space-y-3">
              <a href="tel:+84368789135" className="flex items-center gap-3 text-white/40 hover:text-white text-sm transition-colors group">
                <Phone size={14} className="text-ocean-500 group-hover:text-ocean-400 flex-shrink-0" />
                +84 368 789 135
              </a>
              <a href="mailto:hello@lunanhatrang.vn" className="flex items-center gap-3 text-white/40 hover:text-white text-sm transition-colors group">
                <Mail size={14} className="text-ocean-500 group-hover:text-ocean-400 flex-shrink-0" />
                hello@lunanhatrang.vn
              </a>
              <div className="flex items-start gap-3 text-white/40 text-sm">
                <MapPin size={14} className="text-ocean-500 mt-0.5 flex-shrink-0" />
                <span>Đường Trần Phú, Vĩnh Nguyên,<br />Nha Trang, Khánh Hòa 650000</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              {[
                { icon: <IconInstagram size={16} />, label: 'Instagram', href: '#' },
                { icon: <IconFacebook size={16} />, label: 'Facebook', href: '#' },
                { icon: <IconYoutube size={16} />, label: 'YouTube', href: '#' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-white/40 hover:bg-ocean-700 hover:border-ocean-600 hover:text-white transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white text-xs tracking-[0.3em] uppercase font-medium mb-5">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white/35 hover:text-white text-sm transition-colors font-light">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/25 text-xs tracking-wide">
              © {new Date().getFullYear()} Luna Nha Trang Retreat | all rights reserved
            </p>
            <div className="flex items-center gap-6">
              {['Bảo Mật', 'Điều Khoản', 'Cookie'].map((item) => (
                <a key={item} href="#" className="text-white/25 hover:text-white/50 text-xs transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
