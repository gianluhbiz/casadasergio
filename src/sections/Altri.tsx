import { motion } from 'framer-motion'
import Img from '../components/Img'
import { useTone } from '../lib/hooks'
import { waLink } from '../lib/whatsapp'

const ways = [
  {
    kicker: 'Da asporto',
    title: 'Portaci a casa',
    text: 'Ravioli, cappelletti, gnocchi e olive all’ascolana, freschi o surgelati. Passa in laboratorio, oppure chiedici se consegniamo nella tua zona.',
    cta: 'Ordina su WhatsApp',
    msg: 'Ciao Casa da Sergio! Vorrei ordinare pasta fresca da portare a casa. Cosa avete oggi?',
    main: 'olive-vaschetta',
    mainAlt: 'Vaschetta di olive all’ascolana appena fritte',
    small: 'borsa',
    smallAlt: 'La borsa di Casa da Sergio appesa a uno sgabello',
  },
  {
    kicker: 'Eventi',
    title: 'Il furgone alla tua festa',
    text: 'Compleanni, feste in famiglia, eventi aziendali. Arriviamo col furgone e friggiamo sul posto, con la squadra al completo.',
    cta: 'Chiedi la disponibilità',
    msg: 'Ciao Casa da Sergio! Vorrei informazioni per avere il furgone a un evento. Data: … Persone: …',
    main: 'team-finestra',
    mainAlt: 'La squadra affacciata alla finestra del furgone',
    small: 'fritti-vaschette',
    smallAlt: 'Vaschette di fritti pronte sul bancone del furgone',
  },
]

export default function Altri() {
  const tone = useTone<HTMLElement>('sfoglia')
  return (
    <section ref={tone} id="altri" aria-labelledby="altri-title" className="py-28 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <p className="text-sm font-medium tracking-wide uppercase opacity-60">Non solo a tavola</p>
        <h2
          id="altri-title"
          className="mt-4 max-w-[16ch] font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.92] font-bold tracking-[-0.035em] [font-stretch:80%]"
        >
          Altri due modi per <span className="font-serif font-normal text-[var(--accent)] italic">assaggiarci</span>
        </h2>

        <div className="mt-14 flex flex-col gap-5 lg:h-[78svh] lg:flex-row">
          {ways.map((w, i) => (
            <motion.article
              key={w.title}
              initial={{ opacity: 0, transform: 'translateY(40px)' }}
              whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: i * 0.1 }}
              className="group relative flex min-h-[34rem] flex-1 flex-col justify-end overflow-hidden rounded-[2rem] text-panna transition-[flex-grow] duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] lg:min-h-0 lg:hover:grow-[1.5]"
            >
              <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]">
                <Img name={w.main} alt={w.mainAlt} sizes="(min-width:1024px) 60vw, 95vw" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute top-5 right-5 aspect-[3/4] w-28 rotate-3 overflow-hidden rounded-2xl border-4 border-panna shadow-xl transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-[-2deg] sm:w-36">
                <Img name={w.small} alt={w.smallAlt} sizes="150px" />
              </div>
              <div className="relative p-6 sm:p-9">
                <p className="font-serif text-xl text-sfoglia italic">{w.kicker}</p>
                <h3 className="mt-1 font-display text-4xl leading-none font-bold tracking-tight [font-stretch:80%] sm:text-5xl">{w.title}</h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-panna/85">{w.text}</p>
                <a
                  href={waLink(w.msg)}
                  target="_blank"
                  rel="noopener"
                  className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-panna px-6 text-sm font-semibold text-inchiostro transition-transform duration-150 ease-out active:scale-[0.97]"
                >
                  <i className="ri-whatsapp-line text-lg" aria-hidden /> {w.cta}
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
