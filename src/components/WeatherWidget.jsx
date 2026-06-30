import { useState } from 'react'

// ─── SVG Weather Icons ────────────────────────────────────────────────────────
const IconSun = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
)

const IconCloud = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>
)

const IconPartlyCloudy = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="9" cy="9" r="4" opacity="0.7" />
    <line x1="9" y1="1" x2="9" y2="2.5" opacity="0.6" />
    <line x1="3.05" y1="3.05" x2="4.1" y2="4.1" opacity="0.6" />
    <line x1="1" y1="9" x2="2.5" y2="9" opacity="0.6" />
    <path d="M17.5 13H16.6A5.5 5.5 0 1 0 11 19h6.5a3.5 3.5 0 0 0 0-7z" />
  </svg>
)

const IconRain = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="16" y1="13" x2="16" y2="21" /><line x1="8" y1="13" x2="8" y2="21" />
    <line x1="12" y1="15" x2="12" y2="23" />
    <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" />
  </svg>
)

const IconWind = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
  </svg>
)

const IconWave = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 12c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0" />
    <path d="M2 17c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0" opacity="0.5" />
  </svg>
)

const IconCompass = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" opacity="0.7" />
  </svg>
)

const IconFlag = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="4" y1="15" x2="4" y2="22" />
    <path d="M4 15s2-2 6-2 6 2 6 2V3s-2 2-6 2-6-2-6-2z" />
  </svg>
)

const IconRuler = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="11" y="2" width="4" height="20" rx="1" />
    <line x1="11" y1="6" x2="9" y2="6" /><line x1="11" y1="10" x2="9" y2="10" />
    <line x1="11" y1="14" x2="9" y2="14" /><line x1="11" y1="18" x2="9" y2="18" />
  </svg>
)

// ─── Dữ liệu thời tiết giả lập Nha Trang ─────────────────────────────────────
const weatherData = [
  {
    day: 'Today', label: 'Hôm Nay',
    condition: 'partly cloudy', conditionVi: 'Ít mây',
    wind: 'weak', windVi: 'Gió nhẹ', sea: 'smooth', seaVi: 'Biển lặng',
    direction: 'SSW', speed: '3.2', temp: 31, wave: '0.14',
    hours: ['night','night','sunny','sunny','partly','partly','cloudy','cloudy'],
    icon: 'partly',
  },
  {
    day: 'WED', label: 'Thứ Tư',
    condition: 'sunny', conditionVi: 'Nắng đẹp',
    wind: 'moderate', windVi: 'Gió vừa', sea: 'slight', seaVi: 'Sóng nhẹ',
    direction: 'SE', speed: '4.8', temp: 33, wave: '0.21',
    hours: ['sunny','sunny','sunny','partly','partly','partly','sunny','sunny'],
    icon: 'sunny',
  },
  {
    day: 'THU', label: 'Thứ Năm',
    condition: 'cloudy', conditionVi: 'Nhiều mây',
    wind: 'moderate', windVi: 'Gió vừa', sea: 'slight', seaVi: 'Sóng nhẹ',
    direction: 'ESE', speed: '5.1', temp: 30, wave: '0.28',
    hours: ['night','partly','cloudy','cloudy','cloudy','partly','partly','cloudy'],
    icon: 'cloudy',
  },
  {
    day: 'FRI', label: 'Thứ Sáu',
    condition: 'light rain', conditionVi: 'Mưa rào',
    wind: 'fresh', windVi: 'Gió mạnh', sea: 'moderate', seaVi: 'Sóng vừa',
    direction: 'NE', speed: '7.3', temp: 28, wave: '0.45',
    hours: ['rain','rain','partly','cloudy','rain','rain','cloudy','partly'],
    icon: 'rain',
  },
  {
    day: 'SAT', label: 'Thứ Bảy',
    condition: 'partly cloudy', conditionVi: 'Ít mây',
    wind: 'weak', windVi: 'Gió nhẹ', sea: 'smooth', seaVi: 'Biển lặng',
    direction: 'SW', speed: '2.9', temp: 32, wave: '0.18',
    hours: ['night','night','sunny','sunny','partly','sunny','sunny','partly'],
    icon: 'partly',
  },
  {
    day: 'SUN', label: 'Chủ Nhật',
    condition: 'sunny', conditionVi: 'Nắng đẹp',
    wind: 'weak', windVi: 'Gió nhẹ', sea: 'smooth', seaVi: 'Biển lặng',
    direction: 'WSW', speed: '2.5', temp: 33, wave: '0.12',
    hours: ['night','sunny','sunny','sunny','sunny','sunny','partly','partly'],
    icon: 'sunny',
  },
  {
    day: 'MON', label: 'Thứ Hai',
    condition: 'cloudy', conditionVi: 'Nhiều mây',
    wind: 'moderate', windVi: 'Gió vừa', sea: 'slight', seaVi: 'Sóng nhẹ',
    direction: 'N', speed: '4.2', temp: 29, wave: '0.32',
    hours: ['night','night','cloudy','cloudy','partly','partly','cloudy','rain'],
    icon: 'cloudy',
  },
]

