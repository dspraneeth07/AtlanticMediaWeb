import { Link } from 'react-router-dom'
import { useState } from 'react'
import { CREATORS, SOCIALS, type Creator } from '../data'
import { useDragScroll, useInView, useScrollVar } from '../hooks'
import { Arrow, MetricCounter, Plus, SectionTag, SocialIcon } from './ui'

const HEADLINE = 'PRIOR is our matchmaker for brands and creators — opening doors, building long-term relationships and helping talent grow.'

/** Words brighten one after another as the heading scrolls into view. */
export function ScrollText({ text }: { text: string }) {
  const ref = useScrollVar<HTMLHeadingElement>('--t', 0.9, 0.35)
  const words = text.split(' ')
  return (
    <h2 ref={ref} className="scroll-text" aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" style={{ ['--w' as string]: i / words.length }}>
          {w}{' '}
        </span>
      ))}
    </h2>
  )
}

function Eye() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
function Users() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="8" r="4" />
      <path d="M2 21c0-4 3-6 7-6s7 2 7 6M16 4a4 4 0 0 1 0 8M22 21c0-3-1.5-5-4-5.7" />
    </svg>
  )
}

export function CreatorCard({ c, i, start }: { c: Creator; i: number; start: boolean }) {
  const [flipped, setFlipped] = useState(false)
  const id = `creator-${i}`
  return (
    <li className={`cc ${flipped ? 'is-flipped' : ''} ${i % 2 ? 'cc--tall' : ''}`}>
      <div className="cc__inner">
        <div className="cc__face cc__front" aria-hidden={flipped}>
          <img src={c.img} alt={`${c.name}, ${c.niche.toLowerCase()} creator`} loading="lazy" width="600" height="750" className="cc__img" />
          <div className="cc__shade" aria-hidden="true" />
          <div className="cc__info">
            <div className="cc__tags">
              <span className="cc__tag">
                <Users /> <MetricCounter value={c.followers} start={start} />
              </span>
              <span className="cc__tag">
                <Eye /> <MetricCounter value={c.views} start={start} />
              </span>
            </div>
            <div className="cc__row">
              <div>
                <p className="cc__name">{c.name}</p>
                <p className="cc__city">{c.city}</p>
              </div>
              <button className="cc__btn" onClick={() => setFlipped(true)} aria-label={`About ${c.name}`} aria-controls={id} tabIndex={flipped ? -1 : 0}>
                <Plus />
              </button>
            </div>
          </div>
        </div>
        <div className="cc__face cc__back" id={id} aria-hidden={!flipped}>
          <p className="cc__niche">{c.niche}</p>
          <p className="cc__name">{c.name}</p>
          <p className="cc__bio">{c.bio}</p>
          <dl className="cc__stats">
            <div>
              <dt>Followers</dt>
              <dd>{c.followers}</dd>
            </div>
            <div>
              <dt>Total views</dt>
              <dd>{c.views}</dd>
            </div>
          </dl>
          <div className="cc__socials">
            {SOCIALS.slice(0, 2).map((s) => (
              <a key={s.label} href={s.href} className="sq-btn" aria-label={`${c.name} on ${s.label}`} tabIndex={flipped ? 0 : -1}>
                <SocialIcon icon={s.icon} />
              </a>
            ))}
          </div>
          <button className="cc__back-btn" onClick={() => setFlipped(false)} tabIndex={flipped ? 0 : -1}>
            <Arrow className="flip-x" /> Back
          </button>
        </div>
      </div>
    </li>
  )
}

export function Creators() {
  const { ref: viewRef, inView } = useInView<HTMLDivElement>(0.1)
  const { ref, dragging, scrollByCards } = useDragScroll<HTMLUListElement>()
  return (
    <section id="creators" className="creators section">
      <div className="container">
        <SectionTag>PRIOR Exclusives</SectionTag>
        <ScrollText text={HEADLINE} />
        <div className="creators__ctrls">
          <button className="sq-btn sq-btn--lg" onClick={() => scrollByCards(-1, '.cc')} aria-label="Previous creators">
            <Arrow className="flip-x" />
          </button>
          <button className="sq-btn sq-btn--lg" onClick={() => scrollByCards(1, '.cc')} aria-label="Next creators">
            <Arrow />
          </button>
        </div>
      </div>
      <div ref={viewRef} className="container creators__wrap">
        <ul ref={ref} className={`creators__grid ${dragging ? 'is-dragging' : ''}`} aria-label="Creator roster">
          {CREATORS.map((c, i) => (
            <CreatorCard key={c.name} c={c} i={i} start={inView} />
          ))}
        </ul>
      </div>
      <div className="creators__more">
        <Link to="/creators" className="underline-link">
          View all Creators
        </Link>
      </div>
    </section>
  )
}
