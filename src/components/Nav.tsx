import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'
import { useLocation } from 'react-router'
import { site } from '../data/site'
import { useBooking } from '../lib/booking-context'
import { useOpenStatus } from '../lib/hooks'
import Logo from './Logo'
import TLink from './TLink'

export function StatusPill({ className = '' }: { className?: string }) {
  const status = useOpenStatus()
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-3 py-1.5 text-xs font-medium whitespace-nowrap ${className}`}
    >
      <span className="relative flex size-2">
        {status.open && <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />}
        <span className={`relative size-2 rounded-full ${status.open ? 'bg-emerald-500' : 'bg-pomodoro'}`} />
      </span>
      {status.label}
    </span>
  )
}

export default function Nav() {
  const { open } = useBooking()
  const { pathname } = useLocation()
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)

  // Si nasconde quando scendi, torna appena risali
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setSolid(y > 40)
    setHidden(y > 400 && y > prev + 4 ? true : y < prev - 4 ? false : hidden)
  })

  const onMenu = pathname === '/menu'

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)]"
      animate={{ transform: hidden ? 'translateY(-110%)' : 'translateY(0%)' }}
      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
    >
      <div
        className={`mx-3 mt-3 flex items-center justify-between gap-3 rounded-full py-2 pr-2 pl-4 transition-[background-color,box-shadow,backdrop-filter] duration-300 sm:mx-6 ${
          solid ? 'bg-[color-mix(in_oklab,var(--bg)_78%,transparent)] shadow-[0_1px_0_var(--line)] backdrop-blur-xl' : ''
        }`}
      >
        <TLink to="/" label="Casa" aria-label="Casa da Sergio, torna alla home">
          <Logo />
        </TLink>

        <span className="hidden lg:block">
          <StatusPill />
        </span>

        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Principale">
          <TLink
            to={onMenu ? '/' : '/menu'}
            label={onMenu ? 'Casa' : 'Menù'}
            className="hidden h-11 items-center rounded-full px-4 text-sm font-semibold transition-colors duration-200 hover:bg-[var(--line)] sm:inline-flex"
          >
            {onMenu ? 'La giornata' : 'Il menù'}
          </TLink>
          <a
            href={site.phoneHref}
            className="hidden h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors duration-200 hover:bg-[var(--line)] md:inline-flex"
          >
            <i className="ri-phone-line" aria-hidden /> {site.phone.replace('+39 ', '')}
          </a>
          <button
            onClick={() => open()}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-pomodoro px-5 text-sm font-semibold text-panna transition-[transform,background-color] duration-150 ease-out hover:bg-pomodoro-scuro active:scale-[0.97]"
          >
            Prenota
            <i className="ri-arrow-right-up-line" aria-hidden />
          </button>
        </nav>
      </div>
    </motion.header>
  )
}
