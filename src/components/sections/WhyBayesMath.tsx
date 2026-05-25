import React from 'react';
import { motion } from 'framer-motion';
import { Eye, BookOpen, Code2, TrendingUp } from 'lucide-react';
import { Card3D } from '../Card3D';

const steps = [
  {
    step: 'PASO 01 · INTUICIÓN',
    num: '01',
    title: 'Ves',
    description:
      'Empiezas por la intuición. Cada concepto cobra vida en una MicroCápsula BAYESMATH: un video breve con animaciones claras que te muestran cómo funciona antes de cualquier fórmula.',
    icon: Eye,
    color: '#00ffb3',
    glow: 'rgba(0,255,179,0.18)',
  },
  {
    step: 'PASO 02 · RIGOR',
    num: '02',
    title: 'Entiendes',
    description:
      'Ahí llega el rigor. Abres el PDF de la lección con definiciones, teoremas y demostraciones paso a paso. Ahora cada símbolo significa algo — porque ya lo viste en acción.',
    icon: BookOpen,
    color: '#7b2fff',
    glow: 'rgba(123,47,255,0.18)',
  },
  {
    step: 'PASO 03 · APLICACIÓN',
    num: '03',
    title: 'Haces',
    description:
      'Ejecutas el notebook de Jupyter en Google Colab con datos reales del INE, del Banco Central y de tu propia realidad boliviana. Modificas, corres y compruebas que el concepto funciona.',
    icon: Code2,
    color: '#3700ff',
    glow: 'rgba(55,0,255,0.18)',
  },
  {
    step: 'RESULTADO · EMPODERAMIENTO',
    num: '✓',
    title: 'Transformas',
    description:
      'Ya no solo aprendiste: te empoderaste. Sales con el criterio cuantitativo para destacar como estudiante y transformar tu país con datos.',
    icon: TrendingUp,
    color: '#00ffb3',
    glow: 'rgba(0,255,179,0.18)',
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export const WhyBayesMath: React.FC = () => {
  return (
    <section className="relative py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg,#07101f 0%,#050814 100%)' }}>
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(0,255,179,0.05) 0%,transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(123,47,255,0.05) 0%,transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(0,255,179,0.25),transparent)' }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            ¿Por qué{' '}
            <span style={{ color: '#00ffb3' }}>BayesMath</span>?
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Porque en nuestra academia{' '}
            <span className="font-semibold" style={{ color: '#00ffb3' }}>ves</span>,{' '}
            <span className="font-semibold" style={{ color: '#7b2fff' }}>entiendes</span> y{' '}
            <span className="font-semibold" style={{ color: '#3700ff' }}>haces</span>. Esa es la fórmula
            con la que aprendes ciencia de datos, estadística e inteligencia artificial con intuición,
            rigor y aplicación real.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.title} variants={cardVariants} className="h-full">
                <Card3D glowColor={s.glow} intensity={12} className="h-full rounded-2xl">
                  <div
                    className="h-full rounded-2xl p-7 flex flex-col relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(145deg,#0d1424 0%,#080d18 100%)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    {/* Large faded number in background */}
                    <div
                      className="absolute top-3 right-4 text-7xl font-black leading-none select-none pointer-events-none"
                      style={{ color: `${s.color}08`, fontFamily: 'Poppins, sans-serif' }}
                    >
                      {s.num}
                    </div>

                    {/* Icon */}
                    <div
                      className="w-13 h-13 w-[52px] h-[52px] rounded-2xl flex items-center justify-center mb-6 shrink-0"
                      style={{
                        background: `${s.color}12`,
                        border: `1px solid ${s.color}28`,
                        boxShadow: `0 0 20px ${s.color}10`,
                      }}
                    >
                      <Icon size={24} style={{ color: s.color }} />
                    </div>

                    {/* Step label */}
                    <span
                      className="text-[9px] font-bold tracking-[0.14em] uppercase mb-2"
                      style={{ color: s.color }}
                    >
                      {s.step}
                    </span>

                    {/* Title */}
                    <h3
                      className="text-2xl font-bold text-white mb-4"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {s.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                      {s.description}
                    </p>

                    {/* Bottom accent line */}
                    <div
                      className="mt-6 h-[2px] w-10 rounded-full"
                      style={{ background: `linear-gradient(90deg,${s.color},transparent)` }}
                    />
                  </div>
                </Card3D>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(55,0,255,0.25),transparent)' }} />
    </section>
  );
};
