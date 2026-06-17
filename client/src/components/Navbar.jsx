import { Link, NavLink, useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext.jsx'

function navClassName({ isActive }) {
  return isActive
    ? 'rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white shadow-glow'
    : 'rounded-full border border-transparent px-4 py-2 text-sm text-cyber-mist transition hover:border-white/10 hover:bg-white/[0.04] hover:text-white'
}

export default function Navbar() {
  const navigate = useNavigate()
  const { isAuthenticated, logout, user } = useAuth()

  return (
    <header className="sticky top-0 z-20 pt-5">
      <div className="glass-panel soft-ring flex items-center justify-between gap-4 rounded-2xl px-4 py-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyber-glow/30 bg-cyber-glow/10 text-cyber-glow shadow-glow">
              <span className="font-display text-lg font-bold">A</span>
            </div>
            <div>
              <div className="font-display text-base font-bold tracking-wide text-white">Aadhaar Risk Analyzer</div>
              <div className="text-xs uppercase tracking-[0.24em] text-cyber-mist/70">Simulated security intelligence</div>
            </div>
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <NavLink to="/" className={navClassName}>
            Overview
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink to="/input" className={navClassName}>
                Identity Input
              </NavLink>
              <NavLink to="/dashboard" className={navClassName}>
                Dashboard
              </NavLink>
              <NavLink to="/threats" className={navClassName}>
                Simulations
              </NavLink>
              <span className="hidden rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-cyber-mist md:inline-flex">
                {user?.maskedEmail}
              </span>
              <button
                type="button"
                onClick={() => {
                  logout()
                  navigate('/', { replace: true })
                }}
                className="rounded-full border border-cyber-alert/30 bg-cyber-alert/10 px-4 py-2 text-sm text-cyber-alert transition hover:bg-cyber-alert/15"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-full border border-cyber-glow/30 bg-cyber-glow/10 px-4 py-2 text-sm font-semibold text-cyber-glow transition hover:bg-cyber-glow/15"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
