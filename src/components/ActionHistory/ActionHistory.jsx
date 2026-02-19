import Badge from '../Badge/Badge'

const PLACEHOLDER_HISTORY = [
  { id: 1, action: 'Offer discount to at-risk segment', timestamp: '2024-01-30 14:32', status: 'completed', outcome: 'Accepted' },
  { id: 2, action: 'Send re-engagement email batch', timestamp: '2024-01-30 11:15', status: 'pending', outcome: '—' },
  { id: 3, action: 'Flag for CS outreach', timestamp: '2024-01-29 16:00', status: 'completed', outcome: 'Contacted' },
]

const statusVariant = (status) => {
  if (status === 'completed') return 'low'
  if (status === 'failed') return 'critical'
  if (status === 'pending') return 'medium'
  return 'medium'
}

function ActionHistory({ items = PLACEHOLDER_HISTORY }) {
  return (
    <section aria-label="Action history">
      <h2 className="text-lg font-semibold text-gray-100">Action history</h2>
      <p className="mt-1 text-sm text-gray-500">Recent retention actions and outcomes.</p>
      <div className="mt-4 overflow-hidden rounded-card border border-border-subtle bg-surface-elevated">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] text-left text-sm">
            <thead>
              <tr className="border-b border-border-subtle">
                <th className="px-4 py-3 font-medium text-gray-400">Action</th>
                <th className="px-4 py-3 font-medium text-gray-400">Timestamp</th>
                <th className="px-4 py-3 font-medium text-gray-400">Status</th>
                <th className="px-4 py-3 font-medium text-gray-400">Outcome</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row) => (
                <tr key={row.id} className="border-t border-border-subtle transition-colors hover:bg-surface-muted/50">
                  <td className="px-4 py-3 text-gray-200">{row.action}</td>
                  <td className="px-4 py-3 text-gray-500">{row.timestamp}</td>
                  <td className="px-4 py-3">
                    <Badge variant={statusVariant(row.status)}>
                      {row.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-gray-400">{row.outcome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default ActionHistory
