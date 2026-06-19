import { useEffect, useState } from 'react'

export default function ThreatSimulation({ scenario }) {
  const [activeStep, setActiveStep] = useState(0)

  // Reset active step when scenario changes
  useEffect(() => {
    setActiveStep(0)
  }, [scenario?.id])

  if (!scenario) {
    return null
  }

  // Render visual mockups based on scenario ID and active step
  function renderMockup() {
    const stepNum = activeStep + 1

    if (scenario.id === 'sim-swap') {
      return (
        <div className="relative h-full w-full flex flex-col justify-between p-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="text-[10px] uppercase tracking-wider text-cyber-glow font-display">SIM Swap Simulation Console</span>
            <span className="flex h-2 w-2 rounded-full bg-cyber-alert animate-pulse" />
          </div>

          {/* Interactive Screen Content */}
          <div className="flex-1 flex items-center justify-center py-4">
            {stepNum === 1 && (
              <div className="w-full space-y-3">
                <div className="text-xs text-cyber-mist font-mono">// Gathering target intelligence...</div>
                <div className="rounded-xl border border-white/5 bg-black/30 p-4 space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-white/60">Target:</span>
                    <span className="text-white">demo.user@example.com</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-white/60">Mobile (Linked):</span>
                    <span className="text-white">+91 98765 *****</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-white/60">Identified Telecom:</span>
                    <span className="text-cyber-glow">SimuTel India</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-[10px] text-cyber-alert bg-cyber-alert/10 px-2 py-0.5 rounded border border-cyber-alert/20 font-mono">Identity Fragment Found</span>
                  <span className="text-[10px] text-cyber-amber bg-cyber-amber/10 px-2 py-0.5 rounded border border-cyber-amber/20 font-mono">Social Clues Gathered</span>
                </div>
              </div>
            )}

            {stepNum === 2 && (
              <div className="w-full space-y-4">
                <div className="text-xs text-cyber-mist font-mono">// Sending fraudulent porting request...</div>
                <div className="grid grid-cols-2 gap-4">
                  {/* Victim's Device Status */}
                  <div className="rounded-xl border border-cyber-alert/20 bg-cyber-alert/5 p-3 text-center space-y-2">
                    <div className="text-[10px] uppercase text-cyber-mist">Victim SIM Status</div>
                    <div className="text-xs font-bold text-cyber-alert">NO SERVICE</div>
                    <div className="flex justify-center gap-0.5">
                      <div className="h-3 w-1 bg-white/10 rounded-full" />
                      <div className="h-3 w-1 bg-white/10 rounded-full" />
                      <div className="h-3 w-1 bg-white/10 rounded-full" />
                      <div className="h-3 w-1 bg-white/10 rounded-full" />
                    </div>
                    <div className="text-[9px] text-cyber-mist/70">Signal Blocked</div>
                  </div>
                  {/* Attacker's Device Status */}
                  <div className="rounded-xl border border-cyber-safe/30 bg-cyber-safe/5 p-3 text-center space-y-2">
                    <div className="text-[10px] uppercase text-cyber-mist">Attacker SIM Status</div>
                    <div className="text-xs font-bold text-cyber-safe">CONNECTED</div>
                    <div className="flex justify-center gap-0.5">
                      <div className="h-3 w-1 bg-cyber-safe rounded-full" />
                      <div className="h-3 w-1 bg-cyber-safe rounded-full" />
                      <div className="h-3 w-1 bg-cyber-safe rounded-full" />
                      <div className="h-3 w-1 bg-cyber-safe rounded-full" />
                    </div>
                    <div className="text-[9px] text-cyber-safe/70">Number Cloned</div>
                  </div>
                </div>
              </div>
            )}

            {stepNum === 3 && (
              <div className="flex flex-col items-center justify-center text-center space-y-3 w-full">
                <div className="text-xs text-cyber-mist font-mono">// Intercepting recovery credentials...</div>
                
                {/* Phone mockup for OTP */}
                <div className="w-56 rounded-2xl border border-white/10 bg-black/45 p-3 shadow-glow relative">
                  <div className="h-4 w-12 bg-white/10 rounded-full mx-auto mb-3" />
                  <div className="rounded-xl bg-white/[0.03] p-3 text-left space-y-2 border border-white/5 animate-pulse">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-cyber-glow">SECURE-BANK SMS</span>
                      <span className="text-[9px] text-cyber-mist">Just now</span>
                    </div>
                    <p className="text-xs text-white">Your verification OTP is <strong className="text-cyber-amber font-mono font-bold">593810</strong>. Do not share this with anyone.</p>
                  </div>
                </div>
              </div>
            )}

            {stepNum === 4 && (
              <div className="w-full space-y-3 text-center">
                <div className="text-xs text-cyber-mist font-mono">// Accessing accounts...</div>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cyber-alert/20 text-cyber-alert border border-cyber-alert/35 animate-bounce">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="text-sm font-bold text-white uppercase tracking-wide">Financial App Takeover Successful</div>
                <p className="text-[11px] text-cyber-mist px-4 leading-normal">
                  Attacker bypasses 2FA checks using the intercepted mobile OTP, resetting passwords to drain funds.
                </p>
              </div>
            )}
          </div>

          {/* Footer Console Log */}
          <div className="border-t border-white/5 pt-3">
            <div className="flex justify-between text-[9px] font-mono text-cyber-mist/60">
              <span>SIM STATE: STAGE_{stepNum}</span>
              <span>VER_1.0.2</span>
            </div>
          </div>
        </div>
      )
    }

    if (scenario.id === 'identity-theft') {
      return (
        <div className="relative h-full w-full flex flex-col justify-between p-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="text-[10px] uppercase tracking-wider text-cyber-glow font-display">Identity Theft Assembly</span>
            <span className="flex h-2 w-2 rounded-full bg-cyber-amber animate-pulse" />
          </div>

          {/* Interactive Screen Content */}
          <div className="flex-1 flex items-center justify-center py-4">
            {stepNum === 1 && (
              <div className="w-full space-y-2">
                <div className="text-xs text-cyber-mist font-mono">// Scanning breached files...</div>
                <div className="rounded-xl border border-white/5 bg-black/35 p-3 font-mono text-[11px] text-cyber-alert space-y-1">
                  <div>&gt; MATCH_FOUND: aadhaar_records_v4.db</div>
                  <div>&gt; RECORD: "Sanjeev Chaurasia"</div>
                  <div>&gt; EXPOSED: DOB, UID, Gender, Address</div>
                  <div className="text-cyber-safe">&gt; RECOVERY_KEYS: Matched to SIM carrier</div>
                </div>
              </div>
            )}

            {stepNum === 2 && (
              <div className="w-full flex justify-center">
                {/* Mock Card Assembly */}
                <div className="w-60 rounded-xl border border-white/15 bg-white/[0.04] p-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-cyber-amber/10 rounded-full blur-xl" />
                  <div className="flex gap-3">
                    <div className="h-10 w-8 bg-white/10 rounded border border-white/10 flex items-center justify-center shrink-0">
                      <svg className="h-6 w-6 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="h-3 w-20 bg-white/20 rounded" />
                      <div className="h-2 w-28 bg-white/10 rounded" />
                      <div className="h-2 w-14 bg-white/10 rounded" />
                    </div>
                  </div>
                  <div className="mt-4 border-t border-white/10 pt-3 flex justify-between items-center">
                    <div className="h-2 w-24 bg-cyber-amber/35 rounded animate-pulse" />
                    <span className="text-[9px] bg-cyber-amber/25 text-cyber-amber px-2 py-0.5 rounded font-mono">Synthesizing ID</span>
                  </div>
                </div>
              </div>
            )}

            {stepNum === 3 && (
              <div className="w-full space-y-3">
                <div className="text-xs text-cyber-mist font-mono">// Submitting to fintech onboarding...</div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-3 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span>Onboarding Target:</span>
                    <span className="text-white font-medium">QuickWallet Corp</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>eKYC Submission:</span>
                    <span className="text-cyber-safe font-semibold">VALIDATED</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Facial Liveness Mock:</span>
                    <span className="text-cyber-safe">Bypassed (OCR Only)</span>
                  </div>
                </div>
              </div>
            )}

            {stepNum === 4 && (
              <div className="w-full space-y-3 text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cyber-alert/20 text-cyber-alert border border-cyber-alert/35">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="text-sm font-bold text-white uppercase tracking-wide">Identity Exploitation Exposure</div>
                <p className="text-[11px] text-cyber-mist px-2 leading-relaxed">
                  Fraudsters spin up dozens of wallets, SIM cards, or credit applications. The real victim faces debt collections and tax audits years later.
                </p>
              </div>
            )}
          </div>

          {/* Footer Console Log */}
          <div className="border-t border-white/5 pt-3">
            <div className="flex justify-between text-[9px] font-mono text-cyber-mist/60">
              <span>ASSEMBLY_STATE: STEP_{stepNum}</span>
              <span>ID_SEC_ANALYZE</span>
            </div>
          </div>
        </div>
      )
    }

    if (scenario.id === 'loan-fraud') {
      return (
        <div className="relative h-full w-full flex flex-col justify-between p-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="text-[10px] uppercase tracking-wider text-cyber-glow font-display">Instant Credit Exploiter</span>
            <span className="flex h-2 w-2 rounded-full bg-cyber-glow animate-pulse" />
          </div>

          {/* Interactive Screen Content */}
          <div className="flex-1 flex items-center justify-center py-4">
            {stepNum === 1 && (
              <div className="w-full space-y-3">
                <div className="text-xs text-cyber-mist font-mono">// Matching credit profiles...</div>
                <div className="rounded-xl border border-white/5 bg-black/35 p-3 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-cyber-mist">Victim Profile:</span>
                    <span className="text-white">Active Taxpayer</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyber-mist">Credit Rating:</span>
                    <span className="text-cyber-safe font-bold">Excellent (790)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyber-mist">Target Platform:</span>
                    <span className="text-white">SimuCredit App</span>
                  </div>
                </div>
              </div>
            )}

            {stepNum === 2 && (
              <div className="w-full space-y-3">
                <div className="text-xs text-cyber-mist font-mono">// Submitting loan request...</div>
                <div className="rounded-xl border border-cyber-amber/25 bg-cyber-amber/5 p-4 text-center space-y-1">
                  <div className="text-[10px] uppercase text-cyber-mist">Requesting Micro-Credit</div>
                  <div className="text-2xl font-bold font-display text-white">₹50,000</div>
                  <div className="text-xs text-cyber-amber font-mono font-medium">Status: Awaiting Verification</div>
                </div>
              </div>
            )}

            {stepNum === 3 && (
              <div className="w-full space-y-3">
                <div className="text-xs text-cyber-mist font-mono">// Intercepting KYC OTP challenge...</div>
                <div className="flex justify-center items-center gap-2">
                  <div className="rounded-xl border border-cyber-alert/20 bg-cyber-alert/15 px-3 py-2 text-center animate-pulse">
                    <span className="text-[9px] uppercase block text-cyber-mist">OTP Intercepted</span>
                    <span className="text-base font-bold font-mono text-white">938120</span>
                  </div>
                  <svg className="h-5 w-5 text-cyber-glow animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  <div className="rounded-xl border border-cyber-safe/20 bg-cyber-safe/15 px-3 py-2 text-center">
                    <span className="text-[9px] uppercase block text-cyber-mist">System Entry</span>
                    <span className="text-base font-bold font-mono text-white">APPROVED</span>
                  </div>
                </div>
              </div>
            )}

            {stepNum === 4 && (
              <div className="w-full space-y-3">
                <div className="text-xs text-cyber-mist font-mono">// Draining funds instantly...</div>
                <div className="rounded-xl border border-white/10 bg-black/45 p-3 space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-cyber-safe">
                    <span>Approved Amt:</span>
                    <span>+₹50,000</span>
                  </div>
                  <div className="flex justify-between text-cyber-alert">
                    <span>Transfer to Mule #842:</span>
                    <span>-₹50,000</span>
                  </div>
                  <div className="border-t border-white/5 pt-1.5 flex justify-between text-[10px]">
                    <span>Current Wallet Balance:</span>
                    <span>₹0.00</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Console Log */}
          <div className="border-t border-white/5 pt-3">
            <div className="flex justify-between text-[9px] font-mono text-cyber-mist/60">
              <span>LOAN_ROUTE: DISBURSE_STAGE_{stepNum}</span>
              <span>VERIFIED_BY_OTP</span>
            </div>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      {/* Left panel: step selector timeline */}
      <div className="glass-panel rounded-[32px] p-6 soft-ring sm:p-8 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="section-title">Threat Simulation</div>
              <h3 className="mt-2 font-display text-3xl font-bold text-white">{scenario.title}</h3>
              <p className="mt-3 text-sm leading-7 text-cyber-mist">{scenario.summary}</p>
            </div>
            <div className="rounded-full border border-cyber-alert/30 bg-cyber-alert/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cyber-alert shrink-0">
              {scenario.impactLevel} Impact
            </div>
          </div>

          {/* Steps Timeline Selector */}
          <div className="mt-8 space-y-3">
            {scenario.steps.map((step, index) => {
              const isActive = index === activeStep
              return (
                <button
                  key={step}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  className={`w-full rounded-2xl border text-left p-4 transition-all duration-300 ${isActive ? 'border-cyber-glow/45 bg-cyber-glow/5 shadow-sm' : 'border-white/5 bg-black/10 hover:border-white/10 hover:bg-black/20'}`}
                >
                  <div className="flex items-start gap-4">
                    <span 
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border text-xs font-bold transition-colors duration-300 ${isActive ? 'border-cyber-glow bg-cyber-glow/15 text-cyber-glow' : 'border-white/10 bg-white/[0.02] text-cyber-mist'}`}
                    >
                      {index + 1}
                    </span>
                    <p className={`text-sm leading-6 transition-colors duration-300 ${isActive ? 'text-white font-medium' : 'text-cyber-mist'}`}>
                      {step}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Final Impact block */}
        <div className="mt-6 rounded-2xl border border-cyber-alert/20 bg-cyber-alert/5 p-4.5">
          <div className="text-[11px] uppercase tracking-wider text-cyber-alert font-bold">Threat Target Impact</div>
          <p className="mt-2 text-xs leading-normal text-white">{scenario.finalImpact}</p>
        </div>
      </div>

      {/* Right panel: Visual command console simulator */}
      <div className="glass-panel rounded-[32px] soft-ring border-white/10 bg-cyber-ink/90 overflow-hidden min-h-[380px] flex flex-col justify-between">
        {/* Top title bar */}
        <div className="bg-black/40 px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-cyber-glow" />
            <span className="text-xs font-bold text-white uppercase tracking-wider font-display">Simulated Attack Terminal</span>
          </div>
          <div className="text-[10px] text-cyber-mist/50 font-mono">NODE_SIM_ONLINE</div>
        </div>

        {/* Rendered mockup */}
        <div className="flex-1 bg-gradient-to-b from-cyber-panel/50 to-black/30">
          {renderMockup()}
        </div>

        {/* Bottom bar */}
        <div className="bg-black/50 px-6 py-3 border-t border-white/5 text-[9px] font-mono text-cyber-mist/40 flex justify-between">
          <span>SECURE PROTOCOL MODE</span>
          <span>SYSTEM_DEMO_VER_2026</span>
        </div>
      </div>
    </section>
  )
}
