export default function MetricCard({ label, value, hint }) {
  return (
    <div className="glass-panel rounded-2xl p-4 soft-ring">
      <div className="text-xs uppercase tracking-[0.24em] text-cyber-mist/70">{label}</div>
      <div className="mt-3 font-display text-2xl font-bold text-white">{value}</div>
      {hint ? <div className="mt-2 text-sm text-cyber-mist">{hint}</div> : null}
    </div>
  )
}
