const MAX_RISK_SCORE = 170

export function calculateRiskScore(inputState = {}) {
  const numberOfBankAccounts = Number(inputState.numberOfBankAccounts ?? inputState.bankAccounts ?? 0)
  const simCount = Number(inputState.simCount ?? 1)
  const has2FA = Boolean(inputState.has2FA ?? inputState.twoFactorEnabled)
  const hasInactiveAccounts = Boolean(inputState.hasInactiveAccounts ?? inputState.inactiveAccounts)

  const breakdown = [
    { key: 'numberOfBankAccounts', label: 'Linked bank accounts', points: numberOfBankAccounts * 10 },
    { key: 'hasInactiveAccounts', label: 'Inactive accounts still open', points: hasInactiveAccounts ? 25 : 0 },
    { key: 'simCount', label: 'Multiple SIM exposure', points: simCount > 1 ? 15 : 0 },
    { key: 'has2FA', label: 'Two-step verification disabled', points: has2FA ? 0 : 30 },
  ]

  const score = breakdown.reduce((sum, item) => sum + item.points, 0)
  const visualScore = Math.min(100, Math.round((score / MAX_RISK_SCORE) * 100))
  const level = score <= 40 ? 'Low' : score <= 80 ? 'Medium' : 'High'

  return {
    score,
    visualScore,
    level,
    breakdown,
  }
}
