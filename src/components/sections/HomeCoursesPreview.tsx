import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen, Users, Clock } from 'lucide-react';
import { useListCourses } from '@workspace/api-client-react';
import { Card3D } from '../Card3D';

const BG_GRADIENTS = [
  'linear-gradient(135deg,#0d1b4b,#1a0533)',
  'linear-gradient(135deg,#001a2e,#0a2240)',
  'linear-gradient(135deg,#1a0d2e,#0d1424)',
  'linear-gradient(135deg,#001a1a,#0a2020)',
  'linear-gradient(135deg,#120520,#1a0835)',
  'linear-gradient(135deg,#0a1628,#152240)',
  'linear-gradient(135deg,#1e0a0a,#2d0d1a)',
  'linear-gradient(135deg,#0f1a10,#1a2a15)',
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export const HomeCoursesPreview: React.FC = () => {
  const { data: courses, isLoading } = useListCourses();

  return (
    <section className="relative py-24 overflow-hidden" style={{ background: '#050814' }}>
      {/* Decorative bg */}
      <div className="absolute top-1/2 left-0 w-96 h-96 pointer-events-none rounded-full"
        style={{ background: 'radial-gradient(circle,rgba(0,255,179,0.04) 0%,transparent 70%)', filter: 'blur(60px)', transform: 'translateY(-50%)' }} />
      <div className="absolute top-1/3 right-0 w-80 h-80 pointer-events-none rounded-full"
        style={{ background: 'radial-gradient(circle,rgba(55,0,255,0.06) 0%,transparent 70%)', filter: 'blur(60px)' }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between mb-14"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Cursos <span style={{ color: '#00ffb3' }}>destacados</span>
            </h2>
            <p className="text-gray-400 text-sm">Los más populares entre nuestros estudiantes</p>
            <div className="mt-4 h-[2px] w-16 rounded-full" style={{ background: 'linear-gradient(90deg,#00ffb3,transparent)' }} />
          </div>
          <motion.button
            whileHover={{ x: 4 }}
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold shrink-0 mb-1 transition-colors"
            style={{ color: '#00ffb3' }}
          >
            Ver todos los cursos <ArrowRight size={13} />
          </motion.button>
        </motion.div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-64 rounded-2xl animate-pulse" style={{ background: 'rgba(255,255,255,0.04)' }} />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-2 md:grid-cols-4 gap-5"
          >
            {courses?.slice(0, 8).map((course, idx) => (
              <motion.div key={course.id} variants={itemVariants}>
                <Card3D
                  glowColor="rgba(0,255,179,0.14)"
                  intensity={11}
                  className="h-full rounded-2xl cursor-pointer"
                >
                  <div
                    className="rounded-2xl overflow-hidden h-full flex flex-col"
                    style={{
                      background: BG_GRADIENTS[idx % BG_GRADIENTS.length],
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    {/* Thumbnail */}
                    <div className="relative h-36 overflow-hidden bg-black/30 shrink-0">
                      {course.thumbnailUrl ? (
                        <img
                          src={course.thumbnailUrl}
                          alt={course.title}
                          className="w-full h-full object-cover"
                          style={{ opacity: 0.55 }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen size={32} style={{ color: 'rgba(255,255,255,0.12)' }} />
                        </div>
                      )}

                      {/* Gradient overlay */}
                      <div className="absolute inset-0"
                        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />

                      {/* Level badge */}
                      <span
                        className="absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(0,0,0,0.75)', color: '#fff', border: '1px solid rgba(255,255,255,0.12)' }}
                      >
                        {course.level}
                      </span>

                      {/* Category */}
                      <span
                        className="absolute bottom-2 left-2.5 text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide"
                        style={{ background: 'rgba(55,0,255,0.55)', color: '#fff', backdropFilter: 'blur(4px)' }}
                      >
                        {course.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col flex-grow">
                      <h3
                        className="text-white font-semibold text-xs leading-snug mb-3 line-clamp-2 flex-grow"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {course.title}
                      </h3>

                      <div className="flex items-center justify-between pt-2.5"
                        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <div className="flex items-center gap-1 text-[10px] text-gray-500">
                          <Users size={9} />
                          <span>{course.studentsCount}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-gray-500">
                          <Clock size={9} />
                          <span>{course.duration}</span>
                        </div>
                        <span
                          className="text-xs font-bold"
                          style={{ color: !course.price || course.price === 0 ? '#00ffb3' : '#f59e0b' }}
                        >
                          {!course.price || course.price === 0 ? 'Gratis' : `${course.price} bs`}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-6 sm:hidden"
        >
          <button className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: '#00ffb3' }}>
            Ver todos los cursos <ArrowRight size={13} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
