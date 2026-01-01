import { NextRequest, NextResponse } from 'next/server'
import { createOrder } from '@/lib/airtable'

/**
 * POST /api/orders
 * Create a new order in Airtable
 *
 * Body:
 * - leadId: Optional Airtable lead record ID
 * - customerName: Customer name
 * - companyName: Company name
 * - products: Array of product names
 * - totalItems: Total number of items
 * - subtotal: Subtotal amount
 * - discount: Discount percentage (optional)
 * - taxAmount: Tax amount
 * - totalAmount: Total amount
 * - paymentTerms: Payment terms (optional)
 * - shippingAddress: Shipping address
 * - notes: Additional notes (optional)
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.customerName || !data.companyName || !data.products || !data.totalItems ||
        data.subtotal === undefined || data.taxAmount === undefined || data.totalAmount === undefined ||
        !data.shippingAddress) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate products array
    if (!Array.isArray(data.products) || data.products.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Products must be a non-empty array' },
        { status: 400 }
      )
    }

    // Create order in Airtable
    const result = await createOrder({
      leadId: data.leadId,
      customerName: data.customerName,
      companyName: data.companyName,
      products: data.products,
      totalItems: data.totalItems,
      subtotal: data.subtotal,
      discount: data.discount,
      taxAmount: data.taxAmount,
      totalAmount: data.totalAmount,
      paymentTerms: data.paymentTerms,
      shippingAddress: data.shippingAddress,
      notes: data.notes,
    })

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      recordId: result.recordId,
      message: 'Order created successfully',
    })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
