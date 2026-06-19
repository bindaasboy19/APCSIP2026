import { useEffect, useRef, useState } from 'react'

export default function FraudFlowVisualizer({ steps }) {
  const [activeStep, setActiveStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const timerRef = useRef(null)

  // Manage automatic playback timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setActiveStep((previous) => (previous + 1) % steps.length)
      }, 3000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isPlaying, steps.length])

  function handlePlayToggle() {
    setIsPlaying(!isPlaying)
  }

  function handleNext() {
    setIsPlaying(false)
    setActiveStep((previous) => (previous + 1) % steps.length)
  }

  function handlePrev() {
    setIsPlaying(false)
    setActiveStep((previous) => (previous - 1 + steps.length) % steps.length)
  }

  function handleReset() {
    setIsPlaying(false)
    setActiveStep(0)
  }

  if (!steps || steps.length === 0) {
    return null
  }

  return (
    <section className="glass-panel rounded-[32px] p-6 soft-ring sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="section-title">Interactive Attack Flow</div>
          <div className="mt-2 font-display text-3xl font-bold text-white">Anatomy of a digital identity breach</div>
          <p className="mt-2 text-sm text-cyber-mist">
            Select steps or run the simulator to visualize the propagation path of identity-based cybercrime.
          </p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/35 p-1.5 shrink-0">
          <button
            type="button"
            onClick={handlePrev}
            className="flex h-9 w-9 items-center justify-center rounded-full text-cyber-mist transition hover:bg-white/[0.08] hover:text-white"
            title="Previous Step"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            type="button"
            onClick={handlePlayToggle}
            className={`flex h-9 px-4 items-center justify-center gap-2 rounded-full font-semibold text-xs uppercase tracking-wider transition ${isPlaying ? 'bg-cyber-glow/15 text-cyber-glow border border-cyber-glow/30' : 'text-cyber-mist hover:bg-white/[0.08] hover:text-white'}`}
          >
            {isPlaying ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-glow opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-glow"></span>
                </span>
                <span>Pause</span>
              </>
            ) : (
              <span>Simulate</span>
            )}
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="flex h-9 w-9 items-center justify-center rounded-full text-cyber-mist transition hover:bg-white/[0.08] hover:text-white"
            title="Next Step"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="flex h-9 w-9 items-center justify-center rounded-full text-cyber-mist transition hover:bg-white/[0.08] hover:text-cyber-alert"
            title="Reset Flow"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18V4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Sequential Flowchart */}
      <div className="mt-8 overflow-x-auto pb-4 scrollbar-thin">
        <div className="flex items-center min-w-[760px] justify-between px-4 relative">
          {/* Global Progress Track Line */}
          <div className="absolute top-[28px] left-[50px] right-[50px] h-[3px] bg-white/10 -z-10" />
          
          {/* Animated Active Track Line */}
          <div 
            className="absolute top-[28px] left-[50px] h-[3px] bg-gradient-to-r from-cyber-glow to-cyber-safe transition-all duration-500 -z-10"
            style={{ 
              width: `${(activeStep / (steps.length - 1)) * 90}%`,
              boxShadow: '0 0 8px rgba(30, 227, 207, 0.5)'
            }}
          />

          {steps.map((step, index) => {
            const isCompleted = index < activeStep
            const isActive = index === activeStep
            const isFuture = index > activeStep

            let nodeBorderClass = 'border-white/10 bg-cyber-ink text-cyber-mist'
            if (isActive) {
              nodeBorderClass = 'border-cyber-glow bg-cyber-glow/10 text-cyber-glow ring-4 ring-cyber-glow/20'
            } else if (isCompleted) {
              nodeBorderClass = 'border-cyber-safe bg-cyber-safe/10 text-cyber-safe'
            }

            return (
              <div 
                key={step.title}
                className="flex flex-col items-center text-center w-[120px] shrink-0 group cursor-pointer"
                onClick={() => {
                  setIsPlaying(false)
                  setActiveStep(index)
                }}
              >
                {/* Node bubble */}
                <div 
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl border font-display text-lg font-bold shadow-md transition-all duration-300 ${nodeBorderClass} group-hover:scale-105`}
                >
                  {isCompleted ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span>0{index + 1}</span>
                  )}
                </div>

                {/* Node title */}
                <div className={`mt-3.5 text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${isActive ? 'text-cyber-glow' : isCompleted ? 'text-cyber-safe' : 'text-cyber-mist/80 group-hover:text-white'}`}>
                  {step.title}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Stage Detail Card */}
      <div className="mt-8 rounded-[24px] border border-cyber-glow/20 bg-cyber-glow/5 p-6 backdrop-blur-md transition-all duration-500 relative overflow-hidden">
        {/* Subtle decorative glow in card corners */}
        <div className="absolute -top-12 -right-12 w-24 h-24 bg-cyber-glow/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-cyber-safe/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="badge-chip border-cyber-glow/25 text-cyber-glow text-[10px]">
              Stage {activeStep + 1} of {steps.length} • {steps[activeStep].title}
            </span>
            <h3 className="font-display text-2xl font-bold text-white tracking-wide mt-2">
              {steps[activeStep].title}
            </h3>
            <p className="text-sm leading-7 text-cyber-mist max-w-3xl">
              {steps[activeStep].description}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-black/25 px-5 py-4 rounded-2xl border border-white/5 self-start md:self-auto shrink-0">
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-[0.2em] text-cyber-mist/60">Simulated Threat Level</div>
              <div className="text-base font-bold text-white mt-1">
                {activeStep <= 1 ? 'Exposure Phase' : activeStep <= 3 ? 'Exploitation Phase' : 'Extraction Phase'}
              </div>
            </div>
            <span className={`h-3 w-3 rounded-full animate-pulse ${activeStep <= 1 ? 'bg-cyber-glow' : activeStep <= 3 ? 'bg-cyber-amber' : 'bg-cyber-alert'}`} />
          </div>
        </div>
      </div>
    </section>
  )
}
