import { useEffect } from 'react'
import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { Nav } from './components/Nav'
import { CtaBand, Footer } from './components/Work'
import { HomePage } from './pages/Home'
import { WorkPage } from './pages/WorkPage'
import { WorkDetailPage } from './pages/WorkDetail'
import { CreatorsPage } from './pages/CreatorsPage'
import { BlogsPage } from './pages/BlogsPage'
import { BlogPostPage } from './pages/BlogPost'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { LegalPage } from './pages/LegalPage'
import { NotFoundPage } from './pages/NotFound'

/** Scroll to top on page change, or to the #section when the URL has a hash. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // wait a frame so the target page has rendered
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }))
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
  }, [pathname, hash])
  return null
}

const TITLES: Record<string, string> = {
  '/': 'Atlantic Media | Digital Marketing',
  '/work': 'Our Work — Atlantic Media',
  '/creators': 'Creators — Atlantic Media',
  '/blogs': 'Insights & Ideas — Atlantic Media',
  '/about': 'About Us — Atlantic Media',
  '/contact': 'Contact — Atlantic Media',
  '/privacy-policy': 'Privacy Policy — Atlantic Media',
  '/terms': 'Terms of Service — Atlantic Media',
}

function Layout() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (TITLES[pathname]) document.title = TITLES[pathname]
  }, [pathname])
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <ScrollManager />
      <Nav />
      <main id="main">
        <Outlet />
        <CtaBand />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="work" element={<WorkPage />} />
        <Route path="work/:slug" element={<WorkDetailPage />} />
        <Route path="creators" element={<CreatorsPage />} />
        <Route path="blogs" element={<BlogsPage />} />
        <Route path="blog/:slug" element={<BlogPostPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="privacy-policy" element={<LegalPage kind="privacy" />} />
        <Route path="terms" element={<LegalPage kind="terms" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
