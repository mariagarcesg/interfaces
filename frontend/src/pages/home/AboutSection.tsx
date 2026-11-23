import { Icon } from '../../components/icons'
import { icons } from '../../components/iconPaths'
import { ABOUT_FEATURES } from './content'
import SectionBadge from './SectionBadge'

export default function AboutSection() {
  return (
    <section id="sobre" className="scroll-mt-8 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-[1.15fr_1fr_0.85fr] lg:gap-12">
        <img
          src="/images/about.jpg"
          alt="Estudiantes trabajando juntos"
          className="h-72 w-full rounded-[2rem] object-cover shadow-lg sm:h-96"
          loading="lazy"
        />

        <div>
          <SectionBadge>Sobre la materia</SectionBadge>
          <h2 className="mt-5 text-4xl leading-tight text-text sm:text-5xl">Más que una clase</h2>
          <p className="mt-5 text-text/75">
            Este espacio reúne todo lo que necesitas para cursar la materia: evaluaciones, calificaciones y
            seguimiento de tu progreso, con acompañamiento directo del profesor.
          </p>
          <a
            href="#contenido"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Ver contenido
            <Icon d={icons.arrowRight} className="h-4 w-4" />
          </a>
        </div>

        <ul className="space-y-7 lg:border-l lg:border-border lg:pl-10">
          {ABOUT_FEATURES.map((f) => (
            <li key={f.title} className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-primary">
                <Icon d={f.icon} className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-text">{f.title}</p>
                <p className="text-sm text-muted">{f.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
