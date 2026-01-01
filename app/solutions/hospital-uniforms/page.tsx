import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { hospitalProducts } from '@/data/products'
import { hospitalCaseStudies } from '@/data/case-studies'
import { formatPrice } from '@/lib/utils'
import { ArrowRight, CheckCircle, Star, Stethoscope, Quote, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Hospital Uniforms | Royal Fit - Quality Medical Scrubs',
  description: 'Quality hospital uniforms for Nursing, Surgical, Admin & Management. Designed for comfort during long shifts with professional styling.',
}

const departments = [
  {
    name: 'Nursing & Care',
    description: 'Comfortable scrubs designed for long shifts with practical features.',
    features: ['Durable fabric', 'Fluid-resistant', 'Moisture-wicking', 'Stretch comfort'],
    image: 'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=600',
  },
  {
    name: 'Surgical & Specialist',
    description: 'Professional surgical scrubs meeting high quality standards.',
    features: ['Quality materials', 'Full range of motion', 'Quick-dry', 'Practical design'],
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600',
  },
  {
    name: 'Admin & Support',
    description: 'Professional attire for administrative staff with practical design.',
    features: ['Professional look', 'Easy care', 'Practical pockets', 'Comfortable fit'],
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600',
  },
  {
    name: 'Management & Leadership',
    description: 'Distinguished lab coats and attire for medical leadership.',
    features: ['Premium finish', 'Tailored fit', 'Stain-resistant', 'Multiple pockets'],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600',
  },
]

const features = [
  { name: 'Quality Materials', description: 'Durable fabrics for everyday use' },
  { name: 'Comfort Design', description: 'Ergonomic cuts for long shifts' },
  { name: 'Professional Look', description: 'Clean, clinical appearance' },
]

export default function HospitalUniformsPage() {
  return (
    <main>
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gold-700 via-gold-600 to-gold-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Stethoscope className="w-5 h-5 text-white" />
              <span className="text-sm font-medium">Healthcare Solutions</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Hospital Uniforms
            </h1>
            <p className="text-xl text-gold-100 mb-8 leading-relaxed">
              Quality hospital uniforms designed for comfort during long shifts
              with professional styling and durable construction.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="#quote" className="btn-primary bg-charcoal-900 hover:bg-charcoal-800">
                Get Free Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link href="#products" className="btn-secondary border-white text-white hover:bg-white/10">
                View Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="bg-charcoal-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-gold-500" />
              <span className="text-lg font-semibold">Quality Healthcare Uniforms</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {features.map((feat) => (
                <div key={feat.name} className="text-center">
                  <p className="font-bold text-gold-400">{feat.name}</p>
                  <p className="text-xs text-charcoal-400">{feat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-20 h-0.5 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal-900 mb-4">
              Uniforms by Department
            </h2>
            <p className="text-xl text-charcoal-600 max-w-2xl mx-auto">
              Specialized healthcare uniforms for every role
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {departments.map((dept) => (
              <div key={dept.name} className="group card-elevated overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={dept.image}
                    alt={dept.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 to-transparent" />
                  <h3 className="absolute bottom-4 left-6 text-2xl font-display font-bold text-white">
                    {dept.name}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-charcoal-600 mb-4">{dept.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {dept.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm text-charcoal-700">
                        <CheckCircle className="w-4 h-4 text-gold-600" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="section-padding bg-charcoal-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal-900 mb-4">
              Featured Hospital Uniforms
            </h2>
            <p className="text-charcoal-600">Browse our quality hospital uniform products</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hospitalProducts.map((product) => (
              <div key={product.id} className="card-elevated overflow-hidden group">
                <div className="relative h-48 overflow-hidden bg-charcoal-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-gold-600 rounded-full text-xs font-semibold text-white">
                    {product.department}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-charcoal-900 mb-2 group-hover:text-gold-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.durabilityRating)
                            ? 'text-gold-500 fill-gold-500'
                            : 'text-charcoal-300'
                          }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xl font-bold text-charcoal-900">{formatPrice(product.pricePerUnit)}</p>
                      <p className="text-xs text-charcoal-500">per unit</p>
                    </div>
                    <button className="px-3 py-1.5 bg-gold-600 text-white rounded-sm text-sm hover:bg-gold-700 transition-colors">
                      Add to Quote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/#catalog" className="btn-secondary">
              View Full Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal-900 mb-4">
              Healthcare Success Stories
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {hospitalCaseStudies.map((study) => (
              <div key={study.id} className="card-elevated overflow-hidden">
                <div className="relative h-48">
                  <img src={study.image} alt={study.clientType} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 to-transparent" />
                  <div className="absolute bottom-4 left-6 text-white">
                    <p className="font-semibold text-lg">{study.clientType}</p>
                    <p className="text-sm text-white/80">{study.clientSize} • {study.location}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {study.results.map((result) => (
                      <div key={result.metric} className="text-center p-3 bg-gold-50 rounded-sm">
                        <div className="text-xl font-bold text-gold-600">{result.value}</div>
                        <div className="text-xs text-charcoal-600">{result.metric}</div>
                      </div>
                    ))}
                  </div>
                  <div className="relative bg-charcoal-50 p-4 rounded-sm">
                    <Quote className="absolute top-2 left-2 w-5 h-5 text-charcoal-200" />
                    <p className="text-sm text-charcoal-700 italic pl-6 line-clamp-2">
                      "{study.testimonial.quote}"
                    </p>
                    <p className="text-sm font-semibold text-charcoal-900 mt-2 pl-6">
                      — {study.testimonial.author}, {study.testimonial.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-gold-600 to-gold-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to Upgrade Your Healthcare Uniforms?
          </h2>
          <p className="text-xl text-gold-100 mb-8">
            Get quality uniforms with a customized quote for your healthcare facility.
          </p>
          <Link href="/#quote" className="btn-primary bg-charcoal-900 hover:bg-charcoal-800">
            Request Free Quote
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
