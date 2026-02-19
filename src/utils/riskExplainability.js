/**
 * Risk Explainability System
 * 
 * Provides business-friendly explanations for why customers are at risk.
 * Analyzes customer data and returns contributing factors with clear explanations.
 */

/**
 * Analyze customer data and return contributing factors to churn risk.
 * 
 * @param {Object} customer - Customer data object
 * @returns {Array<Object>} Array of contributing factors with:
 *   - factor: string (factor name)
 *   - contribution: 'high'|'medium'|'low'
 *   - explanation: string (business-friendly explanation)
 */
export function explainChurnRisk(customer) {
  const factors = []

  // Factor 1: Low Engagement
  const engagementScore = assessEngagement(customer)
  if (engagementScore.contribution !== 'low') {
    factors.push({
      factor: 'Low Engagement',
      contribution: engagementScore.contribution,
      explanation: engagementScore.explanation,
    })
  }

  // Factor 2: High Support Tickets
  const supportScore = assessSupportTickets(customer)
  if (supportScore.contribution !== 'low') {
    factors.push({
      factor: 'High Support Tickets',
      contribution: supportScore.contribution,
      explanation: supportScore.explanation,
    })
  }

  // Factor 3: Recent Downgrade
  const downgradeScore = assessDowngrade(customer)
  if (downgradeScore.contribution !== 'low') {
    factors.push({
      factor: 'Recent Downgrade',
      contribution: downgradeScore.contribution,
      explanation: downgradeScore.explanation,
    })
  }

  // Factor 4: Price Sensitivity
  const priceScore = assessPriceSensitivity(customer)
  if (priceScore.contribution !== 'low') {
    factors.push({
      factor: 'Price Sensitivity',
      contribution: priceScore.contribution,
      explanation: priceScore.explanation,
    })
  }

  // Factor 5: Low Satisfaction
  const satisfactionScore = assessSatisfaction(customer)
  if (satisfactionScore.contribution !== 'low') {
    factors.push({
      factor: 'Low Satisfaction',
      contribution: satisfactionScore.contribution,
      explanation: satisfactionScore.explanation,
    })
  }

  // Factor 6: Short Tenure
  const tenureScore = assessTenure(customer)
  if (tenureScore.contribution !== 'low') {
    factors.push({
      factor: 'Short Customer Relationship',
      contribution: tenureScore.contribution,
      explanation: tenureScore.explanation,
    })
  }

  // Sort by contribution level (high first, then medium, then low)
  const contributionOrder = { high: 3, medium: 2, low: 1 }
  factors.sort((a, b) => contributionOrder[b.contribution] - contributionOrder[a.contribution])

  return factors
}

/**
 * Assess engagement level based on login frequency and last activity.
 */
function assessEngagement(customer) {
  const loginFreq = customer.loginFrequency || 0
  const daysSinceActivity = getDaysSince(customer.lastActivity)

  if (loginFreq < 2 || daysSinceActivity > 30) {
    return {
      contribution: 'high',
      explanation: `Customer has very low activity (${loginFreq} logins/month) and hasn't been active in ${daysSinceActivity} days. Low engagement often indicates waning interest.`,
    }
  }
  if (loginFreq < 5 || daysSinceActivity > 14) {
    return {
      contribution: 'medium',
      explanation: `Customer shows moderate activity (${loginFreq} logins/month) with ${daysSinceActivity} days since last activity. Engagement levels are below average.`,
    }
  }
  return { contribution: 'low', explanation: '' }
}

/**
 * Assess support ticket volume.
 */
function assessSupportTickets(customer) {
  const tickets = customer.supportTickets || 0

  if (tickets > 5) {
    return {
      contribution: 'high',
      explanation: `Customer has opened ${tickets} support tickets recently. High support volume can indicate frustration or product issues.`,
    }
  }
  if (tickets > 2) {
    return {
      contribution: 'medium',
      explanation: `Customer has opened ${tickets} support tickets. Moderate support needs may signal concerns.`,
    }
  }
  return { contribution: 'low', explanation: '' }
}

/**
 * Assess if customer recently downgraded (placeholder logic).
 */
function assessDowngrade(customer) {
  // Placeholder: Check if customer is in Basic segment but was previously higher
  // For now, we'll use a simple heuristic based on segment and contract value
  const hasDowngradeSignal = customer.segment === 'Basic' && customer.contractValue < 2000 && customer.tenureMonths > 6

  if (hasDowngradeSignal) {
    return {
      contribution: 'high',
      explanation: 'Customer appears to have downgraded from a higher tier. Recent downgrades often precede churn.',
    }
  }
  // Check for potential downgrade signals
  if (customer.segment === 'Basic' && customer.tenureMonths > 3) {
    return {
      contribution: 'medium',
      explanation: 'Customer is on a basic plan. Consider upselling or checking if they need more features.',
    }
  }
  return { contribution: 'low', explanation: '' }
}

/**
 * Assess price sensitivity based on contract value and segment.
 */
function assessPriceSensitivity(customer) {
  const contractValue = customer.contractValue || 0
  const segment = customer.segment

  if (segment === 'Basic' && contractValue < 1000) {
    return {
      contribution: 'high',
      explanation: `Customer is on a low-value plan ($${contractValue.toLocaleString()}/year). Price-sensitive customers may churn if they find cheaper alternatives.`,
    }
  }
  if (contractValue < 3000) {
    return {
      contribution: 'medium',
      explanation: `Customer has a lower contract value ($${contractValue.toLocaleString()}/year). They may be more price-sensitive than high-value customers.`,
    }
  }
  return { contribution: 'low', explanation: '' }
}

/**
 * Assess customer satisfaction based on NPS score.
 */
function assessSatisfaction(customer) {
  const nps = customer.npsScore

  if (nps !== undefined) {
    if (nps < 0) {
      return {
        contribution: 'high',
        explanation: `Customer satisfaction is very low (NPS: ${nps}). Detractors are significantly more likely to churn.`,
      }
    }
    if (nps < 30) {
      return {
        contribution: 'medium',
        explanation: `Customer satisfaction is below average (NPS: ${nps}). Lower satisfaction increases churn risk.`,
      }
    }
  }
  return { contribution: 'low', explanation: '' }
}

/**
 * Assess customer tenure.
 */
function assessTenure(customer) {
  const tenure = customer.tenureMonths || 0

  if (tenure < 3) {
    return {
      contribution: 'high',
      explanation: `Customer has been with us for only ${tenure} months. New customers are more likely to churn as they haven't established strong habits yet.`,
    }
  }
  if (tenure < 6) {
    return {
      contribution: 'medium',
      explanation: `Customer relationship is relatively new (${tenure} months). Early-stage customers may need more support to build loyalty.`,
    }
  }
  return { contribution: 'low', explanation: '' }
}

/**
 * Helper: Calculate days since a date string.
 */
function getDaysSince(dateString) {
  if (!dateString) return 999
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}
