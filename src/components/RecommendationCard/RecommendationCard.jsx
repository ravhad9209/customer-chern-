import { useState } from 'react'
import Badge from '../Badge/Badge'

/**
 * Retention recommendation card with confidence, impact, expandable explanation, and action.
 * @param {string} title - Recommendation title.
 * @param {number} confidenceScore - 0–100 AI confidence.
 * @param {'high'|'medium'|'low'} impactLevel - Impact badge.
 * @param {string} whyText - Expandable "Why this action?" content.
 * @param {string} actionLabel - Button label.
 * @param {number} [riskScore] - Churn risk score (0-100) for affected customers.
 * @param {'low'|'medium'|'high'} [riskCategory] - Risk category.
 * @param {boolean} [isCritical] - If true, opens confirmation modal.
 * @param {boolean} [loading] - Button loading state.
 * @param {boolean} [disabled] - Button disabled state.
 * @param {function} [onAction] - Called when action is confirmed/clicked.
 */
function RecommendationCard({
  title,
  confidenceScore,
  impactLevel,
  whyText,
  actionLabel,
  riskScore,
  riskCategory,
  isCritical = false,
  loading = false,
  disabled = false,
  onAction,
}) {
  const [expanded, setExpanded] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleAction = () => {
    if (isCritical) {
      setShowConfirm(true)
      return
    }
    onAction?.()
  }

  const handleConfirm = () => {
    onAction?.()
    setShowConfirm(false)
  }

  return (
    <>
      <div className="rounded-card border border-border-subtle bg-surface-elevated p-5 transition-colors hover:border-border-default">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-gray-100">{title}</h3>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-500">
                AI confidence: <span className="font-medium text-gray-400">{confidenceScore}%</span>
              </span>
              <Badge variant={impactLevel === 'high' ? 'high' : impactLevel === 'medium' ? 'medium' : 'low'}>
                {impactLevel.charAt(0).toUpperCase() + impactLevel.slice(1)} impact
              </Badge>
              {riskScore !== undefined && riskCategory && (
                <Badge variant={riskCategory === 'high' ? 'high' : riskCategory === 'medium' ? 'medium' : 'low'}>
                  Risk: {riskScore}/100
                </Badge>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={handleAction}
            disabled={disabled || loading}
            className="rounded-card border border-primary bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                Processing…
              </span>
            ) : (
              actionLabel
            )}
          </button>
        </div>

        <div className="mt-4 border-t border-border-subtle pt-4">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex w-full items-center justify-between text-left text-sm font-medium text-gray-400 hover:text-gray-300"
          >
            Why this action?
            <svg
              className={`h-4 w-4 shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expanded && (
            <p className="mt-2 text-sm text-gray-500">{whyText}</p>
          )}
        </div>
      </div>

      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-title"
        >
          <div className="w-full max-w-md rounded-card border border-border-subtle bg-surface-elevated p-6 shadow-xl">
            <h2 id="confirm-title" className="text-lg font-semibold text-gray-100">
              Confirm action
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              This action may have significant impact. Are you sure you want to continue?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="rounded-card border border-border-default px-4 py-2 text-sm font-medium text-gray-300 hover:bg-surface"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="rounded-card bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RecommendationCard
