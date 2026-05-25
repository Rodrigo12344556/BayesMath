import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  colors?: string[];
  density?: number;
  speedMultiplier?: number;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  colors = ['#00ffb3', '#3700ff', '#7b2fff'],
  density = 60,
  speedMultiplier = 1
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    interface Particle {
      x: number; y: number;
      length: number; speed: number;
      color: string; opacity: number;
      glowSize: number; width: number;
      twinkle: number; twinkleSpeed: number;
    }

    const particles: Particle[] = [];

    const addParticle = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      length: Math.random() * 60 + 20,
      speed: (Math.random() * 2.5 + 0.8) * speedMultiplier,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.55 + 0.15,
      glowSize: Math.random() * 8 + 3,
      width: Math.random() * 1.5 + 0.5,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.05 + 0.02,
    });

    for (let i = 0; i < density; i++) {
      const p = addParticle();
      p.y = Math.random() * height; // spread initial positions
      particles.push(p);
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.twinkle += p.twinkleSpeed;
        const alpha = p.opacity * (0.7 + 0.3 * Math.sin(p.twinkle));

        // Glow
        const gradient = ctx.createLinearGradient(p.x, p.y, p.x, p.y + p.length);
        gradient.addColorStop(0, `${p.color}00`);
        gradient.addColorStop(0.3, p.color);
        gradient.addColorStop(1, `${p.color}00`);

        ctx.save();
        ctx.globalAlpha = alpha * 0.35;
        ctx.shadowBlur = p.glowSize;
        ctx.shadowColor = p.color;
        ctx.strokeStyle = gradient;
        ctx.lineWidth = p.width * 3;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x, p.y + p.length);
        ctx.stroke();
        ctx.restore();

        // Core streak
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = p.glowSize * 1.5;
        ctx.shadowColor = p.color;
        ctx.strokeStyle = gradient;
        ctx.lineWidth = p.width;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x, p.y + p.length);
        ctx.stroke();
        ctx.restore();

        // Bright head dot
        ctx.save();
        ctx.globalAlpha = alpha * 0.9;
        ctx.shadowBlur = p.glowSize * 2;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y + p.length * 0.3, p.width * 1.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        p.y += p.speed;
        if (p.y > height + p.length) {
          p.y = -p.length;
          p.x = Math.random() * width;
          p.speed = (Math.random() * 2.5 + 0.8) * speedMultiplier;
          p.opacity = Math.random() * 0.55 + 0.15;
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [colors, density, speedMultiplier]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full z-0"
    />
  );
};
