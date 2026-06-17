function reportHeadline(level) {
  if (level === 'High') {
    return 'The simulated footprint shows multiple takeover and fraud escalation paths that should be treated as urgent.'
  }

  if (level === 'Medium') {
    return 'The current setup is workable, but several identity-linked recovery paths still create meaningful fraud risk.'
  }

  return 'The simulated footprint is comparatively constrained, with fewer obvious takeover and loan fraud pathways.'
}

export default function IdentityRiskReport({ assessment }) {
  const { risk, profile, telemetry } = assessment

  return (
    <section className="glass-panel rounded-[32px] p-6 soft-ring sm:p-8">
      <div className="section-title">Summary Narrative</div>
      <div className="mt-2 font-display text-3xl font-bold text-white">What this assessment means</div>
      <p className="mt-4 max-w-4xl text-sm leading-8 text-cyber-mist">{reportHeadline(risk.level)}</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <article className="rounded-3xl border border-white/10 bg-black/15 p-5">
          <div className="text-xs uppercase tracking-[0.2em] text-cyber-mist/70">Recovery protection</div>
          <div className="mt-3 font-display text-2xl font-bold text-white">{telemetry.recoveryChannelStrength === 'Strong' ? 'High Security' : 'Low Security'}</div>
          <p className="mt-3 text-sm leading-7 text-cyber-mist">
            {profile.has2FA
              ? 'Two-step verification is active, helping protect recovery and login workflows.'
              : 'Recovery and verification remain easier to intercept without two-step verification.'}
          </p>
        </article>

        <article className="rounded-3xl border border-white/10 bg-black/15 p-5">
          <div className="text-xs uppercase tracking-[0.2em] text-cyber-mist/70">Unused account risk</div>
          <div className="mt-3 font-display text-2xl font-bold text-white">{telemetry.inactiveExposureWindow === 'Open' ? 'At Risk' : 'Protected'}</div>
          <p className="mt-3 text-sm leading-7 text-cyber-mist">
            {profile.hasInactiveAccounts
              ? 'Unused accounts can be exploited quietly because they are rarely checked or monitored.'
              : 'No unused account risk was declared in the current simulation.'}
          </p>
        </article>

        <article className="rounded-3xl border border-white/10 bg-black/15 p-5">
          <div className="text-xs uppercase tracking-[0.2em] text-cyber-mist/70">Payment applications</div>
          <div className="mt-3 font-display text-2xl font-bold text-white">{profile.upiApps} linked apps</div>
          <p className="mt-3 text-sm leading-7 text-cyber-mist">
            Your profile has {profile.upiApps} simulated payment app(s) configured, which represents your payment approval footprint.
          </p>
        </article>
      </div>
    </section>
  )
}
