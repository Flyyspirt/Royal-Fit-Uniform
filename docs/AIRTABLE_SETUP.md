# Airtable Setup Guide for Royal Fit Uniform

This guide walks you through setting up Airtable as the backend for the Royal Fit Uniform website.

## Step 1: Create an Airtable Account

1. Go to [airtable.com](https://airtable.com)
2. Sign up for a free account (or use existing)
3. The free tier supports up to 1,000 records per base

## Step 2: Create a New Base

1. Click "Add a base" → "Start from scratch"
2. Name it: `Royal Fit Uniform CRM`

## Step 3: Create the Leads Table

Rename "Table 1" to "Leads" and add these fields:

| Field Name | Field Type | Options/Notes |
|------------|-----------|---------------|
| Company Name | Single line text | Primary field |
| Company Type | Single select | Options: `hotel`, `hospital`, `other` |
| Facility Size | Single select | Options: `small`, `medium`, `large`, `enterprise` |
| Has Current Supplier | Checkbox | |
| Current Supplier | Single line text | |
| Timeline | Single select | Options: `urgent`, `planned`, `exploratory` |
| Departments | Long text | Comma-separated |
| Total Quantity | Single select | Options: `under-50`, `50-100`, `100-200`, `200-500`, `500+` |
| Logo Customization | Checkbox | |
| Embroidery | Checkbox | |
| Color Match | Checkbox | |
| Contact Name | Single line text | |
| Job Title | Single line text | |
| Email | Email | |
| Phone | Phone number | |
| Budget Range | Single select | Options: `under-1L`, `1-5L`, `5-10L`, `10L+` |
| Preferred Contact | Single select | Options: `email`, `phone`, `whatsapp` |
| Marketing Opt-in | Checkbox | |
| Source | Single line text | Default: "Website" |
| Status | Single select | Options: `New`, `Contacted`, `Qualified`, `Proposal Sent`, `Won`, `Lost` |
| Submitted At | Date | Include time |
| Updated At | Date | Include time |
| Notes | Long text | For internal notes |

## Step 4: Create the Products Table (Optional)

Create a new table called "Products":

| Field Name | Field Type | Options/Notes |
|------------|-----------|---------------|
| Name | Single line text | Primary field |
| Category | Single select | Options: `hotel`, `hospital` |
| Department | Single line text | |
| Description | Long text | |
| Fabric | Single line text | |
| Features | Long text | Comma-separated |
| Durability Rating | Number | 1-5 scale |
| Price Per Unit | Currency | INR |
| Sizes | Long text | Comma-separated |
| Colors | Long text | Comma-separated |
| Image | Attachment | Product photos |
| Customizable | Checkbox | |
| In Stock | Checkbox | Default checked |
| SKU | Single line text | |

## Step 5: Get Your API Credentials

### Get Base ID
1. Open your base
2. Click "Help" → "API documentation"
3. Or look at the URL: `https://airtable.com/appXXXXXXXXXXXXXX/...`
4. The Base ID starts with `app`

### Create Personal Access Token
1. Go to [airtable.com/create/tokens](https://airtable.com/create/tokens)
2. Click "Create new token"
3. Name: `Royal Fit Website`
4. Scopes: Select these permissions:
   - `data.records:read` - Read records
   - `data.records:write` - Create/update records
5. Access: Select your "Royal Fit Uniform CRM" base
6. Click "Create token"
7. **Copy the token immediately** (starts with `pat`)

## Step 6: Configure Environment Variables

In your project, create `.env.local`:

```env
AIRTABLE_API_KEY=pat_xxxxxxxxxxxxxxxx
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
AIRTABLE_LEADS_TABLE=Leads
AIRTABLE_PRODUCTS_TABLE=Products
```

## Step 7: Test the Integration

Run your development server:
```bash
npm run dev
```

Submit a test quote form and verify:
1. The form submits successfully
2. A new record appears in your Airtable Leads table

## Views to Create in Airtable

### For Leads Table:
1. **New Leads** - Filter: Status = "New", Sort: Submitted At (newest first)
2. **Pipeline** - Kanban view grouped by Status
3. **Hotel Leads** - Filter: Company Type = "hotel"
4. **Hospital Leads** - Filter: Company Type = "hospital"
5. **Hot Leads** - Filter: Timeline = "urgent"

## Automations (Optional)

In Airtable, you can set up automations:

1. **New Lead Notification**
   - Trigger: When record created in Leads
   - Action: Send email to sales@royalfit.in

2. **Follow-up Reminder**
   - Trigger: 24 hours after Status = "New"
   - Action: Send Slack/email reminder

3. **Won Deal Celebration**
   - Trigger: When Status changes to "Won"
   - Action: Send congratulations email

## Security Notes

- Never commit `.env.local` to version control
- Rotate API tokens periodically
- Use scoped tokens with minimum required permissions
- Consider using Airtable's webhook for real-time sync (paid feature)

## Troubleshooting

### "AUTHENTICATION_REQUIRED" Error
- Check that your API key is correct
- Ensure the token has access to the base

### "NOT_FOUND" Error
- Verify your Base ID is correct
- Check table names match exactly (case-sensitive)

### Records Not Appearing
- Check field names match exactly
- Verify field types are compatible
- Look at browser console for errors
