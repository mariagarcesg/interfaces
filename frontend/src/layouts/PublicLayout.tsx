import { Link, Outlet, useLocation } from 'react-router'
import { homePathFor, useAuth } from '../auth/useAuth'
import { Icon } from '../components/icons'
import { icons } from '../components/iconPaths'
import Logo, { SUBJECT_NAME } from '../components/Logo'

const YEAR = new Date().getFullYear()

const SECTIONS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#sobre', label: 'La materia' },
  { href: '#contenido', label: 'Contenido' },
]

export default function PublicLayout() {
  const { user } = useAuth()
  const isHome = useLocation().pathname === '/'

  return (
    <div className="flex min-h-screen flex-col">
      {/* En el home el header flota sobre la imagen del hero */}
      <header className={isHome ? 'absolute inset-x-0 top-0 z-30' : 'border-b border-border bg-surface'}>
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4">
          <Logo />

          {isHome && (
            <nav className="hidden items-center gap-8 text-sm font-medium text-text/80 md:flex">
              {SECTIONS.map((s, i) => (
                <a
                  key={s.href}
                  href={s.href}
                  className={`transition-colors hover:text-text ${i === 0 ? 'border-b-2 border-primary pb-0.5 text-text' : ''}`}
                >
                  {s.label}
                </a>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-2 text-sm font-medium">
            {user ? (
              <Link
                to={homePathFor(user.role)}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-on-primary transition-colors hover:bg-primary-hover"
              >
                Ir a mi panel
                <Icon d={icons.arrowRight} className="h-4 w-4" />
              </Link>
            ) : (
              <>
                <Link to="/login" className="hidden px-3 py-2 text-text/80 transition-colors hover:text-text sm:block">
                  Iniciar sesión
                </Link>
                <Link
                  to="/registro"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-on-primary transition-colors hover:bg-primary-hover"
                >
                  Registrarse
                  <Icon d={icons.arrowRight} className="h-4 w-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-auto rounded-t-[2.5rem] bg-text text-white/70">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row">
          <Logo light />
          <p className="text-sm">
            © {YEAR} {SUBJECT_NAME}. Plataforma de la materia.
          </p>
        </div>
      </footer>
    </div>
  )
}
