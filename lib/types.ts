export interface Product {
  id: string
  name: string
  category: 'hotel' | 'hospital'
  department: string
  description: string
  fabric: string
  features: string[]
  durabilityRating: number
  pricePerUnit: number
  sizes: string[]
  colors: string[]
  image: string
  customizable: boolean
  inStock: boolean
}

export interface CaseStudy {
  id: string
  sector: 'hotel' | 'hospital'
  clientType: string
  clientSize: string
  location: string
  challenge: string
  solution: string
  results: {
    metric: string
    value: string
    improvement: string
  }[]
  timeline: string
  testimonial: {
    quote: string
    author: string
    title: string
  }
  image: string
}

export interface Testimonial {
  id: string
  type: 'text' | 'video'
  sector: 'hotel' | 'hospital'
  quote: string
  author: string
  title: string
  company: string
  image: string
  rating: number
}

export interface QuoteFormData {
  // Step 1
  companyType: 'hotel' | 'hospital' | 'other'
  facilitySize: string
  hasCurrentSupplier: boolean
  currentSupplierName?: string
  timeline: 'urgent' | 'planned' | 'exploratory'
  // Step 2
  departments: string[]
  totalQuantity: number
  preferredColors: string[]
  customizationNeeds: {
    logo: boolean
    embroidery: boolean
    colorMatch: boolean
  }
  // Step 3
  name: string
  title: string
  email: string
  phone: string
  budgetRange?: string
  preferredContact: 'email' | 'phone' | 'whatsapp'
  marketingOptIn: boolean
}

export interface TrustBadge {
  id: string
  name: string
  icon: string
  description: string
}

export interface ServiceCategory {
  id: string
  title: string
  description: string
  departments: {
    name: string
    features: string[]
    specs: string
  }[]
  image: string
  href: string
}
