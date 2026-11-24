import { useRef } from 'react'
import { Link } from 'react-router'
import { Icon } from '../../components/icons'
import { icons } from '../../components/iconPaths'
import { UNITS } from './content'
import SectionBadge from './SectionBadge'

export default function UnitsSection() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const card = track.firstElementChild as HTMLElement | null
    track.scrollBy({ left: dir * ((card?.offsetWidth ?? 300) + 24), behavior: 'smooth' })
  }

  return (
    <section id="contenido" className="scroll-mt-8 pb-20 sm:pb-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionBadge>Contenido</SectionBadge>
            <h2 className="mt-5 text-4xl text-text sm:text-5xl">Unidades de la materia</h2>
            <p className="mt-3 text-text/90">
              Un recorrido desde la historia de los lenguajes hasta su implementación.
            </p>
          </div>
          <div className="flex gap-3">
            {([-1, 1] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => scroll(dir)}
                aria-label={dir === -1 ? 'Anterior' : 'Siguiente'}
                className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
                  dir === 1
                    ? 'bg-primary text-on-primary hover:bg-primary-hover'
                    : 'border border-border bg-surface text-text hover:bg-background'
                }`}
              >
                <Icon d={dir === 1 ? icons.arrowRight : icons.arrowLeft} className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        <div ref={trackRef} className="no-scrollbar mt-10 -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4">
          {UNITS.map((u) => (
            <article
              key={u.tag}
              className="w-[85%] shrink-0 snap-start rounded-[1.75rem] bg-surface p-3 shadow-sm transition-shadow hover:shadow-lg sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <div className="relative">
                <img src={u.image} alt="" loading="lazy" className="h-52 w-full rounded-[1.25rem] object-cover" />
                <span className="absolute top-3 right-3 rounded-full bg-surface/90 px-3 py-1 text-xs font-medium text-text backdrop-blur">
                  {u.tag}
                </span>
              </div>
              <div className="flex items-end justify-between gap-3 px-2 pt-4 pb-2">
                <div>
                  <h3 className="font-body text-base font-semibold text-text">{u.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted">{u.description}</p>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                    <span className="inline-flex items-center gap-1">
                      <Icon d={icons.layers} className="h-3.5 w-3.5" /> {u.topics} temas
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Icon d={icons.clipboard} className="h-3.5 w-3.5" /> {u.evaluations} eval.
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Icon d={icons.calendar} className="h-3.5 w-3.5" /> {u.weeks} sem.
                    </span>
                  </div>
                </div>
                <Link
                  to="/registro"
                  aria-label={`Ver ${u.title}`}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary transition-colors hover:bg-primary-hover"
                >
                  <Icon d={icons.arrowUpRight} className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
