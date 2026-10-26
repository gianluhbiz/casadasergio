import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, type ReactNode } from 'react'
import Img from '../components/Img'
import RollingClock from '../components/RollingClock'
import TLink from '../components/TLink'
import { site, team } from '../data/site'
import { setTone, useCenterLine, type Tone } from '../lib/hooks'

type Photo = { name: string; alt: string; at: string; note: string; shape: 'land' | 'port' }
type Chapter = { time: string; tone: Tone; title: string; text: string; photos: Photo[]; extra?: 'team' | 'menu' | 'truck' | 'reviews' }

const chapters: Chapter[] = [
  {
    time: '09:00',
    tone: 'farina',
    title: 'Si accende il laboratorio',
    text: 'Farina, uova, mattarello. La mattina si impasta e si tira la sfoglia a mano: tagliatelle, stringozzi, tortelloni, gnocchi.',
    photos: [
      { name: 'mani-tagliere', alt: 'Mani che lavorano la pasta sul tagliere', at: '09:04', note: 'mani in pasta', shape: 'land' },
      { name: 'sfoglia-cappello', alt: 'Una cuoca preme la sfoglia con le mani', at: '09:18', note: 'la sfoglia si allarga', shape: 'port' },
      { name: 'setaccio', alt: 'Gnocchi passati al setaccio', at: '09:31', note: 'setaccio', shape: 'port' },
      { name: 'impasto-ciotola', alt: 'Un ragazzo col cappello da cuoco impasta in una ciotola', at: '09:40', note: 'impasto', shape: 'land' },
      { name: 'sfoglia-gialla', alt: 'Sfoglia all’uovo gialla stesa sul banco', at: '09:52', note: 'giallo uovo', shape: 'port' },
    ],
  },
  {
    time: '11:00',
    tone: 'sfoglia',
    title: 'Chi c’è in cucina',
    text: 'Giovani e persone con abilità diverse, ognuno col suo compito. Qui si impara il mestiere intero, dalla materia prima al piatto in tavola.',
    extra: 'team',
    photos: [
      { name: 'ritratto-foulard', alt: 'Ragazza con foulard a fiori sorride in cucina', at: '11:02', note: 'buongiorno', shape: 'land' },
      { name: 'sfoglia-sorriso', alt: 'Ragazza che stende la sfoglia sorridendo', at: '11:15', note: 'concentrazione', shape: 'port' },
      { name: 'team-abbraccio', alt: 'Tre ragazzi abbracciati col pollice alzato', at: '11:26', note: 'pollici in su', shape: 'land' },
      { name: 'lab-ragazza', alt: 'Ragazza al lavoro sul banco del laboratorio', at: '11:38', note: 'si chiude un tortello', shape: 'port' },
      { name: 'ritratto-occhiali', alt: 'Ragazzo con occhiali e cappello da cuoco sorride', at: '11:50', note: 'pronti', shape: 'land' },
    ],
  },
  {
    time: '13:00',
    tone: 'sugo',
    title: 'Si mangia',
    text: `Ogni giorno tre primi di stagione con la nostra pasta fresca. Con antipasto e acqua, il menù degustazione costa ${site.tastingPrice} €.`,
    extra: 'menu',
    photos: [
      { name: 'mezze-maniche', alt: 'Mezze maniche alla carbonara', at: '13:05', note: 'mezze maniche, carbonara', shape: 'port' },
      { name: 'gnocchi', alt: 'Gnocchi con guanciale croccante', at: '13:12', note: 'gnocchi e guanciale', shape: 'land' },
      { name: 'tortelloni-verdi', alt: 'Tortelloni verdi su crema di cavolo nero', at: '13:20', note: 'tortelloni XXL', shape: 'land' },
      { name: 'frittura-ardesia', alt: 'Olive all’ascolana e cremini fritti', at: '13:24', note: 'frittura delle Marche', shape: 'port' },
      { name: 'ravioli', alt: 'Raviolo su crema verde con guanciale', at: '13:41', note: 'ravioli', shape: 'land' },
    ],
  },
  {
    time: '18:30',
    tone: 'tramonto',
    title: 'Il furgone tra gli ulivi',
    text: 'Nelle sere d’estate e agli eventi apriamo il furgone in giardino. Olive all’ascolana, cremini e friggitelle, serviti caldi nel cono.',
    extra: 'truck',
    photos: [
      { name: 'friggitrice-versa', alt: 'Fritti versati dal cestello nella vaschetta', at: '18:33', note: 'appena scolati', shape: 'land' },
      { name: 'coni-tramonto', alt: 'Coni di fritti passati di mano al tramonto', at: '18:47', note: 'controluce', shape: 'land' },
      { name: 'oliva-mano', alt: 'Un’oliva all’ascolana tenuta tra le dita', at: '18:52', note: 'un’oliva sola', shape: 'land' },
      { name: 'risata-pinze', alt: 'Ragazza che ride con le pinze in mano', at: '19:05', note: 'servizio', shape: 'land' },
      { name: 'furgone-ulivo', alt: 'Il furgone bianco decorato in giardino', at: '19:20', note: 'il furgone', shape: 'land' },
    ],
  },
  {
    time: '21:00',
    tone: 'notte',
    title: 'Sotto l’ulivo',
    text: 'Mattia suona, i tavoli si allungano, passa il cane presidente Oz. Tante recensioni cominciano con «trovato per caso» e finiscono con «torneremo».',
    extra: 'reviews',
    photos: [
      { name: 'chitarra', alt: 'Ragazzo con occhiali che suona la chitarra in giardino', at: '21:02', note: 'Mattia attacca', shape: 'land' },
      { name: 'giardino-tavoli', alt: 'Tavoli in giardino con persone sedute', at: '21:10', note: 'tavolata', shape: 'land' },
      { name: 'team-oz', alt: 'La squadra in giardino con un dalmata', at: '21:24', note: 'foto di gruppo', shape: 'land' },
      { name: 'abbraccio', alt: 'Due persone si abbracciano davanti al furgone', at: '21:37', note: 'abbracci', shape: 'land' },
      { name: 'cin-cin', alt: 'Un cono di fritti passato dal furgone a un cliente', at: '21:45', note: 'cin cin', shape: 'land' },
    ],
  },
]

