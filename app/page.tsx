import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import ServiceCards from '@/components/ServiceCards'
import ProductCatalog from '@/components/ProductCatalog'
import CaseStudies from '@/components/CaseStudies'
import Testimonials from '@/components/Testimonials'
import TrustBadges from '@/components/TrustBadges'
import RequestQuoteForm from '@/components/RequestQuoteForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <ServiceCards />
      <TrustBadges />
      <ProductCatalog />
      <CaseStudies />
      <Testimonials />
      <RequestQuoteForm />
      <Footer />
    </main>
  )
}
