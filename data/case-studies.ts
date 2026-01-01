import { CaseStudy } from '@/lib/types'

export const caseStudies: CaseStudy[] = [
  {
    id: 'cs-hotel-001',
    sector: 'hotel',
    clientType: '4-Star Business Hotel',
    clientSize: '150 Rooms, 85 Staff',
    location: 'Bangalore',
    challenge: 'High staff turnover was causing frequent uniform replacements, leading to brand inconsistency across departments. The existing uniforms were uncomfortable for long shifts and showed visible wear after only 20 wash cycles.',
    solution: 'Implemented a comprehensive uniform program with custom color-coded sets for 5 departments. Delivered 180-piece initial order with a quarterly replenishment schedule. Each uniform was designed with enhanced durability fabrics and ergonomic cuts for all-day comfort.',
    results: [
      { metric: 'Replacement Frequency', value: '-40%', improvement: 'Uniforms now last 50+ wash cycles' },
      { metric: 'Staff Satisfaction', value: '+65%', improvement: 'Comfort ratings improved significantly' },
      { metric: 'Brand Consistency', value: '100%', improvement: 'All departments now visually unified' },
    ],
    timeline: 'Quote to delivery in 4 weeks, full implementation in 6 weeks',
    testimonial: {
      quote: 'Royal Fit transformed our staff appearance completely. The quality improvement was immediately noticed by our guests, and our team loves the comfort of the new uniforms.',
      author: 'HR Director',
      title: '4-Star Business Hotel, Bangalore',
    },
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
  },
  {
    id: 'cs-hospital-001',
    sector: 'hospital',
    clientType: 'Multi-Specialty Hospital',
    clientSize: '300 Beds, 450 Medical Staff',
    location: 'Hyderabad',
    challenge: 'Finding quality uniforms that met our standards was proving difficult. High-volume industrial laundering was causing uniforms to deteriorate rapidly.',
    solution: 'Deployed quality scrubs across 4 departments. Implemented industrial-wash-rated uniforms designed to maintain quality through many wash cycles. Created department-specific color coding for easy identification.',
    results: [
      { metric: 'Replacement Costs', value: '-45%', improvement: 'Extended uniform lifespan significantly' },
      { metric: 'Infection Control', value: '100%', improvement: 'Full compliance with all standards' },
      { metric: 'Staff Feedback', value: '+78%', improvement: 'Comfort and fit satisfaction' },
    ],
    timeline: 'Quote to delivery in 3 weeks, phased implementation over 5 weeks',
    testimonial: {
      quote: 'Finding a uniform supplier who understood healthcare needs was challenging until we found Royal Fit. Their attention to quality and durability has been exceptional.',
      author: 'Chief Medical Officer',
      title: 'Multi-Specialty Hospital, Hyderabad',
    },
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
  },
  {
    id: 'cs-hospital-002',
    sector: 'hospital',
    clientType: 'Private Healthcare Network',
    clientSize: '3 Facilities, 200 Beds Total',
    location: 'Chennai',
    challenge: 'Managing uniform consistency across multiple facilities was proving difficult. Each location had developed its own approach, creating brand fragmentation and procurement inefficiencies.',
    solution: 'Centralized uniform program across all 3 facilities with standardized designs. Implemented a unified ordering portal with facility-specific delivery. Created size exchange program to minimize waste.',
    results: [
      { metric: 'Procurement Costs', value: '-30%', improvement: 'Bulk ordering economies' },
      { metric: 'Brand Consistency', value: '100%', improvement: 'Unified appearance across all facilities' },
      { metric: 'Admin Time', value: '-60%', improvement: 'Streamlined ordering process' },
    ],
    timeline: 'Full network implementation in 8 weeks',
    testimonial: {
      quote: 'Royal Fit helped us create a cohesive brand identity across our healthcare network. The centralized approach has saved us significant time and money.',
      author: 'Operations Director',
      title: 'Private Healthcare Network, Chennai',
    },
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800',
  },
]

export const hotelCaseStudies = caseStudies.filter(cs => cs.sector === 'hotel')
export const hospitalCaseStudies = caseStudies.filter(cs => cs.sector === 'hospital')
