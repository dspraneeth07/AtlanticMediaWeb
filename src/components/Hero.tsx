import { Link } from 'react-router-dom'
import { useState } from 'react'
import { CLIENTS, HERO } from '../data'
import { useScrollVar } from '../hooks'
import { ClientLogo, InViewVideo, Reveal } from './ui'

export function Marquee<T>({ items, render, className = '', label, vertical = false, reverse = false }: { items: T[]; render: (item: T, i: number) => React.ReactNode; className?: string; label: string; vertical?: boolean; reverse?: boolean }) {
  return (
    <div className={`marquee ${vertical ? 'marquee--v' : ''} ${reverse ? 'marquee--rev' : ''} ${className}`} role="region" aria-label={label}>
      <div className="marquee__track">
        <ul>{items.map(render)}</ul>
        {/* duplicate for a seamless loop; hidden from assistive tech */}
        <ul aria-hidden="true">{items.map(render)}</ul>
      </div>
    </div>
  )
}

function SoundIcon({ muted }: { muted: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor" stroke="none" />
      {muted ? <path d="M17 9l5 6M22 9l-5 6" /> : <path d="M17 8.5a5 5 0 0 1 0 7M19.5 6a8.5 8.5 0 0 1 0 12" />}
    </svg>
  )
}

export function Hero() {
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(true)
  const [expanded, setExpanded] = useState(false)
  // --p: 0 at page top → 1 after scrolling one viewport; drives the showreel expansion
  const ref = useScrollVar<HTMLElement>('--p', 0, -1, (p) => setExpanded(p > 0.6))

  return (
    <section id="top" className="hero" ref={ref}>
      <div className="hero__sticky">
        <div className="hero__glow" aria-hidden="true" />
        <div className="hero__grain" aria-hidden="true" />

        <div className="container hero__inner">
          <h1 className="hero__title">
            {HERO.title.map((line, i) => (
              <Reveal as="span" key={line} delay={80 + i * 120} className="hero__line">
                {line}
              </Reveal>
            ))}
          </h1>

          <div className="hero__bottom">
            <Reveal delay={350} className="hero__copy">
              <p className="hero__sub">{HERO.sub}</p>
              <Link to="/work" className="proof-link">
                The Proof is in the Work <span aria-hidden="true">👀</span>
              </Link>
            </Reveal>

            <figure className="reel">
              <div className="reel__frame">
                <InViewVideo src={HERO.video} poster={HERO.poster} className="reel__video" muted={muted} paused={!playing} label="Atlantic Media showreel" />
                <span className={`rec-chip ${expanded ? 'is-on' : ''}`}>
                  <span className="rec-dot" aria-hidden="true" /> {playing ? 'Recording' : 'Paused'}
                </span>
                <div className={`reel__ctrls ${expanded ? 'is-on' : ''}`}>
                  <button className="chip-btn" onClick={() => setPlaying((p) => !p)} aria-pressed={!playing}>
                    {playing ? 'Pause' : 'Play'}
                  </button>
                  <button className="chip-btn" onClick={() => setMuted((m) => !m)} aria-pressed={!muted}>
                    <SoundIcon muted={muted} /> {muted ? 'Play Sound' : 'Mute Sound'}
                  </button>
                </div>
              </div>
              <figcaption className="reel__cap">When brands give us the keys</figcaption>
            </figure>
          </div>
        </div>

        <Marquee
          className="hero__logos"
          label="Brands we work with"
          items={CLIENTS}
          render={(c) => (
            <li key={c.name} className="logo-cell">
              <ClientLogo client={c} />
            </li>
          )}
        />
      </div>
    </section>
  )
}
