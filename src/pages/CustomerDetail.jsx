import { useNavigate, useParams } from 'react-router-dom'
import Badge from '../components/Badge/Badge'
import ExplainRiskPanel from '../components/ExplainRiskPanel/ExplainRiskPanel'
import KpiCard from '../components/KpiCard/KpiCard'
import { getCustomerRisk } from '../utils/riskScoring'

// Extended customer data (same as Customers page)
const CUSTOMER_DATABASE = {
  'C-1001': {
    id: 'C-1001',
    name: 'Acme Corp',
    segment: 'Enterprise',
    tenureMonths: 24,
    supportTickets: 1,
    loginFrequency: 20,
    contractValue: 15000,
    npsScore: 75,
    lastActivity: '2024-01-30',
    email: 'contact@acmecorp.com',
    industry: 'Technology',
    location: 'San Francisco, CA',
  },
  'C-1002': {
    id: 'C-1002',
    name: 'TechStart Inc',
    segment: 'Premium',
    tenureMonths: 2,
    supportTickets: 6,
    loginFrequency: 1,
    contractValue: 3000,
    npsScore: 20,
    lastActivity: '2024-01-28',
    email: 'hello@techstart.io',
    industry: 'SaaS',
    location: 'Austin, TX',
  },
  'C-1003': {
    id: 'C-1003',
    name: 'Global Services',
    segment: 'Enterprise',
    tenureMonths: 8,
    supportTickets: 3,
    loginFrequency: 8,
    contractValue: 12000,
    npsScore: 50,
    lastActivity: '2024-01-29',
    email: 'info@globalservices.com',
    industry: 'Consulting',
    location: 'New York, NY',
  },
  'C-1004': {
    id: 'C-1004',
    name: 'Basic User Co',
    segment: 'Basic',
    tenureMonths: 1,
    supportTickets: 8,
    loginFrequency: 0,
    contractValue: 500,
    npsScore: 10,
    lastActivity: '2024-01-25',
    email: 'support@basicuser.co',
    industry: 'Retail',
    location: 'Chicago, IL',
  },
  'C-1005': {
    id: 'C-1005',
    name: 'Premium Labs',
    segment: 'Premium',
    tenureMonths: 18,
    supportTickets: 0,
    loginFrequency: 25,
    contractValue: 8000,
    npsScore: 80,
    lastActivity: '2024-01-31',
    email: 'team@premiumlabs.com',
    industry: 'Healthcare',
    location: 'Boston, MA',
  },
  'C-1006': {
    id: 'C-1006',
    name: 'Standard Ltd',
    segment: 'Basic',
    tenureMonths: 5,
    supportTickets: 4,
    loginFrequency: 3,
    contractValue: 1500,
    npsScore: 35,
    lastActivity: '2024-01-27',
    email: 'contact@standardltd.com',
    industry: 'Manufacturing',
    location: 'Detroit, MI',
  },
}

function CustomerDetail() {
  const { customerId } = useParams()
  const navigate = useNavigate()
  const customer = CUSTOMER_DATABASE[customerId]

  if (!customer) {
    return (
      <div>
        <button
          onClick={() => navigate('/customers')}
          className="mb-4 text-sm text-gray-400 hover:text-gray-200"
        >
          ← Back to Customers
        </button>
        <div className="rounded-card border border-border-subtle bg-surface-elevated p-8 text-center">
          <p className="text-gray-500">Customer not found.</p>
        </div>
      </div>
    )
  }

  const risk = getCustomerRisk(customer)
  const riskVariant = risk.category === 'high' ? 'high' : risk.category === 'medium' ? 'medium' : 'low'

  return (
    <div>
      <button
        onClick={() => navigate('/customers')}
        className="mb-4 text-sm text-gray-400 hover:text-gray-200 transition-colors"
      >
        ← Back to Customers
      </button>

      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-100">{customer.name}</h1>
          <p className="mt-1 text-sm text-gray-500">Customer ID: {customer.id}</p>
        </div>
        <Badge variant={riskVariant} className="text-base px-4 py-1.5">
          {risk.label} ({risk.score}/100)
        </Badge>
      </div>

      <section className="mt-6" aria-label="Risk score overview">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            title="Churn Risk Score"
            value={risk.score}
            tooltipText="Calculated churn risk score on a 0-100 scale. Higher scores indicate higher churn probability."
            comparisonText="/100"
          />
          <KpiCard
            title="Risk Category"
            value={risk.label}
            tooltipText="Risk categorization: Low (0-40), Medium (41-70), High (71-100)."
          />
          <KpiCard
            title="Tenure"
            value={`${customer.tenureMonths} months`}
            tooltipText="Number of months as a customer."
          />
          <KpiCard
            title="Contract Value"
            value={`$${customer.contractValue.toLocaleString()}`}
            tooltipText="Annual contract value in USD."
          />
        </div>
      </section>

      <section className="mt-8" aria-label="Risk explanation">
        <div className="rounded-card border border-border-subtle bg-surface-elevated p-5">
          <h2 className="text-lg font-semibold text-gray-100 mb-2">Risk Assessment</h2>
          <p className="text-sm text-gray-400">{risk.explanation}</p>
        </div>
      </section>

      <section className="mt-8" aria-label="Explain risk factors">
        <ExplainRiskPanel customer={customer} />
      </section>

      <section className="mt-8" aria-label="Customer details">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-card border border-border-subtle bg-surface-elevated p-5">
            <h2 className="text-lg font-semibold text-gray-100 mb-4">Customer Information</h2>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-gray-500">Segment</dt>
                <dd className="text-gray-200 mt-1">{customer.segment}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Email</dt>
                <dd className="text-gray-200 mt-1">{customer.email}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Industry</dt>
                <dd className="text-gray-200 mt-1">{customer.industry}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Location</dt>
                <dd className="text-gray-200 mt-1">{customer.location}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Last Activity</dt>
                <dd className="text-gray-200 mt-1">{customer.lastActivity}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-card border border-border-subtle bg-surface-elevated p-5">
            <h2 className="text-lg font-semibold text-gray-100 mb-4">Risk Factors</h2>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-gray-500">Support Tickets</dt>
                <dd className="text-gray-200 mt-1">{customer.supportTickets}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Login Frequency</dt>
                <dd className="text-gray-200 mt-1">{customer.loginFrequency} logins/month</dd>
              </div>
              <div>
                <dt className="text-gray-500">NPS Score</dt>
                <dd className="text-gray-200 mt-1">{customer.npsScore}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Tenure</dt>
                <dd className="text-gray-200 mt-1">{customer.tenureMonths} months</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CustomerDetail
