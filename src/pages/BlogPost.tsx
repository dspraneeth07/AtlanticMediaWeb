import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { POSTS, type Block } from '../data'
import { Hook, Reveal } from '../components/ui'
import { BlogCover, PostCard } from '../components/pageui'
import { NotFoundPage } from './NotFound'

function renderBlock(b: Block, i: number) {
  if ('h' in b) return <h2 key={i}>{b.h}</h2>
  if ('quote' in b) return <blockquote key={i}>{b.quote}</blockquote>
  if ('list' in b)
    return (
      <ul key={i}>
        {b.list.map((li) => (
          <li key={li}>{li}</li>
        ))}
      </ul>
    )
  return <p key={i}>{b.p}</p>
}

function ShareLinks({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const enc = encodeURIComponent
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable; ignore */
    }
  }
  return (
    <div className="share">
      <a href={`https://wa.me/?text=${enc(`${title} ${url}`)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M3 21l1.6-4.6A8.5 8.5 0 1 1 8 19.6z" /><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 1c-1-.4-2.1-1.5-2.5-2.5l1-1-1-2z" /></svg>
      </a>
      <a href={`https://x.com/intent/post?text=${enc(title)}&url=${enc(url)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X">
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="2" /></svg>
      </a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7.5 10v7M7.5 7v.01M11 17v-7M11 13c0-2 1.2-3 2.8-3S16.5 11 16.5 13v4" /></svg>
      </a>
      <button onClick={copy} aria-label="Copy link">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></svg>
      </button>
      <span className="share__status" role="status">{copied ? 'Link copied' : ''}</span>
    </div>
  )
}

export function BlogPostPage() {
  const { slug } = useParams()
  const post = POSTS.find((p) => p.slug === slug)
  useEffect(() => {
    if (post) document.title = `${post.title} — Atlantic Media`
  }, [post])
  if (!post) return <NotFoundPage />
  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <section className="detail-hero">
        <div className="detail-hero__swirl" aria-hidden="true" />
        <div className="container container--narrow">
          <Reveal className="section-tag">
            <p className="eyebrow crumbs">
              <Link to="/blogs" className="crumbs__back">Back</Link>
              <span aria-hidden="true">&gt;</span> {post.title}
            </p>
            <hr className="divider" />
          </Reveal>
          <Reveal as="h1" className="detail-title">
            {post.title}
          </Reveal>
          <p className="post-meta">
            <span className="post-meta__author">{post.author}</span>
            <span aria-hidden="true">•</span>
            <span>{post.readTime}</span>
            <span aria-hidden="true">•</span>
            <time>{post.date}</time>
          </p>
          <ShareLinks title={post.title} />
          <div className="detail-media detail-media--cover">
            <BlogCover post={post} size="lg" />
          </div>
        </div>
      </section>

      <section className="section theme-light article-wrap">
        <article className="article container container--article">
          <p className="article__lead">{post.excerpt}</p>
          {post.body.map(renderBlock)}
        </article>
      </section>

      <section className="section theme-light more">
        <div className="container container--narrow">
          <h2 className="h2 h2--sm more__title">
            <Hook /> Read More Articles
          </h2>
          <ul className="posts posts--grid">
            {more.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
