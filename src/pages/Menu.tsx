import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { useState, type ReactNode } from 'react'
import Footer from '../components/Footer'
import Img from '../components/Img'
import TLink from '../components/TLink'
import { antipasti, digestivi, dolci, primi, type Dish } from '../data/menu'
import { site } from '../data/site'
import { useBooking } from '../lib/booking-context'
import { setTone, useCenterLine, useMedia, type Tone } from '../lib/hooks'
import { usePageTransition } from '../lib/transition-context'

const out = [0.23, 1, 0.32, 1] as const

const tabs = [
  { id: 'degustazione', label: 'Degustazione' },
  { id: 'pasta', label: 'La pasta' },
  { id: 'dolci', label: 'Dolci e digestivi' },
]

export default function MenuPage() {
  const [active, setActive] = useState('degustazione')
  return (
    <>
      <main>
        <MenuHero />
        <Tabs active={active} />
        <Block id="degustazione" tone="farina" onActive={setActive}>
          <Builder />
        </Block>
        <Block id="pasta" tone="sfoglia" onActive={setActive}>
          <PastaIndex />
        </Block>
        <Block id="dolci" tone="notte" onActive={setActive}>
          <Sweets />
        </Block>
      </main>
      <Footer />
    </>
  )
}

function Block({ id, tone, onActive, children }: { id: string; tone: Tone; onActive: (id: string) => void; children: ReactNode }) {
  const ref = useCenterLine<HTMLElement>(() => {
    onActive(id)
    setTone(tone)
  })
  return (
    <section ref={ref} id={id} className="scroll-mt-28">
      {children}
    </section>
  )
}

/* ---------- Apertura: la parola resta dove l'ha lasciata la transizione ---------- */

const scatter = [
  { name: 'mezze-maniche', alt: 'Mezze maniche alla carbonara', cls: 'left-[4%] top-[13%] w-[15vw] max-w-[190px] aspect-[3/4]', r: -8, d: 0 },
  { name: 'gnocchi-alto', alt: 'Gnocchi con guanciale croccante', cls: 'right-[5%] top-[11%] w-[14vw] max-w-[180px] aspect-[3/4]', r: 7, d: 0.06 },
  { name: 'frittura-ardesia-2', alt: 'Olive all’ascolana su ardesia', cls: 'left-[12%] bottom-[30%] w-[12vw] max-w-[160px] aspect-[3/4]', r: 6, d: 0.12 },
  { name: 'tortelloni-verdi-alto', alt: 'Tortelloni verdi al cavolo nero', cls: 'right-[13%] bottom-[29%] w-[13vw] max-w-[170px] aspect-[3/4]', r: -5, d: 0.18 },
]

