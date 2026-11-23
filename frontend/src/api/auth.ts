import { api } from './client'

export type Role = 'teacher' | 'student'

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  role: Role
  isActive: boolean
  createdAt: string
}

export interface RegisterInput {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface LoginInput {
  email: string
  password: string
}

type UserResponse = { user: User }

export const authApi = {
  me: () => api<UserResponse>('/auth/me').then((r) => r.user),
  login: (data: LoginInput) =>
    api<UserResponse>('/auth/login', { method: 'POST', body: JSON.stringify(data) }).then((r) => r.user),
  register: (data: RegisterInput) =>
    api<UserResponse>('/auth/register', { method: 'POST', body: JSON.stringify(data) }).then((r) => r.user),
  logout: () => api<void>('/auth/logout', { method: 'POST' }),
}
