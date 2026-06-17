const priorityClassName = {
  critical: 'text-cyber-alert',
  high: 'text-orange-300',
  medium: 'text-cyber-amber',
  low: 'text-cyber-safe',
}

export default function RecommendationList({ recommendations }) {
  return (
    <section className="glass-panel rounded-3xl p-6 soft-ring">
      <div className="section-title">Recommendations</div>
      <div className="mt-2 font-display text-2xl font-bold text-white">Actionable next steps</div>

      <div className="mt-5 space-y-3">
        {recommendations.map((item) => (
          <article key={item.title} className="rounded-2xl border border-white/10 bg-black/15 p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-semibold text-white">{item.title}</h3>
              <span className={`text-xs uppercase tracking-[0.2em] ${priorityClassName[item.priority]}`}>
                {item.priority}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-cyber-mist">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
