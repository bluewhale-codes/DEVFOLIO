import { motion } from 'motion/react';

export default function StretchSquash({ text = "ELASTIC" }) {
  return (
    <div className="h-32 flex items-center justify-center">
      <motion.h1
        className="text-6xl font-black text-white"
        style={{ filter: 'drop-shadow(0 0 20px rgba(255, 105, 180, 0.5))' }}
        animate={{
          scaleX: [1, 1.3, 0.8, 1],
          scaleY: [1, 0.8, 1.2, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {text}
      </motion.h1>
    </div>
  );
}