function MenuHero() {
  const ref = useCenterLine<HTMLElement>(() => setTone('sugo'))
  const { covered } = usePageTransition()
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const lift = useTransform(scrollY, [0, 600], [0, -120])
  const transform = useTransform(lift, (v) => `translateY(${reduce ? 0 : v}px)`)
  const state = covered ? 'hidden' : 'show'

  return (
    <section ref={ref} className="relative flex min-h-svh flex-col overflow-hidden px-5 pt-28 pb-10 sm:px-8 lg:px-12">
      {scatter.map((s) => (
        <motion.div key={s.name} className={`absolute hidden sm:block ${s.cls}`} style={{ transform }}>
          <motion.div
            className="h-full overflow-hidden rounded-2xl bg-panna p-1.5 shadow-[0_24px_50px_-20px_rgba(60,30,10,.5)]"
            initial="hidden"
            animate={state}
            variants={{
              hidden: { opacity: 0, transform: `translateY(60px) rotate(${s.r * 2}deg) scale(.9)` },
              show: { opacity: 1, transform: `translateY(0px) rotate(${s.r}deg) scale(1)`, transition: { duration: 1, ease: out, delay: 0.25 + s.d } },
            }}
          >
            <div className="h-full overflow-hidden rounded-xl">
              <Img name={s.name} alt={s.alt} sizes="220px" eager />
            </div>
          </motion.div>
        </motion.div>
      ))}

      <motion.p
        initial="hidden"
        animate={state}
        variants={{ hidden: { opacity: 0 }, show: { opacity: 0.65, transition: { duration: 0.6, delay: 0.2 } } }}
        className="relative text-center text-sm font-medium tracking-wide uppercase"
      >
        Pranzo da Sergio · {site.city.replace('63900 ', '')}
      </motion.p>

      <div className="relative flex flex-1 flex-col items-center justify-center">
        <h1 className="text-center font-display text-[clamp(4.5rem,19vw,16rem)] leading-[0.85] font-extrabold tracking-[-0.04em] [font-stretch:75%]">
          Menù
        </h1>
        <motion.p
          initial="hidden"
          animate={state}
          variants={{
            hidden: { opacity: 0, transform: 'rotate(-14deg) scale(.8)' },
            show: { opacity: 1, transform: 'rotate(-6deg) scale(1)', transition: { type: 'spring', duration: 0.7, bounce: 0.35, delay: 0.45 } },
          }}
          className="-mt-3 rounded-full bg-pomodoro px-5 py-2 font-serif text-2xl text-panna italic sm:text-3xl"
        >
          tutto fatto a mano
        </motion.p>
      </div>

      <motion.div
        initial="hidden"
        animate={state}
        variants={{ hidden: { opacity: 0, transform: 'translateY(16px)' }, show: { opacity: 1, transform: 'translateY(0px)', transition: { duration: 0.8, ease: out, delay: 0.5 } } }}
        className="relative z-10 mx-auto grid w-full max-w-4xl gap-4 text-center sm:grid-cols-3 sm:text-left"
      >
        <HeroNote k="Ogni giorno" v="Tre primi di stagione con la nostra pasta fresca" />
        <HeroNote k="Degustazione" v={`Antipasto, primo e acqua a ${site.tastingPrice} €`} />
        <HeroNote k="Allergie" v="Diccelo quando prenoti o appena ti siedi" />
      </motion.div>
      <a href="#degustazione" className="relative mx-auto mt-8 flex flex-col items-center gap-1 text-sm font-semibold">
        Componi il tuo pranzo
        <i className="ri-arrow-down-line animate-bounce text-lg motion-reduce:animate-none" aria-hidden />
      </a>
    </section>
  )
}

function HeroNote({ k, v }: { k: string; v: string }) {
  return (
    <div className="border-t border-[var(--line)] pt-3">
      <p className="text-xs tracking-wide uppercase opacity-60">{k}</p>
      <p className="mt-1 text-base leading-snug">{v}</p>
    </div>
  )
}

/* ---------- Schede di navigazione ---------- */

function Tabs({ active }: { active: string }) {
  return (
    <div className="sticky top-[4.75rem] z-40 flex justify-center px-3">
      <LayoutGroup>
        <nav
          aria-label="Sezioni del menù"
          className="flex max-w-full gap-1 overflow-x-auto rounded-full bg-[color-mix(in_oklab,var(--bg)_80%,transparent)] p-1 shadow-[0_0_0_1px_var(--line)] backdrop-blur-xl [scrollbar-width:none]"
        >
          {tabs.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              aria-current={active === t.id ? 'true' : undefined}
              className="relative shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold whitespace-nowrap"
            >
              {active === t.id && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-[var(--fg)]"
                  transition={{ type: 'spring', duration: 0.45, bounce: 0.15 }}
                />
              )}
              <span className={`relative transition-colors duration-200 ${active === t.id ? 'text-[var(--bg)]' : ''}`}>{t.label}</span>
            </a>
          ))}
        </nav>
      </LayoutGroup>
    </div>
  )
}

/* ---------- Compositore del menù degustazione ---------- */

