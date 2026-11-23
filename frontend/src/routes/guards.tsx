import { Navigate, Outlet, useLocation } from 'react-router'
import type { Role } from '../api/auth'
import { homePathFor, useAuth } from '../auth/useAuth'
import Spinner from '../components/ui/Spinner'

/** Solo usuarios autenticados con el rol indicado. */
export function RequireRole({ role }: { role: Role }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <Spinner fullScreen />
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  if (user.role !== role) return <Navigate to={homePathFor(user.role)} replace />
  return <Outlet />
}

/** Login y registro: si ya hay sesión, redirige al panel correspondiente. */
export function GuestOnly() {
  const { user, loading } = useAuth()

  if (loading) return <Spinner fullScreen />
  if (user) return <Navigate to={homePathFor(user.role)} replace />
  return <Outlet />
}
