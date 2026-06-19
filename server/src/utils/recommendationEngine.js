const priorityWeight = {
  high: 0,
  medium: 1,
  low: 2,
}

export function buildRecommendations({ profile, risk, detections }) {
  const recommendations = []

  if (!profile.has2FA) {
    recommendations.push({
      priority: 'high',
      title: 'Enable 2FA on your primary email and financial apps',
      description:
        'Two-factor authentication makes OTP interception and simple credential reuse much less effective.',
    })
  }

  if (profile.hasInactiveAccounts) {
    recommendations.push({
      priority: 'high',
      title: 'Review or close inactive accounts',
      description:
        'Dormant accounts increase blind spots and can be reused before suspicious activity is noticed.',
    })
  }

  if (profile.numberOfBankAccounts >= 4) {
    recommendations.push({
      priority: 'medium',
      title: 'Reduce unnecessary linked bank accounts',
      description:
        'A smaller account footprint lowers the number of channels that can be targeted or quietly misused.',
    })
  }

  if (profile.simCount > 1) {
    recommendations.push({
      priority: 'medium',
      title: 'Protect your telecom recovery channel',
      description:
        'Set a telecom PIN, watch for sudden signal loss, and keep a clear primary number for sensitive OTP delivery.',
    })
  }

  recommendations.push({
    priority: risk.level === 'High' || detections.simSwapRisk === 'High' ? 'medium' : 'low',
    title: 'Avoid sharing OTPs or recovery codes',
    description:
      'Fraud attempts often rely on social engineering before they rely on technical compromise.',
  })

  recommendations.push({
    priority: risk.level === 'High' ? 'medium' : 'low',
    title: 'Monitor account activity and login alerts',
    description:
      'Fast detection is critical when identity misuse leads to unauthorized access, fake onboarding, or suspicious transfers.',
  })

  return recommendations.sort((left, right) => priorityWeight[left.priority] - priorityWeight[right.priority])
}
