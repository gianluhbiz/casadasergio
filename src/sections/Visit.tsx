import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Img from '../components/Img'
import { dayNames, site } from '../data/site'
import { useBooking } from '../lib/booking-context'
import { useOpenStatus, useTone } from '../lib/hooks'
import { formatSlots } from '../lib/hours'

const week = [2, 3, 4, 5, 6, 0, 1]

export default function Visit() {
  const tone = useTone<HTMLElement>('farina')
  const { open } = useBooking()
  const status = useOpenStatus()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const transform = useTransform(scrollYProgress, [0, 1], ['translateY(-8%) scale(1.15)', 'translateY(8%) scale(1.15)'])

  return (
    <section ref={tone} id="vieni" aria-labelledby="visit-title" className="pt-28 pb-32 lg:pt-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <h2
          id="visit-title"
          className="font-display text-[clamp(3.4rem,12vw,11rem)] leading-[0.85] font-extrabold tracking-[-0.045em] [font-stretch:76%]"
        >
          Ti teniamo
          <br />
          un <span className="font-serif font-normal text-[var(--accent)] italic">posto.</span>
        </h2>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div ref={ref} className="relative h-[52svh] overflow-hidden rounded-[2rem] lg:col-span-7 lg:h-auto lg:min-h-[34rem]">
            <motion.div style={{ transform }} className="absolute inset-0">
              <Img name="giardino-ampio" alt="Il giardino di Casa da Sergio con il furgone e i tavoli tra gli alberi" sizes="(min-width:1024px) 60vw, 95vw" />
            </motion.div>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener"
              className="absolute bottom-5 left-5 flex items-center gap-3 rounded-full bg-panna py-2 pr-5 pl-2 text-inchiostro shadow-lg transition-transform duration-150 ease-out active:scale-[0.97]"
            >
              <span className="grid size-10 place-items-center rounded-full bg-pomodoro text-panna">
                <i className="ri-map-pin-2-fill" aria-hidden />
              </span>
              <span className="text-sm leading-tight">
                <span className="block font-semibold">{site.address}</span>
                <span className="opacity-60">Marina Palmense · vicino alla farmacia</span>
              </span>
            </a>
          </div>

          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span className={`size-2 rounded-full ${status.open ? 'bg-emerald-500' : 'bg-pomodoro'}`} />
              {status.label}
            </div>
            <ul className="mt-5 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {week.map((d) => {
                const today = d === status.today
                return (
                  <li key={d} className={`flex items-center justify-between py-3 text-base ${today ? 'font-semibold' : ''}`}>
                    <span className="flex items-center gap-2">
                      {dayNames[d]}
                      {today && <span className="rounded-full bg-sfoglia px-2 py-0.5 text-[11px] font-semibold text-inchiostro uppercase">oggi</span>}
                    </span>
                    <span className={`tabular-nums ${formatSlots(d) === 'Chiuso' ? 'opacity-50' : ''}`}>{formatSlots(d)}</span>
                  </li>
                )
              })}
            </ul>
            <p className="mt-3 text-xs opacity-55">Orari da Google: d’estate e nei festivi possono cambiare. Nel dubbio, scrivici.</p>

            <div className="mt-8 flex flex-col gap-3">
              <button
                onClick={() => open()}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-pomodoro text-base font-semibold text-panna transition-[transform,background-color] duration-150 ease-out hover:bg-pomodoro-scuro active:scale-[0.98]"
              >
                Prenota un tavolo <i className="ri-arrow-right-up-line" aria-hidden />
              </button>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={site.phoneHref}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[var(--line)] text-sm font-semibold transition-[transform,border-color] duration-150 hover:border-current/40 active:scale-[0.97]"
                >
                  <i className="ri-phone-line" aria-hidden /> Chiama
                </a>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[var(--line)] text-sm font-semibold transition-[transform,border-color] duration-150 hover:border-current/40 active:scale-[0.97]"
                >
                  <i className="ri-direction-line" aria-hidden /> Indicazioni
                </a>
              </div>
              <p className="text-center text-xs opacity-55">Parcheggio gratuito in strada · Tavoli all’aperto</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
