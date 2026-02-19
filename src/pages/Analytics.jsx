import {
    AtRiskTrendLineChart,
    ChurnBySegmentBarChart,
    ChurnRateLineChart,
    ChurnVsRetainedStackedBarChart,
    RetentionTrendLineChart,
    RiskDistributionDoughnutChart,
} from '../components/Charts/Charts'

function Analytics() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-100">Analytics</h1>
      <p className="mt-2 text-sm text-gray-500">
        Churn and retention trends, segments, and risk distribution.
      </p>

      <section className="mt-8" aria-label="Analytics charts">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-card border border-border-subtle bg-surface-elevated p-5 transition-colors hover:border-border-default">
            <ChurnRateLineChart />
          </div>
          <div className="rounded-card border border-border-subtle bg-surface-elevated p-5 transition-colors hover:border-border-default">
            <RetentionTrendLineChart />
          </div>
          <div className="rounded-card border border-border-subtle bg-surface-elevated p-5 transition-colors hover:border-border-default">
            <ChurnBySegmentBarChart />
          </div>
          <div className="rounded-card border border-border-subtle bg-surface-elevated p-5 transition-colors hover:border-border-default">
            <AtRiskTrendLineChart />
          </div>
          <div className="rounded-card border border-border-subtle bg-surface-elevated p-5 transition-colors hover:border-border-default lg:col-span-2">
            <ChurnVsRetainedStackedBarChart />
          </div>
          <div className="rounded-card border border-border-subtle bg-surface-elevated p-5 transition-colors hover:border-border-default lg:col-span-2">
            <div className="mx-auto max-w-md">
              <RiskDistributionDoughnutChart />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Analytics
