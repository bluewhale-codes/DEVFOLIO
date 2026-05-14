import { motion } from 'motion/react';

export default function BreathingPulse({ text = "BREATHE" }) {
  return (
    <div className="h-32 flex items-center justify-center">
      <motion.h1
        className="text-6xl font-black text-white"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
          textShadow: [
            '0 0 20px rgba(212, 255, 0, 0.3)',
            '0 0 40px rgba(212, 255, 0, 0.6)',
            '0 0 20px rgba(212, 255, 0, 0.3)',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {text}
      </motion.h1>
    </div>
  );
}
