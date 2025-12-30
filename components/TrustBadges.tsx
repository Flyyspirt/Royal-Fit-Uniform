'use client'

import { Shield, Award, Clock, CheckCircle, FileCheck, Users } from 'lucide-react'

const badges = [
  {
    icon: Shield,
    name: 'GST Registered',
    description: 'Fully compliant business with transparent invoicing',
  },
  {
    icon: Award,
    name: 'ISO 9001:2015',
    description: 'Certified quality management systems',
  },
  {
    icon: FileCheck,
    name: 'Antimicrobial Certified',
    description: 'ISO 20645 tested for healthcare standards',
  },
  {
    icon: Clock,
    name: 'On-Time Delivery',
    description: '98% orders delivered within promised timeline',
  },
  {
    icon: CheckCircle,
    name: '30-Day Guarantee',
    description: 'Full satisfaction or free replacement',
  },
  {
    icon: Users,
    name: '500+ Clients',
    description: 'Trusted by leading establishments',
  },
]

const guarantees = [
  {
    title: '30-Day Satisfaction Guarantee',
    description: "If uniforms don't meet expectations, we'll replace at no cost.",
  },
  {
    title: 'Durability Warranty',
    description: 'Our uniforms withstand 50+ industrial wash cycles without fading.',
  },
  {
    title: 'On-Time Delivery',
    description: 'Bulk orders delivered within promised timeline or 10% discount.',
  },
  {
    title: 'Customization Perfection',
    description: 'Free logo repositioning if not perfect on first production.',
  },
]

export default function TrustBadges() {
  return (
    <section id="why-royal-fit" className="section-padding bg-gradient-to-b from-white to-primary-50/30">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="decorative-line mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-charcoal-900 mb-4">
            Why Choose Royal Fit
          </h2>
          <p className="text-xl text-charcoal-600 max-w-2xl mx-auto">
            Industry certifications, quality guarantees, and a track record of excellence.
          </p>
        </div>

        {/* Trust badges grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {badges.map((badge, index) => (
            <div
              key={badge.name}
              className="group bg-white rounded-sm p-6 border border-charcoal-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-50 rounded-sm flex items-center justify-center flex-shrink-0 group-hover:from-primary-200 group-hover:to-primary-100 transition-colors">
                  <badge.icon className="w-7 h-7 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal-900 mb-1">{badge.name}</h3>
                  <p className="text-charcoal-600 text-sm">{badge.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantees section */}
        <div className="bg-charcoal-900 rounded-sm p-8 lg:p-12">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
              Our Commitments to You
            </h3>
            <p className="text-charcoal-300">
              Every order is backed by our comprehensive quality guarantees
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {guarantees.map((guarantee, index) => (
              <div
                key={guarantee.title}
                className="flex items-start gap-4 bg-white/5 rounded-sm p-6 border border-white/10 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-charcoal-900" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">{guarantee.title}</h4>
                  <p className="text-charcoal-300 text-sm">{guarantee.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client logos placeholder */}
        <div className="mt-16 text-center">
          <p className="text-charcoal-500 uppercase tracking-widest text-sm mb-8">
            Trusted by Industry Leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-60 grayscale">
            {['Taj Hotels', 'Apollo Hospitals', 'ITC Hotels', 'Fortis Healthcare', 'Oberoi Group', 'Max Healthcare'].map((name) => (
              <div
                key={name}
                className="px-6 py-3 bg-charcoal-100 rounded-sm"
              >
                <span className="font-display font-semibold text-charcoal-600">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
