/**
 * Airtable Integration for Royal Fit Uniform
 * 
 * This module handles all Airtable operations for:
 * - Lead capture from quote forms
 * - Product catalog management
 * - Order tracking
 */

interface AirtableConfig {
  apiKey: string
  baseId: string
}

interface LeadData {
  // Step 1 - Business Info
  companyType: 'hotel' | 'hospital' | 'other'
  companyName: string
  facilitySize: string
  hasCurrentSupplier: boolean
  currentSupplierName?: string
  timeline: 'urgent' | 'planned' | 'exploratory'
  
  // Step 2 - Requirements
  departments: string[]
  totalQuantity: string
  customizationNeeds: {
    logo: boolean
    embroidery: boolean
    colorMatch: boolean
  }
  
  // Step 3 - Contact
  name: string
  title: string
  email: string
  phone: string
  budgetRange?: string
  preferredContact: 'email' | 'phone' | 'whatsapp'
  marketingOptIn: boolean
  
  // Metadata
  source?: string
  submittedAt?: string
}

interface ProductData {
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

const AIRTABLE_API_URL = 'https://api.airtable.com/v0'

/**
 * Create a new lead in Airtable
 */
export async function createLead(data: LeadData): Promise<{ success: boolean; recordId?: string; error?: string }> {
  const apiKey = process.env.AIRTABLE_API_KEY
  const baseId = process.env.AIRTABLE_BASE_ID
  const tableName = process.env.AIRTABLE_LEADS_TABLE || 'Leads'

  if (!apiKey || !baseId) {
    console.error('Airtable configuration missing')
    return { success: false, error: 'Configuration error' }
  }

  try {
    const response = await fetch(`${AIRTABLE_API_URL}/${baseId}/${tableName}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              'Company Name': data.companyName,
              'Company Type': data.companyType,
              'Facility Size': data.facilitySize,
              'Has Current Supplier': data.hasCurrentSupplier,
              'Current Supplier': data.currentSupplierName || '',
              'Timeline': data.timeline,
              'Departments': data.departments.join(', '),
              'Total Quantity': data.totalQuantity,
              'Logo Customization': data.customizationNeeds.logo,
              'Embroidery': data.customizationNeeds.embroidery,
              'Color Match': data.customizationNeeds.colorMatch,
              'Contact Name': data.name,
              'Job Title': data.title,
              'Email': data.email,
              'Phone': data.phone,
              'Budget Range': data.budgetRange || '',
              'Preferred Contact': data.preferredContact,
              'Marketing Opt-in': data.marketingOptIn,
              'Source': data.source || 'Website',
              'Submitted At': data.submittedAt || new Date().toISOString(),
              'Status': 'New',
            },
          },
        ],
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Airtable error:', error)
      return { success: false, error: 'Failed to save lead' }
    }

    const result = await response.json()
    return { success: true, recordId: result.records[0].id }
  } catch (error) {
    console.error('Airtable request failed:', error)
    return { success: false, error: 'Network error' }
  }
}

/**
 * Fetch products from Airtable
 */
export async function getProducts(category?: 'hotel' | 'hospital'): Promise<ProductData[]> {
  const apiKey = process.env.AIRTABLE_API_KEY
  const baseId = process.env.AIRTABLE_BASE_ID
  const tableName = process.env.AIRTABLE_PRODUCTS_TABLE || 'Products'

  if (!apiKey || !baseId) {
    console.error('Airtable configuration missing')
    return []
  }

  try {
    let url = `${AIRTABLE_API_URL}/${baseId}/${tableName}`
    
    if (category) {
      url += `?filterByFormula={Category}="${category}"`
    }

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      console.error('Failed to fetch products')
      return []
    }

    const result = await response.json()
    
    return result.records.map((record: any) => ({
      id: record.id,
      name: record.fields['Name'],
      category: record.fields['Category'],
      department: record.fields['Department'],
      description: record.fields['Description'],
      fabric: record.fields['Fabric'],
      features: record.fields['Features']?.split(', ') || [],
      durabilityRating: record.fields['Durability Rating'] || 4,
      pricePerUnit: record.fields['Price Per Unit'] || 0,
      sizes: record.fields['Sizes']?.split(', ') || [],
      colors: record.fields['Colors']?.split(', ') || [],
      image: record.fields['Image']?.[0]?.url || '',
      customizable: record.fields['Customizable'] || false,
      inStock: record.fields['In Stock'] ?? true,
    }))
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return []
  }
}

/**
 * Update lead status
 */
export async function updateLeadStatus(
  recordId: string, 
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal Sent' | 'Won' | 'Lost'
): Promise<boolean> {
  const apiKey = process.env.AIRTABLE_API_KEY
  const baseId = process.env.AIRTABLE_BASE_ID
  const tableName = process.env.AIRTABLE_LEADS_TABLE || 'Leads'

  if (!apiKey || !baseId) {
    return false
  }

  try {
    const response = await fetch(`${AIRTABLE_API_URL}/${baseId}/${tableName}/${recordId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          'Status': status,
          'Updated At': new Date().toISOString(),
        },
      }),
    })

    return response.ok
  } catch (error) {
    console.error('Failed to update lead:', error)
    return false
  }
}
