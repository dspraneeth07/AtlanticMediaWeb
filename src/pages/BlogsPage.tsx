import { useState } from 'react'
import { Link } from 'react-router-dom'
import { POSTS, POST_CATEGORIES } from '../data'
import { Reveal } from '../components/ui'
import { BlogCover, EmptyState, FilterSelect, PageTitle, PostCard, SearchInput } from '../components/pageui'

export function BlogsPage() {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')
  const [category, setCategory] = useState('')
  const [query, setQuery] = useState('')
  const featured = POSTS.find((p) => p.featured) ?? POSTS[0]

  const q = query.trim().toLowerCase()
  const list = POSTS.filter((p) => (!category || p.category === category) && (!q || `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(q)))

  return (
    <>
      <section className="page-hero blogs-hero">
        <div className="container">
          <PageTitle lead="Insights &" accent="Ideas" />
          <Reveal className="featured-post">
            <Link to={`/blog/${featured.slug}`} className="featured-post__link">
              <BlogCover post={featured} size="lg" />
              <div className="featured-post__body">
                <p className="featured-post__title">{featured.title}</p>
                <p className="featured-post__excerpt">{featured.excerpt}</p>
                <p className="featured-post__meta">
                  <span>{featured.author}</span>
                  <span>{featured.readTime}</span>
                </p>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section theme-light blog-list" aria-labelledby="all-blogs-h">
        <div className="container">
          <Reveal as="h2" className="h2 reveal--tilt">
            <span id="all-blogs-h">All Blogs</span>
          </Reveal>
          <Reveal delay={120} className="blog-toolbar reveal--tilt">
            <div className="view-toggle" role="group" aria-label="Layout">
              <button className={layout === 'grid' ? 'is-active' : ''} aria-pressed={layout === 'grid'} onClick={() => setLayout('grid')} aria-label="Grid view">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></svg>
              </button>
              <button className={layout === 'list' ? 'is-active' : ''} aria-pressed={layout === 'list'} onClick={() => setLayout('list')} aria-label="List view">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>
              </button>
            </div>
            <div className="filters filters--inline">
              <FilterSelect label="Filter by category" value={category} options={POST_CATEGORIES} allLabel="Select Category" onChange={setCategory} />
              <SearchInput label="Search articles" value={query} onChange={setQuery} />
            </div>
          </Reveal>
          {list.length ? (
            <ul className={`posts posts--${layout}`}>
              {list.map((p, i) => (
                <PostCard key={`${layout}-${p.slug}`} post={p} layout={layout} index={i} />
              ))}
            </ul>
          ) : (
            <EmptyState onReset={() => { setCategory(''); setQuery('') }}>No articles match that search.</EmptyState>
          )}
        </div>
      </section>
    </>
  )
}
