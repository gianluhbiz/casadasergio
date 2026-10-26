import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { site } from '../data/site'
import { BookingContext, type BookingPrefill } from '../lib/booking-context'
import { useMedia } from '../lib/hooks'
import { nextOpenDays } from '../lib/hours'
import { waLink } from '../lib/whatsapp'

export default function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; prefill: BookingPrefill }>({ open: false, prefill: {} })
  const open = useCallback((prefill: BookingPrefill = {}) => setState({ open: true, prefill }), [])
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), [])
  const value = useMemo(() => ({ open }), [open])

  return (
    <BookingContext.Provider value={value}>
      {children}
      <AnimatePresence>{state.open && <Sheet key="sheet" prefill={state.prefill} onClose={close} />}</AnimatePresence>
    </BookingContext.Provider>
  )
}

function Sheet({ prefill, onClose }: { prefill: BookingPrefill; onClose: () => void }) {
  const desktop = useMedia('(min-width: 640px)')
  const reduce = useReducedMotion()
  const days = useMemo(() => nextOpenDays(6), [])
  const [people, setPeople] = useState(2)
  const [day, setDay] = useState(days[0]?.value ?? '')
  const [note, setNote] = useState('')
  const panel = useRef<HTMLDivElement>(null)

  // Esc chiude, scroll bloccato, focus dentro e poi restituito
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    const html = document.documentElement
    const overflow = html.style.overflow
    html.style.overflow = 'hidden'
    panel.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>('button, a, textarea')
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      html.style.overflow = overflow
      prev?.focus?.()
    }
  }, [onClose])

  const message = [
    `Ciao Casa da Sergio! Vorrei prenotare un tavolo per ${people} ${people === 1 ? 'persona' : 'persone'}, ${day}.`,
    prefill.menu ? `Ci piacerebbe il menù degustazione: ${prefill.menu}.` : '',
    note.trim() ? `Note: ${note.trim()}` : '',
  ]
    .filter(Boolean)
    .join('\n')

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 120 || info.velocity.y > 500) onClose()
  }

  const hidden = desktop
    ? { opacity: 0, transform: 'translateY(16px) scale(0.97)' }
    : { opacity: 1, transform: reduce ? 'translateY(0%)' : 'translateY(100%)' }

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
      <motion.div
        className="absolute inset-0 bg-inchiostro/55 backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        onClick={onClose}
      />
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className="relative w-full max-w-lg rounded-t-[2rem] bg-panna pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] text-inchiostro shadow-2xl sm:rounded-[2rem] sm:pb-6"
        initial={hidden}
        animate={{ opacity: 1, transform: 'translateY(0%) scale(1)' }}
        exit={{ ...hidden, transition: { duration: 0.22, ease: [0.23, 1, 0.32, 1] } }}
        transition={desktop ? { duration: 0.28, ease: [0.23, 1, 0.32, 1] } : { duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
        drag={desktop ? false : 'y'}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.05, bottom: 0.7 }}
        onDragEnd={onDragEnd}
      >
        {!desktop && <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-inchiostro/15" aria-hidden />}
        <div className="flex items-start justify-between gap-4 px-6 pt-5 sm:pt-7">
          <div>
            <p className="font-serif text-lg italic text-pomodoro">Ti teniamo un posto</p>
            <h2 id="booking-title" className="font-display text-3xl leading-none font-bold tracking-tight [font-stretch:80%]">
              Prenota un tavolo
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Chiudi"
            className="grid size-11 shrink-0 place-items-center rounded-full bg-inchiostro/5 text-xl transition-transform duration-150 ease-out active:scale-[0.94]"
          >
            <i className="ri-close-line" aria-hidden />
          </button>
        </div>

        <div className="space-y-6 px-6 pt-6">
          <fieldset>
            <legend className="mb-2 text-sm font-medium text-inchiostro/60">Quante persone?</legend>
            <div className="flex items-center gap-3">
              <Step label="Una persona in meno" onClick={() => setPeople((p) => Math.max(1, p - 1))} icon="ri-subtract-line" autofocus />
              <output aria-live="polite" className="w-16 text-center font-display text-5xl font-bold tabular-nums [font-stretch:80%]">
                {people}
              </output>
              <Step label="Una persona in più" onClick={() => setPeople((p) => Math.min(40, p + 1))} icon="ri-add-line" />
              <span className="ml-2 text-sm text-inchiostro/60">
                {people >= 10 ? 'Gruppo numeroso: scrivici nelle note.' : 'Famiglie e amici: prezzi speciali.'}
              </span>
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 text-sm font-medium text-inchiostro/60">Quando?</legend>
            <div className="-mx-6 flex snap-x gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none]">
              {days.map((d) => {
                const active = d.value === day
                return (
                  <button
                    key={d.value}
                    onClick={() => setDay(d.value)}
                    aria-pressed={active}
                    className={`relative flex min-w-[4.75rem] shrink-0 snap-start flex-col items-center rounded-2xl border px-3 py-2.5 transition-[transform,background-color,border-color,color] duration-200 ease-out active:scale-[0.96] ${
                      active ? 'border-inchiostro bg-inchiostro text-panna' : 'border-inchiostro/15 hover:border-inchiostro/40'
                    }`}
                  >
                    <span className="text-sm font-semibold">{d.label}</span>
                    <span className={`text-xs ${active ? 'text-panna/70' : 'text-inchiostro/55'}`}>{d.sub}</span>
                  </button>
                )
              })}
            </div>
          </fieldset>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-inchiostro/60">Note (facoltativo)</span>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              placeholder="Allergie, seggiolone, un compleanno da festeggiare…"
              className="w-full resize-none rounded-2xl border border-inchiostro/15 bg-white/60 px-4 py-3 text-base outline-none transition-colors duration-200 placeholder:text-inchiostro/40 focus:border-inchiostro/50"
            />
          </label>

          {prefill.menu && (
            <p className="rounded-2xl bg-sfoglia/30 px-4 py-3 text-sm">
              <span className="font-semibold">Il tuo menù:</span> {prefill.menu}
            </p>
          )}

          <div className="space-y-3">
            <a
              href={waLink(message)}
              target="_blank"
              rel="noopener"
              className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-pomodoro text-base font-semibold text-panna transition-[transform,background-color] duration-150 ease-out hover:bg-pomodoro-scuro active:scale-[0.98]"
            >
              <i className="ri-whatsapp-line text-xl" aria-hidden />
              Invia la richiesta su WhatsApp
            </a>
            <a
              href={site.phoneHref}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm font-medium text-inchiostro/70 transition-colors hover:text-inchiostro"
            >
              <i className="ri-phone-line" aria-hidden /> Preferisci chiamare? {site.phone}
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function Step({ label, onClick, icon, autofocus }: { label: string; onClick: () => void; icon: string; autofocus?: boolean }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      data-autofocus={autofocus || undefined}
      className="grid size-12 place-items-center rounded-full border border-inchiostro/15 text-xl transition-[transform,border-color] duration-150 ease-out hover:border-inchiostro/40 active:scale-[0.92]"
    >
      <i className={icon} aria-hidden />
    </button>
  )
}
