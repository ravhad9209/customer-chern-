import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Badge from '../components/Badge/Badge'
import { CustomerCountBySegmentChart, RiskDistributionDoughnutChart } from '../components/Charts/Charts'
import ExplainRiskPanel from '../components/ExplainRiskPanel/ExplainRiskPanel'
import { getCustomerRisk } from '../utils/riskScoring'

// Extended customer data with attributes for risk scoring
const PLACEHOLDER_CUSTOMERS = [
  {
    id: 'C-1001',
    name: 'Acme Corp',
    segment: 'Enterprise',
    tenureMonths: 24,
    supportTickets: 1,
    loginFrequency: 20,
    contractValue: 15000,
    npsScore: 75,
    lastActivity: '2024-01-30',
  },
  {
    id: 'C-1002',
    name: 'TechStart Inc',
    segment: 'Premium',
    tenureMonths: 2,
    supportTickets: 6,
    loginFrequency: 1,
    contractValue: 3000,
    npsScore: 20,
    lastActivity: '2024-01-28',
  },
  {
    id: 'C-1003',
    name: 'Global Services',
    segment: 'Enterprise',
    tenureMonths: 8,
    supportTickets: 3,
    loginFrequency: 8,
    contractValue: 12000,
    npsScore: 50,
    lastActivity: '2024-01-29',
  },
  {
    id: 'C-1004',
    name: 'Basic User Co',
    segment: 'Basic',
    tenureMonths: 1,
    supportTickets: 8,
    loginFrequency: 0,
    contractValue: 500,
    npsScore: 10,
    lastActivity: '2024-01-25',
  },
  {
    id: 'C-1005',
    name: 'Premium Labs',
    segment: 'Premium',
    tenureMonths: 18,
    supportTickets: 0,
    loginFrequency: 25,
    contractValue: 8000,
    npsScore: 80,
    lastActivity: '2024-01-31',
  },
  {
    id: 'C-1006',
    name: 'Standard Ltd',
    segment: 'Basic',
    tenureMonths: 5,
    supportTickets: 4,
    loginFrequency: 3,
    contractValue: 1500,
    npsScore: 35,
    lastActivity: '2024-01-27',
  },
]

// Calculate risk for all customers
const customersWithRisk = PLACEHOLDER_CUSTOMERS.map((customer) => {
  const risk = getCustomerRisk(customer)
  return {
    ...customer,
    riskScore: risk.score,
    riskCategory: risk.category,
    riskLabel: risk.label,
  }
})

const riskVariant = (category) => (category === 'high' ? 'high' : category === 'medium' ? 'medium' : 'low')

function Customers() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [segmentFilter, setSegmentFilter] = useState('all')
  const [riskFilter, setRiskFilter] = useState('all')
  const [expandedCustomerId, setExpandedCustomerId] = useState(null)

  const filtered = customersWithRisk.filter((c) => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase())
    const matchSegment = segmentFilter === 'all' || c.segment.toLowerCase() === segmentFilter
    const matchRisk = riskFilter === 'all' || c.riskCategory.toLowerCase() === riskFilter
    return matchSearch && matchSegment && matchRisk
  })

  const handleCustomerClick = (customerId) => {
    navigate(`/customers/${customerId}`)
  }

  const handleExplainClick = (e, customerId) => {
    e.stopPropagation()
    setExpandedCustomerId(expandedCustomerId === customerId ? null : customerId)
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-100">Customers</h1>
      <p className="mt-2 text-sm text-gray-500">
        Customer list and segmentation. Search and filter below. Click a row to view details.
      </p>

      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-card border border-border-subtle bg-surface-elevated p-5 transition-colors hover:border-border-default">
          <CustomerCountBySegmentChart />
        </div>
        <div className="rounded-card border border-border-subtle bg-surface-elevated p-5 transition-colors hover:border-border-default">
          <RiskDistributionDoughnutChart />
        </div>
      </section>

      <section className="mt-8" aria-label="Customer list">
        <div className="flex flex-wrap items-center gap-4">
          <input
            type="search"
            placeholder="Search by name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-card border border-border-subtle bg-surface-elevated px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <select
            value={segmentFilter}
            onChange={(e) => setSegmentFilter(e.target.value)}
            className="rounded-card border border-border-subtle bg-surface-elevated px-3 py-2 text-sm text-gray-200 focus:border-primary focus:outline-none"
          >
            <option value="all">All segments</option>
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
            <option value="enterprise">Enterprise</option>
          </select>
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="rounded-card border border-border-subtle bg-surface-elevated px-3 py-2 text-sm text-gray-200 focus:border-primary focus:outline-none"
          >
            <option value="all">All risk levels</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="mt-4 overflow-hidden rounded-card border border-border-subtle bg-surface-elevated">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="px-4 py-3 font-medium text-gray-400">ID</th>
                  <th className="px-4 py-3 font-medium text-gray-400">Name</th>
                  <th className="px-4 py-3 font-medium text-gray-400">Segment</th>
                  <th className="px-4 py-3 font-medium text-gray-400">Risk</th>
                  <th className="px-4 py-3 font-medium text-gray-400">Risk Score</th>
                  <th className="px-4 py-3 font-medium text-gray-400">Last activity</th>
                  <th className="px-4 py-3 font-medium text-gray-400 w-24">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      No customers match your filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((c) => {
                    const isExpanded = expandedCustomerId === c.id
                    const customerData = PLACEHOLDER_CUSTOMERS.find((cust) => cust.id === c.id)
                    return (
                      <>
                        <tr
                          key={c.id}
                          onClick={() => handleCustomerClick(c.id)}
                          className="border-t border-border-subtle transition-colors hover:bg-surface-muted/50 cursor-pointer"
                        >
                          <td className="px-4 py-3 font-mono text-gray-400">{c.id}</td>
                          <td className="px-4 py-3 text-gray-200">{c.name}</td>
                          <td className="px-4 py-3 text-gray-400">{c.segment}</td>
                          <td className="px-4 py-3">
                            <Badge variant={riskVariant(c.riskCategory)}>{c.riskLabel}</Badge>
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-medium text-gray-200">{c.riskScore}</span>
                            <span className="text-gray-500 text-xs ml-1">/100</span>
                          </td>
                          <td className="px-4 py-3 text-gray-500">{c.lastActivity}</td>
                          <td className="px-4 py-3" onClick={(e) => handleExplainClick(e, c.id)}>
                            <button
                              type="button"
                              className="text-xs text-primary hover:text-primary-hover transition-colors"
                              onClick={(e) => handleExplainClick(e, c.id)}
                            >
                              {isExpanded ? 'Hide' : 'Explain'} Risk
                            </button>
                          </td>
                        </tr>
                        {isExpanded && customerData && (
                          <tr key={`${c.id}-explain`}>
                            <td colSpan={7} className="px-4 py-4 bg-surface-muted/30">
                              <ExplainRiskPanel customer={customerData} />
                            </td>
                          </tr>
                        )}
                      </>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Customers
