import { createContext, useContext, useState, useCallback } from 'react'

const BookingContext = createContext(null)

// Load bookings from localStorage
const loadBookings = () => {
  try {
    const saved = localStorage.getItem('luna_bookings')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

const saveBookings = (bookings) => {
  try {
    localStorage.setItem('luna_bookings', JSON.stringify(bookings))
  } catch {}
}

export function BookingProvider({ children }) {
  const [view, setView] = useState('home') // 'home' | 'search'
  const [searchParams, setSearchParams] = useState(null)
  const [bookings, setBookings] = useState(loadBookings)

  const navigateToSearch = useCallback((params) => {
    setSearchParams(params)
    setView('search')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const navigateHome = useCallback(() => {
    setView('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const addBooking = useCallback((booking) => {
    const newBooking = {
      ...booking,
      id: `LNA-${Date.now()}`,
      status: 'active',
      bookedAt: new Date().toISOString(),
    }
    setBookings((prev) => {
      const updated = [newBooking, ...prev]
      saveBookings(updated)
      return updated
    })
    return newBooking
  }, [])

  const cancelBooking = useCallback((bookingId) => {
    setBookings((prev) => {
      const updated = prev.map((b) =>
        b.id === bookingId ? { ...b, status: 'cancelled' } : b
      )
      saveBookings(updated)
      return updated
    })
  }, [])

  return (
    <BookingContext.Provider
      value={{ view, searchParams, bookings, navigateToSearch, navigateHome, addBooking, cancelBooking }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export const useBooking = () => {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within BookingProvider')
  return ctx
}
