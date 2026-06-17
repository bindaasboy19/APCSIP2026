import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { api } from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function ThreatPlayer({ scenario, onResetScenario }) {
  const { token } = useAuth()
  const [currentStage, setCurrentStage] = useState(0)
  const [choices, setChoices] = useState({})
  const [outcome, setOutcome] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Reset local state when scenario changes
  useEffect(() => {
    setCurrentStage(0)
    setChoices({})
    setOutcome(null)
    setError('')
  }, [scenario])

  if (!scenario) return null

  const stages = scenario.stages || []
  const hasNextStage = currentStage < stages.length - 1

  async function handleSelectOption(optionValue) {
    const nextChoices = {
      ...choices,
      [currentStage]: optionValue,
    }
    setChoices(nextChoices)

    if (hasNextStage) {
      setCurrentStage((prev) => prev + 1)
    } else {
      // Calculate final outcome
      setSubmitting(true)
      setError('')
      try {
        const response = await api.playThreatScenario(scenario.id, nextChoices, token)
        setOutcome(response.outcome)
      } catch (err) {
        setError(err.message || 'Failed to simulate scenario outcome.')
      } finally {
        setSubmitting(false)
      }
    }
  }

  function handleReset() {
    setCurrentStage(0)
    setChoices({})
    setOutcome(null)
    setError('')
    if (onResetScenario) {
      onResetScenario()
    }
  }

  return (
    <section className="glass-panel rounded-[28px] p-6 soft-ring sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-cyber-mist/70">Interactive Playback</span>
          <h2 className="mt-1 font-display text-3xl font-bold text-white">{scenario.title}</h2>
          <p className="mt-2 text-sm text-cyber-mist max-w-xl">{scenario.summary}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-cyber-mist">Risk level:</span>
          <span className="rounded-full border border-cyber-amber/40 bg-cyber-amber/10 px-3 py-1 text-xs font-semibold text-cyber-amber uppercase tracking-wider">
            {scenario.impactLevel}
          </span>
        </div>
      </div>

      <div className="mt-8">
        <AnimatePresence mode="wait">
          {!outcome ? (
            <motion.div
              key={`stage-${currentStage}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-widest text-cyber-glow font-semibold">
                    Stage {currentStage + 1} of {stages.length}
                  </span>
                  <div className="h-1.5 w-24 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyber-glow transition-all duration-300"
                      style={{ width: `${((currentStage + 1) / stages.length) * 100}%` }}
                    />
                  </div>
                </div>
                <p className="text-lg text-white font-medium leading-relaxed">
                  {stages[currentStage]?.text}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {stages[currentStage]?.options.map((option, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(option.value)}
                    disabled={submitting}
                    className="flex flex-col text-left p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-cyber-glow/5 hover:border-cyber-glow/40 transition disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <span className="font-semibold text-white group-hover:text-cyber-glow transition duration-200">
                      {option.label}
                    </span>
                    <span className="mt-2 text-xs text-cyber-mist">
                      {option.riskDelta > 0 ? 'Increases simulated risk profile' : 'Maintains secure path'}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="outcome-details"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div
                className={`rounded-3xl border p-6 text-center ${
                  outcome.severity === 'Critical' || outcome.severity === 'High'
                    ? 'border-cyber-alert/30 bg-cyber-alert/5'
                    : 'border-cyber-safe/30 bg-cyber-safe/5'
                }`}
              >
                <span className="text-xs uppercase tracking-widest text-cyber-mist/70">Simulation Result</span>
                <h3 className="mt-2 font-display text-4xl font-bold text-white">
                  {outcome.outcome}
                </h3>
                <p className="mt-4 text-cyber-mist max-w-2xl mx-auto leading-relaxed">
                  {outcome.description}
                </p>
                <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/30 px-5 py-2">
                  <span className="text-sm text-cyber-mist">Simulated Risk Delta:</span>
                  <span
                    className={`font-semibold ${
                      outcome.riskAdded > 0 ? 'text-cyber-alert' : 'text-cyber-safe'
                    }`}
                  >
                    +{outcome.riskAdded} pts
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-display text-xl font-bold text-white mb-4">Fraud Chain Progression</h4>
                <div className="relative border-l border-white/10 pl-6 ml-4 space-y-6">
                  {outcome.chain?.map((step, idx) => (
                    <div key={idx} className="relative">
                      <div
                        className={`absolute -left-[31px] top-1.5 h-4.5 w-4.5 rounded-full border-2 bg-black ${
                          idx === outcome.chain.length - 1
                            ? outcome.severity === 'Critical' || outcome.severity === 'High'
                              ? 'border-cyber-alert'
                              : 'border-cyber-safe'
                            : 'border-white/20'
                        }`}
                      />
                      <span className="text-xs text-cyber-mist">Step {idx + 1}</span>
                      <p className="mt-1 font-semibold text-white">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-white/10 pt-6">
                <p className="text-xs text-cyber-mist">
                  Simulate again to explore alternative security pathways.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-full border border-cyber-glow/40 bg-cyber-glow/10 px-6 py-3 font-semibold text-cyber-glow transition hover:bg-cyber-glow/15"
                >
                  Restart Simulation
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <div className="mt-6 rounded-2xl border border-cyber-alert/30 bg-cyber-alert/10 px-4 py-3 text-sm text-cyber-alert">
            {error}
          </div>
        )}
      </div>
    </section>
  )
}
