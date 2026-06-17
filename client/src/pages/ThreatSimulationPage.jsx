import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ThreatPlayer from '../components/ThreatPlayer.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { api } from '../services/api.js'

function exposureClassName(level) {
  if (level === 'High') return 'border-cyber-alert/40 bg-cyber-alert/10 text-cyber-alert'
  if (level === 'Medium') return 'border-cyber-amber/40 bg-cyber-amber/10 text-cyber-amber'
  return 'border-cyber-safe/40 bg-cyber-safe/10 text-cyber-safe'
}

export default function ThreatSimulationPage() {
  const navigate = useNavigate()
  const { token, logout } = useAuth()

  const [scenarios, setScenarios] = useState([])
  const [selectedScenarioId, setSelectedScenarioId] = useState('')
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadScenarios() {
      try {
        const data = await api.getThreatScenarios(token, controller.signal)
        setScenarios(data.scenarios)
        setSelectedScenarioId(data.scenarios[0]?.id ?? '')
      } catch (error) {
        if (error.name === 'AbortError') {
          return
        }

        if (error.status === 401) {
          logout()
          navigate('/login', { replace: true })
          return
        }

        if (error.status === 404) {
          navigate('/input', { replace: true })
          return
        }

        setErrorMessage(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadScenarios()

    return () => controller.abort()
  }, [logout, navigate, token])

  const selectedScenario = scenarios.find((scenario) => scenario.id === selectedScenarioId) ?? scenarios[0]

  if (loading) {
    return (
      <div className="glass-panel rounded-[32px] p-10 text-center soft-ring">
        <div className="section-title">Loading</div>
        <div className="mt-3 font-display text-3xl font-bold text-white">Preparing simulated pathways...</div>
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div className="glass-panel rounded-[32px] border border-cyber-alert/20 p-10 text-center soft-ring">
        <div className="section-title">Error</div>
        <div className="mt-3 font-display text-3xl font-bold text-white">Unable to load simulations</div>
        <p className="mt-4 text-sm leading-7 text-cyber-mist">{errorMessage}</p>
      </div>
    )
  }

  if (!selectedScenario) {
    return null
  }

  return (
    <div className="space-y-6">
      <section className="glass-panel rounded-[32px] p-6 soft-ring sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="section-title">Fraud Scenario Sandbox</div>
            <div className="mt-2 font-display text-4xl font-bold text-white">Simulate and understand security pathways</div>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-cyber-mist">
              Select a scenario below to walk through choices interactively. See how small security decisions impact
              likelihood ratings and overall profile outcomes.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            type="button"
            onClick={() => setSelectedScenarioId(scenario.id)}
            className={`glass-panel rounded-[28px] p-5 text-left soft-ring transition ${selectedScenarioId === scenario.id ? 'border-cyber-glow/35 bg-cyber-glow/10' : 'hover:border-white/15 hover:bg-white/[0.06]'}`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="font-display text-2xl font-bold text-white">{scenario.title}</div>
              <span className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em] ${exposureClassName(scenario.impactLevel)}`}>
                {scenario.impactLevel}
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-cyber-mist">{scenario.summary}</p>
          </button>
        ))}
      </section>

      <ThreatPlayer scenario={selectedScenario} />
    </div>
  )
}

