import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { Card3D } from '../Card3D';

import umsaEstadisticaLogo from '@/assets/images/alianzas/UMSA - estadistica.avif';
import umsaLogo from '@/assets/images/alianzas/UMSA.png';
import caeAdminLogo from '@/assets/images/alianzas/UMSA carrera admin-empresas.png';

const ALLIANCES = [
  {
    name: 'UMSA',
    subtitle: 'Carrera de Estadística',
    detail: 'Facultad de Ciencias Puras y Naturales',
    logo: umsaEstadisticaLogo,
    color: '#00ffb3',
  },
  {
    name: 'UMSA',
    subtitle: 'Carrera de Informática',
    detail: 'Facultad de Ciencias Puras y Naturales',
    logo: umsaLogo,
    color: '#7b2fff',
  },
  {
    name: 'CAE',
    subtitle: 'Administración de Empresas',
    detail: 'Ciencias Económicas y Financieras',
    logo: caeAdminLogo,
    color: '#3700ff',
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export const AlliancesSection: React.FC = () => {
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: '#080e1c' }}>
      {/* BG glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{ background: 'radial-gradient(circle,rgba(0,255,179,0.04) 0%,transparent 65%)', filter: 'blur(80px)' }} />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(0,255,179,0.15),transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          className="flex justify-center mb-6"
        >
          <span
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
            style={{ border: '1px solid rgba(0,255,179,0.25)', color: '#00ffb3', background: 'rgba(0,255,179,0.07)' }}
          >
            <Award size={12} /> Alianzas Académicas
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="text-3xl md:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Instituciones que confían en{' '}
          <span style={{ color: '#00ffb3' }}>Bayesmath</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="text-gray-500 text-sm mb-16"
        >
          Trabajamos junto a las mejores instituciones académicas de Bolivia para impulsar la ciencia de datos.
        </motion.p>

        {/* Alliance cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-wrap justify-center items-stretch gap-6 max-w-3xl mx-auto"
        >
          {ALLIANCES.map((al, idx) => (
            <motion.div key={idx} variants={itemVariants} className="w-full sm:w-56">
              <Card3D glowColor={`${al.color}20`} intensity={13} className="h-full rounded-2xl">
                <div
                  className="h-full flex flex-col items-center gap-5 py-8 px-6 rounded-2xl"
                  style={{
                    background: 'linear-gradient(145deg,#0d1424 0%,#080d18 100%)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  {/* Logo image container */}
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center relative overflow-hidden"
                    style={{
                      background: `${al.color}10`,
                      border: `1.5px solid ${al.color}30`,
                      boxShadow: `0 0 24px ${al.color}15`,
                    }}
                  >
                    {/* Inner glow ring */}
                    <div className="absolute inset-0 rounded-2xl"
                      style={{ background: `radial-gradient(circle at 30% 30%, ${al.color}15 0%, transparent 60%)` }} />
                    <img
                      src={al.logo}
                      alt={`${al.name} – ${al.subtitle}`}
                      className="relative z-10 w-14 h-14 object-contain"
                      style={{ filter: 'brightness(1.05) drop-shadow(0 0 6px rgba(255,255,255,0.12))' }}
                    />
                  </div>

                  {/* Labels */}
                  <div className="text-center">
                    <div
                      className="font-bold text-white text-base mb-1"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {al.name}
                    </div>
                    <div className="text-sm font-medium mb-2" style={{ color: al.color }}>
                      {al.subtitle}
                    </div>
                    <div className="text-gray-500 text-xs uppercase tracking-wider leading-relaxed">
                      {al.detail}
                    </div>
                  </div>

                  {/* Bottom bar */}
                  <div className="w-10 h-[2px] rounded-full mt-auto"
                    style={{ background: `linear-gradient(90deg,${al.color},transparent)` }} />
                </div>
              </Card3D>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(55,0,255,0.15),transparent)' }} />
    </section>
  );
};
