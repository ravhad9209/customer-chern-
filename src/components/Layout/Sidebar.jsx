import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/customers', label: 'Customers' },
  { to: '/model-insights', label: 'Model Insights' },
]

function Sidebar() {
  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-border-subtle bg-surface-muted">
      <div className="border-b border-border-subtle px-6 py-5">
        <h1 className="text-lg font-semibold text-gray-100">
          Churn Analytics
        </h1>
      </div>
      <nav className="flex-1 space-y-0.5 px-3 py-4" aria-label="Main navigation">
        {navItems.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `block rounded-card px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-muted text-primary'
                  : 'text-gray-400 hover:bg-surface hover:text-gray-200'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
