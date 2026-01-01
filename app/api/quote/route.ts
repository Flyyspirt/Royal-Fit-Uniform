import { NextRequest, NextResponse } from 'next/server'
import { createLead } from '@/lib/airtable-with-fallback'

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

    // Create lead in Airtable (with local fallback for testing)
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

    // Build response message
    let message = 'Quote request submitted successfully'
    if (result.fallbackUsed) {
      message += ' (saved locally for testing - will sync to Airtable in production)'
    }

    // TODO: Send confirmation email via SendGrid
    // await sendConfirmationEmail(data.email, data.name)

    // TODO: Send notification to sales team
    // await sendSalesNotification(data)

    return NextResponse.json({
      success: true,
      recordId: result.recordId,
      message: message,
      mode: result.mode,
      fallbackUsed: result.fallbackUsed || false,
    })
  } catch (error) {
    console.error('Quote submission error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
