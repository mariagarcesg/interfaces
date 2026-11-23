import { useAuth } from '../../auth/useAuth'
import PageHeader from '../../components/PageHeader'
import StatCard from '../../components/StatCard'

export default function StudentDashboard() {
  const { user } = useAuth()

  return (
    <>
      <PageHeader title={`Hola, ${user?.firstName}`} description="Panel del estudiante" />
      {/* Valores de ejemplo: se conectarán al backend cuando existan las evaluaciones */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Evaluaciones pendientes" value="—" />
        <StatCard label="Completadas" value="—" />
        <StatCard label="Promedio" value="—" />
      </div>
    </>
  )
}
