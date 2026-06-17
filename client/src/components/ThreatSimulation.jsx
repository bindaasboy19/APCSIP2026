import { useEffect, useRef, useState } from 'react'

export default function ThreatSimulation({ scenario, runKey }) {
  const [activeStep, setActiveStep] = useState(-1)
  const [complete, setComplete] = useState(false)
  const timersRef = useRef([])

  useEffect(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer))
    timersRef.current = []
    setActiveStep(-1)
    setComplete(false)

    if (!scenario || !runKey) {
      return undefined
    }

    scenario.attackFlow.forEach((_, index) => {
      const timer = setTimeout(() => {
        setActiveStep(index)
      }, index * 1200)

      timersRef.current.push(timer)
    })

    const completionTimer = setTimeout(() => {
      setComplete(true)
    }, scenario.attackFlow.length * 1200)

    timersRef.current.push(completionTimer)

    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer))
      timersRef.current = []
    }
  }, [runKey, scenario])

  return (
    <section className="glass-panel rounded-[28px] p-6 soft-ring sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="section-title">Fraud Playback</div>
          <div className="mt-2 font-display text-3xl font-bold text-white">{scenario.title}</div>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-cyber-mist">{scenario.summary}</p>
        </div>
        <div
          className={`rounded-full border px-4 py-2 text-sm font-semibold ${scenario.exposureLevel === 'High' ? 'border-cyber-alert/40 bg-cyber-alert/10 text-cyber-alert' : scenario.exposureLevel === 'Medium' ? 'border-cyber-amber/40 bg-cyber-amber/10 text-cyber-amber' : 'border-cyber-safe/40 bg-cyber-safe/10 text-cyber-safe'}`}
        >
          Likelihood score: {scenario.exposureScore}
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {scenario.attackFlow.map((step, index) => {
          const isVisible = activeStep >= index
          const isComplete = activeStep > index || complete

          return (
            <article
              key={step.title}
              className={`rounded-3xl border p-5 transition-all duration-500 ${isVisible ? 'translate-y-0 border-white/10 bg-black/15 opacity-100' : 'translate-y-2 border-white/5 bg-black/10 opacity-35'}`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border text-sm font-bold ${isComplete ? 'border-cyber-glow/40 bg-cyber-glow/10 text-cyber-glow' : 'border-white/10 bg-white/[0.03] text-cyber-mist'}`}
                >
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-semibold text-white">{step.title}</h3>
                    <span className="text-xs uppercase tracking-[0.2em] text-cyber-mist/70">
                      {isComplete ? 'Executed' : isVisible ? 'In progress' : 'Queued'}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-cyber-mist">{step.description}</p>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {activeStep < 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-white/15 bg-white/[0.02] px-5 py-4 text-sm text-cyber-mist">
          Press <span className="font-semibold text-white">Run simulation</span> to animate this attack path step by step.
        </div>
      ) : null}

      {complete ? (
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-cyber-alert/20 bg-cyber-alert/10 p-5">
            <div className="section-title">Potential Impact</div>
            <ul className="mt-4 space-y-3">
              {scenario.impact.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-white">
                  <span className="h-2.5 w-2.5 rounded-full bg-cyber-alert" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-cyber-safe/20 bg-cyber-safe/10 p-5">
            <div className="section-title">Prevention Steps</div>
            <ul className="mt-4 space-y-3">
              {scenario.mitigation.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-white">
                  <span className="h-2.5 w-2.5 rounded-full bg-cyber-safe" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </section>
  )
}
