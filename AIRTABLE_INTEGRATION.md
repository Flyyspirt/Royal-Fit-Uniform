# Airtable Integration Requirements - Royal Fit Uniform

## Overview
This document outlines how customer quote requests are captured from the website and stored in Airtable for lead management and follow-up.

---

## 1. Customer Data Collection

### Data Collected from Quote Form (3-Step Form)

#### **Step 1: Business Information**
| Field Name | Type | Required | Example Values |
|------------|------|----------|----------------|
| `companyType` | String | Yes | `hotel`, `hospital`, `other` |
| `companyName` | String | Yes | "Grand Hotel Mumbai" |
| `facilitySize` | String | Yes | `small`, `medium`, `large`, `enterprise` |
| `timeline` | String | Yes | `urgent`, `planned`, `exploratory` |

#### **Step 2: Uniform Requirements**
| Field Name | Type | Required | Example Values |
|------------|------|----------|----------------|
| `departments` | Array[String] | No | `["Front of House", "Housekeeping"]` |
| `totalQuantity` | String | Yes | `under-50`, `50-100`, `100-200`, `200-500`, `500+` |
| `customizationNeeds` | Object | No | `{ logo: true, embroidery: false, colorMatch: true }` |

#### **Step 3: Contact Information**
| Field Name | Type | Required | Example Values |
|------------|------|----------|----------------|
| `name` | String | Yes | "Rajesh Kumar" |
| `title` | String | No | "Procurement Manager" |
| `email` | String | Yes | "rajesh@grandhotel.com" |
| `phone` | String | Yes | "+91 93465 49694" |
| `budgetRange` | String | No | `under-1L`, `1-5L`, `5-10L`, `10L+` |
| `preferredContact` | String | Yes | `email`, `phone`, `whatsapp` |
| `marketingOptIn` | Boolean | No | `true` / `false` |

---

## 2. Airtable Base Structure

### Recommended Base Name: `Royal Fit Uniform - CRM`

### Table 1: **Quote Requests** (Main Leads Table)

| Field Name | Airtable Type | Description | Mapped From |
|------------|---------------|-------------|-------------|
| **Record ID** | Auto Number | Unique identifier | Auto-generated |
| **Lead Name** | Single Line Text | Contact person name | `formData.name` |
| **Company Name** | Single Line Text | Organization name | `formData.companyName` |
| **Email** | Email | Contact email | `formData.email` |
| **Phone** | Phone | Contact phone | `formData.phone` |
| **Job Title** | Single Line Text | Contact's role | `formData.title` |
| **Company Type** | Single Select | Hotel/Hospital/Other | `formData.companyType` |
| **Facility Size** | Single Select | Staff count range | `formData.facilitySize` |
| **Timeline** | Single Select | Urgency level | `formData.timeline` |
| **Departments** | Multiple Select | Departments needing uniforms | `formData.departments` (array) |
| **Total Quantity** | Single Select | Volume estimate | `formData.totalQuantity` |
| **Budget Range** | Single Select | Budget estimate | `formData.budgetRange` |
| **Logo Printing** | Checkbox | Needs logo printing | `formData.customizationNeeds.logo` |
| **Embroidery** | Checkbox | Needs embroidery | `formData.customizationNeeds.embroidery` |
| **Custom Colors** | Checkbox | Needs color matching | `formData.customizationNeeds.colorMatch` |
| **Preferred Contact** | Single Select | Email/Phone/WhatsApp | `formData.preferredContact` |
| **Marketing Opt-In** | Checkbox | Newsletter consent | `formData.marketingOptIn` |
| **Status** | Single Select | Lead status | Default: "New Lead" |
| **Submitted At** | Date & Time | Submission timestamp | Auto-generated |
| **Source** | Single Line Text | Lead source | Default: "Website Quote Form" |
| **Notes** | Long Text | Internal notes | Empty (for team use) |
| **Assigned To** | Collaborator | Sales rep assigned | Empty (manual assignment) |

#### Status Field Options (Suggested):
- 🔵 New Lead
- 📧 Contacted
- 💬 In Discussion
- 📝 Quote Sent
- ✅ Won
- ❌ Lost
- ⏸️ On Hold

---

## 3. Airtable Integration Flow

### Trigger: Form Submission

```
Customer fills form → Submit button clicked → POST /api/quote → Airtable API → Record created
```

### Step-by-Step Process:

1. **Customer submits quote form** (all 3 steps completed)
2. **Frontend validation** passes
3. **POST request** sent to `/app/api/quote/route.ts`
4. **API route processes** the submission:
   - Validates required fields
   - Formats data for Airtable
   - Sends to Airtable API
5. **Airtable receives data** and creates new record
6. **Confirmation** sent back to customer
7. **Optional**: Trigger Airtable automation for notifications

---

## 4. Implementation Details

### Environment Variables Required

Add to `.env.local`:

