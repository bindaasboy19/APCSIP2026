import { Link } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import InsightBox from '../components/InsightBox.jsx'
import PatternList from '../components/PatternList.jsx'
import RiskCard from '../components/RiskCard.jsx'
import FraudFlowVisualizer from '../components/FraudFlowVisualizer.jsx'
import IdentityRiskReport from './IdentityRiskReport.jsx'

const chartColors = ['#1ee3cf', '#ffb84d', '#ff5d73']

function alertClassName(severity) {
  if (severity === 'critical') return 'border-cyber-alert/30 bg-cyber-alert/10 text-cyber-alert'
  if (severity === 'high') return 'border-cyber-amber/30 bg-cyber-amber/10 text-cyber-amber'
  return 'border-cyber-safe/30 bg-cyber-safe/10 text-cyber-safe'
}

function recommendationClassName(priority) {
  if (priority === 'high') return 'border-cyber-alert/25 bg-cyber-alert/10'
  if (priority === 'medium') return 'border-cyber-amber/25 bg-cyber-amber/10'
  return 'border-cyber-safe/25 bg-cyber-safe/10'
}

export default function IdentityRiskDashboard({ riskSnapshot, patterns, insights, recommendations }) {
  const { risk, detections, alerts, fraudFlow, charts, submittedAt, persistenceMode } = riskSnapshot

  return (
    <div className="space-y-6">
      <section className="glass-panel rounded-[32px] p-6 soft-ring sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <div className="section-title">Fraud Intelligence Dashboard</div>
            <div className="mt-2 font-display text-4xl font-bold text-white">Investigation-style identity risk view</div>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-cyber-mist">
              This dashboard shows how a simple digital identity footprint can translate into misuse risk, mule-account exposure, and SIM swap vulnerability.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm text-cyber-mist">
            <span className="badge-chip">Stored in {persistenceMode} mode</span>
            <span className="badge-chip">Updated {new Date(submittedAt).toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            to="/input"
            className="rounded-full border border-cyber-glow/30 bg-cyber-glow/10 px-5 py-2.5 font-semibold text-cyber-glow transition hover:bg-cyber-glow/15"
          >
            Re-run assessment
          </Link>
          <Link
            to="/threats"
            className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 font-semibold text-white transition hover:bg-white/[0.08]"
          >
            View threat simulations
          </Link>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <RiskCard risk={risk} detections={detections} />

        <section className="glass-panel rounded-[32px] p-6 soft-ring sm:p-8">
          <div className="section-title">Alerts</div>
          <div className="mt-5 space-y-4">
            {alerts.map((alert) => (
              <article key={alert.title} className={`rounded-3xl border p-5 ${alertClassName(alert.severity)}`}>
                <div className="text-xs uppercase tracking-[0.2em]">{alert.severity}</div>
                <h3 className="mt-3 text-lg font-semibold text-white">{alert.title}</h3>
                <p className="mt-3 text-sm leading-7 text-cyber-mist">{alert.description}</p>
              </article>
            ))}
          </div>
        </section>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <section className="glass-panel rounded-[32px] p-6 soft-ring sm:p-8">
          <div className="section-title">Score Breakdown</div>
          <div className="mt-2 font-display text-3xl font-bold text-white">What drives the score</div>
          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.breakdown}>
                <CartesianGrid stroke="rgba(139, 162, 216, 0.12)" vertical={false} />
                <XAxis dataKey="name" stroke="#8ba2d8" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis stroke="#8ba2d8" tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                  contentStyle={{ background: '#0d1326', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
                />
                <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="#1ee3cf" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="glass-panel rounded-[32px] p-6 soft-ring sm:p-8">
          <div className="section-title">Fraud Signal Levels</div>
          <div className="mt-2 font-display text-3xl font-bold text-white">Relative signal strength</div>
          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={charts.signalSummary}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={108}
                  paddingAngle={4}
                >
                  {charts.signalSummary.map((entry, index) => (
                    <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: '#0d1326', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {charts.signalSummary.map((item, index) => (
              <div key={item.name} className="rounded-2xl border border-white/10 bg-black/15 p-4">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: chartColors[index % chartColors.length] }} />
                  <span className="text-sm text-white">{item.name}</span>
                </div>
                <div className="mt-3 text-2xl font-bold text-white">{item.value}</div>
              </div>
            ))}
          </div>
        </section>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <PatternList patterns={patterns} />
        <InsightBox insights={insights} />
      </section>

      <FraudFlowVisualizer steps={fraudFlow} />

      <section className="glass-panel rounded-[32px] p-6 soft-ring sm:p-8">
        <div className="section-title">Recommendations</div>
        <div className="mt-2 font-display text-3xl font-bold text-white">What to do next</div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {recommendations.map((recommendation) => (
            <article key={recommendation.title} className={`rounded-3xl border p-5 ${recommendationClassName(recommendation.priority)}`}>
              <div className="text-xs uppercase tracking-[0.2em] text-cyber-mist/70">{recommendation.priority} priority</div>
              <h3 className="mt-3 text-lg font-semibold text-white">{recommendation.title}</h3>
              <p className="mt-3 text-sm leading-7 text-cyber-mist">{recommendation.description}</p>
            </article>
          ))}
        </div>
      </section>

      <IdentityRiskReport riskSnapshot={riskSnapshot} patterns={patterns} recommendations={recommendations} />
    </div>
  )
}
