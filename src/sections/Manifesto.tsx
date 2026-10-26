import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Img from '../components/Img'
import { site, team } from '../data/site'
import { useTone } from '../lib/hooks'

const quote = site.igBio.split(' ')
const crew = team.cucina.length + team.sala.length + team.musica.length

export default function Manifesto() {
  const tone = useTone<HTMLElement>('basilico')

  return (
    <section ref={tone} aria-labelledby="perche" className="relative pt-32 pb-24 lg:pt-48">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <h2 id="perche" className="text-sm font-medium tracking-wide uppercase opacity-60">
          Perché esiste Casa da Sergio
        </h2>
        <p className="mt-8 max-w-[18ch] font-display text-[clamp(2.6rem,7.2vw,7rem)] leading-[0.95] font-bold tracking-[-0.035em] [font-stretch:80%]">
          {quote.slice(0, -1).join(' ')}{' '}
          <span className="font-serif font-normal text-[var(--accent)] italic">{quote[quote.length - 1]}</span>
        </p>
        <p className="mt-6 text-sm opacity-60">Dalla bio di @casadasergio</p>
      </div>

      <TeamFrame />

      <div className="mx-auto mt-16 grid max-w-[1400px] gap-10 px-5 sm:px-8 md:grid-cols-3 lg:px-12">
        <Fact big="Tipo B" text="Cooperativa sociale Onlus, nata per dare lavoro a giovani e persone con abilità diverse." />
        <Fact big={String(crew)} text="Nomi nei crediti del nostro menù, tra cucina, sala e chitarra." />
        <Fact big={site.ratings.google.value} text={`Su ${site.ratings.google.count} recensioni Google. Su TripAdvisor, stesso voto.`} />
      </div>
    </section>
  )
}

// La foto di squadra parte stretta e si apre fino ai bordi mentre scorri
function TeamFrame() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const clipPath = useTransform(scrollYProgress, [0, 1], ['inset(0% 14% 0% 14% round 40px)', 'inset(0% 0% 0% 0% round 0px)'])
  const transform = useTransform(scrollYProgress, [0, 1], ['scale(1.25)', 'scale(1)'])

  return (
    <div ref={ref} className="mt-20 lg:mt-28">
      <motion.div style={{ clipPath }} className="relative h-[70svh] overflow-hidden lg:h-[88svh]">
        <motion.div style={{ transform }} className="h-full">
          <Img name="team-braccia" alt="La squadra di Casa da Sergio esulta con le braccia alzate in sala" sizes="100vw" />
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6 pt-24 text-panna sm:p-10">
          <p className="max-w-xl font-serif text-2xl leading-snug italic sm:text-3xl">
            Dalla scelta della farina alla cassa: ogni passaggio è un’occasione per imparare.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

function Fact({ big, text }: { big: string; text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, transform: 'translateY(20px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className="border-t border-[var(--line)] pt-5"
    >
      <p className="font-display text-6xl font-extrabold tracking-tight [font-stretch:75%]">{big}</p>
      <p className="mt-3 max-w-xs text-base leading-relaxed opacity-75">{text}</p>
    </motion.div>
  )
}
