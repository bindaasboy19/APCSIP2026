import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import IdentityInput from '../components/IdentityInput.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { api } from '../services/api.js'

export default function InputFormPage() {
  const navigate = useNavigate()
  const { token, logout } = useAuth()
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(form) {
    setSubmitting(true)
    setErrorMessage('')

    try {
      await api.submitIdentity(form, token)
      navigate('/dashboard', { replace: true })
    } catch (error) {
      if (error.status === 401) {
        logout()
        navigate('/login', { replace: true })
        return
      }

      setErrorMessage(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <section className="glass-panel rounded-[32px] p-6 soft-ring sm:p-8">
        <div className="section-title">Step 2</div>
        <div className="mt-2 font-display text-4xl font-bold text-white">Capture non-sensitive mock exposure data</div>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-cyber-mist">
          This assessment focuses on structural risk indicators only: linked accounts, phone line footprint, payment app configuration, two-step verification status, and dormant financial linkages.
        </p>
      </section>

      <IdentityInput onSubmit={handleSubmit} submitting={submitting} errorMessage={errorMessage} />
    </div>
  )
}
