import { useState } from 'react'
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



// ─── Book Modal ────────────────────────────────────────────────────────────────
function BookModal({ room, searchParams, onClose, onConfirm }) {
  const nights = calcNights(searchParams.checkIn, searchParams.checkOut)
  const total = room.price * nights
  const [confirming, setConfirming] = useState(false)
  const [done, setDone] = useState(false)

  const handleConfirm = () => {
    setConfirming(true)
    setTimeout(() => {
      onConfirm({
        roomId: room.id,
        roomName: room.name,
        roomType: room.type,
        checkIn: searchParams.checkIn,
        checkOut: searchParams.checkOut,
        guests: searchParams.guests,
        pricePerNight: room.price,
        nights,
        total,
      })
      setConfirming(false)
      setDone(true)
    }, 1000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {done ? (
          <div className="p-10 text-center">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h3 className="font-serif text-2xl text-gray-900 mb-2">Đặt Phòng Thành Công!</h3>
            <p className="text-gray-400 text-sm mb-6">Xác nhận đặt phòng đã được ghi lại. Kiểm tra mục "Quản lý đặt phòng" để xem chi tiết.</p>
            <button
              onClick={onClose}
              className="w-full py-3 bg-ocean-800 text-white text-xs tracking-[0.3em] uppercase rounded-xl hover:bg-ocean-900 transition-colors"
            >
              Đóng
            </button>
          </div>
        ) : (
          <>
            {/* Room preview */}
            <div className="h-40 relative">
              <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
              <button onClick={onClose} className="absolute top-3 right-3 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center">
                <X size={14} />
              </button>
              <div className="absolute bottom-3 left-4 text-white">
                <p className="text-[9px] tracking-widest uppercase text-white/60">Đặt phòng</p>
                <p className="font-serif text-xl">{room.name}</p>
              </div>
            </div>

            <div className="p-6">
              {/* Summary */}
              <div className="grid grid-cols-2 gap-3 mb-5 p-4 bg-sand-50 rounded-xl text-sm">
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

              {/* Price */}
              <div className="flex items-center justify-between mb-5 pb-5 border-b border-sand-100">
                <div>
                  <p className="text-xs text-gray-400">{room.price.toLocaleString('vi-VN')}₫ × {nights} đêm</p>
                </div>
                <div className="text-right">
                  <p className="font-serif text-2xl text-ocean-800">{total.toLocaleString('vi-VN')}₫</p>
                  <p className="text-[10px] text-gray-400">Tổng cộng (chưa thuế)</p>
                </div>
              </div>

              {/* Cancellation note */}
              <div className="flex items-start gap-2 mb-5 p-3 bg-blue-50 rounded-lg">
                <AlertCircle size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-700">Huỷ miễn phí trong 48 giờ sau khi đặt. Sau đó áp dụng phí huỷ 1 đêm.</p>
              </div>

              <button
                onClick={handleConfirm}
                disabled={confirming}
                className="w-full py-4 bg-ocean-800 text-white text-xs tracking-[0.3em] uppercase font-medium rounded-xl hover:bg-ocean-900 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {confirming ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <><Check size={14} /> Xác Nhận Đặt Phòng</>
                )}
              </button>
            </div>
          </>
        )}
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
  { label: '1 Người lớn', value: 1 },
  { label: '2 Người lớn', value: 2 },
  { label: '2 Người lớn, 1 Trẻ em', value: 3 },
  { label: '2 Người lớn, 2 Trẻ em', value: 4 },
  { label: '3 Người lớn', value: 5 },
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
  const { searchParams, navigateHome, addBooking, navigateToSearch } = useBooking()
  const [bookingRoom, setBookingRoom] = useState(null)
  const [justBooked, setJustBooked] = useState(null)
  const [localParams, setLocalParams] = useState(searchParams)

  if (!localParams) return null

  const nights = calcNights(localParams.checkIn, localParams.checkOut)

  const handleBook = (room) => setBookingRoom(room)

  const handleConfirm = (bookingData) => {
    const newBooking = addBooking(bookingData)
    setJustBooked(newBooking)
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
                <p className="text-gray-400 text-xs mt-0.5">{rooms.length} phòng khả dụng cho kỳ lưu trú của bạn</p>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-gray-400 uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                Còn phòng
              </div>
            </div>

            {/* Rooms grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {rooms.map((room) => (
                <RoomResultCard
                  key={room.id}
                  room={room}
                  searchParams={localParams}
                  nights={nights}
                  onBook={handleBook}
                />
              ))}
            </div>

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
        />
      )}
    </div>
  )
}
