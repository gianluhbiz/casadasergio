import { createContext, useContext } from 'react'

export type Go = (to: string, label: string, origin?: { x: number; y: number }) => void

export const TransitionContext = createContext<{ go: Go; covered: boolean }>({
  go: () => {},
  covered: false,
})

export const usePageTransition = () => useContext(TransitionContext)
