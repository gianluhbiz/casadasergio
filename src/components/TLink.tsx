import type { MouseEvent, ReactNode } from 'react'
import { usePageTransition } from '../lib/transition-context'

type Props = {
  to: string
  label: string
  className?: string
  children: ReactNode
  'aria-label'?: string
}

// Link che passa dalla transizione a sfoglia; ctrl/cmd-click resta un link normale
export default function TLink({ to, label, className, children, ...rest }: Props) {
  const { go } = usePageTransition()
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    let { clientX: x, clientY: y } = e
    if (x === 0 && y === 0) {
      const r = e.currentTarget.getBoundingClientRect()
      x = r.left + r.width / 2
      y = r.top + r.height / 2
    }
    go(to, label, { x, y })
  }
  return (
    <a href={to} onClick={onClick} className={className} {...rest}>
      {children}
    </a>
  )
}
