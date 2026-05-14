import { motion } from 'motion/react';

export default function GlitchText({ text = "GLITCH ERROR" }) {
  return (
    <div className="relative h-32 flex items-center justify-center">
      <motion.h1
        className="text-6xl font-black text-white relative"
        animate={{
          x: [0, -5, 5, -5, 0],
          textShadow: [
            '0 0 0 transparent',
            '-5px 0 10px rgba(255, 0, 0, 0.7), 5px 0 10px rgba(0, 255, 255, 0.7)',
            '5px 0 10px rgba(255, 0, 0, 0.7), -5px 0 10px rgba(0, 255, 255, 0.7)',
            '0 0 0 transparent',
          ]
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut"
        }}
      >
        {text}
      </motion.h1>
    </div>
  );
}
