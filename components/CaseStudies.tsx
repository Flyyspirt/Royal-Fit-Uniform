'use client'

import { useState } from 'react'
import { ArrowRight, TrendingUp, Clock, Quote } from 'lucide-react'
import { caseStudies } from '@/data/case-studies'
import { cn } from '@/lib/utils'

const filters = [
  { id: 'all', name: 'All Case Studies' },
  { id: 'hotel', name: 'Hotels' },
  { id: 'hospital', name: 'Hospitals' },
]

export default function CaseStudies() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'hotel' | 'hospital'>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filteredStudies = caseStudies.filter((study) => {
    if (activeFilter === 'all') return true
    return study.sector === activeFilter
  })

  return (
    <section id="case-studies" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="decorative-line mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-charcoal-900 mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-charcoal-600 max-w-2xl mx-auto">
            See how we've helped hotels and hospitals transform their team's professional image with measurable results.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id as 'all' | 'hotel' | 'hospital')}
              className={cn(
                'px-6 py-3 rounded-sm font-medium transition-all duration-200',
                activeFilter === filter.id
                  ? 'bg-charcoal-900 text-white'
                  : 'bg-charcoal-100 text-charcoal-700 hover:bg-charcoal-200'
              )}
            >
              {filter.name}
            </button>
          ))}
        </div>

        {/* Case studies grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {filteredStudies.map((study, index) => (
            <div
              key={study.id}
              className="group card-elevated overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={study.image}
                  alt={study.clientType}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 to-transparent" />
                
                {/* Sector badge */}
                <div className={cn(
                  'absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold text-white',
                  study.sector === 'hotel' ? 'bg-primary-600' : 'bg-gold-600'
                )}>
                  {study.sector === 'hotel' ? 'Hotel' : 'Hospital'}
                </div>

                {/* Client info overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-semibold text-lg">{study.clientType}</p>
                  <p className="text-sm text-white/80">{study.clientSize} • {study.location}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Results metrics */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {study.results.slice(0, 3).map((result) => (
                    <div key={result.metric} className="text-center p-3 bg-charcoal-50 rounded-sm">
                      <div className="flex items-center justify-center gap-1 text-primary-600 mb-1">
                        <TrendingUp className="w-4 h-4" />
                        <span className="font-bold text-lg">{result.value}</span>
                      </div>
                      <p className="text-xs text-charcoal-600 leading-tight">{result.metric}</p>
                    </div>
                  ))}
                </div>

                {/* Challenge & Solution */}
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-charcoal-900 mb-1">Challenge</h4>
                    <p className="text-sm text-charcoal-600 line-clamp-2">{study.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal-900 mb-1">Solution</h4>
                    <p className="text-sm text-charcoal-600 line-clamp-2">{study.solution}</p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="flex items-center gap-2 text-sm text-charcoal-500 mb-6">
                  <Clock className="w-4 h-4" />
                  <span>{study.timeline}</span>
                </div>

                {/* Testimonial */}
                <div className="relative bg-charcoal-50 rounded-sm p-4">
                  <Quote className="absolute top-2 left-2 w-6 h-6 text-charcoal-200" />
                  <p className="text-sm text-charcoal-700 italic pl-6 line-clamp-3">
                    "{study.testimonial.quote}"
                  </p>
                  <div className="mt-3 pl-6">
                    <p className="font-semibold text-charcoal-900 text-sm">{study.testimonial.author}</p>
                    <p className="text-xs text-charcoal-500">{study.testimonial.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a href="#quote" className="btn-primary">
            Start Your Success Story
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </div>
      </div>
    </section>
  )
}
