# Quick Start Guide - Airtable Integration

Get your Royal Fit Uniform website connected to Airtable in 10 minutes.

## Prerequisites

- Airtable account (free tier works)
- Node.js and npm installed
- Royal Fit Uniform website code

## Step-by-Step Setup

### 1. Create Airtable Base (5 minutes)

1. **Go to** [airtable.com](https://airtable.com) and sign in
2. **Click** "Add a base" → "Start from scratch"
3. **Name it**: "Royal Fit Uniform - Business Operations"
4. **Create 4 tables**: Leads, Products, Orders, Analytics

**Quick Table Setup:**

For each table, follow the detailed schema in `AIRTABLE_SETUP.md`. The most important table to start with is **Leads**.

**Minimum Leads Table Fields** (to get started quickly):
- Company Name (Single line text)
- Company Type (Single select: Hotel, Hospital, Other)
- Contact Name (Single line text)
- Email (Email)
- Phone (Phone number)
- Status (Single select: New, Contacted, Qualified, Proposal Sent, Won, Lost)
- Submitted At (Date with time)

> **Tip**: You can add more fields later. See `AIRTABLE_SETUP.md` for the complete schema.

### 2. Get API Credentials (2 minutes)

**Get Personal Access Token:**
1. Go to [airtable.com/create/tokens](https://airtable.com/create/tokens)
2. Click "Create new token"
3. Name: "Royal Fit Uniform Website"
4. Add scopes: `data.records:read` and `data.records:write`
5. Select your base
6. Click "Create token"
7. **Copy the token** (starts with `pat...`)

**Get Base ID:**
1. Open your Airtable base
2. Click "Help" → "API documentation"
3. Copy the Base ID (starts with `app...`)

### 3. Configure Environment Variables (1 minute)

```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local
nano .env.local  # or use your preferred editor
```

**Add your credentials:**
```env
AIRTABLE_API_KEY=pat_YOUR_ACTUAL_TOKEN_HERE
AIRTABLE_BASE_ID=appYOUR_ACTUAL_BASE_ID_HERE
AIRTABLE_LEADS_TABLE=Leads
AIRTABLE_PRODUCTS_TABLE=Products
AIRTABLE_ORDERS_TABLE=Orders
AIRTABLE_ANALYTICS_TABLE=Analytics
```

**Save and close the file.**

### 4. Test the Integration (2 minutes)

```bash
# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev
```

**Test the quote form:**
1. Open http://localhost:3000
2. Scroll to the "Request Quote" section
3. Fill out the form with test data
4. Submit the form
5. Check your Airtable Leads table - you should see the new entry!

### 5. Import Sample Products (Optional)

1. In Airtable, open the **Products** table
2. Click the dropdown arrow next to any view
3. Select "CSV import"
4. Upload `airtable-templates/products-import.csv`
5. Map the fields
6. Click "Import"

---

## What You've Accomplished

You now have:
- ✅ Airtable base with proper structure
- ✅ Working quote form → Airtable integration
- ✅ API endpoints for leads, orders, and analytics
- ✅ Foundation for future enhancements

---

## Next Steps

### Immediate Actions:
1. **Set up email notifications** (see `.env.example` for SendGrid config)
2. **Create Airtable views** for your sales team:
   - New Leads (Status = "New")
   - Hot Leads (Timeline = "Urgent")
   - Won Deals (Status = "Won")
3. **Set up automations** in Airtable (see `AIRTABLE_SETUP.md` Step 8)

### Future Enhancements:
- Product catalog management via Airtable
- Order tracking system
- Analytics dashboard
- CRM integration (HubSpot, Salesforce)
- WhatsApp notifications

---

## Troubleshooting

### Quote form not submitting?
1. Check browser console for errors (F12)
2. Verify `.env.local` has correct credentials
3. Restart dev server: Stop (Ctrl+C) and run `npm run dev` again

### Data not appearing in Airtable?
1. Verify API token has write permissions
2. Check table names match exactly (case-sensitive!)
3. Ensure required fields exist in your Airtable table

### "Configuration error" message?
- `AIRTABLE_API_KEY` and `AIRTABLE_BASE_ID` must be set in `.env.local`
- Never commit `.env.local` to git

---

## API Endpoints Reference

Your website now has these API endpoints:

### Quote Submission
```bash
POST /api/quote
```
**Body**: Quote form data
**Response**: `{ success: true, recordId: "recXXXXXXXXXXXXXX" }`

### Get Leads
```bash
GET /api/leads?status=New&limit=10
```
**Query params**: status, companyType, timeline, limit
**Response**: `{ success: true, data: [...], count: 10 }`

### Update Lead Status
```bash
PATCH /api/leads
```
**Body**: `{ recordId: "recXXX", status: "Contacted" }`
**Response**: `{ success: true, message: "..." }`

### Create Order
```bash
POST /api/orders
```
**Body**: Order data (see `app/api/orders/route.ts`)
**Response**: `{ success: true, recordId: "recXXX" }`

### Get Analytics
```bash
GET /api/analytics?periodType=Monthly
```
**Response**: `{ success: true, data: [...] }`

---

## Data Flow Diagram

```
Website Visitor
      ↓
Quote Form (3 steps)
      ↓
POST /api/quote
      ↓
lib/airtable.ts (createLead)
      ↓
Airtable Leads Table
      ↓
Airtable Automations (optional)
      ↓
Email Notifications
Sales Team Dashboard
```

---

## Security Best Practices

- ✅ Never commit `.env.local` to git (already in .gitignore)
- ✅ API keys are only in server-side code (never exposed to browser)
- ✅ Use environment variables for all credentials
- ✅ Rotate API tokens every 90 days
- ✅ Limit API token scopes to minimum required

---

## Support & Resources

- **Detailed Setup**: See `AIRTABLE_SETUP.md` for complete schema and advanced features
- **Airtable Docs**: https://airtable.com/developers/web/api/introduction
- **Project Documentation**: See `CLAUDE.md` for project overview
- **Need Help?**: royalfituniform@gmail.com

---

**Ready to launch?** Make sure to:
1. Set up production environment variables on your hosting platform
2. Update `NEXT_PUBLIC_SITE_URL` in production
3. Configure SendGrid for email notifications
4. Set up Google Analytics (optional)

Happy selling! 🎯
