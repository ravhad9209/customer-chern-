import { Outlet } from 'react-router-dom'
import FilterBar from './FilterBar'
import Sidebar from './Sidebar'

function Layout() {
  return (
    <div className="flex h-screen bg-surface">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <FilterBar />
        <main className="main-content flex-1 overflow-auto">
          <div className="mx-auto max-w-7xl px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
