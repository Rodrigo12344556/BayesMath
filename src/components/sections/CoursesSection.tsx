import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleBackground } from '../ParticleBackground';
import { useListCourses } from '@workspace/api-client-react';
import { DetailModal } from '../DetailModal';
import { BookOpen, Users, Clock, ArrowRight } from 'lucide-react';

const GRADIENT_PRESETS = [
  'linear-gradient(135deg,#0d1b4b,#1a0533)',
  'linear-gradient(135deg,#001a2e,#0a2240)',
  'linear-gradient(135deg,#1a0d2e,#0d1424)',
  'linear-gradient(135deg,#001a1a,#0a2020)',
  'linear-gradient(135deg,#120520,#1a0835)',
  'linear-gradient(135deg,#0a1628,#152240)',
];

export const CoursesSection: React.FC = () => {
  const { data: courses, isLoading } = useListCourses();
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="cursos" className="relative pt-28 pb-20 min-h-screen bg-background overflow-hidden">
      <ParticleBackground density={55} colors={['#00ffb3', '#3700ff', '#7b2fff']} speedMultiplier={0.9} />

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
            Cursos <span style={{ color: '#00ffb3' }}>destacados</span>
          </h2>
          <p className="text-gray-400 text-base">Los más populares entre nuestros estudiantes</p>
          <div className="mt-5 h-[2px] w-16 rounded-full" style={{ background: 'linear-gradient(90deg,#00ffb3,transparent)' }} />
        </motion.div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-64 rounded-2xl animate-pulse" style={{ background: 'rgba(255,255,255,0.04)' }} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {courses?.map((course, idx) => (
              <motion.div
                key={course.id}
                data-testid={`card-course-${course.id}`}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07, duration: 0.5, ease: [0.16,1,0.3,1] }}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredId(course.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedCourse(course)}
              >
                {/* Glow border wrapper */}
                <div
                  className="rounded-2xl p-[1.5px] transition-all duration-300"
                  style={{
                    background: hoveredId === course.id
                      ? 'linear-gradient(163deg, #00ffb3 0%, #3700ff 100%)'
                      : 'rgba(255,255,255,0.07)',
                    boxShadow: hoveredId === course.id
                      ? '0 0 24px rgba(0,255,179,0.25)'
                      : 'none',
                  }}
                >
                  <div
                    className="rounded-[14px] overflow-hidden flex flex-col h-full transition-transform duration-200"
                    style={{
                      background: GRADIENT_PRESETS[idx % GRADIENT_PRESETS.length],
                      transform: hoveredId === course.id ? 'scale(0.982)' : 'scale(1)',
                    }}
                  >
                    {/* Thumbnail */}
                    <div className="relative h-40 overflow-hidden bg-black/40">
                      {course.thumbnailUrl ? (
                        <img
                          src={course.thumbnailUrl}
                          alt={course.title}
                          className="w-full h-full object-cover"
                          style={{ opacity: 0.55 }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen size={40} className="text-white/20" />
                        </div>
                      )}
                      {/* Level badge */}
                      <span
                        className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(0,0,0,0.7)', color: '#00ffb3', border: '1px solid rgba(0,255,179,0.3)' }}
                      >
                        {course.level}
                      </span>
                      {/* Category badge */}
                      <span
                        className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide"
                        style={{ background: 'rgba(55,0,255,0.5)', color: '#fff', backdropFilter: 'blur(4px)' }}
                      >
                        {course.category}
                      </span>

                      {/* Hover overlay with "Ver Más" */}
                      <AnimatePresence>
                        {hoveredId === course.id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ background: 'rgba(0,0,0,0.55)' }}
                          >
                            <motion.div
                              initial={{ scale: 0.6 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0.6 }}
                              className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm"
                              style={{ background: '#00ffb3', color: '#000', boxShadow: '0 0 20px rgba(0,255,179,0.6)' }}
                            >
                              Ver Más <ArrowRight size={14} />
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col flex-grow">
                      <h3
                        className="text-white font-bold text-sm leading-snug mb-2 line-clamp-2"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {course.title}
                      </h3>
                      <p className="text-gray-400 text-xs line-clamp-2 mb-3 leading-relaxed flex-grow">
                        {course.description}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock size={11} />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Users size={11} />
                          <span>{course.studentsCount?.toLocaleString()}</span>
                        </div>
                        <span className="text-xs font-bold" style={{ color: '#00ffb3' }}>Gratis</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Ver todos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-end mt-8"
        >
          <button
            className="flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: '#00ffb3' }}
          >
            Ver todos los cursos <ArrowRight size={14} />
          </button>
        </motion.div>
      </div>

      <DetailModal
        isOpen={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
        data={selectedCourse}
        type="course"
      />
    </section>
  );
};
