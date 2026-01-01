'use client'

import Link from 'next/link'
import { ArrowRight, Building2, Stethoscope } from 'lucide-react'

const services = [
  {
    id: 'hotel',
    title: 'Hotel Uniforms',
    description: 'Elevate your hospitality brand with premium uniforms designed for comfort and durability across all departments.',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    departments: [
      { name: 'Front of House', features: ['Tailored blazers', 'Dress shirts', 'Premium finish'] },
      { name: 'Kitchen & Service', features: ['Chef coats', 'Aprons', 'Heat-resistant'] },
      { name: 'Housekeeping', features: ['Durable tunics', 'Utility pockets', 'Fade-resistant'] },
      { name: 'Management', features: ['Executive suits', 'Premium fabrics', 'Custom tailoring'] },
    ],
    href: '/solutions/hotel-uniforms',
    color: 'primary',
  },
  {
    id: 'hospital',
    title: 'Hospital Uniforms',
    description: 'Quality healthcare uniforms designed for comfort during long shifts with professional styling and durability.',
    icon: Stethoscope,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
    departments: [
      { name: 'Nursing & Care', features: ['Quality scrubs', 'Fluid-resistant', 'Comfort stretch'] },
      { name: 'Surgical & Specialist', features: ['Professional design', 'Full mobility', 'Quick-dry'] },
      { name: 'Admin & Support', features: ['Professional polos', 'Easy care', 'Practical design'] },
      { name: 'Management', features: ['Premium lab coats', 'Distinguished styling', 'Tailored fit'] },
    ],
    href: '/solutions/hospital-uniforms',
    color: 'gold',
  },
]

export default function ServiceCards() {
  return (
    <section id="solutions" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="decorative-line mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-charcoal-900 mb-4">
            Uniform Solutions by Sector
          </h2>
          <p className="text-xl text-charcoal-600 max-w-2xl mx-auto">
            Specialized uniforms designed for the unique demands of hospitality and healthcare industries.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group card-elevated overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/20 to-transparent" />

                {/* Icon badge */}
                <div className={`absolute top-4 right-4 w-14 h-14 rounded-full flex items-center justify-center ${service.color === 'primary' ? 'bg-primary-500' : 'bg-gold-500'
                  }`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>

                {/* Title overlay */}
                <div className="absolute bottom-4 left-6 right-6">
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                <p className="text-charcoal-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Departments grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {service.departments.map((dept) => (
                    <div key={dept.name} className="bg-charcoal-50 rounded-sm p-4">
                      <h4 className="font-semibold text-charcoal-900 mb-2">{dept.name}</h4>
                      <ul className="space-y-1">
                        {dept.features.map((feature) => (
                          <li key={feature} className="text-sm text-charcoal-600 flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${service.color === 'primary' ? 'bg-primary-500' : 'bg-gold-500'
                              }`} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={service.href}
                  className={`inline-flex items-center gap-2 font-semibold transition-colors ${service.color === 'primary'
                      ? 'text-primary-600 hover:text-primary-700'
                      : 'text-gold-600 hover:text-gold-700'
                    }`}
                >
                  Explore {service.title}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
