import { animate, useReducedMotion } from 'framer-motion'
import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { TransitionContext, type Go } from '../lib/transition-context'
import { Mark } from './Logo'

const inOut = [0.77, 0, 0.175, 1] as const
const out = [0.23, 1, 0.32, 1] as const
const frame = () => new Promise((r) => requestAnimationFrame(() => r(null)))

/*
  Passaggio tra pagine in tre tempi:
  1. un foglio di sfoglia si allarga a cerchio dal punto cliccato
  2. dietro al foglio cambia la pagina
  3. il foglio sale e scopre la pagina nuova, che entra con le sue animazioni
*/
export default function TransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const overlay = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')
  const [covered, setCovered] = useState(false)
  const busy = useRef(false)

  const go = useCallback<Go>(
    async (to, nextLabel, origin) => {
      if (busy.current) return
      if (to === window.location.pathname) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      const el = overlay.current
      if (!el) return
      busy.current = true
      setLabel(nextLabel)
      const word = el.querySelector<HTMLElement>('[data-word]')!
      const mark = el.querySelector<HTMLElement>('[data-mark]')!
      const w = window.innerWidth
      const h = window.innerHeight
      const x = origin?.x ?? w / 2
      const y = origin?.y ?? h / 2
      const r = Math.hypot(Math.max(x, w - x), Math.max(y, h - y)) + 40

      // parte chiuso nel punto del clic, così non lampeggia a schermo pieno
      if (reduce) el.style.opacity = '0'
      else el.style.clipPath = `circle(0px at ${x}px ${y}px)`
      el.style.visibility = 'visible'
      el.style.pointerEvents = 'auto'
      await frame()

      if (reduce) {
        await animate(el, { opacity: [0, 1] }, { duration: 0.2 })
      } else {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0%)'
        animate(word, { transform: ['translateY(110%)', 'translateY(0%)'] }, { duration: 0.7, ease: out, delay: 0.25 })
        animate(mark, { transform: ['rotate(-90deg) scale(.6)', 'rotate(0deg) scale(1)'], opacity: [0, 1] }, { duration: 0.6, ease: out, delay: 0.2 })
        await animate(el, { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] }, { duration: 0.75, ease: inOut })
      }

      setCovered(true)
      navigate(to)
      window.scrollTo(0, 0)
      await frame()
      await new Promise((res) => setTimeout(res, reduce ? 50 : 320))
      setCovered(false)

      if (reduce) {
        await animate(el, { opacity: [1, 0] }, { duration: 0.25 })
      } else {
        animate(word, { transform: 'translateY(-110%)' }, { duration: 0.5, ease: inOut })
        await animate(el, { transform: ['translateY(0%)', 'translateY(-100%)'] }, { duration: 0.8, ease: inOut, delay: 0.05 })
      }
      el.style.visibility = 'hidden'
      el.style.pointerEvents = 'none'
      el.style.clipPath = ''
      busy.current = false
    },
    [navigate, reduce],
  )

  const value = useMemo(() => ({ go, covered }), [go, covered])

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <div
        ref={overlay}
        aria-hidden
        style={{ visibility: 'hidden', pointerEvents: 'none' }}
        className="fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-hidden bg-sfoglia text-inchiostro"
      >
        {/* Righe della sfoglia appena tirata */}
        <div className="absolute inset-0 opacity-[0.12] [background:repeating-linear-gradient(100deg,transparent_0_38px,#7a4a10_38px_39px)]" />
        <span data-mark className="relative mb-6 block size-14 text-inchiostro">
          <Mark className="size-full" />
        </span>
        <span className="relative block overflow-hidden pb-[0.08em]">
          <span
            data-word
            className="block font-display text-[clamp(4.5rem,19vw,16rem)] leading-[0.85] font-extrabold tracking-[-0.04em] [font-stretch:75%]"
          >
            {label}
          </span>
        </span>
      </div>
    </TransitionContext.Provider>
  )
}
