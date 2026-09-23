import { useEffect, useState } from 'react'
import { ABOUT_PAGE, CONTACT_EMAIL, PROCESS } from '../data'
import { useCountUp, useInView, usePrefersReducedMotion } from '../hooks'
import { Reveal } from '../components/ui'

function Stat({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4)
  const n = useCountUp(value, inView)
  return (
    <div ref={ref} className="stat stat--light">
      <p className="stat__label">
        <span className="stat__dash" aria-hidden="true" />
        {label}
      </p>
      <p className="stat__num" aria-label={`${value}${suffix} ${label}`}>
        <span aria-hidden="true">
          {Math.round(n)}
          {suffix}
        </span>
      </p>
    </div>
  )
}

const STEP_ICONS: Record<string, React.ReactNode> = {
  compass: <><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5z" /></>,
  lock: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>,
  star: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />,
}

const AUTOPLAY_MS = 3500

/** Auto-looping photo slider: every few seconds the next photo fades in over the last. */
function PhotoSlider() {
  const { photos } = ABOUT_PAGE
  const n = photos.length
  const reduced = usePrefersReducedMotion()
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (reduced || paused) return
    const t = setInterval(() => setCurrent((c) => (c + 1) % n), AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [reduced, paused, n])

  return (
    <div className="about-slider" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="photo-stack">
        <span className="photo-stack__ghost photo-stack__ghost--1" aria-hidden="true" />
        <span className="photo-stack__ghost photo-stack__ghost--2" aria-hidden="true" />
        <div className="photo-stack__frame" aria-roledescription="carousel" aria-label="Life at Atlantic Media">
          {photos.map((p, i) => (
            <div key={p.src} className={`photo-stack__slide ${i === current ? 'is-active' : ''}`} aria-hidden={i !== current}>
              <img src={p.src} alt={p.alt} />
            </div>
          ))}
        </div>
      </div>
      <div className="about-hero__row">
        <Reveal as="p" className="about-hero__intro">
          {ABOUT_PAGE.intro}
        </Reveal>
        <div className="thumbs" role="group" aria-label="Choose photo">
          {photos.map((p, i) => (
            <button key={p.src} className={`thumbs__btn ${i === current ? 'is-active' : ''}`} onClick={() => setCurrent(i)} aria-pressed={i === current} aria-label={`Show photo ${i + 1}: ${p.alt}`}>
              <img src={p.src} alt="" />
              <span className="thumbs__label">{p.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <div className="container">
          <PhotoSlider />
          <Reveal as="h1" className="about-hero__title">
            Your Brand, Amplified.
            <br />
            Elevated. Unstoppable.
          </Reveal>
          <hr className="divider" />
        </div>
      </section>

      <div className="inset">
        <section className="inset__panel about-story" aria-labelledby="about-us-h">
          <div className="about-story__grid">
            <div>
              <h2 id="about-us-h" className="h2">About Us</h2>
              {ABOUT_PAGE.story.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <Reveal className="about-story__img">
              <img src={ABOUT_PAGE.storyImage.src} alt={ABOUT_PAGE.storyImage.alt} loading="lazy" />
            </Reveal>
          </div>
        </section>

        <section className="inset__panel about-stats" aria-label="Atlantic Media in numbers">
          {ABOUT_PAGE.stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </section>
      </div>

      <section className="section awards" aria-labelledby="process-h">
        <div className="container">
          <Reveal as="h2" className="h2">
            <span id="process-h">How we work</span>
          </Reveal>
          <ul className="awards__list awards__list--3">
            {PROCESS.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 80} className="award">
                <span className="award__badge">
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                    {STEP_ICONS[step.icon]}
                  </svg>
                </span>
                <p className="award__title">
                  0{i + 1} — {step.title}
                </p>
                <p className="award__event">{step.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section theme-light careers">
        <div className="container careers__inner">
          <p className="careers__kicker">
            <span aria-hidden="true">🚀</span> Join our team
          </p>
          <Reveal as="h2" className="h2 careers__title">
            We’re always looking for relentless talent to help us set the pace.
          </Reveal>
          <a className="pill-dark" href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Careers at Atlantic Media')}`}>
            Get in Touch
          </a>
        </div>
      </section>
    </>
  )
}
