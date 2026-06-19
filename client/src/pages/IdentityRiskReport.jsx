export default function IdentityRiskReport({ riskSnapshot, patterns, recommendations }) {
  const submittedDate = riskSnapshot?.submittedAt
    ? new Date(riskSnapshot.submittedAt).toLocaleString()
    : 'Just now'

  return (
    <section className="glass-panel rounded-[32px] p-6 soft-ring sm:p-8">
      <div className="section-title">Investigation Summary</div>
      <div className="mt-2 font-display text-3xl font-bold text-white">Demo-ready report snapshot</div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-black/15 p-5">
          <div className="text-xs uppercase tracking-[0.2em] text-cyber-mist/70">Submitted</div>
          <div className="mt-3 text-sm leading-7 text-white">{submittedDate}</div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-black/15 p-5">
          <div className="text-xs uppercase tracking-[0.2em] text-cyber-mist/70">Detected Patterns</div>
          <div className="mt-3 text-3xl font-bold text-white">{patterns.length}</div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-black/15 p-5">
          <div className="text-xs uppercase tracking-[0.2em] text-cyber-mist/70">Recommendations</div>
          <div className="mt-3 text-3xl font-bold text-white">{recommendations.length}</div>
        </div>
      </div>
    </section>
  )
}
