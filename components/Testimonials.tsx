'use client'

import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonials } from '@/data/testimonials'
import { cn } from '@/lib/utils'

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="section-padding bg-gradient-to-b from-charcoal-900 to-charcoal-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="w-20 h-0.5 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-charcoal-300 max-w-2xl mx-auto">
            Trusted by leading hotels and hospitals across India
          </p>
        </div>

        {/* Featured testimonial */}
        <div className="relative mb-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Quote icon */}
            <Quote className="w-16 h-16 text-gold-500/30 mx-auto mb-8" />
            
            {/* Testimonial content */}
            <div className="relative">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={cn(
                    'transition-all duration-500',
                    index === currentIndex
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 absolute inset-0 translate-x-8'
                  )}
                >
                  {/* Quote */}
                  <blockquote className="text-2xl md:text-3xl font-display leading-relaxed mb-8">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Rating */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'w-6 h-6',
                          i < testimonial.rating
                            ? 'text-gold-500 fill-gold-500'
                            : 'text-charcoal-600'
                        )}
                      />
                    ))}
                  </div>

                  {/* Author */}
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-16 h-16 rounded-full object-cover border-2 border-gold-500"
                    />
                    <div className="text-left">
                      <p className="font-semibold text-lg">{testimonial.author}</p>
                      <p className="text-charcoal-400">{testimonial.title}</p>
                      <p className="text-gold-500">{testimonial.company}</p>
                    </div>
                  </div>

                  {/* Sector badge */}
                  <div className={cn(
                    'inline-block mt-6 px-4 py-1 rounded-full text-sm font-medium',
                    testimonial.sector === 'hotel'
                      ? 'bg-primary-600/20 text-primary-400'
                      : 'bg-gold-600/20 text-gold-400'
                  )}>
                    {testimonial.sector === 'hotel' ? 'Hospitality' : 'Healthcare'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mb-16">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'w-3 h-3 rounded-full transition-all duration-300',
                index === currentIndex
                  ? 'bg-gold-500 w-8'
                  : 'bg-charcoal-600 hover:bg-charcoal-500'
              )}
            />
          ))}
        </div>

        {/* All testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white/5 backdrop-blur-sm rounded-sm p-6 border border-white/10 hover:bg-white/10 transition-colors animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-4 h-4',
                      i < testimonial.rating
                        ? 'text-gold-500 fill-gold-500'
                        : 'text-charcoal-600'
                    )}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-charcoal-200 mb-4 line-clamp-3">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-sm">{testimonial.author}</p>
                  <p className="text-xs text-charcoal-400">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
