import { motion } from 'framer-motion'
import { useState } from 'react'
import Img from '../components/Img'
import { site } from '../data/site'
import { useTone } from '../lib/hooks'

export default function Sogno() {
  const tone = useTone<HTMLElement>('notte')
  return (
    <section ref={tone} aria-labelledby="sogno-title" className="py-28 lg:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-7">
          <p className="text-sm font-medium tracking-wide uppercase opacity-60">Raccolta fondi</p>
          <h2
            id="sogno-title"
            className="mt-4 font-display text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.9] font-bold tracking-[-0.035em] [font-stretch:80%]"
          >
            Il nostro sogno ha <span className="font-serif font-normal text-[var(--accent)] italic">nove posti</span>
          </h2>

          <Seats />

          <p className="mt-10 max-w-xl text-lg leading-relaxed opacity-80">
            Ci serve un pulmino da 9 posti, sicuro e spazioso, per portare la squadra a eventi, aziende e famiglie che ci
            aspettano. Più viaggi vogliono dire più persone incontrate e più occasioni di lavoro.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            <Copy label="Bonifico · IBAN" value={site.iban} sub={`${site.bank} · BIC ${site.bic}`} />
            <Copy label="5×1000 · Codice fiscale" value={site.vat} sub="Firma nella dichiarazione dei redditi" />
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(40px) rotate(2deg)' }}
            whileInView={{ opacity: 1, transform: 'translateY(0px) rotate(-2deg)' }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="aspect-[4/5] overflow-hidden rounded-[2rem]"
          >
            <Img name="tre-furgone" alt="Tre ragazzi della squadra al bancone del furgone" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(40px) rotate(-4deg)' }}
            whileInView={{ opacity: 1, transform: 'translateY(0px) rotate(5deg)' }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.15 }}
            className="absolute -bottom-8 -left-4 aspect-square w-40 overflow-hidden rounded-3xl border-4 border-notte sm:w-52"
          >
            <Img name="nonno-sorriso" alt="Un cliente sorride al bancone del furgone" sizes="220px" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Nove sedili che si accendono uno dopo l'altro
function Seats() {
  return (
    <div className="mt-8 flex flex-wrap gap-2" aria-label="9 posti">
      {Array.from({ length: 9 }, (_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.15, transform: 'translateY(8px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 0.2 + i * 0.07 }}
          className="grid size-12 place-items-center rounded-2xl bg-[var(--line)] text-2xl text-[var(--accent)] sm:size-14"
          aria-hidden
        >
          <i className="ri-user-smile-line" />
        </motion.span>
      ))}
    </div>
  )
}

function Copy({ label, value, sub }: { label: string; value: string; sub: string }) {
  const [done, setDone] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value.replace(/\s/g, ''))
      setDone(true)
      setTimeout(() => setDone(false), 1800)
    } catch {
      /* clipboard non disponibile: il valore resta leggibile e selezionabile */
    }
  }
  return (
    <div className="rounded-3xl border border-[var(--line)] p-5">
      <p className="text-xs tracking-wide uppercase opacity-60">{label}</p>
      <p className="mt-2 font-mono text-[15px] break-all select-all">{value}</p>
      <p className="mt-1 text-xs opacity-55">{sub}</p>
      <button
        onClick={copy}
        className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-[var(--fg)] px-4 text-sm font-semibold text-[var(--bg)] transition-transform duration-150 ease-out active:scale-[0.96]"
      >
        <i className={done ? 'ri-check-line' : 'ri-file-copy-line'} aria-hidden />
        <span aria-live="polite">{done ? 'Copiato' : 'Copia'}</span>
      </button>
    </div>
  )
}
