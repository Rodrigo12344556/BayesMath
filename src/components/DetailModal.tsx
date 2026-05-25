import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Course, Specialty } from '@workspace/api-client-react';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Course | Specialty | null;
  type: 'course' | 'specialty';
}

export const DetailModal: React.FC<DetailModalProps> = ({ isOpen, onClose, data, type }) => {
  return (
    <AnimatePresence>
      {isOpen && data && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-card border border-primary/20 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,255,179,0.15)] flex flex-col md:flex-row h-full max-h-[85vh]"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Video / Image Section */}
            <div className="w-full md:w-1/2 bg-black relative border-b md:border-b-0 md:border-r border-white/10 shrink-0 min-h-[250px]">
              {data.videoUrl ? (
                <iframe 
                  src={data.videoUrl} 
                  className="w-full h-full object-cover absolute inset-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : data.thumbnailUrl ? (
                <img 
                  src={data.thumbnailUrl} 
                  alt={data.title}
                  className="w-full h-full object-cover absolute inset-0 opacity-80"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center absolute inset-0 bg-gradient-to-br from-card to-background">
                  <div className="text-muted-foreground opacity-50">Media Preview</div>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto custom-scrollbar">
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                  {type === 'course' ? 'Curso' : 'Especialidad'}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-secondary/10 text-secondary border border-secondary/20">
                  {data.level}
                </span>
                {type === 'course' && 'category' in data && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20">
                    {data.category}
                  </span>
                )}
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight font-poppins">
                {data.title}
              </h2>
              
              <div className="prose prose-invert max-w-none text-muted-foreground mb-8">
                <p className="text-lg leading-relaxed">{data.description}</p>
              </div>

              {type === 'course' && 'duration' in data && (
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Duración</div>
                    <div className="text-xl font-semibold text-white">{data.duration}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Estudiantes</div>
                    <div className="text-xl font-semibold text-white">{(data.studentsCount || 0).toLocaleString()}</div>
                  </div>
                </div>
              )}

              {type === 'specialty' && 'skills' in data && data.skills && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-4">Habilidades a desarrollar</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-md bg-white/5 text-sm text-gray-300 border border-white/10">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-auto pt-8">
                <button className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-colors shadow-[0_0_20px_rgba(0,255,179,0.3)] hover:shadow-[0_0_30px_rgba(0,255,179,0.5)]">
                  Inscribirse Ahora
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
