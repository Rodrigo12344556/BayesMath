import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedTitle } from '../AnimatedTitle';
import { ParticleBackground } from '../ParticleBackground';
import { TiltCard } from '../TiltCard';
import { useListInstructors, Instructor } from '@workspace/api-client-react';
import { Phone, Mail, X } from 'lucide-react';

export const DocentesSection: React.FC = () => {
  const { data: docentes, isLoading } = useListInstructors();
  const [selectedDocente, setSelectedDocente] = useState<Instructor | null>(null);

  return (
    <section id="docentes" className="relative py-32 min-h-[80vh] bg-background overflow-hidden border-t border-white/5">
      <ParticleBackground density={30} colors={['#7b2fff', '#00ffb3']} speedMultiplier={0.5} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16 flex flex-col items-center justify-center text-center">
          <AnimatedTitle text="DOCENTES" className="text-4xl md:text-5xl lg:text-6xl text-white font-poppins justify-center" />
          <div className="w-24 h-1 bg-accent mt-6 rounded-full shadow-[0_0_10px_rgba(123,47,255,0.5)]" />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-80 bg-card/50 border border-white/5 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {docentes?.map((docente, idx) => (
              <motion.div
                key={docente.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="h-80 cursor-pointer"
                onClick={() => setSelectedDocente(docente)}
              >
                <TiltCard className="h-full">
                  <div className="p-6 h-full flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-accent/50 p-1 shrink-0">
                      {docente.avatarUrl ? (
                        <img
                          src={docente.avatarUrl}
                          alt={docente.name}
                          className="w-full h-full object-cover rounded-full filter grayscale hover:grayscale-0 transition-all duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-accent/20 rounded-full flex items-center justify-center text-accent text-2xl font-bold">
                          {docente.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-1 font-poppins">{docente.name}</h3>
                    <p className="text-primary text-sm font-semibold mb-4">{docente.title}</p>
                    
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {docente.bio}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modern Contact Detail Modal */}
      <AnimatePresence>
        {selectedDocente && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedDocente(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-card border border-primary/20 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,255,179,0.15)] flex flex-col items-center text-center overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedDocente(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              {/* Profile Image */}
              <div className="w-28 h-28 rounded-full overflow-hidden mb-4 border-4 border-accent/50 p-1 shrink-0">
                {selectedDocente.avatarUrl ? (
                  <img
                    src={selectedDocente.avatarUrl}
                    alt={selectedDocente.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full bg-accent/20 rounded-full flex items-center justify-center text-accent text-3xl font-bold">
                    {selectedDocente.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Text Info */}
              <h2 className="text-2xl font-bold text-white mb-1 font-poppins">{selectedDocente.name}</h2>
              <p className="text-primary text-sm font-semibold mb-6">{selectedDocente.title}</p>

              <div className="text-gray-300 text-sm leading-relaxed mb-8 max-h-[30vh] overflow-y-auto pr-2 custom-scrollbar">
                {selectedDocente.bio}
              </div>

              {/* Contact Information block */}
              {((selectedDocente.phone) || (selectedDocente.email)) && (
                <div className="w-full border-t border-white/10 pt-6 flex flex-col items-center gap-3.5">
                  <span className="text-xs uppercase tracking-widest text-white/40 font-bold mb-1">Información de Contacto</span>
                  
                  {selectedDocente.phone && (
                    <a
                      href={`tel:${selectedDocente.phone.replace(/\s+/g, '')}`}
                      className="flex items-center gap-2.5 text-sm text-gray-300 hover:text-primary transition-colors py-1.5 px-4 rounded-full bg-white/5 border border-white/5 hover:border-primary/20"
                    >
                      <Phone size={14} className="text-primary" />
                      <span>{selectedDocente.phone}</span>
                    </a>
                  )}
                  
                  {selectedDocente.email && (
                    <a
                      href={`mailto:${selectedDocente.email}`}
                      className="flex items-center gap-2.5 text-sm text-gray-300 hover:text-primary transition-colors py-1.5 px-4 rounded-full bg-white/5 border border-white/5 hover:border-primary/20"
                    >
                      <Mail size={14} className="text-primary" />
                      <span>{selectedDocente.email}</span>
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
