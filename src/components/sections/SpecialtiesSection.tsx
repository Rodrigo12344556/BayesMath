import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleBackground } from '../ParticleBackground';
import { useListSpecialties } from '@workspace/api-client-react';
import { DetailModal } from '../DetailModal';
import { ArrowRight, Layers, CheckCircle } from 'lucide-react';

export const SpecialtiesSection: React.FC = () => {
  const { data: specialties, isLoading } = useListSpecialties();
  const [selectedSpec, setSelectedSpec] = useState<any | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    if (!isLoading && specialties && specialties.length > 0) {
      const hash = window.location.hash;
      if (hash) {
        const id = decodeURIComponent(hash.replace('#', ''));
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 300);
      }
    }
  }, [isLoading, specialties]);

  return (
    <section id="especialidades" className="relative pt-28 pb-20 min-h-screen overflow-hidden"
      style={{ background: 'linear-gradient(180deg,#050814 0%,#080e1c 100%)' }}
    >
      <ParticleBackground density={50} colors={['#3700ff', '#7b2fff', '#00ffb3']} speedMultiplier={0.75} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-3"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Explora nuestras{' '}
            <span style={{ color: '#00ffb3' }}>especialidades</span>
          </h2>
          <p className="text-gray-400 text-base max-w-lg">
            Programas diseñados para llevarte de cero a experto en Ciencia de Datos e Inteligencia Artificial.
          </p>
          <div className="mt-5 h-[2px] w-16 rounded-full" style={{ background: 'linear-gradient(90deg,#00ffb3,transparent)' }} />
        </motion.div>

        {/* Specialty cards — horizontal list style */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[1, 2].map(i => (
              <div key={i} className="h-48 rounded-2xl animate-pulse" style={{ background: 'rgba(255,255,255,0.04)' }} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {specialties?.map((spec, idx) => (
              <motion.div
                key={spec.id}
                id={`specialty-${spec.id}`}
                data-testid={`card-specialty-${spec.id}`}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.12, duration: 0.55, ease: [0.16,1,0.3,1] }}
                className="relative cursor-pointer group"
                onMouseEnter={() => setHoveredId(spec.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedSpec(spec)}
              >
                <div
                  className="rounded-2xl p-[1.5px] transition-all duration-350"
                  style={{
                    background: hoveredId === spec.id
                      ? 'linear-gradient(163deg,#00ffb3,#3700ff)'
                      : 'rgba(255,255,255,0.06)',
                    boxShadow: hoveredId === spec.id ? '0 0 30px rgba(0,255,179,0.18)' : 'none',
                  }}
                >
                  <div
                    className="rounded-[14px] flex flex-col md:flex-row overflow-hidden transition-transform duration-200"
                    style={{
                      background: 'linear-gradient(135deg,#0d1424 0%,#080d18 100%)',
                      transform: hoveredId === spec.id ? 'scale(0.995)' : 'scale(1)',
                    }}
                  >
                    {/* Left: thumbnail / icon */}
                    <div
                      className="w-full md:w-56 shrink-0 h-44 md:h-auto relative flex items-center justify-center overflow-hidden"
                      style={{ background: 'linear-gradient(135deg,#0a1628,#1a0535)' }}
                    >
                      {spec.thumbnailUrl ? (
                        <img
                          src={spec.thumbnailUrl}
                          alt={spec.title}
                          className="w-full h-full object-cover"
                          style={{ opacity: 0.45 }}
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <Layers size={40} style={{ color: '#00ffb3', opacity: 0.6 }} />
                          <span className="text-xs text-white/30 tracking-widest uppercase">Especialidad</span>
                        </div>
                      )}
                      {/* Level */}
                      <span
                        className="absolute bottom-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(0,0,0,0.75)', color: '#7b2fff', border: '1px solid rgba(123,47,255,0.4)' }}
                      >
                        {spec.level}
                      </span>

                      {/* Hover overlay */}
                      <AnimatePresence>
                        {hoveredId === spec.id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ background: 'rgba(0,0,0,0.5)' }}
                          >
                            <motion.div
                              initial={{ scale: 0.5 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0.5 }}
                              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
                              style={{ background: '#00ffb3', color: '#000' }}
                            >
                              Explorar <ArrowRight size={13} />
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Right: content */}
                    <div className="flex-1 p-7 flex flex-col justify-between">
                      <div>
                        <h3
                          className="text-xl font-bold text-white mb-3 leading-snug"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          {spec.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-5">
                          {spec.description}
                        </p>
                        {/* Skills */}
                        <div className="flex flex-wrap gap-2">
                          {spec.skills?.slice(0, 5).map((skill, i) => (
                            <span
                              key={i}
                              className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full"
                              style={{ background: 'rgba(0,255,179,0.07)', color: '#00ffb3', border: '1px solid rgba(0,255,179,0.15)' }}
                            >
                              <CheckCircle size={10} /> {skill}
                            </span>
                          ))}
                          {(spec.skills?.length || 0) > 5 && (
                            <span className="text-xs text-gray-500 px-2 py-1">+{spec.skills!.length - 5}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-5 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <div className="text-xs text-gray-500">
                          <span className="text-white font-semibold">{spec.studentsCount?.toLocaleString()}</span> estudiantes inscritos
                        </div>
                        <button
                          className="flex items-center gap-1.5 text-sm font-semibold transition-colors"
                          style={{ color: '#00ffb3' }}
                          onClick={() => setSelectedSpec(spec)}
                        >
                          Explorar <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-10"
        >
          <button
            className="flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105"
            style={{
              background: 'transparent',
              border: '1.5px solid rgba(0,255,179,0.4)',
              color: '#fff',
              boxShadow: '0 0 16px rgba(0,255,179,0.08)',
            }}
          >
            Ver todas las especialidades <ArrowRight size={14} />
          </button>
        </motion.div>
      </div>

      <DetailModal
        isOpen={!!selectedSpec}
        onClose={() => setSelectedSpec(null)}
        data={selectedSpec}
        type="specialty"
      />
    </section>
  );
};
