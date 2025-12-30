'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter, ArrowRight } from 'lucide-react'

const footerLinks = {
  solutions: [
    { name: 'Hotel Uniforms', href: '/solutions/hotel-uniforms' },
    { name: 'Hospital Uniforms', href: '/solutions/hospital-uniforms' },
    { name: 'Custom Designs', href: '#quote' },
    { name: 'Bulk Orders', href: '#quote' },
  ],
  company: [
    { name: 'About Us', href: '#' },
    { name: 'Case Studies', href: '#case-studies' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Careers', href: '#' },
  ],
  support: [
    { name: 'Contact Us', href: '#contact' },
    { name: 'FAQ', href: '#' },
    { name: 'Size Guide', href: '#' },
    { name: 'Care Instructions', href: '#' },
  ],
}

const certifications = [
  'GST Registered',
  'ISO 9001:2015',
  'Antimicrobial Certified',
]

export default function Footer() {
  return (
    <footer id="contact" className="bg-charcoal-950 text-white">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-2">
                Ready to Transform Your Team's Image?
              </h3>
              <p className="text-primary-100">
                Get a free quote and consultation within 24 hours.
              </p>
            </div>
            <Link href="#quote" className="btn-gold whitespace-nowrap">
              Request Free Quote
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-sm flex items-center justify-center">
                <span className="text-white font-display text-xl font-bold">RF</span>
              </div>
              <div>
                <span className="font-display text-2xl font-bold">Royal Fit</span>
                <span className="block text-xs text-charcoal-400 tracking-widest uppercase">Uniform Excellence</span>
              </div>
            </div>
            
            <p className="text-charcoal-300 mb-6 max-w-sm">
              India's trusted B2B uniform partner for hotels and hospitals. 
              Premium quality, customization, and reliability since 2008.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a href="tel:+919876543210" className="flex items-center gap-3 text-charcoal-300 hover:text-white transition-colors">
                <Phone className="w-5 h-5 text-primary-500" />
                +91 98765 43210
              </a>
              <a href="mailto:info@royalfit.in" className="flex items-center gap-3 text-charcoal-300 hover:text-white transition-colors">
                <Mail className="w-5 h-5 text-primary-500" />
                info@royalfit.in
              </a>
              <div className="flex items-start gap-3 text-charcoal-300">
                <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <span>
                  123 Industrial Area, Phase 2<br />
                  Hyderabad, Telangana 500032
                </span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-4 mt-6">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-charcoal-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Solutions</h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-charcoal-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-charcoal-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-charcoal-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Certifications */}
            <div className="mt-8">
              <h4 className="font-semibold text-lg mb-4">Certifications</h4>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <span
                    key={cert}
                    className="px-3 py-1 bg-charcoal-800 rounded-full text-xs text-charcoal-300"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-charcoal-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-charcoal-400 text-sm">
              © {new Date().getFullYear()} Royal Fit Uniform. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="text-charcoal-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-charcoal-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-charcoal-400 hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
