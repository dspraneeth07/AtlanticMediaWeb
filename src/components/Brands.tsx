import { CLIENTS, STATS } from '../data'
import { useCountUp, useInView } from '../hooks'
import { ClientLogo, Reveal, SectionTag } from './ui'
import { Marquee } from './Hero'

function Stat({ value, suffix, label, sub }: (typeof STATS)[number]) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4)
  const n = useCountUp(value, inView)
  return (
    <div ref={ref} className="stat">
      <p className="stat__label">
        <span className="stat__dash" aria-hidden="true" />
        {label}
      </p>
      <p className="stat__num" aria-label={`${value.toLocaleString('en-US')}${suffix} ${label}`}>
        <span aria-hidden="true">
          {Math.round(n).toLocaleString('en-US')}
          {suffix}
        </span>
      </p>
      <p className="stat__sub">{sub}</p>
    </div>
  )
}

const half = Math.ceil(CLIENTS.length / 2)
const COL_A = CLIENTS.slice(0, half)
const COL_B = CLIENTS.slice(half)

export function Brands() {
  return (
    <section id="work" className="brands section">
      <div className="container">
        <SectionTag>Brands</SectionTag>
        <div className="brands__grid">
          <div className="brands__left">
            <Reveal as="h2" className="h2">
              Trusted by
              <br />
              Industry <span className="accent">Leaders.</span>
            </Reveal>
            <div className="stats">
              {STATS.map((s) => (
                <Stat key={s.label} {...s} />
              ))}
            </div>
          </div>
          <div className="brands__cols">
            {[COL_A, COL_B].map((col, i) => (
              <Marquee
                key={i}
                vertical
                reverse={i === 1}
                label={i === 0 ? 'Client brands' : 'More client brands'}
                items={col}
                render={(c) => (
                  <li key={c.name} className="logo-cell logo-cell--v">
                    <ClientLogo client={c} />
                  </li>
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