const hourLabels = ['00:00','03:00','06:00','09:00','12:00','15:00','18:00','21:00']

// ─── Icon nhỏ dùng trong timeline ─────────────────────────────────────────────
function HourIcon({ type, size = 18 }) {
  const cls = 'text-white/40'
  if (type === 'sunny')   return <IconSun size={size} className={cls} />
  if (type === 'cloudy')  return <IconCloud size={size} className={cls} />
  if (type === 'partly')  return <IconPartlyCloudy size={size} className={cls} />
  if (type === 'rain')    return <IconRain size={size} className={cls} />
  // night
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={cls}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

// ─── Icon lớn trung tâm ────────────────────────────────────────────────────────
function MainIcon({ type }) {
  const cls = 'text-white/60'
  if (type === 'sunny')  return <IconSun size={52} className={cls} />
  if (type === 'cloudy') return <IconCloud size={52} className={cls} />
  if (type === 'rain')   return <IconRain size={52} className={cls} />
  return <IconPartlyCloudy size={52} className={cls} />
}

// ─── Main Widget ───────────────────────────────────────────────────────────────
export default function WeatherWidget() {
  const [selected, setSelected] = useState(0)
  const w = weatherData[selected]

  // Ngày hiện tại
  const now = new Date()
  const year = now.getFullYear()
  const dayName = now.toLocaleDateString('en-US', { weekday: 'long' })
  const dayMonth = now.toLocaleDateString('en-US', { day: 'numeric', month: 'long' })
  const ordinal = (n) => {
    const s = ['th','st','nd','rd'], v = n % 100
    return n + (s[(v - 20) % 10] || s[v] || s[0])
  }
  const [month, date] = dayMonth.split(' ')

  return (
    <div className="w-full text-white/80">
      {/* Header: Year + Date */}
      <div className="flex items-end justify-between mb-6 pb-5 border-b border-white/10">
        <div className="font-serif text-6xl font-light text-white/20 leading-none tracking-widest">
          {year}
        </div>
        <div className="text-right">
          <p className="text-white/30 text-sm font-light italic">{dayName}</p>
          <p className="font-serif text-2xl text-white/60 font-light">
            {ordinal(parseInt(date))} {month}
          </p>
        </div>
      </div>

      {/* Day Tabs */}
      <div className="flex items-center gap-1 mb-6 overflow-x-auto scrollbar-none">
        {weatherData.map((d, i) => (
          <button
            key={d.day}
            onClick={() => setSelected(i)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs tracking-widest uppercase transition-all duration-200
              ${selected === i
                ? 'bg-white/15 text-white border border-white/20'
                : 'text-white/30 hover:text-white/60'
              }`}
          >
            {d.day}
          </button>
        ))}
      </div>

      {/* Main Conditions Row */}
      <div className="grid grid-cols-3 gap-4 mb-6 py-5 border-y border-white/10">
        {/* Wind */}
        <div className="flex flex-col items-center gap-2">
          <IconWind size={36} className="text-white/40" />
          <p className="text-[10px] tracking-widest uppercase text-white/30">{w.wind}</p>
          <p className="text-xs text-white/50 font-light">{w.windVi}</p>
        </div>
        {/* Sky */}
        <div className="flex flex-col items-center gap-2">
          <MainIcon type={w.icon} />
          <p className="text-[10px] tracking-widest uppercase text-white/30">{w.condition}</p>
          <p className="text-xs text-white/50 font-light">{w.conditionVi}</p>
        </div>
        {/* Sea */}
        <div className="flex flex-col items-center gap-2">
          <IconWave size={36} className="text-white/40" />
          <p className="text-[10px] tracking-widest uppercase text-white/30">{w.sea}</p>
          <p className="text-xs text-white/50 font-light">{w.seaVi}</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Direction + Speed */}
        <div className="flex items-center gap-2">
          <IconCompass size={18} className="text-white/30 flex-shrink-0" />
          <span className="text-xs text-white/40 tracking-wide">{w.direction}</span>
          <IconFlag size={16} className="text-white/30 flex-shrink-0 ml-1" />
          <span className="text-xs text-white/40">{w.speed} m/s</span>
        </div>
        {/* Temperature */}
        <div className="flex items-baseline justify-center gap-1">
          <span className="font-serif text-4xl text-white/70 font-light leading-none">{w.temp}</span>
          <span className="text-white/40 text-lg">°</span>
        </div>
        {/* Wave height */}
        <div className="flex items-center justify-end gap-2">
          <IconRuler size={18} className="text-white/30 flex-shrink-0" />
          <span className="text-xs text-white/40 tracking-wide">{w.wave} M</span>
        </div>
      </div>

      {/* Hourly Timeline */}
      <div className="border-t border-white/10 pt-4">
        <div className="flex justify-between items-end">
          {w.hours.map((type, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <HourIcon type={type} size={16} />
              <span className="text-[9px] text-white/20 tracking-wide">{hourLabels[i].slice(0,2)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Source note */}
      <p className="text-[9px] text-white/15 text-right mt-3 tracking-wide">
        Thời tiết · Nha Trang, Khánh Hòa
      </p>
    </div>
  )
}
