import { NavLink, Product, Testimonial } from './types';
import { ASSETS } from './assets';

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'Hospitality', path: '/hospitality' },
  { label: 'Healthcare', path: '/healthcare' },
  { label: 'Corporate', path: '/corporate' },
  { label: 'Our Story', path: '/story' },
  { label: 'Bulk Order', path: '/bulk-order' },
  { label: 'Contact', path: '/contact' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'hosp-1',
    name: 'Banquet Staff Vest',
    description: 'Engineered for premium service: stain-resistant, durable vest in royal navy with gold trim. Ideal for high-traffic banquet environments.',
    priceRange: '₹800 - ₹1200',
    category: 'Hospitality',
    imageUrl: ASSETS.PRODUCTS.HOSP_VEST,
    features: ['Stain Resistant', 'Adjustable Back', 'Premium Poly-Viscose'],
  },
  {
    id: 'hosp-2',
    name: 'Chef Executive Jacket',
    description: 'Breathable cotton blend with double-breasted design and cool vent technology. Navy accents for a premium look in open kitchens.',
    priceRange: '₹1200 - ₹1800',
    category: 'Hospitality',
    imageUrl: ASSETS.PRODUCTS.HOSP_CHEF,
    features: ['Cool Vent Technology', 'Thermometer Pocket', 'Easy Care'],
  },
  {
    id: 'hosp-3',
    name: 'Housekeeping Tunic',
    description: 'Flexible, fade-resistant tunics designed for ease of movement. Navy tones conceal wear while maintaining a crisp appearance.',
    priceRange: '₹600 - ₹900',
    category: 'Hospitality',
    imageUrl: ASSETS.PRODUCTS.HOSP_TUNIC,
    features: ['Fade Resistant', 'High Mobility Cut', 'Multiple Pockets'],
  },
  {
    id: 'health-1',
    name: 'Premium Scrub Set',
    description: 'Antimicrobial fabric scrubs in deep navy. Provides all-day comfort and fluid resistance for medical professionals.',
    priceRange: '₹900 - ₹1500',
    category: 'Healthcare',
    imageUrl: ASSETS.PRODUCTS.HEALTH_SCRUBS,
    features: ['Antimicrobial', '4-Way Stretch', 'Moisture Wicking'],
  },
  {
    id: 'health-2',
    name: 'Lab Coat Professional',
    description: 'Classic white lab coat with liquid-repellent fabric, reinforced stitching, and tablet pockets for modern technicians.',
    priceRange: '₹700 - ₹1100',
    category: 'Healthcare',
    imageUrl: ASSETS.PRODUCTS.HEALTH_LAB,
    features: ['Liquid Repellent', 'Tablet Pocket', 'Side Vent Access'],
  },
  {
    id: 'corp-1',
    name: 'Corporate Blazer',
    description: 'Sharp, tailored fit navy blazers with subtle gold piping. Instills confidence and brand alignment in client-facing roles.',
    priceRange: '₹2500 - ₹4000',
    category: 'Corporate',
    imageUrl: ASSETS.PRODUCTS.CORP_BLAZER,
    features: ['Wrinkle Free', 'Fully Lined', 'Internal Pockets'],
  },
  {
    id: 'corp-2',
    name: 'Formal Office Shirt',
    description: 'Crisp white shirts with reinforced stitching. Breathable fabric designed for the Indian climate and all-day office comfort.',
    priceRange: '₹800 - ₹1500',
    category: 'Corporate',
    imageUrl: ASSETS.PRODUCTS.CORP_SHIRT,
    features: ['Easy Iron', 'Breathable', 'Classic Collar'],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Rajesh Kumar',
    role: 'Operations Manager',
    company: 'Grand Hotel Hyderabad',
    text: 'Royal Fit changed how our staff presents themselves. The durability is unmatched.',
  },
  {
    id: 't2',
    name: 'Dr. Anita Desai',
    role: 'Chief Administrator',
    company: 'City Care Hospital',
    text: 'Comfortable, professional, and delivered on time. Highly recommended for healthcare uniforms.',
  },
];