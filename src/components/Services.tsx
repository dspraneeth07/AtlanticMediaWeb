import { useState } from 'react'
import { SERVICES } from '../data'
import { Hook, InViewVideo, Reveal, SectionTag } from './ui'

/**
 * Desktop: full-width panels that stick and stack over each other while scrolling,
 * alternating yellow/white. Mobile: accordion (title toggles the details).
 */
export function Services() {
  const [open, setOpen] = useState(0)
  return (
    <section id="services" className="services theme-light">
      <div className="container services__head">
        <SectionTag>Services</SectionTag>
        <Reveal as="h2" className="h2">
          What we offer?
        </Reveal>
      </div>

      <ol className="svc-list">
        {SERVICES.map((s, i) => {
          const isOpen = open === i
          return (
            <li key={s.title} className={`svc ${i % 2 === 0 ? 'svc--yellow' : ''} ${isOpen ? 'is-open' : ''}`} style={{ ['--i' as string]: i }}>
              <div className="container svc__grid">
                <div className="svc__content">
                  <h3 className="svc__title">
                    <button
                      className="svc__trigger"
                      aria-expanded={isOpen}
                      aria-controls={`svc-details-${i}`}
                      id={`svc-trigger-${i}`}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                    >
                      {s.title}
                      <span className="svc__toggle" aria-hidden="true" />
                    </button>
                  </h3>
                  <div id={`svc-details-${i}`} className="svc__details" role="region" aria-labelledby={`svc-trigger-${i}`}>
                    <div className="svc__details-inner">
                      <p className="svc__body">{s.body}</p>
                      <ul className="svc__bullets">
                        {s.bullets.map((b) => (
                          <li key={b}>
                            <Hook /> {b}
                          </li>
                        ))}
                      </ul>
                      <div className="svc__media svc__media--mobile">
                        <InViewVideo src={s.video} poster={s.poster} className="svc__video" label={s.label} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="svc__media svc__media--desktop">
                  <InViewVideo src={s.video} poster={s.poster} className="svc__video" label={s.label} />
                  <span className="svc__index">0{i + 1}</span>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