```bash
# Airtable Configuration
AIRTABLE_API_KEY=patXXXXXXXXXXXXXXXX      # Personal Access Token
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX        # Base ID
AIRTABLE_TABLE_NAME=Quote Requests         # Table name (or use Table ID)
```

### API Route Enhancement (`/app/api/quote/route.ts`)

The current route needs to be updated to integrate with Airtable:

```typescript
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

    // Prepare Airtable record
    const airtableRecord = {
      fields: {
        "Lead Name": data.name,
        "Company Name": data.companyName || "",
        "Email": data.email,
        "Phone": data.phone,
        "Job Title": data.title || "",
        "Company Type": capitalizeType(data.companyType),
        "Facility Size": formatFacilitySize(data.facilitySize),
        "Timeline": capitalizeTimeline(data.timeline),
        "Departments": data.departments || [],
        "Total Quantity": data.totalQuantity || "",
        "Budget Range": data.budgetRange || "",
        "Logo Printing": data.customizationNeeds?.logo || false,
        "Embroidery": data.customizationNeeds?.embroidery || false,
        "Custom Colors": data.customizationNeeds?.colorMatch || false,
        "Preferred Contact": capitalizeContact(data.preferredContact),
        "Marketing Opt-In": data.marketingOptIn || false,
        "Status": "New Lead",
        "Submitted At": new Date().toISOString(),
        "Source": "Website Quote Form"
      }
    }

    // Send to Airtable
    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(airtableRecord),
      }
    )

    if (!response.ok) {
      throw new Error('Failed to save to Airtable')
    }

    const airtableData = await response.json()

    return NextResponse.json({
      success: true,
      message: 'Quote request submitted successfully',
      recordId: airtableData.id
    })

  } catch (error) {
    console.error('Quote submission error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

---

## 5. Data Transformation Rules

### Helper Functions for Field Formatting:

| Function | Purpose | Input → Output |
|----------|---------|----------------|
| `capitalizeType()` | Format company type | `hotel` → `Hotel` |
| `formatFacilitySize()` | Format size label | `small` → `Small (Under 50 staff)` |
| `capitalizeTimeline()` | Format timeline | `urgent` → `Urgent (2 weeks)` |
| `capitalizeContact()` | Format contact method | `email` → `Email` |

---

## 6. Airtable Automation Suggestions

### Automation 1: **Instant Email Notification**
- **Trigger**: When record is created
- **Action**: Send email to sales team
- **Template**: Include all lead details + link to Airtable record

### Automation 2: **Lead Assignment**
- **Trigger**: When record is created
- **Condition**: Based on `Company Type` or `Timeline`
- **Action**: Assign to specific sales rep
  - Hotels → Assign to Hotel Sales Rep
  - Hospitals → Assign to Healthcare Sales Rep
  - Urgent → Assign to Senior Sales Manager

### Automation 3: **Follow-up Reminders**
- **Trigger**: When record is created and status is "New Lead"
- **Condition**: 24 hours after creation
- **Action**: Send Slack/Email reminder if still "New Lead"

---

## 7. Security Best Practices

### ✅ DO:
- Store Airtable API key in environment variables (never commit)
- Use Personal Access Token (not deprecated API key)
- Validate all input data before sending
- Implement rate limiting on API route
- Log errors for debugging

### ❌ DON'T:
- Expose Airtable credentials in frontend code
- Trust client-side validation alone
- Send unvalidated data to Airtable
- Include sensitive API keys in version control

---

## 8. Testing Checklist

Before deploying to production:

- [ ] Airtable base and table created with correct field types
- [ ] Environment variables configured in hosting platform
- [ ] Test form submission with all field combinations
- [ ] Verify data appears correctly in Airtable
- [ ] Test error handling (invalid data, API failures)
- [ ] Confirm email notifications work (if configured)
- [ ] Test on staging environment first
- [ ] Monitor logs for errors after deployment

---

## 9. Additional Features (Optional)

### Webhook Alternative
Instead of direct API call, use Airtable webhooks:
- Set up webhook URL on Airtable
- Send form data to webhook
- Airtable automatically creates record

### CRM Alternatives
If Airtable doesn't meet needs, consider:
- **HubSpot**: Full CRM with better automation
- **Pipedrive**: Sales-focused pipeline management
- **Zoho CRM**: Affordable with good India support
- **Google Sheets**: Simple alternative via Apps Script

---

## 10. Field Mapping Reference (Quick View)

```json
{
  "Lead Name": formData.name,
  "Company Name": formData.companyName,
  "Email": formData.email,
  "Phone": formData.phone,
  "Job Title": formData.title,
  "Company Type": formData.companyType,
  "Facility Size": formData.facilitySize,
  "Timeline": formData.timeline,
  "Departments": formData.departments,
  "Total Quantity": formData.totalQuantity,
  "Budget Range": formData.budgetRange,
  "Logo Printing": formData.customizationNeeds.logo,
  "Embroidery": formData.customizationNeeds.embroidery,
  "Custom Colors": formData.customizationNeeds.colorMatch,
  "Preferred Contact": formData.preferredContact,
  "Marketing Opt-In": formData.marketingOptIn,
  "Status": "New Lead",
  "Submitted At": new Date().toISOString(),
  "Source": "Website Quote Form"
}
```

---

## 11. Retrieving Leads from Airtable

### Admin Dashboard

The website includes an admin dashboard to view and manage leads directly from the browser.

**Access URL**: `https://yourdomain.com/admin/leads`

