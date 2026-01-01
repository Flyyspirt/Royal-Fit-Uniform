import { NextRequest, NextResponse } from 'next/server'
import { getLeads, updateLeadStatus } from '@/lib/airtable'

/**
 * GET /api/leads
 * Fetch leads with optional filtering
 *
 * Query params:
 * - status: Filter by status (New, Contacted, Qualified, etc.)
 * - companyType: Filter by company type (hotel, hospital, other)
 * - timeline: Filter by timeline (urgent, planned, exploratory)
 * - limit: Maximum number of records to return
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status') || undefined
    const companyType = searchParams.get('companyType') as 'hotel' | 'hospital' | 'other' | undefined
    const timeline = searchParams.get('timeline') as 'urgent' | 'planned' | 'exploratory' | undefined
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined

    const leads = await getLeads({
      status,
      companyType,
      timeline,
      limit,
    })

    return NextResponse.json({
      success: true,
      data: leads,
      count: leads.length,
    })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leads' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/leads
 * Update lead status
 *
 * Body:
 * - recordId: Airtable record ID
 * - status: New status value
 */
export async function PATCH(request: NextRequest) {
  try {
    const { recordId, status } = await request.json()

    if (!recordId || !status) {
      return NextResponse.json(
        { success: false, error: 'Missing recordId or status' },
        { status: 400 }
      )
    }

    const validStatuses = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status value' },
        { status: 400 }
      )
    }

    const result = await updateLeadStatus(recordId, status)

    if (result) {
      return NextResponse.json({
        success: true,
        message: 'Lead status updated successfully',
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to update lead status' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error updating lead:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
