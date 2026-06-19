import { Outlet } from 'react-router-dom'

import Navbar from './Navbar.jsx'

export default function AppShell() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 app-grid opacity-80" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-cyber-glow/10 to-transparent" />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-14 sm:px-6 lg:px-8">
        
        {/* Prominent Simulation Disclaimer Banner */}
        <div className="mt-4 rounded-2xl border border-cyber-amber/30 bg-cyber-amber/5 px-5 py-3.5 shadow-sm backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-2 shrink-0">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyber-amber/20 text-cyber-amber animate-pulse">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-cyber-amber font-display">System Warning</span>
            </div>
            <span className="hidden sm:inline h-4 w-px bg-white/10" />
            <p className="text-xs sm:text-sm text-cyber-mist leading-relaxed font-body">
              This is a <span className="text-white font-semibold">simulation-based educational tool</span>. No real identity or banking data is accessed or stored.
            </p>
          </div>
        </div>

        <Navbar />
        <main className="flex-1 pb-10 pt-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
