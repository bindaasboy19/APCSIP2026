function impactClassName(level) {
  if (level === 'High') return 'border-cyber-alert/40 bg-cyber-alert/10 text-cyber-alert'
  if (level === 'Medium') return 'border-cyber-amber/40 bg-cyber-amber/10 text-cyber-amber'
  return 'border-cyber-safe/40 bg-cyber-safe/10 text-cyber-safe'
}

export default function ThreatCard({ scenario, active, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(scenario.id)}
      className={`glass-panel rounded-[28px] p-5 text-left soft-ring transition ${active ? 'border-cyber-glow/35 bg-cyber-glow/10' : 'hover:border-white/15 hover:bg-white/[0.06]'}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="font-display text-2xl font-bold text-white">{scenario.title}</div>
        <span className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em] ${impactClassName(scenario.impactLevel)}`}>
          {scenario.impactLevel}
        </span>
      </div>
      <p className="mt-4 text-sm leading-7 text-cyber-mist">{scenario.summary}</p>
    </button>
  )
}
