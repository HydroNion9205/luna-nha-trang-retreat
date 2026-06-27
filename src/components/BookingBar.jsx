import { useState } from 'react'
import { Calendar, Users, ChevronDown, Search } from 'lucide-react'
import { useBooking } from '../context/BookingContext'

const guestOptions = [
  { label: '1 Người', value: 1 },
  { label: '2 Người', value: 2 },
]

export default function BookingBar() {
  const today = new Date().toISOString().split('T')[0]
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]

  const [checkIn, setCheckIn] = useState(today)
  const [checkOut, setCheckOut] = useState(tomorrow)
  const [guests, setGuests] = useState(2)
  const [guestOpen, setGuestOpen] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const { navigateToSearch } = useBooking()

  const handleSearch = () => {
    setIsSearching(true)
    const guestLabel = guestOptions.find(g => g.value === guests)?.label || ''
    const nights = Math.max(1, Math.ceil((new Date(checkOut) - new Date(checkIn)) / 86400000))
    setTimeout(() => {
      setIsSearching(false)
      navigateToSearch({ checkIn, checkOut, guests, guestLabel, nights })
    }, 700)
  }

  return (
    <section 
      id="booking-section" 
      className="scroll-mt-24 py-20 md:py-24 bg-gradient-to-b from-white via-sand-50/25 to-white border-y border-sand-100/40 relative"
    >
      {/* Invisible anchor for backward compatibility with old '#booking' links */}
      <div id="booking" className="absolute -top-24" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Label */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-10 h-px bg-sand-300" />
          <span className="text-gray-400 text-[10px] tracking-[0.4em] uppercase font-light">Tìm Kiếm Phòng Trống</span>
          <div className="w-10 h-px bg-sand-300" />
        </div>

        {/* Premium search card */}
        <div className="bg-white border border-sand-200/80 rounded-2xl shadow-[0_15px_45px_-15px_rgba(0,0,0,0.06)] p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

            {/* Check-in */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="check-in"
                className="flex items-center gap-2 text-gray-400 text-[10px] tracking-widest uppercase font-light">
                <Calendar size={11} className="text-ocean-500" />
                Nhận Phòng
              </label>
              <input
                id="check-in"
                type="date"
                value={checkIn}
                min={today}
                onChange={(e) => {
                  setCheckIn(e.target.value)
                  if (e.target.value >= checkOut) {
                    const next = new Date(new Date(e.target.value).getTime() + 86400000)
                    setCheckOut(next.toISOString().split('T')[0])
                  }
                }}
                className="border border-sand-200 text-gray-700 rounded-xl px-4 py-3 text-sm
                           focus:outline-none focus:border-ocean-400 focus:ring-1 focus:ring-ocean-200
                           transition-all cursor-pointer hover:border-sand-400 bg-white"
              />
            </div>

            {/* Check-out */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="check-out"
                className="flex items-center gap-2 text-gray-400 text-[10px] tracking-widest uppercase font-light">
                <Calendar size={11} className="text-ocean-500" />
                Trả Phòng
              </label>
              <input
                id="check-out"
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                className="border border-sand-200 text-gray-700 rounded-xl px-4 py-3 text-sm
                           focus:outline-none focus:border-ocean-400 focus:ring-1 focus:ring-ocean-200
                           transition-all cursor-pointer hover:border-sand-400 bg-white"
              />
            </div>

            {/* Guests */}
            <div className="flex flex-col gap-1.5 relative">
              <label className="flex items-center gap-2 text-gray-400 text-[10px] tracking-widest uppercase font-light">
                <Users size={11} className="text-ocean-500" />
                Số Khách
              </label>
              <button
                id="guest-selector"
                onClick={() => setGuestOpen(!guestOpen)}
                className="border border-sand-200 text-gray-700 rounded-xl px-4 py-3 text-sm text-left
                           flex items-center justify-between hover:border-sand-400 transition-all bg-white"
              >
                <span>{guestOptions.find(g => g.value === guests)?.label}</span>
                <ChevronDown size={14} className={`text-gray-400 transition-transform ${guestOpen ? 'rotate-180' : ''}`} />
              </button>
              {guestOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-2xl
                                border border-sand-100 overflow-hidden z-30">
                  {guestOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setGuests(opt.value); setGuestOpen(false) }}
                      className={`w-full px-4 py-3 text-sm text-left transition-colors hover:bg-ocean-50
                        ${guests === opt.value ? 'text-ocean-700 bg-ocean-50 font-medium' : 'text-gray-700'}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search button — aligned to bottom */}
            <div className="flex flex-col justify-end">
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="bg-ocean-800 hover:bg-ocean-900 text-white rounded-xl px-6 py-3 text-sm
                           font-medium tracking-wider uppercase flex items-center justify-center gap-2
                           transition-all duration-300 hover:shadow-lg
                           disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSearching ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Đang tìm...
                  </>
                ) : (
                  <>
                    <Search size={15} />
                    Tìm Phòng
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Info row */}
          <div className="mt-6 flex flex-wrap justify-center gap-6 border-t border-sand-100 pt-5">
            {[
              '✦ Huỷ miễn phí trong 48 giờ',
              '✦ Không phụ thu đặt phòng',
              '✦ Giá tốt nhất được đảm bảo',
            ].map((item) => (
              <span key={item} className="text-gray-400 text-[10px] tracking-wider font-light">{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
