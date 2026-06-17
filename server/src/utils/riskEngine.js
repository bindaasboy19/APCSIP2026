import { sanitizeBoolean, sanitizeCount } from './validation.js'

export function normalizeIdentityPayload(payload = {}) {
  return {
    numberOfBankAccounts: sanitizeCount(payload.numberOfBankAccounts, 0, 10, 0),
    simCount: sanitizeCount(payload.simCount, 1, 5, 1),
    upiApps: sanitizeCount(payload.upiApps, 0, 6, 0),
    has2FA: sanitizeBoolean(payload.has2FA),
    hasInactiveAccounts: sanitizeBoolean(payload.hasInactiveAccounts),
    accountAgeDays: sanitizeCount(payload.accountAgeDays, 1, 3650, 365),
    avgTransactionsPerDay: sanitizeCount(payload.avgTransactionsPerDay, 0, 1000, 2),
  }
}

export function resolveRiskLevel(score) {
  if (score <= 45) return 'Low'
  if (score <= 85) return 'Medium'
  return 'High'
}

export function calculateMuleRisk(profile) {
  let probabilityPercentage = 10
  const drivers = []

  if (profile.numberOfBankAccounts >= 5) {
    probabilityPercentage += 25
    drivers.push('High number of linked bank accounts')
  } else if (profile.numberOfBankAccounts >= 3) {
    probabilityPercentage += 15
    drivers.push('Multiple linked bank accounts')
  }

  if (profile.hasInactiveAccounts) {
    probabilityPercentage += 20
    drivers.push('Inactive accounts increase stealth misuse potential')
  }

  if (!profile.has2FA) {
    probabilityPercentage += 15
    drivers.push('Low security controls increase account re-use risk')
  }

  if (profile.simCount > 1) {
    probabilityPercentage += 10
    drivers.push('Multiple SIMs expand identity control exposure')
  }

  if (profile.upiApps >= 3) {
    probabilityPercentage += 10
    drivers.push('Broad UPI app usage expands transaction routing surface')
  }

  if (profile.avgTransactionsPerDay > 15) {
    probabilityPercentage += 15
    drivers.push('High transaction frequency spikes risk profile')
  }

  if (profile.numberOfBankAccounts >= 4 && profile.hasInactiveAccounts) {
    probabilityPercentage = Math.max(probabilityPercentage, 75)
  }

  probabilityPercentage = Math.min(95, probabilityPercentage)
  const level = probabilityPercentage >= 70 ? 'High' : probabilityPercentage >= 35 ? 'Medium' : 'Low'

  return {
    score: probabilityPercentage,
    level,
    drivers,
    probabilityPercentage,
    rationale:
      level === 'High'
        ? 'The simulated profile mirrors several patterns associated with identity misuse and mule-account facilitation.'
        : level === 'Medium'
          ? 'Some characteristics could support misuse if an attacker gains control of linked channels.'
          : 'The current simulated footprint shows relatively few strong mule-risk indicators.',
  }
}

export function calculateDeviceRisk(profile) {
  const flags = []
  let score = 10

  if (!profile.has2FA) {
    score += 15
    flags.push('Verification bypass vulnerability (lack of two-step verification)')
  }

  if (profile.avgTransactionsPerDay > 15) {
    score += 20
    flags.push('High transaction volume from a single hardware token')
  }

  if (profile.numberOfBankAccounts >= 5) {
    score += 25
    flags.push('Multiple KYC attempts registered from the same hardware fingerprint')
  }

  if (profile.simCount > 2) {
    score += 25
    flags.push('Device hardware-telemetry location mismatch (IP vs SIM carrier)')
  }

  if (profile.accountAgeDays < 90) {
    score += 15
    flags.push('New device enrollment flagged within recent KYC window')
  }

  score = Math.min(100, score)

  return {
    score,
    flags: flags.length > 0 ? flags : ['No suspicious device flags registered'],
  }
}

export function evaluateFraudCheck(profile) {
  return {
    phoneFlag: profile.simCount > 3 || profile.numberOfBankAccounts >= 6,
    emailFlag: !profile.has2FA && profile.hasInactiveAccounts,
    upiFlag: profile.upiApps >= 4,
  }
}

export function evaluateTransactionPattern(profile) {
  if (profile.avgTransactionsPerDay > 20 && profile.hasInactiveAccounts) {
    return {
      patternDetected: true,
      patternType: 'Dormant Account Activation Spike',
      severity: 'Critical',
    }
  }

  if (profile.avgTransactionsPerDay > 12) {
    return {
      patternDetected: true,
      patternType: 'Rapid Fund Forwarding (Layering)',
      severity: 'High',
    }
  }

  if (profile.numberOfBankAccounts >= 5) {
    return {
      patternDetected: true,
      patternType: 'Repeated Beneficiary Sprawl',
      severity: 'Medium',
    }
  }

  return {
    patternDetected: false,
    patternType: 'Normal transaction velocity',
    severity: 'Low',
  }
}

