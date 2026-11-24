import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router'
import type { Role } from '../api/auth'
import { homePathFor, useAuth } from '../auth/useAuth'
import Logo from '../components/Logo'
import Button from '../components/ui/Button'

interface NavItem {
  to: string
  label: string
  end?: boolean
}

// Menú por rol. Aquí se irán agregando "Evaluaciones", "Estudiantes", "Apariencia", etc.
const NAV: Record<Role, NavItem[]> = {
  teacher: [{ to: '/profesor', label: 'Inicio', end: true }],
  student: [{ to: '/estudiante', label: 'Inicio', end: true }],
}

const ROLE_LABEL: Record<Role, string> = { teacher: 'Profesor', student: 'Estudiante' }

export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  if (!user) return null

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  const initials = `${user.firstName[0] ?? ''}${user.lastName[0] ?? ''}`.toUpperCase()

  return (
    <div className="flex min-h-screen">
      {/* Fondo oscuro en móvil cuando el menú está abierto */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-text/40 lg:hidden" onClick={() => setMenuOpen(false)} aria-hidden />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-surface transition-transform lg:static lg:translate-x-0 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center border-b border-border px-5">
          <Logo to={homePathFor(user.role)} />
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {NAV[user.role].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-primary-soft text-primary-ink' : 'text-muted hover:bg-background hover:text-text'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-border p-3">
          <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border bg-surface px-4 lg:px-8">
          <button
            type="button"
            className="rounded-lg p-2 text-muted hover:bg-background lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="ml-auto flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-text">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-muted">{ROLE_LABEL[user.role]}</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-on-primary">
              {initials}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
