import { useAuth } from '../../auth/useAuth'
import PageHeader from '../../components/PageHeader'
import StatCard from '../../components/StatCard'

export default function TeacherDashboard() {
  const { user } = useAuth()

  return (
    <>
      <PageHeader title={`Hola, ${user?.firstName}`} description="Panel del profesor" />
      {/* Valores de ejemplo: se conectarán al backend cuando existan las evaluaciones */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Estudiantes" value="—" hint="Inscritos en la materia" />
        <StatCard label="Evaluaciones" value="—" hint="Publicadas" />
        <StatCard label="Por calificar" value="—" hint="Respuestas pendientes" />
      </div>
    </>
  )
}
