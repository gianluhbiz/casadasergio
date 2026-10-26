import { site } from '../data/site'
import { Mark } from './Logo'
import TLink from './TLink'

export default function Footer() {
  return (
    <footer className="relative bg-inchiostro px-5 pt-20 pb-[calc(7rem+env(safe-area-inset-bottom,0px))] text-farina sm:px-8 md:pb-12 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Mark className="size-12 text-farina" />
            <p className="mt-6 max-w-md font-serif text-3xl leading-tight italic">{site.motto}.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-6 text-sm sm:grid-cols-3">
            <div>
              <p className="mb-2 text-xs tracking-wide uppercase opacity-50">Pagine</p>
              <TLink to="/" label="Casa" className="block py-1 hover:underline">
                La giornata
              </TLink>
              <TLink to="/menu" label="Menù" className="block py-1 hover:underline">
                Il menù
              </TLink>
            </div>
            <div>
              <p className="mb-2 text-xs tracking-wide uppercase opacity-50">Contatti</p>
              <a href={site.phoneHref} className="block py-1 hover:underline">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="block py-1 hover:underline">
                {site.email}
              </a>
            </div>
            <div>
              <p className="mb-2 text-xs tracking-wide uppercase opacity-50">Seguici</p>
              <a href={site.instagram} target="_blank" rel="noopener" className="flex items-center gap-2 py-1 hover:underline">
                <i className="ri-instagram-line" aria-hidden /> Instagram
              </a>
              <a href={site.facebook} target="_blank" rel="noopener" className="flex items-center gap-2 py-1 hover:underline">
                <i className="ri-facebook-circle-line" aria-hidden /> Facebook
              </a>
            </div>
          </div>
        </div>

        <p
          aria-hidden
          className="mt-16 font-display text-[22vw] leading-[0.8] font-extrabold tracking-[-0.06em] text-farina/10 [font-stretch:75%] lg:text-[17vw]"
        >
          da sergio
        </p>

        <div className="mt-8 flex flex-col gap-2 border-t border-farina/15 pt-6 text-xs opacity-55 sm:flex-row sm:justify-between">
          <p>
            {site.legalName} · P.IVA {site.vat}
          </p>
          <p>
            {site.address}, {site.city}
          </p>
        </div>
      </div>
    </footer>
  )
}
