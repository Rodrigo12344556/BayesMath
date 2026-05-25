import React, { useRef, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { AnimatedTitle } from '../AnimatedTitle';
import { ParticleBackground } from '../ParticleBackground';
import { useGetCommunityStats } from '@workspace/api-client-react';

const Counter = ({ value, label }: { value: number, label: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const controls = animate(0, value, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(v) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(v).toLocaleString();
          }
        }
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
      <span className="text-5xl font-extrabold text-white mb-2 font-poppins tabular-nums">
        <span ref={nodeRef}>0</span>+
      </span>
      <span className="text-primary font-semibold tracking-wider uppercase text-sm">
        {label}
      </span>
    </div>
  );
};

export const CommunitySection: React.FC = () => {
  const { data: stats, isLoading } = useGetCommunityStats();

  return (
    <section id="comunidad" className="relative py-32 min-h-[80vh] bg-card overflow-hidden border-t border-white/5 flex items-center">
      <ParticleBackground density={60} colors={['#00ffb3', '#3700ff']} speedMultiplier={1.5} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 flex flex-col items-center">
          <AnimatedTitle text="NUESTRA COMUNIDAD" className="text-4xl md:text-5xl lg:text-6xl text-white font-poppins justify-center" />
          <div className="w-24 h-1 bg-primary mt-6 rounded-full shadow-[0_0_10px_rgba(0,255,179,0.5)]" />
          <p className="mt-8 text-lg text-gray-300 max-w-2xl mx-auto">
            Únete a la red más grande de profesionales y entusiastas de ciencia de datos, estadística y machine learning en Latinoamérica.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-40 bg-background/50 border border-white/5 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Counter value={stats?.studentsCount || 0} label="Estudiantes" />
            <Counter value={stats?.coursesCount || 0} label="Cursos" />
            <Counter value={stats?.specialtiesCount || 0} label="Especialidades" />
            <Counter value={stats?.instructorsCount || 0} label="Instructores" />
          </div>
        )}

        <div className="flex justify-center">
          <button className="relative overflow-hidden group bg-transparent border-2 border-primary text-primary px-10 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 shadow-[0_0_20px_rgba(0,255,179,0.2)] hover:shadow-[0_0_30px_rgba(0,255,179,0.5)]">
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">Unirse a nuestro grupo de WhatsApp</span>
            <span className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></span>
          </button>
        </div>
      </div>
    </section>
  );
};
