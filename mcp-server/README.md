# Royal Fit Uniform MCP Server

Model Context Protocol (MCP) server for the Royal Fit Uniform website. This server enables AI assistants to access product data, case studies, and submit leads through a standardized protocol.

## What is MCP?

Model Context Protocol (MCP) is an open protocol developed by Anthropic that enables AI assistants to securely connect to external data sources and tools. This server exposes Royal Fit Uniform's data and capabilities to any MCP-compatible AI assistant.

## Features

### Tools

The server provides the following tools:

1. **get_products** - Get all products or filter by category (hotel/hospital) and department
2. **get_product_by_id** - Get detailed information about a specific product
3. **search_products** - Search products by name, description, features, or fabric
4. **get_case_studies** - Get all case studies or filter by sector
5. **submit_lead** - Submit a new lead/quote request to Airtable
6. **get_product_stats** - Get statistics about the product catalog

### Resources

The server exposes these resources:

- `royal-fit://products/all` - Complete product catalog
- `royal-fit://products/hotel` - Hotel uniform products
- `royal-fit://products/hospital` - Hospital uniform products
- `royal-fit://case-studies/all` - All case studies
- `royal-fit://case-studies/hotel` - Hotel sector case studies
- `royal-fit://case-studies/hospital` - Hospital sector case studies

## Installation

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Setup

1. Navigate to the mcp-server directory:
   ```bash
   cd mcp-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the server:
   ```bash
   npm run build
   ```

4. Set up environment variables (in the root directory):
   ```bash
   # Required for lead submission
   AIRTABLE_API_KEY=your_airtable_api_key
   AIRTABLE_BASE_ID=your_airtable_base_id
   AIRTABLE_LEADS_TABLE=Leads
   ```

## Usage

### Running the Server

The MCP server runs via stdio transport:

```bash
npm start
```

### Configuring with Claude Desktop

Add this to your Claude Desktop configuration file:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "royal-fit-uniform": {
      "command": "node",
      "args": [
        "/absolute/path/to/Royal-Fit-Uniform/mcp-server/build/index.js"
      ],
      "env": {
        "AIRTABLE_API_KEY": "your_airtable_api_key",
        "AIRTABLE_BASE_ID": "your_airtable_base_id"
      }
    }
  }
}
```

Replace `/absolute/path/to/Royal-Fit-Uniform` with the actual path to your project.

### Using with Other MCP Clients

The server follows the standard MCP protocol and can be used with any MCP-compatible client. Configure your client to run:

```bash
node /path/to/Royal-Fit-Uniform/mcp-server/build/index.js
```

## Example Usage

### Get All Hotel Products

```typescript
// Tool call
{
  "name": "get_products",
  "arguments": {
    "category": "hotel"
  }
}
```

### Search for Antimicrobial Products

```typescript
// Tool call
{
  "name": "search_products",
  "arguments": {
    "query": "antimicrobial",
    "category": "hospital"
  }
}
```

### Get Product Statistics

```typescript
// Tool call
{
  "name": "get_product_stats",
  "arguments": {}
}
```

### Submit a Lead

```typescript
// Tool call
{
  "name": "submit_lead",
  "arguments": {
    "companyName": "Grand Hotel Mumbai",
    "companyType": "hotel",
    "facilitySize": "200 rooms",
    "hasCurrentSupplier": true,
    "currentSupplierName": "ABC Uniforms",
    "timeline": "planned",
    "departments": ["Front Desk", "Housekeeping", "F&B"],
    "totalQuantity": "150",
    "customizationNeeds": {
      "logo": true,
      "embroidery": true,
      "colorMatch": false
    },
    "name": "Raj Patel",
    "title": "Procurement Manager",
    "email": "raj@grandhotel.com",
    "phone": "+91-9876543210",
    "budgetRange": "500000-1000000",
    "preferredContact": "email",
    "marketingOptIn": true
  }
}
```

## Development

### Watch Mode

For development, you can run TypeScript in watch mode:

```bash
npm run dev
```

This will automatically recompile when you make changes.

### Project Structure

```
mcp-server/
├── index.ts           # Main MCP server implementation
├── package.json       # Dependencies and scripts
├── tsconfig.json      # TypeScript configuration
├── build/             # Compiled JavaScript (generated)
└── README.md          # This file
```

## Data Sources

The server reads data from:
- `/data/products.ts` - Product catalog
- `/data/case-studies.ts` - Case studies and testimonials
- `/lib/airtable.ts` - Lead submission integration

## Security

- The server runs locally and doesn't expose any network ports
- Communication happens via stdio (standard input/output)
- Airtable API keys should be kept secure and never committed to version control
- Lead data is sent directly to Airtable with proper authentication

## Troubleshooting

### Server won't start

1. Ensure you've built the project: `npm run build`
2. Check that Node.js version is 20.x or higher: `node --version`
3. Verify all dependencies are installed: `npm install`

### Lead submission fails

1. Check that `AIRTABLE_API_KEY` and `AIRTABLE_BASE_ID` are set
2. Verify your Airtable API key has write permissions
3. Ensure the Airtable table structure matches the expected fields

### Resource not found

1. Ensure the build is up-to-date: `npm run build`
2. Check that data files exist in `/data` directory
3. Verify TypeScript compilation completed without errors

## Contributing

When modifying the MCP server:

1. Update the TypeScript source in `index.ts`
2. Rebuild with `npm run build`
3. Test with an MCP client (like Claude Desktop)
4. Update this README if adding new tools or resources

## License

This MCP server is part of the Royal Fit Uniform website project.

## Contact

For questions or support:
- Email: royalfituniform@gmail.com
- Website: https://royalfituniform.com
