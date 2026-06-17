import { useMemo, useState } from 'react'

import { calculateRiskScore } from '../utils/calculateRiskScore.js'

const upiOptions = ['BHIM', 'Google Pay', 'PhonePe', 'Paytm', 'Amazon Pay', 'CRED UPI']

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
    bankAccounts: 3,
    simCount: 2,
    upiAppsUsed: ['BHIM', 'PhonePe'],
    twoFactorEnabled: false,
    inactiveAccounts: false,
    accountAgeDays: 365,
    avgTransactionsPerDay: 2,
  })

  const preview = useMemo(() => calculateRiskScore(form), [form])

  function updateField(key, value) {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }))
  }

  function toggleUpiApp(appName) {
    setForm((previous) => {
      const exists = previous.upiAppsUsed.includes(appName)
      return {
        ...previous,
        upiAppsUsed: exists
          ? previous.upiAppsUsed.filter((item) => item !== appName)
          : [...previous.upiAppsUsed, appName],
      }
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
      <section className="glass-panel rounded-[28px] p-6 soft-ring sm:p-8">
        <div className="section-title">Identity Setup</div>
        <div className="mt-2 font-display text-3xl font-bold text-white">Configure your simulated profile</div>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-cyber-mist">
          This form does not collect actual identification details. It evaluates general profile
          characteristics to estimate overall risk level.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-white">Number of bank accounts</span>
            <input
              type="number"
              min="0"
              max="10"
              value={form.bankAccounts}
              onChange={(event) => updateField('bankAccounts', Number(event.target.value))}
              className="mt-3 w-full rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-white outline-none transition focus:border-cyber-glow/50 focus:bg-black/25"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-white">Active phone lines (SIM cards)</span>
            <input
              type="number"
              min="1"
              max="5"
              value={form.simCount}
              onChange={(event) => updateField('simCount', Number(event.target.value))}
              className="mt-3 w-full rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-white outline-none transition focus:border-cyber-glow/50 focus:bg-black/25"
            />
          </label>

          <div className="md:col-span-2">
            <span className="text-sm font-medium text-white">UPI apps used</span>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {upiOptions.map((appName) => {
                const active = form.upiAppsUsed.includes(appName)

                return (
                  <button
                    key={appName}
                    type="button"
                    onClick={() => toggleUpiApp(appName)}
                    className={`rounded-2xl border px-4 py-3 text-left transition ${active ? 'border-cyber-glow/40 bg-cyber-glow/10 text-white' : 'border-white/10 bg-black/15 text-cyber-mist hover:border-white/20 hover:bg-black/25'}`}
                  >
                    <div className="font-medium">{appName}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.2em]">
                      {active ? 'Included' : 'Tap to include'}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <span className="text-sm font-medium text-white">Two-step verification active</span>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => updateField('twoFactorEnabled', true)}
                className={`rounded-2xl border px-4 py-3 text-left transition ${selectorClassName(form.twoFactorEnabled, 'safe')}`}
              >
                <div className="font-medium">Yes</div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em]">Stronger recovery path</div>
              </button>
              <button
                type="button"
                onClick={() => updateField('twoFactorEnabled', false)}
                className={`rounded-2xl border px-4 py-3 text-left transition ${selectorClassName(!form.twoFactorEnabled, 'danger')}`}
              >
                <div className="font-medium">No</div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em]">Higher account hijack risk</div>
              </button>
            </div>
          </div>

          <div>
            <span className="text-sm font-medium text-white">Dormant/unused bank accounts still open</span>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => updateField('inactiveAccounts', false)}
                className={`rounded-2xl border px-4 py-3 text-left transition ${selectorClassName(!form.inactiveAccounts, 'safe')}`}
              >
                <div className="font-medium">No</div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em]">Smaller security footprint</div>
              </button>
              <button
                type="button"
                onClick={() => updateField('inactiveAccounts', true)}
                className={`rounded-2xl border px-4 py-3 text-left transition ${selectorClassName(form.inactiveAccounts, 'danger')}`}
              >
                <div className="font-medium">Yes</div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em]">Dormant account risk exists</div>
              </button>
            </div>
          </div>

          <div className="block">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-white">Simulated account age (in days)</span>
              <span className="text-sm font-semibold text-cyber-glow">{form.accountAgeDays} days</span>
            </div>
            <input
              type="range"
              min="1"
              max="3650"
              value={form.accountAgeDays}
              onChange={(event) => updateField('accountAgeDays', Number(event.target.value))}
              className="mt-3 w-full accent-cyber-glow bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
            <div className="mt-1 flex justify-between text-[10px] text-cyber-mist/50">
              <span>1 day (New account)</span>
              <span>3650 days (10 years)</span>
            </div>
          </div>

          <div className="block">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-white">Average daily transactions</span>
              <span className="text-sm font-semibold text-cyber-glow">{form.avgTransactionsPerDay} / day</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={form.avgTransactionsPerDay}
              onChange={(event) => updateField('avgTransactionsPerDay', Number(event.target.value))}
              className="mt-3 w-full accent-cyber-glow bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
            <div className="mt-1 flex justify-between text-[10px] text-cyber-mist/50">
              <span>0 (None)</span>
              <span>100+ (High frequency)</span>
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
            Your score is calculated based on security parameters and is saved privately in this session.
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full border border-cyber-glow/40 bg-cyber-glow/10 px-6 py-3 font-semibold text-cyber-glow transition hover:bg-cyber-glow/15 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Analyzing profile risk...' : 'Submit profile for security assessment'}
          </button>
        </div>
      </section>

      <aside className="glass-panel rounded-[28px] p-6 soft-ring sm:p-8">
        <div className="section-title">Live Preview</div>
        <div className="mt-2 font-display text-3xl font-bold text-white">Estimated likelihood rating</div>

        <div className="mt-8 rounded-[28px] border border-white/10 bg-gradient-to-br from-cyber-panel to-black/20 p-6">
          <div className="text-xs uppercase tracking-[0.24em] text-cyber-mist/70">Preview</div>
          <div className="mt-3 font-display text-6xl font-bold text-white">{preview.score}</div>
          <div
            className={`mt-3 inline-flex rounded-full border px-4 py-2 text-sm font-semibold ${preview.level === 'High' ? 'border-cyber-alert/40 bg-cyber-alert/10 text-cyber-alert' : preview.level === 'Medium' ? 'border-cyber-amber/40 bg-cyber-amber/10 text-cyber-amber' : 'border-cyber-safe/40 bg-cyber-safe/10 text-cyber-safe'}`}
          >
            {preview.level} Risk Likelihood
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

