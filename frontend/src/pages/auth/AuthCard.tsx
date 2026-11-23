import type { ReactNode } from 'react'

export default function AuthCard({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="flex justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-[2rem] border border-border bg-surface p-8 shadow-xl shadow-primary/5">
        <h1 className="text-3xl text-text">{title}</h1>
        <p className="mt-1 text-sm text-muted">{subtitle}</p>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  )
}
