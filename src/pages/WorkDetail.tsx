import { useParams } from 'react-router-dom'
import { CASE_STUDIES } from '../data'
import { BrandMark, Hook, InViewVideo, Reveal } from '../components/ui'
import { ProjectCard } from '../components/pageui'
import { NotFoundPage } from './NotFound'
import { useEffect } from 'react'

export function WorkDetailPage() {
  const { slug } = useParams()
  const c = CASE_STUDIES.find((x) => x.slug === slug)
  useEffect(() => {
    if (c) document.title = `${c.title} for ${c.brand.name} — Atlantic Media`
  }, [c])
  if (!c) return <NotFoundPage />
  const more = CASE_STUDIES.filter((x) => x.slug !== c.slug).slice(0, 2)

  return (
    <>
      <section className="detail-hero">
        <div className="detail-hero__swirl" aria-hidden="true" />
        <div className="container container--narrow">
          <Reveal className="section-tag">
            <p className="eyebrow">
              <span aria-hidden="true">&gt;</span> {c.tagline}
            </p>
            <hr className="divider" />
          </Reveal>
          <Reveal as="h1" className="detail-title">
            {c.title} for {c.brand.name}
          </Reveal>
          <hr className="divider" />
          <dl className="metrics">
            <div className="metrics__brand" style={{ color: c.brand.color }}>
              <BrandMark {...c.brand} />
            </div>
            {c.metrics.map((m, i) => (
              <div key={m.label} className="metric">
                <dt>{m.label}</dt>
                <dd className={i === 0 ? 'accent' : ''}>{m.value}</dd>
              </div>
            ))}
          </dl>
          <div className="detail-media">
            {c.video ? (
              <InViewVideo src={c.video} poster={c.poster} className="detail-media__el" label={`${c.title} campaign film`} />
            ) : (
              <img src={c.poster} alt={`${c.title} campaign still`} className="detail-media__el" />
            )}
          </div>
        </div>
      </section>

      <section className="section theme-light detail-about">
        <div className="container container--narrow detail-about__grid">
          <Reveal className="detail-about__img">
            <img src={c.still} alt={`Behind the scenes of ${c.title}`} loading="lazy" />
          </Reveal>
          <Reveal delay={120} className="detail-about__text">
            {c.story.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
            <ul className="highlights">
              {c.highlights.map((h) => (
                <li key={h.title}>
                  <strong>{h.title}:</strong> {h.text}
                </li>
              ))}
            </ul>
            <dl className="detail-facts">
              <div><dt>Brand</dt><dd>{c.brand.name}</dd></div>
              <div><dt>Industry</dt><dd>{c.industry}</dd></div>
              <div><dt>Published</dt><dd>{c.date}</dd></div>
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="section theme-light more">
        <div className="container container--narrow">
          <h2 className="h2 h2--sm more__title">
            <Hook /> Read More Success Stories
          </h2>
          <ul className="projects">
            {more.map((m) => (
              <ProjectCard key={m.slug} c={m} />
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
