import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Analytics from './pages/Analytics'
import CustomerDetail from './pages/CustomerDetail'
import Customers from './pages/Customers'
import Dashboard from './pages/Dashboard'
import ModelInsights from './pages/ModelInsights'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="customers" element={<Customers />} />
        <Route path="customers/:customerId" element={<CustomerDetail />} />
        <Route path="model-insights" element={<ModelInsights />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default App
