import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-bold text-primary">404</p>
      <h1 className="mt-4 text-2xl font-bold text-text">Página no encontrada</h1>
      <p className="mt-2 text-muted">La página que buscas no existe o fue movida.</p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-hover"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
