import { useState } from 'react'
import { CASE_STUDIES, INDUSTRIES } from '../data'
import { Clientele } from '../components/Work'
import { Reveal } from '../components/ui'
import { EmptyState, FilterSelect, PageTitle, ProjectCard, SearchInput } from '../components/pageui'

const PAGE_SIZE = 4

export function WorkPage() {
  const [industry, setIndustry] = useState('')
  const [query, setQuery] = useState('')
  const [shown, setShown] = useState(PAGE_SIZE)
  const featured = CASE_STUDIES.filter((c) => c.featured).slice(0, 2)

  const q = query.trim().toLowerCase()
  const results = CASE_STUDIES.filter(
    (c) => (!industry || c.industry === industry) && (!q || `${c.title} ${c.brand.name} ${c.desc} ${c.industry}`.toLowerCase().includes(q)),
  )

  const reset = () => {
    setIndustry('')
    setQuery('')
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <PageTitle lead="Explore our Latest" accent="Work" />
          <ul className="projects projects--featured">
            {featured.map((c) => (
              <ProjectCard key={c.slug} c={c} large />
            ))}
          </ul>
        </div>
      </section>

      <section className="section work-list" aria-labelledby="work-list-h">
        <div className="container">
          <Reveal as="h2" className="h2 h2--sm">
            <span id="work-list-h">Where brands meet the moment</span>
          </Reveal>
          <div className="filters">
            <FilterSelect label="Filter by industry" value={industry} options={INDUSTRIES} allLabel="Select Industry" onChange={(v) => { setIndustry(v); setShown(PAGE_SIZE) }} />
            <SearchInput label="Search projects" value={query} onChange={(v) => { setQuery(v); setShown(PAGE_SIZE) }} />
          </div>
          <p className="results-count" aria-live="polite">
            {results.length} {results.length === 1 ? 'project' : 'projects'}
          </p>
          {results.length ? (
            <ul className="projects">
              {results.slice(0, shown).map((c) => (
                <ProjectCard key={c.slug} c={c} />
              ))}
            </ul>
          ) : (
            <EmptyState onReset={reset}>No projects match those filters yet.</EmptyState>
          )}
          {shown < results.length && (
            <div className="show-more">
              <button className="show-more__btn" onClick={() => setShown((n) => n + PAGE_SIZE)}>
                <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 3v11h14M15 10l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" />
                </svg>
                Show More Projects
              </button>
            </div>
          )}
        </div>
      </section>

      <Clientele />
    </>
  )
}
