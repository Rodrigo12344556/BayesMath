import React, { useRef, useState } from 'react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glowColor?: string;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  intensity = 12,
  glowColor = 'rgba(0,255,179,0.18)',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -intensity;
    const ry = ((x - cx) / cx) * intensity;
    setStyle({
      transform: `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.025)`,
      boxShadow: `0 20px 60px ${glowColor}, 0 0 0 1px ${glowColor}`,
      transition: 'transform 0.05s linear, box-shadow 0.05s linear',
    });
  };

  const handleMouseLeave = () => {
    setHovering(false);
    setStyle({
      transform: 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)',
      boxShadow: 'none',
      transition: 'transform 0.45s cubic-bezier(0.23,1,0.32,1), box-shadow 0.45s ease',
    });
  };

  const handleMouseEnter = () => setHovering(true);

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, willChange: 'transform', transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </div>
  );
};
