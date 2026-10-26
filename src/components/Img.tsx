import { img } from '../data/site'

type Props = {
  name: string
  alt: string
  className?: string
  sizes?: string
  eager?: boolean
}

export default function Img({ name, alt, className = '', sizes = '(min-width: 1024px) 40vw, 90vw', eager }: Props) {
  const { src, srcSet } = img(name)
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
      className={`block h-full w-full object-cover ${className}`}
    />
  )
}
