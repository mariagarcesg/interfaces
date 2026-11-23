import { icons } from '../../components/iconPaths'

// Contenido de ejemplo del home. Más adelante parte de esto podrá editarlo el profesor
// (unidades reales, testimonios, textos).

export const INFO_ITEMS = [
  { icon: icons.clipboard, label: 'Evaluaciones', value: '100% en línea' },
  { icon: icons.bolt, label: 'Calificación', value: 'Resultados al instante' },
  { icon: icons.clock, label: 'Acceso', value: 'Disponible 24/7' },
]

export const ABOUT_FEATURES = [
  { icon: icons.book, title: 'Contenido organizado', text: 'Material por unidades y temas.' },
  { icon: icons.shield, title: 'Evaluaciones seguras', text: 'Tiempo y acceso controlados.' },
  { icon: icons.chat, title: 'Retroalimentación', text: 'Comentarios directos del profesor.' },
]

export const UNITS = [
  { tag: 'Unidad 1', title: 'Fundamentos', image: '/images/unidad-1.jpg', topics: 4, evaluations: 1, weeks: 3 },
  { tag: 'Unidad 2', title: 'Conceptos clave', image: '/images/unidad-2.jpg', topics: 5, evaluations: 2, weeks: 4 },
  { tag: 'Unidad 3', title: 'Práctica guiada', image: '/images/unidad-3.jpg', topics: 3, evaluations: 2, weeks: 3 },
  { tag: 'Unidad 4', title: 'Proyecto final', image: '/images/unidad-4.jpg', topics: 2, evaluations: 1, weeks: 4 },
]

export const TESTIMONIALS = [
  {
    quote: 'Tener todas las evaluaciones en un solo lugar me ayudó a organizarme mucho mejor durante el semestre.',
    name: 'María G.',
    detail: 'Estudiante',
  },
  {
    quote: 'Ver mi nota al terminar cada evaluación me permitió saber exactamente qué tenía que repasar.',
    name: 'Carlos R.',
    detail: 'Estudiante',
  },
  {
    quote: 'Los comentarios del profesor en cada respuesta fueron lo más útil. Muy fácil de usar.',
    name: 'Andrea P.',
    detail: 'Estudiante',
  },
]
