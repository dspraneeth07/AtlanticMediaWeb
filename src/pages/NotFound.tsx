import { Link } from 'react-router-dom'
import { Arrow } from '../components/ui'

export function NotFoundPage() {
  return (
    <section className="page-hero not-found">
      <div className="container">
        <p className="not-found__code accent">404</p>
        <h1 className="page-title">This page took a different route.</h1>
        <p className="lead-muted">The link may be broken, or the page may have moved.</p>
        <Link to="/" className="btn-contact not-found__btn">
          Back to home <Arrow />
        </Link>
      </div>
    </section>
  )
}
