import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { openStatus } from './hours'

export type Tone = 'farina' | 'sfoglia' | 'sugo' | 'tramonto' | 'notte' | 'basilico'

const toneColor: Record<Tone, string> = {
  farina: '#F4ECDD',
  sfoglia: '#F2DCAA',
  sugo: '#EEC064',
  tramonto: '#A84E22',
  notte: '#121A14',
  basilico: '#2F4A26',
}

export function setTone(tone: Tone) {
  const root = document.documentElement
  if (root.dataset.tone === tone) return
  root.dataset.tone = tone
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', toneColor[tone])
}

// Chiama onEnter quando l'elemento attraversa la linea centrale dello schermo
export function useCenterLine<T extends HTMLElement>(onEnter: () => void) {
  const ref = useRef<T>(null)
  const cb = useRef(onEnter)
  useEffect(() => {
    cb.current = onEnter
  })
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && cb.current()),
      { rootMargin: '-50% 0px -50% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

export const useTone = <T extends HTMLElement>(tone: Tone) => useCenterLine<T>(() => setTone(tone))

export function useMedia(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query)
      m.addEventListener('change', cb)
      return () => m.removeEventListener('change', cb)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export function useOpenStatus() {
  const [status, setStatus] = useState(() => openStatus())
  useEffect(() => {
    const id = setInterval(() => setStatus(openStatus()), 60_000)
    return () => clearInterval(id)
  }, [])
  return status
}
