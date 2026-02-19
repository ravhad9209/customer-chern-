import { useFilters } from '../../context/FilterContext'

const DATE_OPTIONS = [
  { value: 'last_7_days', label: 'Last 7 days' },
  { value: 'last_30_days', label: 'Last 30 days' },
  { value: 'last_90_days', label: 'Last 90 days' },
]

const SEGMENT_OPTIONS = [
  { value: 'all', label: 'All segments' },
  { value: 'basic', label: 'Basic' },
  { value: 'premium', label: 'Premium' },
  { value: 'enterprise', label: 'Enterprise' },
]

const RISK_OPTIONS = [
  { value: 'all', label: 'All risk levels' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
]

const selectClass =
  'rounded-card border border-border-subtle bg-surface-elevated px-3 py-2 text-sm text-gray-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary hover:border-border-default transition-colors'

function FilterBar() {
  const { dateRange, setDateRange, segment, setSegment, riskLevel, setRiskLevel } = useFilters()

  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-4 border-b border-border-subtle bg-surface/95 px-6 py-3 backdrop-blur-sm">
      <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
        Filters
      </span>
      <select
        aria-label="Date range"
        value={dateRange}
        onChange={(e) => setDateRange(e.target.value)}
        className={selectClass}
      >
        {DATE_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <select
        aria-label="Segment"
        value={segment}
        onChange={(e) => setSegment(e.target.value)}
        className={selectClass}
      >
        {SEGMENT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <select
        aria-label="Risk level"
        value={riskLevel}
        onChange={(e) => setRiskLevel(e.target.value)}
        className={selectClass}
      >
        {RISK_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FilterBar
