/**
 * Empty state when no recommendations or data.
 */
function EmptyState({ title = 'No recommendations', description }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-card border border-border-subtle border-dashed bg-surface-elevated/50 py-12 px-6 text-center">
      <svg
        className="h-12 w-12 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      <h3 className="mt-4 text-sm font-medium text-gray-300">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}
    </div>
  )
}

export default EmptyState
