import { Link } from 'react-router-dom'

import { useAuth } from '../context/AuthContext.jsx'

const featureCards = [
  {
    title: 'Identity exposure modeling',
    description: 'Simulates Aadhaar-linked account sprawl using safe, non-sensitive mock inputs.',
  },
  {
    title: 'Risk score engine',
    description: 'Calculates a transparent digital risk score using hackathon-friendly, auditable logic.',
  },
  {
    title: 'Fraud scenario playback',
    description: 'Demonstrates SIM swap, identity theft, and loan fraud flows step by step.',
  },
]

export default function LandingPage() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="space-y-8">
      <section className="glass-panel soft-ring overflow-hidden rounded-[36px] px-6 py-10 sm:px-10 lg:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
             <div className="badge-chip inline-flex">Interactive Security Demo</div>
            <h1 className="mt-6 max-w-4xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Aadhaar-Based Digital Identity Security &amp; Risk Analyzer
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-cyber-mist sm:text-lg">
              A simulated platform that helps users understand how linked bank accounts, multiple phone numbers,
              payment app sprawl, weak security codes, and inactive accounts can increase digital identity risk.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to={isAuthenticated ? '/input' : '/login'}
                className="rounded-full border border-cyber-glow/40 bg-cyber-glow/10 px-6 py-3 font-semibold text-cyber-glow transition hover:bg-cyber-glow/15"
              >
                {isAuthenticated ? 'Continue assessment' : 'Start secure login'}
              </Link>
              <Link
                to={isAuthenticated ? '/dashboard' : '/login'}
                className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 font-semibold text-white transition hover:bg-white/[0.08]"
              >
                View demo dashboard
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="badge-chip">Simulated System (No Aadhaar connectivity)</span>
              <span className="badge-chip">Safe &amp; Private (No personal details stored)</span>
              <span className="badge-chip">Secure &amp; Encrypted Session</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 animate-float rounded-[32px] bg-gradient-to-br from-cyber-glow/20 via-cyber-alert/10 to-cyber-safe/10 blur-3xl" />
            <div className="relative rounded-[32px] border border-white/10 bg-black/25 p-6">
              <div className="section-title">3-minute demo flow</div>
              <ol className="mt-6 space-y-4">
                {[
                  'Simulate secure login with verification codes.',
                  'Enter basic profile indicators to evaluate exposure.',
                  'View risk level, warnings, and simulated fraud scenarios.',
                ].map((item, index) => (
                  <li key={item} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-cyber-glow/10 font-semibold text-cyber-glow">
                      {index + 1}
                    </span>
                    <span className="text-sm leading-7 text-white">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {featureCards.map((feature) => (
          <article key={feature.title} className="glass-panel rounded-[28px] p-6 soft-ring">
            <div className="section-title">Capability</div>
            <h2 className="mt-3 font-display text-2xl font-bold text-white">{feature.title}</h2>
            <p className="mt-4 text-sm leading-7 text-cyber-mist">{feature.description}</p>
          </article>
        ))}
      </section>
    </div>
  )
}
