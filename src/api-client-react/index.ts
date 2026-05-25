import { useQuery } from '@tanstack/react-query';
import { SPECIALTIES_DATA } from '@/data/specialtiesData';
import docenteAvatar from '@/assets/images/docentes/perfil docentes.avif';

// ── Course thumbnail assets ────────────────────────────────────────────────
import curso1Img from '@/assets/images/cursos/curso 1.png';
import curso2Img from '@/assets/images/cursos/curso 2.png';
import curso3Img from '@/assets/images/cursos/curso 3.png';
import curso4Img from '@/assets/images/cursos/curso 4.png';
import curso5Img from '@/assets/images/cursos/curso 5.png';
import curso6Img from '@/assets/images/cursos/curso 6.png';

// ── Types ──────────────────────────────────────────────────────────────────
export interface Instructor {
  id: number;
  name: string;
  title: string;
  bio: string;
  avatarUrl: string | null;
  phone?: string;
  email?: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  videoUrl: string | null;
  thumbnailUrl: string | null;
  duration: string;
  studentsCount: number;
  isFeatured: boolean;
  price?: number;
  instructor: Instructor | null;
}

export interface Specialty {
  id: number;
  name: string;
  title: string;
  description: string;
  icon: string | null;
  color: string | null;
  level: string;
  thumbnailUrl: string | null;
  studentsCount: number;
  skills: string[];
  courses: Course[];
}

export interface CommunityStats {
  studentsCount: number;
  coursesCount: number;
  specialtiesCount: number;
  instructorsCount: number;
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  color: string;
}

// ── Static mock data ────────────────────────────────────────────────────────
const MOCK_INSTRUCTORS: Instructor[] = [
  {
    id: 1,
    name: 'Dr. Carlos Mendoza',
    title: 'PhD en Estadística Bayesiana - UMSA',
    bio: 'Investigador con más de 10 años en estadística aplicada y machine learning. Docente en la carrera de Estadística de la UMSA. Ha publicado más de 20 artículos en revistas indexadas.',
    avatarUrl: docenteAvatar,
    phone: '+591 765 43210',
    email: 'c.mendoza@bayesmath.com',
  },
  {
    id: 2,
    name: 'MSc. Ana Quispe',
    title: 'Magíster en Ciencia de Datos - UMSA',
    bio: 'Especialista en visualización de datos y Python científico. Investigadora activa en bioestadística y epidemiología. Mentora en programas de investigación juvenil.',
    avatarUrl: docenteAvatar,
    phone: '+591 789 01234',
    email: 'a.quispe@bayesmath.com',
  },
  {
    id: 3,
    name: 'Lic. Rodrigo Flores',
    title: 'Especialista en ML e IA - UMSA',
    bio: 'Consultor en inteligencia artificial y modelos predictivos para empresas e instituciones públicas de Bolivia. Docente en posgrado de ciencias computacionales.',
    avatarUrl: docenteAvatar,
    phone: '+591 712 34567',
    email: 'r.flores@bayesmath.com',
  },
];

