// Uso: <Icon d={icons.book} className="h-5 w-5" />  (rutas en iconPaths.ts)

export function Icon({ d, className = 'h-5 w-5' }: { d: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  )
}
