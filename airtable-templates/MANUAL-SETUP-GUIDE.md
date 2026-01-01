# Manual Airtable Setup Guide
## Royal Fit Uniform - Step-by-Step Instructions

Choose your setup method:
- **Option A**: Import CSV files (5 minutes) ⚡ FASTEST
- **Option B**: Use simplified AI prompt (10 minutes)
- **Option C**: Manual field-by-field setup (30 minutes)

---

## 🚀 OPTION A: CSV Import Method (RECOMMENDED)

### Step 1: Create Empty Base
1. Go to [airtable.com](https://airtable.com)
2. Click **"Create a base"** → **"Start from scratch"**
3. Name it: **"Royal Fit Uniform - Business Operations"**

### Step 2: Import Each Table

#### Import LEADS Table
1. In your new base, click the default table name (usually "Table 1")
2. Rename it to: **"Leads"**
3. Click the dropdown arrow next to any view name
4. Select **"CSV import"**
5. Upload: `airtable-templates/LEADS-table.csv`
6. Review field mapping (Airtable auto-detects types)
7. Click **"Import"**
8. ✅ Your Leads table is ready with 2 sample records!

#### Import PRODUCTS Table
1. Click **"+"** next to the Leads table tab
2. Select **"Import a spreadsheet"**
3. Upload: `airtable-templates/PRODUCTS-table.csv`
4. Name the table: **"Products"**
5. Click **"Import"**
6. ✅ All 8 products imported!

#### Import ORDERS Table
1. Click **"+"** next to the Products table tab
2. Select **"Import a spreadsheet"**
3. Upload: `airtable-templates/ORDERS-table.csv`
4. Name the table: **"Orders"**
5. Click **"Import"**
6. ✅ Sample orders ready!

#### Import ANALYTICS Table
1. Click **"+"** next to the Orders table tab
2. Select **"Import a spreadsheet"**
3. Upload: `airtable-templates/ANALYTICS-table.csv`
4. Name the table: **"Analytics"**
5. Click **"Import"**
6. ✅ Analytics tracking ready!

### Step 3: Fix Field Types (Important!)

After importing, some fields need type adjustments:

**In LEADS table:**
1. Click field name **"Company Type"** → **"Customize field type"**
2. Change to: **"Single select"**
3. Options will auto-populate from CSV data
4. Repeat for: Status, Priority, Timeline, Facility Size, Budget Range, Source, Preferred Contact
5. Change **"Logo Customization"**, **"Embroidery"**, **"Color Match"**, **"Marketing Opt-in"** to **"Checkbox"**
6. Change **"Estimated Value"** to **"Currency"** → Format: INR (₹)
7. Change **"Submitted At"** to **"Date"** → Include time: Yes

**In PRODUCTS table:**
1. Change **"Category"** and **"Department"** to **"Single select"**
2. Change **"Price Per Unit"** to **"Currency"** → Format: INR (₹)
3. Change **"Durability Rating"** to **"Number"** → Precision: 1 decimal place
4. Change **"Customizable"** and **"In Stock"** to **"Checkbox"**
5. Change **"Sizes"** and **"Colors"** to **"Multiple select"**

**In ORDERS table:**
1. Change **"Subtotal"**, **"Tax Amount"**, **"Total Amount"** to **"Currency"** → Format: INR (₹)
2. Change **"Status"**, **"Payment Status"**, **"Payment Terms"** to **"Single select"**
3. Change **"Order Date"** to **"Date"** → Include time: Yes
4. Change **"Expected Delivery"** and **"Actual Delivery"** to **"Date"**

**In ANALYTICS table:**
1. Change **"Date"** to **"Date"**
2. Change **"Period Type"** and **"Top Product Category"** to **"Single select"**
3. Change **"Revenue"** and **"Average Order Value"** to **"Currency"** → Format: INR (₹)
4. Change **"Conversion Rate %"** to **"Number"** → Precision: 2 decimal places

### Step 4: Create Views

**LEADS table views:**
1. Click **"Create view"** → **"Grid view"** → Name: "New Leads"
2. Add filter: **"Status"** is **"New"**
3. Sort by: **"Submitted At"** (newest first)
4. Save

5. Create another: **"Hot Leads"**
6. Add filter: **"Priority"** is **"High"** OR **"Timeline"** is **"Urgent"**

**PRODUCTS table views:**
1. Create view: **"Hotel Products"**
2. Filter: **"Category"** is **"Hotel"**

3. Create view: **"Hospital Products"**
4. Filter: **"Category"** is **"Hospital"**

**ORDERS table views:**
1. Create view: **"Active Orders"**
2. Filter: **"Status"** is not **"Delivered"** AND **"Status"** is not **"Cancelled"**

### Step 5: Get API Credentials

Now follow these steps to connect your website:

1. **Get Personal Access Token:**
   - Go to [airtable.com/create/tokens](https://airtable.com/create/tokens)
   - Click "Create new token"
   - Name: "Royal Fit Uniform Website"
   - Add scopes: `data.records:read` and `data.records:write`
   - Select your base
   - Copy the token (starts with `pat...`)

2. **Get Base ID:**
   - In your Airtable base, click **"Help"** → **"API documentation"**
   - Copy the Base ID (starts with `app...`)

3. **Configure .env.local:**
   ```bash
   cd /home/user/Royal-Fit-Uniform
   cp .env.example .env.local
   nano .env.local
   ```

   Add your credentials:
   ```env
   AIRTABLE_API_KEY=pat_YOUR_ACTUAL_TOKEN_HERE
   AIRTABLE_BASE_ID=appYOUR_ACTUAL_BASE_ID_HERE
   AIRTABLE_LEADS_TABLE=Leads
   AIRTABLE_PRODUCTS_TABLE=Products
   AIRTABLE_ORDERS_TABLE=Orders
   AIRTABLE_ANALYTICS_TABLE=Analytics
   ```

4. **Test the integration:**
   ```bash
   npm run dev
   ```

   - Open http://localhost:3000
   - Fill out the quote form
   - Check your Airtable Leads table!

✅ **DONE! Your Airtable integration is live!**

---

## 🤖 OPTION B: Simplified AI Prompt Method

If CSV import doesn't work, use the AI builder:

1. Create new base in Airtable
2. Look for **"Describe what you need"** or **AI setup** option
3. Copy and paste the content from: `airtable-templates/SIMPLIFIED-AIRTABLE-PROMPT.txt`
4. Click **"Build it"**
5. Review the generated structure
6. Make adjustments as needed
7. Continue from **Step 5** above (Get API Credentials)

---

## 🔧 OPTION C: Manual Field-by-Field Setup

For complete control, follow the detailed schema in `AIRTABLE_SETUP.md`.

This takes longer but gives you full understanding of every field.

---

## 🎨 Customization Tips

### Add More Fields to LEADS

If you want to track additional information:

1. Click **"+"** at the end of the field row
2. Choose field type
3. Common additions:
   - **"Website"** (URL) - Company website
   - **"LinkedIn"** (URL) - Contact's LinkedIn
   - **"Industry Segment"** (Single select) - 5-star hotel, Budget hotel, Multi-specialty hospital, etc.
   - **"Number of Locations"** (Number) - For chain customers
   - **"Decision Maker"** (Single select) - Yes, No, Unknown

### Add Product Images

1. In PRODUCTS table, add new field
2. Type: **"Attachment"**
3. Name: **"Product Images"**
4. Upload images for each product
5. Create a **"Gallery view"** to see products visually

### Link Tables Together

**Link LEADS to ORDERS:**
1. In ORDERS table, add new field
2. Type: **"Link to another record"**
3. Link to: **"Leads"** table
4. Name: **"Related Lead"**
5. Now you can track which order came from which lead!

---

## 🚨 Troubleshooting

### CSV Import Failed?
- **Error: "Invalid date format"**
  - Open CSV in Excel/Google Sheets
  - Change date format to: YYYY-MM-DD HH:MM:SS
  - Re-export as CSV

- **Error: "Too many columns"**
  - Airtable free tier limits: 50 fields per table
  - Remove optional fields from CSV
  - Import core fields first, add others manually

### Field Types Wrong After Import?
- Airtable auto-detects types but sometimes guesses wrong
- Manually change field types as shown in Step 3
- This is normal - takes 2-3 minutes to fix

### Can't Find "Import CSV" Option?
- Click the **dropdown arrow** next to view name (top left of table)
- Look for **"CSV import"** in the menu
- Alternatively: Create table → **"Import a spreadsheet"**

### Sample Data Not Needed?
- After importing, select all sample rows
- Right-click → **"Delete records"**
- Your structure remains, data is cleared
- Perfect for starting fresh!

---

## 📊 What You Get With These CSVs

**LEADS table** (2 sample records):
- 1 Hotel lead (urgent timeline, high priority)
- 1 Hospital lead (planned timeline, medium priority)
- Shows all field types and data formats

**PRODUCTS table** (8 real products):
- 4 Hotel uniforms
- 4 Hospital uniforms
- Complete with pricing, descriptions, features
- Ready to use for quoting customers

**ORDERS table** (2 sample orders):
- Shows order structure
- Demonstrates payment tracking
- Example of customization notes

**ANALYTICS table** (5 sample records):
- Monthly metrics for 3 months
- Weekly metrics for 2 weeks
- Shows how to track performance

---

## 🎯 Next Steps After Setup

1. **Delete sample data** (or keep for reference)
2. **Add your actual products** (or edit the imported ones)
3. **Invite your team:**
   - Click **"Share"** (top right)
   - Add email addresses
   - Set permissions (Editor, Commenter, Read-only)
4. **Set up automations** (see `AIRTABLE_SETUP.md` Step 8)
5. **Test the website integration**
6. **Create custom views** for your workflow

---

## 🎉 Success Checklist

Before going live, verify:

- ✅ All 4 tables created (Leads, Products, Orders, Analytics)
- ✅ Field types are correct (currency = ₹, dates have time, etc.)
- ✅ Sample data visible (or cleared if not needed)
- ✅ Views created (New Leads, Hot Leads, etc.)
- ✅ API token generated and copied
- ✅ Base ID copied
- ✅ `.env.local` file configured
- ✅ Website can connect (test with one form submission)

---

## 💡 Pro Tips

### Keyboard Shortcuts
- `Ctrl/Cmd + K` - Quick search
- `Space` - Expand record
- `/` - Filter
- `Shift + Enter` - Add new row

### Mobile Access
- Download Airtable mobile app
- View leads on the go
- Update order status from warehouse
- Receive push notifications

### Backup Your Data
- Click **"..."** menu → **"Download CSV"**
- Do this monthly
- Store in Google Drive/Dropbox
- Peace of mind!

---

## 📞 Need Help?

**CSV Files Not Working?**
- Email the CSV to yourself
- Download and try importing again
- Sometimes browser issues cause problems

**Still Stuck?**
- Check `QUICKSTART.md` for conceptual understanding
- Check `AIRTABLE_SETUP.md` for detailed field definitions
- Airtable support: support.airtable.com
- Royal Fit support: royalfituniform@gmail.com

---

**Estimated Setup Time:**
- CSV Import: 5-10 minutes
- AI Prompt: 10-15 minutes
- Manual Setup: 30-45 minutes

**Recommended Method:** CSV Import (Option A) - fastest and most accurate! ⚡
