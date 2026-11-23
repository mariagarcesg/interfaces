export default function Alert({ children }: { children: React.ReactNode }) {
  return (
    <div role="alert" className="rounded-lg border border-danger/20 bg-danger-soft px-3 py-2.5 text-sm text-danger">
      {children}
    </div>
  )
}
