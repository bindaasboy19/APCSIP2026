export function buildAlerts({ profile, risk, detections }) {
  const alerts = []

  if (!profile.has2FA) {
    alerts.push({
      severity: 'critical',
      title: 'Primary recovery path lacks 2FA',
      description:
        'If the linked email or mobile recovery channel is compromised, account takeover becomes much easier to execute.',
    })
  }

  if (profile.simCount > 1) {
    alerts.push({
      severity: detections.simSwapRisk === 'High' ? 'critical' : 'high',
      title: 'Multiple SIMs increase SIM swap exposure',
      description:
        'More than one active SIM broadens the number-porting and OTP interception attack surface.',
    })
  }

  if (profile.hasInactiveAccounts) {
    alerts.push({
      severity: 'high',
      title: 'Inactive financial links remain exploitable',
      description:
        'Dormant accounts are often ignored during monitoring, making them attractive for fraudulent reuse.',
    })
  }

  if (profile.numberOfBankAccounts >= 4) {
    alerts.push({
      severity: detections.muleRisk === 'High' ? 'high' : 'medium',
      title: 'Large banking footprint expands blast radius',
      description:
        'More linked bank accounts create more recovery paths, transaction endpoints, and fraud escalation options.',
    })
  }

  if (detections.muleRisk === 'High') {
    alerts.push({
      severity: 'critical',
      title: 'Mule-account misuse indicators are elevated',
      description:
        'The current simulated footprint combines account sprawl, inactivity, and weak controls in a way often associated with mule-account risk.',
    })
  }

  if (alerts.length === 0) {
    alerts.push({
      severity: 'low',
      title: 'No immediate red flags detected',
      description: 'The current simulated footprint shows a comparatively contained attack surface.',
    })
  }

  if (risk.level === 'High' && !alerts.some((alert) => alert.severity === 'critical')) {
    alerts.unshift({
      severity: 'critical',
      title: 'Composite exposure is above acceptable threshold',
      description:
        'The combined identity footprint presents a high-likelihood path for account takeover or fraud misuse.',
    })
  }

  return alerts
}
