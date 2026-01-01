# ✅ Airtable Integration Status

## Configuration Complete!

Your Royal Fit Uniform website is now configured to connect with Airtable.

---

## ✅ What's Been Configured

### 1. Environment Variables (.env.local)
```
AIRTABLE_API_KEY=pat19ImPCVFwmc9sT.2a4c7cd2134108783dbe83b2c636999753bc4eb4ce946a62ddd099d7efd361ff
AIRTABLE_BASE_ID=appteHbWjuWHeAWgf
AIRTABLE_LEADS_TABLE=Leads
AIRTABLE_PRODUCTS_TABLE=Products
AIRTABLE_ORDERS_TABLE=Orders
AIRTABLE_ANALYTICS_TABLE=Analytics
```

### 2. Development Server
- ✅ Running on: **http://localhost:3000**
- ✅ Using Node.js 22.21.1 (compatible with 20+)
- ✅ Next.js 14 loaded successfully

### 3. Integration Code
- ✅ `lib/airtable.ts` - Complete CRUD operations
- ✅ `app/api/quote/route.ts` - Quote submission endpoint
- ✅ `app/api/leads/route.ts` - Lead management
- ✅ `app/api/orders/route.ts` - Order creation
- ✅ `app/api/analytics/route.ts` - Analytics tracking
- ✅ `components/RequestQuoteForm.tsx` - Connected to API

---

## 🎯 IMPORTANT: Next Steps in Airtable

### Your Airtable base must have these 4 tables created:

1. **Leads** - With these minimum fields:
   - Company Name (Single line text)
   - Company Type (Single select: Hotel, Hospital, Other)
   - Contact Name (Single line text)
   - Email (Email)
   - Phone (Phone number)
   - Status (Single select: New, Contacted, Qualified, Proposal Sent, Won, Lost)
   - Submitted At (Date with time)

2. **Products** - Product catalog table

3. **Orders** - Order tracking table

4. **Analytics** - Business metrics table

---

## 🚀 How to Test the Integration

### Option 1: Test via Website (Recommended)

1. **Your dev server is already running!** Go to:
   ```
   http://localhost:3000
   ```

2. **Scroll to the quote form** (bottom of homepage)

3. **Fill out the 3-step form** with test data:
   - Step 1: Company info (e.g., "Test Hotel Ltd", Hotel, Medium)
   - Step 2: Requirements (select departments, quantity)
   - Step 3: Contact (your email, phone)

4. **Submit the form**

5. **Check your Airtable** - New lead should appear in Leads table!

### Option 2: Test via API Directly

```bash
# Test quote submission
curl -X POST http://localhost:3000/api/quote \
  -H "Content-Type: application/json" \
  -d '{
    "companyType": "hotel",
    "companyName": "Test Hotel",
    "facilitySize": "Medium (50-150 staff)",
    "timeline": "Planned (1-2 months)",
    "departments": ["Front of House"],
    "totalQuantity": "50-100 pieces",
    "customizationNeeds": {
      "logo": true,
      "embroidery": false,
      "colorMatch": false
    },
    "name": "John Doe",
    "title": "HR Manager",
    "email": "john@testhotel.com",
    "phone": "+91 98765 43210",
    "budgetRange": "1-5 Lakhs",
    "preferredContact": "email",
    "marketingOptIn": true
  }'
```

---

## 📋 Import Sample Data (Optional)

If you want to start with sample products and data:

### Import CSV Files to Airtable

1. **Go to your Airtable base**
2. **For each table, import the corresponding CSV:**

   **Leads Table:**
   ```
   airtable-templates/LEADS-table.csv
   ```

   **Products Table:**
   ```
   airtable-templates/PRODUCTS-table.csv
   ```

   **Orders Table:**
   ```
   airtable-templates/ORDERS-table.csv
   ```

   **Analytics Table:**
   ```
   airtable-templates/ANALYTICS-table.csv
   ```

3. **How to import:**
   - Click table dropdown → "CSV import"
   - Upload the CSV file
   - Review field mapping
   - Click "Import"

---

## 🔍 Troubleshooting

### "Configuration error" when submitting form

**Check:**
```bash
# Verify .env.local exists
cat .env.local | grep AIRTABLE

# Should show your credentials
```

**Fix:** Restart dev server
```bash
# Stop server (Ctrl+C in terminal)
npm run dev
```

### Data not appearing in Airtable

**Check:**
1. ✅ Tables exist in Airtable with exact names: "Leads", "Products", "Orders", "Analytics"
2. ✅ API token has write permissions
3. ✅ Required fields exist in Leads table
4. ✅ Base ID matches the base you're looking at

**Debug:**
- Open browser console (F12)
- Submit form
- Check Network tab for API response
- Look for errors in console

### 404 Error

**Means:** Table not found
- Table name must be exactly "Leads" (capital L)
- Check table exists in the base: appteHbWjuWHeAWgf

### 401 Error

**Means:** Authentication failed
- API token is incorrect or expired
- Token doesn't have permissions for this base

---

## 📊 Expected Data Flow

```
User fills form on website
        ↓
POST /api/quote
        ↓
lib/airtable.ts → createLead()
        ↓
Airtable API
        ↓
Record saved in Leads table
        ↓
Success message shown to user
```

---

## 🎨 Customization Options

### Add More Fields to Quote Form

Edit `components/RequestQuoteForm.tsx` to add fields, then update:
1. Form state (`formData`)
2. Form UI (add input fields)
3. API mapping in `lib/airtable.ts`
4. Airtable table fields

### Change Table Names

If you named your tables differently in Airtable:

Edit `.env.local`:
```env
AIRTABLE_LEADS_TABLE=YourLeadsTableName
AIRTABLE_PRODUCTS_TABLE=YourProductsTableName
```

---

## ✅ Integration Checklist

Before going live, verify:

- [ ] Airtable base created with Base ID: `appteHbWjuWHeAWgf`
- [ ] 4 tables created: Leads, Products, Orders, Analytics
- [ ] Minimum fields added to Leads table (see above)
- [ ] CSV sample data imported (optional)
- [ ] .env.local configured with your credentials
- [ ] Dev server running: http://localhost:3000
- [ ] Submitted test quote via website
- [ ] Verified record appears in Airtable Leads table
- [ ] No errors in browser console

---

## 📁 Files Created

All setup files are in: `airtable-templates/`

- `LEADS-table.csv` - Sample leads for import
- `PRODUCTS-table.csv` - 8 real products ready to import
- `ORDERS-table.csv` - Sample orders
- `ANALYTICS-table.csv` - Sample metrics
- `MANUAL-SETUP-GUIDE.md` - Detailed setup instructions
- `README.md` - Template folder overview
- `SIMPLIFIED-AIRTABLE-PROMPT.txt` - AI base builder prompt

---

## 🚀 Your Website is Ready!

**Live at:** http://localhost:3000

**Test the quote form and watch the magic happen!** 🎉

When ready for production:
1. Deploy to Vercel/Netlify
2. Add same environment variables to hosting platform
3. Update `NEXT_PUBLIC_SITE_URL` to your domain
4. Test form submission on live site
5. Set up Airtable automations for email notifications

---

## 📞 Support

**Documentation:**
- Quick Start: `QUICKSTART.md`
- Complete Setup: `AIRTABLE_SETUP.md`
- Manual Import: `airtable-templates/MANUAL-SETUP-GUIDE.md`

**Need Help?**
- Airtable API Docs: https://airtable.com/developers/web/api/introduction
- Project Email: royalfituniform@gmail.com

---

**Last Updated:** January 1, 2026
**Status:** ✅ Ready for testing
