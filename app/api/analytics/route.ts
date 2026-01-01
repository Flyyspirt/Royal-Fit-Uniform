import { NextRequest, NextResponse } from 'next/server'
import { getAnalytics, calculateAnalytics } from '@/lib/airtable'

/**
 * GET /api/analytics
 * Fetch analytics data
 *
 * Query params:
 * - periodType: Filter by period type (Daily, Weekly, Monthly, Quarterly)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const periodType = searchParams.get('periodType') as 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly' | undefined

    const analytics = await getAnalytics(periodType)

    return NextResponse.json({
      success: true,
      data: analytics,
      count: analytics.length,
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/analytics
 * Calculate and store analytics for a given period
 *
 * Body:
 * - date: Date string (ISO format)
 * - periodType: Period type (Daily, Weekly, Monthly, Quarterly)
 */
export async function POST(request: NextRequest) {
  try {
    const { date, periodType } = await request.json()

    if (!date || !periodType) {
      return NextResponse.json(
        { success: false, error: 'Missing date or periodType' },
        { status: 400 }
      )
    }

    const validPeriodTypes = ['Daily', 'Weekly', 'Monthly', 'Quarterly']
    if (!validPeriodTypes.includes(periodType)) {
      return NextResponse.json(
        { success: false, error: 'Invalid periodType value' },
        { status: 400 }
      )
    }

    const analyticsDate = new Date(date)
    const result = await calculateAnalytics(analyticsDate, periodType)

    if (result) {
      return NextResponse.json({
        success: true,
        message: 'Analytics calculated and stored successfully',
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to calculate analytics' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error calculating analytics:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
