'use client'

import { Shield, Truck, Palette, Ruler, Headphones, Package } from 'lucide-react'

const badges = [
  {
    icon: Shield,
    name: 'Quality Fabrics',
    description: 'Premium materials selected for durability and comfort',
  },
  {
    icon: Palette,
    name: 'Custom Designs',
    description: 'Tailored uniforms to match your brand identity',
  },
  {
    icon: Ruler,
    name: 'Perfect Fit',
    description: 'Full size range with custom alterations available',
  },
  {
    icon: Truck,
    name: 'Reliable Delivery',
    description: 'Timely dispatch for all bulk orders',
  },
  {
    icon: Package,
    name: 'Bulk Orders',
    description: 'Competitive pricing for large quantity orders',
  },
  {
    icon: Headphones,
    name: 'Dedicated Support',
    description: 'Personal account manager for your orders',
  },
]

const guarantees = [
  {
    title: 'Quality Assurance',
    description: "Every uniform undergoes thorough quality checks before dispatch.",
  },
  {
    title: 'Durable Materials',
    description: 'Fabrics designed to withstand regular industrial washing.',
  },
  {
    title: 'Timely Delivery',
    description: 'We work to meet your delivery timelines for bulk orders.',
  },
  {
    title: 'Customization Options',
    description: 'Logo embroidery and custom color matching available.',
  },
]

export default function TrustBadges() {
  return (
    <section id="why-royal-fit" className="section-padding bg-gradient-to-b from-white to-primary-50/30">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="decorative-line mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-charcoal-900 mb-4">
            Why Choose Royal Fit
          </h2>
          <p className="text-xl text-charcoal-600 max-w-2xl mx-auto">
            Quality uniforms, professional service, and dedicated support for your business.
          </p>
        </div>

        {/* Trust badges grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {badges.map((badge, index) => (
            <div
              key={badge.name}
              className="group bg-white rounded-sm p-5 border border-charcoal-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-50 rounded-sm flex items-center justify-center flex-shrink-0 group-hover:from-primary-200 group-hover:to-primary-100 transition-colors">
                  <badge.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal-900 mb-1">{badge.name}</h3>
                  <p className="text-charcoal-600 text-sm leading-snug">{badge.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantees section */}
        <div className="bg-charcoal-900 rounded-sm p-6 lg:p-10">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
              Our Commitments to You
            </h3>
            <p className="text-charcoal-300">
              Quality and service you can rely on
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {guarantees.map((guarantee, index) => (
              <div
                key={guarantee.title}
                className="flex items-start gap-3 bg-white/5 rounded-sm p-5 border border-white/10 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-charcoal-900" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">{guarantee.title}</h4>
                  <p className="text-charcoal-300 text-sm leading-snug">{guarantee.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
