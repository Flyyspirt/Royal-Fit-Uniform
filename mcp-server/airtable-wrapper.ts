/**
 * Airtable wrapper for MCP server
 * This file provides Airtable functionality for the MCP server
 */

interface LeadData {
  companyName: string
  companyType: 'hotel' | 'hospital' | 'other'
  facilitySize: string
  hasCurrentSupplier: boolean
  currentSupplierName?: string
  timeline: 'urgent' | 'planned' | 'exploratory'
  departments: string[]
  totalQuantity: string
  customizationNeeds: {
    logo: boolean
    embroidery: boolean
    colorMatch: boolean
  }
  name: string
  title: string
  email: string
  phone: string
  budgetRange?: string
  preferredContact: 'email' | 'phone' | 'whatsapp'
  marketingOptIn: boolean
  source?: string
  submittedAt?: string
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
