import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { icons } from '../../components/iconPaths'
import { Icon } from '../../components/icons'
import { STACK_CARDS } from './content'
import SectionBadge from './SectionBadge'

/*
  Pila de tarjetas animada con GSAP (inspirada en la demo "Card stack" de GSAP).
  Cada tarjeta ocupa una "profundidad": 0 es la de adelante y las demás se desplazan
  hacia arriba a la derecha. Al avanzar, la tarjeta de adelante sale hacia abajo,
  las demás avanzan un lugar y la que salió reaparece al fondo de la pila.
  Avanza sola cada pocos segundos y también con clic, Enter o Espacio.
*/

const OFFSET = 16 // separación entre tarjetas (px)
const AUTOPLAY_SECONDS = 3.2

const depthPos = (depth: number) => ({ x: depth * OFFSET, y: -depth * OFFSET })

export default function CardStackSection() {
  const stackRef = useRef<HTMLDivElement>(null)
  const advanceRef = useRef<() => void>(() => {})

  useEffect(() => {
    const root = stackRef.current
    if (!root) return

    const cards = gsap.utils.toArray<HTMLElement>('[data-card]', root)
    const total = cards.length
    let order = cards.map((_, i) => i) // order[profundidad] = índice de tarjeta
    let busy = false
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let autoplay: gsap.core.Tween | null = null

    const scheduleAutoplay = () => {
      autoplay?.kill()
      if (!reduceMotion) autoplay = gsap.delayedCall(AUTOPLAY_SECONDS, () => advanceRef.current())
    }

    const ctx = gsap.context(() => {
      order.forEach((cardIndex, depth) => {
        gsap.set(cards[cardIndex], { ...depthPos(depth), zIndex: total - depth })
      })
    }, root)

    advanceRef.current = () => {
      if (busy) return
      busy = true
      autoplay?.kill()

      const [front, ...rest] = order
      const leaving = cards[front]
      const backPos = depthPos(total - 1)

      ctx.add(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            order = [...rest, front]
            order.forEach((cardIndex, depth) => gsap.set(cards[cardIndex], { zIndex: total - depth }))
            busy = false
            scheduleAutoplay()
          },
        })

        // 1. La tarjeta de adelante sale hacia abajo girando.
        tl.set(leaving, { zIndex: total + 1 })
        tl.to(leaving, { y: 160, rotation: -12, opacity: 0, duration: 0.45, ease: 'power2.in' })

        // 2. Las demás avanzan un lugar.
        rest.forEach((cardIndex, depth) => {
          tl.set(cards[cardIndex], { zIndex: total - depth }, 0)
          tl.to(cards[cardIndex], { ...depthPos(depth), duration: 0.6, ease: 'power3.inOut' }, 0.15)
        })

        // 3. Reaparece al fondo de la pila.
        tl.set(leaving, { zIndex: 0, x: backPos.x, y: backPos.y - 40, rotation: 6 })
        tl.to(leaving, { ...backPos, rotation: 0, opacity: 1, duration: 0.5, ease: 'power3.out' })
      })
    }

    scheduleAutoplay()
    return () => {
      autoplay?.kill()
      ctx.revert()
    }
  }, [])

  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <SectionBadge>Lenguajes</SectionBadge>
          <h2 className="mt-5 text-4xl leading-tight text-text sm:text-5xl lg:text-6xl">
            Muchos lenguajes.
            <br />
            Los mismos principios.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-text/90 lg:mx-0">
            Python, C, Java, Haskell, Prolog… cada lenguaje resuelve los problemas a su manera. Aquí aprenderás qué
            los hace distintos, qué tienen en común y cómo elegir el adecuado.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Link
              to="/registro"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-on-primary transition-colors hover:bg-primary-hover"
            >
              Empezar ahora
              <Icon d={icons.arrowRight} className="h-4 w-4" />
            </Link>
            <span className="text-sm text-text/80">Haz clic en las tarjetas para avanzar</span>
          </div>
        </div>

        {/* Pila de tarjetas */}
        <div className="flex justify-center">
          <div
            ref={stackRef}
            role="button"
            tabIndex={0}
            aria-label="Ver el siguiente lenguaje"
            onClick={() => advanceRef.current()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                advanceRef.current()
              }
            }}
            className="relative h-[calc(300px+5*16px)] w-[calc(220px+5*16px)] cursor-pointer rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:h-[calc(360px+5*16px)] sm:w-[calc(260px+5*16px)]"
          >
            {STACK_CARDS.map((card) => (
              <div
                key={card.name}
                data-card
                className={`absolute bottom-0 left-0 flex h-[300px] w-[220px] flex-col justify-between rounded-2xl border-2 border-white/70 p-4 shadow-xl shadow-text/25 select-none sm:h-[360px] sm:w-[260px] sm:p-5 ${
                  card.light ? 'text-text' : 'text-white'
                }`}
                style={{ background: card.bg }}
              >
                <div className="flex items-center justify-between font-mono text-xs opacity-80">
                  <span>{card.paradigm}</span>
                  <span>{card.year}</span>
                </div>
                <p className="text-center font-heading text-5xl leading-none sm:text-6xl">{card.name}</p>
                <div className="flex rotate-180 items-center justify-between font-mono text-xs opacity-80">
                  <span>{card.paradigm}</span>
                  <span>{card.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
