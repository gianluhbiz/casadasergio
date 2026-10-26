import { createContext, useContext } from 'react'

export type BookingPrefill = { menu?: string }

export const BookingContext = createContext<{ open: (prefill?: BookingPrefill) => void }>({
  open: () => {},
})

export const useBooking = () => useContext(BookingContext)
