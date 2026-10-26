import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type PanInfo } from 'framer-motion'
import { useEffect, useState } from 'react'
import Img from '../components/Img'
import { StatusPill } from '../components/Nav'
import TLink from '../components/TLink'
import { site } from '../data/site'
import { useBooking } from '../lib/booking-context'
import { useTone } from '../lib/hooks'
import { usePageTransition } from '../lib/transition-context'

const out = [0.23, 1, 0.32, 1] as const

const deck = [
  { name: 'sfoglia-cappello', alt: 'Una ragazza col cappello da cuoco stende la sfoglia a mano', note: 'la sfoglia, a mano' },
  { name: 'mezze-maniche', alt: 'Mezze maniche alla carbonara in un piatto bianco', note: 'mezze maniche, carbonara' },
  { name: 'coni-tramonto', alt: 'Due coni di fritti passati di mano al tramonto', note: 'fritti nel cono, al tramonto' },
  { name: 'frittura-ardesia', alt: 'Olive all’ascolana e cremini fritti su ardesia', note: 'olive all’ascolana' },
  { name: 'team-festa', alt: 'La squadra di Casa da Sergio in grembiule, sorridente', note: 'la squadra' },
]

export default function Hero() {
  const ref = useTone<HTMLElement>('farina')
  const { open } = useBooking()
  const { covered } = usePageTransition()
  const state = covered ? 'hidden' : 'show'

  return (
    <section ref={ref} className="relative min-h-svh px-5 pt-28 pb-16 sm:px-8 lg:px-12 lg:pt-32">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <motion.div initial="hidden" animate={state} variants={fadeUp(0)}>
            <span className="lg:hidden">
              <StatusPill />
            </span>
            <p className="mt-4 text-sm font-medium tracking-wide uppercase opacity-60 lg:mt-0">
              Cooperativa sociale · Marina Palmense
            </p>
          </motion.div>

          <h1 className="mt-5 font-display text-[clamp(4.25rem,11.5vw,10.5rem)] leading-[0.86] font-extrabold tracking-[-0.045em] [font-stretch:78%]">
            <Line i={0} state={state}>
              Ogni <Capsule name="mani-tagliere" alt="Mani che lavorano la pasta sul tagliere" i={0} state={state} />
            </Line>
            <Line i={1} state={state}>mano</Line>
            <Line i={2} state={state}>
              <Capsule name="sfoglia-sorriso" alt="Una ragazza sorride mentre tira la sfoglia" i={1} state={state} />{' '}
              <span className="font-serif font-normal tracking-[-0.02em] text-pomodoro italic [font-stretch:100%]">conta.</span>
            </Line>
          </h1>

          <motion.p
            initial="hidden"
            animate={state}
            variants={fadeUp(0.45)}
            className="mt-8 max-w-xl text-lg leading-relaxed text-pretty opacity-80 sm:text-xl"
          >
            Pasta fresca tirata a mano e fritti all’ascolana, a due passi dal mare. Li prepara una squadra di giovani e
            persone con abilità diverse, che qui ha trovato un lavoro vero.
          </motion.p>

          <motion.div
            initial="hidden"
            animate={state}
            variants={fadeUp(0.55)}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <button
              onClick={() => open()}
              className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-pomodoro pr-2 pl-7 text-base font-semibold text-panna transition-[transform,background-color] duration-150 ease-out hover:bg-pomodoro-scuro active:scale-[0.97]"
            >
              Prenota un tavolo
              <span className="grid size-10 place-items-center rounded-full bg-panna/15 transition-transform duration-300 ease-out group-hover:rotate-45">
                <i className="ri-arrow-right-up-line text-lg" aria-hidden />
              </span>
            </button>
            <TLink
              to="/menu"
              label="Menù"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-current/20 px-7 text-base font-semibold transition-[transform,border-color] duration-150 ease-out hover:border-current/60 active:scale-[0.97]"
            >
              Sfoglia il menù
              <i className="ri-arrow-right-line" aria-hidden />
            </TLink>
          </motion.div>

          <motion.dl
            initial="hidden"
            animate={state}
            variants={fadeUp(0.65)}
            className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-[var(--line)] pt-6 text-sm"
          >
            <Proof k="Google" v={`${site.ratings.google.value} ★`} sub={`${site.ratings.google.count} recensioni`} />
            <Proof k="Degustazione" v={`${site.tastingPrice} €`} sub="antipasto + primo" />
            <Proof k="Dove" v="Marina Palmense" sub="Via R. Murri 26" />
          </motion.dl>
        </div>

        <div className="lg:col-span-5">
          <Deck state={state} />
        </div>
      </div>
    </section>
  )
}

const fadeUp = (delay: number) => ({
  hidden: { opacity: 0, transform: 'translateY(18px)' },
  show: { opacity: 1, transform: 'translateY(0px)', transition: { duration: 0.8, ease: out, delay } },
})

