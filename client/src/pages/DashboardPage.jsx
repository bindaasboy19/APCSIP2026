import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext.jsx'
import IdentityRiskDashboard from './IdentityRiskDashboard.jsx'
import { api } from '../services/api.js'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { token, logout } = useAuth()

  const [state, setState] = useState({
    loading: true,
    errorMessage: '',
    riskSnapshot: null,
    patterns: [],
    insights: [],
    recommendations: [],
  })

  useEffect(() => {
    const controller = new AbortController()

    async function loadDashboard() {
      try {
        const [riskSnapshot, patternData, insightData, recommendationData] = await Promise.all([
          api.getRisk(token, controller.signal),
          api.getPatterns(token, controller.signal),
          api.getInsights(token, controller.signal),
          api.getRecommendations(token, controller.signal),
        ])

        setState({
          loading: false,
          errorMessage: '',
          riskSnapshot,
          patterns: patternData.patterns,
          insights: insightData.insights,
          recommendations: recommendationData.recommendations,
        })
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

        setState((previous) => ({
          ...previous,
          loading: false,
          errorMessage: error.message,
        }))
      }
    }

    loadDashboard()

    return () => controller.abort()
  }, [logout, navigate, token])

  if (state.loading) {
    return (
      <div className="glass-panel rounded-[32px] p-10 text-center soft-ring">
        <div className="section-title">Loading</div>
        <div className="mt-3 font-display text-3xl font-bold text-white">Building your fraud intelligence dashboard...</div>
      </div>
    )
  }

  if (state.errorMessage) {
    return (
      <div className="glass-panel rounded-[32px] border border-cyber-alert/20 p-10 text-center soft-ring">
        <div className="section-title">Error</div>
        <div className="mt-3 font-display text-3xl font-bold text-white">Unable to load dashboard</div>
        <p className="mt-4 text-sm leading-7 text-cyber-mist">{state.errorMessage}</p>
      </div>
    )
  }

  return (
    <IdentityRiskDashboard
      riskSnapshot={state.riskSnapshot}
      patterns={state.patterns}
      insights={state.insights}
      recommendations={state.recommendations}
    />
  )
}
