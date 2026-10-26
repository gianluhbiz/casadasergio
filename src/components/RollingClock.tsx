// Cifre che rotolano come un contatore meccanico. Solo transform + transizione CSS:
// se l'ora cambia a metà corsa, riparte dal punto in cui si trova.
export default function RollingClock({ time, className = '' }: { time: string; className?: string }) {
  return (
    <span className={`inline-flex font-display leading-none font-extrabold tabular-nums [font-stretch:75%] ${className}`} aria-label={time}>
      {time.split('').map((ch, i) =>
        /\d/.test(ch) ? (
          <span key={i} aria-hidden className="relative inline-block h-[1em] overflow-hidden">
            <span
              className="flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] motion-reduce:duration-0"
              style={{ transform: `translateY(-${Number(ch) * 10}%)`, transitionDelay: `${i * 50}ms` }}
            >
              {Array.from({ length: 10 }, (_, d) => (
                <span key={d} className="block h-[1em]">
                  {d}
                </span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i} aria-hidden className="inline-block animate-pulse px-[0.02em] opacity-60 motion-reduce:animate-none">
            {ch}
          </span>
        ),
      )}
    </span>
  )
}
