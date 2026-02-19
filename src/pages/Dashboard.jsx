import { useState } from 'react'
import ActionHistory from '../components/ActionHistory/ActionHistory'
import { ChurnRateLineChart, RiskDistributionDoughnutChart } from '../components/Charts/Charts'
import EmptyState from '../components/EmptyState/EmptyState'
import KpiCard from '../components/KpiCard/KpiCard'
import RecommendationCard from '../components/RecommendationCard/RecommendationCard'
import { SkeletonCard } from '../components/Skeleton/Skeleton'
import { useFilters } from '../context/FilterContext'

const PLACEHOLDER_RECOMMENDATIONS = [
  {
    id: '1',
    title: 'Offer targeted discount to at-risk Premium segment',
    confidenceScore: 87,
    impactLevel: 'high',
    riskScore: 78,
    riskCategory: 'high',
    whyText: 'Model shows elevated churn probability for this segment in the selected period. Average risk score: 78/100. A small discount has historically improved retention by ~12% in similar cohorts.',
    actionLabel: 'Apply discount',
    isCritical: true,
  },
  {
    id: '2',
    title: 'Send re-engagement email to inactive users',
    confidenceScore: 72,
    impactLevel: 'medium',
    riskScore: 65,
    riskCategory: 'medium',
    whyText: 'Engagement scores have dropped below threshold. Average risk score: 65/100. Automated re-engagement flows have shown positive response rates in past campaigns.',
    actionLabel: 'Send campaign',
    isCritical: false,
  },
  {
    id: '3',
    title: 'Flag for customer success outreach',
    confidenceScore: 91,
    impactLevel: 'high',
    riskScore: 82,
    riskCategory: 'high',
    whyText: 'High-value accounts with rising risk score. Average risk score: 82/100. Manual outreach is recommended before automated actions.',
    actionLabel: 'Assign to CS',
    isCritical: false,
  },
]

function Dashboard() {
  const { dateRange, segment, riskLevel } = useFilters()
  const [recommendationsLoading] = useState(false)
  const [showEmptyRecommendations] = useState(false)
  const [actionLoadingId, setActionLoadingId] = useState(null)

  const handleRecommendationAction = (id) => {
    setActionLoadingId(id)
    setTimeout(() => setActionLoadingId(null), 1500)
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-100">Dashboard</h1>
      <p className="mt-2 text-sm text-gray-500">
        Overview and key metrics. Filters: {dateRange.replace(/_/g, ' ')}, {segment}, {riskLevel}.
      </p>

      <section className="mt-8" aria-label="Key performance indicators">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            title="Churn Rate"
            value="4.2%"
            delta="+0.2%"
            tooltipText="Percentage of customers who churned in the selected period."
            comparisonText="vs last 30 days"
          />
          <KpiCard
            title="Total Customers"
            value="12,847"
            delta="-1.1%"
            tooltipText="Total active customers in the selected segment and period."
            comparisonText="vs last 30 days"
          />
          <KpiCard
            title="At-Risk Customers"
            value="384"
            tooltipText="Customers with elevated churn probability (model score above threshold)."
            comparisonText="vs last 30 days"
          />
          <KpiCard
            title="Retention Rate"
            value="95.8%"
            delta="+2.4%"
            tooltipText="Percentage of customers retained over the selected period."
            comparisonText="vs last 30 days"
          />
        </div>
      </section>

      <section className="mt-8" aria-label="Overview charts">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-card border border-border-subtle bg-surface-elevated p-5 transition-colors hover:border-border-default">
            <ChurnRateLineChart />
          </div>
          <div className="rounded-card border border-border-subtle bg-surface-elevated p-5 transition-colors hover:border-border-default">
            <div className="mx-auto max-w-sm">
              <RiskDistributionDoughnutChart />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10" aria-label="Retention recommendations">
        <h2 className="text-lg font-semibold text-gray-100">Retention recommendations</h2>
        <p className="mt-1 text-sm text-gray-500">
          AI-suggested actions based on current filters.
        </p>

        {recommendationsLoading ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : showEmptyRecommendations ? (
          <div className="mt-4">
            <EmptyState
              title="No recommendations"
              description="No retention actions suggested for the current filters. Try adjusting date range or segment."
            />
          </div>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
            {PLACEHOLDER_RECOMMENDATIONS.map((rec) => (
              <RecommendationCard
                key={rec.id}
                title={rec.title}
                confidenceScore={rec.confidenceScore}
                impactLevel={rec.impactLevel}
                riskScore={rec.riskScore}
                riskCategory={rec.riskCategory}
                whyText={rec.whyText}
                actionLabel={rec.actionLabel}
                isCritical={rec.isCritical}
                loading={actionLoadingId === rec.id}
                onAction={() => handleRecommendationAction(rec.id)}
              />
            ))}
          </div>
        )}
      </section>

      <section className="mt-10">
        <ActionHistory />
      </section>
    </div>
  )
}

export default Dashboard
