export function calculateRiskScore(inputState = {}) {
  const bankAccounts = Number(inputState.bankAccounts ?? 0)
  const simCount = Number(inputState.simCount ?? 1)
  const twoFactorEnabled = Boolean(inputState.twoFactorEnabled)
  const inactiveAccounts = Boolean(inputState.inactiveAccounts)
  const accountAgeDays = Number(inputState.accountAgeDays ?? 365)
  const avgTransactionsPerDay = Number(inputState.avgTransactionsPerDay ?? 2)
  const upiApps = Array.isArray(inputState.upiAppsUsed) ? inputState.upiAppsUsed.length : Number(inputState.upiApps ?? 0)

  const breakdown = [
    { key: 'numberOfBankAccounts', label: 'Linked bank accounts', points: bankAccounts * 10 },
    { key: 'hasInactiveAccounts', label: 'Inactive accounts still open', points: inactiveAccounts ? 25 : 0 },
    { key: 'simCount', label: 'Multiple SIM exposure', points: simCount > 1 ? 15 : 0 },
    { key: 'has2FA', label: 'Two-step verification disabled', points: twoFactorEnabled ? 0 : 30 },
    { key: 'accountAgeDays', label: 'New account vulnerability (<90 days)', points: accountAgeDays < 90 ? 20 : 0 },
    { key: 'avgTransactionsPerDay', label: 'High transaction frequency', points: avgTransactionsPerDay > 10 ? 15 : 0 },
    { key: 'upiApps', label: 'Multiple UPI applications (>2)', points: upiApps > 2 ? 10 : 0 },
  ]

  const score = breakdown.reduce((sum, item) => sum + item.points, 0)
  const visualScore = Math.min(score, 120)
  const level = score <= 45 ? 'Low' : score <= 85 ? 'Medium' : 'High'

  return {
    score,
    visualScore,
    level,
    breakdown,
  }
}

