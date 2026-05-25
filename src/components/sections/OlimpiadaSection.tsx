import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Users, MonitorPlay, Trophy } from 'lucide-react';
import olimpiadaImg from '@/assets/images/olimpiadas.avif';

const features = [
  { icon: Calendar, text: 'Inscripción del 1 de Mayo al 30 de Junio de 2026' },
  { icon: Users, text: 'Categorías Sigma (5º) y Rho (6º de secundaria)' },
  { icon: MonitorPlay, text: '1ª Fase Virtual · 2ª Fase Presencial' },
  { icon: Trophy, text: 'Capacitación gratuita para todos los participantes' },
];

const checks = [
  'Pon a prueba tu pensamiento analítico.',
  'Gana premios y distinciones académicas.',
  'Accede a capacitaciones gratuitas.',
  'Inscripción totalmente gratuita.',
];

export const OlimpiadaSection: React.FC = () => {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg,#07101f 0%,#050814 100%)' }}
    >
      {/* BG decorative orbs */}
      <div className="absolute top-1/4 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(0,255,179,0.06) 0%,transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle,rgba(55,0,255,0.08) 0%,transparent 70%)', filter: 'blur(60px)' }} />

      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(0,255,179,0.25),transparent)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT — content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
              style={{ border: '1px solid rgba(0,255,179,0.3)', color: '#00ffb3', background: 'rgba(0,255,179,0.07)' }}
            >
              <Trophy size={11} /> BAYESMATH AUSPICIA
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.06 }}
              className="text-4xl md:text-5xl font-bold text-white leading-tight mb-3"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              1.ª Olimpiada Paceña
              <br />
              de Estadística 2026
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="text-sm font-bold tracking-widest uppercase mb-6"
              style={{ color: '#00ffb3' }}
            >
              EL FUTURO SE ESCRIBE CON DATOS
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="text-gray-400 text-sm leading-relaxed mb-8 max-w-lg"
            >
              Impulsamos el talento joven en estadística, matemática y análisis de datos. Nos sumamos como
              auspiciadores de esta iniciativa académica dirigida a estudiantes de secundaria, organizada por
              la Carrera de Estadística de la Universidad Mayor de San Andrés.
            </motion.p>

            {/* Checklist */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8"
            >
              {checks.map((c, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle size={14} className="shrink-0 mt-0.5" style={{ color: '#00ffb3' }} />
                  <span className="text-gray-300 text-sm">{c}</span>
                </div>
              ))}
            </motion.div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{ delay: 0.25 + i * 0.07, duration: 0.45 }}
                    className="flex items-start gap-3 p-4 rounded-xl"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(0,255,179,0.1)', border: '1px solid rgba(0,255,179,0.2)' }}
                    >
                      <Icon size={15} style={{ color: '#00ffb3' }} />
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed mt-0.5">{f.text}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.45 }}
              className="flex flex-wrap gap-4"
            >
              <button
                className="px-7 py-3.5 rounded-xl font-bold text-sm text-black transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg,#00ffb3,#00c98a)', boxShadow: '0 0 24px rgba(0,255,179,0.35)' }}
              >
                Inscribirme →
              </button>
              <button
                className="px-7 py-3.5 rounded-xl font-semibold text-sm text-white transition-all hover:bg-white/5"
                style={{ border: '1px solid rgba(255,255,255,0.15)' }}
              >
                Más información
              </button>
            </motion.div>
          </div>

          {/* RIGHT — image */}
          <motion.div
            initial={{ opacity: 0, x: 48, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative"
          >
            {/* Glow behind image */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: 'radial-gradient(circle at center, rgba(0,255,179,0.12) 0%, transparent 70%)',
                filter: 'blur(20px)',
                transform: 'scale(1.05)',
              }}
            />
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                border: '1.5px solid rgba(0,255,179,0.2)',
                boxShadow: '0 0 60px rgba(0,255,179,0.1), 0 30px 80px rgba(0,0,0,0.5)',
              }}
            >
              <img
                src={olimpiadaImg}
                alt="1.ª Olimpiada Paceña de Estadística 2026"
                className="w-full h-auto block"
                style={{ maxHeight: '600px', objectFit: 'cover' }}
              />
              {/* Overlay tint at bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 h-24"
                style={{ background: 'linear-gradient(to top, rgba(5,8,20,0.6), transparent)' }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(55,0,255,0.2),transparent)' }} />
    </section>
  );
};
