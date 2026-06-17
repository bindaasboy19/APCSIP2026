import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import AlertPanel from '../components/AlertPanel.jsx'
import MetricCard from '../components/MetricCard.jsx'
import RecommendationList from '../components/RecommendationList.jsx'
import RiskBreakdownChart from '../components/RiskBreakdownChart.jsx'
import RiskTimelineChart from '../components/RiskTimelineChart.jsx'
import IdentityRiskReport from './IdentityRiskReport.jsx'

function levelClassName(level) {
  if (level === 'High') return 'border-cyber-alert/40 bg-cyber-alert/10 text-cyber-alert'
  if (level === 'Medium') return 'border-cyber-amber/40 bg-cyber-amber/10 text-cyber-amber'
  return 'border-cyber-safe/40 bg-cyber-safe/10 text-cyber-safe'
}

export default function IdentityRiskDashboard({ assessment, recommendations, persistenceMode }) {
  const navigate = useNavigate()
  const {
    profile,
    risk,
    muleRisk,
    deviceRisk,
    fraudCheck,
    transactionPattern,
    healthScore,
    timeline90Days,
    alerts,
    telemetry,
    charts,
    createdAt,
  } = assessment

  const [showDeviceFlags, setShowDeviceFlags] = useState(false)

  return (
    <div className="space-y-6">
      {/* Overview Section */}
      <section className="glass-panel rounded-[32px] p-6 soft-ring sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="section-title">Security Overview</div>
            <div className="mt-2 font-display text-4xl font-bold text-white">Digital identity security dashboard</div>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-cyber-mist">
              This simulated assessment shows how your account and connection footprints can affect likelihood
              ratings of identity misuse and mobile-linked financial fraud.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className={`rounded-full border px-4 py-2 text-sm font-semibold ${levelClassName(risk.level)}`}>
                {risk.level} Likelihood
              </span>
              <span className="badge-chip">Storage: {persistenceMode === 'mongo' ? 'Database Saved' : 'Temporary Session'}</span>
              <span className="badge-chip">Generated: {new Date(createdAt).toLocaleString()}</span>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <MetricCard label="Likelihood rating" value={risk.score} hint="Composite risk score" />
              <MetricCard label="Footprint size" value={telemetry.digitalSurfaceIndex} hint="Total linked apps and accounts" />
              <MetricCard label="Recovery security" value={telemetry.recoveryChannelStrength === 'Strong' ? 'High' : 'Low'} hint="Based on two-step verification" />
            </div>
          </div>

          {/* Identity Health Score Card */}
          <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-cyber-panel via-[#0a1024] to-black/25 p-6 flex flex-col justify-between">
            <div>
              <div className="section-title">Digital Identity Health Score</div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-7xl font-bold text-white">{healthScore}</span>
                <span className="text-sm text-cyber-mist">/ 1000 pts</span>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full ${healthScore >= 750 ? 'bg-cyber-safe' : healthScore >= 450 ? 'bg-cyber-amber' : 'bg-cyber-alert'}`}
                  style={{ width: `${(healthScore / 1000) * 100}%` }}
                />
              </div>
              <p className="mt-4 text-xs leading-5 text-cyber-mist">
                A higher score indicates a stronger digital profile with robust recovery channels, minimal dormant linkages, and lower fraudulent pattern matching.
              </p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => navigate('/threats')}
                className="rounded-full border border-cyber-glow/40 bg-cyber-glow/10 px-5 py-3 font-semibold text-cyber-glow transition hover:bg-cyber-glow/15 text-sm"
              >
                Run threat simulations
              </button>
              <button
                type="button"
                onClick={() => navigate('/input')}
                className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 font-semibold text-white transition hover:bg-white/[0.08] text-sm"
              >
                Update identity inputs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Analysis Grid */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Mule Account Risk Card */}
        <article className="glass-panel rounded-3xl p-6 soft-ring flex flex-col justify-between">
          <div>
            <div className="section-title text-cyber-amber">Mule Account Risk</div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="font-display text-4xl font-bold text-white">{muleRisk.probabilityPercentage}%</span>
              <span className={`text-xs px-2 py-0.5 rounded-full border ${levelClassName(muleRisk.level)}`}>
                {muleRisk.level}
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-cyber-mist">
              {muleRisk.rationale}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5">
            <span className="text-[10px] uppercase tracking-wider text-white/50 block mb-1">Key drivers:</span>
            <ul className="text-[11px] text-cyber-mist space-y-1 list-disc pl-3">
              {muleRisk.drivers.slice(0, 3).map((driver, idx) => (
                <li key={idx}>{driver}</li>
              ))}
            </ul>
          </div>
        </article>

        {/* Device Rating Card */}
        <article className="glass-panel rounded-3xl p-6 soft-ring flex flex-col justify-between">
          <div>
            <div className="section-title text-cyber-glow">Device Rating</div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="font-display text-4xl font-bold text-white">{deviceRisk.score}</span>
              <span className="text-xs text-cyber-mist">/ 100 Risk</span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-cyber-mist">
              Simulates trust rating based on verification frequency, device age, and associated hardware identifiers.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5">
            <button
              type="button"
              onClick={() => setShowDeviceFlags(!showDeviceFlags)}
              className="text-xs text-cyber-glow hover:underline block"
            >
              {showDeviceFlags ? 'Hide verification details' : 'Show verification details'}
            </button>
            {showDeviceFlags && (
              <ul className="mt-2 text-[10px] text-cyber-mist space-y-1 list-disc pl-3 max-h-24 overflow-y-auto">
                {deviceRisk.flags.map((flag, idx) => (
                  <li key={idx}>{flag}</li>
                ))}
              </ul>
            )}
          </div>
        </article>

        {/* Simulated Database Status Card */}
        <article className="glass-panel rounded-3xl p-6 soft-ring flex flex-col justify-between">
          <div>
            <div className="section-title text-cyber-safe">Simulated Database Status</div>
            <p className="mt-2 text-xs text-cyber-mist">
              Checks if your profile identifiers match known risk patterns in simulated threat lists.
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-cyber-mist">Associated phone status:</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${fraudCheck.phoneFlag ? 'bg-cyber-alert/10 text-cyber-alert border border-cyber-alert/20' : 'bg-cyber-safe/10 text-cyber-safe border border-cyber-safe/20'}`}>
                  {fraudCheck.phoneFlag ? 'Flagged' : 'Clean'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-cyber-mist">Associated email status:</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${fraudCheck.emailFlag ? 'bg-cyber-alert/10 text-cyber-alert border border-cyber-alert/20' : 'bg-cyber-safe/10 text-cyber-safe border border-cyber-safe/20'}`}>
                  {fraudCheck.emailFlag ? 'Flagged' : 'Clean'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-cyber-mist">Payment links status:</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${fraudCheck.upiFlag ? 'bg-cyber-alert/10 text-cyber-alert border border-cyber-alert/20' : 'bg-cyber-safe/10 text-cyber-safe border border-cyber-safe/20'}`}>
                  {fraudCheck.upiFlag ? 'Flagged' : 'Clean'}
                </span>
              </div>
            </div>
          </div>
        </article>

        {/* Transaction Velocity Classifier Card */}
        <article className="glass-panel rounded-3xl p-6 soft-ring flex flex-col justify-between">
          <div>
            <div className="section-title text-cyber-mist">Transaction Classifier</div>
            <div className="mt-3 flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${transactionPattern.patternDetected ? 'bg-cyber-alert' : 'bg-cyber-safe'}`} />
              <span className="font-semibold text-white text-sm">
                {transactionPattern.patternDetected ? 'Suspicious Pattern' : 'Normal Velocity'}
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-cyber-mist">
              Evaluates current daily transaction velocity against typical account activity cycles.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5">
            <span className="text-[10px] uppercase tracking-wider text-white/50 block mb-1">Pattern detected:</span>
            <div className="text-xs text-white font-medium">{transactionPattern.patternType}</div>
            <div className="text-[10px] text-cyber-mist mt-0.5">Severity: {transactionPattern.severity}</div>
          </div>
        </article>
      </section>

      {/* Visual Charts Section */}
      <section className="grid gap-6 xl:grid-cols-2">
        <RiskBreakdownChart data={charts.breakdown} />
        <RiskTimelineChart data={timeline90Days} />
      </section>

      {/* Recommendations & Alerts */}
      <section className="grid gap-6 xl:grid-cols-2">
        <AlertPanel alerts={alerts} />
        <RecommendationList recommendations={recommendations} />
      </section>

      {/* Narrative Summary */}
      <IdentityRiskReport assessment={assessment} />
    </div>
  )
}
