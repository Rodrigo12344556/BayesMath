import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import robotImg from '@/assets/images/robot-bot.png/robotchat.png';

/* ─── Types ────────────────────────────────────────────────────────────────── */
interface Message {
  id: number;
  from: 'bot' | 'user';
  text: string;
}

/* ─── Quick replies ─────────────────────────────────────────────────────────── */
const QUICK_REPLIES = [
  {
    label: '¿Qué es Bayesmath?',
    answer:
      'Bayesmath es una plataforma premium de ciencia de datos e inteligencia artificial orientada a impulsar la investigación científica en Bolivia. 🚀',
  },
  {
    label: '¿Cómo inicio sesión?',
    answer:
      'Para iniciar sesión usa el botón de acceso que está en el menú superior de la página. ¡Es muy fácil! 🔑',
  },
];

/* ─── Initial greeting ──────────────────────────────────────────────────────── */
const GREETING: Message = {
  id: 0,
  from: 'bot',
  text: '¡Hola! 👋 Soy el asistente de Bayesmath. ¿En qué puedo ayudarte hoy?',
};

/* ─── Component ─────────────────────────────────────────────────────────────── */
export const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [bubbleVisible, setBubbleVisible] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);

  /* Auto-scroll to latest message */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /* Hide bubble once chat is opened */
  const handleToggle = () => {
    setOpen((v) => !v);
    setBubbleVisible(false);
  };

  const addMessage = (msg: Omit<Message, 'id'>) => {
    setMessages((prev) => [...prev, { ...msg, id: idRef.current++ }]);
  };

  const handleQuickReply = (reply: (typeof QUICK_REPLIES)[number]) => {
    addMessage({ from: 'user', text: reply.label });
    setTimeout(() => {
      addMessage({ from: 'bot', text: reply.answer });
    }, 420);
  };

  return (
    <>
      {/* ── Floating button area ─────────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-2">

        {/* Speech bubble */}
        <AnimatePresence>
          {bubbleVisible && !open && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.9, transition: { duration: 0.18 } }}
              transition={{ delay: 0.8, duration: 0.4, ease: 'easeOut' }}
              className="relative max-w-[220px] rounded-2xl px-4 py-2.5 text-sm font-medium text-white shadow-xl select-none"
              style={{
                background: 'linear-gradient(135deg, rgba(0,255,179,0.15), rgba(55,0,255,0.18))',
                border: '1px solid rgba(0,255,179,0.35)',
                backdropFilter: 'blur(12px)',
              }}
            >
              ¡Pregúntame lo que sea, aquí te guío!
              {/* Tail */}
              <span
                className="absolute -bottom-2 right-8 w-0 h-0"
                style={{
                  borderLeft: '8px solid transparent',
                  borderRight: '8px solid transparent',
                  borderTop: '8px solid rgba(0,255,179,0.35)',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Robot button */}
        <motion.button
          id="chatbot-toggle-btn"
          onClick={handleToggle}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          aria-label="Abrir asistente virtual"
          className="relative w-16 h-16 rounded-full focus:outline-none"
          style={{ filter: 'drop-shadow(0 0 18px rgba(0,255,179,0.55))' }}
        >
          {/* Animated float via CSS */}
          <span className="chatbot-float block w-full h-full">
            <img
              src={robotImg}
              alt="Asistente Bayesmath"
              className="w-full h-full object-contain rounded-full"
              draggable={false}
            />
          </span>

          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-[#00ffb3] pointer-events-none" />
        </motion.button>
      </div>

      {/* ── Chat window ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="chatbot-window"
            initial={{ opacity: 0, scale: 0.82, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', stiffness: 340, damping: 26 }}
            className="fixed bottom-28 right-6 z-[9998] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{
              width: 340,
              maxHeight: 480,
              background: 'rgba(8,10,28,0.96)',
              border: '1px solid rgba(0,255,179,0.25)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 shrink-0"
              style={{
                background: 'linear-gradient(90deg, rgba(0,255,179,0.12), rgba(55,0,255,0.14))',
                borderBottom: '1px solid rgba(0,255,179,0.15)',
              }}
            >
              <img
                src={robotImg}
                alt="Bot"
                className="w-8 h-8 rounded-full object-contain"
                style={{ filter: 'drop-shadow(0 0 6px rgba(0,255,179,0.5))' }}
              />
              <div>
                <p className="text-sm font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Asistente Bayesmath
                </p>
                <p className="text-[10px] text-[#00ffb3]">● En línea</p>
              </div>
              {/* Close */}
              <button
                id="chatbot-close-btn"
                onClick={() => setOpen(false)}
                className="ml-auto text-gray-400 hover:text-white transition-colors text-lg leading-none"
                aria-label="Cerrar chat"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ minHeight: 0 }}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className="max-w-[80%] px-3.5 py-2 rounded-2xl text-sm leading-relaxed"
                    style={
                      msg.from === 'bot'
                        ? {
                            background: 'rgba(0,255,179,0.1)',
                            border: '1px solid rgba(0,255,179,0.2)',
                            color: '#e2e8f0',
                            fontFamily: 'Space Grotesk, sans-serif',
                            borderRadius: '4px 18px 18px 18px',
                          }
                        : {
                            background: 'linear-gradient(135deg, #00ffb3, #00d490)',
                            color: '#050814',
                            fontFamily: 'Space Grotesk, sans-serif',
                            fontWeight: 600,
                            borderRadius: '18px 4px 18px 18px',
                          }
                    }
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            <div
              className="px-4 py-3 space-y-2 shrink-0"
              style={{ borderTop: '1px solid rgba(0,255,179,0.12)' }}
            >
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Respuestas rápidas</p>
              {QUICK_REPLIES.map((qr) => (
                <button
                  key={qr.label}
                  id={`chatbot-qr-${qr.label.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => handleQuickReply(qr)}
                  className="w-full text-left text-xs px-3.5 py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    background: 'rgba(0,255,179,0.07)',
                    border: '1px solid rgba(0,255,179,0.2)',
                    color: '#00ffb3',
                    fontFamily: 'Space Grotesk, sans-serif',
                  }}
                >
                  {qr.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating animation keyframes (injected once) ──────────────────────── */}
      <style>{`
        @keyframes chatbotFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        .chatbot-float { animation: chatbotFloat 3s ease-in-out infinite; }
      `}</style>
    </>
  );
};
