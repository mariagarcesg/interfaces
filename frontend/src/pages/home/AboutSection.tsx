import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useEffect, useRef } from 'react'
import { Icon } from '../../components/icons'
import { icons } from '../../components/iconPaths'
import { ABOUT_FEATURES } from './content'
import SectionBadge from './SectionBadge'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  // Revelado de texto por líneas con máscara (como la demo "Text Masking" de GSAP):
  // cada línea sube desde abajo de su máscara a medida que se hace scroll.
  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const text = textRef.current
    if (!section || !heading || !text) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      SplitText.create([heading, text], {
        type: 'lines',
        mask: 'lines',
        // Vuelve a dividir al cargar las fuentes o cambiar el ancho; la animación
        // devuelta se reconstruye con las nuevas líneas.
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110,
            opacity: 0,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: { trigger: section, start: 'top 75%', end: 'center 45%', scrub: 0.8 },
          }),
      })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="sobre" className="scroll-mt-8 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-[1.15fr_1fr_0.85fr] lg:gap-12">
        <img
          src="/images/about.jpg"
          alt="Estudiantes programando juntos"
          className="h-72 w-full rounded-[2rem] object-cover shadow-lg sm:h-96"
          loading="lazy"
        />

        <div>
          <SectionBadge>Sobre la materia</SectionBadge>
          <h2 ref={headingRef} className="mt-5 text-4xl leading-tight text-text sm:text-5xl">
            Más que sintaxis
          </h2>
          <p ref={textRef} className="mt-5 text-text/90">
            Aprender un lenguaje es fácil cuando entiendes los conceptos que hay detrás. En esta materia estudiarás
            gramáticas, semántica, sistemas de tipos y paradigmas para que puedas aprender cualquier lenguaje nuevo
            y elegir el adecuado para cada problema.
          </p>
          <a
            href="#contenido"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-on-primary transition-colors hover:bg-primary-hover"
          >
            Ver contenido
            <Icon d={icons.arrowRight} className="h-4 w-4" />
          </a>
        </div>

        <ul className="space-y-7 lg:border-l lg:border-border lg:pl-10">
          {ABOUT_FEATURES.map((f) => (
            <li key={f.title} className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-primary-ink">
                <Icon d={f.icon} className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-text">{f.title}</p>
                <p className="text-sm text-text/80">{f.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
