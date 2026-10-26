import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'
import { useLocation } from 'react-router'
import { site } from '../data/site'
import { useBooking } from '../lib/booking-context'
import TLink from './TLink'

// Barra in basso, sotto il pollice: le tre azioni che contano su telefono
export default function MobileDock() {
  const { open } = useBooking()
  const { pathname } = useLocation()
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setShow(y > window.innerHeight * 0.6))
  const onMenu = pathname === '/menu'

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] md:hidden"
          initial={{ transform: 'translateY(120%)' }}
          animate={{ transform: 'translateY(0%)' }}
          exit={{ transform: 'translateY(120%)' }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        >
          <div className="flex items-center gap-2 rounded-full bg-inchiostro p-1.5 text-panna shadow-[0_12px_40px_-8px_rgba(0,0,0,.45)]">
            <a
              href={site.phoneHref}
              aria-label={`Chiama ${site.phone}`}
              className="grid size-12 shrink-0 place-items-center rounded-full bg-panna/10 text-xl active:scale-[0.94] transition-transform duration-150"
            >
              <i className="ri-phone-fill" aria-hidden />
            </a>
            <button
              onClick={() => open()}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-pomodoro text-[15px] font-semibold active:scale-[0.97] transition-transform duration-150"
            >
              Prenota un tavolo
            </button>
            <TLink
              to={onMenu ? '/' : '/menu'}
              label={onMenu ? 'Casa' : 'Menù'}
              aria-label={onMenu ? 'Torna alla home' : 'Apri il menù'}
              className="grid h-12 shrink-0 place-items-center rounded-full bg-panna/10 px-4 text-sm font-semibold active:scale-[0.96] transition-transform duration-150"
            >
              {onMenu ? 'Home' : 'Menù'}
            </TLink>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
