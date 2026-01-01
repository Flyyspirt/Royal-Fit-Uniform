'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle2, Building2, Stethoscope } from 'lucide-react'

const stats = [
  { value: 'Quality', label: 'Premium Fabrics' },
  { value: 'Custom', label: 'Branding Options' },
  { value: 'Bulk', label: 'Order Discounts' },
  { value: 'Quick', label: 'Turnaround Time' },
]

const features = [
  'Premium quality fabrics',
  'Custom branding & embroidery',
  'Competitive bulk pricing',
  'Reliable delivery timeline',
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-gold-50/30" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary-100/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-100/40 rounded-full blur-3xl" />

      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-200 shadow-sm">
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary-700">Your B2B Uniform Partner</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-charcoal-900 leading-tight">
                Premium Uniforms for
                <span className="block text-gradient">Hotels & Hospitals</span>
              </h1>
              <p className="text-xl text-charcoal-600 max-w-xl leading-relaxed">
                Elevate your team's professional image with durable, comfortable, and compliant uniforms.
                From luxury hospitality to healthcare excellence.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature, i) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 animate-slide-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0" />
                  <span className="text-charcoal-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#quote" className="btn-gold group">
                Get Free Quote
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#catalog" className="btn-secondary">
                Browse Catalog
              </Link>
            </div>

            {/* Sector icons */}
            <div className="flex items-center gap-6 pt-4 border-t border-charcoal-200">
              <div className="flex items-center gap-2 text-charcoal-600">
                <Building2 className="w-5 h-5 text-primary-600" />
                <span>Hospitality</span>
              </div>
              <div className="flex items-center gap-2 text-charcoal-600">
                <Stethoscope className="w-5 h-5 text-primary-600" />
                <span>Healthcare</span>
              </div>
            </div>
          </div>

          {/* Image Grid */}
          <div className="relative animate-fade-in animation-delay-300">
            <div className="grid grid-cols-2 gap-4">
              {/* Main image */}
              <div className="col-span-2 relative overflow-hidden rounded-sm shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"
                  alt="Professional chef in Royal Fit uniform"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">Hotel Uniforms</p>
                  <p className="text-sm text-white/80">Kitchen & Service</p>
                </div>
              </div>

              {/* Secondary images */}
              <div className="relative overflow-hidden rounded-sm shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=400&q=80"
                  alt="Healthcare professional in scrubs"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white text-sm">
                  <p className="font-semibold">Hospital Scrubs</p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-sm shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80"
                  alt="Hotel front desk staff"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white text-sm">
                  <p className="font-semibold">Front of House</p>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-sm shadow-xl border border-charcoal-100 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal-900">Quality Assured</p>
                  <p className="text-sm text-charcoal-500">Premium Materials</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 pt-12 border-t border-charcoal-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="text-center animate-slide-up"
                style={{ animationDelay: `${i * 100 + 400}ms` }}
              >
                <div className="text-4xl md:text-5xl font-display font-bold text-primary-600">{stat.value}</div>
                <div className="text-charcoal-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