function Line({ children, i, state }: { children: React.ReactNode; i: number; state: string }) {
  return (
    <span className="block overflow-hidden pt-[0.06em] pb-[0.04em]">
      <motion.span
        className="flex items-center gap-[0.18em]"
        initial="hidden"
        animate={state}
        variants={{
          hidden: { transform: 'translateY(105%)' },
          show: { transform: 'translateY(0%)', transition: { duration: 1, ease: out, delay: 0.08 + i * 0.09 } },
        }}
      >
        {children}
      </motion.span>
    </span>
  )
}

// Foto a pillola dentro il titolo: si srotola come una sfoglia
function Capsule({ name, alt, i, state }: { name: string; alt: string; i: number; state: string }) {
  return (
    <motion.span
      className="relative inline-block h-[0.74em] w-[1.9em] overflow-hidden rounded-full align-middle"
      initial="hidden"
      animate={state}
      variants={{
        hidden: { clipPath: 'inset(0 50% 0 50% round 999px)' },
        show: { clipPath: 'inset(0 0% 0 0% round 999px)', transition: { duration: 1.1, ease: [0.77, 0, 0.175, 1], delay: 0.55 + i * 0.12 } },
      }}
    >
      <Img name={name} alt={alt} sizes="240px" eager className="scale-110" />
    </motion.span>
  )
}

function Proof({ k, v, sub }: { k: string; v: string; sub: string }) {
  return (
    <div>
      <dt className="text-xs tracking-wide uppercase opacity-55">{k}</dt>
      <dd className="mt-1 font-display text-xl leading-tight font-bold [font-stretch:85%] sm:text-2xl">{v}</dd>
      <dd className="text-xs opacity-60">{sub}</dd>
    </div>
  )
}

// Mazzo di foto: si sfoglia da solo, si trascina col dito, si inclina col mouse
function Deck({ state }: { state: string }) {
  const reduce = useReducedMotion()
  const [order, setOrder] = useState(deck.map((_, i) => i))
  const [paused, setPaused] = useState(false)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 14 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 14 })

  const next = () => setOrder((o) => [...o.slice(1), o[0]])

  // Prima distribuzione delle carte con ritardo a cascata, poi movimenti immediati
  const [dealt, setDealt] = useState(false)
  useEffect(() => {
    if (state !== 'show') return
    const id = setTimeout(() => setDealt(true), 1200)
    return () => clearTimeout(id)
  }, [state])

  useEffect(() => {
    if (reduce || paused || state !== 'show') return
    const id = setInterval(next, 3600)
    return () => clearInterval(id)
  }, [reduce, paused, state])

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 80 || Math.abs(info.velocity.x) > 400) next()
  }

  return (
    <motion.div
      className="relative mx-auto aspect-[4/5] w-[min(82vw,440px)] [perspective:1200px]"
      onPointerMove={onMove}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => {
        setPaused(false)
        mx.set(0)
        my.set(0)
      }}
      style={{ rotateX: rx, rotateY: ry }}
    >
      {deck.map((card, i) => {
        const pos = order.indexOf(i)
        const top = pos === 0
        const tilt = [-2, 4, -6, 7, -9][pos]
        return (
          <motion.figure
            key={card.name}
            className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
            style={{ zIndex: deck.length - pos }}
            initial={{ opacity: 0, transform: `translateY(60px) rotate(${tilt * 2}deg) scale(0.9)` }}
            animate={
              state === 'show'
                ? {
                    opacity: pos > 3 ? 0 : 1,
                    transform: `translate(${pos * 10}px, ${pos * -12}px) rotate(${tilt}deg) scale(${1 - pos * 0.04})`,
                  }
                : undefined
            }
            transition={{ duration: 0.7, ease: out, delay: dealt ? 0 : 0.35 + (deck.length - pos) * 0.08 }}
            drag={top ? 'x' : false}
            dragSnapToOrigin
            dragElastic={0.6}
            onDragEnd={onDragEnd}
            whileDrag={{ scale: 1.02 }}
          >
            <div className="h-full overflow-hidden rounded-[1.75rem] bg-panna p-2.5 pb-14 shadow-[0_30px_60px_-20px_rgba(60,30,10,.45)]">
              <div className="h-full overflow-hidden rounded-[1.25rem]">
                <Img name={card.name} alt={card.alt} sizes="(min-width:1024px) 440px, 82vw" eager={i < 2} />
              </div>
              <figcaption className="absolute inset-x-5 bottom-3.5 flex items-center justify-between font-serif text-xl text-inchiostro italic">
                {card.note}
                <span className="font-sans text-xs not-italic opacity-50">
                  {String(i + 1).padStart(2, '0')}/{String(deck.length).padStart(2, '0')}
                </span>
              </figcaption>
            </div>
          </motion.figure>
        )
      })}
      <p className="absolute -bottom-10 left-0 w-full text-center text-xs opacity-50">
        <i className="ri-drag-move-line mr-1" aria-hidden /> Trascina per sfogliare
      </p>
    </motion.div>
  )
}
