import { NextRequest, NextResponse } from 'next/server'

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

    // Log the quote request
    console.log('Quote request received:', {
      name: data.name,
      email: data.email,
      company: data.companyName,
      type: data.companyType,
      submittedAt: new Date().toISOString(),
    })

    // In production, integrate with your CRM or database here
    // Example: await saveToDatabase(data)
    // Example: await sendNotificationEmail(data)

    return NextResponse.json({
      success: true,
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
