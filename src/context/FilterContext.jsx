import { createContext, useContext, useState } from 'react'

const FilterContext = createContext(null)

export function FilterProvider({ children }) {
  const [dateRange, setDateRange] = useState('last_30_days')
  const [segment, setSegment] = useState('all')
  const [riskLevel, setRiskLevel] = useState('all')

  const value = {
    dateRange,
    setDateRange,
    segment,
    setSegment,
    riskLevel,
    setRiskLevel,
  }

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  )
}

export function useFilters() {
  const ctx = useContext(FilterContext)
  if (!ctx) throw new Error('useFilters must be used within FilterProvider')
  return ctx
}
