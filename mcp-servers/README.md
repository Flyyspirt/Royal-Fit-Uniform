# Airtable MCP Server for Royal Fit Uniform

A Model Context Protocol (MCP) server that provides direct access to Royal Fit Uniform's Airtable base, enabling AI assistants to interact with leads, orders, and analytics data.

---

## 🎯 What is MCP?

**Model Context Protocol (MCP)** is a standard that allows AI assistants (like Claude) to connect to external data sources and tools. This MCP server enables Claude to:

- ✅ Create and manage leads directly in Airtable
- ✅ Fetch and filter lead data
- ✅ Update lead statuses
- ✅ Create orders
- ✅ Access analytics data

**No more manual API calls!** Claude can now interact with your Airtable base conversationally.

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Airtable account with API access
- Claude Desktop (for testing) or any MCP-compatible client

### Installation

```bash
# Navigate to MCP servers directory
cd /home/user/Royal-Fit-Uniform/mcp-servers

# Install dependencies
npm install

# Build the server
npm run build
```

### Configuration

#### For Claude Desktop

1. **Find your Claude Desktop config file:**
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
   - **Linux**: `~/.config/Claude/claude_desktop_config.json`

2. **Add this configuration:**
   ```json
   {
     "mcpServers": {
       "airtable-royal-fit": {
         "command": "node",
         "args": [
           "/home/user/Royal-Fit-Uniform/mcp-servers/dist/airtable-server.js"
         ],
         "env": {
           "AIRTABLE_API_KEY": "pat19ImPCVFwmc9sT.2a4c7cd2134108783dbe83b2c636999753bc4eb4ce946a62ddd099d7efd361ff",
           "AIRTABLE_BASE_ID": "appteHbWjuWHeAWgf"
         }
       }
     }
   }
   ```

3. **Restart Claude Desktop**

4. **Verify connection:**
   - Open Claude Desktop
   - Look for the 🔌 icon indicating MCP servers are connected
   - Ask Claude: "What tools do you have access to?"
   - Should see: `airtable-royal-fit` with 5 tools

---

## 🛠️ Available Tools

### 1. `create_lead`

Create a new lead in Airtable Leads table.

**Parameters:**
- `companyName` (required): Company name
- `companyType` (required): Type - "hotel", "hospital", or "other"
- `facilitySize`: Facility size
- `timeline`: "urgent", "planned", or "exploratory"
- `departments`: Array of department names
- `totalQuantity`: Quantity range
- `customizationNeeds`: Object with logo, embroidery, colorMatch booleans
- `contactName` (required): Contact person name
- `jobTitle`: Contact job title
- `email` (required): Contact email
- `phone` (required): Contact phone
- `budgetRange`: Budget range
- `preferredContact`: "email", "phone", or "whatsapp"

**Example conversation with Claude:**
```
User: "Create a new lead for Marriott Hotel in Mumbai. Contact is Priya Sharma
      (priya@marriott.com, +91 98765 43210), they need 200 front desk blazers urgently."

Claude: [Uses create_lead tool automatically]
        "I've created a new lead for Marriott Hotel Mumbai. Lead ID: recXXXXXXX..."
```

---

### 2. `get_leads`

Fetch leads with optional filtering.

**Parameters:**
- `status`: Filter by status - "New", "Contacted", "Qualified", "Proposal Sent", "Won", "Lost"
- `companyType`: Filter by type - "hotel", "hospital", "other"
- `timeline`: Filter by timeline - "urgent", "planned", "exploratory"
- `limit`: Max records to return (default: 10)

**Example conversation:**
```
User: "Show me all urgent hotel leads"

Claude: [Uses get_leads tool with status="urgent", companyType="hotel"]
        "Here are 3 urgent hotel leads:
        1. Grand Plaza Hotel Mumbai - Contact: Rahul Sharma
        2. Taj Palace Hotel - Contact: Amit Patel
        ..."
```

---

### 3. `update_lead`

Update a lead's status and fields.

**Parameters:**
- `recordId` (required): Airtable record ID
- `status`: New status value
- `notes`: Additional notes
- `assignedTo`: Assign to sales rep

**Example conversation:**
```
User: "Mark lead rec123456 as contacted and assign to Sales Rep 1"

Claude: [Uses update_lead tool]
        "I've updated the lead status to 'Contacted' and assigned it to Sales Rep 1."
```

---

### 4. `create_order`

