const severityClassName = {
  critical: 'border-cyber-alert/30 bg-cyber-alert/10 text-cyber-alert',
  high: 'border-orange-400/30 bg-orange-400/10 text-orange-300',
  medium: 'border-cyber-amber/30 bg-cyber-amber/10 text-cyber-amber',
  low: 'border-cyber-safe/30 bg-cyber-safe/10 text-cyber-safe',
}

export default function AlertPanel({ alerts }) {
  return (
    <section className="glass-panel rounded-3xl p-6 soft-ring">
      <div className="section-title">Live Alerts</div>
      <div className="mt-2 font-display text-2xl font-bold text-white">Identity security findings</div>

      <div className="mt-5 space-y-3">
        {alerts.map((alert) => (
          <article key={alert.title} className="rounded-2xl border border-white/10 bg-black/15 p-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.2em] ${severityClassName[alert.severity]}`}>
                {alert.severity}
              </span>
              <h3 className="font-semibold text-white">{alert.title}</h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-cyber-mist">{alert.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
