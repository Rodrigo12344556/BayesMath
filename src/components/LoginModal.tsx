import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Eye, EyeOff, User } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 24 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, #0d1424 0%, #080d18 100%)',
              border: '1px solid rgba(0,255,179,0.18)',
              boxShadow: '0 0 60px rgba(0,255,179,0.1), 0 0 120px rgba(55,0,255,0.08)',
            }}
          >
            {/* Top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

            {/* Close */}
            <button
              data-testid="modal-close"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <X size={16} />
            </button>

            <div className="p-8">
              {/* Logo */}
              <div className="text-center mb-8">
                <div
                  className="text-2xl font-extrabold tracking-widest uppercase mb-1"
                  style={{ fontFamily: 'Poppins, sans-serif', color: '#fff' }}
                >
                  BAYESMATH<span style={{ color: '#00ffb3' }}>.</span>
                </div>
                <p className="text-sm text-gray-400">
                  {mode === 'login' ? 'Bienvenido de vuelta' : 'Crea tu cuenta gratuita'}
                </p>
              </div>

              {/* Tab toggle */}
              <div className="flex rounded-xl p-1 mb-8" style={{ background: 'rgba(255,255,255,0.04)' }}>
                {(['login', 'register'] as const).map((m) => (
                  <button
                    key={m}
                    data-testid={`tab-${m}`}
                    onClick={() => setMode(m)}
                    className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
                    style={{
                      background: mode === m ? 'rgba(0,255,179,0.12)' : 'transparent',
                      color: mode === m ? '#00ffb3' : '#8892a4',
                      border: mode === m ? '1px solid rgba(0,255,179,0.25)' : '1px solid transparent',
                    }}
                  >
                    {m === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {mode === 'register' && (
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      data-testid="input-name"
                      type="text"
                      placeholder="Tu nombre completo"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl text-white text-sm outline-none transition-all placeholder-gray-500"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,255,179,0.4)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                    />
                  </div>
                )}

                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    data-testid="input-email"
                    type="email"
                    placeholder="tu@correo.com"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl text-white text-sm outline-none transition-all placeholder-gray-500"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,255,179,0.4)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                  />
                </div>

                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    data-testid="input-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Contraseña"
                    className="w-full pl-11 pr-12 py-3.5 rounded-xl text-white text-sm outline-none transition-all placeholder-gray-500"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,255,179,0.4)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {mode === 'login' && (
                  <div className="text-right">
                    <button className="text-xs text-primary/70 hover:text-primary transition-colors">
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                )}

                <button
                  data-testid="btn-submit-auth"
                  className="w-full py-4 rounded-xl font-bold text-sm text-black transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] mt-2"
                  style={{
                    background: 'linear-gradient(135deg, #00ffb3, #00d490)',
                    boxShadow: '0 0 24px rgba(0,255,179,0.35)',
                  }}
                >
                  {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
                </button>
              </div>

              <p className="text-center text-xs text-gray-500 mt-6">
                {mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
                <button
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                  className="text-primary hover:underline font-semibold"
                >
                  {mode === 'login' ? 'Regístrate gratis' : 'Inicia sesión'}
                </button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
