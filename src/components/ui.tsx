import { useEffect, useRef, type ReactNode, type ElementType } from 'react'
import { useInView, useCountUp, usePrefersReducedMotion } from '../hooks'
import type { Brand, BrandStyle, Client } from '../data'

export function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  className = '',
}: {
  children: ReactNode
  as?: ElementType
  delay?: number
  className?: string
}) {
  const { ref, inView } = useInView<HTMLElement>(0.15)
  return (
    <Tag ref={ref} className={`reveal ${inView ? 'is-in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  )
}

/** "> LABEL" tagline followed by a hairline divider, as used at the top of every section. */
export function SectionTag({ children }: { children: ReactNode }) {
  return (
    <Reveal className="section-tag">
      <p className="eyebrow">
        <span aria-hidden="true">&gt;</span> {children}
      </p>
      <hr className="divider" />
    </Reveal>
  )
}

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg className={`arrow ${className}`} width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

/** The "↳" bullet glyph. */
export function Hook() {
  return (
    <svg className="hook" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 3v11h14M15 10l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

export function Plus() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

/** Parses "4.2M" / "850K" and counts up to it, keeping the suffix. */
export function MetricCounter({ value, start }: { value: string; start: boolean }) {
  const m = value.match(/^([\d.]+)\s*([KMB]?)$/i)
  const target = m ? parseFloat(m[1]) : 0
  const current = useCountUp(target, start && !!m, 1400)
  if (!m) return <>{value}</>
  const decimals = (m[1].split('.')[1] ?? '').length
  return (
    <>
      {current.toFixed(decimals)}
      {m[2].toUpperCase()}
    </>
  )
}

const MARKS: Record<NonNullable<Brand['mark']>, ReactNode> = {
  dot: <circle cx="12" cy="12" r="7" fill="currentColor" />,
  ring: <circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" strokeWidth="3.5" />,
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7z" fill="currentColor" />,
  leaf: <path d="M20 4C9 4 4 9 4 20c11 0 16-5 16-16zM4 20l9-9" fill="currentColor" stroke="var(--bg-mark, #000)" strokeWidth="1.5" />,
  star: <path d="M12 2l2.6 7.4H22l-6 4.6 2.3 7.5L12 17l-6.3 4.5L8 14 2 9.4h7.4z" fill="currentColor" />,
  square: <rect x="4" y="4" width="16" height="16" rx="3" fill="currentColor" />,
}

/** Placeholder brand wordmark. Rendered as text so it stays crisp and themable. */
export function BrandMark({ name, style, mark, color }: { name: string; style: BrandStyle; mark?: Brand['mark']; color?: string }) {
  return (
    <span className={`bm bm--${style}`} style={color ? ({ ['--brand' as string]: color }) : undefined}>
      {mark && (
        <svg className="bm__mark" viewBox="0 0 24 24" aria-hidden="true">
          {MARKS[mark]}
        </svg>
      )}
      <span className="bm__name">{name}</span>
    </span>
  )
}

/**
 * Muted looping video that only loads/plays while on screen (saves bandwidth
 * and CPU with many clips on the page). Respects reduced-motion by showing the poster.
 */
export function InViewVideo({ src, poster, className = '', label, muted = true, paused = false }: { src: string; poster: string; className?: string; label?: string; muted?: boolean; paused?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null)
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = muted
  }, [muted])
  useEffect(() => {
    const v = ref.current
    if (!v || reduced) return
    let visible = false
    const sync = () => {
      if (visible && !paused) v.play().catch(() => {})
      else v.pause()
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible && v.preload === 'none') v.preload = 'auto'
      sync()
    }, { rootMargin: '200px 0px' })
    io.observe(v)
    sync()
    return () => io.disconnect()
  }, [reduced, paused])
  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  )
}

const SOCIAL_PATHS: Record<string, ReactNode> = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.3" fill="currentColor" />
    </>
  ),
  youtube: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4" fill="currentColor" />
      <path d="M10 9l5 3-5 3z" fill="var(--bg)" />
    </>
  ),
  x: <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="2.2" />,
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor" />
      <path d="M7.5 10v7M7.5 7v.01M11 17v-7M11 13c0-2 1.2-3 2.8-3S16.5 11 16.5 13v4" stroke="var(--bg)" strokeWidth="2" fill="none" />
    </>
  ),
}

export function SocialIcon({ icon }: { icon: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      {SOCIAL_PATHS[icon]}
    </svg>
  )
}

/** Real client logo on a light tile: greyscale by default, full colour on hover. */
export function ClientLogo({ client }: { client: Client }) {
  return (
    <span className="client-tile">
      <img src={client.logo} alt={client.name} loading="lazy" draggable={false} />
    </span>
  )
}
