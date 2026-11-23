import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { authApi, type LoginInput, type RegisterInput, type User } from '../api/auth'
import { AuthContext } from './useAuth'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Al cargar la app, preguntamos al backend si ya hay una sesión activa (cookie).
  useEffect(() => {
    authApi
      .me()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (data: LoginInput) => {
    const u = await authApi.login(data)
    setUser(u)
    return u
  }, [])

  const register = useCallback(async (data: RegisterInput) => {
    const u = await authApi.register(data)
    setUser(u)
    return u
  }, [])

  const logout = useCallback(async () => {
    await authApi.logout().catch(() => {})
    setUser(null)
  }, [])

  const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading, login, register, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
