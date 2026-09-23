import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { CaseStudy, Post } from '../data'
import { InViewVideo, Reveal } from './ui'

/** Illustrated-poster style blog cover, generated from the post's cover spec. */
export function BlogCover({ post, size = 'md' }: { post: Post; size?: 'md' | 'lg' }) {
  const { top, big, hue } = post.cover
  return (
    <div className={`blog-cover blog-cover--${size}`} style={{ ['--h' as string]: hue }} role="img" aria-label={`${post.title} cover`}>
      <span className="blog-cover__brand" aria-hidden="true">
        Atlantic<span>≋</span>
      </span>
      <span className="blog-cover__chip">{post.category}</span>
      <span className="blog-cover__top" aria-hidden="true">{top}</span>
      <span className="blog-cover__big" aria-hidden="true">{big}</span>
      <span className="blog-cover__shape blog-cover__shape--a" aria-hidden="true" />
      <span className="blog-cover__shape blog-cover__shape--b" aria-hidden="true" />
      <span className="blog-cover__shape blog-cover__shape--c" aria-hidden="true" />
    </div>
  )
}

export function PostCard({ post, layout = 'grid', index = 0 }: { post: Post; layout?: 'grid' | 'list'; index?: number }) {
  return (
    <Reveal as="li" delay={(index % 3) * 120} className={`reveal--tilt post-card post-card--${layout}`}>
      <Link to={`/blog/${post.slug}`} className="post-card__link">
        <BlogCover post={post} />
        <div className="post-card__body">
          <p className="post-card__meta">
            <span className="chip">{post.category}</span>
            <span>{post.readTime}</span>
          </p>
          <h3 className="post-card__title">{post.title}</h3>
          {layout === 'list' && <p className="post-card__excerpt">{post.excerpt}</p>}
          <p className="post-card__author">{post.author}</p>
        </div>
      </Link>
    </Reveal>
  )
}

/** Project card for /work grids: still image, video on hover where available. */
export function ProjectCard({ c, large = false }: { c: CaseStudy; large?: boolean }) {
  return (
    <li className={`project ${large ? 'project--lg' : ''}`}>
      <Link to={`/work/${c.slug}`} className="project__link">
        <div className="project__media">
          <img src={c.poster} alt="" loading="lazy" className="project__img" />
          {c.video && large && <InViewVideo src={c.video} poster={c.poster} className="project__video" />}
          <span className="project__industry">{c.industry}</span>
          {large && <span className="project__progress" aria-hidden="true" />}
        </div>
        <p className="project__title">
          {c.title} <span className="project__for">— for {c.brand.name}</span>
        </p>
      </Link>
    </li>
  )
}

export function FilterSelect({ label, value, options, onChange, allLabel }: { label: string; value: string; options: readonly string[]; onChange: (v: string) => void; allLabel: string }) {
  return (
    <label className="filter">
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 6h18M6 12h12M10 18h4" />
      </svg>
      <span className="visually-hidden">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">{allLabel}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <svg className="filter__chev" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </label>
  )
}

export function SearchInput({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) {
  return (
    <label className="filter filter--search">
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
      </svg>
      <span className="visually-hidden">{label}</span>
      <input type="search" placeholder="Search" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  )
}

export function EmptyState({ children, onReset }: { children: ReactNode; onReset: () => void }) {
  return (
    <div className="empty">
      <p>{children}</p>
      <button className="underline-link" onClick={onReset}>
        Clear filters
      </button>
    </div>
  )
}

/** Big page heading with an accented last word, e.g. "Explore our Latest *Work*". */
export function PageTitle({ lead, accent, as: Tag = 'h1', className = '' }: { lead: string; accent: string; as?: 'h1' | 'h2'; className?: string }) {
  return (
    <Reveal as={Tag} className={`page-title ${className}`}>
      {lead} <span className="accent">{accent}</span>
    </Reveal>
  )
}
