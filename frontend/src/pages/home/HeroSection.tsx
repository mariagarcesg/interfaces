import { Link } from 'react-router'
import { Icon } from '../../components/icons'
import { icons } from '../../components/iconPaths'
import { INFO_ITEMS } from './content'
import SectionBadge from './SectionBadge'

export default function HeroSection() {
  return (
    <section id="inicio" className="relative">
      {/* Imagen de fondo con degradado crema a la izquierda para que el texto se lea */}
      <div className="relative overflow-hidden rounded-b-[2.5rem] lg:rounded-b-[4rem]">
        <img
          src="/images/hero.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[65%_center]"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/90 to-background/55 sm:via-background/85 sm:to-background/10 lg:via-background/60" />
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-background/80 to-transparent" />

        <div className="relative mx-auto max-w-6xl px-4 pt-32 pb-36 sm:pt-40 sm:pb-44">
          <div className="max-w-2xl">
            <SectionBadge>Plataforma oficial de la materia</SectionBadge>

            <h1 className="mt-6 text-[2.75rem] leading-[1.05] text-text sm:text-6xl lg:text-7xl">
              Aprende a tu ritmo,
              <br />
              logra tus <span className="text-primary italic">metas</span>
            </h1>

            <p className="mt-6 max-w-md text-lg text-text/75">
              Evaluaciones en línea y resultados al instante. Todo lo de la materia en un solo lugar.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/registro"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-primary/20 transition-colors hover:bg-primary-hover"
              >
                Crear cuenta
                <Icon d={icons.arrowRight} className="h-4 w-4" />
              </Link>
              <Link to="/login" className="group inline-flex items-center gap-3 text-sm font-medium text-text">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-text/20 bg-surface/70 backdrop-blur transition-colors group-hover:bg-surface">
                  <Icon d={icons.login} className="h-4 w-4" />
                </span>
                Ya tengo cuenta
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Barra flotante sobre el borde inferior del hero */}
      <div className="relative z-10 mx-auto -mt-14 max-w-5xl px-4">
        <div className="flex flex-col gap-2 rounded-3xl bg-surface p-3 shadow-xl shadow-primary/10 sm:flex-row sm:items-center sm:rounded-full sm:pl-6">
          <div className="grid flex-1 gap-4 p-3 sm:grid-cols-3 sm:divide-x sm:divide-border sm:p-0">
            {INFO_ITEMS.map((item) => (
              <div key={item.label} className="flex items-center gap-3 sm:px-4 sm:first:pl-0">
                <Icon d={item.icon} className="h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-xs text-muted">{item.label}</p>
                  <p className="text-sm font-medium text-text">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/registro"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Comenzar
            <Icon d={icons.arrowRight} className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
