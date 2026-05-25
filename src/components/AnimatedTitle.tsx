import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTitleProps {
  text: string;
  className?: string;
}

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ text, className = '' }) => {
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.h2
      className={`font-bold flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {text.split(' ').map((word, index) => (
        <span key={index} className="mr-2 flex">
          {Array.from(word).map((letter, i) => (
            <motion.span variants={child} key={i}>
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h2>
  );
};
