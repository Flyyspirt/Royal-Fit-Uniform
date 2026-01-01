# Airtable Templates & Setup Files

This folder contains everything you need to set up Airtable for Royal Fit Uniform.

---

## 📁 Files in This Folder

### CSV Import Files (Ready to Use)

| File | Description | Records | Use For |
|------|-------------|---------|---------|
| `LEADS-table.csv` | Customer quote requests | 2 samples | Import to create Leads table |
| `PRODUCTS-table.csv` | Uniform catalog | 8 products | Import to create Products table |
| `ORDERS-table.csv` | Customer orders | 2 samples | Import to create Orders table |
| `ANALYTICS-table.csv` | Business metrics | 5 samples | Import to create Analytics table |

**✅ These work in Excel, Google Sheets, AND Airtable!**

### Setup Guides

| File | Description | Time Required |
|------|-------------|---------------|
| `MANUAL-SETUP-GUIDE.md` | **START HERE!** Step-by-step import instructions | 5-10 min |
| `SIMPLIFIED-AIRTABLE-PROMPT.txt` | AI base builder prompt (if CSV doesn't work) | 10 min |
| `products-import.csv` | Legacy file (same as PRODUCTS-table.csv) | - |

---

## 🚀 Quick Start (Choose One Method)

### Method 1: CSV Import ⚡ FASTEST (5 minutes)

```bash
1. Open Airtable → Create new base
2. Import LEADS-table.csv → Rename table to "Leads"
3. Import PRODUCTS-table.csv → New table "Products"
4. Import ORDERS-table.csv → New table "Orders"
5. Import ANALYTICS-table.csv → New table "Analytics"
6. Fix field types (see MANUAL-SETUP-GUIDE.md)
7. Done!
```

**Full instructions:** Open `MANUAL-SETUP-GUIDE.md` → Option A

### Method 2: AI Prompt (10 minutes)

```bash
1. Open Airtable → Create new base
2. Click "Describe what you need"
3. Copy/paste from SIMPLIFIED-AIRTABLE-PROMPT.txt
4. Click "Build it"
5. Review and adjust
6. Done!
```

**Full instructions:** Open `MANUAL-SETUP-GUIDE.md` → Option B

### Method 3: Manual Setup (30 minutes)

Follow the complete guide in the root folder: `AIRTABLE_SETUP.md`

---

## 📊 What's Included in the CSVs

### LEADS-table.csv
**Purpose:** Track customer quote requests from your website

**Sample Data:**
- 1 Hotel lead (Sample Hotel Ltd)
- 1 Hospital lead (City Hospital)

**27 Fields Including:**
- Company info (name, type, size)
- Contact details (name, email, phone)
- Requirements (departments, quantity, customization)
- Sales pipeline (status, priority, timeline)
- Tracking (source, assigned to, dates)

### PRODUCTS-table.csv
**Purpose:** Your uniform product catalog

**Sample Data:**
- 4 Hotel products (blazers, chef coats, shirts, tunics)
- 4 Hospital products (scrubs, lab coats, polos)

**16 Fields Including:**
- Product info (name, category, description)
- Specs (fabric, features, durability)
- Pricing (price per unit, minimum order)
- Inventory (stock status, quantity, lead time)
- Customization options

### ORDERS-table.csv
**Purpose:** Track confirmed orders and fulfillment

**Sample Data:**
- 1 Hotel order (in production)
- 1 Hospital order (confirmed)

**18 Fields Including:**
- Order info (ID, customer, company, date)
- Order details (products, quantities, pricing)
- Status tracking (order status, payment status)
- Fulfillment (delivery dates, shipping, tracking)

### ANALYTICS-table.csv
**Purpose:** Business performance metrics

**Sample Data:**
- 3 Monthly reports
- 2 Weekly reports

**10 Fields Including:**
- Time period (date, period type)
- Lead metrics (total, qualified, conversion rate)
- Revenue metrics (total, average order value)
- Category performance (hotel vs hospital)

---

## 🎨 Using These Files in Excel/Google Sheets

### Open in Excel
```
1. Double-click any .csv file
2. Opens in Excel automatically
3. Edit if needed
4. Save as CSV again before importing to Airtable
```

### Open in Google Sheets
```
1. Go to Google Sheets
2. File → Import → Upload
3. Select .csv file
4. Import location: "Insert new sheet"
5. Edit if needed
6. File → Download → CSV
7. Import to Airtable
```

### Why CSV Format?
- ✅ Universal compatibility
- ✅ Works in Excel, Google Sheets, Numbers
- ✅ Airtable imports perfectly
- ✅ Small file size
- ✅ Git-friendly (version control)

---

## 🔧 Customizing the CSVs Before Import

### Add Your Own Products
1. Open `PRODUCTS-table.csv` in Excel
2. Replace rows 2-9 with your products
3. Keep column headers (row 1) unchanged
4. Save as CSV
5. Import to Airtable

### Add More Sample Leads
1. Open `LEADS-table.csv` in Excel
2. Add rows below the existing data
3. Follow same format
4. Save as CSV
5. Import to Airtable

### Remove Sample Data
Option 1 - Import then delete in Airtable:
```
1. Import CSV with samples
2. In Airtable, select all sample rows
3. Right-click → Delete records
4. Structure remains, data cleared
```

Option 2 - Clean CSV before import:
```
1. Open CSV in Excel
2. Delete rows 2 onwards (keep row 1 headers!)
3. Save as CSV
4. Import empty structure to Airtable
```

---

## 🎯 Field Type Reference

After importing CSVs, change these field types in Airtable:

**Text Fields** - Already correct, no change needed
**Number Fields** - Usually correct, verify decimals
**Date Fields** - Change to "Date" and enable "Include time"
**Currency Fields** - Change to "Currency" → Format: INR (₹)
**Checkbox Fields** - Change from "Checkbox" (import as text "TRUE/FALSE")
**Single Select** - Change to "Single select" (imports as text)
**Multiple Select** - Change to "Multiple select" (imports as comma-separated text)

**See MANUAL-SETUP-GUIDE.md Step 3 for detailed instructions!**

---

## 🚨 Common Import Issues

### Issue: Dates Import as Text
**Solution:**
- In Airtable, click field name → Customize field type
- Change to "Date"
- Enable "Include time" toggle
- Data converts automatically

### Issue: Checkboxes Import as "TRUE/FALSE" Text
**Solution:**
- Click field name → Customize field type
- Change to "Checkbox"
- Airtable recognizes TRUE/FALSE and converts

### Issue: CSV Won't Import - "Invalid Format"
**Solution:**
- Open in Excel
- File → Save As → CSV UTF-8
- Try importing again

### Issue: Special Characters Look Wrong (₹ shows as ?)
**Solution:**
- Your file encoding is wrong
- Open in Notepad++ or VS Code
- Save with UTF-8 encoding
- Re-import

### Issue: Numbers with Commas (1,500) Import as Text
**Solution:**
- Remove commas before import (Excel find/replace)
- Import as numbers
- Format in Airtable as needed

---

## 📋 Pre-Import Checklist

Before importing to Airtable:

- [ ] CSV file opens correctly in Excel
- [ ] All required columns present
- [ ] No special characters in column names
- [ ] Dates in format: YYYY-MM-DD or YYYY-MM-DD HH:MM:SS
- [ ] Numbers don't have currency symbols (add in Airtable)
- [ ] No formulas (values only)
- [ ] File saved as .csv (not .xlsx)

---

## 🎉 After Successful Import

1. **Verify Data**
   - Check all rows imported
   - Spot-check a few records for accuracy
   - Verify special characters (₹, etc.) display correctly

2. **Fix Field Types**
   - Follow Step 3 in MANUAL-SETUP-GUIDE.md
   - Takes 2-3 minutes per table

3. **Create Views**
   - New Leads, Hot Leads, etc.
   - See MANUAL-SETUP-GUIDE.md Step 4

4. **Test Integration**
   - Get API credentials
   - Configure .env.local
   - Submit test quote form
   - Verify data flows to Airtable

5. **Clean Up**
   - Delete sample data if not needed
   - Add your real products
   - Invite team members

---

## 💡 Pro Tips

### Keep Original CSVs Safe
- Don't edit the originals directly
- Make a copy first: `LEADS-table-CUSTOM.csv`
- Keeps template intact for reference

### Version Control Your Customizations
- Save dated versions: `products-2026-01-15.csv`
- Easy to roll back if needed

### Bulk Edit in Excel, Then Re-Import
- Faster than editing 50 products in Airtable UI
- Edit CSV in Excel
- In Airtable: Delete all records → Re-import
- Structure stays, data refreshes

### Export from Airtable Back to CSV
- Keep backups
- Click view menu → Download CSV
- Schedule monthly exports

---

## 📞 Support

**Questions about:**
- CSV format → See this README
- Import process → See MANUAL-SETUP-GUIDE.md
- Field definitions → See AIRTABLE_SETUP.md (root folder)
- Quick setup → See QUICKSTART.md (root folder)

**Still need help?**
- Airtable support: support.airtable.com
- Project email: royalfituniform@gmail.com

---

## 📅 Last Updated

**Version:** 1.0
**Date:** January 2026
**Maintained by:** Royal Fit Uniform Development Team

---

## 🎯 Quick Reference

**Recommended import order:**
1. LEADS-table.csv
2. PRODUCTS-table.csv
3. ORDERS-table.csv
4. ANALYTICS-table.csv

**Total setup time:** 5-10 minutes with CSV import

**Files needed for website integration:**
- Airtable API token (from airtable.com/create/tokens)
- Base ID (from your base's Help → API documentation)
- .env.local file in website root

**Ready to start?** → Open `MANUAL-SETUP-GUIDE.md` and follow Option A! 🚀
