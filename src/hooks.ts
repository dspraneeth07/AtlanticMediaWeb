import { useEffect, useRef, useState } from 'react'

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

/** Fires once when the element first enters the viewport. */
export function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, inView])
  return { ref, inView }
}

/** Animates 0 → target once `start` becomes true. */
export function useCountUp(target: number, start: boolean, duration = 1800) {
  const reduced = usePrefersReducedMotion()
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start || reduced) return
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration)
      setValue(target * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, start, duration, reduced])
  return reduced && start ? target : value
}

/** Section id currently under the nav, for active-link highlighting. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.35
      // Nav order doesn't match page order, so pick the passed section closest to the line.
      let current: string | null = null
      let best = -Infinity
      for (const id of ids) {
        const top = document.getElementById(id)?.getBoundingClientRect().top
        if (top !== undefined && top <= line && top > best) {
          best = top
          current = id
        }
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids])
  return active
}

/**
 * Scroll progress (0→1) of an element through the viewport, written to a CSS
 * custom property on the element so styles can animate without re-rendering.
 * `start`/`end` are viewport fractions where progress begins and completes,
 * measured against the element's top edge.
 */
export function useScrollVar<T extends HTMLElement>(name: string, start = 1, end = 0, onChange?: (p: number) => void) {
  const ref = useRef<T>(null)
  const cb = useRef(onChange)
  useEffect(() => {
    cb.current = onChange
  })
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const top = el.getBoundingClientRect().top
      const vh = window.innerHeight
      const p = Math.min(1, Math.max(0, (start * vh - top) / ((start - end) * vh)))
      el.style.setProperty(name, p.toFixed(4))
      cb.current?.(p)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [name, start, end])
  return ref
}

/** Mouse drag-to-scroll for horizontal scrollers (touch keeps native scrolling). */
export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [dragging, setDragging] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let down = false, moved = false, x0 = 0, left0 = 0
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return
      down = true; moved = false; x0 = e.clientX; left0 = el.scrollLeft
    }
    const onMove = (e: PointerEvent) => {
      if (!down) return
      const dx = e.clientX - x0
      if (!moved && Math.abs(dx) > 5) { moved = true; setDragging(true); el.setPointerCapture(e.pointerId) }
      if (moved) el.scrollLeft = left0 - dx
    }
    const onUp = () => { down = false; if (moved) setTimeout(() => setDragging(false), 0) }
    // swallow the click that ends a drag so cards/links don't activate
    const onClick = (e: MouseEvent) => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false } }
    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerup', onUp)
    el.addEventListener('pointercancel', onUp)
    el.addEventListener('click', onClick, true)
    return () => {
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointercancel', onUp)
      el.removeEventListener('click', onClick, true)
    }
  }, [])
  const scrollByCards = (dir: 1 | -1, selector: string) => {
    const el = ref.current
    const card = el?.querySelector<HTMLElement>(selector)
    if (!el || !card) return
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: 'smooth' })
  }
  return { ref, dragging, scrollByCards }
}