Create a new order in Airtable.

**Parameters:**
- `customerName` (required): Customer name
- `companyName` (required): Company name
- `products` (required): Array of product names
- `totalItems` (required): Total items count
- `subtotal` (required): Subtotal amount
- `discount`: Discount percentage
- `taxAmount` (required): Tax amount
- `totalAmount` (required): Total amount
- `shippingAddress` (required): Shipping address
- `paymentTerms`: Payment terms

**Example conversation:**
```
User: "Create an order for Grand Plaza Hotel: 50 Executive Blazers,
      30 Chef Coats, total ₹2,75,000"

Claude: [Uses create_order tool]
        "I've created order ORD-001 for Grand Plaza Hotel..."
```

---

### 5. `get_analytics`

Fetch analytics data from Airtable.

**Parameters:**
- `periodType`: "Daily", "Weekly", "Monthly", or "Quarterly"
- `limit`: Max records (default: 10)

**Example conversation:**
```
User: "Show me monthly analytics for the last 3 months"

Claude: [Uses get_analytics with periodType="Monthly", limit=3]
        "Here's the monthly performance:
        - January 2026: 45 leads, 18 qualified, 40% conversion
        - December 2025: 38 leads, 15 qualified, 39.5% conversion
        ..."
```

---

## 💡 Usage Examples

### Example 1: Lead Management Workflow

```
User: "What new leads came in this week?"

Claude: [Calls get_leads with appropriate filters]
        "You have 5 new leads this week:
        1. Apollo Hospital - Dr. Priya (urgent, 500+ pieces)
        2. Taj Hotel - Amit Patel (planned, 200-500 pieces)
        ..."

User: "Contact the Apollo Hospital lead and mark it as contacted"

Claude: [Calls update_lead]
        "I've updated Apollo Hospital's lead status to 'Contacted'."
```

### Example 2: Quick Lead Creation

```
User: "Someone from Fortis Hospital just called. Name is Dr. Singh,
      email: singh@fortis.com, phone: +91 98765 11111. They need
      100 nursing scrubs ASAP."

Claude: [Calls create_lead with all the information]
        "I've created a new lead for Fortis Hospital:
        - Contact: Dr. Singh
        - Type: Hospital
        - Timeline: Urgent
        - Quantity: 100 pieces
        - Departments: Nursing & Care
        Lead ID: rec1234567890"
```

### Example 3: Business Analytics

```
User: "How's our business performing this month?"

Claude: [Calls get_analytics and get_leads]
        "Here's January 2026 performance:
        - Total Leads: 45
        - Qualified: 18 (40% conversion)
        - Revenue: ₹35,00,000
        - Top Category: Hospital uniforms

        Currently you have:
        - 12 new leads awaiting contact
        - 5 urgent leads (need immediate attention)
        - 8 proposals sent awaiting response"
```

---

## 🔧 Development

### Run in Development Mode

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Watch Mode (Auto-rebuild)

```bash
npm run watch
```

### Test the Server

```bash
# Set environment variables
export AIRTABLE_API_KEY="pat19ImPCVFwmc9sT.2a4c7cd2134108783dbe83b2c636999753bc4eb4ce946a62ddd099d7efd361ff"
export AIRTABLE_BASE_ID="appteHbWjuWHeAWgf"

# Run the server
npm start
```

---

## 📊 Architecture

```
┌─────────────────────┐
│   Claude Desktop    │
│   (MCP Client)      │
└──────────┬──────────┘
           │
           │ MCP Protocol (stdio)
           │
┌──────────▼──────────┐
│   MCP Server        │
│  (airtable-server)  │
└──────────┬──────────┘
           │
           │ Airtable REST API
           │
┌──────────▼──────────┐
│   Airtable Base     │
│   appteHbWjuWHeAWgf │
│   ├── Leads         │
│   ├── Products      │
│   ├── Orders        │
│   └── Analytics     │
└─────────────────────┘
```

---

## 🔐 Security

### Environment Variables

**Never hardcode credentials!** Always use environment variables.

**Good:**
```json
{
  "env": {
    "AIRTABLE_API_KEY": "${AIRTABLE_API_KEY}",
    "AIRTABLE_BASE_ID": "${AIRTABLE_BASE_ID}"
  }
}
```

**Also Good (for local testing):**
```bash
export AIRTABLE_API_KEY="pat_your_key"
export AIRTABLE_BASE_ID="app_your_base"
```

