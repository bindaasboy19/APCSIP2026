function toneClassName(level) {
  if (level === 'High') return 'border-cyber-alert/40 bg-cyber-alert/10 text-cyber-alert'
  if (level === 'Medium') return 'border-cyber-amber/40 bg-cyber-amber/10 text-cyber-amber'
  return 'border-cyber-safe/40 bg-cyber-safe/10 text-cyber-safe'
}

export default function RiskCard({ risk, detections }) {
  return (
    <section className="glass-panel rounded-[32px] p-6 soft-ring sm:p-8">
      <div className="section-title">Risk Score</div>
      <div className="mt-3 flex flex-wrap items-start justify-between gap-6">
        <div>
          <div className="font-display text-6xl font-bold text-white">{risk.score}</div>
          <div className={`mt-3 inline-flex rounded-full border px-4 py-2 text-sm font-semibold ${toneClassName(risk.level)}`}>
            {risk.level} Risk
          </div>
        </div>

        <div className="max-w-xl text-sm leading-7 text-cyber-mist">
          Transparent scoring formula:
          <div className="mt-2 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white">{risk.formula}</div>
        </div>
      </div>

      <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full ${risk.level === 'High' ? 'bg-cyber-alert' : risk.level === 'Medium' ? 'bg-cyber-amber' : 'bg-cyber-safe'}`}
          style={{ width: `${risk.visualScore}%` }}
        />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          { label: 'Identity Misuse', value: detections.identityMisuseRisk },
          { label: 'Mule Risk', value: detections.muleRisk },
          { label: 'SIM Swap Risk', value: detections.simSwapRisk },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/10 bg-black/15 p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-cyber-mist/70">{item.label}</div>
            <div className={`mt-3 inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${toneClassName(item.value)}`}>
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
