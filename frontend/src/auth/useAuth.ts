import { createContext, useContext } from 'react'
import type { LoginInput, RegisterInput, Role, User } from '../api/auth'

export interface AuthContextValue {
  user: User | null
  loading: boolean
  login: (data: LoginInput) => Promise<User>
  register: (data: RegisterInput) => Promise<User>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}

export function homePathFor(role: Role) {
  return role === 'teacher' ? '/profesor' : '/estudiante'
}
