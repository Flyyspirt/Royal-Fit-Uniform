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

/**
 * Get leads with optional filtering
 */
export async function getLeads(options?: {
  status?: string
  companyType?: 'hotel' | 'hospital' | 'other'
  timeline?: 'urgent' | 'planned' | 'exploratory'
  limit?: number
}): Promise<any[]> {
  const apiKey = process.env.AIRTABLE_API_KEY
  const baseId = process.env.AIRTABLE_BASE_ID
  const tableName = process.env.AIRTABLE_LEADS_TABLE || 'Leads'

  if (!apiKey || !baseId) {
    console.error('Airtable configuration missing')
    return []
  }

  try {
    let url = `${AIRTABLE_API_URL}/${baseId}/${tableName}`
    const params = new URLSearchParams()

    // Build filter formula
    const filters: string[] = []
    if (options?.status) {
      filters.push(`{Status}="${options.status}"`)
    }
    if (options?.companyType) {
      filters.push(`{Company Type}="${options.companyType}"`)
    }
    if (options?.timeline) {
      filters.push(`{Timeline}="${options.timeline}"`)
    }

    if (filters.length > 0) {
      const formula = filters.length > 1
        ? `AND(${filters.join(',')})`
        : filters[0]
      params.append('filterByFormula', formula)
    }

    if (options?.limit) {
      params.append('maxRecords', options.limit.toString())
    }

    params.append('sort[0][field]', 'Submitted At')
    params.append('sort[0][direction]', 'desc')

    const queryString = params.toString()
    if (queryString) {
      url += `?${queryString}`
    }

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    })

    if (!response.ok) {
      console.error('Failed to fetch leads')
      return []
    }

    const result = await response.json()
    return result.records.map((record: any) => ({
      id: record.id,
      ...record.fields,
    }))
  } catch (error) {
    console.error('Failed to fetch leads:', error)
    return []
  }
}

/**
 * Create an order in Airtable
 */
export async function createOrder(orderData: {
  leadId?: string
  customerName: string
  companyName: string
  products: string[]
  totalItems: number
  subtotal: number
  discount?: number
  taxAmount: number
  totalAmount: number
  paymentTerms?: string
  shippingAddress: string
  notes?: string
}): Promise<{ success: boolean; recordId?: string; error?: string }> {
  const apiKey = process.env.AIRTABLE_API_KEY
  const baseId = process.env.AIRTABLE_BASE_ID
  const tableName = process.env.AIRTABLE_ORDERS_TABLE || 'Orders'

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
              'Customer Name': orderData.customerName,
              'Company Name': orderData.companyName,
              'Order Date': new Date().toISOString(),
              'Products Ordered': orderData.products.join(', '),
              'Total Items': orderData.totalItems,
              'Subtotal': orderData.subtotal,
              'Discount (%)': orderData.discount || 0,
              'Tax Amount': orderData.taxAmount,
              'Total Amount': orderData.totalAmount,
              'Status': 'Draft',
              'Payment Status': 'Pending',
              'Payment Terms': orderData.paymentTerms || '30% Advance',
              'Shipping Address': orderData.shippingAddress,
              'Notes': orderData.notes || '',
            },
          },
        ],
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Airtable error:', error)
      return { success: false, error: 'Failed to create order' }
    }

    const result = await response.json()
    return { success: true, recordId: result.records[0].id }
  } catch (error) {
    console.error('Airtable request failed:', error)
    return { success: false, error: 'Network error' }
  }
}

/**
 * Get analytics data
 */
export async function getAnalytics(periodType?: 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly'): Promise<any[]> {
  const apiKey = process.env.AIRTABLE_API_KEY
  const baseId = process.env.AIRTABLE_BASE_ID
  const tableName = process.env.AIRTABLE_ANALYTICS_TABLE || 'Analytics'

  if (!apiKey || !baseId) {
    console.error('Airtable configuration missing')
    return []
  }

  try {
    let url = `${AIRTABLE_API_URL}/${baseId}/${tableName}`

    if (periodType) {
      url += `?filterByFormula={Period Type}="${periodType}"&sort[0][field]=Date&sort[0][direction]=desc`
    } else {
      url += `?sort[0][field]=Date&sort[0][direction]=desc`
    }

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) {
      console.error('Failed to fetch analytics')
      return []
    }

    const result = await response.json()
    return result.records.map((record: any) => ({
      id: record.id,
      ...record.fields,
    }))
  } catch (error) {
    console.error('Failed to fetch analytics:', error)
    return []
  }
}

/**
 * Calculate and store analytics for a given period
 */
export async function calculateAnalytics(date: Date, periodType: 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly'): Promise<boolean> {
  const apiKey = process.env.AIRTABLE_API_KEY
  const baseId = process.env.AIRTABLE_BASE_ID

  if (!apiKey || !baseId) {
    return false
  }

  try {
    // Get all leads for the period
    const leads = await getLeads()

    // Calculate metrics
    const totalLeads = leads.length
    const qualifiedLeads = leads.filter(l =>
      l.Status === 'Qualified' || l.Status === 'Proposal Sent' || l.Status === 'Won'
    ).length
    const conversionRate = totalLeads > 0 ? (qualifiedLeads / totalLeads) * 100 : 0

    // Store analytics
    const tableName = process.env.AIRTABLE_ANALYTICS_TABLE || 'Analytics'
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
              'Date': date.toISOString().split('T')[0],
              'Period Type': periodType,
              'Total Leads': totalLeads,
              'Qualified Leads': qualifiedLeads,
              'Conversion Rate (%)': parseFloat(conversionRate.toFixed(2)),
            },
          },
        ],
      }),
    })

    return response.ok
  } catch (error) {
    console.error('Failed to calculate analytics:', error)
    return false
  }
}

/**
 * Batch update multiple records
 */
export async function batchUpdateLeads(
  updates: Array<{ recordId: string; fields: Record<string, any> }>
): Promise<boolean> {
  const apiKey = process.env.AIRTABLE_API_KEY
  const baseId = process.env.AIRTABLE_BASE_ID
  const tableName = process.env.AIRTABLE_LEADS_TABLE || 'Leads'

  if (!apiKey || !baseId) {
    return false
  }

  try {
    // Airtable allows max 10 records per batch update
    const batches = []
    for (let i = 0; i < updates.length; i += 10) {
      batches.push(updates.slice(i, i + 10))
    }

    for (const batch of batches) {
      const response = await fetch(`${AIRTABLE_API_URL}/${baseId}/${tableName}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          records: batch.map(update => ({
            id: update.recordId,
            fields: update.fields,
          })),
        }),
      })

      if (!response.ok) {
        console.error('Batch update failed')
        return false
      }
    }

    return true
  } catch (error) {
    console.error('Batch update error:', error)
    return false
  }
}
