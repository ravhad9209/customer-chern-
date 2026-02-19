/**
 * Status/priority badge. Use for Critical, High, Medium, Low only.
 * @param {'critical'|'high'|'medium'|'low'} variant
 */
function Badge({ variant = 'medium', children, className = '' }) {
  const styles = {
    critical: 'bg-red-500/15 text-red-400 border-red-500/30',
    high: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    medium: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    low: 'bg-green-500/15 text-green-400 border-green-500/30',
  }
  const base = 'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium'
  return (
    <span className={`${base} ${styles[variant] || styles.medium} ${className}`}>
      {children}
    </span>
  )
}

export default Badge