export default function Day() {
  const [active, setActive] = useState(0)
  const c = chapters[active]

  const jump = (i: number) => document.getElementById(`ora-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })

  return (
    <section id="giornata" aria-label="Una giornata da Sergio" className="relative">
      {/* Orologio mobile, appiccicato in alto */}
      <div className="sticky top-[4.75rem] z-30 px-5 lg:hidden">
        <div className="flex items-center gap-3 rounded-full bg-[color-mix(in_oklab,var(--bg)_82%,transparent)] py-2 pr-4 pl-4 shadow-[0_1px_0_var(--line)] backdrop-blur-xl transition-colors duration-700">
          <RollingClock time={c.time} className="text-2xl" />
          <span className="truncate text-sm font-medium opacity-75">{c.title}</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:grid lg:grid-cols-12 lg:gap-10 lg:px-12">
        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-0 flex h-svh flex-col justify-center pt-16">
            <p className="text-sm font-medium tracking-wide uppercase opacity-60">Una giornata da Sergio</p>
            <RollingClock time={c.time} className="-ml-2 text-[clamp(7rem,13vw,12.5rem)]" />
            <div className="relative mt-4 min-h-[16rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, transform: 'translateY(14px)', filter: 'blur(4px)' }}
                  animate={{ opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)' }}
                  exit={{ opacity: 0, transform: 'translateY(-10px)', filter: 'blur(4px)', transition: { duration: 0.18 } }}
                  transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                >
                  <ChapterText c={c} />
                </motion.div>
              </AnimatePresence>
            </div>
            <Rail active={active} onJump={jump} />
          </div>
        </div>

        <div className="lg:col-span-7">
          {chapters.map((ch, i) => (
            <ChapterBlock key={ch.time} c={ch} i={i} onActive={() => setActive(i)} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ChapterText({ c }: { c: Chapter }) {
  return (
    <>
      <h2 className="font-display text-[clamp(2.4rem,4.2vw,3.75rem)] leading-[0.95] font-bold tracking-[-0.03em] text-balance [font-stretch:82%]">
        {c.title}
      </h2>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-pretty opacity-80">{c.text}</p>
      <Extra kind={c.extra} />
    </>
  )
}

function Extra({ kind }: { kind?: Chapter['extra'] }) {
  if (kind === 'team')
    return (
      <div className="mt-6 max-w-md space-y-2 text-sm">
        <Names label="In cucina" names={team.cucina} />
        <Names label="In sala" names={team.sala} />
        <Names label="Alla chitarra" names={team.musica} />
      </div>
    )
  if (kind === 'menu')
    return (
      <TLink
        to="/menu"
        label="Menù"
        className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-inchiostro px-6 text-sm font-semibold text-panna transition-transform duration-150 ease-out active:scale-[0.97]"
      >
        Sfoglia il menù <i className="ri-arrow-right-line" aria-hidden />
      </TLink>
    )
  if (kind === 'truck')
    return (
      <a
        href="#altri"
        className="mt-6 inline-flex h-12 items-center gap-2 rounded-full border border-current/30 px-6 text-sm font-semibold transition-[transform,border-color] duration-150 ease-out hover:border-current active:scale-[0.97]"
      >
        Il furgone alla tua festa <i className="ri-arrow-down-line" aria-hidden />
      </a>
    )
  if (kind === 'reviews')
    return (
      <a href="#recensioni" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold underline decoration-current/30 underline-offset-4 hover:decoration-current">
        {site.ratings.google.value} ★ su {site.ratings.google.count} recensioni Google <i className="ri-arrow-down-line" aria-hidden />
      </a>
    )
  return null
}

function Names({ label, names }: { label: string; names: string[] }) {
  return (
    <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      <span className="w-24 shrink-0 text-xs tracking-wide uppercase opacity-55">{label}</span>
      {names.map((n) => (
        <span key={n} className="font-serif text-xl italic">
          {n}
        </span>
      ))}
    </p>
  )
}

function Rail({ active, onJump }: { active: number; onJump: (i: number) => void }) {
  return (
    <ol className="mt-10 flex gap-1.5" aria-label="Ore della giornata">
      {chapters.map((ch, i) => (
        <li key={ch.time} className="flex-1">
          <button
            onClick={() => onJump(i)}
            aria-current={i === active ? 'step' : undefined}
            className="group w-full pt-3 text-left text-xs font-medium tabular-nums"
          >
            <span className="block h-[3px] overflow-hidden rounded-full bg-[var(--line)]">
              <span
                className="block h-full origin-left rounded-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{ transform: `scaleX(${i <= active ? 1 : 0})` }}
              />
            </span>
            <span className={`mt-2 block transition-opacity duration-300 ${i === active ? 'opacity-100' : 'opacity-45 group-hover:opacity-80'}`}>
              {ch.time}
            </span>
          </button>
        </li>
      ))}
    </ol>
  )
}

// Collage desktop: posizioni pensate per alternare orizzontali e verticali
const spots: [string, string][] = [
  ['col-span-4', 'aspect-[4/3]'],
  ['col-span-2 mt-28', 'aspect-[3/4]'],
  ['col-span-2 col-start-1 -mt-6', 'aspect-[3/4]'],
  ['col-span-3 mt-24', 'aspect-[4/3]'],
  ['col-span-3 col-start-3 -mt-10', 'aspect-[4/3]'],
]
const spotsLand: [string, string][] = [
  ['col-span-4', 'aspect-[4/3]'],
  ['col-span-2 mt-28', 'aspect-[4/5]'],
  ['col-span-3 col-start-1 -mt-2', 'aspect-[4/3]'],
  ['col-span-3 mt-20', 'aspect-[5/4]'],
  ['col-span-4 col-start-2 -mt-6', 'aspect-[16/10]'],
]

function ChapterBlock({ c, i, onActive }: { c: Chapter; i: number; onActive: () => void }) {
  const ref = useCenterLine<HTMLDivElement>(() => {
    onActive()
    setTone(c.tone)
  })
  const allLand = c.photos.every((p) => p.shape === 'land')
  const layout = allLand ? spotsLand : spots

  return (
    <div ref={ref} id={`ora-${i}`} className="relative py-16 lg:py-[22vh]">
      {/* Testo del capitolo su mobile */}
      <div className="lg:hidden">
        <p className="font-display text-7xl leading-none font-extrabold tabular-nums opacity-15 [font-stretch:75%]">{c.time}</p>
        <div className="-mt-6">
          <ChapterText c={c} />
        </div>
      </div>

      {/* Striscia scorrevole su mobile */}
      <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] lg:hidden">
        {c.photos.map((p) => (
          <figure key={p.name} className="w-[78vw] max-w-sm shrink-0 snap-center">
            <div className="aspect-[4/5] overflow-hidden rounded-3xl">
              <Img name={p.name} alt={p.alt} sizes="80vw" />
            </div>
            <Caption p={p} />
          </figure>
        ))}
      </div>

      {/* Collage desktop */}
      <div className="hidden grid-cols-6 gap-5 lg:grid">
        {c.photos.map((p, k) => (
          <Parallax key={p.name} className={layout[k][0]} speed={[0.6, 1.4, 1, 1.8, 0.8][k]}>
            <Reveal className={layout[k][1]}>
              <Img name={p.name} alt={p.alt} sizes="(min-width:1024px) 30vw, 80vw" />
            </Reveal>
            <Caption p={p} />
          </Parallax>
        ))}
      </div>
    </div>
  )
}

function Caption({ p }: { p: Photo }) {
  return (
    <figcaption className="mt-2.5 flex items-baseline gap-2 text-sm">
      <span className="font-medium tabular-nums opacity-55">{p.at}</span>
      <span className="font-serif text-lg italic">{p.note}</span>
    </figcaption>
  )
}

function Parallax({ children, className, speed }: { children: ReactNode; className: string; speed: number }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [50 * speed, -50 * speed])
  const transform = useTransform(y, (v) => `translateY(${reduce ? 0 : v.toFixed(1)}px)`)
  return (
    <motion.figure ref={ref} className={className} style={{ transform }}>
      {children}
    </motion.figure>
  )
}

// La foto si scopre dal basso, come una tenda che si alza
function Reveal({ children, className }: { children: ReactNode; className: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={`overflow-hidden rounded-[1.75rem] ${className}`}
      initial={reduce ? { opacity: 0 } : { clipPath: 'inset(100% 0% 0% 0% round 28px)' }}
      whileInView={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0% round 28px)' }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1] }}
    >
      <motion.div
        className="h-full"
        initial={reduce ? false : { transform: 'scale(1.18)' }}
        whileInView={{ transform: 'scale(1)' }}
        viewport={{ once: true, margin: '0px 0px -12% 0px' }}
        transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
