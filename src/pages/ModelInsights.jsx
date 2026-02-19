import {
    FeatureImportanceBarChart,
    ScoreDistributionChart,
} from '../components/Charts/Charts'
import KpiCard from '../components/KpiCard/KpiCard'

function ModelInsights() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-100">Model Insights</h1>
      <p className="mt-2 text-sm text-gray-500">
        Churn prediction model performance and feature importance.
      </p>

      <section className="mt-8" aria-label="Model metrics">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            title="Accuracy"
            value="87.2%"
            tooltipText="Overall proportion of correct predictions (churn vs retained)."
          />
          <KpiCard
            title="Precision"
            value="82.1%"
            tooltipText="Of predicted churners, proportion that actually churned."
          />
          <KpiCard
            title="Recall"
            value="76.4%"
            tooltipText="Of actual churners, proportion correctly identified by the model."
          />
          <KpiCard
            title="AUC-ROC"
            value="0.89"
            tooltipText="Area under ROC curve; higher indicates better class separation."
          />
        </div>
      </section>

      <section className="mt-8" aria-label="Feature importance and score distribution">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-card border border-border-subtle bg-surface-elevated p-5 transition-colors hover:border-border-default">
            <FeatureImportanceBarChart />
          </div>
          <div className="rounded-card border border-border-subtle bg-surface-elevated p-5 transition-colors hover:border-border-default">
            <ScoreDistributionChart />
          </div>
        </div>
      </section>
    </div>
  )
}

export default ModelInsights
