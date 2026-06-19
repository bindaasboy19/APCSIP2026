function severityClassName(severity) {
  if (severity === 'High') return 'border-cyber-alert/40 bg-cyber-alert/10 text-cyber-alert'
  if (severity === 'Medium') return 'border-cyber-amber/40 bg-cyber-amber/10 text-cyber-amber'
  return 'border-cyber-safe/40 bg-cyber-safe/10 text-cyber-safe'
}

export default function PatternList({ patterns }) {
  return (
    <section className="glass-panel rounded-[32px] p-6 soft-ring sm:p-8">
      <div className="section-title">Detected Patterns</div>
      <div className="mt-5 space-y-4">
        {patterns.map((pattern) => (
          <article key={pattern.id} className="rounded-3xl border border-white/10 bg-black/15 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="text-lg font-semibold text-white">{pattern.title}</h3>
              <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${severityClassName(pattern.severity)}`}>
                {pattern.severity}
              </span>
            </div>
            <p className="mt-3 text-sm leading-7 text-cyber-mist">{pattern.explanation}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
