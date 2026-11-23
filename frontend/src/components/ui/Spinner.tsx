export default function Spinner({ fullScreen = false }: { fullScreen?: boolean }) {
  const spinner = (
    <div
      role="status"
      aria-label="Cargando"
      className="h-8 w-8 animate-spin rounded-full border-4 border-primary-soft border-t-primary"
    />
  )
  if (!fullScreen) return spinner
  return <div className="flex min-h-screen items-center justify-center">{spinner}</div>
}
