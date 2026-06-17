const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

async function request(path, options = {}) {
  const { method = 'GET', token, body, signal } = options
  const headers = {}

  if (body) {
    headers['Content-Type'] = 'application/json'
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    signal,
  })

  let payload = null

  try {
    payload = await response.json()
  } catch {
    payload = null
  }

  if (!response.ok) {
    const error = new Error(payload?.message ?? 'Request failed.')
    error.status = response.status
    throw error
  }

  return payload?.data
}

export const api = {
  requestOtp(email, password) {
    return request('/auth/login', {
      method: 'POST',
      body: { email, password },
    })
  },
  verifyOtp(email, otp) {
    return request('/auth/verify-otp', {
      method: 'POST',
      body: { email, otp },
    })
  },
  submitIdentity(form, token) {
    const payload = {
      numberOfBankAccounts: Number(form.bankAccounts),
      simCount: Number(form.simCount),
      upiApps: Array.isArray(form.upiAppsUsed) ? form.upiAppsUsed.length : Number(form.upiApps ?? 0),
      has2FA: Boolean(form.twoFactorEnabled),
      hasInactiveAccounts: Boolean(form.inactiveAccounts),
      accountAgeDays: Number(form.accountAgeDays ?? 365),
      avgTransactionsPerDay: Number(form.avgTransactionsPerDay ?? 2),
    }
    return request('/user/input', {
      method: 'POST',
      token,
      body: payload,
    })
  },
  getRiskScore(token, signal) {
    return request('/user/risk', {
      token,
      signal,
    })
  },
  getMuleRisk(token, signal) {
    return request('/user/mule-risk', {
      token,
      signal,
    })
  },
  getDeviceRisk(token, signal) {
    return request('/user/device-risk', {
      token,
      signal,
    })
  },
  getRecommendations(token, signal) {
    return request('/recommendations', {
      token,
      signal,
    })
  },
  getThreatScenarios(token, signal) {
    return request('/threats', {
      token,
      signal,
    })
  },
  playThreatScenario(scenarioId, choices, token) {
    return request('/threats/play', {
      method: 'POST',
      token,
      body: { scenarioId, choices },
    })
  },
  getFraudCheck(token, signal) {
    return request('/fraud-check', {
      token,
      signal,
    })
  },
  getTransactionPattern(token, signal) {
    return request('/transactions/pattern', {
      token,
      signal,
    })
  },
}
