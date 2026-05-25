import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import videoBg from "@/assets/MathAcademy_1779723875867.mp4";

interface HeroSectionProps {
  onNavigate?: (id: string) => void;
}

const MATH_SYMBOLS = ['∑', 'π', '∫', 'σ', '∂', 'μ', 'λ', 'θ', '∞', 'α', 'β', 'Δ', '∇', 'ε', 'ρ'];

interface FloatingSymbol {
  id: number;
  symbol: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isEnding, setIsEnding] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [floatingSymbols] = useState<FloatingSymbol[]>(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      symbol: MATH_SYMBOLS[i % MATH_SYMBOLS.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 14 + Math.random() * 26,
      duration: 6 + Math.random() * 10,
      delay: Math.random() * 5,
      opacity: 0.08 + Math.random() * 0.18,
    }))
  );

  // Scan line + pulse canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let scanY = 0;
    let pulsePhase = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // Subtle vignette
      const vignette = ctx.createRadialGradient(
        width / 2, height / 2, height * 0.2,
        width / 2, height / 2, height * 0.9
      );
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.55)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      // Animated scan line
      scanY = (scanY + 0.6) % height;
      const scanGrad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
      scanGrad.addColorStop(0, 'rgba(0,255,179,0)');
      scanGrad.addColorStop(0.5, 'rgba(0,255,179,0.07)');
      scanGrad.addColorStop(1, 'rgba(0,255,179,0)');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 60, width, 120);

      // Pulse ring from center
      pulsePhase += 0.012;
      const r1 = (Math.sin(pulsePhase) * 0.5 + 0.5) * Math.min(width, height) * 0.4 + 80;
      const r2 = (Math.sin(pulsePhase + 1) * 0.5 + 0.5) * Math.min(width, height) * 0.55 + 100;

      ctx.strokeStyle = `rgba(0,255,179,${0.06 + Math.sin(pulsePhase) * 0.03})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, r1, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = `rgba(55,0,255,${0.05 + Math.sin(pulsePhase + 1) * 0.025})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, r2, 0, Math.PI * 2);
      ctx.stroke();

      // Grid lines overlay (subtle)
      ctx.strokeStyle = 'rgba(0,255,179,0.025)';
      ctx.lineWidth = 0.5;
      const cols = 12;
      const rows = 7;
      for (let i = 0; i <= cols; i++) {
        const x = (i / cols) * width;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let j = 0; j <= rows; j++) {
        const y = (j / rows) * height;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Video fade-out-and-loop
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let ending = false;
    const handleTimeUpdate = () => {
      if (video.duration && video.duration - video.currentTime < 1.2 && !ending) {
        ending = true;
        setIsEnding(true);
        setTimeout(() => {
          video.currentTime = 0;
          video.play().catch(() => {});
          setTimeout(() => {
            setIsEnding(false);
            ending = false;
          }, 400);
        }, 900);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  const line1 = "BAYESMATH";
  const line2 = "impulsa la investigación";
  const line3 = "científica en Bolivia";

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* VIDEO */}
      <video
        ref={videoRef}
        src={videoBg}
        className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-500"
        style={{ opacity: videoLoaded ? 1 : 0 }}
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
      />

      {/* Base dark overlay */}
      <div className="absolute inset-0 bg-black/55 z-[1]" />

      {/* Canvas effects (scan line, pulse, grid) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-[2] pointer-events-none"
      />

      {/* Gradient bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-[3] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(5,8,20,0.95))' }}
      />

      {/* Gradient top fade */}
      <div
        className="absolute top-0 left-0 right-0 h-32 z-[3] pointer-events-none"
        style={{ background: 'linear-gradient(to top, transparent, rgba(5,8,20,0.5))' }}
      />

      {/* Cinematic fade-out at end */}
      <AnimatePresence>
        {isEnding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="absolute inset-0 bg-black z-[10]"
          />
        )}
      </AnimatePresence>

      {/* Floating math symbols */}
      <div className="absolute inset-0 z-[4] pointer-events-none overflow-hidden">
        {floatingSymbols.map((sym) => (
          <motion.span
            key={sym.id}
            className="absolute font-bold select-none"
            style={{
              left: `${sym.x}%`,
              top: `${sym.y}%`,
              fontSize: sym.size,
              opacity: sym.opacity,
              color: sym.id % 3 === 0 ? '#00ffb3' : sym.id % 3 === 1 ? '#3700ff' : '#ffffff',
              fontFamily: 'Space Grotesk, monospace',
            }}
            animate={{
              y: [0, -24, 0, 12, 0],
              x: [0, 8, -6, 4, 0],
              opacity: [sym.opacity, sym.opacity * 1.8, sym.opacity, sym.opacity * 0.5, sym.opacity],
              rotate: [0, 10, -5, 8, 0],
            }}
            transition={{
              duration: sym.duration,
              delay: sym.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {sym.symbol}
          </motion.span>
        ))}
      </div>

      {/* Glow orbs */}
      <div className="absolute inset-0 z-[3] pointer-events-none">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 600,
            height: 600,
            left: '50%',
            top: '50%',
            x: '-50%',
            y: '-50%',
            background: 'radial-gradient(circle, rgba(0,255,179,0.06) 0%, rgba(55,0,255,0.04) 50%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 400,
            height: 400,
            left: '70%',
            top: '30%',
            background: 'radial-gradient(circle, rgba(123,47,255,0.07) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.2, 0.9, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 300,
            height: 300,
            left: '15%',
            top: '60%',
            background: 'radial-gradient(circle, rgba(55,0,255,0.08) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-[5] container mx-auto px-4 pt-24 pb-16 flex flex-col items-center text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8 px-4 py-1.5 rounded-full border text-xs font-semibold tracking-widest uppercase"
          style={{
            borderColor: 'rgba(0,255,179,0.35)',
            color: '#00ffb3',
            background: 'rgba(0,255,179,0.07)',
            letterSpacing: '0.2em',
          }}
        >
          Investigación Científica · Bolivia
        </motion.div>

        {/* Title line 1 — BAYESMATH big */}
        <div className="overflow-hidden mb-2">
          <motion.div
            className="flex justify-center"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.055, delayChildren: 0.5 } } }}
          >
            {line1.split('').map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 60 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="inline-block font-extrabold tracking-tighter uppercase leading-none"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 'clamp(3.5rem, 12vw, 9rem)',
                  color: i < 5 ? '#ffffff' : '#00ffb3',
                  textShadow: i >= 5 ? '0 0 40px rgba(0,255,179,0.6)' : '0 0 20px rgba(255,255,255,0.15)',
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Title lines 2 & 3 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <h2
            className="font-bold text-white leading-tight"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(1.6rem, 4.5vw, 3.2rem)',
              textShadow: '0 0 30px rgba(255,255,255,0.1)',
            }}
          >
            {line2}
          </h2>
          <h2
            className="font-bold leading-tight"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(1.6rem, 4.5vw, 3.2rem)',
              color: '#00ffb3',
              textShadow: '0 0 30px rgba(0,255,179,0.4)',
            }}
          >
            {line3}
          </h2>
        </motion.div>

        {/* Animated divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 h-[2px] w-40 rounded-full origin-left"
          style={{ background: 'linear-gradient(90deg, #00ffb3, #3700ff, transparent)' }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.55, duration: 0.7 }}
          className="text-base md:text-lg text-gray-300 max-w-xl mb-12 leading-relaxed"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Formamos las capacidades metodológicas, estadísticas y computacionales para publicar, aprender e innovar.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.75, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            data-testid="btn-explorar"
            onClick={() => onNavigate?.('cursos')}
            className="relative overflow-hidden group px-8 py-4 rounded-full font-bold text-base text-black transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #00ffb3, #00d490)',
              boxShadow: '0 0 32px rgba(0,255,179,0.45), 0 4px 20px rgba(0,0,0,0.3)',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            <span className="relative z-10">Ver Metodología</span>
            <motion.span
              className="absolute inset-0 rounded-full bg-white/20"
              initial={{ scale: 0, opacity: 0.5 }}
              whileHover={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          </button>

          <button
            data-testid="btn-comunidad"
            onClick={() => onNavigate?.('cursos')}
            className="px-8 py-4 rounded-full font-bold text-base text-white transition-all duration-300 hover:bg-white/8 hover:scale-105"
            style={{
              border: '1.5px solid rgba(0,255,179,0.35)',
              fontFamily: 'Poppins, sans-serif',
              boxShadow: '0 0 16px rgba(0,255,179,0.1)',
            }}
          >
            Explorar Cursos
          </button>
        </motion.div>

        {/* Scroll hint / stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="mt-16 flex flex-wrap justify-center gap-8 text-center"
        >
          {[
            { value: '12K+', label: 'Estudiantes' },
            { value: '6+', label: 'Cursos' },
            { value: '2', label: 'Especialidades' },
            { value: '3', label: 'Instructores' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span
                className="text-2xl font-bold"
                style={{ color: '#00ffb3', fontFamily: 'Poppins, sans-serif' }}
              >
                {stat.value}
              </span>
              <span className="text-xs text-gray-400 tracking-wider uppercase mt-0.5">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Animated bottom arrow */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[5]"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12l7 7 7-7" stroke="rgba(0,255,179,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  );
};
