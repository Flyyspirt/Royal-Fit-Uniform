import { NextRequest, NextResponse } from 'next/server'
import { createLead } from '@/lib/airtable'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.email || !data.name || !data.phone) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create lead in Airtable
    const result = await createLead({
      ...data,
      source: 'Website Quote Form',
      submittedAt: new Date().toISOString(),
    })

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      )
    }

    // TODO: Send confirmation email via SendGrid
    // await sendConfirmationEmail(data.email, data.name)

    // TODO: Send notification to sales team
    // await sendSalesNotification(data)

    return NextResponse.json({
      success: true,
      recordId: result.recordId,
      message: 'Quote request submitted successfully',
    })
  } catch (error) {
    console.error('Quote submission error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
