# Lead Retrieval Quick Start Guide

## Overview
This guide explains how to retrieve and manage leads from Airtable for Royal Fit Uniform.

---

## Quick Access

### Admin Dashboard
**URL**: `http://localhost:3000/admin/leads` (development)
**URL**: `https://yourdomain.com/admin/leads` (production)

**Default Password**: `admin123`

---

## Setup Steps

### 1. Configure Environment Variables

Create `.env.local` file with:

```bash
# Airtable Configuration
AIRTABLE_API_KEY=patXXXXXXXXXXXXXXXX
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
AIRTABLE_TABLE_NAME=Quote Requests

# Admin Password (optional - defaults to admin123)
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password
```

### 2. Get Airtable Credentials

**API Key (Personal Access Token)**:
1. Go to https://airtable.com/create/tokens
2. Click "Create new token"
3. Name it "Royal Fit Uniform API"
4. Add these scopes:
   - `data.records:read`
   - `data.records:write`
5. Add access to your base
6. Copy the token (starts with `pat`)

**Base ID**:
1. Go to https://airtable.com/api
2. Select your base
3. Find "Base ID" in the introduction section
4. Copy it (starts with `app`)

**Table Name**:
- Use the exact name from your Airtable base
- Default: "Quote Requests"

### 3. Create Airtable Base

Use the table structure from `AIRTABLE_INTEGRATION.md` section 2:

**Required Fields**:
- Lead Name (Single line text)
- Email (Email)
- Phone (Phone)
- Company Name (Single line text)
- Company Type (Single select: Hotel, Hospital, Other)
- Status (Single select: New Lead, Contacted, etc.)
- Submitted At (Date & time)

### 4. Start the Application

```bash
npm install
npm run dev
```

### 5. Access Admin Dashboard

1. Navigate to `http://localhost:3000/admin/leads`
2. Enter password (default: `admin123`)
3. View your leads!

---

## Admin Dashboard Features

### View Leads
- All leads displayed in card format
- Sorted by submission date (newest first)
- Expandable cards show full details

### Filter Leads
Use the status dropdown to filter:
- All Statuses
- New Lead
- Contacted
- In Discussion
- Quote Sent
- Won
- Lost
- On Hold

### Refresh Data
Click the "Refresh" button to fetch latest data from Airtable.

### Lead Information Displayed

**Summary View**:
- Lead name and status badge
- Company name
- Email and phone (clickable)
- Submission date

**Expanded View**:
- Job title
- Company type and facility size
- Timeline urgency
- Budget range
- Departments needing uniforms
- Quantity estimate
- Customization requirements
- Preferred contact method
- Marketing opt-in status
- Airtable record ID

---

## API Usage

### Fetch All Leads

```bash
curl http://localhost:3000/api/leads
```

### Fetch Leads by Status

```bash
curl "http://localhost:3000/api/leads?status=New%20Lead"
```

### Fetch Limited Results

```bash
curl "http://localhost:3000/api/leads?limit=10"
```

### Update Lead Status

```bash
curl -X PATCH http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "recordId": "recXXXXXXXXXXXXXX",
    "fields": {
      "Status": "Contacted"
    }
  }'
```

---

## Integration Examples

### JavaScript/TypeScript

```typescript
// In a React component or API route
async function fetchLeads() {
  const res = await fetch('/api/leads')
  const data = await res.json()

  if (data.success) {
    console.log('Leads:', data.leads)
    return data.leads
  }
}

// Update a lead
async function updateLead(id: string, status: string) {
  await fetch('/api/leads', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      recordId: id,
      fields: { Status: status }
    })
  })
}
```

### Node.js Script

```javascript
const fetch = require('node-fetch')

async function getNewLeads() {
  const response = await fetch('http://localhost:3000/api/leads?status=New Lead')
  const data = await response.json()

  for (const lead of data.leads) {
    console.log(`${lead['Lead Name']} from ${lead['Company Name']}`)
  }
}

getNewLeads()
```

---

## Troubleshooting

### Error: "Airtable not configured"
- Check `.env.local` has `AIRTABLE_API_KEY`
- Restart dev server after adding environment variables

### Error: "Failed to save to Airtable" (401/403)
- Verify API key is correct
- Check token has proper scopes and base access
- Ensure token hasn't expired

### Error: "Table not found"
- Check `AIRTABLE_TABLE_NAME` matches exactly (case-sensitive)
- Verify base ID is correct

### No leads showing in dashboard
- Check Airtable base has records
- Try clicking "Refresh" button
- Open browser console for errors
- Verify network requests succeed

### Can't access admin dashboard
- Check you're using correct password
- Try clearing browser cache
- Check `NEXT_PUBLIC_ADMIN_PASSWORD` in `.env.local`

---

## Security Best Practices

### Production Deployment

1. **Change Admin Password**:
   ```bash
   NEXT_PUBLIC_ADMIN_PASSWORD=strong_random_password_here
   ```

2. **Protect API Routes**:
   - Add authentication to `/api/leads`
   - Consider adding API key requirement
   - Implement rate limiting

3. **Use Environment Variables**:
   - Never commit `.env.local`
   - Add to `.gitignore`
   - Use hosting platform's secret management

4. **Upgrade Authentication**:
   - Replace simple password with NextAuth.js
   - Add OAuth providers (Google, Microsoft)
   - Implement JWT sessions
   - Add role-based access

---

## Next Steps

1. ✅ Set up Airtable base
2. ✅ Configure environment variables
3. ✅ Access admin dashboard
4. 🔲 Test lead creation via quote form
5. 🔲 Set up Airtable automations (email notifications)
6. 🔲 Configure production authentication
7. 🔲 Deploy to production

---

## Files Reference

- **Admin Dashboard**: `/app/admin/leads/page.tsx`
- **Admin Layout**: `/app/admin/leads/layout.tsx`
- **API Endpoint**: `/app/api/leads/route.ts`
- **Documentation**: `/AIRTABLE_INTEGRATION.md`

---

**Need Help?**

Refer to full documentation in `AIRTABLE_INTEGRATION.md`
