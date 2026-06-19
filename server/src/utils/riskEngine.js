import { sanitizeBoolean, sanitizeCount } from './validation.js'

const MAX_RISK_SCORE = 170

const FRAUD_FLOW = [
  {
    title: 'Stolen Identity',
    description: 'Leaked or carelessly shared identity details are collected by a fraudster.',
  },
  {
    title: 'Fake KYC',
    description: 'Compromised documents are reused to pass lightweight onboarding or recovery checks.',
  },
  {
    title: 'Bank Account Created',
    description: 'A new payment or bank account is opened, linked, or accessed using the stolen identity.',
  },
  {
    title: 'Money Transfer',
    description: 'Simulated funds are moved quickly to make the activity harder to reverse.',
  },
  {
    title: 'Mule Account Network',
    description: 'Transfers pass through additional accounts to hide the real source and destination.',
  },
  {
    title: 'Cash Withdrawal',
    description: 'Simulated cash-out or final transfer completes the fraud before the victim notices.',
  },
]

function levelToSignalValue(level) {
  if (level === 'High') return 85
  if (level === 'Medium') return 55
  return 20
}

function calculateMuleRisk(profile) {
  if (profile.numberOfBankAccounts >= 5 && profile.hasInactiveAccounts) {
    return 'High'
  }

  if (profile.numberOfBankAccounts >= 4 || (profile.numberOfBankAccounts >= 3 && profile.hasInactiveAccounts)) {
    return 'Medium'
  }

  return 'Low'
}

function calculateSimSwapRisk(profile) {
  if (profile.simCount >= 3 || (profile.simCount > 1 && !profile.has2FA)) {
    return 'High'
  }

  if (profile.simCount > 1) {
    return 'Medium'
  }

  return 'Low'
}

function buildPatterns(profile, detections) {
  const patterns = []

  if (detections.muleRisk !== 'Low') {
    patterns.push({
      id: 'mule-account-risk',
      title: 'Possible mule account risk',
      severity: detections.muleRisk,
      explanation:
        detections.muleRisk === 'High'
          ? 'A large number of bank accounts plus inactive accounts can create a realistic pass-through path for suspicious fund movement.'
          : 'A wider banking footprint increases the chance of an account being misused to receive or forward suspicious funds.',
    })
  }

  if (profile.hasInactiveAccounts) {
    patterns.push({
      id: 'inactive-account-exposure',
      title: 'Inactive account exposure',
      severity: detections.muleRisk === 'High' ? 'High' : 'Medium',
      explanation:
        'Dormant accounts are often monitored less closely, which makes them attractive for quiet reuse or delayed detection.',
    })
  }

  if (detections.simSwapRisk !== 'Low') {
    patterns.push({
      id: 'sim-swap-risk',
      title: 'SIM swap risk',
      severity: detections.simSwapRisk,
      explanation:
        'Multiple active SIM connections can widen OTP interception and number-port abuse opportunities.',
    })
  }

  if (!profile.has2FA) {
    patterns.push({
      id: 'weak-authentication',
      title: 'Weak authentication controls',
      severity: 'High',
      explanation:
        'Without two-factor authentication, a compromised recovery channel can quickly become an account-takeover path.',
    })
  }

  if (patterns.length === 0) {
    patterns.push({
      id: 'contained-surface',
      title: 'Contained attack surface',
      severity: 'Low',
      explanation: 'The current simulated profile shows relatively few strong fraud indicators.',
    })
  }

  return patterns
}

function buildInsights(profile, risk, detections) {
  const insights = []

  if (risk.level === 'High') {
    insights.push({
      title: 'High exposure to identity misuse',
      description:
        'The combined account footprint and security gaps create multiple realistic paths for fraudulent access or misuse.',
    })
  } else if (risk.level === 'Medium') {
    insights.push({
      title: 'Moderate identity exposure detected',
      description:
        'The profile is not critical, but it contains enough signals to justify tighter controls and closer monitoring.',
    })
  } else {
    insights.push({
      title: 'Limited immediate fraud indicators',
      description:
        'The current profile is comparatively contained, though basic monitoring and good digital hygiene still matter.',
    })
  }

  if (detections.muleRisk === 'High') {
    insights.push({
      title: 'Pattern resembles mule account risk',
      description:
        'High account sprawl combined with inactive accounts can support pass-through movement of suspicious funds.',
    })
  } else if (detections.muleRisk === 'Medium') {
    insights.push({
      title: 'Banking footprint needs review',
      description:
        'A wider banking footprint increases the number of places where identity misuse can hide or escalate.',
    })
  }

  if (!profile.has2FA) {
    insights.push({
      title: 'Weak security practices detected',
      description:
        'Missing 2FA makes credential reset abuse and follow-on fraud much easier after a single compromise.',
    })
  }

  if (profile.simCount > 1) {
    insights.push({
      title: 'Multiple SIMs increase recovery-channel risk',
      description:
        'More than one active SIM can complicate OTP control and increase the chance of SIM swap abuse.',
    })
  }

  if (profile.hasInactiveAccounts) {
    insights.push({
      title: 'Dormant accounts may delay detection',
      description:
        'Unused accounts tend to receive less attention, which can give fraud more time to go unnoticed.',
    })
  }

  return insights
}

function buildCharts(risk, detections) {
  return {
    breakdown: risk.breakdown.map((item) => ({
      name: item.label,
      value: item.points,
    })),
    signalSummary: [
      {
        name: 'Identity Misuse',
        value: levelToSignalValue(detections.identityMisuseRisk),
      },
      {
        name: 'Mule Risk',
        value: levelToSignalValue(detections.muleRisk),
      },
      {
        name: 'SIM Swap',
        value: levelToSignalValue(detections.simSwapRisk),
      },
    ],
  }
}

export function normalizeIdentityPayload(payload = {}) {
  return {
    numberOfBankAccounts: sanitizeCount(payload.numberOfBankAccounts, 0, 10, 0),
    simCount: sanitizeCount(payload.simCount, 1, 5, 1),
    has2FA: sanitizeBoolean(payload.has2FA),
    hasInactiveAccounts: sanitizeBoolean(payload.hasInactiveAccounts),
  }
}

export function resolveRiskLevel(score) {
  if (score <= 40) return 'Low'
  if (score <= 80) return 'Medium'
  return 'High'
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
  ]

  const score = breakdown.reduce((sum, item) => sum + item.points, 0)
  const level = resolveRiskLevel(score)
  const risk = {
    score,
    visualScore: Math.min(100, Math.round((score / MAX_RISK_SCORE) * 100)),
    level,
    formula: '(banks * 10) + (inactive ? 25 : 0) + (simCount > 1 ? 15 : 0) + (!has2FA ? 30 : 0)',
    breakdown,
  }
  const detections = {
    identityMisuseRisk: level,
    muleRisk: calculateMuleRisk(profile),
    simSwapRisk: calculateSimSwapRisk(profile),
  }

  return {
    profile,
    risk,
    detections,
    patterns: buildPatterns(profile, detections),
    insights: buildInsights(profile, risk, detections),
    fraudFlow: FRAUD_FLOW,
    charts: buildCharts(risk, detections),
  }
}
