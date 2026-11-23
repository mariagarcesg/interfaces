export default function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-text">{title}</h1>
      {description && <p className="mt-1 text-muted">{description}</p>}
    </div>
  )
}
