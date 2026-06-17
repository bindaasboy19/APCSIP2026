import { createContext, useContext, useState } from 'react'

import { clearStoredSession, getStoredSession, setStoredSession } from '../services/authStorage.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => getStoredSession())

  function login(nextSession) {
    setSession(nextSession)
    setStoredSession(nextSession)
  }

  function logout() {
    setSession(null)
    clearStoredSession()
  }

  const value = {
    session,
    token: session?.token ?? null,
    user: session?.user ?? null,
    isAuthenticated: Boolean(session?.token),
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.')
  }

  return context
}