**Features**:
- View all leads from Airtable in real-time
- Filter by lead status (New Lead, Contacted, Quote Sent, etc.)
- Expand leads to see full details
- Refresh data on demand
- Password protected access

### Authentication

The admin portal is protected with a simple password:

**Default Password**: `admin123`

**To Change**:
1. Add to `.env.local`: `NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password`
2. Restart the development server

**Note**: For production, consider implementing:
- NextAuth.js for robust authentication
- Role-based access control (RBAC)
- Two-factor authentication (2FA)
- Session management with JWT

### API Endpoints for Lead Retrieval

#### GET `/api/leads`

Retrieve leads from Airtable with optional filtering.

**Query Parameters**:
| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `status` | String | Filter by lead status | `?status=New Lead` |
| `limit` | Number | Max records to return (default: 100) | `?limit=50` |
| `offset` | String | Pagination offset from Airtable | `?offset=itrXXXXXX` |

**Example Request**:
```bash
# Get all leads
curl https://yourdomain.com/api/leads

# Get only new leads
curl https://yourdomain.com/api/leads?status=New%20Lead

# Get with pagination
curl https://yourdomain.com/api/leads?limit=20
```

**Example Response**:
```json
{
  "success": true,
  "leads": [
    {
      "id": "recXXXXXXXXXXXXXX",
      "Lead Name": "Rajesh Kumar",
      "Company Name": "Grand Hotel Mumbai",
      "Email": "rajesh@grandhotel.com",
      "Phone": "+91 93465 49694",
      "Company Type": "Hotel",
      "Status": "New Lead",
      "Submitted At": "2026-01-01T10:30:00.000Z",
      ...
    }
  ],
  "offset": "itrXXXXXXXXXX",
  "hasMore": true
}
```

#### PATCH `/api/leads`

Update a lead's information (e.g., change status, add notes).

**Request Body**:
```json
{
  "recordId": "recXXXXXXXXXXXXXX",
  "fields": {
    "Status": "Contacted",
    "Notes": "Sent initial email"
  }
}
```

**Example Response**:
```json
{
  "success": true,
  "record": {
    "id": "recXXXXXXXXXXXXXX",
    "Status": "Contacted",
    "Notes": "Sent initial email",
    ...
  }
}
```

### Programmatic Access Examples

#### JavaScript/TypeScript

```typescript
// Fetch all new leads
async function getNewLeads() {
  const response = await fetch('/api/leads?status=New Lead')
  const data = await response.json()

  if (data.success) {
    console.log(`Found ${data.leads.length} new leads`)
    return data.leads
  }
}

// Update lead status
async function updateLeadStatus(recordId: string, status: string) {
  const response = await fetch('/api/leads', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      recordId,
      fields: { Status: status }
    })
  })

  return await response.json()
}
```

#### Python

```python
import requests

# Fetch leads
response = requests.get('https://yourdomain.com/api/leads')
data = response.json()

if data['success']:
    for lead in data['leads']:
        print(f"{lead['Lead Name']} - {lead['Company Name']}")

# Update lead
response = requests.patch('https://yourdomain.com/api/leads', json={
    'recordId': 'recXXXXXXXXXXXXXX',
    'fields': {'Status': 'Quote Sent'}
})
```

### Direct Airtable API Access

You can also query Airtable directly using their API:

```bash
curl "https://api.airtable.com/v0/YOUR_BASE_ID/Quote%20Requests" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Advantages of using `/api/leads` endpoint**:
- Hides sensitive API credentials from client
- Can add custom business logic
- Rate limiting and caching
- Consistent error handling
- Format transformation

### Integration with Other Tools

#### Zapier Integration
1. Connect Airtable to Zapier
2. Set up trigger: "New record in view"
3. Create view in Airtable: "New Leads"
4. Add actions: Send email, create calendar event, add to CRM

#### Slack Notifications
Use Airtable automations to send Slack messages when:
- New lead is created
- Lead status changes to "Quote Sent"
- High-value leads (budget > 10L) are received

#### Email Marketing (Mailchimp/SendGrid)
- Sync contacts with `Marketing Opt-In = true`
- Create segments based on company type
- Send targeted campaigns

---

## Support

For implementation help:
- Airtable API Docs: https://airtable.com/developers/web/api/introduction
- Next.js API Routes: https://nextjs.org/docs/app/building-your-application/routing/route-handlers

---

**Last Updated**: 2026-01-01
**Prepared for**: Royal Fit Uniform Website
**Document Version**: 2.0 (Added Lead Retrieval)
