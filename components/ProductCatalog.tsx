'use client'

import { useState } from 'react'
import { Star, Filter, ChevronDown } from 'lucide-react'
import { products } from '@/data/products'
import { formatPrice, getDiscountPercentage } from '@/lib/utils'
import { cn } from '@/lib/utils'

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'hotel', name: 'Hotel Uniforms' },
  { id: 'hospital', name: 'Hospital Uniforms' },
]

const departments = {
  hotel: ['All', 'Front of House', 'Kitchen & Service', 'Housekeeping', 'Management'],
  hospital: ['All', 'Nursing & Care', 'Surgical & Specialist', 'Admin & Support', 'Management & Leadership'],
}

export default function ProductCatalog() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'hotel' | 'hospital'>('all')
  const [activeDepartment, setActiveDepartment] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = products.filter((product) => {
    if (activeCategory !== 'all' && product.category !== activeCategory) return false
    if (activeDepartment !== 'All' && product.department !== activeDepartment) return false
    return true
  })

  const availableDepartments = activeCategory === 'all' 
    ? [] 
    : departments[activeCategory]

  return (
    <section id="catalog" className="section-padding bg-gradient-to-b from-charcoal-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="decorative-line mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-charcoal-900 mb-4">
            Uniform Catalog
          </h2>
          <p className="text-xl text-charcoal-600 max-w-2xl mx-auto">
            Browse our collection of premium uniforms. Bulk discounts available for orders of 50+ units.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id as 'all' | 'hotel' | 'hospital')
                  setActiveDepartment('All')
                }}
                className={cn(
                  'px-6 py-3 rounded-sm font-medium transition-all duration-200',
                  activeCategory === category.id
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20'
                    : 'bg-white text-charcoal-700 hover:bg-charcoal-100 border border-charcoal-200'
                )}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Department filter */}
          {availableDepartments.length > 0 && (
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 bg-white rounded-sm border border-charcoal-200 p-1">
                {availableDepartments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setActiveDepartment(dept)}
                    className={cn(
                      'px-4 py-2 rounded-sm text-sm font-medium transition-all',
                      activeDepartment === dept
                        ? 'bg-charcoal-900 text-white'
                        : 'text-charcoal-600 hover:text-charcoal-900'
                    )}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bulk discount banner */}
        <div className="bg-gradient-to-r from-gold-100 to-gold-50 rounded-sm p-4 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">%</span>
            </div>
            <div>
              <p className="font-semibold text-charcoal-900">Bulk Order Discounts</p>
              <p className="text-sm text-charcoal-600">50+ units: 10% off | 100+: 15% off | 200+: 20% off | 500+: 25% off</p>
            </div>
          </div>
          <a href="#quote" className="btn-gold text-sm py-2 px-4">
            Get Bulk Quote
          </a>
        </div>

        {/* Product grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="group card-elevated overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden bg-charcoal-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Category badge */}
                <div className={cn(
                  'absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white',
                  product.category === 'hotel' ? 'bg-primary-600' : 'bg-gold-600'
                )}>
                  {product.category === 'hotel' ? 'Hotel' : 'Hospital'}
                </div>

                {/* Customizable badge */}
                {product.customizable && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-charcoal-700">
                    Customizable
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Department */}
                <p className="text-sm text-charcoal-500 mb-1">{product.department}</p>
                
                {/* Name */}
                <h3 className="font-semibold text-charcoal-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'w-4 h-4',
                        i < Math.floor(product.durabilityRating)
                          ? 'text-gold-500 fill-gold-500'
                          : 'text-charcoal-300'
                      )}
                    />
                  ))}
                  <span className="text-sm text-charcoal-600 ml-1">
                    {product.durabilityRating} Durability
                  </span>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {product.features.slice(0, 2).map((feature) => (
                    <span
                      key={feature}
                      className="px-2 py-1 bg-charcoal-100 rounded text-xs text-charcoal-600"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold text-charcoal-900">
                      {formatPrice(product.pricePerUnit)}
                    </p>
                    <p className="text-sm text-charcoal-500">per unit</p>
                  </div>
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-sm text-sm font-medium hover:bg-primary-700 transition-colors">
                    Add to Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all CTA */}
        <div className="text-center mt-12">
          <p className="text-charcoal-600 mb-4">
            Showing {filteredProducts.length} of {products.length} products
          </p>
          <a href="#quote" className="btn-secondary">
            Request Full Catalog
          </a>
        </div>
      </div>
    </section>
  )
}
