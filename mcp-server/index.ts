#!/usr/bin/env node

/**
 * Royal Fit Uniform MCP Server
 *
 * This MCP server provides AI assistants with access to:
 * - Product catalog (hotel & hospital uniforms)
 * - Case studies and testimonials
 * - Lead submission capabilities
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// Import data from local data files
import { products, hotelProducts, hospitalProducts } from './products-data.js';
import { caseStudies, hotelCaseStudies, hospitalCaseStudies } from './case-studies-data.js';
import { createLead } from './airtable-wrapper.js';

// Create server instance
const server = new Server(
  {
    name: 'royal-fit-uniform',
    version: '1.0.0',
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  }
);

/**
 * List available tools
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'get_products',
        description: 'Get all products or filter by category (hotel/hospital)',
        inputSchema: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              enum: ['hotel', 'hospital'],
              description: 'Filter products by category (optional)',
            },
            department: {
              type: 'string',
              description: 'Filter products by department (optional)',
            },
          },
        },
      },
      {
        name: 'get_product_by_id',
        description: 'Get detailed information about a specific product by ID',
        inputSchema: {
          type: 'object',
          properties: {
            productId: {
              type: 'string',
              description: 'The unique ID of the product',
            },
          },
          required: ['productId'],
        },
      },
      {
        name: 'search_products',
        description: 'Search products by name, description, or features',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search query string',
            },
            category: {
              type: 'string',
              enum: ['hotel', 'hospital'],
              description: 'Limit search to a specific category (optional)',
            },
          },
          required: ['query'],
        },
      },
      {
        name: 'get_case_studies',
        description: 'Get all case studies or filter by sector (hotel/hospital)',
        inputSchema: {
          type: 'object',
          properties: {
            sector: {
              type: 'string',
              enum: ['hotel', 'hospital'],
              description: 'Filter case studies by sector (optional)',
            },
          },
        },
      },
      {
        name: 'submit_lead',
        description: 'Submit a new lead/quote request to Royal Fit Uniform',
        inputSchema: {
          type: 'object',
          properties: {
            companyName: {
              type: 'string',
              description: 'Name of the company',
            },
            companyType: {
              type: 'string',
              enum: ['hotel', 'hospital', 'other'],
              description: 'Type of company',
            },
            facilitySize: {
              type: 'string',
              description: 'Size of the facility (e.g., "100 rooms" or "200 beds")',
            },
            hasCurrentSupplier: {
              type: 'boolean',
              description: 'Whether they have a current uniform supplier',
            },
            currentSupplierName: {
              type: 'string',
              description: 'Name of current supplier (if any)',
            },
            timeline: {
              type: 'string',
              enum: ['urgent', 'planned', 'exploratory'],
              description: 'Timeline for uniform needs',
            },
            departments: {
              type: 'array',
              items: { type: 'string' },
              description: 'List of departments needing uniforms',
            },
            totalQuantity: {
              type: 'string',
              description: 'Total quantity needed',
            },
            customizationNeeds: {
              type: 'object',
              properties: {
                logo: { type: 'boolean' },
                embroidery: { type: 'boolean' },
                colorMatch: { type: 'boolean' },
              },
              description: 'Customization requirements',
            },
            name: {
              type: 'string',
              description: 'Contact person name',
            },
            title: {
              type: 'string',
              description: 'Job title',
            },
            email: {
              type: 'string',
              description: 'Email address',
            },
            phone: {
              type: 'string',
              description: 'Phone number',
            },
            budgetRange: {
              type: 'string',
              description: 'Budget range (optional)',
            },
            preferredContact: {
              type: 'string',
              enum: ['email', 'phone', 'whatsapp'],
              description: 'Preferred contact method',
            },
            marketingOptIn: {
              type: 'boolean',
              description: 'Opt-in to marketing communications',
            },
          },
          required: [
            'companyName',
            'companyType',
            'facilitySize',
            'hasCurrentSupplier',
            'timeline',
            'departments',
            'totalQuantity',
            'customizationNeeds',
            'name',
            'title',
            'email',
            'phone',
            'preferredContact',
            'marketingOptIn',
          ],
        },
      },
      {
        name: 'get_product_stats',
        description: 'Get statistics about the product catalog',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
    ],
  };
});

/**
 * Handle tool calls
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'get_products': {
        let filteredProducts = products;

        if (args && 'category' in args && args.category) {
          filteredProducts = filteredProducts.filter(
            (p) => p.category === args.category
          );
        }

        if (args && 'department' in args && args.department) {
          filteredProducts = filteredProducts.filter((p) =>
            p.department.toLowerCase().includes((args.department as string).toLowerCase())
          );
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(filteredProducts, null, 2),
            },
          ],
        };
      }

      case 'get_product_by_id': {
        const product = products.find((p) => p.id === (args as any)?.productId);

        if (!product) {
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify({ error: 'Product not found' }),
              },
            ],
            isError: true,
          };
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(product, null, 2),
            },
          ],
        };
      }

      case 'search_products': {
        const query = ((args as any)?.query || '').toLowerCase();
        let searchPool = products;

        if (args && 'category' in args && args.category) {
          searchPool = searchPool.filter((p) => p.category === args.category);
        }

        const results = searchPool.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.department.toLowerCase().includes(query) ||
            p.features.some((f) => f.toLowerCase().includes(query)) ||
            p.fabric.toLowerCase().includes(query)
        );

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(results, null, 2),
            },
          ],
        };
      }

      case 'get_case_studies': {
        let filteredCaseStudies = caseStudies;

        if (args && 'sector' in args && args.sector) {
          filteredCaseStudies = filteredCaseStudies.filter(
            (cs) => cs.sector === args.sector
          );
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(filteredCaseStudies, null, 2),
            },
          ],
        };
      }

      case 'submit_lead': {
        const leadArgs = args as any;
        const result = await createLead({
          companyName: leadArgs.companyName as string,
          companyType: leadArgs.companyType as 'hotel' | 'hospital' | 'other',
          facilitySize: leadArgs.facilitySize as string,
          hasCurrentSupplier: leadArgs.hasCurrentSupplier as boolean,
          currentSupplierName: leadArgs.currentSupplierName as string | undefined,
          timeline: leadArgs.timeline as 'urgent' | 'planned' | 'exploratory',
          departments: leadArgs.departments as string[],
          totalQuantity: leadArgs.totalQuantity as string,
          customizationNeeds: leadArgs.customizationNeeds as { logo: boolean; embroidery: boolean; colorMatch: boolean },
          name: leadArgs.name as string,
          title: leadArgs.title as string,
          email: leadArgs.email as string,
          phone: leadArgs.phone as string,
          budgetRange: leadArgs.budgetRange as string | undefined,
          preferredContact: leadArgs.preferredContact as 'email' | 'phone' | 'whatsapp',
          marketingOptIn: leadArgs.marketingOptIn as boolean,
          source: 'MCP Server',
          submittedAt: new Date().toISOString(),
        });

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'get_product_stats': {
        const stats = {
          total: products.length,
          hotel: hotelProducts.length,
          hospital: hospitalProducts.length,
          inStock: products.filter((p) => p.inStock).length,
          customizable: products.filter((p) => p.customizable).length,
          averagePrice:
            products.reduce((sum, p) => sum + p.pricePerUnit, 0) /
            products.length,
          departments: [...new Set(products.map((p) => p.department))],
          priceRange: {
            min: Math.min(...products.map((p) => p.pricePerUnit)),
            max: Math.max(...products.map((p) => p.pricePerUnit)),
          },
        };

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(stats, null, 2),
            },
          ],
        };
      }

      default:
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({ error: 'Unknown tool' }),
            },
          ],
          isError: true,
        };
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            error: error instanceof Error ? error.message : 'Unknown error',
          }),
        },
      ],
      isError: true,
    };
  }
});

/**
 * List available resources
 */
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: 'royal-fit://products/all',
        name: 'All Products',
        description: 'Complete product catalog',
        mimeType: 'application/json',
      },
      {
        uri: 'royal-fit://products/hotel',
        name: 'Hotel Products',
        description: 'Hotel uniform products',
        mimeType: 'application/json',
      },
      {
        uri: 'royal-fit://products/hospital',
        name: 'Hospital Products',
        description: 'Hospital uniform products',
        mimeType: 'application/json',
      },
      {
        uri: 'royal-fit://case-studies/all',
        name: 'All Case Studies',
        description: 'Complete case study collection',
        mimeType: 'application/json',
      },
      {
        uri: 'royal-fit://case-studies/hotel',
        name: 'Hotel Case Studies',
        description: 'Hotel sector case studies',
        mimeType: 'application/json',
      },
      {
        uri: 'royal-fit://case-studies/hospital',
        name: 'Hospital Case Studies',
        description: 'Hospital sector case studies',
        mimeType: 'application/json',
      },
    ],
  };
});

/**
 * Read resource content
 */
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  try {
    switch (uri) {
      case 'royal-fit://products/all':
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(products, null, 2),
            },
          ],
        };

      case 'royal-fit://products/hotel':
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(hotelProducts, null, 2),
            },
          ],
        };

      case 'royal-fit://products/hospital':
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(hospitalProducts, null, 2),
            },
          ],
        };

      case 'royal-fit://case-studies/all':
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(caseStudies, null, 2),
            },
          ],
        };

      case 'royal-fit://case-studies/hotel':
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(hotelCaseStudies, null, 2),
            },
          ],
        };

      case 'royal-fit://case-studies/hospital':
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(hospitalCaseStudies, null, 2),
            },
          ],
        };

      default:
        throw new Error('Resource not found');
    }
  } catch (error) {
    throw new Error(
      `Failed to read resource: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
});

/**
 * Start the server
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Royal Fit Uniform MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
