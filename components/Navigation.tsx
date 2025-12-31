'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  {
    name: 'Solutions',
    href: '#',
    children: [
      { name: 'Hotel Uniforms', href: '/solutions/hotel-uniforms', description: 'Front of House, Kitchen, Housekeeping' },
      { name: 'Hospital Uniforms', href: '/solutions/hospital-uniforms', description: 'Nursing, Surgical, Admin, Leadership' },
    ],
  },
  { name: 'Why Royal Fit', href: '#why-royal-fit' },
  { name: 'Case Studies', href: '#case-studies' },
  { name: 'Catalog', href: '#catalog' },
  { name: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)

  return (
    <>
      {/* Top bar */}
      <div className="bg-charcoal-900 text-white py-2 px-6 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-charcoal-300">Trusted by 500+ Hotels & Hospitals across India</p>
          <div className="flex items-center gap-6">
            <a href="tel:+919346549694" className="flex items-center gap-2 hover:text-gold-400 transition-colors">
              <Phone className="w-4 h-4" />
              +91 93465 49694
            </a>
            <a href="mailto:royalfituniform@gmail.com" className="flex items-center gap-2 hover:text-gold-400 transition-colors">
              <Mail className="w-4 h-4" />
              royalfituniform@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-charcoal-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 relative flex items-center justify-center">
                <Image
                  src="/apple-touch-icon.png"
                  alt="Royal Fit Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-display text-2xl font-bold text-charcoal-900">Royal Fit</span>
                <span className="block text-xs text-charcoal-500 tracking-widest uppercase">Healthcare & Hospitality Uniform Program Engineering</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  {item.children ? (
                    <button
                      onMouseEnter={() => setSolutionsOpen(true)}
                      onMouseLeave={() => setSolutionsOpen(false)}
                      className="flex items-center gap-1 text-charcoal-700 hover:text-primary-600 font-medium transition-colors py-2"
                    >
                      {item.name}
                      <ChevronDown className={cn('w-4 h-4 transition-transform', solutionsOpen && 'rotate-180')} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-charcoal-700 hover:text-primary-600 font-medium transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}

                  {/* Dropdown */}
                  {item.children && (
                    <div
                      onMouseEnter={() => setSolutionsOpen(true)}
                      onMouseLeave={() => setSolutionsOpen(false)}
                      className={cn(
                        'absolute top-full left-0 mt-0 w-72 bg-white rounded-sm shadow-xl border border-charcoal-100 py-4 transition-all duration-200',
                        solutionsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                      )}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-6 py-3 hover:bg-primary-50 transition-colors"
                        >
                          <span className="font-semibold text-charcoal-900">{child.name}</span>
                          <span className="block text-sm text-charcoal-500">{child.description}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link href="#quote" className="btn-primary">
                Get Free Quote
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-charcoal-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'lg:hidden bg-white border-t border-charcoal-100 overflow-hidden transition-all duration-300',
            mobileMenuOpen ? 'max-h-screen' : 'max-h-0'
          )}
        >
          <div className="px-6 py-4 space-y-4">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.children ? (
                  <div className="space-y-2">
                    <span className="font-semibold text-charcoal-900">{item.name}</span>
                    <div className="pl-4 space-y-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block text-charcoal-600 hover:text-primary-600"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block font-semibold text-charcoal-900 hover:text-primary-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <Link href="#quote" className="btn-primary w-full text-center" onClick={() => setMobileMenuOpen(false)}>
              Get Free Quote
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}
