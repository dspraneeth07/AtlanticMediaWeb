import { useState } from 'react'
import { CREATORS, type Creator } from '../data'
import { useInView } from '../hooks'
import { MetricCounter, Reveal, SectionTag, SocialIcon } from '../components/ui'
import { EmptyState, FilterSelect, SearchInput } from '../components/pageui'

const GENRES = [...new Set(CREATORS.map((c) => c.niche))].sort()

/**
 * Hero "creator stack": on load every portrait card drops in from the top and
 * settles into a tilted diagonal stack. Hovering (or focusing) a card pushes it
 * out to the right, and its details card appears in the empty space bottom-right.
 */
function CreatorFlow() {
  const [active, setActive] = useState<number | null>(null)
  const n = CREATORS.length
  return (
    <>
      <div className={`flow ${active !== null ? 'is-paused' : ''}`}>
        <ul className="flow__list" aria-label="Featured creators">
          {CREATORS.map((c, i) => (
            <li key={c.name} className="flow__item" style={{ ['--i' as string]: i, ['--n' as string]: n }}>
              <button
                className={`flow__frame ${active === i ? 'is-active' : ''}`}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                aria-label={`${c.name}, ${c.niche} creator from ${c.city}`}
              >
                <img src={c.img} alt="" loading={i < 6 ? 'eager' : 'lazy'} draggable={false} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* details cards: one per creator, only the hovered one is visible */}
      <div className="flow-details" aria-live="polite">
        {CREATORS.map((c, i) => (
          <div key={c.name} className={`flow-card ${active === i ? 'is-on' : ''}`} aria-hidden={active !== i}>
            <p className="flow-card__top">
              <span>{c.niche}</span>
              <span>{c.city}</span>
            </p>
            <img src={c.img} alt="" loading="lazy" />
            <p className="flow-card__name">{c.name}</p>
          </div>
        ))}
      </div>

      {/* tablet/mobile: the details cards loop horizontally instead */}
      <div className="flow-mobile" aria-hidden="true">
        <div className="flow-mobile__track">
          {[...CREATORS, ...CREATORS].map((c, i) => (
            <div key={i} className="flow-card is-on">
              <p className="flow-card__top">
                <span>{c.niche}</span>
                <span>{c.city}</span>
              </p>
              <img src={c.img} alt="" loading="lazy" />
              <p className="flow-card__name">{c.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

const CLIPS = [
  { text: <>Representing <b>100+</b> creators</>, track: 0, start: 12, width: 50 },
  { text: <>The <b>best</b> in every genre</>, track: 2, start: 25, width: 46 },
  { text: <>Built for <b>the feed</b></>, track: 4, start: 21, width: 30 },
]

/** Video-editor timeline: ruler, playhead sweep and caption clips. */
function Timeline() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3)
  const ticks = Array.from({ length: 36 })
  return (
    <div ref={ref} className={`timeline ${inView ? 'is-in' : ''}`} aria-hidden="true">
      <div className="timeline__ruler">
        {ticks.map((_, i) => (
          <span key={i} className={`timeline__tick ${i % 5 === 0 ? 'is-major' : ''}`}>
            {i % 5 === 0 && <em>00:{String(i).padStart(2, '0')}</em>}
          </span>
        ))}
      </div>
      <div className="timeline__progress" />
      <div className="timeline__tracks">
        {Array.from({ length: 6 }).map((_, t) => (
          <div key={t} className="timeline__track">
            <span className="timeline__ctrl">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
              V{6 - t}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>
              <i>M</i>
              {t > 1 && <i>S</i>}
            </span>
          </div>
        ))}
        {CLIPS.map((c, i) => (
          <span
            key={i}
            className="timeline__clip"
            style={{ ['--track' as string]: c.track, ['--start' as string]: `${c.start}%`, ['--d' as string]: `${300 + i * 250}ms` }}
          >
            {c.text}
          </span>
        ))}
        <span className="timeline__playhead" />
      </div>
    </div>
  )
}

function RosterCard({ c, start }: { c: Creator; start: boolean }) {
  return (
    <li className="roster-card">
      <div className="roster-card__img">
        <img src={c.img} alt={`${c.name}, ${c.niche.toLowerCase()} creator`} loading="lazy" width="600" height="750" />
        <span className="roster-card__genre">{c.niche}</span>
      </div>
      <div className="roster-card__body">
        <span className="roster-card__pill">
          <span className="dot" aria-hidden="true" /> {c.bio.split(' ').slice(0, 3).join(' ').replace(/[,.]$/, '')}
        </span>
        <p className="roster-card__name">{c.name}</p>
        <p className="roster-card__city">{c.city}</p>
      </div>
      <dl className="roster-card__stats">
        {c.views !== '—' && (
          <div>
            <dt>
              <SocialIcon icon="youtube" />
              <span className="visually-hidden">YouTube views</span>
            </dt>
            <dd><MetricCounter value={c.views} start={start} /></dd>
          </div>
        )}
        {c.followers !== '—' && (
          <div>
            <dt>
              <SocialIcon icon="instagram" />
              <span className="visually-hidden">Instagram followers</span>
            </dt>
            <dd><MetricCounter value={c.followers} start={start} /></dd>
          </div>
        )}
      </dl>
    </li>
  )
}

export function CreatorsPage() {
  const [genre, setGenre] = useState('')
  const [query, setQuery] = useState('')
  const { ref, inView } = useInView<HTMLDivElement>(0.05)
  const q = query.trim().toLowerCase()
  const list = CREATORS.filter((c) => (!genre || c.niche === genre) && (!q || `${c.name} ${c.city} ${c.niche}`.toLowerCase().includes(q)))

  return (
    <>
      <section className="creators-hero theme-light">
        <div className="container creators-hero__grid">
          <Reveal as="h1" className="page-title page-title--dark">
            Creators
            <br />
            Without <span className="accent-dark">Limits</span>
          </Reveal>
          <CreatorFlow />
        </div>
      </section>

      <section className="section creators-intro">
        <div className="container">
          <SectionTag>Creators</SectionTag>
          <Reveal as="p" className="creators-intro__lead">
            For years we’ve spotted talent before the internet catches on — and backed the creators shaping what media looks like next.
          </Reveal>
          <Timeline />
        </div>
      </section>

      <section className="section roster" aria-labelledby="roster-h">
        <div className="container">
          <h2 id="roster-h" className="visually-hidden">Creator roster</h2>
          <div className="filters filters--roster">
            <FilterSelect label="Filter by genre" value={genre} options={GENRES} allLabel="Select Genre" onChange={setGenre} />
            <SearchInput label="Search creators" value={query} onChange={setQuery} />
          </div>
          <p className="results-count" aria-live="polite">
            {list.length} {list.length === 1 ? 'creator' : 'creators'}
          </p>
          <div ref={ref}>
            {list.length ? (
              <ul className="roster__grid">
                {list.map((c) => (
                  <RosterCard key={c.name} c={c} start={inView} />
                ))}
              </ul>
            ) : (
              <EmptyState onReset={() => { setGenre(''); setQuery('') }}>No creators match that search.</EmptyState>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
