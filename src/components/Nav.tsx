import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS, CONTACT_EMAIL } from '../data'
import { useActiveSection } from '../hooks'
import { Arrow } from './ui'

const HOME_SECTIONS = ['services'] as const

export function Logo({ className = '' }: { className?: string }) {
  return (
    <img src="/brand/logo-white.png" alt="Atlantic Media" className={`logo ${className}`} width="360" height="240" />
  )
}

/** Which nav item is current: page routes by pathname, "Services" by scroll position on home. */
function useCurrent() {
  const { pathname } = useLocation()
  const section = useActiveSection(HOME_SECTIONS)
  return (to: string) => {
    if (to.startsWith('/#')) return pathname === '/' && section === to.slice(2)
    return pathname === to || pathname.startsWith(to + '/') || (to === '/blogs' && pathname.startsWith('/blog/'))
  }
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const isCurrent = useCurrent()
  const { pathname } = useLocation()

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      // hide on scroll down, reveal on scroll up
      setHidden(y > 400 && y > last + 4 ? true : y < last - 4 ? false : (h) => h)
      last = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`nav ${scrolled || pathname !== '/' ? 'nav--scrolled' : ''} ${hidden && !open ? 'nav--hidden' : ''}`}>
      <div className="nav__inner container">
        <Link to="/" aria-label="Atlantic Media — home">
          <Logo />
        </Link>
        <nav aria-label="Primary" className="nav__links">
          {NAV_LINKS.map((l) => {
            const current = isCurrent(l.to)
            return (
              <Link key={l.to} to={l.to} className={`link-sweep ${current ? 'is-active' : ''}`} aria-current={current ? 'page' : undefined}>
                {l.label}
              </Link>
            )
          })}
        </nav>
        <Link className="btn-contact" to="/contact">
          Contact Us <Arrow />
        </Link>
        <button className="burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-menu" className={`overlay ${open ? 'is-open' : ''}`} hidden={!open}>
        <nav aria-label="Mobile" className="overlay__links">
          {[{ to: '/', label: 'Home' }, ...NAV_LINKS, { to: '/contact', label: 'Contact Us' }].map((l, i) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} style={{ transitionDelay: `${80 + i * 50}ms` }}>
              {l.label}
            </Link>
          ))}
        </nav>
        <a className="overlay__email" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
      </div>
    </header>
  )
}
