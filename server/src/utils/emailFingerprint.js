import crypto from 'node:crypto'

export function normalizeEmail(email) {
  return String(email ?? '').trim().toLowerCase()
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(email))
}

export function hashEmail(email) {
  return crypto.createHash('sha256').update(normalizeEmail(email)).digest('hex')
}

export function maskEmail(email) {
  const normalized = normalizeEmail(email)
  const [localPart = '', domain = 'hidden.local'] = normalized.split('@')
  const visibleLocal = localPart.slice(0, 2) || 'id'
  const maskedLocal = `${visibleLocal}${'*'.repeat(Math.max(1, localPart.length - visibleLocal.length))}`
  return `${maskedLocal}@${domain}`
}

export function generateOtp() {
  return String(crypto.randomInt(0, 1000000)).padStart(6, '0')
}
