import { Link } from 'react-router'
import { Icon, StarIcon } from '../../components/icons'
import { icons } from '../../components/iconPaths'
import { TESTIMONIALS } from './content'
import SectionBadge from './SectionBadge'

export default function TestimonialsSection() {
  return (
    <section id="testimonios" className="scroll-mt-8 pb-24 sm:pb-32">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[0.8fr_2fr] lg:items-center">
        <div>
          <SectionBadge>Testimonios</SectionBadge>
          <h2 className="mt-5 text-4xl leading-tight text-text sm:text-5xl">Lo que dicen los estudiantes</h2>
          <p className="mt-4 text-text/75">Experiencias de quienes ya cursaron la materia.</p>
          <Link
            to="/registro"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Crear mi cuenta
            <Icon d={icons.arrowRight} className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="flex flex-col rounded-[1.75rem] bg-surface p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <span className="font-heading text-5xl leading-none text-primary">“</span>
                <div className="flex text-accent" aria-label="5 de 5 estrellas">
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon key={i} className="h-3.5 w-3.5" />
                  ))}
                </div>
              </div>
              <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-text/80">{t.quote}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary">
                  {t.name[0]}
                </span>
                <div>
                  <p className="text-sm font-semibold text-text">{t.name}</p>
                  <p className="text-xs text-muted">{t.detail}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
