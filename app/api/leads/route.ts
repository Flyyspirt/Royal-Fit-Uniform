import { NextRequest, NextResponse } from 'next/server'

interface AirtableRecord {
  id: string
  fields: {
    [key: string]: any
  }
  createdTime: string
}

interface AirtableResponse {
  records: AirtableRecord[]
  offset?: string
}

export async function GET(request: NextRequest) {
  try {
    // Check for API key in environment
    if (!process.env.AIRTABLE_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'Airtable not configured' },
        { status: 500 }
      )
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const limit = searchParams.get('limit') || '100'
    const offset = searchParams.get('offset')

    // Build filter formula
    let filterFormula = ''
    if (status) {
      filterFormula = `{Status} = '${status}'`
    }

    // Build URL with query parameters
    const params = new URLSearchParams({
      pageSize: limit,
      sort: JSON.stringify([{ field: 'Submitted At', direction: 'desc' }]),
    })

    if (filterFormula) {
      params.append('filterByFormula', filterFormula)
    }

    if (offset) {
      params.append('offset', offset)
    }

    // Fetch from Airtable
    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${encodeURIComponent(process.env.AIRTABLE_TABLE_NAME || 'Quote Requests')}?${params}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Airtable API error:', errorData)
      throw new Error(`Airtable API error: ${response.status}`)
    }

    const data: AirtableResponse = await response.json()

    // Transform records for easier consumption
    const leads = data.records.map((record) => ({
      id: record.id,
      createdTime: record.createdTime,
      ...record.fields,
    }))

    return NextResponse.json({
      success: true,
      leads,
      offset: data.offset,
      hasMore: !!data.offset,
    })
  } catch (error) {
    console.error('Lead retrieval error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error'
      },
      { status: 500 }
    )
  }
}

// Update a lead's status
export async function PATCH(request: NextRequest) {
  try {
    if (!process.env.AIRTABLE_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'Airtable not configured' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { recordId, fields } = body

    if (!recordId) {
      return NextResponse.json(
        { success: false, error: 'Record ID is required' },
        { status: 400 }
      )
    }

    // Update record in Airtable
    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${encodeURIComponent(process.env.AIRTABLE_TABLE_NAME || 'Quote Requests')}/${recordId}`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields }),
      }
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Airtable API error:', errorData)
      throw new Error(`Airtable API error: ${response.status}`)
    }

    const updatedRecord = await response.json()

    return NextResponse.json({
      success: true,
      record: {
        id: updatedRecord.id,
        ...updatedRecord.fields,
      },
    })
  } catch (error) {
    console.error('Lead update error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error'
      },
      { status: 500 }
    )
  }
}
