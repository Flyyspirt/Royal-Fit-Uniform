import { NextRequest, NextResponse } from 'next/server'
import { getLocalLeads, clearLocalLeads } from '@/lib/airtable-with-fallback'

/**
 * GET /api/test-leads
 * View all locally stored test leads
 */
export async function GET(request: NextRequest) {
  try {
    const leads = getLocalLeads()

    return NextResponse.json({
      success: true,
      count: leads.length,
      leads: leads,
      message: leads.length > 0
        ? `Found ${leads.length} test lead(s)`
        : 'No test leads yet. Submit a quote to create one!',
    })
  } catch (error: any) {
    console.error('Error fetching test leads:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/test-leads
 * Clear all locally stored test leads
 */
export async function DELETE(request: NextRequest) {
  try {
    clearLocalLeads()

    return NextResponse.json({
      success: true,
      message: 'All test leads cleared',
    })
  } catch (error: any) {
    console.error('Error clearing test leads:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
