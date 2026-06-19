export default function InsightBox({ insights }) {
  return (
    <section className="glass-panel rounded-[32px] p-6 soft-ring sm:p-8">
      <div className="section-title">Investigation Insights</div>
      <div className="mt-5 space-y-4">
        {insights.map((insight) => (
          <article key={insight.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="text-lg font-semibold text-white">{insight.title}</h3>
            <p className="mt-3 text-sm leading-7 text-cyber-mist">{insight.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
