import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { hotelProducts } from '@/data/products'
import { hotelCaseStudies } from '@/data/case-studies'
import { hotelTestimonials } from '@/data/testimonials'
import { formatPrice } from '@/lib/utils'
import { ArrowRight, CheckCircle, Star, Building2, Quote } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Hotel Uniforms | Royal Fit - Premium Hospitality Workwear',
  description: 'Premium hotel uniforms for Front of House, Kitchen, Housekeeping & Management. Durable, comfortable, and customizable. Bulk pricing available.',
}

const departments = [
  {
    name: 'Front of House',
    description: 'Professional blazers, dress shirts, and formal wear for guest-facing staff.',
    features: ['Tailored fit', 'Premium fabrics', 'Logo embroidery', 'Wrinkle-resistant'],
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600',
  },
  {
    name: 'Kitchen & Service',
    description: 'Heat-resistant chef coats, aprons, and service uniforms built for durability.',
    features: ['Stain-resistant', 'Heat-resistant', 'Durable fabric', 'Ventilation panels'],
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600',
  },
  {
    name: 'Housekeeping',
    description: 'Comfortable and functional tunics with utility pockets for housekeeping teams.',
    features: ['Reinforced stitching', 'Multiple pockets', 'Fade-resistant', 'Easy movement'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
  },
  {
    name: 'Management',
    description: 'Executive suits and premium attire for hotel leadership and management.',
    features: ['Premium cotton', 'Tailored cuts', 'Distinguished styling', 'Custom colors'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
  },
]

export default function HotelUniformsPage() {
  return (
    <main>
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Building2 className="w-5 h-5 text-gold-400" />
              <span className="text-sm font-medium">Hospitality Solutions</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Hotel Uniforms
            </h1>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              Elevate your hotel's brand image with premium uniforms designed for comfort,
              durability, and professional elegance across all departments.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="#quote" className="btn-gold">
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

      {/* Departments Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="decorative-line mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal-900 mb-4">
              Uniforms by Department
            </h2>
            <p className="text-xl text-charcoal-600 max-w-2xl mx-auto">
              Specialized solutions for every role in your hotel
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {departments.map((dept, index) => (
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
                        <CheckCircle className="w-4 h-4 text-primary-600" />
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
              Featured Hotel Uniforms
            </h2>
            <p className="text-charcoal-600">Browse our most popular hotel uniform products</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotelProducts.map((product) => (
              <div key={product.id} className="card-elevated overflow-hidden group">
                <div className="relative h-48 overflow-hidden bg-charcoal-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-primary-600 rounded-full text-xs font-semibold text-white">
                    {product.department}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-charcoal-900 mb-2 group-hover:text-primary-600 transition-colors">
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
                    <button className="px-3 py-1.5 bg-primary-600 text-white rounded-sm text-sm hover:bg-primary-700 transition-colors">
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

      {/* Case Study */}
      {hotelCaseStudies[0] && (
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="decorative-line mb-6" />
                <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal-900 mb-6">
                  Success Story
                </h2>
                <div className="bg-charcoal-50 rounded-sm p-6 mb-6">
                  <p className="text-charcoal-600 mb-4">
                    <strong className="text-charcoal-900">{hotelCaseStudies[0].clientType}</strong> • {hotelCaseStudies[0].clientSize} • {hotelCaseStudies[0].location}
                  </p>
                  <p className="text-charcoal-700 mb-4">{hotelCaseStudies[0].challenge}</p>
                  <p className="text-charcoal-700">{hotelCaseStudies[0].solution}</p>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {hotelCaseStudies[0].results.map((result) => (
                    <div key={result.metric} className="text-center p-4 bg-primary-50 rounded-sm">
                      <div className="text-2xl font-bold text-primary-600">{result.value}</div>
                      <div className="text-sm text-charcoal-600">{result.metric}</div>
                    </div>
                  ))}
                </div>

                <div className="relative bg-charcoal-900 text-white p-6 rounded-sm">
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-charcoal-700" />
                  <p className="italic mb-4">"{hotelCaseStudies[0].testimonial.quote}"</p>
                  <p className="font-semibold">{hotelCaseStudies[0].testimonial.author}</p>
                  <p className="text-sm text-charcoal-400">{hotelCaseStudies[0].testimonial.title}</p>
                </div>
              </div>

              <div className="relative">
                <img
                  src={hotelCaseStudies[0].image}
                  alt="Case study"
                  className="rounded-sm shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to Elevate Your Hotel's Image?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Get a customized quote for your hotel uniforms within 24 hours.
          </p>
          <Link href="/#quote" className="btn-gold">
            Request Free Quote
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
