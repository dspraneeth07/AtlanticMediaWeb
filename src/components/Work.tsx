import { Link } from 'react-router-dom'
import { useRef, useState, type KeyboardEvent } from 'react'
import { ADDRESS, CASE_STUDIES, CLIENTS, CLIENT_SECTORS, CONTACT_EMAIL, NAV_LINKS, PHONES, PROCESS, SOCIALS, TAGLINE, type CaseStudy } from '../data'
import { useDragScroll, useScrollVar } from '../hooks'
import { Arrow, BrandMark, ClientLogo, Hook, InViewVideo, Reveal, SectionTag, SocialIcon } from './ui'
import { Logo } from './Nav'

function CaseCard({ c, i }: { c: CaseStudy; i: number }) {
  const [open, setOpen] = useState(false)
  return (
    <li className={`case ${open ? 'is-open' : ''}`}>
      <article className="case__card" aria-labelledby={`case-title-${i}`}>
        <div className="case__logo">
          <BrandMark {...c.brand} />
        </div>
        <p className="case__desc">{c.desc}</p>
        <Link to={`/work/${c.slug}`} className="case__link">
          View case study <Arrow />
        </Link>
        <dl className="case__meta">
          <div>
            <dt>Title</dt>
            <dd id={`case-title-${i}`}>{c.title}</dd>
          </div>
          <div>
            <dt>Brand</dt>
            <dd>{c.brand.name}</dd>
          </div>
          <div>
            <dt>Published</dt>
            <dd>{c.date}</dd>
          </div>
        </dl>
      </article>
      {/* Video drawer: the side handle slides the campaign film over the card */}
      <div className="case__drawer">
        <button className="case__handle" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? `Close ${c.title} video` : `Watch ${c.title} video`}>
          <span className="case__dot" />
          <span className="case__dot" />
        </button>
        <div className="case__video-wrap" aria-hidden={!open}>
          {c.video ? (
            <InViewVideo src={c.video} poster={c.poster} className="case__video" paused={!open} label={`${c.title} campaign film`} />
          ) : (
            <img src={c.poster} alt={`${c.title} campaign still`} className="case__video" loading="lazy" />
          )}
          <span className="case__video-title">{c.title}</span>
        </div>
      </div>
    </li>
  )
}

export function CaseStudies({ items = CASE_STUDIES, title = 'See how we have delivered', light = true }: { items?: CaseStudy[]; title?: string; light?: boolean } = {}) {
  const { ref, dragging, scrollByCards } = useDragScroll<HTMLUListElement>()
  return (
    <section className={`cases section ${light ? 'theme-light' : ''}`} aria-labelledby="cases-h">
      <div className="container">
        <SectionTag>Case studies</SectionTag>
        <Reveal as="h2" className="h2 h2--sm">
          <span id="cases-h">{title}</span>
        </Reveal>
      </div>
      <div className="container cases__viewport">
        <ul ref={ref} className={`cases__track ${dragging ? 'is-dragging' : ''}`} aria-label="Case studies">
          {items.map((c, i) => (
            <CaseCard key={c.title} c={c} i={i} />
          ))}
        </ul>
      </div>
      <div className="container cases__foot">
        <div className="cases__arrows">
          <button className="sq-btn sq-btn--lg" onClick={() => scrollByCards(-1, '.case')} aria-label="Previous case study">
            <Arrow className="flip-x" />
          </button>
          <button className="sq-btn sq-btn--lg" onClick={() => scrollByCards(1, '.case')} aria-label="Next case study">
            <Arrow />
          </button>
        </div>
        <Link to="/work" className="see-more">
          <Hook /> See More
        </Link>
      </div>
    </section>
  )
}

const TABS = ['All', ...CLIENT_SECTORS] as const