const MOCK_COURSES: Course[] = [
  {
    id: 1,
    title: 'Investigación Operativa I',
    description: 'Programación Lineal con Enfoque Computacional. Aprende a modelar y resolver problemas de optimización con herramientas computacionales modernas.',
    category: 'Estadística',
    level: 'Intermedio',
    videoUrl: null,
    thumbnailUrl: curso1Img,
    duration: '40h',
    studentsCount: 1240,
    isFeatured: true,
    instructor: MOCK_INSTRUCTORS[0],
  },
  {
    id: 2,
    title: 'Estadística II – Inferencia Estadística',
    description: 'Domina los fundamentos de la inferencia estadística: estimación, pruebas de hipótesis y análisis de regresión con datos reales.',
    category: 'Estadística',
    level: 'Básico',
    videoUrl: null,
    thumbnailUrl: curso2Img,
    duration: '32h',
    studentsCount: 3800,
    isFeatured: true,
    instructor: MOCK_INSTRUCTORS[1],
  },
  {
    id: 3,
    title: 'Metodología BayesMath',
    description: 'Introducción a la metodología propia de BayesMath: el Método VEH™ aplicado a estadística, matemáticas e IA para investigadores y docentes.',
    category: 'ML',
    level: 'Básico',
    videoUrl: null,
    thumbnailUrl: curso3Img,
    duration: '20h',
    studentsCount: 890,
    isFeatured: false,
    instructor: MOCK_INSTRUCTORS[2],
  },
  {
    id: 4,
    title: 'Procesos Estocásticos – Base',
    description: 'Fundamentos de los procesos estocásticos: cadenas de Markov, variabilidad, estructura de dependencia y aplicaciones en sistemas reales.',
    category: 'Estadística',
    level: 'Intermedio',
    videoUrl: null,
    thumbnailUrl: curso4Img,
    duration: '28h',
    studentsCount: 560,
    isFeatured: false,
    instructor: MOCK_INSTRUCTORS[0],
  },
  {
    id: 5,
    title: 'Análisis de Series de Tiempo',
    description: 'Modelos ARIMA, VAR y redes neuronales recurrentes para el análisis y pronóstico de series de tiempo con datos económicos y financieros.',
    category: 'ML',
    level: 'Avanzado',
    videoUrl: null,
    thumbnailUrl: curso5Img,
    duration: '60h',
    studentsCount: 2100,
    isFeatured: true,
    instructor: MOCK_INSTRUCTORS[2],
  },
  {
    id: 6,
    title: 'Evaluación de Modelos de Machine Learning',
    description: 'Aprende a evaluar modelos con métricas correctas, evitar data leakage y ajustar hiperparámetros con criterios basados en evidencia.',
    category: 'ML',
    level: 'Avanzado',
    videoUrl: null,
    thumbnailUrl: curso6Img,
    duration: '20h',
    studentsCount: 4200,
    isFeatured: false,
    instructor: MOCK_INSTRUCTORS[1],
  },
];

const MOCK_SPECIALTIES: Specialty[] = SPECIALTIES_DATA.map(spec => ({
  id: spec.id,
  name: spec.name,
  title: spec.title,
  description: spec.description,
  icon: spec.iconIndex.toString(),
  color: spec.color,
  level: spec.level,
  thumbnailUrl: spec.thumbnailUrl,
  studentsCount: spec.studentsCount,
  skills: spec.skills,
  courses: MOCK_COURSES.filter(c => spec.courseIds.includes(c.id)),
}));

const MOCK_COMMUNITY_STATS: CommunityStats = {
  studentsCount: 12000,
  coursesCount: 6,
  specialtiesCount: 6,
  instructorsCount: 3,
};

const MOCK_SOCIAL_LINKS: SocialLink[] = [
  { id: 1, platform: 'Instagram', url: 'https://instagram.com/bayesmath', color: '#E1306C' },
  { id: 2, platform: 'YouTube', url: 'https://youtube.com/@bayesmath', color: '#FF0000' },
  { id: 3, platform: 'TikTok', url: 'https://tiktok.com/@bayesmath', color: '#000000' },
  { id: 4, platform: 'LinkedIn', url: 'https://linkedin.com/company/bayesmath', color: '#0A66C2' },
  { id: 5, platform: 'Facebook', url: 'https://facebook.com/bayesmath', color: '#1877F2' },
];

// ── Hooks ───────────────────────────────────────────────────────────────────
export function useListCourses(params?: { category?: string }) {
  return useQuery<Course[]>({
    queryKey: ['courses', params],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 300));
      if (params?.category) {
        return MOCK_COURSES.filter(c => c.category === params.category);
      }
      return MOCK_COURSES;
    },
  });
}

export function useListSpecialties() {
  return useQuery<Specialty[]>({
    queryKey: ['specialties'],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 300));
      return MOCK_SPECIALTIES;
    },
  });
}

export function useListInstructors() {
  return useQuery<Instructor[]>({
    queryKey: ['instructors'],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 300));
      return MOCK_INSTRUCTORS;
    },
  });
}

export function useGetCommunityStats() {
  return useQuery<CommunityStats>({
    queryKey: ['community-stats'],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 300));
      return MOCK_COMMUNITY_STATS;
    },
  });
}

export function useListSocialLinks() {
  return useQuery<SocialLink[]>({
    queryKey: ['social-links'],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 300));
      return MOCK_SOCIAL_LINKS;
    },
  });
}
