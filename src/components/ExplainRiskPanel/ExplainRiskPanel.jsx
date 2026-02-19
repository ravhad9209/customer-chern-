import { explainChurnRisk } from '../../utils/riskExplainability'
import Badge from '../Badge/Badge'

/**
 * Explain Risk Panel - Shows why a customer is at risk.
 * Displays top contributing factors in a business-friendly format.
 * 
 * @param {Object} customer - Customer data object
 */
function ExplainRiskPanel({ customer }) {
  const factors = explainChurnRisk(customer)

  if (factors.length === 0) {
    return (
      <div className="rounded-card border border-border-subtle bg-surface-elevated p-5">
        <h2 className="text-lg font-semibold text-gray-100 mb-2">Why this customer is at risk</h2>
        <p className="text-sm text-gray-400">No significant risk factors identified. Customer shows healthy engagement patterns.</p>
      </div>
    )
  }

  return (
    <div className="rounded-card border border-border-subtle bg-surface-elevated p-5">
      <h2 className="text-lg font-semibold text-gray-100 mb-4">Why this customer is at risk</h2>
      <p className="text-sm text-gray-500 mb-4">
        The following factors contribute to this customer's churn risk:
      </p>
      <div className="space-y-4">
        {factors.map((factor, index) => (
          <div
            key={index}
            className="border-l-2 border-border-subtle pl-4 py-2"
            style={{
              borderLeftColor:
                factor.contribution === 'high'
                  ? '#ea580c'
                  : factor.contribution === 'medium'
                  ? '#ca8a04'
                  : '#16a34a',
            }}
          >
            <div className="flex items-start justify-between gap-3 mb-1">
              <h3 className="font-medium text-gray-200">{factor.factor}</h3>
              <Badge
                variant={factor.contribution === 'high' ? 'high' : factor.contribution === 'medium' ? 'medium' : 'low'}
              >
                {factor.contribution.charAt(0).toUpperCase() + factor.contribution.slice(1)} contribution
              </Badge>
            </div>
            <p className="text-sm text-gray-400">{factor.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExplainRiskPanel
