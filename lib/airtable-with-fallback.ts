/**
 * Airtable Integration with Local Fallback for Testing
 *
 * This module attempts to use Airtable, but falls back to local storage
 * when network is unavailable (for testing in restricted environments)
 */

import * as fs from 'fs'
import * as path from 'path'

interface AirtableConfig {
  apiKey: string
  baseId: string
}

interface LeadData {
  companyType: 'hotel' | 'hospital' | 'other'
  companyName: string
  facilitySize: string
  hasCurrentSupplier?: boolean
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
const LOCAL_STORAGE_PATH = path.join(process.cwd(), 'data', 'test-leads.json')

/**
 * Ensure data directory exists
 */
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

/**
 * Save lead to local JSON file (fallback)
 */
function saveLeadLocally(data: LeadData): { success: boolean; recordId: string; mode: 'local' } {
  ensureDataDir()

  const recordId = `rec${Date.now()}${Math.random().toString(36).substr(2, 9)}`
  const record = {
    id: recordId,
    fields: {
      'Company Name': data.companyName,
      'Company Type': data.companyType,
      'Facility Size': data.facilitySize,
      'Has Current Supplier': data.hasCurrentSupplier || false,
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
    createdTime: new Date().toISOString(),
  }

  // Read existing leads
  let leads: any[] = []
  if (fs.existsSync(LOCAL_STORAGE_PATH)) {
    const content = fs.readFileSync(LOCAL_STORAGE_PATH, 'utf8')
    leads = JSON.parse(content)
  }

  // Add new lead
  leads.push(record)

  // Save to file
  fs.writeFileSync(LOCAL_STORAGE_PATH, JSON.stringify(leads, null, 2), 'utf8')

  console.log('✅ Lead saved locally:', recordId)
  console.log('📁 Location:', LOCAL_STORAGE_PATH)
  console.log('📊 Total leads:', leads.length)

  return { success: true, recordId, mode: 'local' }
}

/**
 * Create a new lead in Airtable (with local fallback)
 */
export async function createLead(data: LeadData): Promise<{
  success: boolean
  recordId?: string
  error?: string
  mode?: 'airtable' | 'local'
  fallbackUsed?: boolean
}> {
  const apiKey = process.env.AIRTABLE_API_KEY
  const baseId = process.env.AIRTABLE_BASE_ID
  const tableName = process.env.AIRTABLE_LEADS_TABLE || 'Leads'

  // Check if in development mode
  const isDevelopment = process.env.NODE_ENV === 'development'

  if (!apiKey || !baseId) {
    console.error('⚠️ Airtable configuration missing')

    if (isDevelopment) {
      console.log('📝 Using local fallback mode...')
      const localResult = saveLeadLocally(data)
      return {
        ...localResult,
        fallbackUsed: true,
        mode: 'local'
      }
    }

    return { success: false, error: 'Configuration error' }
  }

  try {
    console.log('📡 Attempting to connect to Airtable...')

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
              'Has Current Supplier': data.hasCurrentSupplier || false,
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
      console.error('❌ Airtable API error:', error)

      if (isDevelopment) {
        console.log('📝 Falling back to local storage...')
        const localResult = saveLeadLocally(data)
        return {
          ...localResult,
          fallbackUsed: true,
          error: 'Airtable unavailable, saved locally'
        }
      }

      return { success: false, error: 'Failed to save lead' }
    }

    const result = await response.json()
    console.log('✅ Lead saved to Airtable:', result.records[0].id)

    return {
      success: true,
      recordId: result.records[0].id,
      mode: 'airtable'
    }

  } catch (error: any) {
    console.error('❌ Network error connecting to Airtable:', error.message)

    // Use fallback in development
    if (isDevelopment) {
      console.log('📝 Network unavailable. Using local fallback...')
      const localResult = saveLeadLocally(data)
      return {
        ...localResult,
        fallbackUsed: true,
        error: `Network error: ${error.message}. Saved locally for testing.`
      }
    }

    return { success: false, error: 'Network error' }
  }
}

/**
 * Get all locally stored leads (for development)
 */
export function getLocalLeads(): any[] {
  if (!fs.existsSync(LOCAL_STORAGE_PATH)) {
    return []
  }

  const content = fs.readFileSync(LOCAL_STORAGE_PATH, 'utf8')
  return JSON.parse(content)
}

/**
 * Clear local leads (for development)
 */
export function clearLocalLeads(): void {
  if (fs.existsSync(LOCAL_STORAGE_PATH)) {
    fs.unlinkSync(LOCAL_STORAGE_PATH)
    console.log('🗑️ Local leads cleared')
  }
}
