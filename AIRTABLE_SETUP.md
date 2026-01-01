# Airtable Setup Guide for Royal Fit Uniform

This guide will walk you through setting up Airtable from scratch to power your Royal Fit Uniform website's data pipeline.

## Overview

Your Airtable base will serve as the central database for:
- **Lead Management**: Capture and track quote requests
- **Product Catalog**: Manage uniform products and inventory
- **Order Tracking**: Monitor orders from quote to delivery
- **Analytics Dashboard**: Track business metrics and performance

---

## Step 1: Create Your Airtable Account

1. Go to [airtable.com](https://airtable.com)
2. Sign up for a free account (or use existing account)
3. Choose the "Team" plan if you need collaboration features

---

## Step 2: Create a New Base

1. Click **"Add a base"** on your Airtable home page
2. Select **"Start from scratch"**
3. Name it: **"Royal Fit Uniform - Business Operations"**
4. Choose a color/icon for easy identification

---

## Step 3: Set Up Tables

You need to create **4 tables** in your base. Here's the complete structure:

### 📋 Table 1: Leads

**Purpose**: Capture all quote requests from your website

**Fields to Create**:

| Field Name | Field Type | Options/Settings |
|------------|------------|------------------|
| Lead ID | Autonumber | Auto-generated unique ID |
| Company Name | Single line text | - |
| Company Type | Single select | Options: Hotel, Hospital, Other |
| Facility Size | Single select | Options: Small (Under 50 staff), Medium (50-150 staff), Large (150-500 staff), Enterprise (500+ staff) |
| Has Current Supplier | Checkbox | - |
| Current Supplier | Single line text | - |
| Timeline | Single select | Options: Urgent (2 weeks), Planned (1-2 months), Just Exploring |
| Departments | Multiple select | Options: Front of House, Kitchen & Service, Housekeeping, Management, Nursing & Care, Surgical & Specialist, Admin & Support, Management & Leadership |
| Total Quantity | Single select | Options: Under 50 pieces, 50-100 pieces, 100-200 pieces, 200-500 pieces, 500+ pieces |
| Logo Customization | Checkbox | - |
| Embroidery | Checkbox | - |
| Color Match | Checkbox | - |
| Contact Name | Single line text | - |
| Job Title | Single line text | - |
| Email | Email | - |
| Phone | Phone number | - |
| Budget Range | Single select | Options: Under 1 Lakh, 1-5 Lakhs, 5-10 Lakhs, 10+ Lakhs, Not specified |
| Preferred Contact | Single select | Options: Email, Phone, WhatsApp |
| Marketing Opt-in | Checkbox | Default: checked |
| Source | Single select | Options: Website Quote Form, Phone Inquiry, Email, Referral, Trade Show, Other |
| Status | Single select | Options: New, Contacted, Qualified, Proposal Sent, Won, Lost |
| Priority | Single select | Options: High, Medium, Low |
| Estimated Value | Currency | Format: ₹ (INR) |
| Assigned To | Single line text | Sales rep name |
| Notes | Long text | - |
| Submitted At | Date | Include time |
| Updated At | Last modified time | - |
| Follow Up Date | Date | - |

**Views to Create**:
1. **All Leads** (Grid view) - Default view with all fields
2. **New Leads** (Grid view) - Filter: Status = "New", Sort: Submitted At (newest first)
3. **Hot Leads** (Grid view) - Filter: Priority = "High" OR Timeline = "Urgent"
4. **By Status** (Kanban view) - Group by: Status
5. **This Week** (Grid view) - Filter: Submitted At is within "this week"

---

### 🛍️ Table 2: Products

**Purpose**: Manage your uniform product catalog

**Fields to Create**:

| Field Name | Field Type | Options/Settings |
|------------|------------|------------------|
| Product ID | Single line text | e.g., hotel-foh-001 |
| Name | Single line text | - |
| Category | Single select | Options: Hotel, Hospital |
| Department | Single select | Options: Front of House, Kitchen & Service, Housekeeping, Management, Nursing & Care, Surgical & Specialist, Admin & Support, Management & Leadership |
| Description | Long text | - |
| Fabric | Single line text | - |
| Features | Long text | One per line |
| Durability Rating | Number | Format: Decimal (0.0), Min: 0, Max: 5 |
| Price Per Unit | Currency | Format: ₹ (INR) |
| Sizes | Multiple select | Options: XS, S, M, L, XL, XXL, XXXL |
| Colors | Multiple select | Options: Navy Blue, Charcoal Grey, Burgundy, Black, White, Light Blue, Cream, Slate Grey, Maroon, Ceil Blue, Caribbean Blue, Wine, Surgical Green |
| Image | Attachment | - |
| Customizable | Checkbox | - |
| In Stock | Checkbox | Default: checked |
| Stock Quantity | Number | - |
| Minimum Order Qty | Number | Default: 10 |
| Lead Time (Days) | Number | - |
| Created At | Created time | - |
| Updated At | Last modified time | - |

**Views to Create**:
1. **All Products** (Grid view) - Default view
2. **Hotel Products** (Grid view) - Filter: Category = "Hotel"
3. **Hospital Products** (Grid view) - Filter: Category = "Hospital"
4. **In Stock** (Grid view) - Filter: In Stock = checked
5. **Gallery** (Gallery view) - Card preview: Image, Name, Price

---

### 📦 Table 3: Orders

**Purpose**: Track orders from quote to delivery

**Fields to Create**:

| Field Name | Field Type | Options/Settings |
|------------|------------|------------------|
| Order ID | Autonumber | Prefix: ORD- |
| Lead | Link to another record | Table: Leads |
| Customer Name | Lookup | From: Lead → Contact Name |
| Company Name | Lookup | From: Lead → Company Name |
| Order Date | Date | Include time |
| Products Ordered | Multiple select | Link to Products table |
| Total Items | Number | - |
| Subtotal | Currency | Format: ₹ (INR) |
| Discount (%) | Number | Format: Decimal |
| Tax Amount | Currency | Format: ₹ (INR) |
| Total Amount | Currency | Format: ₹ (INR) |
| Status | Single select | Options: Draft, Confirmed, In Production, Quality Check, Shipped, Delivered, Cancelled |
| Payment Status | Single select | Options: Pending, Partial, Paid, Refunded |
| Payment Terms | Single select | Options: 30% Advance, 50% Advance, 100% Advance, Net 30, Net 60 |
| Expected Delivery | Date | - |
| Actual Delivery | Date | - |
| Shipping Address | Long text | - |
| Tracking Number | Single line text | - |
| Notes | Long text | - |
| Created At | Created time | - |
| Updated At | Last modified time | - |

**Views to Create**:
1. **All Orders** (Grid view) - Default view
2. **Active Orders** (Grid view) - Filter: Status ≠ "Delivered" AND Status ≠ "Cancelled"
3. **By Status** (Kanban view) - Group by: Status
4. **Payment Pending** (Grid view) - Filter: Payment Status = "Pending" OR Payment Status = "Partial"
5. **This Month** (Grid view) - Filter: Order Date is within "this month"

---

### 📊 Table 4: Analytics

**Purpose**: Track key business metrics over time

**Fields to Create**:

| Field Name | Field Type | Options/Settings |
|------------|------------|------------------|
| Date | Date | - |
| Period Type | Single select | Options: Daily, Weekly, Monthly, Quarterly |
| Total Leads | Number | - |
| Qualified Leads | Number | - |
| Conversion Rate (%) | Number | Format: Decimal |
| Total Orders | Number | - |
| Revenue | Currency | Format: ₹ (INR) |
| Average Order Value | Currency | Format: ₹ (INR) |
| Top Product Category | Single select | Options: Hotel, Hospital |
| Notes | Long text | - |

**Views to Create**:
1. **All Metrics** (Grid view) - Default view, Sort: Date (newest first)
2. **Monthly View** (Grid view) - Filter: Period Type = "Monthly"
3. **Performance Chart** (Timeline view) - Date field: Date

---

## Step 4: Get Your API Credentials

### Get Airtable Personal Access Token:

1. Go to [airtable.com/create/tokens](https://airtable.com/create/tokens)
2. Click **"Create new token"**
3. Name it: **"Royal Fit Uniform Website"**
4. Set scopes:
   - ✅ `data.records:read`
   - ✅ `data.records:write`
   - ✅ `schema.bases:read`
5. Select your base: **"Royal Fit Uniform - Business Operations"**
6. Click **"Create token"**
7. **Copy the token** (starts with `pat...`) - you won't see it again!

### Get Base ID:

1. Open your Airtable base
2. Go to **Help** → **API documentation** (top right)
3. Find the Base ID in the URL or documentation
4. Format: `appXXXXXXXXXXXXXX`

---

## Step 5: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your credentials:
   ```env
   # Airtable Configuration
   AIRTABLE_API_KEY=pat_YOUR_TOKEN_HERE
   AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
   AIRTABLE_LEADS_TABLE=Leads
   AIRTABLE_PRODUCTS_TABLE=Products
   AIRTABLE_ORDERS_TABLE=Orders
   ```

3. **IMPORTANT**: Never commit `.env.local` to git (it's already in .gitignore)

---

## Step 6: Import Sample Data (Optional)

### Import Products:

1. Go to the **Products** table
2. Click the dropdown arrow next to any view name
3. Select **"CSV import"**
4. Upload the `airtable-templates/products-import.csv` file (we'll create this)
5. Map the fields correctly
6. Click **"Import"**

### Sample Lead for Testing:

Manually create one test lead to verify the integration:
- Company Name: "Test Hotel Pvt Ltd"
- Company Type: Hotel
- Contact Name: "Your Name"
- Email: "your-email@example.com"
- Status: New

---

## Step 7: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000`

3. Fill out the quote form

4. Submit the form

5. Check your Airtable **Leads** table - you should see the new entry!

---

## Step 8: Set Up Automations (Optional but Recommended)

Airtable automations can streamline your workflow:

### Automation 1: New Lead Notification

**Trigger**: When record enters view "New Leads"
**Actions**:
1. Send email to: `royalfituniform@gmail.com`
2. Subject: "🎯 New Quote Request from {Company Name}"
3. Include: Contact details, requirements, timeline

### Automation 2: Follow-up Reminder

**Trigger**: When "Follow Up Date" is today
**Actions**:
1. Send email to: assigned sales rep
2. Subject: "⏰ Follow up with {Company Name}"

### Automation 3: Order Status Updates

**Trigger**: When "Status" field changes in Orders table
**Actions**:
1. Send email to customer with status update
2. Update "Updated At" timestamp

---

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        WEBSITE VISITOR                       │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ Fills Quote Form
                         ↓
┌─────────────────────────────────────────────────────────────┐
│              Next.js Frontend (RequestQuoteForm)            │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ POST /api/quote
                         ↓
┌─────────────────────────────────────────────────────────────┐
│              API Route (/app/api/quote/route.ts)            │
│              • Validates data                                │
│              • Calls createLead()                           │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ Airtable API Call
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                    AIRTABLE (Leads Table)                    │
│              • Stores lead data                              │
│              • Triggers automations                         │
│              • Notifies sales team                          │
└─────────────────────────────────────────────────────────────┘
                         │
                         │ Sales Team
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                    AIRTABLE (Orders Table)                   │
│              • Create order from lead                        │
│              • Track fulfillment                            │
│              • Monitor payments                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Best Practices

### Data Management:
- ✅ Archive old leads instead of deleting them
- ✅ Use consistent naming conventions
- ✅ Regularly backup your base (Airtable has version history)
- ✅ Set up proper user permissions for team members

### Security:
- ✅ Never expose API keys in frontend code
- ✅ Use environment variables for all credentials
- ✅ Rotate API tokens periodically
- ✅ Limit API token scopes to minimum required

### Performance:
- ✅ Cache product data (already configured: 1 hour)
- ✅ Use Airtable views to pre-filter data
- ✅ Implement pagination for large datasets
- ✅ Monitor API rate limits (5 requests/second per base)

---

## Troubleshooting

### "Configuration error" when submitting form:
- Check that `AIRTABLE_API_KEY` and `AIRTABLE_BASE_ID` are set in `.env.local`
- Restart your dev server after changing environment variables

### "Failed to save lead" error:
- Verify your API token has write permissions
- Check that table name matches exactly (case-sensitive)
- Ensure all required fields exist in your Airtable table

### Data not appearing in Airtable:
- Check browser console for errors
- Verify network tab shows successful POST to `/api/quote`
- Check Airtable API logs in your account settings

### Field mapping errors:
- Ensure field names in Airtable match exactly (including spaces and capitalization)
- Check that field types are compatible (e.g., checkbox fields for boolean values)

---

## Next Steps

Once your Airtable integration is working:

1. **Set up SendGrid** for email notifications (see `.env.example`)
2. **Configure Google Analytics** to track form submissions
3. **Create Airtable interfaces** for your sales team
4. **Set up reporting dashboards** using Airtable's native features
5. **Integrate with CRM** if needed (HubSpot, Salesforce, etc.)

---

## Support

- Airtable Documentation: https://airtable.com/developers/web/api/introduction
- Airtable Community: https://community.airtable.com
- Royal Fit Uniform Support: royalfituniform@gmail.com

---

## Appendix: Field Mapping Reference

### Quote Form → Airtable Leads Table

| Form Field | Airtable Field | Data Type |
|------------|----------------|-----------|
| companyType | Company Type | Single select |
| companyName | Company Name | Text |
| facilitySize | Facility Size | Single select |
| hasCurrentSupplier | Has Current Supplier | Checkbox |
| timeline | Timeline | Single select |
| departments | Departments | Text (comma-separated) |
| totalQuantity | Total Quantity | Text |
| customizationNeeds.logo | Logo Customization | Checkbox |
| customizationNeeds.embroidery | Embroidery | Checkbox |
| customizationNeeds.colorMatch | Color Match | Checkbox |
| name | Contact Name | Text |
| title | Job Title | Text |
| email | Email | Email |
| phone | Phone | Phone |
| budgetRange | Budget Range | Text |
| preferredContact | Preferred Contact | Single select |
| marketingOptIn | Marketing Opt-in | Checkbox |
| - (auto) | Source | Text |
| - (auto) | Submitted At | Date/time |
| - (auto) | Status | Single select (default: "New") |

---

**Last Updated**: January 2026
**Version**: 1.0
