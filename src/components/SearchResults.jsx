import { useState, useEffect } from 'react'
import {
  ArrowLeft, Calendar, Users, Maximize2, Eye, Wifi, Coffee,
  Waves, Star, Check, X, Clock, ChevronDown, AlertCircle,
  Search, BookOpen, CheckCircle, XCircle, Filter,
} from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { rooms } from './RoomCard'

// ─── helpers ───────────────────────────────────────────────────────────────────
const fmt = (dateStr) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

const calcNights = (checkIn, checkOut) =>
  Math.max(1, Math.ceil((new Date(checkOut) - new Date(checkIn)) / 86400000))



// ─── Book Modal — 3-step flow ──────────────────────────────────────────────────
function BookModal({ room, searchParams, onClose, onConfirm, bookings, checkConflict }) {
  const nights  = calcNights(searchParams.checkIn, searchParams.checkOut)
  const total   = room.price * nights
  const [step, setStep] = useState(1)          // 1 | 2 | 3
  const [loading, setLoading]   = useState(false)
  const [bookingCode, setBookingCode] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', note: '' })
  const [errors, setErrors] = useState({})

  // Validate bước 2
  const validate = () => {
    const e = {}
    if (!form.name.trim())  e.name  = 'Vui lòng nhập họ tên'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email không hợp lệ'
    if (!form.phone.trim() || !/^[0-9]{9,11}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Số điện thoại không hợp lệ'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const [conflictError, setConflictError] = useState(null)

  const handleStep2Next = () => {
    if (!validate()) return
    // Kiểm tra xung đột lịch trước khi qua bước 3
    const conflict = checkConflict(room.id, searchParams.checkIn, searchParams.checkOut, bookings)
    if (conflict) {
      setConflictError(conflict)
      return
    }
    setConflictError(null)
    setStep(3)
  }

  // Trigger API call khi bước chuyển sang 3
  useEffect(() => {
    if (step === 3 && !bookingCode) handleConfirm()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  const handleConfirm = () => {
    setLoading(true)
    setTimeout(() => {
      const booking = onConfirm({
        roomId: room.id, roomName: room.name,
        checkIn: searchParams.checkIn, checkOut: searchParams.checkOut,
        guests: searchParams.guests,
        pricePerNight: room.price, nights, total,
        guestName: form.name, guestEmail: form.email,
        guestPhone: form.phone, note: form.note,
      })
      setBookingCode(booking?.id || `LNA-${Date.now()}`)
      setLoading(false)
    }, 1200)
  }

  // Khi có bookingCode → chuyển sang bước 3
  if (bookingCode && step !== 3) setStep(3)

  // ── Step labels ────────────────────────────────────────────────────────────
  const steps = ['Tìm kiếm', 'Điền thông tin', 'Xác nhận']

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={step === 3 && bookingCode ? onClose : undefined}>
      <div
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* ── Header với ảnh phòng ── */}
        <div className="h-36 relative flex-shrink-0">
          <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
          <button onClick={onClose} className="absolute top-3 right-3 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
            <X size={14} />
          </button>
          <div className="absolute bottom-3 left-4 text-white">
            <p className="text-[9px] tracking-widest uppercase text-white/60">Luna Nha Trang Retreat</p>
            <p className="font-serif text-lg">{room.name}</p>
          </div>
        </div>

        {/* ── Thanh tiến trình 3 bước ── */}
        <div className="px-6 pt-5 pb-4 flex-shrink-0">
          <div className="flex items-center">
            {steps.map((label, i) => {
              const num = i + 1
              const active  = step === num
              const done    = step > num
              return (
                <div key={label} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300
                      ${done  ? 'bg-ocean-800 text-white' : active ? 'bg-luxury-gold text-white' : 'bg-sand-100 text-gray-400'}`}>
                      {done ? <Check size={12} /> : num}
                    </div>
                    <span className={`mt-1 text-[9px] tracking-wide uppercase whitespace-nowrap
                      ${active ? 'text-luxury-gold font-medium' : done ? 'text-ocean-800' : 'text-gray-300'}`}>
                      {label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`h-px flex-1 mx-2 mb-4 transition-all duration-300 ${step > num ? 'bg-ocean-800' : 'bg-sand-200'}`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Nội dung cuộn được ── */}
        <div className="overflow-y-auto flex-1 px-6 pb-6">

          {/* ━━━━ BƯỚC 1: Tóm tắt đặt phòng ━━━━ */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-gray-900 font-light">Xác nhận thông tin phòng</h3>

              {/* Chi tiết ngày & khách */}
              <div className="grid grid-cols-2 gap-3 p-4 bg-sand-50 rounded-xl text-sm">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">Nhận phòng</p>
                  <p className="font-medium text-gray-800">{fmt(searchParams.checkIn)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">Trả phòng</p>
                  <p className="font-medium text-gray-800">{fmt(searchParams.checkOut)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">Số đêm</p>
                  <p className="font-medium text-gray-800">{nights} đêm</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">Số khách</p>
                  <p className="font-medium text-gray-800">{searchParams.guestLabel}</p>
                </div>
              </div>

              {/* Tổng tiền */}
              <div className="flex items-center justify-between p-4 border border-sand-200 rounded-xl">
                <div>
                  <p className="text-sm text-gray-500">{room.price.toLocaleString('vi-VN')}₫ × {nights} đêm</p>
                  <p className="text-[10px] text-gray-400">Chưa bao gồm thuế & phí</p>
                </div>
                <div className="text-right">
                  <p className="font-serif text-2xl text-ocean-800">{total.toLocaleString('vi-VN')}₫</p>
                  <p className="text-[10px] text-gray-400">Tổng cộng</p>
                </div>
              </div>

              {/* Chính sách hủy */}
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-xl">
                <AlertCircle size={14} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-600">Hủy miễn phí trong 48 giờ sau khi đặt. Sau đó áp dụng phí hủy 1 đêm.</p>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3.5 bg-ocean-800 text-white text-xs tracking-[0.3em] uppercase font-medium rounded-xl hover:bg-ocean-900 transition-colors flex items-center justify-center gap-2"
              >
                Tiếp tục — Điền thông tin →
              </button>
            </div>
          )}

          {/* ━━━━ BƯỚC 2: Form thông tin khách hàng ━━━━ */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-gray-900 font-light">Thông tin khách hàng</h3>

              {/* Họ & tên */}
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-1.5">Họ và tên <span className="text-red-400">*</span></label>
                <input
                  type="text" value={form.name} placeholder="Nguyễn Văn A"
                  onChange={e => { setForm(f => ({...f, name: e.target.value})); setErrors(er => ({...er, name: ''})) }}
                  className={`w-full px-4 py-3 border rounded-xl text-sm text-gray-800 outline-none transition-colors
                    ${errors.name ? 'border-red-300 bg-red-50' : 'border-sand-200 focus:border-ocean-700 bg-white'}`}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-1.5">Email <span className="text-red-400">*</span></label>
                <input
                  type="email" value={form.email} placeholder="email@example.com"
                  onChange={e => { setForm(f => ({...f, email: e.target.value})); setErrors(er => ({...er, email: ''})) }}
                  className={`w-full px-4 py-3 border rounded-xl text-sm text-gray-800 outline-none transition-colors
                    ${errors.email ? 'border-red-300 bg-red-50' : 'border-sand-200 focus:border-ocean-700 bg-white'}`}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Số điện thoại */}
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-1.5">Số điện thoại <span className="text-red-400">*</span></label>
                <input
                  type="tel" value={form.phone} placeholder="0901234567"
                  onChange={e => { setForm(f => ({...f, phone: e.target.value})); setErrors(er => ({...er, phone: ''})) }}
                  className={`w-full px-4 py-3 border rounded-xl text-sm text-gray-800 outline-none transition-colors
                    ${errors.phone ? 'border-red-300 bg-red-50' : 'border-sand-200 focus:border-ocean-700 bg-white'}`}
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Yêu cầu đặc biệt */}
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-1.5">Yêu cầu đặc biệt <span className="text-gray-300">(tùy chọn)</span></label>
                <textarea
                  rows={3} value={form.note} placeholder="Phòng tầng cao, giường đôi, hoa tươi chào đón, v.v."
                  onChange={e => setForm(f => ({...f, note: e.target.value}))}
                  className="w-full px-4 py-3 border border-sand-200 focus:border-ocean-700 rounded-xl text-sm text-gray-800 outline-none resize-none transition-colors"
                />
              </div>

              {/* ── Thông báo xung đột lịch ── */}
              {conflictError && (
                <div className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-xl">
                  <AlertCircle size={16} className="text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-orange-700 mb-0.5">Phòng đã được đặt trong khoảng thời gian này</p>
                    <p className="text-xs text-orange-600">
                      Đặt phòng <span className="font-semibold">{conflictError.id}</span> đang chiếm phòng từ{' '}
                      <span className="font-semibold">{fmt(conflictError.checkIn)}</span> đến{' '}
                      <span className="font-semibold">{fmt(conflictError.checkOut)}</span>.
                      Vui lòng chọn ngày khác hoặc hủy đặt phòng hiện tại.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3.5 border border-sand-200 text-gray-500 text-xs tracking-[0.2em] uppercase rounded-xl hover:border-gray-300 transition-colors"
                >
                  ← Quay lại
                </button>
                <button
                  onClick={handleStep2Next}
                  className="flex-[2] py-3.5 bg-ocean-800 text-white text-xs tracking-[0.3em] uppercase font-medium rounded-xl hover:bg-ocean-900 transition-colors"
                >
                  Xác nhận đặt phòng →
                </button>
              </div>
            </div>
          )}

          {/* ━━━━ BƯỚC 3: Xác nhận thành công ━━━━ */}
          {step === 3 && (
            <div className="text-center py-4">
              {!bookingCode ? (
                /* Loading */
                <div className="flex flex-col items-center gap-4 py-8">
                  <div className="w-12 h-12 border-2 border-sand-200 border-t-ocean-800 rounded-full animate-spin" />
                  <p className="text-gray-400 text-sm">Đang xử lý đặt phòng của bạn...</p>
                </div>
              ) : (
                /* Thành công */
                <>
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className="font-serif text-2xl text-gray-900 font-light mb-1">Đặt Phòng Thành Công!</h3>
                  <p className="text-gray-400 text-sm mb-6">Cảm ơn {form.name}. Chúng tôi sẽ liên hệ qua {form.email} để xác nhận.</p>

                  {/* Mã đặt phòng nổi bật */}
                  <div className="bg-sand-50 border border-sand-200 rounded-2xl p-5 mb-5 text-left">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-2 text-center">Mã đặt phòng của bạn</p>
                    <p className="font-mono text-2xl font-bold text-ocean-800 tracking-widest text-center mb-4">{bookingCode}</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Hạng phòng</span>
                        <span className="text-gray-800 font-medium">{room.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Nhận phòng</span>
                        <span className="text-gray-800">{fmt(searchParams.checkIn)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Trả phòng</span>
                        <span className="text-gray-800">{fmt(searchParams.checkOut)}</span>
                      </div>
                      <div className="flex justify-between border-t border-sand-200 pt-2 mt-2">
                        <span className="text-gray-500 font-medium">Tổng thanh toán</span>
                        <span className="text-ocean-800 font-serif text-lg">{total.toLocaleString('vi-VN')}₫</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 mb-5">Vui lòng lưu lại mã đặt phòng để kiểm tra lịch sử tại mục Quản lý đặt phòng.</p>

                  <button
                    onClick={onClose}
                    className="w-full py-3.5 bg-ocean-800 text-white text-xs tracking-[0.3em] uppercase rounded-xl hover:bg-ocean-900 transition-colors"
                  >
                    Hoàn tất — Xem danh sách đặt phòng
                  </button>
                </>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Room Result Card ──────────────────────────────────────────────────────────
function RoomResultCard({ room, searchParams, nights, onBook }) {
  const [hovered, setHovered] = useState(false)
  const total = room.price * nights

  return (
    <div
      className="bg-white border border-sand-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Illustration */}
      <div className="h-44 relative overflow-hidden">
        <img src={room.image} alt={room.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${hovered ? 'opacity-0' : 'opacity-100'}`} />
        <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] tracking-widest uppercase font-medium ${room.badgeColor}`}>
          {room.badge}
        </div>
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] text-gray-600 font-medium">
          Còn phòng
        </div>
      </div>

      <div className="p-5">
        {/* Meta */}
        <div className="flex gap-4 mb-2 text-[10px] tracking-widest uppercase text-gray-400">
          <span className="flex items-center gap-1"><Maximize2 size={9} />{room.size}m²</span>
          <span className="flex items-center gap-1"><Users size={9} />{room.maxGuests} khách</span>
          <span className="flex items-center gap-1"><Eye size={9} />{room.views}</span>
        </div>

        <h3 className="font-serif text-xl text-gray-900 font-light mb-1">{room.name}</h3>
        <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-4">{room.description}</p>

        {/* Amenities mini */}
        <div className="flex gap-2 mb-4">
          {[<Wifi size={12} />, <Coffee size={12} />, <Waves size={12} />, <Star size={12} />].map((icon, i) => (
            <span key={i} className="w-7 h-7 bg-sand-50 rounded-full flex items-center justify-center text-gray-400">
              {icon}
            </span>
          ))}
        </div>

        {/* Price + book */}
        <div className="flex items-end justify-between pt-4 border-t border-sand-100">
          <div>
            <div className="font-serif text-2xl text-ocean-800 font-light">{total.toLocaleString('vi-VN')}₫</div>
            <div className="text-[10px] text-gray-400">{room.price.toLocaleString('vi-VN')}₫/đêm · {nights} đêm</div>
          </div>
          <button
            onClick={() => onBook(room)}
            className="px-5 py-2.5 bg-ocean-800 text-white text-xs tracking-widest uppercase rounded-xl hover:bg-ocean-900 transition-colors"
          >
            Đặt Ngay
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Booking Management ────────────────────────────────────────────────────────
export function BookingManagement () {
  const { bookings, cancelBooking } = useBooking()
  const [activeTab, setActiveTab] = useState('active') // 'active' | 'history'
  const [cancelConfirm, setCancelConfirm] = useState(null)

  const active = bookings.filter((b) => b.status === 'active')
  const history = bookings.filter((b) => b.status === 'cancelled')
  const displayed = activeTab === 'active' ? active : history

  const handleCancel = (id) => {
    cancelBooking(id)
    setCancelConfirm(null)
  }

  return (
    <div className="bg-white border border-sand-100 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-sand-100">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen size={16} className="text-ocean-700" />
          <h2 className="font-serif text-xl text-gray-900 font-light">Quản Lý Đặt Phòng</h2>
        </div>
        <p className="text-gray-400 text-xs">Theo dõi và quản lý các đặt phòng của bạn</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-sand-100">
        {[
          { key: 'active', label: 'Đang đặt', count: active.length },
          { key: 'history', label: 'Lịch sử', count: history.length },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-3.5 text-xs tracking-widest uppercase transition-colors flex items-center justify-center gap-2 ${
              activeTab === tab.key
                ? 'text-ocean-800 border-b-2 border-ocean-800 font-medium'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center ${
                activeTab === tab.key ? 'bg-ocean-100 text-ocean-800' : 'bg-gray-100 text-gray-500'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Booking list */}
      <div className="p-4 max-h-[520px] overflow-y-auto space-y-3">
        {displayed.length === 0 ? (
          <div className="text-center py-10">
            <div className="w-12 h-12 bg-sand-50 rounded-full flex items-center justify-center mx-auto mb-3">
              {activeTab === 'active' ? <Calendar size={20} className="text-gray-300" /> : <Clock size={20} className="text-gray-300" />}
            </div>
            <p className="text-gray-400 text-sm">
              {activeTab === 'active' ? 'Chưa có đặt phòng nào đang hoạt động' : 'Chưa có lịch sử đặt phòng'}
            </p>
          </div>
        ) : (
          displayed.map((booking) => {
            const nights = calcNights(booking.checkIn, booking.checkOut)
            const isActive = booking.status === 'active'
            return (
              <div
                key={booking.id}
                className={`rounded-xl border p-4 transition-all ${
                  isActive ? 'border-ocean-100 bg-ocean-50/30' : 'border-sand-100 bg-sand-50/30'
                }`}
              >
                {/* Booking header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{booking.roomName}</p>
                    <p className="text-[10px] text-gray-400 tracking-wide mt-0.5">#{booking.id}</p>
                  </div>
                  <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] uppercase tracking-widest font-medium ${
                    isActive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
                  }`}>
                    {isActive ? <><CheckCircle size={9} />Đang đặt</> : <><XCircle size={9} />Đã huỷ</>}
                  </span>
                </div>

                {/* Booking details */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-3">
                  {[
                    { label: 'Nhận phòng', val: fmt(booking.checkIn) },
                    { label: 'Trả phòng', val: fmt(booking.checkOut) },
                    { label: 'Số đêm', val: `${nights} đêm` },
                    { label: 'Tổng tiền', val: `${(booking.total || booking.pricePerNight * nights).toLocaleString('vi-VN')}₫` },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-[9px] text-gray-400 uppercase tracking-wide">{item.label}</p>
                      <p className="text-xs font-medium text-gray-700 mt-0.5">{item.val}</p>
                    </div>
                  ))}
                </div>

                {/* Cancel button */}
                {isActive && (
                  cancelConfirm === booking.id ? (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleCancel(booking.id)}
                        className="flex-1 py-2 bg-red-600 text-white text-[10px] tracking-widest uppercase rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Xác nhận huỷ
                      </button>
                      <button
                        onClick={() => setCancelConfirm(null)}
                        className="flex-1 py-2 bg-gray-100 text-gray-600 text-[10px] tracking-widest uppercase rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Giữ lại
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setCancelConfirm(booking.id)}
                      className="w-full mt-2 py-2 border border-red-200 text-red-500 text-[10px] tracking-widest uppercase rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <X size={11} /> Huỷ Phòng
                    </button>
                  )
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

// ─── Search Bar (in results page) ─────────────────────────────────────────────
const guestOptions = [
  { label: '1 Người', value: 1 },
  { label: '2 Người', value: 2 },
]

function ModifySearch({ searchParams, onModify }) {
  const [checkIn, setCheckIn] = useState(searchParams.checkIn)
  const [checkOut, setCheckOut] = useState(searchParams.checkOut)
  const [guests, setGuests] = useState(searchParams.guests)
  const [guestOpen, setGuestOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const today = new Date().toISOString().split('T')[0]
  const nights = calcNights(checkIn, checkOut)

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-ocean-700 text-xs tracking-widest uppercase hover:text-ocean-900 transition-colors border border-ocean-200 px-4 py-2 rounded-xl hover:bg-ocean-50"
      >
        <Filter size={13} /> Điều chỉnh tìm kiếm
      </button>
    )
  }

  return (
    <div className="bg-white border border-sand-200 rounded-2xl p-5 shadow-sm">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div>
          <label className="text-[10px] text-gray-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><Calendar size={10}/>Nhận phòng</label>
          <input type="date" value={checkIn} min={today}
            onChange={(e) => { setCheckIn(e.target.value); if (e.target.value >= checkOut) setCheckOut(new Date(new Date(e.target.value).getTime() + 86400000).toISOString().split('T')[0]) }}
            className="w-full border border-sand-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-ocean-400 transition-colors"
          />
        </div>
        <div>
          <label className="text-[10px] text-gray-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><Calendar size={10}/>Trả phòng</label>
          <input type="date" value={checkOut} min={checkIn}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full border border-sand-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-ocean-400 transition-colors"
          />
        </div>
        <div className="relative">
          <label className="text-[10px] text-gray-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><Users size={10}/>Số khách</label>
          <button onClick={() => setGuestOpen(!guestOpen)}
            className="w-full border border-sand-200 rounded-lg px-3 py-2 text-sm text-gray-700 text-left flex items-center justify-between hover:border-ocean-400 transition-colors"
          >
            <span>{guestOptions.find(g => g.value === guests)?.label}</span>
            <ChevronDown size={12} className={`transition-transform ${guestOpen ? 'rotate-180' : ''}`}/>
          </button>
          {guestOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-sand-100 z-20 overflow-hidden">
              {guestOptions.map(opt => (
                <button key={opt.value} onClick={() => { setGuests(opt.value); setGuestOpen(false) }}
                  className={`w-full px-3 py-2.5 text-sm text-left hover:bg-ocean-50 transition-colors ${guests === opt.value ? 'text-ocean-700 bg-ocean-50 font-medium' : 'text-gray-700'}`}
                >{opt.label}</button>
              ))}
            </div>
          )}
        </div>
        <div>
          <label className="text-[10px] text-gray-400 uppercase tracking-widest mb-1.5 block">&nbsp;</label>
          <button
            onClick={() => { onModify({ checkIn, checkOut, guests, guestLabel: guestOptions.find(g => g.value === guests)?.label, nights }); setOpen(false) }}
            className="w-full py-2 bg-ocean-800 text-white text-xs tracking-widest uppercase rounded-lg hover:bg-ocean-900 transition-colors flex items-center justify-center gap-2"
          >
            <Search size={12}/> Cập nhật ({nights} đêm)
          </button>
        </div>
      </div>
      <button onClick={() => setOpen(false)} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Thu gọn ↑</button>
    </div>
  )
}

// ─── Main SearchResults Page ───────────────────────────────────────────────────
export default function SearchResults() {
  const { searchParams, navigateHome, addBooking, navigateToSearch, bookings, checkConflict } = useBooking()
  const [bookingRoom, setBookingRoom] = useState(null)
  const [justBooked, setJustBooked] = useState(null)
  const [localParams, setLocalParams] = useState(searchParams)

  if (!localParams) return null

  const nights = calcNights(localParams.checkIn, localParams.checkOut)

  // Lọc phòng: chỉ hiển thị phòng có maxGuests >= số khách đã chọn
  const filteredRooms = rooms.filter(room => room.maxGuests >= localParams.guests)

  const handleBook = (room) => setBookingRoom(room)

  const handleConfirm = (bookingData) => {
    // Bảo vệ lần cuối ở server-side: kiểm tra lại xung đột
    const conflict = checkConflict(bookingData.roomId, bookingData.checkIn, bookingData.checkOut, bookings)
    if (conflict) return null   // BookModal đã hiển thị lỗi ở bước 2 rồi
    const newBooking = addBooking(bookingData)
    setJustBooked(newBooking)
    return newBooking
  }

  const handleModalClose = () => {
    setBookingRoom(null)
    if (justBooked) setJustBooked(null)
  }

  const handleModify = (newParams) => {
    const guestLabel = guestOptions.find(g => g.value === newParams.guests)?.label || ''
    setLocalParams({ ...newParams, guestLabel })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-sand-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <button
            onClick={navigateHome}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline text-xs tracking-widest uppercase">Trang Chủ</span>
          </button>

          <div className="text-center">
            <span className="font-serif text-xl text-ocean-900 tracking-widest">LUNA</span>
            <span className="text-luxury-gold text-[9px] tracking-widest uppercase ml-2 hidden sm:inline">Tìm Phòng</span>
          </div>

          {/* Quick summary */}
          <div className="hidden md:flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} className="text-ocean-500" />
              {fmt(localParams.checkIn)} → {fmt(localParams.checkOut)}
            </span>
            <span className="flex items-center gap-1.5">
              <Users size={12} className="text-ocean-500" />
              {localParams.guestLabel}
            </span>
            <span className="text-ocean-600 font-medium">{nights} đêm</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Modify search */}
        <div className="mb-6">
          <ModifySearch searchParams={localParams} onModify={handleModify} />
        </div>

        {/* Mobile summary */}
        <div className="flex md:hidden flex-wrap gap-3 mb-6">
          {[
            { icon: <Calendar size={11}/>, val: `${fmt(localParams.checkIn)} → ${fmt(localParams.checkOut)}` },
            { icon: <Users size={11}/>, val: localParams.guestLabel },
            { icon: <Clock size={11}/>, val: `${nights} đêm` },
          ].map((item, i) => (
            <span key={i} className="flex items-center gap-1.5 text-xs text-gray-500 bg-white border border-sand-100 px-3 py-1.5 rounded-full">
              <span className="text-ocean-500">{item.icon}</span> {item.val}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Room results */}
          <div className="lg:col-span-2">
            {/* Results header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h1 className="font-serif text-2xl text-gray-900 font-light">Phòng Trống</h1>
                <p className="text-gray-400 text-xs mt-0.5">
                  {filteredRooms.length > 0
                    ? `${filteredRooms.length} phòng phù hợp cho ${localParams.guests} khách`
                    : 'Không có phòng phù hợp với lựa chọn của bạn'}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-gray-400 uppercase tracking-widest">
                <div className={`w-2 h-2 rounded-full ${filteredRooms.length > 0 ? 'bg-green-400' : 'bg-red-400'}`} />
                {filteredRooms.length > 0 ? 'Còn phòng' : 'Hết phòng'}
              </div>
            </div>

            {/* Rooms grid */}
            {filteredRooms.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {filteredRooms.map((room) => (
                  <RoomResultCard
                    key={room.id}
                    room={room}
                    searchParams={localParams}
                    nights={nights}
                    onBook={handleBook}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center bg-white border border-sand-100 rounded-2xl">
                <div className="w-14 h-14 bg-sand-50 rounded-full flex items-center justify-center mb-4">
                  <Users size={24} className="text-gray-300" />
                </div>
                <p className="text-gray-500 font-medium mb-1">Không tìm thấy phòng phù hợp</p>
                <p className="text-gray-400 text-sm">Không có phòng nào sức chứa {localParams.guests} khách.<br/>Vui lòng điều chỉnh số khách để xem thêm lựa chọn.</p>
              </div>
            )}

            {/* Inclusions */}
            <div className="mt-8 p-5 bg-white border border-sand-100 rounded-2xl">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-3">Bao gồm trong mọi đặt phòng</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { icon: <Wifi size={13}/>, text: 'Wi-Fi tốc độ cao' },
                  { icon: <Coffee size={13}/>, text: 'Bữa sáng buffet' },
                  { icon: <Waves size={13}/>, text: 'Hồ bơi & Spa' },
                  { icon: <Star size={13}/>, text: 'Butler 24/7' },
                  { icon: <Check size={13}/>, text: 'Huỷ miễn phí 48h' },
                  { icon: <Check size={13}/>, text: 'Giá tốt nhất' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="text-ocean-500 flex-shrink-0">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Booking management */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingManagement />
            </div>
          </div>
        </div>
      </div>

      {/* Book modal */}
      {bookingRoom && (
        <BookModal
          room={bookingRoom}
          searchParams={localParams}
          onClose={handleModalClose}
          onConfirm={handleConfirm}
          bookings={bookings}
          checkConflict={checkConflict}
        />
      )}
    </div>
  )
}