export function calculateHealthScore(profile, riskScore, fraudCheck) {
  let score = 1000

  if (!profile.has2FA) score -= 250
  if (profile.hasInactiveAccounts) score -= 150
  if (profile.numberOfBankAccounts > 3) score -= (profile.numberOfBankAccounts - 3) * 60
  if (profile.simCount > 1) score -= (profile.simCount - 1) * 70
  if (fraudCheck.phoneFlag || fraudCheck.emailFlag || fraudCheck.upiFlag) score -= 120

  return Math.max(100, score)
}

export function generateTimeline(profile, finalScore) {
  const level = resolveRiskLevel(finalScore)
  return [
    { day: 15, riskScore: 20, status: 'Normal' },
    { day: 30, riskScore: 25, status: 'Normal' },
    { day: 45, riskScore: Math.min(50, Math.round(finalScore * 0.45)), status: 'Suspicious Activity' },
    { day: 60, riskScore: Math.min(70, Math.round(finalScore * 0.65)), status: 'High Volatility' },
    { day: 75, riskScore: Math.min(95, Math.round(finalScore * 0.85)), status: 'Suspicious Linkages' },
    { day: 90, riskScore: finalScore, status: level + ' Risk' },
  ]
}

export function calculateRiskAssessment(payload = {}) {
  const profile = normalizeIdentityPayload(payload)

  const breakdown = [
    {
      key: 'numberOfBankAccounts',
      label: 'Linked bank accounts',
      points: profile.numberOfBankAccounts * 10,
    },
    {
      key: 'hasInactiveAccounts',
      label: 'Inactive accounts still open',
      points: profile.hasInactiveAccounts ? 25 : 0,
    },
    {
      key: 'simCount',
      label: 'Multiple SIM exposure',
      points: profile.simCount > 1 ? 15 : 0,
    },
    {
      key: 'has2FA',
      label: 'Two-step verification disabled',
      points: profile.has2FA ? 0 : 30,
    },
    {
      key: 'accountAgeDays',
      label: 'New account vulnerability (<90 days)',
      points: profile.accountAgeDays < 90 ? 20 : 0,
    },
    {
      key: 'avgTransactionsPerDay',
      label: 'High transaction frequency',
      points: profile.avgTransactionsPerDay > 10 ? 15 : 0,
    },
    {
      key: 'upiApps',
      label: 'Multiple UPI applications (>2)',
      points: profile.upiApps > 2 ? 10 : 0,
    },
  ]

  const score = breakdown.reduce((sum, item) => sum + item.points, 0)
  const level = resolveRiskLevel(score)
  const muleRisk = calculateMuleRisk(profile)
  const deviceRisk = calculateDeviceRisk(profile)
  const fraudCheck = evaluateFraudCheck(profile)
  const transactionPattern = evaluateTransactionPattern(profile)
  const healthScore = calculateHealthScore(profile, score, fraudCheck)
  const timeline90Days = generateTimeline(profile, score)

  return {
    profile,
    risk: {
      score,
      visualScore: Math.min(score, 120),
      level,
      formula:
        '(banks*10) + (inactive?25) + (simCount>1?15) + (!has2FA?30) + (age<90?20) + (tx>10?15) + (upi>2?10)',
      breakdown,
    },
    muleRisk,
    deviceRisk,
    fraudCheck,
    transactionPattern,
    healthScore,
    timeline90Days,
    charts: {
      breakdown,
      surfaceBreakdown: [
        { name: 'Bank Accounts', value: profile.numberOfBankAccounts },
        { name: 'SIM Cards', value: profile.simCount },
        { name: 'UPI Apps', value: Math.max(profile.upiApps, 1) },
      ],
      muleSignals: [
        { name: 'Accounts', value: profile.numberOfBankAccounts >= 5 ? 3 : profile.numberOfBankAccounts >= 3 ? 2 : 1 },
        { name: 'Inactive', value: profile.hasInactiveAccounts ? 3 : 1 },
        { name: '2FA Weakness', value: profile.has2FA ? 1 : 3 },
        { name: 'SIM Spread', value: profile.simCount > 1 ? 2 : 1 },
      ],
    },
    telemetry: {
      digitalSurfaceIndex: profile.numberOfBankAccounts + profile.simCount + profile.upiApps,
      recoveryChannelStrength: profile.has2FA ? 'Strong' : 'Weak',
      inactiveExposureWindow: profile.hasInactiveAccounts ? 'Open' : 'Closed',
    },
  }
}
