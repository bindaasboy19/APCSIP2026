import { Outlet } from 'react-router-dom'

import Navbar from './Navbar.jsx'

export default function AppShell() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 app-grid opacity-80" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-cyber-glow/10 to-transparent" />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-14 sm:px-6 lg:px-8">
        <Navbar />
        <main className="flex-1 pb-10 pt-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
