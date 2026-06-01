import React from 'react'
import { useBooking } from '../context/BookingContext'
import { Calendar, Trash2, ShieldCheck, XCircle } from 'lucide-react'

export default function BookingManager({ onClose }) {
  const { bookings, cancelBooking } = useBooking()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-8 max-h-[80vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-sand-100">
          <h3 className="font-serif text-2xl text-gray-900 font-light">Lịch Sử Đặt Phòng</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-sm tracking-widest uppercase cursor-pointer">Đóng</button>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-12 text-gray-400 font-light text-sm">
            Bạn chưa có yêu cầu đặt phòng nào được lưu.
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div key={b.id} className="p-5 border border-sand-200 rounded-xl bg-sand-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-semibold text-ocean-800">{b.id}</span>
                    <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-medium ${
                      b.status === 'active' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {b.status === 'active' ? 'Thành công' : 'Đã Huỷ'}
                    </span>
                  </div>
                  <h4 className="font-medium text-gray-900 text-base">{b.roomName || 'Phòng Nghỉ Cao Cấp'}</h4>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                    <Calendar size={12} /> {b.checkIn} — {b.checkOut} ({b.nights || 1} đêm)
                  </p>
                </div>

                {b.status === 'active' && (
                  <button
                    onClick={() => { if(confirm('Bạn có chắc chắn muốn huỷ phòng này không?')) cancelBooking(b.id) }}
                    className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-800 font-medium transition-colors border border-red-200 hover:border-red-600 px-3 py-1.5 rounded-lg bg-white shadow-sm cursor-pointer"
                  >
                    <XCircle size={13} /> Huỷ Phòng
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
