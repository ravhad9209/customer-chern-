import { useState } from 'react'

/**
 * Reusable KPI card with tooltip, trend indicator, and comparison text.
 * @param {string} title - Label shown at the top.
 * @param {string|number} value - Main metric value.
 * @param {string} [delta] - Change indicator (e.g. "+2.4%" or "-1.1%").
 * @param {string} [tooltipText] - Explanation shown on title hover/focus.
 * @param {string} [comparisonText] - e.g. "vs last 30 days".
 */
function KpiCard({ title, value, delta, tooltipText, comparisonText }) {
  const [showTooltip, setShowTooltip] = useState(false)
  const showDelta = delta != null && String(delta).trim() !== ''
  const deltaStr = showDelta ? String(delta).trim() : ''
  const isPositive = showDelta && (deltaStr.startsWith('+') || (deltaStr[0] !== '-' && parseFloat(deltaStr) >= 0))
  const isNegative = showDelta && (deltaStr.startsWith('-') || parseFloat(deltaStr) < 0)

  return (
    <div className="flex h-full flex-col rounded-card border border-border-subtle bg-surface-elevated p-5 transition-colors hover:border-border-default hover:bg-surface-elevated/90">
      <div className="flex items-center gap-1.5">
        <p className="text-sm font-medium text-gray-400">{title}</p>
        {tooltipText && (
          <div className="relative">
            <button
              type="button"
              aria-label="Metric explanation"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onFocus={() => setShowTooltip(true)}
              onBlur={() => setShowTooltip(false)}
              className="rounded p-0.5 text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </button>
            {showTooltip && (
              <div
                className="absolute left-0 top-full z-10 mt-1 max-w-[220px] rounded-card border border-border-subtle bg-surface-muted px-3 py-2 text-xs text-gray-300 shadow-lg"
                role="tooltip"
              >
                {tooltipText}
              </div>
            )}
          </div>
        )}
      </div>
      <p className="mt-2 flex flex-1 items-center text-2xl font-semibold text-gray-100">
        {value}
      </p>
      {showDelta && (
        <div className="mt-1 flex items-center gap-1.5 text-sm font-medium">
          {isPositive && (
            <span className="text-green-400" aria-hidden>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
            </span>
          )}
          {isNegative && (
            <span className="text-red-400" aria-hidden>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </span>
          )}
          <span className={isPositive ? 'text-green-400' : isNegative ? 'text-red-400' : 'text-gray-500'}>
            {deltaStr}
          </span>
          {comparisonText && (
            <span className="text-gray-500"> {comparisonText}</span>
          )}
        </div>
      )}
      {!showDelta && comparisonText && (
        <p className="mt-1 text-sm text-gray-500">{comparisonText}</p>
      )}
    </div>
  )
}

export default KpiCard
