import { useEffect, useState } from 'react'
import { BookingProvider, useBooking } from './context/BookingContext'
import Header from './components/Header'
import Hero from './components/Hero'
import BookingBar from './components/BookingBar'
import Concept from './components/Concept'
import Rooms from './components/Rooms'
import Dining from './components/Dining'
import Experiences from './components/Experiences'
import Footer from './components/Footer'
import SearchResults from './components/SearchResults'

// ─── Back-to-top (monochrome, ocean-800 brand color) ──────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false)
  const { view } = useBooking()

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Về đầu trang"
      className={`fixed bottom-8 right-8 z-40 w-11 h-11 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      {/* Monochrome chevron-up */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  )
}
// ─── Floating Phone (monochrome — dark, no green) ─────────────────────────────
function FloatingContact() {
  return (
    <a
      href="tel:+84368789135"
      aria-label="Gọi điện hotline"
      className="fixed bottom-24 right-8 z-40 w-11 h-11 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 transition-all duration-300"
    >
      {/* Monochrome phone handset */}
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    </a>
  )
}

// ─── Root view switcher ────────────────────────────────────────────────────────
function AppContent() {
  const { view } = useBooking()

  if (view === 'search') {
    return (
      <div className="min-h-screen">
        <SearchResults />
        <BackToTop />
        <FloatingContact />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <BookingBar />
        <Concept />
        <Rooms />
        <Dining />
        <Experiences />
      </main>
      <Footer />
      <BackToTop />
      <FloatingContact />
    </div>
  )
}

// ─── App root ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BookingProvider>
      <AppContent />
    </BookingProvider>
  )
}
