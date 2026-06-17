const priorityWeight = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
}

export function buildRecommendations({ profile, risk, muleRisk }) {
  const recommendations = []

  if (!profile.has2FA) {
    recommendations.push({
      priority: 'critical',
      title: 'Enable 2FA on email, banking, and UPI accounts',
      description: 'Protect the channels most likely to be used for OTP resets, password recovery, and transaction authorization.',
    })
  }

  if (profile.hasInactiveAccounts) {
    recommendations.push({
      priority: 'high',
      title: 'Close, freeze, or re-verify inactive accounts',
      description: 'Dormant financial relationships should not remain silently attached to an identity profile.',
    })
  }

  if (profile.simCount > 1) {
    recommendations.push({
      priority: 'high',
      title: 'Add telecom PINs and SIM port-out protections',
      description: 'A carrier lock significantly raises the effort required to execute a SIM swap fraud attempt.',
    })
  }

  if (profile.numberOfBankAccounts >= 4) {
    recommendations.push({
      priority: 'medium',
      title: 'Reduce unnecessary linked bank accounts',
      description: 'Consolidating dormant accounts lowers the number of recovery paths and transaction endpoints.',
    })
  }

  if (profile.upiApps >= 3) {
    recommendations.push({
      priority: 'medium',
      title: 'Reduce unused payment apps and identity touchpoints',
      description: 'A smaller UPI footprint lowers session spread and reduces the chance of overlooked access paths.',
    })
  }

  if (risk.level === 'High') {
    recommendations.push({
      priority: 'medium',
      title: 'Enable instant transaction alerts and monthly credit checks',
      description: 'Early visibility is essential when a high-risk footprint could be abused for loan fraud or account takeover.',
    })
  }

  if (muleRisk.level !== 'Low') {
    recommendations.push({
      priority: 'medium',
      title: 'Review account activity for unusual pass-through transactions',
      description: 'Multiple linked accounts and weak controls can make an identity attractive for mule-account-style misuse.',
    })
  }

  if (recommendations.length === 0) {
    recommendations.push({
      priority: 'low',
      title: 'Maintain strong digital identity hygiene',
      description: 'Keep 2FA active, review account linkages regularly, and monitor UPI and bank notifications for anomalies.',
    })
  }

  return recommendations.sort((left, right) => priorityWeight[left.priority] - priorityWeight[right.priority])
}
