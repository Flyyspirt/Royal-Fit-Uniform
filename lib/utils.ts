import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}

export function calculateBulkDiscount(basePrice: number, quantity: number): number {
  if (quantity >= 500) return basePrice * 0.75
  if (quantity >= 200) return basePrice * 0.80
  if (quantity >= 100) return basePrice * 0.85
  if (quantity >= 50) return basePrice * 0.90
  return basePrice
}

export function getDiscountPercentage(quantity: number): number {
  if (quantity >= 500) return 25
  if (quantity >= 200) return 20
  if (quantity >= 100) return 15
  if (quantity >= 50) return 10
  return 0
}
