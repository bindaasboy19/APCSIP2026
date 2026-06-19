const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

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

  return payload?.data ?? payload
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
    return request('/user/input', {
      method: 'POST',
      token,
      body: {
        numberOfBankAccounts: Number(form.numberOfBankAccounts),
        simCount: Number(form.simCount),
        has2FA: Boolean(form.has2FA),
        hasInactiveAccounts: Boolean(form.hasInactiveAccounts),
      },
    })
  },

  getRisk(token, signal) {
    return request('/user/risk', {
      token,
      signal,
    })
  },

  getPatterns(token, signal) {
    return request('/user/patterns', {
      token,
      signal,
    })
  },

  getInsights(token, signal) {
    return request('/user/insights', {
      token,
      signal,
    })
  },

  getRecommendations(token, signal) {
    return request('/user/recommendations', {
      token,
      signal,
    })
  },

  getThreats(token, signal) {
    return request('/threats', {
      token,
      signal,
    })
  },
}
