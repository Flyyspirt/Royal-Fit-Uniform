#!/usr/bin/env node
/**
 * MCP Server for Airtable Integration
 *
 * This MCP server provides direct access to Royal Fit Uniform's Airtable base
 * through the Model Context Protocol.
 *
 * Tools provided:
 * - create_lead: Create a new lead in Airtable
 * - get_leads: Fetch leads with filtering
 * - update_lead: Update lead status and fields
 * - create_order: Create a new order
 * - get_analytics: Fetch analytics data
 */
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema, } from '@modelcontextprotocol/sdk/types.js';
// Airtable configuration
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || '';
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || '';
const AIRTABLE_API_URL = 'https://api.airtable.com/v0';
// Define available tools
const TOOLS = [
    {
        name: 'create_lead',
        description: 'Create a new lead in Airtable Leads table',
        inputSchema: {
            type: 'object',
            properties: {
                companyName: { type: 'string', description: 'Company name' },
                companyType: {
                    type: 'string',
                    enum: ['hotel', 'hospital', 'other'],
                    description: 'Type of company'
                },
                facilitySize: { type: 'string', description: 'Facility size' },
                timeline: {
                    type: 'string',
                    enum: ['urgent', 'planned', 'exploratory'],
                    description: 'Timeline for uniform needs'
                },
                departments: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Departments needing uniforms'
                },
                totalQuantity: { type: 'string', description: 'Total quantity needed' },
                customizationNeeds: {
                    type: 'object',
                    properties: {
                        logo: { type: 'boolean' },
                        embroidery: { type: 'boolean' },
                        colorMatch: { type: 'boolean' }
                    }
                },
                contactName: { type: 'string', description: 'Contact person name' },
                jobTitle: { type: 'string', description: 'Contact job title' },
                email: { type: 'string', description: 'Contact email' },
                phone: { type: 'string', description: 'Contact phone' },
                budgetRange: { type: 'string', description: 'Budget range' },
                preferredContact: {
                    type: 'string',
                    enum: ['email', 'phone', 'whatsapp'],
                    description: 'Preferred contact method'
                }
            },
            required: ['companyName', 'companyType', 'contactName', 'email', 'phone']
        }
    },
    {
        name: 'get_leads',
        description: 'Fetch leads from Airtable with optional filtering',
        inputSchema: {
            type: 'object',
            properties: {
                status: {
                    type: 'string',
                    enum: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'],
                    description: 'Filter by lead status'
                },
                companyType: {
                    type: 'string',
                    enum: ['hotel', 'hospital', 'other'],
                    description: 'Filter by company type'
                },
                timeline: {
                    type: 'string',
                    enum: ['urgent', 'planned', 'exploratory'],
                    description: 'Filter by timeline'
                },
                limit: {
                    type: 'number',
                    description: 'Maximum number of records to return',
                    default: 10
                }
            }
        }
    },
    {
        name: 'update_lead',
        description: 'Update a lead in Airtable',
        inputSchema: {
            type: 'object',
            properties: {
                recordId: { type: 'string', description: 'Airtable record ID' },
                status: {
                    type: 'string',
                    enum: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'],
                    description: 'New status for the lead'
                },
                notes: { type: 'string', description: 'Additional notes' },
                assignedTo: { type: 'string', description: 'Assign to sales rep' }
            },
            required: ['recordId']
        }
    },
    {
        name: 'create_order',
        description: 'Create a new order in Airtable',
        inputSchema: {
            type: 'object',
            properties: {
                customerName: { type: 'string', description: 'Customer name' },
                companyName: { type: 'string', description: 'Company name' },
                products: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Products ordered'
                },
                totalItems: { type: 'number', description: 'Total items' },
                subtotal: { type: 'number', description: 'Subtotal amount' },
                discount: { type: 'number', description: 'Discount percentage' },
                taxAmount: { type: 'number', description: 'Tax amount' },
                totalAmount: { type: 'number', description: 'Total amount' },
                shippingAddress: { type: 'string', description: 'Shipping address' },
                paymentTerms: { type: 'string', description: 'Payment terms' }
            },
            required: ['customerName', 'companyName', 'products', 'totalItems', 'subtotal', 'taxAmount', 'totalAmount', 'shippingAddress']
        }
    },
    {
        name: 'get_analytics',
        description: 'Fetch analytics data from Airtable',
        inputSchema: {
            type: 'object',
            properties: {
                periodType: {
                    type: 'string',
                    enum: ['Daily', 'Weekly', 'Monthly', 'Quarterly'],
                    description: 'Period type to filter by'
                },
                limit: {
                    type: 'number',
                    description: 'Maximum number of records',
                    default: 10
                }
            }
        }
    }
];
// Airtable API helper functions
async function airtableRequest(tableName, method, data) {
    const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_ID}/${tableName}`;
    const options = {
        method,
        headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json',
        },
    };
    if (data && (method === 'POST' || method === 'PATCH')) {
        options.body = JSON.stringify(data);
    }
    const response = await fetch(url, options);
    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Airtable API error: ${response.status} ${error}`);
    }
    return await response.json();
}
// Tool implementations
async function handleCreateLead(args) {
    const record = {
        records: [{
                fields: {
                    'Company Name': args.companyName,
                    'Company Type': args.companyType,
                    'Facility Size': args.facilitySize || '',
                    'Timeline': args.timeline || 'exploratory',
                    'Departments': args.departments?.join(', ') || '',
                    'Total Quantity': args.totalQuantity || '',
                    'Logo Customization': args.customizationNeeds?.logo || false,
                    'Embroidery': args.customizationNeeds?.embroidery || false,
                    'Color Match': args.customizationNeeds?.colorMatch || false,
                    'Contact Name': args.contactName,
                    'Job Title': args.jobTitle || '',
                    'Email': args.email,
                    'Phone': args.phone,
                    'Budget Range': args.budgetRange || '',
                    'Preferred Contact': args.preferredContact || 'email',
                    'Marketing Opt-in': true,
                    'Source': 'MCP Server',
                    'Submitted At': new Date().toISOString(),
                    'Status': 'New',
                }
            }]
    };
    const result = await airtableRequest('Leads', 'POST', record);
    return {
        success: true,
        recordId: result.records[0].id,
        message: 'Lead created successfully'
    };
}
async function handleGetLeads(args) {
    let url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_ID}/Leads?`;
    const filters = [];
    if (args.status)
        filters.push(`{Status}="${args.status}"`);
    if (args.companyType)
        filters.push(`{Company Type}="${args.companyType}"`);
    if (args.timeline)
        filters.push(`{Timeline}="${args.timeline}"`);
    if (filters.length > 0) {
        const formula = filters.length > 1
            ? `AND(${filters.join(',')})`
            : filters[0];
        url += `filterByFormula=${encodeURIComponent(formula)}&`;
    }
    if (args.limit) {
        url += `maxRecords=${args.limit}`;
    }
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        },
    });
    const data = await response.json();
    return {
        success: true,
        count: data.records.length,
        leads: data.records.map((r) => ({
            id: r.id,
            ...r.fields
        }))
    };
}
async function handleUpdateLead(args) {
    const updates = {};
    if (args.status)
        updates['Status'] = args.status;
    if (args.notes)
        updates['Notes'] = args.notes;
    if (args.assignedTo)
        updates['Assigned To'] = args.assignedTo;
    updates['Updated At'] = new Date().toISOString();
    const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_ID}/Leads/${args.recordId}`;
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields: updates }),
    });
    const data = await response.json();
    return {
        success: true,
        recordId: data.id,
        message: 'Lead updated successfully'
    };
}
async function handleCreateOrder(args) {
    const record = {
        records: [{
                fields: {
                    'Customer Name': args.customerName,
                    'Company Name': args.companyName,
                    'Order Date': new Date().toISOString(),
                    'Products Ordered': args.products.join(', '),
                    'Total Items': args.totalItems,
                    'Subtotal': args.subtotal,
                    'Discount (%)': args.discount || 0,
                    'Tax Amount': args.taxAmount,
                    'Total Amount': args.totalAmount,
                    'Status': 'Draft',
                    'Payment Status': 'Pending',
                    'Payment Terms': args.paymentTerms || '30% Advance',
                    'Shipping Address': args.shippingAddress,
                    'Notes': '',
                }
            }]
    };
    const result = await airtableRequest('Orders', 'POST', record);
    return {
        success: true,
        recordId: result.records[0].id,
        message: 'Order created successfully'
    };
}
async function handleGetAnalytics(args) {
    let url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_ID}/Analytics?`;
    if (args.periodType) {
        url += `filterByFormula={Period Type}="${args.periodType}"&`;
    }
    url += `sort[0][field]=Date&sort[0][direction]=desc`;
    if (args.limit) {
        url += `&maxRecords=${args.limit}`;
    }
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        },
    });
    const data = await response.json();
    return {
        success: true,
        count: data.records.length,
        analytics: data.records.map((r) => ({
            id: r.id,
            ...r.fields
        }))
    };
}
// Create MCP server
const server = new Server({
    name: 'airtable-royal-fit',
    version: '1.0.0',
}, {
    capabilities: {
        tools: {},
    },
});
// Register tool handlers
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return { tools: TOOLS };
});
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    try {
        let result;
        switch (name) {
            case 'create_lead':
                result = await handleCreateLead(args);
                break;
            case 'get_leads':
                result = await handleGetLeads(args);
                break;
            case 'update_lead':
                result = await handleUpdateLead(args);
                break;
            case 'create_order':
                result = await handleCreateOrder(args);
                break;
            case 'get_analytics':
                result = await handleGetAnalytics(args);
                break;
            default:
                throw new Error(`Unknown tool: ${name}`);
        }
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(result, null, 2)
                }]
        };
    }
    catch (error) {
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify({
                        success: false,
                        error: error.message
                    }, null, 2)
                }],
            isError: true,
        };
    }
});
// Start server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('Airtable MCP Server running on stdio');
}
main().catch((error) => {
    console.error('Fatal error in main():', error);
    process.exit(1);
});
//# sourceMappingURL=airtable-server.js.map