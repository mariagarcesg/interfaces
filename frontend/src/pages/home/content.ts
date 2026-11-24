import { icons } from '../../components/iconPaths'

// Contenido del home de "Lenguajes de Programación". Más adelante parte de esto podrá
// editarlo el profesor desde su panel.

export const INFO_ITEMS = [
  { icon: icons.code, label: 'Paradigmas', value: 'Imperativo, funcional, lógico' },
  { icon: icons.clipboard, label: 'Evaluaciones', value: 'Teoría y práctica en línea' },
  { icon: icons.bolt, label: 'Resultados', value: 'Calificación al instante' },
]

export const ABOUT_FEATURES = [
  {
    icon: icons.layers,
    title: 'Paradigmas de programación',
    text: 'Imperativo, orientado a objetos, funcional y lógico.',
  },
  {
    icon: icons.book,
    title: 'Sintaxis y semántica',
    text: 'Gramáticas, BNF y el significado de cada programa.',
  },
  {
    icon: icons.code,
    title: 'Compiladores e intérpretes',
    text: 'Cómo el código fuente llega a ejecutarse.',
  },
]

export const UNITS = [
  {
    tag: 'Unidad 1',
    title: 'Evolución de los lenguajes',
    description: 'De Fortran y Lisp a Rust: criterios para evaluar y comparar lenguajes.',
    image: '/images/unidad-1.jpg',
    topics: 4,
    evaluations: 1,
    weeks: 3,
  },
  {
    tag: 'Unidad 2',
    title: 'Sintaxis y semántica',
    description: 'Gramáticas libres de contexto, BNF, árboles de derivación y ambigüedad.',
    image: '/images/unidad-2.jpg',
    topics: 5,
    evaluations: 2,
    weeks: 4,
  },
  {
    tag: 'Unidad 3',
    title: 'Nombres, tipos y alcance',
    description: 'Ligaduras, tiempo de vida, sistemas de tipos y alcance estático vs. dinámico.',
    image: '/images/unidad-3.jpg',
    topics: 4,
    evaluations: 2,
    weeks: 3,
  },
  {
    tag: 'Unidad 4',
    title: 'Paradigmas de programación',
    description: 'Programación imperativa, orientada a objetos, funcional y lógica en la práctica.',
    image: '/images/unidad-4.jpg',
    topics: 5,
    evaluations: 2,
    weeks: 4,
  },
  {
    tag: 'Unidad 5',
    title: 'Compiladores e intérpretes',
    description: 'Análisis léxico y sintáctico, código intermedio y máquinas virtuales.',
    image: '/images/about.jpg',
    topics: 3,
    evaluations: 1,
    weeks: 3,
  },
]

// Tarjetas de la pila animada (GSAP). Por ahora solo color de fondo; `bg` acepta
// también una imagen, p. ej. 'url(/images/python.jpg) center/cover'.
export const STACK_CARDS: { name: string; paradigm: string; year: number; bg: string; light?: boolean }[] = [
  { name: 'Python', paradigm: 'Multiparadigma', year: 1991, bg: '#fccf51', light: true },
  { name: 'Haskell', paradigm: 'Funcional', year: 1990, bg: '#50d1fd', light: true },
  { name: 'Java', paradigm: 'Orientado a objetos', year: 1995, bg: '#fca851', light: true },
  { name: 'Prolog', paradigm: 'Lógico', year: 1972, bg: '#51fcc9', light: true },
  { name: 'C', paradigm: 'Imperativo', year: 1972, bg: '#f7fbfc', light: true },
  { name: 'Lisp', paradigm: 'Funcional', year: 1958, bg: '#08171c' },
]
