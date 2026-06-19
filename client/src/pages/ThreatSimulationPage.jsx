import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ThreatCard from '../components/ThreatCard.jsx'
import ThreatSimulation from '../components/ThreatSimulation.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { api } from '../services/api.js'

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
        const data = await api.getThreats(token, controller.signal)
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
        <div className="mt-3 font-display text-3xl font-bold text-white">Preparing threat scenarios...</div>
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

  return (
    <div className="space-y-6">
      <section className="glass-panel rounded-[32px] p-6 soft-ring sm:p-8">
        <div className="section-title">Threat Library</div>
        <div className="mt-2 font-display text-4xl font-bold text-white">Step-by-step fraud scenarios</div>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-cyber-mist">
          These simulations show how identity misuse can progress in realistic but fully safe, non-operational ways.
        </p>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {scenarios.map((scenario) => (
          <ThreatCard
            key={scenario.id}
            scenario={scenario}
            active={scenario.id === selectedScenarioId}
            onSelect={setSelectedScenarioId}
          />
        ))}
      </section>

      <ThreatSimulation scenario={selectedScenario} />
    </div>
  )
}
