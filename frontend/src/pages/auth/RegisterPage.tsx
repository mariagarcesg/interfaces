import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { homePathFor, useAuth } from '../../auth/useAuth'
import Alert from '../../components/ui/Alert'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import AuthCard from './AuthCard'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [field]: e.target.value })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (form.password.length < 8) return setError('La contraseña debe tener al menos 8 caracteres')
    if (form.password !== form.confirm) return setError('Las contraseñas no coinciden')

    setSubmitting(true)
    try {
      const { confirm: _confirm, ...data } = form
      const user = await register(data)
      navigate(homePathFor(user.role), { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo crear la cuenta')
      setSubmitting(false)
    }
  }

  return (
    <AuthCard title="Crear cuenta" subtitle="Regístrate como estudiante de la materia.">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <Alert>{error}</Alert>}
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Nombre" autoComplete="given-name" required value={form.firstName} onChange={set('firstName')} />
          <Input label="Apellido" autoComplete="family-name" required value={form.lastName} onChange={set('lastName')} />
        </div>
        <Input label="Email" type="email" autoComplete="email" required value={form.email} onChange={set('email')} />
        <Input
          label="Contraseña"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          placeholder="Mínimo 8 caracteres"
          value={form.password}
          onChange={set('password')}
        />
        <Input
          label="Confirmar contraseña"
          type="password"
          autoComplete="new-password"
          required
          value={form.confirm}
          onChange={set('confirm')}
        />
        <Button type="submit" className="w-full" loading={submitting}>
          Crear cuenta
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="font-medium text-primary hover:underline">
          Inicia sesión
        </Link>
      </p>
    </AuthCard>
  )
}
