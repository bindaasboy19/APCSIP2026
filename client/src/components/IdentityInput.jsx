import { useState } from 'react'

import { calculateRiskScore } from '../utils/riskScoring.js'

function selectorClassName(isActive, tone) {
  if (!isActive) {
    return 'border-white/10 bg-white/[0.03] text-cyber-mist hover:border-white/20 hover:bg-white/[0.05]'
  }

  if (tone === 'danger') {
    return 'border-cyber-alert/40 bg-cyber-alert/10 text-cyber-alert'
  }

  return 'border-cyber-safe/40 bg-cyber-safe/10 text-cyber-safe'
}

export default function IdentityInput({ onSubmit, submitting, errorMessage }) {
  const [form, setForm] = useState({
    numberOfBankAccounts: 3,
    simCount: 2,
    has2FA: false,
    hasInactiveAccounts: true,
  })

  const preview = calculateRiskScore(form)

  function updateField(key, value) {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="glass-panel rounded-[28px] p-6 soft-ring sm:p-8">
        <div className="section-title">Identity Input</div>
        <div className="mt-2 font-display text-3xl font-bold text-white">Create a safe simulated exposure profile</div>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-cyber-mist">
          This form does not collect personal identity data. It only uses simple structural indicators to estimate misuse risk.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-white">Number of bank accounts</span>
            <input
              type="number"
              min="0"
              max="10"
              value={form.numberOfBankAccounts}
              onChange={(event) => updateField('numberOfBankAccounts', Number(event.target.value))}
              className="mt-3 w-full rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-white outline-none transition focus:border-cyber-glow/50 focus:bg-black/25"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-white">SIM count</span>
            <input
              type="number"
              min="1"
              max="5"
              value={form.simCount}
              onChange={(event) => updateField('simCount', Number(event.target.value))}
              className="mt-3 w-full rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-white outline-none transition focus:border-cyber-glow/50 focus:bg-black/25"
            />
          </label>

          <div>
            <span className="text-sm font-medium text-white">Two-factor authentication enabled</span>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => updateField('has2FA', true)}
                className={`rounded-2xl border px-4 py-3 text-left transition ${selectorClassName(form.has2FA, 'safe')}`}
              >
                <div className="font-medium">Yes</div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em]">Stronger recovery path</div>
              </button>
              <button
                type="button"
                onClick={() => updateField('has2FA', false)}
                className={`rounded-2xl border px-4 py-3 text-left transition ${selectorClassName(!form.has2FA, 'danger')}`}
              >
                <div className="font-medium">No</div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em]">Higher takeover risk</div>
              </button>
            </div>
          </div>

          <div>
            <span className="text-sm font-medium text-white">Inactive accounts still open</span>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => updateField('hasInactiveAccounts', false)}
                className={`rounded-2xl border px-4 py-3 text-left transition ${selectorClassName(!form.hasInactiveAccounts, 'safe')}`}
              >
                <div className="font-medium">No</div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em]">Smaller attack surface</div>
              </button>
              <button
                type="button"
                onClick={() => updateField('hasInactiveAccounts', true)}
                className={`rounded-2xl border px-4 py-3 text-left transition ${selectorClassName(form.hasInactiveAccounts, 'danger')}`}
              >
                <div className="font-medium">Yes</div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em]">Dormant exposure exists</div>
              </button>
            </div>
          </div>
        </div>

        {errorMessage ? (
          <div className="mt-6 rounded-2xl border border-cyber-alert/30 bg-cyber-alert/10 px-4 py-3 text-sm text-cyber-alert">
            {errorMessage}
          </div>
        ) : null}

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-cyber-mist">
            The app stores only mock structural indicators for this demo session.
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full border border-cyber-glow/40 bg-cyber-glow/10 px-6 py-3 font-semibold text-cyber-glow transition hover:bg-cyber-glow/15 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Analyzing risk...' : 'Analyze digital identity risk'}
          </button>
        </div>
      </section>

      <aside className="glass-panel rounded-[28px] p-6 soft-ring sm:p-8">
        <div className="section-title">Live Preview</div>
        <div className="mt-2 font-display text-3xl font-bold text-white">Estimated risk score</div>

        <div className="mt-8 rounded-[28px] border border-white/10 bg-gradient-to-br from-cyber-panel to-black/20 p-6">
          <div className="text-xs uppercase tracking-[0.24em] text-cyber-mist/70">Preview</div>
          <div className="mt-3 font-display text-6xl font-bold text-white">{preview.score}</div>
          <div
            className={`mt-3 inline-flex rounded-full border px-4 py-2 text-sm font-semibold ${preview.level === 'High' ? 'border-cyber-alert/40 bg-cyber-alert/10 text-cyber-alert' : preview.level === 'Medium' ? 'border-cyber-amber/40 bg-cyber-amber/10 text-cyber-amber' : 'border-cyber-safe/40 bg-cyber-safe/10 text-cyber-safe'}`}
          >
            {preview.level} Risk
          </div>

          <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">
            <div
              className={`h-full rounded-full ${preview.level === 'High' ? 'bg-cyber-alert' : preview.level === 'Medium' ? 'bg-cyber-amber' : 'bg-cyber-safe'}`}
              style={{ width: `${preview.visualScore}%` }}
            />
          </div>

          <div className="mt-6 space-y-3">
            {preview.breakdown.map((item) => (
              <div key={item.key} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/15 px-4 py-3">
                <span className="text-sm text-cyber-mist">{item.label}</span>
                <span className="font-semibold text-white">{item.points} pts</span>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </form>
  )
}
