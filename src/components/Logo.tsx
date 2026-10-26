export function Mark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <path
        d="M8 26 16 6l8 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="14.2" cy="20.4" r="2.4" className="fill-sfoglia" />
    </svg>
  )
}

export default function Logo() {
  return (
    <span className="flex items-center gap-2 whitespace-nowrap">
      <Mark className="size-8" />
      <span className="font-display text-lg leading-none font-semibold tracking-tight [font-stretch:85%]">
        casa <span className="font-serif text-xl font-normal italic">da</span> sergio
      </span>
    </span>
  )
}
