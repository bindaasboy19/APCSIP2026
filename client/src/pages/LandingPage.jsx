import { Link } from 'react-router-dom'

import { useAuth } from '../context/AuthContext.jsx'

const featureCards = [
  {
    title: 'Explainable risk score',
    description: 'A transparent score based on linked accounts, SIM exposure, 2FA usage, and inactive account risk.',
  },
  {
    title: 'Fraud pattern detection',
    description: 'Flags possible mule-account risk, SIM swap exposure, and weak authentication controls.',
  },
  {
    title: 'Threat flow visualization',
    description: 'Shows how identity misuse can move from fake KYC to transfers, mule accounts, and withdrawal.',
  },
]

export default function LandingPage() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="space-y-8">
      <section className="glass-panel soft-ring overflow-hidden rounded-[36px] px-6 py-10 sm:px-10 lg:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="badge-chip inline-flex">Hackathon Cybersecurity Demo</div>
            <h1 className="mt-6 max-w-4xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Digital Identity Fraud Intelligence &amp; Risk Analyzer
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-cyber-mist sm:text-lg">
              A simulated fraud-awareness platform that shows how digital identity misuse can lead to account takeover, mule-account abuse, and loan fraud without using real personal data.
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
                Open dashboard
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="badge-chip">No real Aadhaar APIs</span>
              <span className="badge-chip">No sensitive data stored</span>
              <span className="badge-chip">Simple, explainable logic</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-cyber-glow/20 via-cyber-alert/10 to-cyber-safe/10 blur-3xl" />
            <div className="relative rounded-[32px] border border-white/10 bg-black/25 p-6">
              <div className="section-title">2-minute demo flow</div>
              <ol className="mt-6 space-y-4">
                {[
                  'Log in with email, password, and a simulated OTP.',
                  'Submit a simple identity exposure profile with four inputs.',
                  'Review risk score, fraud patterns, insights, and attack scenarios.',
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