/** Client wall: real client logos, filterable by sector. */
export function Clientele() {
  const [tab, setTab] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const onKey = (e: KeyboardEvent, i: number) => {
    const n = TABS.length
    const next = e.key === 'ArrowRight' ? (i + 1) % n : e.key === 'ArrowLeft' ? (i - 1 + n) % n : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : -1
    if (next < 0) return
    e.preventDefault()
    setTab(next)
    tabRefs.current[next]?.focus()
  }
  const list = tab === 0 ? CLIENTS : CLIENTS.filter((c) => c.sector === TABS[tab])

  return (
    <section id="clients" className="press section theme-light">
      <div className="container">
        <SectionTag>Our clientele</SectionTag>
        <Reveal as="h2" className="h2 h2--sm">
          Brands that grow with Atlantic Media
        </Reveal>
        <p className="press__lead">
          A diverse clientele keeps us inventive — anticipating what each brand needs and turning their vision into something real.
        </p>
        <div role="tablist" aria-label="Client sectors" className="tabs">
          {TABS.map((t, i) => (
            <button
              key={t}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              role="tab"
              id={`client-tab-${i}`}
              aria-selected={tab === i}
              aria-controls="client-panel"
              tabIndex={tab === i ? 0 : -1}
              className={`tab ${tab === i ? 'is-active' : ''}`}
              onClick={() => setTab(i)}
              onKeyDown={(e) => onKey(e, i)}
            >
              {t}
            </button>
          ))}
        </div>
        <ul id="client-panel" role="tabpanel" aria-labelledby={`client-tab-${tab}`} className="client-wall" key={tab}>
          {list.map((c) => (
            <li key={c.name}>
              <ClientLogo client={c} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function CtaBand() {
  // --c: lines light up one after another as the band scrolls through
  const ref = useScrollVar<HTMLElement>('--c', 0.85, 0.2)
  return (
    <section className="cta section" ref={ref}>
      <div className="container">
        <p className="cta__lines">
          {PROCESS.map((l, i) => (
            <span key={l.title} className="cta__line" style={{ ['--k' as string]: i }}>
              {l.title}.
            </span>
          ))}
        </p>
        <p className="cta__copy">It’s your turn to join the digital revolution — let’s make your brand the next big thing online.</p>
        <Link to="/contact" className="neo-btn">
          <span>Connect with us</span>
        </Link>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <Link to="/" aria-label="Atlantic Media — home">
              <Logo className="logo--lg" />
            </Link>
            <p className="footer__tag">{TAGLINE}</p>
            <a className="footer__mail" href={`mailto:${CONTACT_EMAIL}`}>
              <svg width="36" height="36" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              <span className="link-sweep">{CONTACT_EMAIL}</span>
            </a>
            <p className="footer__phones">
              {PHONES.map((ph) => (
                <a key={ph} href={`tel:${ph.replace(/\s/g, '')}`} className="link-sweep">
                  {ph}
                </a>
              ))}
            </p>
          </div>
          <div className="footer__right">
            <nav aria-label="Footer" className="footer__links">
              <Link className="link-sweep" to="/">Home</Link>
              {NAV_LINKS.filter((l) => !l.to.startsWith('/#')).map((l) => (
                <Link key={l.to} className="link-sweep" to={l.to}>
                  {l.label}
                </Link>
              ))}
              <Link className="link-sweep" to="/contact">Contact</Link>
            </nav>
            <address className="footer__address">
              {ADDRESS.lines.map((l) => (
                <span key={l}>{l}</span>
              ))}
              <a href={ADDRESS.map} target="_blank" rel="noopener noreferrer" className="link-sweep">
                View on map ↗
              </a>
            </address>
          </div>
        </div>

        <ul className="footer__socials">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a href={s.href} className="sq-btn" aria-label={s.label} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                <SocialIcon icon={s.icon} />
              </a>
            </li>
          ))}
        </ul>
        <div className="footer__legal">
          <Link className="link-sweep" to="/privacy-policy">Privacy Policy</Link>
          <Link className="link-sweep" to="/terms">Terms of Service</Link>
        </div>

        <div className="footer__bar">
          <p>
            Copyright © Atlantic Media {new Date().getFullYear()}. All Rights Reserved <span className="accent">—</span> {TAGLINE}
          </p>
          <button className="to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Page Top <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  )
}