### API Token Permissions

Ensure your Airtable token has:
- ✅ `data.records:read` - Read data
- ✅ `data.records:write` - Create/update records
- ❌ Not `schema.bases:write` - Don't allow schema changes

### Rotate Tokens

- Rotate API tokens every 90 days
- Use different tokens for development vs production
- Revoke tokens immediately if compromised

---

## 🐛 Troubleshooting

### Server Not Appearing in Claude Desktop

1. **Check config file location:**
   ```bash
   # macOS
   cat ~/Library/Application\ Support/Claude/claude_desktop_config.json

   # Linux
   cat ~/.config/Claude/claude_desktop_config.json
   ```

2. **Verify JSON syntax:**
   - Use a JSON validator
   - Check for missing commas, quotes
   - Ensure paths are absolute

3. **Check server builds:**
   ```bash
   npm run build
   # Should create dist/airtable-server.js
   ```

4. **Restart Claude Desktop completely**

### Tool Calls Failing

1. **Check environment variables:**
   ```bash
   # In the MCP server, add debug logging
   console.error('API Key:', process.env.AIRTABLE_API_KEY?.substring(0, 10));
   console.error('Base ID:', process.env.AIRTABLE_BASE_ID);
   ```

2. **Verify Airtable access:**
   ```bash
   curl -X GET \
     "https://api.airtable.com/v0/appteHbWjuWHeAWgf/Leads?maxRecords=1" \
     -H "Authorization: Bearer pat19ImPCVFwmc9sT..."
   ```

3. **Check table names:**
   - Must match exactly (case-sensitive!)
   - "Leads" not "leads"
   - "Orders" not "Order"

### Network Errors

- MCP runs on the local machine
- Requires internet access to reach Airtable API
- Check firewall settings

---

## 📝 Configuration Reference

### Full Claude Desktop Config

```json
{
  "mcpServers": {
    "airtable-royal-fit": {
      "command": "node",
      "args": [
        "/absolute/path/to/dist/airtable-server.js"
      ],
      "env": {
        "AIRTABLE_API_KEY": "your_api_key_here",
        "AIRTABLE_BASE_ID": "your_base_id_here"
      }
    }
  }
}
```

### Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `AIRTABLE_API_KEY` | Personal Access Token | `pat19ImPCVFwmc9sT...` |
| `AIRTABLE_BASE_ID` | Base ID | `appteHbWjuWHeAWgf` |

---

## 🚀 Advanced Usage

### Custom Filters

```typescript
// In conversation with Claude
"Show me all hospital leads from the last week with budget over 5 lakhs"

// Claude can combine tools:
// 1. Get leads filtered by companyType="hospital"
// 2. Further filter by date and budget in response
```

### Batch Operations

```typescript
"Create leads for these 3 companies:
1. Hotel Leela - contact@leela.com
2. Max Hospital - info@maxhospital.com
3. Oberoi Hotels - sales@oberoi.com"

// Claude will call create_lead 3 times
```

### Analytics Dashboard

```typescript
"Generate a sales report for this quarter"

// Claude combines:
// - get_analytics for metrics
// - get_leads for pipeline data
// - Formats into readable report
```

---

## 🔄 Updates & Maintenance

### Updating the Server

```bash
# Pull latest code
git pull origin claude/setup-airtable-integration-Tpxc8

# Rebuild
cd mcp-servers
npm run build

# Restart Claude Desktop
```

### Adding New Tools

1. Add tool definition to `TOOLS` array
2. Implement handler function
3. Add case in switch statement
4. Rebuild and test

### Version History

- **v1.0.0** (2026-01-01): Initial release
  - 5 tools: create_lead, get_leads, update_lead, create_order, get_analytics
  - Full CRUD operations
  - Claude Desktop compatible

---

## 📞 Support

**Documentation:**
- Main project: `../AIRTABLE_SETUP.md`
- API integration: `../INTEGRATION-STATUS.md`
- Testing: `../TESTING-SUCCESS.md`

**Troubleshooting:**
- MCP SDK: https://modelcontextprotocol.io
- Airtable API: https://airtable.com/developers/web/api

**Contact:**
- Email: royalfituniform@gmail.com

---

## 📄 License

Private - Royal Fit Uniform © 2026

---

**Built with ❤️ using the Model Context Protocol**

Enable your AI assistant to manage your entire Airtable workflow conversationally!
