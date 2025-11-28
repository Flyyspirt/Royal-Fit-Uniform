export type Category = 'Hospitality' | 'Healthcare' | 'Corporate';

export interface Product {
  id: string;
  name: string;
  description: string;
  priceRange: string;
  category: Category;
  imageUrl: string;
  features: string[];
}

export interface NavLink {
  label: string;
  path: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
}