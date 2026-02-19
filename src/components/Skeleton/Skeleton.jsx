/**
 * Skeleton loader. Use for cards, text lines, etc.
 */
function Skeleton({ className = '' }) {
  return (
    <div
      className={`animate-pulse rounded-card bg-border-subtle ${className}`}
      aria-hidden
    />
  )
}

export function SkeletonCard() {
  return (
    <div className="rounded-card border border-border-subtle bg-surface-elevated p-5">
      <Skeleton className="mb-3 h-4 w-2/3" />
      <Skeleton className="mb-4 h-8 w-1/2" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="mt-2 h-3 w-3/4" />
    </div>
  )
}

export function SkeletonTableRow() {
  return (
    <tr>
      <td className="border-t border-border-subtle px-4 py-3"><Skeleton className="h-4 w-32" /></td>
      <td className="border-t border-border-subtle px-4 py-3"><Skeleton className="h-4 w-24" /></td>
      <td className="border-t border-border-subtle px-4 py-3"><Skeleton className="h-4 w-20" /></td>
      <td className="border-t border-border-subtle px-4 py-3"><Skeleton className="h-4 w-28" /></td>
    </tr>
  )
}

export default Skeleton
