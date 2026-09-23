import { Hero } from '../components/Hero'
import { Services } from '../components/Services'
import { Brands } from '../components/Brands'
import { Creators } from '../components/Creators'
import { CaseStudies, Clientele } from '../components/Work'

export function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Brands />
      <Creators />
      <CaseStudies />
      <Clientele />
    </>
  )
}
