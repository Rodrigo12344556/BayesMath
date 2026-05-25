import React from 'react';
import { Facebook, Youtube } from 'lucide-react';

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.16 8.16 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z"/>
  </svg>
);

const PLATFORM_LINKS = [
  'Nuestros Cursos',
  'Especialidades',
  '¿Eres Docente?',
  'Para Instituciones',
  'Investigación',
];

const COMPANY_LINKS = [
  'Sobre nosotros',
  'Contáctanos',
];

export const Footer: React.FC = () => {
  return (
    <footer style={{ background: '#030710', borderTop: '1px solid rgba(255,255,255,0.06)' }} className="relative z-10">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-5">
            <div
              className="text-xl font-extrabold text-white tracking-widest uppercase"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              BayesMath<span style={{ color: '#00ffb3' }}>.</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Academia en Ciencia de Datos e Inteligencia Artificial con metodología propia. Aprendes con el Método VEH™ —Ves, Entiendes y Haces— estadística, álgebra lineal, Python y econometría con rigor universitario y datos reales de Bolivia.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              {[
                { Icon: Facebook, label: 'Facebook', color: '#3b82f6' },
                { Icon: Youtube, label: 'YouTube', color: '#ef4444' },
                { Icon: TikTokIcon, label: 'TikTok', color: '#fff' },
              ].map(({ Icon, label, color }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: '#9ca3af' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = color;
                    el.style.borderColor = `${color}50`;
                    el.style.background = `${color}15`;
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = '#9ca3af';
                    el.style.borderColor = 'rgba(255,255,255,0.08)';
                    el.style.background = 'rgba(255,255,255,0.06)';
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Platform */}
          <div>
            <h4
              className="text-white font-semibold text-sm mb-5 tracking-wide"
              style={{ letterSpacing: '0.08em' }}
            >
              Plataforma
            </h4>
            <ul className="flex flex-col gap-3">
              {PLATFORM_LINKS.map(link => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 text-sm transition-colors duration-150 hover:text-white"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Company */}
          <div>
            <h4
              className="text-white font-semibold text-sm mb-5 tracking-wide"
              style={{ letterSpacing: '0.08em' }}
            >
              Compañía
            </h4>
            <ul className="flex flex-col gap-3">
              {COMPANY_LINKS.map(link => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 text-sm transition-colors duration-150 hover:text-white"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: 'rgba(255,255,255,0.05)' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} BayesMath. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-5">
            {['Términos y Condiciones', 'Política de Privacidad', 'Soporte'].map(item => (
              <a key={item} href="#" className="text-gray-600 text-xs hover:text-gray-400 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
