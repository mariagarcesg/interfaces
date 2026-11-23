import { Link } from 'react-router'
import { icons } from './iconPaths'
import { Icon } from './icons'

// Nombre provisional de la materia; luego vendrá de la configuración del profesor.
export const SUBJECT_NAME = 'Aula Virtual'

export default function Logo({ to = '/', light = false }: { to?: string; light?: boolean }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 font-heading text-xl ${light ? 'text-white' : 'text-text'}`}
    >
      <Icon d={icons.cap} className="h-7 w-7" />
      {SUBJECT_NAME}
    </Link>
  )
}
