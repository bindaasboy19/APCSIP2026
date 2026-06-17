import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext.jsx'
import { api } from '../services/api.js'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [demoOtp, setDemoOtp] = useState('')
  const [maskedEmail, setMaskedEmail] = useState('')
  const [step, setStep] = useState('request')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  async function handleRequestOtp(event) {
    event.preventDefault()
    setLoading(true)
    setErrorMessage('')

    try {
      const data = await api.requestOtp(email, password)
      setDemoOtp(data.demoOtp ?? '')
      setMaskedEmail(data.maskedEmail)
      setStep('verify')
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleVerifyOtp(event) {
    event.preventDefault()
    setLoading(true)
    setErrorMessage('')

    try {
      const data = await api.verifyOtp(email, otp)
      login({
        token: data.token,
        user: data.user,
      })

      const nextPath = location.state?.from === '/dashboard' ? '/dashboard' : '/input'
      navigate(nextPath, { replace: true })
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
      <section className="glass-panel rounded-[32px] p-8 soft-ring sm:p-10">
        <div className="section-title">Authentication</div>
        <div className="mt-2 font-display text-4xl font-bold text-white">Secure simulated login</div>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-cyber-mist">
          Use a valid email address to request a demo verification code. The system securely
          authenticates your request and issues a session token, without storing real credentials.
        </p>

        <form onSubmit={step === 'request' ? handleRequestOtp : handleVerifyOtp} className="mt-8 space-y-5">
          <label className="block">
            <span className="text-sm font-medium text-white">Email address</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={step === 'verify'}
              placeholder="you@example.com"
              className="mt-3 w-full rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-white outline-none transition focus:border-cyber-glow/50 focus:bg-black/25 disabled:opacity-60"
            />
          </label>

          {step === 'request' ? (
            <label className="block">
              <span className="text-sm font-medium text-white">Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password (min 8 characters)"
                className="mt-3 w-full rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-white outline-none transition focus:border-cyber-glow/50 focus:bg-black/25"
              />
            </label>
          ) : null}

          {step === 'verify' ? (
            <label className="block">
              <span className="text-sm font-medium text-white">Verification code</span>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter 6-digit code"
                className="mt-3 w-full rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-white outline-none transition focus:border-cyber-glow/50 focus:bg-black/25"
              />
            </label>
          ) : null}

          {errorMessage ? (
            <div className="rounded-2xl border border-cyber-alert/30 bg-cyber-alert/10 px-4 py-3 text-sm text-cyber-alert">
              {errorMessage}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full border border-cyber-glow/40 bg-cyber-glow/10 px-6 py-3 font-semibold text-cyber-glow transition hover:bg-cyber-glow/15 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Processing secure request...' : step === 'request' ? 'Send Verification Code' : 'Verify Code and login'}
          </button>
        </form>
      </section>

      <aside className="glass-panel rounded-[32px] p-8 soft-ring sm:p-10">
        <div className="section-title">Verification Code Helper</div>
        <div className="mt-2 font-display text-3xl font-bold text-white">Login verification status</div>

        <div className="mt-6 rounded-[28px] border border-white/10 bg-black/20 p-6">
          <div className="text-sm text-cyber-mist">Current stage</div>
          <div className="mt-2 font-display text-2xl font-bold text-white">
            {step === 'request' ? 'Send Code' : 'Verify Code'}
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-cyber-mist/70">Masked Address</div>
              <div className="mt-2 text-lg font-semibold text-white">{maskedEmail || 'Waiting for request'}</div>
            </div>

            <div className="rounded-2xl border border-cyber-glow/20 bg-cyber-glow/10 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-cyber-mist/70">Demo Verification Code</div>
              <div className="mt-2 font-display text-4xl font-bold tracking-[0.35em] text-cyber-glow">
                {demoOtp || '------'}
              </div>
              <p className="mt-3 text-sm leading-6 text-cyber-mist">
                In a real application, this code would be sent out-of-band to your phone or email. For this interactive demo, it is shown here so you can easily test the flow.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
