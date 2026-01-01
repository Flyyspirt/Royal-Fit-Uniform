'use client'

import { useState, useEffect } from 'react'
import { Building2, Stethoscope, Mail, Phone, Calendar, Filter, RefreshCw, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Lead {
  id: string
  'Lead Name': string
  'Company Name': string
  Email: string
  Phone: string
  'Job Title'?: string
  'Company Type': string
  'Facility Size': string
  Timeline: string
  Departments?: string[]
  'Total Quantity': string
  'Budget Range'?: string
  'Logo Printing'?: boolean
  Embroidery?: boolean
  'Custom Colors'?: boolean
  'Preferred Contact': string
  'Marketing Opt-In'?: boolean
  Status: string
  'Submitted At': string
  Source?: string
  createdTime: string
}

const statusColors: Record<string, string> = {
  'New Lead': 'bg-blue-100 text-blue-800 border-blue-200',
  'Contacted': 'bg-purple-100 text-purple-800 border-purple-200',
  'In Discussion': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Quote Sent': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  'Won': 'bg-green-100 text-green-800 border-green-200',
  'Lost': 'bg-red-100 text-red-800 border-red-200',
  'On Hold': 'bg-gray-100 text-gray-800 border-gray-200',
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [expandedLead, setExpandedLead] = useState<string | null>(null)

  const fetchLeads = async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (statusFilter) params.append('status', statusFilter)

      const response = await fetch(`/api/leads?${params}`)
      const data = await response.json()

      if (data.success) {
        setLeads(data.leads)
      } else {
        setError(data.error || 'Failed to fetch leads')
      }
    } catch (err) {
      setError('Failed to connect to server')
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [statusFilter])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getCompanyIcon = (type: string) => {
    if (type?.toLowerCase() === 'hotel') return Building2
    if (type?.toLowerCase() === 'hospital') return Stethoscope
    return Building2
  }

  const toggleLeadDetails = (id: string) => {
    setExpandedLead(expandedLead === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Lead Management</h1>
          <p className="text-gray-600">Manage and track quote requests from Royal Fit Uniform</p>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm"
              >
                <option value="">All Statuses</option>
                <option value="New Lead">New Lead</option>
                <option value="Contacted">Contacted</option>
                <option value="In Discussion">In Discussion</option>
                <option value="Quote Sent">Quote Sent</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>

            <button
              onClick={fetchLeads}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={cn('w-4 h-4', loading && 'animate-spin')} />
              Refresh
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-primary-600 mb-4" />
            <p className="text-gray-600">Loading leads...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800 font-medium">{error}</p>
            <p className="text-red-600 text-sm mt-2">
              Make sure Airtable is configured in your environment variables
            </p>
          </div>
        )}

        {/* Leads List */}
        {!loading && !error && leads.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-600">No leads found</p>
          </div>
        )}

        {!loading && !error && leads.length > 0 && (
          <div className="space-y-4">
            <div className="text-sm text-gray-600 mb-2">
              Showing {leads.length} lead{leads.length !== 1 ? 's' : ''}
            </div>

            {leads.map((lead) => {
              const CompanyIcon = getCompanyIcon(lead['Company Type'])
              const isExpanded = expandedLead === lead.id

              return (
                <div
                  key={lead.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Lead Header */}
                  <div
                    className="p-6 cursor-pointer"
                    onClick={() => toggleLeadDetails(lead.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                          <CompanyIcon className="w-6 h-6 text-primary-600" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {lead['Lead Name']}
                            </h3>
                            <span
                              className={cn(
                                'px-3 py-1 text-xs font-medium rounded-full border',
                                statusColors[lead.Status] || statusColors['New Lead']
                              )}
                            >
                              {lead.Status}
                            </span>
                          </div>

                          <p className="text-gray-900 font-medium mb-2">
                            {lead['Company Name']}
                          </p>

                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              <a href={`mailto:${lead.Email}`} className="hover:text-primary-600">
                                {lead.Email}
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              <a href={`tel:${lead.Phone}`} className="hover:text-primary-600">
                                {lead.Phone}
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {formatDate(lead['Submitted At'] || lead.createdTime)}
                            </div>
                          </div>
                        </div>
                      </div>

                      <ChevronDown
                        className={cn(
                          'w-5 h-5 text-gray-400 transition-transform',
                          isExpanded && 'rotate-180'
                        )}
                      />
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="border-t border-gray-200 bg-gray-50 p-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Business Info */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Business Information</h4>
                          <dl className="space-y-2 text-sm">
                            {lead['Job Title'] && (
                              <div>
                                <dt className="text-gray-600">Job Title</dt>
                                <dd className="font-medium text-gray-900">{lead['Job Title']}</dd>
                              </div>
                            )}
                            <div>
                              <dt className="text-gray-600">Company Type</dt>
                              <dd className="font-medium text-gray-900">{lead['Company Type']}</dd>
                            </div>
                            <div>
                              <dt className="text-gray-600">Facility Size</dt>
                              <dd className="font-medium text-gray-900">{lead['Facility Size']}</dd>
                            </div>
                            <div>
                              <dt className="text-gray-600">Timeline</dt>
                              <dd className="font-medium text-gray-900">{lead.Timeline}</dd>
                            </div>
                            {lead['Budget Range'] && (
                              <div>
                                <dt className="text-gray-600">Budget Range</dt>
                                <dd className="font-medium text-gray-900">{lead['Budget Range']}</dd>
                              </div>
                            )}
                          </dl>
                        </div>

                        {/* Requirements */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Requirements</h4>
                          <dl className="space-y-2 text-sm">
                            {lead.Departments && lead.Departments.length > 0 && (
                              <div>
                                <dt className="text-gray-600">Departments</dt>
                                <dd className="font-medium text-gray-900">
                                  {lead.Departments.join(', ')}
                                </dd>
                              </div>
                            )}
                            <div>
                              <dt className="text-gray-600">Total Quantity</dt>
                              <dd className="font-medium text-gray-900">{lead['Total Quantity']}</dd>
                            </div>
                            <div>
                              <dt className="text-gray-600">Customizations</dt>
                              <dd className="font-medium text-gray-900">
                                {[
                                  lead['Logo Printing'] && 'Logo Printing',
                                  lead.Embroidery && 'Embroidery',
                                  lead['Custom Colors'] && 'Custom Colors',
                                ]
                                  .filter(Boolean)
                                  .join(', ') || 'None'}
                              </dd>
                            </div>
                            <div>
                              <dt className="text-gray-600">Preferred Contact</dt>
                              <dd className="font-medium text-gray-900">{lead['Preferred Contact']}</dd>
                            </div>
                            {lead['Marketing Opt-In'] !== undefined && (
                              <div>
                                <dt className="text-gray-600">Marketing Opt-In</dt>
                                <dd className="font-medium text-gray-900">
                                  {lead['Marketing Opt-In'] ? 'Yes' : 'No'}
                                </dd>
                              </div>
                            )}
                          </dl>
                        </div>
                      </div>

                      {/* Record ID */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-500">
                          Record ID: {lead.id} • Source: {lead.Source || 'N/A'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
