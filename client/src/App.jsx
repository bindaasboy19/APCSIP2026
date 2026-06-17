import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import AppShell from './components/AppShell.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const DashboardPage = lazy(() => import('./pages/DashboardPage.jsx'))
const InputFormPage = lazy(() => import('./pages/InputFormPage.jsx'))
const LandingPage = lazy(() => import('./pages/LandingPage.jsx'))
const LoginPage = lazy(() => import('./pages/LoginPage.jsx'))
const ThreatSimulationPage = lazy(() => import('./pages/ThreatSimulationPage.jsx'))

function RouteFallback() {
  return (
    <div className="glass-panel rounded-[32px] p-10 text-center soft-ring">
      <div className="section-title">Loading</div>
      <div className="mt-3 font-display text-3xl font-bold text-white">Preparing interface...</div>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<RouteFallback />}>
              <LandingPage />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<RouteFallback />}>
              <LoginPage />
            </Suspense>
          }
        />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/input"
            element={
              <Suspense fallback={<RouteFallback />}>
                <InputFormPage />
              </Suspense>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<RouteFallback />}>
                <DashboardPage />
              </Suspense>
            }
          />
          <Route
            path="/threats"
            element={
              <Suspense fallback={<RouteFallback />}>
                <ThreatSimulationPage />
              </Suspense>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
