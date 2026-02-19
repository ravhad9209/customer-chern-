/**
 * Centralized Churn Risk Scoring System
 * 
 * Provides rule-based risk scoring (0-100 scale) that can be replaced
 * with ML model predictions in the future.
 * 
 * Risk Categories:
 * - Low Risk: 0-40
 * - Medium Risk: 41-70
 * - High Risk: 71-100
 */

/**
 * Calculate churn risk score based on customer attributes.
 * This is a placeholder rule-based implementation that can be replaced with ML model.
 * 
 * @param {Object} customer - Customer data object
 * @param {string} customer.segment - Customer segment (Basic, Premium, Enterprise)
 * @param {number} customer.tenureMonths - Months as customer (optional)
 * @param {number} customer.supportTickets - Number of support tickets (optional)
 * @param {number} customer.loginFrequency - Logins per month (optional)
 * @param {number} customer.contractValue - Contract value in USD (optional)
 * @param {number} customer.npsScore - Net Promoter Score (optional)
 * @param {string} customer.lastActivity - Last activity date (optional)
 * @returns {number} Risk score 0-100
 */
export function calculateChurnRiskScore(customer) {
  let score = 50 // Base score

  // Segment-based adjustments
  const segmentWeights = {
    Basic: 15,
    Premium: 5,
    Enterprise: -10,
  }
  score += segmentWeights[customer.segment] || 0

  // Tenure: longer tenure = lower risk
  if (customer.tenureMonths) {
    if (customer.tenureMonths < 3) score += 20
    else if (customer.tenureMonths < 6) score += 10
    else if (customer.tenureMonths < 12) score += 5
    else if (customer.tenureMonths >= 24) score -= 15
  }

  // Support tickets: more tickets = higher risk
  if (customer.supportTickets !== undefined) {
    if (customer.supportTickets > 5) score += 15
    else if (customer.supportTickets > 2) score += 8
    else if (customer.supportTickets === 0) score -= 5
  }

  // Login frequency: lower frequency = higher risk
  if (customer.loginFrequency !== undefined) {
    if (customer.loginFrequency < 2) score += 20
    else if (customer.loginFrequency < 5) score += 10
    else if (customer.loginFrequency >= 15) score -= 10
  }

  // Contract value: higher value = lower risk (more invested)
  if (customer.contractValue !== undefined) {
    if (customer.contractValue > 10000) score -= 15
    else if (customer.contractValue > 5000) score -= 8
    else if (customer.contractValue < 1000) score += 10
  }

  // NPS score: lower NPS = higher risk
  if (customer.npsScore !== undefined) {
    if (customer.npsScore < 0) score += 15
    else if (customer.npsScore < 30) score += 8
    else if (customer.npsScore >= 70) score -= 10
  }

  // Last activity: older activity = higher risk
  if (customer.lastActivity) {
    const daysSinceActivity = getDaysSince(customer.lastActivity)
    if (daysSinceActivity > 30) score += 20
    else if (daysSinceActivity > 14) score += 10
    else if (daysSinceActivity < 3) score -= 5
  }

  // Clamp to 0-100 range
  return Math.max(0, Math.min(100, Math.round(score)))
}

/**
 * Categorize risk score into Low, Medium, or High.
 * 
 * @param {number} score - Risk score (0-100)
 * @returns {'low'|'medium'|'high'} Risk category
 */
export function categorizeRisk(score) {
  if (score <= 40) return 'low'
  if (score <= 70) return 'medium'
  return 'high'
}

/**
 * Get risk category label.
 * 
 * @param {'low'|'medium'|'high'} category - Risk category
 * @returns {string} Human-readable label
 */
export function getRiskLabel(category) {
  const labels = {
    low: 'Low Risk',
    medium: 'Medium Risk',
    high: 'High Risk',
  }
  return labels[category] || 'Unknown'
}

/**
 * Get risk score explanation text.
 * 
 * @param {number} score - Risk score (0-100)
 * @param {'low'|'medium'|'high'} category - Risk category
 * @returns {string} Explanation text
 */
export function getRiskExplanation(score, category) {
  if (category === 'low') {
    return `Low churn risk (score: ${score}/100). Customer shows strong engagement and retention signals.`
  }
  if (category === 'medium') {
    return `Moderate churn risk (score: ${score}/100). Monitor customer engagement and consider proactive outreach.`
  }
  return `High churn risk (score: ${score}/100). Immediate action recommended to prevent churn.`
}

/**
 * Calculate risk score and category for a customer.
 * Convenience function that combines calculation and categorization.
 * 
 * @param {Object} customer - Customer data object
 * @returns {Object} { score: number, category: 'low'|'medium'|'high', label: string, explanation: string }
 */
export function getCustomerRisk(customer) {
  const score = calculateChurnRiskScore(customer)
  const category = categorizeRisk(score)
  return {
    score,
    category,
    label: getRiskLabel(category),
    explanation: getRiskExplanation(score, category),
  }
}

/**
 * Helper: Calculate days since a date string.
 * 
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {number} Days since date
 */
function getDaysSince(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}
