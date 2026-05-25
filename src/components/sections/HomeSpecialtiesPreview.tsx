import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart2, Binary, LineChart, Code, FlaskConical, Calculator } from 'lucide-react';
import { useListSpecialties } from '@workspace/api-client-react';
import { Card3D } from '../Card3D';

const ICONS = [BarChart2, Binary, LineChart, Code, FlaskConical, Calculator];
const COLORS = ['#00ffb3', '#7b2fff', '#3700ff', '#00ffb3', '#7b2fff', '#3700ff'];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

interface HomeSpecialtiesPreviewProps {
  onNavigate?: (id: string) => void;
}

export const HomeSpecialtiesPreview: React.FC<HomeSpecialtiesPreviewProps> = ({ onNavigate }) => {
  const { data: specialties, isLoading } = useListSpecialties();
  const [hovered, setHovered] = useState<number | null>(null);

  const items = isLoading
    ? [
        'Álgebra Lineal Aplicada', 'Probabilidad y Estadística',
        'Visualización y Data Storytelling', 'Iniciación en Python',
        'Investigación Operativa', 'Cálculo Diferencial e Integral',
      ].map((t, i) => ({
        id: i + 1,
        title: t,
        thumbnailUrl: null,
        level: 'Básico',
        studentsCount: 0,
        icon: i.toString(),
        color: COLORS[i % COLORS.length],
      }))
    : specialties ?? [];

  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: 'radial-gradient(circle at center, #0f1c32 0%, #050a14 100%)' }}
    >
      {/* Decorative orbs */}
      <div className="absolute top-0 right-1/4 w-72 h-72 pointer-events-none rounded-full"
        style={{ background: 'radial-gradient(circle,rgba(123,47,255,0.07) 0%,transparent 70%)', filter: 'blur(50px)' }} />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 pointer-events-none rounded-full"
        style={{ background: 'radial-gradient(circle,rgba(0,255,179,0.06) 0%,transparent 70%)', filter: 'blur(50px)' }} />

      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(0,255,179,0.2),transparent)' }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Explora nuestras{' '}
            <span style={{ color: '#00ffb3' }}>especialidades</span>
          </h2>
          <p className="text-gray-400 text-base max-w-xl leading-relaxed">
            Programas diseñados para llevarte de cero a experto en Ciencia de Datos e Inteligencia Artificial.
          </p>
          <div className="mt-5 h-[2px] w-16 rounded-full" style={{ background: 'linear-gradient(90deg,#00ffb3,transparent)' }} />
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12"
        >
          {items.slice(0, 6).map((spec, idx) => {
            const iconIdx = spec.icon ? parseInt(spec.icon) : idx;
            const Icon = ICONS[iconIdx % ICONS.length] || BarChart2;
            const color = spec.color || COLORS[idx % COLORS.length];
            return (
              <motion.div
                key={spec.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              >
                <a
                  href={`#specialty-${spec.id}`}
                  className="block h-full cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.hash = `specialty-${spec.id}`;
                    onNavigate?.('especialidades');
                  }}
                >
                  <Card3D
                    glowColor={`${color}44`}
                    intensity={12}
                    className="h-full rounded-2xl"
                  >
                    <div
                      className="flex items-center gap-4 px-5 py-4 rounded-2xl h-full transition-all duration-300"
                      style={{
                        background: hovered === spec.id
                          ? `linear-gradient(135deg,${color}12 0%,rgba(8,13,24,0.95) 100%)`
                          : 'linear-gradient(135deg,rgba(13,20,36,0.9) 0%,rgba(8,13,24,0.9) 100%)',
                        border: hovered === spec.id
                          ? `1px solid ${color}60`
                          : '1px solid rgba(255,255,255,0.07)',
                        boxShadow: hovered === spec.id
                          ? `0 10px 30px -10px ${color}40`
                          : 'none',
                      }}
                      onMouseEnter={() => setHovered(spec.id)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      {/* Icon block */}
                      <div
                        className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center transition-transform duration-300"
                        style={{
                          background: `${color}12`,
                          border: `1px solid ${color}25`,
                          transform: hovered === spec.id ? 'scale(1.1)' : 'scale(1)',
                        }}
                      >
                        <Icon size={20} style={{ color }} />
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold text-white leading-snug line-clamp-2 block">
                          {spec.title}
                        </span>
                        {spec.level && (
                          <span className="text-[10px] mt-1 block" style={{ color: `${color}bb` }}>
                            {spec.level}
                          </span>
                        )}
                      </div>

                      <ArrowRight
                        size={14}
                        className="shrink-0 transition-all duration-300"
                        style={{
                          color,
                          opacity: hovered === spec.id ? 1 : 0.3,
                          transform: hovered === spec.id ? 'translateX(4px)' : 'translateX(0)',
                        }}
                      />
                    </div>
                  </Card3D>
                </a>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.04, borderColor: 'rgba(0,255,179,0.5)', boxShadow: '0 0 20px rgba(0,255,179,0.2)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate?.('especialidades')}
            className="flex items-center gap-2.5 px-9 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer transition-all duration-300"
            style={{ border: '1.5px solid rgba(255,255,255,0.18)', background: 'transparent' }}
          >
            Ver todas las especialidades <ArrowRight size={14} />
          </motion.button>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(55,0,255,0.2),transparent)' }} />
    </section>
  );
};
