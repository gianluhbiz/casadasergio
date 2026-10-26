import { animate, motion, useMotionValue } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { reviews, site, type Review } from '../data/site'
import { useTone } from '../lib/hooks'

// Le recensioni come comande appese al passe della cucina
export default function Reviews() {
  const tone = useTone<HTMLElement>('farina')
  const track = useRef<HTMLDivElement>(null)
  const wrap = useRef<HTMLDivElement>(null)
  const [limit, setLimit] = useState(0)
  const x = useMotionValue(0)

  useEffect(() => {
    const measure = () => {
      if (!track.current || !wrap.current) return
      setLimit(Math.min(0, wrap.current.clientWidth - track.current.scrollWidth))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const step = (dir: 1 | -1) => {
    const next = Math.max(limit, Math.min(0, x.get() - dir * 360))
    animate(x, next, { type: 'spring', duration: 0.6, bounce: 0.15 })
  }

  return (
    <section ref={tone} id="recensioni" aria-labelledby="rev-title" className="overflow-hidden py-28 lg:py-40">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12">
        <div>
          <p className="text-sm font-medium tracking-wide uppercase opacity-60">Dicono di noi</p>
          <h2
            id="rev-title"
            className="mt-4 max-w-[14ch] font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.92] font-bold tracking-[-0.035em] [font-stretch:80%]"
          >
            Le comande che ci piace <span className="font-serif font-normal text-pomodoro italic">rileggere</span>
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Badge href={site.google} label="Google" value={site.ratings.google.value} count={site.ratings.google.count} icon="ri-google-fill" />
          <Badge
            href={site.tripadvisor}
            label="TripAdvisor"
            value={site.ratings.tripadvisor.value}
            count={site.ratings.tripadvisor.count}
            icon="ri-star-smile-fill"
          />
        </div>
      </div>

      <div ref={wrap} className="relative mx-auto mt-16 max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* il passe: la barra d'acciaio dove si appendono le comande */}
        <div className="absolute -inset-x-[50vw] top-0 h-3 bg-gradient-to-b from-[#d9d4cb] via-[#f7f4ee] to-[#a9a39a] shadow-[0_4px_10px_-4px_rgba(0,0,0,.35)]" />
        <motion.div
          ref={track}
          className="flex cursor-grab items-start gap-5 pt-1 active:cursor-grabbing"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: limit, right: 0 }}
          dragElastic={0.12}
          dragTransition={{ power: 0.35, timeConstant: 260 }}
        >
          {reviews.map((r, i) => (
            <Ticket key={r.title} r={r} i={i} />
          ))}
        </motion.div>
        <div className="mt-8 flex items-center justify-between gap-4">
          <p className="text-sm opacity-60">
            <i className="ri-drag-move-line mr-1" aria-hidden />
            Trascina le comande
          </p>
          <div className="flex gap-2">
            <Arrow dir={-1} onClick={() => step(-1)} />
            <Arrow dir={1} onClick={() => step(1)} />
          </div>
        </div>
      </div>
    </section>
  )
}

function Ticket({ r, i }: { r: Review; i: number }) {
  const tilt = [-2.5, 1.5, -1, 2.5, -2, 1, -1.5, 2][i % 8]
  return (
    <motion.article
      className="relative w-[78vw] max-w-[340px] shrink-0 origin-top select-none"
      initial={{ opacity: 0, transform: 'translateY(-30px) rotate(0deg)' }}
      whileInView={{ opacity: 1, transform: `translateY(0px) rotate(${tilt}deg)` }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ type: 'spring', duration: 0.9, bounce: 0.35, delay: (i % 4) * 0.07 }}
      whileHover={{ transform: `translateY(6px) rotate(${-tilt * 0.6}deg)`, transition: { type: 'spring', duration: 0.6, bounce: 0.4 } }}
    >
      {/* clip della barra */}
      <span className="absolute -top-1 left-1/2 z-10 h-5 w-10 -translate-x-1/2 rounded-b-md bg-[#8f8a82] shadow-sm" aria-hidden />
      <div className="relative bg-panna px-6 pt-9 pb-8 text-inchiostro shadow-[0_18px_40px_-18px_rgba(60,30,10,.5)] [mask:radial-gradient(circle_6px_at_bottom,transparent_96%,#000)_bottom/16px_100%_repeat-x]">
        <div className="flex items-center justify-between border-b border-dashed border-inchiostro/25 pb-3 text-[11px] font-semibold tracking-[0.14em] uppercase opacity-70">
          <span>Comanda n° {String(i + 1).padStart(2, '0')}</span>
          <span>{r.when}</span>
        </div>
        <p className="mt-3 text-[11px] font-semibold tracking-[0.14em] uppercase opacity-55">Tavolo: {r.who}</p>
        <h3 className="mt-4 font-display text-2xl leading-tight font-bold tracking-tight [font-stretch:85%]">{r.title}</h3>
        <p className="mt-3 font-serif text-xl leading-snug italic">«{r.text}»</p>
        <div className="mt-6 flex items-center justify-between border-t border-dashed border-inchiostro/25 pt-3 text-sm">
          <span className="font-semibold">{r.author}</span>
          <span className="flex items-center gap-1 text-pomodoro" aria-label="5 stelle su 5">
            {Array.from({ length: 5 }, (_, k) => (
              <i key={k} className="ri-star-fill text-xs" aria-hidden />
            ))}
          </span>
        </div>
        <p className="mt-1 text-[11px] opacity-50">via {r.source}</p>
      </div>
    </motion.article>
  )
}

function Badge({ href, label, value, count, icon }: { href: string; label: string; value: string; count: number; icon: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="flex items-center gap-3 rounded-2xl border border-[var(--line)] px-4 py-3 transition-[transform,border-color] duration-150 ease-out hover:border-current/40 active:scale-[0.98]"
    >
      <i className={`${icon} text-2xl`} aria-hidden />
      <span>
        <span className="block font-display text-2xl leading-none font-bold">{value} ★</span>
        <span className="text-xs opacity-60">
          {count} recensioni {label}
        </span>
      </span>
    </a>
  )
}

function Arrow({ dir, onClick }: { dir: 1 | -1; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === 1 ? 'Comande successive' : 'Comande precedenti'}
      className="grid size-12 place-items-center rounded-full border border-[var(--line)] text-xl transition-[transform,border-color] duration-150 ease-out hover:border-current/50 active:scale-[0.94]"
    >
      <i className={dir === 1 ? 'ri-arrow-right-line' : 'ri-arrow-left-line'} aria-hidden />
    </button>
  )
}
