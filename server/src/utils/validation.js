function toInteger(value) {
  const parsed = Number.parseInt(String(value ?? '').trim(), 10)
  return Number.isFinite(parsed) ? parsed : null
}

function isBooleanLike(value) {
  return [true, false, 'true', 'false', 1, 0, '1', '0'].includes(value)
}

export function sanitizeBoolean(value) {
  return value === true || value === 'true' || value === 1 || value === '1'
}

export function sanitizeCount(value, min, max, fallback = min) {
  const parsed = toInteger(value)

  if (parsed == null) {
    return fallback
  }

  return Math.max(min, Math.min(max, parsed))
}

export function sanitizePassword(value) {
  return String(value ?? '')
}

export function validateIdentityPayload(payload = {}) {
  const errors = []

  if (toInteger(payload.numberOfBankAccounts) == null) {
    errors.push('numberOfBankAccounts must be an integer.')
  }

  if (toInteger(payload.simCount) == null) {
    errors.push('simCount must be an integer.')
  }

  if (!isBooleanLike(payload.has2FA)) {
    errors.push('has2FA must be a boolean.')
  }

  if (!isBooleanLike(payload.hasInactiveAccounts)) {
    errors.push('hasInactiveAccounts must be a boolean.')
  }

  return errors
}
