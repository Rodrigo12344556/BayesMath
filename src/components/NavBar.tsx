import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LoginModal } from './LoginModal';

interface NavBarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const NavBar: React.FC<NavBarProps> = ({ activeSection, onNavigate }) => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginMode, setLoginMode] = useState<'login' | 'register'>('login');

  const tabs = [
    { id: 'cursos', label: 'Nuestros Cursos' },
    { id: 'especialidades', label: 'Especialidades' },
    { id: 'docentes', label: 'Docentes' },
    { id: 'comunidad', label: 'Comunidad' },
    { id: 'redes', label: 'Redes Sociales' },
  ];

  const openLogin = (mode: 'login' | 'register') => {
    setLoginMode(mode);
    setLoginOpen(true);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-white/5 py-3">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center gap-4">
          {/* Logo */}
          <button
            data-testid="nav-logo"
            onClick={() => onNavigate('hero')}
            className="text-lg font-extrabold text-white tracking-widest uppercase cursor-pointer hover:opacity-80 transition-opacity shrink-0"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            BAYESMATH<span className="text-primary">.</span>
          </button>

          {/* Center tabs */}
          <ul className="hidden md:flex items-center gap-0.5">
            {tabs.map((tab) => {
              const isActive = activeSection === tab.id;
              return (
                <li
                  key={tab.id}
                  data-testid={`nav-tab-${tab.id}`}
                  className="relative px-3.5 py-2 cursor-pointer text-sm font-medium rounded-md transition-colors"
                  onMouseEnter={() => setHoveredTab(tab.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                  onClick={() => onNavigate(tab.id)}
                >
                  {hoveredTab === tab.id && !isActive && (
                    <motion.div
                      layoutId="hoverTabBg"
                      className="absolute inset-0 bg-white/5 rounded-md"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    />
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 rounded-md"
                      style={{ background: 'rgba(0,255,179,0.08)' }}
                      initial={false}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors duration-200 ${
                      isActive ? 'text-primary' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                      style={{ background: '#00ffb3', boxShadow: '0 0 8px #00ffb3' }}
                      initial={false}
                      transition={{ type: 'spring', bounce: 0.25, duration: 0.45 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Auth buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              data-testid="btn-login"
              onClick={() => openLogin('login')}
              className="hidden sm:block px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
            >
              Iniciar sesión
            </button>
            <button
              data-testid="btn-register"
              onClick={() => openLogin('register')}
              className="px-4 py-2 text-sm font-bold text-black rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,179,0.5)]"
              style={{ background: 'linear-gradient(135deg,#00ffb3,#00d490)', boxShadow: '0 0 12px rgba(0,255,179,0.3)' }}
            >
              Crear cuenta
            </button>
          </div>
        </div>
      </nav>

      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
};