function Builder() {
  const { open } = useBooking()
  const [anti, setAnti] = useState<string | null>(null)
  const [primo, setPrimo] = useState<string | null>(null)
  const [sauce, setSauce] = useState<string | null>(null)
  const [water, setWater] = useState<'liscia' | 'gassata' | null>(null)

  const a = antipasti.find((d) => d.id === anti)
  const p = primi.find((d) => d.id === primo)
  const steps = [a, p, water].filter(Boolean).length

  const summary = [a?.name, p ? `${p.name}${sauce ? ` (${sauce.toLowerCase()})` : ''}` : null, water ? `acqua ${water}` : null]
    .filter(Boolean)
    .join(' + ')

  return (
    <div className="mx-auto max-w-[1400px] px-5 pt-20 pb-28 sm:px-8 lg:px-12 lg:pt-28">
      <div className="max-w-3xl">
        <p className="text-sm font-medium tracking-wide uppercase opacity-60">Menù degustazione · {site.tastingPrice} € a persona</p>
        <h2 className="mt-4 font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.92] font-bold tracking-[-0.035em] [font-stretch:80%]">
          Componi il tuo <span className="font-serif font-normal text-pomodoro italic">pranzo</span>
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed opacity-75">
          Scegli un antipasto e un primo con la nostra pasta fresca. La comanda si compila da sola: con un tocco la mandi a noi
          insieme alla prenotazione.
        </p>
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="space-y-16 lg:col-span-7">
          <Step n={1} title="L’antipasto" done={!!a}>
            <div className="grid gap-4 sm:grid-cols-2">
              {antipasti.map((d) => (
                <Choice key={d.id} dish={d} selected={anti === d.id} onSelect={() => setAnti(d.id)} tall />
              ))}
            </div>
          </Step>

          <Step n={2} title="Il primo" done={!!p}>
            <p className="-mt-2 mb-5 text-sm opacity-65">In sala ogni giorno ne trovi tre: dicci il tuo preferito e ti confermiamo se c’è.</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {primi.map((d) => (
                <Choice
                  key={d.id}
                  dish={d}
                  selected={primo === d.id}
                  onSelect={() => {
                    setPrimo(d.id)
                    setSauce(null)
                  }}
                />
              ))}
            </div>
            <AnimatePresence initial={false}>
              {p?.options && (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: out }}
                  className="overflow-hidden"
                >
                  <p className="mt-6 mb-3 text-sm font-medium opacity-65">Condimento per {p.name.replace(/[“”"]/g, '')}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.options.map((o) => (
                      <Chip key={o} selected={sauce === o} onClick={() => setSauce(o)}>
                        {o}
                      </Chip>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Step>

          <Step n={3} title="L’acqua" done={!!water}>
            <div className="flex gap-2">
              <Chip selected={water === 'liscia'} onClick={() => setWater('liscia')} big>
                <i className="ri-drop-line" aria-hidden /> Liscia
              </Chip>
              <Chip selected={water === 'gassata'} onClick={() => setWater('gassata')} big>
                <i className="ri-bubble-chart-line" aria-hidden /> Gassata
              </Chip>
            </div>
          </Step>
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-36">
            <Ticket a={a} p={p} sauce={sauce} water={water} steps={steps} onBook={() => open({ menu: summary || undefined })} />
          </div>
        </div>
      </div>
    </div>
  )
}

function Step({ n, title, done, children }: { n: number; title: string; done: boolean; children: ReactNode }) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <span
          className={`grid size-10 place-items-center rounded-full border text-sm font-bold transition-colors duration-300 ${
            done ? 'border-pomodoro bg-pomodoro text-panna' : 'border-current/25'
          }`}
        >
          {done ? <i className="ri-check-line text-lg" aria-hidden /> : n}
        </span>
        <h3 className="font-display text-3xl font-bold tracking-tight [font-stretch:85%]">{title}</h3>
      </div>
      {children}
    </div>
  )
}

function Choice({ dish, selected, onSelect, tall }: { dish: Dish; selected: boolean; onSelect: () => void; tall?: boolean }) {
  return (
    <button
      onClick={onSelect}
      aria-pressed={selected}
      className={`group relative overflow-hidden rounded-3xl bg-panna text-left text-inchiostro shadow-[0_0_0_1px_rgba(28,23,18,.08)] transition-[transform,box-shadow] duration-200 ease-out active:scale-[0.97] ${
        selected ? 'shadow-[0_0_0_3px_var(--color-pomodoro)]' : 'hover:shadow-[0_0_0_1px_rgba(28,23,18,.3)]'
      }`}
    >
      {dish.image && (
        <div className={`overflow-hidden ${tall ? 'aspect-[4/3]' : 'aspect-square'}`}>
          <div className="h-full transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.06]">
            <Img name={dish.image} alt="" sizes={tall ? '(min-width:640px) 30vw, 90vw' : '(min-width:640px) 18vw, 45vw'} />
          </div>
        </div>
      )}
      <div className={tall ? 'p-5' : 'p-3.5'}>
        <p className={`font-display leading-tight font-bold [font-stretch:88%] ${tall ? 'text-2xl' : 'text-base'}`}>
          {dish.name}
          {dish.veg && <i className="ri-leaf-line ml-1.5 text-oliva" aria-label="vegetariano" />}
        </p>
        {tall && <p className="mt-2 text-sm leading-relaxed opacity-70">{dish.desc}</p>}
      </div>
      <AnimatePresence>
        {selected && (
          <motion.span
            initial={{ opacity: 0, transform: 'scale(.6)' }}
            animate={{ opacity: 1, transform: 'scale(1)' }}
            exit={{ opacity: 0, transform: 'scale(.6)', transition: { duration: 0.12 } }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0.35 }}
            className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-pomodoro text-lg text-panna shadow-lg"
          >
            <i className="ri-check-line" aria-hidden />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

function Chip({ selected, onClick, children, big }: { selected: boolean; onClick: () => void; children: ReactNode; big?: boolean }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      className={`inline-flex items-center gap-2 rounded-full border font-medium transition-[transform,background-color,border-color,color] duration-200 ease-out active:scale-[0.96] ${
        big ? 'h-14 px-7 text-base' : 'h-11 px-4 text-sm'
      } ${selected ? 'border-inchiostro bg-inchiostro text-panna' : 'border-current/20 hover:border-current/50'}`}
    >
      {children}
    </button>
  )
}

function Ticket({
  a,
  p,
  sauce,
  water,
  steps,
  onBook,
}: {
  a?: Dish
  p?: Dish
  sauce: string | null
  water: string | null
  steps: number
  onBook: () => void
}) {
  const lines = [
    a && { key: 'a', qty: '1×', name: a.name },
    p && { key: `p-${p.id}`, qty: '1×', name: `${p.name.replace(/[“”"]/g, '')}${sauce ? `, ${sauce.toLowerCase()}` : ''}` },
    water && { key: 'w', qty: '1×', name: `Acqua ${water}` },
  ].filter(Boolean) as { key: string; qty: string; name: string }[]

  return (
    <div className="relative rotate-[0.6deg] bg-panna px-7 pt-8 pb-9 text-inchiostro shadow-[0_30px_60px_-25px_rgba(60,30,10,.55)] [mask:radial-gradient(circle_7px_at_bottom,transparent_96%,#000)_bottom/18px_100%_repeat-x]">
      <div className="flex items-center justify-between text-[11px] font-semibold tracking-[0.16em] uppercase opacity-70">
        <span>Comanda · degustazione</span>
        <span>{steps}/3</span>
      </div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-inchiostro/10">
        <motion.div
          className="h-full origin-left rounded-full bg-pomodoro"
          animate={{ transform: `scaleX(${steps / 3})` }}
          transition={{ duration: 0.5, ease: out }}
        />
      </div>

      <ul className="mt-6 min-h-[8.5rem] space-y-3 border-b border-dashed border-inchiostro/25 pb-5" aria-live="polite">
        <AnimatePresence initial={false} mode="popLayout">
          {lines.length === 0 && (
            <motion.li
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              exit={{ opacity: 0 }}
              className="font-serif text-xl italic"
            >
              La comanda è ancora vuota. Scegli dal menù qui accanto.
            </motion.li>
          )}
          {lines.map((l) => (
            <motion.li
              key={l.key}
              layout
              initial={{ opacity: 0, transform: 'translateX(-12px)', filter: 'blur(3px)' }}
              animate={{ opacity: 1, transform: 'translateX(0px)', filter: 'blur(0px)' }}
              exit={{ opacity: 0, transform: 'translateX(12px)', transition: { duration: 0.15 } }}
              transition={{ duration: 0.35, ease: out }}
              className="flex items-baseline gap-3"
            >
              <span className="text-sm font-semibold opacity-60">{l.qty}</span>
              <span className="font-serif text-2xl leading-tight italic">{l.name}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <div className="mt-5 flex items-baseline justify-between">
        <span className="text-sm font-semibold tracking-wide uppercase">A persona</span>
        <span className="font-display text-5xl font-extrabold tracking-tight [font-stretch:80%]">{site.tastingPrice} €</span>
      </div>
      <p className="mt-1 text-xs opacity-60">Antipasto, primo e acqua. Famiglie e gruppi di amici: chiedi dei prezzi speciali.</p>

      <button
        onClick={onBook}
        className="mt-7 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-pomodoro text-base font-semibold text-panna transition-[transform,background-color] duration-150 ease-out hover:bg-pomodoro-scuro active:scale-[0.98]"
      >
        {steps === 3 ? 'Prenota con questa comanda' : 'Prenota un tavolo'}
        <i className="ri-arrow-right-up-line" aria-hidden />
      </button>
      <p className="mt-3 text-center text-xs opacity-55">Puoi anche scegliere al tavolo: la comanda è un promemoria.</p>
    </div>
  )
}

/* ---------- Indice della pasta ---------- */

function PastaIndex() {
  const fine = useMedia('(hover: hover) and (pointer: fine)')
  const [hover, setHover] = useState<Dish | null>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 220, damping: 26, mass: 0.6 })
  const sy = useSpring(my, { stiffness: 220, damping: 26, mass: 0.6 })
  // la foto si inclina nella direzione in cui muovi il mouse
  const rot = useSpring(useTransform(useVelocity(sx), [-1600, 1600], [-14, 14], { clamp: true }), { stiffness: 140, damping: 16 })

  return (
    <div
      className="relative mx-auto max-w-[1400px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
      onPointerMove={(e) => {
        if (!fine) return
        mx.set(e.clientX)
        my.set(e.clientY)
      }}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="max-w-[12ch] font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.92] font-bold tracking-[-0.035em] [font-stretch:80%]">
          La pasta, <span className="font-serif font-normal text-[var(--accent)] italic">una per una</span>
        </h2>
        <p className="max-w-sm text-base leading-relaxed opacity-75">
          Tutti i formati che escono dal nostro laboratorio, con i condimenti che li accompagnano. Gli antipasti sono nel menù
          degustazione qui sopra.
        </p>
      </div>

      <ol className="mt-14 border-t border-[var(--line)]" onPointerLeave={() => setHover(null)}>
        {primi.map((d, i) => (
          <motion.li
            key={d.id}
            initial={{ opacity: 0, transform: 'translateY(20px)' }}
            whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.6, ease: out, delay: (i % 3) * 0.05 }}
            onPointerEnter={() => setHover(d)}
            className="group grid grid-cols-[2.5rem_1fr_5.5rem] items-start gap-4 border-b border-[var(--line)] py-6 sm:grid-cols-[3.5rem_1fr_7rem] lg:grid-cols-[4rem_1.1fr_1fr] lg:items-center lg:py-8"
          >
            <span className="pt-2 text-sm font-semibold tabular-nums opacity-50 lg:pt-0">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3 className="font-display text-[clamp(1.9rem,4vw,3.5rem)] leading-[0.95] font-bold tracking-[-0.02em] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] [font-stretch:80%] lg:group-hover:translate-x-3">
                {d.name}
                {d.veg && <i className="ri-leaf-line ml-2 align-middle text-2xl text-oliva" aria-label="vegetariano" />}
              </h3>
              {d.note && <p className="mt-1 font-serif text-lg italic opacity-75">{d.note}</p>}
              <p className="mt-2 max-w-md text-sm leading-relaxed opacity-70 lg:hidden">{d.desc}</p>
              {d.options && (
                <ul className="mt-3 flex flex-wrap gap-1.5 lg:hidden">
                  {d.options.map((o) => (
                    <li key={o} className="rounded-full border border-current/20 px-2.5 py-1 text-xs">
                      {o}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="lg:hidden">
              {d.image && (
                <div className="aspect-square overflow-hidden rounded-2xl">
                  <Img name={d.image} alt="" sizes="120px" />
                </div>
              )}
            </div>
            <div className="hidden lg:block">
              <p className="text-base leading-relaxed opacity-75">{d.desc}</p>
              {d.options && (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {d.options.map((o) => (
                    <li key={o} className="rounded-full border border-current/20 px-3 py-1 text-sm">
                      {o}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.li>
        ))}
      </ol>

      {/* Foto che segue il cursore sulle righe, solo con mouse */}
      {fine && (
        <motion.div aria-hidden className="pointer-events-none fixed top-0 left-0 z-30" style={{ x: sx, y: sy, rotate: rot }}>
          <div className="absolute -top-36 -left-24 h-60 w-48">
          <AnimatePresence>
            {hover?.image && (
              <motion.div
                key={hover.id}
                className="absolute inset-0 overflow-hidden rounded-2xl shadow-2xl"
                initial={{ opacity: 0, transform: 'scale(.85) rotate(-6deg)' }}
                animate={{ opacity: 1, transform: 'scale(1) rotate(-3deg)' }}
                exit={{ opacity: 0, transform: 'scale(.9) rotate(2deg)', transition: { duration: 0.15 } }}
                transition={{ duration: 0.3, ease: out }}
              >
                <Img name={hover.image} alt="" sizes="200px" />
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </motion.div>
      )}
    </div>
  )
}

/* ---------- Dolci, digestivi, chiusura ---------- */

function Sweets() {
  const { open } = useBooking()
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="grid gap-14 lg:grid-cols-2">
        <List title="Dolci" items={dolci} />
        <List title="Digestivi" items={digestivi} />
      </div>

      <div className="mt-16 flex items-start gap-4 rounded-3xl border border-[var(--line)] p-6 sm:p-8">
        <i className="ri-alert-line text-2xl text-[var(--accent)]" aria-hidden />
        <p className="max-w-2xl text-base leading-relaxed">
          <strong className="font-semibold">Allergie o intolleranze?</strong> Diccelo quando prenoti o appena ti siedi: in cucina
          prepariamo tutto noi e sappiamo cosa c’è in ogni piatto.
        </p>
      </div>

      <div className="mt-24 text-center">
        <p className="font-display text-[clamp(3rem,10vw,8.5rem)] leading-[0.88] font-extrabold tracking-[-0.04em] [font-stretch:76%]">
          Hai già <span className="font-serif font-normal text-[var(--accent)] italic">fame?</span>
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={() => open()}
            className="inline-flex h-14 items-center gap-2 rounded-full bg-pomodoro px-8 text-base font-semibold text-panna transition-[transform,background-color] duration-150 ease-out hover:bg-pomodoro-scuro active:scale-[0.97]"
          >
            Prenota un tavolo <i className="ri-arrow-right-up-line" aria-hidden />
          </button>
          <TLink
            to="/"
            label="Casa"
            className="inline-flex h-14 items-center gap-2 rounded-full border border-current/25 px-8 text-base font-semibold transition-[transform,border-color] duration-150 ease-out hover:border-current/60 active:scale-[0.97]"
          >
            <i className="ri-arrow-left-line" aria-hidden /> Torna alla giornata
          </TLink>
        </div>
      </div>
    </div>
  )
}

function List({ title, items }: { title: string; items: Dish[] }) {
  return (
    <div>
      <h2 className="font-display text-5xl font-bold tracking-tight [font-stretch:80%]">{title}</h2>
      <ul className="mt-6 border-t border-[var(--line)]">
        {items.map((d) => (
          <li key={d.id} className="flex items-baseline justify-between gap-6 border-b border-[var(--line)] py-4">
            <span className="font-serif text-3xl italic">{d.name}</span>
            {d.desc && <span className="text-right text-sm opacity-60">{d.desc}</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}
