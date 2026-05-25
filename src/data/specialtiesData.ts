import imageSpec from '@/assets/images/especialidades/imagen 1.png';

export interface SpecialtyDataRaw {
  id: number;
  name: string;
  title: string;
  description: string;
  iconIndex: number;
  color: string;
  level: string;
  thumbnailUrl: string;
  studentsCount: number;
  skills: string[];
  courseIds: number[];
}

export const SPECIALTIES_DATA: SpecialtyDataRaw[] = [
  {
    id: 1,
    name: 'Álgebra Lineal Aplicada',
    title: 'Álgebra Lineal Aplicada',
    description: 'Desarrolla una base sólida en álgebra lineal enfocada en sus aplicaciones prácticas en ciencia de datos, machine learning y optimización computacional.',
    iconIndex: 5, // Calculator
    color: '#00ffb3',
    level: 'Básico - Intermedio',
    thumbnailUrl: imageSpec,
    studentsCount: 1450,
    skills: ['Vectores y Matrices', 'Transformaciones Lineales', 'Descomposición SVD', 'Autovalores y Autovectores', 'Aplicaciones en ML', 'Optimización'],
    courseIds: [3, 6],
  },
  {
    id: 2,
    name: 'Probabilidad y Estadística',
    title: 'Probabilidad y Estadística',
    description: 'Domina el razonamiento probabilístico y las herramientas estadísticas esenciales para tomar decisiones basadas en datos y construir modelos predictivos confiables.',
    iconIndex: 0, // BarChart2
    color: '#7b2fff',
    level: 'Básico - Avanzado',
    thumbnailUrl: imageSpec,
    studentsCount: 2890,
    skills: ['Probabilidad Condicional', 'Variables Aleatorias', 'Inferencia Bayesiana', 'Teorema del Límite Central', 'Modelos Probabilísticos', 'R & Python'],
    courseIds: [2, 4],
  },
  {
    id: 3,
    name: 'Visualización y Data Storytelling',
    title: 'Visualización y Data Storytelling',
    description: 'Aprende a transformar datos complejos en narrativas visuales impactantes y comprensibles, facilitando la toma de decisiones estratégicas.',
    iconIndex: 2, // LineChart
    color: '#3700ff',
    level: 'Básico - Intermedio',
    thumbnailUrl: imageSpec,
    studentsCount: 1980,
    skills: ['Matplotlib & Seaborn', 'Tableau & PowerBI', 'Diseño de Dashboards', 'Comunicación Efectiva', 'ggplot2', 'Narrativa de Datos'],
    courseIds: [2, 5],
  },
  {
    id: 4,
    name: 'Iniciación en Python',
    title: 'Iniciación en Python',
    description: 'Da tus primeros pasos en el lenguaje de programación más popular del mundo, enfocado desde el primer día en la manipulación y análisis de datos.',
    iconIndex: 3, // Code
    color: '#00ffb3',
    level: 'Básico',
    thumbnailUrl: imageSpec,
    studentsCount: 3500,
    skills: ['Sintaxis Básica', 'Estructuras de Datos', 'Programación Orientada a Objetos', 'Numpy & Pandas', 'Control de Flujo', 'Scripting'],
    courseIds: [3],
  },
  {
    id: 5,
    name: 'Investigación Operativa',
    title: 'Investigación Operativa',
    description: 'Aprende a formular y resolver problemas complejos de toma de decisiones y asignación óptima de recursos utilizando algoritmos matemáticos avanzados.',
    iconIndex: 4, // FlaskConical
    color: '#7b2fff',
    level: 'Intermedio - Avanzado',
    thumbnailUrl: imageSpec,
    studentsCount: 1120,
    skills: ['Programación Lineal', 'Método Simplex', 'Optimización de Redes', 'Modelos de Inventario', 'Teoría de Colas', 'Modelado con Python'],
    courseIds: [1],
  },
  {
    id: 6,
    name: 'Cálculo Diferencial e Integral',
    title: 'Cálculo Diferencial e Integral',
    description: 'Comprende los conceptos fundamentales del cambio y la acumulación, esenciales para entender los algoritmos de optimización en inteligencia artificial.',
    iconIndex: 1, // Binary
    color: '#3700ff',
    level: 'Básico - Intermedio',
    thumbnailUrl: imageSpec,
    studentsCount: 1650,
    skills: ['Límites y Continuidad', 'Derivadas y Optimización', 'Integración Numérica', 'Cálculo Multivariable', 'Series e Infinitos', 'Física Matemática'],
    courseIds: [4, 1],
  },
];
